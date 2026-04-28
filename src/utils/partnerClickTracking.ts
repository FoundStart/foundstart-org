/**
 * Lightweight client-side click tracking for blog partner CTAs.
 * Stores clicks in localStorage so we can export a monthly CSV from /admin.
 */

export interface PartnerClickRecord {
  ts: number;          // unix ms
  partnerId: string;
  partnerName: string;
  category: string;
  url: string;
  blogSlug: string;
  locale: string;
}

const STORAGE_KEY = 'fs:blog-partner-clicks';
const MAX_RECORDS = 5000;

export function trackPartnerClick(rec: Omit<PartnerClickRecord, 'ts'>): void {
  if (typeof window === 'undefined') return;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    const list: PartnerClickRecord[] = raw ? JSON.parse(raw) : [];
    list.push({ ...rec, ts: Date.now() });
    // Trim if exceeds cap
    const trimmed = list.length > MAX_RECORDS ? list.slice(-MAX_RECORDS) : list;
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(trimmed));
  } catch {
    // Silently ignore tracking failures
  }
}

export function getPartnerClicks(): PartnerClickRecord[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as PartnerClickRecord[]) : [];
  } catch {
    return [];
  }
}

export function clearPartnerClicks(): void {
  try {
    window.localStorage.removeItem(STORAGE_KEY);
  } catch {
    // ignore
  }
}

export function filterClicksByMonth(
  records: PartnerClickRecord[],
  year: number,
  month: number, // 1-12
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
