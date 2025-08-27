import type { StopCondition } from 'ai';

export function hasOwnUI(): StopCondition<any> {
	return ({ steps }) => {
		const last = steps.at(-1);
		console.log(last?.content);

		if (!last) return false;

		// v5 aggregates results; support both properties for backward compatibility
		const results = last?.toolResults ?? last?.dynamicToolResults ?? [];
		const lastResult = results.at(-1);

		const hasOwnUI = (lastResult?.output as any)?.hasOwnUI;
		console.log('hasOwnUI:', hasOwnUI, hasOwnUI ? 'Stopping!' : '');

		return hasOwnUI;
	};
}
