import { timestamps } from '@/lib/db/drizzle/sql/columns.helpers';
import { ulid } from '@/lib/utils';
import { sql } from 'drizzle-orm';
import {
	blob,
	index,
	integer,
	real,
	sqliteTable,
	text,
} from 'drizzle-orm/sqlite-core';

export type AccountModel = typeof account.$inferSelect & {
	transactions?: TransactionModel[];
};
export type AccountModelCreate = typeof account.$inferInsert & {
	transactions?: TransactionModelCreate[];
};
export type TransactionModel = typeof transaction.$inferSelect;
export type TransactionModelCreate = typeof transaction.$inferInsert;
export type TransferModel = typeof transfer.$inferSelect;
export type TransferModelCreate = typeof transfer.$inferInsert;
export type ChatModel = typeof chat.$inferSelect & {
	messages?: MessageModel[];
};
export type ChatModelCreate = typeof chat.$inferInsert;
export type MessageModel = typeof message.$inferSelect;
export type MessageModelCreate = typeof message.$inferInsert;
export type SettingsModel = typeof settings.$inferSelect;

export const account = sqliteTable(
	'Account',
	{
		...timestamps,
		id: text().primaryKey().default(ulid()).notNull(),
		customerId: text().notNull(),
		isExternal: integer({ mode: 'boolean' }).default(false).notNull(),
		externalConnectionId: text(),
		externalConnectionName: text(),
		balance: real().notNull(),
		currencyCode: text().default('USD'),
		currencyName: text().default('US Dollar'),
		currencySymbol: text().default('$'),
		currencyNumericCode: real().default(840),
		displayName: text(),
		name: text().notNull(),
		number: text().notNull(),
		openedDate: integer({ mode: 'timestamp_ms' }).notNull(),
		closedDate: integer({ mode: 'timestamp_ms' }),
		routingNumber: text().notNull(),
		type: text().notNull(),
		subType: text(),
		status: text().default('active'),
		balanceDue: real(),
		currentPrincipal: real(),
		dueDate: integer({ mode: 'timestamp_ms' }),
		interestRate: real(),
		lastPaymentDate: integer({ mode: 'timestamp_ms' }),
		nextPaymentDate: integer({ mode: 'timestamp_ms' }),
		originalPrincipal: real(),
		paymentAmount: real(),
		paymentDate: integer(),
		term: integer(),
		cardNumber: text(),
		creditLimit: real(),
		minimumPaymentAmount: real(),
		statementBalance: real(),
		availableBalance: real(),
		dividendRate: real(),
		interestYtd: real(),
		cashBalance: real(),
	},
	(table) => [
		index('Account_externalConnectionId_idx').on(table.externalConnectionId),
		index('Account_customerId_idx').on(table.customerId),
		index('Account_number_idx').on(table.number),
		index('Account_status_idx').on(table.status),
		index('Account_type_idx').on(table.type),
	]
);

export const message = sqliteTable(
	'Message',
	{
		...timestamps,
		id: text().primaryKey().notNull(),
		chatId: text()
			.notNull()
			.references(() => chat.id, { onDelete: 'cascade', onUpdate: 'cascade' }),
		userId: text(),
		role: text().notNull(),
		parts: text({ mode: 'json' }).notNull(),
		metadata: text({ mode: 'json' }),
		attachments: blob(),
		vote: text({ enum: ['up', 'down'] }),
	},
	(table) => [
		index('Message_userId_idx').on(table.userId),
		index('Message_chatId_idx').on(table.chatId),
	]
);

export const chat = sqliteTable(
	'Chat',
	{
		...timestamps,
		id: text().primaryKey().notNull(),
		userId: text(),
		title: text(),
	},
	(table) => [index('Chat_userId_idx').on(table.userId)]
);

export const transfer = sqliteTable(
	'Transfer',
	{
		...timestamps,
		id: text().primaryKey().default(ulid()).notNull(),
		customerId: text().notNull(),
		fromAccountId: text().notNull(),
		toAccountId: text().notNull(),
		description: text().notNull(),
		memo: text(),
		amount: real().notNull(),
		currencyCode: text().default('USD'),
		currencyName: text().default('US Dollar'),
		currencyNumericCode: real().default(840),
		currencySymbol: text().default('$'),
	},
	(table) => [
		index('Transfer_toAccountId_idx').on(table.toAccountId),
		index('Transfer_fromAccountId_idx').on(table.fromAccountId),
	]
);

export const transaction = sqliteTable(
	'Transaction',
	{
		...timestamps,
		id: text().primaryKey().default(ulid()).notNull(),
		accountId: text()
			.notNull()
			.references(() => account.id, {
				onDelete: 'cascade',
				onUpdate: 'cascade',
			}),
		customerId: text().notNull(),
		isExternal: integer({ mode: 'boolean' }).default(false).notNull(),
		externalConnectionId: text(),
		externalConnectionName: text(),
		payee: text().notNull(),
		rawPayee: text().notNull(),
		description: text().notNull(),
		memo: text(),
		amount: real().notNull(),
		date: integer({ mode: 'timestamp_ms' })
			.default(sql`(unixepoch() * 1000)`)
			.notNull(),
		type: text().notNull(),
		categoryId: text(),
		categoryName: text().notNull(),
		budgetCategoryId: text(),
		budgetCategory: text(),
		budgetSubcategory: text(),
		tags: text({ mode: 'json' }),
		currencyCode: text().default('USD'),
		currencyName: text().default('United States Dollar'),
		currencySymbol: text().default('$'),
		currencyNumericCode: real().default(840),
	},
	(table) => [
		index('Transaction_externalConnectionId_idx').on(
			table.externalConnectionId
		),
		index('Transaction_budgetSubcategory_idx').on(table.budgetSubcategory),
		index('Transaction_budgetCategory_idx').on(table.budgetCategory),
		index('Transaction_categoryName_idx').on(table.categoryName),
		index('Transaction_type_idx').on(table.type),
		index('Transaction_date_idx').on(table.date),
		index('Transaction_customerId_idx').on(table.customerId),
		index('Transaction_accountId_idx').on(table.accountId),
	]
);

export const sampleAccount = sqliteTable(
	'SampleAccount',
	{
		id: text().primaryKey().notNull(),
		customerId: text().notNull(),
		balance: real().notNull(),
		currencyCode: text().default('USD'),
		currencyName: text().default('US Dollar'),
		currencySymbol: text().default('$'),
		currencyNumericCode: real().default(840),
		displayName: text(),
		name: text().notNull(),
		number: text().notNull(),
		openedDate: integer({ mode: 'timestamp_ms' }).notNull(),
		closedDate: integer({ mode: 'timestamp_ms' }),
		routingNumber: text().notNull(),
		type: text().notNull(),
		subType: text(),
		status: text().default('active'),
		balanceDue: real(),
		currentPrincipal: real(),
		dueDate: integer({ mode: 'timestamp_ms' }),
		interestRate: real(),
		lastPaymentDate: integer({ mode: 'timestamp_ms' }),
		nextPaymentDate: integer({ mode: 'timestamp_ms' }),
		originalPrincipal: real(),
		paymentAmount: real(),
		paymentDate: integer(),
		term: integer(),
		cardNumber: text(),
		creditLimit: real(),
		minimumPaymentAmount: real(),
		statementBalance: real(),
		availableBalance: real(),
		dividendRate: real(),
		interestYTD: real(),
		cashBalance: real(),
		createdAt: timestamps.createdAt,
		lastSyncedAt: integer({ mode: 'timestamp_ms' }),
		expiresAt: integer({ mode: 'timestamp_ms' }),
	},
	(table) => [index('SampleAccount_customerId_idx').on(table.customerId)]
);

export const sampleTransaction = sqliteTable(
	'SampleTransaction',
	{
		id: text().primaryKey().notNull(),
		accountId: text()
			.notNull()
			.references(() => sampleAccount.id, {
				onDelete: 'cascade',
				onUpdate: 'cascade',
			}),
		customerId: text().notNull(),
		payee: text().notNull(),
		rawPayee: text().notNull(),
		description: text().notNull(),
		memo: text(),
		amount: real().notNull(),
		date: integer({ mode: 'timestamp_ms' }).notNull(),
		type: text({ enum: ['credit', 'debit'] }).notNull(),
		categoryId: text(),
		categoryName: text().notNull(),
		budgetCategoryId: text(),
		budgetCategory: text(),
		budgetSubcategory: text(),
		tags: text({ mode: 'json' }),
		currencyCode: text().default('USD'),
		currencyName: text().default('United States Dollar'),
		currencySymbol: text().default('$'),
		currencyNumericCode: real().default(840),
		createdAt: timestamps.createdAt,
		lastSyncedAt: integer({ mode: 'timestamp_ms' }),
		expiresAt: integer({ mode: 'timestamp_ms' }),
	},
	(table) => [
		index('SampleTransaction_customerId_idx').on(table.customerId),
		index('SampleTransaction_accountId_idx').on(table.accountId),
	]
);

export const settings = sqliteTable('Settings', {
	...timestamps,
	id: text().primaryKey().notNull(),
	currentModule: integer(),
	currentStep: integer(),
	currentTask: integer(),
	currentLabStep: text(),
	nextLabStep: text(),
	labMeta: text(),
	preferences: text(),
});

export const localContent = sqliteTable(
	'LocalContent',
	{
		...timestamps,
		id: text().primaryKey().notNull(),
		textData: text(),
		applicationData: text({ mode: 'json' }),
		name: text().notNull(),
		labStep: text(),
		labModule: integer(),
		contentPlacement: text({ enum: ['aiya', 'labs', 'secret'] }),
		contentType: text({
			enum: [
				'guide/step',
				'guide/module',
				'guide/lab',
				'prompt/step',
				'prompt/module',
				'prompt/system',
				'prompt/lab',
				'prompt/unknown',
				'reference/code',
			],
		})
			.default('prompt/unknown')
			.notNull(),
		mimeType: text({
			enum: [
				'text/markdown',
				'text/plain',
				'text/html',
				'text/csv',
				'application/json',
				'application/xml',
				'text/typescript',
			],
		})
			.default('text/plain')
			.notNull(),
		lastSyncedAt: integer({ mode: 'timestamp_ms' }),
		expiresAt: integer({ mode: 'timestamp_ms' }),
	},
	(table) => [
		index('LocalContent_mimeType_idx').on(table.mimeType),
		index('LocalContent_contentType_idx').on(table.contentType),
		index('LocalContent_labStep_idx').on(table.labStep),
		index('LocalContent_name_idx').on(table.name),
		index('LocalContent_contentPlacement_idx').on(table.contentPlacement),
	]
);
