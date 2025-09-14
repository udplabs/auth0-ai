import { getUser } from '@/lib/auth0';
import { createTransfer } from '@/lib/db/queries/accounts/mutate-transactions';
import { tool } from 'ai';
import { z } from 'zod';
import {
	AccountRootSchema,
	ToolResponseSchema,
	TransactionSchema,
} from '../schemas';

export const inputSchema = z.object({
	fromAccountId: AccountRootSchema.shape.id,
	fromAccountNumber: AccountRootSchema.shape.number,
	toAccountId: AccountRootSchema.shape.id,
	toAccountNumber: AccountRootSchema.shape.number,
	amount: TransactionSchema.shape.amount,
	description: TransactionSchema.shape.description,
	memo: TransactionSchema.shape.memo,
});
export const outputSchema = ToolResponseSchema(z.object({}));

export const transferFunds = tool<
	z.infer<typeof inputSchema>,
	z.infer<typeof outputSchema>
>({
	name: 'transferFunds',
	description:
		'Use this tool to transfer funds on behalf of a user. It requires both the to and from internal account identifiers (ULIDs) in addition to the fully qualified account numbers. Before requesting account numbers and identifiers from the user, attempt to retrieve the data using getAccounts. Avoid asking the user for account numbers. Confirm with the user before completing the transfer but do not require them to provide account numbers unless absolutely necessary.',
	inputSchema,
	outputSchema,
	execute: async ({
		fromAccountId,
		fromAccountNumber,
		toAccountId,
		toAccountNumber,
		amount,
		description,
		memo = null,
	}) => {
		try {
			const user = await getUser();

			// Check to make sure from and to accounts are not the same
			if (fromAccountId === toAccountId) {
				return {
					status: 'error',
					message: 'From and To accounts must be different.',
					dataCount: 0,
				};
			}

			await createTransfer({
				fromAccountId,
				toAccountId,
				fromAccountNumber,
				toAccountNumber,
				amount,
				description,
				memo,
				customerId: user.sub,
			});

			return {
				status: 'success',
				message: 'Transfer successful.',
				dataCount: 0,
			};
		} catch (error: unknown) {
			console.log('error creating transfer...');
			console.log(error);

			const { APIError } = await import('@/lib/errors');

			return {
				...new APIError(error).toJSON(),
				status: 'error',
				message: 'Failed to create transfer.',
				dataCount: 0,
			};
		}
	},
});
