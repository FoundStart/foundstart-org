import React from 'react';
import { useParams, Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowLeft, Calendar, User, Clock, CheckCircle, ArrowRight, Building2, Globe, Shield, DollarSign } from 'lucide-react';
import { Helmet } from 'react-helmet-async';

interface BlogContent {
  title: string;
  description: string;
  category: string;
  author: string;
  date: string;
  readTime: string;
  heroImage?: string;
  sections: {
    title: string;
    content: string[];
    list?: string[];
  }[];
  ctaText: string;
  relatedSlugs: string[];
}

const blogContents: Record<string, BlogContent> = {
  'marketing-agency-usa': {
    title: "How to Start a Marketing Agency in the USA with FoundStart",
    description: "Complete guide to establishing a marketing agency in the USA. Learn about LLC formation, tax requirements, and how FoundStart partners make it seamless.",
    category: "Agency Formation",
    author: "FoundStart Team",
    date: "Jan 20, 2026",
    readTime: "10 min read",
    sections: [
      {
        title: "Why Start a Marketing Agency in the USA?",
        content: [
          "The United States offers one of the largest markets for marketing services globally, with businesses of all sizes seeking professional marketing expertise.",
          "With FoundStart's partner network, you can establish your marketing agency quickly and compliantly, even as a non-US resident."
        ],
        list: [
          "Access to a $300+ billion marketing industry",
          "Business-friendly regulatory environment",
          "Multiple state options for incorporation",
          "Easy banking setup through partners like Mercury"
        ]
      },
      {
        title: "Step-by-Step Formation Process",
        content: [
          "FoundStart simplifies the entire process through our trusted formation partners including Doola, Clemta, and Firstbase."
        ],
        list: [
          "Choose your state (Wyoming or Delaware recommended)",
          "Select LLC or C-Corp structure",
          "Submit formation documents through our partners",
          "Obtain your EIN from the IRS",
          "Open a business bank account",
          "Set up payment processing"
        ]
      },
      {
        title: "Costs & Timeline",
        content: [
          "Formation costs vary by state and service level. Through FoundStart partners, you can expect:",
          "Total investment ranges from $500 to $2,000 depending on your needs and chosen package."
        ],
        list: [
          "State filing fees: $100-$500",
          "Registered agent: $100-$300/year",
          "Formation service: $200-$500",
          "EIN application: Usually included",
          "Timeline: 3-10 business days"
        ]
      },
      {
        title: "How FoundStart Partners Help",
        content: [
          "Our partner network provides end-to-end support for your agency formation:",
          "Doola, Clemta, Tailorbrands, and Startglobal all offer specialized packages for service-based businesses like marketing agencies."
        ],
        list: [
          "LLC/Corp formation in any US state",
          "EIN acquisition",
          "Registered agent services",
          "Business bank account setup (Mercury, Wise)",
          "Compliance and annual report filing",
          "Virtual address services"
        ]
      }
    ],
    ctaText: "Start Your Marketing Agency Today",
    relatedSlugs: ["digital-agency-uk", "social-media-agency-usa", "seo-agency-usa-uk"]
  },
  'digital-agency-uk': {
    title: "Starting a Digital Agency in the UK: FoundStart Guide",
    description: "Everything you need to know about launching your digital agency in the UK with FoundStart's partner network.",
    category: "Agency Formation",
    author: "FoundStart Team",
    date: "Jan 19, 2026",
    readTime: "9 min read",
    sections: [
      {
        title: "Why Choose the UK for Your Digital Agency?",
        content: [
          "The UK is a global hub for digital services, offering access to European markets and a strong legal framework for businesses.",
          "FoundStart partners like 1st Formations and Rapid Formations make UK company formation straightforward."
        ],
        list: [
          "Access to £15+ billion digital services market",
          "Strong intellectual property protection",
          "English-speaking business environment",
          "Gateway to European clients"
        ]
      },
      {
        title: "UK Company Structure Options",
        content: [
          "The most common structure for agencies is a Private Limited Company (Ltd), which offers liability protection and professional credibility."
        ],
        list: [
          "Private Limited Company (Ltd) - Most popular",
          "Limited Liability Partnership (LLP)",
          "Sole Trader - Simplest but unlimited liability",
          "Public Limited Company (PLC) - For larger operations"
        ]
      },
      {
        title: "Formation Process with FoundStart Partners",
        content: [
          "Our UK partners streamline the entire process, handling Companies House registration and all compliance requirements."
        ],
        list: [
          "Company name check and reservation",
          "Memorandum and Articles of Association",
          "Companies House registration",
          "Registered office address",
          "Share certificate issuance",
          "HMRC registration for tax"
        ]
      },
      {
        title: "Costs and Timeline",
        content: [
          "UK company formation is among the most affordable globally, with fast processing times."
        ],
        list: [
          "Government fee: £12-50",
          "Formation service: £50-200",
          "Registered address: £50-150/year",
          "Timeline: Same day to 48 hours"
        ]
      }
    ],
    ctaText: "Launch Your UK Digital Agency",
    relatedSlugs: ["marketing-agency-usa", "content-agency-uk", "uxui-agency-uk"]
  },
  'web-dev-agency-europe': {
    title: "How FoundStart Helps You Build a Web Development Agency in Europe",
    description: "Step-by-step process for establishing a web development agency in Estonia, Germany, or the Netherlands.",
    category: "Agency Formation",
    author: "MoMo Sa",
    date: "Jan 18, 2026",
    readTime: "11 min read",
    sections: [
      {
        title: "European Markets for Web Development",
        content: [
          "Europe offers diverse opportunities for web development agencies, from the tech-forward Baltic states to the economic powerhouses of Germany and the Netherlands.",
          "Each country has unique advantages that FoundStart's partners can help you leverage."
        ],
        list: [
          "Estonia: Digital-first, e-Residency program",
          "Germany: Largest European market",
          "Netherlands: Business-friendly, international hub",
          "Finland: Strong tech ecosystem"
        ]
      },
      {
        title: "Estonia: The Digital Pioneer",
        content: [
          "Estonia's e-Residency program allows you to establish and manage an EU company entirely online, making it ideal for digital agencies.",
          "FoundStart partners at My1Office provide comprehensive support for Estonian company formation."
        ],
        list: [
          "100% online company management",
          "Low corporate tax on retained earnings",
          "EU business legitimacy",
          "Digital signatures and e-services"
        ]
      },
      {
        title: "Formation Steps with FoundStart",
        content: [
          "Our European partners handle all aspects of company formation across multiple jurisdictions."
        ],
        list: [
          "Choose your jurisdiction (Estonia, Finland, Sweden, Latvia, Lithuania)",
          "Apply for e-Residency if applicable",
          "Submit formation documents",
          "Receive company registration",
          "Open EU business bank account",
          "Start accepting clients"
        ]
      }
    ],
    ctaText: "Start Your European Agency",
    relatedSlugs: ["estonia-eresidency-agency", "consulting-agency-germany", "branding-agency-netherlands"]
  }
};

// Default template for other blog posts
const getDefaultBlogContent = (slug: string): BlogContent => ({
  title: slug.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' '),
  description: "Learn how FoundStart and our partners help entrepreneurs establish successful agencies in the USA and Europe.",
  category: "Agency Formation",
  author: "FoundStart Team",
  date: "Jan 2026",
  readTime: "8 min read",
  sections: [
    {
      title: "Why Choose FoundStart?",
      content: [
        "FoundStart provides a comprehensive platform connecting you with trusted formation partners across the USA and Europe.",
        "Our curated network ensures you get the best service for your specific needs."
      ],
      list: [
        "Vetted partner network",
        "Competitive pricing",
        "End-to-end support",
        "Multiple jurisdiction options"
      ]
    },
    {
      title: "Our Partner Network",
      content: [
        "We work with industry-leading formation services to ensure your agency is set up correctly from day one."
      ],
      list: [
        "Doola - USA LLC & C-Corp formation",
        "Clemta - US business formation",
        "1st Formations - UK company formation",
        "My1Office - European formation (Estonia, Finland, Sweden)"
      ]
    },
    {
      title: "Getting Started",
      content: [
        "Ready to launch your agency? Here's how to begin with FoundStart."
      ],
      list: [
        "Choose your target market (USA, UK, or Europe)",
        "Select the appropriate business structure",
        "Connect with our formation partners",
        "Complete the formation process",
        "Launch your agency"
      ]
    }
  ],
  ctaText: "Start Your Agency Today",
  relatedSlugs: ["marketing-agency-usa", "digital-agency-uk", "web-dev-agency-europe"]
});

const AgencyFormationBlog: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const content = blogContents[slug || ''] || getDefaultBlogContent(slug || '');

  return (
    <>
      <Helmet>
        <title>{content.title} | FoundStart Blog</title>
        <meta name="description" content={content.description} />
        <meta property="og:title" content={content.title} />
        <meta property="og:description" content={content.description} />
        <meta property="og:type" content="article" />
      </Helmet>

      <div className="min-h-screen bg-background">
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
              <div className="prose prose-lg dark:prose-invert max-w-none">
                {content.sections.map((section, index) => (
                  <div key={index} className="mb-12">
                    <h2 className="text-2xl md:text-3xl font-bold mb-4 flex items-center gap-3">
                      {index === 0 && <Globe className="w-6 h-6 text-primary" />}
                      {index === 1 && <Building2 className="w-6 h-6 text-primary" />}
                      {index === 2 && <Shield className="w-6 h-6 text-primary" />}
                      {index === 3 && <DollarSign className="w-6 h-6 text-primary" />}
                      {section.title}
                    </h2>
                    
                    {section.content.map((paragraph, pIndex) => (
                      <p key={pIndex} className="text-muted-foreground mb-4 leading-relaxed">
                        {paragraph}
                      </p>
                    ))}
                    
                    {section.list && (
                      <ul className="space-y-3 my-6">
                        {section.list.map((item, lIndex) => (
                          <li key={lIndex} className="flex items-start gap-3">
                            <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>

              {/* CTA Section */}
              <Card className="mt-12 bg-gradient-to-r from-primary/10 to-purple-500/10 border-primary/20">
                <CardContent className="p-8 text-center">
                  <h3 className="text-2xl font-bold mb-4">Ready to Get Started?</h3>
                  <p className="text-muted-foreground mb-6">
                    Let FoundStart and our partners help you establish your agency today.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button size="lg" asChild>
                      <Link to="/countries">
                        {content.ctaText}
                        <ArrowRight className="ml-2 w-4 h-4" />
                      </Link>
                    </Button>
                    <Button size="lg" variant="outline" asChild>
                      <a href="https://wa.me/201501556629" target="_blank" rel="noopener noreferrer">
                        Contact Us on WhatsApp
                      </a>
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Related Posts */}
              <div className="mt-12">
                <h3 className="text-xl font-bold mb-6">Related Articles</h3>
                <div className="grid md:grid-cols-3 gap-6">
                  {content.relatedSlugs.map((relatedSlug) => {
                    const related = blogContents[relatedSlug] || getDefaultBlogContent(relatedSlug);
                    return (
                      <Link 
                        key={relatedSlug}
                        to={`/blog/${relatedSlug}`}
                        className="block p-4 rounded-lg border hover:border-primary/50 transition-colors"
                      >
                        <Badge variant="secondary" className="mb-2">{related.category}</Badge>
                        <h4 className="font-semibold hover:text-primary transition-colors line-clamp-2">
                          {related.title}
                        </h4>
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

export default AgencyFormationBlog;
