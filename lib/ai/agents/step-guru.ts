import { openai } from '@/lib/ai/model/openai';
import { getAllStepPrompts } from '@/lib/db/queries/content';
import { sortBy } from '@/lib/utils';
import { Experimental_Agent as Agent } from 'ai';

async function getSystemPrompt() {
	const prompts = await getAllStepPrompts();
	const sortedPrompts = sortBy(prompts, 'name');

	const deriveStepPrompt = `\
		- You are an internal agent whose goal is to derive the user's current lab module before messages are processed by the primary agent (named Aiya).
		- Utilize LAB CONTEXT to narrow down the user's current lab module.
		- Use all provided content to concisely determine the user's current lab module.
		- Make your best effort to output only the lab module: i.e. \`1\`, \`2\`, etc.
		- If you are unable to determine the exact module, narrow the user's intent down to a singular task in less than 10 words.
		- Focus on the most recent user message but use all messages as context.
		`.trim();

	return [deriveStepPrompt, ...sortedPrompts.map((p) => p.textData)].join(
		'\n\n'
	);
}

export const StepGuru = new Agent({
	model: openai('gpt-5-nano'),
	system: await getSystemPrompt(),
});
