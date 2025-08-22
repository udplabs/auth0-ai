import type { Tool } from 'ai';
import { addExternalAccount } from './tools/add-external-account';
import { getAccounts } from './tools/get-accounts';
import { getExternalAccounts } from './tools/get-external-accounts';
import { getTransactions } from './tools/get-transactions';
import { getWeather } from './tools/get-weather';
import { pushEnrollment } from './tools/push-enroll';
// === LAB STEP ===
import { ragAccounts } from './tools/rag-account-data';
// ================
import { userInfo } from './tools/user-info';

export function getTools(): Record<string, Tool> {
	return {
		// addExternalAccount,
		getAccounts,
		getExternalAccounts,
		getTransactions,
		getWeather,
		pushEnrollment,
		// === LAB STEP ===
		ragAccounts,
		// ================
		userInfo,
	};
}
