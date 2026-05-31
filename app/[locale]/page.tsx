import { setRequestLocale } from 'next-intl/server';
import Hero from '@/components/sections/Hero';
import StrategyToResults from '@/components/sections/StrategyToResults';
import PillarHighlights from '@/components/sections/PillarHighlights';
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
      <PillarHighlights
        pillar="knowledge"
        namespace="home.insights"
        viewAllHref="/knowledge"
      />
      <PillarHighlights
        pillar="frameworks"
        namespace="home.frameworks"
        viewAllHref="/frameworks"
        tinted
      />
      <ExecutiveCredentials />
      <QuoteBlock />
      <CtaBand />
    </>
  );
}
