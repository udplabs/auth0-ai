'use client';

import { useAccounts } from '@/hooks';
import { merge } from 'lodash-es';
import { createContext, useCallback, useMemo, useReducer } from 'react';
import { toast } from 'sonner';
import { TransferModal } from './transfer-modal';

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
				open: false,
				transferAmount: 0,
				fromAccountId: undefined,
				toAccountId: undefined,
				...newState,
			};
		case 'OPEN':
			return merge(
				{ ...state },
				{ open: true, transferAmount: 0 },
				{ ...newState }
			);
		case 'UPDATE':
		default:
			console.log(
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

	const [state, dispatch] = useReducer<
		React.Reducer<Transfers.TransferContext, Transfers.TransferAction>
	>(TransferReducer, initialContext);

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
			const amount = parseInt(target?.value);

			return dispatch({
				type: 'UPDATE',
				transferAmount: isNaN(amount) ? 0 : amount,
			} as Transfers.TransferAction);
		},
		[]
	);

	const transferFunds: Transfers.TransferContext['transferFunds'] = useCallback(
		(options) => {
			const {
				fromAccountId = state?.fromAccountId,
				fromAccountNumber = state?.fromAccountNumber ||
					getFriendlyAccountNumber(state?.fromAccountId || ''),
				toAccountId = state?.toAccountId,
				toAccountNumber = state?.toAccountNumber ||
					getFriendlyAccountNumber(state?.toAccountId || ''),
				amount = state?.transferAmount,
				memo = state?.memo,
			} = options || {};

			toast.promise(
				async () => {
					await fetch('/api/accounts/transfers', {
						method: 'POST',
						body: JSON.stringify({
							fromAccountId,
							fromAccountNumber,
							toAccountId,
							toAccountNumber,
							amount,
							memo,
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
		[state, toast]
	);

	function getFriendlyAccountNumber(accountId: string) {
		return accounts.find((a) => a.id === accountId)?.number || '';
	}

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
