// Generates the Co-founder partner catalog from the site's partner data,
// so Co-founder recommendations use the same CTA destinations as the site.
// Run: npx tsx scripts/generate-cofounder-catalog.mts
import { writeFileSync } from 'node:fs';
import { digitalPartnersData } from '../src/data/digitalPartnersData';
import { freelancerPartnersData } from '../src/data/freelancerPartnersData';
import { sisterDomains } from '../src/data/sisterPartnersData';

interface CatalogEntry {
  name: string;
  category: string;
  url: string;
  niche?: string;
  language?: string;
  source: 'digital' | 'freelancer' | 'sister';
  coupon?: string;
}

const catalog: CatalogEntry[] = [
  ...digitalPartnersData.map((p) => ({
    name: p.platform,
    category: p.category,
    url: p.url,
    niche: p.niche,
    source: 'digital' as const,
    ...(p.coupon ? { coupon: p.coupon } : {}),
  })),
  ...freelancerPartnersData.map((p) => ({
    name: p.platform,
    category: p.category,
    url: p.url,
    language: p.language,
    source: 'freelancer' as const,
  })),
  ...sisterDomains.map((d: any) => ({
    name: d.name ?? d.platform ?? String(d.domain ?? ''),
    category: d.category ?? 'Sister brand',
    url: d.url ?? (d.domain ? `https://${d.domain}` : ''),
    niche: d.description ?? d.niche,
    source: 'sister' as const,
  })),
].filter((e) => e.name && e.url);

// De-duplicate by name+url
const seen = new Set<string>();
const deduped = catalog.filter((e) => {
  const k = `${e.name}|${e.url}`;
  if (seen.has(k)) return false;
  seen.add(k);
  return true;
});

writeFileSync(
  new URL('../supabase/functions/cofounder/catalog.json', import.meta.url),
  JSON.stringify(deduped, null, 2)
);
console.log(`catalog.json written: ${deduped.length} partners`);
console.log('categories:', [...new Set(deduped.map((e) => e.category))].join(' | '));
