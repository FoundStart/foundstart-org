
import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import PageHero from '@/components/PageHero';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowRight, ExternalLink, Search, ArrowLeft, Building, Globe, Link2 } from 'lucide-react';
import { partnerData } from '@/data/jurisdictionData';
import { countriesData } from '@/data/countriesData';
import { Link } from 'react-router-dom';
import WhatsAppButton from '@/components/WhatsAppButton';
import VideoThumbnail from '@/components/VideoThumbnail';
import { useTranslation } from '@/contexts/TranslationContext';

const Countries = () => {
  const [selectedCountry, setSelectedCountry] = useState('USA');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const { t, isRTL } = useTranslation();

  const selectedCountryData = countriesData.find(c => c.id === selectedCountry) || countriesData[0];

  const categories = ['All', ...Array.from(new Set(partnerData.map(p => p.category)))];
  const filteredPartners = partnerData.filter(partner => {
    const matchesSearch = partner.platform.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         partner.details.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || partner.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pb-20 lg:pb-0">
        <PageHero title="Company Formation" highlight="Worldwide" subtitle="Form your business in 10+ jurisdictions with trusted partners" />
        <section className="py-12 px-4 sm:px-6 lg:px-8">
          <div className="container mx-auto max-w-7xl">
            <div className="mb-8">
              <Button variant="outline" asChild>
                <Link to="/"><ArrowLeft className="w-4 h-4 mr-2" />Back to Home</Link>
              </Button>
            </div>

            <div className={`text-center space-y-4 mb-12 ${isRTL ? 'text-right' : ''}`}>
              <h1 className="text-3xl md:text-4xl font-bold">
                Countries & <span className="gradient-text">Formation Partners</span>
              </h1>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Choose your jurisdiction and formation partner to start your business globally.
              </p>
              <div className="flex justify-center pt-2">
                <Button asChild variant="outline" className="gap-2">
                  <Link to="/company-formation-bio">
                    <Link2 className="w-4 h-4" />
                    View Formation Bio Page (All Countries)
                  </Link>
                </Button>
              </div>
            </div>

            <Tabs defaultValue="countries" className="w-full">
              <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-8">
                <TabsTrigger value="countries" className="flex items-center gap-2">
                  <Globe className="w-4 h-4" />Jurisdictions
                </TabsTrigger>
                <TabsTrigger value="partners" className="flex items-center gap-2">
                  <Building className="w-4 h-4" />All Partners
                </TabsTrigger>
              </TabsList>

              <TabsContent value="countries">
                {/* Country Selector */}
                <div className="flex flex-wrap justify-center gap-3 mb-10">
                  {countriesData.map((country) => (
                    <Button
                      key={country.id}
                      variant={selectedCountry === country.id ? "default" : "outline"}
                      size="sm"
                      onClick={() => setSelectedCountry(country.id)}
                      className="flex items-center gap-2"
                    >
                      <span className="text-lg">{country.flag}</span>
                      <span>{country.name}</span>
                    </Button>
                  ))}
                </div>

                {/* Selected Country Details */}
                <Card className="glass-card mb-10">
                  <CardHeader className="text-center">
                    <div className="text-6xl mb-3">{selectedCountryData.flag}</div>
                    <CardTitle className="text-2xl gradient-text">{selectedCountryData.name}</CardTitle>
                    <div className="flex justify-center gap-3 mt-3">
                      <Badge variant="outline" className="text-base px-4 py-1">{selectedCountryData.price}</Badge>
                      <Badge variant="secondary" className="text-base px-4 py-1">{selectedCountryData.timeframe}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <p className="text-muted-foreground text-center">{selectedCountryData.description}</p>

                    {selectedCountryData.videoUrl && (
                      <VideoThumbnail
                        videoUrl={selectedCountryData.videoUrl}
                        title={`${selectedCountryData.name} Formation Demo`}
                        className="w-full h-48 md:h-72"
                      />
                    )}

                    {/* Formation Partners for this country (deduped) */}
                    <div>
                      <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                        <Building className="w-5 h-5 text-primary" />
                        Formation Partners
                      </h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                        {Array.from(
                          new Map(selectedCountryData.partners.map(p => [p.name.toLowerCase(), p])).values()
                        ).map((partner, i) => (
                          <Button
                            key={i}
                            variant="outline"
                            className="group hover:bg-primary hover:text-primary-foreground"
                            onClick={() => window.open(partner.url, '_blank')}
                          >
                            {partner.name}
                            <ExternalLink className="w-4 h-4 ml-2 group-hover:scale-110 transition-transform" />
                          </Button>
                        ))}
                      </div>
                    </div>

                    {/* Key Stats */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      {[
                        { label: 'GDP', value: selectedCountryData.keyStats.gdp },
                        { label: 'Population', value: selectedCountryData.keyStats.population },
                        { label: 'Ease of Business', value: selectedCountryData.keyStats.easeOfBusiness },
                        { label: 'Corporate Tax', value: selectedCountryData.keyStats.corporateTax },
                      ].map((stat) => (
                        <Card key={stat.label} className="text-center p-3">
                          <div className="text-sm font-bold">{stat.value}</div>
                          <div className="text-xs text-muted-foreground">{stat.label}</div>
                        </Card>
                      ))}
                    </div>

                    {/* Benefits */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {selectedCountryData.benefits.map((b, i) => (
                        <div key={i} className="flex items-start gap-2 p-2 rounded-lg bg-muted/50 text-sm">
                          <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0" />
                          {b}
                        </div>
                      ))}
                    </div>

                    <div className="text-center">
                      <Button size="lg" onClick={() => selectedCountryData.ctaUrl && window.open(selectedCountryData.ctaUrl, '_blank')}>
                        Start Formation in {selectedCountryData.name}
                        <ArrowRight className="w-5 h-5 ml-2" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                {/* Country Grid */}
                <h2 className="text-2xl font-bold text-center mb-6">All Supported Countries</h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-4">
                  {countriesData.map((c) => {
                    const uniquePartners = Array.from(new Map(c.partners.map(p => [p.name.toLowerCase(), p])).values());
                    return (
                      <Card
                        key={c.id}
                        className="text-center hover:shadow-lg transition-all cursor-pointer hover:scale-105 flex flex-col"
                        onClick={() => setSelectedCountry(c.id)}
                      >
                        <CardContent className="p-4 flex flex-col items-center gap-2">
                          <div className="text-3xl">{c.flag}</div>
                          <div className="font-semibold text-sm">{c.name}</div>
                          <div className="text-xs text-primary font-medium">{c.price}</div>
                          <Badge variant="outline" className="text-xs">
                            {uniquePartners.length} Partner{uniquePartners.length > 1 ? 's' : ''}
                          </Badge>
                          <Button size="sm" className="w-full mt-2" onClick={(e) => { e.stopPropagation(); setSelectedCountry(c.id); }}>
                            Form Company <ArrowRight className="w-3 h-3 ml-1" />
                          </Button>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              </TabsContent>

              <TabsContent value="partners">
                {/* Search and Filter */}
                <div className="flex flex-col md:flex-row gap-4 mb-8">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                    <Input placeholder="Search partners..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="pl-10" />
                  </div>
                  <div className="flex gap-2 flex-wrap">
                    {categories.map((cat) => (
                      <Button key={cat} variant={selectedCategory === cat ? "default" : "outline"} size="sm" onClick={() => setSelectedCategory(cat)}>
                        {cat}
                      </Button>
                    ))}
                  </div>
                </div>

                <Badge variant="outline" className="mb-6 block w-fit mx-auto text-sm px-4 py-1">
                  {filteredPartners.length} Partners Found
                </Badge>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredPartners.map((partner, index) => (
                    <Card key={index} className="hover:shadow-lg transition-all duration-300 hover:scale-105">
                      <CardHeader className="pb-4">
                        <div className="flex items-center justify-between">
                          <CardTitle className="text-lg">{partner.platform}</CardTitle>
                          <Badge variant="secondary">{partner.category}</Badge>
                        </div>
                        {(partner as any).coupon && (
                          <Badge variant="destructive" className="text-xs w-fit">Coupon: {(partner as any).coupon}</Badge>
                        )}
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground mb-4">{partner.details}</p>
                        <div className="flex flex-col gap-2">
                          <Button className="w-full group" onClick={() => window.open(partner.url, '_blank')}>
                            Visit {partner.platform}
                            <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                          </Button>
                          {(partner as any).videoUrl && (
                            <Button variant="outline" className="w-full" onClick={() => window.open((partner as any).videoUrl, '_blank')}>
                              Watch Demo
                            </Button>
                          )}
                          <WhatsAppButton variant="outline" className="w-full" />
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {filteredPartners.length === 0 && (
                  <div className="text-center py-12">
                    <p className="text-muted-foreground">No partners found.</p>
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Countries;
