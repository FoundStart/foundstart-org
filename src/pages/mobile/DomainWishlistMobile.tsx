import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Heart, ArrowLeft, Globe, ExternalLink, Trash2, MessageCircle, Mail, ShoppingCart, CheckSquare } from 'lucide-react';
import { useDomainFavorites } from '@/hooks/useDomainFavorites';
import { useAuth } from '@/contexts/AuthProvider';
import MobileLayout from '@/components/mobile/MobileLayout';
import MobileDomainCard from '@/components/mobile/MobileDomainCard';
import { cn } from '@/lib/utils';

// Import domains data
const domainsData = [
  { name: 'Namelizer.com', category: 'Startups, SaaS & Tech', hosting: 'Godaddy', price: 11.99, businessType: 'Business' as const, buyUrl: 'https://www.godaddy.com/en/domainsearch/find?domainToCheck=Namelizer.com' },
  { name: 'Shofic.com', category: 'E-Commerce & Marketplaces', hosting: 'Godaddy', price: 11.99, businessType: 'Domain' as const, buyUrl: 'https://www.godaddy.com/en/domainsearch/find?domainToCheck=Shofic.com' },
  { name: 'Deeemoz.com', category: 'Startups, SaaS & Tech', hosting: 'Hostinger', price: 11.99, businessType: 'Business' as const, buyUrl: 'https://www.godaddy.com/en/domainsearch/find?domainToCheck=Deeemoz.com' },
  { name: 'AppWebo.com', category: 'Startups, SaaS & Tech', hosting: 'Spaceship', price: 11.99, businessType: 'Domain' as const, buyUrl: 'https://www.godaddy.com/en/domainsearch/find?domainToCheck=AppWebo.com' },
  { name: 'NixCash.com', category: 'Fintech, Payments & Crypto', hosting: 'Spaceship', price: 11.99, businessType: 'Domain' as const, buyUrl: 'https://www.godaddy.com/en/domainsearch/find?domainToCheck=NixCash.com' },
  { name: 'Affillex.com', category: 'Startups, SaaS & Tech, Affiliate', hosting: 'UD', price: 5.99, businessType: 'Business' as const, buyUrl: 'https://www.godaddy.com/en/domainsearch/find?domainToCheck=Affillex.com' },
];

const DomainWishlistMobile = () => {
  const { user, loading: authLoading } = useAuth();
  const { favorites, loading, toggleFavorite } = useDomainFavorites();
  const navigate = useNavigate();
  const [isSelectMode, setIsSelectMode] = useState(false);
  const [selectedDomains, setSelectedDomains] = useState<string[]>([]);

  // Get domain details for favorites
  const favoriteDomains = favorites.map(name => {
    const domain = domainsData.find(d => d.name === name);
    return domain || { name, category: 'Unknown', hosting: 'Unknown', price: 0, businessType: 'Domain' as const, buyUrl: '' };
  });

  const toggleSelectDomain = (domainName: string) => {
    setSelectedDomains(prev => 
      prev.includes(domainName) 
        ? prev.filter(d => d !== domainName)
        : [...prev, domainName]
    );
  };

  const selectAll = () => {
    setSelectedDomains(favorites);
  };

  const clearSelection = () => {
    setSelectedDomains([]);
    setIsSelectMode(false);
  };

  const handleBulkInquiry = () => {
    if (selectedDomains.length === 0) return;
    navigate(`/bulk-domain-inquiry?domains=${encodeURIComponent(selectedDomains.join(','))}`);
  };

  if (authLoading || loading) {
    return (
      <MobileLayout title="My Wishlist" showBack>
        <div className="flex items-center justify-center h-64">
          <div className="animate-pulse text-muted-foreground">Loading...</div>
        </div>
      </MobileLayout>
    );
  }

  if (!user) {
    return (
      <MobileLayout title="My Wishlist" showBack>
        <div className="p-4">
          <Card className="text-center">
            <CardContent className="pt-12 pb-8">
              <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Heart className="w-10 h-10 text-primary" />
              </div>
              <h1 className="text-xl font-bold mb-4">Sign In Required</h1>
              <p className="text-muted-foreground mb-6">
                Please sign in to view and manage your domain wishlist.
              </p>
              <div className="flex flex-col gap-3">
                <Button asChild size="lg" className="h-12">
                  <Link to="/auth">Sign In</Link>
                </Button>
                <Button variant="outline" size="lg" asChild className="h-12">
                  <Link to="/domains">
                    <Globe className="w-4 h-4 mr-2" />
                    Browse Domains
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </MobileLayout>
    );
  }

  return (
    <MobileLayout title="My Wishlist" showBack>
      <div className="p-4 space-y-4">
        {/* Header Stats */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold flex items-center gap-2">
              <Heart className="w-5 h-5 text-red-500 fill-red-500" />
              {favorites.length} Domain{favorites.length !== 1 ? 's' : ''}
            </h1>
          </div>
          {favorites.length > 0 && (
            <Button 
              variant={isSelectMode ? "default" : "outline"}
              size="sm"
              onClick={() => {
                setIsSelectMode(!isSelectMode);
                if (isSelectMode) setSelectedDomains([]);
              }}
            >
              <CheckSquare className="w-4 h-4 mr-1" />
              {isSelectMode ? 'Cancel' : 'Select'}
            </Button>
          )}
        </div>

        {/* Selection Actions */}
        {isSelectMode && favorites.length > 0 && (
          <div className="flex items-center justify-between p-3 bg-muted/50 rounded-xl">
            <div className="flex items-center gap-3">
              <Button variant="ghost" size="sm" onClick={selectAll}>
                Select All
              </Button>
              <span className="text-sm text-muted-foreground">
                {selectedDomains.length} selected
              </span>
            </div>
            {selectedDomains.length > 0 && (
              <Button size="sm" onClick={handleBulkInquiry}>
                <ShoppingCart className="w-4 h-4 mr-1" />
                Inquire ({selectedDomains.length})
              </Button>
            )}
          </div>
        )}

        {favorites.length === 0 ? (
          <Card className="text-center py-12">
            <CardContent>
              <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="w-8 h-8 text-muted-foreground" />
              </div>
              <h2 className="text-lg font-semibold mb-2">No domains saved yet</h2>
              <p className="text-muted-foreground mb-6 text-sm">
                Start browsing and tap the heart icon to save domains.
              </p>
              <Button asChild size="lg" className="h-12">
                <Link to="/domains">
                  <Globe className="w-4 h-4 mr-2" />
                  Browse Domains
                </Link>
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-3">
            {favoriteDomains.map((domain) => (
              <MobileDomainCard
                key={domain.name}
                domain={domain}
                isFavorite={true}
                onToggleFavorite={() => toggleFavorite(domain.name)}
                isSelected={selectedDomains.includes(domain.name)}
                onSelect={() => toggleSelectDomain(domain.name)}
                showCheckbox={isSelectMode}
              />
            ))}
          </div>
        )}

        {/* Bulk Inquiry CTA */}
        {favorites.length > 1 && !isSelectMode && (
          <Card className="bg-primary/5 border-primary/20">
            <CardContent className="py-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-sm">Want multiple domains?</p>
                  <p className="text-xs text-muted-foreground">Inquire about all at once</p>
                </div>
                <Button size="sm" onClick={() => {
                  setIsSelectMode(true);
                  setSelectedDomains(favorites);
                }}>
                  <ShoppingCart className="w-4 h-4 mr-1" />
                  Bulk Inquiry
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </MobileLayout>
  );
};

export default DomainWishlistMobile;
