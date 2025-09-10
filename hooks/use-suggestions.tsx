import type { SuggestedActions } from '@/components/features/chat/suggested-actions';
import { useState } from 'react';
import { useUserProfile } from './use-user-profile';

interface UseSuggestionsResponse {
	open?: boolean;
	toggleSuggestions: React.Dispatch<React.SetStateAction<boolean>>;
	suggestedActions: SuggestedActions[];
	labStep?: boolean;
	shouldShow?: boolean;
}

export const useSuggestions = (): UseSuggestionsResponse => {
	const [open, toggleSuggestions] = useState(true);

	const { data: user, isLoading } = useUserProfile();

	const labStep = !isLoading && user?.custom_metadata?.currentLabStep;

	// If `shouldShow` is true, return.
	// Placed in front of other suggestions in order
	const stepSuggestions: SuggestedActions[] = [
		{
			suggestion: 'Show me the createClient() code',
			variant: 'default',
			shouldShow: labStep && labStep === 'step-05',
		},
		{
			label: 'Show me the `RELATIONS` code',
			suggestion:
				'Show me the code for the RELATIONS array in lib/auth0/fga/get-account-permissions.ts.',
			variant: 'default',
			shouldShow: labStep && labStep === 'step-05',
		},
		{
			label: 'Show me the `checks` code',
			suggestion:
				'Show me the code for checks flatMap in lib/auth0/fga/get-account-permissions.ts',
			variant: 'default',
			shouldShow: labStep && labStep === 'step-05',
		},
		{
			label: 'Show me the `output` code',
			suggestion:
				'Show me the code for the output account mapping in lib/auth0/fga/get-account-permissions.ts',
			variant: 'default',
			shouldShow: labStep && labStep === 'step-05',
		},
		{
			label: 'Show me the `fgaRetriever` code',
			suggestion:
				'Show me the fgaRetriever code in lib/ai/tools/search-transactions.ts',
			variant: 'default',
			shouldShow: labStep && labStep === 'step-06',
		},
		{
			label: 'Show me the `authorizedResults` code',
			suggestion:
				'Show me the code authorizedResults code from lib/ai/tools/search-transactions.ts',
			variant: 'default',
			shouldShow: labStep && labStep === 'step-06',
		},
		{
			label: 'Show me the `toolRegistry` code',
			suggestion: 'Show me the code for lib/ai/tool-registry.ts',
			variant: 'default',
			shouldShow: labStep && labStep === 'step-06',
		},
		{
			label: 'Show me the final code',
			suggestion: `Show me the code for ${labStep}`,
			variant: 'default',
			shouldShow: labStep && labStep >= 'step-03',
		},
	];

	const suggestedActions =
		stepSuggestions.filter(({ shouldShow }) => shouldShow) || [];

	const shouldShow = suggestedActions.length > 0;

	return {
		open,
		toggleSuggestions,
		suggestedActions,
		labStep: !!labStep,
		shouldShow,
	};
};
