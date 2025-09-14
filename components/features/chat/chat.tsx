'use client';

import { Header } from '@/components/layout/header';
import {
	Conversation,
	ConversationContent,
	ConversationScrollButton,
} from '@/components/ui/ai-elements/conversation';
import { Badge } from '@/components/ui/badge';
import { Loader } from '@/components/ui/prompt-kit/loader';
import { useChat } from '@/hooks';
import { cn } from '@/lib/utils';
import { ChatMessage } from './chat-message';
import { ChatThinkingMessage } from './chat-thinking-message';
import { PromptInput } from './prompt-input';
import { Greeting } from './ui';

import type { Chat } from '@/types';
export function Chat({ hideLogin }: { hideLogin?: boolean }) {
	const { messages, status } = useChat<Chat.UIMessage>();

	const isThinking =
		status === 'submitted' &&
		messages.length > 0 &&
		messages[messages.length - 1]?.role === 'user';

	return (
		<div className='bg-background flex h-dvh min-w-0 flex-col overflow-hidden overscroll-none'>
			<Header {...{ hideLogin }}>
				<div className='flex h-full w-full items-center justify-start gap-2'>
					<span className='font-bold'>Chat</span>
					<Badge
						variant='outline'
						className='p2 flex justify-start gap-1 border-none text-xs font-normal'
					>
						{(() => {
							if (status === 'ready') {
								return <span>🟢</span>;
							}
							return (
								<Loader
									variant='pulse-dot'
									className={cn({ 'bg-red-500': status === 'error' })}
								/>
							);
						})()}
						<span className='uppercase'>{status}</span>
					</Badge>
				</div>
			</Header>
			<div
				id='conversation-container'
				className='relative mx-auto flex size-full h-full flex-col items-center overflow-hidden overscroll-none pb-8'
			>
				<Conversation className='w-full pt-4'>
					<ConversationContent>
						<div className='w-full max-w-5xl self-center'>
							{messages.length === 0 && <Greeting />}
							{messages.map((message, i) => {
								const isLastMessage = i === messages.length - 1;
								const isLoading =
									status === 'streaming' && messages.length - 1 === i;

								return (
									<ChatMessage
										key={`${message.id}-${i}`}
										{...{
											isLastMessage,
											isLoading,
											isThinking,
											message,
											showActions: status === 'ready',
										}}
									/>
								);
							})}
							{/* This shows a thinking indicator before the 'assistant' message arrives. Otherwise it's awkward. */}
							<ChatThinkingMessage
								{...{
									className: 'm-4',
									isThinking,
								}}
							/>
						</div>
					</ConversationContent>
					<ConversationScrollButton />
				</Conversation>
				<PromptInput />
			</div>
		</div>
	);
}
