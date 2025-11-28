import { useState } from 'react';
import DashboardSidebar from './dashboard/DashboardSidebar';
import ServiceDetail from './dashboard/ServiceDetail';
import { useIsMobile } from '@/hooks/use-mobile';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Menu } from 'lucide-react';

const Dashboard = () => {
  const [activeService, setActiveService] = useState('overview');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const isMobile = useIsMobile();

  const handleServiceChange = (service: string) => {
    setActiveService(service);
    if (isMobile) {
      setSidebarOpen(false);
    }
  };

  return (
    <section className="py-8 sm:py-12 lg:py-20 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center space-y-3 sm:space-y-4 mb-8 sm:mb-12 lg:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold">
            Your <span className="gradient-text">Business Dashboard</span>
          </h2>
          <p className="text-base sm:text-lg lg:text-xl text-muted-foreground max-w-3xl mx-auto px-4">
            Manage all your business services from one centralized location.
          </p>
        </div>

        <div className="bg-card border border-border rounded-lg overflow-hidden min-h-[500px] lg:min-h-[600px]">
          {/* Mobile Layout */}
          {isMobile ? (
            <div className="flex flex-col h-full">
              <div className="flex items-center justify-between p-4 border-b border-border">
                <h3 className="font-semibold">Dashboard</h3>
                <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
                  <SheetTrigger asChild>
                    <Button variant="outline" size="icon">
                      <Menu className="h-5 w-5" />
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="left" className="p-0 w-72">
                    <DashboardSidebar 
                      activeService={activeService}
                      onServiceChange={handleServiceChange}
                    />
                  </SheetContent>
                </Sheet>
              </div>
              <div className="flex-1 overflow-auto">
                <ServiceDetail serviceId={activeService} />
              </div>
            </div>
          ) : (
            /* Desktop Layout */
            <div className="flex h-[600px]">
              <DashboardSidebar 
                activeService={activeService}
                onServiceChange={handleServiceChange}
              />
              <div className="flex-1 overflow-auto">
                <ServiceDetail serviceId={activeService} />
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Dashboard;
