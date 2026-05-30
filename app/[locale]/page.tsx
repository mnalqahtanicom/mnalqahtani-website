import { setRequestLocale } from 'next-intl/server';
import Hero from '@/components/sections/Hero';
import CredibilityStrip from '@/components/sections/CredibilityStrip';
import ExpertiseGrid from '@/components/sections/ExpertiseGrid';
import ApproachSteps from '@/components/sections/ApproachSteps';
import InsightsGrid from '@/components/sections/InsightsGrid';
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
      <CredibilityStrip />
      <ExpertiseGrid />
      <ApproachSteps />
      <InsightsGrid />
      <QuoteBlock />
      <CtaBand />
    </>
  );
}
