import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import Container from '@/components/ui/Container';
import SectionHeading from '@/components/ui/SectionHeading';

type Insight = { topic: string; title: string; excerpt: string };

export default function InsightsGrid() {
  const t = useTranslations('home.insights');
  const featured = t.raw('featured') as Insight[];

  return (
    <section id="insights" className="py-16 sm:py-24 lg:py-28">
      <Container>
        <SectionHeading tag={t('tag')} title={t('title')} className="mb-14" />
        <div className="grid gap-6 lg:grid-cols-3">
          {featured.map((item) => (
            <Link
              key={item.title}
              href="/#insights"
              className="group overflow-hidden rounded-2xl border border-line bg-white transition-all hover:-translate-y-1 hover:shadow-card"
            >
              <div className="relative h-[150px] bg-gradient-to-br from-[#1a3454] to-navy">
                <div
                  className="absolute inset-0 opacity-60 motif"
                  aria-hidden
                />
              </div>
              <div className="p-6">
                <span className="text-xs font-semibold uppercase tracking-[0.08em] text-gold rtl:tracking-normal rtl:normal-case">
                  {item.topic}
                </span>
                <h3 className="my-2.5 text-lg leading-snug text-navy">
                  {item.title}
                </h3>
                <p className="text-sm text-muted">{item.excerpt}</p>
              </div>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}
