import { relations } from 'drizzle-orm/relations';
import {
	account,
	chat,
	message,
	sampleAccount,
	sampleTransaction,
	transaction,
} from './schema';

export const messageRelations = relations(message, ({ one }) => ({
	chat: one(chat, {
		fields: [message.chatId],
		references: [chat.id],
	}),
}));

export const chatRelations = relations(chat, ({ many }) => ({
	messages: many(message),
}));

export const transactionRelations = relations(transaction, ({ one }) => ({
	account: one(account, {
		fields: [transaction.accountId],
		references: [account.id],
	}),
}));

export const accountRelations = relations(account, ({ many }) => ({
	transactions: many(transaction),
}));

export const sampleTransactionRelations = relations(
	sampleTransaction,
	({ one }) => ({
		sampleAccount: one(sampleAccount, {
			fields: [sampleTransaction.accountId],
			references: [sampleAccount.id],
		}),
	})
);

export const sampleAccountRelations = relations(sampleAccount, ({ many }) => ({
	sampleTransactions: many(sampleTransaction),
}));
