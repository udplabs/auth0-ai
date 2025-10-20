import { relations } from 'drizzle-orm/relations';
import {
	remoteChat,
	remoteMessage,
	remoteSampleAccount,
	remoteSampleTransaction,
} from './schema';

export const remoteMessageRelations = relations(remoteMessage, ({ one }) => ({
	chat: one(remoteChat, {
		fields: [remoteMessage.chatId],
		references: [remoteChat.id],
	}),
}));

export const remoteChatRelations = relations(remoteChat, ({ many }) => ({
	messages: many(remoteMessage),
}));

export const remoteSampleTransactionRelations = relations(
	remoteSampleTransaction,
	({ one }) => ({
		account: one(remoteSampleAccount, {
			fields: [remoteSampleTransaction.accountId],
			references: [remoteSampleAccount.id],
		}),
	})
);

export const remoteSampleAccountRelations = relations(
	remoteSampleAccount,
	({ many }) => ({
		transactions: many(remoteSampleTransaction),
	})
);
