import { useTranslations } from 'next-intl';
import Container from '@/components/ui/Container';
import Button from '@/components/ui/Button';

export default function CtaBand() {
  const t = useTranslations('home.cta');

  return (
    <section
      id="cta"
      className="bg-gradient-to-br from-navy to-slate py-16 text-center text-ivory sm:py-24 lg:py-28"
    >
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
