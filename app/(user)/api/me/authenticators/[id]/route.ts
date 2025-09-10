import { revalidateTag } from 'next/cache';
import { type NextRequest, NextResponse } from 'next/server';

import { auth0Management, getUser } from '@/lib/auth0';
import { APIError } from '@/lib/errors';

// Delete user authenticator
export async function DELETE(
	request: NextRequest,
	{ params }: { params: Promise<ApiPathParams> }
) {
	try {
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

		return NextResponse.json({}, { status: 204 });
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
