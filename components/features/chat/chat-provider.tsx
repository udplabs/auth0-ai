'use client';
import { toast } from '@/components/toast';
import { useChatHistory } from '@/hooks/use-chat-history';
import { useDataStream } from '@/hooks/use-data-stream';
import { useUserProfile } from '@/hooks/use-user-profile';
import { APIError } from '@/lib/errors';
import { fetchWithErrorHandlers } from '@/lib/utils/fetch';
import { Chat as AIChat } from '@ai-sdk/react';
import {
	ChatInit,
	DefaultChatTransport,
	type HttpChatTransportInitOptions,
} from 'ai';
import React, { createContext, useEffect, useMemo, useRef } from 'react';
import { ulid } from 'ulid';

import type { Chat as ChatType } from '@/types/chat';

import { LS_KEY_AUTH, LS_KEY_FIRST } from '@/lib/constants';
export interface ChatContextValue {
	chat: AIChat<ChatType.UIMessage>;
}

export const ChatContext = createContext<ChatContextValue | undefined>(
	undefined
);

interface CreateChatOptions
	extends Omit<ChatInit<ChatType.UIMessage>, 'transport' | 'id'> {
	transport?: HttpChatTransportInitOptions<ChatType.UIMessage>;
}

export interface ChatProviderOptions extends React.PropsWithChildren {
	chatOptions: CreateChatOptions;
	chatId: string;
	autoResume?: boolean;
	isNewChat?: boolean;
}

export function ChatProvider({
	chatId,
	chatOptions,
	children,
	isNewChat,
}: ChatProviderOptions) {
	const { setDataStream } = useDataStream();
	const { mutate: refreshChatHistory } = useChatHistory();
	const { data: user, isAuthenticated, updateUserSettings } = useUserProfile();

	const chatRef = useRef<AIChat<ChatType.UIMessage>>(null);

	if (!chatRef.current || chatRef.current.id !== chatId) {
		const {
			onData,
			onError,
			onFinish,
			transport,
			generateId = ulid,
			...options
		} = chatOptions || {};

		const {
			prepareSendMessagesRequest,
			prepareReconnectToStreamRequest,
			...transportOptions
		} = transport || ({} as HttpChatTransportInitOptions<ChatType.UIMessage>);

		chatRef.current = new AIChat<ChatType.UIMessage>({
			...options,
			id: chatId,
			onData: (dataPart) => {
				if (onData) {
					console.warn(
						'Custom onData provided! overriding default behavior...'
					);
					return onData(dataPart);
				}
				setDataStream?.((ds) => (ds ? [...ds, dataPart] : []));
			},
			onError: (error) => {
				console.log('=== useChat error ===');
				console.table(error);

				if (onError) {
					console.warn(
						'Custom onError provided! overriding default behavior...'
					);
					return onError(error);
				}

				if (error instanceof APIError) {
					console.table(error);
					toast({
						type: 'error',
						description: error.message,
					});
				}
			},
			onFinish: (options) => {
				if (onFinish) {
					console.warn(
						'Custom onFinish provided! overriding default behavior...'
					);
					return onFinish(options);
				}

				if (isNewChat) {
					// Update chat history to get generated chat name.
					// TODO: Eliminate this once we add title streaming
					refreshChatHistory();
				}
			},
			transport: new DefaultChatTransport({
				api: `/api/chat/${chatId}`,
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
			}),
		});
	}

	const chat = chatRef.current;
	useEffect(() => {
		const sendFirstMessage =
			!isAuthenticated &&
			(localStorage.getItem(LS_KEY_FIRST) ?? 'false') !== 'true';

		if (chatId && sendFirstMessage) {
			// This is the first interaction with this user/person.
			// They might not even be authenticated!
			// Let's kick off an introductory monologue for Aiya.
			chat.sendMessage({
				text: 'Hi Aiya! This is my first message.',
				metadata: {
					chatId,
					labStep: 'step-03',
					isFirstMessage: 'true',
				},
			});

			localStorage.setItem(LS_KEY_FIRST, 'true');
		}
	}, [chatId, isAuthenticated, chatId, chat]);

	const isFirstLogin = user?.logins_count <= 1;
	useEffect(() => {
		const sendAuthMessageLS = localStorage.getItem(LS_KEY_AUTH);

		// For debug purposes -- If localStorage is explicitly set to 'false',
		// we will send the message even if it is not the user's first login.
		const sendAuthMessage =
			sendAuthMessageLS === 'false' ||
			(chatId && user?.user_id && isFirstLogin && sendAuthMessageLS !== 'true');

		if (!sendAuthMessage) return;

		// User has authenticated successfully.
		// Kick off the next step.
		chat.sendMessage({
			text: 'Hi Aiya! I have successfully authenticated. What\s next?',
			metadata: {
				chatId,
				labStep: 'step-04',
			},
		});

		updateUserSettings({
			id: user.id,
			currentLabStep: 'step-04',
			nextLabStep: 'step-05',
		});

		localStorage.setItem(LS_KEY_AUTH, 'true');
	}, [chatId, user, chat, isFirstLogin]);

	const value = useMemo<ChatContextValue>(
		() => ({ chat: chat as unknown as AIChat<ChatType.UIMessage> }),
		[chat]
	);

	return <ChatContext.Provider {...{ value }}>{children}</ChatContext.Provider>;
}
