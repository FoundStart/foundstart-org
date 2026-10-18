import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Building2, Code2, Megaphone, Mail, Briefcase, Workflow, Clapperboard, Sparkles,
  TrendingUp, Server, ShoppingCart, Store, KanbanSquare, Landmark, DollarSign, Palette,
  Users, Video, UserCheck, Globe, Mic, Smartphone, GraduationCap, Plane, Bot, FileText, Shield, AtSign, Gift,
} from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useTranslation } from '@/contexts/TranslationContext';
import { aiAgents } from '@/data/agentsData';

const iconMap: Record<string, typeof Bot> = {
  'building-2': Building2, 'code-2': Code2, megaphone: Megaphone, mail: Mail,
  briefcase: Briefcase, workflow: Workflow, clapperboard: Clapperboard, sparkles: Sparkles,
  'trending-up': TrendingUp, server: Server, 'shopping-cart': ShoppingCart, store: Store,
  'kanban-square': KanbanSquare, landmark: Landmark, 'dollar-sign': DollarSign, palette: Palette,
  users: Users, video: Video, 'user-check': UserCheck, globe: Globe, mic: Mic,
  smartphone: Smartphone, 'graduation-cap': GraduationCap, plane: Plane,
  'file-text': FileText, shield: Shield, 'at-sign': AtSign, gift: Gift,
};

const strings = {
  en: {
    title: 'AI Agents',
    heading: 'Specialist AI agents for every step',
    subtitle:
      'Each agent knows one category inside out. Tell it what you need and it recommends the best services from the FoundStart partner catalog.',
    partners: (n: number) => `${n} partner services`,
    open: 'Chat',
  },
  ar: {
    title: 'وكلاء الذكاء الاصطناعي',
    heading: 'وكيل ذكاء اصطناعي متخصص لكل خطوة',
    subtitle:
      'كل وكيل فاهم مجاله كويس. قوله محتاج إيه وهو يرشحلك أنسب الخدمات من كتالوج شركاء FoundStart.',
    partners: (n: number) => `${n} خدمة شريكة`,
    open: 'ابدأ المحادثة',
  },
};

const Agents = () => {
  const { language, isRTL } = useTranslation();
  const s = strings[language];

  useEffect(() => {
    document.title = `FoundStart ${s.title}`;
  }, [s.title]);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto max-w-6xl px-4 py-16">
        <div className="mb-10 text-center">
          <Bot className="mx-auto mb-4 h-10 w-10 text-primary" />
          <h1 className="mb-3 text-3xl font-extrabold sm:text-4xl">{s.heading}</h1>
          <p className="mx-auto max-w-2xl text-muted-foreground">{s.subtitle}</p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {aiAgents.map((a) => {
            const Icon = iconMap[a.icon] ?? Bot;
            return (
              <Link key={a.slug} to={`/agents/${a.slug}`} className="group">
                <Card className="h-full transition-colors group-hover:border-primary/60">
                  <CardHeader>
                    <div className="mb-2 flex items-center justify-between">
                      <Icon className="h-6 w-6 text-primary" />
                      <Badge variant="secondary">{s.partners(a.partners)}</Badge>
                    </div>
                    <CardTitle className="text-lg">{a.name[language]}</CardTitle>
                    <CardDescription className={isRTL ? 'text-right' : ''}>
                      {a.tagline[language]}
                    </CardDescription>
                  </CardHeader>
                </Card>
              </Link>
            );
          })}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Agents;
