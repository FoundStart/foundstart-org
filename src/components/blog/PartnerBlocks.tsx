import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import {
  Tooltip, TooltipContent, TooltipProvider, TooltipTrigger,
} from '@/components/ui/tooltip';
import { ArrowRight, AlertTriangle, ExternalLink } from 'lucide-react';
import {
  PartnerCatalog,
  PartnerCategoryKey,
  PARTNER_CATEGORIES,
  CATEGORY_LABELS,
  LocaleCode,
  validatePartnerEntry,
  validateCatalog,
  PartnerEntry,
  PARTNER_DOMAIN,
} from '@/data/blogPartnersConfig';
import { trackPartnerClick } from '@/utils/partnerClickTracking';

interface CommonProps {
  catalog: PartnerCatalog;
  locale: LocaleCode;
  blogSlug: string;
}

const glossaryAnchorId = (cat: PartnerCategoryKey) => `partners-glance-${cat}`;

/**
 * Renders ONLY partnered entries for a category as CTA cards.
 * Misclassified entries get a hover tooltip explaining why and the suggested fix.
 */
export const BlogPartnerGrid: React.FC<
  CommonProps & { category: PartnerCategoryKey }
> = ({ catalog, locale, blogSlug, category }) => {
  const entries = (catalog[category] ?? []).filter((p) => p.partnered);
  const showWarnings = import.meta.env.DEV;

  return (
    <TooltipProvider>
      <div className="not-prose my-6">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {entries.map((p) => {
            const v = validatePartnerEntry(p);
            const cardEl = (
              <Card key={p.id} className="hover:border-primary/50 transition-colors h-full">
                <CardContent className="p-5 flex flex-col h-full">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant="secondary">{p.name}</Badge>
                    {!v.ok && showWarnings && (
                      <Badge variant="destructive" className="gap-1">
                        <AlertTriangle className="w-3 h-3" />
                        misclassified
                      </Badge>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground mb-4 flex-1">{p.desc}</p>
                  <Button size="sm" asChild className="w-full">
                    <a
                      href={p.url}
                      target="_blank"
                      rel="noopener noreferrer sponsored"
                      onClick={() =>
                        trackPartnerClick({
                          partnerId: p.id,
                          partnerName: p.name,
                          category,
                          url: p.url,
                          blogSlug,
                          locale,
                        })
                      }
                    >
                      {locale === 'ar' ? `زيارة ${p.name}` : `Visit ${p.name}`}
                      <ArrowRight className="ms-2 w-4 h-4" />
                    </a>
                  </Button>
                </CardContent>
              </Card>
            );

            if (v.ok || !showWarnings) return <div key={p.id}>{cardEl}</div>;

            return (
              <Tooltip key={p.id}>
                <TooltipTrigger asChild>
                  <div>{cardEl}</div>
                </TooltipTrigger>
                <TooltipContent side="top" className="max-w-xs text-xs">
                  <p className="font-semibold mb-1 flex items-center gap-1">
                    <AlertTriangle className="w-3 h-3" /> Misclassified partner
                  </p>
                  <p className="mb-1">
                    Marked as <strong>partnered</strong> but its URL is not on{' '}
                    <code>{PARTNER_DOMAIN}</code>.
                  </p>
                  <p className="mb-1">
                    Current: <code className="break-all">{p.url}</code>
                  </p>
                  {v.suggestion && (
                    <p>
                      Suggested: <code className="break-all">{v.suggestion}</code>
                    </p>
                  )}
                </TooltipContent>
              </Tooltip>
            );
          })}
        </div>
      </div>
    </TooltipProvider>
  );
};

/**
 * "Partners at a glance" — single grouped glossary section showing
 * partnered CTAs + non-partnered mentions, with jump-link nav.
 */
export const PartnerGlossary: React.FC<CommonProps> = ({ catalog, locale, blogSlug }) => {
  const warnings = import.meta.env.DEV ? validateCatalog(catalog) : [];
  const heading = locale === 'ar' ? 'الشركاء في لمحة' : 'Partners at a Glance';
  const partneredLabel = locale === 'ar' ? 'شريك معتمد' : 'Partnered';
  const mentionLabel = locale === 'ar' ? 'ذُكر فقط' : 'Mention only';
  const jumpLabel = locale === 'ar' ? 'انتقل إلى:' : 'Jump to:';

  const visibleCategories = PARTNER_CATEGORIES.filter(
    (c) => (catalog[c] ?? []).length > 0,
  );

  return (
    <section id="partners-glance" className="not-prose my-12 scroll-mt-24">
      <h2 className="text-2xl font-bold mb-2">{heading}</h2>
      <p className="text-muted-foreground mb-4">
        {locale === 'ar'
          ? 'كل الشركاء المذكورين في هذا الدليل في مكان واحد — البطاقات للشركاء المعتمدين، النصوص للذكر فقط.'
          : 'Every partner referenced in this guide in one place — cards are partnered CTAs, plain text are non-partnered mentions.'}
      </p>

      {/* Jump-link nav */}
      <div className="flex flex-wrap items-center gap-2 mb-6 text-sm">
        <span className="text-muted-foreground">{jumpLabel}</span>
        {visibleCategories.map((cat) => (
          <a
            key={cat}
            href={`#${glossaryAnchorId(cat)}`}
            className="px-3 py-1 rounded-full border hover:bg-accent transition-colors"
          >
            {CATEGORY_LABELS[locale][cat]}
          </a>
        ))}
      </div>

      {warnings.length > 0 && (
        <Alert variant="destructive" className="mb-6">
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>
            <strong>{warnings.length}</strong>{' '}
            {locale === 'ar'
              ? 'تحذير(ات) في تصنيف الشركاء:'
              : 'partner classification warning(s):'}
            <ul className="mt-2 list-disc ms-5 text-xs">
              {warnings.slice(0, 8).map((w, i) => (
                <li key={i}>{w}</li>
              ))}
            </ul>
          </AlertDescription>
        </Alert>
      )}

      <div className="space-y-6">
        {visibleCategories.map((cat) => {
          const items: PartnerEntry[] = catalog[cat] ?? [];
          const partnered = items.filter((p) => p.partnered);
          const mentions = items.filter((p) => !p.partnered);

          return (
            <Card key={cat} id={glossaryAnchorId(cat)} className="scroll-mt-24">
              <CardContent className="p-5">
                <div className="flex items-center justify-between mb-3 flex-wrap gap-2">
                  <h3 className="text-lg font-semibold">{CATEGORY_LABELS[locale][cat]}</h3>
                  <div className="flex gap-2 text-xs">
                    <Badge variant="default">{partnered.length} {partneredLabel}</Badge>
                    {mentions.length > 0 && (
                      <Badge variant="outline">{mentions.length} {mentionLabel}</Badge>
                    )}
                  </div>
                </div>

                {partnered.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-3">
                    {partnered.map((p) => (
                      <a
                        key={p.id}
                        href={p.url}
                        target="_blank"
                        rel="noopener noreferrer sponsored"
                        onClick={() =>
                          trackPartnerClick({
                            partnerId: p.id,
                            partnerName: p.name,
                            category: cat,
                            url: p.url,
                            blogSlug,
                            locale,
                          })
                        }
                        className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-primary/10 text-primary hover:bg-primary/20 text-sm transition-colors"
                      >
                        {p.name}
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    ))}
                  </div>
                )}

                {mentions.length > 0 && (
                  <p className="text-sm text-muted-foreground">
                    <span className="font-medium">{mentionLabel}: </span>
                    {mentions.map((p, idx) => (
                      <React.Fragment key={p.id}>
                        <a
                          href={p.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="underline hover:text-foreground"
                        >
                          {p.name}
                        </a>
                        {idx < mentions.length - 1 ? ', ' : ''}
                      </React.Fragment>
                    ))}
                  </p>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>
    </section>
  );
};
