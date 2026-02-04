import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Search, ExternalLink, Globe } from 'lucide-react';

interface SearchPlatform {
  name: string;
  url: string;
  logo?: string;
  category: 'registrar' | 'marketplace' | 'auction';
}

const searchPlatforms: SearchPlatform[] = [
  { name: 'Spaceship', url: 'https://www.spaceship.com/domain-search/?query={domain}&beast=false&tab=domains', category: 'registrar' },
  { name: 'GoDaddy', url: 'https://www.godaddy.com/en-in/domainsearch/find?isc=WELCOMEIN&domainToCheck={domain}&tmskey=nc_offer_banner', category: 'registrar' },
  { name: 'Hostinger', url: 'https://www.hostinger.com/domain-name-results/1?domain={domain}&from=homepage', category: 'registrar' },
  { name: 'Unstoppable Domains', url: 'https://unstoppabledomains.com/search?searchTerm={domain}&searchRef=header', category: 'registrar' },
  { name: 'Sedo', url: 'https://sedo.com/search/?keyword={domain}', category: 'marketplace' },
  { name: 'Dynadot', url: 'https://www.dynadot.com/domain/search?domain={domain}', category: 'registrar' },
  { name: 'Atom', url: 'https://www.atom.com/premium-domains-for-sale/q/{domain}', category: 'marketplace' },
  { name: 'Namesilo', url: 'https://www.namesilo.com/domain/search-domains?query={domain}&tlds=com%20online%20top%20one%20icu%20org%20click%20art%20to%20help%20net%20shop%20blog%20club%20biz', category: 'registrar' },
  { name: 'Saw', url: 'https://saw.com/search/results?name={domain}', category: 'marketplace' },
  { name: 'Namebright', url: 'https://www.namebright.com/search?q={domain}', category: 'marketplace' },
  { name: 'Dropcatch', url: 'https://www.dropcatch.com/search?query={domain}', category: 'auction' },
  { name: 'Porkbun', url: 'https://porkbun.com/checkout/search?q={domain}&search=search', category: 'registrar' },
  { name: 'Name.club', url: 'https://www.nameclub.com/marketplace?search={domain}', category: 'marketplace' },
  { name: 'Nameshift', url: 'https://nameshift.com/en-gb/domains?search={domain}', category: 'marketplace' },
  { name: 'Namebase', url: 'https://www.namebase.io/domains/{domain}', category: 'marketplace' },
  { name: 'Namecheap', url: 'https://www.namecheap.com/domains/registration/results/?domain={domain}', category: 'registrar' },
];

const DomainSearchMarketplace = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const handleSearch = (platform: SearchPlatform) => {
    if (!searchQuery.trim()) return;
    const url = platform.url.replace('{domain}', encodeURIComponent(searchQuery.trim()));
    window.open(url, '_blank');
  };

  const handleSearchAll = () => {
    if (!searchQuery.trim()) return;
    const filteredPlatforms = selectedCategory === 'all' 
      ? searchPlatforms 
      : searchPlatforms.filter(p => p.category === selectedCategory);
    
    filteredPlatforms.forEach((platform, index) => {
      setTimeout(() => handleSearch(platform), index * 300);
    });
  };

  const getCategoryBadge = (category: string) => {
    switch (category) {
      case 'registrar':
        return <Badge variant="default" className="text-xs">Registrar</Badge>;
      case 'marketplace':
        return <Badge variant="secondary" className="text-xs">Marketplace</Badge>;
      case 'auction':
        return <Badge variant="outline" className="text-xs">Auction</Badge>;
      default:
        return null;
    }
  };

  const filteredPlatforms = selectedCategory === 'all' 
    ? searchPlatforms 
    : searchPlatforms.filter(p => p.category === selectedCategory);

  return (
    <section className="py-12 md:py-20 px-4 sm:px-6 lg:px-8 bg-muted/30">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center space-y-4 mb-12">
          <h2 className="text-3xl md:text-4xl font-bold">
            Domain <span className="gradient-text">Search Marketplace</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Search across 16+ domain platforms instantly. Find the perfect domain for your business.
          </p>
        </div>

        {/* Search Bar */}
        <Card className="max-w-3xl mx-auto mb-8">
          <CardContent className="p-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
                <Input
                  placeholder="Enter your domain name (e.g., mybusiness)"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 h-12 text-lg"
                  onKeyPress={(e) => e.key === 'Enter' && handleSearchAll()}
                />
              </div>
              <Button 
                size="lg" 
                onClick={handleSearchAll}
                disabled={!searchQuery.trim()}
                className="h-12"
              >
                <Globe className="w-5 h-5 mr-2" />
                Search All ({filteredPlatforms.length})
              </Button>
            </div>

            {/* Category Filters */}
            <div className="flex flex-wrap gap-2 mt-4">
              <Button
                variant={selectedCategory === 'all' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedCategory('all')}
              >
                All Platforms
              </Button>
              <Button
                variant={selectedCategory === 'registrar' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedCategory('registrar')}
              >
                Registrars
              </Button>
              <Button
                variant={selectedCategory === 'marketplace' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedCategory('marketplace')}
              >
                Marketplaces
              </Button>
              <Button
                variant={selectedCategory === 'auction' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedCategory('auction')}
              >
                Auctions
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Platform Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {filteredPlatforms.map((platform) => (
            <Card 
              key={platform.name}
              className="group hover:shadow-lg transition-all duration-300 hover:border-primary/50 cursor-pointer"
              onClick={() => handleSearch(platform)}
            >
              <CardContent className="p-4 text-center">
                <div className="w-12 h-12 mx-auto mb-3 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <Globe className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold text-sm mb-2 group-hover:text-primary transition-colors">
                  {platform.name}
                </h3>
                {getCategoryBadge(platform.category)}
                <ExternalLink className="w-4 h-4 mx-auto mt-2 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
              </CardContent>
            </Card>
          ))}
        </div>

        <p className="text-center text-sm text-muted-foreground mt-8">
          Click any platform to search, or use "Search All" to open all platforms at once
        </p>
      </div>
    </section>
  );
};

export default DomainSearchMarketplace;
