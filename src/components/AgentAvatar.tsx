import {
  Building2, Code2, Megaphone, Mail, Briefcase, Workflow, Clapperboard, Sparkles,
  TrendingUp, Server, ShoppingCart, Store, KanbanSquare, Landmark, DollarSign, Palette,
  Users, Video, UserCheck, Globe, Mic, Smartphone, GraduationCap, Plane,
  FileText, Shield, AtSign, Gift, Bot, type LucideIcon,
} from 'lucide-react';

export const agentIconMap: Record<string, LucideIcon> = {
  'building-2': Building2, 'code-2': Code2, megaphone: Megaphone, mail: Mail,
  briefcase: Briefcase, workflow: Workflow, clapperboard: Clapperboard, sparkles: Sparkles,
  'trending-up': TrendingUp, server: Server, 'shopping-cart': ShoppingCart, store: Store,
  'kanban-square': KanbanSquare, landmark: Landmark, 'dollar-sign': DollarSign, palette: Palette,
  users: Users, video: Video, 'user-check': UserCheck, globe: Globe, mic: Mic,
  smartphone: Smartphone, 'graduation-cap': GraduationCap, plane: Plane,
  'file-text': FileText, shield: Shield, 'at-sign': AtSign, gift: Gift,
};

// Restrained, designed look: one tinted swatch per agent, crisp icon. Deterministic per slug.
const tints = [
  'bg-blue-500/10 text-blue-600 dark:text-blue-400',
  'bg-violet-500/10 text-violet-600 dark:text-violet-400',
  'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400',
  'bg-amber-500/10 text-amber-600 dark:text-amber-400',
  'bg-rose-500/10 text-rose-600 dark:text-rose-400',
  'bg-cyan-500/10 text-cyan-600 dark:text-cyan-400',
  'bg-indigo-500/10 text-indigo-600 dark:text-indigo-400',
  'bg-teal-500/10 text-teal-600 dark:text-teal-400',
  'bg-fuchsia-500/10 text-fuchsia-600 dark:text-fuchsia-400',
  'bg-orange-500/10 text-orange-600 dark:text-orange-400',
];

const pickTint = (slug: string) => {
  let h = 0;
  for (let i = 0; i < slug.length; i++) h = (h * 31 + slug.charCodeAt(i)) >>> 0;
  return tints[h % tints.length];
};

interface AgentAvatarProps {
  slug: string;
  icon: string;
  className?: string;   // outer size, e.g. "h-12 w-12"
  iconClassName?: string; // icon size, e.g. "h-5 w-5"
}

const AgentAvatar = ({ slug, icon, className = 'h-12 w-12', iconClassName = 'h-5 w-5' }: AgentAvatarProps) => {
  const Icon = agentIconMap[icon] ?? Bot;
  return (
    <div className={`flex items-center justify-center rounded-xl ${pickTint(slug)} ${className}`}>
      <Icon className={iconClassName} strokeWidth={1.8} />
    </div>
  );
};

export default AgentAvatar;
