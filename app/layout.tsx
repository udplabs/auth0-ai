import { FAB } from '@/components/fab';
import { AppSidebar } from '@/components/layout/app-sidebar';
import { SWRProvider, ThemeProvider } from '@/components/providers';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import { cn } from '@/lib/utils';
import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import { Toaster } from 'sonner';

import { cookies } from 'next/headers';
import './globals.css';

export const metadata: Metadata = {
	metadataBase: new URL('https://ai.auth.rocks'),
	title: 'AIya -- Your Personal Banking Assistant',
	description:
		'a developer lab (dev{camp}) designed to help developers build a Personal Banking Assistant -- powered by Auth0, Vercel, and OpenAI.',
};

export const viewport = {
	maximumScale: 1, // Disable auto-zoom on mobile Safari
};

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

const LIGHT_THEME_COLOR = 'hsl(0 0% 100%)';
const DARK_THEME_COLOR = 'hsl(240deg 10% 3.92%)';
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
}: Readonly<{
	children: React.ReactNode;
}>) {
	const cookieStore = await cookies();
	const isCollapsed = cookieStore.get('sidebar:state')?.value !== 'true';

	return (
		<html
			lang='en'
			// `next-themes` injects an extra classname to the body element to avoid
			// visual flicker before hydration. Hence the `suppressHydrationWarning`
			// prop is necessary to avoid the React hydration mismatch warning.
			// https://github.com/pacocoursey/next-themes?tab=readme-ov-file#with-app
			suppressHydrationWarning
			className={`${geist.variable} ${geistMono.variable}`}
		>
			<head>
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
							<AppSidebar />
							<SidebarInset className='overflow-none overscroll-none'>
								{children}
							</SidebarInset>
							<div className={cn('fixed right-6 bottom-5 z-50', 'top-1/2')}>
								<FAB />
							</div>
						</SidebarProvider>
					</SWRProvider>
				</ThemeProvider>
			</body>
		</html>
	);
}
