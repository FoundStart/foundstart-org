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
import { Package, Calendar, DollarSign, AlertCircle, Building2 } from 'lucide-react';
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
  company_id: string;
  companies?: {
    company_name: string;
    jurisdiction: string;
  };
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
        .select(`
          *,
          companies (
            company_name,
            jurisdiction
          )
        `)
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
      case 'suspended':
        return 'destructive';
      default:
        return 'outline';
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-pulse text-muted-foreground">Loading...</div>
      </div>
    );
  }

  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center shrink-0">
            <Package className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-bold">My Services</h1>
            <p className="text-sm text-muted-foreground">View and manage your active services</p>
          </div>
        </div>
      </div>

      {services.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-8 sm:py-12">
            <AlertCircle className="w-10 h-10 sm:w-12 sm:h-12 text-muted-foreground mb-4" />
            <h3 className="text-base sm:text-lg font-semibold mb-2">No Services Yet</h3>
            <p className="text-sm text-muted-foreground text-center mb-4 px-4">
              You haven't purchased any services yet. Browse our pricing to get started.
            </p>
            <Button size="sm">View Pricing</Button>
          </CardContent>
        </Card>
      ) : (
        <>
          {/* Mobile Card View */}
          <div className="grid gap-4 md:hidden">
            {services.map((service) => (
              <Card key={service.id}>
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="font-semibold">{service.service_name}</h3>
                      <p className="text-sm text-muted-foreground">{service.service_type}</p>
                    </div>
                    <Badge variant={getStatusColor(service.status)}>
                      {service.status}
                    </Badge>
                  </div>
                  
                  {service.companies && (
                    <div className="flex items-center text-sm text-muted-foreground mb-3">
                      <Building2 className="w-4 h-4 mr-2" />
                      {service.companies.company_name} ({service.companies.jurisdiction})
                    </div>
                  )}
                  
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div>
                      <span className="text-muted-foreground">Price</span>
                      <div className="flex items-center font-medium">
                        <DollarSign className="w-3 h-3" />
                        {service.price}
                      </div>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Purchased</span>
                      <div className="font-medium">
                        {new Date(service.purchased_at).toLocaleDateString()}
                      </div>
                    </div>
                    {service.expires_at && (
                      <div className="col-span-2">
                        <span className="text-muted-foreground">Expires</span>
                        <div className="font-medium">
                          {new Date(service.expires_at).toLocaleDateString()}
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Desktop Table View */}
          <Card className="hidden md:block">
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
                    <TableHead>Company</TableHead>
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
                      <TableCell>
                        {service.companies ? (
                          <div className="flex items-center">
                            <Building2 className="w-4 h-4 mr-2 text-muted-foreground" />
                            <span>{service.companies.company_name}</span>
                          </div>
                        ) : (
                          <span className="text-muted-foreground">-</span>
                        )}
                      </TableCell>
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
        </>
      )}
    </div>
  );
};

export default MyServices;
