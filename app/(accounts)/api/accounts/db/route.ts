import { LocalVectorStore } from '@/lib/ai/rag/vector-store';
import { APIError } from '@/lib/errors';
import { getSearchParams } from '@/lib/utils/get-search-params';
import { type NextRequest, NextResponse } from 'next/server';

// Gives us the ability to force initialize the vector store.
// This is for development purposes only. Just a helper util.
export async function GET(request: NextRequest) {
	try {
		const { count } = getSearchParams<{ count: boolean }>(request, ['count']);

		if (count) {
			const summary = LocalVectorStore.summary();
			return NextResponse.json({ count: summary });
		}

		await LocalVectorStore.init(true);

		return Response.json(null, { status: 201 });
	} catch (error: unknown) {
		console.log(error);
		if (error instanceof APIError) {
			return error.toResponse();
		}

		return new APIError(error).toResponse();
	}
}

// Allows us to force delete/clear the vector store.
// This is for development purposes only.
export async function DELETE() {
	try {
		LocalVectorStore.reset();
		return new Response(null, { status: 204 });
	} catch (error: unknown) {
		console.log(error);
		if (error instanceof APIError) {
			return error.toResponse();
		}

		return new APIError(error).toResponse();
	}
}
