import type { ReactNode } from 'react';
import { ExternalLink } from 'lucide-react';

// Turn bare URLs in bot/agent replies into markdown links so they render as tappable cards.
export const linkify = (text: string): string =>
  text
    .replace(/(?<!\])\(\s*(https?:\/\/[^\s)]+)\s*\)/g, '$1')
    .replace(/(?<!\])\(\s*(\/[a-z0-9][a-z0-9\/-]*)\s*\)/gi, '$1')
    .replace(/(?<!\]\()\s(\/[a-z][a-z0-9\/-]*[a-z0-9])(?=[\s.,;:!?)]|$)/gi, (m, p) => ` [${p}](${p})`)
    .replace(/(?<!\]\()(https?:\/\/[^\s)>\]]+)/g, (u) => {
      let label = u;
      try {
        const p = new URL(u);
        label = p.hostname.replace(/^www\./, '') + (p.pathname !== '/' ? p.pathname : '');
      } catch { /* keep raw */ }
      return `[${label}](${u})`;
    });

export const chatMdComponents = {
  a: ({ href, children }: { href?: string; children?: ReactNode }) => (
    <a
      href={href}
      {...(href?.startsWith('/') ? {} : { target: '_blank', rel: 'noopener noreferrer' })}
      className="my-1 flex items-center justify-between gap-2 rounded-lg border bg-card px-3 py-2 text-sm font-medium text-primary transition-colors hover:bg-primary/5"
    >
      <span className="truncate">{children}</span>
      <ExternalLink className="h-4 w-4 shrink-0" />
    </a>
  ),
  p: ({ children }: { children?: ReactNode }) => <p className="mb-2 last:mb-0">{children}</p>,
  ol: ({ children }: { children?: ReactNode }) => <ol className="mb-2 list-decimal space-y-1 ps-5">{children}</ol>,
  ul: ({ children }: { children?: ReactNode }) => <ul className="mb-2 list-disc space-y-1 ps-5">{children}</ul>,
  strong: ({ children }: { children?: ReactNode }) => <strong className="font-semibold">{children}</strong>,
};
