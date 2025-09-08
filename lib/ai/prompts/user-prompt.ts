import { upsertSettings } from '@/lib/db/queries/settings';

export async function getUserPrompt(userId?: string) {
	if (!userId) return '';

	const { currentLabStep, nextLabStep, labMeta, preferences } =
		(await upsertSettings({ id: userId })) || {};

	const userPrompt = [`Current authenticated userId: ${userId}`];

	if (currentLabStep) {
		userPrompt.push(`Current Lab Step: ${currentLabStep}`);
	}

	if (nextLabStep) {
		userPrompt.push(`Next Lab Step: ${nextLabStep}`);
	}

	if (labMeta) {
		userPrompt.push(`Lab metadata: ${labMeta}`);
	}

	if (preferences) {
		userPrompt.push(`User preferences/memory: ${preferences}`);
	}

	return userPrompt.join('\n\n');
}
