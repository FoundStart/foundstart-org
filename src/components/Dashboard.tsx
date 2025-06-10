
import { useState } from 'react';
import DashboardSidebar from './dashboard/DashboardSidebar';
import ServiceDetail from './dashboard/ServiceDetail';

const Dashboard = () => {
  const [activeService, setActiveService] = useState('overview');

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl md:text-4xl font-bold">
            Your <span className="gradient-text">Business Dashboard</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Manage all your business services from one centralized location.
          </p>
        </div>

        <div className="bg-card border border-border rounded-lg overflow-hidden" style={{ height: '600px' }}>
          <div className="flex h-full">
            <DashboardSidebar 
              activeService={activeService}
              onServiceChange={setActiveService}
            />
            <div className="flex-1 overflow-auto">
              <ServiceDetail serviceId={activeService} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Dashboard;
