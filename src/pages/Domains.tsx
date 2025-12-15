import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ExternalLink, Globe, Sparkles, Shield, Zap, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

interface Domain {
  name: string;
  price: string;
  category: string;
  hosting: string;
  saleUrl: string;
}

const domainsData: Domain[] = [
  { name: 'shofic.com', price: '$1,250', category: 'Brandable', hosting: 'Godaddy', saleUrl: 'https://dcc.godaddy.com/control/portfolio/shofic.com/settings' },
  { name: 'namelizer.com', price: '$4,000', category: 'Business & SaaS', hosting: 'Godaddy', saleUrl: 'https://dcc.godaddy.com/control/portfolio/namelizer.com/settings' },
  { name: 'carthot.com', price: '$999', category: 'E-Commerce', hosting: 'Unstoppable Domains', saleUrl: 'http://carthot.com' },
  { name: 'oppapay.com', price: '$2,500', category: 'Fintech & Crypto', hosting: 'Unstoppable Domains', saleUrl: 'https://oppapay.com' },
  { name: 'talaboo.com', price: '$4,000', category: 'Brandable', hosting: 'Unstoppable Domains', saleUrl: 'https://talaboo.com' },
  { name: 'transacly.com', price: '$1,300', category: 'Brandable', hosting: 'Unstoppable Domains', saleUrl: 'https://transacly.com' },
  { name: 'Shopeter.com', price: '$3,000', category: 'E-Commerce', hosting: 'Spaceship', saleUrl: 'https://Shopeter.com' },
  { name: 'Storezly.com', price: '$2,500', category: 'E-Commerce', hosting: 'Spaceship', saleUrl: 'https://Storezly.com' },
  { name: 'Buyill.com', price: '$10,000', category: 'E-Commerce', hosting: 'Spaceship', saleUrl: 'https://Buyill.com' },
  { name: 'Shortili.com', price: '$1,500', category: 'Brandable', hosting: 'Spaceship', saleUrl: 'https://Shortili.com' },
  { name: 'Coursaro.com', price: '$3,200', category: 'Brandable', hosting: 'Spaceship', saleUrl: 'https://Coursaro.com' },
  { name: 'Creativoya.com', price: '$2,800', category: 'Brandable', hosting: 'Spaceship', saleUrl: 'https://Creativoya.com' },
  { name: 'Solivid.com', price: '$2,200', category: 'Tech & AI', hosting: 'Spaceship', saleUrl: 'https://Solivid.com' },
  { name: 'Expensol.com', price: '$3,950', category: 'Tech & AI', hosting: 'Spaceship', saleUrl: 'https://Expensol.com' },
  { name: 'Cryptalyzes.com', price: '$3,800', category: 'Fintech & Crypto', hosting: 'Spaceship', saleUrl: 'https://Cryptalyzes.com' },
  { name: 'Heykeyword.com', price: '$3,500', category: 'Tech & AI', hosting: 'Spaceship', saleUrl: 'https://Heykeyword.com' },
  { name: 'investue.com', price: '$4,500', category: 'Business & SaaS', hosting: 'Spaceship', saleUrl: 'https://investue.com' },
  { name: 'NixCash.com', price: '$3,995', category: 'Fintech & Crypto', hosting: 'Spaceship', saleUrl: 'https://NixCash.com' },
  { name: 'Etivago.com', price: '$2,800', category: 'Brandable', hosting: 'Spaceship', saleUrl: 'https://Etivago.com' },
  { name: 'Hosstec.com', price: '$2,500', category: 'Tech & AI', hosting: 'Spaceship', saleUrl: 'https://Hosstec.com' },
  { name: 'Storecho.com', price: '$1,995', category: 'E-Commerce', hosting: 'Spaceship', saleUrl: 'https://Storecho.com' },
  { name: 'Foodievo.com', price: '$3,500', category: 'E-Commerce', hosting: 'Spaceship', saleUrl: 'https://Foodievo.com' },
  { name: 'Foundstart.org', price: '$6,000', category: 'Business & SaaS', hosting: 'Spaceship', saleUrl: 'https://Foundstart.org' },
  { name: 'Cryptinco.com', price: '$4,000', category: 'Fintech & Crypto', hosting: 'Spaceship', saleUrl: 'https://Cryptinco.com' },
  { name: 'Fruitla.com', price: '$2,900', category: 'Brandable', hosting: 'Spaceship', saleUrl: 'https://Fruitla.com' },
  { name: 'ecardera.com', price: '$2,500', category: 'E-Commerce', hosting: 'Spaceship', saleUrl: 'https://ecardera.com' },
  { name: 'Codestia.com', price: '$2,495', category: 'Tech & AI', hosting: 'Spaceship', saleUrl: 'https://Codestia.com' },
  { name: 'CarDolla.com', price: '$3,995', category: 'Brandable', hosting: 'Spaceship', saleUrl: 'https://CarDolla.com' },
  { name: 'UniqranKing.com', price: '$1,200', category: 'Budget', hosting: 'Spaceship', saleUrl: 'https://UniqranKing.com' },
  { name: 'CometCall.com', price: '$3,500', category: 'Tech & AI', hosting: 'Spaceship', saleUrl: 'https://CometCall.com' },
  { name: 'Enitsa.com', price: '$2,600', category: 'Brandable', hosting: 'Spaceship', saleUrl: 'https://Enitsa.com' },
  { name: 'Paylita.com', price: '$4,999', category: 'Fintech & Crypto', hosting: 'Spaceship', saleUrl: 'https://Paylita.com' },
  { name: 'TakeRides.com', price: '$4,995', category: 'E-Commerce', hosting: 'Spaceship', saleUrl: 'https://TakeRides.com' },
  { name: 'FoundVC.com', price: '$6,500', category: 'Business & SaaS', hosting: 'Spaceship', saleUrl: 'https://FoundVC.com' },
  { name: 'Cryptemp.com', price: '$2,500', category: 'Fintech & Crypto', hosting: 'Spaceship', saleUrl: 'https://Cryptemp.com' },
  { name: 'Careeroh.com', price: '$4,000', category: 'Business & SaaS', hosting: 'Spaceship', saleUrl: 'https://Careeroh.com' },
  { name: 'Cartgy.com', price: '$1,250', category: 'E-Commerce', hosting: 'Spaceship', saleUrl: 'https://Cartgy.com' },
  { name: 'ClotheCart.com', price: '$2,995', category: 'E-Commerce', hosting: 'Spaceship', saleUrl: 'https://ClotheCart.com' },
  { name: 'Shortet.com', price: '$2,200', category: 'Brandable', hosting: 'Spaceship', saleUrl: 'https://Shortet.com' },
  { name: 'CoinsLite.com', price: '$4,500', category: 'Fintech & Crypto', hosting: 'Spaceship', saleUrl: 'https://CoinsLite.com' },
  { name: 'Halalye.com', price: '$6,900', category: 'Brandable', hosting: 'Spaceship', saleUrl: 'https://Halalye.com' },
  { name: 'Payort.com', price: '$4,595', category: 'Fintech & Crypto', hosting: 'Spaceship', saleUrl: 'https://Payort.com' },
  { name: 'Finaprise.com', price: '$3,500', category: 'Business & SaaS', hosting: 'Spaceship', saleUrl: 'https://Finaprise.com' },
  { name: 'Emboxer.com', price: '$1,800', category: 'Brandable', hosting: 'Spaceship', saleUrl: 'https://Emboxer.com' },
  { name: 'MetaMany.com', price: '$2,800', category: 'Business & SaaS', hosting: 'Spaceship', saleUrl: 'https://MetaMany.com' },
  { name: 'AppWebo.com', price: '$900', category: 'Business & SaaS', hosting: 'Spaceship', saleUrl: 'https://AppWebo.com' },
  { name: 'Deeemoz.com', price: '$750', category: 'Budget', hosting: 'Hostinger', saleUrl: 'https://Deeemoz.com' },
  { name: 'deeemoz.fun', price: '$99', category: 'Budget', hosting: 'Hostinger', saleUrl: 'https://deeemoz.fun' },
  { name: 'goldenstoreseg.com', price: '$500', category: 'Budget', hosting: 'Hostinger', saleUrl: 'https://goldenstoreseg.com' },
  { name: 'msa-serv.com', price: '$500', category: 'Budget', hosting: 'Hostinger', saleUrl: 'https://msa-serv.com' },
];

const categories = [
  { name: 'All', icon: Globe },
  { name: 'Business & SaaS', icon: Sparkles },
  { name: 'E-Commerce', icon: Globe },
  { name: 'Fintech & Crypto', icon: Shield },
  { name: 'Tech & AI', icon: Zap },
  { name: 'Brandable', icon: Sparkles },
  { name: 'Budget', icon: Globe },
];

const getCategoryColor = (category: string) => {
  const colors: Record<string, string> = {
    'Business & SaaS': 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20',
    'E-Commerce': 'bg-green-500/10 text-green-600 dark:text-green-400 border-green-500/20',
    'Fintech & Crypto': 'bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20',
    'Tech & AI': 'bg-orange-500/10 text-orange-600 dark:text-orange-400 border-orange-500/20',
    'Brandable': 'bg-pink-500/10 text-pink-600 dark:text-pink-400 border-pink-500/20',
    'Budget': 'bg-yellow-500/10 text-yellow-600 dark:text-yellow-400 border-yellow-500/20',
  };
  return colors[category] || 'bg-muted text-muted-foreground';
};

const Domains = () => {
  const [selectedCategory, setSelectedCategory] = React.useState('All');
  
  const filteredDomains = selectedCategory === 'All' 
    ? domainsData 
    : domainsData.filter(d => d.category === selectedCategory);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-20 pb-24 lg:pb-8">
        {/* Hero Section */}
        <section className="py-8 sm:py-12 lg:py-16 px-3 sm:px-6 lg:px-8">
          <div className="container mx-auto max-w-7xl">
            {/* Back Button */}
            <div className="mb-6">
              <Button variant="outline" asChild size="sm">
                <Link to="/">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Home
                </Link>
              </Button>
            </div>

            <div className="text-center mb-8 sm:mb-12">
              <Badge className="mb-4 animate-pulse-slow">🔥 Premium Domains Available</Badge>
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
                Premium Domains <span className="gradient-text">For Sale</span>
              </h1>
              <p className="text-sm sm:text-base lg:text-lg text-muted-foreground max-w-3xl mx-auto px-2">
                Brand-ready, short & scalable domains perfect for startups, SaaS platforms, fintech, 
                e-commerce, AI projects, crypto, marketplaces, and global brands.
              </p>
            </div>

            {/* Category Filters */}
            <div className="flex flex-wrap justify-center gap-2 mb-8 sm:mb-12 px-2">
              {categories.map((cat) => {
                const Icon = cat.icon;
                return (
                  <Button
                    key={cat.name}
                    variant={selectedCategory === cat.name ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setSelectedCategory(cat.name)}
                    className="text-xs sm:text-sm whitespace-nowrap"
                  >
                    <Icon className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                    {cat.name}
                  </Button>
                );
              })}
            </div>

            {/* Domains Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
              {filteredDomains.map((domain, index) => (
                <Card 
                  key={domain.name} 
                  className="hover:shadow-lg transition-all duration-300 hover:scale-[1.02] group"
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  <CardHeader className="pb-2 sm:pb-3">
                    <div className="flex items-start justify-between gap-2">
                      <CardTitle className="text-base sm:text-lg font-bold break-all">
                        {domain.name}
                      </CardTitle>
                      <Badge variant="secondary" className="text-base sm:text-lg font-bold shrink-0 bg-primary/10 text-primary">
                        {domain.price}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <Badge 
                      variant="outline" 
                      className={`mb-3 sm:mb-4 text-xs ${getCategoryColor(domain.category)}`}
                    >
                      {domain.category}
                    </Badge>
                    <Button 
                      asChild 
                      className="w-full group-hover:bg-primary/90 text-sm sm:text-base"
                      size="sm"
                    >
                      <a 
                        href={domain.saleUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                      >
                        Buy Now
                        <ExternalLink className="w-3 h-3 sm:w-4 sm:h-4 ml-2" />
                      </a>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Why Buy Section */}
            <section className="mt-12 sm:mt-16 lg:mt-20">
              <Card className="bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
                <CardHeader>
                  <CardTitle className="text-xl sm:text-2xl text-center">Why Buy From Us?</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
                        <span className="text-lg sm:text-xl">✔️</span>
                      </div>
                      <div>
                        <h4 className="font-semibold text-sm sm:text-base">Premium Hand-Picked</h4>
                        <p className="text-xs sm:text-sm text-muted-foreground">Carefully curated domain names</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
                        <span className="text-lg sm:text-xl">🚀</span>
                      </div>
                      <div>
                        <h4 className="font-semibold text-sm sm:text-base">Fast & Secure Transfer</h4>
                        <p className="text-xs sm:text-sm text-muted-foreground">Quick ownership transfer process</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
                        <span className="text-lg sm:text-xl">💰</span>
                      </div>
                      <div>
                        <h4 className="font-semibold text-sm sm:text-base">Clear Pricing</h4>
                        <p className="text-xs sm:text-sm text-muted-foreground">Transparent "Buy Now" pricing</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
                        <span className="text-lg sm:text-xl">🏆</span>
                      </div>
                      <div>
                        <h4 className="font-semibold text-sm sm:text-base">Perfect for Startups</h4>
                        <p className="text-xs sm:text-sm text-muted-foreground">Ideal for rebrands and new launches</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
                        <span className="text-lg sm:text-xl">🔐</span>
                      </div>
                      <div>
                        <h4 className="font-semibold text-sm sm:text-base">Trusted Registrars</h4>
                        <p className="text-xs sm:text-sm text-muted-foreground">Spaceship, GoDaddy, Hostinger</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
                        <span className="text-lg sm:text-xl">📩</span>
                      </div>
                      <div>
                        <h4 className="font-semibold text-sm sm:text-base">Bundle Deals</h4>
                        <p className="text-xs sm:text-sm text-muted-foreground">Contact us for special offers</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </section>

            {/* CTA Section */}
            <section className="mt-8 sm:mt-12 text-center">
              <p className="text-sm sm:text-base text-muted-foreground mb-4">
                Interested in a domain or bundle deal? Contact us now!
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button asChild size="lg" className="text-sm sm:text-base">
                  <Link to="/contact-sales">
                    Contact Sales
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="text-sm sm:text-base">
                  <a href="https://wa.me/message/UQZ6STBLDXKPD1" target="_blank" rel="noopener noreferrer">
                    WhatsApp Us
                  </a>
                </Button>
              </div>
              <p className="text-xs sm:text-sm text-muted-foreground mt-4">
                Premium domains move fast. Own the name that defines your future. 🚀
              </p>
            </section>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Domains;
