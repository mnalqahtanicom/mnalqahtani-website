import Image from 'next/image';
import { cn } from '@/lib/utils';
import { portraitSrc } from '@/lib/site';

/**
 * Executive portrait with a premium navy frame + gold corner accents.
 * Upload-ready: when `portraitSrc` (or an explicit `src`) is set, the photo
 * renders via next/image (optimized). Until then, a tasteful branded
 * placeholder is shown. The real photo will be supplied via the CMS (Phase 2)
 * or by setting `portraitSrc` in lib/site.ts.
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
  return (
    <div
      className={cn(
        'relative aspect-[4/5] w-full overflow-hidden rounded-2xl border border-gold/35 bg-gradient-to-b from-[#1a3454] to-navy shadow-portrait',
        className,
      )}
    >
      {src ? (
        <Image
          src={src}
          alt={alt}
          fill
          sizes="(max-width: 768px) 90vw, 340px"
          className="object-cover"
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
        className="pointer-events-none absolute start-3.5 top-3.5 h-6 w-6 border-s-2 border-t-2 border-gold"
        aria-hidden
      />
      <span
        className="pointer-events-none absolute bottom-3.5 end-3.5 h-6 w-6 border-b-2 border-e-2 border-gold"
        aria-hidden
      />

      {/* Bottom gradient (only meaningful with a photo) */}
      <span
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[36%] bg-gradient-to-t from-navy/80 to-transparent"
        aria-hidden
      />
    </div>
  );
}
