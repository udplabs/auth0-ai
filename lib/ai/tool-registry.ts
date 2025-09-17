import type { ToolSet } from 'ai';

import { pushEnrollment } from './tools/_push-enroll';
import { getAccounts } from './tools/get-accounts';
import { getTransactions } from './tools/get-transactions';
import { getUserProfile } from './tools/get-user-profile';
import { getWeather } from './tools/get-weather';
import { getReferenceFile } from './tools/system/get-reference-file';
import { getStepCode } from './tools/system/get-step-code';
import { getStepGuides } from './tools/system/get-step-guides';
import { userSettings } from './tools/system/user-settings';
import { transferFunds } from './tools/transfer-funds';

// ---------------------------------------------------------------------------
// ✅ STEP 8: Import searchTransactions tool
import { searchTransactions } from './tools/search-transactions';
// ---------------------------------------------------------------------------

export const toolRegistry = {
	getAccounts,
	getStepGuides,
	getReferenceFile,
	getStepCode,
	getTransactions,
	getUserProfile,
	getWeather,
	pushEnrollment,
	transferFunds,
	userSettings,
	// ---------------------------------------------------------------------------
	// ❌ STEP 9: Add searchTransactions tool
	//
	// ---------------------------------------------------------------------------
} satisfies ToolSet;
