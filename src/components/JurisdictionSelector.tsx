
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, ArrowRight, ExternalLink, Globe, CreditCard, Phone } from 'lucide-react';

interface Partner {
  category: string;
  details: string;
  platform: string;
  url: string;
}

const JurisdictionSelector = () => {
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

  const jurisdictionInfo = [
    {
      flag: '🇺🇸',
      name: 'United States',
      price: 'From $299',
      timeframe: '1-3 business days',
      benefits: [
        'Delaware LLC formation',
        'EIN number included',
        'Registered agent service',
        'Global business credibility',
        'Access to US banking',
        'Stripe integration ready'
      ]
    },
    {
      flag: '🇬🇧',
      name: 'United Kingdom',
      price: 'From £199',
      timeframe: '24-48 hours',
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
      flag: '🇨🇦',
      name: 'Canada',
      price: 'From CAD $399',
      timeframe: '2-5 business days',
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

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Company Formation':
        return Globe;
      case 'Finance':
        return CreditCard;
      case 'Telecommunications':
        return Phone;
      default:
        return Globe;
    }
  };

  return (
    <section id="partner-links" className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/30">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl md:text-4xl font-bold">
            <span className="gradient-text">Option 1:</span> Quick Setup with Trusted Partners
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Get started immediately with our vetted formation partners. 
            Click any platform to begin your business setup process instantly.
          </p>
        </div>

        {/* Jurisdiction Overview */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {jurisdictionInfo.map((jurisdiction, index) => (
            <Card key={index} className="text-center hover:shadow-lg transition-all duration-300">
              <CardHeader>
                <div className="text-6xl mb-4">{jurisdiction.flag}</div>
                <CardTitle className="text-xl">{jurisdiction.name}</CardTitle>
                <div className="space-y-2">
                  <div className="text-2xl font-bold gradient-text">{jurisdiction.price}</div>
                  <div className="text-sm text-muted-foreground">{jurisdiction.timeframe}</div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {jurisdiction.benefits.map((benefit, idx) => (
                    <div key={idx} className="flex items-center space-x-2 text-sm">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span>{benefit}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Partner Links by Category */}
        {['Company Formation', 'Finance', 'Telecommunications'].map((category) => (
          <div key={category} className="mb-12">
            <div className="flex items-center mb-6">
              {(() => {
                const Icon = getCategoryIcon(category);
                return <Icon className="w-6 h-6 text-primary mr-3" />;
              })()}
              <h3 className="text-2xl font-semibold gradient-text">{category}</h3>
              <Badge variant="secondary" className="ml-3">
                {partners.filter(p => p.category === category).length} Partners
              </Badge>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {partners
                .filter(partner => partner.category === category)
                .map((partner, index) => (
                  <Card key={index} className="hover:shadow-lg transition-all duration-300 hover:scale-105">
                    <CardHeader className="pb-4">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg">{partner.platform}</CardTitle>
                        <ExternalLink className="w-4 h-4 text-muted-foreground" />
                      </div>
                      <p className="text-sm text-muted-foreground">{partner.details}</p>
                    </CardHeader>
                    <CardContent>
                      <Button 
                        className="w-full group" 
                        onClick={() => window.open(partner.url, '_blank')}
                      >
                        Visit {partner.platform}
                        <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </CardContent>
                  </Card>
                ))}
            </div>
          </div>
        ))}

        <div className="text-center mt-16">
          <Card className="max-w-2xl mx-auto bg-gradient-to-r from-primary/5 to-purple-500/5 border-primary/20">
            <CardContent className="p-8">
              <Globe className="w-12 h-12 text-primary mx-auto mb-4" />
              <h4 className="text-xl font-semibold mb-4">Need Help Choosing?</h4>
              <p className="text-muted-foreground mb-6">
                Our partners offer quick, affordable business formation services. 
                Each platform specializes in different jurisdictions and services.
              </p>
              <div className="flex flex-wrap justify-center gap-4 text-sm">
                <Badge variant="outline">✓ Instant Setup</Badge>
                <Badge variant="outline">✓ Direct Partnership</Badge>
                <Badge variant="outline">✓ Competitive Pricing</Badge>
                <Badge variant="outline">✓ Proven Track Record</Badge>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default JurisdictionSelector;
