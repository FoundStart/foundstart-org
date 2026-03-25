
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

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

interface CountryCardProps {
  country: Country;
  onClick: () => void;
}

const CountryCard = ({ country, onClick }: CountryCardProps) => {
  return (
    <Card className="text-center hover:shadow-lg transition-all duration-300 cursor-pointer" onClick={onClick}>
      <CardHeader>
        <div className="text-4xl mb-2">{country.flag}</div>
        <CardTitle className="text-lg">{country.name}</CardTitle>
        <div className="text-primary font-semibold">{country.price}</div>
        <div className="text-sm text-muted-foreground">{country.timeframe}</div>
      </CardHeader>
      <CardContent>
        <Badge variant="outline" className="mb-4">
          {country.partners.length} Partner{country.partners.length > 1 ? 's' : ''}
        </Badge>
        <Button variant="outline" size="sm" className="w-full" onClick={(e) => { e.stopPropagation(); onClick(); }}>
          Learn More
        </Button>
      </CardContent>
    </Card>
  );
};

export default CountryCard;
