import { revalidateTag } from 'next/cache';
import { type NextRequest } from 'next/server';

import { getUser } from '@/lib/auth0/client';
import { auth0Management } from '@/lib/auth0/management-client';
import { APIError } from '@/lib/errors';

// Delete user authenticator
export async function DELETE(
	request: NextRequest,
	{ params }: { params: Promise<ApiPathParams> }
) {
	try {
		if (!auth0Management) {
			console.warn('Auth0 Management API client is not initialized.');
			return new Response(null, {
				status: 501,
				statusText: 'Auth0 Management API client is not yet initialized.',
			});
		}

		const { id: authentication_method_id } = await params;

		const user = await getUser();

		if (!authentication_method_id) {
			throw new APIError('bad_request:api').toResponse();
		}

		const userId = user.sub;

		await auth0Management.users.deleteAuthenticationMethod({
			id: userId,
			authentication_method_id,
		});

		revalidateTag('authenticators');

		return new Response(null, { status: 204 });
	} catch (error) {
		console.log('API error:', error);
		if (error instanceof APIError) {
			return error.toResponse();
		}
		return new APIError(
			'server_error:api',
			error instanceof Error ? error.message : String(error)
		).toResponse();
	}
}
