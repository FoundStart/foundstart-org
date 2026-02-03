// Pricing Calculator Data - Formation costs by country, entity type, and add-ons

export interface EntityType {
  id: string;
  name: string;
  description: string;
  basePrice: number;
}

export interface AddOn {
  id: string;
  name: string;
  description: string;
  price: number;
  popular?: boolean;
}

export interface CountryPricing {
  countryId: string;
  countryName: string;
  flag: string;
  currency: string;
  currencySymbol: string;
  entityTypes: EntityType[];
  addOns: AddOn[];
}

export const pricingData: CountryPricing[] = [
  {
    countryId: 'USA',
    countryName: 'United States',
    flag: '🇺🇸',
    currency: 'USD',
    currencySymbol: '$',
    entityTypes: [
      { id: 'llc', name: 'LLC', description: 'Limited Liability Company - Most popular for small businesses', basePrice: 299 },
      { id: 'c_corp', name: 'C-Corporation', description: 'Best for raising investment and going public', basePrice: 399 },
      { id: 's_corp', name: 'S-Corporation', description: 'Tax advantages for qualifying US shareholders', basePrice: 449 },
    ],
    addOns: [
      { id: 'ein', name: 'EIN/Tax ID', description: 'Federal Employer Identification Number', price: 99, popular: true },
      { id: 'registered_agent', name: 'Registered Agent (1 Year)', description: 'Required for all US companies', price: 149, popular: true },
      { id: 'operating_agreement', name: 'Operating Agreement', description: 'Custom drafted legal document', price: 79 },
      { id: 'banking_assistance', name: 'US Bank Account Setup', description: 'Assistance with Mercury, Relay, or other banks', price: 199, popular: true },
      { id: 'virtual_address', name: 'Virtual Business Address', description: 'Professional US business address', price: 99 },
      { id: 'annual_report', name: 'Annual Report Filing', description: 'State compliance filing service', price: 149 },
      { id: 'itin', name: 'ITIN Application', description: 'Individual Tax ID for non-US residents', price: 299 },
      { id: 'bookkeeping', name: 'Monthly Bookkeeping', description: 'Professional accounting services', price: 199 },
    ]
  },
  {
    countryId: 'UK',
    countryName: 'United Kingdom',
    flag: '🇬🇧',
    currency: 'GBP',
    currencySymbol: '£',
    entityTypes: [
      { id: 'ltd', name: 'Private Limited Company (LTD)', description: 'Most common UK business structure', basePrice: 199 },
      { id: 'llp', name: 'Limited Liability Partnership', description: 'For professional services firms', basePrice: 299 },
    ],
    addOns: [
      { id: 'registered_office', name: 'Registered Office Address', description: 'London business address', price: 79, popular: true },
      { id: 'director_service', name: 'Director Service Address', description: 'Privacy protection for directors', price: 59 },
      { id: 'bank_account', name: 'UK Bank Account Setup', description: 'Assistance with Tide, Starling, or Wise', price: 149, popular: true },
      { id: 'vat_registration', name: 'VAT Registration', description: 'Register for UK Value Added Tax', price: 99 },
      { id: 'confirmation_statement', name: 'Confirmation Statement Filing', description: 'Annual compliance filing', price: 49 },
      { id: 'accounting_package', name: 'Accounting Package (1 Year)', description: 'Full accounting and tax filing', price: 499, popular: true },
    ]
  },
  {
    countryId: 'EE',
    countryName: 'Estonia',
    flag: '🇪🇪',
    currency: 'EUR',
    currencySymbol: '€',
    entityTypes: [
      { id: 'ou', name: 'OÜ (Private Limited)', description: 'Estonian private limited company', basePrice: 300 },
    ],
    addOns: [
      { id: 'e_residency', name: 'e-Residency Application Support', description: 'Help with digital ID application', price: 149, popular: true },
      { id: 'virtual_office', name: 'Virtual Office Address', description: 'Estonian business address', price: 99, popular: true },
      { id: 'bank_account', name: 'Estonian Bank Account', description: 'LHV or other Estonian bank setup', price: 199 },
      { id: 'accounting', name: 'Annual Accounting', description: 'Estonian accounting compliance', price: 299, popular: true },
      { id: 'legal_address', name: 'Legal Address Service', description: 'Required registered address', price: 79 },
    ]
  },
  {
    countryId: 'FI',
    countryName: 'Finland',
    flag: '🇫🇮',
    currency: 'EUR',
    currencySymbol: '€',
    entityTypes: [
      { id: 'oy', name: 'Oy (Private Limited)', description: 'Finnish limited liability company', basePrice: 350 },
    ],
    addOns: [
      { id: 'trade_register', name: 'Trade Register Filing', description: 'Official company registration', price: 99 },
      { id: 'virtual_office', name: 'Virtual Office Helsinki', description: 'Premium Finnish business address', price: 149, popular: true },
      { id: 'bank_account', name: 'Finnish Bank Account', description: 'Nordea or OP bank setup', price: 199, popular: true },
      { id: 'vat_registration', name: 'VAT Registration', description: 'Finnish VAT number', price: 79 },
      { id: 'accounting', name: 'Annual Accounting', description: 'Finnish accounting compliance', price: 399, popular: true },
    ]
  },
  {
    countryId: 'SE',
    countryName: 'Sweden',
    flag: '🇸🇪',
    currency: 'SEK',
    currencySymbol: 'kr',
    entityTypes: [
      { id: 'ab', name: 'Aktiebolag (AB)', description: 'Swedish limited company', basePrice: 3500 },
    ],
    addOns: [
      { id: 'bolagsverket', name: 'Bolagsverket Registration', description: 'Companies Registration Office filing', price: 500 },
      { id: 'virtual_office', name: 'Virtual Office Stockholm', description: 'Swedish business address', price: 800, popular: true },
      { id: 'bank_account', name: 'Swedish Bank Account', description: 'Swedbank or SEB setup', price: 1500, popular: true },
      { id: 'accounting', name: 'Annual Accounting', description: 'Swedish accounting compliance', price: 4000, popular: true },
      { id: 'f_tax', name: 'F-Tax Registration', description: 'Swedish tax registration', price: 500 },
    ]
  },
  {
    countryId: 'LV',
    countryName: 'Latvia',
    flag: '🇱🇻',
    currency: 'EUR',
    currencySymbol: '€',
    entityTypes: [
      { id: 'sia', name: 'SIA (Limited Liability)', description: 'Latvian limited liability company', basePrice: 250 },
    ],
    addOns: [
      { id: 'legal_address', name: 'Legal Address Service', description: 'Riga business address', price: 79, popular: true },
      { id: 'bank_account', name: 'Latvian Bank Account', description: 'Local bank account setup', price: 199, popular: true },
      { id: 'vat_registration', name: 'VAT Registration', description: 'EU VAT number', price: 99 },
      { id: 'accounting', name: 'Annual Accounting', description: 'Latvian accounting compliance', price: 249, popular: true },
    ]
  },
  {
    countryId: 'LT',
    countryName: 'Lithuania',
    flag: '🇱🇹',
    currency: 'EUR',
    currencySymbol: '€',
    entityTypes: [
      { id: 'uab', name: 'UAB (Private Limited)', description: 'Lithuanian private limited company', basePrice: 280 },
    ],
    addOns: [
      { id: 'legal_address', name: 'Legal Address Service', description: 'Vilnius business address', price: 69, popular: true },
      { id: 'bank_account', name: 'Lithuanian Bank Account', description: 'Local or EMI account setup', price: 179, popular: true },
      { id: 'vat_registration', name: 'VAT Registration', description: 'EU VAT number', price: 89 },
      { id: 'accounting', name: 'Annual Accounting', description: 'Lithuanian accounting compliance', price: 229, popular: true },
    ]
  },
  {
    countryId: 'CA',
    countryName: 'Canada',
    flag: '🇨🇦',
    currency: 'CAD',
    currencySymbol: 'C$',
    entityTypes: [
      { id: 'corporation', name: 'Federal Corporation', description: 'Canada-wide business operations', basePrice: 399 },
      { id: 'provincial', name: 'Provincial Corporation', description: 'Province-specific operations', basePrice: 349 },
    ],
    addOns: [
      { id: 'business_number', name: 'Business Number (BN)', description: 'CRA Business Number', price: 99, popular: true },
      { id: 'gst_hst', name: 'GST/HST Registration', description: 'Sales tax registration', price: 79 },
      { id: 'virtual_office', name: 'Virtual Office', description: 'Canadian business address', price: 149, popular: true },
      { id: 'bank_account', name: 'Canadian Bank Account', description: 'TD, RBC, or digital bank setup', price: 199, popular: true },
      { id: 'annual_return', name: 'Annual Return Filing', description: 'Corporate compliance filing', price: 99 },
    ]
  },
  {
    countryId: 'EG',
    countryName: 'Egypt',
    flag: '🇪🇬',
    currency: 'EGP',
    currencySymbol: 'EGP',
    entityTypes: [
      { id: 'llc_eg', name: 'Limited Liability Company', description: 'Most flexible structure for foreign investors', basePrice: 12500 },
      { id: 'jsc', name: 'Joint Stock Company (SAE)', description: 'For larger enterprises and public offerings', basePrice: 25000 },
      { id: 'branch', name: 'Branch Office', description: 'Extension of foreign parent company', basePrice: 15000 },
      { id: 'rep_office', name: 'Representative Office', description: 'For market research and liaison', basePrice: 8000 },
    ],
    addOns: [
      { id: 'commercial_register', name: 'Commercial Register', description: 'Official company registration', price: 2500, popular: true },
      { id: 'tax_card', name: 'Tax Card', description: 'Egyptian tax registration', price: 1500, popular: true },
      { id: 'vat_registration', name: 'VAT Registration', description: 'Value Added Tax registration', price: 2000 },
      { id: 'social_insurance', name: 'Social Insurance Registration', description: 'Required for hiring employees', price: 1500 },
      { id: 'import_license', name: 'Import/Export License', description: 'For trading companies', price: 5000 },
      { id: 'bank_account', name: 'Corporate Bank Account', description: 'Egyptian bank account setup', price: 3000, popular: true },
      { id: 'virtual_office', name: 'Virtual Office Cairo', description: 'Premium business address', price: 4000 },
      { id: 'legal_retainer', name: 'Legal Retainer (1 Year)', description: 'Ongoing legal support', price: 12000 },
    ]
  },
];

// Get all available countries
export const getCountries = () => pricingData.map(c => ({
  id: c.countryId,
  name: c.countryName,
  flag: c.flag,
  currency: c.currency,
  currencySymbol: c.currencySymbol,
}));

// Get pricing for a specific country
export const getCountryPricing = (countryId: string) => 
  pricingData.find(c => c.countryId === countryId);

// Calculate total price
export const calculateTotal = (
  countryId: string,
  entityTypeId: string,
  selectedAddOnIds: string[]
): { total: number; currency: string; currencySymbol: string } | null => {
  const countryPricing = getCountryPricing(countryId);
  if (!countryPricing) return null;

  const entityType = countryPricing.entityTypes.find(e => e.id === entityTypeId);
  if (!entityType) return null;

  const basePrice = entityType.basePrice;
  const addOnsTotal = countryPricing.addOns
    .filter(a => selectedAddOnIds.includes(a.id))
    .reduce((sum, addon) => sum + addon.price, 0);

  return {
    total: basePrice + addOnsTotal,
    currency: countryPricing.currency,
    currencySymbol: countryPricing.currencySymbol,
  };
};
