/**
 * Tracks partner banner & pop-ad events: impression, click, dismiss.
 * Stored locally and (optionally) flushable to backend later.
 * Also powers a simple A/B variant assignment.
 */
export type AdEvent = 'impression' | 'click' | 'dismiss';
export type AdSurface = 'banner' | 'pop';

export interface AdEventRecord {
  ts: number;
  surface: AdSurface;
  event: AdEvent;
  campaign: string;   // e.g. "digital", "freelancer", "country-USA"
  partner: string;    // partner platform name
  variant: string;    // A/B variant id (e.g. "a", "b")
  href?: string;
}

const LS_KEY = 'fs:ad-events';
const CAP = 2000;

export function trackAdEvent(rec: Omit<AdEventRecord, 'ts'>): void {
  if (typeof window === 'undefined') return;
  try {
    const raw = localStorage.getItem(LS_KEY);
    const list: AdEventRecord[] = raw ? JSON.parse(raw) : [];
    list.push({ ...rec, ts: Date.now() });
    const trimmed = list.length > CAP ? list.slice(-CAP) : list;
    localStorage.setItem(LS_KEY, JSON.stringify(trimmed));
  } catch { /* ignore */ }
}

export function getAdEvents(): AdEventRecord[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(LS_KEY);
    return raw ? (JSON.parse(raw) as AdEventRecord[]) : [];
  } catch {
    return [];
  }
}

/** Sticky A/B variant per campaign, persisted to localStorage. */
export function getVariant(campaign: string, variants: string[] = ['a', 'b']): string {
  if (typeof window === 'undefined') return variants[0];
  const key = `fs:ab:${campaign}`;
  const existing = localStorage.getItem(key);
  if (existing && variants.includes(existing)) return existing;
  const picked = variants[Math.floor(Math.random() * variants.length)];
  localStorage.setItem(key, picked);
  return picked;
}