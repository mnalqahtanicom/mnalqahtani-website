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
  const t = await getTranslations({ locale, namespace: 'knowledgePage' });
  return {
    title: t('metaTitle'),
    description: t('metaDescription'),
    alternates: {
      canonical: `/${locale}/knowledge`,
      languages: {
        ar: '/ar/knowledge',
        en: '/en/knowledge',
        'x-default': '/ar/knowledge',
      },
    },
  };
}

export default async function KnowledgePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <PillarHub locale={locale as Locale} pillar="knowledge" namespace="knowledgePage" />;
}
