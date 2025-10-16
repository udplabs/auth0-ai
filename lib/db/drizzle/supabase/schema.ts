import { timestamps } from '@/lib/db/drizzle/supabase/columns.helpers';
import { ulid } from '@/lib/utils';
import { sql } from 'drizzle-orm';
import {
	doublePrecision,
	foreignKey,
	index,
	integer,
	jsonb,
	pgEnum,
	pgPolicy,
	pgTable,
	text,
	timestamp,
} from 'drizzle-orm/pg-core';

export const contentPlacement = pgEnum('ContentPlacement', [
	'aiya',
	'labs',
	'secret',
]);
export type ContentPlacement = (typeof contentPlacement)['enumValues'][number];

export const contentType = pgEnum('ContentType', [
	'guide/step',
	'guide/module',
	'guide/lab',
	'prompt/step',
	'prompt/module',
	'prompt/system',
	'prompt/lab',
	'prompt/unknown',
	'reference/code',
]);
export type ContentType = (typeof contentType)['enumValues'][number];

export const mimeType = pgEnum('MimeType', [
	'text/markdown',
	'text/plain',
	'text/html',
	'text/csv',
	'application/json',
	'application/xml',
	'text/typescript',
]);

export type MimeType = (typeof mimeType)['enumValues'][number];

export const transactionType = pgEnum('TransactionType', ['credit', 'debit']);
export const voteType = pgEnum('VoteType', ['up', 'down']);

export const remoteSampleDocument = pgTable('RemoteSampleDocument', {
	...timestamps,
	id: text().primaryKey().notNull(),
	userId: text().notNull(),
	pageContent: text().notNull(),
	embedding: jsonb().notNull(),
	metadata: jsonb().notNull(),
});

export const remoteContent = pgTable(
	'RemoteContent',
	{
		...timestamps,
		id: text().primaryKey().notNull().default(ulid()),
		textData: text(),
		applicationData: jsonb(),
		name: text().notNull(),
		labStep: text(),
		contentPlacement: contentPlacement(),
		contentType: contentType().default('prompt/unknown').notNull(),
		mimeType: mimeType().default('text/plain').notNull(),
		labModule: integer(),
	},
	(table) => [
		index('RemoteContent_contentPlacement_idx').using(
			'btree',
			table.contentPlacement.asc().nullsLast().op('enum_ops')
		),
		index('RemoteContent_contentType_idx').using(
			'btree',
			table.contentType.asc().nullsLast().op('enum_ops')
		),
		index('RemoteContent_labStep_idx').using(
			'btree',
			table.labStep.asc().nullsLast().op('text_ops')
		),
		index('RemoteContent_mimeType_idx').using(
			'btree',
			table.mimeType.asc().nullsLast().op('enum_ops')
		),
		index('RemoteContent_name_idx').using(
			'btree',
			table.name.asc().nullsLast().op('text_ops')
		),
		pgPolicy('Local app read content', {
			as: 'permissive',
			for: 'select',
			to: ['prisma'],
			using: sql`true`,
		}),
	]
);

export const appInstance = pgTable(
	'AppInstance',
	{
		id: text().primaryKey().notNull(),
		auth0ClientId: text(),
		auth0Domain: text(),
		hashedInstanceId: text(),
	},
	(table) => [
		index('AppInstance_auth0ClientId_idx').using(
			'btree',
			table.auth0ClientId.asc().nullsLast().op('text_ops')
		),
		index('AppInstance_auth0Domain_idx').using(
			'btree',
			table.auth0Domain.asc().nullsLast().op('text_ops')
		),
		index('AppInstance_hashedInstanceId_idx').using(
			'btree',
			table.hashedInstanceId.asc().nullsLast().op('text_ops')
		),
	]
);

export const remoteSettings = pgTable(
	'RemoteSettings',
	{
		...timestamps,
		id: text().primaryKey().notNull(),
		currentLabStep: text(),
		labMeta: text(),
		preferences: text(),
		appInstanceId: text(),
		nextLabStep: text(),
		currentModule: integer(),
		currentStep: integer(),
		currentTask: integer(),
	},
	(table) => [
		index('RemoteSettings_appInstanceId_idx').using(
			'btree',
			table.appInstanceId.asc().nullsLast().op('text_ops')
		),
	]
);

export const remoteChat = pgTable(
	'RemoteChat',
	{
		...timestamps,
		id: text().primaryKey().notNull().default(ulid()),
		userId: text(),
		title: text(),
		appInstanceId: text(),
	},
	(table) => [
		index('RemoteChat_appInstanceId_idx').using(
			'btree',
			table.appInstanceId.asc().nullsLast().op('text_ops')
		),
		index('RemoteChat_userId_idx').using(
			'btree',
			table.userId.asc().nullsLast().op('text_ops')
		),
	]
);

export const remoteMessage = pgTable(
	'RemoteMessage',
	{
		...timestamps,
		id: text().primaryKey().notNull(),
		chatId: text()
			.references(() => remoteChat.id, { onDelete: 'cascade' })
			.notNull(),
		userId: text(),
		role: text().notNull(),
		parts: jsonb().notNull(),
		metadata: jsonb(),
		attachments: jsonb(),
		vote: voteType(),
	},
	(table) => [
		index('RemoteMessage_chatId_idx').using(
			'btree',
			table.chatId.asc().nullsLast().op('text_ops')
		),
		index('RemoteMessage_userId_idx').using(
			'btree',
			table.userId.asc().nullsLast().op('text_ops')
		),
		foreignKey({
			columns: [table.chatId],
			foreignColumns: [remoteChat.id],
			name: 'RemoteMessage_chatId_fkey',
		})
			.onUpdate('cascade')
			.onDelete('cascade'),
	]
);

export const remoteSampleAccount = pgTable(
	'RemoteSampleAccount',
	{
		...timestamps,
		id: text().primaryKey().notNull(),
		customerId: text().notNull(),
		balance: doublePrecision().notNull(),
		currencyCode: text().default('USD'),
		currencyName: text().default('US Dollar'),
		currencySymbol: text().default('$'),
		currencyNumericCode: doublePrecision().default(840),
		displayName: text(),
		name: text().notNull(),
		number: text().notNull(),
		openedDate: timestamp({
			precision: 3,
			mode: 'string',
			withTimezone: true,
		}).notNull(),
		closedDate: timestamp({ precision: 3, mode: 'string', withTimezone: true }),
		routingNumber: text().notNull(),
		type: text().notNull(),
		subType: text(),
		status: text().default('active'),
		balanceDue: doublePrecision(),
		currentPrincipal: doublePrecision(),
		dueDate: timestamp({ precision: 3, mode: 'string', withTimezone: true }),
		interestRate: doublePrecision(),
		lastPaymentDate: timestamp({
			precision: 3,
			mode: 'string',
			withTimezone: true,
		}),
		nextPaymentDate: timestamp({
			precision: 3,
			mode: 'string',
			withTimezone: true,
		}),
		originalPrincipal: doublePrecision(),
		paymentAmount: doublePrecision(),
		paymentDate: integer(),
		term: integer(),
		cardNumber: text(),
		creditLimit: doublePrecision(),
		minimumPaymentAmount: doublePrecision(),
		statementBalance: doublePrecision(),
		availableBalance: doublePrecision(),
		dividendRate: doublePrecision(),
		interestYTD: doublePrecision(),
		cashBalance: doublePrecision(),
	},
	(table) => [
		index('RemoteSampleAccount_customerId_idx').using(
			'btree',
			table.customerId.asc().nullsLast().op('text_ops')
		),
	]
);

export const remoteSampleTransaction = pgTable(
	'RemoteSampleTransaction',
	{
		...timestamps,
		id: text().primaryKey().notNull(),
		accountId: text()
			.references(() => remoteSampleAccount.id, { onDelete: 'cascade' })
			.notNull(),
		customerId: text().notNull(),
		payee: text().notNull(),
		rawPayee: text().notNull(),
		description: text().notNull(),
		memo: text(),
		amount: doublePrecision().notNull(),
		date: timestamp({ precision: 3, mode: 'string', withTimezone: true }),
		type: transactionType().notNull(),
		categoryId: text(),
		categoryName: text().notNull(),
		budgetCategoryId: text(),
		budgetCategory: text(),
		budgetSubcategory: text(),
		tags: jsonb(),
		currencyCode: text().default('USD'),
		currencyName: text().default('United States Dollar'),
		currencySymbol: text().default('$'),
		currencyNumericCode: doublePrecision().default(840),
	},
	(table) => [
		index('RemoteSampleTransaction_accountId_idx').using(
			'btree',
			table.accountId.asc().nullsLast().op('text_ops')
		),
		index('RemoteSampleTransaction_customerId_idx').using(
			'btree',
			table.customerId.asc().nullsLast().op('text_ops')
		),
		foreignKey({
			columns: [table.accountId],
			foreignColumns: [remoteSampleAccount.id],
			name: 'RemoteSampleTransaction_accountId_fkey',
		})
			.onUpdate('cascade')
			.onDelete('cascade'),
	]
);
