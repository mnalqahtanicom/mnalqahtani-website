import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { useTranslations } from 'next-intl';
import Container from '@/components/ui/Container';
import Button from '@/components/ui/Button';
import SectionHeading from '@/components/ui/SectionHeading';
import Timeline from '@/components/sections/Timeline';
import Principles from '@/components/sections/Principles';
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
          <div className="relative mx-auto aspect-[4/5] w-full max-w-[300px] overflow-hidden rounded-2xl border border-gold/35 bg-gradient-to-b from-[#1a3454] to-navy shadow-portrait" />
        </div>
      </Container>
    </section>
  );
}

function Biography() {
  const t = useTranslations('about.bio');
  return (
    <section className="py-16 sm:py-24 lg:py-28">
      <Container narrow>
        <SectionHeading tag={t('tag')} title={t('title')} className="mb-6" />
        <div className="space-y-5 text-lg text-slate">
          <p>
            <span className="text-navy">{t('p1')}</span>
          </p>
          <p>{t('p2')}</p>
          <p>{t('p3')}</p>
        </div>
      </Container>
    </section>
  );
}

function Philosophy() {
  const t = useTranslations('about.philosophy');
  return (
    <section className="bg-navy py-16 text-ivory sm:py-24 lg:py-28">
      <Container>
        <span className="text-sm font-semibold uppercase tracking-[0.2em] text-gold rtl:tracking-normal rtl:normal-case">
          {t('tag')}
        </span>
        <h2 className="mb-6 mt-3.5 text-3xl text-white sm:text-4xl">
          {t('title')}
        </h2>
        <p className="max-w-4xl font-serif text-2xl leading-relaxed text-white sm:text-3xl rtl:font-serif-ar">
          {t('quote')}
        </p>
      </Container>
    </section>
  );
}

function Credentials() {
  const t = useTranslations('about.credentials');
  const panels = [
    {
      kicker: t('educationKicker'),
      title: t('educationTitle'),
      body: t('educationBody'),
      meta: t('educationMeta'),
    },
    {
      kicker: t('experienceKicker'),
      title: t('experienceTitle'),
      body: t('experienceBody'),
      meta: t('experienceMeta'),
    },
  ];
  return (
    <section className="py-16 sm:py-24 lg:py-28">
      <Container>
        <SectionHeading tag={t('tag')} title={t('title')} className="mb-10" />
        <div className="grid gap-6 md:grid-cols-2">
          {panels.map((p) => (
            <div
              key={p.title}
              className="rounded-2xl border border-line bg-white p-8"
            >
              <span className="text-xs font-semibold uppercase tracking-[0.14em] text-gold rtl:tracking-normal rtl:normal-case">
                {p.kicker}
              </span>
              <h3 className="mb-1.5 mt-2.5 text-xl text-navy">{p.title}</h3>
              <p className="text-[15px] text-muted">{p.body}</p>
              <p className="mt-3.5 text-sm font-medium text-slate">{p.meta}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

function AboutCta() {
  const t = useTranslations('home.cta');
  const tAbout = useTranslations('about');
  return (
    <section className="bg-gradient-to-br from-navy to-slate py-16 text-center text-ivory sm:py-24 lg:py-28">
      <Container>
        <h2 className="mb-4 text-3xl text-white sm:text-4xl">{t('title')}</h2>
        <p className="mx-auto mb-8 max-w-[50ch] text-lg font-light text-ivory/80">
          {t('subtitle')}
        </p>
        <div className="flex flex-col items-center gap-4">
          <Button href="/#cta" variant="gold">
            {t('button')}
          </Button>
          <Button href="/#cta" variant="ghost">
            {tAbout('downloadBio')}
          </Button>
        </div>
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
      <Philosophy />
      <Credentials />
      <Timeline />
      <Principles />
      <AboutCta />
    </>
  );
}
