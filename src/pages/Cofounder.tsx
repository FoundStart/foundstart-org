import { useCallback, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Loader2, MessageSquarePlus, Sparkles } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useAuth } from '@/contexts/AuthProvider';
import { useTranslation } from '@/contexts/TranslationContext';
import { supabase } from '@/integrations/supabase/client';
import {
  Conversation,
  ConversationContent,
  ConversationEmptyState,
  ConversationScrollButton,
} from '@/components/ai-elements/conversation';
import { Textarea } from '@/components/ui/textarea';
import { SendHorizonal } from 'lucide-react';

interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
}

interface Thread {
  id: string;
  title: string;
  kind: 'ongoing' | 'project';
  updated_at: string;
}

const strings = {
  en: {
    title: 'AI Co-founder',
    subtitle: 'Your free co-founder: formation, AI tools, vibe coding, marketing and operations.',
    signInTitle: 'Sign in to meet your AI Co-founder',
    signInBody: 'The Co-founder remembers your conversations and builds on them. Sign in or create a free account to start.',
    signIn: 'Sign In',
    getStarted: 'Get Started',
    ongoing: 'Ongoing conversation',
    newProject: 'New project chat',
    empty: 'Ask your co-founder anything - registering a company, building with AI, marketing, or running your work.',
    placeholder: 'Ask your co-founder...',
    thinking: 'Thinking',
    error: 'Something went wrong. Please try again.',
  },
  ar: {
    title: 'الشريك المؤسس بالذكاء الاصطناعي',
    subtitle: 'شريكك المؤسس المجاني: تأسيس الشركات، أدوات الذكاء الاصطناعي، البرمجة بالوصف، التسويق وإدارة العمل.',
    signInTitle: 'سجّل دخولك وقابل شريكك المؤسس',
    signInBody: 'الشريك المؤسس بيفتكر محادثاتكم وبيكمّل عليها. سجّل دخولك أو اعمل حساب مجاني وابدأ.',
    signIn: 'تسجيل الدخول',
    getStarted: 'حساب جديد',
    ongoing: 'المحادثة المستمرة',
    newProject: 'محادثة مشروع جديد',
    empty: 'اسأل شريكك المؤسس أي حاجة - تأسيس شركة، البناء بالذكاء الاصطناعي، التسويق، أو إدارة شغلك.',
    placeholder: 'اسأل شريكك المؤسس...',
    thinking: 'بيفكر',
    error: 'حصلت مشكلة. حاول تاني.',
  },
};

const Cofounder = () => {
  const { user, session } = useAuth();
  const { language, isRTL } = useTranslation();
  const s = strings[language];

  const [threads, setThreads] = useState<Thread[]>([]);
  const [activeThread, setActiveThread] = useState<string | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [streaming, setStreaming] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const activeThreadRef = useRef<string | null>(null);
  activeThreadRef.current = activeThread;

  const loadThreads = useCallback(async () => {
    if (!user) return;
    const { data } = await supabase
      .from('cofounder_threads')
      .select('id,title,kind,updated_at')
      .order('updated_at', { ascending: false });
    if (data) setThreads(data as Thread[]);
  }, [user]);

  useEffect(() => {
    loadThreads();
  }, [loadThreads]);

  const loadMessages = useCallback(async (threadId: string) => {
    const { data } = await supabase
      .from('cofounder_messages')
      .select('sdk_id,message,created_at')
      .eq('thread_id', threadId)
      .order('created_at', { ascending: true });
    if (data) {
      setMessages(
        data.map((row: any) => ({
          id: row.sdk_id,
          role: row.message.role,
          content: row.message.content,
        }))
      );
    }
  }, []);

  const openThread = useCallback(
    (threadId: string) => {
      setActiveThread(threadId);
      setMessages([]);
      loadMessages(threadId);
    },
    [loadMessages]
  );

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
          thread_id: activeThreadRef.current ?? undefined,
          kind: activeThreadRef.current ? undefined : 'project',
          title: text.trim().slice(0, 60),
          language,
          messages: history.map((m) => ({ id: m.id, role: m.role, content: m.content })),
        }),
      });

      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error || `HTTP ${res.status}`);
      }

      const newThreadId = res.headers.get('X-Cofounder-Thread-Id');
      if (newThreadId && !activeThreadRef.current) {
        setActiveThread(newThreadId);
        activeThreadRef.current = newThreadId;
        loadThreads();
      }

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

  const [draft, setDraft] = useState('');
  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const text = draft;
    setDraft('');
    void send(text);
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container mx-auto max-w-2xl px-4 py-24 text-center">
          <Sparkles className="mx-auto mb-6 h-12 w-12 text-primary" />
          <h1 className="mb-4 text-3xl font-extrabold">{s.signInTitle}</h1>
          <p className="mb-8 text-muted-foreground">{s.signInBody}</p>
          <div className="flex justify-center gap-3">
            <Button asChild>
              <Link to="/auth">{s.signIn}</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link to="/auth">{s.getStarted}</Link>
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="container mx-auto flex w-full max-w-6xl flex-1 gap-4 px-3 py-6 sm:px-6">
        {/* Threads sidebar */}
        <aside className="hidden w-64 shrink-0 md:block">
          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-sm font-semibold">{s.title}</h2>
            <Button
              size="sm"
              variant="outline"
              onClick={() => {
                setActiveThread(null);
                activeThreadRef.current = null;
                setMessages([]);
              }}
            >
              <MessageSquarePlus className="h-4 w-4" />
            </Button>
          </div>
          <ScrollArea className="h-[60vh]">
            <div className="space-y-1 pe-2">
              {threads.map((t) => (
                <button
                  key={t.id}
                  onClick={() => openThread(t.id)}
                  className={`w-full rounded-md px-3 py-2 text-start text-sm transition-colors hover:bg-muted ${
                    activeThread === t.id ? 'bg-muted font-medium' : ''
                  }`}
                >
                  {t.kind === 'ongoing' ? s.ongoing : t.title}
                </button>
              ))}
            </div>
          </ScrollArea>
        </aside>

        {/* Chat */}
        <section className="flex min-w-0 flex-1 flex-col rounded-lg border bg-card">
          <div className="border-b px-4 py-3">
            <h1 className="font-bold">{s.title}</h1>
            <p className="text-xs text-muted-foreground">{s.subtitle}</p>
          </div>

          <Conversation className="flex-1">
            <ConversationContent className="gap-4 p-4">
              {messages.length === 0 && (
                <ConversationEmptyState title={s.title} description={s.empty} />
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
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Cofounder;
