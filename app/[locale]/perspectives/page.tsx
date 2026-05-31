import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import Container from '@/components/ui/Container';
import EmptyState from '@/components/ui/EmptyState';
import PerspectiveCard from '@/components/perspectives/PerspectiveCard';
import { routing } from '@/i18n/routing';
import { getPerspectives } from '@/lib/perspectives';
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
  const t = await getTranslations({ locale, namespace: 'perspectivesPage' });
  return {
    title: t('metaTitle'),
    description: t('metaDescription'),
    alternates: {
      canonical: `/${locale}/perspectives`,
      languages: {
        ar: '/ar/perspectives',
        en: '/en/perspectives',
        'x-default': '/ar/perspectives',
      },
    },
  };
}

export default async function PerspectivesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'perspectivesPage' });
  const perspectives = await getPerspectives(locale as Locale);

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

      {perspectives.length ? (
        <section className="py-14 sm:py-20">
          <Container>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {perspectives.map((p) => (
                <PerspectiveCard key={p.id} item={p} />
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
