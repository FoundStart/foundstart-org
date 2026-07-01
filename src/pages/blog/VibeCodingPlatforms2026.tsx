import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import VideoModal from '@/components/VideoModal';
import { ArrowLeft, Calendar, User, Clock, ExternalLink, Sparkles, PlayCircle, Code2 } from 'lucide-react';
import heroImg from '@/assets/blog-vibe-coding-2026.jpg';
import { withUtm } from '@/utils/utm';

const CAMPAIGN = 'vibe-coding-platforms-2026';
const tag = (url: string, content: string) =>
  withUtm(url, { source: 'blog', medium: 'inline', campaign: CAMPAIGN, content });

const TITLE = 'Best Vibe Coding Platforms in 2026: Build Full-Stack Web & Mobile Apps with AI';
const DESCRIPTION =
  'MoMoAI\u2019s 2026 guide to the top AI vibe-coding platforms \u2014 build full-stack web apps, mobile apps and e-commerce stores in minutes with Lovable, Emergent, Base44, Blackbox, Rork, Builder.io and more.';

type Platform = {
  name: string;
  category: string;
  description: string;
  url: string;
  video?: string;
};

const PLATFORMS: Platform[] = [
  { name: 'Emergent', category: 'Full-Stack Web & Mobile', description: 'Build full-stack web & mobile apps in minutes.', url: 'https://shortet.com/GetEmergen' },
  { name: 'Lovable', category: 'AI No-Code Full-Stack', description: 'AI no-code full-stack AI app builder.', url: 'https://shortet.com/Lovable', video: 'https://www.youtube.com/watch?v=mOak_imYmqU' },
  { name: 'Blackbox', category: 'AI No-Code App & Web', description: 'AI no-code app & web builder.', url: 'https://shortet.com/Blackbox', video: 'https://www.youtube.com/watch?v=6smHXL5DOMQ' },
  { name: 'Base44', category: 'Full-Stack Apps', description: 'Build fully-functional apps with AI.', url: 'https://shortet.com/Base44', video: 'https://www.youtube.com/watch?v=osm8zUrbugc' },
  { name: 'Atoms Dev', category: 'Products That Sell', description: 'Turn ideas into products that sell.', url: 'https://shortet.com/atoms-dev', video: 'https://www.youtube.com/watch?v=ap43yKEDO0A' },
  { name: 'Rork', category: 'AI No-Code Full-Stack', description: 'AI no-code full-stack AI app builder.', url: 'https://shortet.com/Rork', video: 'https://www.youtube.com/watch?v=VTg-TBAuHzA' },
  { name: 'Aitmpl', category: 'Claude Code Templates', description: 'Claude Code template marketplace.', url: 'https://shortet.com/Aitmpl', video: 'https://www.youtube.com/watch?v=zK3JznwUYdE' },
  { name: 'APPGen', category: 'Mobile Apps', description: 'Build full mobile apps with AI.', url: 'https://shortet.com/APPGen', video: 'https://www.youtube.com/watch?v=vNf-v_a-W8A' },
  { name: 'Blink', category: 'Instant Apps', description: 'Turn any idea into a beautiful, working app in seconds.', url: 'https://shortet.com/Blink', video: 'https://www.youtube.com/watch?v=3RB6hBQbCA0' },
  { name: 'Builder.io', category: 'Visual Deployment', description: 'Visual deployment platform for apps and sites.', url: 'https://shortet.com/Builder-IO', video: 'https://www.youtube.com/watch?v=ZQEGVhw9kog' },
  { name: 'Buildnatively', category: 'Website → Mobile App', description: 'Convert any website into a mobile app.', url: 'https://shortet.com/Buildnatively', video: 'https://www.youtube.com/watch?v=VfNRd5Rk0cM' },
  { name: 'FlutterFlow', category: 'No-Code Apps', description: 'No-code app builder with Flutter output.', url: 'https://shortet.com/flutterflow', video: 'https://www.youtube.com/watch?v=RMGSXYp-eLk' },
  { name: 'HeyBoss', category: 'Business in 10 Minutes', description: 'Launch your business in 10 minutes with AI.', url: 'https://shortet.com/HeyBoss', video: 'https://www.youtube.com/watch?v=RSTDhACFJtg' },
  { name: 'Medo Dev', category: 'Full-Stack Apps', description: 'Build full-stack apps by AI.', url: 'https://shortet.com/Medo-Dev', video: 'https://www.youtube.com/watch?v=PSP3_UbfuzQ' },
  { name: 'OnSpace', category: 'AI App Platform', description: 'OnSpace AI \u2014 build & deploy AI apps.', url: 'https://shortet.com/OnSpace', video: 'https://www.youtube.com/watch?v=AqUpzZRZAyA' },
  { name: 'Tempo', category: 'AI No-Code Full-Stack', description: 'AI no-code full-stack app builder.', url: 'https://shortet.com/Tempo', video: 'https://www.youtube.com/watch?v=yVOUR256vz4' },
  { name: 'Twinr', category: 'No-Code Apps', description: 'No-code mobile app builder.', url: 'https://shortet.com/Twinr', video: 'https://www.youtube.com/watch?v=lwZHlIEhWW0' },
  { name: 'YouWare', category: 'Community & Templates', description: 'AI vibe-coding community & templates.', url: 'https://shortet.com/YouWare', video: 'https://www.youtube.com/watch?v=wY3TLikRWEo' },
  { name: 'Convex', category: 'Backend / Database', description: 'Open-source reactive database for app developers.', url: 'https://shortet.com/convex' },
  { name: 'Emergent (Full Stack)', category: 'Full-Stack Web & Mobile', description: 'AI full-stack app builder.', url: 'https://shortet.com/Emergent', video: 'https://www.youtube.com/watch?v=9gBMJqjXba8' },
  { name: 'Fourthwall', category: 'E-Commerce', description: 'E-commerce shop (POD, digital & physical).', url: 'https://shortet.com/Fourthwall', video: 'https://www.youtube.com/watch?v=U5MT2DTGMiM' },
  { name: 'Passion', category: 'No-Code Apps', description: 'No-code app builder.', url: 'https://shortet.com/Passion', video: 'https://www.youtube.com/watch?v=8LCzq1vEkOk' },
  { name: 'Purelanderas', category: 'CPA Landing Pages', description: 'CPA landing page creation.', url: 'https://shortet.com/Purelanderas', video: 'https://www.youtube.com/watch?v=-SEMZ6jJ8Dw' },
  { name: 'Softlite', category: 'Clone to Page Builder', description: 'Clone websites to your page builder with AI.', url: 'https://shortet.com/Softlite', video: 'https://www.youtube.com/watch?v=jeYBeqp-b3w' },
  { name: 'Softr', category: 'Airtable / Sheets Apps', description: 'Create web & mobile apps from Airtable & Sheets.', url: 'https://shortet.com/Softr', video: 'https://www.youtube.com/watch?v=h1gmBEnRj2k' },
  { name: 'Stacksmarket', category: 'Digitize Business', description: 'Digitize your entire business with AI in one click.', url: 'https://shortet.com/Stacksmarket', video: 'https://www.youtube.com/watch?v=VqiVc4_0lSg' },
  { name: 'Stunning', category: 'Website Chat Builder', description: 'Build websites by chatting with AI.', url: 'https://shortet.com/Stunning', video: 'https://www.youtube.com/watch?v=PqIY_nEDPrI' },
  { name: 'EasySite', category: 'AI No-Code Full-Stack', description: 'AI no-code full-stack app & site builder.', url: 'https://shortet.com/EasySite', video: 'https://www.youtube.com/watch?v=d2CujxoK4p0' },
  { name: 'CodeDesign', category: 'Build/Host/Export Sites', description: 'AI website builder \u2014 build, host & export.', url: 'https://shortet.com/Code-design', video: 'https://www.youtube.com/watch?v=JdruFdxyMb4' },
  { name: 'CopyCoder', category: 'Prompt Engineering', description: 'Create powerful prompts for AI coding tools.', url: 'https://shortet.com/Copycoder', video: 'https://www.youtube.com/watch?v=iezDhaTXlcw' },
  { name: 'Andromo', category: 'No-Code Apps', description: 'No-code mobile app builder.', url: 'https://shortet.com/Andromo', video: 'https://www.youtube.com/watch?v=ov8C7YlH40k' },
  { name: 'Appcreator24', category: 'No-Code Apps', description: 'No-code Android app builder.', url: 'https://shortet.com/Appcreatore24', video: 'https://www.youtube.com/watch?v=wMHyLXp1y0o' },
  { name: 'Appsgeyser', category: 'No-Code Apps', description: 'No-code app builder for Android.', url: 'https://shortet.com/Appsgeyser', video: 'https://www.youtube.com/watch?v=BdwHcAPKPJY' },
  { name: 'Appy Pie', category: 'No-Code Apps', description: 'No-code app builder platform.', url: 'https://shortet.com/appypie', video: 'https://www.youtube.com/watch?v=bRpp9_dcoEU' },
  { name: 'Blazr', category: 'E-Commerce', description: 'E-commerce shop builder.', url: 'https://shortet.com/blazr', video: 'https://www.youtube.com/watch?v=B8a3VHaGXF8' },
  { name: 'Claude', category: 'AI Web Building', description: 'Free web building with Claude AI.', url: 'https://shortet.com/Claude', video: 'https://www.youtube.com/watch?v=CSt23RTkmbQ' },
  { name: 'Easyorder', category: 'E-Commerce', description: 'Build your store in 5 minutes.', url: 'https://shortet.com/easy-orders', video: 'https://www.youtube.com/watch?v=2o8npPSGNXg' },
  { name: 'Lovablehtml', category: 'SEO / AI Visibility', description: 'Fix Lovable SEO & AI visibility.', url: 'https://shortet.com/lovablehtml', video: 'https://www.youtube.com/watch?v=Y9OUJUdr8vo' },
  { name: 'Manus', category: 'Autonomous LLM', description: 'Manus autonomous LLM agent.', url: 'https://shortet.com/Manus', video: 'https://www.youtube.com/watch?v=tV5jB38Jilo' },
  { name: 'Mobeasy', category: 'No-Code Apps', description: 'No-code mobile app builder.', url: 'https://shortet.com/Mobeasy', video: 'https://www.youtube.com/watch?v=U8UXGUZdNcU' },
  { name: 'Mobella', category: 'No-Code Apps', description: 'No-code mobile app builder.', url: 'https://shortet.com/Mobella', video: 'https://www.youtube.com/watch?v=anEvUJL0unI' },
];

const VibeCodingPlatforms2026: React.FC = () => {
  const [video, setVideo] = useState<{ url: string; title: string } | null>(null);

  const articleLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: TITLE,
    description: DESCRIPTION,
    image: [heroImg],
    datePublished: '2026-06-28',
    author: { '@type': 'Organization', name: 'MoMoAI' },
    publisher: { '@type': 'Organization', name: 'FoundStart' },
    mainEntityOfPage: 'https://foundstart.org/blog/vibe-coding-platforms-2026',
  };

  const faqLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      { '@type': 'Question', name: 'What is vibe coding?', acceptedAnswer: { '@type': 'Answer', text: 'Vibe coding is the practice of building full-stack web and mobile apps by describing them in natural language to an AI, which generates and deploys the code for you.' } },
      { '@type': 'Question', name: 'What is the best AI no-code full-stack platform in 2026?', acceptedAnswer: { '@type': 'Answer', text: 'Lovable, Emergent, Base44 and Rork are the leading AI no-code full-stack platforms, each with a distinct focus on web apps, mobile apps or product-market-fit iteration.' } },
      { '@type': 'Question', name: 'Can I build a mobile app without coding?', acceptedAnswer: { '@type': 'Answer', text: 'Yes \u2014 APPGen, FlutterFlow, Rork, Twinr and Buildnatively let you build production-ready mobile apps without writing code.' } },
    ],
  };

  const PartnerCard: React.FC<{ p: Platform }> = ({ p }) => (
    <Card className="hover:shadow-lg transition-shadow">
      <CardContent className="p-5 space-y-3">
        <div className="flex items-start justify-between gap-2">
          <h4 className="font-semibold text-base">{p.name}</h4>
          <Badge variant="secondary" className="text-xs">{p.category}</Badge>
        </div>
        <p className="text-sm text-muted-foreground">{p.description}</p>
        <div className="flex flex-wrap gap-2 items-center">
          <Button asChild size="sm">
            <a href={tag(p.url, p.name)} target="_blank" rel="noopener noreferrer sponsored">
              Visit <ExternalLink className="w-4 h-4 ml-1.5" />
            </a>
          </Button>
          {p.video && (
            <Button size="sm" variant="outline" onClick={() => setVideo({ url: p.video!, title: `${p.name} \u2014 Demo & Review` })}>
              <PlayCircle className="w-4 h-4 mr-1.5" /> Watch
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );

  return (
    <>
      <Helmet>
        <title>{TITLE} | FoundStart Blog</title>
        <meta name="description" content={DESCRIPTION} />
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1" />
        <meta name="keywords" content="vibe coding, AI no-code, Lovable, Emergent, Base44, Blackbox, Rork, Builder.io, FlutterFlow, APPGen, Claude, full-stack AI, no-code apps 2026" />
        <meta property="og:type" content="article" />
        <meta property="og:title" content={TITLE} />
        <meta property="og:description" content={DESCRIPTION} />
        <meta property="og:image" content={heroImg} />
        <meta name="twitter:card" content="summary_large_image" />
        <link rel="canonical" href="https://foundstart.org/blog/vibe-coding-platforms-2026" />
        <script type="application/ld+json">{JSON.stringify(articleLd)}</script>
        <script type="application/ld+json">{JSON.stringify(faqLd)}</script>
      </Helmet>

      <div className="min-h-screen bg-background">
        <Header />
        <main className="pt-24 pb-20">
          <article className="container mx-auto max-w-4xl px-4">
            <Link to="/blog" className="inline-flex items-center text-sm text-muted-foreground hover:text-primary mb-6">
              <ArrowLeft className="w-4 h-4 mr-1" /> Back to Blog
            </Link>
            <Badge className="mb-3"><Sparkles className="w-3 h-3 mr-1" /> Vibe Coding</Badge>
            <h1 className="text-3xl md:text-5xl font-bold leading-tight mb-4">{TITLE}</h1>
            <p className="text-lg text-muted-foreground mb-6">{DESCRIPTION}</p>
            <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-8">
              <span className="inline-flex items-center"><User className="w-4 h-4 mr-1.5" /> MoMoAI</span>
              <span className="inline-flex items-center"><Calendar className="w-4 h-4 mr-1.5" /> Jun 28, 2026</span>
              <span className="inline-flex items-center"><Clock className="w-4 h-4 mr-1.5" /> 15 min read</span>
            </div>
            <img src={heroImg} alt="AI vibe coding platforms 2026" width={1536} height={896} className="w-full rounded-xl border shadow-lg mb-10" />

            <div className="prose prose-lg dark:prose-invert max-w-none">
              <p>
                In 2026 you don\u2019t write apps line-by-line \u2014 you <strong>describe them</strong>. \u201CVibe coding\u201D
                platforms turn a prompt into a full-stack web app, a mobile app or an e-commerce store in minutes. This
                MoMoAI guide covers 40+ platforms across every category, with the exact demo videos we used to evaluate them.
              </p>

              <h2><Code2 className="inline w-6 h-6 mr-2" />Full-Stack Web & Mobile Builders</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 not-prose my-6">
                {PLATFORMS.filter((p) => /Full-Stack|Instant|Business in|Products That|Chat Builder|AI App/i.test(p.category)).map((p) => <PartnerCard key={p.name} p={p} />)}
              </div>

              <h2>Mobile App Builders</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 not-prose my-6">
                {PLATFORMS.filter((p) => /No-Code Apps|Mobile Apps|Website \u2192 Mobile App/i.test(p.category)).map((p) => <PartnerCard key={p.name} p={p} />)}
              </div>

              <h2>E-Commerce & Landing Pages</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 not-prose my-6">
                {PLATFORMS.filter((p) => /E-Commerce|CPA Landing|Clone to|Airtable/i.test(p.category)).map((p) => <PartnerCard key={p.name} p={p} />)}
              </div>

              <h2>Backend, Templates & AI Utilities</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 not-prose my-6">
                {PLATFORMS.filter((p) => /Backend|Claude Code|Community|Prompt|SEO|Autonomous|Build\/Host|Digitize|Visual/i.test(p.category)).map((p) => <PartnerCard key={p.name} p={p} />)}
              </div>

              <h2>The MoMoAI Vibe-Coding Stack</h2>
              <ul>
                <li><strong>Web app first:</strong> Lovable or Emergent \u2014 fastest path to production.</li>
                <li><strong>Mobile companion:</strong> Rork or APPGen if you need native.</li>
                <li><strong>Backend:</strong> Convex for reactive database.</li>
                <li><strong>E-commerce:</strong> Fourthwall for POD/physical/digital storefronts.</li>
                <li><strong>Templates & prompts:</strong> Aitmpl + CopyCoder to accelerate every prompt.</li>
              </ul>
            </div>
          </article>
        </main>
        <Footer />
      </div>

      {video && (
        <VideoModal isOpen={!!video} onClose={() => setVideo(null)} videoUrl={video.url} title={video.title} />
      )}
    </>
  );
};

export default VibeCodingPlatforms2026;