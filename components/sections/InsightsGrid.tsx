import { getLocale, getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import Container from '@/components/ui/Container';
import SectionHeading from '@/components/ui/SectionHeading';
import InsightCard from '@/components/insights/InsightCard';
import { getFeaturedInsights, type Locale } from '@/lib/insights';

export default async function InsightsGrid() {
  const locale = (await getLocale()) as Locale;
  const t = await getTranslations('home.insights');
  const featured = await getFeaturedInsights(locale, 3);

  if (!featured.length) return null;

  return (
    <section id="insights" className="py-16 sm:py-24 lg:py-28">
      <Container>
        <div className="mb-14 flex flex-wrap items-end justify-between gap-4">
          <SectionHeading tag={t('tag')} title={t('title')} />
          <Link
            href="/insights"
            className="text-sm font-semibold text-slate transition-colors hover:text-gold"
          >
            {t('viewAll')}{' '}
            <span className="rtl:-scale-x-100 inline-block" aria-hidden>
              →
            </span>
          </Link>
        </div>
        <div className="grid gap-6 lg:grid-cols-3">
          {featured.map((insight) => (
            <InsightCard key={insight.slug} insight={insight} />
          ))}
        </div>
      </Container>
    </section>
  );
}
