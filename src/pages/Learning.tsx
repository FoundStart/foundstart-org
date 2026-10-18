import { useState } from 'react';
import { Youtube, Play } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PageHero from '@/components/PageHero';
import { Button } from '@/components/ui/button';
import { useTranslation } from '@/contexts/TranslationContext';
import { mediaVideos, youtubeChannels } from '@/data/mediaVideos';
import { coursePlaylists, type CoursePlaylist } from '@/data/coursePlaylists';

const ui = {
  en: { title: 'Free Video', highlight: 'Courses', subtitle: 'Step-by-step video courses from real experience. Each course is a YouTube playlist: watch in order or jump to any part.', parts: 'Parts', playlist: 'Open playlist on YouTube', channel: 'Our YouTube channel', part: 'Part' },
  ar: { title: 'كورسات فيديو', highlight: 'مجانية', subtitle: 'كورسات فيديو خطوة بخطوة من خبرة حقيقية. كل كورس Playlist على يوتيوب: شاهد بالترتيب أو انتقل لأي جزء.', parts: 'الأجزاء', playlist: 'افتح الـ Playlist على يوتيوب', channel: 'قناتنا على يوتيوب', part: 'الجزء' },
};
const fmt = (s: number) => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`;

const Course = ({ c, l }: { c: CoursePlaylist; l: typeof ui.en }) => {
  const parts = mediaVideos.filter((v) => v.lang === c.lang && v.category === c.category).sort((a, b) => (a.part ?? 0) - (b.part ?? 0));
  const [current, setCurrent] = useState<string | null>(null);
  const src = current
    ? `https://www.youtube-nocookie.com/embed/${current}?list=${c.playlistId}&rel=0&autoplay=1`
    : `https://www.youtube-nocookie.com/embed/videoseries?list=${c.playlistId}&rel=0`;
  return (
    <section className="mb-16" id={c.category}>
      <h2 className="text-2xl md:text-3xl font-bold mb-2">{c.title}</h2>
      <p className="text-muted-foreground mb-5 max-w-3xl">{c.description}</p>
      <div className="grid lg:grid-cols-3 gap-6 items-start">
        <div className="lg:col-span-2">
          <div className="aspect-video bg-black rounded-xl overflow-hidden">
            <iframe key={src} className="w-full h-full" src={src} title={c.title} loading="lazy"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen />
          </div>
          <a className="inline-flex items-center gap-1 mt-3 text-sm text-primary hover:underline" href={`https://www.youtube.com/playlist?list=${c.playlistId}`} target="_blank" rel="noopener noreferrer">
            <Youtube className="w-4 h-4 mx-1" />{l.playlist}
          </a>
        </div>
        <div className="rounded-xl border bg-card">
          <div className="px-4 py-3 border-b font-semibold">{l.parts} ({parts.length})</div>
          <ol className="max-h-[420px] overflow-y-auto divide-y">
            {parts.map((v) => (
              <li key={v.id}>
                <button type="button" onClick={() => setCurrent(v.id)} className={`w-full flex items-start gap-3 px-4 py-3 text-start hover:bg-muted/60 transition-colors ${current === v.id ? 'bg-muted' : ''}`}>
                  <span className="mt-0.5 w-6 h-6 shrink-0 rounded-full bg-primary/10 text-primary text-xs font-semibold flex items-center justify-center">{v.part}</span>
                  <span className="flex-1 text-sm leading-snug">{v.title}</span>
                  <span className="text-xs text-muted-foreground shrink-0" dir="ltr">{fmt(v.seconds)}</span>
                </button>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
};

const Learning = () => {
  const { language, setLanguage, isRTL } = useTranslation();
  const l = ui[language];
  const courses = coursePlaylists.filter((c) => c.lang === language);
  return (
    <div className="min-h-screen bg-background" dir={isRTL ? 'rtl' : 'ltr'}>
      <Header />
      <main>
        <PageHero title={l.title} highlight={l.highlight} subtitle={l.subtitle} />
        <div className="py-10 px-4 sm:px-6 lg:px-8">
          <div className="container mx-auto max-w-7xl">
            <div className="flex flex-wrap items-center justify-between gap-4 mb-10">
              <div className="inline-flex rounded-lg border p-1" role="tablist" aria-label="Language">
                {(['en', 'ar'] as const).map((k) => (
                  <button key={k} type="button" role="tab" aria-selected={language === k} onClick={() => setLanguage(k)}
                    className={`px-5 py-1.5 rounded-md text-sm font-medium transition-colors ${language === k ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:text-foreground'}`}>
                    {k === 'en' ? 'English' : 'العربية'}
                  </button>
                ))}
              </div>
              <Button variant="outline" asChild>
                <a href={youtubeChannels[language]} target="_blank" rel="noopener noreferrer"><Youtube className="w-4 h-4 mx-2" />{l.channel}</a>
              </Button>
            </div>
            {courses.map((c) => <Course key={c.playlistId} c={c} l={l} />)}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Learning;
