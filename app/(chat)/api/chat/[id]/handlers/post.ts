import {
	generateTitleFromUserMessage,
	getErrorMessage,
} from '@/app/(chat)/api/actions';
import { getTools } from '@/lib/ai/get-tools';
import { systemPrompt } from '@/lib/ai/prompts/system-prompt';
import { myProvider } from '@/lib/ai/providers';
import { getUser } from '@/lib/auth0/client';
import { getChatById, saveChat } from '@/lib/db/queries/chat';
import { saveMessages, updateMessage } from '@/lib/db/queries/message';
import { createStreamId } from '@/lib/db/queries/stream';
import { setAIContext } from '@auth0/ai-vercel';
import {
	InterruptionPrefix,
	errorSerializer,
	withInterruptions,
} from '@auth0/ai-vercel/interrupts';
import { geolocation } from '@vercel/functions';
import {
	JsonToSseTransformStream,
	convertToModelMessages,
	createUIMessageStream,
	hasToolCall,
	isToolUIPart,
	smoothStream,
	stepCountIs,
	streamText,
	tool,
	type TextStreamPart,
	type ToolSet,
} from 'ai';
import { ulid } from 'ulid';
import { postRequestBodySchema } from '../../schema';

import { APIError } from '@/lib/errors';
import { NextResponse } from 'next/server';

import { Auth0Interrupt } from '@auth0/ai/interrupts';
import { after } from 'next/server';
import {
	createResumableStreamContext,
	type ResumableStreamContext,
} from 'resumable-stream';
import { ZodError, z } from 'zod';

let globalStreamContext: ResumableStreamContext | null = null;

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

interface PostRequestBody {
	id?: string;
	message: Chat.UIMessage;
	selectedChatModel: 'chat-model' | 'chat-model-reasoning';
}

export async function POST(
	request: TypedNextRequest<PostRequestBody>,
	{ params }: { params: Promise<ApiPathParams> }
) {
	try {
		const body = await request.json();

		const {
			id = (await params)?.id,
			message,
			selectedChatModel,
		} = postRequestBodySchema.parse(body) as PostRequestBody;

		const user = await getUser();
		const isCompletion =
			message.role === 'assistant' &&
			message.parts.some((p) => isToolUIPart(p));

		let dbChat = await getChatById(id, user.sub, true);
		const uiMessage = {
			...message,
			metadata: { ...message?.metadata, userId: user.sub, chatId: id },
		};

		if (!dbChat) {
			// Chat does not exist. Create it!
			dbChat = await saveChat({
				id,
				userId: user.sub,
				messages: [uiMessage],
				title: await generateTitleFromUserMessage(message),
			});
		} else if (isCompletion) {
			// Update the existing message
			// Otherwise db will throw an error
			// (the message already exists!)
			await updateMessage(message);
		} else {
			// Add incoming message to DB
			await saveMessages([uiMessage]);
		}

		const { messages = [], ...chat } = dbChat;

		const uiMessages = [...messages, uiMessage];

		const requestHints: Chat.RequestHints = {
			geolocation: geolocation(request),
		};

		const { id: streamId } = await createStreamId(chat.id);

		setAIContext({ threadID: streamId });

		const tools = getTools();

		const modelMessages = convertToModelMessages(uiMessages);

		const transformAuth0Error = <TOOLS extends ToolSet>(
			chunk: TextStreamPart<TOOLS>
		) => {
			if (chunk?.type === 'tool-error') {
				console.log('=== TRANSFORM ===');
				console.log(chunk);
				const { toolName, error } = chunk;
				if (
					toolName === 'getExternalAccounts' &&
					error instanceof Auth0Interrupt
				) {
					const json = {
						...error.toJSON(),
						toolCall: { id: chunk.toolCallId },
					};

					console.log('transforming...');
					const message = `${error?.name}:${JSON.stringify(json)}`;
					console.log(message);
					const output = {
						...chunk,
						error: {
							...json,
							message,
						},
					};
					console.log(output);
					return output;
				}
			}
			return chunk;
		};

		const authRequiredTransform = <TOOLS extends ToolSet>() =>
			new TransformStream<TextStreamPart<TOOLS>, TextStreamPart<TOOLS>>({
				transform(chunk, controller) {
					controller.enqueue(transformAuth0Error(chunk));
				},
			});

		const stream = createUIMessageStream<Chat.UIMessage>({
			execute: withInterruptions<Chat.UIMessage>(
				async ({ writer: dataStream }) => {
					const result = streamText({
						model: myProvider.languageModel(selectedChatModel),
						system: systemPrompt({ selectedChatModel, requestHints }),
						messages: modelMessages,
						stopWhen: (ctx) => {
							console.log('=== stopWhen ===');
							// Stop if the last message from the assistant has content
							// (this handles the case where the model may generate multiple steps/tools)
							const last = ctx.steps.at(-1);
							console.log(last?.content);
							if (!last) return false;

							// v5 aggregates results; support both properties for backward compatibility
							const results =
								last?.toolResults ?? last?.dynamicToolResults ?? [];
							const lastResult = results.at(-1);

							const toolError = last.content.find(
								(c) => c.type === 'tool-error'
							);

							const isInterrupt =
								toolError &&
								typeof toolError.error === 'object' &&
								(toolError.error as any).code === 'FEDERATED_CONNECTION_ERROR';

							if (isInterrupt) {
								console.log('=== IS INTERRUPT ===');
								throw (toolError?.error as any)?.message;
							}

							const hasOwnUI = lastResult?.output?.hasOwnUI;

							// If the most recent result has indicated generative UI, force AI to shut up.
							return hasOwnUI || stepCountIs(5);
						},
						experimental_transform: [
							smoothStream({
								chunking: 'word',
								delayInMs: 20,
							}),
							authRequiredTransform,
						],
						tools,
					});

					result.consumeStream();

					// const [_, tap] = result.fullStream.tee();

					// For debugging: log structured stream parts safely.
					// (async () => {
					// 	const reader = tap.getReader();
					// 	try {
					// 		while (true) {
					// 			const { value, done } = await reader.read();
					// 			if (done) break;
					// 			console.debug('stream part:', value);
					// 		}
					// 	} finally {
					// 		reader.releaseLock();
					// 	}
					// })();

					dataStream.merge(
						result.toUIMessageStream({
							// Vercel SDK bug? Seems not to work w/ OpenAI. :(
							sendReasoning: false,
							originalMessages: uiMessages,
						})
					);
				},
				{
					messages: uiMessages,
					tools,
				}
			),
			generateId: ulid,

			onFinish: async ({ messages }) => {
				console.log('onFinish... saving', messages.length, 'messages...');
				console.log('=== messages ===');
				console.log(messages);
				await saveMessages(
					messages.map((m) => ({
						...m,
						metadata: { ...m?.metadata, userId: user.sub, chatId: chat.id },
					}))
				);
			},
			//TODO make this better
			onError: (error) => {
				console.log('=== onError ===');
				console.log(error);

				if ((error as any)?.error instanceof Auth0Interrupt) {
					console.log(`it's an interrupt!`);
				}

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
			return new NextResponse(
				stream.pipeThrough(new JsonToSseTransformStream())
			);
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
