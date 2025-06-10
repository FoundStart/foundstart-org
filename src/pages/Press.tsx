
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar, User, ArrowRight } from 'lucide-react';

const Press = () => {
  const pressReleases = [
    {
      id: 1,
      title: "FoundStart Launches Revolutionary All-in-One Business Formation Platform",
      excerpt: "New platform streamlines company formation, banking, and digital services for entrepreneurs worldwide.",
      date: "2024-12-15",
      author: "FoundStart Team",
      category: "Company News",
      readTime: "3 min read"
    },
    {
      id: 2,
      title: "230+ Digital Partners Join FoundStart Ecosystem",
      excerpt: "Comprehensive partner network now includes banking, crypto, AI tools, and automation platforms.",
      date: "2024-12-10",
      author: "Partnership Team",
      category: "Partnerships",
      readTime: "5 min read"
    },
    {
      id: 3,
      title: "Virtual Cards and eSIM Services Now Available",
      excerpt: "FoundStart expands service offerings with virtual payment cards and global eSIM connectivity.",
      date: "2024-12-05",
      author: "Product Team",
      category: "Product Update",
      readTime: "4 min read"
    }
  ];

  const startupGuides = [
    {
      id: 1,
      title: "Complete Guide to Company Formation in 2024",
      excerpt: "Everything you need to know about starting a business in the US, UK, and Canada.",
      date: "2024-12-12",
      author: "Legal Team",
      category: "Startup Guide",
      readTime: "15 min read"
    },
    {
      id: 2,
      title: "Choosing the Right Banking Partner for Your Startup",
      excerpt: "Compare digital banking solutions and find the best fit for your business needs.",
      date: "2024-12-08",
      author: "Finance Team",
      category: "Banking Guide",
      readTime: "10 min read"
    },
    {
      id: 3,
      title: "AI Tools Every Modern Startup Should Use",
      excerpt: "Discover how artificial intelligence can accelerate your business growth.",
      date: "2024-12-01",
      author: "Tech Team",
      category: "Technology",
      readTime: "12 min read"
    }
  ];

  const caseStudies = [
    {
      id: 1,
      title: "How TechCorp Scaled from Idea to $1M Revenue",
      excerpt: "A comprehensive case study of how FoundStart helped a tech startup achieve rapid growth.",
      date: "2024-11-28",
      author: "Success Team",
      category: "Case Study",
      readTime: "8 min read"
    },
    {
      id: 2,
      title: "E-commerce Success: From Zero to Global Market",
      excerpt: "Learn how one e-commerce startup used our platform to expand internationally.",
      date: "2024-11-25",
      author: "Success Team",
      category: "Case Study",
      readTime: "10 min read"
    }
  ];

  const ArticleCard = ({ article }: { article: any }) => (
    <Card className="hover:shadow-lg transition-all duration-300">
      <CardHeader>
        <div className="flex items-center gap-2 mb-2">
          <Badge variant="secondary">{article.category}</Badge>
          <span className="text-sm text-muted-foreground">{article.readTime}</span>
        </div>
        <CardTitle className="text-xl hover:text-primary transition-colors">
          {article.title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground mb-4">{article.excerpt}</p>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              {article.date}
            </div>
            <div className="flex items-center gap-1">
              <User className="w-4 h-4" />
              {article.author}
            </div>
          </div>
          <Button variant="ghost" size="sm">
            Read More <ArrowRight className="w-4 h-4 ml-1" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-4xl text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Press & <span className="gradient-text">Insights</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Stay updated with the latest news, startup guides, and success stories 
            from the FoundStart community.
          </p>
        </div>
      </section>

      {/* Press Releases */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-7xl">
          <h2 className="text-3xl font-bold mb-8">Latest Press Releases</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {pressReleases.map((article) => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>
        </div>
      </section>

      {/* Startup Guides */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-muted/30">
        <div className="container mx-auto max-w-7xl">
          <h2 className="text-3xl font-bold mb-8">Startup Guides</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {startupGuides.map((article) => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>
        </div>
      </section>

      {/* Case Studies */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-7xl">
          <h2 className="text-3xl font-bold mb-8">Success Stories</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {caseStudies.map((article) => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Press;
