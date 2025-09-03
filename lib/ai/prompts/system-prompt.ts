import { sortBy } from 'lodash-es';
// import { financialAnalysisPrompt } from './financial-analysis-prompt';
import { upsertSettings } from '@/lib/db/queries/settings';
import { getGeolocationPrompt } from './geolocation-prompt';
import { getUserPrompt } from './user-prompt';

import { findAllContent, getStepPrompts } from '@/lib/db/queries/content';

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

async function getPrompts(settings?: UISettings) {
	const content = await findAllContent({ type: 'prompt' });

	const { currentLabStep, nextLabStep } = settings || {};

	const labStep =
		nextLabStep && currentLabStep != nextLabStep ? nextLabStep : currentLabStep;

	if (labStep) {
		const stepPrompts = await getStepPrompts(labStep);
		content.push(...stepPrompts);
	}

	const orderedPrompts = sortBy(content, ['name']);
	const prompts = [];

	if (orderedPrompts.length > 0) {
		for (const prompt of orderedPrompts) {
			const { textData, name, mimeType } = prompt;
			if (mimeType.startsWith('TEXT_')) {
				console.log(`loading prompt: ${name}`);
				prompts.push(textData);
			}
		}
	}

	console.log('loaded prompts:', prompts);
	return prompts;
}
