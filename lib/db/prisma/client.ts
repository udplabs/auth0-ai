import { PrismaBetterSQLite3 } from '@prisma/adapter-better-sqlite3';
import { PrismaClient } from '../generated/prisma/client';

const adapter = new PrismaBetterSQLite3({ url: 'file:./lib/db/prisma/dev.db' });
export const prisma = new PrismaClient({ adapter });
