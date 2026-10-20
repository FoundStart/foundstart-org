import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { useAuth } from '@/contexts/AuthProvider';
import { useTranslation } from '@/contexts/TranslationContext';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';
import { useL } from '@/hooks/useL';

const COUNTRIES = [
  'Egypt', 'Saudi Arabia', 'United Arab Emirates', 'Kuwait', 'Qatar', 'Bahrain', 'Oman', 'Jordan', 'Lebanon', 'Morocco', 'Algeria', 'Tunisia', 'Libya', 'Iraq',
  'United States', 'United Kingdom', 'Canada', 'Germany', 'France', 'Turkey', 'India', 'Pakistan', 'Other',
];
const COUNTRIES_AR: Record<string, string> = {
  'Egypt': 'مصر', 'Saudi Arabia': 'السعودية', 'United Arab Emirates': 'الإمارات', 'Kuwait': 'الكويت', 'Qatar': 'قطر', 'Bahrain': 'البحرين', 'Oman': 'عُمان', 'Jordan': 'الأردن', 'Lebanon': 'لبنان',
  'Morocco': 'المغرب', 'Algeria': 'الجزائر', 'Tunisia': 'تونس', 'Libya': 'ليبيا', 'Iraq': 'العراق', 'United States': 'الولايات المتحدة', 'United Kingdom': 'المملكة المتحدة', 'Canada': 'كندا',
  'Germany': 'ألمانيا', 'France': 'فرنسا', 'Turkey': 'تركيا', 'India': 'الهند', 'Pakistan': 'باكستان', 'Other': 'أخرى',
};

const AccountSettings = () => {
  const L = useL();
  const { user } = useAuth();
  const { language, setLanguage } = useTranslation();
  const md = (user?.user_metadata || {}) as Record<string, any>;

  const [name, setName] = useState<string>(md.full_name || '');
  const [phone, setPhone] = useState<string>(md.phone_number || '');
  const [country, setCountry] = useState<string>(md.country || '');
  const [notifOrders, setNotifOrders] = useState<boolean>(md.notify_orders ?? true);
  const [notifProduct, setNotifProduct] = useState<boolean>(md.notify_news ?? false);
  const [saving, setSaving] = useState(false);

  const [pw, setPw] = useState('');
  const [pw2, setPw2] = useState('');
  const [pwSaving, setPwSaving] = useState(false);

  const [delPending, setDelPending] = useState(false);
  const [delConfirm, setDelConfirm] = useState(false);
  const [delBusy, setDelBusy] = useState(false);

  useEffect(() => {
    if (!user) return;
    supabase.from('account_deletion_requests' as any).select('id').eq('user_id', user.id).eq('status', 'pending').limit(1)
      .then(({ data }) => setDelPending(!!(data && data.length)));
  }, [user]);

  const fail = (e: { message: string }) => toast({ title: L('Could not save', 'تعذر الحفظ'), description: e.message, variant: 'destructive' });

  const save = async () => {
    setSaving(true);
    const { error } = await supabase.auth.updateUser({
      data: { full_name: name.trim(), phone_number: phone.trim(), country, notify_orders: notifOrders, notify_news: notifProduct, language },
    });
    if (!error && user) await supabase.from('profiles').update({ full_name: name.trim() }).eq('user_id', user.id);
    setSaving(false);
    if (error) fail(error); else toast({ title: L('Saved', 'تم الحفظ') });
  };

  const changePassword = async () => {
    if (pw.length < 8) return toast({ title: L('Password must be at least 8 characters', 'كلمة المرور 8 أحرف على الأقل'), variant: 'destructive' });
    if (pw !== pw2) return toast({ title: L('Passwords do not match', 'كلمتا المرور غير متطابقتين'), variant: 'destructive' });
    setPwSaving(true);
    const { error } = await supabase.auth.updateUser({ password: pw });
    setPwSaving(false);
    if (error) return fail(error);
    setPw(''); setPw2('');
    toast({ title: L('Password updated', 'تم تحديث كلمة المرور') });
  };

  const requestDelete = async () => {
    if (!user) return;
    setDelBusy(true);
    const { error } = await supabase.from('account_deletion_requests' as any).insert({ user_id: user.id } as any);
    setDelBusy(false);
    if (error) return fail(error);
    setDelPending(true); setDelConfirm(false);
    toast({ title: L('Deletion request received', 'تم استلام طلب الحذف') });
  };

  const isGoogleOnly = (user?.app_metadata as any)?.provider === 'google';

  return (
    <div className="space-y-6 max-w-3xl">
      <div>
        <h1 className="text-2xl font-bold tracking-tight lg:text-3xl">{L('Account Settings', 'إعدادات الحساب')}</h1>
        <p className="text-muted-foreground">{L('Manage your profile, language and security', 'إدارة ملفك الشخصي واللغة والأمان')}</p>
      </div>

      <Card>
        <CardHeader><CardTitle>{L('Profile', 'الملف الشخصي')}</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>{L('Email', 'البريد الإلكتروني')}</Label>
            <Input value={user?.email || ''} disabled dir="ltr" />
          </div>
          <div className="space-y-2">
            <Label>{L('Full Name', 'الاسم الكامل')}</Label>
            <Input placeholder={L('Enter your name', 'اكتب اسمك')} value={name} onChange={e => setName(e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label>{L('Phone (with country code)', 'رقم الهاتف (مع كود الدولة)')}</Label>
            <Input placeholder="+20 100 000 0000" value={phone} onChange={e => setPhone(e.target.value)} dir="ltr" inputMode="tel" />
          </div>
          <div className="space-y-2">
            <Label>{L('Country of residence', 'بلد الإقامة')}</Label>
            <select value={country} onChange={e => setCountry(e.target.value)} className="h-10 w-full rounded-md border bg-background px-3 text-sm">
              <option value="">{L('Select country', 'اختر الدولة')}</option>
              {COUNTRIES.map(c => <option key={c} value={c}>{language === 'ar' ? COUNTRIES_AR[c] : c}</option>)}
            </select>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle>{L('Language', 'اللغة')}</CardTitle></CardHeader>
        <CardContent className="flex gap-2">
          <Button variant={language === 'en' ? 'default' : 'outline'} onClick={() => setLanguage('en')}>English</Button>
          <Button variant={language === 'ar' ? 'default' : 'outline'} onClick={() => setLanguage('ar')}>العربية</Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>{L('Email notifications', 'إشعارات البريد')}</CardTitle>
          <CardDescription>{L('Choose which emails you receive.', 'اختر الرسائل التي تصلك.')}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between gap-4">
            <div><div className="font-medium">{L('Orders and payments', 'الطلبات والمدفوعات')}</div><div className="text-sm text-muted-foreground">{L('Status updates for your company formation.', 'تحديثات حالة تأسيس شركتك.')}</div></div>
            <Switch checked={notifOrders} onCheckedChange={setNotifOrders} />
          </div>
          <div className="flex items-center justify-between gap-4">
            <div><div className="font-medium">{L('News and tips', 'أخبار ونصائح')}</div><div className="text-sm text-muted-foreground">{L('Occasional updates from FoundStart.', 'تحديثات من FoundStart من وقت لآخر.')}</div></div>
            <Switch checked={notifProduct} onCheckedChange={setNotifProduct} />
          </div>
        </CardContent>
      </Card>

      <Button onClick={save} disabled={saving}>{saving ? L('Saving...', 'جاري الحفظ...') : L('Save Changes', 'حفظ التغييرات')}</Button>

      <Card>
        <CardHeader><CardTitle>{L('Password', 'كلمة المرور')}</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          {isGoogleOnly && <p className="text-sm text-muted-foreground">{L('You signed in with Google. You can still set a password here.', 'سجلت الدخول بحساب جوجل. يمكنك أيضاً تعيين كلمة مرور هنا.')}</p>}
          <div className="space-y-2"><Label>{L('New password', 'كلمة المرور الجديدة')}</Label><Input type="password" value={pw} onChange={e => setPw(e.target.value)} autoComplete="new-password" dir="ltr" /></div>
          <div className="space-y-2"><Label>{L('Confirm new password', 'تأكيد كلمة المرور')}</Label><Input type="password" value={pw2} onChange={e => setPw2(e.target.value)} autoComplete="new-password" dir="ltr" /></div>
          <Button variant="outline" onClick={changePassword} disabled={pwSaving || !pw}>{pwSaving ? L('Updating...', 'جاري التحديث...') : L('Update password', 'تحديث كلمة المرور')}</Button>
        </CardContent>
      </Card>

      <Card className="border-destructive/40">
        <CardHeader>
          <CardTitle className="text-destructive">{L('Delete account', 'حذف الحساب')}</CardTitle>
          <CardDescription>{L('Send a request to delete your account and data. We review it and confirm by email. Paid orders may need to be kept for legal and accounting reasons.', 'أرسل طلباً لحذف حسابك وبياناتك. نراجعه ونؤكد عبر البريد. قد نحتفظ بالطلبات المدفوعة لأسباب قانونية ومحاسبية.')}</CardDescription>
        </CardHeader>
        <CardContent>
          {delPending ? (
            <p className="text-sm">{L('Your deletion request is pending.', 'طلب حذف حسابك قيد المراجعة.')}</p>
          ) : !delConfirm ? (
            <Button variant="outline" className="border-destructive text-destructive" onClick={() => setDelConfirm(true)}>{L('Request account deletion', 'طلب حذف الحساب')}</Button>
          ) : (
            <div className="flex flex-wrap gap-2">
              <Button variant="destructive" onClick={requestDelete} disabled={delBusy}>{L('Yes, request deletion', 'نعم، اطلب الحذف')}</Button>
              <Button variant="outline" onClick={() => setDelConfirm(false)}>{L('Cancel', 'إلغاء')}</Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default AccountSettings;
