import ExchangeRateNotice from '@/components/ExchangeRateNotice';
import { Link } from 'react-router-dom';
import { useL } from '@/hooks/useL';

export default function FormationScope() {
  const L = useL();
  return <section className="my-8 rounded-xl border bg-muted/30 p-5 sm:p-6 text-start" aria-label={L('Formation scope before payment', 'نطاق التأسيس قبل الدفع')}>
    <ExchangeRateNotice /><h2 className="text-xl font-bold mb-3">{L('Confirm the full scope before paying', 'أكد نطاق الخدمة بالكامل قبل الدفع')}</h2>
    <p className="text-sm leading-relaxed mb-4">{L('The USD base prices and indicative conversions are FoundStart service fees, not an all-in state filing quote. Government, registry and notary charges, where applicable, are separate. The calculator and dashboard amount do not calculate those charges or annual renewals.', 'الأسعار الأساسية بالدولار والتحويلات الاسترشادية هي أتعاب خدمة FoundStart، وليست عرضا شاملا لرسوم تسجيل الولاية. الرسوم الحكومية ورسوم السجل والتوثيق، إن وجدت، منفصلة. مبلغ الحاسبة ولوحة التحكم لا يحسب هذه الرسوم أو التجديدات السنوية.')}</p>
    <ul className="list-disc ps-5 space-y-2 text-sm leading-relaxed">
      <li>{L('For the US, confirm the state, entity type, filing fees and first-year versus renewal costs. The current online form selects a country and entity type, not a US state-specific package.', 'لأمريكا، أكد الولاية ونوع الكيان ورسوم الإيداع وتكلفة السنة الأولى مقابل التجديد. النموذج الحالي يختار الدولة ونوع الكيان، وليس باكدج خاصة بولاية أمريكية.')}</li>
      <li>{L('Ask which items are included: EIN, registered agent, registered address, Operating Agreement, mail handling, US phone number and bank-application guidance. Their mention in a guide or partner listing does not include them in the direct service fee. Bank approval is not guaranteed.', 'اسأل عن المشمول: EIN والوكيل المسجل والعنوان المسجل واتفاقية التشغيل واستلام البريد ورقم هاتف أمريكي وإرشادات طلب الحساب البنكي. ذكرها في دليل أو عرض شريك لا يجعلها مشمولة في أتعاب الخدمة المباشرة. قبول البنك غير مضمون.')}</li>
      <li>{L('Before payment, obtain written confirmation of who files the application, the required documents, when the delivery period starts, exclusions and refund or cancellation terms. A dashboard entry or payment receipt is not proof of incorporation.', 'قبل الدفع، احصل على تأكيد مكتوب بمن يقدم الطلب والمستندات المطلوبة وبداية مدة التنفيذ والاستثناءات وشروط الاسترداد أو الإلغاء. ظهور طلب في اللوحة أو إيصال دفع ليس دليلا على تأسيس الشركة.')}</li>
      <li>{L('Partner services have their own contract, prices and support. Compare the named provider and its current terms before leaving FoundStart.', 'خدمات الشركاء لها عقود وأسعار ودعم خاص بها. راجع مقدم الخدمة المحدد وشروطه الحالية قبل الانتقال من FoundStart.')}</li>
    </ul>
    <p className="mt-4 text-sm leading-relaxed">{L('The direct-service inclusion, renewal and refund schedule is not fully specified on this page. Do not assume an item is included. Ask for clarification before payment.', 'جدول مشمولات الخدمة المباشرة والتجديد والاسترداد غير محدد بالكامل في هذه الصفحة. لا تفترض شمول أي بند؛ اطلب توضيحا قبل الدفع.')}</p>
    <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-sm"><Link className="underline" to="/contact-sales">{L('Ask about your package', 'اسأل عن باكدج شركتك')}</Link><Link className="underline" to="/terms-of-service">{L('Terms of Service', 'شروط الخدمة')}</Link><Link className="underline" to="/who-we-are">{L('About FoundStart', 'عن FoundStart')}</Link></div>
  </section>;
}
