import { useMemo, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { Search } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PageHero from '@/components/PageHero';
import { Input } from '@/components/ui/input';
import { useL } from '@/hooks/useL';
import { useTranslation } from '@/contexts/TranslationContext';
import { catalogPartners, partnerGroups } from '@/data/partnersCatalog';

const AllPartners = () => {
  const L = useL();
  const { isRTL } = useTranslation();
  const [q, setQ] = useState('');
  const [group, setGroup] = useState('all');

  const sections = useMemo(() => {
    const s = q.trim().toLowerCase();
    return partnerGroups
      .filter((g) => group === 'all' || g.id === group)
      .map((g) => ({
        g,
        items: catalogPartners.filter((p) => p.group === g.id && (!s || p.name.toLowerCase().includes(s) || p.niche.toLowerCase().includes(s))),
      }))
      .filter((x) => x.items.length > 0);
  }, [q, group]);

  const total = catalogPartners.length;

  return (
    <div className="min-h-screen bg-background" dir={isRTL ? 'rtl' : 'ltr'}>
      <Helmet>
        <title>{L('All Partners by Category | FoundStart', 'كل الشركاء حسب التصنيف | FoundStart')}</title>
        <meta name="description" content={L(
          `${total} services we use and recommend, grouped by category: company formation, banking and fintech, hosting, AI tools, marketing, e-commerce and more.`,
          `${total} خدمة نستخدمها ونوصي بها، مقسمة حسب التصنيف: تأسيس الشركات، البنوك والفينتك، الاستضافة، أدوات الذكاء الاصطناعي، التسويق، التجارة الإلكترونية وغيرها.`
        )} />
        <link rel="canonical" href="https://www.foundstart.org/all-partners" />
      </Helmet>
      <Header />
      <main className="">
        <PageHero
          title={L('Our', 'شبكة')}
          highlight={L('Partner Network', 'شركائنا')}
          subtitle={L(`${total} services grouped by category. Open any partner for details and the link.`, `${total} خدمة مقسمة حسب التصنيف. افتح أي شريك لتفاصيله ورابطه.`)}
        />
        <section className="py-10 px-4 sm:px-6 lg:px-8">
          <div className="container mx-auto max-w-6xl">
            <div className="relative mb-4 max-w-md">
              <Search className="pointer-events-none absolute top-1/2 -translate-y-1/2 start-3 h-4 w-4 text-muted-foreground" />
              <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder={L('Search partners', 'ابحث في الشركاء')} className="ps-9" />
            </div>
            <div className="flex flex-wrap gap-2 mb-8">
              {[{ id: 'all', en: 'All', ar: 'الكل' }, ...partnerGroups].map((g) => (
                <button key={g.id} type="button" onClick={() => setGroup(g.id)}
                  className={`rounded-full border px-3 py-1 text-sm transition-colors ${group === g.id ? 'bg-primary text-primary-foreground border-primary' : 'hover:border-primary/50'}`}>
                  {L(g.en, g.ar)}
                </button>
              ))}
            </div>

            {sections.length === 0 && <p className="text-muted-foreground">{L('No partners match your search.', 'لا يوجد شركاء مطابقون للبحث.')}</p>}

            <div className="space-y-10">
              {sections.map(({ g, items }) => (
                <div key={g.id} id={g.id}>
                  <h2 className="text-xl md:text-2xl font-bold mb-4">{L(g.en, g.ar)} <span className="text-sm font-normal text-muted-foreground">({items.length})</span></h2>
                  <div className="grid gap-3 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                    {items.map((p) => (
                      <Link key={p.slug} to={`/partner/${p.slug}`} className="rounded-lg border bg-card p-4 transition-all hover:border-primary/50 hover:shadow-md">
                        <div className="font-semibold" dir="ltr" style={{ textAlign: isRTL ? 'right' : 'left' }}>{p.name}</div>
                        {p.niche && <p className="mt-1 text-xs text-muted-foreground line-clamp-2" dir="ltr" style={{ textAlign: isRTL ? 'right' : 'left' }}>{p.niche}</p>}
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default AllPartners;
