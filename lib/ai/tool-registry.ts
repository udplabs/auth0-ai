import type { ToolSet } from 'ai';

import {
	getAccounts,
	getContent,
	getReferenceFile,
	getStepCode,
	getTransactions,
	getUserProfile,
	getWeather,
	transferFunds,
	userSettings,
} from './tools';

import { pushEnrollment } from './tools/_push-enroll';

// ---------------------------------------------------------------------------
// ❌ STEP 8: Import searchTransactions tool
// TODO
// ---------------------------------------------------------------------------

export const toolRegistry = {
	getAccounts,
	getContent,
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
	// TODO
	// ---------------------------------------------------------------------------
} satisfies ToolSet;
