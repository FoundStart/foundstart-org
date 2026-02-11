import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import { Globe, Users, UserCheck, Building2, ArrowRight } from 'lucide-react';

const partnerSections = [
  {
    title: "Formation Partners",
    description: "Trusted partners for company formation across 9+ jurisdictions worldwide",
    icon: Building2,
    link: "/partners",
    count: "50+",
    color: "bg-blue-500"
  },
  {
    title: "Digital Partners",
    description: "600+ verified digital service providers across 30+ categories",
    icon: Globe,
    link: "/digital-partners",
    count: "600+",
    color: "bg-green-500"
  },
  {
    title: "Freelancer Partners",
    description: "Skilled freelancers for development, design, marketing, and more",
    icon: UserCheck,
    link: "/freelancer-partners",
    count: "100+",
    color: "bg-purple-500"
  },
  {
    title: "Sister Partners",
    description: "Strategic sister companies and affiliated organizations",
    icon: Users,
    link: "/sister-partners",
    count: "20+",
    color: "bg-orange-500"
  },
];

const AllPartners = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pb-20 md:pb-0">
        <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-12">
              <h1 className="text-3xl md:text-5xl font-bold mb-4">
                Our <span className="gradient-text">Partner Network</span>
              </h1>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                Access our comprehensive network of 700+ partners across formation services, digital solutions, freelancers, and strategic alliances.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {partnerSections.map((section, index) => {
                const Icon = section.icon;
                return (
                  <Link to={section.link} key={index}>
                    <Card className="h-full hover:shadow-lg transition-all duration-300 hover:border-primary/50 hover:-translate-y-1 cursor-pointer">
                      <CardContent className="p-6">
                        <div className="flex items-start gap-4">
                          <div className={`w-14 h-14 rounded-xl ${section.color} flex items-center justify-center flex-shrink-0`}>
                            <Icon className="w-7 h-7 text-white" />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <h2 className="text-xl font-bold">{section.title}</h2>
                              <Badge variant="secondary">{section.count}</Badge>
                            </div>
                            <p className="text-muted-foreground text-sm mb-3">{section.description}</p>
                            <span className="text-primary text-sm font-medium inline-flex items-center gap-1">
                              Explore <ArrowRight className="w-4 h-4" />
                            </span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                );
              })}
            </div>

            {/* Countries Section */}
            <div className="mt-16">
              <div className="text-center mb-8">
                <h2 className="text-2xl md:text-3xl font-bold mb-2">Partner Countries & Jurisdictions</h2>
                <p className="text-muted-foreground">Company formation available in 9+ countries</p>
              </div>
              <div className="flex flex-wrap justify-center gap-3">
                {['🇺🇸 USA', '🇬🇧 UK', '🇨🇦 Canada', '🇪🇪 Estonia', '🇫🇮 Finland', '🇸🇪 Sweden', '🇱🇻 Latvia', '🇱🇹 Lithuania', '🇪🇬 Egypt'].map((country) => (
                  <Button key={country} variant="outline" asChild>
                    <Link to="/countries">{country}</Link>
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default AllPartners;
