
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PricingTiers from '@/components/PricingTiers';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, Globe, ExternalLink, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const Pricing = () => {
  const countryPricing = [
    { flag: '🇺🇸', name: 'United States', price: '$299', currency: 'USD', partners: ['Privatily', 'ITIN', 'Clemta', 'Startglobal', 'doola'] },
    { flag: '🇬🇧', name: 'United Kingdom', price: '£199', currency: 'GBP', partners: ['Firstbase', '1stFormations', 'Privatily', 'Rapid Formation'] },
    { flag: '🇨🇦', name: 'Canada', price: 'CAD $399', currency: 'CAD', partners: ['Privatily'] },
    { flag: '🇪🇪', name: 'Estonia', price: '€300', currency: 'EUR', partners: ['1office'] },
    { flag: '🇫🇮', name: 'Finland', price: '€350', currency: 'EUR', partners: ['1office'] },
    { flag: '🇸🇪', name: 'Sweden', price: 'SEK 3,500', currency: 'SEK', partners: ['1office'] },
    { flag: '🇱🇻', name: 'Latvia', price: '€250', currency: 'EUR', partners: ['1office'] },
    { flag: '🇱🇹', name: 'Lithuania', price: '€280', currency: 'EUR', partners: ['1office'] }
  ];

  const option2Services = [
    'AI-powered business formation',
    'Multi-jurisdiction support (8 countries)',
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
      
      <main className="pt-20">
        {/* Back Button */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-8">
          <Button variant="outline" asChild>
            <Link to="/">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Link>
          </Button>
        </div>
        
        {/* Hero Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-background via-blue-50/30 to-purple-50/30 dark:from-background dark:via-blue-950/20 dark:to-purple-950/20">
          <div className="container mx-auto max-w-7xl text-center animate-fade-in">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Transparent <span className="gradient-text">Pricing</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
              Choose your jurisdiction and get started with our comprehensive business formation packages. 
              No hidden fees, no surprises.
            </p>
            <Badge className="text-lg px-6 py-2 animate-pulse">
              💰 30-Day Money-Back Guarantee
            </Badge>
          </div>
        </section>

        {/* Option 2: Country-Based Pricing */}
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="container mx-auto max-w-7xl">
            <div className="text-center mb-16 animate-slide-in">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                <span className="gradient-text">Formation by Country</span>
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Start your business in any of our 8 supported jurisdictions with our trusted formation partners.
              </p>
            </div>

            {/* Services Included */}
            <Card className="mb-12 glass-card animate-scale-in">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl">What's Included in Every Package</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {option2Services.map((service, index) => (
                    <div key={index} className="flex items-center space-x-3 hover-scale">
                      <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                      <span>{service}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Country Pricing Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {countryPricing.map((country, index) => (
                <Card 
                  key={index} 
                  className="hover:shadow-xl transition-all duration-500 hover-scale glass-card animate-fade-in"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <CardHeader className="text-center pb-4">
                    <div className="text-4xl mb-2 animate-bounce">{country.flag}</div>
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
                    <Button className="w-full group hover-scale">
                      Start in {country.name}
                      <ExternalLink className="w-4 h-4 ml-2 group-hover:scale-110 transition-transform" />
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* CTA Section */}
            <div className="text-center mt-16 animate-fade-in">
              <Card className="max-w-2xl mx-auto glass-card">
                <CardContent className="p-8">
                  <h3 className="text-2xl font-bold mb-4">Ready to Start Your Business?</h3>
                  <p className="text-muted-foreground mb-6">
                    Join 10,000+ entrepreneurs who have successfully launched their businesses with FoundStart.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button size="lg" className="hover-scale">
                      Choose Your Country
                    </Button>
                    <Button size="lg" variant="outline" className="hover-scale">
                      View All Services
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Complete Service Packages */}
        <PricingTiers />
      </main>

      <Footer />
    </div>
  );
};

export default Pricing;
