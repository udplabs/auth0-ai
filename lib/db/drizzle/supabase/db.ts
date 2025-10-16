import { DB_POSTGRES_URL } from '@/lib/constants';
import { eq } from 'drizzle-orm';
import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';

import * as relations from '@/lib/db/drizzle/supabase/relations';
import * as schema from '@/lib/db/drizzle/supabase/schema';
import {
	remoteSampleAccount,
	remoteSampleTransaction,
} from '@/lib/db/drizzle/supabase/schema';

import type { Accounts } from '@/types/accounts';
import type { Transactions } from '@/types/transactions';

const client = postgres(DB_POSTGRES_URL, { prepare: false });
export const db = drizzle(client, { schema: { ...schema, ...relations } });

type RemoteSampleAccountModel = typeof remoteSampleAccount.$inferSelect;
type RemoteSampleTransactionModel = typeof remoteSampleTransaction.$inferSelect;

export async function getRemoteSampleAccounts(
	customerId: string
): Promise<RemoteSampleAccountModel[]> {
	return await db
		.select()
		.from(remoteSampleAccount)
		.where(eq(remoteSampleAccount.customerId, customerId));
}

export async function getRemoteSampleTransactions(
	customerId: string
): Promise<RemoteSampleTransactionModel[]> {
	return await db
		.select()
		.from(remoteSampleTransaction)
		.where(eq(remoteSampleTransaction.customerId, customerId));
}

const stripNullValues = <T>(arr: T[]) => {
	return arr.map((obj) => {
		for (const key in obj) {
			if (obj[key] === null) {
				delete obj[key];
			}
		}
		return obj;
	});
};

const parseCurrency = <
	T extends
		| Accounts.CreateAccountInput
		| Transactions.CreateTransactionInput = Accounts.CreateAccountInput,
>(
	obj?: T
) => {
	const currencyFields = [
		'balance',
		'balanceDue',
		'currentPrincipal',
		'originalPrincipal',
		'monthlyPayment',
		'paymentAmount',
		'creditLimit',
		'minimumPaymentAmount',
		'statementBalance',
		'availableBalance',
		'amount',
	] as const;

	let currencySymbol = obj?.currencySymbol || '$';

	for (const key in obj) {
		if (currencyFields.includes(key as any)) {
			const value = (obj as any)[key];

			if (value) {
				const { amount, currencySymbol: _currencySymbol } = parseCurrencyValue(
					value,
					currencySymbol
				);

				(obj as any)[key] = amount;
				currencySymbol = _currencySymbol;
			}
		}
	}

	return obj ?? ({} as T);
};

function parseCurrencyValue(value?: string | number, currencySymbol = '$') {
	if (!value) return { amount: '0.00', currencySymbol };

	if (typeof value === 'number') {
		return { amount: value.toFixed(5), currencySymbol };
	}

	let amount = value?.trim() ?? '0.00';

	// Normalize common negative formats: ($12.34) -> -$12.34
	if (/^\(\s*.+\s*\)$/.test(amount)) {
		amount = '-' + amount.slice(1, -1).trim();
	}

	// Pattern parts:
	// ^\s*                optional leading space
	// (?<sign>[-+])?      optional leading sign
	// (?<sym>\p{Sc}|[A-Z]{3})? optional currency symbol (Unicode Sc) OR 3-letter code
	// \s*                 optional space
	// Or symbol after sign: sign then symbol
	const currencyPattern = new RegExp(
		'^\\s*(?<sign1>[-+])?\\s*(?<sym1>\\p{Sc}|[A-Z]{3})?\\s*(?<sign2>[-+])?\\s*(?<rest>.*)$',
		'u'
	);

	const m = amount.match(currencyPattern);

	if (m) {
		const { sign1, sign2, rest } = m.groups as Record<
			string,
			string | undefined
		>;
		// Consolidate sign (prefer first found)
		currencySymbol = sign1 || sign2 || '';
		// Remove a trailing currency symbol if user typed like 12.34$
		amount = rest?.trim() ?? '';

		amount = amount.replace(/^(\p{Sc}|[A-Z]{3})\s*/u, '');
	}

	// Final clean: strip any lingering leading currency symbol
	amount = amount.replace(/^\p{Sc}/u, '').trim();

	// Remove any thousands separators (comma, space, underscore)
	amount = amount.replace(/[, _]/g, '');

	// Keep only first decimal point
	const firstDot = amount.indexOf('.');
	if (firstDot !== -1) {
		const before = amount.slice(0, firstDot + 1);
		const after = amount.slice(firstDot + 1).replace(/\./g, ''); // remove additional dots
		amount = before + after;
	}

	// Validate numeric
	if (!/^[+-]?\d*(\.\d+)?$/.test(amount)) {
		amount = '0.00';
	}

	// Parse and format to 5 decimal places (matches existing precision: 20, scale: 5)
	const num = Number(amount);

	if (!isFinite(num)) {
		amount = '0.00';
	} else {
		amount = num.toFixed(5);
	}

	return { amount, currencySymbol };
}
