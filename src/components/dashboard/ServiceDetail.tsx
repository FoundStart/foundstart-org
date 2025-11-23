import WalletDashboard from '../wallet/WalletDashboard';
import UserManagement from '../admin/UserManagement';
import AdminOverview from '../admin/AdminOverview';
import MyServices from './MyServices';
import PricingSection from './PricingSection';

const ServiceDetail = ({ serviceId }: { serviceId: string }) => {

  const renderServiceContent = () => {
    switch (serviceId) {
      case 'wallet':
        return <WalletDashboard />;
      
      case 'my-services':
        return <MyServices />;
      
      case 'pricing':
        return <PricingSection />;
      
      case 'user-management':
        return <UserManagement />;
      
      case 'admin-overview':
        return <AdminOverview />;
      
      case 'all-services':
        return (
          <div className="p-8 text-center">
            <h3 className="text-xl font-semibold mb-4">All Services</h3>
            <p className="text-muted-foreground">
              This section is under development.
            </p>
          </div>
        );
      
      default:
        return (
          <div className="p-8 text-center">
            <h3 className="text-xl font-semibold mb-4">Service Details</h3>
            <p className="text-muted-foreground">
              Select a service from the sidebar to view its details and manage your account.
            </p>
          </div>
        );
    }
  };

  return (
    <div className="flex-1 overflow-auto">
      <div className="p-6">
        {renderServiceContent()}
      </div>
    </div>
  );
};

export default ServiceDetail;
