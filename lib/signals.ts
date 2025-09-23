'use client';

import type { Transfers } from '@/types/transfers';
import { effect, signal } from '@preact/signals-react';
import { LS_KEY_AUTH, LS_KEY_FIRST } from './constants';

export const mfaEnrollPending = signal(false);
export const hasPushMfa = signal(false);
export const transferInterrupt = signal<Transfers.CreateTransferInput | null>(
	null
);
export const firstMessageSent = signal(false);
export const firstMessageOverride = signal(false);

export const authMessageSent = signal(false);
export const authMessageOverride = signal(false);

effect(() => {
	if (mfaEnrollPending.value && hasPushMfa.value) {
		// Mark MFA enrollment as complete
		mfaEnrollPending.value = false;
	}
});

effect(() => {
	const value = firstMessageSent.value ? 'true' : 'false';
	console.log('setting LS_KEY_FIRST:', value);
	if (localStorage) {
		localStorage?.setItem(LS_KEY_FIRST, value);
	}
});

effect(() => {
	const value = authMessageSent.value ? 'true' : 'false';
	console.log('setting LS_KEY_AUTH:', value);
	if (localStorage) {
		localStorage?.setItem(LS_KEY_AUTH, value);
	}
});
