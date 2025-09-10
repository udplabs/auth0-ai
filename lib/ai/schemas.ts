// lib/ai/schemas.ts
import { z } from 'zod';

export const ToolResponseSchema = <T extends z.ZodTypeAny>(schema: T) =>
	z.object({
		status: z.enum([
			'success',
			'error',
			'not-found',
			'unauthorized',
			'wrong-tool',
			'input-required',
		]),
		message: z.string().optional(),
		data: schema.optional(),
		dataCount: z.number().min(0),
		hasOwnUI: z.boolean().optional(),
		error: z
			.object({
				code: z.string(),
				message: z.string(),
				cause: z.string().optional(),
				details: z.any().optional(),
			})
			.optional(),
	});

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

// Account type enums
export const AccountTypeSchema = z.enum([
	'deposit',
	'loan',
	'credit',
	'investment',
]);

export const AccountSubTypeSchema = z.enum([
	'checking',
	'savings',
	'mortgage',
	'auto',
	'unsecured',
	'secured',
	'loc',
	'card',
	'heloc',
	'money_market',
	'ira',
	'certificate',
]);

export const AccountStatusSchema = z.enum([
	'active',
	'suspended',
	'repayment',
	'draw',
	'closed',
	'dormant',
	'delinquent',
]);

// Base account schema
export const AccountRootSchema = z.object({
	/**
	 * A unique identifier (i.e. ULID) for the account.
	 */
	id: z
		.string()
		.describe(
			'A unique identifier (i.e. ULID) for the account. Internal use only.'
		),
	customerId: z
		.string()
		.describe(
			'The unique identifier for the customer that owns this account. Internal use only.'
		),
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
	 * The current balance of the account. This is the amount of money currently in the account and may differ from the available balance due to pending transactions.
	 * For loan accounts, this represents the current outstanding balance (i.e. amount owed including principal/interest/fees).
	 */
	balance: z
		.number()
		.default(0)
		.optional()
		.describe(
			'The current balance of the account. For loan accounts, this represents the current outstanding balance.'
		),

	/**
	 * The ISO 4217 currency code (e.g. "USD" for US Dollars, "EUR" for Euros).
	 */
	currencyCode: z
		.string()
		.default('USD')
		.describe(
			'The ISO 4217 currency code (e.g. "USD" for US Dollars, "EUR" for Euros).'
		),

	/**
	 * The ISO 4217 currency name (e.g. "United States Dollar" for USD, "Euro" for EUR).
	 */
	currencyName: z
		.string()
		.default('United States Dollar')
		.describe(
			'The ISO 4217 currency name (e.g. "United States Dollar" for USD, "Euro" for EUR).'
		),

	/**
	 * The symbol used to represent the currency (e.g. "$" for USD, "€" for EUR).
	 */
	currencySymbol: z
		.string()
		.default('$')
		.describe(
			'The symbol used to represent the currency (e.g. "$" for USD, "€" for EUR).'
		),

	/**
	 * The ISO 4217 numeric code for the currency (e.g. 840 for USD, 978 for EUR).
	 */
	currencyNumericCode: z
		.number()
		.default(840)
		.describe(
			'The ISO 4217 numeric code for the currency (e.g. 840 for USD, 978 for EUR).'
		),

	/**
	 * A human-readable name for the account (e.g. "My Checking Account").
	 */
	displayName: z
		.string()
		.optional()
		.describe(
			'A human-readable name for the account (e.g. "My Checking Account").'
		),

	name: z.string(),

	/**
	 * Institution assigned unique identifier for the account. This may be a number or alphanumeric string.
	 * When someone asks a consumer for their account number, this is typically what they are referring to.
	 */
	number: z
		.string()
		.describe('Institution assigned unique identifier for the account.'),

	openedDate: z
		.string()
		.datetime()
		.describe('The date (ISO 8601) the account was opened.'),
	closedDate: z
		.string()
		.datetime()
		.optional()
		.describe('The date (ISO 8601) the account was closed.'),
	routingNumber: z.string(),
	type: AccountTypeSchema,
	status: AccountStatusSchema.default(AccountStatusSchema.enum.active),
	transactions: z
		.array(TransactionSchema)
		.optional()
		.describe('List of transactions associated with this account.'),
	permissions: z
		.array(
			z.enum([
				'can_view',
				'can_view_balances',
				'can_view_transactions',
				'can_transfer',
			])
		)
		.optional()
		.describe('The permissions the user has for this account.'),
	createdAt: z.string(),
	updatedAt: z.string(),
});

export const LoanSubTypeSchema = z.enum([
	'mortgage',
	'auto',
	'unsecured',
	'secured',
]);

export const LoanAccountSchema = AccountRootSchema.extend({
	type: z.literal('loan'),
	subType: LoanSubTypeSchema,

	/**
	 * The calculated payment/balance due on the loan. This may differ from `paymentAmount` if the consumer has paid ahead or is behind on payments.
	 */
	balanceDue: z
		.number()
		.optional()
		.describe('The calculated payment/balance due on the loan.'),

	/**
	 * The current principal balance of the loan. This is the amount that is currently owed (minus interest/fees) on the loan and decreases as payments are made.
	 */
	currentPrincipal: z
		.number()
		.optional()
		.describe('The current principal balance of the loan.'),
	dueDate: z
		.string()
		.datetime()
		.describe('The date (ISO 8601) the balance due is due.'),

	/**
	 * The interest rate of the loan as a percentage (e.g. 5.5 for 5.5% APR).
	 */
	interestRate: z
		.number()
		.describe(
			'The interest rate of the loan as a percentage (e.g. 5.5 for 5.5% APR).'
		),

	/**
	 * The date of the last payment made on the loan.
	 */
	lastPaymentDate: z
		.string()
		.datetime()
		.describe('The date of the last payment made on the loan (ISO 8601).'),

	/**
	 * The date of the next scheduled payment on the loan.
	 */
	nextPaymentDate: z
		.string()
		.datetime()
		.describe('The date of the next scheduled payment on the loan (ISO 8601).'),

	/**
	 * The original opening balance of the loan. This is the amount that was originally borrowed when the loan was first issued and does not change.
	 */
	originalPrincipal: z
		.number()
		.optional()
		.describe('The original opening balance of the loan.'),

	/**
	 * The regular payment amount for the loan. This is typically the amount due each month but can differ from `balanceDue` if the consumer has paid ahead or is behind on payments.
	 */
	paymentAmount: z
		.number()
		.describe('The regular payment amount for the loan.'),

	/**
	 * The agreed upon recurring date a payment is due. This is typically a day of the month (e.g. 15 for the 15th of each month).
	 */
	paymentDate: z
		.number()
		.optional()
		.describe('The agreed upon recurring date a payment is due.'),

	/**
	 * The term of the loan in months (e.g. 60 for a 5-year loan).
	 */
	term: z
		.number()
		.describe('The term of the loan in months (e.g. 60 for a 5-year loan).'),
});

export const CreditSubTypeSchema = z.enum(['loc', 'card', 'heloc']);

// Credit account schema
export const CreditAccountSchema = LoanAccountSchema.omit({
	currentPrincipal: true,
	originalPrincipal: true,
	term: true,
}).extend({
	type: z.literal('credit'),
	subType: CreditSubTypeSchema,

	cardNumber: z.string().optional(),
	creditLimit: z.number().describe('The credit limit of the account.'),

	/**
	 * The minimum payment amount due for the current billing cycle. This is typically a small percentage of the outstanding balance or a fixed dollar amount, whichever is greater.
	 */
	minimumPaymentAmount: z
		.number()
		.describe('The minimum payment amount due for the current billing cycle.'),

	/**
	 * The amount due for the current billing cycle. This is the total amount that must be paid by the `paymentDueDate` to avoid interest charges, late fees or penalties.
	 */
	statementBalance: z
		.number()
		.optional()
		.describe('The amount due for the current billing cycle.'),
});

export const DepositSubTypeSchema = z.enum(['checking', 'savings']);
// Deposit account schema
export const DepositAccountSchema = AccountRootSchema.extend({
	type: z.literal('deposit'),
	subType: DepositSubTypeSchema,

	/**
	 * The available balance of the account. This is the amount of money that is currently available for withdrawal or spending, and may differ from the `balance` due to pending transactions.
	 */
	availableBalance: z
		.number()
		.optional()
		.describe('The available balance of the account.'),

	dividendRate: z.number(),

	/**
	 * The year-to-date interest earned on the account. This is the total amount of interest that has been credited to the account since the beginning of the calendar year.
	 */
	interestYTD: z
		.number()
		.optional()
		.describe('The year-to-date interest earned on the account.'),
});

export const InvestmentSubTypeSchema = z.enum([
	'money_market',
	'ira',
	'certificate',
]);

// Investment account schema
export const InvestmentAccountSchema = DepositAccountSchema.extend({
	type: z.literal('investment'),
	subType: InvestmentSubTypeSchema,

	/**
	 * The cash balance of the investment account. This is the amount of money that is held in cash within the investment account not currently committed to an investment and available for trading or withdrawal.
	 */
	cashBalance: z
		.number()
		.optional()
		.describe('The cash balance of the investment account.'),
});

export const AccountSchema = z.discriminatedUnion('type', [
	DepositAccountSchema,
	CreditAccountSchema,
	LoanAccountSchema,
	InvestmentAccountSchema,
]);

export const Document = z.object({
	id: z
		.string()
		.describe(
			'Typically the `transactionId` or `accountId` of the data in `pageContent`.'
		),
	pageContent: z
		.string()
		.describe(
			'The stringified contents of some data, typically an account or transaction.'
		),
	metadata: z.object({
		accountId: z.string().optional(),
		transactionId: z.string().optional(),
		accountType: z.string().optional(),
		customerId: z.string().optional(),
		modelId: z
			.string()
			.optional()
			.describe('The AI model used to generate the embeddings for a document.'),
		createdAt: z.string().optional(),
		updatedAt: z.string().optional(),
	}),
});

export const DocumentWithScoreSchema = Document.extend({
	score: z.number(),
});

export const SettingsSchema = z.object({
	id: z.string().describe('The userId of the user the settings belong to.'),
	currentLabStep: z.string(),
	labMeta: z.string().optional(),
	preferences: z.string().optional(),
	firstMessage: z.boolean().optional().default(true),
	createdAt: z.string(),
	updatedAt: z.string(),
});

export const ContentSchema = z.object({
	id: z.string(),
	textData: z
		.string()
		.optional()
		.describe(
			'The text of the given content if the mimeType is of `text/*`. This is the value to present to end users if present.'
		),
	applicationData: z
		.json()
		.optional()
		.describe(
			'The data if the mimeType is of `application/*`. Present this value to end users if present.'
		),
	name: z
		.string()
		.describe(
			'A name/code for the content. Not intended to be human readable.'
		),
	contentType: z
		.enum([
			'guide/step',
			'guide/lab',
			'prompt/step',
			'prompt/system',
			'prompt/lab',
			'prompt/unknown',
			'reference/code',
		])
		.describe(
			'The type and subtype of content. Similar to mimetype but more specific to the application domain.'
		),
	labStep: z
		.string()
		.optional()
		.describe(
			'The lab step the content relates to. Steps are formatted as `step-00` where `00` is a zero-padded number. i.e. `step-01` `step-02`, etc.'
		),
	contentPlacement: z
		.enum(['aiya', 'labs', 'secret'])
		.optional()
		.describe(
			'The primary presenter of the content. The platform that will be showing the content. If `aiya` this indicates that the user will consume the content in the chat dialog. If `labs` they will have consumed it via https://labs.demo.okta.com.'
		),
	mimeType: z
		.enum([
			'text/markdown',
			'text/plain',
			'text/html',
			'text/typescript',
			'text/csv',
			'application/json',
			'application/xml',
		])
		.describe('The mime type of the content data (e.g. text/markdown).'),
	createdAt: z.string(),
	updatedAt: z.string().optional(),
});
