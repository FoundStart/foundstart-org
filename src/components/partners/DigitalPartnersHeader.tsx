
import { Badge } from '@/components/ui/badge';

interface DigitalPartnersHeaderProps {
  filteredPartnersCount: number;
}

const DigitalPartnersHeader = ({ filteredPartnersCount }: DigitalPartnersHeaderProps) => {
  return (
    <div className="text-center space-y-4 mb-16 animate-fade-in">
      <h1 className="text-3xl md:text-4xl font-bold">
        Digital <span className="gradient-text">Partners</span>
      </h1>
      <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
        Discover 375+ trusted partners across all business categories to help grow your venture.
      </p>
      <Badge variant="outline" className="text-lg px-4 py-2 animate-pulse">
        {filteredPartnersCount} Partners Found
      </Badge>
    </div>
  );
};

export default DigitalPartnersHeader;
