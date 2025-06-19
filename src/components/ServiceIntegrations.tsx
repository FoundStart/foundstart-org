
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Building2, 
  Globe, 
  CreditCard, 
  Smartphone, 
  Mail, 
  Server, 
  TrendingUp,
  Wifi,
  Gift,
  Search,
  Target,
  Brain
} from 'lucide-react';

const ServiceIntegrations = () => {
  const services = [
    {
      icon: Building2,
      name: "Company Formation",
      description: "LLC, Corp formation in USA, UK, Canada",
      status: "Available",
      color: "bg-blue-500"
    },
    {
      icon: Globe,
      name: "Domain Registration",
      description: ".com, .net, .org domains with SSL",
      status: "Available",
      color: "bg-green-500"
    },
    {
      icon: Server,
      name: "Web Hosting",
      description: "Premium hosting with 99.9% uptime",
      status: "Available",
      color: "bg-purple-500"
    },
    {
      icon: Mail,
      name: "Business Email",
      description: "Professional email accounts",
      status: "Available",
      color: "bg-orange-500"
    },
    {
      icon: TrendingUp,
      name: "Website Platform",
      description: "SAAS-ready website solutions",
      status: "Available",
      color: "bg-pink-500"
    },
    {
      icon: Smartphone,
      name: "Mobile Apps",
      description: "Android, iOS & Harmony apps",
      status: "Available",
      color: "bg-indigo-500"
    },
    {
      icon: CreditCard,
      name: "Virtual Cards",
      description: "Visa & Mastercard virtual cards",
      status: "Available",
      color: "bg-cyan-500"
    },
    {
      icon: Wifi,
      name: "eSIM Cards",
      description: "Global eSIM connectivity",
      status: "Available",
      color: "bg-teal-500"
    },
    {
      icon: Gift,
      name: "Gift Cards",
      description: "Digital gift card platform",
      status: "Available",
      color: "bg-red-500"
    },
    {
      icon: Search,
      name: "SEO Optimization",
      description: "Search engine optimization",
      status: "Available",
      color: "bg-blue-600"
    },
    {
      icon: Smartphone,
      name: "ASO Services",
      description: "App store optimization",
      status: "Available",
      color: "bg-green-600"
    },
    {
      icon: Brain,
      name: "LLMO",
      description: "LLM optimization for AI visibility",
      status: "Beta",
      color: "bg-purple-600"
    },
    {
      icon: Globe,
      name: "GEO Optimization",
      description: "Geographic search optimization",
      status: "Available",
      color: "bg-orange-600"
    },
    {
      icon: Target,
      name: "AEO Services",
      description: "Answer engine optimization",
      status: "Available",
      color: "bg-pink-600"
    },
    {
      icon: TrendingUp,
      name: "SEM Management",
      description: "Search engine marketing",
      status: "Available",
      color: "bg-indigo-600"
    }
  ];

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/30">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl md:text-4xl font-bold">
            Complete <span className="gradient-text">Business Ecosystem</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Everything you need to launch, grow, and scale your business - from formation 
            to marketing optimization, all integrated in one platform.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className={`p-2 rounded-lg ${service.color}`}>
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <CardTitle className="text-lg">{service.name}</CardTitle>
                    </div>
                    <Badge variant={service.status === "Beta" ? "secondary" : "default"}>
                      {service.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{service.description}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ServiceIntegrations;
