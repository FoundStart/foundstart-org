import FormationInfoVideo from '@/components/FormationInfoVideo';
import { countryPartnerEmptyState } from '@/data/countryPartnerEmptyState';
import OwnedVideoPlayer, { ownedVideoSource } from "@/components/OwnedVideoPlayer";
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { countriesData } from '@/data/countriesData';
import { getPartnerVideoId } from '@/data/partnerVideos';
import PartnerPricing from '@/components/PartnerPricing';
import { COUNTRY_AR_NAMES, selectCountryPartners } from '@/data/partnerPricing';
import { LayoutDashboard, ClipboardCheck, Package, ArrowRight, PlayCircle, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthProvider';

const partnerRows = (ar: boolean) => countriesData.map((c) => ({ id: c.id, offerAvailable: c.offerAvailable, name: ar ? (COUNTRY_AR_NAMES[c.id] || c.name) : c.name, flag: c.flag, partners: selectCountryPartners(c.id, c.partners) }));

const VideoEmbed = ({ id, title }: { id: string; title: string }) => {
  const [on, setOn] = useState(false);
  return (
    <div className="relative aspect-video w-full overflow-hidden rounded-lg bg-black">
      {ownedVideoSource(id) ? <OwnedVideoPlayer id={id} title={title} className="absolute inset-0 h-full w-full" /> : on ? (
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
  const [mode, setMode] = useState<'fs' | 'partners'>('partners');
  const ar = language === 'ar';
  const formationPath = '/dashboard/formation';
  const items = [
    { icon: LayoutDashboard, t: ar ? 'لوحة عميل كاملة' : 'A full client dashboard', d: ar ? 'تابع شركتك ومستنداتك ومدفوعاتك من مكان واحد.' : 'Track your company, documents and payments in one place.' },
    { icon: ClipboardCheck, t: ar ? 'متطلبات كل دولة' : "Each country's requirements", d: ar ? 'شوف المتطلبات والسعر داخل اللوحة قبل ما تدفع.' : 'See the requirements and the price inside the dashboard before you pay.' },
    { icon: Package, t: ar ? 'أتعاب خدمة FoundStart' : 'FoundStart service fee', d: ar ? 'أتعاب الخدمة حسب نوع الشركة. الرسوم الحكومية والتجديد تحتاج تأكيدا منفصلا.' : 'Service fees by company type. Government charges and renewals need separate confirmation.' },
  ];
  return (
    <section id="formation-options" className="scroll-mt-20 py-8 md:py-10 px-4 sm:px-6 lg:px-8" dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="container mx-auto max-w-5xl">
        <h2 className="sr-only">{ar ? 'اختر طريقة التأسيس' : 'Choose how to form your company'}</h2>
        <div className="flex justify-center mb-8" role="tablist">
          <div className="inline-flex rounded-full border p-1">
            {([['partners', ar ? 'عن طريق الشركاء' : 'Via Partners'], ['fs', ar ? 'عن طريق FoundStart' : 'Via FoundStart']] as const).map(([k, label]) => (
              <button key={k} role="tab" aria-selected={mode === k} onClick={() => setMode(k)} className={`rounded-full px-5 py-2 text-sm font-semibold transition-colors ${mode === k ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:text-foreground'}`}>{label}</button>
            ))}
          </div>
        </div>
        <div className="text-center space-y-3 mb-8">
          <p className="text-sm text-muted-foreground">{ar ? 'اختر شريكا ودولة من الخيارات أدناه وسجل مباشرة عبر رابط الشريك، أو أنشئ حسابك لدى FoundStart.' : 'Choose a partner and country below to register through their link, or create your FoundStart account.'}</p>
          <Link className="inline-flex items-center gap-2 text-sm underline underline-offset-4" to={user ? formationPath : '/auth?mode=signup'} state={{ redirectTo: formationPath }}>
            {ar ? 'تفضل التأسيس من خلالنا؟ سجل لدى FoundStart' : 'Prefer to use us? Register with FoundStart'}<ArrowRight className="w-4 h-4 shrink-0" />
          </Link>
        </div>
        {mode === 'partners' ? (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 mb-8">
            {partnerRows(ar).map((r) => (
              <div key={r.id} data-country-card={r.id} className="rounded-xl border bg-card p-5 space-y-3">
                <h3 className="font-semibold text-lg">{r.flag} {r.name}</h3>
                {r.partners.length === 0 ? (
                  <div className="space-y-3">
                    <p className="text-sm text-muted-foreground">{countryPartnerEmptyState(r, ar)}</p>
                    {(r.id === 'CA' || r.id === 'EG') && <FormationInfoVideo countryId={r.id} ar={ar} />}
                    {r.id === 'EG' && <Button className="w-full h-auto min-h-10 whitespace-normal text-start" asChild><Link to={user ? formationPath : '/auth?mode=signup'} state={{redirectTo: formationPath}}>{ar ? 'سجل لدى FoundStart للتأسيس في مصر' : 'Register with FoundStart for Egypt formation'}</Link></Button>}
                    {r.id !== 'EG' && <Link className="inline-flex text-sm underline underline-offset-4" to={`/country/${r.id}`}>
                      {ar ? `معلومات عن التأسيس في ${r.name}` : `Company formation information for ${r.name}`}
                    </Link>}
                  </div>
                ) : r.partners.map((p) => (
                  <div key={p.name} className="space-y-2">
                    <VideoEmbed id={getPartnerVideoId(p.name, r.id, isRTL)} title={ar ? `كيف تفتح شركة في ${r.name} مع ${p.name}` : `How to open a company in ${r.name} with ${p.name}`} />
                    <PartnerPricing countryId={r.id} partnerName={p.name} isRTL={isRTL} />
                    <Button variant="outline" className="w-full h-auto min-h-10 whitespace-normal justify-between gap-2 text-start" asChild>
                      <a href={p.url} target="_blank" rel="noopener noreferrer sponsored">{ar ? `سجل لتأسيس شركة في ${r.name} مع ${p.name}` : `Register for ${r.name} formation with ${p.name}`}<ExternalLink className="w-4 h-4 shrink-0" /></a>
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
        {mode === 'fs' && (
          <div className="flex flex-wrap justify-center gap-3">
            <Button size="lg" asChild><Link to={user ? formationPath : '/auth?mode=signup'} state={{ redirectTo: formationPath }}>{ar ? 'سجل وابدأ التأسيس' : 'Register & Start Formation'}<ArrowRight className="w-4 h-4 ml-2" /></Link></Button>
            <Button size="lg" variant="outline" asChild><Link to="/countries">{ar ? 'الدول والأسعار' : 'Countries & prices'}</Link></Button>
          </div>
        )}
      </div>
    </section>
  );
};
export default HomeTwoOptions;
