import { setRequestLocale } from 'next-intl/server';
import Hero from '@/components/sections/Hero';
import StrategyToResults from '@/components/sections/StrategyToResults';
import InsightsGrid from '@/components/sections/InsightsGrid';
import ExecutiveCredentials from '@/components/sections/ExecutiveCredentials';
import QuoteBlock from '@/components/sections/QuoteBlock';
import CtaBand from '@/components/sections/CtaBand';
import { PersonJsonLd } from '@/components/seo/JsonLd';

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <PersonJsonLd locale={locale} />
      <Hero />
      <StrategyToResults />
      <InsightsGrid />
      <ExecutiveCredentials />
      <QuoteBlock />
      <CtaBand />
    </>
  );
}
