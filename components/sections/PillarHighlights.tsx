import { getLocale, getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import Container from '@/components/ui/Container';
import SectionHeading from '@/components/ui/SectionHeading';
import KnowledgeCard from '@/components/knowledge/KnowledgeCard';
import { getFeatured, type Locale, type Pillar } from '@/lib/knowledge';
import { cn } from '@/lib/utils';

export default async function PillarHighlights({
  pillar,
  namespace,
  viewAllHref,
  tinted = false,
}: {
  pillar: Pillar;
  namespace: 'home.insights' | 'home.frameworks';
  viewAllHref: string;
  tinted?: boolean;
}) {
  const locale = (await getLocale()) as Locale;
  const t = await getTranslations(namespace);
  const items = await getFeatured(locale, pillar, 3);

  if (!items.length) return null;

  return (
    <section className={cn('py-16 sm:py-24 lg:py-28', tinted && 'bg-white')}>
      <Container>
        <div className="mb-14 flex flex-wrap items-end justify-between gap-4">
          <SectionHeading tag={t('tag')} title={t('title')} />
          <Link
            href={viewAllHref}
            className="text-sm font-semibold text-slate transition-colors hover:text-gold"
          >
            {t('viewAll')}{' '}
            <span className="rtl:-scale-x-100 inline-block" aria-hidden>
              →
            </span>
          </Link>
        </div>
        <div className="grid gap-6 lg:grid-cols-3">
          {items.map((item) => (
            <KnowledgeCard key={item.slug} item={item} />
          ))}
        </div>
      </Container>
    </section>
  );
}
