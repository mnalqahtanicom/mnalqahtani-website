import { useTranslations } from 'next-intl';

export default function MaintenancePage({
  title,
  line1,
  line2,
}: {
  title?: string | null;
  line1?: string | null;
  line2?: string | null;
} = {}) {
  const t = useTranslations('maintenance');
  const tSite = useTranslations('site');

  return (
    <main className="motif grid min-h-screen place-items-center bg-navy px-6 text-center text-ivory">
      <div className="max-w-xl">
        <span className="mx-auto mb-8 grid h-16 w-16 place-items-center rounded-full bg-navy font-serif text-2xl font-semibold tracking-wide text-gold shadow-[0_0_0_1px_#C8A24B,inset_0_0_0_4px_#0B1F3A,0_0_0_5px_rgba(200,162,75,0.45)] rtl:font-serif-ar">
          {tSite('monogram')}
        </span>
        <h1 className="text-3xl text-white sm:text-4xl">{title || t('title')}</h1>
        <p className="mt-5 text-lg font-light text-ivory/80">{line1 || t('line1')}</p>
        <p className="text-lg font-light text-ivory/80">{line2 || t('line2')}</p>
        <p className="mt-10 text-sm uppercase tracking-[0.18em] text-gold rtl:tracking-normal rtl:normal-case">
          {tSite('name')}
        </p>
      </div>
    </main>
  );
}
