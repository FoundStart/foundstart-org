import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PageHero from '@/components/PageHero';
import PricingTiers from '@/components/PricingTiers';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, Globe, ExternalLink } from 'lucide-react';

const Pricing = () => {
  const countryPricing = [
    { flag: '🇺🇸', name: 'United States', price: '$299', currency: 'USD', partners: ['Privatily', 'ITIN', 'Clemta', 'Startglobal', 'doola'] },
    { flag: '🇬🇧', name: 'United Kingdom', price: '£199', currency: 'GBP', partners: ['Firstbase', '1stFormations', 'Privatily', 'Rapid Formation'] },
    { flag: '🇨🇦', name: 'Canada', price: 'CAD $399', currency: 'CAD', partners: ['Privatily'] },
    { flag: '🇪🇪', name: 'Estonia', price: '€300', currency: 'EUR', partners: ['1office'] },
    { flag: '🇫🇮', name: 'Finland', price: '€350', currency: 'EUR', partners: ['1office'] },
    { flag: '🇸🇪', name: 'Sweden', price: 'SEK 3,500', currency: 'SEK', partners: ['1office'] },
    { flag: '🇱🇻', name: 'Latvia', price: '€250', currency: 'EUR', partners: ['1office'] },
    { flag: '🇱🇹', name: 'Lithuania', price: '€280', currency: 'EUR', partners: ['1office'] },
    { flag: '🇮🇪', name: 'Ireland', price: '€350', currency: 'EUR', partners: ['1office'] },
  ];

  const option2Services = [
    'AI-powered business formation',
    'Multi-jurisdiction support (10 countries)',
    'Automated compliance monitoring',
    'Digital partner ecosystem access',
    'Banking and payment setup',
    'Website and mobile app creation',
    'Email and hosting services',
    'Marketing automation tools',
    '24/7 customer support',
    'Money-back guarantee'
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main>
        <PageHero
          title="Transparent"
          highlight="Pricing"
          subtitle="Choose your jurisdiction and get started with our comprehensive business formation packages. No hidden fees, no surprises."
        >
          <Badge className="text-lg px-6 py-2 animate-pulse mt-2">
            💰 30-Day Money-Back Guarantee
          </Badge>
        </PageHero>

        {/* Country-Based Pricing */}
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="container mx-auto max-w-7xl">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                <span className="gradient-text">Formation by Country</span>
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Start your business in any of our 10 supported jurisdictions with our trusted formation partners.
              </p>
            </div>

            <Card className="mb-12 glass-card">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl">What's Included in Every Package</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {option2Services.map((service, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                      <span>{service}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {countryPricing.map((country, index) => (
                <Card key={index} className="hover:shadow-xl transition-all duration-500 glass-card">
                  <CardHeader className="text-center pb-4">
                    <div className="text-4xl mb-2">{country.flag}</div>
                    <CardTitle className="text-lg">{country.name}</CardTitle>
                    <div className="text-3xl font-bold gradient-text">{country.price}</div>
                    <Badge variant="outline">{country.currency}</Badge>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h4 className="font-semibold mb-2 flex items-center gap-2">
                        <Globe className="w-4 h-4" />
                        Formation Partners
                      </h4>
                      <div className="space-y-1">
                        {country.partners.map((partner, pIndex) => (
                          <div key={pIndex} className="text-sm text-muted-foreground">
                            • {partner}
                          </div>
                        ))}
                      </div>
                    </div>
                    <Button className="w-full group">
                      Start in {country.name}
                      <ExternalLink className="w-4 h-4 ml-2 group-hover:scale-110 transition-transform" />
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="text-center mt-16">
              <Card className="max-w-2xl mx-auto glass-card">
                <CardContent className="p-8">
                  <h3 className="text-2xl font-bold mb-4">Ready to Start Your Business?</h3>
                  <p className="text-muted-foreground mb-6">
                    Join 10,000+ entrepreneurs who have successfully launched their businesses with FoundStart.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button size="lg">Choose Your Country</Button>
                    <Button size="lg" variant="outline">View All Services</Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <PricingTiers />
      </main>

      <Footer />
    </div>
  );
};

export default Pricing;