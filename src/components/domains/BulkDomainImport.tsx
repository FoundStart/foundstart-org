import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Upload, Trash2 } from 'lucide-react';
import { parseDomainList, loadBulkDomains, saveBulkDomains } from '@/utils/domainNormalization';
import { useToast } from '@/hooks/use-toast';

interface BulkDomainImportProps {
  onImport: () => void;
}

const BulkDomainImport: React.FC<BulkDomainImportProps> = ({ onImport }) => {
  const [open, setOpen] = useState(false);
  const [text, setText] = useState('');
  const { toast } = useToast();
  const existing = loadBulkDomains();

  const handleImport = () => {
    const parsed = parseDomainList(text);
    if (parsed.length === 0) {
      toast({ title: 'No domains parsed', description: 'Use lines like: name.com, Hosting, Category', variant: 'destructive' });
      return;
    }
    const seen = new Set(existing.map(d => d.name.toLowerCase()));
    const merged = [...existing];
    let added = 0;
    for (const d of parsed) {
      if (!seen.has(d.name.toLowerCase())) {
        merged.push(d);
        seen.add(d.name.toLowerCase());
        added++;
      }
    }
    saveBulkDomains(merged);
    toast({ title: 'Import complete', description: `Added ${added} new domain(s). ${parsed.length - added} duplicates skipped.` });
    setText('');
    setOpen(false);
    onImport();
  };

  const handleClear = () => {
    saveBulkDomains([]);
    toast({ title: 'Cleared', description: 'Imported domains removed.' });
    onImport();
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2">
          <Upload className="w-4 h-4" /> Bulk Import {existing.length > 0 && `(${existing.length})`}
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Bulk Import Premium Domains</DialogTitle>
          <DialogDescription>
            Paste one domain per line. Format: <code className="bg-muted px-1 rounded">name.com, Hosting, Category</code>.
            Hosting variations (UD/Unstoppable, GoDaddy/Godaddy, etc.) are normalized automatically.
          </DialogDescription>
        </DialogHeader>
        <Textarea
          rows={12}
          placeholder={`example1.com, UD, Fintech\nexample2.com | Spaceship | E-Commerce\nexample3.com\tGodaddy\tSaaS`}
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="font-mono text-sm"
        />
        <DialogFooter className="gap-2 sm:gap-2">
          {existing.length > 0 && (
            <Button variant="ghost" onClick={handleClear} className="text-destructive">
              <Trash2 className="w-4 h-4 mr-1" /> Clear imported
            </Button>
          )}
          <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
          <Button onClick={handleImport}>Import & Normalize</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default BulkDomainImport;
