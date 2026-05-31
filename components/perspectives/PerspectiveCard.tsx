import Image from 'next/image';
import type { Perspective } from '@/lib/perspectives';

export default function PerspectiveCard({ item }: { item: Perspective }) {
  return (
    <figure className="flex h-full flex-col rounded-2xl border border-line bg-white p-7">
      <span className="font-serif text-4xl leading-none text-gold opacity-50 rtl:font-serif-ar" aria-hidden>
        &ldquo;
      </span>
      <blockquote className="mt-2 flex-1 text-lg leading-relaxed text-slate">
        {item.quote}
      </blockquote>
      <figcaption className="mt-6 flex items-center gap-4 border-t border-line pt-5">
        <span className="relative h-12 w-12 flex-shrink-0 overflow-hidden rounded-full bg-navy">
          {item.photoUrl ? (
            <Image
              src={item.photoUrl}
              alt={item.name}
              fill
              sizes="48px"
              className="object-cover"
            />
          ) : (
            <span className="grid h-full w-full place-items-center font-serif text-lg text-gold rtl:font-serif-ar">
              {item.name.charAt(0)}
            </span>
          )}
        </span>
        <span className="leading-tight">
          <span className="block font-semibold text-navy">{item.name}</span>
          {item.position || item.organization ? (
            <span className="block text-sm text-muted">
              {[item.position, item.organization].filter(Boolean).join(' · ')}
            </span>
          ) : null}
        </span>
      </figcaption>
    </figure>
  );
}
