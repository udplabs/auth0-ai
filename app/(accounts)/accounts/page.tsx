import { AccountSummary } from '@/components/features/accounts/account-summary';
import { AccountSummaryHeader } from '@/components/features/accounts/account-summary-header';
import { Header } from '@/components/layout/header';

export default async function AccountsPage() {
	return (
		<div className='bg-background flex h-dvh min-w-0 flex-col'>
			<Header>
				<span className='font-bold'>Accounts</span>
			</Header>
			<div className='container mx-auto max-w-7xl py-4'>
				<div className='flex flex-col gap-8'>
					<AccountSummaryHeader />
					<AccountSummary />
				</div>
			</div>
		</div>
	);
}
