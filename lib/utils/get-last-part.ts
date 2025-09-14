import type { InferUITools, TextPart, UIMessage, UIMessagePart } from 'ai';
import { toolRegistry } from '../ai/tool-registry';

import type { Chat } from '@/types/chat';

/**
 * Returns the first/last matching part from the provided message.
 * - Handles messages without parts.
 *
 * @param {UI_MESSAGE} message - The message to extract the part from.
 * @param {Object} options - Options for extracting the part.
 * @param {'last'|'first'} [options.from='last'] - Whether to get the first or last matching part.
 * @param {string} [options.partType='text'] - The type of part to look for.
 * @returns {T | undefined} The matching part or undefined if not found.
 */
export function getLastPart<
	T extends UIMessagePart<
		Chat.CustomUIDataTypes,
		InferUITools<typeof toolRegistry>
	> = TextPart,
	UI_MESSAGE extends UIMessage = Chat.UIMessage,
>(
	message: UI_MESSAGE,
	options: {
		from?: 'last' | 'first';
		partType?: T['type'];
	} = {}
): T | undefined {
	const { from = 'last', partType = 'text' } = options;

	const { parts = [] } = message;

	if (!parts.length) return;

	// Walk backward to find the most recent message with a matching part
	for (let i = parts.length - 1; i >= 0; i--) {
		if (from === 'last') {
			return parts.findLast((p) => p.type === partType) as T | undefined;
		}

		return parts.find((p) => p.type === partType) as T | undefined;
	}
}
