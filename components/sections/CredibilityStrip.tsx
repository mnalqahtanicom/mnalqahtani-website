import { useTranslations } from 'next-intl';
import Container from '@/components/ui/Container';

export default function CredibilityStrip() {
  const t = useTranslations('home.credibility');

  const items = [
    { value: '21+', label: t('years') },
    { value: 'MSc', label: t('education') },
    { value: '6', label: t('domains') },
  ];

  return (
    <section className="border-b border-line bg-white">
      <Container>
        <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-6 py-8 text-center sm:gap-x-16">
          {items.map((item, i) => (
            <div key={item.value} className="flex items-center gap-x-10 sm:gap-x-16">
              <div className="flex flex-col">
                <span className="font-serif text-3xl font-semibold text-navy rtl:font-serif-ar">
                  {item.value}
                </span>
                <span className="text-[13px] text-muted">{item.label}</span>
              </div>
              {i < items.length - 1 ? (
                <span className="hidden h-9 w-px bg-line sm:block" aria-hidden />
              ) : null}
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
