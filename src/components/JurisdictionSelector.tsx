
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, ArrowRight, ExternalLink } from 'lucide-react';

interface Jurisdiction {
  id: string;
  name: string;
  flag: string;
  timeframe: string;
  cost: string;
  benefits: string[];
  popular?: boolean;
}

interface Partner {
  category: string;
  details: string;
  platform: string;
  url: string;
}

const JurisdictionSelector = () => {
  const [selectedJurisdiction, setSelectedJurisdiction] = useState<string>('usa');
  const [serviceType, setServiceType] = useState<'partners' | 'foundstart'>('foundstart');

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

  const partners: Partner[] = [
    { category: 'Company Formation', details: '(UK-USA-CA) company Establish', platform: 'Privatily', url: 'https://privatily.com/ref/Deeemoz/' },
    { category: 'Company Formation', details: 'UK company Establish', platform: 'Firstbase', url: 'https://firstbase.pxf.io/RGaDzX' },
    { category: 'Company Formation', details: 'UK company Establish', platform: '1stFormations', url: 'https://1st-formations-limited.sjv.io/4GKB30' },
    { category: 'Company Formation', details: 'USA company Establish', platform: 'ITIN', url: 'https://theitin.com/ref/80' },
    { category: 'Company Formation', details: 'USA company Establish', platform: 'Clemta', url: 'https://clemta.com/?ref=njbhzwf' },
    { category: 'Company Formation', details: 'USA company Establish', platform: 'Startglobal', url: 'http://startglobal.co/?via=mohamed-sayed' },
    { category: 'Finance', details: 'Payment Gateway', platform: 'Stripe', url: 'https://stripe.com' },
    { category: 'Finance', details: 'USA Bank', platform: 'Mercury', url: 'https://mercury.com/r/deeemoz-llc' },
    { category: 'Telecommunications', details: 'eSIM Telecommunication', platform: 'Bnesim', url: 'https://bnes.im/PHV3' },
    { category: 'Telecommunications', details: 'eSIM Telecommunication', platform: 'esim me', url: 'https://esim.me/esim-me-card-for-android?tracking=uNTexiT4sVLlxvvReENXMkAuUAMnyL60fRxBqMvmfSfUMUYCd6vNYXOsTKfmyWtB' }
  ];

  return (
    <section id="jurisdictions" className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/30">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl md:text-4xl font-bold">
            Choose Your <span className="gradient-text">Formation Path</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Two ways to start your business: Quick setup through our trusted partners 
            or comprehensive service through FoundStart with AI guidance.
          </p>
        </div>

        {/* Service Type Toggle */}
        <div className="flex justify-center mb-12">
          <div className="bg-card rounded-lg p-1 flex">
            <Button
              variant={serviceType === 'partners' ? 'default' : 'ghost'}
              onClick={() => setServiceType('partners')}
              className="px-6 py-2"
            >
              Quick Setup (Partners)
            </Button>
            <Button
              variant={serviceType === 'foundstart' ? 'default' : 'ghost'}
              onClick={() => setServiceType('foundstart')}
              className="px-6 py-2"
            >
              Full Service (FoundStart)
            </Button>
          </div>
        </div>

        {serviceType === 'foundstart' ? (
          // Original jurisdiction selection
          <>
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
                        Start with FoundStart
                        <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </>
        ) : (
          // Partner links section
          <div className="space-y-8">
            <div className="text-center">
              <h3 className="text-2xl font-semibold mb-4">Trusted Formation Partners</h3>
              <p className="text-muted-foreground mb-8">
                Get started quickly with our vetted partners. Click any link to begin your formation process.
              </p>
            </div>

            {['Company Formation', 'Finance', 'Telecommunications'].map((category) => (
              <div key={category}>
                <h4 className="text-xl font-semibold mb-4 gradient-text">{category}</h4>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
                  {partners
                    .filter(partner => partner.category === category)
                    .map((partner, index) => (
                      <Card key={index} className="hover:shadow-lg transition-all duration-300">
                        <CardContent className="p-4">
                          <div className="flex justify-between items-start mb-2">
                            <h5 className="font-semibold">{partner.platform}</h5>
                            <ExternalLink className="w-4 h-4 text-muted-foreground" />
                          </div>
                          <p className="text-sm text-muted-foreground mb-3">{partner.details}</p>
                          <Button 
                            onClick={() => window.open(partner.url, '_blank')}
                            className="w-full"
                            size="sm"
                          >
                            Visit {partner.platform}
                          </Button>
                        </CardContent>
                      </Card>
                    ))}
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="text-center">
          <p className="text-muted-foreground mb-4">
            Need help choosing the right option for your business?
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
