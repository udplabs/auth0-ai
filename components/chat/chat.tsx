'use client';

import { FederatedConnectionInterruptHandler } from '@/components/auth0-ai/FederatedConnections/FederatedConnectionInterruptHandler';
import { ModelSelector } from '@/components/chat/model-selector';
import { Header } from '@/components/header';
import {
	ChatContainerContent,
	ChatContainerRoot,
	ChatContainerScrollAnchor,
} from '@/components/ui/chat-container';
import { ScrollButton } from '@/components/ui/scroll-button';
import { useAutoResume } from '@/hooks/use-auto-resume';
import { useChatHistory } from '@/hooks/use-chat-history';
import { APIError } from '@/lib/errors';
import { fetchWithErrorHandlers } from '@/lib/utils';
import { useChatWithInterruptions } from '@auth0/ai-vercel/react';
import { DefaultChatTransport } from 'ai';
import { useParams, useSearchParams } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { ulid } from 'ulid';
import { toast } from '../toast';
import { Greeting } from './greeting';
import { ThinkingMessage } from './messages/thinking-message';
import { Message } from './messages/ui-message';
import { MultimodalInput } from './multi-modal-input/multimodal-input';

export interface ChatProps {
	id?: string;
	userId: string;
	initialMessages?: Chat.UIMessage[];
	initialChatModel: string;
	autoResume?: boolean;
}

export function Chat({
	id: _id = ulid(),
	userId,
	initialMessages = [],
	initialChatModel,
	autoResume = false,
}: ChatProps) {
	const { id: pathId = _id } = useParams<{ id: string | string[] }>() || {};

	const id: string = pathId && Array.isArray(pathId) ? pathId[0] : pathId;

	const { mutate: refreshChatHistory } = useChatHistory();

	const [input, setInput] = useState<string>('');

	const {
		messages,
		setMessages,
		sendMessage,
		status,
		stop,
		resumeStream,
		toolInterrupt,
	} = useChatWithInterruptions<Chat.UIMessage>({
		id,
		// experimental_throttle: 100,
		generateId: ulid,
		transport: new DefaultChatTransport({
			api: `/api/chat/${id}`,
			fetch: fetchWithErrorHandlers,
			prepareSendMessagesRequest({ messages, id, body }) {
				console.log('useChat message count:', messages.length);
				return {
					body: {
						id,
						message: messages.at(-1),
						selectedChatModel: initialChatModel,
						...body,
					},
				};
			},
			prepareReconnectToStreamRequest(options) {
				return {
					...options,
					api: `/api/chat/${options?.id}/stream`,
				};
			},
		}),
		onFinish: ({ message }) => {
			console.group('=== useChat ON FINISH ===');
			console.log('checking for interrupt...');
			let toolErrorText = '';

			const toolError = message?.parts.find((p) => {
				if (p.type.startsWith('tool-')) {
					const { errorText, state } = p as Chat.ToolPart;

					if (state === 'output-error' && errorText) {
						toolErrorText = errorText;
						return true;
					}
				}
			});

			console.log('=== toolError ===');
			console.log(toolError);
			console.groupEnd();

			if (toolError) {
				console.log('tool error detected, handling...');
				// handler(() => refreshChatHistory())(
				// 	new Error(`${InterruptionPrefix}${toolErrorText}`)
				// );
			} else {
				console.log('no tool error, refreshing chat history...');
			}
			refreshChatHistory();
		},
		onData: (dataPart) => {
			console.group('=== DATA PART ===');
			console.log(dataPart);
			console.groupEnd();
		},
		onError: (error) => {
			console.log('=== useChat error ===');
			console.log(error);

			if (error instanceof APIError) {
				console.log('I haz err...');
				console.log(error);
				toast({
					type: 'error',
					description: error.message,
				});
			}
		},
	});

	const seededForIdRef = useRef<string | null>(null);
	useEffect(() => {
		if (seededForIdRef.current === id) return;
		seededForIdRef.current = id;
		setMessages(initialMessages);
	}, [id, initialMessages, setMessages]);

	const searchParams = useSearchParams();
	const query = searchParams.get('query');

	const [appendedQuery, setAppendedQuery] = useState<string | null>(null);

	useEffect(() => {
		// If we have a query param, and haven't appended it yet, send it as a message. This is a feature.
		if (userId && query && appendedQuery === null && _id === id) {
			console.log('setting query param...');
			console.log(query);

			setAppendedQuery(query);

			sendMessage({
				role: 'user',
				parts: [{ type: 'text', text: query }],
				metadata: { userId, chatId: id },
			});

			// Update the URL to remove the query param after sending
			window.history.replaceState(null, '', `/chat/${id}`);
			return;
		}
		// cannot add sendMessage to deps, it causes infinite loop
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [query, appendedQuery, id, _id, userId]);

	useAutoResume({
		autoResume,
		initialMessages,
		resumeStream,
	});

	return (
		<div className='bg-background flex h-dvh min-w-0 flex-col'>
			<Header>
				<ModelSelector
					selectedModelId={initialChatModel}
					className='order-1 md:order-2'
				/>
			</Header>

			<ChatContainerRoot className='relative flex min-w-0 flex-1 flex-col overflow-y-hidden pt-4'>
				<ChatContainerContent className='gap-6'>
					<div className='mx-auto flex w-full max-w-3xl flex-col gap-6 px-4'>
						{messages.length === 0 && <Greeting />}
						{messages.map((message, index) => (
							<Message
								key={message.id}
								isLoading={
									status === 'streaming' && messages.length - 1 === index
								}
								isLastMessage={
									message.role === 'assistant' && index === messages.length - 1
								}
								isStreaming={status === 'streaming'}
								{...{ message }}
							/>
						))}
						{status === 'submitted' &&
							messages.length > 0 &&
							messages[messages.length - 1].role === 'user' && (
								<ThinkingMessage />
							)}
						<FederatedConnectionInterruptHandler interrupt={toolInterrupt} />
						<ChatContainerScrollAnchor />
					</div>
				</ChatContainerContent>
				<div className='absolute bottom-0 left-[50%]'>
					<ScrollButton />
				</div>
			</ChatContainerRoot>

			<form className='bg-background mx-auto flex w-full px-4 pb-4 md:max-w-3xl md:pb-6'>
				<MultimodalInput
					chatId={id}
					input={input}
					setInput={setInput}
					status={status}
					stop={stop}
					messages={messages}
					setMessages={setMessages}
					sendMessage={sendMessage}
				/>
			</form>
		</div>
	);
}
