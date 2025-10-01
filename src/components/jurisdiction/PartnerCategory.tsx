
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, ExternalLink } from 'lucide-react';

interface Partner {
  category: string;
  details: string;
  platform: string;
  url: string;
  coupon?: string;
  videoUrl?: string;
}

interface PartnerCategoryProps {
  category: string;
  partners: Partner[];
  icon: React.ComponentType<{ className?: string }>;
}

const PartnerCategory = ({ category, partners, icon: Icon }: PartnerCategoryProps) => {
  return (
    <div className="mb-12">
      <div className="flex items-center mb-6">
        <Icon className="w-6 h-6 text-primary mr-3" />
        <h3 className="text-2xl font-semibold gradient-text">{category}</h3>
        <Badge variant="secondary" className="ml-3">
          {partners.length} Partner{partners.length > 1 ? 's' : ''}
        </Badge>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {partners.map((partner, index) => (
          <Card key={index} className="hover:shadow-lg transition-all duration-300 hover:scale-105">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">{partner.platform}</CardTitle>
                <ExternalLink className="w-4 h-4 text-muted-foreground" />
              </div>
              <p className="text-sm text-muted-foreground">{partner.details}</p>
              {partner.coupon && (
                <div className="mt-2">
                  <Badge variant="destructive" className="text-xs">
                    Coupon: {partner.coupon}
                  </Badge>
                </div>
              )}
            </CardHeader>
            <CardContent className="space-y-2">
              <Button 
                className="w-full group" 
                onClick={() => window.open(partner.url, '_blank')}
              >
                Visit {partner.platform}
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
              {partner.videoUrl && (
                <Button 
                  variant="outline"
                  className="w-full" 
                  onClick={() => window.open(partner.videoUrl, '_blank')}
                >
                  Watch Demo
                </Button>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default PartnerCategory;
