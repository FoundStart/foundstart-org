import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';
import {
  LayoutDashboard,
  Building2,
  ShoppingCart,
  Bot,
  FileText,
  CreditCard,
  HelpCircle,
  Settings,
  LogOut,
  Users,
  Globe,
  Wallet,
  Package,
  Briefcase,
  Tag,
  Sparkles,
} from 'lucide-react';
import { useL } from '@/hooks/useL';
import { useAuth } from '@/contexts/AuthProvider';
import { Button } from '@/components/ui/button';

const mainMenuItems = [
  { title: 'Dashboard', ar: 'لوحة التحكم', icon: LayoutDashboard, href: '/dashboard' },
  { title: 'New Formation', ar: 'تأسيس شركة جديدة', icon: Briefcase, href: '/dashboard/formation' },
  { title: 'My Companies', ar: 'شركاتي', icon: Building2, href: '/dashboard/companies' },
  { title: 'Documents', ar: 'المستندات', icon: FileText, href: '/dashboard/documents' },
];

const servicesMenuItems: typeof mainMenuItems = [];

const accountMenuItems = [
  { title: 'Billing', ar: 'الفواتير والمدفوعات', icon: CreditCard, href: '/dashboard/billing' },
  { title: 'Affiliate', ar: 'برنامج الأفلييت', icon: Users, href: '/dashboard/affiliates' },
  { title: 'Support', ar: 'الدعم', icon: HelpCircle, href: '/dashboard/support' },
  { title: 'Settings', ar: 'الإعدادات', icon: Settings, href: '/dashboard/settings' },
];

const CustomerSidebar = () => {
  const L = useL();
  const dir = L('ltr', 'rtl');
  const location = useLocation();
  const { signOut, user } = useAuth();

  const isActive = (href: string) => {
    if (href === '/dashboard') {
      return location.pathname === '/dashboard';
    }
    return location.pathname.startsWith(href);
  };

  return (
    <Sidebar className="border-r border-border">
      <SidebarHeader dir={dir} className="border-b border-border p-4">
        <Link to="/dashboard" className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground font-bold">
            F
          </div>
          <span className="text-lg font-semibold">FoundStart</span>
        </Link>
      </SidebarHeader>

      <SidebarContent dir={dir}>
        <SidebarGroup>
          <SidebarGroupLabel>{L('Main Menu', 'القائمة الرئيسية')}</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {mainMenuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild isActive={isActive(item.href)}>
                    <Link to={item.href}>
                      <item.icon className="h-4 w-4" />
                      <span>{L(item.title, (item as any).ar)}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {servicesMenuItems.length > 0 && <SidebarGroup>
          <SidebarGroupLabel>{L('Services', 'الخدمات')}</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {servicesMenuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild isActive={isActive(item.href)}>
                    <Link to={item.href}>
                      <item.icon className="h-4 w-4" />
                      <span>{L(item.title, (item as any).ar)}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>}

        <SidebarGroup>
          <SidebarGroupLabel>{L('Account', 'الحساب')}</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {accountMenuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild isActive={isActive(item.href)}>
                    <Link to={item.href}>
                      <item.icon className="h-4 w-4" />
                      <span>{L(item.title, (item as any).ar)}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter dir={dir} className="border-t border-border p-4">
        <div className="flex flex-col gap-2">
          <div className="text-sm text-muted-foreground truncate">
            {user?.email}
          </div>
          <Button
            variant="ghost"
            size="sm"
            className="justify-start"
            onClick={async () => { await signOut(); window.location.replace('/'); }}
          >
            <LogOut className="mr-2 h-4 w-4" />
            {L('Sign Out', 'تسجيل الخروج')}
          </Button>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
};

export default CustomerSidebar;
