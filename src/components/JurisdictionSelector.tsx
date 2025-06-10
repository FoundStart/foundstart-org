
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, ArrowRight } from 'lucide-react';

interface Jurisdiction {
  id: string;
  name: string;
  flag: string;
  timeframe: string;
  cost: string;
  benefits: string[];
  popular?: boolean;
}

const JurisdictionSelector = () => {
  const [selectedJurisdiction, setSelectedJurisdiction] = useState<string>('usa');

  const jurisdictions: Jurisdiction[] = [
    {
      id: 'usa',
      name: 'United States',
      flag: '🇺🇸',
      timeframe: '1-3 business days',
      cost: 'From $299',
      benefits: [
        'Delaware LLC formation',
        'EIN number included',
        'Registered agent service',
        'Global business credibility',
        'Access to US banking',
        'Stripe integration ready'
      ],
      popular: true
    },
    {
      id: 'uk',
      name: 'United Kingdom',
      flag: '🇬🇧',
      timeframe: '24-48 hours',
      cost: 'From £199',
      benefits: [
        'Companies House registration',
        'UTR number application',
        'London business address',
        'EU market access',
        'Strong legal framework',
        'Fintech-friendly'
      ]
    },
    {
      id: 'canada',
      name: 'Canada',
      flag: '🇨🇦',
      timeframe: '2-5 business days',
      cost: 'From CAD $399',
      benefits: [
        'Federal incorporation',
        'Business number (BN)',
        'Toronto registered office',
        'USMCA trade benefits',
        'Stable banking system',
        'Innovation incentives'
      ]
    }
  ];

  return (
    <section id="jurisdictions" className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/30">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl md:text-4xl font-bold">
            Choose Your <span className="gradient-text">Jurisdiction</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Each jurisdiction offers unique advantages. Select the one that best fits 
            your business goals and target markets.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {jurisdictions.map((jurisdiction) => (
            <Card
              key={jurisdiction.id}
              className={`cursor-pointer transition-all duration-300 hover:shadow-xl relative ${
                selectedJurisdiction === jurisdiction.id
                  ? 'ring-2 ring-primary shadow-lg scale-105'
                  : 'hover:scale-102'
              }`}
              onClick={() => setSelectedJurisdiction(jurisdiction.id)}
            >
              {jurisdiction.popular && (
                <Badge className="absolute -top-2 left-1/2 transform -translate-x-1/2 bg-primary">
                  Most Popular
                </Badge>
              )}
              
              <CardHeader className="text-center pb-4">
                <div className="text-6xl mb-4">{jurisdiction.flag}</div>
                <CardTitle className="text-2xl">{jurisdiction.name}</CardTitle>
                <div className="space-y-2">
                  <div className="text-3xl font-bold gradient-text">{jurisdiction.cost}</div>
                  <div className="text-sm text-muted-foreground">{jurisdiction.timeframe}</div>
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                <div className="space-y-3">
                  {jurisdiction.benefits.map((benefit, index) => (
                    <div key={index} className="flex items-start space-x-2">
                      <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">{benefit}</span>
                    </div>
                  ))}
                </div>

                {selectedJurisdiction === jurisdiction.id && (
                  <Button className="w-full mt-6 group animate-fade-in">
                    Start in {jurisdiction.name}
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <p className="text-muted-foreground mb-4">
            Not sure which jurisdiction is right for you?
          </p>
          <Button variant="outline" size="lg">
            Talk to Our Experts
          </Button>
        </div>
      </div>
    </section>
  );
};

export default JurisdictionSelector;
