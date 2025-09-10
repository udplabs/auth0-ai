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
import { openai } from '@/lib/ai/openai';
import { getSystemPrompts } from '@/lib/ai/prompts/system-prompt';
import { toolRegistry } from '@/lib/ai/tool-registry';
import { APIError } from '@/lib/errors';
import { withStaticContent } from '@/lib/utils';
import { setAIContext } from '@auth0/ai-vercel';
import { geolocation } from '@vercel/functions';
import {
	InferUITools,
	JsonToSseTransformStream,
	UIMessage,
	convertToModelMessages,
	createUIMessageStream,
	smoothStream,
	stepCountIs,
	streamText,
	validateUIMessages,
	type StreamTextTransform,
	type TextStreamPart,
	type ToolSet,
	type UIMessageStreamWriter,
} from 'ai';
import { type NextRequest } from 'next/server';
import { ulid } from 'ulid';
import { ZodError } from 'zod';
import { saveMessagesAction } from '../../../actions';
import { UIMessageMetadataSchema, parseIncomingChatRequest } from './_helpers';

// Narrowed tool typing for validateUIMessages.
type AvailableTools = InferUITools<typeof toolRegistry>;
type UseChatToolsMessage = UIMessage<
	Chat.MessageMetadata,
	Chat.CustomUIDataTypes,
	AvailableTools
>;

export async function POST(
	request: NextRequest,
	{ params }: { params: Promise<ApiPathParams> }
) {
	try {
		// 1. Parse basic chat request (messages + chat meta).
		const {
			messages = [],
			userId,
			...chat
		} = await parseIncomingChatRequest(request, await params);

		console.log('=== MESSAGES (incoming) ===');
		console.log(messages);

		// 2. Validate UI messages (tool calls, metadata shape).
		const uiMessages = await validateUIMessages<UseChatToolsMessage>({
			messages,
			tools: toolRegistry,
			metadataSchema: UIMessageMetadataSchema,
		});

		// Thread context (telemetry / grouping).
		setAIContext({ threadID: chat.id });

		// 3. Convert UI messages -> model format.
		const modelMessages = convertToModelMessages(uiMessages);

		// 4. Load system prompts (dynamic hints).
		const systemPrompts = await getSystemPrompts({
			requestHints: {
				geolocation: geolocation(request),
				userId,
				settings: {
					currentLabStep: uiMessages.findLast(
						(m) => m.role === 'user' && m.metadata?.labStep !== undefined
					)?.metadata?.labStep,
				},
			},
		});

		// 5. Create unified UI stream orchestrator.
		const stream = createUIMessageStream<UseChatToolsMessage>({
			// Wrap execution with static content (lab-specific augmentation).
			execute: withStaticContent(
				({ writer: dataStream }) => {
					const result = streamText({
						model: openai('gpt-5-nano'),
						system: systemPrompts,
						messages: modelMessages,
						temperature: 0.2, // deterministic mode
						stopWhen: (ctx) => {
							// Custom stop logic: either tool produced hasOwnUI OR step count exceeded.
							const { steps } = ctx;
							const lastMessage = steps.at(-1);
							let hasOwnUI = false;

							if (lastMessage) {
								const results =
									lastMessage.toolResults ??
									lastMessage.dynamicToolResults ??
									[];
								const lastResult = results.at(-1);
								hasOwnUI = (lastResult?.output as any)?.hasOwnUI;
								if (hasOwnUI) {
									console.log('hasOwnUI: true → stopping stream early.');
								}
							}
							return hasOwnUI || stepCountIs(5)(ctx); // Hard cap to prevent runaway loops.
						},
						experimental_transform: [
							uiEphemeralTransform(dataStream), // Strip large tool payloads -> ephemeral events.
							smoothStream(), // Token smoothing for cleaner UX.
						],
						tools: toolRegistry,
					});

					// Vercel Recommended implementation
					result.consumeStream();

					// Merge AI stream -> UI message stream writer.
					dataStream.merge(
						result.toUIMessageStream({
							sendReasoning: false, // Hide internal reasoning tokens. They don't work for OpeanAI anyway.
						})
					);
					// ============
				},
				{ messages: uiMessages, userId }
			),
			generateId: ulid, // Deterministic-friendly sortable IDs.
			onFinish: async ({ messages }) => {
				if (messages.length > 0) {
					// 6. Sanitize heavy tool outputs before persistence.
					const sanitized = messages.map((m) => {
						return {
							...m,
							metadata: { ...m?.metadata, userId, chatId: chat.id },
							parts: m.parts.map((p) => {
								// Drop large 'data' arrays from getTransactions results.
								if (p.type === 'tool-getTransactions' && p.output?.data) {
									const { data: _omit, ...output } = p.output || {};
									return { ...p, output };
								}
								return p;
							}),
						} as Chat.UIMessage;
					});
					await saveMessagesAction(sanitized, { chatId: chat.id, userId });
				}
			},
			onError: (error) => {
				console.log('=== onError ===');
				console.log(error);
				// Return concise error text downstream (SSE consumer can render).
				if (error instanceof Error) return error.message;
				if (typeof error === 'string') return error;
				return String(error);
			},
		});

		// 7. Respond with SSE (UI consumption).
		return new Response(stream.pipeThrough(new JsonToSseTransformStream()));
	} catch (error) {
		console.log('=== POST error ===');
		console.log(error);
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
function uiEphemeralTransform<TOOLS extends ToolSet>(
	dataStream: UIMessageStreamWriter<UseChatToolsMessage>
): StreamTextTransform<typeof toolRegistry> {
	return (_opts) =>
		new TransformStream<
			TextStreamPart<typeof toolRegistry>,
			TextStreamPart<typeof toolRegistry>
		>({
			transform(chunk, controller) {
				if (
					chunk?.type === 'tool-result' &&
					['getAccounts', 'getTransactions'].includes(chunk.toolName)
				) {
					const { data, ...output } = chunk.output as Chat.Tools.Response;

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
