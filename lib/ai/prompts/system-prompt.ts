import { sortBy } from 'lodash-es';
// import { financialAnalysisPrompt } from './financial-analysis-prompt';
import { upsertSettings } from '@/lib/db/queries/settings';
import { getGeolocationPrompt } from './geolocation-prompt';
import { getUserPrompt } from './user-prompt';

import {
	getSystemPrompts as getDBSystemPrompts,
	getStepPrompts,
} from '@/lib/db/queries/content';

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
	const systemPrompts = await getDBSystemPrompts();

	const { currentLabStep, nextLabStep } = settings || {};

	const labStep =
		nextLabStep && currentLabStep != nextLabStep ? nextLabStep : currentLabStep;

	if (labStep) {
		const stepPrompts = await getStepPrompts(labStep);
		systemPrompts.push(...stepPrompts);
	}

	const orderedPrompts = sortBy(systemPrompts, ['name']);
	const prompts = [];

	if (orderedPrompts.length > 0) {
		for (const prompt of orderedPrompts) {
			const { textData, name, mimeType } = prompt;
			if (mimeType?.toUpperCase().startsWith('TEXT_')) {
				console.log(`loading prompt: ${name}`);
				prompts.push(textData);
			}
		}
	}

	console.log('loaded prompts:', prompts.length);
	return prompts;
}
