import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import Autoplay from 'embla-carousel-autoplay';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { ArrowRight, Calendar, Clock, BookOpen } from 'lucide-react';
import { blogPosts, type BlogPost } from '@/data/blogPostsData';
import thumbFintech from '@/assets/blog-fintech-virtual-cards-2026.jpg';
import thumbAutomation from '@/assets/blog-business-automation-2026.jpg';
import thumbFormation from '@/assets/blog-best-company-formation-2026.png.asset.json';
import thumbVibe from '@/assets/blog-vibe-coding-2026.jpg';
import thumbPayments from '@/assets/blog-payment-gateways-2026.jpg';
import thumbMomoEn from '@/assets/blog-momoai-business-setup-en.jpg';
import thumbMomoAr from '@/assets/blog-momoai-business-setup-ar.jpg';

// Curated per-slug thumbnails so cards have real imagery even when the
// blog post record itself doesn't carry an image field.
const THUMBS: Record<string, string> = {
  'fintech-virtual-cards-2026': thumbFintech,
  'business-automation-2026': thumbAutomation,
  'best-company-formation-2026': (thumbFormation as { url: string }).url,
  'vibe-coding-platforms-2026': thumbVibe,
  'payment-gateways-2026': thumbPayments,
  'momoai-business-setup-guide-en': thumbMomoEn,
  'momoai-business-setup-guide-ar': thumbMomoAr,
};

// Deterministic gradient fallback per category — no layout shift, no broken image icons.
const catGradient = (cat: string) => {
  const grads = [
    'from-primary/40 via-purple-500/30 to-pink-500/30',
    'from-blue-500/40 via-cyan-500/30 to-teal-500/30',
    'from-orange-500/40 via-rose-500/30 to-red-500/30',
    'from-emerald-500/40 via-lime-500/30 to-yellow-500/30',
    'from-indigo-500/40 via-violet-500/30 to-fuchsia-500/30',
  ];
  let h = 0;
  for (let i = 0; i < cat.length; i++) h = (h * 31 + cat.charCodeAt(i)) >>> 0;
  return grads[h % grads.length];
};

const SkeletonCard = () => (
  <Card className="h-full border-border/50">
    <CardContent className="p-0">
      <Skeleton className="h-40 w-full rounded-t-lg" />
      <div className="p-5 space-y-3">
        <Skeleton className="h-4 w-20" />
        <Skeleton className="h-5 w-11/12" />
        <Skeleton className="h-5 w-3/4" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-5/6" />
        <div className="flex gap-3 pt-2">
          <Skeleton className="h-3 w-16" />
          <Skeleton className="h-3 w-14" />
        </div>
      </div>
    </CardContent>
  </Card>
);

const HomeBlogCarousel = () => {
  const [ready, setReady] = useState(false);
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const autoplay = useRef(
    Autoplay({ delay: 3500, stopOnInteraction: false, stopOnMouseEnter: true })
  );

  useEffect(() => {
    // Simulate async load so skeletons render on first paint — prevents layout shift.
    const t = setTimeout(() => {
      setPosts(blogPosts.filter((p) => p.featured).slice(0, 10));
      setReady(true);
    }, 250);
    return () => clearTimeout(t);
  }, []);

  return (
    <section className="py-14 md:py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-background via-muted/20 to-background">
      <div className="container mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
          className="flex items-end justify-between mb-8 gap-4 flex-wrap"
        >
          <div>
            <Badge variant="secondary" className="mb-3">From the Blog</Badge>
            <h2 className="text-2xl md:text-4xl font-extrabold">
              Founder <span className="gradient-text">Insights</span> & Guides
            </h2>
            <p className="text-muted-foreground mt-2 max-w-2xl">
              Fresh playbooks on company formation, fintech, automation and partner deals.
            </p>
          </div>
          <Button variant="outline" asChild>
            <Link to="/blog">
              View all <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>
        </motion.div>

        <Carousel
          opts={{ align: 'start', loop: true, dragFree: true }}
          plugins={[autoplay.current]}
          className="w-full"
          onMouseLeave={() => autoplay.current.play()}
        >
          <CarouselContent className="-ml-4">
            {!ready
              ? Array.from({ length: 6 }).map((_, i) => (
                  <CarouselItem key={`sk-${i}`} className="pl-4 basis-full sm:basis-1/2 lg:basis-1/3">
                    <SkeletonCard />
                  </CarouselItem>
                ))
              : posts.map((post) => {
                  const thumb = THUMBS[post.slug];
                  return (
                    <CarouselItem key={post.id} className="pl-4 basis-full sm:basis-1/2 lg:basis-1/3">
                      <Link to={`/blog/${post.slug}`} className="block h-full group">
                        <Card className="h-full overflow-hidden hover:shadow-xl transition-all hover:-translate-y-1 border-border/50 hover:border-primary/40">
                          <CardContent className="p-0 flex flex-col h-full">
                            <div className={`relative h-40 w-full bg-gradient-to-br ${catGradient(post.category)} flex items-center justify-center overflow-hidden`}>
                              {thumb ? (
                                <img
                                  src={thumb}
                                  alt={post.title}
                                  loading="lazy"
                                  width={640}
                                  height={320}
                                  className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
                                  onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = 'none'; }}
                                />
                              ) : (
                                <BookOpen className="w-10 h-10 text-white/80" />
                              )}
                              <Badge className="absolute top-3 left-3 shadow-md" variant="secondary">{post.category}</Badge>
                            </div>
                            <div className="p-5 flex flex-col flex-1 space-y-3">
                              <h3 className="font-bold text-lg leading-snug group-hover:text-primary transition-colors line-clamp-2">
                                {post.title}
                              </h3>
                              <p className="text-sm text-muted-foreground line-clamp-3 flex-1">
                                {post.description}
                              </p>
                              <div className="flex items-center gap-3 text-xs text-muted-foreground pt-2 border-t">
                                <span className="inline-flex items-center"><Calendar className="w-3 h-3 mr-1" />{post.date}</span>
                                <span className="inline-flex items-center"><Clock className="w-3 h-3 mr-1" />{post.readTime}</span>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </Link>
                    </CarouselItem>
                  );
                })}
          </CarouselContent>
          <CarouselPrevious className="flex -left-2 md:-left-4" />
          <CarouselNext className="flex -right-2 md:-right-4" />
        </Carousel>

        <div className="mt-10 flex justify-center">
          <Button size="lg" asChild>
            <Link to="/blog">
              View all blogs <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default HomeBlogCarousel;