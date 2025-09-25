// lib/api/schemas/transactions.ts
import z from 'zod';
// Transaction schema
export const TransactionSchema = z.object({
	/**
	 * A unique identifier (i.e. ULID) for the transaction.
	 */
	id: z
		.string()
		.describe(
			'A unique identifier (i.e. ULID) for the transaction. Internal use only.'
		),

	accountId: z.string().describe('The associated account.'),
	customerId: z.string().describe("The associated customer's userId"),
	isExternal: z
		.boolean()
		.optional()
		.describe(
			'Indicates whether the account is an external account (i.e. connected via a third-party service).'
		),
	externalConnectionId: z
		.string()
		.optional()
		.describe(
			'The identifier for the external connection/provider where this account was linked from. This corresponds to the Auth0 connection ID used during the OAuth/OpenID Connect authorization flow.'
		),
	externalConnectionName: z
		.string()
		.optional()
		.describe(
			'The human-readable name of the external connection/provider (e.g. "Bank Zero", "Bank One").'
		),
	/**
	 * The payee of the transaction. This is typically the merchant name for purchases, or the name of the entity involved in other types of transactions.
	 * Should be human-readable and normalized (e.g. "Starbucks" instead of "Starbucks #12345").
	 */
	payee: z
		.string()
		.describe(
			'The payee of the transaction. Should be human-readable and normalized.'
		),

	/**
	 * The raw payee string as provided by the financial institution. This may include additional details such as location, transaction type, or other metadata.
	 */
	rawPayee: z
		.string()
		.describe('The raw payee string as provided by the financial institution.'),

	/**
	 * Description of a transaction that may, or may not, be human readable.
	 * For purchases this is typically the merchant name plus transaction specific data.
	 */
	description: z
		.string()
		.describe(
			'Description of a transaction that may, or may not, be human readable.'
		),

	/**
	 * Typically a human readable memo or note about the transaction. May be added by a user themselves to help them remember the transaction later.
	 */
	memo: z
		.string()
		.optional()
		.describe('A human readable memo or note about the transaction.'),

	amount: z.number(),
	date: z.string().datetime().describe('The date the transaction occurred.'),
	type: z.enum(['credit', 'debit']),

	/**
	 * A code that represents the category of the transaction. This is typically the merchant category code (MCC) for purchases.
	 */
	categoryId: z
		.string()
		.optional()
		.describe(
			'A code that represents the category of the transaction (e.g. MCC).'
		),

	/**
	 * A categorization of the transaction. For purchases this is typically the correlating human-readable mapping of the merchant category code (MCC).
	 */
	categoryName: z.string().describe('A categorization of the transaction.'),

	/**
	 * A unique identifier for a budget category that the transaction has been assigned to.
	 */
	budgetCategoryId: z
		.string()
		.optional()
		.describe('A unique identifier for a budget category.'),

	/**
	 * A budget category that the transaction has been assigned to either automatically or manually by a user.
	 */
	budgetCategory: z
		.string()
		.optional()
		.describe('A budget category that the transaction has been assigned to.'),

	/**
	 * A budget subcategory that the transaction has been assigned to. Used for more granular budgeting and reporting.
	 */
	budgetSubcategory: z
		.string()
		.optional()
		.describe('A budget subcategory for more granular budgeting.'),

	/**
	 * System/AI or user-generated tags that may be applied to the transaction.
	 */
	tags: z
		.array(z.string())
		.optional()
		.describe('System/AI or user-generated tags.'),

	/**
	 * The ISO 4217 currency code (e.g. "USD" for US Dollars, "EUR" for Euros).
	 */
	currencyCode: z
		.string()
		.describe(
			'The ISO 4217 currency code (e.g. "USD" for US Dollars, "EUR" for Euros).'
		),

	/**
	 * The ISO 4217 currency name (e.g. "United States Dollar" for USD, "Euro" for EUR).
	 */
	currencyName: z
		.string()
		.describe(
			'The ISO 4217 currency name (e.g. "United States Dollar" for USD, "Euro" for EUR).'
		),

	/**
	 * The symbol used to represent the currency (e.g. "$" for USD, "€" for EUR).
	 */
	currencySymbol: z
		.string()
		.describe(
			'The symbol used to represent the currency (e.g. "$" for USD, "€" for EUR).'
		),

	/**
	 * The ISO 4217 numeric code for the currency (e.g. 840 for USD, 978 for EUR).
	 */
	currencyNumericCode: z
		.number()
		.describe(
			'The ISO 4217 numeric code for the currency (e.g. 840 for USD, 978 for EUR).'
		),
});
