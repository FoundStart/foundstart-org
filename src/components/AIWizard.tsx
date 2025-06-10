
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, MessageSquare, CheckCircle } from 'lucide-react';

const AIWizard = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [businessName, setBusinessName] = useState('');

  const wizardSteps = [
    {
      question: "What's your business name?",
      type: "input",
      placeholder: "Enter your business name",
      help: "Don't worry, we'll check availability across all jurisdictions"
    },
    {
      question: "What industry are you in?",
      type: "select",
      options: ["Technology", "E-commerce", "Consulting", "Healthcare", "Finance", "Other"],
      help: "This helps us recommend the best business structure"
    },
    {
      question: "Where will your customers be located?",
      type: "select",
      options: ["Primarily US", "Primarily UK/EU", "Global", "Canada/North America"],
      help: "This influences the optimal jurisdiction for incorporation"
    },
    {
      question: "What's your expected revenue in year 1?",
      type: "select",
      options: ["Under $100K", "$100K - $500K", "$500K - $1M", "Over $1M"],
      help: "This helps us suggest the right tax structure"
    }
  ];

  const recommendations = [
    {
      title: "Delaware LLC",
      confidence: "95%",
      reason: "Best for tech startups with US focus",
      benefits: ["Tax advantages", "Investor-friendly", "Strong legal framework"]
    },
    {
      title: "UK Limited Company",
      confidence: "78%",
      reason: "Alternative for EU market access",
      benefits: ["Lower formation cost", "EU access", "Banking advantages"]
    }
  ];

  const handleNext = () => {
    if (currentStep < wizardSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-primary/5 to-purple-500/5">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl md:text-4xl font-bold">
            <span className="gradient-text">AI-Powered</span> Business Setup Wizard
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Answer a few questions and our AI will recommend the perfect business 
            structure and jurisdiction for your specific needs.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Wizard Interface */}
          <Card className="shadow-xl">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <MessageSquare className="w-6 h-6 text-primary" />
                  <CardTitle>Business Setup Assistant</CardTitle>
                </div>
                <Badge variant="secondary">
                  Step {currentStep + 1} of {wizardSteps.length}
                </Badge>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-primary h-2 rounded-full transition-all duration-300"
                  style={{ width: `${((currentStep + 1) / wizardSteps.length) * 100}%` }}
                ></div>
              </div>
            </CardHeader>

            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">
                  {wizardSteps[currentStep].question}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {wizardSteps[currentStep].help}
                </p>

                {wizardSteps[currentStep].type === "input" && (
                  <Input
                    placeholder={wizardSteps[currentStep].placeholder}
                    value={businessName}
                    onChange={(e) => setBusinessName(e.target.value)}
                    className="text-lg p-4"
                  />
                )}

                {wizardSteps[currentStep].type === "select" && (
                  <div className="grid grid-cols-2 gap-3">
                    {wizardSteps[currentStep].options?.map((option, index) => (
                      <Button
                        key={index}
                        variant="outline"
                        className="p-4 h-auto text-left justify-start hover:bg-primary/10 hover:border-primary"
                      >
                        {option}
                      </Button>
                    ))}
                  </div>
                )}
              </div>

              <div className="flex justify-between pt-4">
                <Button
                  variant="outline"
                  onClick={handlePrevious}
                  disabled={currentStep === 0}
                >
                  Previous
                </Button>
                <Button onClick={handleNext} className="group">
                  {currentStep === wizardSteps.length - 1 ? "Get Recommendations" : "Next"}
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Recommendations Preview */}
          <div className="space-y-6">
            <div>
              <h3 className="text-2xl font-semibold mb-4">AI Recommendations</h3>
              <p className="text-muted-foreground">
                Based on your answers, here are our top recommendations:
              </p>
            </div>

            <div className="space-y-4">
              {recommendations.map((rec, index) => (
                <Card key={index} className="hover:shadow-lg transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h4 className="text-lg font-semibold">{rec.title}</h4>
                        <p className="text-sm text-muted-foreground">{rec.reason}</p>
                      </div>
                      <Badge className="bg-green-100 text-green-800">
                        {rec.confidence} match
                      </Badge>
                    </div>
                    
                    <div className="space-y-2">
                      {rec.benefits.map((benefit, benefitIndex) => (
                        <div key={benefitIndex} className="flex items-center space-x-2">
                          <CheckCircle className="w-4 h-4 text-green-500" />
                          <span className="text-sm">{benefit}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Card className="bg-primary/5 border-primary/20">
              <CardContent className="p-6 text-center">
                <div className="text-2xl mb-2">🎯</div>
                <h4 className="font-semibold mb-2">Perfect Match Guarantee</h4>
                <p className="text-sm text-muted-foreground">
                  Our AI considers 50+ factors to find your optimal setup. 
                  Not satisfied? We'll restructure for free.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AIWizard;
