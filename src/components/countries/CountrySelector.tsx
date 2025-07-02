
import { Button } from '@/components/ui/button';

interface Country {
  id: string;
  flag: string;
  name: string;
  price: string;
  timeframe: string;
  currency: string;
  description: string;
  benefits: string[];
  partners: string[];
  keyStats: {
    gdp: string;
    population: string;
    easeOfBusiness: string;
    corporateTax: string;
  };
}

interface CountrySelectorProps {
  countries: Country[];
  selectedCountry: string;
  onCountrySelect: (countryId: string) => void;
}

const CountrySelector = ({ countries, selectedCountry, onCountrySelect }: CountrySelectorProps) => {
  return (
    <div className="flex flex-wrap justify-center gap-4 mb-12">
      {countries.map((country) => (
        <Button
          key={country.id}
          variant={selectedCountry === country.id ? "default" : "outline"}
          size="lg"
          onClick={() => onCountrySelect(country.id)}
          className="flex items-center space-x-2"
        >
          <span className="text-xl">{country.flag}</span>
          <span>{country.name}</span>
        </Button>
      ))}
    </div>
  );
};

export default CountrySelector;
