import { digitalPartnersData } from './digitalPartnersData';
import { freelancerPartnersData } from './freelancerPartnersData';
import { partnerData } from './jurisdictionData';

export interface CatalogPartner {
  slug: string;
  name: string;
  group: string;
  rawCategory: string;
  niche: string;
  url: string;
  coupon?: string;
  videoUrl?: string;
  language?: string;
}

export interface PartnerGroup { id: string; en: string; ar: string }

export const partnerGroups: PartnerGroup[] = [
  { id: 'formation', en: 'Company Formation', ar: 'تأسيس الشركات' },
  { id: 'banking', en: 'Banking, Fintech & Payments', ar: 'البنوك والفينتك والمدفوعات' },
  { id: 'domains', en: 'Domains & Hosting', ar: 'الدومينات والاستضافة' },
  { id: 'coding', en: 'Vibe Coding & App Builders', ar: 'البرمجة بالذكاء الاصطناعي وبناء التطبيقات' },
  { id: 'ai', en: 'AI Tools, Video & Voice', ar: 'أدوات الذكاء الاصطناعي والفيديو والصوت' },
  { id: 'automation', en: 'Automation & Management', ar: 'الأتمتة وإدارة العمل' },
  { id: 'marketing', en: 'Marketing, SEO & Advertising', ar: 'التسويق وSEO والإعلانات' },
  { id: 'ecommerce', en: 'E-commerce & Marketplaces', ar: 'التجارة الإلكترونية والأسواق' },
  { id: 'design', en: 'Design', ar: 'التصميم' },
  { id: 'telecom', en: 'eSIM & Telecom', ar: 'الشرائح الإلكترونية والاتصالات' },
  { id: 'freelance', en: 'Freelancing & Earning Online', ar: 'العمل الحر والربح من الإنترنت' },
  { id: 'more', en: 'Learning, Travel & More', ar: 'التعلم والسفر وأكثر' },
];

const groupByRaw: Record<string, string> = {
  'Company Formation': 'formation', 'Business Company Formation': 'formation',
  'Finance': 'banking', 'Fintech': 'banking',
  'Domains': 'domains', 'Web Hosting': 'domains',
  'Vibe Coding': 'coding',
  'AI Tools': 'ai', 'AI Videos': 'ai', 'Ai Videos & Image': 'ai', 'AI UGC': 'ai', 'AI Voices': 'ai',
  'Business Automation': 'automation', 'Managements': 'automation', 'HR Managements': 'automation',
  'SEO tools - Traffic': 'marketing', 'Email Marketing': 'marketing', 'SMM Panel': 'marketing', 'Publisher & Advertising': 'marketing',
  'Dropshipping & POD': 'ecommerce', 'Digital marketplace': 'ecommerce',
  'Design': 'design',
  'Telecommunication': 'telecom', 'Telecommunications': 'telecom',
  'Freelancer & Earn Money online': 'freelance', 'Earn money from uploading files': 'freelance', 'Freelancers Guide': 'freelance',
};

const fixUrl = (u: string) => u.trim().replace(/^(https?)\/\//i, '$1://');
const slugify = (s: string) => s.toLowerCase().replace(/&/g, ' and ').replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '') || 'partner';

const raw: Omit<CatalogPartner, 'slug'>[] = [
  ...partnerData.map((p: any) => ({ name: p.platform, rawCategory: p.category, niche: p.details || '', url: p.url, coupon: p.coupon, videoUrl: p.videoUrl })),
  ...digitalPartnersData.map((p) => ({ name: p.platform, rawCategory: p.category, niche: p.niche || '', url: p.url, coupon: p.coupon || undefined })),
  ...freelancerPartnersData.map((p) => ({ name: p.platform, rawCategory: p.category, niche: (p as any).niche || '', url: p.url, language: p.language })),
].map((p: any) => ({ ...p, group: groupByRaw[p.rawCategory] || 'more', url: fixUrl(p.url) }));

// One entry per partner name; the first source wins and later duplicates only fill missing fields.
const seen = new Map<string, CatalogPartner>();
const slugs = new Set<string>();
for (const p of raw) {
  const key = p.name.trim().toLowerCase();
  const prev = seen.get(key);
  if (prev) {
    prev.coupon = prev.coupon || p.coupon;
    prev.videoUrl = prev.videoUrl || p.videoUrl;
    prev.niche = prev.niche || p.niche;
    continue;
  }
  let slug = slugify(p.name), i = 2;
  while (slugs.has(slug)) slug = `${slugify(p.name)}-${i++}`;
  slugs.add(slug);
  seen.set(key, { ...p, name: p.name.trim(), slug });
}

export const catalogPartners: CatalogPartner[] = Array.from(seen.values());
export const partnerBySlug = (slug: string) => catalogPartners.find((p) => p.slug === slug);
export const partnersInGroup = (id: string) => catalogPartners.filter((p) => p.group === id);
