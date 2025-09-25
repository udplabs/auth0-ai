'use client';

import type { Transfers } from '@/types/transfers';
import { effect, signal } from '@preact/signals-react';

export const mfaEnrollPending = signal(false);
export const hasPushMfa = signal(false);
export const transferInterrupt = signal<Transfers.CreateTransferInput | null>(
	null
);
export const firstMessageOverride = signal(false);

export const authMessageOverride = signal(false);

effect(() => {
	if (mfaEnrollPending.value && hasPushMfa.value) {
		// Mark MFA enrollment as complete
		mfaEnrollPending.value = false;
	}
});
