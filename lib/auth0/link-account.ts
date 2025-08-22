// lib/auth0/link-account.ts
'use server';

import { auth0 } from '@/lib/auth0/client';
import { revalidateTag } from 'next/cache';
import { redirect } from 'next/navigation';

export async function linkAccount(formData: FormData): Promise<void> {
	const connection = formData.get('connection')?.toString();
	if (!connection) throw new Error('Missing connection name');

	const session = await auth0.getSession();
	const id_token_hint = session?.tokenSet?.idToken;

	if (!id_token_hint) {
		console.error('Missing ID token for linking. Session:', session);
		throw new Error('You must be logged in to link an account.');
	}

	const params = new URLSearchParams({
		scope: 'link_account openid profile offline_access',
		requested_connection: connection,
		id_token_hint,
		prompt: 'consent',
		// connection_scope: 'openid email profile',
		returnTo: '/profile',
	});

	revalidateTag(`${session?.user?.sub}:user`);

	redirect(`/auth/login?${params.toString()}`);
}
