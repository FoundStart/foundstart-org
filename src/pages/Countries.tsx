
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, ArrowRight, Globe, MapPin, Clock, DollarSign } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const Countries = () => {
  const [selectedCountry, setSelectedCountry] = useState('USA');

  const countries = [
    {
      id: 'USA',
      flag: '🇺🇸',
      name: 'United States',
      price: 'From $299',
      timeframe: '1-3 business days',
      currency: 'USD',
      description: 'The world\'s largest economy with unparalleled business opportunities and global market access.',
      benefits: [
        'Delaware LLC formation',
        'EIN number included',
        'Registered agent service',
        'Global business credibility',
        'Access to US banking',
        'Stripe integration ready',
        'Silicon Valley ecosystem',
        'World\'s largest consumer market'
      ],
      partners: ['Privatily', 'ITIN', 'Clemta', 'Startglobal', 'Firstbase', 'doola'],
      keyStats: {
        gdp: '$21.4 trillion',
        population: '331 million',
        easeOfBusiness: '6th globally',
        corporateTax: '21%'
      }
    },
    {
      id: 'UK',
      flag: '🇬🇧',
      name: 'United Kingdom',
      price: 'From £199',
      timeframe: '24-48 hours',
      currency: 'GBP',
      description: 'Gateway to Europe with strong financial services and a business-friendly environment.',
      benefits: [
        'Companies House registration',
        'UTR number application',
        'London business address',
        'EU market access',
        'Strong legal framework',
        'Fintech-friendly',
        'Global financial center',
        'English common law system'
      ],
      partners: ['Privatily', '1stFormations', 'Rapid Formation'],
      keyStats: {
        gdp: '$2.8 trillion',
        population: '67 million',
        easeOfBusiness: '8th globally',
        corporateTax: '19%'
      }
    },
    {
      id: 'Canada',
      flag: '🇨🇦',
      name: 'Canada',
      price: 'From CAD $399',
      timeframe: '2-5 business days',
      currency: 'CAD',
      description: 'Stable economy with excellent trade relationships and innovation incentives.',
      benefits: [
        'Federal incorporation',
        'Business number (BN)',
        'Toronto registered office',
        'USMCA trade benefits',
        'Stable banking system',
        'Innovation incentives',
        'Multicultural workforce',
        'Strong healthcare system'
      ],
      partners: ['Privatily'],
      keyStats: {
        gdp: '$1.7 trillion',
        population: '38 million',
        easeOfBusiness: '23rd globally',
        corporateTax: '15%'
      }
    },
    {
      id: 'Estonia',
      flag: '🇪🇪',
      name: 'Estonia',
      price: 'From €300',
      timeframe: '1-2 business days',
      currency: 'EUR',
      description: 'Digital-first nation leading in e-governance and digital innovation.',
      benefits: [
        'EU digital residency',
        'e-Residency program',
        'Digital-first government',
        'EU market access',
        'Low corporate tax',
        'Tech-friendly environment',
        '100% digital services',
        'Blockchain technology leader'
      ],
      partners: ['1office'],
      keyStats: {
        gdp: '$31 billion',
        population: '1.3 million',
        easeOfBusiness: '18th globally',
        corporateTax: '20%'
      }
    },
    {
      id: 'Finland',
      flag: '🇫🇮',
      name: 'Finland',
      price: 'From €350',
      timeframe: '2-3 business days',
      currency: 'EUR',
      description: 'Nordic innovation hub with excellent education system and startup ecosystem.',
      benefits: [
        'EU market access',
        'Nordic business culture',
        'Strong innovation ecosystem',
        'Stable economy',
        'English-friendly environment',
        'Tech startup incentives',
        'Excellent education system',
        'High quality of life'
      ],
      partners: ['1office'],
      keyStats: {
        gdp: '$269 billion',
        population: '5.5 million',
        easeOfBusiness: '20th globally',
        corporateTax: '20%'
      }
    },
    {
      id: 'Sweden',
      flag: '🇸🇪',
      name: 'Sweden',
      price: 'From SEK 3,500',
      timeframe: '1-3 business days',
      currency: 'SEK',
      description: 'Innovation powerhouse with world-class infrastructure and startup culture.',
      benefits: [
        'EU market access',
        'Innovation-friendly policies',
        'Strong startup ecosystem',
        'Excellent infrastructure',
        'High quality of life',
        'English proficiency',
        'Sustainable business practices',
        'World-class innovation'
      ],
      partners: ['1office'],
      keyStats: {
        gdp: '$541 billion',
        population: '10.4 million',
        easeOfBusiness: '10th globally',
        corporateTax: '20.6%'
      }
    },
    {
      id: 'Latvia',
      flag: '🇱🇻',
      name: 'Latvia',
      price: 'From €250',
      timeframe: '1-2 business days',
      currency: 'EUR',
      description: 'Strategic Baltic location with growing tech sector and competitive business costs.',
      benefits: [
        'EU market access',
        'Strategic location',
        'Low administrative burden',
        'Competitive costs',
        'Growing tech sector',
        'Multilingual workforce',
        'Baltic gateway',
        'Business-friendly policies'
      ],
      partners: ['1office'],
      keyStats: {
        gdp: '$34 billion',
        population: '1.9 million',
        easeOfBusiness: '19th globally',
        corporateTax: '20%'
      }
    },
    {
      id: 'Lithuania',
      flag: '🇱🇹',
      name: 'Lithuania',
      price: 'From €280',
      timeframe: '1-2 business days',
      currency: 'EUR',
      description: 'Fintech hub with digital innovation and business-friendly regulatory environment.',
      benefits: [
        'EU market access',
        'Fintech hub',
        'Digital innovation',
        'Business-friendly policies',
        'Strategic location',
        'Growing startup scene',
        'Regulatory sandbox',
        'Tech talent pool'
      ],
      partners: ['1office'],
      keyStats: {
        gdp: '$56 billion',
        population: '2.8 million',
        easeOfBusiness: '11th globally',
        corporateTax: '15%'
      }
    }
  ];

  const selectedCountryData = countries.find(c => c.id === selectedCountry) || countries[0];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-20">
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="container mx-auto max-w-7xl">
            <div className="text-center space-y-4 mb-16">
              <h1 className="text-3xl md:text-4xl font-bold">
                Choose Your <span className="gradient-text">Business Jurisdiction</span>
              </h1>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Start your business in any of our supported countries. Each jurisdiction offers unique advantages 
                for different business types and goals.
              </p>
            </div>

            {/* Country Selection */}
            <div className="flex flex-wrap justify-center gap-4 mb-12">
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

            {/* Selected Country Details */}
            <div className="grid lg:grid-cols-2 gap-12 mb-16">
              <Card className="p-8">
                <CardHeader className="text-center pb-6">
                  <div className="text-6xl mb-4">{selectedCountryData.flag}</div>
                  <CardTitle className="text-3xl mb-2">{selectedCountryData.name}</CardTitle>
                  <div className="flex items-center justify-center space-x-4">
                    <Badge variant="secondary" className="text-lg px-4 py-2">
                      <DollarSign className="w-4 h-4 mr-1" />
                      {selectedCountryData.price}
                    </Badge>
                    <Badge variant="secondary" className="text-lg px-4 py-2">
                      <Clock className="w-4 h-4 mr-1" />
                      {selectedCountryData.timeframe}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-6 text-lg">
                    {selectedCountryData.description}
                  </p>
                  
                  <div className="space-y-4">
                    <h4 className="font-semibold text-lg">Key Statistics</h4>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center p-3 bg-muted/50 rounded-lg">
                        <div className="font-semibold">GDP</div>
                        <div className="text-sm text-muted-foreground">{selectedCountryData.keyStats.gdp}</div>
                      </div>
                      <div className="text-center p-3 bg-muted/50 rounded-lg">
                        <div className="font-semibold">Population</div>
                        <div className="text-sm text-muted-foreground">{selectedCountryData.keyStats.population}</div>
                      </div>
                      <div className="text-center p-3 bg-muted/50 rounded-lg">
                        <div className="font-semibold">Business Rank</div>
                        <div className="text-sm text-muted-foreground">{selectedCountryData.keyStats.easeOfBusiness}</div>
                      </div>
                      <div className="text-center p-3 bg-muted/50 rounded-lg">
                        <div className="font-semibold">Corporate Tax</div>
                        <div className="text-sm text-muted-foreground">{selectedCountryData.keyStats.corporateTax}</div>
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
                    {selectedCountryData.benefits.map((benefit, idx) => (
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
                    {selectedCountryData.partners.map((partner, idx) => (
                      <Badge key={idx} variant="outline">{partner}</Badge>
                    ))}
                  </div>
                </Card>

                <Button size="lg" className="w-full group">
                  Start in {selectedCountryData.name}
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>
            </div>

            {/* All Countries Grid */}
            <div className="space-y-8">
              <h2 className="text-2xl font-bold text-center">All Supported Countries</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {countries.map((country) => (
                  <Card 
                    key={country.id} 
                    className="text-center hover:shadow-lg transition-all duration-300 cursor-pointer"
                    onClick={() => setSelectedCountry(country.id)}
                  >
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
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="w-full"
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedCountry(country.id);
                        }}
                      >
                        Learn More
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Countries;
