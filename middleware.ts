import { NextResponse, type NextRequest } from 'next/server';
// import { getToken } from 'next-auth/jwt';
// import { guestRegex, isDevelopmentEnvironment } from './lib/constants';
import { auth0 } from '@/lib/auth0';

export async function middleware(request: NextRequest) {
  const authRes = await auth0.middleware(request); // Always run this first

  const { pathname } = request.nextUrl;

  /*
   * Playwright starts the dev server and requires a 200 status to
   * begin the tests, so this ensures that the tests can start
   */
  if (pathname.startsWith('/ping')) {
    return new Response('pong', { status: 200 });
  }

  if (pathname.startsWith('/auth') || pathname.startsWith('/')) {
    return authRes;
  }

  // Any route that gets to this point will be considered a protected route, and require the user to be logged-in to be able to access it
  const { origin } = new URL(request.url);
  const session = await auth0.getSession(request);

  // If the user does not have a session, redirect to login
  if (!session) {
    console.log('not logged in!');
    const returnTo = encodeURIComponent(request.nextUrl.pathname);
    return NextResponse.redirect(`${origin}/auth/login?returnTo=${returnTo}`);
  }

  return authRes;

  // const token = await getToken({
  //   req: request,
  //   secret: process.env.AUTH_SECRET,
  //   secureCookie: !isDevelopmentEnvironment,
  // });

  // if (!token) {
  //   const redirectUrl = encodeURIComponent(request.url);

  //   return NextResponse.redirect(
  //     new URL(`/api/auth/guest?redirectUrl=${redirectUrl}`, request.url),
  //   );
  // }

  // const isGuest = guestRegex.test(token?.email ?? '');

  // if (token && !isGuest && ['/login', '/register'].includes(pathname)) {
  //   return NextResponse.redirect(new URL('/', request.url));
  // }

  // return NextResponse.next();
}

export const config = {
  matcher: [
    // '/',
    // '/chat/:id',
    // '/api/:path*',
    // '/login',
    // '/register',

    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, sitemap.xml, robots.txt (metadata files)
     */
    '/((?!_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
  ],
};
