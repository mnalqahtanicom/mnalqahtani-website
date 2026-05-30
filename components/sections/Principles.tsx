import { useTranslations } from 'next-intl';
import Container from '@/components/ui/Container';
import SectionHeading from '@/components/ui/SectionHeading';

type Item = { title: string; body: string };

export default function Principles() {
  const t = useTranslations('about.principles');
  const items = t.raw('items') as Item[];

  return (
    <section className="bg-white py-16 sm:py-24 lg:py-28">
      <Container>
        <SectionHeading tag={t('tag')} title={t('title')} className="mb-12" />
        <div className="grid gap-5 lg:grid-cols-3">
          {items.map((item, i) => (
            <div
              key={item.title}
              className="rounded-2xl border border-line bg-ivory p-7"
            >
              <span className="font-serif text-[15px] font-semibold text-gold rtl:font-serif-ar">
                {String(i + 1).padStart(2, '0')}
              </span>
              <h3 className="mb-2 mt-2.5 text-lg text-navy">{item.title}</h3>
              <p className="text-[14.5px] text-muted">{item.body}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
