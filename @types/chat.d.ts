import { toolRegistry } from '@/lib/ai/tool-registry';
import type { Chat as ChatModel, Prisma } from '@/lib/db/generated/prisma';

import type {
	UIMessage as AIMessage,
	InferUITool,
	ToolUIPart,
	UIDataTypes,
} from 'ai';

declare global {
	namespace Chat {
		interface UIChat extends ChatModel {
			title?: string;
			userId?: string;
			createdAt: string;
			updatedAt: string;
			messages?: Chat.UIMessage[];
		}

		type DataPart = { type: 'append-message'; message: string };
		type ToolPart = ToolUIPart<Chat.Tools.AvailableTools>;

		// If you update this, update ./app/(chat)/api/chat/schema.ts
		interface MessageMetadata {
			createdAt?: string;
			updatedAt?: string;
			isUpVoted?: boolean;
			isDownVoted?: boolean;
			chatId: string;
			userId?: string;
			labStep?: string;
			isFirstMessage?: string;
		}

		type UIMessage = AIMessage<
			Chat.MessageMetadata,
			CustomUIDataTypes,
			InferUITools<typeof toolRegistry>
		>;

		interface CustomUIDataTypes extends UIDataTypes {
			appendMessage: string;
			connectionPicker: ExternalConnection[];
			redirect: string;
			notification: string;
			accounts: Accounts.Account[];
			titleText: string;
			titleTextStart: '...';
			titleTextEnd: '';
		}
		interface RequestHints {
			userId?: string;
			geolocation: UIGeolocation;
			settings?: Partial<UISettings>;
		}
		interface ListChatsByUserIdResult extends PaginatedResults {
			chats: Chat.UIChat[];
		}
		interface CreateChatInput extends Prisma.ChatCreateInput {
			createdAt?: string;
			updatedAt?: string;
			messages?: Chat.UIMessage[];
		}

		type ChatWithoutMessages = Prisma.ChatGetPayload<{
			include: { messages: false };
		}>;
		type ChatWithMessages = Prisma.ChatGetPayload<{
			include: { messages: true };
		}>;
		interface GroupedItems<T> {
			today: T[];
			yesterday: T[];
			lastWeek: T[];
			lastMonth: T[];
			older: T[];
		}
	}
}
