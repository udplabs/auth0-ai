export async function getSystemPrompts({
	requestHints: { settings, ...hints },
}: {
	requestHints: Chat.RequestHints;
}) {
	if (!settings && hints?.userId) {
		const { upsertSettings } = await import('@/lib/db/queries/settings');

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

	const { getUserPrompt } = await import('@/lib/ai/prompts/user-prompt');

	if (userId) {
		prompts.push(await getUserPrompt(userId));
	}

	if (geolocation) {
		const { getGeolocationPrompt } = await import(
			'@/lib/ai/prompts/geolocation-prompt'
		);

		prompts.push(getGeolocationPrompt(geolocation));
	}

	return prompts;
}

async function getPrompts(settings?: Partial<UISettings>) {
	const { sortBy } = await import('@/lib/utils');

	const { getSystemPrompts: getDBSystemPrompts } = await import(
		'@/lib/db/queries/content'
	);
	const systemPrompts = sortBy(await getDBSystemPrompts(), 'name');

	console.log('=== found', systemPrompts.length, 'system prompts ===');

	// Defaulting to Step 2 as it is the first step
	// User will not be authenticated and will not have settings
	const { currentLabStep, nextLabStep } = settings || {};

	const labStep =
		nextLabStep && currentLabStep != nextLabStep ? nextLabStep : currentLabStep;

	if (labStep) {
		const { getStepPrompts, getStepGuides } = await import(
			'@/lib/db/queries/content'
		);
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
					// Wrap guide so AIya knows it's the guide
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
