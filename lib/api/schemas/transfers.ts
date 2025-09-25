import z from 'zod';
import { AccountRootSchema } from './accounts';
import { TransactionSchema } from './transactions';

export const CreateTransferSchema = z.object({
	fromAccountId: AccountRootSchema.shape.id,
	fromAccountNumber: AccountRootSchema.shape.number,
	fromAccountDisplayName: z.string(),
	toAccountId: AccountRootSchema.shape.id,
	toAccountNumber: AccountRootSchema.shape.number,
	toAccountDisplayName: z.string(),
	amount: TransactionSchema.shape.amount,
	description: TransactionSchema.shape.description.optional(),
	customerId: TransactionSchema.shape.customerId.optional(),
	currencyCode: TransactionSchema.shape.currencyCode.optional(),
	currencyName: TransactionSchema.shape.currencyName.optional(),
	currencySymbol: TransactionSchema.shape.currencySymbol.optional(),
	currencyNumericCode: TransactionSchema.shape.currencyNumericCode.optional(),
	id: z.string().optional(),
});
