import { useMemo, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Search, Globe, Layers3, Construction, ArrowRight } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useTranslation } from '@/contexts/TranslationContext';
import { portfolioProjects, developmentProjects, soldDomainSites, soldDomainInventory } from '@/data/portfolioData';

const groups = [
  ['all', 'All platforms', 'كل المنصات'], ['domains', 'Domains', 'الدومينات'],
  ['marketing', 'Links & marketing', 'الروابط والتسويق'], ['content', 'Content & utilities', 'المحتوى والأدوات'],
  ['business', 'Business', 'الأعمال'], ['stores', 'Stores', 'المتاجر'],
];

export default function Portfolio() {
  const { isRTL } = useTranslation();
  const i = isRTL ? 1 : 0;
  const L = (en: string, ar: string) => isRTL ? ar : en;
  const [group, setGroup] = useState('all');
  const [query, setQuery] = useState('');
  const visible = useMemo(() => portfolioProjects.filter(p => (group === 'all' || p.category === group) && `${p.name} ${p.description.join(' ')}`.toLowerCase().includes(query.trim().toLowerCase())), [group, query]);
  const title = L('Our portfolio | Platforms & domain sales | FoundStart', 'سابقة أعمالنا | المنصات ومبيعات الدومينات | FoundStart');
  const description = L('Explore our own platforms and stores, development projects, and all recorded sold domains. Real public previews, clearly separated roles.', 'تعرّف على منصاتنا ومتاجرنا ومشروعاتنا تحت التطوير، وكل الدومينات المباعة المسجلة. معاينات حقيقية وتصنيف واضح لدورنا.');
  return <div className="min-h-screen bg-background" dir={isRTL ? 'rtl' : 'ltr'}>
    <Helmet>
      <title>{title}</title><meta name="description" content={description} />
      <link rel="canonical" href="https://www.foundstart.org/portfolio" />
      <meta property="og:title" content={title} /><meta property="og:description" content={description} />
      <meta property="og:url" content="https://www.foundstart.org/portfolio" />
      <meta property="og:image" content="https://www.foundstart.org/portfolio/foundstart.webp" />
    </Helmet>
    <Header />
    <main>
      <section className="relative overflow-hidden border-b border-border bg-[hsl(222,84%,4.9%)] text-white px-4 py-16 md:py-24">
        <div className="pointer-events-none absolute -top-32 -right-32 w-[500px] h-[500px] rounded-full bg-purple-600/20 blur-[120px]" />
        <div className="relative mx-auto max-w-6xl">
          <p className="text-purple-300 text-sm font-semibold mb-5">{L('FOUNDSTART / OUR WORK', 'FOUNDSTART / سابقة أعمالنا')}</p>
          <h1 className="max-w-4xl text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight mb-6">{L('Platforms we run.', 'منصات بنشغّلها.')}<br /><span className="text-purple-300">{L('Names that found a new home.', 'وأسماء بدأت رحلة جديدة.')}</span></h1>
          <p className="text-white/70 text-base md:text-lg max-w-3xl leading-relaxed">{description}</p>
          <div className="flex flex-wrap gap-3 mt-8">
            <a href="#platforms" className="rounded-full bg-purple-600 hover:bg-purple-500 px-6 py-3 text-sm font-semibold">{L('Explore our platforms', 'تصفح منصاتنا')}</a>
            <a href="#sold-domains" className="rounded-full border border-white/25 hover:bg-white/10 px-6 py-3 text-sm font-semibold">{L('All sold domains', 'كل الدومينات المباعة')}</a>
          </div>
          <p className="mt-8 text-xs text-white/50">{L('Platform previews refreshed: 21 November 2026. Sold-site examples were captured on 12 November; third-party sites may change.', 'تم تحديث معاينات المنصات في ٢١ نوفمبر ٢٠٢٦. أمثلة مواقع الدومينات المباعة التقطت في ١٢ نوفمبر، وقد تتغير مواقع الجهات الأخرى.')}</p>
        </div>
      </section>

      <section id="platforms" className="scroll-mt-24 mx-auto max-w-7xl px-4 sm:px-6 py-14 md:py-20">
        <div className="flex items-center gap-3 mb-3"><Layers3 className="text-primary w-6 h-6" /><h2 className="text-3xl font-bold">{L('Our platforms & stores', 'منصاتنا ومتاجرنا')}</h2></div>
        <p className="text-muted-foreground max-w-3xl leading-relaxed mb-8">{L('Our own brands across domains, software, content and commerce. A public website is not a promise that every integration or paid service is available. Check each platform for its current scope.', 'علاماتنا في الدومينات والبرامج والمحتوى والتجارة. وجود موقع عام لا يعني إتاحة كل تكامل أو خدمة مدفوعة. راجع كل منصة لمعرفة نطاقها الحالي.')}</p>
        <div className="flex flex-col gap-5 mb-8">
          <div className="relative max-w-md"><label className="sr-only" htmlFor="portfolio-search">{L('Search our platforms', 'ابحث في منصاتنا')}</label><Search className="absolute top-3 left-3 w-4 h-4 text-muted-foreground" /><input id="portfolio-search" type="search" value={query} onChange={e => setQuery(e.target.value)} placeholder={L('Search by name or purpose', 'ابحث بالاسم أو الاستخدام')} className="w-full rounded-lg border border-input bg-background py-2.5 pl-10 pr-4 text-sm" /></div>
          <div className="flex flex-wrap gap-2" aria-label={L('Platform categories', 'تصنيفات المنصات')}>{groups.map(g => <button key={g[0]} type="button" aria-pressed={group === g[0]} onClick={() => setGroup(g[0])} className={`rounded-full border px-4 py-2 text-sm transition ${group === g[0] ? 'bg-primary text-primary-foreground border-primary' : 'border-border hover:border-primary text-muted-foreground'}`}>{g[i + 1]}</button>)}</div>
        </div>
        <p className="text-sm text-muted-foreground mb-5" aria-live="polite">{L(`${visible.length} platforms shown`, `${visible.length} منصة معروضة`)}</p>
        <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-6">
          {visible.map(p => <article key={p.id} className="group overflow-hidden rounded-xl border border-border bg-card flex flex-col" data-project={p.id}>
            <div className="aspect-[1365/900] overflow-hidden bg-muted border-b border-border">{p.image ? <a href={p.url} target="_blank" rel="noopener noreferrer" aria-label={L(`Visit ${p.name}`, `افتح ${p.name}`)}><img src={p.image} alt={L(`${p.name} public homepage, November 2026`, `الصفحة العامة لـ ${p.name}، نوفمبر ٢٠٢٦`)} width="1092" height="720" loading="lazy" className="block h-full w-full object-cover object-top transition duration-300 group-hover:scale-[1.02]" /></a> : <div className="h-full flex flex-col items-center justify-center text-muted-foreground gap-3 p-8 text-center"><Globe className="w-12 h-12 opacity-40" /><span className="text-sm">{L('Public preview not available', 'المعاينة العامة غير متاحة')}</span></div>}</div>
            <div className="p-6 flex flex-col flex-1"><span className="text-xs text-primary mb-2">{L('Our platform', 'منصتنا')}</span><h3 className="text-xl font-bold mb-3" dir="ltr" style={{textAlign: isRTL ? 'right' : 'left'}}>{p.name}</h3><p className="text-sm leading-relaxed text-muted-foreground flex-1">{p.description[i]}</p><a href={p.url} target="_blank" rel="noopener noreferrer" className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline">{L('Visit website', 'افتح الموقع')}<ArrowUpRight className="w-4 h-4" /></a></div>
          </article>)}
        </div>
        {visible.length === 0 && <p className="border border-dashed rounded-xl p-10 text-center text-muted-foreground">{L('No platforms match. Try another name or category.', 'لا توجد نتائج. جرّب اسمًا أو تصنيفًا آخر.')}</p>}
      </section>

      <section className="border-y border-border bg-muted/20 py-14 px-4 sm:px-6" id="in-development">
        <div className="mx-auto max-w-7xl"><div className="flex items-center gap-3 mb-3"><Construction className="text-amber-500 w-6 h-6" /><h2 className="text-2xl font-bold">{L('Prelaunch & development', 'قبل الإطلاق وتحت التطوير')}</h2></div><p className="text-muted-foreground mb-7">{L('These projects are part of our work, not live financial-service success stories.', 'المشروعات دي جزء من شغلنا، وليست قصص نجاح لخدمات مالية متاحة.')}</p>
          <div className="grid md:grid-cols-3 gap-5">{developmentProjects.map(p => <article key={p.id} className="rounded-xl border border-border bg-card overflow-hidden">{'image' in p && p.image && <img src={p.image} alt={L(`${p.name} public prelaunch page`, `صفحة ${p.name} العامة قبل الإطلاق`)} className="aspect-[1365/900] w-full object-cover object-top border-b" width="1092" height="720" loading="lazy" />}<div className="p-6"><span className="inline-flex text-xs border border-amber-500/30 text-amber-600 dark:text-amber-300 rounded-full px-3 py-1 mb-4">{L('Not launched', 'لم يُطلق بعد')}</span><h3 className="text-xl font-bold mb-3" dir="ltr" style={{textAlign: isRTL ? 'right' : 'left'}}>{p.name}</h3><p className="text-sm text-muted-foreground leading-relaxed">{p.description[i]}</p>{'url' in p && p.url && <a href={p.url} className="inline-flex items-center gap-2 mt-4 text-sm text-primary hover:underline" target="_blank" rel="noopener noreferrer">{L('Public prelaunch page', 'الصفحة العامة قبل الإطلاق')}<ArrowUpRight className="w-4 h-4" /></a>}</div></article>)}</div>
        </div>
      </section>

      <section id="sold-domains" className="scroll-mt-24 mx-auto max-w-7xl px-4 sm:px-6 py-14 md:py-20">
        <p className="text-primary text-sm font-semibold mb-3">{L('DOMAIN SALES / A DIFFERENT ROLE', 'مبيعات الدومينات / دور مختلف')}</p><h2 className="text-3xl font-bold mb-4">{L('All recorded sold domains', 'كل الدومينات المباعة المسجلة')}</h2>
        <div className="rounded-xl border border-purple-500/30 bg-purple-500/5 p-5 text-sm leading-relaxed mb-8 max-w-4xl"><strong>{L('Our role was the domain sale only.', 'دورنا كان بيع الدومين فقط.')}</strong> {L('These names appear in our completed-sale records. Their current websites are independent third-party sites. We do not claim to have built or operated them, and their appearance here is not an endorsement, testimonial or verified customer result. Screenshots and availability notes document public pages checked on 21 November 2026.', 'الأسماء دي موجودة في سجل مبيعاتنا المكتملة. المواقع الحالية جهات مستقلة؛ لا ندّعي إننا طوّرناها أو بنشغّلها. عرضها هنا ليس توصية أو شهادة عميل أو نتيجة تجارية موثّقة. الصور وملاحظات الإتاحة بتوثّق الصفحات العامة وقت المراجعة في ٢١ نوفمبر ٢٠٢٦.')}</div>
        <p className="text-sm text-muted-foreground mb-5">{L('13 sold names in our records. A domain sale does not mean we developed or operate the buyer’s website. No sale prices or buyer details are shown.', '١٣ دومينا مباعا في سجلاتنا. بيع الدومين لا يعني أننا طوّرنا موقع المشتري أو نشغّله. لا نعرض أسعار البيع أو بيانات المشترين.')}</p>
        <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-10">{soldDomainInventory.map(name => <li key={name} className="rounded-xl border border-border bg-card px-5 py-4 flex items-center justify-between gap-3"><span dir="ltr" className="font-semibold">{name}</span><span className="rounded-full bg-primary/10 text-primary text-xs px-3 py-1">{L('Sold', 'تم البيع')}</span></li>)}</ul>
        <h3 className="text-xl font-bold mb-5">{L('Public-site preview for every sold name', 'معاينة الموقع العام لكل دومين مباع')}</h3>
        <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-6">{soldDomainSites.map(p => <article key={p.id} className="overflow-hidden rounded-xl border border-border bg-card flex flex-col" data-sold-domain={p.id}>{p.image ? <img src={p.image} width="1092" height="720" loading="lazy" className="aspect-[1365/900] w-full object-cover object-top border-b border-border" alt={L(`Actual public page captured on 21 November 2026 for ${p.name}`, `الصفحة العامة الفعلية الملتقطة في ٢١ نوفمبر ٢٠٢٦ لـ ${p.name}`)} /> : <div className="aspect-[1365/900] border-b border-border bg-muted/30 flex flex-col items-center justify-center p-8 text-center gap-3"><Globe className="w-9 h-9 text-muted-foreground" /><p className="font-semibold">{L('Public preview unavailable', 'معاينة الموقع العام غير متاحة')}</p><p className="text-xs text-muted-foreground leading-relaxed">{L('Checked 21 November 2026. No substitute image.', 'تمت المراجعة في ٢١ نوفمبر ٢٠٢٦. بدون صورة بديلة.')}</p></div>}<div className="p-6 flex-1 flex flex-col"><span className="text-xs text-muted-foreground mb-2">{p.status === 'unavailable' ? L('Sold domain / preview unavailable', 'دومين مباع / المعاينة غير متاحة') : p.status === 'sale' ? L('Sold domain / current sale page', 'دومين مباع / صفحة بيع حالية') : L('Domain sold by us / independent website', 'دومين بعناه / موقع مستقل')}</span><h3 className="text-xl font-bold mb-3" dir="ltr" style={{textAlign: isRTL ? 'right' : 'left'}}>{p.name}</h3><p className="text-sm leading-relaxed text-muted-foreground flex-1">{p.description[i]}</p><a href={p.url} target="_blank" rel="noopener noreferrer nofollow" className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline">{p.status === 'unavailable' ? L('Try the domain', 'جرب فتح الدومين') : L('View current page', 'افتح الصفحة الحالية')}<ArrowUpRight className="w-4 h-4" /></a></div></article>)}</div>
        <p className="text-xs text-muted-foreground mt-6 leading-relaxed">{L('All 13 recorded sold names have a preview card: 8 real public-page captures and 5 unavailable-preview notices. A sale/parking page is labelled as such. Third-party pages and availability can change.', 'كل الدومينات المباعة المسجلة وعددها ١٣ لها بطاقة معاينة: ٨ صور فعلية لصفحات عامة و٥ ملاحظات بتعذر المعاينة. صفحة البيع أو الركن موضحة كده. صفحات الجهات الخارجية وإتاحتها ممكن تتغير.')}</p>
      </section>
      <section className="mx-auto max-w-7xl px-4 sm:px-6 pb-16"><div className="rounded-2xl border border-border bg-card p-8 md:p-10 flex flex-col md:flex-row md:items-center justify-between gap-6"><div><h2 className="text-2xl font-bold mb-2">{L('Have a project in mind?', 'عندك مشروع عايز تنفّذه؟')}</h2><p className="text-muted-foreground">{L('See our digital services and tell us what you need.', 'شوف خدماتنا الرقمية واحكيلنا عن احتياجك.')}</p></div><Link className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary text-primary-foreground px-6 py-3 font-semibold" to="/digital-services">{L('Digital services', 'الخدمات الرقمية')}<ArrowRight className={`w-4 h-4 ${isRTL ? 'rotate-180' : ''}`} /></Link></div></section>
    </main><Footer />
  </div>;
}
