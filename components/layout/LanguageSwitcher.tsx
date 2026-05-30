'use client';

import { useLocale, useTranslations } from 'next-intl';
import { usePathname, useRouter } from '@/i18n/navigation';
import { useParams } from 'next/navigation';

export default function LanguageSwitcher() {
  const t = useTranslations('nav');
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const params = useParams();

  const target = locale === 'ar' ? 'en' : 'ar';

  function switchLocale() {
    // Preserve the current path & dynamic params, swap the locale
    router.replace(
      // @ts-expect-error -- params are forwarded as-is for dynamic routes
      { pathname, params },
      { locale: target },
    );
  }

  return (
    <button
      type="button"
      onClick={switchLocale}
      aria-label={`Switch language to ${target}`}
      className="rounded-full border border-line bg-white px-3.5 py-2 text-[13px] font-semibold text-navy transition-colors hover:border-gold hover:text-gold"
    >
      {t('switchTo')}
    </button>
  );
}
