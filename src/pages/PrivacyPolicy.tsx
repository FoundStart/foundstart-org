import LegalPage from '@/components/legal/LegalPage';

const PrivacyPolicy = () => (
  <LegalPage
    path="/privacy-policy"
    title={['Privacy Policy', 'سياسة الخصوصية']}
    updated={['Last updated: October 18, 2026', 'آخر تحديث: 18 أكتوبر 2026']}
    intro={[
      'This policy explains what personal data FoundStart collects when you use foundstart.org, why we collect it, who we share it with, and the choices you have.',
      'توضح هذه السياسة البيانات الشخصية التي يجمعها FoundStart عند استخدامك موقع foundstart.org، ولماذا نجمعها، ومع من نشاركها، وما الخيارات المتاحة لك.'
    ]}
    sections={[
      { title: ['Information we collect', 'المعلومات التي نجمعها'],
        paras: [['We collect only what we need to run the site and the services you ask for.', 'نجمع فقط ما نحتاجه لتشغيل الموقع وتقديم الخدمات التي تطلبها.']],
        items: [
          ['Account data: name, email address and sign-in details when you create an account.', 'بيانات الحساب: الاسم والبريد الإلكتروني وبيانات تسجيل الدخول عند إنشاء حساب.'],
          ['Messages and requests: what you send through our contact form, inquiry forms or WhatsApp.', 'الرسائل والطلبات: ما ترسله عبر نموذج التواصل أو نماذج الاستفسار أو واتساب.'],
          ['Business details you choose to enter, such as company name, country and the service you want.', 'بيانات النشاط التجاري التي تختار إدخالها، مثل اسم الشركة والدولة والخدمة المطلوبة.'],
          ['Technical data: browser type, device, pages visited and approximate location from your IP address.', 'بيانات تقنية: نوع المتصفح والجهاز والصفحات التي زرتها والموقع التقريبي من عنوان IP.'],
          ['Payment status: if you pay for a service, the payment provider handles your card details. We do not store full card numbers.', 'حالة الدفع: عند دفع قيمة خدمة، يتولى مزوّد الدفع بيانات بطاقتك. نحن لا نخزّن أرقام البطاقات كاملة.']
        ] },
      { title: ['How we use your information', 'كيف نستخدم معلوماتك'],
        items: [
          ['To provide and improve the site and our services.', 'لتقديم الموقع وخدماتنا وتحسينهما.'],
          ['To answer your messages and requests.', 'للرد على رسائلك وطلباتك.'],
          ['To process payments and send service-related notices.', 'لمعالجة المدفوعات وإرسال إشعارات تخص الخدمة.'],
          ['To keep the site secure and prevent abuse.', 'للحفاظ على أمان الموقع ومنع إساءة الاستخدام.'],
          ['To understand which pages are useful so we can improve them.', 'لفهم الصفحات المفيدة وتحسينها.']
        ] },
      { title: ['Who we share it with', 'مع من نشاركها'],
        paras: [['We do not sell your personal data. We share it only with providers that help us run the site, under their own terms and privacy policies:', 'نحن لا نبيع بياناتك الشخصية. نشاركها فقط مع مزوّدين يساعدوننا في تشغيل الموقع، وفق شروطهم وسياسات الخصوصية الخاصة بهم:']],
        items: [
          ['Hosting and infrastructure (Vercel).', 'الاستضافة والبنية التحتية (Vercel).'],
          ['Database and sign-in (Supabase).', 'قاعدة البيانات وتسجيل الدخول (Supabase).'],
          ['Payment providers, when you pay for a service.', 'مزوّدو الدفع، عند دفع قيمة خدمة.'],
          ['Advertising partner (Google AdSense), which may use cookies. See our Cookie Policy.', 'شريك الإعلانات (Google AdSense) وقد يستخدم الكوكيز. راجع سياسة الكوكيز.'],
          ['Partner companies you choose to start a service with, only as needed for that request.', 'الشركات الشريكة التي تختار بدء خدمة معها، وبالقدر اللازم لطلبك فقط.'],
          ['Authorities, when the law requires it.', 'الجهات الرسمية، عندما يفرض القانون ذلك.']
        ] },
      { title: ['Partner and third-party sites', 'مواقع الشركاء والأطراف الثالثة'],
        paras: [['Our pages link to partner and third-party websites. They have their own privacy practices, and this policy does not cover them. Please read their policies before sharing data with them.', 'تحتوي صفحاتنا على روابط لمواقع شركاء وأطراف ثالثة. لهذه المواقع ممارسات خصوصية خاصة بها ولا تشملها هذه السياسة. يُرجى قراءة سياساتها قبل مشاركة بياناتك معها.']] },
      { title: ['How long we keep data', 'مدة الاحتفاظ بالبيانات'],
        paras: [['We keep data only as long as needed for the purpose it was collected, or as the law requires. You can ask us to delete your data at any time.', 'نحتفظ بالبيانات للمدة اللازمة لغرض جمعها فقط، أو بحسب ما يقتضيه القانون. يمكنك طلب حذف بياناتك في أي وقت.']] },
      { title: ['Security', 'الأمان'],
        paras: [['We use reasonable technical measures, including encrypted connections (HTTPS) and access controls. No system is completely secure, so we cannot guarantee absolute security.', 'نستخدم إجراءات تقنية معقولة، منها الاتصال المشفّر (HTTPS) وضوابط الوصول. لا يوجد نظام آمن بالكامل، لذلك لا يمكننا ضمان أمان مطلق.']] },
      { title: ['Your rights', 'حقوقك'],
        paras: [['Depending on where you live, you may have the right to:', 'حسب بلد إقامتك، قد يكون لك الحق في:']],
        items: [
          ['Access the personal data we hold about you.', 'الاطلاع على بياناتك الشخصية لدينا.'],
          ['Correct data that is wrong.', 'تصحيح البيانات غير الصحيحة.'],
          ['Ask us to delete your data.', 'طلب حذف بياناتك.'],
          ['Object to or limit how we use it.', 'الاعتراض على استخدامها أو تقييده.'],
          ['Receive a copy of your data.', 'الحصول على نسخة من بياناتك.']
        ] },
      { title: ['Children', 'الأطفال'],
        paras: [['The site is not meant for people under 18, and we do not knowingly collect their data.', 'الموقع غير موجّه لمن هم دون 18 عامًا، ولا نجمع بياناتهم عن علم.']] },
      { title: ['Changes to this policy', 'تغييرات السياسة'],
        paras: [['We may update this policy. The date at the top shows the latest version. Continued use of the site means you accept the updated policy.', 'قد نحدّث هذه السياسة. يوضح التاريخ في أعلى الصفحة آخر نسخة. استمرارك في استخدام الموقع يعني موافقتك على السياسة المحدّثة.']] }
    ]}
    note={['For privacy questions or to use any of the rights above, send us a message through the contact page or WhatsApp.', 'لأي استفسار عن الخصوصية أو لممارسة أي من الحقوق أعلاه، أرسل لنا رسالة عبر صفحة التواصل أو واتساب.']}
  />
);

export default PrivacyPolicy;
