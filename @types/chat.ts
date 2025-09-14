import { toolRegistry } from '@/lib/ai/tool-registry';
import type { Chat as ChatModel, Prisma } from '@/lib/db/generated/prisma';

import type {
	UIMessage as AIMessage,
	InferUITools,
	ToolUIPart,
	UIDataTypes,
} from 'ai';

import type { Errors } from '@/lib/errors';
import type { Accounts, ExternalConnection } from './accounts';
import type { UISettings } from './settings';

export namespace Chat {
	export interface UIChat extends Pick<ChatModel, 'id'> {
		title?: string;
		userId?: string;
		createdAt: string;
		updatedAt: string;
		messages?: UIMessage[];
	}

	// type DataPart = { type: 'append-message'; message: string };
	export type ToolPart = ToolUIPart;

	// If you update this, update ./app/(chat)/api/chat/schema.ts
	export interface MessageMetadata {
		createdAt?: string;
		updatedAt?: string;
		isUpVoted?: boolean;
		isDownVoted?: boolean;
		chatId: string;
		userId?: string;
		labStep?: string;
		isFirstMessage?: string;
	}

	export type UIMessage = AIMessage<
		MessageMetadata,
		CustomUIDataTypes,
		InferUITools<typeof toolRegistry>
	>;

	export interface CustomUIDataTypes extends UIDataTypes {
		appendMessage: string;
		connectionPicker: ExternalConnection[];
		redirect: string;
		notification: string;
		accounts: Accounts.Account[];
		titleText: string;
		titleTextStart: '...';
		titleTextEnd: '';
	}
	export interface RequestHints {
		userId?: string;
		geolocation: UIGeolocation;
		settings?: Partial<UISettings>;
	}
	export interface CreateChatInput extends Pick<Prisma.ChatCreateInput, 'id'> {
		userId?: string;
		createdAt?: string;
		updatedAt?: string;
		messages?: UIMessage[];
		title?: string;
	}

	export interface GroupedItems<T> {
		today: T[];
		yesterday: T[];
		lastWeek: T[];
		lastMonth: T[];
		older: T[];
	}

	export interface ToolsResponse<T = any> {
		dataCount: number;
		data?: T;
		status?:
			| 'success'
			| 'error'
			| 'not_found'
			| 'unauthorized'
			| 'input-required'
			| 'wrong-tool';
		message?: string;
		hasOwnUI?: boolean;
		error?: Errors.Response;
	}
}
