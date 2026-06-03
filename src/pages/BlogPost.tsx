import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Calendar, User, Clock, Globe, Building, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import SedoBanner from '@/components/sedo/SedoBanner';
import SedoSearchWidget from '@/components/sedo/SedoSearchWidget';

const BlogPost = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Header banner */}
      <div className="container mx-auto px-4 pt-6 flex justify-center">
        <SedoBanner size="728x90" seed="blogpost-header" className="hidden md:inline-block" />
        <SedoBanner size="336x280" seed="blogpost-header-mobile" className="md:hidden" />
      </div>

      <div className="container mx-auto px-4 py-8 grid lg:grid-cols-[160px_1fr_160px] gap-8">
        <aside className="hidden lg:flex justify-center sticky top-24 self-start">
          <SedoBanner size="160x600" seed="blogpost-left" />
        </aside>

        <div>
          {/* Back to Home Button */}
          <div className="mb-6">
            <Link to="/">
            <Button variant="outline" className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Home
            </Button>
          </Link>
        </div>

        {/* Article Header */}
        <article className="max-w-4xl mx-auto">
          <header className="mb-8">
            <div className="flex flex-wrap gap-2 mb-4">
              <Badge variant="secondary">Digital Nomad</Badge>
              <Badge variant="secondary">Company Formation</Badge>
              <Badge variant="secondary">Remote Work</Badge>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold gradient-text mb-4">
              The Complete Guide to Digital Nomad Visas and Company Formation in 2025
            </h1>
            
            <p className="text-xl text-muted-foreground mb-6">
              Everything you need to know about working remotely worldwide, visa requirements, 
              and why having a company structure can make your nomadic journey easier and more profitable.
            </p>
            
            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                <span>January 15, 2025</span>
              </div>
              <div className="flex items-center gap-1">
                <User className="h-4 w-4" />
                <span>By FoundStart Team</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                <span>12 min read</span>
              </div>
            </div>
          </header>

          {/* Article Content */}
          <div className="prose prose-lg max-w-none space-y-8">
            
            <Card className="p-6 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20">
              <CardContent className="p-0">
                <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                  <Globe className="h-5 w-5" />
                  Key Takeaways
                </h3>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>Over 70 countries now offer digital nomad visas in 2025</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>Having a company structure can simplify visa applications and provide tax benefits</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>Income requirements range from $1,500 to $5,000+ per month depending on the country</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>Many visas offer significant tax advantages for remote workers</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <section>
              <h2 className="text-3xl font-bold mb-4">The Digital Nomad Revolution</h2>
              <p className="mb-4">
                The way we work has fundamentally changed. What started as a temporary pandemic response has evolved into 
                a permanent shift toward location independence. In 2025, we're seeing an unprecedented number of countries 
                rolling out the red carpet for digital nomads, remote workers, and location-independent professionals.
              </p>
              <p className="mb-4">
                This isn't just about tourism anymore. Countries are recognizing that digital nomads bring valuable skills, 
                spend money locally, and can help revitalize economies without taking jobs away from locals. The result? 
                A competitive landscape where nations are offering increasingly attractive packages to attract remote workers.
              </p>
            </section>

            <section>
              <h2 className="text-3xl font-bold mb-4">What Is a Digital Nomad Visa?</h2>
              <p className="mb-4">
                A digital nomad visa is a special permit that allows you to live in a foreign country while working remotely 
                for employers or clients outside that country. Unlike tourist visas, these permits:
              </p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>Allow you to stay for extended periods (typically 6 months to 2 years)</li>
                <li>Legally permit you to work remotely</li>
                <li>Often come with tax benefits or exemptions</li>
                <li>May include family members in the application</li>
                <li>Provide a pathway to longer-term residency in some cases</li>
              </ul>
            </section>

            <section>
              <h2 className="text-3xl font-bold mb-4">Top Digital Nomad Destinations in 2025</h2>
              
              <h3 className="text-2xl font-semibold mb-3">Europe: The Digital Nomad Hub</h3>
              <p className="mb-4">
                Europe continues to lead the digital nomad revolution with comprehensive visa programs and excellent infrastructure:
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <Card className="p-4">
                  <h4 className="font-semibold mb-2">🇪🇸 Spain</h4>
                  <p className="text-sm text-muted-foreground mb-2">
                    €2,500/month income requirement, 1-year renewable visa, 20% tax cap for nomads
                  </p>
                  <Badge variant="outline" className="text-xs">Family-friendly</Badge>
                </Card>
                
                <Card className="p-4">
                  <h4 className="font-semibold mb-2">🇵🇹 Portugal</h4>
                  <p className="text-sm text-muted-foreground mb-2">
                    €3,200/month requirement, 2-year visa, path to citizenship after 5 years
                  </p>
                  <Badge variant="outline" className="text-xs">EU Access</Badge>
                </Card>
                
                <Card className="p-4">
                  <h4 className="font-semibold mb-2">🇪🇪 Estonia</h4>
                  <p className="text-sm text-muted-foreground mb-2">
                    World's first digital nomad visa, €3,500/month, excellent digital infrastructure
                  </p>
                  <Badge variant="outline" className="text-xs">Tech-focused</Badge>
                </Card>
                
                <Card className="p-4">
                  <h4 className="font-semibold mb-2">🇬🇷 Greece</h4>
                  <p className="text-sm text-muted-foreground mb-2">
                    €3,500/month requirement, 50% tax break for up to 7 years
                  </p>
                  <Badge variant="outline" className="text-xs">Tax Benefits</Badge>
                </Card>
              </div>

              <h3 className="text-2xl font-semibold mb-3">Emerging Hotspots</h3>
              <p className="mb-4">
                Several countries are making significant moves to attract digital nomads with competitive offerings:
              </p>
              
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li><strong>Georgia:</strong> Completely free visa program with just $2,000/month income requirement</li>
                <li><strong>Dubai (UAE):</strong> Tax-free income, modern infrastructure, global business hub</li>
                <li><strong>Barbados:</strong> 12-month Welcome Stamp, tropical paradise with excellent connectivity</li>
                <li><strong>Costa Rica:</strong> 2-year renewable visa, no tax on foreign income, focus on sustainability</li>
              </ul>
            </section>

            <section>
              <h2 className="text-3xl font-bold mb-4">Why Company Formation Matters for Digital Nomads</h2>
              <p className="mb-4">
                One of the biggest challenges digital nomads face is meeting visa requirements. Many countries require 
                proof of employment or business ownership. Here's where having a proper company structure becomes invaluable:
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <Card className="p-6">
                  <h4 className="font-semibold mb-3 flex items-center gap-2">
                    <Building className="h-5 w-5" />
                    Visa Application Benefits
                  </h4>
                  <ul className="space-y-2 text-sm">
                    <li>• Easier to prove legitimate remote work</li>
                    <li>• More credible than freelancer status</li>
                    <li>• Can hire yourself as an employee</li>
                    <li>• Demonstrates stable income source</li>
                    <li>• Some visas specifically require company ownership</li>
                  </ul>
                </Card>
                
                <Card className="p-6">
                  <h4 className="font-semibold mb-3 flex items-center gap-2">
                    <Globe className="h-5 w-5" />
                    Tax Optimization
                  </h4>
                  <ul className="space-y-2 text-sm">
                    <li>• Potential for significant tax savings</li>
                    <li>• Business expense deductions</li>
                    <li>• International tax treaty benefits</li>
                    <li>• Professional tax planning opportunities</li>
                    <li>• Separate personal and business liability</li>
                  </ul>
                </Card>
              </div>

              <h3 className="text-2xl font-semibold mb-3">Best Jurisdictions for Nomad Companies</h3>
              <p className="mb-4">
                Not all company formations are equal for digital nomads. Here are the top jurisdictions:
              </p>
              
              <div className="space-y-4 mb-6">
                <Card className="p-4 border-l-4 border-blue-500">
                  <h4 className="font-semibold mb-2">🇺🇸 Delaware LLC (USA)</h4>
                  <p className="text-sm text-muted-foreground mb-2">
                    The gold standard for international business. No US tax if no US income, excellent legal protection, 
                    and widely recognized globally.
                  </p>
                  <div className="flex gap-2">
                    <Badge variant="secondary" className="text-xs">$49 + state fees</Badge>
                    <Badge variant="secondary" className="text-xs">Fast formation</Badge>
                  </div>
                </Card>
                
                <Card className="p-4 border-l-4 border-green-500">
                  <h4 className="font-semibold mb-2">🇪🇪 Estonia E-Residency</h4>
                  <p className="text-sm text-muted-foreground mb-2">
                    Digital-first approach, no tax on retained earnings, perfect for nomads who want EU presence.
                  </p>
                  <div className="flex gap-2">
                    <Badge variant="secondary" className="text-xs">€190 + fees</Badge>
                    <Badge variant="secondary" className="text-xs">EU Access</Badge>
                  </div>
                </Card>
                
                <Card className="p-4 border-l-4 border-purple-500">
                  <h4 className="font-semibold mb-2">🇸🇬 Singapore</h4>
                  <p className="text-sm text-muted-foreground mb-2">
                    Gateway to Asia, excellent international reputation, strong banking relationships.
                  </p>
                  <div className="flex gap-2">
                    <Badge variant="secondary" className="text-xs">$300 + fees</Badge>
                    <Badge variant="secondary" className="text-xs">Asian Hub</Badge>
                  </div>
                </Card>
              </div>
            </section>

            <section>
              <h2 className="text-3xl font-bold mb-4">The Application Process: Step by Step</h2>
              <p className="mb-4">
                While each country has specific requirements, most digital nomad visa applications follow a similar pattern:
              </p>
              
              <div className="space-y-4 mb-6">
                <div className="flex gap-4">
                  <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0">1</div>
                  <div>
                    <h4 className="font-semibold mb-1">Research and Choose Your Destination</h4>
                    <p className="text-sm text-muted-foreground">
                      Consider income requirements, tax implications, lifestyle preferences, and visa duration.
                    </p>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0">2</div>
                  <div>
                    <h4 className="font-semibold mb-1">Establish Your Business Structure (If Needed)</h4>
                    <p className="text-sm text-muted-foreground">
                      Form a company if you're freelancing or need better visa application credentials.
                    </p>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0">3</div>
                  <div>
                    <h4 className="font-semibold mb-1">Gather Required Documentation</h4>
                    <p className="text-sm text-muted-foreground">
                      Passport, bank statements, employment proof, health insurance, criminal background check.
                    </p>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0">4</div>
                  <div>
                    <h4 className="font-semibold mb-1">Submit Application and Wait</h4>
                    <p className="text-sm text-muted-foreground">
                      Processing times vary from 2-8 weeks. Some countries offer expedited processing for additional fees.
                    </p>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0">5</div>
                  <div>
                    <h4 className="font-semibold mb-1">Plan Your Move</h4>
                    <p className="text-sm text-muted-foreground">
                      Book flights, arrange accommodation, set up local banking, and prepare for your nomadic adventure.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-3xl font-bold mb-4">Tax Considerations for Digital Nomads</h2>
              <p className="mb-4">
                Understanding tax implications is crucial for digital nomads. The landscape is complex but can be very advantageous:
              </p>
              
              <h3 className="text-xl font-semibold mb-3">Common Tax Benefits</h3>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li><strong>No local income tax:</strong> Many countries don't tax foreign-sourced income</li>
                <li><strong>Special nomad rates:</strong> Some offer reduced tax rates (e.g., Greece's 50% reduction)</li>
                <li><strong>Tax treaty benefits:</strong> Avoid double taxation through international agreements</li>
                <li><strong>Business deductions:</strong> Travel, accommodation, and equipment as business expenses</li>
              </ul>
              
              <div className="bg-yellow-50 dark:bg-yellow-950/20 p-4 rounded-lg mb-6">
                <p className="text-sm">
                  <strong>Important:</strong> Tax laws are complex and change frequently. Always consult with tax professionals 
                  who specialize in international taxation and digital nomad situations.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-3xl font-bold mb-4">Common Challenges and How to Overcome Them</h2>
              
              <div className="space-y-4 mb-6">
                <Card className="p-4">
                  <h4 className="font-semibold mb-2 text-red-600">Challenge: Income Verification</h4>
                  <p className="text-sm text-muted-foreground mb-2">
                    Many nomads struggle to prove consistent income, especially freelancers.
                  </p>
                  <p className="text-sm"><strong>Solution:</strong> Form a company and pay yourself a regular salary. This creates a paper trail and meets employment requirements.</p>
                </Card>
                
                <Card className="p-4">
                  <h4 className="font-semibold mb-2 text-red-600">Challenge: Banking and Financial Services</h4>
                  <p className="text-sm text-muted-foreground mb-2">
                    Accessing banking services while constantly traveling can be difficult.
                  </p>
                  <p className="text-sm"><strong>Solution:</strong> Set up multi-currency accounts with digital banks like Wise, Revolut, or Mercury before you start traveling.</p>
                </Card>
                
                <Card className="p-4">
                  <h4 className="font-semibold mb-2 text-red-600">Challenge: Health Insurance Coverage</h4>
                  <p className="text-sm text-muted-foreground mb-2">
                    Many countries require comprehensive health insurance for visa approval.
                  </p>
                  <p className="text-sm"><strong>Solution:</strong> Invest in international health insurance that covers multiple countries. Some nomad-specific insurers offer excellent coverage.</p>
                </Card>
              </div>
            </section>

            <section>
              <h2 className="text-3xl font-bold mb-4">Looking Ahead: The Future of Digital Nomadism</h2>
              <p className="mb-4">
                The digital nomad trend is far from over. We're seeing several exciting developments:
              </p>
              
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li><strong>Nomad-specific infrastructure:</strong> Co-working spaces, nomad villages, and dedicated communities</li>
                <li><strong>Simplified application processes:</strong> More countries offering online-only applications</li>
                <li><strong>Longer visa durations:</strong> Some countries now offering 2-5 year permits</li>
                <li><strong>Family-friendly programs:</strong> More visas including spouses and children</li>
                <li><strong>Regional agreements:</strong> Potential for multi-country nomad visas within regions like the EU</li>
              </ul>
            </section>

            <section className="bg-gradient-to-r from-primary/5 to-secondary/5 p-6 rounded-lg">
              <h2 className="text-3xl font-bold mb-4">Ready to Start Your Digital Nomad Journey?</h2>
              <p className="mb-4">
                The world has never been more open to digital nomads, but success requires proper preparation. 
                Whether you need to establish a company structure for visa applications or want to optimize your 
                taxes for nomadic life, having the right foundation is crucial.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <Card className="p-4">
                  <h4 className="font-semibold mb-2">🚀 Quick Start Package</h4>
                  <ul className="text-sm space-y-1">
                    <li>• Delaware LLC formation</li>
                    <li>• EIN application</li>
                    <li>• Banking assistance</li>
                    <li>• Nomad visa guidance</li>
                  </ul>
                </Card>
                
                <Card className="p-4">
                  <h4 className="font-semibold mb-2">🌍 Premium Nomad Setup</h4>
                  <ul className="text-sm space-y-1">
                    <li>• Multi-jurisdiction analysis</li>
                    <li>• Tax optimization strategy</li>
                    <li>• International banking setup</li>
                    <li>• Ongoing compliance support</li>
                  </ul>
                </Card>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/countries">
                  <Button size="lg" className="w-full sm:w-auto">
                    Start Company Formation
                  </Button>
                </Link>
                <Link to="/digital-nomad-visas">
                  <Button variant="outline" size="lg" className="w-full sm:w-auto">
                    Explore Visa Options
                  </Button>
                </Link>
              </div>
            </section>
          </div>
        </article>

          {/* Inline search + footer banner */}
          <div className="max-w-4xl mx-auto mt-12 space-y-6">
            <div className="rounded-xl border border-border/40 bg-card p-6">
              <h3 className="text-lg font-semibold mb-3 text-center">Looking for a domain for your idea?</h3>
              <SedoSearchWidget className="flex flex-col items-center" debug />
            </div>
            <div className="flex justify-center">
              <SedoBanner size="728x90" seed="blogpost-footer" className="hidden md:inline-block" />
              <SedoBanner size="336x280" seed="blogpost-footer-mobile" className="md:hidden" />
            </div>
          </div>
        </div>

        <aside className="hidden lg:flex justify-center sticky top-24 self-start">
          <SedoBanner size="160x600" seed="blogpost-right" />
        </aside>
      </div>

      <Footer />
    </div>
  );
};

export default BlogPost;