import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Search, Heart, Filter, SlidersHorizontal, X } from 'lucide-react';
import { useDomainFavorites } from '@/hooks/useDomainFavorites';
import MobileLayout from '@/components/mobile/MobileLayout';
import MobileDomainCard from '@/components/mobile/MobileDomainCard';
import { cn } from '@/lib/utils';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import { domainsData as premiumDomains } from '@/data/domainsData';

interface Domain {
  name: string;
  category: string;
  hosting: string;
  price: number;
  businessType: 'Business' | 'Domain';
  buyUrl: string;
}

const domainsData: Domain[] = premiumDomains.map(d => ({
  name: d.name,
  category: d.category,
  hosting: d.hosting,
  price: parseFloat(d.price || '0'),
  businessType: d.businessType || 'Domain',
  buyUrl: d.buyUrl || '',
}));

const categoryCounts = new Map<string, number>();
domainsData.forEach(d => {
  const main = d.category.split(/[,/]/)[0].trim();
  if (main) categoryCounts.set(main, (categoryCounts.get(main) || 0) + 1);
});
const categories = ['All', ...Array.from(categoryCounts.entries()).sort((a, b) => b[1] - a[1]).slice(0, 4).map(([name]) => name)];

const priceFilters = [
  { label: 'All Prices', value: 'all' },
  { label: 'Under $100', value: 'lt100' },
  { label: '$100 - $499', value: '100-499' },
  { label: '$500 - $999', value: '500-999' },
  { label: '$1,000+', value: 'gte1000' },
];

const matchesPriceFilter = (price: number, filter: string) => {
  switch (filter) {
    case 'lt100': return price < 100;
    case '100-499': return price >= 100 && price < 500;
    case '500-999': return price >= 500 && price < 1000;
    case 'gte1000': return price >= 1000;
    default: return true;
  }
};

const DomainsMobile = () => {
  const { favorites, toggleFavorite } = useDomainFavorites();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedPrice, setSelectedPrice] = useState('all');
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const filteredDomains = useMemo(() => {
    return domainsData.filter(domain => {
      const matchesSearch = domain.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           domain.category.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || domain.category.includes(selectedCategory);
      const matchesPrice = matchesPriceFilter(domain.price, selectedPrice);
      return matchesSearch && matchesCategory && matchesPrice;
    });
  }, [searchTerm, selectedCategory, selectedPrice]);

  const activeFilters = (selectedCategory !== 'All' ? 1 : 0) + (selectedPrice !== 'all' ? 1 : 0);

  return (
    <MobileLayout>
      <div className="flex flex-col h-full w-full max-w-full overflow-x-hidden">
        {/* Sticky Search Header */}
        <div className="sticky top-16 z-30 bg-background/95 backdrop-blur-lg border-b border-border px-4 py-3 space-y-3">
          <div className="flex items-center gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search domains..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 h-11 rounded-xl bg-muted/50 border-0"
              />
              {searchTerm && (
                <button 
                  onClick={() => setSearchTerm('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2"
                >
                  <X className="w-4 h-4 text-muted-foreground" />
                </button>
              )}
            </div>
            
            <Sheet open={isFilterOpen} onOpenChange={setIsFilterOpen}>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon" className="h-11 w-11 rounded-xl relative">
                  <SlidersHorizontal className="w-5 h-5" />
                  {activeFilters > 0 && (
                    <span className="absolute -top-1 -right-1 w-5 h-5 bg-primary text-primary-foreground text-xs rounded-full flex items-center justify-center">
                      {activeFilters}
                    </span>
                  )}
                </Button>
              </SheetTrigger>
              <SheetContent side="bottom" className="h-[70vh] rounded-t-3xl">
                <SheetHeader>
                  <SheetTitle>Filters</SheetTitle>
                </SheetHeader>
                <div className="space-y-6 mt-6">
                  <div>
                    <h3 className="font-medium mb-3">Category</h3>
                    <div className="flex flex-wrap gap-2">
                      {categories.map(cat => (
                        <Button
                          key={cat}
                          variant={selectedCategory === cat ? "default" : "outline"}
                          size="sm"
                          onClick={() => setSelectedCategory(cat)}
                          className="rounded-full"
                        >
                          {cat === 'All' ? 'All Categories' : cat.split(',')[0]}
                        </Button>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="font-medium mb-3">Price</h3>
                    <div className="flex flex-wrap gap-2">
                      {priceFilters.map(price => (
                        <Button
                          key={price.value}
                          variant={selectedPrice === price.value ? "default" : "outline"}
                          size="sm"
                          onClick={() => setSelectedPrice(price.value)}
                          className="rounded-full"
                        >
                          {price.label}
                        </Button>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-3 pt-4">
                    <Button 
                      variant="outline" 
                      className="flex-1"
                      onClick={() => {
                        setSelectedCategory('All');
                        setSelectedPrice('all');
                      }}
                    >
                      Clear All
                    </Button>
                    <Button 
                      className="flex-1"
                      onClick={() => setIsFilterOpen(false)}
                    >
                      Show {filteredDomains.length} Results
                    </Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>

          {/* Active Filters */}
          {activeFilters > 0 && (
            <div className="flex items-center gap-2 overflow-x-auto pb-1 -mb-1">
              {selectedCategory !== 'All' && (
                <Badge variant="secondary" className="shrink-0 pl-2 pr-1">
                  {selectedCategory.split(',')[0]}
                  <button onClick={() => setSelectedCategory('All')} className="ml-1 p-0.5">
                    <X className="w-3 h-3" />
                  </button>
                </Badge>
              )}
              {selectedPrice !== 'all' && (
                <Badge variant="secondary" className="shrink-0 pl-2 pr-1">
                  ${selectedPrice}
                  <button onClick={() => setSelectedPrice('all')} className="ml-1 p-0.5">
                    <X className="w-3 h-3" />
                  </button>
                </Badge>
              )}
            </div>
          )}
        </div>

        {/* Results */}
        <div className="flex-1 px-2 py-3 space-y-3 w-full max-w-full overflow-x-hidden">
          <div className="flex items-center justify-between px-1">
            <span className="text-sm text-muted-foreground">
              {filteredDomains.length} domain{filteredDomains.length !== 1 ? 's' : ''}
            </span>
            {favorites.length > 0 && (
              <Button variant="ghost" size="sm" asChild>
                <Link to="/domain-wishlist" className="flex items-center gap-1">
                  <Heart className="w-4 h-4 text-red-500 fill-red-500" />
                  <span>{favorites.length}</span>
                </Link>
              </Button>
            )}
          </div>

          {filteredDomains.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="w-8 h-8 text-muted-foreground" />
              </div>
              <h2 className="text-lg font-semibold mb-2">No domains found</h2>
              <p className="text-muted-foreground text-sm">
                Try adjusting your filters or search term
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {filteredDomains.map((domain) => (
                <MobileDomainCard
                  key={domain.name}
                  domain={domain}
                  isFavorite={favorites.includes(domain.name)}
                  onToggleFavorite={() => toggleFavorite(domain.name)}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </MobileLayout>
  );
};

export default DomainsMobile;
