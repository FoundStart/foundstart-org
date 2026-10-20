import { formationCountries } from './formationCatalog';

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

// Derived from the formation catalog so the calculator always matches the dashboard and checkout.
// No add-ons: the order is the formation service fee only (USD).
export const pricingData: CountryPricing[] = formationCountries.map((c) => ({
  countryId: c.code.toUpperCase(),
  countryName: c.name,
  flag: c.flag,
  currency: 'USD',
  currencySymbol: '$',
  entityTypes: c.entities.map((e) => ({
    id: e.code,
    name: e.name,
    description: e.localName ? e.localName : (e.requirements[0] ?? ''),
    basePrice: e.price,
  })),
  addOns: [],
}));

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
