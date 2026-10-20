import { Helmet } from 'react-helmet-async';
import { Link, Navigate, useParams } from 'react-router-dom';
import { ArrowLeft, ExternalLink, PlayCircle, Tag } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { useL } from '@/hooks/useL';
import { useTranslation } from '@/contexts/TranslationContext';
import { catalogPartners, partnerBySlug, partnerGroups } from '@/data/partnersCatalog';

const PartnerDetail = () => {
  const { slug = '' } = useParams();
  const L = useL();
  const { isRTL } = useTranslation();
  const p = partnerBySlug(slug);
  if (!p) return <Navigate to="/all-partners" replace />;
  const g = partnerGroups.find((x) => x.id === p.group)!;
  const related = catalogPartners.filter((x) => x.group === p.group && x.slug !== p.slug).slice(0, 6);

  return (
    <div className="min-h-screen bg-background" dir={isRTL ? 'rtl' : 'ltr'}>
      <Helmet>
        <title>{`${p.name} | ${L(g.en, g.ar)} | FoundStart`}</title>
        <meta name="description" content={`${p.name}${p.niche ? ': ' + p.niche : ''}. ${L('Category', 'التصنيف')}: ${L(g.en, g.ar)}.`} />
        <link rel="canonical" href={`https://www.foundstart.org/partner/${p.slug}`} />
      </Helmet>
      <Header />
      <main className="pb-20 md:pb-0">
        <section className="py-10 md:py-16 px-4 sm:px-6 lg:px-8">
          <div className="container mx-auto max-w-3xl space-y-6">
            <Link to="/all-partners" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
              <ArrowLeft className={`w-4 h-4 ${isRTL ? 'rotate-180' : ''}`} />{L('All partners', 'كل الشركاء')}
            </Link>
            <div className="rounded-xl border bg-card p-6 md:p-8 space-y-5">
              <div>
                <Link to={`/all-partners#${g.id}`} className="text-xs font-medium text-primary">{L(g.en, g.ar)}</Link>
                <h1 className="mt-1 text-3xl md:text-4xl font-extrabold" dir="ltr" style={{ textAlign: isRTL ? 'right' : 'left' }}>{p.name}</h1>
              </div>
              <dl className="grid gap-3 text-sm sm:grid-cols-2">
                <div><dt className="text-muted-foreground">{L('Category', 'التصنيف')}</dt><dd className="font-medium">{L(g.en, g.ar)}</dd></div>
                {p.niche && <div><dt className="text-muted-foreground">{L('What it does', 'ماذا يقدم')}</dt><dd className="font-medium" dir="ltr" style={{ textAlign: isRTL ? 'right' : 'left' }}>{p.niche}</dd></div>}
                {p.language && <div><dt className="text-muted-foreground">{L('Language', 'اللغة')}</dt><dd className="font-medium">{p.language === 'Arabic' ? L('Arabic', 'العربية') : p.language}</dd></div>}
              </dl>
              {p.coupon && (
                <div className="flex items-center gap-2 rounded-lg border border-primary/30 bg-primary/5 px-4 py-3 text-sm">
                  <Tag className="w-4 h-4 text-primary" />
                  <span>{L('Coupon code', 'كود الخصم')}: <strong dir="ltr">{p.coupon}</strong></span>
                </div>
              )}
              <div className="flex flex-col sm:flex-row gap-3">
                <Button asChild size="lg" className="flex-1">
                  <a href={p.url} target="_blank" rel="noopener noreferrer sponsored">{L(`Visit ${p.name}`, `زيارة ${p.name}`)}<ExternalLink className="w-4 h-4 ms-2" /></a>
                </Button>
                {p.videoUrl && (
                  <Button asChild size="lg" variant="outline" className="flex-1">
                    <a href={p.videoUrl} target="_blank" rel="noopener noreferrer"><PlayCircle className="w-4 h-4 me-2" />{L('Watch the video', 'شاهد الفيديو')}</a>
                  </Button>
                )}
              </div>
            </div>

            {related.length > 0 && (
              <div className="space-y-3">
                <h2 className="text-lg font-bold">{L('More in this category', 'المزيد في هذا التصنيف')}</h2>
                <div className="grid gap-3 sm:grid-cols-2">
                  {related.map((r) => (
                    <Link key={r.slug} to={`/partner/${r.slug}`} className="rounded-lg border bg-card p-3 hover:border-primary/50" dir="ltr">
                      <div className="font-medium">{r.name}</div>
                      {r.niche && <p className="text-xs text-muted-foreground line-clamp-1">{r.niche}</p>}
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default PartnerDetail;
