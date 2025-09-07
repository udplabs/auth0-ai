import { upsertSettings } from '@/lib/db/queries/settings';
import type { UIMessage, UIMessageStreamWriter } from 'ai';
import { ulid } from 'ulid';
import { getContentById } from '../db/queries/content';
import { chunk } from './chunking';
import { getLastPart } from './get-last-part';
import { withStreamingJitter } from './with-streaming-jitter';

export interface WithStaticContentOptions<
	UI_MESSAGE extends UIMessage = Chat.UIMessage,
> {
	messages: UI_MESSAGE[];
	userSettings?: UISettings;
	userId?: string;
}

// This is a first-pass at a content wrapper.
// It fetches prompt content remotely -- cool, right?
// This gives the lab the ability to be dynamic and bend to our will 😈.
// This can/should be improved!
// But, for now, it'll do, donkey. It'll do.
export function withStaticContent<
	UI_MESSAGE extends UIMessage = Chat.UIMessage,
>(
	fn: (options: { writer: UIMessageStreamWriter }) => Promise<void> | void,
	{ userId, messages, ...config }: WithStaticContentOptions<UI_MESSAGE>
) {
	return async (options: { writer: UIMessageStreamWriter<UI_MESSAGE> }) => {
		const settings =
			config?.userSettings ||
			(userId ? await upsertSettings({ id: userId }) : undefined);

		let onFinish: () => Promise<void> | void = () => {};

		console.log('withStaticContent...');

		const lastMessage =
			messages.length === 1 ? messages[0] : messages[messages.length - 1];

		const lastPart = getLastPart(lastMessage);

		const content: string[] = [];
		let contentId: string | null = null;

		if (lastPart?.type === 'text') {
			if (lastPart.text.toUpperCase().includes('MY FIRST MESSAGE')) {
				console.log('returning intro...');
				contentId = '01K3VDGK1XKJR87HZZS1JY57HJ';
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
				lastPart.text.toUpperCase().includes('SUCCESSFULLY AUTHENTICATED') &&
				userId
			) {
				console.log('returning post auth...');
				contentId = '01K3VDJ331E72V2RE00M81J9WR';

				onFinish = async () => {
					await upsertSettings({
						id: userId,
						...settings,
						currentLabStep: 'step-03',
						nextLabStep: 'step-04',
					});
				};
			}
		}

		const { writer: dataStream } = options;

		const { textData } = contentId
			? (await getContentById(contentId)) || {}
			: {};

		if (textData) {
			// We have custom content!
			// Stream baby! Stream!

			const id = ulid();
			const jitterStream = withStreamingJitter(dataStream);

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

			if (onFinish) {
				console.log('calling withStaticContent onFinish...');
				await onFinish();
			}
			// Return otherwise the model will ruin the experience.
			return;
		}

		await fn(options);
	};
}
