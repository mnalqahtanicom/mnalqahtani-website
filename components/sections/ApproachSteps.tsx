import { useTranslations } from 'next-intl';
import Container from '@/components/ui/Container';
import SectionHeading from '@/components/ui/SectionHeading';

type Step = { title: string; body: string };

export default function ApproachSteps() {
  const t = useTranslations('home.approach');
  const tRoot = useTranslations();
  const steps = tRoot.raw('approachSteps') as Step[];

  return (
    <section className="bg-navy py-16 text-ivory sm:py-24 lg:py-28">
      <Container>
        <SectionHeading
          tag={t('tag')}
          title={t('title')}
          subtitle={t('subtitle')}
          dark
          className="mb-12"
        />
        <div className="grid sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, i) => (
            <div
              key={step.title}
              className="px-6 py-7 lg:border-e lg:border-ivory/10 lg:last:border-e-0"
            >
              <span className="mb-4 grid h-[46px] w-[46px] place-items-center rounded-full border border-gold font-serif text-lg text-gold rtl:font-serif-ar">
                {String(i + 1).padStart(2, '0')}
              </span>
              <h3 className="mb-2 text-lg text-white">{step.title}</h3>
              <p className="text-sm text-ivory/65">{step.body}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
