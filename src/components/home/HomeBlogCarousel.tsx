import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowRight, Calendar, Clock } from 'lucide-react';
import { blogPosts } from '@/data/blogPostsData';

const HomeBlogCarousel = () => {
  const posts = blogPosts.filter((p) => p.featured).slice(0, 10);

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

        <Carousel opts={{ align: 'start', loop: true }} className="w-full">
          <CarouselContent className="-ml-4">
            {posts.map((post) => (
              <CarouselItem key={post.id} className="pl-4 basis-full sm:basis-1/2 lg:basis-1/3">
                <Link to={`/blog/${post.slug}`} className="block h-full group">
                  <Card className="h-full hover:shadow-xl transition-all hover:-translate-y-1 border-border/50 hover:border-primary/40">
                    <CardContent className="p-6 flex flex-col h-full space-y-3">
                      <Badge variant="secondary" className="self-start text-xs">{post.category}</Badge>
                      <h3 className="font-bold text-lg leading-snug group-hover:text-primary transition-colors line-clamp-3">
                        {post.title}
                      </h3>
                      <p className="text-sm text-muted-foreground line-clamp-3 flex-1">
                        {post.description}
                      </p>
                      <div className="flex items-center gap-3 text-xs text-muted-foreground pt-2 border-t">
                        <span className="inline-flex items-center"><Calendar className="w-3 h-3 mr-1" />{post.date}</span>
                        <span className="inline-flex items-center"><Clock className="w-3 h-3 mr-1" />{post.readTime}</span>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="hidden md:flex -left-4" />
          <CarouselNext className="hidden md:flex -right-4" />
        </Carousel>
      </div>
    </section>
  );
};

export default HomeBlogCarousel;