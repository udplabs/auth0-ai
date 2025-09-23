// lib/ai/tool-registry.ts
import type { ToolSet } from 'ai';

import { enrollMfaPush } from '@/lib/ai/tools/enroll-mfa-push';
import { getAccountList } from '@/lib/ai/tools/get-account-list';
import { getAccounts } from '@/lib/ai/tools/get-accounts';
import { getTransactions } from '@/lib/ai/tools/get-transactions';
import { getUserProfile } from '@/lib/ai/tools/get-user-profile';
import { getWeather } from '@/lib/ai/tools/get-weather';
import { getReferenceFile } from '@/lib/ai/tools/system/get-reference-file';
import { getStepCode } from '@/lib/ai/tools/system/get-step-code';
import { getStepGuides } from '@/lib/ai/tools/system/get-step-guides';
import { userSettings } from '@/lib/ai/tools/system/user-settings';
import { transferFunds } from '@/lib/ai/tools/transfer-funds';

export const toolRegistry = {
	enrollMfaPush,
	getAccounts,
	getAccountList,
	getStepGuides,
	getReferenceFile,
	getStepCode,
	getTransactions,
	getUserProfile,
	getWeather,
	transferFunds, // ❌ STEP 1: Modify to call higher-order function (see `transfer-funds.ts`)
	userSettings,
} satisfies ToolSet;
