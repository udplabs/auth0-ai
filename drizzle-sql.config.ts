import { DB_SQL_URL } from '@/lib/constants';
import { defineConfig } from 'drizzle-kit';

export default defineConfig({
	dialect: 'sqlite',
	schema: './lib/db/drizzle/sql/schema.ts',
	out: './lib/db/drizzle/sql',
	dbCredentials: {
		url: DB_SQL_URL,
	},
});
