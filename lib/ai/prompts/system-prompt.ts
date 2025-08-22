import { devcampContext } from './devcamp-context';
import { devcampLabGuide } from './devcamp-lab-guide';
import { devcampUseCases } from './devcamp-use-cases';
import { financialAnalysisPrompt } from './financial-analysis-prompt';
import { getGeolocationPrompt } from './geolocation-prompt';
import { rootPrompt } from './root-prompt';
import { toolGuide } from './tool-guide';

export const systemPrompt = ({
	selectedChatModel,
	requestHints,
}: {
	selectedChatModel: string;
	requestHints: Chat.RequestHints;
}) => {
	const requestPrompt = getRequestPromptFromHints(requestHints);

	const prompts = [
		rootPrompt,
		toolGuide,
		devcampContext,
		devcampUseCases,
		devcampLabGuide,
		financialAnalysisPrompt,
		requestPrompt,
	];

	if (selectedChatModel === 'chat-model-reasoning') {
		prompts.unshift(
			`You are a reasoning AI assistant that thinks step by step before answering.`
		);
	}
	return prompts.flat().join('\n\n');
};

export function getRequestPromptFromHints({ geolocation }: Chat.RequestHints) {
	const prompts = [];

	if (geolocation) {
		prompts.push(getGeolocationPrompt(geolocation));
	}

	return prompts;
}
