'use client';

import { Sidebar, SidebarFooter } from '@/components/ui/sidebar';
import { NavUser } from './nav-user';
import { SidebarContent } from './sidebar-content';
import { SidebarHeader } from './sidebar-header';

export function AppSidebar() {
	return (
		<Sidebar className='group-data-[side=left]:border-r-0'>
			<SidebarHeader />
			<SidebarContent />
			<SidebarFooter>
				<NavUser />
			</SidebarFooter>
		</Sidebar>
	);
}
