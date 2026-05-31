import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import PillarHub from '@/components/knowledge/PillarHub';
import { routing } from '@/i18n/routing';
import type { Locale } from '@/lib/knowledge';

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'frameworksPage' });
  return {
    title: t('metaTitle'),
    description: t('metaDescription'),
    alternates: {
      canonical: `/${locale}/frameworks`,
      languages: {
        ar: '/ar/frameworks',
        en: '/en/frameworks',
        'x-default': '/ar/frameworks',
      },
    },
  };
}

export default async function FrameworksPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <PillarHub locale={locale as Locale} pillar="frameworks" namespace="frameworksPage" />;
}
