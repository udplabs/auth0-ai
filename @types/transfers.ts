import type { Transfer as TransferModel } from '@/lib/db/generated/prisma';
import type { Accounts } from './accounts';

export namespace Transfers {
	export interface TransferContext
		extends Omit<TransactionCreateInput, 'createdAt' | 'updatedAt' | 'amount'> {
		onChange: React.ChangeEventHandler<HTMLInputElement>;
		open?: boolean;
		selectAccount: ({
			fromAccount,
			toAccount,
		}: {
			fromAccount?: Accounts.Account;
			toAccount?: Accounts.Account;
		}) => void;
		transferAmount?: number;
		toggleModal: (options?: ToggleModalOptions) => void;
		transferFunds: (options?: ToggleModalOptions) => void;
	}

	interface ToggleModalOptions extends TransactionCreateInput {
		open?: boolean;
	}

	export interface TransferAction extends ToggleModalOptions {
		type: 'OPEN' | 'CLOSE' | 'UPDATE';
	}

	interface Transaction extends Omit<TransferModel, 'createdAt' | 'updatedAt'> {
		fromAccountNumber: string;
		toAccountNumber: string;
		createdAt: string;
		updatedAt: string;
	}

	export type TransactionCreateInput = Partial<Transaction>;

	export type CreateTransactionInput = Omit<Transaction, 'id'>;
}
