import type {
	AccountModel,
	AccountModelCreate,
	TransactionModel,
	TransactionModelCreate,
} from '@/lib/db/drizzle/sql/schema';
import { getDateTime, ulid } from '@/lib/utils';
import type { Accounts } from '@/types/accounts';
import type { Transactions } from '@/types/transactions';

const omitAlways = new Set<keyof any>(['expiresAt', 'lastSyncedAt']);
const dateFields = new Set<keyof any>([
	'openedDate',
	'closedDate',
	'lastPaymentDate',
	'nextPaymentDate',
	'dueDate',
	'date',
	'createdAt',
	'updatedAt',
]);

export function UIAccounts(
	accounts: AccountModel[]
): Accounts.AccountWithoutTransactions[] {
	return accounts.map((a) => UIAccount(a));
}

export function UIAccount(
	account: AccountModel
): Accounts.AccountWithoutTransactions {
	const uiAccount = convertToUI<
		AccountModel,
		Accounts.AccountWithoutTransactions
	>(account);

	return uiAccount;
}

export function DBAccounts(
	accounts: Accounts.CreateAccountInputWithoutTransactions[]
): AccountModelCreate[] {
	return accounts.map((a) => DBAccount(a));
}

export function DBAccount(
	account: Accounts.CreateAccountInputWithoutTransactions
): AccountModelCreate {
	const { id = ulid(), ...rest } = account;

	return convertToDB<Accounts.CreateAccountInput, AccountModelCreate>({
		id,
		...rest,
	});
}

export function UITransactions(transactions: TransactionModel[]) {
	return transactions.map((tx) => UITransaction(tx));
}

export function UITransaction(transaction: TransactionModel) {
	return convertToUI<TransactionModel, Transactions.Transaction>(transaction);
}

export function DBTransaction(
	transaction: Transactions.CreateTransactionInput
): TransactionModelCreate {
	return {
		currencyCode: 'USD',
		currencyName: 'United States Dollar',
		currencySymbol: '$',
		currencyNumericCode: 840,
		...convertToDB<Transactions.CreateTransactionInput, TransactionModelCreate>(
			transaction
		),
		isExternal: transaction?.isExternal || false,
	};
}

// ---- HELPER FUNCTIONS --- //

function convertToUI<I extends object, T extends object>(input: I): T {
	const out: Record<string, unknown> = {};
	for (const [key, value] of Object.entries(input)) {
		if (value == null || omitAlways.has(key)) continue;
		out[key as string] = value instanceof Date ? getDateTime(value) : value;
	}
	return out as T;
}

function convertToDB<I extends object, T extends object>(input: I): T {
	const out: Record<string, unknown> = {};
	for (const [key, value] of Object.entries(input)) {
		if (value === undefined) {
			out[key] = null;
			continue;
		}
		if (dateFields.has(key) && typeof value === 'string') {
			out[key] = getDateTime(value, 'date');
			continue;
		}
		out[key] = value;
	}
	return out as T;
}
