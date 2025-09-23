'use client';

import {
	ToolResult,
	type ToolPart,
	type ToolResultProps,
} from '@/components/gen-ai/tool-result';
import {
	Message,
	MessageContent,
	type MessageContentProps,
	type MessageProps,
} from '@/components/ui/ai-elements/message';
import {
	Response,
	type ResponseProps,
} from '@/components/ui/ai-elements/response';
import { isToolUIPart } from 'ai';
import { ChatMessageActions } from './chat-message-actions';
import { ChatThinkingMessage } from './chat-thinking-message';

import type { Chat } from '@/types/chat';
// Type narrowing is handled by TypeScript's control flow analysis
// The AI SDK provides proper discriminated unions for tool calls

export interface ChatMessageProps extends React.ComponentProps<'div'> {
	message: Chat.UIMessage;
	showActions?: boolean;
	isLastMessage?: boolean;
	isLoading?: boolean;
	isThinking?: boolean;
	MessageProps?: Omit<MessageProps, 'from'>;
	MessageContentProps?: MessageContentProps;
	ResponseProps?: ResponseProps;
	ToolResultProps?: ToolResultProps;
}

export const ChatMessage = ({
	message,
	showActions = false,
	isLastMessage = false,
	isLoading = false,
	isThinking = false,
	MessageProps,
	MessageContentProps,
	ResponseProps,
	ToolResultProps,
	...props
}: ChatMessageProps) => {
	const isAssistant = message.role === 'assistant';

	// Hide certain system/generated messages
	if (message.metadata?.isHidden) return null;

	return (
		<div {...props}>
			<Message {...{ ...MessageProps, from: message.role }}>
				<MessageContent {...MessageContentProps}>
					{isAssistant && (
						<ChatThinkingMessage {...{ isThinking: isLoading || isThinking }} />
					)}
					{(() => {
						return message.parts?.map((part, index) => {
							const { type } = part;
							const key = `message-${message.id}-${index}`;

							if (type === 'text') {
								return (
									<Response
										key={key}
										{...{
											defaultOrigin: `http://localhost:3000`,
											...ResponseProps,
										}}
									>
										{part.text}
									</Response>
								);
							}

							// Handle tool calls
							if (isToolUIPart(part)) {
								if (part.type.includes('transferFunds')) {
								}
								return (
									<ToolResult
										key={key}
										{...{
											...ToolResultProps,
											toolPart: part as ToolPart,
											parts: message.parts,
										}}
									/>
								);
							}
						});
					})()}
				</MessageContent>
			</Message>
			{showActions && <ChatMessageActions {...{ isLastMessage, message }} />}
		</div>
	);
};
