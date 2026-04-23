import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { SidebarTrigger } from '@/components/ui/sidebar';
import DashboardHome from './dashboard/DashboardHome';
import MyCompanies from './dashboard/MyCompanies';
import MyServicesPage from './dashboard/MyServicesPage';
import CompanyFormation from './dashboard/CompanyFormation';
import ServicesMarketplace from './dashboard/ServicesMarketplace';
import AIAssistant from './dashboard/AIAssistant';
import DocumentsCenter from './dashboard/DocumentsCenter';
import BillingPayments from './dashboard/BillingPayments';
import AffiliatesDashboard from './dashboard/AffiliatesDashboard';
import SupportCenter from './dashboard/SupportCenter';
import AccountSettings from './dashboard/AccountSettings';
import WalletDashboard from '@/components/wallet/WalletDashboard';
import PricingPlans from './dashboard/PricingPlans';
import DashboardDomains from './dashboard/DashboardDomains';

const CustomerDashboardContent = () => {
  return (
    <div className="flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-10 flex h-14 items-center gap-4 border-b border-border bg-background px-4 lg:px-6">
        <SidebarTrigger className="lg:hidden" />
        <div className="flex-1" />
        <div className="flex items-center gap-2">
          {/* Header actions can go here */}
        </div>
      </header>

      {/* Content */}
      <div className="flex-1 p-4 lg:p-6">
        <Routes>
          <Route index element={<DashboardHome />} />
          <Route path="companies" element={<MyCompanies />} />
          <Route path="my-services" element={<MyServicesPage />} />
          <Route path="formation/*" element={<CompanyFormation />} />
          <Route path="services/*" element={<ServicesMarketplace />} />
          <Route path="domains" element={<DashboardDomains />} />
          <Route path="ai-assistant" element={<AIAssistant />} />
          <Route path="documents" element={<DocumentsCenter />} />
          <Route path="wallet" element={<WalletDashboard />} />
          <Route path="billing" element={<BillingPayments />} />
          <Route path="pricing" element={<PricingPlans />} />
          <Route path="affiliates" element={<AffiliatesDashboard />} />
          <Route path="support/*" element={<SupportCenter />} />
          <Route path="settings" element={<AccountSettings />} />
        </Routes>
      </div>
    </div>
  );
};

export default CustomerDashboardContent;
