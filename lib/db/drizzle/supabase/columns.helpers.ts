import { timestamp } from 'drizzle-orm/pg-core';

export const timestamps = {
	createdAt: timestamp({ precision: 3, mode: 'string', withTimezone: true })
		.defaultNow()
		.notNull(),
	updatedAt: timestamp({ precision: 3, mode: 'string', withTimezone: true })
		.defaultNow()
		.notNull(),
};
