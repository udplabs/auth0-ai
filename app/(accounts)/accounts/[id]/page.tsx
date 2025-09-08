import { AccountDetailsCard } from '@/components/features/accounts/account-details-card';
import { TransactionsList } from '@/components/features/accounts/transactions-list';
import { Header } from '@/components/layout/header';
import { getUser } from '@/lib/auth0';

import type { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Account Details',
};
export default async function AccountDetailsPage({
	params,
}: {
	params: Promise<ApiPathParams>;
}) {
	const { id: accountId } = await params;

	const user = await getUser(false);

	if (!user?.sub) {
		const { redirect } = await import('next/navigation');
		redirect('/');
	}

	return (
		<div className='bg-background flex min-w-0 flex-col'>
			<Header>
				<span className='font-bold'>Account Details</span>
			</Header>
			<div className='container mx-auto max-w-7xl py-4'>
				<div className='grid gap-8 md:grid-cols-3'>
					<div className='md:col-span-1'>
						<AccountDetailsCard {...{ accountId }} />
					</div>
					<div className='md:col-span-2'>
						<TransactionsList {...{ accountId }} />
					</div>
				</div>
			</div>
		</div>
	);
}
