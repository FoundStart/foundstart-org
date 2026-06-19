import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { withUtm, ga4 } from '@/utils/utm';
import { trackAdEvent } from '@/utils/adTracking';

/**
 * Sitewide outbound-link UTM tagger.
 *
 * Mounted once at the app root. Listens for clicks on any anchor pointing
 * to a partner domain and rewrites the href just-in-time with UTM params so
 * every blog and partner CTA carries consistent attribution — without
 * having to edit every existing component.
 *
 * It also fires GA4 `select_ad` so popup/banner clicks share the same
 * event taxonomy as inline CTAs.
 */
const PARTNER_HOSTS = [
  'shortet.com', 'foundstart.org', 'nuelink.com', 'gohighlevel.com',
  'ocoya.com', 'cloudcampaign.com', 'chatbase.co', 'make.com', 'akool.com',
  'doola.com', 'clemta.com', 'firstbase.io', '1office.co', 'tailorbrands.com',
  'shipfa.st', 'lexilexi.ai', 'markifact.com', 'mindpal.co', 'systeme.io',
  'gumloop.com', 'n8n.io', 'zapier.com', 'workato.com', 'uipath.com',
  'powerautomate.com', 'automationanywhere.com', 'pipedream.com', 'tray.ai',
  'sim.ai', 'empler.ai', 'relevanceai.com', 'flowiseai.com', 'scispace.com',
  'ottokit.com', 'albato.com', 'relay.app', 'axiom.ai', 'wiza.co',
  'phantombuster.com', 'flocksocial.com', 'repurpose.io', 'postiz.com',
  'postplanner.com', 'blotato.com', 'typefully.com', 'novamira.com',
];

const isPartnerHost = (host: string) =>
  PARTNER_HOSTS.some((h) => host === h || host.endsWith(`.${h}`));

const slugifyCampaign = (path: string): string => {
  if (path === '/') return 'home';
  return path.replace(/^\/+/, '').replace(/\/+$/, '').replace(/\//g, '-').slice(0, 80) || 'home';
};

const inferSource = (path: string): string => {
  if (path.startsWith('/blog')) return 'blog';
  if (path.startsWith('/countries') || path.startsWith('/company-formation-bio')) return 'country';
  if (path.startsWith('/digital-partners')) return 'digital_partner';
  if (path.startsWith('/freelancer-partners')) return 'freelancer';
  if (path.startsWith('/sister-partners')) return 'sister';
  if (path.startsWith('/domains')) return 'domain';
  return 'site';
};

const OutboundUtmTagger: React.FC = () => {
  const location = useLocation();

  useEffect(() => {
    const isMobile = window.matchMedia('(max-width: 768px)').matches;
    const device: 'mobile' | 'desktop' = isMobile ? 'mobile' : 'desktop';
    const source = inferSource(location.pathname);
    const campaign = slugifyCampaign(location.pathname);

    const onClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      const a = target?.closest?.('a') as HTMLAnchorElement | null;
      if (!a) return;
      const href = a.getAttribute('href');
      if (!href || href.startsWith('#') || href.startsWith('/')) return;
      let url: URL;
      try { url = new URL(href, window.location.href); } catch { return; }
      if (url.origin === window.location.origin) return;
      if (!isPartnerHost(url.hostname.toLowerCase())) return;

      // Already tagged? leave it alone.
      if (url.searchParams.has('utm_source')) return;

      const partner = (a.textContent || a.getAttribute('aria-label') || url.hostname).trim().slice(0, 80);
      const tagged = withUtm(url.toString(), {
        source, medium: device, campaign, content: partner,
      });
      a.setAttribute('href', tagged);

      // Mirror the popup/banner GA4 taxonomy for inline CTAs.
      ga4('select_ad', {
        ad_surface: 'inline', ad_campaign: campaign, ad_partner: partner,
        ad_variant: 'a', device, link_url: tagged,
      });
      trackAdEvent({
        surface: 'banner', event: 'click', campaign: `inline:${campaign}`,
        partner, variant: 'a', href: tagged, device,
      });
    };

    document.addEventListener('click', onClick, true);
    return () => document.removeEventListener('click', onClick, true);
  }, [location.pathname]);

  return null;
};

export default OutboundUtmTagger;