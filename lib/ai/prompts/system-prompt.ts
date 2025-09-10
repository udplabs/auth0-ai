import { getGeolocationPrompt } from '@/lib/ai/prompts/geolocation-prompt';
import { getUserPrompt } from '@/lib/ai/prompts/user-prompt';
import {
	getSystemPrompts as getDBSystemPrompts,
	getStepGuides,
	getStepPrompts,
} from '@/lib/db/queries/content';
import { upsertSettings } from '@/lib/db/queries/settings';
import { sortBy } from '@/lib/utils';

export async function getSystemPrompts({
	requestHints: { settings, ...hints },
}: {
	requestHints: Chat.RequestHints;
}) {
	if (!settings && hints?.userId) {
		settings = await upsertSettings({ id: hints.userId });
	}

	const prompts = await getPrompts(settings);

	prompts.push(...(await getRequestPromptFromHints(hints)));

	console.log('System Prompts Loaded:', prompts.length);

	return prompts.flat().join('\n\n');
}

export async function getRequestPromptFromHints({
	geolocation,
	userId,
}: Chat.RequestHints) {
	const prompts = [];

	if (userId) {
		prompts.push(await getUserPrompt(userId));
	}

	if (geolocation) {
		prompts.push(getGeolocationPrompt(geolocation));
	}

	return prompts;
}

async function getPrompts(settings?: Partial<UISettings>) {
	const systemPrompts = sortBy(await getDBSystemPrompts(), 'name');

	console.log('=== found', systemPrompts.length, 'system prompts ===');

	// Defaulting to Step 2 as it is the first step
	// User will not be authenticated and will not have settings
	const { currentLabStep, nextLabStep } = settings || {};

	const labStep =
		nextLabStep && currentLabStep != nextLabStep ? nextLabStep : currentLabStep;

	if (labStep) {
		const stepPrompts = sortBy(await getStepPrompts(labStep), 'name');

		console.log('=== found', stepPrompts.length, 'step prompts ===');

		systemPrompts.push(...stepPrompts);

		const guidePrompts = sortBy(await getStepGuides(labStep), 'name');

		console.log('=== found', guidePrompts.length, 'guides ===');

		systemPrompts.push(...guidePrompts);
	}

	const prompts = [];

	if (systemPrompts.length > 0) {
		for (const prompt of systemPrompts) {
			const { textData, name, contentType, mimeType } = prompt;
			if (mimeType?.toUpperCase().startsWith('TEXT')) {
				console.log(`loading prompt: ${name}`);

				if (contentType === 'guide/step') {
					// Wrap guide so Aiya knows it's the guide
					prompts.push(
						`\n\n===== LAB GUIDE: ${name} =====\n\n${textData}\n\n====================`
					);
				}
				prompts.push(textData);
			}
		}
	}

	console.log('loaded', prompts.length, 'prompts');
	return prompts;
}
