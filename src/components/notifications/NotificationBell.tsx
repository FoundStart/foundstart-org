import React, { useState } from 'react';
import { Bell, X, Globe, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useRealtimeNotifications, DomainInquiry } from '@/hooks/useRealtimeNotifications';
import { formatDistanceToNow } from 'date-fns';
import { Link } from 'react-router-dom';

const NotificationBell = () => {
  const { newInquiries, unreadCount, clearNotifications, markAsRead } = useRealtimeNotifications();
  const [open, setOpen] = useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="w-5 h-5" />
          {unreadCount > 0 && (
            <Badge 
              variant="destructive" 
              className="absolute -top-1 -right-1 h-5 min-w-5 flex items-center justify-center p-0 text-xs"
            >
              {unreadCount > 9 ? '9+' : unreadCount}
            </Badge>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-0" align="end">
        <div className="flex items-center justify-between p-3 border-b">
          <h4 className="font-semibold text-sm">Notifications</h4>
          {unreadCount > 0 && (
            <Button 
              variant="ghost" 
              size="sm" 
              className="text-xs h-7"
              onClick={clearNotifications}
            >
              Clear all
            </Button>
          )}
        </div>
        
        <ScrollArea className="max-h-80">
          {newInquiries.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-8 text-muted-foreground">
              <Bell className="w-8 h-8 mb-2 opacity-50" />
              <p className="text-sm">No new notifications</p>
            </div>
          ) : (
            <div className="divide-y">
              {newInquiries.map((inquiry) => (
                <Link
                  key={inquiry.id}
                  to="/admin/domain-inquiries"
                  onClick={() => {
                    markAsRead(inquiry.id);
                    setOpen(false);
                  }}
                  className="block p-3 hover:bg-muted/50 transition-colors"
                >
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                      <Globe className="w-4 h-4 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">
                        {inquiry.domain_name}
                      </p>
                      <p className="text-xs text-muted-foreground truncate">
                        {inquiry.name} • {inquiry.email}
                      </p>
                      <div className="flex items-center gap-1 mt-1 text-xs text-muted-foreground">
                        <Clock className="w-3 h-3" />
                        {formatDistanceToNow(new Date(inquiry.created_at), { addSuffix: true })}
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-6 w-6 shrink-0"
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        markAsRead(inquiry.id);
                      }}
                    >
                      <X className="w-3 h-3" />
                    </Button>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </ScrollArea>

        {newInquiries.length > 0 && (
          <div className="p-2 border-t">
            <Link
              to="/admin/domain-inquiries"
              onClick={() => setOpen(false)}
              className="block w-full"
            >
              <Button variant="outline" size="sm" className="w-full text-xs">
                View all inquiries
              </Button>
            </Link>
          </div>
        )}
      </PopoverContent>
    </Popover>
  );
};

export default NotificationBell;
