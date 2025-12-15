import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Calendar, User, Clock, CheckCircle, Globe, Building } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

const UKvsUSFormationBlog = () => {
  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>UK vs US Company Formation: Which is Right for You? | FoundStart</title>
        <meta name="description" content="Compare UK and US company formation. Learn about benefits, costs, tax implications, and requirements to choose the best jurisdiction for your business." />
        <meta name="keywords" content="UK company formation, US company formation, LLC vs Ltd, international business, company registration" />
        <link rel="canonical" href="https://foundstart.com/blog/uk-vs-us-company-formation" />
      </Helmet>

      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <Link to="/blog">
            <Button variant="outline" className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Blog
            </Button>
          </Link>
        </div>

        <article className="max-w-4xl mx-auto">
          <header className="mb-8">
            <div className="flex flex-wrap gap-2 mb-4">
              <Badge variant="secondary">International Business</Badge>
              <Badge variant="secondary">Comparison</Badge>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold gradient-text mb-4">
              UK vs US Company Formation: Which is Right for You?
            </h1>
            
            <p className="text-xl text-muted-foreground mb-6">
              Compare the benefits, costs, and requirements of forming a company in the UK versus the United States.
            </p>
            
            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                <span>December 12, 2024</span>
              </div>
              <div className="flex items-center gap-1">
                <User className="h-4 w-4" />
                <span>By Sarah Johnson</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                <span>6 min read</span>
              </div>
            </div>
          </header>

          <div className="prose prose-lg max-w-none space-y-8">
            <section>
              <h2 className="text-3xl font-bold mb-4">Overview</h2>
              <p className="mb-4">
                Choosing between the UK and US for your company formation is a crucial decision that will 
                impact your taxes, legal protections, and growth opportunities. Both jurisdictions offer 
                unique advantages depending on your business goals.
              </p>
            </section>

            <section>
              <h2 className="text-3xl font-bold mb-6">Side-by-Side Comparison</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="p-6 border-t-4 border-blue-500">
                  <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                    🇺🇸 United States (LLC)
                  </h3>
                  <ul className="space-y-3 text-sm">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                      <span>Access to the world's largest consumer market</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                      <span>Pass-through taxation options</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                      <span>Strong investor ecosystem</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                      <span>State-level flexibility</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                      <span>Privacy in states like Wyoming</span>
                    </li>
                  </ul>
                  <div className="mt-4 pt-4 border-t">
                    <p className="text-sm text-muted-foreground">
                      <strong>Cost:</strong> $50-$500 + annual fees
                    </p>
                  </div>
                </Card>

                <Card className="p-6 border-t-4 border-red-500">
                  <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                    🇬🇧 United Kingdom (Ltd)
                  </h3>
                  <ul className="space-y-3 text-sm">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                      <span>Gateway to European markets</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                      <span>Lower formation costs</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                      <span>19% corporation tax rate</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                      <span>Fast online registration</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                      <span>English common law system</span>
                    </li>
                  </ul>
                  <div className="mt-4 pt-4 border-t">
                    <p className="text-sm text-muted-foreground">
                      <strong>Cost:</strong> £12-£100 + annual filings
                    </p>
                  </div>
                </Card>
              </div>
            </section>

            <section>
              <h2 className="text-3xl font-bold mb-4">When to Choose the US</h2>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>You're targeting American customers primarily</li>
                <li>You plan to raise venture capital or angel investment</li>
                <li>You want pass-through taxation for a single-member LLC</li>
                <li>Privacy is a major concern (choose Wyoming)</li>
                <li>You're a non-resident wanting a US presence</li>
              </ul>
            </section>

            <section>
              <h2 className="text-3xl font-bold mb-4">When to Choose the UK</h2>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>You're targeting European or Commonwealth markets</li>
                <li>You want the lowest possible formation costs</li>
                <li>You prefer a simpler tax structure</li>
                <li>You need quick, same-day registration</li>
                <li>Your business operates in GBP or EUR</li>
              </ul>
            </section>

            <Card className="p-8 bg-gradient-to-br from-primary/5 to-purple-600/5 border-2 border-primary/20">
              <CardContent className="p-0 text-center">
                <Globe className="h-12 w-12 mx-auto mb-4 text-primary" />
                <h3 className="text-2xl font-bold mb-2">Need Help Deciding?</h3>
                <p className="text-muted-foreground mb-6">
                  Our experts can guide you to the best jurisdiction for your specific needs.
                </p>
                <Link to="/countries">
                  <Button size="lg">Explore Formation Options</Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </article>
      </div>

      <Footer />
    </div>
  );
};

export default UKvsUSFormationBlog;
