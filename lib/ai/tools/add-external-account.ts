// import { APIError } from '@/lib/errors';
import { tool } from 'ai';
import { z } from 'zod';
import { ToolResponseSchema } from '../schemas';

/**
 * The `id` should be the Auth0 connection identifier as it will be directly translated into the /authorize URL
 */
const BANK_CONNECTIONS = [
	{ id: 'bank-zero', name: 'Bank Zero' },
	{ id: 'bank-one', name: 'Bank One' },
];

const BankId = z.enum(
	BANK_CONNECTIONS.map((b) => b.id) as [
		(typeof BANK_CONNECTIONS)[number]['id'],
		...string[],
	]
);

const BankConnectionSchema = z.object({
	id: BankId,
	name: z.string(),
	description: z.string().optional(),
});

const OutputSchema = ToolResponseSchema(
	z
		.array(BankConnectionSchema)
		.describe('The list of available bank connections to choose from.')
);

export const addExternalAccount = tool<object, z.infer<typeof OutputSchema>>({
	description:
		'Initiates an authorization flow via Auth0 to an external identity provider. For this demo application the external provider is a mock external bank. The user will authenticate using a demo set of credentials provided to them in advance in the lab guide. This is a multi-step tool that requires input from the user (if it cannot be inferred from their prompt). If it can be inferred, provide \`overrideStep: step-2\` to skip ahead.',
	name: 'addExternalAccount',
	inputSchema: z.object(),
	outputSchema: OutputSchema,
	execute: async () => {
		console.log('addExternalAccount tool called');

		// We don't really need to check for an authenticated user as we are going to be authenticating.

		return {
			status: 'input-required',
			dataCount: BANK_CONNECTIONS.length,
			message: '**DO NOT RESPOND WITH TEXT. TOOL HAS GENERATIVE UI.**',
			hasOwnUI: true,
			data: z.array(BankConnectionSchema).parse(BANK_CONNECTIONS),
		};
	},
});
