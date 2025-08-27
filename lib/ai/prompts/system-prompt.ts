import { devcampContext } from './devcamp-context';
import { devcampLabGuide } from './devcamp-lab-guide';
import { devcampUseCases } from './devcamp-use-cases';
import { financialAnalysisPrompt } from './financial-analysis-prompt';
import { getGeolocationPrompt } from './geolocation-prompt';
import { rootPrompt } from './root-prompt';
import { toolGuide } from './tool-guide';
import { getUserPrompt } from './user-prompt';

import { getStepPrompts } from '@/lib/db/queries/settings';

export async function getSystemPrompts({
	requestHints,
}: {
	requestHints: Chat.RequestHints;
}) {
	const requestPrompt = await getRequestPromptFromHints(requestHints);

	const prompts = [
		rootPrompt,
		requestPrompt,
		toolGuide,
		devcampContext,
		devcampUseCases,
		devcampLabGuide,
		financialAnalysisPrompt,
	];

	return prompts.flat().join('\n\n');
}

export async function getRequestPromptFromHints({
	geolocation,
	userId,
	settings,
}: Chat.RequestHints) {
	const prompts = [];

	if (userId) {
		prompts.push(await getUserPrompt(userId));
	}

	if (geolocation) {
		prompts.push(getGeolocationPrompt(geolocation));
	}

	if (settings) {
		const { currentLabStep, nextLabStep } = settings;
		const labStep =
			nextLabStep && currentLabStep != nextLabStep
				? nextLabStep
				: currentLabStep;

		// fetch lab step prompt
		const content = await getStepPrompts(labStep);

		prompts.push(...content);
	}

	return prompts;
}
