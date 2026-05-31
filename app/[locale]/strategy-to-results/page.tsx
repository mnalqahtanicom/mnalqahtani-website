import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { useTranslations } from 'next-intl';
import Container from '@/components/ui/Container';
import Button from '@/components/ui/Button';
import { routing } from '@/i18n/routing';

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'strategyToResults' });
  return {
    title: t('metaTitle'),
    description: t('metaDescription'),
    alternates: {
      canonical: `/${locale}/strategy-to-results`,
      languages: {
        ar: '/ar/strategy-to-results',
        en: '/en/strategy-to-results',
        'x-default': '/ar/strategy-to-results',
      },
    },
  };
}

type Stage = { name: string; body: string };

function Stages() {
  const t = useTranslations('strategyToResults');
  const stages = t.raw('stages') as Stage[];

  return (
    <ol className="mx-auto max-w-2xl">
      {stages.map((stage, i) => (
        <li key={stage.name} className="relative">
          <div className="flex gap-5">
            <div className="flex flex-col items-center">
              <span className="grid h-12 w-12 flex-shrink-0 place-items-center rounded-full border border-gold bg-navy font-serif text-lg font-semibold text-gold rtl:font-serif-ar">
                {i + 1}
              </span>
              {i < stages.length - 1 ? (
                <span className="my-1 w-px flex-1 bg-gold/40" aria-hidden />
              ) : null}
            </div>
            <div className={i < stages.length - 1 ? 'pb-10' : ''}>
              <h2 className="text-2xl text-navy">{stage.name}</h2>
              <p className="mt-2 text-lg leading-relaxed text-slate">
                {stage.body}
              </p>
            </div>
          </div>
        </li>
      ))}
    </ol>
  );
}

export default async function StrategyToResultsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'strategyToResults' });
  const tCta = await getTranslations({ locale, namespace: 'home.cta' });

  return (
    <>
      <section className="motif bg-navy py-16 text-ivory sm:py-20 lg:py-24">
        <Container>
          <span className="text-sm font-semibold uppercase tracking-[0.2em] text-gold rtl:tracking-normal rtl:normal-case">
            {t('tag')}
          </span>
          <h1 className="mt-3 max-w-3xl text-[clamp(2rem,4.5vw,3.25rem)] text-white">
            {t('title')}
          </h1>
          <p className="mt-5 max-w-2xl text-lg font-light text-ivory/80">
            {t('subtitle')}
          </p>
        </Container>
      </section>

      <section className="py-16 sm:py-24">
        <Container narrow>
          <p className="mb-14 text-xl leading-relaxed text-slate">
            {t('intro')}
          </p>
          <Stages />
        </Container>
      </section>

      <section className="bg-gradient-to-br from-navy to-slate py-16 text-center text-ivory sm:py-24">
        <Container>
          <h2 className="mb-4 text-3xl text-white sm:text-4xl">
            {tCta('title')}
          </h2>
          <p className="mx-auto mb-8 max-w-[50ch] text-lg font-light text-ivory/80">
            {tCta('subtitle')}
          </p>
          <Button href="/contact" variant="gold">
            {tCta('button')}
          </Button>
        </Container>
      </section>
    </>
  );
}
