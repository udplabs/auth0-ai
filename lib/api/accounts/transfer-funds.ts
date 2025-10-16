import { updateBalances } from '@/lib/db/queries/accounts/mutate-accounts';
import {
	createTransfer,
	saveTransactions,
} from '@/lib/db/queries/accounts/mutate-transactions';
import { getAccountsByAccountId } from '@/lib/db/queries/accounts/query-accounts';

import { APIError } from '@/lib/errors';
import type { Accounts } from '@/types/accounts';
import type { Transfers } from '@/types/transfers';

type TransferFundsResult = {
	fromAccount: Accounts.Account;
	toAccount: Accounts.Account;
};

// TODO: This should be done in a transaction to support rollback
export async function transferFunds({
	fromAccountNumber,
	toAccountNumber,
	fromAccountDisplayName,
	toAccountDisplayName,
	fromAccountId,
	toAccountId,
	description = `Transfer from ${fromAccountNumber}-${fromAccountDisplayName} to ${toAccountNumber}-${toAccountDisplayName}`,
	...transfer
}: Transfers.CreateTransferInput & { customerId: string }) {
	if (fromAccountId === toAccountId) {
		throw new APIError(
			'bad_request:api',
			'From and To accounts must be different.'
		);
	}

	// Create the transfer in the DB
	const createdTransfer = await createTransfer({
		description,
		fromAccountId,
		toAccountId,
		...transfer,
	});
	const { amount, createdAt, customerId, memo, updatedAt } = createdTransfer;

	const rootTransaction = {
		amount,
		budgetCategory: 'Transfers',
		budgetCategoryId: 'payments_transfers',
		categoryId: '6012',
		categoryName: 'Transfers',
		createdAt: createdAt.toISOString(),
		customerId,
		description,
		memo: memo ?? undefined,
		tags: ['transfer', 'online', 'aiya'],
		updatedAt: updatedAt.toISOString(),
		date: createdAt.toISOString(),
	};
	// Create the transactions in the DB
	await saveTransactions([
		{
			...rootTransaction,
			accountId: fromAccountId,
			payee: toAccountNumber,
			rawPayee: toAccountNumber,
			type: 'debit',
		},
		{
			...rootTransaction,
			accountId: toAccountId,
			payee: fromAccountNumber,
			rawPayee: fromAccountNumber,
			type: 'credit',
		},
	]);

	// Update the account balances
	await updateBalances(createdTransfer);

	// Get updated balances
	const [fromAccount, toAccount] = await getAccountsByAccountId([
		fromAccountId,
		toAccountId,
	]);

	return {
		fromAccount,
		toAccount,
	} as TransferFundsResult;
}
