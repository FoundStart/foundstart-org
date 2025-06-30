
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar, User, ArrowRight } from 'lucide-react';

const Blog = () => {
  const blogPosts = [
    {
      id: 1,
      title: "Complete Guide to LLC Formation in 2024",
      description: "Everything you need to know about forming an LLC, from choosing a state to filing paperwork and ongoing compliance requirements.",
      category: "Business Formation",
      author: "MoMo Sa",
      date: "Dec 15, 2024",
      readTime: "8 min read",
      featured: true
    },
    {
      id: 2,
      title: "UK vs US Company Formation: Which is Right for You?",
      description: "Compare the benefits, costs, and requirements of forming a company in the UK versus the United States.",
      category: "International Business",
      author: "Sarah Johnson",
      date: "Dec 12, 2024",
      readTime: "6 min read"
    },
    {
      id: 3,
      title: "Banking Solutions for New Businesses: Mercury vs Traditional Banks",
      description: "Explore the best banking options for startups, including digital banks like Mercury and traditional banking solutions.",
      category: "Banking",
      author: "David Chen",
      date: "Dec 10, 2024",
      readTime: "7 min read"
    },
    {
      id: 4,
      title: "EIN Application Process: Step-by-Step Guide",
      description: "Learn how to obtain your Employer Identification Number (EIN) quickly and efficiently for your new business.",
      category: "Tax & Compliance",
      author: "Lisa Rodriguez",
      date: "Dec 8, 2024",
      readTime: "5 min read"
    },
    {
      id: 5,
      title: "Delaware vs Wyoming: Best States for LLC Formation",
      description: "Compare the top states for LLC formation, including tax benefits, privacy protections, and business-friendly laws.",
      category: "Business Formation",
      author: "Michael Turner",
      date: "Dec 5, 2024",
      readTime: "9 min read"
    },
    {
      id: 6,
      title: "Crypto Payment Integration for Small Businesses",
      description: "How to accept cryptocurrency payments in your business and the legal considerations you need to know.",
      category: "Payments",
      author: "Alex Kim",
      date: "Dec 3, 2024",
      readTime: "6 min read"
    },
    {
      id: 7,
      title: "Virtual Cards for Business: Benefits and Best Practices",
      description: "Discover how virtual payment cards can streamline your business expenses and improve security.",
      category: "Financial Tools",
      author: "Emma Wilson",
      date: "Dec 1, 2024",
      readTime: "4 min read"
    },
    {
      id: 8,
      title: "Canadian Corporation Setup: Complete Guide",
      description: "Everything you need to know about incorporating in Canada, including federal vs provincial incorporation.",
      category: "International Business",
      author: "James Thompson",
      date: "Nov 28, 2024",
      readTime: "8 min read"
    },
    {
      id: 9,
      title: "eSIM Cards for Digital Nomads and International Business",
      description: "How eSIM technology is revolutionizing international communication for businesses and entrepreneurs.",
      category: "Technology",
      author: "Sofia Martinez",
      date: "Nov 25, 2024",
      readTime: "5 min read"
    },
    {
      id: 10,
      title: "Registered Agent Services: What You Need to Know",
      description: "Understanding the role of registered agents and how to choose the right service for your business.",
      category: "Business Formation",
      author: "Robert Davis",
      date: "Nov 22, 2024",
      readTime: "6 min read"
    },
    {
      id: 11,
      title: "AI-Powered Business Name Generation: The Future is Here",
      description: "How artificial intelligence is transforming the way entrepreneurs find the perfect business name.",
      category: "AI & Technology",
      author: "MoMo Sa",
      date: "Nov 20, 2024",
      readTime: "7 min read"
    },
    {
      id: 12,
      title: "International Banking for US LLCs",
      description: "Navigate the complexities of opening international bank accounts for your US-based LLC.",
      category: "Banking",
      author: "Anna Foster",
      date: "Nov 18, 2024",
      readTime: "9 min read"
    },
    {
      id: 13,
      title: "Stripe vs PayPal: Which Payment Processor is Best?",
      description: "A comprehensive comparison of the two leading payment processors for online businesses.",
      category: "Payments",
      author: "Chris Lee",
      date: "Nov 15, 2024",
      readTime: "8 min read"
    },
    {
      id: 14,
      title: "Operating Agreements: Essential Documents for LLCs",
      description: "Why every LLC needs an operating agreement and what should be included in this crucial document.",
      category: "Legal",
      author: "Jennifer Adams",
      date: "Nov 12, 2024",
      readTime: "6 min read"
    },
    {
      id: 15,
      title: "Business Formation in Dubai: Complete Guide",
      description: "Explore the opportunities and requirements for setting up a business in Dubai's thriving economy.",
      category: "International Business",
      author: "Ahmed Hassan",
      date: "Nov 10, 2024",
      readTime: "10 min read"
    },
    {
      id: 16,
      title: "Gift Cards as Business Revenue: Legal and Tax Implications",
      description: "Understanding how gift card sales affect your business finances and tax obligations.",
      category: "Tax & Compliance",
      author: "Rachel Green",
      date: "Nov 8, 2024",
      readTime: "5 min read"
    },
    {
      id: 17,
      title: "Saudi Arabia Business Formation: New Opportunities",
      description: "How Vision 2030 is creating new opportunities for international businesses in Saudi Arabia.",
      category: "International Business",
      author: "Omar Al-Rashid",
      date: "Nov 5, 2024",
      readTime: "7 min read"
    },
    {
      id: 18,
      title: "Digital Nomad Business Setup: Complete Guide",
      description: "How to structure your business as a digital nomad while maintaining compliance across jurisdictions.",
      category: "Remote Business",
      author: "Elena Kowalski",
      date: "Nov 3, 2024",
      readTime: "8 min read"
    },
    {
      id: 19,
      title: "Annual Compliance Requirements for US Companies",
      description: "Stay compliant with federal and state requirements through ongoing annual filings and obligations.",
      category: "Tax & Compliance",
      author: "Mark Williams",
      date: "Nov 1, 2024",
      readTime: "6 min read"
    },
    {
      id: 20,
      title: "The Future of Business Formation: AI and Automation",
      description: "How artificial intelligence and automation are transforming the business formation landscape.",
      category: "AI & Technology",
      author: "MoMo Sa",
      date: "Oct 30, 2024",
      readTime: "9 min read"
    }
  ];

  const categories = ["All", "Business Formation", "International Business", "Banking", "Payments", "AI & Technology", "Tax & Compliance"];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-4 py-16">
        <div className="text-center space-y-4 mb-12">
          <h1 className="text-4xl md:text-5xl font-bold gradient-text">FoundStart Blog</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Insights, guides, and expert advice on business formation, international expansion, 
            and the latest in fintech innovation.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map((category) => (
            <Badge 
              key={category} 
              variant="secondary" 
              className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors"
            >
              {category}
            </Badge>
          ))}
        </div>

        {/* Featured Post */}
        {blogPosts.filter(post => post.featured).map((post) => (
          <Card key={post.id} className="mb-12 overflow-hidden border-2 border-primary/20">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-gradient-to-br from-primary/10 to-purple-600/10 p-8 flex items-center justify-center">
                <div className="text-center">
                  <Badge className="mb-4">Featured Post</Badge>
                  <h2 className="text-2xl font-bold mb-2">{post.title}</h2>
                  <p className="text-muted-foreground">{post.description}</p>
                </div>
              </div>
              <CardContent className="p-8">
                <div className="flex items-center gap-4 mb-4">
                  <Badge variant="secondary">{post.category}</Badge>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <User className="w-4 h-4 mr-1" />
                    {post.author}
                  </div>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Calendar className="w-4 h-4 mr-1" />
                    {post.date}
                  </div>
                </div>
                <p className="text-muted-foreground mb-6">{post.description}</p>
                <Button className="group">
                  Read More
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </CardContent>
            </div>
          </Card>
        ))}

        {/* Blog Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.filter(post => !post.featured).map((post) => (
            <Card key={post.id} className="group hover:shadow-lg transition-all duration-300">
              <CardHeader>
                <div className="flex items-center justify-between mb-2">
                  <Badge variant="secondary">{post.category}</Badge>
                  <span className="text-sm text-muted-foreground">{post.readTime}</span>
                </div>
                <CardTitle className="group-hover:text-primary transition-colors">
                  {post.title}
                </CardTitle>
                <CardDescription>{post.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="flex items-center text-sm text-muted-foreground">
                    <User className="w-4 h-4 mr-1" />
                    {post.author}
                  </div>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Calendar className="w-4 h-4 mr-1" />
                    {post.date}
                  </div>
                </div>
                <Button variant="ghost" className="w-full mt-4 group">
                  Read Article
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Blog;
