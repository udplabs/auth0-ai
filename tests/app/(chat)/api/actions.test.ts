import esmock from 'esmock';
import { expect, test } from '../../../fixtures';

// tiny spy
function spy<T extends (...args: any[]) => any>(impl: T) {
	const calls: any[][] = [];
	const fn = ((...args: any[]) => {
		calls.push(args);
		return impl(...args);
	}) as T & { __calls: any[][] };
	(fn as any).__calls = calls;
	return fn;
}

test.describe('actions (with module stubs via esmock)', () => {
	let chatKey: any;
	let deleteTrailingMessages: any;
	let generateTitleFromUserMessage: any;
	let getErrorMessage: any;

	// spies for dependencies
	const getCacheKey = spy(({ userId, id, resource, metadata }: any) =>
		JSON.stringify({ userId, id, resource, metadata })
	);
	const languageModel = spy(() => 'mock-model' as const);
	const generateText = spy(async () => ({ text: 'GENERATED_TEXT' }));
	const getChatByMessageId = spy(async () => ({ id: 'chat-123' }));
	const deleteMessagesByChatId = spy(async () => undefined);

	test.beforeAll(async () => {
		// Import actions with its dependencies mocked
		({
			chatKey,
			deleteTrailingMessages,
			generateTitleFromUserMessage,
			getErrorMessage,
		} = await esmock('@/app/(chat)/api/actions', {
			'@/lib/utils/get-cache-key': { getCacheKey },
			'@/lib/ai/providers': { myProvider: { languageModel } },
			ai: { generateText },
			'@/lib/db/queries/chat': {
				getChatByMessageId,
			},
			'@/lib/db//queries/chat': {
				getChatById: () => undefined,
				listChatsByUserId: () => undefined,
			},
			'@/lib/db/queries/message': { deleteMessagesByChatId },
		}));
	});

	test('chatKey basic behavior', () => {
		const base = { userId: 'user-1' };
		const key = chatKey({
			...base,
			id: 'x1',
			grouped: true,
			page: 3,
			pageSize: 25,
		});
		const parsed = JSON.parse(key);

		expect(parsed.resource).toContain('chat');
		expect(parsed.metadata).toEqual(
			expect.arrayContaining(['page:3', 'pageSize:25', 'grouped'])
		);

		const [args] = getCacheKey.__calls;
		expect(args[0]).toEqual(
			expect.objectContaining({
				userId: 'user-1',
				id: 'x1',
				resource: ['chat'],
			})
		);
	});

	test('generateTitleFromUserMessage returns existing title without LLM', async () => {
		generateText.__calls.length = 0;
		const message = { role: 'user', content: 'Hi' } as any;
		const result = await generateTitleFromUserMessage({
			message,
			title: 'Existing',
		});
		expect(result).toBe('Existing');
		expect(generateText.__calls.length).toBe(0);
	});

	test('generateTitleFromUserMessage calls LLM when title is null', async () => {
		generateText.__calls.length = 0;
		const message = { role: 'user', content: 'Hi' } as any;
		const result = await generateTitleFromUserMessage({ message, title: null });
		expect(generateText.__calls.length).toBe(1);
		const [args] = generateText.__calls;
		expect(args[0]).toEqual(expect.objectContaining({ model: 'mock-model' }));
		expect(result).toBe('GENERATED_TEXT');
	});

	test('getErrorMessage builds prompt and returns generated text', async () => {
		generateText.__calls.length = 0;
		const text = await getErrorMessage(new Error('Boom'));
		expect(generateText.__calls.length).toBe(1);
		const [args] = generateText.__calls;
		expect(String(args[0].prompt)).toContain('Boom');
		expect(text).toBe('GENERATED_TEXT');
	});

	test('deleteTrailingMessages resolves chat id and deletes', async () => {
		getChatByMessageId.__calls.length = 0;
		deleteMessagesByChatId.__calls.length = 0;

		await deleteTrailingMessages('message-9', 'user-22');

		expect(getChatByMessageId.__calls[0]).toEqual(['message-9', 'user-22']);
		expect(deleteMessagesByChatId.__calls[0]).toEqual(['chat-123']);
	});
});
