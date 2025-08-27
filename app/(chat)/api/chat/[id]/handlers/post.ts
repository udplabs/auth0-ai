import { getSystemPrompts } from '@/lib/ai/prompts/system-prompt';
import { toolRegistry } from '@/lib/ai/tool-registry';
import { createStreamId, saveMessages } from '@/lib/db/queries/chat';
import { chunk, withStaticContent, withStreamingJitter } from '@/lib/utils';
import { openai } from '@ai-sdk/openai';
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
import { readFile } from 'fs/promises';
import path from 'path';
import { ulid } from 'ulid';

import { APIError } from '@/lib/errors';
import { NextResponse, after, type NextRequest } from 'next/server';
import {
	createResumableStreamContext,
	type ResumableStreamContext,
} from 'resumable-stream';
import { ZodError } from 'zod';
import {
	UIMessageMetadataSchema,
	hasOwnUI,
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

let globalStreamContext: ResumableStreamContext | null = null;

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

		const { id: streamId } = await createStreamId(chat.id);

		setAIContext({ threadID: streamId });

		const modelMessages = convertToModelMessages(uiMessages);

		const stream = createUIMessageStream<UseChatToolsMessage>({
			// Custom wrapper to handle lab content
			execute: withStaticContent(
				(settings) =>
					async ({ writer: dataStream }) => {
						const result = streamText({
							model: openai('gpt-5-nano'),
							system: await getSystemPrompts({
								requestHints: {
									geolocation: geolocation(request),
									userId,
									settings,
								},
							}),
							messages: modelMessages,
							stopWhen: [hasOwnUI(), stepCountIs(5)],
							experimental_transform: [
								uiEphemeralTransform(dataStream),
								smoothStream(),
							],
							tools: toolRegistry,
						});
						result.consumeStream();

						dataStream.merge(
							result.toUIMessageStream({
								sendReasoning: false,
								originalMessages: uiMessages,
								sendFinish: false,
								sendStart: false,
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
					await saveMessages(
						messages.map((m) => ({
							...m,
							metadata: { ...m?.metadata, userId, chatId: chat.id },
						}))
					);
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

		const streamContext = getStreamContext();

		if (streamContext) {
			console.log('returning resumable stream...');
			return new NextResponse(
				await streamContext.resumableStream(streamId, () =>
					stream.pipeThrough(new JsonToSseTransformStream())
				)
			);
		} else {
			return new Response(stream.pipeThrough(new JsonToSseTransformStream()));
		}
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

/**
 * Setup an instance of Redis if you would like to use resumable streams. See .env for details.
 *
 * Running locally will NOT use resumable streams (unless you run Redis locally).
 */
export function getStreamContext() {
	if (!globalStreamContext) {
		try {
			globalStreamContext = createResumableStreamContext({
				waitUntil: after,
			});
		} catch (error: any) {
			if (error.message.includes('REDIS_URL')) {
				console.warn(
					' > Resumable streams are disabled due to missing REDIS_URL'
				);
			} else {
				console.error(error);
			}
		}
	}

	return globalStreamContext;
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

function isFirstMessage(messages: UIMessage[]) {
	if (messages.length === 0) return false;

	const lastMessage =
		messages.length === 1 ? messages[0] : messages[messages.length - 1];
	const { parts = [] } = lastMessage;
	const lastPart =
		parts.length > 1
			? parts[parts.length - 1]
			: parts.length === 1
				? parts[0]
				: undefined;

	return (
		lastPart?.type === 'text' &&
		lastPart?.text?.toUpperCase().includes('SUCCESSFULLY AUTHENTICATED')
	);
}
