// lib/ai/tool-registry.ts
import type { ToolSet } from 'ai';

import { enrollMfaPush } from '@/lib/ai/tools/enroll-mfa-push';
import { getAccountList } from '@/lib/ai/tools/get-account-list';
import { getAccounts } from '@/lib/ai/tools/get-accounts';
import { getTransactions } from '@/lib/ai/tools/get-transactions';
import { getUserProfile } from '@/lib/ai/tools/get-user-profile';
import { getWeather } from '@/lib/ai/tools/get-weather';
import { getModuleCode } from '@/lib/ai/tools/system/get-module-code';
import { getModuleGuides } from '@/lib/ai/tools/system/get-module-guides';
import { getReferenceFile } from '@/lib/ai/tools/system/get-reference-file';
import { userSettings } from '@/lib/ai/tools/system/user-settings';
import { transferFunds } from '@/lib/ai/tools/transfer-funds';

export const toolRegistry = {
	enrollMfaPush,
	getAccounts,
	getAccountList,
	getModuleGuides,
	getReferenceFile,
	getModuleCode,
	getTransactions,
	getUserProfile,
	getWeather,
	transferFunds /* ⚠️ TASK 9: Modify to call higher-order function (see `transfer-funds.ts`) */,
	userSettings,
} satisfies ToolSet;
