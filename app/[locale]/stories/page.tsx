import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import Container from '@/components/ui/Container';
import EmptyState from '@/components/ui/EmptyState';
import StoryCard from '@/components/stories/StoryCard';
import { routing } from '@/i18n/routing';
import { getStories } from '@/lib/stories';
import type { Locale } from '@/lib/knowledge/types';

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'storiesPage' });
  return {
    title: t('metaTitle'),
    description: t('metaDescription'),
    alternates: {
      canonical: `/${locale}/stories`,
      languages: { ar: '/ar/stories', en: '/en/stories', 'x-default': '/ar/stories' },
    },
  };
}

export default async function StoriesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'storiesPage' });
  const stories = await getStories(locale as Locale);

  return (
    <>
      <section className="motif bg-navy py-16 text-ivory sm:py-20">
        <Container>
          <span className="enter text-sm font-semibold uppercase tracking-[0.2em] text-gold rtl:tracking-normal rtl:normal-case">
            {t('title')}
          </span>
          <h1 className="enter d1 mt-3 max-w-3xl text-[clamp(2rem,4.5vw,3.25rem)] text-white">
            {t('subtitle')}
          </h1>
        </Container>
      </section>

      {stories.length ? (
        <section className="py-14 sm:py-20">
          <Container>
            <div className="grid gap-6 md:grid-cols-2">
              {stories.map((s) => (
                <StoryCard key={s.slug} item={s} />
              ))}
            </div>
          </Container>
        </section>
      ) : (
        <EmptyState message={t('comingSoon')} />
      )}
    </>
  );
}
