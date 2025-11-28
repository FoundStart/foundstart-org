import { useState } from 'react';
import { 
  Building2, 
  Globe, 
  CreditCard, 
  Smartphone, 
  Mail, 
  Server,
  TrendingUp,
  Users,
  Settings,
  Home,
  FileText,
  BarChart3,
  ChevronLeft,
  ChevronRight,
  Wifi,
  Gift,
  Search,
  Wallet,
  Package,
  DollarSign,
  Shield
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useUserRole } from '@/hooks/useUserRole';
import { useIsMobile } from '@/hooks/use-mobile';
import { ScrollArea } from '@/components/ui/scroll-area';

interface DashboardSidebarProps {
  activeService: string;
  onServiceChange: (service: string) => void;
}

const DashboardSidebar = ({ activeService, onServiceChange }: DashboardSidebarProps) => {
  const [collapsed, setCollapsed] = useState(false);
  const { isAdmin } = useUserRole();
  const isMobile = useIsMobile();

  const userServices = [
    { id: 'overview', name: 'Overview', icon: Home },
    { id: 'my-services', name: 'My Services', icon: Package },
    { id: 'pricing', name: 'Pricing', icon: DollarSign },
    { id: 'wallet', name: 'Digital Wallet', icon: Wallet },
    { id: 'company', name: 'Company Formation', icon: Building2 },
    { id: 'domain', name: 'Domain Registration', icon: Globe },
    { id: 'hosting', name: 'Web Hosting', icon: Server },
    { id: 'email', name: 'Business Email', icon: Mail },
    { id: 'website', name: 'Website Platform', icon: TrendingUp },
    { id: 'mobile', name: 'Mobile Application', icon: Smartphone },
    { id: 'banking', name: 'Business Banking', icon: CreditCard },
    { id: 'virtualcards', name: 'Virtual Cards', icon: CreditCard },
    { id: 'esim', name: 'eSIM Cards', icon: Wifi },
    { id: 'giftcards', name: 'Gift Cards', icon: Gift },
    { id: 'seo-optimization', name: 'SEO & Optimization', icon: Search },
    { id: 'analytics', name: 'Analytics', icon: BarChart3 },
    { id: 'documents', name: 'Documents', icon: FileText },
    { id: 'settings', name: 'Settings', icon: Settings }
  ];

  const adminServices = [
    { id: 'admin-overview', name: 'Admin Overview', icon: Shield },
    { id: 'user-management', name: 'User Management', icon: Users },
    { id: 'service-management', name: 'Service Management', icon: Settings },
    { id: 'all-services', name: 'All Services', icon: Package },
  ];

  const services = isAdmin ? [...adminServices, ...userServices] : userServices;
  const showCollapsed = !isMobile && collapsed;

  return (
    <div className={cn(
      "bg-card border-r border-border h-full transition-all duration-300 flex flex-col",
      showCollapsed ? "w-16" : "w-full lg:w-64"
    )}>
      <div className="p-3 sm:p-4 border-b border-border shrink-0">
        <div className="flex items-center justify-between">
          {!showCollapsed && (
            <h2 className="text-base sm:text-lg font-semibold">Dashboard</h2>
          )}
          {!isMobile && (
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setCollapsed(!collapsed)}
              className="ml-auto shrink-0"
            >
              {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
            </Button>
          )}
        </div>
      </div>

      <ScrollArea className="flex-1">
        <nav className="p-2 sm:p-4 space-y-1 sm:space-y-2">
          {isAdmin && !showCollapsed && (
            <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider px-3 py-2">
              Admin
            </div>
          )}
          {isAdmin && adminServices.map((service) => {
            const Icon = service.icon;
            return (
              <Button
                key={service.id}
                variant={activeService === service.id ? "default" : "ghost"}
                className={cn(
                  "w-full justify-start h-10 sm:h-auto",
                  showCollapsed && "px-3 justify-center"
                )}
                onClick={() => onServiceChange(service.id)}
              >
                <Icon className="w-4 h-4 sm:w-5 sm:h-5 shrink-0" />
                {!showCollapsed && <span className="ml-2 sm:ml-3 text-sm">{service.name}</span>}
              </Button>
            );
          })}
          
          {isAdmin && !showCollapsed && (
            <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider px-3 py-2 mt-4">
              User Dashboard
            </div>
          )}
          {userServices.map((service) => {
            const Icon = service.icon;
            return (
              <Button
                key={service.id}
                variant={activeService === service.id ? "default" : "ghost"}
                className={cn(
                  "w-full justify-start h-10 sm:h-auto",
                  showCollapsed && "px-3 justify-center"
                )}
                onClick={() => onServiceChange(service.id)}
              >
                <Icon className="w-4 h-4 sm:w-5 sm:h-5 shrink-0" />
                {!showCollapsed && <span className="ml-2 sm:ml-3 text-sm">{service.name}</span>}
              </Button>
            );
          })}
        </nav>
      </ScrollArea>
    </div>
  );
};

export default DashboardSidebar;
