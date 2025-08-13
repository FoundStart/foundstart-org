import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowLeft, MapPin, Clock, DollarSign, FileText, Globe, Users, Plane } from 'lucide-react';
import { Link } from 'react-router-dom';

interface DigitalNomadVisa {
  country: string;
  flag: string;
  region: string;
  cost: string;
  income: string;
  duration: string;
  applyRemotely: boolean;
  bonuses: string[];
  description: string;
}

const digitalNomadVisas: DigitalNomadVisa[] = [
  {
    country: "Spain",
    flag: "🇪🇸",
    region: "Europe",
    cost: "$153",
    income: "$2,762/month",
    duration: "1 year renewable up to 3",
    applyRemotely: true,
    bonuses: ["20% tax cap", "Family members allowed", "Path to residency"],
    description: "Spain's Digital Nomad Visa allows remote workers to live and work in one of Europe's most vibrant countries with excellent weather and culture."
  },
  {
    country: "Portugal",
    flag: "🇵🇹",
    region: "Europe", 
    cost: "$165",
    income: "$3,480/month",
    duration: "2 years renewable",
    applyRemotely: true,
    bonuses: ["Access to Schengen", "Healthcare access", "Path to citizenship"],
    description: "Portugal offers the D8 Digital Nomad Visa with access to high quality of life and the broader Schengen Area."
  },
  {
    country: "Estonia",
    flag: "🇪🇪",
    region: "Europe",
    cost: "$105",
    income: "$37,000/year",
    duration: "1 year",
    applyRemotely: true,
    bonuses: ["World's first digital nomad visa", "E-residency access", "Digital society"],
    description: "Estonia pioneered digital nomad visas and offers excellent digital infrastructure for remote workers."
  },
  {
    country: "Croatia",
    flag: "🇭🇷",
    region: "Europe",
    cost: "$139",
    income: "$2,658/month", 
    duration: "6-12 months",
    applyRemotely: true,
    bonuses: ["No local income tax", "Beautiful coastline", "Family entry permitted"],
    description: "Croatia offers stunning Adriatic coastline and a relaxed lifestyle for digital nomads."
  },
  {
    country: "Greece",
    flag: "🇬🇷",
    region: "Europe",
    cost: "$79",
    income: "$3,690/month",
    duration: "1 year renewable to 2",
    applyRemotely: false,
    bonuses: ["50% tax break for up to 7 years", "Mediterranean lifestyle", "Rich history"],
    description: "Greece provides an excellent work-life balance in a Mediterranean environment with significant tax benefits."
  },
  {
    country: "Malta",
    flag: "🇲🇹",
    region: "Europe",
    cost: "$316",
    income: "$2,850/month",
    duration: "1 year renewable",
    applyRemotely: false,
    bonuses: ["English-speaking", "No local tax if taxed elsewhere", "5G connectivity"],
    description: "Malta offers an English-speaking environment and excellent connectivity for digital nomads."
  },
  {
    country: "Germany",
    flag: "🇩🇪",
    region: "Europe",
    cost: "$105",
    income: "$2,000-3,000/month",
    duration: "Up to 3 years",
    applyRemotely: false,
    bonuses: ["EU mobility rights", "Family reunification", "Strong economy"],
    description: "Germany's Freelancer Visa allows self-employed professionals to access the EU market."
  },
  {
    country: "Italy",
    flag: "🇮🇹",
    region: "Europe",
    cost: "$116",
    income: "$2,500/month",
    duration: "1 year renewable",
    applyRemotely: true,
    bonuses: ["Mediterranean lifestyle", "Rich culture", "Family inclusion"],
    description: "Italy's Digital Nomad Visa launched in 2024 for highly skilled professionals seeking Mediterranean lifestyle."
  },
  {
    country: "Georgia",
    flag: "🇬🇪",
    region: "Europe",
    cost: "Free",
    income: "$2,000/month",
    duration: "1 year",
    applyRemotely: true,
    bonuses: ["No visa fees", "Family included", "Very affordable living"],
    description: "Georgia offers one of the most affordable and welcoming digital nomad programs in the world."
  },
  {
    country: "Dubai (UAE)",
    flag: "🇦🇪",
    region: "Middle East",
    cost: "$287",
    income: "$5,000/month",
    duration: "1 year renewable",
    applyRemotely: true,
    bonuses: ["No income tax", "Modern infrastructure", "Global business hub"],
    description: "Dubai offers a cosmopolitan lifestyle with world-class infrastructure and no personal income tax."
  },
  {
    country: "Barbados",
    flag: "🇧🇧",
    region: "Caribbean",
    cost: "$2,000",
    income: "$50,000/year",
    duration: "12 months renewable",
    applyRemotely: true,
    bonuses: ["Tax benefits", "Tropical paradise", "English-speaking"],
    description: "Barbados Welcome Stamp offers a tropical paradise for remote workers with excellent infrastructure."
  },
  {
    country: "Costa Rica",
    flag: "🇨🇷",
    region: "Central America",
    cost: "$100",
    income: "$3,000/month",
    duration: "2 years renewable",
    applyRemotely: true,
    bonuses: ["No income tax on foreign earnings", "Biodiversity", "Stable democracy"],
    description: "Costa Rica offers natural beauty and political stability with favorable tax treatment for nomads."
  },
  {
    country: "Mexico",
    flag: "🇲🇽",
    region: "North America",
    cost: "$44",
    income: "$1,620/month",
    duration: "180 days renewable",
    applyRemotely: true,
    bonuses: ["Low cost of living", "Rich culture", "Close to US"],
    description: "Mexico provides affordable living with rich culture and proximity to North American markets."
  },
  {
    country: "Thailand",
    flag: "🇹🇭",
    region: "Asia",
    cost: "$269",
    income: "$2,500/month",
    duration: "1 year renewable",
    applyRemotely: true,
    bonuses: ["Low cost of living", "Amazing food", "Digital nomad community"],
    description: "Thailand is a popular destination with established digital nomad communities and excellent value for money."
  },
  {
    country: "Japan",
    flag: "🇯🇵",
    region: "Asia",
    cost: "$70",
    income: "$3,000/month",
    duration: "6 months",
    applyRemotely: true,
    bonuses: ["Advanced technology", "Rich culture", "Safety"],
    description: "Japan offers cutting-edge technology and unique cultural experiences for digital nomads."
  },
  {
    country: "Argentina",
    flag: "🇦🇷",
    region: "South America",
    cost: "$100",
    income: "$2,500/month",
    duration: "6 months renewable",
    applyRemotely: true,
    bonuses: ["Affordable living", "Rich culture", "Excellent wine"],
    description: "Argentina provides vibrant culture and affordable living costs for digital nomads."
  }
];

const DigitalNomadVisas = () => {
  const [selectedRegion, setSelectedRegion] = useState<string>("All");
  
  const regions = ["All", "Europe", "Asia", "Middle East", "Caribbean", "North America", "Central America", "South America"];
  
  const filteredVisas = selectedRegion === "All" 
    ? digitalNomadVisas 
    : digitalNomadVisas.filter(visa => visa.region === selectedRegion);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        {/* Back to Home Button */}
        <div className="mb-6">
          <Link to="/">
            <Button variant="outline" className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Home
            </Button>
          </Link>
        </div>

        {/* Hero Section */}
        <div className="text-center space-y-6 mb-12">
          <h1 className="text-5xl font-bold gradient-text">
            Digital Nomad Visa Countries 2025
          </h1>
          <p className="text-xl text-muted-foreground max-w-4xl mx-auto">
            Work remotely from anywhere in the world with legal digital nomad visas. 
            Over 70+ countries now offer special permits for remote workers, freelancers, and digital entrepreneurs.
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-sm">
            <Badge variant="secondary" className="flex items-center gap-1">
              <Globe className="h-3 w-3" />
              70+ Countries
            </Badge>
            <Badge variant="secondary" className="flex items-center gap-1">
              <Users className="h-3 w-3" />
              For Remote Workers
            </Badge>
            <Badge variant="secondary" className="flex items-center gap-1">
              <Plane className="h-3 w-3" />
              Live & Work Legally
            </Badge>
          </div>
        </div>

        {/* Company Formation CTA */}
        <Card className="mb-8 bg-gradient-to-r from-primary/10 to-secondary/10 border-primary/20">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div>
                <h3 className="text-xl font-semibold mb-2">Need a Company for Your Digital Nomad Journey?</h3>
                <p className="text-muted-foreground">
                  Many digital nomad visas require proof of employment or business ownership. 
                  FoundStart can help you establish a company in the USA or Europe quickly and legally.
                </p>
              </div>
              <Link to="/countries">
                <Button size="lg" className="whitespace-nowrap">
                  Form Your Company
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Region Filter */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold mb-4">Filter by Region</h3>
          <div className="flex flex-wrap gap-2">
            {regions.map((region) => (
              <Button
                key={region}
                variant={selectedRegion === region ? "default" : "outline"}
                onClick={() => setSelectedRegion(region)}
                size="sm"
              >
                {region}
              </Button>
            ))}
          </div>
        </div>

        {/* Visa Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {filteredVisas.map((visa) => (
            <Card key={visa.country} className="h-full hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <span className="text-2xl">{visa.flag}</span>
                    {visa.country}
                  </CardTitle>
                  <Badge variant="outline">{visa.region}</Badge>
                </div>
                <CardDescription>{visa.description}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center gap-1">
                    <DollarSign className="h-3 w-3 text-green-500" />
                    <span className="font-medium">Cost:</span>
                    <span>{visa.cost}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-3 w-3 text-blue-500" />
                    <span className="font-medium">Duration:</span>
                    <span className="text-xs">{visa.duration}</span>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-start gap-1">
                    <DollarSign className="h-3 w-3 text-yellow-500 mt-0.5" />
                    <div>
                      <span className="font-medium text-sm">Income:</span>
                      <p className="text-xs text-muted-foreground">{visa.income}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-1">
                    <FileText className="h-3 w-3 text-purple-500" />
                    <span className="text-sm">
                      Apply remotely: {visa.applyRemotely ? "✅ Yes" : "❌ No"}
                    </span>
                  </div>
                </div>

                <div>
                  <span className="font-medium text-sm mb-2 block">Key Benefits:</span>
                  <div className="flex flex-wrap gap-1">
                    {visa.bonuses.slice(0, 2).map((bonus, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {bonus}
                      </Badge>
                    ))}
                    {visa.bonuses.length > 2 && (
                      <Badge variant="outline" className="text-xs">
                        +{visa.bonuses.length - 2} more
                      </Badge>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Information Tabs */}
        <Tabs defaultValue="requirements" className="mb-12">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="requirements">Requirements</TabsTrigger>
            <TabsTrigger value="process">Application Process</TabsTrigger>
            <TabsTrigger value="taxes">Tax Implications</TabsTrigger>
            <TabsTrigger value="tips">Pro Tips</TabsTrigger>
          </TabsList>

          <TabsContent value="requirements" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Common Requirements for Digital Nomad Visas</CardTitle>
                <CardDescription>
                  Most digital nomad visas share similar basic requirements
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <h4 className="font-semibold">Documentation Needed:</h4>
                    <ul className="space-y-2 text-sm">
                      <li>• Valid passport (6+ months remaining)</li>
                      <li>• Proof of remote employment or business ownership</li>
                      <li>• Bank statements showing required income</li>
                      <li>• Health insurance coverage</li>
                      <li>• Clean criminal background check</li>
                      <li>• Accommodation proof (booking/lease)</li>
                    </ul>
                  </div>
                  <div className="space-y-3">
                    <h4 className="font-semibold">Financial Requirements:</h4>
                    <ul className="space-y-2 text-sm">
                      <li>• Monthly income: $1,500 - $5,000+ (varies by country)</li>
                      <li>• Bank balance: Often 3-6 months of expenses</li>
                      <li>• Income must be from outside the host country</li>
                      <li>• Some require employment contracts or client agreements</li>
                      <li>• Tax documentation from home country</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="process" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Step-by-Step Application Process</CardTitle>
                <CardDescription>
                  How to apply for a digital nomad visa
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="space-y-2">
                    <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white font-bold text-sm">1</div>
                    <h4 className="font-semibold">Research & Choose</h4>
                    <p className="text-sm text-muted-foreground">
                      Select your destination country and understand specific requirements
                    </p>
                  </div>
                  <div className="space-y-2">
                    <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white font-bold text-sm">2</div>
                    <h4 className="font-semibold">Gather Documents</h4>
                    <p className="text-sm text-muted-foreground">
                      Collect all required documentation and get translations if needed
                    </p>
                  </div>
                  <div className="space-y-2">
                    <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white font-bold text-sm">3</div>
                    <h4 className="font-semibold">Submit Application</h4>
                    <p className="text-sm text-muted-foreground">
                      Apply online or at embassy/consulate and pay fees
                    </p>
                  </div>
                  <div className="space-y-2">
                    <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white font-bold text-sm">4</div>
                    <h4 className="font-semibold">Wait & Travel</h4>
                    <p className="text-sm text-muted-foreground">
                      Processing takes 2-8 weeks. Once approved, book your trip!
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="taxes" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Tax Implications for Digital Nomads</CardTitle>
                <CardDescription>
                  Understanding your tax obligations when working abroad
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <h4 className="font-semibold">Home Country Taxes:</h4>
                    <ul className="space-y-2 text-sm">
                      <li>• Most nomads remain tax residents of home country</li>
                      <li>• US citizens pay taxes regardless of residence</li>
                      <li>• EU citizens may lose tax residency after 183+ days abroad</li>
                      <li>• Keep detailed records of days spent in each country</li>
                      <li>• Consider foreign earned income exclusions</li>
                    </ul>
                  </div>
                  <div className="space-y-3">
                    <h4 className="font-semibold">Host Country Taxes:</h4>
                    <ul className="space-y-2 text-sm">
                      <li>• Many nomad visas offer tax exemptions</li>
                      <li>• Usually no local tax if income sourced abroad</li>
                      <li>• Some countries offer special nomad tax rates</li>
                      <li>• Avoid becoming local tax resident (usually 183+ days)</li>
                      <li>• Consult tax professionals for complex situations</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="tips" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Pro Tips for Digital Nomad Success</CardTitle>
                <CardDescription>
                  Expert advice for a smooth nomadic journey
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <h4 className="font-semibold">Before You Apply:</h4>
                    <ul className="space-y-2 text-sm">
                      <li>• Start application process 2-3 months early</li>
                      <li>• Ensure your passport has 2+ years validity</li>
                      <li>• Get international driving permit if needed</li>
                      <li>• Set up multi-currency bank accounts</li>
                      <li>• Consider forming a company for easier visa applications</li>
                    </ul>
                  </div>
                  <div className="space-y-3">
                    <h4 className="font-semibold">While Nomading:</h4>
                    <ul className="space-y-2 text-sm">
                      <li>• Keep all receipts and financial records</li>
                      <li>• Join local digital nomad communities</li>
                      <li>• Maintain comprehensive health insurance</li>
                      <li>• Have emergency funds in multiple currencies</li>
                      <li>• Research visa extensions early</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Final CTA */}
        <Card className="bg-gradient-to-r from-primary/5 to-secondary/5">
          <CardContent className="p-8 text-center">
            <h2 className="text-2xl font-bold mb-4">Ready to Start Your Digital Nomad Journey?</h2>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Many countries require proof of business ownership or employment for digital nomad visas. 
              FoundStart can help you establish a legitimate company structure to support your nomadic lifestyle.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/countries">
                <Button size="lg">
                  Start Company Formation
                </Button>
              </Link>
              <Link to="/blog">
                <Button variant="outline" size="lg">
                  Read Our Blog
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>

      <Footer />
    </div>
  );
};

export default DigitalNomadVisas;