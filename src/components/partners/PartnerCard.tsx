import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ExternalLink } from 'lucide-react';
import { getFaviconUrl, getDomainHost } from '@/utils/favicon';
import PartnerPreviewModal from './PartnerPreviewModal';

interface PartnerCardProps {
  partner: {
    category: string;
    platform: string;
    url: string;
    niche?: string;
    coupon?: string;
    videoUrl?: string;
  };
}

const PartnerCard = ({ partner }: PartnerCardProps) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Card
        className="hover:shadow-lg transition-all duration-300 cursor-pointer group"
        onClick={() => setOpen(true)}
      >
        <CardHeader className="pb-3">
          <div className="flex items-center gap-3">
            <img
              src={getFaviconUrl(partner.url, 64)}
              alt={`${partner.platform} logo`}
              className="w-10 h-10 rounded-md bg-muted p-1 border shrink-0"
              loading="lazy"
              onError={(e) => { (e.target as HTMLImageElement).src = '/placeholder.svg'; }}
            />
            <div className="flex-1 min-w-0">
              <CardTitle className="text-base truncate group-hover:text-primary transition-colors">
                {partner.platform}
              </CardTitle>
              <p className="text-xs text-muted-foreground truncate">{getDomainHost(partner.url)}</p>
            </div>
          </div>
          <div className="flex items-center gap-2 flex-wrap mt-2">
            <Badge variant="secondary" className="rounded-sm text-xs">{partner.category}</Badge>
            {partner.coupon && (
              <Badge variant="destructive" className="text-xs">🎟 {partner.coupon}</Badge>
            )}
          </div>
          {partner.niche && (
            <p className="text-xs text-muted-foreground line-clamp-2 mt-1">{partner.niche}</p>
          )}
        </CardHeader>
        <CardContent className="pt-0">
          <Button
            className="w-full"
            size="sm"
            onClick={(e) => { e.stopPropagation(); window.open(partner.url, '_blank', 'noopener,noreferrer'); }}
          >
            <ExternalLink className="w-4 h-4 mr-2" />
            Visit
          </Button>
        </CardContent>
      </Card>

      <PartnerPreviewModal open={open} onOpenChange={setOpen} partner={partner} />
    </>
  );
};

export default PartnerCard;
