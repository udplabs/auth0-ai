import type { ToolSet } from 'ai';
// import { addExternalAccount } from './tools/add-external-account';
import { getAccounts } from './tools/get-accounts';
import { getContent } from './tools/system/get-content';
// import { getExternalAccounts } from './tools/get-external-accounts';
import { pushEnrollment } from './tools/_push-enroll';
import { getTransactions } from './tools/get-transactions';
import { getWeather } from './tools/get-weather';
import { userSettings } from './tools/system/user-settings';
import { transferFunds } from './tools/transfer-funds';
// === LAB STEP ===
// import { ragAccounts } from './tools/rag-accounts';
// ================
import { userInfo } from './tools/user-info';

export const toolRegistry = {
	// addExternalAccount,
	getAccounts,
	getContent,
	// getExternalAccounts,
	getTransactions,
	getWeather,
	transferFunds,
	userSettings,
	pushEnrollment,
	// === LAB STEP ===
	// ragAccounts,
	// ================
	userInfo,
} satisfies ToolSet;
