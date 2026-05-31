import { useTranslations } from 'next-intl';
import Container from '@/components/ui/Container';
import SectionHeading from '@/components/ui/SectionHeading';

type Group = { label: string; items: string[] };

export default function ExecutiveCredentials({
  dark = false,
}: {
  dark?: boolean;
}) {
  const t = useTranslations('credentials');
  const groups = t.raw('groups') as Group[];

  return (
    <section className={dark ? 'bg-navy py-16 text-ivory sm:py-24' : 'py-16 sm:py-24'}>
      <Container>
        <SectionHeading
          tag={t('tag')}
          title={t('title')}
          subtitle={t('subtitle')}
          dark={dark}
          className="mb-12"
        />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {groups.map((group) => (
            <div
              key={group.label}
              className={
                dark
                  ? 'rounded-2xl border border-ivory/15 bg-white/[0.03] p-7'
                  : 'rounded-2xl border border-line bg-white p-7'
              }
            >
              <h3 className="mb-4 text-xs font-semibold uppercase tracking-[0.14em] text-gold rtl:tracking-normal rtl:normal-case">
                {group.label}
              </h3>
              <ul className="space-y-2.5">
                {group.items.map((item) => (
                  <li key={item} className="flex gap-2.5">
                    <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-gold" aria-hidden />
                    <span
                      className={
                        dark
                          ? 'text-[15px] leading-snug text-ivory/85'
                          : 'text-[15px] leading-snug text-slate'
                      }
                    >
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
