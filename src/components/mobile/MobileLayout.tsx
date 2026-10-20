import React from 'react';
import { cn } from '@/lib/utils';
import MobileHeader from './MobileHeader';

interface MobileLayoutProps {
  children: React.ReactNode;
  title?: string;
  showBack?: boolean;
  showBottomNav?: boolean;
  className?: string;
}

const MobileLayout = ({ 
  children, 
  title, 
  showBack = false, 
  showBottomNav = true,
  className 
}: MobileLayoutProps) => {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <MobileHeader title={title} showBack={showBack} />
      <main className={cn(
        "flex-1 pt-16 overflow-x-hidden",
        className
      )}>
        {children}
      </main>
    </div>
  );
};

export default MobileLayout;
