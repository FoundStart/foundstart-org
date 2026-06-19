/**
 * Language-safe shared partner config for blog posts.
 * Same category keys are used across EN, AR (and future FR/ES) so blogs
 * always render the same partner structure regardless of locale.
 */

export const PARTNER_CATEGORIES = [
  'formation',
  'uk',
  'eu',
  'banking',
  'payment',
  'telecom',
] as const;

export type PartnerCategoryKey = (typeof PARTNER_CATEGORIES)[number];

export interface PartnerEntry {
  /** Stable ID — used for click tracking & dedupe across locales */
  id: string;
  /** Display name (locale-specific) */
  name: string;
  /** Short description (locale-specific) */
  desc: string;
  /** Outbound URL — MUST be a shortet.com link when partnered=true */
  url: string;
  /** True = render as CTA card, false = render as plain text mention */
  partnered: boolean;
}

export type LocaleCode = 'en' | 'ar';

export type PartnerCatalog = Record<
  PartnerCategoryKey,
  PartnerEntry[]
>;

export const PARTNER_DOMAIN = 'shortet.com';

/**
 * Validates that a partnered entry uses a shortet.com URL.
 * Returns { ok, message, suggestion } so the UI can surface a warning chip
 * with a one-click suggested correction.
 */
export function validatePartnerEntry(p: PartnerEntry): {
  ok: boolean;
  message?: string;
  suggestion?: string;
} {
  if (!p.partnered) return { ok: true };
  try {
    const u = new URL(p.url);
    const host = u.hostname.replace(/^www\./, '');
    if (host !== PARTNER_DOMAIN) {
      const slug = p.id.replace(/^pay-/, '').toLowerCase();
      const suggestion = `https://${PARTNER_DOMAIN}/${slug}`;
      return {
        ok: false,
        message: `"${p.name}" is marked as partnered but URL host is "${host}" (expected ${PARTNER_DOMAIN}). Suggested: ${suggestion}`,
        suggestion,
      };
    }
    return { ok: true };
  } catch {
    const slug = p.id.replace(/^pay-/, '').toLowerCase();
    const suggestion = `https://${PARTNER_DOMAIN}/${slug}`;
    return {
      ok: false,
      message: `"${p.name}" has an invalid URL: ${p.url}. Suggested: ${suggestion}`,
      suggestion,
    };
  }
}

export function validateCatalog(catalog: PartnerCatalog): string[] {
  const warnings: string[] = [];
  for (const cat of PARTNER_CATEGORIES) {
    for (const p of catalog[cat] ?? []) {
      const r = validatePartnerEntry(p);
      if (!r.ok && r.message) warnings.push(`[${cat}] ${r.message}`);
    }
  }
  return warnings;
}

/* ----------------------------- EN catalog ----------------------------- */

export const partnerCatalogEN: PartnerCatalog = {
  formation: [
    { id: 'doola', name: 'Doola', desc: 'US LLC + EIN + banking bundle', url: 'https://shortet.com/doola', partnered: true },
    { id: 'clemta', name: 'Clemta', desc: 'US LLC formation', url: 'https://shortet.com/clemta', partnered: true },
    { id: 'startglobal', name: 'Startglobal', desc: 'US LLC formation', url: 'https://shortet.com/startglobal', partnered: true },
    { id: 'tailorbrands', name: 'Tailorbrands', desc: 'US LLC + branding', url: 'https://shortet.com/tailorbrands', partnered: true },
    { id: 'startfleet', name: 'Startfleet', desc: 'US LLC formation', url: 'https://shortet.com/startfleet', partnered: true },
    { id: 'privatily', name: 'Privatily', desc: 'USA & UK formation', url: 'https://shortet.com/privatily', partnered: true },
    { id: 'theitin', name: 'ITIN', desc: 'ITIN service for non-US founders', url: 'https://shortet.com/theitin', partnered: true },
    { id: 'go-nomad-hq', name: 'Go Nomad HQ', desc: 'USA & UK for nomads', url: 'https://shortet.com/Go-Nomad-HQ', partnered: true },
  ],
  uk: [
    { id: '1stformations', name: '1stFormations', desc: 'UK Ltd formation', url: 'https://shortet.com/1st-formations', partnered: true },
    { id: 'rapid-formations', name: 'Rapid Formations', desc: 'UK Ltd formation', url: 'https://shortet.com/rapid-formations', partnered: true },
    { id: 'firstbase', name: 'Firstbase', desc: 'UK & global formation', url: 'https://shortet.com/firstbase', partnered: true },
    { id: '1office-uk', name: '1office', desc: 'UK + Estonia + Nordics', url: 'https://shortet.com/1office', partnered: true },
  ],
  eu: [
    { id: '1office-ee', name: 'Estonia (1office)', desc: 'EU company via e-Residency', url: 'https://shortet.com/1office', partnered: true },
    { id: '1office-fi', name: 'Finland (1office)', desc: 'EU company formation', url: 'https://shortet.com/1office', partnered: true },
    { id: '1office-se', name: 'Sweden (1office)', desc: 'EU company formation', url: 'https://shortet.com/1office', partnered: true },
    { id: '1office-lv', name: 'Latvia (1office)', desc: 'EU company formation', url: 'https://shortet.com/1office', partnered: true },
    { id: '1office-lt', name: 'Lithuania (1office)', desc: 'EU company formation', url: 'https://shortet.com/1office', partnered: true },
    { id: '1office-ie', name: 'Ireland (1office)', desc: 'EU English-speaking company', url: 'https://shortet.com/1office', partnered: true },
  ],
  banking: [
    { id: 'mercury', name: 'Mercury', desc: 'US business bank — no fees, Stripe-ready', url: 'https://shortet.com/Mercury', partnered: true },
    { id: 'wise', name: 'Wise', desc: 'Multi-currency bank/wallet (USD/EUR/GBP)', url: 'https://shortet.com/Wise', partnered: true },
    { id: 'worldfirst', name: 'WorldFirst', desc: 'Global business banking', url: 'https://shortet.com/Worldfirst', partnered: true },
    { id: 'kast', name: 'Kast', desc: 'Free USD account + virtual card', url: 'https://shortet.com/Kast', partnered: true },
    { id: 'grey', name: 'Grey', desc: 'Inclusive global banking', url: 'https://shortet.com/Grey', partnered: true },
    { id: 'airtm', name: 'Airtm', desc: 'Digital wallet (LATAM/MENA friendly)', url: 'https://shortet.com/airtm', partnered: true },
    { id: 'redotpay', name: 'RedotPay', desc: 'Crypto-linked digital wallet', url: 'https://shortet.com/RedotPay', partnered: true },
    { id: 'bybit', name: 'ByBit', desc: 'Crypto exchange + P2P', url: 'https://shortet.com/bybit', partnered: true },
  ],
  payment: [
    { id: 'pay-wise', name: 'Wise', desc: 'Multi-currency receiving for Stripe payouts', url: 'https://shortet.com/Wise', partnered: true },
    { id: 'pay-mercury', name: 'Mercury', desc: 'US bank account for Stripe payouts', url: 'https://shortet.com/Mercury', partnered: true },
    { id: 'pay-worldfirst', name: 'WorldFirst', desc: 'Global payment receiving', url: 'https://shortet.com/Worldfirst', partnered: true },
    { id: 'pay-kast', name: 'Kast', desc: 'USD card for paying SaaS & ads', url: 'https://shortet.com/Kast', partnered: true },
    // Non-partnered mentions — render as plain text in glossary
    { id: 'stripe', name: 'Stripe', desc: 'Primary global payment gateway (135+ currencies)', url: 'https://stripe.com', partnered: false },
    { id: 'shopify-payments', name: 'Shopify Payments', desc: 'Built-in gateway for Shopify stores', url: 'https://www.shopify.com/payments', partnered: false },
    { id: 'paypal', name: 'PayPal Business', desc: 'Buyer trust + global checkout', url: 'https://www.paypal.com/business', partnered: false },
    { id: 'lemonsqueezy', name: 'LemonSqueezy', desc: 'Merchant of Record for digital goods', url: 'https://www.lemonsqueezy.com', partnered: false },
    { id: 'paddle', name: 'Paddle', desc: 'Merchant of Record for SaaS (global VAT handled)', url: 'https://www.paddle.com', partnered: false },
  ],
  telecom: [
    { id: 'airalo', name: 'Airalo', desc: 'eSIM for travel — €3 off first purchase', url: 'https://shortet.com/airalo', partnered: true },
    { id: 'bnesim', name: 'Bnesim', desc: 'eSIM anywhere, anytime', url: 'https://shortet.com/Bnesim', partnered: true },
    { id: 'esim-me', name: 'esim.me', desc: 'Global eSIM service', url: 'https://shortet.com/esim', partnered: true },
    { id: 'smsfast', name: 'SMS Fast', desc: 'Virtual phone numbers + eSIM', url: 'https://shortet.com/smsfast', partnered: true },
  ],
};

/* ----------------------------- AR catalog ----------------------------- */

export const partnerCatalogAR: PartnerCatalog = {
  formation: [
    { id: 'doola', name: 'Doola', desc: 'باقة LLC أمريكية + EIN + بنك', url: 'https://shortet.com/doola', partnered: true },
    { id: 'clemta', name: 'Clemta', desc: 'تأسيس LLC أمريكية', url: 'https://shortet.com/clemta', partnered: true },
    { id: 'startglobal', name: 'Startglobal', desc: 'تأسيس LLC أمريكية', url: 'https://shortet.com/startglobal', partnered: true },
    { id: 'tailorbrands', name: 'Tailorbrands', desc: 'LLC + هوية بصرية', url: 'https://shortet.com/tailorbrands', partnered: true },
    { id: 'startfleet', name: 'Startfleet', desc: 'تأسيس LLC أمريكية', url: 'https://shortet.com/startfleet', partnered: true },
    { id: 'privatily', name: 'Privatily', desc: 'تأسيس أمريكا والمملكة المتحدة', url: 'https://shortet.com/privatily', partnered: true },
    { id: 'theitin', name: 'ITIN', desc: 'خدمة ITIN لغير المقيمين', url: 'https://shortet.com/theitin', partnered: true },
    { id: 'go-nomad-hq', name: 'Go Nomad HQ', desc: 'أمريكا والمملكة المتحدة للرحالة', url: 'https://shortet.com/Go-Nomad-HQ', partnered: true },
  ],
  uk: [
    { id: '1stformations', name: '1stFormations', desc: 'تأسيس Ltd بريطانية', url: 'https://shortet.com/1st-formations', partnered: true },
    { id: 'rapid-formations', name: 'Rapid Formations', desc: 'تأسيس Ltd بريطانية', url: 'https://shortet.com/rapid-formations', partnered: true },
    { id: 'firstbase', name: 'Firstbase', desc: 'تأسيس عالمي', url: 'https://shortet.com/firstbase', partnered: true },
    { id: '1office-uk', name: '1office', desc: 'بريطانيا + إستونيا + شمال أوروبا', url: 'https://shortet.com/1office', partnered: true },
  ],
  eu: [
    { id: '1office-ee', name: 'إستونيا (1office)', desc: 'شركة أوروبية عبر e-Residency', url: 'https://shortet.com/1office', partnered: true },
    { id: '1office-fi', name: 'فنلندا (1office)', desc: 'تأسيس شركة أوروبية', url: 'https://shortet.com/1office', partnered: true },
    { id: '1office-se', name: 'السويد (1office)', desc: 'تأسيس شركة أوروبية', url: 'https://shortet.com/1office', partnered: true },
    { id: '1office-lv', name: 'لاتفيا (1office)', desc: 'تأسيس شركة أوروبية', url: 'https://shortet.com/1office', partnered: true },
    { id: '1office-lt', name: 'ليتوانيا (1office)', desc: 'تأسيس شركة أوروبية', url: 'https://shortet.com/1office', partnered: true },
    { id: '1office-ie', name: 'أيرلندا (1office)', desc: 'شركة أوروبية ناطقة بالإنجليزية', url: 'https://shortet.com/1office', partnered: true },
  ],
  banking: [
    { id: 'mercury', name: 'Mercury', desc: 'بنك أمريكي بدون رسوم — جاهز Stripe', url: 'https://shortet.com/Mercury', partnered: true },
    { id: 'wise', name: 'Wise', desc: 'بنك متعدد العملات (USD/EUR/GBP)', url: 'https://shortet.com/Wise', partnered: true },
    { id: 'worldfirst', name: 'WorldFirst', desc: 'بنك أعمال عالمي', url: 'https://shortet.com/Worldfirst', partnered: true },
    { id: 'kast', name: 'Kast', desc: 'حساب USD مجاني + بطاقة افتراضية', url: 'https://shortet.com/Kast', partnered: true },
    { id: 'grey', name: 'Grey', desc: 'بنك عالمي شامل', url: 'https://shortet.com/Grey', partnered: true },
    { id: 'airtm', name: 'Airtm', desc: 'محفظة رقمية (تدعم MENA)', url: 'https://shortet.com/airtm', partnered: true },
    { id: 'redotpay', name: 'RedotPay', desc: 'محفظة مرتبطة بالكريبتو', url: 'https://shortet.com/RedotPay', partnered: true },
    { id: 'bybit', name: 'ByBit', desc: 'منصة كريبتو + P2P', url: 'https://shortet.com/bybit', partnered: true },
  ],
  payment: [
    { id: 'pay-wise', name: 'Wise', desc: 'استقبال متعدد العملات لمدفوعات Stripe', url: 'https://shortet.com/Wise', partnered: true },
    { id: 'pay-mercury', name: 'Mercury', desc: 'حساب أمريكي لاستقبال Stripe', url: 'https://shortet.com/Mercury', partnered: true },
    { id: 'pay-worldfirst', name: 'WorldFirst', desc: 'استقبال مدفوعات عالمية', url: 'https://shortet.com/Worldfirst', partnered: true },
    { id: 'pay-kast', name: 'Kast', desc: 'بطاقة USD لدفع SaaS والإعلانات', url: 'https://shortet.com/Kast', partnered: true },
    { id: 'stripe', name: 'Stripe', desc: 'بوابة الدفع العالمية الأساسية (+135 عملة)', url: 'https://stripe.com', partnered: false },
    { id: 'shopify-payments', name: 'Shopify Payments', desc: 'بوابة مدمجة لمتاجر Shopify', url: 'https://www.shopify.com/payments', partnered: false },
    { id: 'paypal', name: 'PayPal Business', desc: 'ثقة المشتري + دفع عالمي', url: 'https://www.paypal.com/business', partnered: false },
    { id: 'lemonsqueezy', name: 'LemonSqueezy', desc: 'تاجر مسجَّل للمنتجات الرقمية', url: 'https://www.lemonsqueezy.com', partnered: false },
    { id: 'paddle', name: 'Paddle', desc: 'تاجر مسجَّل لـ SaaS (يتولى ضرائب VAT)', url: 'https://www.paddle.com', partnered: false },
  ],
  telecom: [
    { id: 'airalo', name: 'Airalo', desc: 'eSIM للسفر — خصم €3 على أول شراء', url: 'https://shortet.com/airalo', partnered: true },
    { id: 'bnesim', name: 'Bnesim', desc: 'eSIM في أي وقت ومكان', url: 'https://shortet.com/Bnesim', partnered: true },
    { id: 'esim-me', name: 'esim.me', desc: 'خدمة eSIM عالمية', url: 'https://shortet.com/esim', partnered: true },
    { id: 'smsfast', name: 'SMS Fast', desc: 'أرقام افتراضية + eSIM', url: 'https://shortet.com/smsfast', partnered: true },
  ],
};

export const blogPartnerCatalogs: Record<LocaleCode, PartnerCatalog> = {
  en: partnerCatalogEN,
  ar: partnerCatalogAR,
};

export const CATEGORY_LABELS: Record<LocaleCode, Record<PartnerCategoryKey, string>> = {
  en: {
    formation: 'Company Formation',
    uk: 'UK Formation',
    eu: 'EU Formation',
    banking: 'Banking & Wallets',
    payment: 'Payment Gateways',
    telecom: 'Telecom & eSIM',
  },
  ar: {
    formation: 'تأسيس الشركات',
    uk: 'تأسيس بريطانيا',
    eu: 'تأسيس أوروبا',
    banking: 'البنوك والمحافظ',
    payment: 'بوابات الدفع',
    telecom: 'الاتصالات وeSIM',
  },
};
