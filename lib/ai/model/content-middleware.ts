import {
	createEmptyModelResult,
	getProviderOptions,
} from '@/lib/ai/model/utils';
import {
	CONTENT_AUTHENTICATED_MESSAGE_ID,
	CONTENT_FIRST_MESSAGE_ID,
} from '@/lib/constants';
import { getContentById } from '@/lib/db/queries/content';
import { upsertSettings } from '@/lib/db/queries/settings';
import { getLastPart } from '@/lib/utils/get-last-part';
import { withStreamingJitter } from '@/lib/utils/with-streaming-jitter';
import type { Chat } from '@/types/chat';
import type { LanguageModelV2Middleware } from '@ai-sdk/provider';

export const contentMiddleware: LanguageModelV2Middleware = {
	wrapStream: async ({ doStream, params }) => {
		const { incomingMessage, userId, userSettings, writer } =
			getProviderOptions<Chat.ContentMiddlewareOptions>(
				'contentMiddleware',
				params
			) || {};

		if (incomingMessage && writer) {
			// Apply content moderation or enrichment here
			const settings = userSettings ?? (await upsertSettings(userId));

			let onFinish: () => Promise<void> | void = () => {};
			const lastPart = getLastPart(incomingMessage);
			const lastPartUpper =
				lastPart?.type === 'text' ? lastPart.text.toUpperCase() : '';

			let contentId: string | null = null;

			if (lastPart?.type === 'text') {
				if (lastPartUpper.includes('MY FIRST MESSAGE')) {
					contentId = CONTENT_FIRST_MESSAGE_ID;
					onFinish = async () => {
						// If user is somehow authenticated...
						// They shouldn't be but ¯\_(ツ)_/¯
						if (userId) {
							await upsertSettings({
								...settings,
								id: userId,
								currentLabStep: 'step-02',
								nextLabStep: 'step-03',
							});
						}
					};
				} else if (
					lastPartUpper.includes('SUCCESSFULLY AUTHENTICATED') &&
					userId
				) {
					contentId = CONTENT_AUTHENTICATED_MESSAGE_ID;

					onFinish = async () => {
						await upsertSettings({
							...settings,
							id: userId,
							currentLabStep: 'step-03',
							nextLabStep: 'step-04',
						});
					};
				}
			}

			const { textData } = contentId
				? (await getContentById(contentId)) || {}
				: {};

			if (textData) {
				// We have custom content!
				// Stream baby! Stream!

				const [{ ulid }, { chunk }] = await Promise.all([
					import('@/lib/utils'),
					import('@/lib/utils/chunking'),
				]);

				const id = ulid();

				// TODO: Investigate using a simulated readable stream instead of using writer directly. 🤔
				//    - Could potentially use Vercel's `simulateReadableStream`
				//    - it's not as cool as jitterStream
				const jitterStream = withStreamingJitter(writer);

				jitterStream.write({ type: 'text-start', id });

				const chunks = chunk(textData, 'paragraphs');

				for (const delta of chunks) {
					jitterStream.write({
						type: 'text-delta',
						delta,
						id,
					});
				}

				jitterStream.write({ type: 'text-end', id });

				await jitterStream.flush();

				await onFinish?.();
				// Short-circuit the main stream
				return createEmptyModelResult();
			}
		}

		return doStream();
	},
};
