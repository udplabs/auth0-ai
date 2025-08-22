import { LocalVectorStore } from '@/lib/ai/rag/vector-store';
import { APIError } from '@/lib/errors';
import  { type NextRequest, NextResponse } from 'next/server'
import { getSearchParams } from '@/lib/utils/get-search-params';

export async function GET(request: NextRequest) {
	try {
		const { count } = getSearchParams<{ count: string }>(request, ['count']);

		if (count === 'true') {
			const summary = LocalVectorStore.summary()
			return NextResponse.json({ count: summary})
		}

		await LocalVectorStore.init(true);

		return Response.json(null, { status: 201 });
	} catch (error: unknown) {
		console.log(error);
		if (error instanceof APIError) {
			return error.toResponse();
		}

		return new APIError(error);
	}
}

export async function DELETE() {
	try {
		LocalVectorStore.reset();
		return new Response(null, { status: 204 });
	} catch (error: unknown) {
		console.log(error);
		if (error instanceof APIError) {
			return error.toResponse();
		}

		return new APIError(error);
	}
}
