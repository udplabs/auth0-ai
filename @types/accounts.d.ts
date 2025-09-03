declare global {
	namespace Accounts {
		type Type = 'deposit' | 'loan' | 'credit' | 'investment';

		type SubTypesByType = {
			loan: 'mortgage' | 'auto' | 'unsecured' | 'secured';
			credit: 'loc' | 'card' | 'heloc';
			deposit: 'checking' | 'savings';
			investment: 'money_market' | 'ira' | 'certificate';
		};

		type SubTypeOf<T extends Accounts.Type> = SubTypesByType[T];

		interface Root<T extends Accounts.Type, S extends Accounts.SubType> {
			/**
			 * A unique identifier (i.e. ULID) for the account.
			 *
			 * @example `01F8MECHZX3TBDSZ7XRADM79XE` (ULID)
			 */
			id: string;
			/**
			 * The unique identifier for the customer that owns this account. This is typically a ULID or UUID that is unique across all customers in the system.
			 *
			 * @example `01F8MECHZX3TBDSZ7XRADM79XE` (ULID)
			 */
			customerId: string;
			/**
			 * Indicates whether the account is an external account (i.e. connected via a third-party service).
			 */
			isExternal?: boolean;
			/**
			 * The identifier for the external connection/provider where this account was linked from. This corresponds to the Auth0 connection ID used during the OAuth/OpenID Connect authorization flow.
			 */
			externalConnectionId?: string;
			/**
			 * The human-readable name of the external connection/provider (e.g. "Bank Zero", "Bank One").
			 *
			 * @example "Bank Zero"
			 */
			externalConnectionName?: string;
			/**
			 * The current balance of the account. This is the amount of money currently in the account and may differ from the available balance due to pending transactions.
			 *
			 * For loan accounts, this represents the current outstanding balance (i.e. amount owed including principal/interest/fees).
			 */
			balance?: number;
			/**
			 * The ISO 4217 currency code (e.g. "USD" for US Dollars, "EUR" for Euros).
			 *
			 * @example "USD"
			 */
			currencyCode: string;
			/**
			 * The ISO 4217 currency name (e.g. "United States Dollar" for USD, "Euro" for EUR).
			 *
			 * @example "United States Dollar"
			 */
			currencyName: string;
			/**
			 * The symbol used to represent the currency (e.g. "$" for USD, "€" for EUR).
			 *
			 * @example "$"
			 */
			currencySymbol: string;
			/**
			 * The ISO 4217 numeric code for the currency (e.g. 840 for USD, 978 for EUR).
			 *
			 * @example 840
			 */
			currencyNumericCode?: number;
			/**
			 * A human-readable name for the account (e.g. "My Checking Account").
			 */
			displayName?: string;
			name: string;
			/**
			 * Institution assigned unique identifier for the account. This may be a number or alphanumeric string.
			 *
			 * When someone asks a consumer for their account number, this is typically what they are referring to.
			 */
			number: string;
			/**
			 * Date account was opened as an ISO 8601 formatted timestamp.
			 *
			 * @example `new Date().toISOString()` (e.g. `2023-01-01T00:00:00Z`)
			 */
			openedDate: string;
			/**
			 * Date account was closed as an ISO 8601 formatted timestamp. If the account is still open, this will be undefined.
			 *
			 * @example `new Date().toISOString()` (e.g. `2023-01-01T00:00:00Z`)
			 */
			closedDate?: string;
			routingNumber: string;
			type: T;
			subType: S;
			status:
				| 'active'
				| 'suspended'
				| 'repayment'
				| 'draw'
				| 'closed'
				| 'dormant'
				| 'delinquent';
			transactions?: Accounts.Transaction[];
			permissions?: AccountPermissions[];
		}

		type AccountPermissions =
			| 'can_view_balances'
			| 'can_view_transactions'
			| 'can_transfer_funds'
			| 'can_transfer';

		interface LoanRoot {
			/**
			 * The calculated payment/balance due on the loan. This may differ from `paymentAmount` if the consumer has paid ahead or is behind on payments.
			 */
			balanceDue?: number;
			/**
			 * The current principal balance of the loan. This is the amount that is currently owed (minus interest/fees) on the loan and decreases as payments are made.
			 */
			currentPrincipal?: number;
			/**
			 * Represents the date (in ISO 8601 format) the `balanceDue` is due and may different from the `paymentDate` which is the recurring date a payment is expected.
			 *
			 * For example, if a loan payment is normally scheduled for the 15th of each month (`paymentDate`), but the consumer has paid ahead and their next payment is now not due until next month, then `dueDate` would be the calendar date the next payment is actually due (i.e. 15th of the next month).
			 *
			 * @example `new Date().toISOString()` (e.g. `2023-01-01T00:00:00Z`)
			 */
			dueDate: string;
			/**
			 * The interest rate of the loan as a percentage (e.g. 5.5 for 5.5% APR).
			 */
			interestRate: number;
			/**
			 * The date of the last payment made on the loan.
			 *
			 * @example `new Date().toISOString()` (e.g. `2023-01-01T00:00:00Z`)
			 */
			lastPaymentDate?: string;
			/**
			 * The date of the next scheduled payment on the loan.
			 *
			 * @example `new Date().toISOString()` (e.g. `2023-01-01T00:00:00Z`)
			 */
			nextPaymentDate?: string;
			/**
			 * The original opening balance of the loan. This is the amount that was originally borrowed when the loan was first issued and does not change.
			 */
			originalPrincipal?: number;
			/**
			 * The regular payment amount for the loan. This is typically the amount due each month but can differ from `balanceDue` if the consumer has paid ahead or is behind on payments.
			 *
			 * This should be a consistent amount that is agreed upon in the loan terms.
			 */
			paymentAmount: number;
			/**
			 * The agreed upon recurring date a payment is due. This is typically a day of the month (e.g. 15 for the 15th of each month).
			 *
			 * This should not change over the life of the loan unless the loan is modified (e.g. refinanced).
			 */
			paymentDate?: number;
			/**
			 * The term of the loan in months (e.g. 60 for a 5-year loan).
			 */
			term: number;
		}
		/**
		 * A loan account represents a debt obligation, such as a mortgage, auto loan, or personal loan.
		 *
		 * Transactions on a loan account process as credits and debits, where a credit decreases the outstanding balance (e.g. payments made) and a debit increases it (e.g. interest accrued).
		 */
		type LoanFields = Accounts.LoanRoot;
		/**
		 * A credit account represents a line of credit, such as a credit card or a home equity line of credit (HELOC).
		 *
		 * Transactions on a credit account process as credits and debits, where a credit increases the available balance (e.g. payments made) and a debit decreases it (e.g. purchases made).
		 */
		type CreditFields = Omit<
			Accounts.LoanRoot,
			'originalPrincipal' | 'currentPrincipal' | 'term'
		> & {
			cardNumber?: string;
			creditLimit: number;
			/**
			 * The minimum payment amount due for the current billing cycle. This is typically a small percentage of the outstanding balance or a fixed dollar amount, whichever is greater.
			 *
			 * This is the absolute minimum amount that must be paid to avoid late fees or penalties (but not necessarily interest charges).
			 */
			minimumPaymentAmount: number;
			/**
			 * The amount due for the current billing cycle. This is the total amount that must be paid by the `paymentDueDate` to avoid interest charges, late fees or penalties.
			 */
			statementBalance?: number;
		};

		interface DepositRoot {
			/**
			 * The available balance of the account.
			 *
			 * This is the amount of money that is currently available for withdrawal or spending, and may differ from the `balance` due to pending transactions (e.g. holds on deposits, pending withdrawals).
			 */
			availableBalance?: number;
			dividendRate: number;
			/**
			 * The year-to-date interest earned on the account. This is the total amount of interest that has been credited to the account since the beginning of the calendar year.
			 */
			interestYTD?: number;
		}

		type DepositFields = Accounts.DepositRoot;

		type InvestmentFields = Accounts.DepositRoot & {
			/**
			 * The cash balance of the investment account. This is the amount of money that is held in cash within the investment account not currently committed to an investment and available for trading or withdrawal.
			 */
			cashBalance?: number;
		};

		type FieldsByType<T extends Accounts.Type> = T extends 'loan'
			? Accounts.LoanFields
			: T extends 'credit'
				? Accounts.CreditFields
				: T extends 'deposit'
					? Accounts.DepositFields
					: T extends 'investment'
						? Accounts.InvestmentFields
						: never;

		type ConstrainSubType<
			T extends Accounts.Type,
			S extends Accounts.SubType,
		> = T extends keyof SubTypesByType ? Extract<S, SubTypesByType[T]> : never;

		// Use when type is known
		type Account<
			T extends Accounts.Type = Accounts.Type,
			S extends Accounts.SubType = Accounts.SubTypeOf<T & Accounts.Type>,
		> = Accounts.Root<T, Accounts.ConstraintSubType<T, S>> &
			Accounts.FieldsByType<T>;

		type AccountWithoutTransactions<
			T extends Accounts.Type = Accounts.Type,
			S extends Accounts.SubType = Accounts.SubTypeOf<T & Accounts.Type>,
		> = Omit<Accounts.Account<T, S>, 'transactions'>;

		interface CreateAccountInput extends Omit<Accounts.Account, 'id'> {
			openedDate?: Accounts.Account['openedDate'];
			name: Accounts.Account['name'];
			number: Accounts.Account['number'];
			type: Accounts.Type;
			subType: Accounts.SubType;
		}

		interface SeparatedResponse {
			accounts: Accounts.AccountWithoutTransactions[];
			transactions: Accounts.Transaction[];
		}

		interface SeparatedInput {
			accounts: Accounts.CreateAccountInput[];
			transactions?: Accounts.CreateTransactionInput[];
		}
	}

	// interface Currency {
	// 	code: string;
	// 	name: string;
	// 	symbol: string;
	// 	numericCode?: number;
	// }

	interface ExternalConnection {
		id: string;
		name: string;
		description?: string;
	}
}

export {};
