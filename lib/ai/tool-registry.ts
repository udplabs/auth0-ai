import type { ToolSet } from 'ai';
// import { addExternalAccount } from './tools/add-external-account';
import { getAccounts } from './tools/get-accounts';
// import { getExternalAccounts } from './tools/get-external-accounts';
import { getTransactions } from './tools/get-transactions';
import { getWeather } from './tools/get-weather';
import { pushEnrollment } from './tools/push-enroll';
import { userSettings } from './tools/system/user-settings';
// === LAB STEP ===
import { ragAccounts } from './tools/rag-accounts';
// ================
import { userInfo } from './tools/user-info';

export const toolRegistry = {
	// addExternalAccount,
	getAccounts,
	// getExternalAccounts,
	getTransactions,
	getWeather,
	userSettings,
	pushEnrollment,
	// === LAB STEP ===
	ragAccounts,
	// ================
	userInfo,
} satisfies ToolSet;
