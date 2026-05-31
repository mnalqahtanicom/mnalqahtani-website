'use client';

import { useMemo, useState } from 'react';
import type { Category, Insight } from '@/lib/insights/types';
import InsightCard from './InsightCard';
import { cn } from '@/lib/utils';

export default function InsightsExplorer({
  insights,
  categories,
  labels,
}: {
  insights: Insight[];
  categories: Category[];
  labels: {
    searchPlaceholder: string;
    allCategories: string;
    noResults: string;
  };
}) {
  const [query, setQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return insights.filter((i) => {
      const matchesCategory =
        activeCategory === 'all' || i.category?.slug === activeCategory;
      if (!matchesCategory) return false;
      if (!q) return true;
      const haystack = [
        i.title,
        i.excerpt,
        i.category?.title ?? '',
        ...i.tags,
      ]
        .join(' ')
        .toLowerCase();
      return haystack.includes(q);
    });
  }, [insights, query, activeCategory]);

  const pill = (active: boolean) =>
    cn(
      'rounded-full border px-4 py-1.5 text-sm font-medium transition-colors',
      active
        ? 'border-gold bg-gold text-navy'
        : 'border-line bg-white text-slate hover:border-gold hover:text-gold',
    );

  return (
    <div>
      <div className="mb-8 flex flex-col gap-4">
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={labels.searchPlaceholder}
          className="w-full rounded-xl border border-line bg-white px-4 py-3 text-base text-ink outline-none transition-colors placeholder:text-muted focus:border-gold"
        />
        <div className="flex flex-wrap gap-2.5">
          <button
            type="button"
            className={pill(activeCategory === 'all')}
            onClick={() => setActiveCategory('all')}
          >
            {labels.allCategories}
          </button>
          {categories.map((c) => (
            <button
              key={c.slug}
              type="button"
              className={pill(activeCategory === c.slug)}
              onClick={() => setActiveCategory(c.slug)}
            >
              {c.title}
            </button>
          ))}
        </div>
      </div>

      {filtered.length ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((insight) => (
            <InsightCard key={insight.slug} insight={insight} />
          ))}
        </div>
      ) : (
        <p className="py-16 text-center text-muted">{labels.noResults}</p>
      )}
    </div>
  );
}
