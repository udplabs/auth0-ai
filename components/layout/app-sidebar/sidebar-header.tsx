'use client';
import { DarkLogo, LightLogo } from '@/components/logo';
import {
	SidebarMenu,
	type SidebarMenuProps,
	SidebarHeader as UISidebarHeader,
	type SidebarHeaderProps as UISidebarHeaderProps,
	useSidebar,
} from '@/components/ui/sidebar';
import { useTheme } from 'next-themes';
import Link from 'next/link';

export interface SidebarHeaderProps extends UISidebarHeaderProps {
	SidebarMenuProps?: SidebarMenuProps;
}

export function SidebarHeader({
	SidebarMenuProps,
	...props
}: SidebarHeaderProps) {
	const theme = useTheme();

	const { setOpenMobile } = useSidebar();

	return (
		<UISidebarHeader {...props}>
			<SidebarMenu {...SidebarMenuProps}>
				<Link
					href='/'
					onClick={() => {
						setOpenMobile(false);
					}}
					className='flex flex-row items-center gap-3'
				>
					{theme.resolvedTheme === 'light' ? (
						<LightLogo />
					) : (
						<DarkLogo className='w-full pe-5' />
					)}
				</Link>
			</SidebarMenu>
		</UISidebarHeader>
	);
}
