'use client';

import { toast } from '@/components/toast';
import { useChatHistory, useUserProfile } from '@/hooks';
import { APIError } from '@/lib/errors';
import { fetchWithErrorHandlers } from '@/lib/utils';
import { Chat as AIChat } from '@ai-sdk/react';
import {
	ChatInit,
	DefaultChatTransport,
	type HttpChatTransportInitOptions,
} from 'ai';
import React, { createContext, useEffect, useMemo } from 'react';
import { ulid } from 'ulid';

export interface ChatContextValue<
	UI_MESSAGE extends Chat.UIMessage = Chat.UIMessage,
> {
	chat: AIChat<UI_MESSAGE>;
}

export const ChatContext = createContext<ChatContextValue | undefined>(
	undefined
);

interface CreateChatOptions<UI_MESSAGE extends Chat.UIMessage = Chat.UIMessage>
	extends Omit<ChatInit<UI_MESSAGE>, 'transport'> {
	transport?: HttpChatTransportInitOptions<UI_MESSAGE>;
}

export interface ChatProviderOptions<
	UI_MESSAGE extends Chat.UIMessage = Chat.UIMessage,
> extends React.PropsWithChildren {
	chatOptions: CreateChatOptions<UI_MESSAGE>;
	chatId: string;
	autoResume?: boolean;
	isNewChat?: boolean;
	syncContent?: boolean;
}

function createChat<UI_MESSAGE extends Chat.UIMessage = Chat.UIMessage>(
	options?: CreateChatOptions<UI_MESSAGE>,
	utils?: { refreshChatHistory?: () => void }
) {
	const _id = ulid();
	const {
		id = _id,
		generateId = ulid,
		onData,
		onError,
		onFinish,
		transport,
		...chatOptions
	} = options || {};

	const {
		prepareSendMessagesRequest,
		prepareReconnectToStreamRequest,
		...transportOptions
	} = transport || ({} as HttpChatTransportInitOptions<UI_MESSAGE>);

	return new AIChat<UI_MESSAGE>({
		...chatOptions,
		id,
		generateId,
		onData: (dataPart) => {
			console.log('=== DATA PART ===');
			console.table(dataPart);

			if (onData) {
				console.warn('Custom onData provided! overriding default behavior...');
				return onData(dataPart);
			}
			console.log('no default behavior...');
		},
		onError: (error) => {
			console.log('=== useChat error ===');
			console.table(error);

			if (onError) {
				console.warn('Custom onError provided! overriding default behavior...');
				return onError(error);
			}

			if (error instanceof APIError) {
				console.log('I haz err...');
				console.table(error);
				toast({
					type: 'error',
					description: error.message,
				});
			}
		},
		onFinish: (options) => {
			console.log('=== useChat ON FINISH ===');

			if (onFinish) {
				console.warn(
					'Custom onFinish provided! overriding default behavior...'
				);
				return onFinish(options);
			}

			console.log('checking for interrupt...');
			const { message } = options;
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
			console.table(toolError);

			if (toolError) {
				console.log('tool error detected, handling...');
				// handler(() => refreshChatHistory())(
				// 	new Error(`${InterruptionPrefix}${toolErrorText}`)
				// );
			} else {
				console.log('no tool error, refreshing chat history...');
			}
			utils?.refreshChatHistory?.();
		},
		transport: new DefaultChatTransport({
			api: `/api/chat/${id}`,
			fetch: fetchWithErrorHandlers,
			...transportOptions,
			prepareSendMessagesRequest(options) {
				if (prepareSendMessagesRequest) {
					return prepareSendMessagesRequest(options);
				}

				const { messages, id, body } = options;

				return {
					body: {
						id,
						message: messages.at(-1),
						...body,
					},
				};
			},
			prepareReconnectToStreamRequest(options) {
				if (prepareReconnectToStreamRequest) {
					return prepareReconnectToStreamRequest(options);
				}
				return {
					...options,
					api: `/api/chat/${options?.id}/stream`,
				};
			},
		}),
	});
}

export function ChatProvider<
	UI_MESSAGE extends Chat.UIMessage = Chat.UIMessage,
>({
	chatId,
	chatOptions: { messages, id = chatId, ...options },
	autoResume = true,
	children,
	isNewChat,
	syncContent,
}: ChatProviderOptions<UI_MESSAGE>) {
	const { mutate: refreshChatHistory } = useChatHistory();
	const { data: user, isAuthenticated } = useUserProfile();

	useEffect(() => {
		if (!syncContent) return;

		const ctrl = new AbortController();
		console.log('triggering db sync...');

		fetch('/api/me/settings', {
			method: 'POST',
			cache: 'no-store',
			signal: ctrl.signal,
		});

		console.log('db synced!');
	}, [syncContent]);

	const isFirstMessage = firstMessage(isAuthenticated);
	const isFirstLogin = user?.logins_count === 1;

	const chat = useMemo(
		() =>
			createChat<UI_MESSAGE>(
				{ id, messages, ...options },
				{ ...(isNewChat ? { refreshChatHistory } : {}) }
			),
		[id, messages]
	);

	// useEffect(() => {
	// 	if (id && isFirstMessage) {
	// 		// This is the first interaction with this user/person.
	// 		// They might not even be authenticated!
	// 		// Let's kick off an introductory monologue for AIya.
	// 		chat.sendMessage({
	// 			text: 'Hi AIya! This is my first message.',
	// 		});

	// 		localStorage.setItem('first-message', 'false');
	// 	}
	// }, [id, isFirstMessage, chat]);

	useEffect(() => {
		if (id && isFirstLogin) {
			// User has authenticated successfully.
			// Kick off the next step.
			chat.sendMessage({
				text: 'Hi AIya! I have successfully authenticated. What\s next?',
			});

			//TODO: update settings w/ correct step number
		}
	}, [id, isFirstLogin, chat]);

	const value = useMemo<ChatContextValue>(
		() => ({ chat: chat as unknown as AIChat<Chat.UIMessage> }),
		[chat]
	);

	return <ChatContext.Provider {...{ value }}>{children}</ChatContext.Provider>;
}

function firstMessage(isAuthenticated?: boolean) {
	if (!isAuthenticated) return false;

	const string = localStorage.getItem('first-message');

	return string !== null && string === 'true';
}
