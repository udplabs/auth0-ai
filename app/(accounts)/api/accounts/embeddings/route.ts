import { LocalVectorStore } from '@/lib/ai/rag/vector-store';
import { generateMockEmbeddings } from '@/lib/db/mock/mock-accounts';
import { APIError } from '@/lib/errors';

// DELETE ME! THIS IS FOR DANNY
export async function GET() {
	try {
		await generateMockEmbeddings();
		return Response.json(null, { status: 201 });
	} catch (error: unknown) {
		console.log(error);
		if (error instanceof APIError) {
			return error.toResponse();
		}

		return new APIError(error).toResponse();
	}
}

// DELETE ME! THIS IS FOR DANNY
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
