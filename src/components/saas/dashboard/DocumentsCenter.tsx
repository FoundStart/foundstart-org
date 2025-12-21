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

const documents = [
  {
    id: '1',
    name: 'TechStart LLC - Articles of Organization',
    type: 'legal',
    company: 'TechStart LLC',
    createdAt: '2024-01-15',
    size: '245 KB',
    isAiGenerated: false,
  },
  {
    id: '2',
    name: 'Operating Agreement',
    type: 'legal',
    company: 'TechStart LLC',
    createdAt: '2024-01-15',
    size: '128 KB',
    isAiGenerated: true,
  },
  {
    id: '3',
    name: 'EIN Confirmation Letter',
    type: 'tax',
    company: 'TechStart LLC',
    createdAt: '2024-01-20',
    size: '89 KB',
    isAiGenerated: false,
  },
  {
    id: '4',
    name: 'Business Description',
    type: 'marketing',
    company: null,
    createdAt: '2024-01-22',
    size: '45 KB',
    isAiGenerated: true,
  },
  {
    id: '5',
    name: 'GlobalTech Ltd - Certificate of Incorporation',
    type: 'legal',
    company: 'GlobalTech Ltd',
    createdAt: '2024-02-01',
    size: '312 KB',
    isAiGenerated: false,
  },
];

const categories = [
  { id: 'all', name: 'All Documents', icon: Folder },
  { id: 'legal', name: 'Legal', icon: FileText },
  { id: 'tax', name: 'Tax', icon: File },
  { id: 'marketing', name: 'Marketing', icon: File },
];

const DocumentsCenter = () => {
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
          <h1 className="text-2xl font-bold tracking-tight lg:text-3xl">Documents</h1>
          <p className="text-muted-foreground">Manage your business documents</p>
        </div>
        <Button>
          <Upload className="mr-2 h-4 w-4" />
          Upload Document
        </Button>
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Documents</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{documents.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Legal Documents</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{documents.filter(d => d.type === 'legal').length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">AI Generated</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{documents.filter(d => d.isAiGenerated).length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Storage Used</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">819 KB</div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex flex-col gap-4 sm:flex-row">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search documents..."
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
                <TableHead>Name</TableHead>
                <TableHead className="hidden sm:table-cell">Category</TableHead>
                <TableHead className="hidden md:table-cell">Company</TableHead>
                <TableHead className="hidden lg:table-cell">Date</TableHead>
                <TableHead className="hidden sm:table-cell">Size</TableHead>
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
                            AI Generated
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
                        <DropdownMenuItem>
                          <Eye className="mr-2 h-4 w-4" />
                          Preview
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Download className="mr-2 h-4 w-4" />
                          Download
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive">
                          <Trash2 className="mr-2 h-4 w-4" />
                          Delete
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
          <p className="mt-2 text-muted-foreground">No documents found.</p>
        </div>
      )}
    </div>
  );
};

export default DocumentsCenter;
