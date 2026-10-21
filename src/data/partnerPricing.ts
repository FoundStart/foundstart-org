// Real, verified pricing from each partner's public pricing page (checked 2026-10-21).
// Only figures confirmed on the source page are listed; anything unverifiable is omitted.
export type PartnerPrice = { countryId: string; partner: string; source: string; en: string[]; ar: string[] };

export const partnerPricing: PartnerPrice[] = [
  { countryId: 'USA', partner: 'Doola', source: 'https://www.doola.com/pricing/',
    en: ['Starter $297/yr + state fees', 'Formation filed in 1-2 business days', 'Includes formation filings, EIN and a US business address'],
    ar: ['الباقة الأساسية $297/سنة + رسوم الولاية', 'التسجيل خلال 1-2 يوم عمل', 'يشمل أوراق التأسيس والرقم الضريبي EIN وعنوان أعمال أمريكي'] },
  { countryId: 'UK', partner: '1office', source: 'https://1office.co/uk/services/company-formation/',
    en: ['Essentials £119 + VAT + £100 state fee', 'Includes Companies House filing', 'Includes virtual London address and bank setup guidance'],
    ar: ['من £119 + ض.ق.م + رسوم حكومية £100', 'يشمل تسجيل Companies House', 'يشمل عنوان لندن افتراضي وإرشاد فتح حساب بنكي'] },
  { countryId: 'CA', partner: 'Privatily', source: 'https://privatilyinc.com/canada/',
    en: ['Pricing on request from Privatily'],
    ar: ['التسعير عند التواصل مع Privatily مباشرة'] },
  { countryId: 'EE', partner: '1office', source: 'https://1office.co/estonia/services/company-formation-estonia/',
    en: ['E-residents: €510 online (includes €265 state fee)', 'Online filing in 15 minutes; company within one working day', 'Includes virtual office and contact person for one year'],
    ar: ['للمقيمين الإلكترونيين: €510 أونلاين شاملة رسوم الدولة €265', 'التقديم أونلاين في 15 دقيقة والشركة خلال يوم عمل', 'يشمل مكتبا افتراضيا وشخص اتصال لمدة سنة'] },
  { countryId: 'FI', partner: '1office', source: 'https://1office.co/finland/services/company-formation/',
    en: ['Limited company (Oy) from €1,440 incl. filings', 'Registration usually takes 1-2 weeks', 'No minimum share capital required'],
    ar: ['شركة محدودة (Oy) من €1,440 شاملة التسجيلات', 'التسجيل عادة خلال 1-2 أسبوع', 'لا يوجد حد أدنى لرأس المال'] },
  { countryId: 'SE', partner: '1office', source: 'https://1office.co/sweden/product/ready-made-swedish-company-ab/',
    en: ['Ready-made AB 15,500 SEK (state fee included)', 'Minimum share capital 25,000 SEK', 'Registered to your name in 10-15 business days'],
    ar: ['شركة AB جاهزة 15,500 كرونة سويدية شاملة رسوم الدولة', 'رأس مال أدنى 25,000 كرونة', 'تسجل باسمك خلال 10-15 يوم عمل'] },
  { countryId: 'LV', partner: '1office', source: 'https://1office.co/latvia/product/company-formation-sia-in-notarys-office/',
    en: ['SIA formation at the notary €1,190', 'Includes state fee and notary fees', 'Registered within 5 business days of filing'],
    ar: ['تأسيس SIA عند كاتب العدل €1,190', 'يشمل رسوم الدولة والكاتب العدل', 'التسجيل خلال 5 أيام عمل من تقديم الأوراق'] },
  { countryId: 'LT', partner: '1office', source: 'https://1office.co/lithuania/services/company-formation/',
    en: ['UAB from €1,190 incl. state and notary fees', 'Formation in 5-10 working days', 'Minimum share capital €1,000 (25% before registration)'],
    ar: ['UAB من €1,190 شاملة رسوم الدولة والكاتب العدل', 'التأسيس خلال 5-10 أيام عمل', 'رأس مال أدنى €1,000 يدفع 25% منه قبل التسجيل'] },
  { countryId: 'IE', partner: '1office', source: 'https://1office.co/start-company-ireland/',
    en: ['From €900 + VAT, state fee included', 'Fully online registration with a local address', 'Final price by quote'],
    ar: ['من €900 + ض.ق.م ورسوم الدولة مشمولة', 'تسجيل أونلاين بالكامل مع عنوان محلي', 'السعر النهائي بعرض سعر'] },
];

export const getPartnerPricing = (countryId: string, partnerName: string): PartnerPrice | undefined =>
  partnerPricing.find((p) => p.countryId === countryId.toUpperCase() && p.partner === partnerName);
