import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthProvider';
import { useToast } from '@/hooks/use-toast';
import { useL } from '@/hooks/useL';
import { ListChecks } from 'lucide-react';

const STEPS: { key: string; en: string; ar: string }[] = [
  { key: 'choose_country', en: 'Choose a country', ar: 'اختار الدولة' },
  { key: 'choose_entity', en: 'Choose an entity type', ar: 'اختار نوع الكيان القانوني' },
  { key: 'submit_application', en: 'Submit the formation application', ar: 'قدّم طلب التأسيس' },
  { key: 'pay_fees', en: 'Pay the required fees', ar: 'ادفع الرسوم المطلوبة' },
  { key: 'receive_docs', en: 'Receive the formation documents', ar: 'استلم مستندات التأسيس' },
  { key: 'tax_id', en: 'Get a tax ID (if applicable)', ar: 'استخرج الرقم الضريبي (لو ينطبق)' },
  { key: 'bank_account', en: 'Open a business bank account (if applicable)', ar: 'افتح حساب بنكي للشركة (لو ينطبق)' },
];

interface Company { id: string; company_name: string }
interface Row { id: string; step_key: string; done: boolean }

const FormationChecklist = () => {
  const L = useL();
  const { user } = useAuth();
  const { toast } = useToast();
  const [companies, setCompanies] = useState<Company[]>([]);
  const [companyId, setCompanyId] = useState<string>('');
  const [rows, setRows] = useState<Row[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    (async () => {
      const { data } = await supabase.from('companies').select('id, company_name').eq('user_id', user.id).order('created_at', { ascending: false });
      setCompanies(data || []);
      if (data && data.length) setCompanyId(data[0].id);
      setLoading(false);
    })();
  }, [user]);

  useEffect(() => {
    if (!user || !companyId) return;
    (async () => {
      const { data: existing } = await supabase.from('formation_checklist').select('id, step_key, done').eq('company_id', companyId);
      const have = new Set((existing || []).map((r) => r.step_key));
      const missing = STEPS.filter((s) => !have.has(s.key)).map((s) => ({ company_id: companyId, user_id: user.id, step_key: s.key }));
      if (missing.length) await supabase.from('formation_checklist').upsert(missing, { onConflict: 'company_id,step_key' });
      const { data } = await supabase.from('formation_checklist').select('id, step_key, done').eq('company_id', companyId);
      setRows(data || []);
    })();
  }, [user, companyId]);

  const toggle = async (row: Row) => {
    const done = !row.done;
    setRows((rs) => rs.map((r) => (r.id === row.id ? { ...r, done } : r)));
    const { error } = await supabase.from('formation_checklist').update({ done, updated_at: new Date().toISOString() }).eq('id', row.id);
    if (error) {
      setRows((rs) => rs.map((r) => (r.id === row.id ? { ...r, done: !done } : r)));
      toast({ title: 'Error', description: error.message, variant: 'destructive' });
    }
  };

  const doneCount = rows.filter((r) => r.done).length;
  const pct = rows.length ? Math.round((doneCount / rows.length) * 100) : 0;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2"><ListChecks className="h-5 w-5" /> {L('Formation Checklist', 'قائمة خطوات التأسيس')}</CardTitle>
        <CardDescription>{L('Track the steps of your company formation. This is a general guide - the steps, their order and which ones apply vary by country and entity type. Only your own checked progress is saved.', 'تابع خطوات تأسيس شركتك. دي قائمة استرشادية عامة - الخطوات وترتيبها وانطباقها بيختلف حسب الدولة ونوع الشركة. اللي بيتحفظ هو تقدمك اللي بتعلّمه بنفسك بس.')}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {loading ? null : companies.length === 0 ? (
          <div className="text-center py-8 space-y-3">
            <p className="text-muted-foreground">{L('No companies yet. Start a new formation to track its steps here.', 'لسه مفيش شركات. ابدأ تأسيس جديد عشان تتابع خطواته هنا.')}</p>
            <Button asChild><Link to="/dashboard/formation">{L('New Formation', 'تأسيس جديد')}</Link></Button>
          </div>
        ) : (
          <>
            {companies.length > 1 && (
              <Select value={companyId} onValueChange={setCompanyId}>
                <SelectTrigger className="max-w-xs"><SelectValue placeholder={L('Company', 'الشركة')} /></SelectTrigger>
                <SelectContent>
                  {companies.map((c) => <SelectItem key={c.id} value={c.id}>{c.company_name}</SelectItem>)}
                </SelectContent>
              </Select>
            )}
            <div className="flex items-center gap-3">
              <Progress value={pct} className="flex-1" />
              <span className="text-sm text-muted-foreground">{doneCount}/{rows.length} {L('done', 'منجزة')}</span>
            </div>
            <ul className="space-y-2">
              {STEPS.map((s) => {
                const row = rows.find((r) => r.step_key === s.key);
                return (
                  <li key={s.key} className="flex items-center gap-3 rounded-md border p-3">
                    <Checkbox checked={!!row?.done} disabled={!row} onCheckedChange={() => row && toggle(row)} id={`step-${s.key}`} />
                    <label htmlFor={`step-${s.key}`} className={row?.done ? 'line-through text-muted-foreground cursor-pointer' : 'cursor-pointer'}>{L(s.en, s.ar)}</label>
                  </li>
                );
              })}
            </ul>
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default FormationChecklist;
