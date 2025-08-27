'use client';

import { useContext } from 'react';

import { TransferContext } from '@/components/features/accounts/transfer-provider';

export const useTransferModal = () => {
	const context = useContext(TransferContext);

	if (!context)
		throw new Error('useTransferModal must be used within a TransferProvider');

	return context;
};
