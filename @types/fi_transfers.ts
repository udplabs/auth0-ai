declare global {
	namespace Transfers {
			interface TransferContext {
		fromAccountId?: string;
		onChange: React.ChangeEventHandler<HTMLInputElement>;
		open?: boolean;
		selectAccount: (options?: ToggleModalOptions) => void;
		toAccountId?: string;
		transferAmount?: number;
		toggleModal: (options?: ToggleModalOptions) => void;
		transferFunds: (options?: ToggleModalOptions) => void;
	}

	interface ToggleModalOptions {
		open?: boolean;
		from?: string;
		to?: string;
		amount?: number;
	}

	interface TransferAction extends TransferContext {
		type: 'OPEN' | 'CLOSE' | 'UPDATE';
	}

	interface Transfer {
		id: string;
		accountId: string;
		description: string;
		memo?: string;
		amount: number;
		date: number;
		type: 'credit' | 'debit';
		category: string;
	}
	}
}
export {}