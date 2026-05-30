import imageUrlBuilder, { type SanityImageSource } from '@sanity/image-url';
import { dataset, projectId, sanityConfigured } from './env';

const builder = sanityConfigured
  ? imageUrlBuilder({ projectId, dataset })
  : null;

export function urlForImage(source: SanityImageSource): string | null {
  if (!builder || !source) return null;
  return builder.image(source).width(1200).fit('max').auto('format').url();
}
