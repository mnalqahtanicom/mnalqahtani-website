import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import Container from '@/components/ui/Container';
import InsightsExplorer from '@/components/insights/InsightsExplorer';
import InsightCard from '@/components/insights/InsightCard';
import { routing } from '@/i18n/routing';
import {
  getAllInsights,
  getCategories,
  getFeaturedInsights,
  type Locale,
} from '@/lib/insights';

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'insightsPage' });
  return {
    title: t('metaTitle'),
    description: t('metaDescription'),
    alternates: {
      canonical: `/${locale}/insights`,
      languages: {
        ar: '/ar/insights',
        en: '/en/insights',
        'x-default': '/ar/insights',
      },
    },
  };
}

export default async function InsightsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'insightsPage' });

  const loc = locale as Locale;
  const [insights, categories, featured] = await Promise.all([
    getAllInsights(loc),
    getCategories(loc),
    getFeaturedInsights(loc, 2),
  ]);

  return (
    <>
      <section className="motif bg-navy py-16 text-ivory sm:py-20">
        <Container>
          <span className="text-sm font-semibold uppercase tracking-[0.2em] text-gold rtl:tracking-normal rtl:normal-case">
            {t('title')}
          </span>
          <h1 className="mt-3 max-w-3xl text-[clamp(2rem,4.5vw,3.25rem)] text-white">
            {t('subtitle')}
          </h1>
        </Container>
      </section>

      <section className="py-14 sm:py-20">
        <Container>
          {featured.length ? (
            <div className="mb-14">
              <h2 className="mb-6 text-sm font-semibold uppercase tracking-[0.2em] text-gold rtl:tracking-normal rtl:normal-case">
                {t('featured')}
              </h2>
              <div className="grid gap-6 lg:grid-cols-2">
                {featured.map((insight) => (
                  <InsightCard key={insight.slug} insight={insight} />
                ))}
              </div>
            </div>
          ) : null}

          <InsightsExplorer
            insights={insights}
            categories={categories}
            labels={{
              searchPlaceholder: t('searchPlaceholder'),
              allCategories: t('allCategories'),
              noResults: t('noResults'),
            }}
          />
        </Container>
      </section>
    </>
  );
}
