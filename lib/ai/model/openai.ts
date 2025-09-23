// Normally this file would not be necessary.
// In this lab we need to provide API keys that can be expired/rotated
// This requires injecting them instead of providing via environment variables.
// See Vercel documentation for more details: https://ai-sdk.dev/providers/ai-sdk-providers/openai

import { getContentById } from '@/lib/db/queries/content';
import { createOpenAI } from '@ai-sdk/openai';

const { textData: apiKey } =
	(await getContentById('01K4DM9TMMAJ7W8RJSYEQYZSX5')) || {};

export const openai = createOpenAI({
	apiKey: apiKey || process.env.OPENAI_API_KEY || '',
});
