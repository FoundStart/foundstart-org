import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Check, Star, Crown, Zap } from 'lucide-react';

const PricingTiers = () => {
  const [selectedCountry, setSelectedCountry] = useState('USA');

  const countries = [
    { id: 'USA', name: 'United States', flag: '🇺🇸' },
    { id: 'UK', name: 'United Kingdom', flag: '🇬🇧' },
    { id: 'Canada', name: 'Canada', flag: '🇨🇦' },
    { id: 'Estonia', name: 'Estonia', flag: '🇪🇪' },
    { id: 'Finland', name: 'Finland', flag: '🇫🇮' },
    { id: 'Sweden', name: 'Sweden', flag: '🇸🇪' },
    { id: 'Latvia', name: 'Latvia', flag: '🇱🇻' },
    { id: 'Lithuania', name: 'Lithuania', flag: '🇱🇹' },
    { id: 'Egypt', name: 'Egypt', flag: '🇪🇬' }
  ];

  const pricingData = {
    USA: {
      basic: { price: '$299', features: ['Company Formation', 'EIN', 'Registered Agent'] },
      pro: { price: '$599', features: ['Basic +', 'US Bank Account', 'Accounting Setup'] },
      premium: { price: '$999', features: ['Pro +', 'Tax Consultation', 'Priority Support'] }
    },
    UK: {
      basic: { price: '£199', features: ['Company Formation', 'Registered Office', 'Confirmation Statement'] },
      pro: { price: '£399', features: ['Basic +', 'UK Bank Account', 'VAT Registration'] },
      premium: { price: '£699', features: ['Pro +', 'Tax Consultation', 'Priority Support'] }
    },
    Canada: {
      basic: { price: 'CAD $399', features: ['Company Formation', 'Business Number', 'Registered Office'] },
      pro: { price: 'CAD $799', features: ['Basic +', 'Canadian Bank Account', 'Accounting Setup'] },
      premium: { price: 'CAD $1299', features: ['Pro +', 'Tax Consultation', 'Priority Support'] }
    },
    Estonia: {
      basic: { price: '€300', features: ['Company Formation', 'e-Residency Setup', 'Digital Signature'] },
      pro: { price: '€600', features: ['Basic +', 'EU Bank Account', 'VAT Registration'] },
      premium: { price: '€900', features: ['Pro +', 'Tax Consultation', 'Priority Support'] }
    },
    Finland: {
      basic: { price: '€350', features: ['Company Formation', 'Business ID', 'Registered Office'] },
      pro: { price: '€700', features: ['Basic +', 'Finnish Bank Account', 'Accounting Setup'] },
      premium: { price: '€1050', features: ['Pro +', 'Tax Consultation', 'Priority Support'] }
    },
    Sweden: {
      basic: { price: 'SEK 3,500', features: ['Company Formation', 'Business Registration', 'Registered Office'] },
      pro: { price: 'SEK 7,000', features: ['Basic +', 'Swedish Bank Account', 'VAT Registration'] },
      premium: { price: 'SEK 10,500', features: ['Pro +', 'Tax Consultation', 'Priority Support'] }
    },
    Latvia: {
      basic: { price: '€250', features: ['Company Formation', 'Business Registration', 'Registered Office'] },
      pro: { price: '€500', features: ['Basic +', 'Latvian Bank Account', 'VAT Registration'] },
      premium: { price: '€750', features: ['Pro +', 'Tax Consultation', 'Priority Support'] }
    },
    Lithuania: {
      basic: { price: '€280', features: ['Company Formation', 'Business Registration', 'Registered Office'] },
      pro: { price: '€560', features: ['Basic +', 'Lithuanian Bank Account', 'VAT Registration'] },
      premium: { price: '€840', features: ['Pro +', 'Tax Consultation', 'Priority Support'] }
    },
    Egypt: {
      basic: { price: 'Get Quote', features: ['Company Formation', 'GAFI Registration', 'Commercial Registration'] },
      pro: { price: 'Get Quote', features: ['Basic +', 'Tax Registration', 'Banking Assistance'] },
      premium: { price: 'Get Quote', features: ['Pro +', 'Legal Consultation', 'Ongoing Compliance'] }
    }
  };

  const selectedCountryData = pricingData[selectedCountry];

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center space-y-4 mb-12">
          <h2 className="text-3xl md:text-4xl font-bold">
            <span className="gradient-text">FoundStart Paid Services</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Choose a jurisdiction and select a pricing tier to get started with our premium services.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-4 mb-8">
          {countries.map((country) => (
            <Button
              key={country.id}
              variant={selectedCountry === country.id ? "default" : "outline"}
              size="lg"
              onClick={() => setSelectedCountry(country.id)}
              className="flex items-center space-x-2"
            >
              <span className="text-xl">{country.flag}</span>
              <span>{country.name}</span>
            </Button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card className="bg-gradient-to-br from-primary/5 to-secondary/5 border-2 border-primary/20">
            <CardHeader className="space-y-2.5">
              <CardTitle className="text-2xl font-bold">Basic</CardTitle>
              <Badge variant="secondary">
                Starting Business <Zap className="w-4 h-4 ml-1" />
              </Badge>
            </CardHeader>
            <CardContent className="grid gap-4">
              <div className="font-bold text-xl">{selectedCountryData?.basic.price}</div>
              <ul className="grid gap-2 text-sm text-muted-foreground">
                {selectedCountryData && selectedCountryData.basic.features.map((feature, index) => (
                  <li key={index} className="flex items-center">
                    <Check className="w-4 h-4 mr-2 text-green-500" />
                    {feature}
                  </li>
                ))}
              </ul>
              <Button className="w-full">Get Started</Button>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-primary/5 to-secondary/5 border-2 border-primary/20">
            <CardHeader className="space-y-2.5">
              <CardTitle className="text-2xl font-bold">Pro</CardTitle>
              <Badge variant="secondary">
                Growing Business <Star className="w-4 h-4 ml-1" />
              </Badge>
            </CardHeader>
            <CardContent className="grid gap-4">
              <div className="font-bold text-xl">{selectedCountryData?.pro.price}</div>
              <ul className="grid gap-2 text-sm text-muted-foreground">
                {selectedCountryData && selectedCountryData.pro.features.map((feature, index) => (
                  <li key={index} className="flex items-center">
                    <Check className="w-4 h-4 mr-2 text-green-500" />
                    {feature}
                  </li>
                ))}
              </ul>
              <Button className="w-full">Get Started</Button>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-primary/5 to-secondary/5 border-2 border-primary/20">
            <CardHeader className="space-y-2.5">
              <CardTitle className="text-2xl font-bold">Premium</CardTitle>
              <Badge variant="secondary">
                Established Business <Crown className="w-4 h-4 ml-1" />
              </Badge>
            </CardHeader>
            <CardContent className="grid gap-4">
              <div className="font-bold text-xl">{selectedCountryData?.premium.price}</div>
              <ul className="grid gap-2 text-sm text-muted-foreground">
                {selectedCountryData && selectedCountryData.premium.features.map((feature, index) => (
                  <li key={index} className="flex items-center">
                    <Check className="w-4 h-4 mr-2 text-green-500" />
                    {feature}
                  </li>
                ))}
              </ul>
              <Button className="w-full">Get Started</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default PricingTiers;
