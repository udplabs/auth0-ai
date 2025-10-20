import { sql } from 'drizzle-orm';
import { integer } from 'drizzle-orm/sqlite-core';

export const timestamps = {
	createdAt: integer({ mode: 'timestamp_ms' })
		.default(sql`(unixepoch() * 1000)`)
		.notNull(),
	updatedAt: integer({ mode: 'timestamp_ms' })
		.default(sql`(unixepoch() * 1000)`)
		.notNull(),
};
