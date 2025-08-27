'use client';
import { Logo } from '@/components/logo';
import {
	SidebarMenu,
	type SidebarMenuProps,
	SidebarHeader as UISidebarHeader,
	type SidebarHeaderProps as UISidebarHeaderProps,
	useSidebar,
} from '@/components/ui/sidebar';
import Link from 'next/link';

export interface SidebarHeaderProps extends UISidebarHeaderProps {
	SidebarMenuProps?: SidebarMenuProps;
}

export function SidebarHeader({
	SidebarMenuProps,
	...props
}: SidebarHeaderProps) {
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
					<Logo className='w-full pe-5' />
				</Link>
			</SidebarMenu>
		</UISidebarHeader>
	);
}
