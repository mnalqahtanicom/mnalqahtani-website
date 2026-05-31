/**
 * Sanity environment configuration.
 *
 * The site works WITHOUT these set (it falls back to in-repo seed content).
 * Set them in Vercel + .env.local to activate the live CMS:
 *   NEXT_PUBLIC_SANITY_PROJECT_ID
 *   NEXT_PUBLIC_SANITY_DATASET (defaults to "production")
 */
export const projectId =
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? '7g0z8oo6';
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? 'production';
export const apiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION ?? '2024-10-01';

/** True only when a real Sanity project is configured. */
export const sanityConfigured = projectId.length > 0;
