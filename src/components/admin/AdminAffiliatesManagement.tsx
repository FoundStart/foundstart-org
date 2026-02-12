
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Users, DollarSign, TrendingUp, Search } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

const AdminAffiliatesManagement = () => {
  const [affiliates, setAffiliates] = useState<any[]>([]);
  const [referrals, setReferrals] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const [{ data: affs }, { data: refs }] = await Promise.all([
      supabase.from('affiliates').select('*').order('created_at', { ascending: false }),
      supabase.from('referrals').select('*').order('created_at', { ascending: false }).limit(50),
    ]);
    setAffiliates(affs || []);
    setReferrals(refs || []);
    setLoading(false);
  };

  const toggleActive = async (id: string, current: boolean) => {
    await supabase.from('affiliates').update({ is_active: !current }).eq('id', id);
    fetchData();
  };

  const totalEarnings = affiliates.reduce((sum, a) => sum + Number(a.total_earnings || 0), 0);
  const totalPending = affiliates.reduce((sum, a) => sum + Number(a.pending_earnings || 0), 0);

  const filtered = affiliates.filter(a => 
    a.referral_code?.toLowerCase().includes(search.toLowerCase()) ||
    a.user_id?.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) return <div className="flex items-center justify-center py-12"><div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" /></div>;

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Affiliate Management</h1>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card><CardContent className="pt-6 text-center">
          <Users className="w-6 h-6 text-primary mx-auto mb-2" />
          <div className="text-2xl font-bold">{affiliates.length}</div>
          <p className="text-xs text-muted-foreground">Total Affiliates</p>
        </CardContent></Card>
        <Card><CardContent className="pt-6 text-center">
          <DollarSign className="w-6 h-6 text-green-500 mx-auto mb-2" />
          <div className="text-2xl font-bold">${totalEarnings.toFixed(2)}</div>
          <p className="text-xs text-muted-foreground">Total Paid</p>
        </CardContent></Card>
        <Card><CardContent className="pt-6 text-center">
          <TrendingUp className="w-6 h-6 text-orange-500 mx-auto mb-2" />
          <div className="text-2xl font-bold">${totalPending.toFixed(2)}</div>
          <p className="text-xs text-muted-foreground">Pending Payouts</p>
        </CardContent></Card>
        <Card><CardContent className="pt-6 text-center">
          <Users className="w-6 h-6 text-blue-500 mx-auto mb-2" />
          <div className="text-2xl font-bold">{referrals.length}</div>
          <p className="text-xs text-muted-foreground">Total Referrals</p>
        </CardContent></Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Affiliates</CardTitle>
            <div className="relative w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input placeholder="Search..." value={search} onChange={e => setSearch(e.target.value)} className="pl-9" />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Code</TableHead>
                <TableHead>Rate</TableHead>
                <TableHead>Earnings</TableHead>
                <TableHead>Pending</TableHead>
                <TableHead>Clicks</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((aff) => (
                <TableRow key={aff.id}>
                  <TableCell className="font-mono text-sm">{aff.referral_code}</TableCell>
                  <TableCell>{aff.commission_rate}%</TableCell>
                  <TableCell>${Number(aff.total_earnings || 0).toFixed(2)}</TableCell>
                  <TableCell>${Number(aff.pending_earnings || 0).toFixed(2)}</TableCell>
                  <TableCell>{aff.total_clicks || 0}</TableCell>
                  <TableCell>
                    <Badge variant={aff.is_active ? 'default' : 'destructive'}>
                      {aff.is_active ? 'Active' : 'Inactive'}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Button size="sm" variant="outline" onClick={() => toggleActive(aff.id, aff.is_active)}>
                      {aff.is_active ? 'Deactivate' : 'Activate'}
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminAffiliatesManagement;
