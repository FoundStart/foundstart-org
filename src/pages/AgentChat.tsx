import { SHOW_REGISTRATION } from '@/config/features';
import type { ReactNode } from 'react';
import { useEffect, useRef, useState } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { ArrowLeft, ExternalLink, Loader2, SendHorizonal, Sparkles } from 'lucide-react';
import Header from '@/components/Header';
import AgentAvatar from '@/components/AgentAvatar';
import { Streamdown } from 'streamdown';
import { linkify, chatMdComponents } from '@/components/chatMd';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/AuthProvider';
import { useTranslation } from '@/contexts/TranslationContext';
import {
  Conversation,
  ConversationContent,
  ConversationEmptyState,
  ConversationScrollButton,
} from '@/components/ai-elements/conversation';
import { getAgent } from '@/data/agentsData';
import { agentPartners } from '@/data/agentPartners';

// Click-time attribution: params pass through shortet.com to the partner (verified).
// Appended in the href only - nothing fires until a visitor actually clicks.
const trackUrl = (url: string, source: string): string => {
  if (!url.startsWith('https://shortet.com/')) return url;
  const sep = url.includes('?') ? '&' : '?';
  return `${url}${sep}utm_source=foundstart&utm_medium=${source}`;
};


interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
}

const strings = {
  en: {
    allAgents: 'All AI agents',
    signInTitle: 'Sign in to chat with this agent',
    signInBody: 'The agent remembers your conversation and builds on it. Sign in or create a free account to start.',
    signIn: 'Sign In',
    getStarted: 'Get Started',
    empty: 'Tell this agent what you need - it will ask a question or two, then recommend the best matching services.',
    placeholder: 'Ask this agent...',
    thinking: 'Thinking',
    error: 'Something went wrong. Please try again.',
    partnersTitle: 'All partners in this category',
    partnersSub: 'Every service this agent can recommend. Open the chat and it will pick the best fit for you.',
    partnersEmpty: 'Partner services for this category are being added.',
    partnersCount: (n: number) => `${n} services`,
  },
  ar: {
    allAgents: 'كل وكلاء الذكاء الاصطناعي',
    signInTitle: 'سجّل دخولك وابدأ المحادثة مع الوكيل',
    signInBody: 'الوكيل بيفتكر محادثتك وبيكمّل عليها. سجّل دخولك أو اعمل حساب مجاني وابدأ.',
    signIn: 'تسجيل الدخول',
    getStarted: 'حساب جديد',
    empty: 'قول للوكيل محتاج إيه - هيسألك سؤال أو اتنين، وبعدين يرشحلك أنسب الخدمات.',
    placeholder: 'اسأل الوكيل...',
    thinking: 'بيفكر',
    error: 'حصلت مشكلة. حاول تاني.',
    partnersTitle: 'كل الشركاء في المجال ده',
    partnersSub: 'كل الخدمات اللي الوكيل ممكن يرشحها. افتح الشات وهو يختارلك الأنسب ليك.',
    partnersEmpty: 'خدمات الشركاء للمجال ده بتتضاف حالياً.',
    partnersCount: (n: number) => `${n} خدمة`,
  },
};

const AgentChat = () => {
  const { slug } = useParams<{ slug: string }>();
  const agent = getAgent(slug);
  const { user, session } = useAuth();
  const { language, isRTL } = useTranslation();
  const s = strings[language];

  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [streaming, setStreaming] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [draft, setDraft] = useState('');
  const threadRef = useRef<string | null>(null);

  useEffect(() => {
    if (agent) document.title = `FoundStart AI ${agent.name.en} Agent`;
  }, [agent]);

  useEffect(() => {
    setMessages([]);
    setError(null);
    threadRef.current = null;
  }, [slug]);

  if (!agent) return <Navigate to="/agents" replace />;

  const partners = agentPartners[agent.slug] ?? [];

  const send = async (text: string) => {
    if (!text.trim() || !session || streaming) return;
    setError(null);
    const userMsg: ChatMessage = { id: crypto.randomUUID(), role: 'user', content: text.trim() };
    const history = [...messages, userMsg];
    setMessages([...history, { id: 'pending', role: 'assistant', content: '' }]);
    setStreaming(true);

    try {
      const res = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/cofounder`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${session.access_token}`,
        },
        body: JSON.stringify({
          thread_id: threadRef.current ?? undefined,
          kind: threadRef.current ? undefined : 'project',
          title: text.trim().slice(0, 60),
          language,
          agent: agent.slug,
          messages: history.map((m) => ({ id: m.id, role: m.role, content: m.content })),
        }),
      });

      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error || `HTTP ${res.status}`);
      }

      const newThreadId = res.headers.get('X-Cofounder-Thread-Id');
      if (newThreadId && !threadRef.current) threadRef.current = newThreadId;

      const reader = res.body!.getReader();
      const decoder = new TextDecoder();
      let buffer = '';
      let acc = '';
      for (;;) {
        const { done, value } = await reader.read();
        if (done) break;
        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split('\n');
        buffer = lines.pop() ?? '';
        for (const line of lines) {
          if (!line.startsWith('data:') || line.includes('[DONE]')) continue;
          try {
            const json = JSON.parse(line.slice(5).trim());
            const delta = json.choices?.[0]?.delta?.content;
            if (delta) {
              acc += delta;
              setMessages((prev) =>
                prev.map((m) => (m.id === 'pending' ? { ...m, content: acc } : m))
              );
            }
          } catch {
            /* partial JSON line */
          }
        }
      }
      setMessages((prev) =>
        prev.map((m) => (m.id === 'pending' ? { ...m, id: crypto.randomUUID() } : m))
      );
    } catch (e) {
      setMessages((prev) => prev.filter((m) => m.id !== 'pending'));
      setError(e instanceof Error ? e.message : s.error);
    } finally {
      setStreaming(false);
    }
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const text = draft;
    setDraft('');
    void send(text);
  };

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="container mx-auto flex w-full max-w-3xl flex-1 flex-col px-3 py-6 sm:px-6">
        {/* Chat */}
        <section className="flex min-w-0 flex-col rounded-lg border bg-card">
          <div className="border-b px-4 py-3">
            <Link to="/agents" className="mb-1 inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground">
              <ArrowLeft className="h-3 w-3 rtl:-scale-x-100" /> {s.allAgents}
            </Link>
            <div className="flex items-center gap-3">
              <AgentAvatar slug={agent.slug} icon={agent.icon} className="h-11 w-11 shrink-0" iconClassName="h-5 w-5" />
              <div className="min-w-0">
                <h1 className="font-bold">FoundStart AI {agent.name[language]}</h1>
                <p className="text-xs text-muted-foreground">{agent.tagline[language]}</p>
              </div>
            </div>
          </div>

          {!user ? (
            <div className="px-4 py-12 text-center">
              <Sparkles className="mx-auto mb-4 h-10 w-10 text-primary" />
              <h2 className="mb-2 text-xl font-bold">{s.signInTitle}</h2>
              <p className="mx-auto mb-6 max-w-md text-muted-foreground">{s.signInBody}</p>
              <div className="flex justify-center gap-3">
                <Button asChild>
                  <Link to="/auth">{s.signIn}</Link>
                </Button>
                {SHOW_REGISTRATION && (<Button variant="outline" asChild><Link to="/auth">{s.getStarted}</Link></Button>)}
              </div>
            </div>
          ) : (
            <>
              <Conversation className="flex-1">
                <ConversationContent className="gap-4 p-4">
                  {messages.length === 0 && (
                    <>
                      <ConversationEmptyState title={agent.name[language]} description={s.empty} />
                      <div className="flex flex-wrap justify-center gap-2">
                        {agent.starters[language].map((q) => (
                          <Button
                            key={q}
                            variant="outline"
                            size="sm"
                            disabled={streaming}
                            onClick={() => void send(q)}
                          >
                            {q}
                          </Button>
                        ))}
                      </div>
                    </>
                  )}
                  {messages.map((m) => (
                    <div key={m.id} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                      <div
                        className={`max-w-[85%] whitespace-pre-wrap rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                          m.role === 'user'
                            ? 'bg-primary text-primary-foreground'
                            : 'bg-muted text-foreground'
                        }`}
                      >
                        {m.role === 'assistant' && !m.content ? (
                          <span className="flex items-center gap-2 text-muted-foreground">
                            <Loader2 className="h-4 w-4 animate-spin" /> {s.thinking}...
                          </span>
                        ) : m.role === 'assistant' ? (
                          <Streamdown mode="streaming" components={chatMdComponents}>{linkify(m.content)}</Streamdown>
                        ) : (
                          m.content
                        )}
                      </div>
                    </div>
                  ))}
                </ConversationContent>
                <ConversationScrollButton />
              </Conversation>

              {error && <p className="px-4 pb-1 text-sm text-destructive">{error}</p>}

              <div className="border-t p-3" dir={isRTL ? 'rtl' : 'ltr'}>
                <form onSubmit={onSubmit} className="flex items-end gap-2">
                  <Textarea
                    value={draft}
                    onChange={(e) => setDraft(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        onSubmit(e);
                      }
                    }}
                    placeholder={s.placeholder}
                    disabled={streaming}
                    rows={1}
                    className="min-h-[44px] flex-1 resize-none"
                  />
                  <Button type="submit" size="icon" disabled={streaming || !draft.trim()}>
                    <SendHorizonal className="h-4 w-4 rtl:-scale-x-100" />
                  </Button>
                </form>
              </div>
            </>
          )}
        </section>

        {/* Full partner list - visible without sign-in */}
        <section className="mt-8">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold">{s.partnersTitle}</h2>
              <p className="text-sm text-muted-foreground">{s.partnersSub}</p>
            </div>
            {partners.length > 0 && <Badge variant="secondary">{s.partnersCount(partners.length)}</Badge>}
          </div>
          {partners.length === 0 ? (
            <p className="rounded-lg border bg-card p-6 text-center text-sm text-muted-foreground">{s.partnersEmpty}</p>
          ) : (
            <div className="grid gap-3 sm:grid-cols-2">
              {partners.map((pt) => (
                <a
                  key={pt.url}
                  href={trackUrl(pt.url, `agent-${agent.slug}`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-start justify-between gap-3 rounded-lg border bg-card p-4 transition-colors hover:border-primary/60"
                >
                  <div>
                    <h3 className="text-sm font-semibold group-hover:text-primary">{pt.name}</h3>
                    {pt.niche && <p className="mt-0.5 text-xs text-muted-foreground">{pt.niche}</p>}
                  </div>
                  <ExternalLink className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground group-hover:text-primary" />
                </a>
              ))}
            </div>
          )}
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default AgentChat;
