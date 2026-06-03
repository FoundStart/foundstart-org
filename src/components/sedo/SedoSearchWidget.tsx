import { useEffect, useRef, useState } from 'react';

interface SedoSearchWidgetProps {
  campaignId?: string;
  locale?: 'en-us' | 'en-gb' | 'de-de' | 'es-es' | 'fr-fr' | 'pt-br' | 'zh-cn';
  className?: string;
  /** Show small on-page status indicator (script loaded / widget rendered / error). */
  debug?: boolean;
}

declare global {
  interface Window {
    _sedoq?: { campaignId?: string; locale?: string };
  }
}

const SCRIPT_SRC = 'https://sedo.com/c7r/assets/static/libs/sedo/widget.search.get.js';
const SEDO_FALLBACK_LINK = 'https://sedo.com/?language=us&campaignId=336206';

type Status = 'loading' | 'loaded' | 'rendered' | 'error';

const SedoSearchWidget = ({
  campaignId = '336206',
  locale = 'en-us',
  className,
  debug = false,
}: SedoSearchWidgetProps) => {
  const mountedRef = useRef(false);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [status, setStatus] = useState<Status>('loading');

  useEffect(() => {
    if (mountedRef.current) return;
    mountedRef.current = true;

    window._sedoq = window._sedoq || {};
    window._sedoq.campaignId = campaignId;
    window._sedoq.locale = locale;

    let scriptEl = document.querySelector<HTMLScriptElement>(`script[src="${SCRIPT_SRC}"]`);
    if (!scriptEl) {
      scriptEl = document.createElement('script');
      scriptEl.type = 'text/javascript';
      scriptEl.async = true;
      scriptEl.src = SCRIPT_SRC;
      scriptEl.onload = () => setStatus('loaded');
      scriptEl.onerror = () => setStatus('error');
      document.head.appendChild(scriptEl);
    } else {
      setStatus('loaded');
    }

    // Poll for rendered widget content
    const start = Date.now();
    const interval = window.setInterval(() => {
      const el = containerRef.current;
      if (el && el.children.length > 0 && el.innerHTML.trim().length > 0) {
        setStatus('rendered');
        window.clearInterval(interval);
      } else if (Date.now() - start > 6000) {
        setStatus(prev => (prev === 'rendered' ? prev : 'error'));
        window.clearInterval(interval);
      }
    }, 400);

    return () => window.clearInterval(interval);
  }, [campaignId, locale]);

  return (
    <div className={className}>
      <div ref={containerRef} id="sedo-widget-search" className="min-h-[48px]" />

      {status === 'error' && (
        <div className="mt-3 text-center">
          <a
            href={SEDO_FALLBACK_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors"
          >
            Search Premium Domains on Sedo →
          </a>
        </div>
      )}

      {debug && (
        <div className="mt-2 text-xs px-3 py-2 rounded border border-dashed border-muted-foreground/40 bg-muted/30 text-muted-foreground">
          <strong>Sedo widget debug:</strong>{' '}
          {status === 'loading' && <span>Loading script…</span>}
          {status === 'loaded' && <span className="text-amber-600">Script loaded, waiting for widget render…</span>}
          {status === 'rendered' && <span className="text-emerald-600">✓ Widget rendered</span>}
          {status === 'error' && (
            <span className="text-red-600">
              ✗ Script blocked or failed to render (likely an ad blocker). Fallback link shown above.
            </span>
          )}
        </div>
      )}
    </div>
  );
};

export default SedoSearchWidget;
