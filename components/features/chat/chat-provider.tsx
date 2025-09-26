'use client';
import { toast } from '@/components/toast';
import { useChatHistory } from '@/hooks/use-chat-history';
import { useDataStream } from '@/hooks/use-data-stream';
import { useUserProfile } from '@/hooks/use-user-profile';
import { APIError } from '@/lib/errors';
import { authMessageOverride, firstMessageOverride } from '@/lib/signals';
import { ulid } from '@/lib/utils';
import { fetchWithErrorHandlers } from '@/lib/utils/fetch';
import { Chat as AIChat } from '@ai-sdk/react';
import {
	useSignal,
	useSignalEffect,
	useSignals,
} from '@preact/signals-react/runtime';
import { DefaultChatTransport } from 'ai';
import React, { createContext, useEffect, useMemo, useRef } from 'react';

import { LS_KEY_AUTH, LS_KEY_FIRST } from '@/lib/constants';
import type { Chat as ChatType } from '@/types/chat';
export interface ChatContextValue {
	chat: AIChat<ChatType.UIMessage>;
}

export const ChatContext = createContext<ChatContextValue | undefined>(
	undefined
);

export interface ChatProviderOptions extends React.PropsWithChildren {
	chatId: string;
	isNewChat?: boolean;
	initialMessages?: ChatType.UIMessage[];
}

export function ChatProvider({
	chatId,
	children,
	isNewChat,
	initialMessages: messages,
}: ChatProviderOptions) {
	useSignals();
	// Need to initialize local signals due to some NextJS quirks
	const firstMessageSent = useSignal<boolean | null>(null);
	const authMessageSent = useSignal<boolean | null>(null);

	useSignalEffect(() => {
		if (localStorage) {
			// No value in signal
			// Sync with localStorage
			if (firstMessageSent.value === null) {
				// This happens on initial load and we only want to do this once
				// Afterwards we want the signal to be the source of truth
				const lsFirstMessageSent =
					(localStorage.getItem(LS_KEY_FIRST) ?? 'false') == 'true';

				firstMessageSent.value = lsFirstMessageSent;
			} else {
				localStorage?.setItem(
					LS_KEY_FIRST,
					firstMessageSent.value ? 'true' : 'false'
				);
			}
		}
	});

	useSignalEffect(() => {
		if (localStorage) {
			// No value in signal
			// Sync with localStorage
			if (authMessageSent.value === null) {
				// This happens on initial load and we only want to do this once
				// Afterwards we want the signal to be the source of truth
				const lsAuthMessageSent =
					(localStorage.getItem(LS_KEY_AUTH) ?? 'false') == 'true';

				authMessageSent.value = lsAuthMessageSent;
			} else {
				localStorage?.setItem(
					LS_KEY_AUTH,
					authMessageSent.value ? 'true' : 'false'
				);
			}
		}
	});

	const { setDataStream } = useDataStream();
	const { mutate: refreshChatHistory } = useChatHistory();
	const {
		data: user,
		isAuthenticated,
		isFetching,
		isLoading,
		updateUserSettings,
	} = useUserProfile();

	const chatRef = useRef<AIChat<ChatType.UIMessage>>(null);

	if (!chatRef.current || chatRef.current.id !== chatId) {
		chatRef.current = new AIChat<ChatType.UIMessage>({
			generateId: ulid,
			messages,
			id: chatId,
			onData: (dataPart) => {
				setDataStream?.((ds) => (ds ? [...ds, dataPart] : []));
			},
			onError: (error) => {
				console.error('=== useChat error ===');
				console.table(error);

				if (error instanceof APIError) {
					console.table(error);
					toast({
						type: 'error',
						description: error.message,
					});
				}
			},
			onFinish: () => {
				if (isNewChat) {
					// Update chat history to get generated chat name.
					// TODO: Eliminate this once we add title streaming
					refreshChatHistory();
				}
			},
			transport: new DefaultChatTransport({
				api: `/api/chat/${chatId}`,
				fetch: fetchWithErrorHandlers,
				prepareSendMessagesRequest(options) {
					const { messages, id, body } = options;

					return {
						body: {
							id,
							// CacheMiddleware only permits a single message
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
		if (!isLoading && !isFetching && chatId) {
			const sendFirstMessage =
				firstMessageOverride.value ||
				(!isAuthenticated && !firstMessageSent.value);

			if (sendFirstMessage) {
				firstMessageOverride.value = false;
				firstMessageSent.value = true;

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
			}
		}
	}, [chatId, isAuthenticated, isLoading, firstMessageSent, isFetching, chat]);

	const isFirstLogin = user?.logins_count <= 1;
	useEffect(() => {
		if (!isLoading && !isFetching && chatId) {
			const sendAuthMessage =
				authMessageOverride.value || (isFirstLogin && !authMessageSent.value);

			if (sendAuthMessage) {
				authMessageOverride.value = false;
				authMessageSent.value = true;

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
			}
		}
	}, [
		chatId,
		user,
		chat,
		isLoading,
		isFetching,
		isFirstLogin,
		updateUserSettings,
		authMessageSent,
	]);

	const value = useMemo(() => ({ chat }), [chat]);

	return <ChatContext.Provider {...{ value }}>{children}</ChatContext.Provider>;
}
