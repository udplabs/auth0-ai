import { Header } from '@/components/layout/header';

export default async function TransfersPage() {
	return (
		<div className='bg-background flex h-dvh min-w-0 flex-col'>
			<Header label='Transfers' />
			<div className='bg-background mx-auto flex h-dvh w-full min-w-0 flex-col items-center gap-6 p-4 md:mt-32 md:max-w-3xl md:p-6'>
				Nothing to see here. Yet...
			</div>
		</div>
	);
}
