import type { SuggestedActions } from '@/components/features/chat/suggested-actions';
import { useState } from 'react';
import { useUserProfile } from './use-user-profile';

interface UseSuggestionsResponse {
	open?: boolean;
	toggleSuggestions: React.Dispatch<React.SetStateAction<boolean>>;
	suggestedActions: SuggestedActions[];
	labStep: number;
	shouldShow?: boolean;
}

export const useSuggestions = (): UseSuggestionsResponse => {
	const [open, toggleSuggestions] = useState(true);

	const { data: user, isLoading } = useUserProfile();

	const labStepString: string | undefined = !isLoading
		? (user?.custom_metadata?.currentLabStep ?? undefined)
		: undefined;

	const [_, labStepNum] = labStepString
		? labStepString.split('-')
		: [undefined, undefined];

	const labStep = typeof labStepNum === 'string' ? parseInt(labStepNum) : 0;

	// If `shouldShow` is true, return.
	// Placed in front of other suggestions in order
	const stepSuggestions: SuggestedActions[] = [
		{
			suggestion: 'Show me the createClient() code',
			variant: 'default',
			shouldShow: labStep === 5,
		},
		{
			label: 'Show me the `RELATIONS` code',
			suggestion:
				'Show me the code for the RELATIONS array in lib/auth0/fga/get-account-permissions.ts.',
			variant: 'default',
			shouldShow: labStep === 5,
		},
		{
			label: 'Show me the `checks` code',
			suggestion:
				'Show me the code for checks flatMap in lib/auth0/fga/get-account-permissions.ts',
			variant: 'default',
			shouldShow: labStep === 5,
		},
		{
			label: 'Show me the `output` code',
			suggestion:
				'Show me the code for the output account mapping in lib/auth0/fga/get-account-permissions.ts',
			variant: 'default',
			shouldShow: labStep === 5,
		},
		{
			label: 'Show me the `fgaRetriever` code',
			suggestion:
				'Show me the fgaRetriever code in lib/ai/tools/search-transactions.ts',
			variant: 'default',
			shouldShow: labStep === 6,
		},
		{
			label: 'Show me the `authorizedResults` code',
			suggestion:
				'Show me the code authorizedResults code from lib/ai/tools/search-transactions.ts',
			variant: 'default',
			shouldShow: labStep === 6,
		},
		{
			label: 'Show me the `toolRegistry` code',
			suggestion: 'Show me the code for lib/ai/tool-registry.ts',
			variant: 'default',
			shouldShow: labStep === 6,
		},
		{
			label: 'Show me the final code',
			suggestion: `Show me the code for ${labStepString}`,
			variant: 'info',
			shouldShow: labStep >= 3,
		},
	];

	const suggestedActions =
		stepSuggestions.filter(({ shouldShow }) => shouldShow) || [];

	const shouldShow = suggestedActions.length > 0;

	return {
		open,
		toggleSuggestions,
		suggestedActions,
		labStep,
		shouldShow,
	};
};
