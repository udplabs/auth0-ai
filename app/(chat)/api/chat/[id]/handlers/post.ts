import {
  convertToModelMessages,
  createUIMessageStream,
  JsonToSseTransformStream,
  smoothStream,
  stepCountIs,
  streamText,
} from 'ai';
import { ulid } from 'ulid';
import { auth0 } from '@/lib/auth0';
import { systemPrompt } from '@/lib/ai/prompts';
import {
  createStreamId,
  // getMessageCountByUserId,
  upsertChat,
  saveMessages,
} from '@/lib/db';
import {
  createDocument,
  getWeather,
  requestSuggestions,
  updateDocument,
  userInfo,
} from '@/lib/ai/tools/';
import { isProductionEnvironment } from '@/lib/constants';
import { myProvider } from '@/lib/ai/providers';
// import { entitlementsByUserType } from '@/lib/ai/entitlements';
import { postRequestBodySchema } from '../../schema';
import { geolocation } from '@vercel/functions';
import { getStreamContext } from '@/app/(chat)/actions';
import type { ResumableStreamContext } from 'resumable-stream';

import { APIError } from '@/lib/errors';
import { NextResponse } from 'next/server';

// import type { ChatModel } from '@/lib/ai/models';
import { ZodError } from 'zod';

// export const maxDuration = 60;

let globalStreamContext: ResumableStreamContext | null = null;

interface PostRequestBody {
  id?: string;
  message: ChatMessage;
  selectedChatModel: 'chat-model' | 'chat-model-reasoning';
  selectedVisibilityType: 'public' | 'private';
}

export async function POST(
  request: TypedNextRequest<PostRequestBody>,
  context: { params: { id: string } },
) {
  try {
    const {
      id = context.params?.id,
      message,
      selectedChatModel,
      selectedVisibilityType,
    } = postRequestBodySchema.parse(await request.json()) as PostRequestBody;

    const session = await auth0.getSession();
    const { user } = session || {};

    if (!session || !user) {
      throw new APIError('unauthorized:chat');
    }

    // TODO: refactor this to use FGA?
    // const userType: UserType = user.type;

    // const messageCount = await getMessageCountByUserId({
    //   id: session.user.id,
    //   differenceInHours: 24,
    // });

    // if (messageCount > entitlementsByUserType[userType].maxMessagesPerDay) {
    //   return new APIError('rate_limit:chat').toResponse();
    // }

    const { messages = [], ...chat } = await upsertChat({
      chatId: id,
      userId: user.sub,
      visibility: selectedVisibilityType,
      message,
      includeMessages: true,
    });

    if (chat.userId !== user.sub) {
      throw new APIError('forbidden:chat');
    }

    const { longitude, latitude, city, country } = geolocation(request);

    const requestHints: RequestHints = {
      longitude,
      latitude,
      city,
      country,
    };

    const { id: streamId } = await createStreamId(chat.id);

    const stream = createUIMessageStream<ChatMessage>({
      execute: ({ writer: dataStream }) => {
        const result = streamText({
          model: myProvider.languageModel(selectedChatModel),
          system: systemPrompt({ selectedChatModel, requestHints }),
          messages: convertToModelMessages(messages),
          stopWhen: stepCountIs(5),
          activeTools:
            selectedChatModel === 'chat-model-reasoning'
              ? []
              : [
                  'getWeather',
                  'createDocument',
                  'updateDocument',
                  'requestSuggestions',
                  'userInfo',
                ],
          experimental_transform: smoothStream({ chunking: 'word' }),
          tools: {
            getWeather,
            createDocument: createDocument({ session, dataStream }),
            updateDocument: updateDocument({ session, dataStream }),
            requestSuggestions: requestSuggestions({
              session,
              dataStream,
            }),
            userInfo,
          },
          experimental_telemetry: {
            isEnabled: isProductionEnvironment,
            functionId: 'stream-text',
          },
        });

        result.consumeStream();

        dataStream.merge(
          result.toUIMessageStream({
            sendReasoning: true,
          }),
        );
      },
      generateId: ulid,
      onFinish: async ({ messages }) => {
        await saveMessages(chat.id, user.sub, messages);
      },
      //TODO make this better
      onError: () => {
        return 'Oops, an error occurred!';
      },
    });

    globalStreamContext = getStreamContext(globalStreamContext);

    if (globalStreamContext) {
      return new NextResponse(
        await globalStreamContext.resumableStream(streamId, () =>
          stream.pipeThrough(new JsonToSseTransformStream()),
        ),
      );
    } else {
      return new NextResponse(
        stream.pipeThrough(new JsonToSseTransformStream()),
      );
    }
  } catch (error) {
    if (error instanceof ZodError) {
      return new APIError(
        'bad_request:api',
        error?.message,
        error.flatten(),
      ).toResponse();
    }
    if (error instanceof APIError) {
      return error.toResponse();
    }
  }
}
