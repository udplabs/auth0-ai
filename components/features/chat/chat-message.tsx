'use client';

import {
	ToolResult,
	type ToolPart,
	type ToolResultProps,
} from '@/components/gen-ai/tool-result';
import {
	Message,
	MessageContent,
	type MessageAvatarProps,
	type MessageContentProps,
	type MessageProps,
} from '@/components/ui/ai-elements/message';
import {
	Response,
	type ResponseProps,
} from '@/components/ui/ai-elements/response';
import { isToolUIPart } from 'ai';
import { memo } from 'react';
import { ChatMessageActions } from './chat-message-actions';
import { ChatThinkingMessage } from './chat-thinking-message';
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
	MessageAvatarProps?: MessageAvatarProps;
	ResponseProps?: ResponseProps;
	ToolResultProps?: ToolResultProps;
}

const MemoResponse = memo(Response);

export const ChatMessage = ({
	message,
	showActions = false,
	isLastMessage = false,
	isLoading = false,
	isThinking = false,
	MessageProps,
	MessageContentProps,
	MessageAvatarProps,
	ResponseProps,
	ToolResultProps,
	...props
}: ChatMessageProps) => {
	console.groupCollapsed('==== Message ', message.id, '====');
	console.log(JSON.stringify(message, null, 2));
	console.groupEnd();

	return (
		<div {...props}>
			<Message {...{ ...MessageProps, from: message.role }}>
				<MessageContent {...MessageContentProps}>
					{message.role === 'assistant' && (
						<ChatThinkingMessage {...{ isThinking: isLoading || isThinking }} />
					)}
					{(() => {
						return message.parts?.map((part, index) => {
							const { type } = part;
							const key = `message-${message.id}-${index}`;

							if (type === 'text') {
								return (
									<MemoResponse
										key={key}
										{...ResponseProps}
									>
										{part.text}
									</MemoResponse>
								);
							}

							// Handle tool calls
							if (isToolUIPart(part)) {
								return (
									<ToolResult
										key={key}
										{...{ ...ToolResultProps, toolPart: part as ToolPart }}
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
