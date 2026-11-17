import { useL } from '@/hooks/useL';
export default function QuillBotStatus({ name }: { name: string }) {
  const L = useL();
  if (name.trim().toLowerCase() !== 'quillbot') return null;
  return <p data-quillbot-status className="mt-3 rounded-md border border-amber-500/40 bg-amber-500/10 p-3 text-xs leading-relaxed text-foreground">{L("Legacy referral link: current earning approval and commission tracking are not verified. QuillBot's affiliate program now uses Impact.","رابط إحالة قديم: لم نتحقق من الموافقة الحالية على الأرباح أو تتبع العمولة عبر هذا الرابط. برنامج QuillBot للتسويق بالعمولة يستخدم Impact الآن.")}<span className="mt-1 block text-muted-foreground">{L('Resource listing, not a verified earning partnership.', 'إدراج مورد، وليس شراكة أرباح تم التحقق منها.')}</span></p>;
}
