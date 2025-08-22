import { getMessageByErrorCode } from '@/lib/errors';
import { ulid } from 'ulid';
import { expect, test } from '../fixtures';
import { TEST_PROMPTS } from '../prompts/routes';

const chatIdsCreatedByAda: Array<string> = [];

// Helper function to normalize stream data for comparison
function normalizeStreamData(lines: string[]): string[] {
	return lines.map((line) => {
		if (line.startsWith('data: ')) {
			try {
				const data = JSON.parse(line.slice(6)); // Remove 'data: ' prefix
				if (data.id) {
					// Replace dynamic id with a static one for comparison
					return `data: ${JSON.stringify({ ...data, id: 'STATIC_ID' })}`;
				}
				return line;
			} catch {
				return line; // Return as-is if it's not valid JSON
			}
		}
		return line;
	});
}

test.describe.serial('/api/chat', () => {
	test('Ada cannot invoke a chat generation with empty request body', async ({
		adaContext,
	}) => {
		const response = await adaContext.request.post('/api/chat', {
			data: JSON.stringify({}),
		});
		expect(response.status()).toBe(400);

		const { code, message } = await response.json();
		expect(code).toEqual('bad_request:api');
		expect(message).toEqual(getMessageByErrorCode('bad_request:api'));
	});

	test('Ada can invoke chat generation', async ({ adaContext }) => {
		const chatId = ulid();

		const response = await adaContext.request.post('/api/chat', {
			data: {
				id: chatId,
				message: TEST_PROMPTS.SKY.MESSAGE,
				selectedChatModel: 'chat-model',
			},
		});
		expect(response.status()).toBe(200);

		const text = await response.text();
		const lines = text.split('\n');

		const [_, ...rest] = lines;
		const actualNormalized = normalizeStreamData(rest.filter(Boolean));
		const expectedNormalized = normalizeStreamData(
			TEST_PROMPTS.SKY.OUTPUT_STREAM
		);

		expect(actualNormalized).toEqual(expectedNormalized);

		chatIdsCreatedByAda.push(chatId);
	});

	test("Babbage cannot append message to Ada's chat", async ({
		babbageContext,
	}) => {
		const [chatId] = chatIdsCreatedByAda;

		const response = await babbageContext.request.post('/api/chat', {
			data: {
				id: chatId,
				message: TEST_PROMPTS.GRASS.MESSAGE,
				selectedChatModel: 'chat-model',
			},
		});
		expect(response.status()).toBe(403);

		const { code, message } = await response.json();
		expect(code).toEqual('forbidden:chat');
		expect(message).toEqual(getMessageByErrorCode('forbidden:chat'));
	});

	test("Babbage cannot delete Ada's chat", async ({ babbageContext }) => {
		const [chatId] = chatIdsCreatedByAda;

		const response = await babbageContext.request.delete(
			`/api/chat?id=${chatId}`
		);
		expect(response.status()).toBe(403);

		const { code, message } = await response.json();
		expect(code).toEqual('forbidden:chat');
		expect(message).toEqual(getMessageByErrorCode('forbidden:chat'));
	});

	test('Ada can delete her own chat', async ({ adaContext }) => {
		const [chatId] = chatIdsCreatedByAda;

		const response = await adaContext.request.delete(`/api/chat?id=${chatId}`);
		expect(response.status()).toBe(200);

		const deletedChat = await response.json();
		expect(deletedChat).toMatchObject({ id: chatId });
	});

	test('Ada cannot resume stream of chat that does not exist', async ({
		adaContext,
	}) => {
		const response = await adaContext.request.get(`/api/chat/${ulid()}/stream`);
		expect(response.status()).toBe(404);
	});

	test('Ada can resume chat generation', async ({ adaContext }) => {
		const chatId = ulid();

		const firstRequest = adaContext.request.post('/api/chat', {
			data: {
				id: chatId,
				message: {
					id: ulid(),
					role: 'user',
					content: 'Help me write an essay about Silcon Valley',
					parts: [
						{
							type: 'text',
							text: 'Help me write an essay about Silicon Valley',
						},
					],
					createdAt: new Date().toISOString(),
				},
				selectedChatModel: 'chat-model',
			},
		});

		await new Promise((resolve) => setTimeout(resolve, 1000));

		const secondRequest = adaContext.request.get(`/api/chat/${chatId}/stream`);

		const [firstResponse, secondResponse] = await Promise.all([
			firstRequest,
			secondRequest,
		]);

		const [firstStatusCode, secondStatusCode] = await Promise.all([
			firstResponse.status(),
			secondResponse.status(),
		]);

		expect(firstStatusCode).toBe(200);
		expect(secondStatusCode).toBe(200);

		const [firstResponseBody, secondResponseBody] = await Promise.all([
			await firstResponse.body(),
			await secondResponse.body(),
		]);

		expect(firstResponseBody.toString()).toEqual(secondResponseBody.toString());
	});

	test('Ada can resume chat generation that has ended during request', async ({
		adaContext,
	}) => {
		const chatId = ulid();

		const firstRequest = await adaContext.request.post('/api/chat', {
			data: {
				id: chatId,
				message: {
					id: ulid(),
					role: 'user',
					content: 'Help me write an essay about Silcon Valley',
					parts: [
						{
							type: 'text',
							text: 'Help me write an essay about Silicon Valley',
						},
					],
					createdAt: new Date().toISOString(),
				},
				selectedChatModel: 'chat-model',
			},
		});

		const secondRequest = adaContext.request.get(`/api/chat/${chatId}/stream`);

		const [firstResponse, secondResponse] = await Promise.all([
			firstRequest,
			secondRequest,
		]);

		const [firstStatusCode, secondStatusCode] = await Promise.all([
			firstResponse.status(),
			secondResponse.status(),
		]);

		expect(firstStatusCode).toBe(200);
		expect(secondStatusCode).toBe(200);

		const [, secondResponseContent] = await Promise.all([
			firstResponse.text(),
			secondResponse.text(),
		]);

		expect(secondResponseContent).toContain('appendMessage');
	});

	test('Ada cannot resume chat generation that has ended', async ({
		adaContext,
	}) => {
		const chatId = ulid();

		const firstResponse = await adaContext.request.post('/api/chat', {
			data: {
				id: chatId,
				message: {
					id: ulid(),
					role: 'user',
					content: 'Help me write an essay about Silcon Valley',
					parts: [
						{
							type: 'text',
							text: 'Help me write an essay about Silicon Valley',
						},
					],
					createdAt: new Date().toISOString(),
				},
				selectedChatModel: 'chat-model',
			},
		});

		const firstStatusCode = firstResponse.status();
		expect(firstStatusCode).toBe(200);

		await firstResponse.text();
		await new Promise((resolve) => setTimeout(resolve, 15 * 1000));
		await new Promise((resolve) => setTimeout(resolve, 15000));
		const secondResponse = await adaContext.request.get(
			`/api/chat/${chatId}/stream`
		);

		const secondStatusCode = secondResponse.status();
		expect(secondStatusCode).toBe(200);

		const secondResponseContent = await secondResponse.text();
		expect(secondResponseContent).toEqual('');
	});

	test('Babbage cannot resume a private chat generation that belongs to Ada', async ({
		adaContext,
		babbageContext,
	}) => {
		const chatId = ulid();

		const firstRequest = adaContext.request.post('/api/chat', {
			data: {
				id: chatId,
				message: {
					id: ulid(),
					role: 'user',
					content: 'Help me write an essay about Silcon Valley',
					parts: [
						{
							type: 'text',
							text: 'Help me write an essay about Silicon Valley',
						},
					],
					createdAt: new Date().toISOString(),
				},
				selectedChatModel: 'chat-model',
			},
		});

		await new Promise((resolve) => setTimeout(resolve, 1000));

		const secondRequest = babbageContext.request.get(
			`/api/chat/${chatId}/stream`
		);

		const [firstResponse, secondResponse] = await Promise.all([
			firstRequest,
			secondRequest,
		]);

		const [firstStatusCode, secondStatusCode] = await Promise.all([
			firstResponse.status(),
			secondResponse.status(),
		]);

		expect(firstStatusCode).toBe(200);
		expect(secondStatusCode).toBe(403);
	});

	test('Babbage can resume a public chat generation that belongs to Ada', async ({
		adaContext,
		babbageContext,
	}) => {
		test.fixme();
		const chatId = ulid();

		const firstRequest = adaContext.request.post('/api/chat', {
			data: {
				id: chatId,
				message: {
					id: ulid(),
					role: 'user',
					content: 'Help me write an essay about Silicon Valley',
					parts: [
						{
							type: 'text',
							text: 'Help me write an essay about Silicon Valley',
						},
					],
					createdAt: new Date().toISOString(),
				},
				selectedChatModel: 'chat-model',
			},
		});

		await new Promise((resolve) => setTimeout(resolve, 10 * 1000));

		const secondRequest = babbageContext.request.get(
			`/api/chat/${chatId}/stream`
		);

		const [firstResponse, secondResponse] = await Promise.all([
			firstRequest,
			secondRequest,
		]);

		const [firstStatusCode, secondStatusCode] = await Promise.all([
			firstResponse.status(),
			secondResponse.status(),
		]);

		expect(firstStatusCode).toBe(200);
		expect(secondStatusCode).toBe(200);

		const [firstResponseContent, secondResponseContent] = await Promise.all([
			firstResponse.text(),
			secondResponse.text(),
		]);

		expect(firstResponseContent).toEqual(secondResponseContent);
	});
});
