
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface DigitalPartnersFiltersProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  categories: string[];
}

const DigitalPartnersFilters = ({
  searchTerm,
  setSearchTerm,
  selectedCategory,
  setSelectedCategory,
  categories
}: DigitalPartnersFiltersProps) => {
  return (
    <div className="mb-8 space-y-4 animate-slide-in">
      <div className="flex flex-col md:flex-row gap-4">
        <Input
          placeholder="Search partners..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-1 hover-scale"
        />
      </div>
      
      <div className="flex flex-wrap gap-2">
        {categories.map(category => (
          <Button
            key={category}
            variant={selectedCategory === category ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedCategory(category)}
            className="hover-scale"
          >
            {category}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default DigitalPartnersFilters;
