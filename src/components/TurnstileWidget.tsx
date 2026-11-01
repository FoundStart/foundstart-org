import { useEffect, useRef } from 'react';

declare global {
  interface Window {
    turnstile?: {
      render: (el: HTMLElement, opts: { sitekey: string; action?: string; callback: (t: string) => void; 'expired-callback'?: () => void; 'error-callback'?: () => void }) => void;
    };
  }
}

// Cloudflare Turnstile widget. Renders only when VITE_TURNSTILE_SITE_KEY is configured;
// the server verifies the token and fails closed when its secret is not configured,
// so a missing sitekey means submissions are rejected rather than silently unprotected.
const TurnstileWidget = ({ onToken, action }: { onToken: (t: string | null) => void; action: string }) => {
  const ref = useRef<HTMLDivElement>(null);
  const sitekey = (import.meta.env.VITE_TURNSTILE_SITE_KEY as string | undefined) || undefined;

  useEffect(() => {
    if (!sitekey || !ref.current) return;
    const render = () => {
      if (ref.current && window.turnstile) {
        window.turnstile.render(ref.current, { sitekey, action, callback: onToken, 'expired-callback': () => onToken(null), 'error-callback': () => onToken(null) });
      }
    };
    if (window.turnstile) { render(); return; }
    // Two widgets on one page (quiz form + footer newsletter) must share one
    // api.js load: appending a second script tag races and the second widget
    // never executes, leaving its submit disabled.
    const existing = document.querySelector('script[data-turnstile-api]');
    if (existing) {
      existing.addEventListener('load', render, { once: true });
      existing.addEventListener('error', () => onToken(null), { once: true });
      if (window.turnstile) render();
      return;
    }
    const s = document.createElement('script');
    s.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit';
    s.async = true;
    s.dataset.turnstileApi = '1';
    s.onload = render;
    s.onerror = () => onToken(null);
    document.head.appendChild(s);
  }, [sitekey, onToken, action]);

  if (!sitekey) return null;
  return <div ref={ref} className="my-2" />;
};

export default TurnstileWidget;
