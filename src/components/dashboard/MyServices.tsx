import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Package, Calendar, DollarSign, AlertCircle } from 'lucide-react';
import { toast } from 'sonner';
import { useAuth } from '@/contexts/AuthProvider';

interface Service {
  id: string;
  service_name: string;
  service_type: string;
  price: number;
  status: string;
  purchased_at: string;
  expires_at: string | null;
}

const MyServices = () => {
  const { user } = useAuth();
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchServices();
    }
  }, [user]);

  const fetchServices = async () => {
    try {
      const { data, error } = await supabase
        .from('services')
        .select('*')
        .eq('user_id', user?.id)
        .order('purchased_at', { ascending: false });

      if (error) throw error;
      setServices(data || []);
    } catch (error) {
      console.error('Error fetching services:', error);
      toast.error('Failed to load services');
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'default';
      case 'pending':
        return 'secondary';
      case 'expired':
        return 'destructive';
      default:
        return 'outline';
    }
  };

  if (loading) {
    return <div className="flex items-center justify-center p-8">Loading...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
            <Package className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h1 className="text-2xl font-bold">My Services</h1>
            <p className="text-muted-foreground">View and manage your active services</p>
          </div>
        </div>
      </div>

      {services.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <AlertCircle className="w-12 h-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">No Services Yet</h3>
            <p className="text-muted-foreground text-center mb-4">
              You haven't purchased any services yet. Browse our pricing to get started.
            </p>
            <Button>View Pricing</Button>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Package className="w-5 h-5 mr-2" />
              Active Services ({services.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Service Name</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Purchased</TableHead>
                  <TableHead>Expires</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {services.map((service) => (
                  <TableRow key={service.id}>
                    <TableCell className="font-medium">{service.service_name}</TableCell>
                    <TableCell>{service.service_type}</TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <DollarSign className="w-4 h-4 mr-1" />
                        {service.price}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant={getStatusColor(service.status)}>
                        {service.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center text-sm">
                        <Calendar className="w-4 h-4 mr-2 text-muted-foreground" />
                        {new Date(service.purchased_at).toLocaleDateString()}
                      </div>
                    </TableCell>
                    <TableCell>
                      {service.expires_at ? (
                        <div className="flex items-center text-sm">
                          <Calendar className="w-4 h-4 mr-2 text-muted-foreground" />
                          {new Date(service.expires_at).toLocaleDateString()}
                        </div>
                      ) : (
                        <span className="text-muted-foreground text-sm">No expiry</span>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default MyServices;
