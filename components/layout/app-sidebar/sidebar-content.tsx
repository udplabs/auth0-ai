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
import { useUserProfile } from '@/hooks/use-user-profile';
import { LandmarkIcon, PiggyBankIcon, ReceiptTextIcon } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { SidebarHistory } from './sidebar-history';

export const SidebarContent = () => {
	const pathname = usePathname();
	const { isAuthenticated } = useUserProfile();

	return (
		<UISidebarContent>
			{isAuthenticated && (
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
								<SidebarMenuButton
									asChild
									isActive={pathname.includes('transfers')}
								>
									<Link href='/transfers'>
										<LandmarkIcon />
										Transfers
									</Link>
								</SidebarMenuButton>
							</SidebarMenuItem>
							<SidebarMenuItem>
								<SidebarMenuButton
									asChild
									isActive={pathname.includes('payments')}
								>
									<Link href='/payments'>
										<ReceiptTextIcon />
										Bill Pay
									</Link>
								</SidebarMenuButton>
							</SidebarMenuItem>
						</SidebarMenu>
					</SidebarGroupContent>
				</SidebarGroup>
			)}
			<SidebarGroup>
				<div className='flex items-center justify-between'>
					<SidebarGroupLabel>Aiya Chat</SidebarGroupLabel>
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
