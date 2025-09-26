import { toolRegistry } from '@/lib/ai/tool-registry';
import type {
	ChatCreateInput,
	ChatModel,
} from '@/lib/db/generated/prisma/models';

import type { SharedV2ProviderOptions } from '@ai-sdk/provider';
import type {
	UIMessage as AIMessage,
	InferUITools,
	ModelMessage,
	ToolSet,
	ToolUIPart,
	UIDataTypes,
	UIMessagePart,
	UIMessageStreamWriter,
	UITools,
} from 'ai';

import type { Errors } from '@/lib/errors';
import type { Accounts, ExternalConnection } from './accounts';
import type { UISettings } from './settings';
import type { Transfers } from './transfers';

export namespace Chat {
	export interface UIChat extends Pick<ChatModel, 'id'> {
		title?: string;
		userId?: string;
		createdAt: string;
		updatedAt: string;
		messages?: UIMessage[];
	}

	export type ToolPart = ToolUIPart;
	export type MessagePart = UIMessagePart<Chat.CustomUIDataTypes, UITools>;

	// If you update this, update ./app/(chat)/api/chat/schema.ts
	export interface MessageMetadata {
		createdAt?: string;
		updatedAt?: string;
		isUpVoted?: boolean;
		isDownVoted?: boolean;
		chatId: string;
		userId?: string;
		labModule?: number;
		isFirstMessage?: string;
		isHidden?: boolean;
		interrupt?: Interrupt;
	}

	// Only one type of interrupt at the moment.
	// Expand later
	export interface Interrupt {
		/**
		 * Should match the name of the tool triggering the interrupt.
		 */
		type: 'transferFunds';
		data: Transfers.CreateTransferInput;
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

	export type StreamWriter = UIMessageStreamWriter<Chat.UIMessage>;
	export interface RequestHints {
		userId?: string;
		geolocation?: UIGeolocation;
		settings?: Partial<UISettings>;
		prompt?: string;
	}
	export interface CreateChatInput extends Pick<ChatCreateInput, 'id'> {
		userId?: string;
		createdAt?: string;
		updatedAt?: string;
		messages?: UIMessage[];
		title?: string;
	}

	export interface InterruptsMiddlewareOptions
		extends CustomProviderDefaultOptions {
		interrupt?: Chat.Interrupt;
		writer: StreamWriter;
		tools: ToolSet;
	}

	export interface CacheMiddlewareOptions extends CustomProviderDefaultOptions {
		incomingMessage: UIMessage;
		tools: ToolSet;
	}

	export interface SystemPromptMiddlewareOptions
		extends CustomProviderDefaultOptions {
		incomingMessage: UIMessage;
		modelMessages: ModelMessage[];
		requestHints?: RequestHints;
	}

	export interface ContentMiddlewareOptions
		extends CustomProviderDefaultOptions {
		writer: StreamWriter;
		incomingMessage: UIMessage;
		userSettings?: UISettings;
	}

	export interface CustomProviderDefaultOptions {
		chatId?: string;
		userId?: string;
	}

	export type CustomProviderOptions = SharedV2ProviderOptions & {
		interruptsMiddleware?: InterruptsMiddlewareOptions;
		cacheMiddleware?: CacheMiddlewareOptions;
		systemPromptMiddleware?: SystemPromptMiddlewareOptions;
		contentMiddleware?: ContentMiddlewareOptions;
	};

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
