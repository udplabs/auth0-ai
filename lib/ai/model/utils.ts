import type { Chat } from '@/types/chat';
import type {
	LanguageModelV2CallOptions,
	LanguageModelV2StreamPart,
} from '@ai-sdk/provider';
/**
 * Produce an empty model result (no model tokens) while preserving the
 * structural type returned by doStream(). We call doStream *only* to grab
 * a shape reference then discard (NOT invoking underlying fetch).
 *
 * Implementation: we DON'T call doStream() (would run model). Instead we
 * mimic its return shape using a noop async generator & empty ReadableStream.
 */
export function createEmptyModelResult() {
	const emptyReadable = new ReadableStream<LanguageModelV2StreamPart>({
		start(controller) {
			controller.close();
		},
	});

	return {
		stream: emptyReadable,
	};
}

export function getProviderOptions<
	P extends
		Chat.CustomProviderDefaultOptions = Chat.CustomProviderDefaultOptions,
>(provider: string, params: LanguageModelV2CallOptions): P | undefined {
	return params?.providerOptions?.[provider] as P | undefined;
}
