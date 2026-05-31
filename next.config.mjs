import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./i18n/request.ts');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [{ protocol: 'https', hostname: 'cdn.sanity.io' }],
  },
  async redirects() {
    return [
      // Redirect www → apex (https://mnalqahtani.com)
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'www.mnalqahtani.com' }],
        destination: 'https://mnalqahtani.com/:path*',
        permanent: true,
      },
      // Old insights routes now live under the Knowledge Hub
      {
        source: '/:locale(ar|en)/insights',
        destination: '/:locale/knowledge',
        permanent: true,
      },
      {
        source: '/:locale(ar|en)/insights/:slug',
        destination: '/:locale/knowledge/:slug',
        permanent: true,
      },
    ];
  },
};

export default withNextIntl(nextConfig);
