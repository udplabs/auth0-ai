import type { NextRequest } from 'next/server';
declare global {
	interface ApiPathParams {
		id: string;
	}
	interface ApiQueryParams {
		/**
		 * If true, indicates that the cached response can be returned if available.
		 * Else, invalidate the cache and return a fresh response.
		 * @default true
		 */
		cached?: boolean;
		page?: string;
		page_size?: string;
	}

	interface TypedNextRequest<T> extends NextRequest {
		json: () => Promise<T>;
	}

	interface ActionOptions {
		userId: string;
		/**
		 * A unique key to identify the cached response.
		 *
		 * Recommended format: `${userId}:${resource}:${id}`.
		 *
		 * @example `auth0|123:chats:01K1RK4RFMRB12V4KPH8GJYD8K`
		 */
		key?: string;
		/**
		 * Tags to associate with the cached response. When any of these tags are invalidated, the cached response will be invalidated as well.
		 * @default [key]
		 */
		tags?: string[];
		/**
		 * If true, indicates that the cached response can be returned if available.
		 * Else, invalidate the cache and return a fresh response.
		 * @default true
		 */
		cached?: boolean;
	}

	interface GetCacheKeyOptions {
		userId?: string;
		/**
		 * The resource identifier.
		 */
		id?: string;
		/**
		 * The resource being cached.
		 * @default `[user]`
		 */
		resource?: string[];
		/**
		 * Metadata will be appended in order.
		 *
		 * If providing complex values use the appropriate `joinSymbol` (unless you desire different results)
		 *
		 * @example `['page:1', 'pageSize:10']
		 */
		metadata?: string[];
		/**
		 * The symbol to use for joining the key values.
		 *
		 * @default `:`
		 */
		joinSymbol?: string;
	}
}
