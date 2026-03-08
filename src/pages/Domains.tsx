import React, { useState, useMemo } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import DomainSearchMarketplace from '@/components/domains/DomainSearchMarketplace';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ExternalLink, Heart, Search, Globe, ShoppingCart, ArrowUpDown, Grid, List, Sparkles, Store } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useDomainFavorites } from '@/hooks/useDomainFavorites';
import { domainsData, categories, hostingProviders, businessTypes, Domain } from '@/data/domainsData';

const Domains = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedHosting, setSelectedHosting] = useState('All');
  const [selectedBusinessType, setSelectedBusinessType] = useState('All');
  const [sortBy, setSortBy] = useState<'name' | 'price' | 'salePrice'>('name');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [viewMode, setViewMode] = useState<'table' | 'grid'>('table');
  
  const { favorites, toggleFavorite, isFavorite } = useDomainFavorites();

  const filteredDomains = useMemo(() => {
    return domainsData
      .filter(domain => {
        const matchesSearch = domain.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                             domain.category.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory = selectedCategory === 'All' || domain.category.toLowerCase().includes(selectedCategory.toLowerCase());
        const matchesHosting = selectedHosting === 'All' || domain.hosting === selectedHosting;
        const matchesBusinessType = selectedBusinessType === 'All' || domain.businessType === selectedBusinessType;
        return matchesSearch && matchesCategory && matchesHosting && matchesBusinessType;
      })
      .sort((a, b) => {
        let comparison = 0;
        if (sortBy === 'name') comparison = a.name.localeCompare(b.name);
        else if (sortBy === 'price') comparison = a.registrationPrice - b.registrationPrice;
        else if (sortBy === 'salePrice') comparison = (a.salePrice || 0) - (b.salePrice || 0);
        return sortOrder === 'asc' ? comparison : -comparison;
      });
  }, [searchQuery, selectedCategory, selectedHosting, selectedBusinessType, sortBy, sortOrder]);

  const getHostingBadge = (hosting: string) => {
    const colors: Record<string, string> = {
      'UD': 'bg-purple-500', 'Spaceship': 'bg-blue-500', 'Godaddy': 'bg-green-500',
      'Hostinger': 'bg-orange-500', 'Namebright': 'bg-pink-500'
    };
    return <Badge className={`${colors[hosting] || 'bg-gray-500'} text-white text-xs`}>{hosting}</Badge>;
  };

  const getBusinessTypeBadge = (type: string) => {
    if (!type) return null;
    return <Badge variant={type === 'Business' ? 'default' : 'secondary'} className="text-xs">{type}</Badge>;
  };

  const handleSort = (column: 'name' | 'price' | 'salePrice') => {
    if (sortBy === column) setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    else { setSortBy(column); setSortOrder('asc'); }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pb-20 md:pb-0">
        {/* Hero Section */}
        <section className="py-12 md:py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-primary/10 to-background">
          <div className="container mx-auto max-w-7xl text-center">
            <h1 className="text-3xl md:text-5xl font-extrabold mb-4">
              Domain <span className="gradient-text">Hub</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
              Browse our curated premium domains or search across 16+ registrars and marketplaces — all in one place.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/domain-wishlist">
                <Button variant="outline" size="lg">
                  <Heart className="w-5 h-5 mr-2" />
                  My Wishlist ({favorites.length})
                </Button>
              </Link>
              <Link to="/bulk-domain-inquiry">
                <Button size="lg">
                  <ShoppingCart className="w-5 h-5 mr-2" />
                  Bulk Inquiry
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Tabbed Content */}
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

              {/* Premium Domains Tab */}
              <TabsContent value="premium">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
                  <h2 className="text-2xl md:text-3xl font-bold">
                    Our <span className="gradient-text">Domain Collection</span>
                  </h2>
                  <div className="flex items-center gap-2">
                    <Button variant={viewMode === 'table' ? 'default' : 'outline'} size="sm" onClick={() => setViewMode('table')}>
                      <List className="w-4 h-4" />
                    </Button>
                    <Button variant={viewMode === 'grid' ? 'default' : 'outline'} size="sm" onClick={() => setViewMode('grid')}>
                      <Grid className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                {/* Filters */}
                <Card className="mb-6">
                  <CardContent className="p-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                      <div className="relative lg:col-span-2">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                        <Input placeholder="Search domains..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="pl-10" />
                      </div>
                      <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                        <SelectTrigger><SelectValue placeholder="Category" /></SelectTrigger>
                        <SelectContent>{categories.map(cat => <SelectItem key={cat} value={cat}>{cat}</SelectItem>)}</SelectContent>
                      </Select>
                      <Select value={selectedHosting} onValueChange={setSelectedHosting}>
                        <SelectTrigger><SelectValue placeholder="Hosting" /></SelectTrigger>
                        <SelectContent>{hostingProviders.map(host => <SelectItem key={host} value={host}>{host}</SelectItem>)}</SelectContent>
                      </Select>
                      <Select value={selectedBusinessType} onValueChange={setSelectedBusinessType}>
                        <SelectTrigger><SelectValue placeholder="Type" /></SelectTrigger>
                        <SelectContent>{businessTypes.map(type => <SelectItem key={type} value={type}>{type}</SelectItem>)}</SelectContent>
                      </Select>
                    </div>
                  </CardContent>
                </Card>

                <p className="text-sm text-muted-foreground mb-4">Showing {filteredDomains.length} of {domainsData.length} domains</p>

                {/* Table View */}
                {viewMode === 'table' && (
                  <div className="rounded-lg border overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="w-12">#</TableHead>
                          <TableHead>
                            <Button variant="ghost" size="sm" onClick={() => handleSort('name')}>Domain <ArrowUpDown className="w-3 h-3 ml-1" /></Button>
                          </TableHead>
                          <TableHead>Hosting</TableHead>
                          <TableHead className="hidden md:table-cell">Category</TableHead>
                          <TableHead>
                            <Button variant="ghost" size="sm" onClick={() => handleSort('price')}>Reg. Price <ArrowUpDown className="w-3 h-3 ml-1" /></Button>
                          </TableHead>
                          <TableHead>
                            <Button variant="ghost" size="sm" onClick={() => handleSort('salePrice')}>Sale Price <ArrowUpDown className="w-3 h-3 ml-1" /></Button>
                          </TableHead>
                          <TableHead>Type</TableHead>
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
                            <TableCell className="hidden md:table-cell max-w-[200px]">
                              <span className="text-sm text-muted-foreground truncate block">{domain.category}</span>
                            </TableCell>
                            <TableCell>${domain.registrationPrice}</TableCell>
                            <TableCell>
                              {domain.salePrice ? <span className="font-bold text-primary">${domain.salePrice}</span> : <span className="text-muted-foreground">Contact</span>}
                            </TableCell>
                            <TableCell>{getBusinessTypeBadge(domain.businessType)}</TableCell>
                            <TableCell className="text-right">
                              <div className="flex items-center justify-end gap-2">
                                <Button variant="ghost" size="icon" onClick={() => toggleFavorite(domain.name)} className={isFavorite(domain.name) ? 'text-red-500' : ''}>
                                  <Heart className={`w-4 h-4 ${isFavorite(domain.name) ? 'fill-current' : ''}`} />
                                </Button>
                                {domain.buyUrl ? (
                                  <a href={domain.buyUrl} target="_blank" rel="noopener noreferrer">
                                    <Button size="sm" variant="outline"><ExternalLink className="w-3 h-3 mr-1" />Buy</Button>
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

                {/* Grid View */}
                {viewMode === 'grid' && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    {filteredDomains.map((domain) => (
                      <Card key={domain.id} className="hover:shadow-lg transition-shadow">
                        <CardContent className="p-4">
                          <div className="flex justify-between items-start mb-3">
                            <div className="flex items-center gap-2">
                              <Globe className="w-5 h-5 text-primary" />
                              <h3 className="font-semibold truncate">{domain.name}</h3>
                            </div>
                            <Button variant="ghost" size="icon" onClick={() => toggleFavorite(domain.name)} className={`h-8 w-8 ${isFavorite(domain.name) ? 'text-red-500' : ''}`}>
                              <Heart className={`w-4 h-4 ${isFavorite(domain.name) ? 'fill-current' : ''}`} />
                            </Button>
                          </div>
                          <div className="flex flex-wrap gap-2 mb-3">
                            {getHostingBadge(domain.hosting)}
                            {getBusinessTypeBadge(domain.businessType)}
                          </div>
                          <p className="text-sm text-muted-foreground mb-3 truncate">{domain.category}</p>
                          <div className="flex justify-between items-center mb-3">
                            <span className="text-sm">Reg: ${domain.registrationPrice}</span>
                            {domain.salePrice ? <span className="font-bold text-primary text-lg">${domain.salePrice}</span> : <span className="text-muted-foreground text-sm">Contact</span>}
                          </div>
                          {domain.buyUrl ? (
                            <a href={domain.buyUrl} target="_blank" rel="noopener noreferrer" className="w-full">
                              <Button className="w-full" variant="outline"><ExternalLink className="w-4 h-4 mr-2" />Buy Now</Button>
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

              {/* Search Marketplace Tab */}
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
