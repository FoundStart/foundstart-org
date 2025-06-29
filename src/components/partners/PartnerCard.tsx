
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ExternalLink, Globe, CreditCard, Phone, Smartphone, Video, Code, ShoppingCart, Palette, BookOpen, BarChart, Mail, Search, Zap, Building, Users } from 'lucide-react';

interface PartnerCardProps {
  partner: {
    category: string;
    platform: string;
    url: string;
    details?: string;
    languages?: string;
  };
}

const PartnerCard = ({ partner }: PartnerCardProps) => {
  const getCategoryIcon = (category: string) => {
    const iconMap: { [key: string]: any } = {
      'Company Formation': Building,
      'Finance': CreditCard,
      'Telecommunications': Phone,
      'Large Language Model': Zap,
      'AI UGC': Video,
      'Business Automation': BarChart,
      'AI Videos': Video,
      'Mobile APP developments': Smartphone,
      'Web developments': Globe,
      'Digital marketplace': ShoppingCart,
      'AI Tools': Zap,
      'SEO tools - Traffic': Search,
      'Digital marketing tool': Mail,
      'Freelancer & Earn Money online': Users,
      'Design': Palette,
      'Learning & Courses': BookOpen,
      'Print on Demand': Palette,
      'Dropshipping': ShoppingCart,
      'default': Globe
    };
    const Icon = iconMap[category] || iconMap['default'];
    return <Icon className="w-5 h-5 text-primary" />;
  };

  return (
    <Card className="hover:shadow-lg transition-all duration-300 hover:scale-105">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            {getCategoryIcon(partner.category)}
            <CardTitle className="text-lg">{partner.platform}</CardTitle>
          </div>
          <ExternalLink className="w-4 h-4 text-muted-foreground" />
        </div>
        <div className="space-y-2">
          <Badge variant="secondary" className="text-xs">
            {partner.category}
          </Badge>
          {partner.details && (
            <p className="text-sm text-muted-foreground">{partner.details}</p>
          )}
          {partner.languages && (
            <Badge variant="outline" className="text-xs">
              {partner.languages}
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <Button 
          className="w-full group" 
          onClick={() => window.open(partner.url, '_blank')}
        >
          <ExternalLink className="w-4 h-4 mr-2" />
          Visit Platform
        </Button>
      </CardContent>
    </Card>
  );
};

export default PartnerCard;
