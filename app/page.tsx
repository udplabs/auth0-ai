import { Header } from '@/components/layout/header';
import { Loader } from '@/components/ui/prompt-kit/loader';
import { redirect } from 'next/navigation';

export default async function RootPage() {
	redirect('/chat');

	return (
		<div className='bg-background flex h-dvh min-w-0 flex-col'>
			<Header />
			<div className='bg-background mx-auto flex h-dvh w-full min-w-0 flex-col items-center gap-6 p-4 md:mt-32 md:max-w-3xl md:p-6'>
				<Loader className='size-24' />
			</div>
		</div>
	);
}
