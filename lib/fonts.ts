import {
  Fraunces,
  IBM_Plex_Sans,
  IBM_Plex_Sans_Arabic,
  Noto_Kufi_Arabic,
} from 'next/font/google';

// Latin display (editorial serif)
export const fraunces = Fraunces({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-serif',
  display: 'swap',
});

// Latin body / UI
export const ibmPlexSans = IBM_Plex_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-sans',
  display: 'swap',
});

// Arabic body / UI
export const ibmPlexSansArabic = IBM_Plex_Sans_Arabic({
  subsets: ['arabic'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-sans-ar',
  display: 'swap',
});

// Arabic display
export const notoKufiArabic = Noto_Kufi_Arabic({
  subsets: ['arabic'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-serif-ar',
  display: 'swap',
});

export const fontVariables = [
  fraunces.variable,
  ibmPlexSans.variable,
  ibmPlexSansArabic.variable,
  notoKufiArabic.variable,
].join(' ');
