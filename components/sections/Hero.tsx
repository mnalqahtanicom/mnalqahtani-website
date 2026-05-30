import { useTranslations } from 'next-intl';
import Container from '@/components/ui/Container';
import Button from '@/components/ui/Button';

export default function Hero() {
  const t = useTranslations('home.hero');

  return (
    <section className="motif relative overflow-hidden bg-navy text-ivory">
      <Container className="relative">
        <div className="grid items-center gap-12 py-16 sm:py-24 lg:grid-cols-[1.15fr_0.85fr] lg:py-28">
          <div>
            <span className="mb-5 inline-flex items-center gap-2.5 text-[13px] font-semibold uppercase tracking-[0.22em] text-gold rtl:tracking-normal rtl:normal-case">
              <span className="inline-block h-px w-8 bg-gold" aria-hidden />
              {t('eyebrow')}
            </span>
            <h1 className="mb-5 text-[clamp(2.5rem,6vw,4.25rem)] text-white">
              {t('headline')}
            </h1>
            <p className="mb-8 max-w-[40ch] text-lg font-light text-ivory/80 sm:text-xl">
              {t('subline')}
            </p>
            <div className="flex flex-wrap gap-4">
              <Button href="/#cta" variant="gold">
                {t('ctaPrimary')}
              </Button>
              <Button href="/#insights" variant="ghost">
                {t('ctaSecondary')}
              </Button>
            </div>
          </div>

          <div className="relative mx-auto aspect-[4/5] w-full max-w-[340px] overflow-hidden rounded-2xl border border-gold/35 bg-gradient-to-b from-[#1a3454] to-navy shadow-portrait">
            <div className="grid h-full place-items-center px-5 text-center text-[13px] text-ivory/35">
              {t('portraitAlt')}
            </div>
            <div
              className="absolute inset-x-0 bottom-0 h-[38%] bg-gradient-to-t from-navy/90 to-transparent"
              aria-hidden
            />
          </div>
        </div>
      </Container>
    </section>
  );
}
