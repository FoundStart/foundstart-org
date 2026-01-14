import React from 'react';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Heart, ArrowLeft, Globe, ExternalLink, Trash2, MessageCircle, Mail, ShoppingCart } from 'lucide-react';
import { useDomainFavorites } from '@/hooks/useDomainFavorites';
import { useAuth } from '@/contexts/AuthProvider';

// Import domains data
const domainsData = [
  { name: 'Namelizer.com', category: 'Startups, SaaS & Tech', hosting: 'Godaddy', price: 11.99, businessType: 'Business', buyUrl: 'https://www.godaddy.com/en/domainsearch/find?domainToCheck=Namelizer.com' },
  { name: 'Shofic.com', category: 'E-Commerce & Marketplaces', hosting: 'Godaddy', price: 11.99, businessType: 'Domain', buyUrl: 'https://www.godaddy.com/en/domainsearch/find?domainToCheck=Shofic.com' },
  { name: 'Deeemoz.com', category: 'Startups, SaaS & Tech', hosting: 'Hostinger', price: 11.99, businessType: 'Business', buyUrl: 'https://www.godaddy.com/en/domainsearch/find?domainToCheck=Deeemoz.com' },
  { name: 'AppWebo.com', category: 'Startups, SaaS & Tech', hosting: 'Spaceship', price: 11.99, businessType: 'Domain', buyUrl: 'https://www.godaddy.com/en/domainsearch/find?domainToCheck=AppWebo.com' },
  { name: 'NixCash.com', category: 'Fintech, Payments & Crypto', hosting: 'Spaceship', price: 11.99, businessType: 'Domain', buyUrl: 'https://www.godaddy.com/en/domainsearch/find?domainToCheck=NixCash.com' },
  { name: 'Affillex.com', category: 'Startups, SaaS & Tech, Affiliate', hosting: 'UD', price: 5.99, businessType: 'Business', buyUrl: 'https://www.godaddy.com/en/domainsearch/find?domainToCheck=Affillex.com' },
];

const DomainWishlist = () => {
  const { user, loading: authLoading } = useAuth();
  const { favorites, loading, toggleFavorite } = useDomainFavorites();

  // Get domain details for favorites
  const favoriteDomains = favorites.map(name => {
    const domain = domainsData.find(d => d.name === name);
    return domain || { name, category: 'Unknown', hosting: 'Unknown', price: 0, businessType: 'Domain' as const, buyUrl: '' };
  });

  if (authLoading || loading) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Header />
        <main className="flex-1 pt-24 pb-12">
          <div className="container mx-auto px-4 text-center">
            <div className="animate-pulse">Loading...</div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Header />
        <main className="flex-1 pt-24 pb-12">
          <div className="container mx-auto px-4 max-w-2xl">
            <Card className="text-center">
              <CardContent className="pt-12 pb-8">
                <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Heart className="w-10 h-10 text-primary" />
                </div>
                <h1 className="text-2xl font-bold mb-4">Sign In Required</h1>
                <p className="text-muted-foreground mb-6">
                  Please sign in to view and manage your domain wishlist.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button asChild>
                    <Link to="/auth">Sign In</Link>
                  </Button>
                  <Button variant="outline" asChild>
                    <Link to="/domains">
                      <Globe className="w-4 h-4 mr-2" />
                      Browse Domains
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1 pt-24 pb-12">
        <div className="container mx-auto px-4">
          <Link 
            to="/domains" 
            className="inline-flex items-center text-primary hover:underline mb-6"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Domains
          </Link>

          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
            <div>
              <h1 className="text-3xl font-bold flex items-center gap-3">
                <Heart className="w-8 h-8 text-red-500 fill-red-500" />
                My Wishlist
              </h1>
              <p className="text-muted-foreground mt-2">
                {favorites.length} domain{favorites.length !== 1 ? 's' : ''} saved
              </p>
            </div>
          </div>

          {favorites.length === 0 ? (
            <Card className="text-center py-12">
              <CardContent>
                <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                  <Heart className="w-8 h-8 text-muted-foreground" />
                </div>
                <h2 className="text-xl font-semibold mb-2">No domains saved yet</h2>
                <p className="text-muted-foreground mb-6">
                  Start browsing domains and click the heart icon to save them here.
                </p>
                <Button asChild>
                  <Link to="/domains">
                    <Globe className="w-4 h-4 mr-2" />
                    Browse Domains
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {favoriteDomains.map((domain) => (
                <Card key={domain.name} className="group hover:shadow-lg transition-all duration-300">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-2">
                        <Globe className="w-5 h-5 text-primary" />
                        <CardTitle className="text-lg">{domain.name}</CardTitle>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-red-500 hover:text-red-600 hover:bg-red-50"
                        onClick={() => toggleFavorite(domain.name)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                    <Badge variant="secondary" className="w-fit text-xs">
                      {domain.category}
                    </Badge>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Hosting: {domain.hosting}</span>
                      <span className="text-lg font-bold text-primary">${domain.price}</span>
                    </div>
                    
                    <div className="flex flex-col gap-2">
                      <Button asChild className="w-full" size="sm">
                        <Link to={`/domain-inquiry?domain=${domain.name}`}>
                          <ShoppingCart className="w-4 h-4 mr-2" />
                          Inquire
                        </Link>
                      </Button>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" className="flex-1" asChild>
                          <a href="https://wa.me/21002905764" target="_blank" rel="noopener noreferrer">
                            <MessageCircle className="w-4 h-4" />
                          </a>
                        </Button>
                        <Button variant="outline" size="sm" className="flex-1" asChild>
                          <a href="mailto:momo@foundstart.org">
                            <Mail className="w-4 h-4" />
                          </a>
                        </Button>
                        {domain.buyUrl && (
                          <Button variant="outline" size="sm" className="flex-1" asChild>
                            <a href={domain.buyUrl} target="_blank" rel="noopener noreferrer">
                              <ExternalLink className="w-4 h-4" />
                            </a>
                          </Button>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default DomainWishlist;
