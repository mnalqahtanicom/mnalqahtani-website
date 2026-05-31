import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import Container from '@/components/ui/Container';
import PortableTextBody from '@/components/knowledge/PortableTextBody';
import { ArticleJsonLd } from '@/components/seo/JsonLd';
import { routing } from '@/i18n/routing';
import { getStoryBySlug, getStorySlugs } from '@/lib/stories';
import type { PortableTextBlock } from '@portabletext/types';
import type { Locale } from '@/lib/knowledge/types';

export async function generateStaticParams() {
  const slugs = await getStorySlugs();
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
  const story = await getStoryBySlug(slug, locale as Locale);
  if (!story) return {};
  return {
    title: story.seo.title ?? story.title,
    description: story.seo.description ?? story.summary ?? story.title,
    alternates: {
      canonical: `/${locale}/stories/${slug}`,
      languages: { ar: `/ar/stories/${slug}`, en: `/en/stories/${slug}` },
    },
  };
}

function Section({
  label,
  body,
}: {
  label: string;
  body: PortableTextBlock[];
}) {
  if (!body?.length) return null;
  return (
    <div className="mb-10">
      <h2 className="mb-3 text-sm font-semibold uppercase tracking-[0.14em] text-gold rtl:tracking-normal rtl:normal-case">
        {label}
      </h2>
      <PortableTextBody value={body} />
    </div>
  );
}

export default async function StoryPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const loc = locale as Locale;

  const story = await getStoryBySlug(slug, loc);
  if (!story) notFound();

  const t = await getTranslations({ locale, namespace: 'storiesPage' });

  return (
    <>
      <ArticleJsonLd
        locale={locale}
        path={`/stories/${story.slug}`}
        title={story.title}
        description={story.summary ?? story.title}
        datePublished={story.publishedAt}
        image={story.coverImageUrl}
      />
      <article>
        <header className="motif bg-navy py-14 text-ivory sm:py-20">
          <Container narrow>
            <Link
              href="/stories"
              className="text-sm font-medium text-gold transition-colors hover:text-gold-soft"
            >
              <span className="rtl:hidden">←</span>
              <span className="hidden rtl:inline">→</span> {t('back')}
            </Link>
            {story.sector ? (
              <span className="mt-6 block text-sm font-semibold uppercase tracking-[0.12em] text-gold rtl:tracking-normal rtl:normal-case">
                {story.sector}
              </span>
            ) : null}
            <h1 className="mt-3 text-[clamp(1.875rem,4vw,3rem)] text-white">
              {story.title}
            </h1>
          </Container>
        </header>

        <Container narrow className="py-14 sm:py-20">
          <Section label={t('challenge')} body={story.challenge} />
          <Section label={t('solution')} body={story.solution} />
          <Section label={t('impact')} body={story.impact} />
          <Section label={t('lessons')} body={story.lessonsLearned} />
        </Container>
      </article>
    </>
  );
}
