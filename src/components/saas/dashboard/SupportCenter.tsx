import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { HelpCircle, MessageCircle, Send } from 'lucide-react';

const SupportCenter = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight lg:text-3xl">Support Center</h1>
        <p className="text-muted-foreground">Get help with your account</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Create Support Ticket</CardTitle>
          <CardDescription>Describe your issue and we'll get back to you</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Input placeholder="Subject" />
          <Textarea placeholder="Describe your issue..." rows={5} />
          <Button><Send className="mr-2 h-4 w-4" />Submit Ticket</Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Your Tickets</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground text-center py-8">No support tickets yet.</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default SupportCenter;
