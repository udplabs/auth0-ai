import { APIError } from '@/lib/errors';

import type { Chat } from '@/types/chat';

const dateFields = [
	'openedDate',
	'closedDate',
	'lastPaymentDate',
	'nextPaymentDate',
	'dueDate',
	'date',
];
const subTypes = ['messages', 'transactions', 'documents'];

export function convertToDB<UI = any, DB = any>(
	uiItem: UI,
	excludeKeys: string[] = []
): DB {
	try {
		const isArray = Array.isArray(uiItem);
		const result = [];
		const items = isArray ? uiItem : [uiItem];

		for (const item of items) {
			const dbItem: any = {};
			const isMessage = !!item?.role; // crude check for messages

			for (const [key, value] of Object.entries(item)) {
				if (excludeKeys.includes(key)) {
					// Instructed to skip!
					continue;
				}

				if (value === null || value === undefined) {
					dbItem[key] = null;
					continue;
				}

				if (key === 'metadata' && isMessage) {
					const { userId, chatId, ...rest } =
						(value as Chat.MessageMetadata) || {};

					dbItem[key] = rest;
					if (!excludeKeys.includes('userId')) dbItem['userId'] = userId;
					if (!excludeKeys.includes('chatId')) dbItem['chatId'] = chatId;
				}

				if (dateFields.includes(key) && typeof value === 'string') {
					dbItem[key] = new Date(value);
					continue;
				}

				if (subTypes.includes(key) && Array.isArray(value)) {
					dbItem[key] = {
						create: convertToDB(value),
					};
					continue;
				}

				dbItem[key] = value;
				continue;
			}
			result.push(dbItem);
		}
		if (result.length === 1 && !isArray) {
			return result[0] as DB;
		}

		return result as DB;
	} catch (error: unknown) {
		console.info('convertToDB error');
		console.error(error);
		if (error instanceof APIError) {
			throw error;
		}

		throw new APIError('unknown:database', error);
	}
}

export function convertToUI<DB = any, UI = any>(dbItem: DB): UI {
	try {
		const isArray = Array.isArray(dbItem);
		const result = [];
		const items = isArray ? dbItem : [dbItem];

		for (const item of items) {
			const uiItem: any = {};
			const hasMetadata = !!(item as any)?.metadata;
			const isMessage = !!(item as any)?.role; // crude check for messages

			// Ensure metadata object exists if we'll ever write to it
			if (isMessage || hasMetadata) {
				uiItem.metadata = uiItem.metadata ?? {};
			}

			for (const [key, value] of Object.entries(item as any)) {
				// We don't want to overwrite any newly added metadata
				if (key === 'metadata') {
					uiItem['metadata'] = {
						...(value as object),
						...uiItem['metadata'],
					};
					continue;
				}

				// The UI prefers strings.
				if (value instanceof Date) {
					const newValue = new Date(value).toISOString();

					// If a message, always place createdAt/updatedAt under metadata, and ensure it exists
					if (isMessage && (key === 'createdAt' || key === 'updatedAt')) {
						uiItem['metadata'] = uiItem['metadata'] ?? {};
						uiItem['metadata'][key] = newValue;
						continue;
					}

					uiItem[key] = newValue;
					continue;
				}

				// We don't like null values in the UI but the DB does.
				if (value === null) {
					uiItem[key] = undefined;
					continue;
				}

				// Convert known arrays of related items
				if (subTypes.includes(key) && value !== undefined) {
					uiItem[key] = convertToUI(value);
					continue;
				}

				if (isMessage && !['role', 'parts', 'id', 'metadata'].includes(key)) {
					// Move DB fields for messages into metadata without overwriting existing metadata
					uiItem['metadata'] = uiItem['metadata'] ?? {};
					uiItem['metadata'][key] = value;
					continue;
				}

				// Remove Sample data fields
				if (['lastSyncedAt', 'expiresAt'].includes(key)) {
					continue;
				}

				// Direct assignment for all other types
				uiItem[key] = value;
			}
			result.push(uiItem);
		}

		if (result.length === 1 && !isArray) {
			return result[0] as UI;
		}
		return result as UI;
	} catch (error: unknown) {
		console.info('convertToUI error');
		console.error(error);
		if (error instanceof APIError) {
			throw error;
		}
		throw new APIError('unknown:database', error);
	}
}
