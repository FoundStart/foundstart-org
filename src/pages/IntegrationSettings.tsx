import { useEffect, useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PageHero from '@/components/PageHero';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import {
  getIntegrationSettings, setIntegration,
  type IntegrationSettings, type IntegrationKey,
} from '@/utils/integrationSettings';

const ITEMS: { key: IntegrationKey; name: string; description: string }[] = [
  { key: 'resend', name: 'Resend (Email)', description: 'Transactional email. Off = mock mode (logs to console).' },
  { key: 'kashier', name: 'Kashier (Payments)', description: 'Primary payment gateway. Off = mock checkout.' },
  { key: 'stripe', name: 'Stripe (Payments)', description: 'Secondary checkout. Off = mock checkout.' },
  { key: 'partnerAds', name: 'Partner Banners & Pop Ads', description: 'Hide all partner ads sitewide.' },
  { key: 'aiAssistant', name: 'Lovable AI Assistant', description: 'Disable AI chat / generation features.' },
];

const IntegrationSettingsPage = () => {
  const [settings, setSettings] = useState<IntegrationSettings>(getIntegrationSettings());

  useEffect(() => {
    const onChange = (e: Event) => setSettings((e as CustomEvent<IntegrationSettings>).detail);
    window.addEventListener('fs:integration-change', onChange as EventListener);
    return () => window.removeEventListener('fs:integration-change', onChange as EventListener);
  }, []);

  const toggle = (key: IntegrationKey, v: boolean) => {
    setIntegration(key, v);
    setSettings(getIntegrationSettings());
  };

  return (
    <div className="min-h-screen bg-background w-full max-w-full overflow-x-hidden">
      <Header />
      <PageHero
        title="Integration"
        highlight="Settings"
        subtitle="Toggle external integrations on or off for development & testing. Off = mock mode."
      />
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 max-w-3xl">
        <Card>
          <CardHeader>
            <CardTitle>External Integrations</CardTitle>
            <CardDescription>
              These toggles are stored locally in your browser. They override live API calls so you can run
              the app without API keys configured.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {ITEMS.map((it) => (
              <div key={it.key} className="flex items-start justify-between gap-4 pb-4 border-b last:border-b-0">
                <div className="space-y-1">
                  <Label htmlFor={it.key} className="text-base flex items-center gap-2">
                    {it.name}
                    <Badge variant={settings[it.key] ? 'default' : 'secondary'}>
                      {settings[it.key] ? 'Live' : 'Mock'}
                    </Badge>
                  </Label>
                  <p className="text-sm text-muted-foreground">{it.description}</p>
                </div>
                <Switch
                  id={it.key}
                  checked={settings[it.key]}
                  onCheckedChange={(v) => toggle(it.key, v)}
                />
              </div>
            ))}
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  );
};

export default IntegrationSettingsPage;