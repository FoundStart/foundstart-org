import { useMemo, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Youtube, Play, ExternalLink, X } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PageHero from '@/components/PageHero';
import { useTranslation } from '@/contexts/TranslationContext';
import { mediaVideos, youtubeChannels, type MediaCategory, type MediaVideo } from '@/data/mediaVideos';

const labels: Record<MediaCategory, { en: string; ar: string }> = {
  'course-dt': { en: 'Domain Trading Course', ar: 'كورس تجارة الدومينات' },
  'course-dp': { en: 'Digital Products Course', ar: 'كورس المنتجات الرقمية' },
  'course-aff': { en: 'Affiliate Marketing Course', ar: 'كورس التسويق بالعمولة' },
  affiliate: { en: 'Tools & Platforms', ar: 'المنصات والأدوات' },
  products: { en: 'Products & Launches', ar: 'المنتجات والإطلاقات' },
  books: { en: 'Books & Guides', ar: 'الكتب والأدلة' },
  shorts: { en: 'Shorts', ar: 'فيديوهات قصيرة' },
};
const order: MediaCategory[] = ['course-dt', 'course-dp', 'course-aff', 'affiliate', 'products', 'books', 'shorts'];

const ui = {
  en: {
    title: 'Media &', highlight: 'Videos',
    subtitle: 'Free video courses, platform reviews and product walkthroughs for founders, freelancers and online sellers.',
    search: 'Search videos...', all: 'All', watch: 'Watch', close: 'Close', empty: 'No videos match your search.',
    channel: 'Our YouTube channel', open: 'Open on YouTube', videos: 'videos', part: 'Part',
  },
  ar: {
    title: 'الميديا و', highlight: 'الفيديوهات',
    subtitle: 'كورسات فيديو مجانية، مراجعات منصات وشروحات منتجات لرواد الأعمال والفريلانسرز وبائعي الإنترنت.',
    search: 'ابحث في الفيديوهات...', all: 'الكل', watch: 'شاهد', close: 'إغلاق', empty: 'مفيش فيديوهات مطابقة للبحث.',
    channel: 'قناتنا على يوتيوب', open: 'افتح على يوتيوب', videos: 'فيديو', part: 'الجزء',
  },
};

const fmt = (s: number) => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`;

const Thumb = ({ v, onPlay, label }: { v: MediaVideo; onPlay: () => void; label: string }) => (
  <button type="button" onClick={onPlay} aria-label={`${label}: ${v.title}`} className="group relative block w-full aspect-video overflow-hidden bg-muted">
    <img
      src={`https://i.ytimg.com/vi/${v.id}/maxresdefault.jpg`}
      onError={(e) => { const i = e.currentTarget; if (!i.dataset.fb) { i.dataset.fb = '1'; i.src = `https://i.ytimg.com/vi/${v.id}/hqdefault.jpg`; } }}
      alt={v.title} loading="lazy" className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
    />
    <span className="absolute inset-0 flex items-center justify-center bg-black/10 group-hover:bg-black/30 transition-colors">
      <span className="w-14 h-14 rounded-full bg-white/95 flex items-center justify-center shadow-lg"><Play className="w-6 h-6 text-primary ml-0.5" fill="currentColor" /></span>
    </span>
    <span className="absolute bottom-2 right-2 rounded bg-black/80 px-1.5 py-0.5 text-xs font-medium text-white" dir="ltr">{fmt(v.seconds)}</span>
  </button>
);

const Media = () => {
  const { language, setLanguage, isRTL } = useTranslation();
  const l = ui[language];
  const [q, setQ] = useState('');
  const [cat, setCat] = useState<'all' | MediaCategory>('all');
  const [playing, setPlaying] = useState<MediaVideo | null>(null);

  const inLang = useMemo(() => mediaVideos.filter((v) => v.lang === language), [language]);
  const cats = order.filter((c) => inLang.some((v) => v.category === c));
  const shown = useMemo(() => {
    const term = q.trim().toLowerCase();
    return inLang
      .filter((v) => (cat === 'all' || v.category === cat) && (!term || v.title.toLowerCase().includes(term)))
      .sort((a, b) => order.indexOf(a.category) - order.indexOf(b.category) || (a.part ?? 0) - (b.part ?? 0));
  }, [inLang, q, cat]);
  const groups = order.map((c) => ({ c, items: shown.filter((v) => v.category === c) })).filter((g) => g.items.length);
  const activeCat = cat !== 'all' && !cats.includes(cat) ? 'all' : cat;

  return (
    <div className="min-h-screen bg-background" dir={isRTL ? 'rtl' : 'ltr'}>
      <Header />
      <main>
        <PageHero title={l.title} highlight={l.highlight} subtitle={l.subtitle} />
        <section className="py-10 px-4 sm:px-6 lg:px-8">
          <div className="container mx-auto max-w-7xl">
            <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
              <div className="inline-flex rounded-lg border p-1" role="tablist" aria-label="Language">
                {(['en', 'ar'] as const).map((k) => (
                  <button key={k} type="button" role="tab" aria-selected={language === k}
                    onClick={() => { setLanguage(k); setCat('all'); }}
                    className={`px-5 py-1.5 rounded-md text-sm font-medium transition-colors ${language === k ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:text-foreground'}`}>
                    {k === 'en' ? 'English' : 'العربية'}
                  </button>
                ))}
              </div>
              <Button variant="outline" asChild>
                <a href={youtubeChannels[language]} target="_blank" rel="noopener noreferrer"><Youtube className="w-4 h-4 mx-2" />{l.channel}</a>
              </Button>
            </div>

            <Input placeholder={l.search} value={q} onChange={(e) => setQ(e.target.value)} className="max-w-md mb-4" />
            <div className="flex flex-wrap gap-2 mb-10">
              <Button size="sm" variant={activeCat === 'all' ? 'default' : 'outline'} onClick={() => setCat('all')}>{l.all} ({inLang.length})</Button>
              {cats.map((c) => (
                <Button key={c} size="sm" variant={activeCat === c ? 'default' : 'outline'} onClick={() => setCat(c)}>
                  {labels[c][language]} ({inLang.filter((v) => v.category === c).length})
                </Button>
              ))}
            </div>

            {groups.length === 0 && <p className="text-center text-muted-foreground py-16">{l.empty}</p>}

            {groups.map(({ c, items }) => (
              <div key={c} className="mb-14">
                <h2 className="text-2xl font-bold mb-5">{labels[c][language]} <span className="text-base font-normal text-muted-foreground">· {items.length} {l.videos}</span></h2>
                <div className={c === 'shorts' ? 'grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5' : 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'}>
                  {items.map((v) => (
                    <article key={v.id} className="rounded-xl border bg-card overflow-hidden hover:shadow-lg transition-shadow">
                      <Thumb v={v} onPlay={() => setPlaying(v)} label={l.watch} />
                      <div className="p-4">
                        <h3 className="font-semibold leading-snug line-clamp-3">{v.title}</h3>
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
      <Footer />

      {playing && (
        <div className="fixed inset-0 z-[100] bg-black/80 flex items-center justify-center p-4" onClick={() => setPlaying(null)} role="dialog" aria-modal="true">
          <div className="w-full max-w-4xl" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-2 text-white gap-3">
              <h3 className="font-semibold line-clamp-2">{playing.title}</h3>
              <button type="button" onClick={() => setPlaying(null)} aria-label={l.close} className="p-1 shrink-0"><X className="w-6 h-6" /></button>
            </div>
            <div className="aspect-video bg-black">
              <iframe className="w-full h-full" src={`https://www.youtube-nocookie.com/embed/${playing.id}?autoplay=1&rel=0`} title={playing.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen />
            </div>
            <a className="inline-flex items-center gap-1 mt-2 text-sm text-white/80 hover:text-white" href={`https://www.youtube.com/watch?v=${playing.id}`} target="_blank" rel="noopener noreferrer">
              <ExternalLink className="w-4 h-4" />{l.open}
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

export default Media;
