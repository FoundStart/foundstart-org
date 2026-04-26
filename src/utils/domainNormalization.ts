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
  const key = raw.trim().toLowerCase().replace(/\s+/g, ' ');
  return HOSTING_ALIASES[key] || HOSTING_ALIASES[key.replace(/\s+/g, '')] || 'Spaceship';
};

/**
 * Parse a pasted list of domains. Accepts CSV/TSV/pipe with columns:
 *   Name, Hosting, Category   (header optional)
 * Or whitespace separated lines.
 */
export const parseDomainList = (input: string): Omit<Domain, 'id'>[] => {
  const lines = input.split(/\r?\n/).map(l => l.trim()).filter(Boolean);
  const out: Omit<Domain, 'id'>[] = [];
  for (const line of lines) {
    if (/^(name|domain)[\s,|\t]/i.test(line)) continue; // skip header
    const parts = line.split(/\t|\s*[|,]\s*/).map(s => s.trim()).filter(Boolean);
    if (parts.length < 1) continue;
    const [name, hosting = 'Spaceship', ...rest] = parts;
    if (!/\.[a-z]{2,}$/i.test(name)) continue;
    out.push({
      name,
      hosting: normalizeHosting(hosting),
      category: rest.join(', ') || 'Startups, SaaS & Tech',
    });
  }
  return out;
};

const STORAGE_KEY = 'foundstart.bulkDomains.v1';

export const loadBulkDomains = (): Omit<Domain, 'id'>[] => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
};

export const saveBulkDomains = (domains: Omit<Domain, 'id'>[]) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(domains));
};

export const mergeDomains = (
  base: Domain[],
  extras: Omit<Domain, 'id'>[]
): Domain[] => {
  const seen = new Set(base.map(d => d.name.toLowerCase()));
  const merged = [...base];
  let nextId = base.reduce((m, d) => Math.max(m, d.id), 0) + 1;
  for (const e of extras) {
    if (seen.has(e.name.toLowerCase())) continue;
    seen.add(e.name.toLowerCase());
    merged.push({ ...e, id: nextId++ });
  }
  return merged;
};
