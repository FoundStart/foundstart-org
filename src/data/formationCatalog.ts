// Formation catalog mirrored by the create-formation-order edge function (server is the source of truth for prices).
// Prices are FoundStart service fees in USD, set at the highest partner price per country + 25% (Oct 2026 research). Egypt confirmed by owner. Government/notary fees are separate and confirmed per order.
export interface FormationEntity {
  code: string;
  name: string;
  localName?: string;
  price: number;
  requirements: string[];
}

export interface FormationCountry {
  code: string;
  name: string;
  flag: string;
  note?: string;
  entities: FormationEntity[];
}

export const formationAddons = [
  { id: 'registered_agent', name: 'Registered Agent', price: 149, description: 'Required for most states' },
  { id: 'virtual_office', name: 'Virtual Office', price: 199, description: 'Professional business address' },
  { id: 'ein', name: 'EIN Registration', price: 99, description: 'Federal Tax ID number' },
  { id: 'bank_assist', name: 'Bank Account Assistance', price: 249, description: 'Help opening a business bank account' },
  { id: 'operating_agreement', name: 'Operating Agreement', price: 79, description: 'Custom legal document' },
];

export const formationCountries: FormationCountry[] = [
  {
    code: 'usa', name: 'United States', flag: '🇺🇸',
    entities: [
      { code: 'llc', name: 'LLC', price: 450, requirements: [
        'Valid passport or ID for each owner',
        'No US residency or citizenship required',
        'Registered agent in the formation state',
        'Operating agreement recommended',
      ] },
      { code: 'c_corp', name: 'C-Corporation', price: 550, requirements: [
        'Valid passport or ID for each founder',
        'No US residency or citizenship required',
        'Registered agent in the formation state',
        'Bylaws and initial board resolutions prepared for you',
      ] },
      { code: 's_corp', name: 'S-Corporation', price: 750, requirements: [
        'All shareholders must be US citizens or permanent residents',
        'Maximum 100 shareholders, one class of stock',
        'IRS Form 2553 election filed after formation',
        'Registered agent in the formation state',
      ] },
    ],
  },
  {
    code: 'uk', name: 'United Kingdom', flag: '🇬🇧',
    entities: [
      { code: 'ltd', name: 'LTD', price: 500, requirements: [
        'At least 1 director and 1 shareholder (can be the same person)',
        'Valid passport or ID',
        'UK registered office address (we can provide)',
        'No UK residency requirement',
      ] },
      { code: 'llp', name: 'LLP', price: 500, requirements: [
        'At least 2 designated members',
        'Valid passport or ID for each member',
        'UK registered office address (we can provide)',
        'LLP members agreement prepared for you',
      ] },
    ],
  },
  {
    code: 'ee', name: 'Estonia', flag: '🇪🇪',
    entities: [
      { code: 'ou', name: 'OÜ', price: 335, requirements: [
        'Valid passport',
        'Estonian e-Residency card, or notarized documents via power of attorney',
        'Estonian legal address and licensed contact person (we provide)',
        'Share capital can be deferred - no payment due at registration',
      ] },
    ],
  },
  {
    code: 'fi', name: 'Finland', flag: '🇫🇮',
    entities: [
      { code: 'oy', name: 'Oy', price: 530, requirements: [
        'Valid passport or ID',
        'Registered address in Finland (we can provide)',
        'At least 1 board member',
        'No minimum share capital',
      ] },
    ],
  },
  {
    code: 'se', name: 'Sweden', flag: '🇸🇪',
    entities: [
      { code: 'ab', name: 'AB', price: 575, requirements: [
        'Valid passport or ID',
        'Registered address in Sweden (we can provide)',
        'Minimum share capital SEK 25,000',
        'At least 1 board member',
      ] },
    ],
  },
  {
    code: 'lv', name: 'Latvia', flag: '🇱🇻',
    entities: [
      { code: 'sia', name: 'SIA', price: 1610, requirements: [
        'Valid passport or ID',
        'Legal address in Latvia (we can provide)',
        'At least 1 shareholder and 1 board member',
        'Share capital can be paid after registration in most cases',
      ] },
    ],
  },
  {
    code: 'lt', name: 'Lithuania', flag: '🇱🇹',
    entities: [
      { code: 'uab', name: 'UAB', price: 1610, requirements: [
        'Valid passport or ID',
        'Registered address in Lithuania (we can provide)',
        'At least 1 shareholder and 1 director',
        'Minimum share capital applies - confirmed in your quote',
      ] },
    ],
  },
  {
    code: 'ie', name: 'Ireland', flag: '🇮🇪',
    entities: [
      { code: 'ltd', name: 'LTD', price: 1215, requirements: [
        'At least 1 director and 1 company secretary',
        'EEA-resident director, or a surety bond (we arrange)',
        'Registered office in Ireland (we can provide)',
        'Valid passport or ID',
      ] },
    ],
  },
  {
    code: 'eg', name: 'Egypt', flag: '🇪🇬',
    note: 'Service fee in USD. Government, notary and GAFI fees are separate and confirmed in your quote before work starts.',
    entities: [
      { code: 'sole_est', name: 'Sole Establishment', localName: 'منشأة فردية', price: 249, requirements: [
        'Single natural person owner, 21+ with full legal capacity',
        'Valid national ID or passport',
        'Unlimited personal liability',
        'Capital paid in full at establishment',
      ] },
      { code: 'opc', name: 'One-Person Company', localName: 'شركة الشخص الواحد', price: 349, requirements: [
        'One founder (natural or legal person)',
        'Minimum capital EGP 1,000 in the commercial registry',
        'Bank certificate for the capital (refundable after incorporation)',
        'Valid national ID or passport',
      ] },
      { code: 'llc', name: 'Limited Liability Company', localName: 'شركة ذات مسئولية محدودة', price: 449, requirements: [
        '2 to 50 partners',
        'At least 1 Egyptian manager required',
        'Capital amount set by the partners',
        'Valid ID or passport for each partner',
      ] },
      { code: 'jsc', name: 'Joint Stock Company', localName: 'شركة مساهمة', price: 899, requirements: [
        'Minimum 3 founders (natural or legal persons)',
        'Minimum capital EGP 250,000 (10% paid at establishment)',
        'Board of directors with at least 3 members',
        'Valid ID or passport for each founder',
      ] },
      { code: 'branch', name: 'Branch of a Foreign Company', localName: 'فرع شركة أجنبية', price: 999, requirements: [
        'Legalized parent company documents',
        'GAFI registration and approval',
        'Egyptian branch manager',
        'Parent company board resolution to open the branch',
      ] },
      { code: 'rep_office', name: 'Representative Office', localName: 'مكتب تمثيل', price: 899, requirements: [
        'Legalized parent company documents',
        'GAFI approval',
        'Non-commercial activity only (market research, liaison)',
        'Local office address (we can provide)',
      ] },
      { code: 'free_zone', name: 'Free Zone Company', localName: 'شركة منطقة حرة', price: 1499, requirements: [
        'GAFI free zone approval',
        'Qualifying activity (export-oriented, logistics, industrial)',
        'Capital requirements set by the zone authority',
        'Valid ID or passport for each shareholder',
      ] },
    ],
  },
];

export const minPrice = (c: FormationCountry) => Math.min(...c.entities.map(e => e.price));
