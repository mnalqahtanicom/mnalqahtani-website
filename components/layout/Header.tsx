'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import Container from '@/components/ui/Container';
import LanguageSwitcher from './LanguageSwitcher';

const navItems = [
  { key: 'insights', href: '/insights' },
  { key: 'framework', href: '/strategy-to-results' },
  { key: 'about', href: '/about' },
] as const;

export default function Header() {
  const t = useTranslations('nav');
  const tSite = useTranslations('site');
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-ivory/80 backdrop-blur-md">
      <Container>
        <div className="flex h-[76px] items-center justify-between">
          <Link href="/" className="flex items-center gap-3.5 text-navy">
            {/* Gold seal monogram (Latin "MQ" in both locales) */}
            <span className="grid h-[46px] w-[46px] place-items-center rounded-full bg-navy font-serif text-[17px] font-semibold tracking-wide text-gold shadow-[0_0_0_1px_#C8A24B,inset_0_0_0_3px_#0B1F3A,0_0_0_4px_rgba(200,162,75,0.45)]">
              {tSite('monogram')}
            </span>
            <span className="leading-tight">
              <span className="block font-serif text-[19px] font-semibold">
                {tSite('name')}
              </span>
              <span className="block text-[10.5px] font-medium uppercase tracking-[0.18em] text-muted rtl:tracking-normal rtl:normal-case">
                {tSite('tagline')}
              </span>
            </span>
          </Link>

          <nav className="flex items-center gap-7">
            <div className="hidden items-center gap-7 md:flex">
              {navItems.map((item) => (
                <Link
                  key={item.key}
                  href={item.href}
                  className="text-[15px] font-medium text-slate transition-colors hover:text-navy"
                >
                  {t(item.key)}
                </Link>
              ))}
            </div>
            <Link
              href="/contact"
              className="rounded-lg bg-navy px-[18px] py-[9px] text-[15px] font-semibold text-white transition-colors hover:bg-slate"
            >
              {t('contact')}
            </Link>
            <LanguageSwitcher />
            <button
              type="button"
              aria-label="Menu"
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
              className="flex h-9 w-9 items-center justify-center rounded-md border border-line text-navy md:hidden"
            >
              <span className="text-lg leading-none">{open ? '×' : '≡'}</span>
            </button>
          </nav>
        </div>

        {open ? (
          <div className="flex flex-col gap-1 border-t border-line py-3 md:hidden">
            {navItems.map((item) => (
              <Link
                key={item.key}
                href={item.href}
                onClick={() => setOpen(false)}
                className="rounded-md px-2 py-2.5 text-[15px] font-medium text-slate hover:bg-white hover:text-navy"
              >
                {t(item.key)}
              </Link>
            ))}
          </div>
        ) : null}
      </Container>
    </header>
  );
}
