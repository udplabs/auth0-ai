// lib/ai/model/interrupts-middleware.ts
import { createEmptyModelResult } from '@/lib/ai/model/utils';
import type { outputSchema as TransferOutputSchema } from '@/lib/ai/tools/transfer-funds';
import { currencyFormatter, ulid } from '@/lib/utils';
import { chunk } from '@/lib/utils/chunking';
import type z from '@/node_modules/zod/v4/classic/external.cjs';
import type { Chat } from '@/types/chat';
import type { LanguageModelV2Middleware } from '@ai-sdk/provider';
import type { ModelMessage, ToolSet, UIMessageStreamWriter } from 'ai';

export const interruptsMiddleware: LanguageModelV2Middleware = {
	middlewareVersion: 'v2',
	wrapStream: async ({ doStream, params }) => {
		const { prompt: modelMessages, providerOptions = {} } = params;

		const { interrupt, tools, writer } =
			(providerOptions as Chat.CustomProviderOptions)?.interruptsMiddleware ||
			{};

		if (interrupt && tools && writer) {
			await handleInterrupt({
				interrupt,
				modelMessages,
				writer,
				tools,
			});

			return createEmptyModelResult();
		}

		return doStream();
	},
};

interface HandleInterruptOptions {
	modelMessages: ModelMessage[];
	tools: ToolSet;
	writer: UIMessageStreamWriter<Chat.UIMessage>;
	interrupt: Chat.Interrupt;
}

async function handleInterrupt({
	interrupt: { data, type },
	modelMessages,
	tools,
	writer,
}: HandleInterruptOptions) {
	const tool = tools[type];

	// Quick unnecessary short-circuit to account for future use cases b/c why not
	if (!tool || type !== 'transferFunds') {
		return;
	}

	// Manually invoke a tool. Didn't know you could do that, did ya? :D

	// 1) Kick off the response
	writer.write({
		type: 'start-step',
	});

	const toolCallId = `call_${ulid()}`;

	// 2) Start the tool -- sets tool-result to 'Running'
	writer.write({
		type: 'tool-input-available',
		toolCallId,
		toolName: 'transferFunds',
		input: data,
	});

	// 3) Execute the tool
	const transferResult: z.infer<typeof TransferOutputSchema> | undefined =
		await tool.execute?.(data, {
			toolCallId,
			messages: modelMessages,
		});

	// 4) Return the tool results -- sets tool-result to 'Completed'
	writer.write({
		type: 'tool-output-available',
		toolCallId,
		output: transferResult,
	});

	// 5) Start sending text response
	const messageId = ulid();
	writer.write({
		type: 'text-start',
		id: messageId,
	});

	const { fromAccount, toAccount } = transferResult?.data || {};
	const {
		balance: fromBalance = 0,
		displayName: fromAccountDisplayName = '',
		number: fromAccountNumber = '',
		currencyCode = 'USD',
	} = fromAccount || {};
	const {
		balance: toBalance = 0,
		displayName: toAccountDisplayName = '',
		number: toAccountNumber = '',
	} = toAccount || {};

	// 6) Create response content
	const response = `Done! Transferred ${currencyFormatter(data.amount, { currencyCode })}.\n\n#### Resulting Balances\n|     |     |\n| --- | --- |\n| ${maskAccountNumber(fromAccountNumber)} - ${fromAccountDisplayName} | ${currencyFormatter(fromBalance, { currencyCode })} |\n| ${maskAccountNumber(toAccountNumber)} - ${toAccountDisplayName} | ${currencyFormatter(toBalance, { currencyCode })} |`;

	// 7) Chunk the response into manageable pieces (to simulate streaming)
	const chunks = chunk(response, 'paragraphs');

	// 8) Send each chunk as a separate delta
	for (const delta of chunks) {
		writer.write({
			type: 'text-delta',
			delta,
			id: messageId,
		});
	}

	// 9) Close the text response
	writer.write({
		type: 'text-end',
		id: messageId,
	});

	// 10) Finish the step
	writer.write({
		type: 'finish-step',
	});
}

function maskAccountNumber(accountString: string) {
	const maskedPartLength =
		accountString.length > 2 ? Math.ceil(accountString.length * 0.6) : 1;
	const visiblePartLength = accountString.length - maskedPartLength;
	const maskedPart = '*'.repeat(maskedPartLength);
	const visiblePart = accountString.slice(visiblePartLength);
	return maskedPart + visiblePart;
}
