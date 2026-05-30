import { createClient, type SanityClient } from 'next-sanity';
import { apiVersion, dataset, projectId, sanityConfigured } from './env';

/**
 * Read-only Sanity client. Returns null when Sanity isn't configured,
 * so callers can fall back to seed content.
 */
export const sanityClient: SanityClient | null = sanityConfigured
  ? createClient({
      projectId,
      dataset,
      apiVersion,
      useCdn: true,
      perspective: 'published',
    })
  : null;
