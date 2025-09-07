import type { RemoteContent } from '@/lib/db/generated/neon';
import type { LocalContent } from '@/lib/db/generated/prisma';

declare global {
	namespace Content {
		interface UIContent
			extends Omit<
					RemoteContent,
					| 'createdAt'
					| 'updatedAt'
					| 'contentType'
					| 'contentPlacement'
					| 'mimeType'
				>,
				Omit<
					LocalContent,
					| 'createdAt'
					| 'expiresAt'
					| 'lastSyncedAt'
					| 'contentType'
					| 'type'
					| 'mimeType'
				> {
			createdAt?: string;
			updatedAt?: string;
			contentType: Content.UIContentType;
			contentPlacement?: Content.UIContentPlacement;
			embedding?: number[];
			mimeType?: Content.UIMimeType;
		}

		type UIContentPlacement = 'aiya' | 'labs' | 'secret';

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

		type UIMimeType =
			| 'text/markdown'
			| 'text/plan'
			| 'text/html'
			| 'text/csv'
			| 'application/json'
			| 'application/xml'
			| 'application/typescript';

		interface GetParams {
			key?: Content.QueryKeys;
			query?: string;
			contentPlacement?: Content.ContentPlacement;
			contentType?: Content.UIType;
		}

		type QueryKeys = 'name' | 'filename' | 'labStep';
	}
}
