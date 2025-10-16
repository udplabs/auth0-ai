import { DB_SQL_URL } from '@/lib/constants';
import * as relations from '@/lib/db/drizzle/sql/relations';
import * as schema from '@/lib/db/drizzle/sql/schema';
import { type AnyColumn, sql as dSQL } from 'drizzle-orm';
import { drizzle } from 'drizzle-orm/libsql';

export const sql = drizzle({
	connection: { url: DB_SQL_URL },
	schema: { ...schema, ...relations },
});

export const increment = (column: AnyColumn, value = 1) => {
	return dSQL`${column} + ${value}`;
};
export const decrement = (column: AnyColumn, value = 1) => {
	return dSQL`${column} - ${value}`;
};
