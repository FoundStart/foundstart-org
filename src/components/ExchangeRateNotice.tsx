import { useCurrency } from '@/contexts/CurrencyContext';
import { useTranslation } from '@/contexts/TranslationContext';
export default function ExchangeRateNotice() {
  const { rateReady, rateUpdated, rates } = useCurrency();
  const { language } = useTranslation();
  const ar = language === 'ar';
  return <aside className="my-4 rounded-lg border bg-muted/30 p-4 text-sm leading-relaxed" data-testid="exchange-rate-notice" dir={ar ? 'rtl' : 'ltr'}>
    {rateReady && rateUpdated ? <>
      <p>{ar ? 'تحويل استرشادي يومي بدون هامش إضافي، وليس عرض دفع نهائيا.' : 'Indicative daily conversion with no added margin, not a final payment quote.'}</p>
      <p><bdi>1 USD = {rates.EGP.toFixed(6)} EGP</bdi> · {ar ? 'تحديث المصدر:' : 'Source updated:'} <bdi>{new Date(rateUpdated).toLocaleString(ar ? 'ar-EG' : 'en-GB', { timeZone: 'Africa/Cairo', dateStyle: 'medium', timeStyle: 'short' })}</bdi> {ar ? '(القاهرة)' : '(Cairo)'}</p>
    </> : <p>{ar ? 'سعر الصرف اليومي غير متاح أو انتهت صلاحيته. تظهر الأسعار بعملتها الأصلية بدلا من استخدام تحويل قديم.' : 'The daily exchange rate is unavailable or stale. Prices stay in their original currency instead of using an old conversion.'}</p>}
    <p>{ar ? 'الدفع عبر Stripe ما زال بالدولار. EasyKash غير مفعل حاليا. الرسوم الحكومية والتجديدات منفصلة.' : 'Stripe checkout remains in USD. EasyKash is not active yet. Government fees and renewals are separate.'}</p>
    <a className="underline" href="https://www.exchangerate-api.com" target="_blank" rel="noopener noreferrer">Rates By Exchange Rate API</a>
  </aside>;
}
