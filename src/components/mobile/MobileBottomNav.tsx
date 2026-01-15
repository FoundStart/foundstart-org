import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Globe, Users, Globe2, Briefcase, Heart } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useDomainFavorites } from '@/hooks/useDomainFavorites';

const MobileBottomNav = () => {
  const location = useLocation();
  const { favorites } = useDomainFavorites();

  const navItems = [
    { 
      icon: Home, 
      label: 'Home', 
      href: '/', 
      isActive: location.pathname === '/' 
    },
    { 
      icon: Globe, 
      label: 'Countries', 
      href: '/countries', 
      isActive: location.pathname === '/countries' 
    },
    { 
      icon: Globe2, 
      label: 'Domains', 
      href: '/domains', 
      isActive: location.pathname === '/domains'
    },
    { 
      icon: Users, 
      label: 'Partners', 
      href: '/digital-partners', 
      isActive: location.pathname.includes('/partners'),
    },
    { 
      icon: Heart, 
      label: 'Wishlist', 
      href: '/domain-wishlist', 
      isActive: location.pathname === '/domain-wishlist',
      badge: favorites.length > 0 ? favorites.length : undefined
    },
  ];

  return (
    <nav 
      className="lg:hidden fixed bottom-0 left-0 right-0 bg-background/95 backdrop-blur-lg border-t border-border z-50 safe-area-bottom"
      role="navigation"
      aria-label="Mobile navigation"
    >
      <ul className="flex items-center justify-around h-16 px-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <li key={item.href} className="flex-1">
              <Link
                to={item.href}
                className={cn(
                  "flex flex-col items-center justify-center py-2 px-1 rounded-xl transition-all touch-manipulation",
                  item.isActive 
                    ? "text-primary bg-primary/10" 
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                )}
                aria-current={item.isActive ? "page" : undefined}
              >
                <div className="relative">
                  <Icon className={cn("w-5 h-5", item.isActive && "text-primary")} />
                  {item.badge && (
                    <span className="absolute -top-2 -right-2 bg-destructive text-destructive-foreground text-[10px] font-bold rounded-full min-w-[18px] h-[18px] flex items-center justify-center">
                      {item.badge > 9 ? '9+' : item.badge}
                    </span>
                  )}
                </div>
                <span className={cn(
                  "text-[10px] mt-1 font-medium",
                  item.isActive && "text-primary"
                )}>
                  {item.label}
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default MobileBottomNav;
