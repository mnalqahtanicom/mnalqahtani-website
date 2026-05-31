import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { useTranslations } from 'next-intl';
import Container from '@/components/ui/Container';
import Button from '@/components/ui/Button';
import SectionHeading from '@/components/ui/SectionHeading';
import Portrait from '@/components/ui/Portrait';
import ExecutiveCredentials from '@/components/sections/ExecutiveCredentials';
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
  const t = await getTranslations({ locale, namespace: 'about.meta' });
  return {
    title: t('title'),
    description: t('description'),
    alternates: {
      canonical: `/${locale}/about`,
      languages: { ar: '/ar/about', en: '/en/about', 'x-default': '/ar/about' },
    },
  };
}

function AboutHero() {
  const t = useTranslations('about.hero');
  return (
    <section className="motif relative overflow-hidden bg-navy text-ivory">
      <Container className="relative">
        <div className="grid items-center gap-12 py-14 sm:py-20 lg:grid-cols-[1fr_0.8fr] lg:py-24">
          <div>
            <span className="mb-5 inline-flex items-center gap-2.5 text-[13px] font-semibold uppercase tracking-[0.22em] text-gold rtl:tracking-normal rtl:normal-case">
              <span className="inline-block h-px w-8 bg-gold" aria-hidden />
              {t('eyebrow')}
            </span>
            <h1 className="mb-5 text-[clamp(2.125rem,5vw,3.5rem)] text-white">
              {t('headline')}
            </h1>
            <p className="max-w-[46ch] text-lg font-light text-ivory/80">
              {t('subline')}
            </p>
          </div>
          <div className="mx-auto w-full max-w-[300px]">
            <Portrait alt={t('portraitAlt')} />
          </div>
        </div>
      </Container>
    </section>
  );
}

function Biography() {
  const t = useTranslations('about.bio');
  return (
    <section className="py-16 sm:py-24">
      <Container narrow>
        <SectionHeading tag={t('tag')} title={t('title')} className="mb-6" />
        <div className="space-y-5 text-lg text-slate">
          <p className="text-navy">{t('p1')}</p>
          <p>{t('p2')}</p>
          <p>{t('p3')}</p>
        </div>
      </Container>
    </section>
  );
}

function AboutCta() {
  const t = useTranslations('home.cta');
  return (
    <section className="bg-gradient-to-br from-navy to-slate py-16 text-center text-ivory sm:py-24">
      <Container>
        <h2 className="mb-4 text-3xl text-white sm:text-4xl">{t('title')}</h2>
        <p className="mx-auto mb-8 max-w-[50ch] text-lg font-light text-ivory/80">
          {t('subtitle')}
        </p>
        <Button href="/contact" variant="gold">
          {t('button')}
        </Button>
      </Container>
    </section>
  );
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <AboutHero />
      <Biography />
      <ExecutiveCredentials dark />
      <AboutCta />
    </>
  );
}
