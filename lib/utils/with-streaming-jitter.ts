import type { InferUIMessageChunk, UIMessage, UIMessageStreamWriter } from 'ai';

type JitterOptions = {
	/**
	 * Base delay in milliseconds for each chunk.
	 */
	baseMs?: number;
	/**
	 * +/- Jitter percentage to apply to the base delay.
	 * @example 0.5
	 */
	jitterPct?: number;
	/**
	 * Probability of a longer pause per chunk (0–1).
	 */
	pauseChance?: number;
	/**
	 * Range for long pauses.
	 */
	pauseMs?: [number, number];
	/**
	 * Every N chunks, add a spike delay.
	 */
	spikeEvery?: number;
	/**
	 * Range for spike delays.
	 */
	spikeMs?: [number, number];
	/**
	 * Optional deterministic seed.
	 */
	seed?: number;
};

// Basic sleep
const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

// Queue a single jittered delay
// const streamSleep = (options?: JitterOptions) => {
// 	const delay = createJitter(options);
// 	return sleep(delay());
// };

export interface WithStreamingJitterOptions<UI_MESSAGE extends UIMessage>
	extends JitterOptions {
	shouldDelay?: (part: InferUIMessageChunk<UI_MESSAGE>) => boolean;
}

export function withStreamingJitter<
	UI_MESSAGE extends UIMessage = Chat.UIMessage,
>(
	writer: UIMessageStreamWriter<UI_MESSAGE>,
	options?: WithStreamingJitterOptions<UI_MESSAGE>
) {
	const { shouldDelay = () => true, ...jitterOptions } = options || {};

	const nextDelay = createJitter(jitterOptions);
	let tail = Promise.resolve();

	return {
		write(part: InferUIMessageChunk<UI_MESSAGE>) {
			tail = tail.then(async () => {
				writer.write(part);
				if (shouldDelay(part)) await sleep(nextDelay());
			});
		},
		async flush() {
			await tail;
		},
	};
}

function createJitter(opts: JitterOptions = {}) {
	const {
		baseMs = 500,
		jitterPct = 0.5,
		pauseChance = 0.03,
		pauseMs = [224, 532],
		spikeEvery = 32,
		spikeMs = [124, 332],
		seed,
	} = opts;

	// Optional seeded RNG
	let rng = Math.random;
	if (typeof seed === 'number') {
		let s = seed >>> 0;
		rng = () => {
			s = (s + 0x6d2b79f5) | 0;
			let t = Math.imul(s ^ (s >>> 15), 1 | s);
			t ^= t + Math.imul(t ^ (t >>> 7), 61 | t);
			return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
		};
	}

	let count = 0;
	const randBetween = (min: number, max: number) => min + rng() * (max - min);

	return () => {
		count += 1;

		// occasional longer pause
		if (rng() < pauseChance) {
			return Math.round(randBetween(pauseMs[0], pauseMs[1]));
		}

		// periodic small spike
		if (spikeEvery > 0 && count % spikeEvery === 0) {
			return Math.round(randBetween(spikeMs[0], spikeMs[1]));
		}

		// base +/- jitter
		const jitter = (rng() * 2 - 1) * jitterPct; // -j..+j
		const ms = Math.max(0, baseMs * (1 + jitter));
		return Math.round(ms);
	};
}
