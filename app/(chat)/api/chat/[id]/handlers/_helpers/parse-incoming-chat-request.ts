import { saveChatAction } from '@/app/(chat)/api/actions';
import { getUser } from '@/lib/auth0';
import { APIError } from '@/lib/errors';
import { z } from 'zod';
import { PostRequestBodySchema } from './schemas';

import type { Chat } from '@/types/chat';

type PostRequestBody = z.infer<typeof PostRequestBodySchema>;

/**
 * parseIncomingChatRequest
 *
 * Purpose:
 *  - Normalize and validate an incoming chat POST request.
 *  - Accept either a single `message` OR a full `messages` array (mutually exclusive).
 *  - Attach contextual metadata (userId, chatId) to each message.
 *  - Persist (upsert) the chat + initial messages.
 *  - Auto‑generate a chat title from the last user message.
 *
 * Flow:
 *  1. Read raw JSON body.
 *  2. Zod-validate against PostRequestBodySchema.
 *  3. Resolve user (non‑throwing: getUser(false)) so anonymous sessions are allowed.
 *  4. Derive final chatId from route param or body.
 *  5. Enforce mutual exclusivity: cannot send both `message` and `messages`.
 *  6. If only `message` provided, wrap it into the `_messages` array.
 *  7. Decorate each message with metadata (userId, chatId).
 *  8. Persist via saveChat (UPSERT which also stores messages).
 *  9. Return DB chat object (including stored messages).
 *
 * Error Cases:
 *  - Validation errors (Zod) are thrown upstream (caller should catch ZodError).
 *  - Providing both `message` AND `messages` → APIError('bad_request:chat').
 *
 * Assumptions:
 *  - `TypedNextRequest<PostRequestBody>` provides type-safe .json().
 *  - `saveChat` handles create or update semantics (idempotent upsert).
 *
 * Security / Privacy:
 *  - User resolution is optional; unauthenticated users still get a chat (userId undefined).
 *  - Any downstream logic relying on user ownership must check userId later.
 *
 * Potential Improvements:
 *  - Rate limiting per IP / user to prevent chat spam.
 *  - Enforce a max message length or message count.
 *  - Attach a createdAt timestamp if missing (depending on Chat.UIMessage shape).
 *  - Support incremental append: fetch existing chat and merge server‑side (currently assumes provided messages are authoritative for this request).
 */
export async function parseIncomingChatRequest(
	request: TypedNextRequest<PostRequestBody>,
	{ id: _id }: ApiPathParams
) {
	// Raw body (may throw if invalid JSON before Zod runs).
	const body = await request.json();

	// Destructure with defaults; Zod ensures shape.
	const {
		id = _id, // Body can override route param; fallback to route.
		message, // Optional single message mode.
		messages: _messages = [], // Full batch mode. Unlikely to ever happen but defensive coding.
	} = PostRequestBodySchema.parse(body) as PostRequestBody;

	// Best-effort user fetch (false => do not throw if unauthenticated).
	const user = await getUser(false);
	const userId = user?.sub;

	// TODO: Implement message limits to prevent anonymous users spamming/consuming tokens.

	// chatId normalization: Next.js dynamic route may give string|string[]. Who know why ¯\_(ツ)_/¯
	const chatId = id && Array.isArray(id) ? id[0] : id;

	// Guard: cannot send both single message and array simultaneously.
	if (message && _messages.length > 0) {
		throw new APIError(
			'bad_request:chat',
			'Either message or messages must be provided. Not both.'
		);
	}

	// If only single message provided, push it into the working array.
	if (message && _messages.length === 0) {
		_messages.push(message);
	}

	// Decorate each incoming UI message with metadata for persistence / later retrieval.
	const incomingMessages = _messages.map((m) => ({
		...m,
		metadata: { ...m?.metadata, userId, chatId },
	})) as Chat.UIMessage[];

	// Persist (upsert) chat + messages + auto title derived from last message.
	// This saves from having to pass entire conversations back/forth. Reduces chattiness.
	return await saveChatAction({
		id: chatId,
		userId,
		messages: incomingMessages,
	});
}
