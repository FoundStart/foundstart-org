
import { Home, Building, Users, Phone, User } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { useTranslation } from '@/contexts/TranslationContext';

const MobileBottomNav = () => {
  const location = useLocation();
  const { t, isRTL } = useTranslation();
  
  const navItems = [
    { icon: Home, label: t.home, path: '/' },
    { icon: Building, label: t.countries, path: '/countries' },
    { icon: Users, label: t.partners, path: '/partners' },
    { icon: Phone, label: t.services, path: '/services' },
    { icon: User, label: t.auth, path: '/auth' }
  ];

  return (
    <div className={`fixed bottom-0 left-0 right-0 z-50 bg-background border-t border-border md:hidden ${isRTL ? 'flex-row-reverse' : ''}`}>
      <div className={`flex items-center justify-around py-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          
          return (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "flex flex-col items-center justify-center p-2 min-w-0 flex-1 text-xs transition-colors",
                isActive 
                  ? "text-primary" 
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              <Icon className={cn("w-5 h-5 mb-1", isActive && "text-primary")} />
              <span className="truncate">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default MobileBottomNav;
