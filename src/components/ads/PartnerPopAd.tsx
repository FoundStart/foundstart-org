import { useEffect, useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ExternalLink, Gift } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { getFaviconUrl, getDomainHost } from '@/utils/favicon';
import { trackAdEvent, getVariant } from '@/utils/adTracking';
import { isLive } from '@/utils/integrationSettings';

export type PopAdItem = {
  platform: string;
  url: string;
  niche?: string;
  coupon?: string;
  href?: string;
};

type Trigger =
  | { type: 'timer'; delayMs: number }
  | { type: 'scroll'; percent: number }
  | { type: 'exit-intent' };

interface Props {
  items: PopAdItem[];
  storageKey: string;
  badgeLabel: string;
  trigger: Trigger;
  campaign?: string;
}

const PartnerPopAd = ({ items, storageKey, badgeLabel, trigger, campaign }: Props) => {
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const variant = getVariant(campaign || storageKey);
  const [partner] = useState(() => {
    if (items.length === 0) return null;
    return items[Math.floor(Math.random() * items.length)];
  });
  const campaignId = campaign || storageKey;

  useEffect(() => {
    if (sessionStorage.getItem(storageKey)) return;
    if (/^\/(dashboard|admin|auth|reset-password|settings)/.test(location.pathname)) return;
    if (!isLive('partnerAds')) return;
    if (!partner) return;

    const fire = () => {
      if (sessionStorage.getItem(storageKey)) return;
      // Don't pop while user is typing
      const active = document.activeElement as HTMLElement | null;
      if (active?.matches?.('input, textarea, select, [contenteditable="true"]')) return;
      sessionStorage.setItem(storageKey, '1');
      setOpen(true);
      trackAdEvent({ surface: 'pop', event: 'impression', campaign: campaignId, partner: partner.platform, variant, href: partner.href });
    };

    if (trigger.type === 'timer') {
      const t = window.setTimeout(fire, trigger.delayMs);
      return () => clearTimeout(t);
    }
    if (trigger.type === 'scroll') {
      const onScroll = () => {
        const pct =
          (window.scrollY + window.innerHeight) /
          Math.max(document.documentElement.scrollHeight, 1);
        if (pct * 100 >= trigger.percent) {
          fire();
          window.removeEventListener('scroll', onScroll);
        }
      };
      window.addEventListener('scroll', onScroll, { passive: true });
      return () => window.removeEventListener('scroll', onScroll);
    }
    // exit-intent
    const onLeave = (e: MouseEvent) => {
      if (e.clientY <= 0) fire();
    };
    const mobileFallback = window.matchMedia('(max-width: 768px)').matches
      ? window.setTimeout(fire, 25000)
      : 0;
    document.addEventListener('mouseleave', onLeave);
    return () => {
      document.removeEventListener('mouseleave', onLeave);
      if (mobileFallback) clearTimeout(mobileFallback);
    };
  }, [location.pathname, partner, storageKey, trigger]);

  if (!partner) return null;

  const onDismiss = () => {
    trackAdEvent({ surface: 'pop', event: 'dismiss', campaign: campaignId, partner: partner.platform, variant });
    setOpen(false);
  };
  const onClick = () => {
    trackAdEvent({ surface: 'pop', event: 'click', campaign: campaignId, partner: partner.platform, variant, href: partner.href });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <Badge variant="secondary" className="w-fit mb-2">
            <Gift className="w-3 h-3 mr-1" />{badgeLabel}
          </Badge>
          <div className="flex items-center gap-3">
            <img
              src={getFaviconUrl(partner.url, 128)}
              alt={partner.platform}
              className="w-14 h-14 rounded-lg bg-muted p-1 border"
              onError={(e) => { (e.target as HTMLImageElement).src = '/placeholder.svg'; }}
            />
            <div className="min-w-0">
              <DialogTitle className="text-xl truncate">{partner.platform}</DialogTitle>
              <DialogDescription className="text-xs truncate">{getDomainHost(partner.url)}</DialogDescription>
            </div>
          </div>
        </DialogHeader>

        {partner.niche && <p className="text-sm text-muted-foreground">{partner.niche}</p>}

        {partner.coupon && (
          <div className="p-3 border-2 border-dashed border-primary/50 rounded-lg bg-primary/5 text-center">
            <p className="text-xs text-muted-foreground mb-1">Use coupon</p>
            <code className="font-mono font-bold text-lg text-primary">{partner.coupon}</code>
          </div>
        )}

        <div className="flex gap-2">
          <Button variant="outline" onClick={onDismiss} className="flex-1">
            No thanks
          </Button>
          {partner.href ? (
            <Button asChild className="flex-1" onClick={() => { onClick(); setOpen(false); }}>
              <Link to={partner.href}>Explore</Link>
            </Button>
          ) : (
            <Button
              className="flex-1"
              onClick={() => {
                onClick();
                window.open(partner.url, '_blank', 'noopener,noreferrer');
                setOpen(false);
              }}
            >
              <ExternalLink className="w-4 h-4 mr-2" />
              Visit
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PartnerPopAd;
