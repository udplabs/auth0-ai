import type { TransferModelCreate } from '@/lib/db/drizzle/sql/schema';
import type { Accounts } from './accounts';

export namespace Transfers {
	export interface TransferContext extends Partial<CreateTransferInput> {
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
		transferAmountRaw?: string;
		toggleModal: (options?: ToggleModalOptions) => void;
		transferFunds: (options?: ToggleModalOptions) => void;
		fromAccountId?: string;
		fromAccountDisplayName?: string;
		toAccountId?: string;
		toAccountDisplayName?: string;
	}

	interface ToggleModalOptions extends Partial<CreateTransferInput> {
		open?: boolean;
	}

	export interface TransferAction extends ToggleModalOptions {
		type: 'OPEN' | 'CLOSE' | 'UPDATE';
	}

	// interface Transaction extends Omit<TransferModel, 'createdAt' | 'updatedAt'> {
	// 	fromAccountNumber: string;
	// 	toAccountNumber: string;
	// 	createdAt: string;
	// 	updatedAt: string;
	// }

	export interface CreateTransferInput
		extends Omit<TransferModelCreate, 'customerId' | 'memo' | 'description'> {
		customerId?: string;
		fromAccountNumber: string;
		fromAccountDisplayName: string;
		toAccountNumber: string;
		toAccountDisplayName: string;
		memo?: string;
		description?: string;
	}

	// export type CreateTransactionInput = Omit<Transaction, 'id'>;
}
