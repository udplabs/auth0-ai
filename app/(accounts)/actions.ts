'use server';

import { createMockAccounts } from '@/lib/db/mock/mock-accounts';

export async function createMockAccountsAction(userId: string) {
	await createMockAccounts(userId);
	return { ok: true };
}
