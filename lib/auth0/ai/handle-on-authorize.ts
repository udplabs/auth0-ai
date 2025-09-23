// lib/auth0/ai/handle-on-authorize.ts
import { ulid } from '@/lib/utils';
import { withStreamingJitter } from '@/lib/utils/with-streaming-jitter';
import type { TokenSet } from '@auth0/ai';
import type { CIBAAuthorizationRequest } from '@auth0/ai/CIBA';
import type { UIMessageStreamWriter } from 'ai';
/**
 * @name handleOnAuthorize
 * @author Danny Fuhriman
 *
 * Factory that returns an async authorization request handler used during a CIBA (decoupled) flow.
 *
 * When a protected tool (e.g. transferFunds) requires user confirmation, Auth0 AI
 * triggers `onAuthorizationRequest`. This handler:
 *
 * 1. (Optional) Streams a user‑facing notification message to the client UI using a custom jittered writer:
 *    - Begins a new streamed assistant message (text-start)
 *    - Emits a decorative separator, then a human‑readable instruction telling the user
 *      to approve the push notification on their device.
 *    - Streams the message tokenized (word + trailing space) to preserve original spacing
 *      while giving the UI incremental updates.
 *    - Emits a closing separator and finalizes the message (text-end).
 *    - Flushes the jitter buffer to guarantee all deltas are delivered before awaiting approval.
 *
 * 2. Awaits the provided `credentials` promise (which resolves when the user approves the
 *    push notification and a TokenSet is available, or resolves undefined / rejects on denial).
 *
 * It does NOT:
 * - Emit any tool-call / tool-result events (those are handled elsewhere after authorization).
 * - Retry or handle denial logic (that is deferred to `onUnauthorized` / interrupt handlers).
 *
 * TODOs:
 * 	- Investigate if we can incorporate a readable stream (of Vercel's simulateStream) into jitterStream.
 *  - Incorporate this into @auth0/ai-vercel package.
 *
 * @param writer Optional UIMessageStreamWriter. If provided, a streaming status message is sent;
 *               if omitted, the function simply waits for credential resolution silently.
 * @returns An async function (Auth0 CIBA authorization request handler) that the Auth0 AI
 *          wrapper will invoke with the authorization request object and a credentials promise.
 */
export function handleOnAuthorize(writer?: UIMessageStreamWriter) {
	return async (
		_: CIBAAuthorizationRequest,
		credentials: Promise<TokenSet | undefined>
	) => {
		if (writer) {
			const jitterStream = withStreamingJitter(writer, {
				baseMs: 50,
				pauseMs: [50, 100],
				spikeMs: [25, 75],
			});

			// 1) Generate a unique identifier for the message.
			//    - This is how the UI distinguishes between different messages and their responses.
			//    - Each text delta uses the same ID so the UI can put them all back together.
			const id = ulid();

			// 2) Start streaming the message
			jitterStream.write({
				type: 'text-start',
				id,
			});

			// 3) Emit a decorative separator (optional, for readability in the chat transcript)
			jitterStream.write({
				type: 'text-delta',
				delta: '\n\n----------\n\n',
				id,
			});

			// 4) Chunk the message and stream the chunks
			const message =
				'A push notification has been sent to your device. In order to complete the transfer, please approve the request on your device.';

			// Tokenize preserving spaces so spacing is accurate when reassembled
			const tokens = message.match(/\S+\s*/g) || [];
			for (const delta of tokens) {
				jitterStream.write({
					type: 'text-delta',
					delta,
					id,
				});
			}

			// 5) Emit a closing separator
			jitterStream.write({
				type: 'text-delta',
				delta: '\n\n----------\n\n',
				id,
			});

			// 6) Finalize the message
			jitterStream.write({ type: 'text-end', id });

			// 7) Ensure all buffered jittered chunks are flushed before awaiting user action
			await jitterStream.flush();
		}

		// 8) Wait until the user approves (or denies) the push authorization request.
		await credentials;
	};
}
