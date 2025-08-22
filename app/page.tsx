import { Header } from '@/components/header';
import { Button } from '@/components/ui/button';
import { getUser } from '@/lib/auth0/client';
import { redirect } from 'next/navigation';

export default async function RootPage() {
	const user = await getUser(false);

	if (user?.sub) {
		redirect('/chat');
	}

	return (
		<div className='bg-background flex h-dvh min-w-0 flex-col'>
			<Header>
				<span className='font-bold'>Welcome to Auth0 AI</span>
			</Header>
			<div className='bg-background mx-auto flex h-dvh w-full min-w-0 flex-col gap-6 p-4 md:max-w-3xl md:p-6'>
				<p className='text-muted-foreground text-sm'>
					Please login to continue.
				</p>
				<Button
					className='max-w-sm self-center'
					href='/auth/login'
				>
					Log in with Auth0
				</Button>{' '}
			</div>
		</div>
	);
}
