import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import { ArrowLeft, Globe, ExternalLink, Search } from 'lucide-react';
import { domainsData } from '@/data/domainsData';
import { Helmet } from 'react-helmet-async';

const PremiumDomainsShowcaseBlog = () => {
  const domainDomains = domainsData.filter(d => d.businessType === 'Domain' && d.salePrice);
  const businessDomains = domainsData.filter(d => d.businessType === 'Business' && d.salePrice);
  const otherDomains = domainsData.filter(d => !d.businessType && !d.salePrice);

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>180+ Premium Domains for Sale | FoundStart Domain Marketplace</title>
        <meta name="description" content="Browse our curated collection of 180+ premium, brandable domains for startups, SaaS, fintech, e-commerce, AI, and crypto projects. Prices from $59." />
        <meta name="keywords" content="premium domains, domains for sale, brandable domains, startup domains, SaaS domains, fintech domains" />
        <link rel="canonical" href="https://foundstart.org/blog/premium-domains-showcase" />
      </Helmet>
      <Header />
      <main className="pb-20 md:pb-0">
        <article className="py-12 md:py-20 px-4 sm:px-6 lg:px-8">
          <div className="container mx-auto max-w-5xl">
            <Button variant="outline" asChild className="mb-6">
              <Link to="/blog"><ArrowLeft className="w-4 h-4 mr-2" />Back to Blog</Link>
            </Button>

            <div className="mb-10">
              <Badge className="mb-4">Domains</Badge>
              <h1 className="text-3xl md:text-5xl font-bold mb-4">
                180+ Premium Domains for Sale — Brand-Ready & Scalable
              </h1>
              <p className="text-lg text-muted-foreground mb-6">
                Discover our complete portfolio of premium, brandable domains perfect for startups, SaaS platforms, fintech, e-commerce, AI, crypto, and global brands. Every domain is hand-picked for maximum brand potential.
              </p>
              <div className="flex gap-3 flex-wrap">
                <Button asChild><Link to="/domains"><Globe className="w-4 h-4 mr-2" />Browse Marketplace</Link></Button>
                <Button variant="outline" asChild><Link to="/domain-inquiry"><Search className="w-4 h-4 mr-2" />Inquire Now</Link></Button>
              </div>
            </div>

            {/* Domain Domains ($59) */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-2">🏷️ Standard Domains — Starting at $59</h2>
              <p className="text-muted-foreground mb-6">Premium brandable .com domains ideal for startups and new projects.</p>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {domainDomains.map((domain) => (
                  <Card key={domain.id} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-4 flex items-center justify-between">
                      <div>
                        <Link
                          to={`/domain-inquiry?domain=${encodeURIComponent(domain.name)}`}
                          className="font-semibold text-primary hover:underline"
                        >
                          {domain.name}
                        </Link>
                        <p className="text-xs text-muted-foreground">{domain.category}</p>
                      </div>
                      <div className="text-right">
                        <span className="font-bold text-sm">${domain.salePrice}</span>
                        <p className="text-xs text-muted-foreground">{domain.hosting}</p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>

            {/* Business Domains ($2,500) */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-2">💎 Premium Business Domains — $2,500</h2>
              <p className="text-muted-foreground mb-6">High-value domains for established brands and serious ventures.</p>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {businessDomains.map((domain) => (
                  <Card key={domain.id} className="hover:shadow-md transition-shadow border-primary/20">
                    <CardContent className="p-4 flex items-center justify-between">
                      <div>
                        <Link
                          to={`/domain-inquiry?domain=${encodeURIComponent(domain.name)}`}
                          className="font-semibold text-primary hover:underline"
                        >
                          {domain.name}
                        </Link>
                        <p className="text-xs text-muted-foreground">{domain.category}</p>
                      </div>
                      <div className="text-right">
                        <span className="font-bold text-sm">${domain.salePrice?.toLocaleString()}</span>
                        <Badge variant="secondary" className="ml-1 text-[10px]">Premium</Badge>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>

            {/* Other Domains */}
            {otherDomains.length > 0 && (
              <section className="mb-12">
                <h2 className="text-2xl font-bold mb-2">📋 Additional Domains Portfolio</h2>
                <p className="text-muted-foreground mb-6">More domains available — contact us for pricing.</p>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {otherDomains.map((domain) => (
                    <Card key={domain.id} className="hover:shadow-md transition-shadow">
                      <CardContent className="p-4">
                        <Link
                          to={`/domain-inquiry?domain=${encodeURIComponent(domain.name)}`}
                          className="font-semibold text-primary hover:underline"
                        >
                          {domain.name}
                        </Link>
                        <p className="text-xs text-muted-foreground">{domain.category}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </section>
            )}

            {/* CTA */}
            <section className="bg-primary/5 rounded-2xl p-8 text-center">
              <h2 className="text-2xl font-bold mb-3">Ready to Secure Your Domain?</h2>
              <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                Don't miss out on these premium brandable domains. Contact us today for special pricing on bulk purchases.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Button size="lg" asChild><Link to="/domains">Browse All Domains</Link></Button>
                <Button size="lg" variant="outline" asChild>
                  <a href="https://wa.me/21002905764" target="_blank" rel="noopener noreferrer">Contact via WhatsApp</a>
                </Button>
              </div>
            </section>
          </div>
        </article>
      </main>
      <Footer />
    </div>
  );
};

export default PremiumDomainsShowcaseBlog;
