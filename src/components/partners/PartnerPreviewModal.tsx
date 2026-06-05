import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ExternalLink, Copy, Check } from 'lucide-react';
import { useState } from 'react';
import { getFaviconUrl, getDomainHost } from '@/utils/favicon';

interface PartnerPreviewModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  partner: {
    platform: string;
    url: string;
    category?: string;
    niche?: string;
    coupon?: string;
  } | null;
}

const PartnerPreviewModal = ({ open, onOpenChange, partner }: PartnerPreviewModalProps) => {
  const [copied, setCopied] = useState(false);
  if (!partner) return null;

  const copyCoupon = () => {
    if (!partner.coupon) return;
    navigator.clipboard.writeText(partner.coupon);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="flex items-center gap-4">
            <img
              src={getFaviconUrl(partner.url, 128)}
              alt={`${partner.platform} logo`}
              className="w-14 h-14 rounded-lg bg-muted p-1 border"
              onError={(e) => { (e.target as HTMLImageElement).src = '/placeholder.svg'; }}
            />
            <div className="flex-1 min-w-0">
              <DialogTitle className="text-xl truncate">{partner.platform}</DialogTitle>
              <DialogDescription className="text-xs truncate">{getDomainHost(partner.url)}</DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-3 mt-2">
          {partner.category && <Badge variant="secondary">{partner.category}</Badge>}
          {partner.niche && <p className="text-sm text-muted-foreground">{partner.niche}</p>}

          {partner.coupon && (
            <div className="flex items-center gap-2 p-3 border-2 border-dashed border-primary/40 rounded-lg bg-primary/5">
              <span className="text-xs text-muted-foreground">Coupon:</span>
              <code className="font-mono font-bold text-primary flex-1">{partner.coupon}</code>
              <Button size="sm" variant="ghost" onClick={copyCoupon}>
                {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              </Button>
            </div>
          )}

          <Button className="w-full" onClick={() => window.open(partner.url, '_blank', 'noopener,noreferrer')}>
            <ExternalLink className="w-4 h-4 mr-2" />
            Visit {partner.platform}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PartnerPreviewModal;
