import { useEffect, useMemo, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { X, ExternalLink, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { digitalPartnersData } from '@/data/digitalPartnersData';
import { freelancerPartnersData } from '@/data/freelancerPartnersData';
import { sisterDomains } from '@/data/sisterPartnersData';
import { domainsData, type Domain } from '@/data/domainsData';
import { getFaviconUrl, getDomainHost } from '@/utils/favicon';

type AdItem = {
  kind: 'digital' | 'freelancer' | 'sister' | 'domain';
  platform: string;
  url: string;
  href?: string; // internal route
  tag: string;
};

const pickRandom = <T,>(arr: T[], n: number): T[] => {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a.slice(0, n);
};

const SitewidePartnerAds = () => {
  const location = useLocation();
  const [dismissed, setDismissed] = useState(false);
  const [index, setIndex] = useState(0);

  const ads: AdItem[] = useMemo(() => {
    const d = pickRandom(digitalPartnersData, 4).map((p) => ({
      kind: 'digital' as const, platform: p.platform, url: p.url, tag: 'Digital Partner',
    }));
    const f = pickRandom(freelancerPartnersData, 3).map((p) => ({
      kind: 'freelancer' as const, platform: p.platform, url: p.url, tag: 'Freelancer',
    }));
    const s = pickRandom(sisterDomains, 2).map((name) => ({
      kind: 'sister' as const, platform: name, url: `https://${name}`,
      href: '/sister-partners', tag: 'Sister Brand',
    }));
    const dom = pickRandom<Domain>(domainsData.filter((x) => x.price && x.price !== 'Not For Sale'), 2).map((d) => ({
      kind: 'domain' as const, platform: d.name, url: `https://${d.name}`,
      href: '/domains', tag: `Domain ${d.price ? '$' + d.price : ''}`,
    }));
    return [...d, ...f, ...s, ...dom].sort(() => Math.random() - 0.5);
  }, []);

  useEffect(() => {
    if (dismissed || ads.length === 0) return;
    const t = setInterval(() => setIndex((i) => (i + 1) % ads.length), 5000);
    return () => clearInterval(t);
  }, [dismissed, ads.length]);

  // Hide on dashboard/admin/auth routes
  const hide = /^\/(dashboard|admin|auth|reset-password)/.test(location.pathname);
  if (hide || dismissed || ads.length === 0) return null;

  const ad = ads[index];

  return (
    <div className="fixed bottom-16 lg:bottom-4 left-1/2 -translate-x-1/2 z-40 w-[95%] max-w-2xl pointer-events-auto">
      <div className="flex items-center gap-3 bg-card/95 backdrop-blur border shadow-2xl rounded-full pl-3 pr-2 py-2 animate-fade-in">
        <Sparkles className="w-4 h-4 text-primary shrink-0" />
        <img
          src={getFaviconUrl(ad.url, 64)}
          alt=""
          className="w-7 h-7 rounded-full bg-muted p-0.5 border shrink-0"
          onError={(e) => { (e.target as HTMLImageElement).src = '/placeholder.svg'; }}
        />
        <div className="flex-1 min-w-0 text-xs sm:text-sm">
          <span className="text-muted-foreground hidden sm:inline">{ad.tag}: </span>
          <span className="font-semibold">{ad.platform}</span>
          <span className="text-muted-foreground hidden md:inline"> · {getDomainHost(ad.url)}</span>
        </div>
        {ad.href ? (
          <Button asChild size="sm" variant="default" className="h-7 rounded-full text-xs">
            <Link to={ad.href}>View</Link>
          </Button>
        ) : (
          <Button
            size="sm"
            className="h-7 rounded-full text-xs"
            onClick={() => window.open(ad.url, '_blank', 'noopener,noreferrer')}
          >
            <ExternalLink className="w-3 h-3 mr-1" />Visit
          </Button>
        )}
        <button
          onClick={() => setDismissed(true)}
          className="text-muted-foreground hover:text-foreground p-1"
          aria-label="Dismiss"
        >
          <X className="w-3 h-3" />
        </button>
      </div>
    </div>
  );
};

export default SitewidePartnerAds;
