
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle } from 'lucide-react';

interface JurisdictionInfo {
  flag: string;
  name: string;
  price: string;
  timeframe: string;
  benefits: string[];
}

interface JurisdictionOverviewProps {
  jurisdictions: JurisdictionInfo[];
}

const JurisdictionOverview = ({ jurisdictions }: JurisdictionOverviewProps) => {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
      {jurisdictions.map((jurisdiction, index) => (
        <Card key={index} className="text-center hover:shadow-lg transition-all duration-300">
          <CardHeader>
            <div className="text-4xl mb-4">{jurisdiction.flag}</div>
            <CardTitle className="text-lg">{jurisdiction.name}</CardTitle>
            <div className="space-y-2">
              <div className="text-xl font-bold gradient-text">{jurisdiction.price}</div>
              <div className="text-sm text-muted-foreground">{jurisdiction.timeframe}</div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {jurisdiction.benefits.map((benefit, idx) => (
                <div key={idx} className="flex items-center space-x-2 text-sm">
                  <CheckCircle className="w-3 h-3 text-green-500" />
                  <span>{benefit}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default JurisdictionOverview;
