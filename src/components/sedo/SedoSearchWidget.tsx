import { useEffect, useRef } from 'react';

interface SedoSearchWidgetProps {
  campaignId?: string;
  locale?: 'en-us' | 'en-gb' | 'de-de' | 'es-es' | 'fr-fr' | 'pt-br' | 'zh-cn';
  className?: string;
}

declare global {
  interface Window {
    _sedoq?: { campaignId?: string; locale?: string };
  }
}

const SCRIPT_SRC = 'https://sedo.com/c7r/assets/static/libs/sedo/widget.search.get.js';

const SedoSearchWidget = ({
  campaignId = '336206',
  locale = 'en-us',
  className,
}: SedoSearchWidgetProps) => {
  const mountedRef = useRef(false);

  useEffect(() => {
    if (mountedRef.current) return;
    mountedRef.current = true;

    window._sedoq = window._sedoq || {};
    window._sedoq.campaignId = campaignId;
    window._sedoq.locale = locale;

    if (!document.querySelector(`script[src="${SCRIPT_SRC}"]`)) {
      const s = document.createElement('script');
      s.type = 'text/javascript';
      s.async = true;
      s.src = SCRIPT_SRC;
      document.head.appendChild(s);
    }
  }, [campaignId, locale]);

  return (
    <div className={className}>
      <div id="sedo-widget-search" />
    </div>
  );
};

export default SedoSearchWidget;
