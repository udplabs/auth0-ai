'use client';

import { NewChatButton } from '@/components/features/chat/ui/new-chat-button';
import {
	SidebarGroup,
	SidebarGroupContent,
	SidebarGroupLabel,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	SidebarContent as UISidebarContent,
} from '@/components/ui/sidebar';
import { LandmarkIcon, PiggyBankIcon } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { SidebarHistory } from './sidebar-history';

export const SidebarContent = () => {
	const pathname = usePathname();

	return (
		<UISidebarContent>
			<SidebarGroup>
				<SidebarGroupLabel>Account Dashboard</SidebarGroupLabel>
				<SidebarGroupContent>
					<SidebarMenu>
						<SidebarMenuItem>
							<SidebarMenuButton
								asChild
								isActive={pathname.includes('accounts')}
							>
								<Link href='/accounts'>
									<PiggyBankIcon />
									Accounts
								</Link>
							</SidebarMenuButton>
						</SidebarMenuItem>
						<SidebarMenuItem>
							<SidebarMenuButton>
								<LandmarkIcon />
								Foo:bar
							</SidebarMenuButton>
						</SidebarMenuItem>
					</SidebarMenu>
				</SidebarGroupContent>
			</SidebarGroup>
			<SidebarGroup>
				<div className='flex items-center justify-between'>
					<SidebarGroupLabel>AIya Chat</SidebarGroupLabel>
					<NewChatButton />
				</div>
				<SidebarGroupContent>
					<SidebarMenu>
						<SidebarHistory />
					</SidebarMenu>
				</SidebarGroupContent>
			</SidebarGroup>
		</UISidebarContent>
	);
};
