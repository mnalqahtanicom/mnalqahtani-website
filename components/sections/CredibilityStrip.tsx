import { useTranslations } from 'next-intl';
import Container from '@/components/ui/Container';

type Item = { value: string; label: string };

// Minimal line icons, one per credibility indicator
const icons = [
  // experience — star/badge
  <path key="i" d="M12 3l2.4 5 5.6.8-4 3.9.9 5.5L12 16.9 7.1 18.2l.9-5.5-4-3.9L9.6 8 12 3z" />,
  // expertise — diamond
  <path key="i" d="M12 3l7 9-7 9-7-9 7-9z" />,
  // education — mortarboard
  <path key="i" d="M12 5l9 4-9 4-9-4 9-4zM7 12v4c0 1 2.2 2 5 2s5-1 5-2v-4" />,
  // certification — check seal
  <path key="i" d="M12 3l2.2 1.6 2.7-.2 1 2.5 2.3 1.4-.8 2.6.8 2.6-2.3 1.4-1 2.5-2.7-.2L12 21l-2.2-1.6-2.7.2-1-2.5-2.3-1.4.8-2.6-.8-2.6 2.3-1.4 1-2.5 2.7.2L12 3zM9.5 12.5l1.8 1.8 3.5-3.5" />,
];

export default function CredibilityStrip() {
  const t = useTranslations('home.credibility');
  const items = t.raw('items') as Item[];

  return (
    <section className="border-b border-line bg-white py-12 sm:py-16">
      <Container>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((item, i) => (
            <div
              key={item.value}
              className="relative overflow-hidden rounded-2xl border border-line bg-white px-5 py-7 text-center"
            >
              <span
                className="absolute inset-x-0 top-0 h-[3px] bg-gold"
                aria-hidden
              />
              <span
                className="mx-auto mb-3 grid h-10 w-10 place-items-center rounded-full border border-gold text-gold"
                aria-hidden
              >
                <svg
                  viewBox="0 0 24 24"
                  width="18"
                  height="18"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  {icons[i % icons.length]}
                </svg>
              </span>
              <span className="block font-serif text-lg font-semibold text-navy rtl:font-serif-ar">
                {item.value}
              </span>
              <span className="mt-0.5 block text-[13px] text-muted">
                {item.label}
              </span>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
