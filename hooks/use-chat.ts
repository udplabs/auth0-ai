import { ChatContext } from '@/components/features/chat/chat-provider';
import {
	Chat as AIChat,
	useChat as useAIChat,
	type UIMessage,
} from '@ai-sdk/react';
import { useContext } from 'react';

export function useChat<UI_MESSAGE extends UIMessage = Chat.UIMessage>() {
	const context = useContext(ChatContext);

	if (!context) {
		throw new Error('useChat must be used within a ChatProvider!');
	}

	const chat = context.chat as unknown as AIChat<UI_MESSAGE>;

	return useAIChat<UI_MESSAGE>({ chat });
}
