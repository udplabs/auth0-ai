import { auth0 } from '@/lib/auth0/client';
import { type NextRequest, NextResponse } from 'next/server';

export async function middleware(request: NextRequest) {
	if (!auth0) {
		return;
	}

	const authRes = await auth0.middleware(request); // Always run this first

	const { pathname } = request.nextUrl;

	if (pathname.startsWith('/auth') || pathname.startsWith('/')) {
		return authRes;
	}

	// Any route that gets to this point will be considered a protected route, and require the user to be logged-in to be able to access it
	const { origin } = new URL(request.url);
	const session = await auth0.getSession(request);

	// If the user does not have a session, redirect to login
	if (!session) {
		const returnTo = encodeURIComponent(request.nextUrl.pathname);
		return NextResponse.redirect(`${origin}/auth/login?returnTo=${returnTo}`);
	}

	return authRes;
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
