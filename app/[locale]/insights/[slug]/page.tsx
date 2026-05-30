import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import Container from '@/components/ui/Container';
import PortableTextBody from '@/components/insights/PortableTextBody';
import InsightCard from '@/components/insights/InsightCard';
import { ArticleJsonLd } from '@/components/seo/JsonLd';
import { routing } from '@/i18n/routing';
import {
  getAllInsights,
  getAllInsightSlugs,
  getInsightBySlug,
  type Locale,
} from '@/lib/insights';

export async function generateStaticParams() {
  const slugs = await getAllInsightSlugs();
  return routing.locales.flatMap((locale) =>
    slugs.map((slug) => ({ locale, slug })),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const insight = await getInsightBySlug(slug, locale as Locale);
  if (!insight) return {};
  return {
    title: insight.title,
    description: insight.excerpt,
    alternates: {
      canonical: `/${locale}/insights/${slug}`,
      languages: {
        ar: `/ar/insights/${slug}`,
        en: `/en/insights/${slug}`,
      },
    },
    openGraph: {
      type: 'article',
      title: insight.title,
      description: insight.excerpt,
      images: insight.coverImageUrl ? [insight.coverImageUrl] : undefined,
    },
  };
}

export default async function InsightPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const loc = locale as Locale;

  const insight = await getInsightBySlug(slug, loc);
  if (!insight) notFound();

  const t = await getTranslations({ locale, namespace: 'insightsPage' });

  const related = (await getAllInsights(loc))
    .filter(
      (i) => i.slug !== insight.slug && i.category?.slug === insight.category?.slug,
    )
    .slice(0, 3);

  const dateLabel = new Intl.DateTimeFormat(locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(new Date(insight.publishedAt));

  return (
    <>
      <ArticleJsonLd
        locale={locale}
        slug={insight.slug}
        title={insight.title}
        description={insight.excerpt}
        datePublished={insight.publishedAt}
        image={insight.coverImageUrl}
      />

      <article>
        <header className="motif bg-navy py-14 text-ivory sm:py-20">
          <Container narrow>
            <Link
              href="/insights"
              className="text-sm font-medium text-gold transition-colors hover:text-gold-soft"
            >
              <span className="rtl:hidden">←</span>
              <span className="hidden rtl:inline">→</span> {t('backToInsights')}
            </Link>
            {insight.category ? (
              <span className="mt-6 block text-sm font-semibold uppercase tracking-[0.12em] text-gold rtl:tracking-normal rtl:normal-case">
                {insight.category.title}
              </span>
            ) : null}
            <h1 className="mt-3 text-[clamp(1.875rem,4vw,3rem)] text-white">
              {insight.title}
            </h1>
            <p className="mt-4 text-sm text-ivory/60">{dateLabel}</p>
          </Container>
        </header>

        {insight.coverImageUrl ? (
          <Container narrow className="-mt-8">
            <div className="relative aspect-[16/9] overflow-hidden rounded-2xl border border-line shadow-card">
              <Image
                src={insight.coverImageUrl}
                alt={insight.title}
                fill
                sizes="(max-width: 768px) 90vw, 760px"
                className="object-cover"
                priority
              />
            </div>
          </Container>
        ) : null}

        <Container narrow className="py-14 sm:py-20">
          <PortableTextBody value={insight.body} />

          {insight.tags.length ? (
            <div className="mt-12 flex flex-wrap items-center gap-2.5 border-t border-line pt-8">
              <span className="text-sm font-semibold text-navy">
                {t('tagsLabel')}:
              </span>
              {insight.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-line bg-white px-3 py-1 text-sm text-slate"
                >
                  {tag}
                </span>
              ))}
            </div>
          ) : null}
        </Container>

        {related.length ? (
          <section className="border-t border-line bg-white py-14 sm:py-20">
            <Container>
              <h2 className="mb-8 text-2xl text-navy">{t('relatedTitle')}</h2>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {related.map((item) => (
                  <InsightCard key={item.slug} insight={item} />
                ))}
              </div>
            </Container>
          </section>
        ) : null}
      </article>
    </>
  );
}
