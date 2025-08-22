'use client';

import { ToolResult } from '@/components/tools/tool-result';
import { Loader } from '@/components/ui/loader';
import {
	MessageAvatar,
	Message as MessageContainer,
	MessageContent,
} from '@/components/ui/message';
import {
	Reasoning,
	ReasoningContent,
	ReasoningTrigger,
} from '@/components/ui/prompt-kit/reasoning';
import { cn } from '@/lib/utils';
import { isToolUIPart } from 'ai';
import { AnimatePresence, motion } from 'framer-motion';
import { BotIcon } from 'lucide-react';
import { memo } from 'react';
import { MessageActions } from './message-actions';
// Type narrowing is handled by TypeScript's control flow analysis
// The AI SDK provides proper discriminated unions for tool calls

const PureMessage = ({
	message,
	isLoading,
	isLastMessage,
	isStreaming = false,
}: {
	message: Chat.UIMessage;
	isLoading: boolean;
	isLastMessage: boolean;
	isStreaming?: boolean;
}) => {
	console.group('==== Message ', message.id, '====');
	console.log(JSON.stringify(message, null, 2));
	console.groupEnd();
	return (
		<AnimatePresence>
			<motion.div
				data-testid={`message-${message.role}`}
				className='group/message w-full'
				initial={{ y: 5, opacity: 0 }}
				animate={{ y: 0, opacity: 1 }}
				data-role={message.role}
			>
				<MessageContainer>
					{message.role === 'assistant' && (
						<MessageAvatar
							fallback
							className='bg-background-transparent ring-border size-8 ring-1'
						>
							<BotIcon size={24} />
						</MessageAvatar>
					)}
					<div className='flex w-full flex-col gap-4'>
						{message.parts?.map((part, index) => {
							const { type } = part;
							const key = `message-${message.id}-${index}`;

							if (type === 'reasoning') {
								return (
									<Reasoning
										key={key}
										className='mt-2.5 w-full'
										{...{ isStreaming: isStreaming && isLastMessage }}
									>
										<ReasoningTrigger className='text-primary text-xs'>
											{isLoading ? (
												<div className='flex gap-2'>
													<Loader
														size='sm'
														variant='wave'
													/>
													Thinking...
												</div>
											) : (
												'Reasoned for a few...'
											)}
										</ReasoningTrigger>
										{part?.text?.trim().length > 0 && (
											<ReasoningContent
												className={cn(
													'bg-secondary/50 border-secondary/30 mt-2 rounded-md border p-4',
													'dark:bg-secondary/20 dark:border-secondary/50'
												)}
												markdown
											>
												{part.text}
											</ReasoningContent>
										)}
									</Reasoning>
								);
							}

							if (type === 'text') {
								return (
									<div
										className='flex w-full flex-col gap-2'
										key={key}
									>
										<MessageContent
											markdown
											className={cn('flex flex-col gap-2 bg-transparent', {
												'bg-primary text-primary-foreground rounded-xl px-3 py-2':
													message.role === 'user',
											})}
										>
											{part.text}
										</MessageContent>
									</div>
								);
							}

							// Handle tool calls
							if (isToolUIPart<Chat.Tools.UITools>(part)) {
								return (
									<ToolResult
										key={key}
										toolPart={part as Chat.ToolPart}
									/>
								);
							}
						})}

						{message.role === 'assistant' && isLastMessage && (
							<MessageActions
								key={`action-${message.id}`}
								message={message}
								isLoading={isLoading}
							/>
						)}
					</div>
				</MessageContainer>
			</motion.div>
		</AnimatePresence>
	);
};

export const Message = memo(PureMessage, (prev, next) => {
	if (prev.isLoading !== next.isLoading) return false;
	if (prev.isLastMessage !== next.isLastMessage) return false;
	if (prev.isStreaming !== next.isStreaming) return false;

	// message object is stable, skip re-render
	if (prev.message === next.message) return true;

	// fallback: compare identity + parts length to catch streaming changes
	const pParts = prev.message?.parts ?? [];
	const nParts = next.message?.parts ?? [];

	if (prev.message.id !== next.message.id) return false;
	if (pParts.length !== nParts.length) return false;

	// If lengths equal, assume unchanged; streaming usually appends parts
	return true;
});
