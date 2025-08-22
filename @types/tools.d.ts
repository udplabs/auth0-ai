import type { addExternalAccount } from '@/lib/ai/tools/add-external-account';
import type { getAccounts } from '@/lib/ai/tools/get-accounts';
import type { getExternalAccounts } from '@/lib/ai/tools/get-external-accounts';
import type { getTransactions } from '@/lib/ai/tools/get-transactions';
import type { getWeather } from '@/lib/ai/tools/get-weather';
import type { pushEnrollment } from '@/lib/ai/tools/push-enroll';
import type { ragAccounts } from '@/lib/ai/tools/rag-account-data';
import type { userInfo } from '@/lib/ai/tools/user-info';
import type { InferUITool, UITools as _UITools } from 'ai';

declare global {
	namespace Chat {
		namespace Tools {
			type AddExternalAccountTool = InferUITool<typeof addExternalAccount>;
			type GetAccountsTool = InferUITool<typeof getAccounts>;
			type GetExternalAccountsTool = InferUITool<typeof getExternalAccounts>;
			type GetTransactionsTool = InferUITool<typeof getTransactions>;
			type PushEnrollmentTool = InferUITool<typeof pushEnrollment>;
			type RagAccountsTool = InferUITool<typeof ragAccounts>;
			type UserInfoTool = InferUITool<typeof userInfo>;
			type WeatherTool = InferUITool<typeof getWeather>;

			interface AvailableTools {
				// addExternalAccount: Chat.Tools.AddExternalAccountTool;
				getAccounts: Chat.Tools.GetAccountsTool;
				getExternalAccounts: Chat.Tools.GetExternalAccountsTool;
				getTransactions: Chat.Tools.GetTransactionsTool;
				getWeather: Chat.Tools.WeatherTool;
				pushEnrollment: Chat.Tools.PushEnrollmentTool;
				ragAccounts: Chat.Tools.RagAccountsTool;
				userInfo: Chat.Tools.UserInfoTool;
			}
			type UITools = _UITools & Chat.Tools.AvailableTools;
			interface Response<T = any> {
				dataCount: number;
				data?: T;
				status?:
					| 'success'
					| 'error'
					| 'not_found'
					| 'unauthorized'
					| 'input-required'
					| 'wrong-tool';
				message?: string;
				hasOwnUI?: boolean;
				error?: Errors.ErrorResponse;
			}
		}
	}
}

export {};
