import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ExternalLink } from 'lucide-react';
interface PartnerCardProps {
  partner: {
    category: string;
    platform: string;
    url: string;
    niche?: string;
    coupon?: string;
  };
}
const PartnerCard = ({
  partner
}: PartnerCardProps) => {
  return <Card className="hover:shadow-lg transition-all duration-300">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">{partner.platform}</CardTitle>
          <Badge variant="secondary" className="rounded-sm">{partner.category}</Badge>
        </div>
        {partner.niche && <p className="text-sm text-muted-foreground">{partner.niche}</p>}
        {partner.coupon && (
          <div className="mt-2">
            <Badge variant="destructive" className="text-xs">
              Coupon: {partner.coupon}
            </Badge>
          </div>
        )}
      </CardHeader>
      <CardContent>
        <Button className="w-full" onClick={() => window.open(partner.url, '_blank')}>
          <ExternalLink className="w-4 h-4 mr-2" />
          Visit Platform
        </Button>
      </CardContent>
    </Card>;
};
export default PartnerCard;