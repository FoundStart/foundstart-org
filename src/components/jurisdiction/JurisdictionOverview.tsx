
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';

interface JurisdictionInfo {
  flag: string;
  name: string;
  description: string;
  timeframe: string;
  partners: number;
  price: string;
  benefits: string[];
}

interface JurisdictionOverviewProps {
  jurisdictions: JurisdictionInfo[];
}

const JurisdictionOverview = ({ jurisdictions }: JurisdictionOverviewProps) => {
  const getPartnerLink = (countryName: string) => {
    // Map countries to their primary partner links
    const partnerLinks: { [key: string]: string } = {
      'USA': 'https://privatily.com/ref/Deeemoz/',
      'UK': 'https://privatily.com/ref/Deeemoz/',
      'Canada': 'https://privatily.com/ref/Deeemoz/',
      'Estonia': 'https://my1office.co/en/company/register?ref=mdzknzu',
      'Finland': 'https://my1office.co/en/company/register?ref=mdzknzu',
      'Sweden': 'https://my1office.co/en/company/register?ref=mdzknzu',
      'Latvia': 'https://my1office.co/en/company/register?ref=mdzknzu',
      'Lithuania': 'https://my1office.co/en/company/register?ref=mdzknzu',
      'Egypt': '/contact-sales'
    };
    return partnerLinks[countryName] || '/partners';
  };

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
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
            <div className="space-y-2 mb-4">
              {jurisdiction.benefits.map((benefit, idx) => (
                <div key={idx} className="flex items-center space-x-2 text-sm">
                  <CheckCircle className="w-3 h-3 text-green-500" />
                  <span>{benefit}</span>
                </div>
              ))}
            </div>
            <Button 
              className="w-full group mb-2" 
              onClick={() => {
                const link = getPartnerLink(jurisdiction.name);
                if (link.startsWith('http')) {
                  window.open(link, '_blank');
                } else {
                  window.location.href = link;
                }
              }}
            >
              Start in {jurisdiction.name}
              <ExternalLink className="w-4 h-4 ml-2" />
            </Button>
            <Link to="/countries">
              <Button variant="outline" size="sm" className="w-full">
                Learn More
              </Button>
            </Link>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default JurisdictionOverview;
