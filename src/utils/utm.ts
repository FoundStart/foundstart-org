/**
 * Append UTM params to outbound partner/blog CTA URLs so analytics can
 * attribute traffic by source (popup vs banner vs blog), medium and campaign.
 * Safe for relative paths and already-tagged URLs (won't double-tag).
 */
export interface UtmParams {
  source: string;   // e.g. "popup", "banner", "blog"
  medium: string;   // e.g. "mobile", "desktop", "inline"
  campaign: string; // e.g. "home-single", "country-USA", "business-automation-2026"
  content?: string; // partner platform name
  term?: string;
}

export function withUtm(rawUrl: string, utm: UtmParams): string {
  if (!rawUrl) return rawUrl;
  // Skip in-app routes & anchors
  if (rawUrl.startsWith('/') || rawUrl.startsWith('#')) return rawUrl;
  try {
    const hasProto = /^https?:\/\//i.test(rawUrl);
    const u = new URL(hasProto ? rawUrl : `https://${rawUrl}`);
    if (!u.searchParams.has('utm_source')) u.searchParams.set('utm_source', `foundstart_${utm.source}`);
    if (!u.searchParams.has('utm_medium')) u.searchParams.set('utm_medium', utm.medium);
    if (!u.searchParams.has('utm_campaign')) u.searchParams.set('utm_campaign', utm.campaign);
    if (utm.content && !u.searchParams.has('utm_content')) u.searchParams.set('utm_content', utm.content);
    if (utm.term && !u.searchParams.has('utm_term')) u.searchParams.set('utm_term', utm.term);
    return u.toString();
  } catch {
    return rawUrl;
  }
}

/** Fire a GA4 event via window.gtag if available. No-op otherwise. */
export function ga4(event: string, params: Record<string, unknown>): void {
  if (typeof window === 'undefined') return;
  // @ts-expect-error gtag is provided by GA snippet at runtime
  const gtag: undefined | ((...a: unknown[]) => void) = window.gtag;
  if (typeof gtag === 'function') gtag('event', event, params);
}