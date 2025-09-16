// lib/ai/tools/search-transactions.ts
import { getUser } from '@/lib/auth0/client';
import { tool } from 'ai';
import { z } from 'zod';
import { DocumentWithScoreSchema, ToolResponseSchema } from '../schemas';

// ---------------------------------------------------------------------
// ✅ STEP 1: Import FGA & LocalVectorStore utilities.
// ---------------------------------------------------------------------
import { LocalVectorStore } from '@/lib/ai/rag/vector-store';
import { FGAFilter } from '@auth0/ai';

import type { Documents } from '@/types';

/**
 * Lab Exercise: Implement FGA for RAG tool `searchTransactions`
 *
 * What you will build
 * - A semantic (vector) search tool over transaction data that ALSO applies per‑account
 *   fine‑grained authorization (FGA) before returning results to the model / UI.
 *
 * Why
 * - Vector search alone can leak data across accounts if embeddings are stored together.
 * - We must filter every retrieved document against what the caller is allowed to view.
 *
 * High‑Level Flow (baseline implementation shown below)
 * 1) Authenticate: Resolve the current user (Auth0 session).
 * 2) Initialize vector store (lazy) if empty (demo/local dev convenience).
 * 3) Perform semantic search (returns scored documents with metadata.accountId).
 * 4) Build per‑document authorization queries (one per result) using FGAFilter.
 * 5) Batch‑check with FGA (the helper internally batches).
 * 6) Keep only authorized docs.
 * 7) Validate final shape with Zod (good practice and makes Typescript happier).
 * 8) Return ToolResponse wrapper (status + data + counts).
 *
 * Where You Could Add Lab Tasks
 * - Replace the direct FGAFilter usage with TODOs (see commented “LAB TODO” markers).
 * - Ask students to swap relation can_view_transactions → can_view_balances and observe differences.
 * - Add a failure branch: if 0 authorized, return status: 'empty'.
 *
 * Security Notes
 * - DO NOT short‑circuit and return unfiltered results if FGA fails (unless in explicit “graceful degrade” mode).
 * - Metadata MUST contain the accountId (enforced earlier in your ingestion pipeline).
 *
 * Performance Notes
 * - FGAFilter batches calls; no need to manually chunk here.
 * - If result set is large, consider pre‑cut (e.g., top‑K) before filtering.
 *
 * Future Enhancements (not implemented; good stretch tasks)
 * - Caching: Memoize per (user, accountId, relation) during a single request.
 * - Sliding window summarization if results exceed token budget.
 * - Way better chunking/embedding strategy! This is very simple.
 * - Return reasoning (why a doc matched) separate from raw text.
 */

const outputSchema = ToolResponseSchema(z.array(DocumentWithScoreSchema));

export const searchTransactions = tool<
	{ query: string },
	z.infer<typeof outputSchema>
>({
	description:
		'This tool is used for semantic search (Retrieval-Augmented Generation) of transaction data for the authenticated customer from a local vector store. Unlike `getTransactions`, which returns all data belonging to a user, this tool utilizes fine-grained authorization capabilities to ensure that only the authorized account and transaction data is made available for RAG purposes and only includes semantic search data (i.e. descriptions, memos, etc.)',
	name: 'searchTransactions',
	inputSchema: z.object({
		query: z.string().describe('The query to search for transactions.'),
	}),
	outputSchema,
	execute: async ({ query }) => {
		console.log('[searchTransactions] called with query:', query);
		try {
			// ---------------------------------------------------------------------
			// ✅ STEP 2: Auth – resolve current user (server-only).
			// If unauthenticated, getUser() should throw (caught below).
			// Check out the helper function for more details.
			// ---------------------------------------------------------------------
			const user = await getUser();

			// ---------------------------------------------------------------------
			// ❌ STEP 3: Instantiate the FGA filter.
			// buildQuery: Given a retrieved document, produce a single auth check:
			//   user: principal performing the search
			//   object: the account resource tied to the transaction
			//   relation: the permission we need to view transaction records
			//
			// If you want to experiment, change 'can_view_transactions' to:
			//   - 'can_view_balances' (likely fewer docs)
			//   - a non-existent relation (should yield zero docs)
			// ---------------------------------------------------------------------
			const fgaRetriever = FGAFilter.create<Documents.DocumentWithScore>({
				buildQuery: (doc) => {
					// OPTIONAL Defensive coding: ensure metadata has expected shape.
					// If missing, return a relation that will certainly fail.
					const accountId = doc?.metadata?.accountId;

					if (!accountId) {
						return {
							user: `user:${user.sub}`,
							object: `account:__missing__`,
							relation: 'can_view_transactions',
						};
					}

					return {
						// 👈 Return a valid response
						user: ``,
						object: ``,
						relation: '',
					};
				},
			});

			// ---------------------------------------------------------------------
			// ✅ STEP 4: Vector store retrieval.
			// LocalVectorStore.init(true) forces a rebuild (dev convenience).
			// Production: don't use a LOCAL vector store! 🤣
			// ---------------------------------------------------------------------
			if (
				LocalVectorStore.initialized === false ||
				LocalVectorStore.count === 0
			) {
				console.log(
					'[searchTransactions] Vector store not initialized – initializing...'
				);
				await LocalVectorStore.init(true);
			}

			// Semantic search (K value configured inside store; adjust there).
			const rawResults = await LocalVectorStore.search(query);
			console.log(
				'[searchTransactions] Raw semantic results:',
				rawResults.length
			);
			// ---------------------------------------------------------------------
			// ❌ STEP 5: Apply authorization filter (core FGA step).
			// Internally may batch; returns only documents passing the relation check.
			// ---------------------------------------------------------------------
			// const authorizedResults: Documents.DocumentWithScore[] = await fgaRetriever(...) // 👈 Apply FGA filter to raw results
			const authorizedResults: Documents.DocumentWithScore[] = []; // ❌ Remove this placeholder line
			console.log(
				'[searchTransactions] Authorized results:',
				authorizedResults.length
			);

			// ---------------------------------------------------------------------
			// ✅ STEP 6: Validate final shape (technically optional but recommended).
			// If any doc is malformed, this throws and is caught below → safe error.
			// ---------------------------------------------------------------------
			const parsed = DocumentWithScoreSchema.array().parse(authorizedResults);

			// ---------------------------------------------------------------------
			// ✅ STEP 7: Return ToolResponse wrapper.
			// hasOwnUI could be set true if you want to suppress model text and
			// render a custom component. Left false so model can summarize if asked.
			// ---------------------------------------------------------------------
			return {
				data: parsed,
				status: 'success',
				message: `Found ${authorizedResults.length} transactions for user.`,
				dataCount: authorizedResults.length,
			};
		} catch (error: unknown) {
			// Normalize to your APIError -> JSON shape, but keep the ToolResponse contract
			const { APIError } = await import('@/lib/errors');

			// DO NOT THROW. Always return a valid ToolResponse.
			// Throwing will cause the entire LLM request to fail.
			// Instead, return a safe error response with no data.
			// The model can decide how to proceed from there.
			return {
				message: 'Failed to query transactions.',
				...new APIError(error).toJSON(),
				status: 'error',
				dataCount: 0,
			};
		}
	},
});
