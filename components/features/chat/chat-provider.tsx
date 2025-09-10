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
import React, { createContext, useEffect, useMemo, useRef } from 'react';
import { ulid } from 'ulid';

import { LS_KEY_AUTH, LS_KEY_FIRST } from '@/lib/constants';
export interface ChatContextValue {
	chat: AIChat<Chat.UIMessage>;
}

export const ChatContext = createContext<ChatContextValue | undefined>(
	undefined
);

interface CreateChatOptions
	extends Omit<ChatInit<Chat.UIMessage>, 'transport'> {
	transport?: HttpChatTransportInitOptions<Chat.UIMessage>;
}

export interface ChatProviderOptions extends React.PropsWithChildren {
	chatOptions: CreateChatOptions;
	chatId: string;
	autoResume?: boolean;
	isNewChat?: boolean;
}

function createChat(
	options?: CreateChatOptions,
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
	} = transport || ({} as HttpChatTransportInitOptions<Chat.UIMessage>);

	return new AIChat<Chat.UIMessage>({
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
		}),
	});
}

export function ChatProvider({
	chatId,
	chatOptions: { messages, id = chatId, ...options },
	children,
	isNewChat,
}: ChatProviderOptions) {
	const { mutate: refreshChatHistory } = useChatHistory();
	const { data: user, isAuthenticated, updateUserSettings } = useUserProfile();

	const chatRef = useRef<AIChat<Chat.UIMessage>>();

	if (!chatRef.current || chatRef.current.id !== id) {
		chatRef.current = createChat(
			{ id, messages, ...options },
			{ ...(isNewChat ? { refreshChatHistory } : {}) }
		);
	}

	const chat = chatRef.current;
	useEffect(() => {
		const sendFirstMessage =
			!isAuthenticated &&
			(localStorage.getItem(LS_KEY_FIRST) ?? 'false') !== 'true';

		if (id && sendFirstMessage) {
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
	}, [id, isAuthenticated, chatId, chat]);

	const isFirstLogin = user?.logins_count <= 1;
	useEffect(() => {
		const sendAuthMessage =
			id &&
			user?.user_id &&
			isFirstLogin &&
			(localStorage.getItem(LS_KEY_AUTH) ?? 'false') !== 'true';

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
	}, [id, user, chat, isFirstLogin, chatId]);

	const value = useMemo<ChatContextValue>(
		() => ({ chat: chat as unknown as AIChat<Chat.UIMessage> }),
		[chat]
	);

	return <ChatContext.Provider {...{ value }}>{children}</ChatContext.Provider>;
}
