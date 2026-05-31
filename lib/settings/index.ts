import 'server-only';
import { cache } from 'react';
import { sanityClient } from '@/lib/sanity/client';
import { urlForImage } from '@/lib/sanity/image';
import { siteConfig } from '@/lib/site';
import type { Locale } from '@/lib/knowledge/types';

export interface ResolvedSettings {
  maintenance: {
    enabled: boolean;
    title: string | null;
    line1: string | null;
    line2: string | null;
  };
  contactEmail: string;
  social: { label: string; href: string }[];
  portraitUrl: string | null;
  seo: { title: string | null; description: string | null };
  hero: { eyebrow: string | null; headline: string | null; subline: string | null };
  featuredKnowledgeSlugs: string[];
  featuredFrameworksSlugs: string[];
  showStoriesOnHome: boolean;
  showPerspectivesOnHome: boolean;
}

const DEFAULT_PORTRAIT = '/portrait.jpg';

function defaults(): ResolvedSettings {
  return {
    maintenance: {
      enabled: process.env.MAINTENANCE_MODE === 'on',
      title: null,
      line1: null,
      line2: null,
    },
    contactEmail: siteConfig.email,
    social: [],
    portraitUrl: DEFAULT_PORTRAIT,
    seo: { title: null, description: null },
    hero: { eyebrow: null, headline: null, subline: null },
    featuredKnowledgeSlugs: [],
    featuredFrameworksSlugs: [],
    showStoriesOnHome: true,
    showPerspectivesOnHome: true,
  };
}

interface RawSettings {
  maintenanceMode?: boolean;
  maintenanceTitle?: string;
  maintenanceLine1?: string;
  maintenanceLine2?: string;
  contactEmail?: string;
  linkedinUrl?: string;
  linkedinEnabled?: boolean;
  xUrl?: string;
  xEnabled?: boolean;
  portrait?: unknown;
  seoTitle?: string;
  seoDescription?: string;
  heroEyebrow?: string;
  heroHeadline?: string;
  heroSubline?: string;
  featuredKnowledge?: string[];
  featuredFrameworks?: string[];
  showStoriesOnHome?: boolean;
  showPerspectivesOnHome?: boolean;
}

const query = `*[_type == "siteSettings"][0]{
  maintenanceMode,
  "maintenanceTitle": maintenanceTitle[$locale],
  "maintenanceLine1": maintenanceLine1[$locale],
  "maintenanceLine2": maintenanceLine2[$locale],
  contactEmail,
  linkedinUrl, linkedinEnabled, xUrl, xEnabled,
  portrait,
  "seoTitle": seoTitle[$locale],
  "seoDescription": seoDescription[$locale],
  "heroEyebrow": heroEyebrow[$locale],
  "heroHeadline": heroHeadline[$locale],
  "heroSubline": heroSubline[$locale],
  "featuredKnowledge": featuredKnowledge[]->slug.current,
  "featuredFrameworks": featuredFrameworks[]->slug.current,
  showStoriesOnHome, showPerspectivesOnHome
}`;

export const getSettings = cache(
  async (locale: Locale): Promise<ResolvedSettings> => {
    const base = defaults();
    if (!sanityClient) return base;

    let raw: RawSettings | null = null;
    try {
      raw = await sanityClient.fetch<RawSettings | null>(query, { locale });
    } catch {
      return base;
    }
    if (!raw) return base;

    const social: { label: string; href: string }[] = [];
    if (raw.linkedinEnabled && raw.linkedinUrl)
      social.push({ label: 'LinkedIn', href: raw.linkedinUrl });
    if (raw.xEnabled && raw.xUrl) social.push({ label: 'X', href: raw.xUrl });

    return {
      maintenance: {
        enabled: base.maintenance.enabled || Boolean(raw.maintenanceMode),
        title: raw.maintenanceTitle ?? null,
        line1: raw.maintenanceLine1 ?? null,
        line2: raw.maintenanceLine2 ?? null,
      },
      contactEmail: raw.contactEmail || base.contactEmail,
      social,
      portraitUrl: raw.portrait ? urlForImage(raw.portrait) : DEFAULT_PORTRAIT,
      seo: {
        title: raw.seoTitle ?? null,
        description: raw.seoDescription ?? null,
      },
      hero: {
        eyebrow: raw.heroEyebrow ?? null,
        headline: raw.heroHeadline ?? null,
        subline: raw.heroSubline ?? null,
      },
      featuredKnowledgeSlugs: raw.featuredKnowledge ?? [],
      featuredFrameworksSlugs: raw.featuredFrameworks ?? [],
      showStoriesOnHome: raw.showStoriesOnHome ?? true,
      showPerspectivesOnHome: raw.showPerspectivesOnHome ?? true,
    };
  },
);
