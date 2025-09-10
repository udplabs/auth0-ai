/**
 * RootLayout
 *
 * Global HTML scaffold for the Next.js App Router.
 * Responsibilities:
 * - Set <html>, fonts, metadata, viewport, theme-color handling.
 * - Provide global context/providers (Theme, SWR, Sidebar, Toasts).
 * - Restore sidebar collapsed state from cookie.
 * - Inject floating FAB (chat / quick actions).
 *
 * Key Points:
 * - Uses next/font/google (Geist + Geist Mono) with CSS vars to avoid FOIT.
 * - Theme color <meta> dynamically updated via small inline script watching
 *   <html class="dark"> to keep mobile browser chrome in sync.
 * - ThemeProvider (next-themes) handles dark/system mode; suppressHydrationWarning
 *   avoids mismatch because class applied before hydration.
 * - Sidebar open state persisted in cookie 'sidebar:state' ("true" => open).
 * - SWRProvider sets global SWR config (data fetching cache).
 * - Toaster (sonner) provides app-wide notifications.
 */

import { FAB } from '@/components/fab';
import { AppSidebar } from '@/components/layout/app-sidebar';
import { Bootstrap } from '@/components/layout/bootstrap';
import { SWRProvider, ThemeProvider } from '@/components/providers';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import { cn } from '@/lib/utils';
import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import { cookies } from 'next/headers';
import { Toaster } from 'sonner';
import './globals.css';

export const metadata: Metadata = {
	metadataBase: new URL('https://ai.auth.rocks'),
	title: 'Aiya -- Your Personal Banking Assistant',
	description:
		'a developer lab (dev{camp}) designed to help developers build a Personal Banking Assistant -- powered by Auth0, Vercel, and OpenAI.',
};

// Viewport config (disables Safari auto-zoom on inputs by capping maximumScale).
export const viewport = {
	maximumScale: 1,
};

// Font loading with CSS variables for easy usage in Tailwind.
const geist = Geist({
	subsets: ['latin'],
	display: 'swap',
	variable: '--font-geist',
});
const geistMono = Geist_Mono({
	subsets: ['latin'],
	display: 'swap',
	variable: '--font-geist-mono',
});

// Colors used for <meta name="theme-color"> depending on dark mode.
const LIGHT_THEME_COLOR = 'hsl(0 0% 100%)';
const DARK_THEME_COLOR = 'hsl(240deg 10% 3.92%)';

/**
 * THEME_COLOR_SCRIPT
 * Injected before hydration to (a) ensure the meta tag exists, (b) keep it
 * synchronized with dark/light state changes (MutationObserver on <html class>).
 * This avoids a flash where the browser chrome uses an outdated color.
 */
const THEME_COLOR_SCRIPT = `\
(function() {
  var html = document.documentElement;
  var meta = document.querySelector('meta[name="theme-color"]');
  if (!meta) {
    meta = document.createElement('meta');
    meta.setAttribute('name', 'theme-color');
    document.head.appendChild(meta);
  }
  function updateThemeColor() {
    var isDark = html.classList.contains('dark');
    meta.setAttribute('content', isDark ? '${DARK_THEME_COLOR}' : '${LIGHT_THEME_COLOR}');
  }
  var observer = new MutationObserver(updateThemeColor);
  observer.observe(html, { attributes: true, attributeFilter: ['class'] });
  updateThemeColor();
})();`;

export default async function RootLayout({
	children,
}: Readonly<{ children: React.ReactNode }>) {
	// Read cookie to restore sidebar state (cookie value 'true' => open).
	const cookieStore = await cookies();
	const isCollapsed =
		cookieStore.get('sidebar:state')?.value == 'true' || false;

	return (
		<html
			lang='en'
			suppressHydrationWarning
			className={`${geist.variable} ${geistMono.variable}`}
		>
			<head>
				{/* Inline script executes before React to prevent flicker */}
				<script
					dangerouslySetInnerHTML={{
						__html: THEME_COLOR_SCRIPT,
					}}
				/>
			</head>
			<body className='overflow-none overscroll-none antialiased'>
				<ThemeProvider
					attribute='class'
					defaultTheme='system'
					enableSystem
					disableTransitionOnChange
				>
					<SWRProvider>
						<Toaster
							position='top-right'
							richColors
						/>
						<SidebarProvider defaultOpen={!isCollapsed}>
							{/* App chrome (navigation) */}
							<AppSidebar />
							<SidebarInset className='overflow-none overscroll-none'>
								{children}
							</SidebarInset>
							{/* Floating Action Button for local developer tools (e.g., open chat) */}
							<div className={cn('fixed right-6 bottom-5 z-50', 'top-1/2')}>
								<FAB />
							</div>
						</SidebarProvider>
						<Bootstrap />
					</SWRProvider>
				</ThemeProvider>
			</body>
		</html>
	);
}
