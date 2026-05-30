import { useTranslations } from 'next-intl';
import Container from '@/components/ui/Container';
import SectionHeading from '@/components/ui/SectionHeading';

type Item = { year: string; title: string; body: string };

export default function Timeline() {
  const t = useTranslations('about.timeline');
  const items = t.raw('items') as Item[];

  return (
    <section className="bg-white py-16 sm:py-24 lg:py-28">
      <Container narrow>
        <SectionHeading tag={t('tag')} title={t('title')} className="mb-12" />
        <ol className="relative border-s-2 border-line ps-8">
          {items.map((item) => (
            <li key={item.title} className="relative pb-8 last:pb-0">
              <span
                className="absolute -start-[39px] top-1 h-3.5 w-3.5 rounded-full border-[3px] border-ivory bg-gold"
                aria-hidden
              />
              <span className="font-serif text-[15px] font-semibold text-gold rtl:font-serif-ar">
                {item.year}
              </span>
              <h3 className="mb-1.5 mt-1 text-lg text-navy">{item.title}</h3>
              <p className="text-[15px] text-muted">{item.body}</p>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
