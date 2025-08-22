import { NewChatButton } from '@/components/new-chat-button';
import { Button } from '@/components/ui/button';
import {
	SidebarGroup,
	SidebarGroupContent,
	SidebarGroupLabel,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	SidebarContent as UISidebarContent,
	useSidebar,
} from '@/components/ui/sidebar';
import {
	Tooltip,
	TooltipContent,
	TooltipTrigger,
} from '@/components/ui/tooltip';
import { LandmarkIcon, PiggyBankIcon, PlusIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { SidebarHistory } from './sidebar-history';

export const SidebarContent = () => {
	const { setOpenMobile } = useSidebar();
	const router = useRouter();
	return (
		<UISidebarContent>
			<SidebarGroup>
				<SidebarGroupLabel>Account Dashboard</SidebarGroupLabel>
				<SidebarGroupContent>
					<SidebarMenu>
						<SidebarMenuItem>
							<SidebarMenuButton>
								<PiggyBankIcon />
								Accounts
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
