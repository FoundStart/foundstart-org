
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, ArrowRight, DollarSign, Clock, Globe } from 'lucide-react';

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

interface CountryDetailsProps {
  country: Country;
}

const CountryDetails = ({ country }: CountryDetailsProps) => {
  return (
    <div className="grid lg:grid-cols-2 gap-12 mb-16">
      <Card className="p-8">
        <CardHeader className="text-center pb-6">
          <div className="text-6xl mb-4">{country.flag}</div>
          <CardTitle className="text-3xl mb-2">{country.name}</CardTitle>
          <div className="flex items-center justify-center space-x-4">
            <Badge variant="secondary" className="text-lg px-4 py-2">
              <DollarSign className="w-4 h-4 mr-1" />
              {country.price}
            </Badge>
            <Badge variant="secondary" className="text-lg px-4 py-2">
              <Clock className="w-4 h-4 mr-1" />
              {country.timeframe}
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground mb-6 text-lg">
            {country.description}
          </p>
          
          <div className="space-y-4">
            <h4 className="font-semibold text-lg">Key Statistics</h4>
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-3 bg-muted/50 rounded-lg">
                <div className="font-semibold">GDP</div>
                <div className="text-sm text-muted-foreground">{country.keyStats.gdp}</div>
              </div>
              <div className="text-center p-3 bg-muted/50 rounded-lg">
                <div className="font-semibold">Population</div>
                <div className="text-sm text-muted-foreground">{country.keyStats.population}</div>
              </div>
              <div className="text-center p-3 bg-muted/50 rounded-lg">
                <div className="font-semibold">Business Rank</div>
                <div className="text-sm text-muted-foreground">{country.keyStats.easeOfBusiness}</div>
              </div>
              <div className="text-center p-3 bg-muted/50 rounded-lg">
                <div className="font-semibold">Corporate Tax</div>
                <div className="text-sm text-muted-foreground">{country.keyStats.corporateTax}</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="space-y-6">
        <Card className="p-6">
          <h4 className="font-semibold text-lg mb-4 flex items-center">
            <CheckCircle className="w-5 h-5 mr-2 text-green-500" />
            Key Benefits
          </h4>
          <div className="grid gap-3">
            {country.benefits.map((benefit, idx) => (
              <div key={idx} className="flex items-center space-x-3">
                <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                <span className="text-sm">{benefit}</span>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-6">
          <h4 className="font-semibold text-lg mb-4 flex items-center">
            <Globe className="w-5 h-5 mr-2 text-primary" />
            Trusted Partners
          </h4>
          <div className="flex flex-wrap gap-2">
            {country.partners.map((partner, idx) => (
              <Badge key={idx} variant="outline">{partner}</Badge>
            ))}
          </div>
        </Card>

        <Button size="lg" className="w-full group">
          Start in {country.name}
          <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
        </Button>
      </div>
    </div>
  );
};

export default CountryDetails;
