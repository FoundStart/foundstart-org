import LegalPage from '@/components/legal/LegalPage';

const CookiePolicy = () => (
  <LegalPage
    path="/cookie-policy"
    title={['Cookie Policy', 'سياسة الكوكيز']}
    updated={['Last updated: October 18, 2026', 'آخر تحديث: 18 أكتوبر 2026']}
    intro={[
      'This page explains how foundstart.org uses cookies and similar storage in your browser, and how you can control them.',
      'توضح هذه الصفحة كيف يستخدم موقع foundstart.org الكوكيز والتخزين المشابه في متصفحك، وكيف يمكنك التحكم فيها.'
    ]}
    sections={[
      { title: ['What cookies are', 'ما هي الكوكيز'],
        paras: [['Cookies are small files a website stores in your browser. Similar tools, such as local storage, keep small pieces of data on your device so the site can remember things.', 'الكوكيز ملفات صغيرة يخزّنها الموقع في متصفحك. وهناك أدوات مشابهة مثل التخزين المحلي تحفظ بيانات صغيرة على جهازك ليتذكر الموقع بعض الأمور.']] },
      { title: ['What we use', 'ما نستخدمه'],
        items: [
          ['Essential storage: keeps you signed in and keeps the site working. The site cannot work properly without it.', 'تخزين أساسي: يبقيك مسجّل الدخول ويُبقي الموقع يعمل. لا يعمل الموقع جيدًا بدونه.'],
          ['Preferences: remembers your language (English or Arabic) and light or dark mode.', 'التفضيلات: يتذكر لغتك (الإنجليزية أو العربية) والوضع الفاتح أو الداكن.'],
          ['Advertising: we show ads through Google AdSense. Google and its partners may use cookies to show and measure ads. You can manage this in your Google ad settings.', 'الإعلانات: نعرض إعلانات عبر Google AdSense. قد تستخدم Google وشركاؤها الكوكيز لعرض الإعلانات وقياسها. يمكنك إدارة ذلك من إعدادات إعلانات Google.']
        ] },
      { title: ['Third-party cookies', 'كوكيز الأطراف الثالثة'],
        paras: [['Embedded content, such as videos, and partner links can set their own cookies once you interact with them. We do not control these cookies. Please check the privacy policy of the provider.', 'قد يضع المحتوى المدمج مثل الفيديوهات وروابط الشركاء كوكيز خاصة به عند تفاعلك معه. نحن لا نتحكم في هذه الكوكيز. يُرجى مراجعة سياسة الخصوصية لدى المزوّد.']] },
      { title: ['How to control cookies', 'كيف تتحكم في الكوكيز'],
        paras: [['You can block or delete cookies in your browser settings. If you block essential storage, sign-in and some features may stop working. Clearing your browser data also resets your saved language and theme.', 'يمكنك حظر الكوكيز أو حذفها من إعدادات المتصفح. إذا حظرت التخزين الأساسي قد يتوقف تسجيل الدخول وبعض المزايا. كما أن مسح بيانات المتصفح يعيد ضبط اللغة والمظهر المحفوظين.']] },
      { title: ['Changes to this policy', 'تغييرات السياسة'],
        paras: [['We may update this policy when our tools change. The date at the top shows the latest version. See our Privacy Policy for how we handle personal data.', 'قد نحدّث هذه السياسة عند تغيّر أدواتنا. يوضح التاريخ في أعلى الصفحة آخر نسخة. راجع سياسة الخصوصية لمعرفة كيف نتعامل مع البيانات الشخصية.']] }
    ]}
    note={['Questions about cookies? Send us a message through the contact page or WhatsApp.', 'لديك سؤال عن الكوكيز؟ أرسل لنا رسالة عبر صفحة التواصل أو واتساب.']}
  />
);

export default CookiePolicy;
