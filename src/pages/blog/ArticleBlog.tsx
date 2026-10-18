import React, { useEffect } from 'react';
import { useTranslation } from '@/contexts/TranslationContext';
import { useParams, Link, Navigate } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Calendar, User, Clock, ArrowRight } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import { shortetArticles as baseArticles, shortetArticleOrder as baseOrder } from '@/data/shortetArticlesData';
import { foundstartArticles, foundstartArticleOrder } from '@/data/foundstartArticles';
import { shortetArticlesAr, shortetArticlesArOrder } from '@/data/shortetArticlesAr';

const shortetArticles = { ...baseArticles, ...foundstartArticles, ...shortetArticlesAr };
const shortetArticleOrder = [...foundstartArticleOrder, ...shortetArticlesArOrder, ...baseOrder];
import AgencyFormationBlog from './AgencyFormationBlog';

const ArticleBlog: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const content = slug ? shortetArticles[slug] : undefined;
  const { language, setLanguage } = useTranslation();
  const arPost = !!slug && slug.endsWith('-ar') && !!shortetArticles[slug];
  useEffect(() => { if (arPost && language !== 'ar') setLanguage('ar'); }, [arPost]);

  if (language === 'ar' && slug && !slug.endsWith('-ar') && shortetArticles[slug + '-ar']) {
    return <Navigate to={`/blog/${slug}-ar`} replace />;
  }

  if (!content) {
    return <Navigate to="/blog" replace />;
  }

  const isAr = !!slug && slug.endsWith('-ar') && !!shortetArticles[slug];
  const related = shortetArticleOrder
    .filter((s) => s !== slug && (!isAr || s.endsWith('-ar')) && (isAr || !s.endsWith('-ar')))
    .sort((a, b) => {
      const ca = shortetArticles[a].category === content.category ? 0 : 1;
      const cb = shortetArticles[b].category === content.category ? 0 : 1;
      return ca - cb;
    })
    .slice(0, 3);

  return (
    <>
      <Helmet>
        <title>{content.title} | FoundStart Blog</title>
        <meta name="description" content={content.description} />
        <meta property="og:title" content={content.title} />
        <meta property="og:description" content={content.description} />
        <meta property="og:type" content="article" />
        {content.heroImage && <meta property="og:image" content={`https://www.foundstart.org${content.heroImage}`} />}
      </Helmet>

      <div className="min-h-screen bg-background" dir={isAr ? "rtl" : undefined}>
        <Header />
        <main className="w-full max-w-full overflow-x-hidden">
          {/* Hero Section */}
          <section className="pt-24 pb-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-primary/5 via-background to-purple-500/5">
            <div className="container mx-auto max-w-4xl">
              <Link to="/blog" className="inline-flex items-center text-primary hover:underline mb-6">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Blog
              </Link>

              <Badge className="mb-4">{content.category}</Badge>

              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 leading-tight">
                {content.title}
              </h1>

              <p className="text-lg text-muted-foreground mb-6">
                {content.description}
              </p>

              <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center">
                  <User className="w-4 h-4 mr-2" />
                  {content.author}
                </div>
                <div className="flex items-center">
                  <Calendar className="w-4 h-4 mr-2" />
                  {content.date}
                </div>
                <div className="flex items-center">
                  <Clock className="w-4 h-4 mr-2" />
                  {content.readTime}
                </div>
              </div>
            </div>
          </section>

          {/* Content Section */}
          <section className="py-12 px-4 sm:px-6 lg:px-8">
            <div className="container mx-auto max-w-4xl">
              {content.heroImage && (
                <img
                  src={content.heroImage}
                  alt={content.title}
                  className="w-full rounded-xl shadow-lg mb-10 object-cover"
                  loading="lazy"
                />
              )}

              <div
                className="prose prose-lg dark:prose-invert max-w-none prose-img:rounded-xl prose-a:text-primary"
                dangerouslySetInnerHTML={{ __html: content.html }}
              />

              {/* CTA Section */}
              <div className="mt-12 rounded-xl border bg-gradient-to-r from-primary/10 to-purple-500/10 p-8 text-center">
                <h3 className="text-2xl font-bold mb-4">Explore More Guides</h3>
                <p className="text-muted-foreground mb-6">
                  Browse the full FoundStart blog library for more practical guides.
                </p>
                <Button size="lg" asChild>
                  <Link to="/blog">
                    Back to the Blog
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Link>
                </Button>
              </div>

              {/* Related Posts */}
              <div className="mt-12">
                <h3 className="text-xl font-bold mb-6">Related Articles</h3>
                <div className="grid md:grid-cols-3 gap-6">
                  {related.map((relatedSlug) => {
                    const rel = shortetArticles[relatedSlug];
                    return (
                      <Link
                        key={relatedSlug}
                        to={`/blog/${relatedSlug}`}
                        className="block rounded-lg border hover:border-primary/50 transition-colors overflow-hidden"
                      >
                        {rel.heroImage && (
                          <img src={rel.heroImage} alt={rel.title} className="w-full h-32 object-cover" loading="lazy" />
                        )}
                        <div className="p-4">
                          <Badge variant="secondary" className="mb-2">{rel.category}</Badge>
                          <h4 className="font-semibold hover:text-primary transition-colors line-clamp-2">
                            {rel.title}
                          </h4>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </div>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    </>
  );
};

export const BlogSlugDispatcher: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  return slug && shortetArticles[slug] ? <ArticleBlog /> : <AgencyFormationBlog />;
};

export default ArticleBlog;
