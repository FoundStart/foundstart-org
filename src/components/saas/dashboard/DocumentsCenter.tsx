import { useEffect, useRef } from 'react';
import { useAuth } from '@/contexts/AuthProvider';
import { useToast } from '@/hooks/use-toast';
import { useL } from '@/hooks/useL';
import { supabase } from '@/integrations/supabase/client';
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  FileText,
  Download,
  Eye,
  Trash2,
  MoreVertical,
  Search,
  Upload,
  Folder,
  File,
  Bot,
} from 'lucide-react';

type Doc = { id: string; name: string; type: string; company: string | null; createdAt: string; size: string; isAiGenerated: boolean; bytes: number };

const categoriesBase = [
  { id: 'all', name: 'All Documents', icon: Folder },
  { id: 'legal', name: 'Legal', icon: FileText },
  { id: 'tax', name: 'Tax', icon: File },
  { id: 'marketing', name: 'Marketing', icon: File },
];

const DocumentsCenter = () => {
  const L = useL();
  const categories = categoriesBase.map(c => ({ ...c, name: L(c.name, ({ all: 'كل المستندات', legal: 'قانونية', tax: 'ضريبية', marketing: 'تسويقية' } as Record<string,string>)[c.id]) }));
  const [documents, setDocuments] = useState<Doc[]>([]);
  const { user } = useAuth();
  const { toast } = useToast();
  const fileRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [reloadKey, setReloadKey] = useState(0);
  useEffect(() => {
    (supabase as any).from('documents').select('id, name, file_url, document_type, file_size, is_ai_generated, created_at').order('created_at', { ascending: false })
      .then(({ data }: any) => setDocuments((data ?? []).map((d: any) => ({
        id: d.id, name: d.name, fileUrl: d.file_url, type: d.document_type, company: null,
        createdAt: d.created_at ? new Date(d.created_at).toLocaleDateString() : '-',
        size: d.file_size ? `${Math.max(1, Math.round(d.file_size / 1024))} KB` : '-',
        isAiGenerated: !!d.is_ai_generated, bytes: Number(d.file_size) || 0,
      }))));
  }, [reloadKey]);

  const signedUrl = async (path: string) => {
    const { data } = await supabase.storage.from('documents').createSignedUrl(path, 300);
    return data?.signedUrl;
  };
  const openDoc = async (doc: any, download: boolean) => {
    if (!doc.fileUrl) { toast({ title: L('No file attached to this document.', 'لا يوجد ملف مرفق بهذا المستند.'), variant: 'destructive' }); return; }
    const url = /^https?:/.test(doc.fileUrl) ? doc.fileUrl : await signedUrl(doc.fileUrl);
    if (!url) { toast({ title: L('Could not open the file.', 'تعذر فتح الملف.'), variant: 'destructive' }); return; }
    if (download) { const a = document.createElement('a'); a.href = url; a.download = doc.name; a.target = '_blank'; a.click(); } else window.open(url, '_blank');
  };
  const deleteDoc = async (doc: any) => {
    if (!window.confirm(L('Delete this document?', 'حذف هذا المستند؟'))) return;
    if (doc.fileUrl && !/^https?:/.test(doc.fileUrl)) await supabase.storage.from('documents').remove([doc.fileUrl]);
    await (supabase as any).from('documents').delete().eq('id', doc.id);
    setReloadKey(k => k + 1);
  };
  const onUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0]; e.target.value = '';
    if (!f || !user) return;
    if (f.size > 10 * 1024 * 1024) { toast({ title: L('File is larger than 10 MB.', 'حجم الملف أكبر من 10 ميجابايت.'), variant: 'destructive' }); return; }
    setUploading(true);
    const path = `${user.id}/${Date.now()}-${f.name.replace(/[^\w.\-]+/g, '_')}`;
    const up = await supabase.storage.from('documents').upload(path, f, { contentType: f.type || undefined });
    if (up.error) { toast({ title: L('Upload failed', 'فشل الرفع'), description: up.error.message, variant: 'destructive' }); setUploading(false); return; }
    const ins = await (supabase as any).from('documents').insert({ user_id: user.id, name: f.name, document_type: selectedCategory === 'all' ? 'legal' : selectedCategory, file_url: path, file_size: f.size, mime_type: f.type || null, is_ai_generated: false });
    setUploading(false);
    if (ins.error) { toast({ title: L('Upload failed', 'فشل الرفع'), description: ins.error.message, variant: 'destructive' }); return; }
    toast({ title: L('Document uploaded', 'تم رفع المستند') });
    setReloadKey(k => k + 1);
  };
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const filteredDocuments = documents.filter((doc) => {
    const matchesSearch = doc.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || doc.type === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getCategoryBadge = (type: string) => {
    const colors: Record<string, string> = {
      legal: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
      tax: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
      marketing: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300',
    };
    return colors[type] || '';
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight lg:text-3xl">{L('Documents', 'المستندات')}</h1>
          <p className="text-muted-foreground">{L('Manage your business documents', 'إدارة مستندات شركتك')}</p>
        </div>
        <div>
          <input ref={fileRef} type="file" className="hidden" onChange={onUpload} />
          <Button onClick={() => fileRef.current?.click()} disabled={uploading}>
            <Upload className="mr-2 h-4 w-4" />{uploading ? L('Uploading...', 'جارٍ الرفع...') : L('Upload document', 'رفع مستند')}
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">{L('Total Documents', 'إجمالي المستندات')}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{documents.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">{L('Legal Documents', 'مستندات قانونية')}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{documents.filter(d => d.type === 'legal').length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">{L('AI Generated', 'مُنشأ بالذكاء الاصطناعي')}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{documents.filter(d => d.isAiGenerated).length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">{L('Storage Used', 'المساحة المستخدمة')}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{Math.round(documents.reduce((a, d) => a + d.bytes, 0) / 1024)} KB</div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex flex-col gap-4 sm:flex-row">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder={L('Search documents...', 'ابحث في المستندات...')}
            className="pl-9"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex gap-2 flex-wrap">
          {categories.map((category) => (
            <Button
              key={category.id}
              variant={selectedCategory === category.id ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSelectedCategory(category.id)}
            >
              <category.icon className="mr-2 h-4 w-4" />
              {category.name}
            </Button>
          ))}
        </div>
      </div>

      {/* Documents Table */}
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>{L('Name', 'الاسم')}</TableHead>
                <TableHead className="hidden sm:table-cell">{L('Category', 'التصنيف')}</TableHead>
                <TableHead className="hidden md:table-cell">{L('Company', 'الشركة')}</TableHead>
                <TableHead className="hidden lg:table-cell">{L('Date', 'التاريخ')}</TableHead>
                <TableHead className="hidden sm:table-cell">{L('Size', 'الحجم')}</TableHead>
                <TableHead className="w-[50px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredDocuments.map((doc) => (
                <TableRow key={doc.id}>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <FileText className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <div className="font-medium">{doc.name}</div>
                        {doc.isAiGenerated && (
                          <div className="flex items-center gap-1 text-xs text-muted-foreground">
                            <Bot className="h-3 w-3" />
                            {L('AI Generated', 'مُنشأ بالذكاء الاصطناعي')}
                          </div>
                        )}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="hidden sm:table-cell">
                    <Badge variant="secondary" className={getCategoryBadge(doc.type)}>
                      {doc.type}
                    </Badge>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    {doc.company || '-'}
                  </TableCell>
                  <TableCell className="hidden lg:table-cell">{doc.createdAt}</TableCell>
                  <TableCell className="hidden sm:table-cell">{doc.size}</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => openDoc(doc, false)}>
                          <Eye className="mr-2 h-4 w-4" />
                          {L('Preview', 'معاينة')}
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => openDoc(doc, true)}>
                          <Download className="mr-2 h-4 w-4" />
                          {L('Download', 'تنزيل')}
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive" onClick={() => deleteDoc(doc)}>
                          <Trash2 className="mr-2 h-4 w-4" />
                          {L('Delete', 'حذف')}
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {filteredDocuments.length === 0 && (
        <div className="py-12 text-center">
          <FileText className="mx-auto h-12 w-12 text-muted-foreground/50" />
          <p className="mt-2 text-muted-foreground">{L('No documents found.', 'لا توجد مستندات.')}</p>
        </div>
      )}
    </div>
  );
};

export default DocumentsCenter;
