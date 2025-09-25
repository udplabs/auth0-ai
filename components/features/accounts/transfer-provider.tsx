'use client';

import { useAccounts } from '@/hooks/use-accounts';
import merge from 'lodash-es/merge';
import { createContext, useCallback, useMemo, useReducer } from 'react';
import { toast } from 'sonner';
import { TransferModal } from './transfer-modal';

import type { Transfers } from '@/types/transfers';

const stub = () => {
	throw new Error('You forgot to wrap your app with a transfer provider!');
};

const initialContext = {
	onChange: stub,
	open: false,
	selectAccount: stub,
	transferAmount: 0,
	toggleModal: stub,
	transferFunds: stub,
};

export const TransferContext =
	createContext<Transfers.TransferContext>(initialContext);

const TransferReducer: React.Reducer<
	Transfers.TransferContext,
	Transfers.TransferAction
> = (state, { type, ...newState }) => {
	switch (type) {
		case 'CLOSE':
			return {
				...state,
				...newState,
				open: false,
				transferAmount: 0,
				fromAccountId: undefined,
				toAccountId: undefined,
			};
		case 'OPEN':
			return merge(
				{ ...state },
				{ open: true, transferAmount: 0 },
				{ ...newState }
			);
		case 'UPDATE':
		default:
			console.debug('==== UPDATE ====');
			console.debug(
				{ ...state },
				{ open: true, transferAmount: 0 },
				{ ...newState }
			);
			return merge(
				{ ...state },
				{ open: true, transferAmount: 0 },
				{ ...newState }
			);
	}
};

export type TransferProviderOptions = React.PropsWithChildren;

export const TransferProvider = ({ children }: TransferProviderOptions) => {
	const { data: accounts = [], mutate } = useAccounts();

	const [state, dispatch] = useReducer(TransferReducer, initialContext);

	const toggleModal: Transfers.TransferContext['toggleModal'] = useCallback(
		(options) => {
			const {
				fromAccountId,
				toAccountId,
				amount: transferAmount = 0,
				open = true,
			} = options || {};

			return dispatch({
				fromAccountId,
				toAccountId,
				transferAmount,
				transferAmountRaw: transferAmount?.toString() || '0',
				type: open ? 'OPEN' : 'CLOSE',
			} as Transfers.TransferAction);
		},
		[]
	);

	const selectAccount: Transfers.TransferContext['selectAccount'] = useCallback(
		(options) => {
			const { fromAccount, toAccount } = options || {};

			return dispatch({
				type: 'UPDATE',
				fromAccountId: fromAccount?.id,
				toAccountId: toAccount?.id,
			} as Transfers.TransferAction);
		},
		[]
	);

	const onChange: Transfers.TransferContext['onChange'] = useCallback(
		({ target }) => {
			const raw = String(target?.value ?? '');

			// Allow: empty, digits, optional single dot, up to 2 decimals
			if (!/^\d*\.?\d{0,2}$/.test(raw)) return;

			let numeric = 0;
			if (raw !== '' && raw !== '.' && raw !== '-') {
				numeric = parseFloat(raw);
			}

			return dispatch({
				type: 'UPDATE',
				transferAmountRaw: raw,
				transferAmount: isNaN(numeric) ? 0 : numeric,
			} as Transfers.TransferAction);
		},
		[]
	);

	const transferFunds: Transfers.TransferContext['transferFunds'] = useCallback(
		(options) => {
			function getFriendlyAccountNumber(accountId: string) {
				return accounts.find((a) => a.id === accountId)?.number || '';
			}

			const {
				fromAccountId = state?.fromAccountId,
				fromAccountNumber = state?.fromAccountNumber ||
					getFriendlyAccountNumber(state?.fromAccountId || ''),
				fromAccountDisplayName = state?.fromAccountDisplayName,
				toAccountId = state?.toAccountId,
				toAccountNumber = state?.toAccountNumber ||
					getFriendlyAccountNumber(state?.toAccountId || ''),
				toAccountDisplayName = state?.toAccountDisplayName,
				amount = state?.transferAmount,
				memo = state?.memo,
				description = state?.description,
			} = options || {};

			toast.promise(
				async () => {
					await fetch('/api/accounts/transfers', {
						method: 'POST',
						body: JSON.stringify({
							fromAccountId,
							fromAccountNumber,
							fromAccountDisplayName,
							toAccountId,
							toAccountNumber,
							toAccountDisplayName,
							amount,
							memo,
							description,
						}),
					});
				},
				{
					loading: 'Moving da money...',
					success: () => {
						mutate();
						return 'Transfer completed!';
					},
					error: () => 'Whoops! Something went wrong.',
				}
			);

			dispatch({ type: 'CLOSE' } as Transfers.TransferAction);
		},
		[state, mutate, accounts]
	);

	const context = useMemo(
		() => ({ ...state, onChange, selectAccount, toggleModal, transferFunds }),
		[state, onChange, selectAccount, toggleModal, transferFunds]
	);

	return (
		<TransferContext.Provider value={context}>
			{children}
			<TransferModal {...{ ...context, accounts }} />
		</TransferContext.Provider>
	);
};
