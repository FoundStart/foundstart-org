import { useState } from 'react';
import { Link } from 'react-router-dom';
import { countriesData } from '@/data/countriesData';
import { getPartnerVideoId } from '@/data/partnerVideos';
import { LayoutDashboard, ClipboardCheck, Package, ArrowRight, PlayCircle, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthProvider';

const AR_NAMES: Record<string, string> = { USA: 'الولايات المتحدة', UK: 'المملكة المتحدة', CA: 'كندا', EE: 'إستونيا', FI: 'فنلندا', SE: 'السويد', LV: 'لاتفيا', LT: 'ليتوانيا', IE: 'أيرلندا', EG: 'مصر' };
// Partners tab: USA shows only Doola, UK only 1office (First Office), other countries show their partner link(s).
const partnerRows = (ar: boolean) => countriesData.map((c) => {
  const list = c.id === 'USA' ? c.partners.filter((p) => p.name === 'Doola') : c.id === 'UK' ? c.partners.filter((p) => p.name === '1office') : c.partners;
  return { id: c.id, name: ar ? (AR_NAMES[c.id] || c.name) : c.name, flag: c.flag, partners: list };
});

const VideoEmbed = ({ id, title }: { id: string; title: string }) => {
  const [on, setOn] = useState(false);
  return (
    <div className="relative aspect-video w-full overflow-hidden rounded-lg bg-black">
      {on ? (
        <iframe className="absolute inset-0 h-full w-full" src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0`} title={title} allow="autoplay; encrypted-media; picture-in-picture; fullscreen" allowFullScreen />
      ) : (
        <button type="button" onClick={() => setOn(true)} aria-label={title} className="group absolute inset-0 h-full w-full">
          <img src={`https://i.ytimg.com/vi/${id}/hqdefault.jpg`} alt={title} loading="lazy" className="h-full w-full object-cover" />
          <span className="absolute inset-0 flex items-center justify-center bg-black/30 transition-colors group-hover:bg-black/20"><PlayCircle className="h-14 w-14 text-white" /></span>
        </button>
      )}
    </div>
  );
};

const HomeTwoOptions = ({ language, isRTL }: { language: string; isRTL: boolean }) => {
  const { user } = useAuth();
  const [mode, setMode] = useState<'fs' | 'partners'>('fs');
  const ar = language === 'ar';
  const formationPath = '/dashboard/formation';
  const items = [
    { icon: LayoutDashboard, t: ar ? 'لوحة عميل كاملة' : 'A full client dashboard', d: ar ? 'تابع شركتك ومستنداتك ومدفوعاتك من مكان واحد، مثل كبرى شركات التأسيس.' : 'Track your company, documents and payments in one place, like the big formation companies.' },
    { icon: ClipboardCheck, t: ar ? 'متطلبات كل دولة' : "Each country's requirements", d: ar ? 'شوف المتطلبات والسعر داخل اللوحة قبل ما تدفع.' : 'See the requirements and the price inside the dashboard before you pay.' },
    { icon: Package, t: ar ? 'سعر واضح واحد' : 'One clear price', d: ar ? 'رسوم FoundStart واحدة لكل نوع شركة، بدون خدمات إضافية.' : 'One FoundStart fee per company type, no add-ons.' },
  ];
  return (
    <section className="py-14 md:py-20 px-4 sm:px-6 lg:px-8" dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="container mx-auto max-w-5xl">
        <div className="text-center mb-10 space-y-3">
          <h2 className="text-2xl md:text-4xl font-extrabold">{ar ? 'افتح شركتك مع FoundStart' : 'Open your company with FoundStart'}</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {ar ? 'للفريلانسرز، وأصحاب المتاجر الإلكترونية، وشركات SaaS، وكل من يحتاج شركة لاستقبال المدفوعات. نفتح لك شركة في أي دولة بأسعارنا.' : 'For freelancers, e-commerce sellers, SaaS founders and anyone who needs a company to receive payments. We open a company for you in any country at our prices.'}
          </p>
        </div>
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {(ar ? ['فريلانسرز', 'تجارة إلكترونية', 'SaaS', 'استقبال المدفوعات'] : ['Freelancers', 'E-commerce', 'SaaS', 'Receive payments']).map((x) => (
            <span key={x} className="rounded-full border px-4 py-1.5 text-sm font-medium">{x}</span>
          ))}
        </div>
        <div className="flex justify-center mb-8" role="tablist">
          <div className="inline-flex rounded-full border p-1">
            {([['fs', ar ? 'عن طريق FoundStart' : 'Via FoundStart'], ['partners', ar ? 'عن طريق الشركاء' : 'Via Partners']] as const).map(([k, label]) => (
              <button key={k} role="tab" aria-selected={mode === k} onClick={() => setMode(k)} className={`rounded-full px-5 py-2 text-sm font-semibold transition-colors ${mode === k ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:text-foreground'}`}>{label}</button>
            ))}
          </div>
        </div>
        {mode === 'partners' ? (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 mb-8">
            {partnerRows(ar).map((r) => (
              <div key={r.id} className="rounded-xl border bg-card p-5 space-y-3">
                <h3 className="font-semibold text-lg">{r.flag} {r.name}</h3>
                {r.partners.length === 0 ? (
                  <p className="text-sm text-muted-foreground">{ar ? 'التأسيس في مصر عن طريق FoundStart.' : 'Egypt formation is handled by FoundStart.'}</p>
                ) : r.partners.map((p) => (
                  <div key={p.name} className="space-y-2">
                    <VideoEmbed id={getPartnerVideoId(p.name, r.id, isRTL)} title={ar ? `كيف تفتح شركة في ${r.name} مع ${p.name}` : `How to open a company in ${r.name} with ${p.name}`} />
                    <Button variant="outline" className="w-full justify-between" asChild>
                      <a href={p.url} target="_blank" rel="noopener noreferrer sponsored">{p.name}<ExternalLink className="w-4 h-4" /></a>
                    </Button>
                  </div>
                ))}
              </div>
            ))}
          </div>
        ) : (<>
        <div className="grid gap-6 md:grid-cols-3 mb-8">
          {items.map(({ icon: Icon, t, d }) => (
            <div key={t} className="rounded-xl border bg-card p-6">
              <Icon className="w-6 h-6 text-primary mb-3" />
              <h3 className="font-semibold text-lg mb-1">{t}</h3>
              <p className="text-muted-foreground text-sm">{d}</p>
            </div>
          ))}
        </div>
        </>)}
        <div className="flex flex-wrap justify-center gap-3">
          <Button size="lg" asChild><Link to={user ? formationPath : '/auth'} state={{ redirectTo: formationPath }}>{ar ? 'سجل وابدأ التأسيس' : 'Register & Start Formation'}<ArrowRight className="w-4 h-4 ml-2" /></Link></Button>
          <Button size="lg" variant="outline" asChild><Link to="/countries">{ar ? 'الدول والأسعار' : 'Countries & prices'}</Link></Button>
        </div>
      </div>
    </section>
  );
};
export default HomeTwoOptions;
