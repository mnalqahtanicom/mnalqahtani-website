import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import Container from '@/components/ui/Container';
import SectionHeading from '@/components/ui/SectionHeading';

type Stage = { name: string; body: string };

export default function StrategyToResults() {
  const t = useTranslations('strategyToResults');
  const stages = t.raw('stages') as Stage[];

  return (
    <section className="motif bg-navy py-16 text-ivory sm:py-24 lg:py-28">
      <Container>
        <SectionHeading
          tag={t('tag')}
          title={t('title')}
          subtitle={t('subtitle')}
          dark
          className="mb-12"
        />

        <ol className="reveal grid gap-px overflow-hidden rounded-2xl border border-ivory/15 bg-ivory/10 sm:grid-cols-2 lg:grid-cols-3">
          {stages.map((stage, i) => (
            <li key={stage.name} className="bg-navy p-6">
              <div className="mb-3 flex items-center gap-3">
                <span className="grid h-8 w-8 place-items-center rounded-full border border-gold text-sm font-semibold text-gold">
                  {i + 1}
                </span>
                <h3 className="text-lg text-white">{stage.name}</h3>
              </div>
              <p className="text-sm text-ivory/65">{stage.body}</p>
            </li>
          ))}
        </ol>

        <div className="mt-10">
          <Link
            href="/strategy-to-results"
            className="inline-flex items-center gap-2 rounded-lg bg-gold px-6 py-3.5 text-sm font-semibold text-navy transition-all hover:-translate-y-0.5 hover:bg-gold-soft"
          >
            {t('learnMore')}
            <span className="rtl:-scale-x-100 inline-block" aria-hidden>
              →
            </span>
          </Link>
        </div>
      </Container>
    </section>
  );
}
