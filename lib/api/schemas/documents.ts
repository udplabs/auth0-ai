import z from 'zod';
import { AccountTypeSchema } from './accounts';
import { TransactionSchema } from './transactions';

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
		accountId: TransactionSchema.shape.accountId.optional(),
		transactionId: TransactionSchema.shape.id.optional(),
		accountType: AccountTypeSchema.optional(),
		customerId: TransactionSchema.shape.customerId.optional(),
		modelId: z
			.string()
			.optional()
			.describe('The AI model used to generate the embeddings for a document.'),
		createdAt: z.string().optional(),
		updatedAt: z.string().optional(),
		date: TransactionSchema.shape.date.optional(),
		amount: TransactionSchema.shape.amount.optional(),
		type: TransactionSchema.shape.type.optional(),
		categoryId: TransactionSchema.shape.categoryId.optional(),
		categoryName: TransactionSchema.shape.categoryName.optional(),
		budgetCategory: TransactionSchema.shape.budgetCategory.optional(),
		budgetSubCategory: TransactionSchema.shape.budgetSubcategory.optional(),
		payee: TransactionSchema.shape.payee.optional(),
		rawPayee: TransactionSchema.shape.rawPayee.optional(),
		isExternal: TransactionSchema.shape.isExternal.optional(),
		externalConnectionId:
			TransactionSchema.shape.externalConnectionId.optional(),
		currencyCode: TransactionSchema.shape.currencyCode.optional(),
	}),
});

export const DocumentWithScoreSchema = Document.extend({
	score: z.number(),
});
