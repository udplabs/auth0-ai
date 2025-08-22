import { APIError } from '@/lib/errors';
import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export async function fetchWithErrorHandlers(
	input: RequestInfo | URL,
	init?: RequestInit
) {
	console.log('fetching...', input);
	console.log(input);
	try {
		const response = await fetch(input, init);

		if (!response.ok) {
			const { code, cause } = await response.json();
			throw new APIError(code as Errors.Code, cause);
		}

		// const ct = response.headers.get('content-type');
		// if (ct && ct.includes('text-event-stream')) {
		// 	const text = await response.clone().text();
		// 	console.log('=== FETCH RESPONSE (non-stream) ===');
		// 	console.log(text);
		// 	return response;
		// }

		// const body = response.body;

		// if (body) {
		// 	const [pass, tap] = body.tee();

		// 	void tap
		// 		.pipeThrough(new TextDecoderStream())
		// 		.pipeThrough(
		// 			new TransformStream<string, string>({
		// 				transform(chunk, controller) {
		// 					for (const line of chunk.split('\n')) {
		// 						if (line.startsWith('data:')) {
		// 							console.debug('SSE data:', line.slice(5).trim());
		// 						}
		// 					}
		// 					controller.enqueue(chunk);
		// 				},
		// 			})
		// 		)
		// 		.pipeTo(new WritableStream({ write() {} }))
		// 		.catch(() => {});

		// 	return new Response(pass, {
		// 		headers: response.headers,
		// 		status: response.status,
		// 		statusText: response.statusText,
		// 	});
		// }

		return response;
	} catch (error: unknown) {
		console.log('=== FETCH ERROR ===');
		console.log(error);
		if (typeof navigator !== 'undefined' && !navigator.onLine) {
			throw new APIError('offline:chat');
		}

		throw new APIError(error);
	}
}

export function sanitizeText(text: string) {
	return text.replace('<has_function_call>', '');
}

export function getTextFromMessage(message: Chat.UIMessage): string {
	return message.parts
		.filter((part) => part.type === 'text')
		.map((part) => part.text)
		.join('');
}
