import { DB_POSTGRES_URL } from '@/lib/constants';
import { defineConfig } from 'drizzle-kit';

export default defineConfig({
	dialect: 'postgresql',
	schema: './lib/db/drizzle/supabase/schema.ts',
	out: './lib/db/drizzle/supabase',
	dbCredentials: {
		url: DB_POSTGRES_URL,
	},
});
