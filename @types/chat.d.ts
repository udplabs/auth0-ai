import type {
	Chat as DBChat,
	Prisma,
	Stream,
	Suggestion,
} from '@/lib/db/generated/prisma';

import type { UIMessage as AIMessage, ToolUIPart, UIDataTypes } from 'ai';

declare global {
	namespace Chat {
		interface UIChat extends DBChat {
			title?: string;
			createdAt: string;
			updatedAt: string;
			messages?: Chat.UIMessage[];
			streams?: Chat.UIStream[];
		}

		type DataPart = { type: 'append-message'; message: string };
		type ToolPart = ToolUIPart<Chat.Tools.AvailableTools>;

		interface MessageMetadata {
			createdAt?: string;
			updatedAt?: string;
			isUpVoted?: boolean;
			isDownVoted?: boolean;
			chatId: string;
			userId: string;
		}

		type UIMessage = AIMessage<
			Chat.MessageMetadata,
			CustomUIDataTypes,
			Chat.Tools.AvailableTools
		>;

		interface CustomUIDataTypes extends UIDataTypes {
			// codeDelta: string;
			appendMessage: string;
			connectionPicker: ExternalConnection[];
			redirect: string;
			// id: string;
			// title: string;
			// clear: null;
			// finish: null;
		}
		interface RequestHints {
			geolocation: UIGeolocation;
			hasAccountData?: boolean;
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
		interface UIStream extends Stream {
			createdAt?: string;
			updatedAt?: string;
		}
	}
}
