import { useEffect, useMemo, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { X, ExternalLink, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { getFaviconUrl, getDomainHost } from '@/utils/favicon';
import { trackAdEvent, getVariant } from '@/utils/adTracking';
import { isLive } from '@/utils/integrationSettings';
import { withUtm, ga4 } from '@/utils/utm';
import { useIsMobile } from '@/hooks/use-mobile';

export type BannerAdItem = {
  platform: string;
  url: string;
  href?: string;
  tag: string;
};

interface Props {
  items: BannerAdItem[];
  storageKey: string;
  position?: 'bottom-left' | 'bottom-right' | 'top-center' | 'bottom-center';
  accentClassName?: string; // bg color of strip accent
  label: string;
  intervalMs?: number;
  delayMs?: number;
  campaign?: string;
}

const positionClasses: Record<NonNullable<Props['position']>, string> = {
  'bottom-left': 'bottom-20 lg:bottom-4 left-4',
  'bottom-right': 'bottom-20 lg:bottom-4 right-4',
  'bottom-center': 'bottom-32 lg:bottom-20 left-1/2 -translate-x-1/2',
  'top-center': 'top-20 left-1/2 -translate-x-1/2',
};

const PartnerBannerStrip = ({
  items,
  storageKey,
  position = 'bottom-left',
  accentClassName = 'bg-primary',
  label,
  intervalMs = 6000,
  delayMs = 0,
  campaign,
}: Props) => {
  const location = useLocation();
  const isMobile = useIsMobile();
  const device: 'mobile' | 'desktop' = isMobile ? 'mobile' : 'desktop';
  const [dismissed, setDismissed] = useState(() => sessionStorage.getItem(storageKey) === '1');
  const [visible, setVisible] = useState(delayMs === 0);
  const [index, setIndex] = useState(0);
  const [formActive, setFormActive] = useState(false);
  const variant = useMemo(() => getVariant(campaign || storageKey), [campaign, storageKey]);

  const pool = useMemo(() => [...items].sort(() => Math.random() - 0.5).slice(0, 8), [items]);

  useEffect(() => {
    if (delayMs <= 0) return;
    const t = setTimeout(() => setVisible(true), delayMs);
    return () => clearTimeout(t);
  }, [delayMs]);

  useEffect(() => {
    if (!visible || dismissed || pool.length === 0) return;
    const t = setInterval(() => setIndex((i) => (i + 1) % pool.length), intervalMs);
    return () => clearInterval(t);
  }, [visible, dismissed, pool.length, intervalMs]);

  // Hide while user is typing in any form field
  useEffect(() => {
    const isFormEl = (el: EventTarget | null) =>
      !!(el && (el as HTMLElement).matches?.('input, textarea, select, [contenteditable="true"]'));
    const onIn = (e: FocusEvent) => { if (isFormEl(e.target)) setFormActive(true); };
    const onOut = (e: FocusEvent) => { if (isFormEl(e.target)) setFormActive(false); };
    document.addEventListener('focusin', onIn);
    document.addEventListener('focusout', onOut);
    return () => {
      document.removeEventListener('focusin', onIn);
      document.removeEventListener('focusout', onOut);
    };
  }, []);

  const ad = pool[index];
  const campaignId = campaign || storageKey;

  // Fire impression once per ad rotation
  useEffect(() => {
    if (!ad) return;
    trackAdEvent({ surface: 'banner', event: 'impression', campaign: campaignId, partner: ad.platform, variant, href: ad.href, device });
    ga4('ad_impression', { ad_surface: 'banner', ad_campaign: campaignId, ad_partner: ad.platform, ad_variant: variant, device });
  }, [ad?.platform, ad?.href, campaignId, variant, device]);

  const hide =
    /^\/(dashboard|admin|auth|reset-password|settings)/.test(location.pathname) ||
    !isLive('partnerAds') ||
    formActive;
  if (hide || !visible || dismissed || pool.length === 0) return null;

  const dismiss = () => {
    trackAdEvent({ surface: 'banner', event: 'dismiss', campaign: campaignId, partner: ad.platform, variant, device });
    ga4('ad_dismiss', { ad_surface: 'banner', ad_campaign: campaignId, ad_partner: ad.platform, ad_variant: variant, device });
    sessionStorage.setItem(storageKey, '1');
    setDismissed(true);
  };

  const taggedUrl = withUtm(ad?.url || '', { source: 'banner', medium: device, campaign: campaignId, content: ad?.platform });
  const onClick = () => {
    trackAdEvent({ surface: 'banner', event: 'click', campaign: campaignId, partner: ad.platform, variant, href: ad.href, device });
    ga4('select_ad', { ad_surface: 'banner', ad_campaign: campaignId, ad_partner: ad.platform, ad_variant: variant, device, link_url: taggedUrl });
  };

  return (
    <div className={`fixed ${positionClasses[position]} z-40 w-[92%] max-w-sm pointer-events-auto`}>
      <div className="relative flex items-center gap-2 bg-card/95 backdrop-blur border shadow-2xl rounded-xl p-2 animate-fade-in overflow-hidden">
        <span className={`absolute left-0 top-0 h-full w-1 ${accentClassName}`} aria-hidden />
        <Sparkles className="w-3.5 h-3.5 text-primary shrink-0 ml-1" />
        <img
          src={getFaviconUrl(ad.url, 64)}
          alt=""
          className="w-8 h-8 rounded-md bg-muted p-0.5 border shrink-0"
          onError={(e) => { (e.target as HTMLImageElement).src = '/placeholder.svg'; }}
        />
        <div className="flex-1 min-w-0 text-xs">
          <div className="text-[10px] uppercase tracking-wide text-muted-foreground">{label}</div>
          <div className="font-semibold truncate">{ad.platform}</div>
          <div className="text-muted-foreground truncate text-[10px]">{getDomainHost(ad.url)}</div>
        </div>
        {ad.href ? (
          <Button asChild size="sm" className="h-7 text-xs" onClick={onClick}>
            <Link to={ad.href}>View</Link>
          </Button>
        ) : (
          <Button
            size="sm"
            className="h-7 text-xs"
            onClick={() => { onClick(); window.open(taggedUrl, '_blank', 'noopener,noreferrer'); }}
          >
            <ExternalLink className="w-3 h-3 mr-1" />Visit
          </Button>
        )}
        <button
          onClick={dismiss}
          className="text-muted-foreground hover:text-foreground p-1"
          aria-label="Dismiss"
        >
          <X className="w-3 h-3" />
        </button>
      </div>
    </div>
  );
};

export default PartnerBannerStrip;
