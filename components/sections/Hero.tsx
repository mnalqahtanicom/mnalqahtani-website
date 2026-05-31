import { getLocale, getTranslations } from 'next-intl/server';
import Container from '@/components/ui/Container';
import Button from '@/components/ui/Button';
import Portrait from '@/components/ui/Portrait';
import { getSettings } from '@/lib/settings';
import type { Locale } from '@/lib/knowledge/types';

export default async function Hero() {
  const locale = (await getLocale()) as Locale;
  const t = await getTranslations('home.hero');
  const settings = await getSettings(locale);

  const eyebrow = settings.hero.eyebrow || t('eyebrow');
  const headline = settings.hero.headline || t('headline');
  const subline = settings.hero.subline || t('subline');

  return (
    <section className="motif relative overflow-hidden bg-navy text-ivory">
      <Container className="relative">
        <div className="grid items-center gap-12 py-16 sm:py-24 lg:grid-cols-[1.15fr_0.85fr] lg:py-28">
          <div>
            <span className="enter mb-5 inline-flex items-center gap-2.5 text-[13px] font-semibold uppercase tracking-[0.22em] text-gold rtl:tracking-normal rtl:normal-case">
              <span className="inline-block h-px w-8 bg-gold" aria-hidden />
              {eyebrow}
            </span>
            <h1 className="enter d1 mb-5 text-[clamp(2.5rem,6vw,4.25rem)] text-white">
              {headline}
            </h1>
            <p className="enter d2 mb-8 max-w-[44ch] text-lg font-light text-ivory/80 sm:text-xl">
              {subline}
            </p>
            <div className="enter d3 flex flex-wrap gap-4">
              <Button href="/knowledge" variant="gold">
                {t('ctaPrimary')}
              </Button>
              <Button href="/strategy-to-results" variant="ghost">
                {t('ctaSecondary')}
              </Button>
            </div>
          </div>

          <div className="mx-auto w-full max-w-[360px]">
            <Portrait src={settings.portraitUrl} alt={t('portraitAlt')} />
          </div>
        </div>
      </Container>
    </section>
  );
}
