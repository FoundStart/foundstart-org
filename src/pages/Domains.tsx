import React, { useState, useMemo, useEffect, useRef } from 'react';
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
import { domainsData, soldDomains, categories, hostingProviders } from '@/data/domainsData';
import { useTranslation } from '@/contexts/TranslationContext';
import { loadBulkDomains, mergeDomains, toCsv, downloadCsv } from '@/utils/domainNormalization';

const Domains = () => {
  const { t, isRTL } = useTranslation();
  const L = (en: string, ar: string) => isRTL ? ar : en;
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedHosting, setSelectedHosting] = useState('All');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [viewMode, setViewMode] = useState<'table' | 'grid'>('table');
  const [bulkVersion, setBulkVersion] = useState(0);

  const { favorites, toggleFavorite, isFavorite } = useDomainFavorites();
  const rootRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    rootRef.current?.setAttribute('dir', isRTL ? 'rtl' : 'ltr');
  }, [isRTL]);

  const allDomains = useMemo(
    () => domainsData.filter(d => !soldDomains.some(s => s.name.toLowerCase() === d.name.toLowerCase()) && !['toolstogethers.com', 'msa-serv.com', 'zadafrica.com', 'hosstec.com'].includes(d.name.toLowerCase())),
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
                             domain.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
                             ((domain.category.toLowerCase().includes('fintech') ? 'مال دفع مدفوعات تكنولوجيا مالية' : '') + (domain.category.toLowerCase().includes('commerce') ? 'تجارة متجر تسوق' : '') + (domain.category.toLowerCase().includes('saas') ? 'برمجيات أدوات تقنية' : '') + (domain.category.toLowerCase().includes('startup') ? 'شركات ناشئة' : '')).includes(searchQuery.trim());
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
    <div ref={rootRef} className="min-h-screen bg-background" dir={isRTL ? 'rtl' : 'ltr'}>
      <Header />

      <main className="">
        <PageHero
          title={L("Domains", "الدومينات")}
          highlight=""
          subtitle={L("Find a name for your next business. Browse by category, compare asking prices and buy directly on its marketplace.", "اختار اسم لمشروعك القادم. تصفح حسب المجال، وقارن الأسعار، واشتري مباشرة من منصة البيع.")}
        >
          <div className="flex flex-wrap justify-center gap-4 mt-4">
            <Link to="/domain-wishlist">
              <Button variant="outline" size="lg" className="bg-transparent text-white border-white/40 hover:bg-white/10 hover:text-white">
                <Heart className="w-5 h-5 mr-2" />
                {t.myWishlist} ({favorites.length})
              </Button>
            </Link>
            <Link to="/bulk-domain-inquiry">
              <Button size="lg" className="bg-white text-black hover:bg-white/90">
                <ShoppingCart className="w-5 h-5 mr-2" />
                {t.bulkInquiry}
              </Button>
            </Link>
          </div>
        </PageHero>


        <section className="py-8 md:py-12 px-4 sm:px-6 lg:px-8 max-sm:pe-20 max-sm:pb-28">
          <div className="container mx-auto max-w-7xl">
            <Tabs defaultValue="premium" dir={isRTL ? 'rtl' : 'ltr'} className="w-full">
              <TabsList className="grid w-full max-w-md mx-auto grid-cols-3 mb-8 h-12">
                <TabsTrigger value="search" className="text-xs sm:text-sm font-semibold gap-1 sm:gap-2 px-1 sm:px-3">
                  <Store className="w-4 h-4" />
                  {t.searchMarketplaceTab}
                </TabsTrigger>
                <TabsTrigger value="premium" className="text-xs sm:text-sm font-semibold gap-1 sm:gap-2 px-1 sm:px-3">
                  <Sparkles className="w-4 h-4" />
                  {t.premiumDomainsTab}
                </TabsTrigger>
                <TabsTrigger value="sold" className="text-xs sm:text-sm font-semibold gap-1 sm:gap-2 px-1 sm:px-3">
                  <Globe className="w-4 h-4" />
                  {t.soldTab}
                </TabsTrigger>
              </TabsList>

              <TabsContent value="premium">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
                  <h2 className="text-2xl md:text-3xl font-bold">
                    {t.collectionTitle} <span className="gradient-text">{t.collectionHighlight}</span>
                  </h2>
                  <div className="flex items-center gap-2 flex-wrap">
                    
                    <Button
                      variant="outline"
                      size="sm"
                      className="gap-2"
                      onClick={() => {
                        const bulk = loadBulkDomains();
                        const priceMap = new Map(bulk.map(b => [b.name.toLowerCase(), b.price || '']));
                        const rows = allDomains.map(d => ({
                          name: d.name,
                          hosting: d.hosting,
                          category: d.category,
                          price: d.price || '',
                        }));
                        downloadCsv(`foundstart-domains-${new Date().toISOString().slice(0,10)}.csv`, toCsv(rows));
                      }}
                    >
                      <Download className="w-4 h-4" /> {t.exportCsv}
                    </Button>
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
                        <Input placeholder={t.searchByNameOrCategory} value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="pl-10" />
                      </div>
                      <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                        <SelectTrigger><SelectValue placeholder={t.categoryFilter} /></SelectTrigger>
                        <SelectContent><SelectItem value="All">{t.allFilter}</SelectItem>{categories.map(cat => <SelectItem key={cat} value={cat}>{cat}</SelectItem>)}</SelectContent>
                      </Select>
                      <Select value={selectedHosting} onValueChange={setSelectedHosting}>
                        <SelectTrigger><SelectValue placeholder={t.hostingFilter} /></SelectTrigger>
                        <SelectContent><SelectItem value="All">{t.allFilter}</SelectItem>{hostingProviders.map(host => <SelectItem key={host} value={host}>{host}</SelectItem>)}</SelectContent>
                      </Select>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <Badge
                        variant={selectedCategory === 'All' ? 'default' : 'outline'}
                        className="cursor-pointer hover:bg-primary/90"
                        onClick={() => setSelectedCategory('All')}
                      >
                        {t.allFilter}
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

                <p className="text-sm text-muted-foreground mb-2">{t.showingDomains.replace('{x}', String(filteredDomains.length)).replace('{y}', String(allDomains.length))}</p>

                <p className="text-xs text-muted-foreground mb-6">{L("Prices in USD. Domain name only, unless agreed otherwise. Marketplace checkout confirms availability and the final total.", "الأسعار بالدولار الأمريكي وللدومين فقط، إلا لو اتفقت على غير كده. منصة البيع بتأكد التوفر والمبلغ النهائي قبل الدفع.")}</p>
                {filteredDomains.length === 0 && <p role="status" className="p-10 text-center border rounded-xl">{L("No domains match your search. Try another name or category.", "مفيش دومينات مطابقة للبحث. جرب اسم أو مجال تاني.")}</p>}

                {viewMode === 'table' && (
                  <div className="hidden sm:block rounded-lg border overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="w-12 hidden sm:table-cell">#</TableHead>
                          <TableHead>
                            <Button variant="ghost" size="sm" onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}>
                              {t.domainCol} <ArrowUpDown className="w-3 h-3 ml-1" />
                            </Button>
                          </TableHead>
                          <TableHead className="hidden md:table-cell">{t.hostingFilter}</TableHead>
                          <TableHead className="hidden md:table-cell">{t.categoryFilter}</TableHead>
                          <TableHead>{t.priceCol}</TableHead>
                          <TableHead className="text-right">{t.actionsCol}</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredDomains.map((domain, index) => (
                          <TableRow key={domain.id}>
                            <TableCell className="font-medium text-muted-foreground hidden sm:table-cell">{index + 1}</TableCell>
                            <TableCell>
                              <div className="flex items-center gap-2">
                                <Globe className="w-4 h-4 text-primary" />
                                <span className="font-semibold" dir="ltr">{domain.name}</span>
                              </div>
                            </TableCell>
                            <TableCell className="hidden md:table-cell">{getHostingBadge(domain.hosting)}</TableCell>
                            <TableCell className="hidden md:table-cell max-w-[260px]">
                              <span className="text-sm text-muted-foreground truncate block">{domain.category}</span>
                            </TableCell>
                            <TableCell>
                              {domain.price ? (
                                <span className="font-semibold text-primary">${domain.price}</span>
                              ) : (
                                <span className="text-muted-foreground">—</span>
                              )}
                            </TableCell>
                            <TableCell className="text-right">
                              <div className="flex items-center justify-end gap-2">
                                <Button variant="ghost" size="icon" onClick={() => toggleFavorite(domain.name)} className={isFavorite(domain.name) ? 'text-red-500' : ''}>
                                  <Heart className={`w-4 h-4 ${isFavorite(domain.name) ? 'fill-current' : ''}`} />
                                </Button>
                                {domain.buyUrl && (
                                  <a href={domain.buyUrl} target="_blank" rel="noopener noreferrer">
                                    <Button size="sm" variant="outline"><ExternalLink className="w-3 h-3 mr-1" />{domain.marketplace ? L(`Buy on ${domain.marketplace}`, `اشترِ عبر ${domain.marketplace}`) : t.buyBtn}</Button>
                                  </a>
                                )}
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                )}

                {viewMode === 'table' && (
                  <div className="grid grid-cols-1 gap-4 sm:hidden">
                    {filteredDomains.map((domain) => (
                      <Card key={domain.id} className="hover:shadow-lg transition-shadow">
                        <CardContent className="p-4">
                          <div className="flex justify-between items-start mb-3">
                            <div className="flex items-center gap-2 min-w-0">
                              <Globe className="w-5 h-5 text-primary shrink-0" />
                              <h3 className="font-semibold truncate" dir="ltr">{domain.name}</h3>
                            </div>
                            <Button variant="ghost" size="icon" onClick={() => toggleFavorite(domain.name)} className={`h-8 w-8 ${isFavorite(domain.name) ? 'text-red-500' : ''}`}>
                              <Heart className={`w-4 h-4 ${isFavorite(domain.name) ? 'fill-current' : ''}`} />
                            </Button>
                          </div>
                          <div className="mb-3">{getHostingBadge(domain.hosting)}</div>
                          <p className="text-sm text-muted-foreground mb-2 line-clamp-2">{domain.category}</p>
                          {domain.price && <p className="text-lg font-bold text-primary mb-3">${domain.price}</p>}
                          {domain.buyUrl && (
                            <a href={domain.buyUrl} target="_blank" rel="noopener noreferrer" className="w-full">
                              <Button className="w-full" variant="outline"><ExternalLink className="w-4 h-4 mr-2" />{domain.marketplace ? L(`Buy on ${domain.marketplace}`, `اشترِ عبر ${domain.marketplace}`) : t.buyBtn}</Button>
                            </a>
                          )}
                        </CardContent>
                      </Card>
                    ))}
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
                              <h3 className="font-semibold truncate" dir="ltr">{domain.name}</h3>
                            </div>
                            <Button variant="ghost" size="icon" onClick={() => toggleFavorite(domain.name)} className={`h-8 w-8 ${isFavorite(domain.name) ? 'text-red-500' : ''}`}>
                              <Heart className={`w-4 h-4 ${isFavorite(domain.name) ? 'fill-current' : ''}`} />
                            </Button>
                          </div>
                          <div className="mb-3">{getHostingBadge(domain.hosting)}</div>
                          <p className="text-sm text-muted-foreground mb-2 line-clamp-2">{domain.category}</p>
                          {domain.price && <p className="text-lg font-bold text-primary mb-3">${domain.price}</p>}
                          {domain.buyUrl && (
                            <a href={domain.buyUrl} target="_blank" rel="noopener noreferrer" className="w-full">
                              <Button className="w-full" variant="outline"><ExternalLink className="w-4 h-4 mr-2" />{domain.marketplace ? L(`Buy on ${domain.marketplace}`, `اشترِ عبر ${domain.marketplace}`) : t.buyBtn}</Button>
                            </a>
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

              <TabsContent value="sold">
                <div className="mb-6">
                  <h2 className="text-2xl md:text-3xl font-bold">
                    {t.soldTitle}
                  </h2>
                  <p className="text-sm text-muted-foreground mt-1">{t.soldSubtitle}</p>
                </div>
                <div className="rounded-lg border overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-12">#</TableHead>
                        <TableHead>{t.domainCol}</TableHead>
                        <TableHead>{t.platformCol}</TableHead>
                        <TableHead>{t.dateCol}</TableHead>
                        <TableHead>{t.salePriceCol}</TableHead>
                        <TableHead className="text-right">{t.soldTab}</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {soldDomains.map((domain, index) => (
                        <TableRow key={domain.name}>
                          <TableCell className="font-medium text-muted-foreground">{index + 1}</TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Globe className="w-4 h-4 text-primary" />
                              <span className="font-semibold" dir="ltr">{domain.name}</span>
                            </div>
                          </TableCell>
                          <TableCell>{domain.platform}</TableCell>
                          <TableCell>{domain.soldDate}</TableCell>
                          <TableCell><span className="font-semibold text-primary">{domain.currency === 'EUR' ? '€' : '$'}{domain.soldPrice}</span></TableCell>
                          <TableCell className="text-right">
                            <Badge variant="secondary">{t.soldBadge}</Badge>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
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
