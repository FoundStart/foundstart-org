import Header from '@/components/Header';
import Footer from '@/components/Footer';
import BlogAdStrip from '@/components/sedo/BlogAdStrip';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import { ArrowLeft, Globe, Search } from 'lucide-react';
import { domainsData } from '@/data/domainsData';
import { Helmet } from 'react-helmet-async';
import { useMemo } from 'react';

const PremiumDomainsShowcaseBlogAR = () => {
  const grouped = useMemo(() => {
    const map = new Map<string, typeof domainsData>();
    for (const d of domainsData) {
      const arr = map.get(d.category) ?? [];
      arr.push(d);
      map.set(d.category, arr);
    }
    return Array.from(map.entries()).sort((a, b) => b[1].length - a[1].length);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>{`${domainsData.length}+ نطاق مميز | سوق النطاقات FoundStart`}</title>
        <meta name="description" content="تصفح مجموعتنا المختارة من النطاقات المميزة القابلة لبناء علامات تجارية للشركات الناشئة، ومنصات SaaS، والتقنية المالية، والتجارة الإلكترونية، والذكاء الاصطناعي، ومشاريع الكريبتو." />
        <meta name="keywords" content="نطاقات مميزة, نطاقات تجارية, نطاقات شركات ناشئة, نطاقات SaaS, نطاقات تقنية مالية" />
        <link rel="canonical" href="https://foundstart.org/blog/premium-domains-showcase" />
      </Helmet>
      <Header />
      <BlogAdStrip position="top" slug="premium-domains-showcase" />
      <main className="pb-0">
        <article className="py-12 md:py-20 px-4 sm:px-6 lg:px-8">
          <div className="container mx-auto max-w-5xl">
            <Button variant="outline" asChild className="mb-6">
              <Link to="/blog"><ArrowLeft className="w-4 h-4 mr-2" />العودة إلى المدونة</Link>
            </Button>

            <div className="mb-10">
              <Badge className="mb-4">النطاقات</Badge>
              <h1 className="text-3xl md:text-5xl font-bold mb-4">
                {domainsData.length}+ نطاق مميز — جاهزة لبناء العلامات التجارية وقابلة للنمو
              </h1>
              <p className="text-lg text-muted-foreground mb-6">
                اكتشف محفظتنا الكاملة من النطاقات المميزة القابلة لبناء علامة تجارية، والمثالية للشركات الناشئة، ومنصات SaaS، والتقنية المالية، والتجارة الإلكترونية، والذكاء الاصطناعي، والعملات الرقمية، والعلامات التجارية العالمية. كل نطاق تم اختياره بعناية لتحقيق أقصى إمكانيات للعلامة التجارية.
              </p>
              <div className="flex gap-3 flex-wrap">
                <Button asChild><Link to="/domains"><Globe className="w-4 h-4 mr-2" />تصفح السوق</Link></Button>
                <Button variant="outline" asChild><Link to="/domain-inquiry"><Search className="w-4 h-4 mr-2" />استفسر الآن</Link></Button>
              </div>
            </div>

            <img src="/blog/covers/premium-domains-showcase.jpg" alt="عرض النطاقات المميزة" className="w-full rounded-xl shadow-lg mb-10 object-cover" loading="lazy" />

            {grouped.map(([category, list]) => (
              <section key={category} className="mb-12">
                <h2 className="text-2xl font-bold mb-2">{category}</h2>
                <p className="text-muted-foreground mb-6">{list.length} {list.length === 1 ? 'نطاق متاح' : 'نطاقات متاحة'} — تواصل معنا لمعرفة الأسعار.</p>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {list.map((domain) => (
                    <Card key={domain.id} className="hover:shadow-md transition-shadow">
                      <CardContent className="p-4 flex items-center justify-between">
                        <div className="min-w-0">
                          <Link
                            to={`/domain-inquiry?domain=${encodeURIComponent(domain.name)}`}
                            className="font-semibold text-primary hover:underline block truncate"
                          >
                            {domain.name}
                          </Link>
                          <p className="text-xs text-muted-foreground">{domain.hosting}</p>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </section>
            ))}

            <section className="bg-primary/5 rounded-2xl p-8 text-center">
              <h2 className="text-2xl font-bold mb-3">هل أنت جاهز لحجز نطاقك؟</h2>
              <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                لا تفوّت هذه النطاقات المميزة القابلة لبناء علامات تجارية. تواصل معنا اليوم للحصول على أسعار خاصة عند الشراء بالجملة.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Button size="lg" asChild><Link to="/domains">تصفح جميع النطاقات</Link></Button>
                <Button size="lg" variant="outline" asChild>
                  <a href="https://wa.me/201002905764" target="_blank" rel="noopener noreferrer">تواصل عبر WhatsApp</a>
                </Button>
              </div>
            </section>
          </div>
        </article>
      </main>
      <BlogAdStrip position="bottom" slug="premium-domains-showcase" />
      <Footer />
    </div>
  );
};

export default PremiumDomainsShowcaseBlogAR;
