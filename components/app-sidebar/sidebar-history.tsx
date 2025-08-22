'use client';
import {
	SidebarGroup,
	SidebarGroupContent,
	SidebarGroupLabel,
	useSidebar,
} from '@/components/ui/sidebar';
import { useChatHistory } from '@/hooks/use-chat-history';
import { useUser } from '@auth0/nextjs-auth0';
import { startCase } from 'lodash-es';
import { useParams, useRouter } from 'next/navigation';
import { NewChatButton } from '../new-chat-button';
import { SidebarHistoryItem } from './sidebar-history-item';
export function SidebarHistory() {
	const router = useRouter();
	const { setOpenMobile } = useSidebar();
	const { id } = useParams();
	const { user, isLoading: isAuthLoading } = useUser();

	const { data: chats, count, isLoading, deleteChat } = useChatHistory();

	const isAuthenticated = !!user && !isAuthLoading;
	const loading = isAuthLoading || isLoading;

	return (
		<SidebarGroup>
			{(() => {
				if (loading) {
					return (
						<SidebarGroupContent>
							<div className='flex flex-col'>
								{[44, 32, 28, 64, 52].map((item) => (
									<div
										key={item}
										className='flex h-8 items-center gap-2 rounded-md px-2'
									>
										<div
											className='bg-sidebar-accent-foreground/10 h-4 max-w-(--skeleton-width) flex-1 rounded-md'
											style={
												{
													'--skeleton-width': `${item}%`,
												} as React.CSSProperties
											}
										/>
									</div>
								))}
							</div>
						</SidebarGroupContent>
					);
				}

				if (!isAuthenticated) {
					return (
						<SidebarGroupContent>
							<div className='flex w-full flex-row items-center justify-center gap-2 px-2 text-sm text-zinc-500'>
								Login to save and revisit previous chats!
							</div>
						</SidebarGroupContent>
					);
				}

				if (count === 0) {
					return (
						<SidebarGroupContent className='inline px-2 text-sm text-zinc-500 italic'>
							Your conversations will appear here once you
							<NewChatButton
								{...{ className: 'h-auto py-0 px-1', variant: 'ghost' }}
							>
								start chatting!
							</NewChatButton>
						</SidebarGroupContent>
					);
				}
				const groups = Object.keys(chats);
				return groups.map((group) => {
					const items = chats[group as keyof Chat.GroupedItems<Chat.UIChat>];

					if (items.length > 0) {
						return (
							<>
								<SidebarGroupLabel className='uppercase'>
									{startCase(group)}
								</SidebarGroupLabel>
								<SidebarGroupContent className='pb-5'>
									{items.map((chat) => (
										<SidebarHistoryItem
											key={chat.id}
											{...{
												chat,
												isActive: chat.id === id,
												onDelete: () => deleteChat(chat.id),
												setOpenMobile,
											}}
										/>
									))}
								</SidebarGroupContent>
							</>
						);
					}
				});
			})()}
		</SidebarGroup>
	);
}
