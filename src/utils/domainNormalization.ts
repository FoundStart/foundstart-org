import type { Domain } from '@/data/domainsData';

export type HostingKey = 'UD' | 'Spaceship' | 'Godaddy' | 'Hostinger' | 'Namebright';

const HOSTING_ALIASES: Record<string, HostingKey> = {
  ud: 'UD',
  unstoppable: 'UD',
  unstoppabledomains: 'UD',
  'unstoppable domains': 'UD',
  spaceship: 'Spaceship',
  godaddy: 'Godaddy',
  'go daddy': 'Godaddy',
  hostinger: 'Hostinger',
  namebright: 'Namebright',
  'name bright': 'Namebright',
};

export const normalizeHosting = (raw: string): HostingKey => {
  const key = (raw || '').trim().toLowerCase().replace(/\s+/g, ' ');
  return HOSTING_ALIASES[key] || HOSTING_ALIASES[key.replace(/\s+/g, '')] || 'Spaceship';
};

// Common real TLDs we accept. Keeps things permissive (multi-segment country TLDs allowed)
const VALID_TLDS = new Set([
  'com','net','org','io','co','ai','app','dev','xyz','tech','site','online','store','shop',
  'me','tv','cc','us','uk','eu','de','fr','es','it','nl','se','fi','no','dk','ie','pt',
  'ca','au','nz','jp','cn','in','br','mx','ar','za','ng','eg','sa','ae','tr','pl','ch',
  'be','at','cz','gr','hu','ro','sg','hk','kr','ph','my','id','vn','th','pk','bd','il',
  'biz','info','pro','name','mobi','asia','cloud','agency','digital','company','design',
  'studio','works','world','life','live','blog','space','today','group','network','media',
  'finance','capital','fund','money','shop','market','marketing','services','solutions',
]);

const TLD_RE = /\.([a-z]{2,24})(?:\.[a-z]{2,24})?$/i;

export const isValidDomainName = (name: string): boolean => {
  if (!name || name.length > 253) return false;
  if (!/^[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)+$/i.test(name)) return false;
  const m = name.match(TLD_RE);
  if (!m) return false;
  return VALID_TLDS.has(m[1].toLowerCase());
};

export interface BulkDomain extends Omit<Domain, 'id'> {
  price?: string; // optional premium price label, free-form (e.g. "$1,200")
}

export interface ParseError {
  line: number;
  raw: string;
  reason: string;
}

export interface ParseResult {
  domains: BulkDomain[];
  errors: ParseError[];
}

const splitParts = (line: string) =>
  line.split(/\t|\s*[|,]\s*/).map(s => s.trim()).filter(Boolean);

/**
 * Parse a pasted list. Format per line:
 *   name.com, Hosting, Category[, Price]
 * Returns parsed domains plus per-line errors with friendly reasons.
 */
export const parseDomainList = (input: string): ParseResult => {
  const rawLines = input.split(/\r?\n/);
  const domains: BulkDomain[] = [];
  const errors: ParseError[] = [];

  rawLines.forEach((rawLine, idx) => {
    const line = rawLine.trim();
    if (!line) return;
    if (/^(name|domain)[\s,|\t]/i.test(line)) return; // header
    const parts = splitParts(line);
    if (parts.length === 0) {
      errors.push({ line: idx + 1, raw: rawLine, reason: 'Empty line.' });
      return;
    }
    const [name, hosting = 'Spaceship', category = '', price = ''] = parts;
    if (!isValidDomainName(name)) {
      errors.push({
        line: idx + 1,
        raw: rawLine,
        reason: `"${name}" is not a valid domain (check spelling and TLD).`,
      });
      return;
    }
    domains.push({
      name,
      hosting: normalizeHosting(hosting),
      category: category || 'Startups, SaaS & Tech',
      ...(price ? { price } : {}),
    });
  });

  return { domains, errors };
};

/** Parse a price-update list. Format: name.com, NewPrice */
export const parsePriceUpdates = (input: string): { updates: Map<string, string>; errors: ParseError[] } => {
  const updates = new Map<string, string>();
  const errors: ParseError[] = [];
  input.split(/\r?\n/).forEach((rawLine, idx) => {
    const line = rawLine.trim();
    if (!line) return;
    if (/^(name|domain)[\s,|\t]/i.test(line)) return;
    const parts = splitParts(line);
    if (parts.length < 2) {
      errors.push({ line: idx + 1, raw: rawLine, reason: 'Expected: domain.com, NewPrice' });
      return;
    }
    const [name, price] = parts;
    if (!isValidDomainName(name)) {
      errors.push({ line: idx + 1, raw: rawLine, reason: `Invalid domain: ${name}` });
      return;
    }
    updates.set(name.toLowerCase(), price);
  });
  return { updates, errors };
};

const STORAGE_KEY = 'foundstart.bulkDomains.v2';
const HISTORY_KEY = 'foundstart.bulkDomains.history.v1';
const HISTORY_LIMIT = 10;

export const loadBulkDomains = (): BulkDomain[] => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
};

const loadHistory = (): BulkDomain[][] => {
  try {
    const raw = localStorage.getItem(HISTORY_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
};

const saveHistory = (h: BulkDomain[][]) => {
  localStorage.setItem(HISTORY_KEY, JSON.stringify(h.slice(-HISTORY_LIMIT)));
};

/** Save current state, pushing previous state into history for undo. */
export const saveBulkDomains = (domains: BulkDomain[], pushHistory = true) => {
  if (pushHistory) {
    const prev = loadBulkDomains();
    const history = loadHistory();
    history.push(prev);
    saveHistory(history);
  }
  localStorage.setItem(STORAGE_KEY, JSON.stringify(domains));
};

export const canUndoBulk = (): boolean => loadHistory().length > 0;

export const undoBulkDomains = (): BulkDomain[] | null => {
  const history = loadHistory();
  const prev = history.pop();
  if (prev === undefined) return null;
  saveHistory(history);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(prev));
  return prev;
};

export const dedupKey = (name: string, hosting: string) =>
  `${name.toLowerCase()}::${hosting.toLowerCase()}`;

export const mergeDomains = (
  base: Domain[],
  extras: BulkDomain[]
): Domain[] => {
  const seen = new Set(base.map(d => dedupKey(d.name, d.hosting)));
  const merged = [...base];
  let nextId = base.reduce((m, d) => Math.max(m, d.id), 0) + 1;
  for (const e of extras) {
    const key = dedupKey(e.name, e.hosting);
    if (seen.has(key)) continue;
    seen.add(key);
    merged.push({ name: e.name, hosting: e.hosting, category: e.category, id: nextId++ });
  }
  return merged;
};

/** Apply price updates to bulk domains in-place (returns new array + count). */
export const applyPriceUpdates = (
  bulk: BulkDomain[],
  updates: Map<string, string>
): { next: BulkDomain[]; updated: number; missing: string[] } => {
  let updated = 0;
  const seen = new Set<string>();
  const next = bulk.map(d => {
    const key = d.name.toLowerCase();
    if (updates.has(key)) {
      seen.add(key);
      updated++;
      return { ...d, price: updates.get(key)! };
    }
    return d;
  });
  const missing = [...updates.keys()].filter(k => !seen.has(k));
  return { next, updated, missing };
};

/** CSV export of full catalog (base + bulk additions). */
export const toCsv = (rows: Array<{ name: string; hosting: string; category: string; price?: string }>): string => {
  const escape = (v: string) => {
    if (v == null) return '';
    const s = String(v);
    return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
  };
  const header = ['Name', 'Hosting', 'Category', 'Price'];
  const lines = [header.join(',')]
  for (const r of rows) {
    lines.push([escape(r.name), escape(r.hosting), escape(r.category), escape(r.price || '')].join(','));
  }
  return lines.join('\n');
};

export const downloadCsv = (filename: string, csv: string) => {
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};
