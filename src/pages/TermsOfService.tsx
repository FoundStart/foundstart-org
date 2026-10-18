import LegalPage from '@/components/legal/LegalPage';

const TermsOfService = () => (
  <LegalPage
    path="/terms-of-service"
    title={['Terms of Service', 'شروط الخدمة']}
    updated={['Last updated: October 18, 2026', 'آخر تحديث: 18 أكتوبر 2026']}
    intro={[
      'These terms apply when you use foundstart.org and its tools. By using the site you agree to them. If you do not agree, please do not use the site.',
      'تنطبق هذه الشروط عند استخدامك موقع foundstart.org وأدواته. باستخدامك الموقع فإنك توافق عليها. وإن لم توافق، يُرجى عدم استخدام الموقع.'
    ]}
    sections={[
      { title: ['What FoundStart is', 'ما هو FoundStart'],
        paras: [['FoundStart is an information and referral platform for founders. We publish guides, compare options, and connect you with third-party partners for services such as company formation, banking and digital tools. Unless a page clearly says otherwise, the services are delivered by those partners, not by FoundStart.', 'FoundStart منصة معلومات وإحالة للمؤسسين. ننشر أدلة ونقارن الخيارات ونربطك بشركاء من أطراف ثالثة لخدمات مثل تأسيس الشركات والخدمات البنكية والأدوات الرقمية. ما لم تذكر الصفحة غير ذلك بوضوح، يقدّم الشركاء هذه الخدمات وليس FoundStart.']] },
      { title: ['No legal, tax or financial advice', 'لا نقدّم استشارات قانونية أو ضريبية أو مالية'],
        paras: [['Content on the site is general information. It is not legal, tax, accounting or financial advice. Rules differ by country and change over time. Check with a qualified professional before you make decisions.', 'المحتوى على الموقع معلومات عامة، وليس استشارة قانونية أو ضريبية أو محاسبية أو مالية. تختلف القواعد من بلد لآخر وتتغير مع الوقت. استشر مختصًا مؤهلًا قبل اتخاذ قراراتك.']] },
      { title: ['Your account', 'حسابك'],
        items: [
          ['Give accurate information and keep your sign-in details private.', 'قدّم معلومات صحيحة وحافظ على سرية بيانات الدخول.'],
          ['You are responsible for activity under your account.', 'أنت مسؤول عن النشاط الذي يتم عبر حسابك.'],
          ['You must be at least 18 years old.', 'يجب ألا يقل عمرك عن 18 عامًا.']
        ] },
      { title: ['Acceptable use', 'الاستخدام المقبول'],
        paras: [['You agree not to:', 'توافق على عدم:']],
        items: [
          ['Break the law or help others do so.', 'مخالفة القانون أو مساعدة الآخرين على ذلك.'],
          ['Attempt to access systems or data you are not allowed to access.', 'محاولة الوصول إلى أنظمة أو بيانات غير مصرّح لك بها.'],
          ['Disrupt the site, scrape it at scale, or send spam through it.', 'تعطيل الموقع أو سحب محتواه بكميات كبيرة أو إرسال رسائل مزعجة عبره.'],
          ['Use our name or content to mislead others.', 'استخدام اسمنا أو محتوانا لتضليل الآخرين.']
        ] },
      { title: ['Partners and third-party links', 'الشركاء وروابط الأطراف الثالثة'],
        paras: [['The site links to partner and third-party websites. Partners set their own prices, terms and privacy practices. Any agreement for a partner service is between you and that partner. We are not responsible for their services or content.', 'يحتوي الموقع على روابط لمواقع شركاء وأطراف ثالثة. يحدد الشركاء أسعارهم وشروطهم وممارسات الخصوصية الخاصة بهم. أي اتفاق لخدمة يقدمها شريك يكون بينك وبين الشريك مباشرة. ولا نتحمل مسؤولية خدماتهم أو محتواهم.']] },
      { title: ['Payments', 'المدفوعات'],
        paras: [['Where a service is paid, the price and payment terms are shown before you pay. Payments are handled by third-party payment providers. Refund terms depend on the specific service and are stated at checkout or by the partner delivering it.', 'عندما تكون الخدمة مدفوعة، يظهر السعر وشروط الدفع قبل أن تدفع. تتم معالجة المدفوعات عبر مزوّدي دفع من أطراف ثالثة. تعتمد شروط الاسترداد على الخدمة نفسها وتُذكر عند الدفع أو لدى الشريك الذي يقدمها.']] },
      { title: ['Intellectual property', 'الملكية الفكرية'],
        paras: [['The FoundStart name, logo, design and original content belong to FoundStart or its licensors. You may share links to our pages. You may not copy or resell our content without written permission. Partner names and logos belong to their owners.', 'اسم FoundStart وشعاره وتصميمه ومحتواه الأصلي ملك لـ FoundStart أو مرخّصيه. يمكنك مشاركة روابط صفحاتنا. ولا يجوز نسخ محتوانا أو إعادة بيعه دون إذن كتابي. أسماء الشركاء وشعاراتهم ملك لأصحابها.']] },
      { title: ['Disclaimer', 'إخلاء المسؤولية'],
        paras: [['We work to keep the information accurate and current, but the site is provided "as is" without warranties of any kind. We do not guarantee that it will always be available, error-free or that a partner service will meet your needs.', 'نحرص على أن تكون المعلومات دقيقة ومحدّثة، لكن الموقع يُقدَّم "كما هو" دون أي ضمانات. لا نضمن أن يكون متاحًا دائمًا أو خاليًا من الأخطاء أو أن تلبي خدمة الشريك احتياجاتك.']] },
      { title: ['Limitation of liability', 'حدود المسؤولية'],
        paras: [['To the extent the law allows, FoundStart is not liable for indirect or consequential losses arising from your use of the site or from partner services. Nothing here limits liability that cannot be limited by law.', 'بالقدر الذي يسمح به القانون، لا يتحمل FoundStart مسؤولية الخسائر غير المباشرة أو التبعية الناتجة عن استخدامك الموقع أو خدمات الشركاء. ولا يحدّ أي بند هنا من مسؤولية لا يجوز تقييدها قانونًا.']] },
      { title: ['Changes and termination', 'التغييرات وإنهاء الاستخدام'],
        paras: [['We may update these terms or the site at any time. The date at the top shows the latest version. We may suspend access for anyone who breaks these terms.', 'قد نحدّث هذه الشروط أو الموقع في أي وقت. يوضح التاريخ في أعلى الصفحة آخر نسخة. وقد نوقف الوصول لأي شخص يخالف هذه الشروط.']] }
    ]}
    note={['Questions about these terms? Send us a message through the contact page or WhatsApp.', 'لديك سؤال عن هذه الشروط؟ أرسل لنا رسالة عبر صفحة التواصل أو واتساب.']}
  />
);

export default TermsOfService;
