import { ChatContext } from '@/components/features/chat/chat-provider';
import { useChat as useAIChat } from '@ai-sdk/react';
import { useContext } from 'react';

import type { Chat } from '@/types/chat';

export function useChat() {
	const context = useContext(ChatContext);

	if (!context) {
		throw new Error('useChat must be used within a ChatProvider!');
	}
	const chat = context?.chat;

	return useAIChat<Chat.UIMessage>({ chat });
}
