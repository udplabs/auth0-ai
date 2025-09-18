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
import { StepGuru } from '@/lib/ai/agents/step-guru';
import { openai } from '@/lib/ai/openai';
import { getSystemPrompts } from '@/lib/ai/prompts/system-prompt';
import { toolRegistry } from '@/lib/ai/tool-registry';
import { APIError } from '@/lib/errors';
import { withStaticContent } from '@/lib/utils/with-static-content';
import { setAIContext } from '@auth0/ai-vercel';
import { StreamableHTTPClientTransport } from '@modelcontextprotocol/sdk/client/streamableHttp.js';
import { geolocation } from '@vercel/functions';
import {
	convertToModelMessages,
	experimental_createMCPClient as createMCPClient,
	createUIMessageStream,
	InferUITools,
	JsonToSseTransformStream,
	smoothStream,
	stepCountIs,
	streamText,
	UIMessage,
	validateUIMessages,
	type StreamTextTransform,
	type TextStreamPart,
	type ToolSet,
	type UIMessageStreamWriter,
} from 'ai';
import { type NextRequest } from 'next/server';
import { ulid } from 'ulid';
import { ZodError } from 'zod';
import { parseIncomingChatRequest } from './_helpers/parse-incoming-chat-request';
import { UIMessageMetadataSchema } from './_helpers/schemas';

import type { Chat } from '@/types/chat';

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

		// 2. Validate UI messages (tool calls, metadata shape).
		const uiMessages = await validateUIMessages<UseChatToolsMessage>({
			messages,
			tools: toolRegistry,
			metadataSchema: UIMessageMetadataSchema,
		});

		const lastUserMessage = uiMessages.findLast((m) => m.role === 'user');

		// Thread context (telemetry / grouping).
		setAIContext({ threadID: chat.id });

		// 3. Convert UI messages -> model format.
		const modelMessages = convertToModelMessages(uiMessages);

		// 4. Derive lab step either directly or via Agent StepGuru.
		const currentLabStep =
			lastUserMessage?.metadata?.labStep ??
			(
				await StepGuru.generate({
					messages: modelMessages,
				})
			)?.text;

		// 5. Load system prompts (dynamic hints).
		const systemPrompts = await getSystemPrompts({
			requestHints: {
				geolocation: geolocation(request),
				userId,
				settings: {
					currentLabStep,
				},
			},
		});

		// Connect to Auth0 Guide (docs MCP)
		const auth0MCP = await createMCPClient({
			transport: new StreamableHTTPClientTransport(
				new URL('https://auth0.com/ai/docs/mcp')
			),
		});

		// 6. Create unified UI stream orchestrator.
		const stream = createUIMessageStream<UseChatToolsMessage>({
			// Wrap execution with static content (lab-specific augmentation).
			execute: withStaticContent(
				({ writer: dataStream }) => {
					const result = streamText({
						model: openai('gpt-5-mini'),
						system: systemPrompts,
						messages: modelMessages,
						// OpenAI GPT 5 models no longer support temperature
						// temperature: 0.2, // deterministic mode
						stopWhen: (ctx) => {
							// Custom stop logic: either tool produced hasOwnUI OR step count exceeded.
							const { steps } = ctx;

							const lastMessage = steps.at(-1);

							if (lastMessage) {
								const results =
									lastMessage.toolResults ??
									lastMessage.dynamicToolResults ??
									[];
								const lastResult = results.at(-1);

								// Return to prevent calling getTransactions
								if (lastResult?.toolName === 'searchTransactions') return true;

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
						tools: {
							...toolRegistry,
							...auth0MCP.tools,
						},
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
