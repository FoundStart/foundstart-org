import React, { useState, useMemo } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PageHero from '@/components/PageHero';
import DomainSearchMarketplace from '@/components/domains/DomainSearchMarketplace';
import BulkDomainImport from '@/components/domains/BulkDomainImport';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ExternalLink, Heart, Search, Globe, ShoppingCart, ArrowUpDown, Grid, List, Sparkles, Store, Download } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useDomainFavorites } from '@/hooks/useDomainFavorites';
import { domainsData, categories, hostingProviders } from '@/data/domainsData';
import { loadBulkDomains, mergeDomains, toCsv, downloadCsv } from '@/utils/domainNormalization';

const Domains = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedHosting, setSelectedHosting] = useState('All');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [viewMode, setViewMode] = useState<'table' | 'grid'>('table');
  const [bulkVersion, setBulkVersion] = useState(0);

  const { favorites, toggleFavorite, isFavorite } = useDomainFavorites();

  const allDomains = useMemo(
    () => mergeDomains(domainsData, loadBulkDomains()),
    [bulkVersion]
  );

  const quickCategories = useMemo(() => {
    const counts = new Map<string, number>();
    allDomains.forEach(d => {
      const main = d.category.split(/[,/]/)[0].trim();
      if (main) counts.set(main, (counts.get(main) || 0) + 1);
    });
    return Array.from(counts.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 8)
      .map(([name]) => name);
  }, [allDomains]);

  const filteredDomains = useMemo(() => {
    return allDomains
      .filter(domain => {
        const matchesSearch = domain.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                             domain.category.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory = selectedCategory === 'All' || domain.category.toLowerCase().includes(selectedCategory.toLowerCase());
        const matchesHosting = selectedHosting === 'All' || domain.hosting === selectedHosting;
        return matchesSearch && matchesCategory && matchesHosting;
      })
      .sort((a, b) => {
        const c = a.name.localeCompare(b.name);
        return sortOrder === 'asc' ? c : -c;
      });
  }, [allDomains, searchQuery, selectedCategory, selectedHosting, sortOrder]);

  const getHostingBadge = (hosting: string) => {
    const colors: Record<string, string> = {
      'UD': 'bg-purple-500', 'Spaceship': 'bg-blue-500', 'Godaddy': 'bg-green-500',
      'Hostinger': 'bg-orange-500', 'Namebright': 'bg-pink-500'
    };
    return <Badge className={`${colors[hosting] || 'bg-gray-500'} text-white text-xs`}>{hosting}</Badge>;
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="pb-20 md:pb-0">
        <PageHero
          title="Domain"
          highlight="Hub"
          subtitle="Browse our curated premium domains or search across 16+ registrars and marketplaces — all in one place."
        >
          <div className="flex flex-wrap justify-center gap-4 mt-4">
            <Link to="/domain-wishlist">
              <Button variant="outline" size="lg" className="text-white border-white/30 hover:bg-white/10">
                <Heart className="w-5 h-5 mr-2" />
                My Wishlist ({favorites.length})
              </Button>
            </Link>
            <Link to="/bulk-domain-inquiry">
              <Button size="lg" className="bg-white text-black hover:bg-white/90">
                <ShoppingCart className="w-5 h-5 mr-2" />
                Bulk Inquiry
              </Button>
            </Link>
          </div>
        </PageHero>

        <section className="py-8 md:py-12 px-4 sm:px-6 lg:px-8">
          <div className="container mx-auto max-w-7xl">
            <Tabs defaultValue="premium" className="w-full">
              <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-8 h-12">
                <TabsTrigger value="premium" className="text-sm font-semibold gap-2">
                  <Sparkles className="w-4 h-4" />
                  Premium Domains
                </TabsTrigger>
                <TabsTrigger value="search" className="text-sm font-semibold gap-2">
                  <Store className="w-4 h-4" />
                  Search Marketplace
                </TabsTrigger>
              </TabsList>

              <TabsContent value="premium">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
                  <h2 className="text-2xl md:text-3xl font-bold">
                    Our <span className="gradient-text">Domain Collection</span>
                  </h2>
                  <div className="flex items-center gap-2">
                    <BulkDomainImport onImport={() => setBulkVersion(v => v + 1)} />
                    <Button variant={viewMode === 'table' ? 'default' : 'outline'} size="sm" onClick={() => setViewMode('table')}>
                      <List className="w-4 h-4" />
                    </Button>
                    <Button variant={viewMode === 'grid' ? 'default' : 'outline'} size="sm" onClick={() => setViewMode('grid')}>
                      <Grid className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                <Card className="mb-6">
                  <CardContent className="p-4 space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                      <div className="relative lg:col-span-2">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                        <Input placeholder="Search by name or category..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="pl-10" />
                      </div>
                      <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                        <SelectTrigger><SelectValue placeholder="Category" /></SelectTrigger>
                        <SelectContent>{categories.map(cat => <SelectItem key={cat} value={cat}>{cat}</SelectItem>)}</SelectContent>
                      </Select>
                      <Select value={selectedHosting} onValueChange={setSelectedHosting}>
                        <SelectTrigger><SelectValue placeholder="Hosting" /></SelectTrigger>
                        <SelectContent>{hostingProviders.map(host => <SelectItem key={host} value={host}>{host}</SelectItem>)}</SelectContent>
                      </Select>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <Badge
                        variant={selectedCategory === 'All' ? 'default' : 'outline'}
                        className="cursor-pointer hover:bg-primary/90"
                        onClick={() => setSelectedCategory('All')}
                      >
                        All
                      </Badge>
                      {quickCategories.map(cat => (
                        <Badge
                          key={cat}
                          variant={selectedCategory === cat ? 'default' : 'outline'}
                          className="cursor-pointer hover:bg-primary/90"
                          onClick={() => setSelectedCategory(cat)}
                        >
                          {cat}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <p className="text-sm text-muted-foreground mb-4">Showing {filteredDomains.length} of {allDomains.length} domains</p>

                {viewMode === 'table' && (
                  <div className="rounded-lg border overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="w-12">#</TableHead>
                          <TableHead>
                            <Button variant="ghost" size="sm" onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}>
                              Domain <ArrowUpDown className="w-3 h-3 ml-1" />
                            </Button>
                          </TableHead>
                          <TableHead>Hosting</TableHead>
                          <TableHead className="hidden md:table-cell">Category</TableHead>
                          <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredDomains.map((domain, index) => (
                          <TableRow key={domain.id}>
                            <TableCell className="font-medium text-muted-foreground">{index + 1}</TableCell>
                            <TableCell>
                              <div className="flex items-center gap-2">
                                <Globe className="w-4 h-4 text-primary" />
                                <span className="font-semibold">{domain.name}</span>
                              </div>
                            </TableCell>
                            <TableCell>{getHostingBadge(domain.hosting)}</TableCell>
                            <TableCell className="hidden md:table-cell max-w-[260px]">
                              <span className="text-sm text-muted-foreground truncate block">{domain.category}</span>
                            </TableCell>
                            <TableCell className="text-right">
                              <div className="flex items-center justify-end gap-2">
                                <Button variant="ghost" size="icon" onClick={() => toggleFavorite(domain.name)} className={isFavorite(domain.name) ? 'text-red-500' : ''}>
                                  <Heart className={`w-4 h-4 ${isFavorite(domain.name) ? 'fill-current' : ''}`} />
                                </Button>
                                {domain.buyUrl ? (
                                  <a href={domain.buyUrl} target="_blank" rel="noopener noreferrer">
                                    <Button size="sm" variant="outline"><ExternalLink className="w-3 h-3 mr-1" />Visit</Button>
                                  </a>
                                ) : (
                                  <Link to={`/domain-inquiry?domain=${encodeURIComponent(domain.name)}`}>
                                    <Button size="sm">Inquire</Button>
                                  </Link>
                                )}
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                )}

                {viewMode === 'grid' && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    {filteredDomains.map((domain) => (
                      <Card key={domain.id} className="hover:shadow-lg transition-shadow">
                        <CardContent className="p-4">
                          <div className="flex justify-between items-start mb-3">
                            <div className="flex items-center gap-2 min-w-0">
                              <Globe className="w-5 h-5 text-primary shrink-0" />
                              <h3 className="font-semibold truncate">{domain.name}</h3>
                            </div>
                            <Button variant="ghost" size="icon" onClick={() => toggleFavorite(domain.name)} className={`h-8 w-8 ${isFavorite(domain.name) ? 'text-red-500' : ''}`}>
                              <Heart className={`w-4 h-4 ${isFavorite(domain.name) ? 'fill-current' : ''}`} />
                            </Button>
                          </div>
                          <div className="mb-3">{getHostingBadge(domain.hosting)}</div>
                          <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{domain.category}</p>
                          {domain.buyUrl ? (
                            <a href={domain.buyUrl} target="_blank" rel="noopener noreferrer" className="w-full">
                              <Button className="w-full" variant="outline"><ExternalLink className="w-4 h-4 mr-2" />Visit</Button>
                            </a>
                          ) : (
                            <Link to={`/domain-inquiry?domain=${encodeURIComponent(domain.name)}`} className="w-full">
                              <Button className="w-full">Inquire</Button>
                            </Link>
                          )}
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </TabsContent>

              <TabsContent value="search">
                <DomainSearchMarketplace />
              </TabsContent>
            </Tabs>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Domains;
