
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ExternalLink, Search } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { sisterDomains } from '@/data/sisterPartnersData';

const SisterPartners = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredDomains = sisterDomains.filter(domain =>
    domain.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-20 pb-20 lg:pb-0">
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="container mx-auto max-w-7xl">
            <div className="text-center space-y-4 mb-16">
              <h1 className="text-3xl md:text-4xl font-bold">
                Sister <span className="gradient-text">Partners</span>
              </h1>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Explore our {sisterDomains.length} sister domains & brands across various industries.
              </p>
            </div>

            <div className="mb-8">
              <div className="relative max-w-md mx-auto">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  placeholder="Search domains..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            <Badge variant="outline" className="mb-6 block w-fit mx-auto text-sm px-4 py-1">
              {filteredDomains.length} Domains
            </Badge>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3">
              {filteredDomains.map((domain, index) => (
                <Card key={index} className="hover:shadow-md transition-all hover:scale-105 cursor-pointer group">
                  <CardContent className="p-3 text-center">
                    <span className="text-sm font-medium group-hover:text-primary transition-colors break-all">
                      {domain}
                    </span>
                  </CardContent>
                </Card>
              ))}
            </div>

            {filteredDomains.length === 0 && (
              <div className="text-center py-12">
                <p className="text-muted-foreground">No domains found matching your search.</p>
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default SisterPartners;
