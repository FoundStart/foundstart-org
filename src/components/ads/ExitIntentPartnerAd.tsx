import { useEffect, useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ExternalLink, Gift } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import { digitalPartnersData } from '@/data/digitalPartnersData';
import { getFaviconUrl, getDomainHost } from '@/utils/favicon';

const SESSION_KEY = 'fs_exit_ad_shown';

const ExitIntentPartnerAd = () => {
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const [partner] = useState(() => {
    const withCoupon = digitalPartnersData.filter((p) => p.coupon);
    const pool = withCoupon.length > 0 ? withCoupon : digitalPartnersData;
    return pool[Math.floor(Math.random() * pool.length)];
  });

  useEffect(() => {
    if (sessionStorage.getItem(SESSION_KEY)) return;
    if (/^\/(dashboard|admin|auth|reset-password)/.test(location.pathname)) return;

    const onLeave = (e: MouseEvent) => {
      if (e.clientY <= 0 && !sessionStorage.getItem(SESSION_KEY)) {
        sessionStorage.setItem(SESSION_KEY, '1');
        setOpen(true);
      }
    };
    // Fire after 8s on mobile (no exit-intent there)
    const mobileTimer = window.matchMedia('(max-width: 768px)').matches
      ? window.setTimeout(() => {
          if (!sessionStorage.getItem(SESSION_KEY)) {
            sessionStorage.setItem(SESSION_KEY, '1');
            setOpen(true);
          }
        }, 20000)
      : 0;

    document.addEventListener('mouseleave', onLeave);
    return () => {
      document.removeEventListener('mouseleave', onLeave);
      if (mobileTimer) clearTimeout(mobileTimer);
    };
  }, [location.pathname]);

  if (!partner) return null;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <Badge variant="secondary" className="w-fit mb-2">
            <Gift className="w-3 h-3 mr-1" />Exclusive Partner Offer
          </Badge>
          <div className="flex items-center gap-3">
            <img
              src={getFaviconUrl(partner.url, 128)}
              alt={partner.platform}
              className="w-14 h-14 rounded-lg bg-muted p-1 border"
              onError={(e) => { (e.target as HTMLImageElement).src = '/placeholder.svg'; }}
            />
            <div>
              <DialogTitle className="text-xl">{partner.platform}</DialogTitle>
              <DialogDescription className="text-xs">{getDomainHost(partner.url)}</DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <p className="text-sm text-muted-foreground">{partner.niche}</p>

        {partner.coupon && (
          <div className="p-3 border-2 border-dashed border-primary/50 rounded-lg bg-primary/5 text-center">
            <p className="text-xs text-muted-foreground mb-1">Use coupon</p>
            <code className="font-mono font-bold text-lg text-primary">{partner.coupon}</code>
          </div>
        )}

        <div className="flex gap-2">
          <Button variant="outline" onClick={() => setOpen(false)} className="flex-1">
            No thanks
          </Button>
          <Button
            className="flex-1"
            onClick={() => {
              window.open(partner.url, '_blank', 'noopener,noreferrer');
              setOpen(false);
            }}
          >
            <ExternalLink className="w-4 h-4 mr-2" />
            Claim Offer
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ExitIntentPartnerAd;
