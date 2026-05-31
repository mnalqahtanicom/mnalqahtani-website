'use client';

import { useEffect } from 'react';
import { usePathname } from '@/i18n/navigation';

/**
 * Lightweight, global scroll-reveal.
 * - Adds `reveal-ready` to <html> so the hidden state ONLY applies when JS runs
 *   (no-JS visitors and crawlers always see content — SEO/accessibility safe).
 * - Reveals elements with the `.reveal` class as they enter the viewport.
 * - Fully skips animation when the user prefers reduced motion.
 * - Re-scans on route change to catch newly rendered pages.
 */
export default function ScrollReveal() {
  const pathname = usePathname();

  useEffect(() => {
    const root = document.documentElement;
    root.classList.add('reveal-ready');

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const els = Array.from(
      document.querySelectorAll<HTMLElement>('.reveal:not(.in)'),
    );

    if (reduce || !('IntersectionObserver' in window)) {
      els.forEach((el) => el.classList.add('in'));
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in');
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -8% 0px' },
    );

    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [pathname]);

  return null;
}
