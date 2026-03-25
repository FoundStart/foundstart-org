
import CountryCard from './CountryCard';

interface Partner {
  name: string;
  url: string;
  videoUrl?: string;
}

interface Country {
  id: string;
  flag: string;
  name: string;
  price: string;
  timeframe: string;
  partners: Partner[];
}

interface CountryGridProps {
  countries: Country[];
  onCountrySelect: (countryId: string) => void;
}

const CountryGrid = ({ countries, onCountrySelect }: CountryGridProps) => {
  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold text-center">All Supported Countries</h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {countries.map((country) => (
          <CountryCard key={country.id} country={country} onClick={() => onCountrySelect(country.id)} />
        ))}
      </div>
    </div>
  );
};

export default CountryGrid;
