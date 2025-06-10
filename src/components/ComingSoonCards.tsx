
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Zap, 
  Shield, 
  Rocket, 
  Brain, 
  Lock, 
  Globe2,
  ArrowRight,
  Clock
} from 'lucide-react';

const ComingSoonCards = () => {
  const comingFeatures = [
    {
      id: 'ai-assistant',
      title: 'AI Business Assistant',
      description: 'Advanced AI that handles customer support, scheduling, and business operations automatically.',
      icon: Brain,
      eta: 'Q2 2024',
      category: 'AI & Automation'
    },
    {
      id: 'blockchain',
      title: 'Blockchain Integration',
      description: 'Smart contracts for business agreements, crypto payments, and decentralized identity verification.',
      icon: Lock,
      eta: 'Q3 2024',
      category: 'Web3 & Crypto'
    },
    {
      id: 'global-expansion',
      title: 'Global Expansion Suite',
      description: 'Automated compliance and registration for 50+ countries with local partner networks.',
      icon: Globe2,
      eta: 'Q4 2024',
      category: 'International'
    },
    {
      id: 'security-suite',
      title: 'Enterprise Security',
      description: 'Advanced cybersecurity monitoring, threat detection, and automated incident response.',
      icon: Shield,
      eta: 'Q1 2025',
      category: 'Security'
    },
    {
      id: 'growth-engine',
      title: 'Growth Engine',
      description: 'AI-powered marketing automation, lead generation, and customer acquisition platform.',
      icon: Rocket,
      eta: 'Q2 2025',
      category: 'Marketing'
    },
    {
      id: 'quantum-analytics',
      title: 'Quantum Analytics',
      description: 'Next-generation predictive analytics using quantum computing for business insights.',
      icon: Zap,
      eta: 'Q3 2025',
      category: 'Analytics'
    }
  ];

  const getCategoryColor = (category: string) => {
    const colors = {
      'AI & Automation': 'bg-purple-500',
      'Web3 & Crypto': 'bg-orange-500',
      'International': 'bg-blue-500',
      'Security': 'bg-red-500',
      'Marketing': 'bg-green-500',
      'Analytics': 'bg-yellow-500'
    };
    return colors[category as keyof typeof colors] || 'bg-gray-500';
  };

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/20">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center space-y-4 mb-16">
          <Badge className="mb-4">
            <Clock className="w-4 h-4 mr-2" />
            Coming Soon
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold">
            Future <span className="gradient-text">Innovations</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Revolutionary features in development that will transform how businesses operate and scale globally.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {comingFeatures.map((feature, index) => (
            <Card 
              key={feature.id}
              className="relative overflow-hidden group hover:shadow-2xl transition-all duration-500 hover:scale-105 animate-fade-in glass-card"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Animated Background Effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <CardHeader className="relative z-10">
                <div className="flex items-center justify-between mb-4">
                  <feature.icon className="w-8 h-8 text-primary group-hover:scale-110 transition-transform duration-300" />
                  <Badge className={`${getCategoryColor(feature.category)} text-white`}>
                    {feature.category}
                  </Badge>
                </div>
                <CardTitle className="text-xl mb-2 group-hover:text-primary transition-colors">
                  {feature.title}
                </CardTitle>
              </CardHeader>

              <CardContent className="relative z-10 space-y-4">
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>

                <div className="flex items-center justify-between pt-4 border-t border-border/50">
                  <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                    <Clock className="w-4 h-4" />
                    <span>ETA: {feature.eta}</span>
                  </div>
                  
                  <Button 
                    variant="ghost" 
                    size="sm"
                    className="group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300"
                  >
                    Learn More
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </div>
              </CardContent>

              {/* Floating Animation Elements */}
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-primary/10 rounded-full blur-xl group-hover:bg-primary/20 transition-all duration-500" />
              <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-purple-500/10 rounded-full blur-xl group-hover:bg-purple-500/20 transition-all duration-500" />
            </Card>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <Card className="max-w-2xl mx-auto glass-card">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold mb-4">
                Be the First to Know
              </h3>
              <p className="text-muted-foreground mb-6">
                Get exclusive early access to these groundbreaking features and shape the future of business automation.
              </p>
              <Button className="group">
                Join Early Access Program
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default ComingSoonCards;
