import { updateBalances } from '@/lib/db/queries/accounts/mutate-accounts';
import {
	createTransactions,
	createTransfer,
} from '@/lib/db/queries/accounts/mutate-transactions';
import { getAccountsByAccountId } from '@/lib/db/queries/accounts/query-accounts';

import { APIError } from '@/lib/errors';
import { ulid } from '@/lib/utils';
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
		id: ulid(),
		...transfer,
	});
	const {
		amount,
		createdAt: created_at,
		customerId,
		memo,
		updatedAt: updated_at,
	} = createdTransfer;

	const rootTransaction = {
		amount,
		budgetCategory: 'Transfers',
		budgetCategoryId: 'payments_transfers',
		categoryId: '6012',
		categoryName: 'Transfers',
		created_at,
		customerId,
		description,
		memo,
		tags: ['transfer', 'online', 'aiya'],
		updated_at,
	};
	// Create the transactions in the DB
	await createTransactions([
		{
			...rootTransaction,
			accountId: fromAccountId,
			date: created_at,
			payee: toAccountNumber,
			rawPayee: toAccountNumber,
			type: 'debit',
		},
		{
			...rootTransaction,
			accountId: toAccountId,
			date: created_at,
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
