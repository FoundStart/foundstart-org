import WalletDashboard from '../wallet/WalletDashboard';

const ServiceDetail = ({ serviceId }: { serviceId: string }) => {

  const renderServiceContent = () => {
    switch (serviceId) {
      case 'wallet':
        return <WalletDashboard />;
      
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
