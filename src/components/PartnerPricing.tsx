import { getPartnerPricing } from '@/data/partnerPricing';


const PartnerPricing = ({ countryId, partnerName, isRTL }: { countryId: string; partnerName: string; isRTL: boolean }) => {
  const p = getPartnerPricing(countryId, partnerName);
  if (!p) return null;
  const lines = isRTL ? p.ar : p.en;
  return (
    <div className="space-y-1.5 text-xs text-muted-foreground" dir={isRTL ? 'rtl' : 'ltr'}>
      {lines.map((l) => (
        <p key={l} className="leading-snug">- {l}</p>
      ))}
      <a href={p.source} target="_blank" rel="noopener noreferrer" className="block text-[10px] underline opacity-60 hover:opacity-100">{isRTL ? 'المصدر: صفحة أسعار الشريك' : 'Source: partner pricing page'}</a>
    </div>
  );
};
export default PartnerPricing;
