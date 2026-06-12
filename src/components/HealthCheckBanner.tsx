import { useEffect, useState } from 'react';
import { AlertTriangle, X, Settings as SettingsIcon } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

/**
 * Lightweight startup health check.
 * Detects missing client-side env config and shows a non-blocking banner.
 * The app remains fully usable in fallback mode.
 */
const REQUIRED_ENV = ['VITE_SUPABASE_URL', 'VITE_SUPABASE_PUBLISHABLE_KEY'] as const;

const HealthCheckBanner = () => {
  const [missing, setMissing] = useState<string[]>([]);
  const [dismissed, setDismissed] = useState(() =>
    typeof sessionStorage !== 'undefined' && sessionStorage.getItem('fs:health-dismissed') === '1',
  );

  useEffect(() => {
    const env = import.meta.env as Record<string, string | undefined>;
    const out = REQUIRED_ENV.filter((k) => !env[k] || env[k] === '');
    setMissing(out);
    if (out.length > 0) {
      // eslint-disable-next-line no-console
      console.warn('[HealthCheck] Missing env vars (running in fallback mode):', out);
    }
  }, []);

  if (dismissed || missing.length === 0) return null;

  return (
    <div className="bg-amber-500/10 border-b border-amber-500/30 text-amber-200 px-4 py-2 text-xs flex items-center justify-between gap-3">
      <div className="flex items-center gap-2 min-w-0">
        <AlertTriangle className="w-4 h-4 shrink-0" />
        <span className="truncate">
          Running in fallback mode — missing config: <code className="font-mono">{missing.join(', ')}</code>
        </span>
      </div>
      <div className="flex items-center gap-2 shrink-0">
        <Button asChild size="sm" variant="outline" className="h-7 text-xs">
          <Link to="/settings/integrations">
            <SettingsIcon className="w-3 h-3 mr-1" />Settings
          </Link>
        </Button>
        <button
          onClick={() => { sessionStorage.setItem('fs:health-dismissed', '1'); setDismissed(true); }}
          className="p-1 hover:text-amber-100"
          aria-label="Dismiss"
        >
          <X className="w-3 h-3" />
        </button>
      </div>
    </div>
  );
};

export default HealthCheckBanner;