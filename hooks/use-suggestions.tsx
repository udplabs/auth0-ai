import type { SuggestedActions } from '@/components/features/chat/suggested-actions';
import { useState } from 'react';
import { useUserProfile } from './use-user-profile';

interface UseSuggestionsResponse {
	open?: boolean;
	toggleSuggestions: React.Dispatch<React.SetStateAction<boolean>>;
	suggestedActions: SuggestedActions[];
	labModule?: number;
	shouldShow?: boolean;
}
//TODO: Add a "let's go" suggestion for after auth message
export const useSuggestions = (): UseSuggestionsResponse => {
	const [open, toggleSuggestions] = useState(true);

	const { data: user, isLoading } = useUserProfile();

	const labModule: number | undefined = !isLoading
		? (user?.custom_metadata?.currentModule ?? undefined)
		: undefined;

	// If `shouldShow` is true, return.
	// Placed in front of other suggestions in order
	const stepSuggestions: SuggestedActions[] = [
		{
			suggestion: 'Show me the `.env` settings',
			variant: 'info',
			shouldShow: labModule === 3,
		},
		{
			suggestion: 'Show me the FGA model',
			variant: 'info',
			shouldShow: labModule === 4,
		},
		{
			suggestion: 'Show me my accounts',
			variant: 'info',
			shouldShow: labModule === 4,
		},
		{
			suggestion: 'Show me the `createClient()` code',
			variant: 'info',
			shouldShow: labModule === 5,
		},
		{
			label: 'Show me the `RELATIONS` code',
			suggestion:
				'Show me the code for the `RELATIONS` array in `lib/auth0/fga/get-account-permissions.ts`.',
			variant: 'info',
			shouldShow: labModule === 5,
		},
		{
			label: 'Show me the `checks` code',
			suggestion:
				'Show me the code for `checks` flatMap in `lib/auth0/fga/get-account-permissions.ts`',
			variant: 'info',
			shouldShow: labModule === 5,
		},
		{
			label: 'Show me the `output` code',
			suggestion:
				'Show me the code for the `output` account mapping in lib/auth0/fga/get-account-permissions.ts',
			variant: 'info',
			shouldShow: labModule === 5,
		},
		{
			label: 'Show me the `auth0AI` client',
			suggestion:
				'Show me the `auth0AI` client code in `lib/auth0/ai/client.ts`',
			variant: 'info',
			shouldShow: labModule === 6,
		},
		{
			label: 'Show me the `withAsyncConfirmation` code',
			suggestion:
				'Show me the `withAsyncConfirmation` code from `lib/auth0/ai/with-async-authorize.ts`',
			variant: 'info',
			shouldShow: labModule === 6,
		},
		{
			label: 'Show me the `transferFunds` code',
			suggestion: 'Show me the code for `lib/ai/tools/transfer-funds.ts`',
			variant: 'info',
			shouldShow: labModule === 6,
		},
		{
			label: 'Show me the `toolRegistry` code',
			suggestion: 'Show me the code for `lib/ai/tool-registry.ts`',
			variant: 'info',
			shouldShow: labModule === 6,
		},
		{
			label: 'Show me the `POST` chat handler code',
			suggestion:
				'Show me the code to change in `app/(chat)/api/chat/[id]/_handlers/post.ts`',
			variant: 'info',
			shouldShow: labModule === 6,
		},
		{
			label: 'Explain `handleOnAuthorize`',
			suggestion:
				'Show me the code for `lib/auth0/ai/handle-on-authorize.ts` and explain it.',
			variant: 'default',
			shouldShow: labModule === 6,
		},
	];

	const suggestedActions =
		stepSuggestions.filter(({ shouldShow }) => shouldShow) || [];

	const shouldShow = suggestedActions.length > 0;

	return {
		open,
		toggleSuggestions,
		suggestedActions,
		labModule,
		shouldShow,
	};
};
