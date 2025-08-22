import { Header } from '@/components/header';

export default async function TestPage() {
	return (
		<div className='bg-background flex h-dvh min-w-0 flex-col'>
			<Header>
				<span className='font-bold'>Profile</span>
			</Header>

			<div className='bg-background mx-auto flex h-dvh w-full min-w-0 flex-col gap-6 p-4 md:max-w-3xl md:p-6'></div>
		</div>
	);
}
