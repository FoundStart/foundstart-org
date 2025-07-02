
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowRight, CheckCircle, Play } from 'lucide-react';

const Hero = () => {
  const [selectedStep, setSelectedStep] = useState(1);

  const steps = [
    {
      id: 1,
      title: "AI-Powered Setup",
      description: "Our intelligent wizard guides you through business formation in minutes",
      icon: "🤖"
    },
    {
      id: 2,
      title: "One-Click Banking",
      description: "Instantly connect with partner banks and set up your business accounts",
      icon: "🏦"
    },
    {
      id: 3,
      title: "Payment Integration",
      description: "Start accepting payments with integrated Stripe and crypto solutions",
      icon: "💳"
    }
  ];

  const jurisdictions = [
    { name: "USA", flag: "🇺🇸" },
    { name: "UK", flag: "🇬🇧" },
    { name: "Canada", flag: "🇨🇦" },
    { name: "Estonia", flag: "🇪🇪" },
    { name: "Finland", flag: "🇫🇮" },
    { name: "Sweden", flag: "🇸🇪" },
    { name: "Latvia", flag: "🇱🇻" },
    { name: "Lithuania", flag: "🇱🇹" }
  ];

  const handleWatchDemo = () => {
    window.open('https://youtu.be/OVd9b5M6OMk?si=kyghwxE8wrjCIGyI', '_blank');
  };

  return (
    <section className="pt-24 pb-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-background via-blue-50/30 to-purple-50/30 dark:from-background dark:via-blue-950/20 dark:to-purple-950/20">
      <div className="container mx-auto max-w-7xl">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8 animate-fade-in">
            <div className="space-y-4">
              <div className="inline-flex items-center px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">
                <CheckCircle className="w-4 h-4 mr-2" />
                Trusted by 10,000+ Entrepreneurs
              </div>
              <h1 className="text-4xl md:text-6xl font-bold leading-tight">
                Launch Your Business in{" "}
                <span className="gradient-text">Minutes, Not Months</span>
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed">
                From company formation to banking and payments - we handle everything. 
                Start your business in the USA, UK, Canada, Estonia, Finland, Sweden, Latvia, or Lithuania 
                with our AI-powered platform and integrated partner ecosystem.
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {jurisdictions.map((jurisdiction) => (
                <div
                  key={jurisdiction.name}
                  className="flex items-center justify-center px-3 py-2 bg-white dark:bg-gray-800 rounded-lg border border-border shadow-sm hover:shadow-md transition-shadow"
                >
                  <span className="text-lg mr-2">{jurisdiction.flag}</span>
                  <span className="font-medium text-sm">{jurisdiction.name}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="text-lg px-8 py-6 group">
                Start Your Business
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="text-lg px-8 py-6 group"
                onClick={handleWatchDemo}
              >
                <Play className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
                Watch Demo by MoMo Sa
              </Button>
            </div>

            <div className="flex items-center space-x-8 text-sm text-muted-foreground">
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span>No hidden fees</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span>24/7 support</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span>Money-back guarantee</span>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="space-y-4">
              <h3 className="text-2xl font-semibold text-center">How it works</h3>
              <div className="grid gap-4">
                {steps.map((step, index) => (
                  <Card
                    key={step.id}
                    className={`cursor-pointer transition-all duration-300 hover:shadow-lg ${
                      selectedStep === step.id 
                        ? 'ring-2 ring-primary bg-primary/5' 
                        : 'hover:bg-accent/50'
                    }`}
                    onClick={() => setSelectedStep(step.id)}
                  >
                    <CardContent className="p-6">
                      <div className="flex items-start space-x-4">
                        <div className="text-3xl">{step.icon}</div>
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            <span className="text-2xl font-bold text-primary">
                              {index + 1}
                            </span>
                            <h4 className="text-lg font-semibold">{step.title}</h4>
                          </div>
                          <p className="text-muted-foreground">{step.description}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            <div className="glass-card rounded-2xl p-6 animate-float">
              <div className="text-center space-y-2">
                <div className="text-3xl font-bold gradient-text">5-10 minutes</div>
                <div className="text-muted-foreground">Average setup time</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
