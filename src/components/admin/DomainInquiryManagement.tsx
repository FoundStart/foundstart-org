import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Globe, Mail, Phone, MessageCircle, Search, RefreshCw, Eye, CheckCircle, Clock, XCircle, Send } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { format } from 'date-fns';

type InquiryStatus = 'pending' | 'contacted' | 'negotiating' | 'completed' | 'cancelled';

interface Inquiry {
  id: string;
  domain_name: string;
  name: string;
  email: string;
  phone: string | null;
  message: string | null;
  status: string;
  created_at: string;
  updated_at: string;
}

const statusConfig: Record<InquiryStatus, { label: string; color: string; icon: React.ReactNode }> = {
  pending: { label: 'Pending', color: 'bg-yellow-500/10 text-yellow-600 border-yellow-500/20', icon: <Clock className="w-3 h-3" /> },
  contacted: { label: 'Contacted', color: 'bg-blue-500/10 text-blue-600 border-blue-500/20', icon: <Send className="w-3 h-3" /> },
  negotiating: { label: 'Negotiating', color: 'bg-purple-500/10 text-purple-600 border-purple-500/20', icon: <MessageCircle className="w-3 h-3" /> },
  completed: { label: 'Completed', color: 'bg-green-500/10 text-green-600 border-green-500/20', icon: <CheckCircle className="w-3 h-3" /> },
  cancelled: { label: 'Cancelled', color: 'bg-red-500/10 text-red-600 border-red-500/20', icon: <XCircle className="w-3 h-3" /> },
};

const DomainInquiryManagement = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [selectedInquiry, setSelectedInquiry] = useState<Inquiry | null>(null);
  const [replyMessage, setReplyMessage] = useState('');

  const { data: inquiries = [], isLoading, refetch } = useQuery({
    queryKey: ['domain-inquiries'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('domain_inquiries')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data as Inquiry[];
    },
  });

  const updateStatusMutation = useMutation({
    mutationFn: async ({ id, status }: { id: string; status: string }) => {
      const { error } = await supabase
        .from('domain_inquiries')
        .update({ status, updated_at: new Date().toISOString() })
        .eq('id', id);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['domain-inquiries'] });
      toast({ title: 'Status updated successfully' });
    },
    onError: (error: any) => {
      toast({ title: 'Error', description: error.message, variant: 'destructive' });
    },
  });

  const filteredInquiries = inquiries.filter(inquiry => {
    const matchesSearch = 
      inquiry.domain_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inquiry.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inquiry.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || inquiry.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const stats = {
    total: inquiries.length,
    pending: inquiries.filter(i => i.status === 'pending').length,
    contacted: inquiries.filter(i => i.status === 'contacted').length,
    completed: inquiries.filter(i => i.status === 'completed').length,
  };

  const handleSendReply = () => {
    if (!selectedInquiry || !replyMessage) return;
    
    // Open email client with pre-filled content
    const subject = encodeURIComponent(`Re: Your inquiry about ${selectedInquiry.domain_name}`);
    const body = encodeURIComponent(replyMessage);
    window.open(`mailto:${selectedInquiry.email}?subject=${subject}&body=${body}`, '_blank');
    
    // Update status to contacted
    updateStatusMutation.mutate({ id: selectedInquiry.id, status: 'contacted' });
    setReplyMessage('');
    setSelectedInquiry(null);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <Globe className="w-6 h-6 text-primary" />
          Domain Inquiries
        </h1>
        <p className="text-muted-foreground mt-1">Manage and respond to domain purchase inquiries</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold">{stats.total}</div>
            <p className="text-xs text-muted-foreground">Total Inquiries</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-yellow-600">{stats.pending}</div>
            <p className="text-xs text-muted-foreground">Pending</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-blue-600">{stats.contacted}</div>
            <p className="text-xs text-muted-foreground">Contacted</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-green-600">{stats.completed}</div>
            <p className="text-xs text-muted-foreground">Completed</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search by domain, name, or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="contacted">Contacted</SelectItem>
                <SelectItem value="negotiating">Negotiating</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" onClick={() => refetch()}>
              <RefreshCw className="w-4 h-4 mr-2" />
              Refresh
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Inquiries Table */}
      <Card>
        <CardContent className="pt-6 overflow-x-auto">
          {isLoading ? (
            <div className="text-center py-12 text-muted-foreground">Loading inquiries...</div>
          ) : filteredInquiries.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">No inquiries found</div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Domain</TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredInquiries.map((inquiry) => {
                  const status = statusConfig[inquiry.status as InquiryStatus] || statusConfig.pending;
                  return (
                    <TableRow key={inquiry.id}>
                      <TableCell>
                        <div className="font-medium">{inquiry.domain_name}</div>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm">
                          <div className="font-medium">{inquiry.name}</div>
                          <div className="text-muted-foreground text-xs">{inquiry.email}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Select 
                          value={inquiry.status} 
                          onValueChange={(value) => updateStatusMutation.mutate({ id: inquiry.id, status: value })}
                        >
                          <SelectTrigger className={`w-[130px] h-8 text-xs ${status.color}`}>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {Object.entries(statusConfig).map(([key, config]) => (
                              <SelectItem key={key} value={key}>
                                <div className="flex items-center gap-2">
                                  {config.icon}
                                  {config.label}
                                </div>
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground">
                        {format(new Date(inquiry.created_at), 'MMM d, yyyy')}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            onClick={() => setSelectedInquiry(inquiry)}
                          >
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            asChild
                          >
                            <a href={`https://wa.me/21002905764?text=${encodeURIComponent(`Regarding domain: ${inquiry.domain_name}`)}`} target="_blank" rel="noopener noreferrer">
                              <MessageCircle className="w-4 h-4 text-green-500" />
                            </a>
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            asChild
                          >
                            <a href={`mailto:${inquiry.email}?subject=Re: Your inquiry about ${inquiry.domain_name}`}>
                              <Mail className="w-4 h-4" />
                            </a>
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      {/* View/Reply Dialog */}
      <Dialog open={!!selectedInquiry} onOpenChange={(open) => !open && setSelectedInquiry(null)}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Globe className="w-5 h-5 text-primary" />
              Inquiry Details
            </DialogTitle>
            <DialogDescription>
              Review and respond to this domain inquiry
            </DialogDescription>
          </DialogHeader>
          {selectedInquiry && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-xs text-muted-foreground">Domain</Label>
                  <p className="font-medium">{selectedInquiry.domain_name}</p>
                </div>
                <div>
                  <Label className="text-xs text-muted-foreground">Date</Label>
                  <p className="font-medium">{format(new Date(selectedInquiry.created_at), 'MMM d, yyyy h:mm a')}</p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-xs text-muted-foreground">Name</Label>
                  <p className="font-medium">{selectedInquiry.name}</p>
                </div>
                <div>
                  <Label className="text-xs text-muted-foreground">Email</Label>
                  <p className="font-medium">{selectedInquiry.email}</p>
                </div>
              </div>

              {selectedInquiry.phone && (
                <div>
                  <Label className="text-xs text-muted-foreground">Phone</Label>
                  <p className="font-medium">{selectedInquiry.phone}</p>
                </div>
              )}

              {selectedInquiry.message && (
                <div>
                  <Label className="text-xs text-muted-foreground">Message</Label>
                  <p className="text-sm bg-muted/50 p-3 rounded-lg">{selectedInquiry.message}</p>
                </div>
              )}

              <div className="border-t pt-4">
                <Label htmlFor="reply">Quick Reply</Label>
                <Textarea
                  id="reply"
                  placeholder="Type your reply message..."
                  value={replyMessage}
                  onChange={(e) => setReplyMessage(e.target.value)}
                  rows={4}
                  className="mt-2"
                />
                <div className="flex gap-2 mt-4">
                  <Button onClick={handleSendReply} disabled={!replyMessage} className="flex-1">
                    <Mail className="w-4 h-4 mr-2" />
                    Send via Email
                  </Button>
                  <Button variant="outline" asChild>
                    <a 
                      href={`https://wa.me/${selectedInquiry.phone?.replace(/\D/g, '') || '21002905764'}`} 
                      target="_blank" 
                      rel="noopener noreferrer"
                    >
                      <MessageCircle className="w-4 h-4 mr-2" />
                      WhatsApp
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default DomainInquiryManagement;
