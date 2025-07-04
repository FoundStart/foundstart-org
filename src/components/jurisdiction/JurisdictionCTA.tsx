
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, ExternalLink, MessageSquare, UserPlus } from 'lucide-react';
import { Link } from 'react-router-dom';

const JurisdictionCTA = () => {
  return (
    <div className="text-center space-y-8 mt-16">
      <div>
        <h3 className="text-2xl font-bold mb-4">
          <span className="gradient-text">Option 2:</span> Need Custom Solutions?
        </h3>
        <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
          Get personalized assistance for complex business formations or custom requirements.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <Card className="hover:shadow-lg transition-all duration-300">
          <CardHeader>
            <CardTitle className="flex items-center">
              <UserPlus className="w-5 h-5 mr-2 text-primary" />
              Sign Up to Dashboard
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              Access your personalized business formation dashboard and track your progress.
            </p>
            <Link to="/auth">
              <Button className="w-full group">
                Sign Up Now
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-all duration-300">
          <CardHeader>
            <CardTitle className="flex items-center">
              <MessageSquare className="w-5 h-5 mr-2 text-primary" />
              Get Quote & Inquiries
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              Request a custom quote or get answers to your specific questions.
            </p>
            <Link to="/services">
              <Button variant="outline" className="w-full group">
                Get Custom Quote
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>

      <div className="pt-8">
        <h4 className="text-lg font-semibold mb-4">
          Ready to start with our trusted partners?
        </h4>
        <Link to="/partners">
          <Button size="lg" className="group">
            <ExternalLink className="w-4 h-4 mr-2" />
            View All Partner Links
            <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default JurisdictionCTA;
