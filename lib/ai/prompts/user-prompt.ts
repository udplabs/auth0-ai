import { getSettings } from '@/lib/db/queries/settings';

export async function getUserPrompt(userId?: string) {
	if (!userId) return '';

	const {
		currentLabStep,
		labMeta,
		preferences,
		firstMessage = true,
	} = (await getSettings(userId)) || {};

	const userPrompt = [
		`Current authenticated user: ${userId}`,
		`First message: ${firstMessage}`,
	];

	if (currentLabStep) {
		userPrompt.push(`Current Lab Step: ${currentLabStep}`);
	}

	if (labMeta) {
		userPrompt.push(`Lab metadata: ${labMeta}`);
	}

	if (preferences) {
		userPrompt.push(`User preferences/memory: ${preferences}`);
	}

	return userPrompt.join('\n\n');
}
