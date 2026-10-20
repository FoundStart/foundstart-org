import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/contexts/AuthProvider';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';
import { useL } from '@/hooks/useL';

const AccountSettings = () => {
  const L = useL();
  const { user } = useAuth();
  const [name, setName] = useState<string>(user?.user_metadata?.full_name || '');
  const [saving, setSaving] = useState(false);

  const save = async () => {
    setSaving(true);
    const { error } = await supabase.auth.updateUser({ data: { full_name: name.trim() } });
    setSaving(false);
    if (error) toast({ title: L('Could not save', 'تعذر الحفظ'), description: error.message, variant: 'destructive' });
    else toast({ title: L('Saved', 'تم الحفظ') });
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight lg:text-3xl">{L('Account Settings', 'إعدادات الحساب')}</h1>
        <p className="text-muted-foreground">{L('Manage your account preferences', 'إدارة تفضيلات حسابك')}</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>{L('Profile Information', 'معلومات الملف الشخصي')}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>{L('Email', 'البريد الإلكتروني')}</Label>
            <Input value={user?.email || ''} disabled dir="ltr" />
          </div>
          <div className="space-y-2">
            <Label>{L('Full Name', 'الاسم الكامل')}</Label>
            <Input placeholder={L('Enter your name', 'اكتب اسمك')} value={name} onChange={(e) => setName(e.target.value)} />
          </div>
          <Button onClick={save} disabled={saving}>{saving ? L('Saving...', 'جاري الحفظ...') : L('Save Changes', 'حفظ التغييرات')}</Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default AccountSettings;
