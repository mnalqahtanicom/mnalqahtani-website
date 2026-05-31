import { PortableText, type PortableTextComponents } from '@portabletext/react';
import type { PortableTextBlock } from '@portabletext/types';

const components: PortableTextComponents = {
  block: {
    normal: ({ children }) => (
      <p className="mb-5 text-lg leading-relaxed text-slate">{children}</p>
    ),
    h2: ({ children }) => (
      <h2 className="mb-3 mt-10 text-2xl text-navy">{children}</h2>
    ),
    h3: ({ children }) => (
      <h3 className="mb-2 mt-8 text-xl text-navy">{children}</h3>
    ),
    blockquote: ({ children }) => (
      <blockquote className="my-6 border-s-4 border-gold ps-5 font-serif text-xl text-navy rtl:font-serif-ar">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="mb-5 list-disc space-y-2 ps-6 text-lg text-slate">{children}</ul>
    ),
    number: ({ children }) => (
      <ol className="mb-5 list-decimal space-y-2 ps-6 text-lg text-slate">{children}</ol>
    ),
  },
  marks: {
    strong: ({ children }) => (
      <strong className="font-semibold text-navy">{children}</strong>
    ),
    em: ({ children }) => <em>{children}</em>,
  },
};

export default function PortableTextBody({
  value,
}: {
  value: PortableTextBlock[];
}) {
  return <PortableText value={value} components={components} />;
}
