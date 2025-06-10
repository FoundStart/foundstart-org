
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const ServiceIntegrations = () => {
  const serviceCategories = [
    {
      title: "Banking & Cards",
      description: "Complete financial solutions",
      services: [
        { name: "Mercury", type: "Digital Banking", logo: "💎" },
        { name: "Brex", type: "Corporate Cards", logo: "💳" },
        { name: "Virtual Cards", type: "Visa/Mastercard", logo: "💰" },
        { name: "Wise", type: "Multi-currency", logo: "🌍" }
      ]
    },
    {
      title: "Digital Services",
      description: "Modern connectivity solutions",
      services: [
        { name: "eSIM Global", type: "International Data", logo: "📶" },
        { name: "Gift Cards", type: "Brand Rewards", logo: "🎁" },
        { name: "Stripe", type: "Online Payments", logo: "🔷" },
        { name: "PayPal", type: "Global Payments", logo: "💙" }
      ]
    },
    {
      title: "Crypto & Trading",
      description: "Digital asset integration",
      services: [
        { name: "Coinbase Pro", type: "Exchange", logo: "🅱️" },
        { name: "Kraken", type: "Advanced Trading", logo: "🐙" },
        { name: "BitPay", type: "Payments", logo: "🔸" },
        { name: "Circle", type: "USDC Infrastructure", logo: "⭕" }
      ]
    },
    {
      title: "Business Tools",
      description: "Essential business services",
      services: [
        { name: "QuickBooks", type: "Accounting", logo: "📊" },
        { name: "DocuSign", type: "E-signatures", logo: "📝" },
        { name: "Legalzoom", type: "Legal Services", logo: "⚖️" },
        { name: "Gusto", type: "Payroll", logo: "👥" }
      ]
    }
  ];

  return (
    <section id="services" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl md:text-4xl font-bold">
            <span className="gradient-text">Integrated</span> Partner Ecosystem
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Access all the tools you need to run your business through our 
            carefully curated partner network. From virtual cards to eSIM services.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {serviceCategories.map((category, categoryIndex) => (
            <div key={categoryIndex} className="space-y-6">
              <div className="text-center">
                <h3 className="text-xl font-semibold mb-2">{category.title}</h3>
                <p className="text-sm text-muted-foreground">{category.description}</p>
              </div>

              <div className="space-y-4">
                {category.services.map((service, serviceIndex) => (
                  <Card
                    key={serviceIndex}
                    className="hover:shadow-lg transition-all duration-300 hover:scale-105 cursor-pointer"
                  >
                    <CardContent className="p-4">
                      <div className="flex items-center space-x-3">
                        <div className="text-2xl">{service.logo}</div>
                        <div className="flex-1">
                          <div className="font-semibold text-sm">{service.name}</div>
                          <Badge variant="secondary" className="text-xs mt-1">
                            {service.type}
                          </Badge>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <Card className="glass-card max-w-md mx-auto">
            <CardHeader>
              <CardTitle className="text-2xl gradient-text">230+ Partners</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Seamlessly integrated services including virtual cards, eSIM, gift cards, and more
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default ServiceIntegrations;
