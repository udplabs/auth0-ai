/**
 * Development Vector Store Admin Endpoints
 *
 * Route: /api/accounts/db
 *
 * WARNING (Security):
 * - These endpoints are meant ONLY for local dev / lab scenarios.
 * - Do NOT expose in production without authentication + role checks.
 *
 * Capabilities:
 *   GET    (no query)  -> Force (re)initialize / rebuild the in‑memory (or local) vector store.
 *   GET ?count=true    -> Return a lightweight summary / count instead of reinitializing.
 *   DELETE             -> Reset / clear the vector store (flush all vectors + metadata).
 *
 * Use Cases:
 * - Quickly reloading embeddings after code / content changes.
 * - Inspecting current document count.
 * - Clearing store to test cold‑start initialization logic.
 *
 * Conventions:
 * - 201 Created when (re)initialization performed.
 * - 204 No Content when store cleared.
 * - 200 OK with JSON summary for count queries.
 *
 * Potential Hardening (not implemented):
 * - Require an admin token header (e.g. X-Admin-Token).
 * - Rate limit (avoid accidental hammering).
 * - Expose a richer summary (dimensions, lastUpdated) behind a verbose flag.
 */

import { LocalVectorStore } from '@/lib/ai/rag/vector-store';
import { APIError } from '@/lib/errors';
import { getSearchParams } from '@/lib/utils/get-search-params';
import { type NextRequest, NextResponse } from 'next/server';

/**
 * GET /api/accounts/db
 *
 * Query Parameters:
 * - count (string): coerced into boolean by helper util, return summary instead of reinitializing.
 *
 * Responses:
 * - 200 { count: <summary> } when count=true
 * - 201 null after successful (re)init
 */
export async function GET(request: NextRequest) {
	try {
		const { count } = getSearchParams<{ count: boolean }>(request, ['count']);

		if (count) {
			// summary() returns whatever diagnostic the vector store exposes (currently a count).
			const summary = LocalVectorStore.summary();
			return NextResponse.json({ count: summary }, { status: 200 });
		}

		// Force (re)initialize; passing `true` signals a full rebuild (as per LocalVectorStore design).
		await LocalVectorStore.init(true);

		return Response.json(null, { status: 201 });
	} catch (error: unknown) {
		console.log('[vector-store][GET] error:', error);
		if (error instanceof APIError) return error.toResponse();
		return new APIError(error).toResponse();
	}
}

/**
 * DELETE /api/accounts/db
 *
 * Clears / flushes the vector store entirely.
 *
 * Response:
 * - 204 No Content on success
 */
export async function DELETE() {
	try {
		LocalVectorStore.reset();
		return new Response(null, { status: 204 });
	} catch (error: unknown) {
		console.log('[vector-store][DELETE] error:', error);
		if (error instanceof APIError) return error.toResponse();
		return new APIError(error).toResponse();
	}
}
