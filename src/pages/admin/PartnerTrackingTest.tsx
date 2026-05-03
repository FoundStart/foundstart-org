import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Download, MousePointerClick, Beaker, RefreshCw } from 'lucide-react';
import {
  trackPartnerClick,
  getPartnerClicksAsync,
  exportClicksToCSV,
  downloadCSV,
  filterClicksByMonth,
  setDedupeMode,
  getDedupeMode,
  PartnerClickRecord,
} from '@/utils/partnerClickTracking';

const SAMPLE = {
  partnerId: 'foundstart',
  partnerName: 'FoundStart',
  category: 'formation',
  url: 'https://shortet.com/foundstart',
  blogSlug: 'partner-test-page',
  locale: 'en',
};

const PartnerTrackingTest: React.FC = () => {
  const [records, setRecords] = useState<PartnerClickRecord[]>([]);
  const [dedupe, setDedupe] = useState<boolean>(false);
  const [loading, setLoading] = useState(false);

  const refresh = async () => {
    setLoading(true);
    const all = await getPartnerClicksAsync();
    setRecords(all);
    setLoading(false);
  };

  useEffect(() => {
    setDedupe(getDedupeMode());
    void refresh();
  }, []);

  const handleSampleClick = () => {
    trackPartnerClick(SAMPLE);
    void refresh();
  };

  const handleToggleDedupe = (v: boolean) => {
    setDedupe(v);
    setDedupeMode(v);
  };

  const handleExportThisMonth = () => {
    const now = new Date();
    const month = filterClicksByMonth(records, now.getFullYear(), now.getMonth() + 1);
    const csv = exportClicksToCSV(month);
    downloadCSV(
      `partner-clicks-test-${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}.csv`,
      csv,
    );
  };

  return (
    <div className="container mx-auto max-w-3xl py-12 px-4 space-y-6">
      <div>
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <Beaker className="w-6 h-6" /> Partner Click Tracking — Test Page
        </h1>
        <p className="text-muted-foreground text-sm">
          Trigger a sample partner click and immediately download the resulting monthly CSV
          to verify the end-to-end pipeline (IndexedDB + localStorage + dedupe).
        </p>
      </div>

      <Alert>
        <AlertDescription className="text-xs">
          Sample click → partner <code>{SAMPLE.partnerId}</code> · blog{' '}
          <code>{SAMPLE.blogSlug}</code> · category <code>{SAMPLE.category}</code>.
          With dedupe ON, only the first click per session per (blog + partner) is recorded.
        </AlertDescription>
      </Alert>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MousePointerClick className="w-5 h-5" /> Controls
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-wrap items-center gap-3">
            <Button onClick={handleSampleClick}>Trigger sample partner click</Button>
            <Button variant="outline" onClick={() => void refresh()}>
              <RefreshCw className="w-4 h-4 me-2" /> Refresh
            </Button>
            <Button variant="outline" onClick={handleExportThisMonth} disabled={records.length === 0}>
              <Download className="w-4 h-4 me-2" /> Export this month CSV
            </Button>
          </div>

          <div className="flex items-center gap-3">
            <Switch checked={dedupe} onCheckedChange={handleToggleDedupe} id="dedupe" />
            <label htmlFor="dedupe" className="text-sm">
              Session dedupe (first click per partner per blog only)
            </label>
            <Badge variant={dedupe ? 'default' : 'outline'}>{dedupe ? 'ON' : 'OFF'}</Badge>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Stored records ({records.length})</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <p className="text-sm text-muted-foreground">Loading…</p>
          ) : records.length === 0 ? (
            <p className="text-sm text-muted-foreground">No records yet — click the button above.</p>
          ) : (
            <div className="max-h-80 overflow-y-auto text-xs font-mono space-y-1">
              {records.slice(-50).reverse().map((r, i) => (
                <div key={i} className="border-b py-1 flex justify-between gap-2">
                  <span>{new Date(r.ts).toLocaleString()}</span>
                  <span>{r.partnerName}</span>
                  <span className="text-muted-foreground">{r.blogSlug}</span>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default PartnerTrackingTest;
