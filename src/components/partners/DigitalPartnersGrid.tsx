
import PartnerCard from '@/components/partners/PartnerCard';

interface Partner {
  category: string;
  platform: string;
  url: string;
  niche: string;
}

interface DigitalPartnersGridProps {
  partners: Partner[];
}

const DigitalPartnersGrid = ({ partners }: DigitalPartnersGridProps) => {
  if (partners.length === 0) {
    return (
      <div className="text-center py-12 animate-fade-in">
        <p className="text-muted-foreground">No partners found matching your criteria.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {partners.map((partner, index) => (
        <div
          key={index}
          className="animate-scale-in hover-scale"
          style={{ animationDelay: `${index * 50}ms` }}
        >
          <PartnerCard partner={partner} />
        </div>
      ))}
    </div>
  );
};

export default DigitalPartnersGrid;
