import type { SuggestedActions } from '@/components/features/chat/suggested-actions';
import { useEffect, useState } from 'react';
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

	console.log(labStep);

	// If `shouldShow` is true, return.
	// Placed in front of other suggestions in order
	const stepSuggestions: SuggestedActions[] = [
		{
			label: 'Show me the `createClient()` code',
			suggestion: `Show me the code for \`lib/auth0/fga/client.ts\` STEP 2`,
			variant: 'default',
			shouldShow: labStep && labStep === 'step-05',
		},
		{
			label: 'Show me the `RELATIONS` code',
			suggestion: `Show me the code for \`lib/auth0/fga/get-account-permissions.ts\` STEP 2`,
			variant: 'default',
			shouldShow: labStep && labStep === 'step-05',
		},
		{
			label: 'Show me the `checks` code',
			suggestion: `Show me the code for \`lib/auth0/fga/get-account-permissions.ts\` STEP 3`,
			variant: 'default',
			shouldShow: labStep && labStep === 'step-05',
		},
		{
			label: 'Show me the `output` code',
			suggestion: `Show me the code for \`lib/auth0/fga/get-account-permissions.ts\` STEP 6`,
			variant: 'default',
			shouldShow: labStep && labStep === 'step-05',
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
	console.log(user);
	console.log('labStep:', labStep);
	console.log('shouldShow:', shouldShow);

	return {
		open,
		toggleSuggestions,
		suggestedActions,
		labStep: !!labStep,
		shouldShow,
	};
};
