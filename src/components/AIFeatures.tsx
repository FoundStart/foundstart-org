
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Bot, Brain, FileText, TrendingUp, Shield, Lightbulb } from 'lucide-react';

const AIFeatures = () => {
  const coreFeatures = [
    {
      icon: Bot,
      title: "Business Name Generator",
      description: "AI-powered name suggestions with availability checking"
    },
    {
      icon: Shield,
      title: "Compliance Requirements",
      description: "Industry-specific regulatory guidance and monitoring"
    },
    {
      icon: TrendingUp,
      title: "Tax Optimization",
      description: "Smart recommendations for optimal tax structure"
    },
    {
      icon: FileText,
      title: "Legal Structure Advisory",
      description: "Personalized business structure recommendations"
    }
  ];

  const advancedFeatures = [
    {
      icon: Brain,
      title: "Predictive Monitoring",
      description: "AI anticipates compliance needs before deadlines"
    },
    {
      icon: FileText,
      title: "Document Generation",
      description: "Automated creation of legal and business documents"
    },
    {
      icon: TrendingUp,
      title: "Market Analysis",
      description: "Real-time insights and growth recommendations"
    },
    {
      icon: Lightbulb,
      title: "Business Strategy",
      description: "AI-generated plans tailored to your industry"
    }
  ];

  const FeatureCard = ({ icon: Icon, title, description }: any) => (
    <Card className="h-full hover:shadow-md transition-shadow">
      <CardContent className="p-6">
        <div className="flex items-start space-x-4">
          <div className="p-2 bg-primary/10 rounded-lg">
            <Icon className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h4 className="font-semibold mb-2">{title}</h4>
            <p className="text-sm text-muted-foreground">{description}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl md:text-4xl font-bold">
            AI-Powered <span className="gradient-text">Business Intelligence</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Our advanced AI agent guides you through every step of business formation 
            and ongoing compliance with intelligent automation.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Core Features */}
          <div>
            <div className="flex items-center mb-8">
              <h3 className="text-2xl font-semibold">Core AI Services</h3>
              <Badge variant="secondary" className="ml-3">All Plans</Badge>
            </div>
            <div className="grid gap-6">
              {coreFeatures.map((feature, index) => (
                <FeatureCard key={index} {...feature} />
              ))}
            </div>
          </div>

          {/* Advanced Features */}
          <div>
            <div className="flex items-center mb-8">
              <h3 className="text-2xl font-semibold">Advanced AI Features</h3>
              <Badge className="ml-3">Professional & Enterprise</Badge>
            </div>
            <div className="grid gap-6">
              {advancedFeatures.map((feature, index) => (
                <FeatureCard key={index} {...feature} />
              ))}
            </div>
          </div>
        </div>

        <div className="mt-16 text-center">
          <Card className="max-w-2xl mx-auto bg-gradient-to-r from-primary/5 to-purple-500/5 border-primary/20">
            <CardContent className="p-8">
              <Bot className="w-12 h-12 text-primary mx-auto mb-4" />
              <h4 className="text-xl font-semibold mb-4">24/7 AI Support</h4>
              <p className="text-muted-foreground">
                Your AI business consultant never sleeps. Get instant answers, 
                compliance reminders, and strategic guidance whenever you need it.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default AIFeatures;
