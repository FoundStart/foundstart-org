import React, { useMemo, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from '@/components/ui/select';
import { Download, Trash2, MousePointerClick, AlertTriangle } from 'lucide-react';
import {
  getPartnerClicks,
  filterClicksByMonth,
  exportClicksToCSV,
  downloadCSV,
  clearPartnerClicks,
} from '@/utils/partnerClickTracking';
import {
  blogPartnerCatalogs,
  validateCatalog,
  PARTNER_CATEGORIES,
} from '@/data/blogPartnersConfig';
import { Alert, AlertDescription } from '@/components/ui/alert';

const monthNames = [
  'January','February','March','April','May','June',
  'July','August','September','October','November','December',
];

const BlogPartnerAnalytics: React.FC = () => {
  const now = new Date();
  const [year, setYear] = useState<number>(now.getFullYear());
  const [month, setMonth] = useState<number>(now.getMonth() + 1);
  const [refreshKey, setRefreshKey] = useState(0);

  const allClicks = useMemo(() => getPartnerClicks(), [refreshKey]);
  const monthClicks = useMemo(
    () => filterClicksByMonth(allClicks, year, month),
    [allClicks, year, month],
  );

  const totals = useMemo(() => {
    const byPartner = new Map<string, number>();
    const byCategory = new Map<string, number>();
    for (const c of monthClicks) {
      byPartner.set(c.partnerName, (byPartner.get(c.partnerName) ?? 0) + 1);
      byCategory.set(c.category, (byCategory.get(c.category) ?? 0) + 1);
    }
    return {
      total: monthClicks.length,
      byPartner: [...byPartner.entries()].sort((a, b) => b[1] - a[1]),
      byCategory: [...byCategory.entries()].sort((a, b) => b[1] - a[1]),
    };
  }, [monthClicks]);

  const validationWarnings = useMemo(() => {
    const all: string[] = [];
    for (const [locale, catalog] of Object.entries(blogPartnerCatalogs)) {
      for (const w of validateCatalog(catalog)) all.push(`[${locale.toUpperCase()}] ${w}`);
    }
    return all;
  }, []);

  const handleExport = () => {
    const csv = exportClicksToCSV(monthClicks);
    const filename = `blog-partner-clicks-${year}-${String(month).padStart(2, '0')}.csv`;
    downloadCSV(filename, csv);
  };

  const handleClear = () => {
    if (confirm('Clear all locally tracked partner clicks?')) {
      clearPartnerClicks();
      setRefreshKey((k) => k + 1);
    }
  };

  const years = Array.from({ length: 4 }, (_, i) => now.getFullYear() - i);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Blog Partner Analytics</h1>
        <p className="text-muted-foreground text-sm">
          Click tracking for partner CTA cards across blog pages, with monthly CSV export.
        </p>
      </div>

      {validationWarnings.length > 0 && (
        <Alert variant="destructive">
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>
            <strong>{validationWarnings.length}</strong> partner classification warning(s) detected:
            <ul className="mt-2 list-disc ms-5 text-xs space-y-1">
              {validationWarnings.slice(0, 10).map((w, i) => <li key={i}>{w}</li>)}
            </ul>
          </AlertDescription>
        </Alert>
      )}

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MousePointerClick className="w-5 h-5" /> Monthly Export
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-wrap items-end gap-3">
            <div>
              <label className="text-xs text-muted-foreground block mb-1">Year</label>
              <Select value={String(year)} onValueChange={(v) => setYear(parseInt(v, 10))}>
                <SelectTrigger className="w-[120px]"><SelectValue /></SelectTrigger>
                <SelectContent>
                  {years.map((y) => <SelectItem key={y} value={String(y)}>{y}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-xs text-muted-foreground block mb-1">Month</label>
              <Select value={String(month)} onValueChange={(v) => setMonth(parseInt(v, 10))}>
                <SelectTrigger className="w-[160px]"><SelectValue /></SelectTrigger>
                <SelectContent>
                  {monthNames.map((m, i) => (
                    <SelectItem key={m} value={String(i + 1)}>{m}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <Button onClick={handleExport} disabled={monthClicks.length === 0}>
              <Download className="w-4 h-4 me-2" />
              Export CSV ({monthClicks.length})
            </Button>
            <Button variant="outline" onClick={handleClear}>
              <Trash2 className="w-4 h-4 me-2" /> Clear all
            </Button>
          </div>

          <div className="grid md:grid-cols-2 gap-4 pt-2">
            <div>
              <h4 className="text-sm font-semibold mb-2">Top Partners — {monthNames[month - 1]} {year}</h4>
              {totals.byPartner.length === 0 ? (
                <p className="text-sm text-muted-foreground">No clicks recorded for this month.</p>
              ) : (
                <ul className="space-y-1 text-sm">
                  {totals.byPartner.slice(0, 10).map(([name, count]) => (
                    <li key={name} className="flex justify-between border-b py-1">
                      <span>{name}</span>
                      <Badge variant="secondary">{count}</Badge>
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <div>
              <h4 className="text-sm font-semibold mb-2">By Category</h4>
              {totals.byCategory.length === 0 ? (
                <p className="text-sm text-muted-foreground">No data.</p>
              ) : (
                <ul className="space-y-1 text-sm">
                  {totals.byCategory.map(([cat, count]) => (
                    <li key={cat} className="flex justify-between border-b py-1">
                      <span className="capitalize">{cat}</span>
                      <Badge variant="secondary">{count}</Badge>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Catalog Coverage</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {Object.entries(blogPartnerCatalogs).map(([locale, catalog]) => (
              <div key={locale} className="border rounded-md p-3">
                <h4 className="font-medium mb-2 uppercase text-xs">{locale}</h4>
                {PARTNER_CATEGORIES.map((cat) => {
                  const items = catalog[cat] ?? [];
                  const partnered = items.filter((p) => p.partnered).length;
                  return (
                    <div key={cat} className="flex justify-between text-xs py-0.5">
                      <span className="capitalize text-muted-foreground">{cat}</span>
                      <span>{partnered}/{items.length}</span>
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
          <p className="text-xs text-muted-foreground mt-3">
            Format: partnered / total entries per category.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default BlogPartnerAnalytics;
