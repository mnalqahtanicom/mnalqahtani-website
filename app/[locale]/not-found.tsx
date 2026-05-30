import { useTranslations } from 'next-intl';
import Container from '@/components/ui/Container';
import Button from '@/components/ui/Button';

export default function NotFound() {
  const t = useTranslations('nav');

  return (
    <section className="bg-navy py-32 text-center text-ivory">
      <Container>
        <p className="font-serif text-6xl text-gold rtl:font-serif-ar">404</p>
        <h1 className="mt-4 text-3xl text-white">Page not found</h1>
        <div className="mt-8 flex justify-center">
          <Button href="/" variant="gold">
            {t('about')}
          </Button>
        </div>
      </Container>
    </section>
  );
}
