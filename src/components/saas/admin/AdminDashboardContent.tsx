import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { Card, CardContent } from '@/components/ui/card';
import AdminOverview from '@/components/admin/AdminOverview';
import UserManagement from '@/components/admin/UserManagement';
import CompanyManagement from '@/components/admin/CompanyManagement';
import ServiceManagement from '@/components/admin/ServiceManagement';
import OrderManagement from '@/components/admin/OrderManagement';
import DomainInquiryManagement from '@/components/admin/DomainInquiryManagement';
import DomainAnalyticsDashboard from '@/components/admin/DomainAnalyticsDashboard';
import AdminAffiliatesManagement from '@/components/admin/AdminAffiliatesManagement';
import NotificationBell from '@/components/notifications/NotificationBell';

const PlaceholderPage = ({ title }: { title: string }) => (
  <div className="space-y-6">
    <h1 className="text-2xl font-bold">{title}</h1>
    <Card><CardContent className="py-12 text-center text-muted-foreground">Admin {title} management coming soon.</CardContent></Card>
  </div>
);

const AdminDashboardContent = () => {
  return (
    <div className="flex flex-col w-full max-w-full overflow-x-hidden">
      <header className="sticky top-0 z-10 flex h-14 items-center gap-4 border-b border-border bg-background px-4 lg:px-6">
        <SidebarTrigger className="lg:hidden" />
        <div className="flex-1" />
        <NotificationBell />
      </header>
      <div className="flex-1 p-3 md:p-4 lg:p-6 w-full max-w-full overflow-x-hidden">
        <Routes>
          <Route index element={<AdminOverview />} />
          <Route path="users" element={<UserManagement />} />
          <Route path="companies" element={<CompanyManagement />} />
          <Route path="services" element={<ServiceManagement />} />
          <Route path="orders" element={<OrderManagement />} />
          <Route path="domain-inquiries" element={<DomainInquiryManagement />} />
          <Route path="domain-analytics" element={<DomainAnalyticsDashboard />} />
          <Route path="prompts" element={<PlaceholderPage title="AI Prompts" />} />
          <Route path="affiliates" element={<AdminAffiliatesManagement />} />
          <Route path="payments" element={<PlaceholderPage title="Payments" />} />
          <Route path="logs" element={<PlaceholderPage title="Activity Logs" />} />
        </Routes>
      </div>
    </div>
  );
};

export default AdminDashboardContent;
