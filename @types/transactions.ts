// @types/transactions.ts
export namespace Transactions {
	export interface Transaction {
		/**
		 * A unique identifier (i.e. ULID) for the transaction.
		 *
		 * @example `01K1V3RS081F1VYSC3WF40E1TD` (ULID)
		 */
		id: string;
		accountId: string;
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
		 * The payee of the transaction. This is typically the merchant name for purchases, or the name of the entity involved in other types of transactions (e.g. "ACME Corp" for a payroll deposit).
		 *
		 * Should be human-readable and normalized (e.g. "Starbucks" instead of "Starbucks #12345").
		 *
		 * Derived from `raw_payee` initially, but may be modified by the user.
		 */
		payee: string;
		/**
		 * The raw payee string as provided by the financial institution. This may include additional details such as location, transaction type, or other metadata that is not part of the normalized `payee` field.
		 */
		rawPayee: string;
		/**
		 * Description of a transaction that may, or may not, be human readable.
		 *
		 * For purchases this is typically the merchant name plus transaction specific data like an identifier. For other transactions it may be a system generated description.
		 */
		description: string;
		/**
		 * Typically a human readable memo or note about the transaction. May be added by a user themselves to help them remember the transaction later.
		 */
		memo?: string;
		amount: number;
		/**
		 * The date the transaction was posted to the account as an ISO 8601 formatted timestamp.
		 *
		 * @example `new Date().toISOString()` (e.g. `2023-01-01T00:00:00Z`)
		 */
		date: string;
		type: 'credit' | 'debit';
		/**
		 * A code that represents the category of the transaction. This is typically the merchant category code (MCC) for purchases that can be correlated to a user-readable category.
		 *
		 * @example `5812`
		 */
		categoryId?: string;
		/**
		 * A categorization of the transaction. For purchases this is typically the correlating human-readable mapping of the merchant category code (MCC) (`categoryId`).
		 *
		 * @example `Eating Places/Restaurants`
		 */
		categoryName: string;
		/**
		 * A unique identifier for a budget category that the transaction has been assigned to. This is system generated based on system/user defined budget categories (`budgetCategory`).
		 */
		budgetCategoryId?: string;
		/**
		 * A budget category that the transaction has been assigned to either automatically or manually by a user. This may be user-defined or system/AI generated but comes from a system enumerated list of categories.
		 *
		 * @example `Food/Dining` or `Income`
		 */
		budgetCategory?: string;
		/**
		 * A budget subcategory that the transaction has been assigned to. This may be user-defined or system/AI generated.
		 *
		 * Used for more granular budgeting and reporting.
		 *
		 * @example `Fast Food` or `Coffee Shops`
		 */
		budgetSubcategory?: string;
		/**
		 * System/AI or user-generated tags that may be applied to the transaction.
		 *
		 * Tags help describe the transaction in a more flexible way than categories.
		 *
		 * @example `["business", "travel", "food"]`
		 */
		tags?: string[];
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
		currencyNumericCode: number;
	}

	export type CreateTransactionInput = Omit<Transaction, 'id'>;
}
