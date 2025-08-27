import {
	getContentByName,
	getSettings,
	saveSettings,
} from '@/lib/db/queries/settings';
import type { UIMessage, UIMessageStreamWriter } from 'ai';
import { ulid } from 'ulid';
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
	fn: ((settings?: UISettings) => (options: {
		writer: UIMessageStreamWriter<UI_MESSAGE>;
	}) => Promise<void> | void,
	{ userId, messages, ...config }: WithStaticContentOptions<UI_MESSAGE>
) {
	return async (options: { writer: UIMessageStreamWriter<UI_MESSAGE> }) => {
		const settings = config?.userSettings || (await getSettings(userId));

		let onFinish: () => Promise<void> | void = () => {};

		console.log('withStaticContent...');

		const lastMessage =
			messages.length === 1 ? messages[0] : messages[messages.length - 1];

		const lastPart = getLastPart(lastMessage);

		const content: string[] = [];
		let contentId: string | null = null;

		// 1) Check if this is the first message; return step-01-intro.md
		if (
			lastPart?.type === 'text' &&
			lastPart?.text?.toUpperCase().includes('MY FIRST MESSAGE')
		) {
			console.log('returning intro...');
			contentId = 'step-02_intro';

			onFinish = async () => {
				await saveSettings({
					...settings,
					currentLabStep: 'step-02',
					nextLabStep: 'step-03',
				});
			};

			/* 2) Check if this is post first auth; return step-02-post-auth.md */
		} else if (
			lastPart?.type === 'text' &&
			lastPart?.text?.toUpperCase().includes('SUCCESSFULLY AUTHENTICATED')
		) {
			console.log('returning post auth...');
			contentId = 'step-03_post-auth';

			onFinish = async () => {
				await saveSettings({
					...settings,
					currentLabStep: 'step-03',
					nextLabStep: 'step-04',
				});
			};
		}
		const { writer: dataStream } = options;

		const { contentText } = (await getContentByName(contentId)) || {};

		if (contentText) {
			// We have custom content!
			// Stream baby! Stream!

			const id = ulid();
			const jitterStream = withStreamingJitter(dataStream);

			jitterStream.write({ type: 'text-start', id });

			const chunks = chunk(contentText, 'paragraphs');

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
		}
		// Always return
		// Unless otherwise 🤪...
		// No, really, always return
		return fn(settings)(options);
	};
}
