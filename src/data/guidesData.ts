export interface GuideTool {
  name: string;
  url: string;
  note: { en: string; ar: string };
}

export interface GuideSection {
  heading: { en: string; ar: string };
  body: { en: string; ar: string };
}

export interface Guide {
  slug: string;
  icon: string;
  title: { en: string; ar: string };
  description: { en: string; ar: string };
  sections: GuideSection[];
  tools: GuideTool[];
}

import { digitalPartnersData } from './digitalPartnersData';
import { freelancerPartnersData } from './freelancerPartnersData';

const partnerUrl = (platform: string): string => {
  const d = digitalPartnersData.find((p) => p.platform.toLowerCase() === platform.toLowerCase());
  if (d) return d.url;
  const f = freelancerPartnersData.find((p) => p.platform.toLowerCase() === platform.toLowerCase());
  return f?.url ?? '#';
};

export const guides: Guide[] = [
  {
    slug: 'register-company',
    icon: 'Building2',
    title: { en: 'Register Your Company, Step by Step', ar: 'سجّل شركتك خطوة بخطوة' },
    description: {
      en: 'How to form an LLC or Ltd through our partner services - jurisdiction choice, documents, EIN, banking and payments.',
      ar: 'إزاي تأسس شركة LLC أو Ltd من خلال خدمات شركائنا - اختيار الدولة، الأوراق، الرقم الضريبي، البنوك والمدفوعات.',
    },
    sections: [
      {
        heading: { en: '1. Pick your jurisdiction', ar: '١. اختار الدولة' },
        body: {
          en: 'For online business most founders choose a US LLC (Stripe, Mercury banking, global trust), a UK Ltd (fast and cheap), or Estonia for EU presence. If you operate locally in Egypt, an Egyptian entity lets you use Kashier, Paymob and Fawry.',
          ar: 'للشغل أونلاين معظم المؤسسين بيختاروا LLC أمريكية (Stripe وبنك Mercury وثقة عالمية)، أو Ltd بريطانية (سريعة ورخيصة)، أو إستونيا لتواجد أوروبي. لو شغال محلي في مصر، كيان مصري بيخليك تستخدم كاشير وباي موب وفوري.',
        },
      },
      {
        heading: { en: '2. Order formation through a partner', ar: '٢. اطلب التأسيس من شريك' },
        body: {
          en: 'The partner handles filing, registered agent and your company documents. You fill one form; they do the paperwork and send you the incorporation documents and your EIN (US tax number).',
          ar: 'الشريك بيتولى التقديم والوكيل المسجل وأوراق الشركة. انت بتملأ فورم واحدة؛ هم بيعملوا الأوراق ويبعتولك مستندات التأسيس والرقم الضريبي EIN.',
        },
      },
      {
        heading: { en: '3. Banking and payments', ar: '٣. البنوك والمدفوعات' },
        body: {
          en: 'With your documents ready, open a business account (Mercury or Wise for US entities) and connect Stripe for card payments. For Egypt, connect Kashier or Paymob instead.',
          ar: 'بعد ما الأوراق تجهز، افتح حساب بنكي للشركة (Mercury أو Wise للكيانات الأمريكية) ووصّل Stripe للدفع بالكروت. في مصر، وصّل كاشير أو باي موب.',
        },
      },
      {
        heading: { en: '4. Stay compliant', ar: '٤. حافظ على الالتزام' },
        body: {
          en: 'Put the annual report, registered agent renewal and tax dates on your calendar from day one. Missing them costs more than the formation itself.',
          ar: 'سجّل مواعيد التقرير السنوي وتجديد الوكيل المسجل والضرائب في التقويم من أول يوم. نسيانها بيكلف أكتر من التأسيس نفسه.',
        },
      },
    ],
    tools: [
      { name: 'Doola', url: partnerUrl('Doola'), note: { en: 'US LLC formation, EIN and compliance in one place', ar: 'تأسيس LLC أمريكية والرقم الضريبي والامتثال في مكان واحد' } },
      { name: 'Clemta', url: partnerUrl('Clemta'), note: { en: 'US company formation with banking guidance', ar: 'تأسيس شركة أمريكية مع إرشاد للخدمات البنكية' } },
      { name: 'Go Nomad HQ', url: partnerUrl('Go Nomad HQ'), note: { en: 'Formation for digital nomads and remote founders', ar: 'تأسيس للرحّالة الرقميين والمؤسسين عن بعد' } },
    ],
  },
  {
    slug: 'build-ai-company',
    icon: 'Bot',
    title: { en: 'Build an AI Company With Free Tools', ar: 'ابني شركة ذكاء اصطناعي بأدوات مجانية' },
    description: {
      en: 'The stack we recommend to launch an AI product: idea, build, voice, video and automation - all with tools you can start free.',
      ar: 'الأدوات اللي بنرشحها لإطلاق منتج ذكاء اصطناعي: الفكرة، البناء، الصوت، الفيديو والأتمتة - كلها أدوات تبدأ بيها مجانًا.',
    },
    sections: [
      {
        heading: { en: '1. Start from a painful problem', ar: '١. ابدأ من مشكلة مؤلمة' },
        body: {
          en: 'An AI company is still a company: pick one audience and one painful problem. AI is how you deliver the solution faster and cheaper, not the product itself.',
          ar: 'شركة الذكاء الاصطناعي لسه شركة: اختار جمهور واحد ومشكلة واحدة مؤلمة. الذكاء الاصطناعي وسيلة توصل بيها الحل أسرع وأرخص، مش المنتج نفسه.',
        },
      },
      {
        heading: { en: '2. Build the product with AI builders', ar: '٢. ابني المنتج بأدوات البناء بالذكاء الاصطناعي' },
        body: {
          en: 'Vibe-coding platforms turn plain-language descriptions into working apps. Describe your screens, iterate in chat, and use the built-in backend before adding extras.',
          ar: 'منصات الـ vibe coding بتحول الوصف العادي لتطبيقات شغالة. اوصف الشاشات، عدّل بالشات، واستخدم الباك إند المدمج قبل ما تضيف إضافات.',
        },
      },
      {
        heading: { en: '3. Give it a voice and a face', ar: '٣. اديله صوت وشكل' },
        body: {
          en: 'AI voice and video tools produce your promos, tutorials and onboarding in English and Arabic - the same content in two languages doubles your reach.',
          ar: 'أدوات الصوت والفيديو بالذكاء الاصطناعي بتعمل الإعلانات والشروحات بالإنجليزي والعربي - نفس المحتوى بلغتين بيضاعف وصولك.',
        },
      },
      {
        heading: { en: '4. Automate the boring work', ar: '٤. أتمت الشغل الممل' },
        body: {
          en: 'Wire forms, sheets and email together with automation tools so leads, orders and notifications run without you touching them.',
          ar: 'وصّل الفورمز والجداول والإيميلات بأدوات الأتمتة عشان الطلبات والإشعارات تشتغل من غير ما تلمسها.',
        },
      },
    ],
    tools: [],
  },
  {
    slug: 'vibe-coding',
    icon: 'Code2',
    title: { en: 'Vibe Coding: Ship Apps by Describing Them', ar: 'الـ Vibe Coding: اعمل تطبيقات بالوصف' },
    description: {
      en: 'How to build full-stack web and mobile apps with AI builders - from first prompt to published product.',
      ar: 'إزاي تبني تطبيقات ويب وموبايل كاملة بأدوات البناء بالذكاء الاصطناعي - من أول وصف لحد النشر.',
    },
    sections: [
      {
        heading: { en: '1. Write a one-paragraph spec', ar: '١. اكتب وصف من فقرة واحدة' },
        body: {
          en: 'Who it serves, the one job it does, the data it stores. Paste that into the builder as your first prompt and iterate screen by screen.',
          ar: 'مين اللي هيستخدمه، إيه المهمة اللي بيعملها، إيه البيانات اللي بيخزنها. انسخ ده كأول برومبت في الأداة وعدّل شاشة بشاشة.',
        },
      },
      {
        heading: { en: '2. Use the built-in backend first', ar: '٢. استخدم الباك إند المدمج الأول' },
        body: {
          en: 'Auth and database come built in on these platforms. Get the core loop working end to end before connecting anything external.',
          ar: 'تسجيل الدخول وقاعدة البيانات موجودين جوه المنصات دي. خلّي الأساس يشتغل من الأول للآخر قبل ما توصّل أي حاجة خارجية.',
        },
      },
      {
        heading: { en: '3. Publish early, polish later', ar: '٣. انشر بدري وحسّن بعدين' },
        body: {
          en: 'Ship on the platform hosting, get five real users, and only then invest in custom domains, design passes and paid tiers.',
          ar: 'انشر على استضافة المنصة، هات خمس مستخدمين حقيقيين، وبعدها بس استثمر في دومين خاص وتصميم وخطط مدفوعة.',
        },
      },
    ],
    tools: [],
  },
  {
    slug: 'vibe-marketing',
    icon: 'Megaphone',
    title: { en: 'Vibe Marketing With AI', ar: 'التسويق بالذكاء الاصطناعي' },
    description: {
      en: 'Run your whole marketing with AI: content, video, voice and distribution - one person doing the work of a team.',
      ar: 'شغّل تسويقك كله بالذكاء الاصطناعي: محتوى وفيديو وصوت ونشر - شخص واحد بيعمل شغل فريق.',
    },
    sections: [
      {
        heading: { en: '1. Pick one channel', ar: '١. اختار قناة واحدة' },
        body: {
          en: 'Short video, SEO blog or email - choose the one you can sustain daily for 30 days before judging anything.',
          ar: 'فيديو قصير أو مدونة SEO أو إيميل - اختار اللي تقدر تستمر عليه يوميًا ٣٠ يوم قبل ما تحكم على أي حاجة.',
        },
      },
      {
        heading: { en: '2. Produce with AI, in two languages', ar: '٢. انتج بالذكاء الاصطناعي بلغتين' },
        body: {
          en: 'AI video, image and voice tools turn one idea into a week of content. Publishing the same piece in English and Arabic doubles reach for the same effort.',
          ar: 'أدوات الفيديو والصورة والصوت بالذكاء الاصطناعي بتحول فكرة واحدة لمحتوى أسبوع. نشر نفس المحتوى بالإنجليزي والعربي بيضاعف الوصول بنفس المجهود.',
        },
      },
      {
        heading: { en: '3. Send traffic to one page', ar: '٣. وجّه الترافيك لصفحة واحدة' },
        body: {
          en: 'Every post points to one landing page with one action. Measure clicks to signup weekly and kill what does not convert.',
          ar: 'كل بوست بيشاور على صفحة هبوط واحدة بفعل واحد. قيس التحويل أسبوعيًا ووقّف اللي مش بيحقق نتيجة.',
        },
      },
    ],
    tools: [],
  },
  {
    slug: 'ai-operations',
    icon: 'Workflow',
    title: { en: 'Run Your Work With AI', ar: 'شغّل عملك بالذكاء الاصطناعي' },
    description: {
      en: 'Day-to-day operations for a one-person company: automate repeat work, manage tasks and money, and hire freelancers when it pays off.',
      ar: 'التشغيل اليومي لشركة من شخص واحد: أتمت الشغل المتكرر، نظّم المهام والفلوس، ووظّف فريلانسرز لما يكون له معنى.',
    },
    sections: [
      {
        heading: { en: '1. Automate the top 3 repeated tasks', ar: '١. أتمت أكتر ٣ مهام متكررة' },
        body: {
          en: 'List what you repeat weekly - lead emails, invoicing, posting - and automate those first with no-code automation tools.',
          ar: 'اكتب اللي بتكرره أسبوعيًا - إيميلات العملاء، الفواتير، النشر - وأتمت دول الأول بأدوات الأتمتة.',
        },
      },
      {
        heading: { en: '2. One source of truth', ar: '٢. مصدر واحد للحقيقة' },
        body: {
          en: 'Keep tasks, clients and money in one management tool. If it lives in your head or in chat history, it gets lost.',
          ar: 'خلّي المهام والعملاء والفلوس في أداة إدارة واحدة. اللي في دماغك أو في الشات بيضيع.',
        },
      },
      {
        heading: { en: '3. Hire freelancers for the rest', ar: '٣. وظّف فريلانسرز للباقي' },
        body: {
          en: 'What you cannot automate, delegate. Arabic marketplaces like Khamsat and Kafiil cover design, video, writing and data entry at small fixed prices.',
          ar: 'اللي مش بتقدر تؤتمته، فوّضه. منصات عربية زي خمسات وكافيل بتغطي تصميم وفيديو وكتابة وإدخال بيانات بأسعار ثابتة صغيرة.',
        },
      },
    ],
    tools: [
      { name: 'Khamsat', url: partnerUrl('Khamsat'), note: { en: 'Arabic micro-services marketplace for small fixed-price work', ar: 'سوق خدمات عربي مصغر لشغل بأسعار ثابتة صغيرة' } },
      { name: 'Kafil', url: partnerUrl('Kafil'), note: { en: 'Arabic freelance platform for bigger projects', ar: 'منصة فريلانس عربية للمشاريع الأكبر' } },
    ],
  },
];

// Fill guide tools for build-ai-company, vibe-coding and vibe-marketing from the partner catalog by category
const byCategory = (cat: string, limit = 6) =>
  digitalPartnersData
    .filter((p) => p.category === cat)
    .slice(0, limit)
    .map((p) => ({
      name: p.platform,
      url: p.url,
      note: { en: p.niche || p.category, ar: p.niche || p.category },
    }));

guides.find((g) => g.slug === 'build-ai-company')!.tools = [
  ...byCategory('AI Tools', 4),
  ...byCategory('Business Automation', 2),
];
guides.find((g) => g.slug === 'vibe-coding')!.tools = byCategory('Vibe Coding', 6);
guides.find((g) => g.slug === 'vibe-marketing')!.tools = [
  ...byCategory('Ai Videos & Image', 2),
  ...byCategory('AI Voices', 2),
  ...byCategory('SMM Panel', 2),
];
