import { upsertSettings } from '@/lib/db/queries/settings';

export async function getUserPrompt(userId?: string) {
	if (!userId) return '';

	const { currentModule, labMeta, preferences } =
		(await upsertSettings({ id: userId })) || {};

	const userPrompt = [`Current authenticated userId: ${userId}`];

	if (currentModule) {
		userPrompt.push(`Current Module: ${currentModule}`);
	}

	if (labMeta) {
		userPrompt.push(`Lab metadata: ${labMeta}`);
	}

	if (preferences) {
		userPrompt.push(`User preferences/memory: ${preferences}`);
	}

	return userPrompt.join('\n\n');
}
