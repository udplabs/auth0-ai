import type { Transfer as DBTransfer } from '@/lib/db/generated/prisma';

declare global {
	namespace Transfers {
		interface TransferContext
			extends Omit<
				Transfers.TransactionCreateInput,
				'createdAt' | 'updatedAt' | 'amount'
			> {
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

		interface ToggleModalOptions extends Transfers.TransactionCreateInput {
			open?: boolean;
		}

		interface TransferAction extends Transfers.ToggleModalOptions {
			type: 'OPEN' | 'CLOSE' | 'UPDATE';
		}

		interface Transaction extends Omit<DBTransfer, 'createdAt' | 'updatedAt'> {
			fromAccountNumber: string;
			toAccountNumber: string;
			createdAt: string;
			updatedAt: string;
		}

		type TransactionCreateInput = Partial<Transfers.Transaction>;

		type CreateTransactionInput = Omit<Transfers.Transaction, 'id'>;
	}
}
export {};
