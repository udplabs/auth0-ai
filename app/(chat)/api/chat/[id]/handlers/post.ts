import { openai } from '@/lib/ai/openai';
import { getSystemPrompts } from '@/lib/ai/prompts/system-prompt';
import { toolRegistry } from '@/lib/ai/tool-registry';
import { saveMessages } from '@/lib/db/queries/chat';
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
import { ulid } from 'ulid';

import { APIError } from '@/lib/errors';
import { type NextRequest } from 'next/server';
import { ZodError } from 'zod';
import {
	UIMessageMetadataSchema,
	// hasOwnUI,
	parseIncomingChatRequest,
} from './_helpers';

// This is an annoying types issue quick fix.
// TODO: figure out how to use Chat.UIMessage
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
		const {
			messages = [],
			userId,
			...chat
		} = await parseIncomingChatRequest(request, await params);

		console.log('=== MESSAGES ===');
		console.log(messages);

		// Validate loaded messages against
		// tools and schemas
		const uiMessages = await validateUIMessages<UseChatToolsMessage>({
			messages,
			tools: toolRegistry,
			metadataSchema: UIMessageMetadataSchema,
		});

		setAIContext({ threadID: chat.id });

		const modelMessages = convertToModelMessages(uiMessages);

		const systemPrompts = await getSystemPrompts({
			requestHints: {
				geolocation: geolocation(request),
				userId,
			},
		});

		const stream = createUIMessageStream<UseChatToolsMessage>({
			// Custom wrapper to handle lab content
			execute: withStaticContent(
				({ writer: dataStream }) => {
					const result = streamText({
						model: openai('gpt-5-nano'),
						system: systemPrompts,
						messages: modelMessages,
						// temperature: 0,
						// stopWhen: [hasOwnUI(), stepCountIs(5)],
						stopWhen: (ctx) => {
							const { steps } = ctx;
							console.log('=== stopWhen ===');

							const lastMessage = steps.at(-1);

							let hasOwnUI = false;

							if (lastMessage) {
								// v5 aggregates results; support both properties for backward compatibility
								const results =
									lastMessage?.toolResults ??
									lastMessage?.dynamicToolResults ??
									[];
								const lastResult = results.at(-1);

								hasOwnUI = (lastResult?.output as any)?.hasOwnUI;
								console.log('hasOwnUI:', hasOwnUI, hasOwnUI ? 'Stopping!' : '');
							}

							return hasOwnUI || stepCountIs(5)(ctx);
						},
						experimental_transform: [
							uiEphemeralTransform(dataStream),
							smoothStream(),
						],
						tools: toolRegistry,
						// prepareStep: async (step) => {
						// 	console.log('=== prepareStep ===');
						// 	console.log(step);

						// 	return step;
						// },
					});

					result.consumeStream();

					dataStream.merge(
						result.toUIMessageStream({
							sendReasoning: false,
							// originalMessages: uiMessages,
							// sendFinish: false,
							// sendStart: false,
						})
					);
				},
				{ messages: uiMessages, userId }
			),
			generateId: ulid,
			onFinish: async ({ messages }) => {
				console.log('onFinish... saving', messages.length, 'messages...');
				console.log('=== messages ===');
				console.log(messages);

				if (messages.length > 0) {
					// Strip out excessive data (i.e. transactions/accounts)
					const sanitized = messages.map((m) => {
						return {
							...m,
							metadata: { ...m?.metadata, userId, chatId: chat.id },
							parts: m.parts.map((p) => {
								if (p.type === 'tool-getTransactions' && p.output?.data) {
									const { data: _, ...output } = p.output || {};

									return {
										...p,
										output: { ...output },
									};
								}

								return p;
							}),
						} as Chat.UIMessage;
					});
					await saveMessages(sanitized);
				}
			},
			//TODO make this better
			onError: (error) => {
				console.log('=== onError ===');
				console.log(error);

				if (error instanceof Error) {
					console.log('returning error.message...');
					return error.message;
				}

				if (typeof error === 'string') {
					console.log('error === string');
					return error;
				}

				// Handle other types safely
				return String(error);
			},
		});

		return new Response(stream.pipeThrough(new JsonToSseTransformStream()));
	} catch (error) {
		console.log('=== POST error ===');
		console.log(error);
		if (error instanceof ZodError) {
			return new APIError(
				'bad_request:api',
				error?.message,
				error.format()
			).toResponse();
		}
		if (error instanceof APIError) {
			return error.toResponse();
		}
		return new APIError(error).toResponse();
	}
}

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
					const { data, ...output } = chunk?.output as Chat.Tools.Response;

					// Emit an ephemeral UI event via the UI writer (does not affect the LLM stream)
					dataStream.write({
						type: 'data-accounts',
						data,
						transient: true,
						id: chunk.toolCallId,
					});

					// Forward the original chunk with data removed from tool output
					controller.enqueue({ ...chunk, output } as any);
				} else {
					controller.enqueue(chunk);
				}
			},
		});
}
