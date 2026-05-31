import { setRequestLocale } from 'next-intl/server';
import Hero from '@/components/sections/Hero';
import StrategyToResults from '@/components/sections/StrategyToResults';
import PillarHighlights from '@/components/sections/PillarHighlights';
import HomeStories from '@/components/sections/HomeStories';
import HomePerspectives from '@/components/sections/HomePerspectives';
import ExecutiveCredentials from '@/components/sections/ExecutiveCredentials';
import QuoteBlock from '@/components/sections/QuoteBlock';
import CtaBand from '@/components/sections/CtaBand';
import { PersonJsonLd } from '@/components/seo/JsonLd';
import { getSettings } from '@/lib/settings';
import type { Locale } from '@/lib/knowledge/types';

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const settings = await getSettings(locale as Locale);

  return (
    <>
      <PersonJsonLd locale={locale} sameAs={settings.social.map((s) => s.href)} />
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
      <HomeStories />
      <HomePerspectives />
      <ExecutiveCredentials />
      <QuoteBlock />
      <CtaBand />
    </>
  );
}
