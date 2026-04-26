import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Upload, Trash2, Undo2, AlertCircle, Pencil } from 'lucide-react';
import {
  parseDomainList,
  parsePriceUpdates,
  applyPriceUpdates,
  loadBulkDomains,
  saveBulkDomains,
  undoBulkDomains,
  canUndoBulk,
  dedupKey,
  type ParseError,
} from '@/utils/domainNormalization';
import { useToast } from '@/hooks/use-toast';

interface BulkDomainImportProps {
  onImport: () => void;
}

const BulkDomainImport: React.FC<BulkDomainImportProps> = ({ onImport }) => {
  const [open, setOpen] = useState(false);
  const [text, setText] = useState('');
  const [editText, setEditText] = useState('');
  const [errors, setErrors] = useState<ParseError[]>([]);
  const [mode, setMode] = useState<'add' | 'edit'>('add');
  const { toast } = useToast();
  const existing = loadBulkDomains();
  const undoAvailable = canUndoBulk();

  const handleImport = () => {
    const { domains: parsed, errors: parseErrors } = parseDomainList(text);
    setErrors(parseErrors);

    if (parsed.length === 0) {
      toast({
        title: 'No valid domains',
        description: parseErrors.length
          ? `${parseErrors.length} line(s) had errors — see details below.`
          : 'Use lines like: name.com, Hosting, Category, Price',
        variant: 'destructive',
      });
      return;
    }

    const seen = new Set(existing.map(d => dedupKey(d.name, d.hosting)));
    const merged = [...existing];
    let added = 0;
    let dupes = 0;
    for (const d of parsed) {
      const k = dedupKey(d.name, d.hosting);
      if (seen.has(k)) { dupes++; continue; }
      merged.push(d);
      seen.add(k);
      added++;
    }
    saveBulkDomains(merged);
    toast({
      title: 'Import complete',
      description: `Added ${added} • ${dupes} duplicate(s) skipped • ${parseErrors.length} error(s).`,
    });
    setText('');
    if (parseErrors.length === 0) setOpen(false);
    onImport();
  };

  const handleEditPrices = () => {
    const { updates, errors: parseErrors } = parsePriceUpdates(editText);
    setErrors(parseErrors);
    if (updates.size === 0) {
      toast({
        title: 'No price updates',
        description: 'Format: domain.com, NewPrice (one per line)',
        variant: 'destructive',
      });
      return;
    }
    const { next, updated, missing } = applyPriceUpdates(existing, updates);
    saveBulkDomains(next);
    toast({
      title: 'Prices updated',
      description: `${updated} updated • ${missing.length} not found in your bulk list.`,
    });
    setEditText('');
    if (parseErrors.length === 0 && missing.length === 0) setOpen(false);
    onImport();
  };

  const handleUndo = () => {
    const restored = undoBulkDomains();
    if (restored === null) {
      toast({ title: 'Nothing to undo', variant: 'destructive' });
      return;
    }
    toast({ title: 'Reverted', description: `Restored previous state (${restored.length} domain(s)).` });
    onImport();
  };

  const handleClear = () => {
    saveBulkDomains([]);
    toast({ title: 'Cleared', description: 'Imported domains removed (undo available).' });
    onImport();
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2">
          <Upload className="w-4 h-4" /> Bulk Import {existing.length > 0 && `(${existing.length})`}
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Bulk Domain Manager</DialogTitle>
          <DialogDescription>
            Add new domains, update prices in bulk, or undo your last change.
          </DialogDescription>
        </DialogHeader>

        <Tabs value={mode} onValueChange={(v) => { setMode(v as 'add' | 'edit'); setErrors([]); }}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="add"><Upload className="w-4 h-4 mr-1" /> Add</TabsTrigger>
            <TabsTrigger value="edit"><Pencil className="w-4 h-4 mr-1" /> Edit Prices</TabsTrigger>
          </TabsList>

          <TabsContent value="add" className="space-y-3">
            <p className="text-xs text-muted-foreground">
              Format: <code className="bg-muted px-1 rounded">name.com, Hosting, Category, Price</code>.
              Hosting variations (UD/Unstoppable, GoDaddy/Godaddy, etc.) are normalized automatically.
              Duplicates are detected by name + hosting.
            </p>
            <Textarea
              rows={10}
              placeholder={`example1.com, UD, Fintech, $1200\nexample2.com | Spaceship | E-Commerce\nexample3.com\tGodaddy\tSaaS`}
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="font-mono text-sm"
            />
          </TabsContent>

          <TabsContent value="edit" className="space-y-3">
            <p className="text-xs text-muted-foreground">
              Update premium prices for domains already in your bulk list.
              Format: <code className="bg-muted px-1 rounded">domain.com, NewPrice</code>
            </p>
            <Textarea
              rows={10}
              placeholder={`example1.com, $1500\nexample2.com, $899`}
              value={editText}
              onChange={(e) => setEditText(e.target.value)}
              className="font-mono text-sm"
            />
          </TabsContent>
        </Tabs>

        {errors.length > 0 && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              <div className="font-semibold mb-1">{errors.length} line(s) had problems:</div>
              <ul className="text-xs space-y-1 max-h-32 overflow-y-auto">
                {errors.slice(0, 8).map((e, i) => (
                  <li key={i}>
                    <span className="font-mono">L{e.line}:</span> {e.reason}
                  </li>
                ))}
                {errors.length > 8 && <li>...and {errors.length - 8} more</li>}
              </ul>
            </AlertDescription>
          </Alert>
        )}

        <DialogFooter className="gap-2 sm:gap-2 flex-wrap">
          {undoAvailable && (
            <Button variant="ghost" onClick={handleUndo} className="gap-1">
              <Undo2 className="w-4 h-4" /> Undo last
            </Button>
          )}
          {existing.length > 0 && (
            <Button variant="ghost" onClick={handleClear} className="text-destructive">
              <Trash2 className="w-4 h-4 mr-1" /> Clear all
            </Button>
          )}
          <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
          {mode === 'add'
            ? <Button onClick={handleImport}>Import & Normalize</Button>
            : <Button onClick={handleEditPrices}>Apply Prices</Button>}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default BulkDomainImport;
