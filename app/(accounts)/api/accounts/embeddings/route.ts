import { generateMockEmbeddings } from '@/lib/db/mock/mock-accounts';
import { LocalVectorStore } from '@/lib/ai/rag/vector-store';
import { APIError } from '@/lib/errors';

export async function GET() {
	try {
		await generateMockEmbeddings();
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
