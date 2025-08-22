'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2Icon } from 'lucide-react';
// import { useAuthenticators } from '@/lib/hooks';
import { Loader } from '@/components/ui/loader';
import { useAuthenticators } from '@/hooks/use-authenticators';
import { Authenticator } from './authenticator-card';

export const Authenticators = () => {
	const {
		data = [],
		isValidating,
		// mutate: deleteAuthenticator,
	} = useAuthenticators();

	return (
		<Card>
			<CardHeader>
				<CardTitle>Authenticators</CardTitle>
			</CardHeader>
			<CardContent className='flex flex-col gap-4'>
				{isValidating ? (
					<Loader size='lg' />
				) : data.length === 0 ? (
					<p className='pb-4 text-base font-medium'>
						You do not currently have any authenticators.
					</p>
				) : (
					data.map((a) => (
						<Authenticator
							key={`${a.type}-${a.id}-2`}
							data={a}
							loading={isValidating}
							// onDelete={deleteAuthenticator}
						/>
					))
				)}
			</CardContent>
		</Card>
	);
};
