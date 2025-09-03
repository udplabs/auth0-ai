import type { RemoteContent } from '@/lib/db/generated/neon';
import type { Content as LocalContent } from '@/lib/db/generated/prisma';

declare global {
	namespace Content {
		interface UIContent
			extends Omit<
					RemoteContent,
					'createdAt' | 'updatedAt' | 'contentType' | 'type'
				>,
				Omit<
					LocalContent,
					'createdAt' | 'expiresAt' | 'lastSyncedAt' | 'contentType' | 'type'
				> {
			createdAt?: string;
			updatedAt?: string;
			contentType: UIContentType;
			// Free-form for now.
			// oneof: 'guide' | 'prompt' | 'unknown'
			type: string;
		}

		/**
		 * GUIDE_: Presented to user as static content OR incorporated into response with adjustments.
		 *
		 * PROMPT_: Ingested as part of _system prompt_.
		 *
		 */
		type UIType =
			| 'guide/step'
			| 'guide/lab'
			| 'prompt/step'
			| 'prompt/system'
			| 'prompt/lab'
			| 'prompt/unknown'
			| 'reference/code';

		interface GetParams {
			name?: string;
			filename?: string;
			id?: string;
			step?: string;
			type?: string;
			contentType?: Content.UIType;
		}
	}
}
