import { useTranslations } from 'next-intl';
import Container from '@/components/ui/Container';

export default function QuoteBlock() {
  const t = useTranslations('home.quote');

  return (
    <section className="bg-white py-16 sm:py-24 lg:py-28">
      <Container>
        <figure className="mx-auto max-w-3xl text-center">
          <span
            className="font-serif text-6xl leading-none text-gold opacity-50 rtl:font-serif-ar"
            aria-hidden
          >
            &ldquo;
          </span>
          <blockquote className="font-serif text-2xl leading-snug text-navy sm:text-3xl rtl:font-serif-ar rtl:leading-relaxed">
            {t('text')}
          </blockquote>
          <figcaption className="mt-6 text-sm tracking-wide text-muted">
            — {t('by')}
          </figcaption>
        </figure>
      </Container>
    </section>
  );
}
