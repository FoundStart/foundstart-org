import { useMemo, useRef, useState } from 'react';
import { MessageSquare, Send, X, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Streamdown } from 'streamdown';
import { linkify, chatMdComponents } from '@/components/chatMd';
import { useTranslation } from '@/contexts/TranslationContext';
import { aiAgents } from '@/data/agentsData';
import { agentPartners } from '@/data/agentPartners';
import { countriesData } from '@/data/countriesData';

interface Message {
  id: string;
  text: string;
  isBot: boolean;
}

interface SearchItem {
  kind: 'agent' | 'partner' | 'country';
  title: string;
  desc: string;
  href: string;
  external: boolean;
  blob: string;
  slug?: string;
  titleBlob?: string;
}

const strings = {
  en: {
    title: 'FoundStart AI',
    subtitle: 'Answers from the whole site',
    placeholder: 'Ask about partners, agents, countries...',
    send: 'Send',
    welcome:
      "Hi! I know every agent, partner and country on FoundStart. Ask me anything - for example **best eSIM for Europe** or **how do I form a US LLC**.",
    foundAgents: 'Talk to a specialist agent:',
    foundPartners: 'Matching partners:',
    foundCountries: 'Country guides:',
    fallback:
      "I could not find an exact match. Try naming a service (hosting, eSIM, banking...), a partner, or a country - or browse all agents below.\n(/agents)",
    chips: ['Form a US LLC', 'Best eSIM for travel', 'Business banking', 'Build an app with AI'],
  },
  ar: {
    title: 'FoundStart AI',
    subtitle: 'بيجاوب من كل بيانات الموقع',
    placeholder: 'اسأل عن شركاء أو وكلاء أو دول...',
    send: 'إرسال',
    welcome:
      'أهلاً! أنا عارف كل الوكلاء والشركاء والدول على FoundStart. اسألني أي حاجة - مثلاً **أحسن eSIM لأوروبا** أو **أعمل شركة أمريكية إزاي**.',
    foundAgents: 'كلم الوكيل المتخصص:',
    foundPartners: 'شركاء مناسبين:',
    foundCountries: 'أدلة الدول:',
    fallback:
      'مش لاقي نتيجة مطابقة. جرّب تكتب اسم خدمة (استضافة، eSIM، بنوك...) أو شريك أو دولة - أو تصفح كل الوكلاء من هنا.\n(/agents)',
    chips: ['أعمل شركة أمريكية', 'أحسن eSIM للسفر', 'حساب بنكي للبيزنس', 'أعمل تطبيق بالـ AI'],
  },
};

const STOPWORDS = new Set([
  'the', 'a', 'an', 'for', 'and', 'or', 'to', 'of', 'in', 'on', 'with', 'how', 'what', 'which',
  'best', 'top', 'is', 'are', 'do', 'does', 'i', 'my', 'me', 'you', 'your', 'need', 'want',
  'get', 'can', 'it', 'this', 'that', 'give', 'show', 'find',
  'في', 'من', 'علي', 'الي', 'عن', 'ما', 'ماذا', 'كيف', 'ازاي', 'عايز', 'عاوز', 'احسن', 'افضل', 'لي', 'ده', 'دي', 'بتاع',
]);

const COUNTRY_AR: Record<string, string> = {
  USA: 'امريكا الولايات المتحده', UK: 'بريطانيا انجلترا', Canada: 'كندا', Estonia: 'استونيا',
  Finland: 'فنلندا', Sweden: 'السويد', Latvia: 'لاتفيا', Lithuania: 'ليتوانيا', Egypt: 'مصر',
};

const norm = (t: string) =>
  t
    .toLowerCase()
    .replace(/[ً-ْٰ]/g, '')
    .replace(/[أإآٱ]/g, 'ا')
    .replace(/ى/g, 'ي')
    .replace(/ة/g, '');

// Teh-marbuta is dropped by norm; tolerate a trailing ه in user spelling (شركه).
const hit = (blob: string, token: string): boolean =>
  blob.includes(token) || (token.endsWith('ه') && token.length > 2 && blob.includes(token.slice(0, -1)));

const buildIndex = (): SearchItem[] => {
  const items: SearchItem[] = [];
  for (const a of aiAgents) {
    items.push({
      kind: 'agent',
      title: `${a.name.en} Agent`,
      desc: a.tagline.en,
      href: `/agents/${a.slug}`,
      external: false,
      slug: a.slug,
      titleBlob: norm(`${a.name.en} ${a.name.ar}`),
      blob: norm(`${a.name.en} ${a.name.ar} ${a.tagline.en} ${a.tagline.ar} ${a.slug}`),
    });
    for (const p of agentPartners[a.slug] ?? []) {
      items.push({
        kind: 'partner',
        title: p.name,
        desc: p.niche,
        href: p.url,
        external: true,
        blob: norm(`${p.name} ${p.niche} ${a.name.en} ${a.name.ar} ${a.slug.replace(/-/g, ' ')}`),
      });
    }
  }
  for (const c of countriesData as { id: string; name: string; description?: string }[]) {
    items.push({
      kind: 'country',
      title: c.name,
      desc: (c.description ?? '').slice(0, 90),
      href: `/country/${c.id.toLowerCase()}`,
      external: false,
      blob: norm(`${c.name} ${c.id} ${COUNTRY_AR[c.id] ?? ''} ${c.description ?? ''}`),
    });
  }
  return items;
};

const search = (index: SearchItem[], query: string): SearchItem[] => {
  const tokens = norm(query)
    .split(/[^\p{L}\p{N}]+/u)
    .filter((t) => t.length > 1 && !STOPWORDS.has(t));
  if (tokens.length === 0) return [];
  return index
    .map((item) => {
      let score = 0;
      for (const t of tokens) {
        if (hit(item.titleBlob ?? norm(item.title), t)) score += 3;
        if (hit(item.blob, t)) score += 1;
      }
      return { item, score };
    })
    .filter((r) => r.score >= 2)
    .sort((a, b) => b.score - a.score)
    .map((r) => r.item);
};

const compose = (results: SearchItem[], s: (typeof strings)['en']): string => {
  const agents = results.filter((r) => r.kind === 'agent').slice(0, 2);
  const seen = new Set(results.map((r) => r.href));
  const agentPartnersFlat: SearchItem[] = [];
  for (const a of agents) {
    if (!a.slug) continue;
    for (const p of (agentPartners[a.slug] ?? []).slice(0, 3)) {
      if (seen.has(p.url)) continue;
      seen.add(p.url);
      agentPartnersFlat.push({ kind: 'partner', title: p.name, desc: p.niche, href: p.url, external: true, blob: '' });
    }
  }
  const partners = [...results.filter((r) => r.kind === 'partner'), ...agentPartnersFlat].slice(0, 5);
  const countries = results.filter((r) => r.kind === 'country').slice(0, 2);
  if (agents.length + partners.length + countries.length === 0) return s.fallback;
  const parts: string[] = [];
  if (agents.length) {
    parts.push(s.foundAgents);
    for (const a of agents) parts.push(`**${a.title}** - ${a.desc}\n(${a.href})`);
  }
  if (partners.length) {
    parts.push(s.foundPartners);
    for (const p of partners) parts.push(`**${p.title}** - ${p.desc}\n(${p.href})`);
  }
  if (countries.length) {
    parts.push(s.foundCountries);
    for (const c of countries) parts.push(`**${c.title}**\n(${c.href})`);
  }
  return parts.join('\n\n');
};

const AIChatBot = () => {
  const { language, isRTL } = useTranslation();
  const s = strings[language as 'en' | 'ar'] ?? strings.en;
  const index = useMemo(buildIndex, []);
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([{ id: '1', text: s.welcome, isBot: true }]);
  const [inputValue, setInputValue] = useState('');
  const idRef = useRef(2);

  const send = (raw: string) => {
    const text = raw.trim();
    if (!text) return;
    const userMsg: Message = { id: String(idRef.current++), text, isBot: false };
    const reply = compose(search(index, text), s);
    const botMsg: Message = { id: String(idRef.current++), text: reply, isBot: true };
    setMessages((prev) => [...prev, userMsg, botMsg]);
    setInputValue('');
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        aria-label={s.title}
        className="fixed bottom-20 lg:bottom-6 right-4 lg:right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg ring-4 ring-primary/20 transition-transform hover:scale-105"
      >
        <MessageSquare className="h-6 w-6" />
      </button>
    );
  }

  return (
    <div
      dir={isRTL ? 'rtl' : 'ltr'}
      className="fixed bottom-20 lg:bottom-6 right-4 left-4 sm:left-auto sm:right-6 sm:w-96 z-50 flex h-[520px] max-h-[calc(100vh-140px)] flex-col overflow-hidden rounded-2xl border bg-card shadow-2xl"
    >
      <div className="flex items-center justify-between border-b px-4 py-3">
        <div className="flex items-center gap-2.5">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <Sparkles className="h-5 w-5" />
          </span>
          <div>
            <p className="text-sm font-bold leading-tight">{s.title}</p>
            <p className="text-xs text-muted-foreground leading-tight">{s.subtitle}</p>
          </div>
        </div>
        <button onClick={() => setIsOpen(false)} aria-label="Close" className="rounded-lg p-1.5 text-muted-foreground hover:bg-muted">
          <X className="h-4 w-4" />
        </button>
      </div>

      <div className="flex-1 space-y-3 overflow-y-auto p-3">
        {messages.map((m) => (
          <div key={m.id} className={`flex ${m.isBot ? 'justify-start' : 'justify-end'}`}>
            <div
              className={`max-w-[88%] rounded-2xl px-3 py-2 text-sm leading-relaxed ${
                m.isBot ? 'bg-muted text-foreground' : 'whitespace-pre-wrap bg-primary text-primary-foreground'
              }`}
            >
              {m.isBot ? (
                <Streamdown mode="static" components={chatMdComponents}>{linkify(m.text)}</Streamdown>
              ) : (
                m.text
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="flex flex-wrap gap-1.5 px-3 pb-2">
        {s.chips.map((c) => (
          <button
            key={c}
            onClick={() => send(c)}
            className="rounded-full border px-2.5 py-1 text-xs text-muted-foreground transition-colors hover:bg-muted"
          >
            {c}
          </button>
        ))}
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          send(inputValue);
        }}
        className="flex items-center gap-2 border-t p-3"
      >
        <input
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder={s.placeholder}
          className="h-10 flex-1 rounded-lg border bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-primary/40"
        />
        <Button type="submit" size="icon" aria-label={s.send} className="h-10 w-10 shrink-0">
          <Send className="h-4 w-4 rtl:-scale-x-100" />
        </Button>
      </form>
    </div>
  );
};

export default AIChatBot;
