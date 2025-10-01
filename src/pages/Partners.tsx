
import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { ArrowRight, ExternalLink, Search, ArrowLeft } from 'lucide-react';
import { partnerData } from '@/data/jurisdictionData';
import { Link } from 'react-router-dom';
import WhatsAppButton from '@/components/WhatsAppButton';

const Partners = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

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
      
      <main className="pt-20 pb-20 lg:pb-0">
        <section className="section-padding px-4 sm:px-6 lg:px-8">
          <div className="container mx-auto max-w-7xl">
            {/* Back Button */}
            <div className="mb-8">
              <Button variant="outline" asChild>
                <Link to="/">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Home
                </Link>
              </Button>
            </div>

            <div className="text-center space-y-4 mb-16">
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold">
                Our <span className="gradient-text">370+ Trusted Partners</span>
              </h1>
              <p className="text-base sm:text-lg lg:text-xl text-muted-foreground max-w-3xl mx-auto">
                Access exclusive deals and partnerships to grow your business with vetted platforms and services across multiple categories.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center mt-6">
                <Button size="lg">
                  Explore Partnerships
                </Button>
                <WhatsAppButton size="lg" variant="outline" />
              </div>
            </div>

            {/* Search and Filter */}
            <div className="flex flex-col md:flex-row gap-4 mb-8">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  placeholder="Search partners..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <div className="flex gap-2 flex-wrap">
                {categories.map((category) => (
                  <Button
                    key={category}
                    variant={selectedCategory === category ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedCategory(category)}
                  >
                    {category}
                  </Button>
                ))}
              </div>
            </div>

            {/* Partners Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPartners.map((partner, index) => (
                <Card key={index} className="hover:shadow-lg transition-all duration-300 hover:scale-105">
                  <CardHeader className="pb-4">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">{partner.platform}</CardTitle>
                      <Badge variant="secondary">{partner.category}</Badge>
                    </div>
                    <div className="flex items-center gap-2">
                      <ExternalLink className="w-4 h-4 text-muted-foreground" />
                      <Badge variant="outline" className="text-xs">Affiliate Partner</Badge>
                    </div>
                    {partner.coupon && (
                      <div className="mt-2">
                        <Badge variant="destructive" className="text-xs">
                          Coupon: {partner.coupon}
                        </Badge>
                      </div>
                    )}
                  </CardHeader>
                  <CardContent>
                     <p className="text-sm text-muted-foreground mb-4">{partner.details}</p>
                     <div className="flex flex-col gap-2">
                       <Button 
                         className="w-full group" 
                         onClick={() => window.open(partner.url, '_blank')}
                       >
                         Visit {partner.platform}
                         <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                       </Button>
                       {partner.videoUrl && (
                         <Button 
                           variant="outline"
                           className="w-full" 
                           onClick={() => window.open(partner.videoUrl, '_blank')}
                         >
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
                <p className="text-muted-foreground">No partners found matching your criteria.</p>
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Partners;
