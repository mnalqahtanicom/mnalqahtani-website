import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import Container from '@/components/ui/Container';
import SectionHeading from '@/components/ui/SectionHeading';
import { expertiseSlugs } from '@/lib/site';

export default function ExpertiseGrid() {
  const t = useTranslations('home.expertise');
  const tItems = useTranslations('expertiseItems');

  return (
    <section id="expertise" className="py-16 sm:py-24 lg:py-28">
      <Container>
        <SectionHeading
          tag={t('tag')}
          title={t('title')}
          subtitle={t('subtitle')}
          className="mb-14"
        />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {expertiseSlugs.map((slug, i) => (
            <Link
              key={slug}
              href={`/expertise/${slug}`}
              className="group relative overflow-hidden rounded-2xl border border-line bg-white p-7 transition-all hover:-translate-y-1 hover:border-transparent hover:shadow-card"
            >
              <span
                className="absolute inset-y-0 start-0 w-[3px] origin-top scale-y-0 bg-gold transition-transform group-hover:scale-y-100"
                aria-hidden
              />
              <span className="font-serif text-sm font-semibold text-gold rtl:font-serif-ar">
                {String(i + 1).padStart(2, '0')}
              </span>
              <h3 className="mb-2.5 mt-3 text-xl text-navy">
                {tItems(`${slug}.title`)}
              </h3>
              <p className="text-[14.5px] text-muted">
                {tItems(`${slug}.summary`)}
              </p>
              <span className="mt-4 inline-flex items-center gap-1.5 text-[13px] font-semibold text-slate">
                {t('explore')}
                <span className="rtl:-scale-x-100" aria-hidden>
                  →
                </span>
              </span>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}
