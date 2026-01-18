import { useEffect, useState, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface DomainInquiry {
  id: string;
  domain_name: string;
  name: string;
  email: string;
  phone: string | null;
  message: string | null;
  status: string;
  created_at: string;
  updated_at: string;
}

export function useRealtimeNotifications() {
  const [newInquiries, setNewInquiries] = useState<DomainInquiry[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const { toast } = useToast();

  const clearNotifications = useCallback(() => {
    setNewInquiries([]);
    setUnreadCount(0);
  }, []);

  const markAsRead = useCallback((id: string) => {
    setNewInquiries(prev => prev.filter(inquiry => inquiry.id !== id));
    setUnreadCount(prev => Math.max(0, prev - 1));
  }, []);

  useEffect(() => {
    // Subscribe to real-time changes on domain_inquiries table
    const channel = supabase
      .channel('domain-inquiries-realtime')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'domain_inquiries'
        },
        (payload) => {
          const newInquiry = payload.new as DomainInquiry;
          
          // Add to new inquiries list
          setNewInquiries(prev => [newInquiry, ...prev]);
          setUnreadCount(prev => prev + 1);

          // Show toast notification
          toast({
            title: "🌐 New Domain Inquiry!",
            description: `${newInquiry.name} inquired about ${newInquiry.domain_name}`,
          });

          // Play notification sound (if browser supports it)
          try {
            const audio = new Audio('/notification.mp3');
            audio.volume = 0.3;
            audio.play().catch(() => {
              // Silently fail if autoplay is blocked
            });
          } catch (e) {
            // Ignore audio errors
          }

          // Request browser notification permission and show notification
          if ('Notification' in window && Notification.permission === 'granted') {
            new Notification('New Domain Inquiry', {
              body: `${newInquiry.name} inquired about ${newInquiry.domain_name}`,
              icon: '/favicon.ico',
              tag: `inquiry-${newInquiry.id}`,
            });
          }
        }
      )
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'domain_inquiries'
        },
        (payload) => {
          const updatedInquiry = payload.new as DomainInquiry;
          
          // Update in list if it exists
          setNewInquiries(prev => 
            prev.map(inquiry => 
              inquiry.id === updatedInquiry.id ? updatedInquiry : inquiry
            )
          );
        }
      )
      .subscribe();

    // Request notification permission on mount
    if ('Notification' in window && Notification.permission === 'default') {
      Notification.requestPermission();
    }

    return () => {
      supabase.removeChannel(channel);
    };
  }, [toast]);

  return {
    newInquiries,
    unreadCount,
    clearNotifications,
    markAsRead,
  };
}
