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
	requestHints: {
		settings,
		auth0ClientId,
		auth0ClientSecret,
		auth0Domain,
		auth0Secret,
		fgaStoreId,
		fgaClientId,
		fgaClientSecret,
		...hints
	},
}: {
	requestHints: Chat.RequestHints;
}) {
	if (!settings && hints?.userId) {
		settings = await upsertSettings({ id: hints.userId });
	}

	const prompts = await getPrompts(settings);

	const stepPrompts = sortBy(
		await getStepPrompts(settings?.currentModule?.toString() ?? '2'), // Defaulting to Step 2 as it is the first step
		'name'
	);

	// Populate step prompts with context
	const stepPromptsWithContext = stepPrompts.map((p) => {
		if (p.textData?.includes('{{auth0ClientId}}')) {
			p.textData = p.textData.replace(
				'{{auth0ClientId}}',
				auth0ClientId?.toString() ?? 'false'
			);
		}
		if (p.textData?.includes('{{auth0ClientSecret}}')) {
			p.textData = p.textData.replace(
				'{{auth0ClientSecret}}',
				auth0ClientSecret?.toString() ?? 'false'
			);
		}
		if (p.textData?.includes('{{auth0Domain}}')) {
			p.textData = p.textData.replace(
				'{{auth0Domain}}',
				auth0Domain?.toString() ?? 'false'
			);
		}
		if (p.textData?.includes('{{auth0Secret}}')) {
			p.textData = p.textData.replace(
				'{{auth0Secret}}',
				auth0Secret?.toString() ?? 'false'
			);
		}
		if (p.textData?.includes('{{fgaStoreId}}')) {
			p.textData = p.textData.replace(
				'{{fgaStoreId}}',
				fgaStoreId?.toString() ?? 'false'
			);
		}
		if (p.textData?.includes('{{fgaClientId}}')) {
			p.textData = p.textData.replace(
				'{{fgaClientId}}',
				fgaClientId?.toString() ?? 'false'
			);
		}
		if (p.textData?.includes('{{fgaClientSecret}}')) {
			p.textData = p.textData.replace(
				'{{fgaClientSecret}}',
				fgaClientSecret?.toString() ?? 'false'
			);
		}
		return p.textData ?? '';
	});

	prompts.push(...stepPromptsWithContext);

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
				} else {
					prompts.push(textData);
				}
			}
		}
	}

	return prompts;
}
