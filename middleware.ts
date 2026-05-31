import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

export default createMiddleware(routing);

export const config = {
  // Match all paths except API, Studio, Lab preview, Next internals, and static files
  matcher: ['/((?!api|studio|lab|_next|_vercel|.*\\..*).*)'],
};
