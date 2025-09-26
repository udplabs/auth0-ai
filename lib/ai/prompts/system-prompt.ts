import { getGeolocationPrompt } from '@/lib/ai/prompts/geolocation-prompt';
import { getUserPrompt } from '@/lib/ai/prompts/user-prompt';
import {
	getSystemPrompts as getDBSystemPrompts,
	getStepGuides,
	getStepPrompts,
} from '@/lib/db/queries/content';
import { upsertSettings } from '@/lib/db/queries/settings';
import { sortBy } from '@/lib/utils';
import { tokenVaultPrompt } from './token-vault';

import type { Chat } from '@/types/chat';
import type { UISettings } from '@/types/settings';

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

	return prompts.flat().join('\n\n');
}

export async function getRequestPromptFromHints({
	geolocation,
	userId,
	prompt,
}: Chat.RequestHints) {
	const prompts = [];

	if (userId) {
		prompts.push(await getUserPrompt(userId));
	}

	if (geolocation) {
		prompts.push(getGeolocationPrompt(geolocation));
	}

	if (prompt?.includes('token vault')) {
		prompts.push(tokenVaultPrompt);
	}

	return prompts;
}

async function getPrompts(settings?: Partial<UISettings>) {
	const systemPrompts = sortBy(await getDBSystemPrompts(), 'name');

	// Defaulting to Step 2 as it is the first step
	// User will not be authenticated and will not have settings
	const { currentModule = 2 } = settings || {};

	const stepPrompts = sortBy(
		await getStepPrompts(currentModule.toString()),
		'name'
	);

	systemPrompts.push(...stepPrompts);

	const guidePrompts = sortBy(
		await getStepGuides({
			query: currentModule.toString(),
			contentPlacement: 'labs',
		}),
		'name'
	);

	systemPrompts.push(...guidePrompts);

	const prompts = [];

	if (systemPrompts.length > 0) {
		for (const prompt of systemPrompts) {
			const { textData, name, contentType, mimeType } = prompt;
			if (mimeType?.toUpperCase().startsWith('TEXT')) {
				if (contentType === 'guide/module') {
					// Wrap guide so Aiya knows it's the guide
					prompts.push(
						`\n\n===== LAB GUIDE: ${name} =====\n\n${textData}\n\n====================`
					);
				}
				prompts.push(textData);
			}
		}
	}

	return prompts;
}
