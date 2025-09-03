import {
	SidebarMenuAction,
	SidebarMenuButton,
	SidebarMenuItem,
} from '@/components/ui/sidebar';
import { TrashIcon } from 'lucide-react';
import Link from 'next/link';
import { memo } from 'react';

const PureSidebarHistoryItem = ({
	chat,
	isActive,
	setOpenMobile,
}: {
	chat: Chat.UIChat;
	isActive: boolean;
	setOpenMobile: (open: boolean) => void;
}) => {
	return (
		<SidebarMenuItem>
			<SidebarMenuButton
				asChild
				{...{ isActive }}
			>
				<Link
					href={`/chat/${chat.id}`}
					onClick={() => setOpenMobile(false)}
				>
					<span>{chat?.title ?? 'Unnamed Chat'}</span>
				</Link>
			</SidebarMenuButton>

			<SidebarMenuAction
				className='data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground hover:text-destructive focus:bg-destructive/15 focus:text-destructive mr-0.5 cursor-pointer dark:text-red-500'
				showOnHover={!isActive}
			>
				<TrashIcon />
				<span className='sr-only'>Delete</span>
			</SidebarMenuAction>
		</SidebarMenuItem>
	);
};

export const SidebarHistoryItem = memo(
	PureSidebarHistoryItem,
	(prevProps, nextProps) => {
		if (prevProps.isActive !== nextProps.isActive) return false;
		if (prevProps.chat.title !== nextProps.chat.title) return false;

		return true;
	}
);
