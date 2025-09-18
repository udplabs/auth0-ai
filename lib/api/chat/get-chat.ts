import {
	getChatById,
	listChatsByUserId,
} from '@/lib/db/queries/chat/query-chats';
import { getCacheKey } from '@/lib/utils/get-cache-key';
import { unstable_cache } from 'next/cache';

/**
 * CACHING OVERVIEW
 *
 * This module provides thin server helpers that:
 *  1. Derive a stable cache key (chatKey) embedding user + resource metadata.
 *  2. Wrap underlying DB query functions in `unstable_cache` (Next.js App Router data cache).
 *  3. Attach tag(s) so other routes / mutations can call `revalidateTag(tag)` to invalidate.
 *
 * Key Concepts (Next.js `unstable_cache`):
 *  - Signature: unstable_cache(fn, keyParts, options?)
 *      * keyParts: array of serializable values forming a unique identity.
 *      * options.tags: string[] enabling tag‑based revalidation.
 *      * options.revalidate: seconds until background revalidation allowed (Incremental re-gen).
 *  - Returned function caches the resolved value per keyParts until:
 *      * Tag is revalidated (revalidateTag).
 *      * Revalidate TTL elapsed (stale-while-revalidate semantics).
 *  - Data survives a single server process life (not a durable external cache unless configured).
 *
 * This file:
 *  - Ensures chat / chat history results are not recomputed every request.
 *  - Provides fine‑grained tag naming: user‑scoped + generic resource tags.
 *
 * IMPORTANT:
 *  - Mutations (creating messages, deleting chats, etc.) MUST call `revalidateTag`
 *    with tags used below (e.g. 'chat', 'chat:messages', `${userId}:chat:history`).
 *  - If you add a new variant (grouped vs ungrouped), ensure tags include a variant marker
 *    (we add 'chat:history:grouped').
 */

/* ---------- Types ---------- */

export interface GetChatOptions extends ActionOptions {
	/** The chat id (path param). */
	id: string;
	/** Include persisted messages in the response. */
	includeMessages?: boolean;
}

export interface GetChatHistoryOptions extends ActionOptions {
	/** Return grouped (today, yesterday, etc.) structure instead of flat list. */
	grouped?: boolean;
	page?: number | string;
	pageSize?: number | string;
}

/* ---------- Chat (single) ---------- */

/**
 * getChat
 *
 * Fetch (and cache) a single chat. Optionally includes messages.
 *
 * Caching Strategy:
 * - keyParts (2nd arg to unstable_cache) = `tags` array (acts as both the identity & tag list here).
 * - Base tags: [derivedKey, 'chat']
 * - Extra tag if messages requested: 'chat:messages'
 * - TTL (revalidate) = 150s (background refresh allowed after that window).
 *
 * Tag Invalidation Examples:
 * - After adding a new message: revalidateTag('chat:messages') or revalidateTag(chatKey(...)).
 * - After renaming a chat: revalidateTag('chat').
 */
export async function getChat({
	id,
	userId,
	includeMessages = false,
	key,
	tags,
}: GetChatOptions) {
	// Derive default cache key if caller omitted.
	if (!key) {
		key = chatKey({ userId, id });
	}

	// Seed default tag list if none provided.
	if (!tags || tags.length === 0) {
		tags = [key, 'chat'];
	}
	// Add variant tag when messages included (allows targeted invalidation).
	if (includeMessages) {
		tags.push('chat:messages');
	}

	// Ensure uniqueness (avoid duplicate tags).
	tags = [...new Set(tags)];

	const cached = unstable_cache(
		() => getChatById(id, { userId, includeMessages }),
		[key],
		{ revalidate: 150, tags } // revalidation config
	);

	return cached();
}

/* ---------- Chat History (list) ---------- */

/**
 * getChatHistory
 *
 * Fetch (and cache) paginated or grouped chat history for a user.
 *
 * Caching Strategy:
 * - keyParts derived from combination of userId + pagination + grouping flags (via chatKey()).
 * - Tags include:
 *    * main derived key
 *    * 'chat:history'
 *    * user‑scoped history tag `${userId}:chat:history`
 *    * optional grouping tag 'chat:history:grouped'
 */
export async function getChatHistory({
	userId,
	grouped = false,
	page = 1,
	pageSize = 999,
	key,
	tags,
}: GetChatHistoryOptions) {
	// Normalize numeric inputs if passed as strings.
	if (typeof page === 'string') page = Number.parseInt(page);
	if (typeof pageSize === 'string') pageSize = Number.parseInt(pageSize);

	// Derive key if absent (includes paging + grouping metadata).
	if (!key) {
		key = chatKey({ userId, grouped, page, pageSize });
	}

	// Seed tags if caller omitted (user‑scoped tag enables selective invalidation).
	if (!tags || tags.length === 0) {
		tags = [key, 'chat:history', `${userId}:chat:history`];
	}
	if (grouped) tags.push('chat:history:grouped');

	// Ensure uniqueness (avoid duplicate tags).
	tags = [...new Set(tags)];

	const cached = unstable_cache(
		() => listChatsByUserId(userId, { page, pageSize, grouped }),
		tags,
		{ revalidate: 300, tags }
	);

	return cached();
}

/* ---------- Cache Key Builder ---------- */

interface ChatKeyOptions
	extends GetCacheKeyOptions,
		Omit<GetChatHistoryOptions, 'key' | 'userId' | 'tags' | 'cached'> {
	includeMessages?: boolean;
}

/**
 * chatKey
 *
 * Produces a stable string used both as:
 *  - A unique cache identity component.
 *  - A base tag for revalidation.
 *
 * Composition:
 *  resource[]: starts with ['chat']; appends 'history' if no specific id (list mode).
 *  metadata[]: flags & paging markers (messages, grouped, page, pageSize).
 *
 * Example:
 *  chatKey({ userId:'u1', id:'c123', includeMessages:true })
 *    → u1:chat:c123:messages
 *
 *  chatKey({ userId:'u1', grouped:true, page:2, pageSize:50 })
 *    → u1:chat:history:grouped:page:2:pageSize:50
 */
export function chatKey({
	userId,
	id,
	resource = ['chat'],
	page,
	pageSize,
	grouped,
	includeMessages,
}: ChatKeyOptions) {
	if (!id) resource.push('history');

	const metadata = [];
	if (includeMessages) metadata.push('messages');
	if (grouped) metadata.push('grouped');
	if (page) metadata.push(`page:${page}`);
	if (pageSize) metadata.push(`pageSize:${pageSize}`);

	return getCacheKey({ userId, id, resource, metadata });
}
