'use client';

import Image from 'next/image';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import { portraitSrc } from '@/lib/site';

/**
 * Executive portrait with a premium navy/gold frame + corner accents.
 * Renders the photo when available (portraitSrc, default '/portrait.jpg' in
 * public/, or a CMS URL later) and gracefully falls back to a branded
 * placeholder if the image is missing or fails to load. Responsive via
 * next/image. Same image is used for Arabic and English.
 */
export default function Portrait({
  src = portraitSrc,
  alt,
  className,
}: {
  src?: string | null;
  alt: string;
  className?: string;
}) {
  const [failed, setFailed] = useState(false);
  const showImage = Boolean(src) && !failed;

  return (
    <div
      className={cn(
        'relative aspect-[4/5] w-full overflow-hidden rounded-2xl border border-gold/40 bg-gradient-to-b from-[#1a3454] to-navy shadow-portrait',
        className,
      )}
    >
      {showImage ? (
        <Image
          src={src as string}
          alt={alt}
          fill
          sizes="(max-width: 768px) 88vw, 420px"
          className="object-cover object-top"
          onError={() => setFailed(true)}
          priority
        />
      ) : (
        <div
          className="grid h-full place-items-center px-6 text-center text-[13px] leading-relaxed text-ivory/45"
          role="img"
          aria-label={alt}
        >
          {alt}
        </div>
      )}

      {/* Gold corner accents */}
      <span
        className="pointer-events-none absolute start-3.5 top-3.5 z-10 h-6 w-6 border-s-2 border-t-2 border-gold"
        aria-hidden
      />
      <span
        className="pointer-events-none absolute bottom-3.5 end-3.5 z-10 h-6 w-6 border-b-2 border-e-2 border-gold"
        aria-hidden
      />
    </div>
  );
}
