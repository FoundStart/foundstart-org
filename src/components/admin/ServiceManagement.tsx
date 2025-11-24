import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useToast } from '@/hooks/use-toast';
import { Badge } from '@/components/ui/badge';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { Search, CheckCircle, XCircle, Trash2 } from 'lucide-react';

interface Service {
  id: string;
  service_name: string;
  service_type: string;
  status: string;
  price: number;
  purchased_at: string;
  expires_at: string | null;
  user_id: string;
  profiles?: {
    email: string;
    full_name: string;
  };
}

const ServiceManagement = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [filteredServices, setFilteredServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    fetchServices();
    
    const channel = supabase
      .channel('services-changes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'services' }, () => {
        fetchServices();
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  useEffect(() => {
    filterServices();
  }, [services, searchQuery, statusFilter]);

  const fetchServices = async () => {
    try {
      const { data: servicesData, error: servicesError } = await supabase
        .from('services')
        .select('*')
        .order('purchased_at', { ascending: false });

      if (servicesError) throw servicesError;

      const { data: profilesData, error: profilesError } = await supabase
        .from('profiles')
        .select('user_id, email, full_name');

      if (profilesError) throw profilesError;

      const profilesMap = new Map(profilesData?.map(p => [p.user_id, p]) || []);
      
      const enrichedServices = servicesData?.map(service => ({
        ...service,
        profiles: profilesMap.get(service.user_id)
      })) || [];

      setServices(enrichedServices);
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to fetch services',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const filterServices = () => {
    let filtered = services;

    if (statusFilter !== 'all') {
      filtered = filtered.filter(service => service.status === statusFilter);
    }

    if (searchQuery) {
      filtered = filtered.filter(service =>
        service.service_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        service.profiles?.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        service.profiles?.full_name?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredServices(filtered);
  };

  const updateServiceStatus = async (serviceId: string, newStatus: string) => {
    try {
      const { error } = await supabase
        .from('services')
        .update({ status: newStatus })
        .eq('id', serviceId);

      if (error) throw error;

      toast({
        title: 'Success',
        description: `Service ${newStatus}`,
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to update service status',
        variant: 'destructive',
      });
    }
  };

  const handleDeleteService = async () => {
    if (!selectedService) return;

    try {
      const { error } = await supabase
        .from('services')
        .delete()
        .eq('id', selectedService);

      if (error) throw error;

      toast({
        title: 'Success',
        description: 'Service deleted successfully',
      });
      setDeleteDialogOpen(false);
      setSelectedService(null);
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to delete service',
        variant: 'destructive',
      });
    }
  };

  const getStatusBadge = (status: string) => {
    const variants: Record<string, 'default' | 'secondary' | 'destructive' | 'outline'> = {
      active: 'default',
      pending: 'secondary',
      suspended: 'destructive',
      expired: 'outline',
    };
    return <Badge variant={variants[status] || 'outline'}>{status}</Badge>;
  };

  if (loading) {
    return <div className="p-8 text-center">Loading services...</div>;
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Service Management</h2>
        <p className="text-muted-foreground">Manage all user services from this dashboard</p>
      </div>

      <div className="flex gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by service name, user email, or name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="suspended">Suspended</SelectItem>
            <SelectItem value="expired">Expired</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Service Name</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>User</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Purchased</TableHead>
              <TableHead>Expires</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredServices.length === 0 ? (
              <TableRow>
                <TableCell colSpan={8} className="text-center">
                  No services found
                </TableCell>
              </TableRow>
            ) : (
              filteredServices.map((service) => (
                <TableRow key={service.id}>
                  <TableCell className="font-medium">{service.service_name}</TableCell>
                  <TableCell>{service.service_type}</TableCell>
                  <TableCell>
                    <div>
                      <div className="font-medium">{service.profiles?.full_name || 'N/A'}</div>
                      <div className="text-sm text-muted-foreground">{service.profiles?.email || 'N/A'}</div>
                    </div>
                  </TableCell>
                  <TableCell>{getStatusBadge(service.status)}</TableCell>
                  <TableCell>${service.price}</TableCell>
                  <TableCell>{new Date(service.purchased_at).toLocaleDateString()}</TableCell>
                  <TableCell>
                    {service.expires_at ? new Date(service.expires_at).toLocaleDateString() : 'N/A'}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      {service.status !== 'active' && (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => updateServiceStatus(service.id, 'active')}
                        >
                          <CheckCircle className="h-4 w-4" />
                        </Button>
                      )}
                      {service.status !== 'suspended' && (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => updateServiceStatus(service.id, 'suspended')}
                        >
                          <XCircle className="h-4 w-4" />
                        </Button>
                      )}
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => {
                          setSelectedService(service.id);
                          setDeleteDialogOpen(true);
                        }}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the service.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteService}>Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default ServiceManagement;
