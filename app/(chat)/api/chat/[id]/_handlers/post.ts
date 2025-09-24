// app/(chat)/api/chat/[id]/_handlers/post.ts
/**
 * POST /api/chat/[id]
 *
 * Streams an assistant response (and any tool calls) back to the client as Server‑Sent Events.
 *
 * Pipeline (high level):
 * 1. Parse + validate incoming UI messages (schema + tools).
 * 2. Build model message array (system prompts + prior conversation).
 * 3. Configure streaming LLM call (OpenAI gpt‑5‑nano) with tool registry.
 * 4. Apply a stop condition (own UI tool result or step count limit).
 * 5. Transform stream to:
 *    - Emit ephemeral UI events for large tool payloads (accounts/transactions) without polluting history.
 *    - Smooth token flow.
 * 6. Persist sanitized final messages on finish (removing heavy data arrays).
 *
 * Key Design Choices:
 * - Uses createUIMessageStream from `ai` to unify tool + assistant streaming.
 * - `uiEphemeralTransform` strips heavy tool output (e.g. raw lists) and re‑emits as transient UI-only events.
 * - Stops early if a tool returns `hasOwnUI` (front end handles UX) OR after 5 steps (guardrails).
 * - Saves only necessary metadata; large transaction datasets removed to keep DB lean (and preserve token usage).
 *
 * Notes / Potential Improvements:
 * - Add token/window trimming for long chats.
 * - Add per-user rate limiting / auth enforcement if endpoint opened beyond trusted UI.
 * - Consider unique threadID per run if resumable streams reintroduced.
 * - Consider reintroducing resumable streams.
 */
import { saveMessagesAction } from '@/app/(chat)/api/actions';
import { model } from '@/lib/ai/model';
import { toolRegistry } from '@/lib/ai/tool-registry';
import { transferFunds } from '@/lib/ai/tools/transfer-funds';
import { PostRequestBodySchema } from '@/lib/api/schemas/chat';
import { APIError } from '@/lib/errors';
import { ulid } from '@/lib/utils';
import type { Chat } from '@/types/chat';
import { setAIContext } from '@auth0/ai-vercel';
import { StreamableHTTPClientTransport } from '@modelcontextprotocol/sdk/client/streamableHttp.js';
import { geolocation } from '@vercel/functions';
import {
	experimental_createMCPClient as createMCPClient,
	createUIMessageStream,
	JsonToSseTransformStream,
	smoothStream,
	stepCountIs,
	streamText,
	type StreamTextTransform,
	type TextStreamPart,
	type ToolSet,
	type UIMessageStreamWriter,
} from 'ai';
import { ZodError, infer as zodInfer } from 'zod';

type PostRequestBody = zodInfer<typeof PostRequestBodySchema>;

export async function POST(
	request: TypedNextRequest<PostRequestBody>,
	{ params }: { params: Promise<ApiPathParams> }
) {
	try {
		// 1. Get the raw body (may throw if invalid JSON before Zod runs).
		const body = await request.json();

		// 2) Destructure/parse with defaults; Zod ensures shape.
		const {
			id = (await params)?.id, // Body can override route param; fallback to route.
			// We force a single message because we are using a caching middleware
			message: incomingMessage,
		} = PostRequestBodySchema.parse(body) as PostRequestBody;

		// 3) Normalize chatId: Next.js dynamic route may give string|string[]. Who know why ¯\_(ツ)_/¯
		const chatId = id && Array.isArray(id) ? id[0] : id;

		// Thread context (telemetry / grouping).
		setAIContext({ threadID: chatId });

		// 4) Build tool registry
		//    - Add transferFunds tool
		let tools = {
			...toolRegistry,
			// transferFunds: transferFunds(), /* ⚠️ TASK 9 */
		};

		// - Add Auth0 Guide
		try {
			// Connect to Auth0 Guide (docs MCP)
			// Sometimes it errs out, thus the try/catch
			const auth0MCP = await createMCPClient({
				transport: new StreamableHTTPClientTransport(
					new URL('https://auth0.com/ai/docs/mcp')
				),
			});

			tools = {
				...tools,
				...auth0MCP.tools,
			};
		} catch (error: unknown) {
			console.info('unable to connection to Auth0 Guide');
			console.info(error);
		}

		// 5. Create unified UI stream orchestrator.
		const stream = createUIMessageStream<Chat.UIMessage>({
			// Wrap execution with static content (lab-specific augmentation).
			execute: async ({ writer: dataStream }) => {
				// 6) Inject writer into transferFunds tool so it can emit progress.
				tools = {
					...tools,
					transferFunds,
					// transferFunds: transferFunds(dataStream), /* ⚠️ TASK 9 */
				};

				// 7) Setup provider options for middleware(s).
				//    - cacheMiddleware will inject model messages and userId into downstream middlewares
				const providerOptions = {
					cacheMiddleware: {
						chatId,
						tools: tools as ToolSet,
						incomingMessage,
					},
					contentMiddleware: {
						incomingMessage,
						writer: dataStream,
					},
					interruptsMiddleware: {
						writer: dataStream,
						interrupt: incomingMessage?.metadata?.interrupt,
						tools: tools as ToolSet,
					},
					systemPromptMiddleware: {
						chatId,
						incomingMessage,
						requestHints: {
							geolocation: geolocation(request),
						},
					},
				} as Chat.CustomProviderOptions;

				const result = streamText({
					model,
					// CacheMiddleware will replace `prompt with the cached messages
					// PromptMiddleware will prepend `prompt` with the appropriate system prompt(s) with the help of Agent StepGuru
					prompt: 'null',
					providerOptions,
					// OpenAI GPT 5 models no longer support temperature
					// Farewell determinism 😢
					// temperature: 0.2, // deterministic mode
					stopWhen: (ctx) => {
						// Custom stop logic: either tool produced hasOwnUI OR step count exceeded.
						const { steps } = ctx;

						const lastMessage = steps.at(-1);

						if (lastMessage) {
							const results =
								lastMessage.toolResults ?? lastMessage.dynamicToolResults ?? [];
							const lastResult = results.at(-1);

							if (
								lastResult?.type === 'tool-result' &&
								lastResult?.toolName === 'transferFunds' &&
								lastResult?.output === undefined
							) {
								// Return early so UI can handle push enroll
								return true;
							}

							// Return if `hasOwnUI`
							if ((lastResult?.output as any)?.hasOwnUI) {
								return true;
							}
						}
						return stepCountIs(5)(ctx); // Hard cap to prevent runaway loops.
					},
					experimental_transform: [
						uiEphemeralTransform(dataStream), // Strip large tool payloads -> ephemeral events.
						smoothStream(), // Token smoothing for cleaner UX.
					],
					tools,
				});

				// Vercel Recommended implementation
				result.consumeStream();

				// Merge AI stream -> UI message stream writer.
				dataStream.merge(
					result.toUIMessageStream({
						sendReasoning: false, // Hide internal reasoning tokens. They don't work for OpeanAI anyway.
					})
				);
				// }

				// ============
			},
			generateId: ulid, // Deterministic-friendly sortable IDs.
			onFinish: async ({ messages }) => {
				if (messages.length > 0) {
					let userId: string | undefined = undefined;
					// 6. Sanitize heavy tool outputs before persistence.
					const sanitized = messages.map((m) => {
						if (!m.parts.length) return null;
						// Set once
						if (!userId) userId = m?.metadata?.userId;

						return {
							...m,
							metadata: { ...m?.metadata, chatId: chatId, userId },
							parts: m.parts.map((p) => {
								// Drop large 'data' arrays from getTransactions results.
								if (p.type === 'tool-getTransactions' && p.output?.data) {
									// eslint-disable-next-line @typescript-eslint/no-unused-vars
									const { data: _, ...output } = p.output || {};
									return { ...p, output };
								}
								return p;
							}),
						} as Chat.UIMessage;
					});

					// Messages can sometimes end up without parts.
					// It's an odd thing... need to investigate further.
					// This is a lazy hack.
					const cleaned = sanitized.filter((s) => s !== null);

					if (cleaned.length > 0) {
						await saveMessagesAction(cleaned, { chatId, userId });
					}
				}
			},
			onError: (error) => {
				// Return concise error text downstream (SSE consumer can render).
				if (error instanceof Error) return error.message;
				if (typeof error === 'string') return error;
				return String(error);
			},
		});

		// 7. Respond with SSE (UI consumption).
		return new Response(stream.pipeThrough(new JsonToSseTransformStream()));
	} catch (error) {
		console.info('=== POST error ===');
		console.error(error);
		if (error instanceof ZodError) {
			return new APIError(
				'bad_request:api',
				error.message,
				error.format()
			).toResponse();
		}
		if (error instanceof APIError) return error.toResponse();
		return new APIError(error).toResponse();
	}
}

/**
 * uiEphemeralTransform
 *
 * Purpose:
 * - For specific heavy tools (getAccounts, getTransactions) emit their data
 *   as ephemeral UI-only events (transient) so:
 *   a) LLM context is not polluted with large arrays.
 *   b) DB history stays small.
 *
 * Mechanism:
 * - Intercepts 'tool-result' parts AFTER the model has ingested them.
 * - Extracts `output.data`, writes ephemeral event via dataStream.write().
 * - Forwards original tool result chunk with `data` removed.
 *
 * This results in the model losing the full conversational context BUT
 * it is the only way to save from running into token constraints as account/transaction
 * data can be lengthy.
 *
 * Model will need to call the tool again if it needs the data. Sacrifice
 * a little to get a lot.
 *
 * Extensible:
 * - Add more tool names to the allowlist as needed.
 */
function uiEphemeralTransform(
	dataStream: UIMessageStreamWriter<Chat.UIMessage>
): StreamTextTransform<typeof toolRegistry> {
	return () =>
		new TransformStream<
			TextStreamPart<typeof toolRegistry>,
			TextStreamPart<typeof toolRegistry>
		>({
			transform(chunk, controller) {
				if (
					chunk?.type === 'tool-result' &&
					['getAccounts', 'getTransactions'].includes(chunk.toolName)
				) {
					const { data, ...output } = chunk.output as Chat.ToolsResponse;

					// Emit ephemeral UI event (not persisted, not fed back to model).
					dataStream.write({
						type: 'data-accounts',
						data,
						transient: true,
						id: chunk.toolCallId,
					});

					// Forward sanitized tool result.
					controller.enqueue({ ...chunk, output } as any);
				} else {
					controller.enqueue(chunk);
				}
			},
		});
}
