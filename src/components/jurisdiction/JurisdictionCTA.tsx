
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Globe, User, FileText } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const JurisdictionCTA = () => {
  const navigate = useNavigate();

  return (
    <div className="text-center mt-16 space-y-8">
      <Card className="max-w-2xl mx-auto bg-gradient-to-r from-primary/5 to-purple-500/5 border-primary/20">
        <CardContent className="p-8">
          <Globe className="w-12 h-12 text-primary mx-auto mb-4" />
          <h4 className="text-xl font-semibold mb-4">Explore All 400+ Partners</h4>
          <p className="text-muted-foreground mb-6">
            Browse our complete directory of trusted business partners across all categories - 
            from AI tools and automation to marketing and development services.
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-sm mb-6">
            <Badge variant="outline">✓ 400+ Verified Partners</Badge>
            <Badge variant="outline">✓ All Business Categories</Badge>
            <Badge variant="outline">✓ Exclusive Deals</Badge>
            <Badge variant="outline">✓ Regular Updates</Badge>
          </div>
          <Button size="lg" onClick={() => navigate('/digital-partners')}>
            <Globe className="w-4 h-4 mr-2" />
            View All Partners
          </Button>
        </CardContent>
      </Card>

      <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
        <Card className="bg-gradient-to-r from-blue-500/5 to-cyan-500/5 border-blue-500/20">
          <CardContent className="p-6 text-center">
            <User className="w-10 h-10 text-blue-600 mx-auto mb-4" />
            <h4 className="text-lg font-semibold mb-2">Ready to Start?</h4>
            <p className="text-muted-foreground mb-4">
              Sign up for our dashboard to manage all your business formation needs
            </p>
            <Button onClick={() => navigate('/auth')} className="w-full">
              <User className="w-4 h-4 mr-2" />
              Sign Up to Dashboard
            </Button>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-green-500/5 to-emerald-500/5 border-green-500/20">
          <CardContent className="p-6 text-center">
            <FileText className="w-10 h-10 text-green-600 mx-auto mb-4" />
            <h4 className="text-lg font-semibold mb-2">Need Custom Help?</h4>
            <p className="text-muted-foreground mb-4">
              Get a personalized quote for your specific business formation needs
            </p>
            <Button onClick={() => navigate('/contact-sales')} variant="outline" className="w-full">
              <FileText className="w-4 h-4 mr-2" />
              Get Quote & Inquiries
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default JurisdictionCTA;
