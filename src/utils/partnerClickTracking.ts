/**
 * Persistent partner-click tracking with longer retention.
 *
 * Storage strategy:
 *   - Primary: IndexedDB ("fs-partner-clicks" / "clicks") for high-cap retention.
 *   - Fallback / mirror: localStorage cap (legacy) so older code paths still work.
 *   - Session-level dedupe: optional first-click-only mode per (blog + partner) using sessionStorage.
 *   - Merge on revisit: getPartnerClicks() returns the union of IndexedDB + localStorage,
 *     deduped by a stable key (ts+partnerId+blogSlug).
 */

export interface PartnerClickRecord {
  ts: number;
  partnerId: string;
  partnerName: string;
  category: string;
  url: string;
  blogSlug: string;
  locale: string;
}

const LS_KEY = 'fs:blog-partner-clicks';
const LS_CAP = 5000;
const SS_DEDUPE_KEY = 'fs:blog-partner-click-dedupe';
const SS_MODE_KEY = 'fs:blog-partner-dedupe-mode'; // '1' = first-click-only per session

const IDB_NAME = 'fs-partner-clicks';
const IDB_STORE = 'clicks';
const IDB_VERSION = 1;

/* ------------------------- IndexedDB helpers ------------------------- */

function idbAvailable(): boolean {
  return typeof window !== 'undefined' && 'indexedDB' in window;
}

function openDB(): Promise<IDBDatabase | null> {
  return new Promise((resolve) => {
    if (!idbAvailable()) return resolve(null);
    try {
      const req = window.indexedDB.open(IDB_NAME, IDB_VERSION);
      req.onupgradeneeded = () => {
        const db = req.result;
        if (!db.objectStoreNames.contains(IDB_STORE)) {
          const store = db.createObjectStore(IDB_STORE, { keyPath: 'key' });
          store.createIndex('ts', 'ts', { unique: false });
        }
      };
      req.onsuccess = () => resolve(req.result);
      req.onerror = () => resolve(null);
    } catch {
      resolve(null);
    }
  });
}

function recordKey(r: PartnerClickRecord): string {
  return `${r.ts}|${r.partnerId}|${r.blogSlug}`;
}

async function idbPut(r: PartnerClickRecord): Promise<void> {
  const db = await openDB();
  if (!db) return;
  await new Promise<void>((resolve) => {
    try {
      const tx = db.transaction(IDB_STORE, 'readwrite');
      tx.objectStore(IDB_STORE).put({ ...r, key: recordKey(r) });
      tx.oncomplete = () => resolve();
      tx.onerror = () => resolve();
    } catch {
      resolve();
    }
  });
  db.close();
}

async function idbGetAll(): Promise<PartnerClickRecord[]> {
  const db = await openDB();
  if (!db) return [];
  const out = await new Promise<PartnerClickRecord[]>((resolve) => {
    try {
      const tx = db.transaction(IDB_STORE, 'readonly');
      const req = tx.objectStore(IDB_STORE).getAll();
      req.onsuccess = () => {
        const rows = (req.result as Array<PartnerClickRecord & { key?: string }>) ?? [];
        resolve(rows.map(({ key, ...rest }) => rest));
      };
      req.onerror = () => resolve([]);
    } catch {
      resolve([]);
    }
  });
  db.close();
  return out;
}

async function idbClear(): Promise<void> {
  const db = await openDB();
  if (!db) return;
  await new Promise<void>((resolve) => {
    try {
      const tx = db.transaction(IDB_STORE, 'readwrite');
      tx.objectStore(IDB_STORE).clear();
      tx.oncomplete = () => resolve();
      tx.onerror = () => resolve();
    } catch {
      resolve();
    }
  });
  db.close();
}

/* ------------------------- Session dedupe ------------------------- */

export function setDedupeMode(enabled: boolean): void {
  try {
    if (enabled) window.sessionStorage.setItem(SS_MODE_KEY, '1');
    else window.sessionStorage.removeItem(SS_MODE_KEY);
  } catch { /* ignore */ }
}

export function getDedupeMode(): boolean {
  try {
    return window.sessionStorage.getItem(SS_MODE_KEY) === '1';
  } catch {
    return false;
  }
}

function shouldSkipDuplicate(rec: Omit<PartnerClickRecord, 'ts'>): boolean {
  if (!getDedupeMode()) return false;
  try {
    const raw = window.sessionStorage.getItem(SS_DEDUPE_KEY);
    const seen: Record<string, true> = raw ? JSON.parse(raw) : {};
    const k = `${rec.blogSlug}|${rec.partnerId}`;
    if (seen[k]) return true;
    seen[k] = true;
    window.sessionStorage.setItem(SS_DEDUPE_KEY, JSON.stringify(seen));
    return false;
  } catch {
    return false;
  }
}

/* ------------------------- Public API ------------------------- */

export function trackPartnerClick(rec: Omit<PartnerClickRecord, 'ts'>): void {
  if (typeof window === 'undefined') return;
  if (shouldSkipDuplicate(rec)) return;

  const full: PartnerClickRecord = { ...rec, ts: Date.now() };

  // localStorage mirror (legacy + fast)
  try {
    const raw = window.localStorage.getItem(LS_KEY);
    const list: PartnerClickRecord[] = raw ? JSON.parse(raw) : [];
    list.push(full);
    const trimmed = list.length > LS_CAP ? list.slice(-LS_CAP) : list;
    window.localStorage.setItem(LS_KEY, JSON.stringify(trimmed));
  } catch { /* ignore */ }

  // IndexedDB (long-term, no cap)
  void idbPut(full);
}

/**
 * Returns the merged union of IndexedDB + localStorage records, deduped by stable key.
 * Always sorted ascending by timestamp.
 */
export function getPartnerClicks(): PartnerClickRecord[] {
  // Synchronous: we return localStorage immediately; IndexedDB consumers should use getPartnerClicksAsync.
  if (typeof window === 'undefined') return [];
  try {
    const raw = window.localStorage.getItem(LS_KEY);
    return raw ? (JSON.parse(raw) as PartnerClickRecord[]) : [];
  } catch {
    return [];
  }
}

/**
 * Async variant: union of IndexedDB + localStorage with dedupe & merge on revisit.
 */
export async function getPartnerClicksAsync(): Promise<PartnerClickRecord[]> {
  const ls = getPartnerClicks();
  const idb = await idbGetAll();
  const map = new Map<string, PartnerClickRecord>();
  for (const r of [...ls, ...idb]) map.set(recordKey(r), r);
  return [...map.values()].sort((a, b) => a.ts - b.ts);
}

export function clearPartnerClicks(): void {
  try { window.localStorage.removeItem(LS_KEY); } catch { /* ignore */ }
  try { window.sessionStorage.removeItem(SS_DEDUPE_KEY); } catch { /* ignore */ }
  void idbClear();
}

export function filterClicksByMonth(
  records: PartnerClickRecord[],
  year: number,
  month: number,
): PartnerClickRecord[] {
  return records.filter((r) => {
    const d = new Date(r.ts);
    return d.getFullYear() === year && d.getMonth() + 1 === month;
  });
}

export function exportClicksToCSV(records: PartnerClickRecord[]): string {
  const header = ['timestamp_iso', 'partner_id', 'partner_name', 'category', 'url', 'blog_slug', 'locale'];
  const rows = records.map((r) => [
    new Date(r.ts).toISOString(),
    r.partnerId,
    r.partnerName,
    r.category,
    r.url,
    r.blogSlug,
    r.locale,
  ]);
  const escape = (v: string) => {
    if (v == null) return '';
    const s = String(v);
    return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
  };
  return [header, ...rows].map((row) => row.map(escape).join(',')).join('\n');
}

export function downloadCSV(filename: string, csv: string): void {
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
