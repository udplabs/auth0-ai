import { neonConfig } from '@neondatabase/serverless';
import { PrismaNeon } from '@prisma/adapter-neon';
import dotenv from 'dotenv';
import ws from 'ws';
import { PrismaClient } from '../generated/neon/client';

dotenv.config();
neonConfig.webSocketConstructor = ws;
neonConfig.useSecureWebSocket = true;

const connectionString =
	'postgresql://neondb_owner:npg_1ScLhxjIGJM5@ep-super-dew-afntfukw-pooler.c-2.us-west-2.aws.neon.tech/neondb?sslmode=require&sslaccept=accept_invalid_certs&connection_timeout=500&pool_timeout=500';

const adapter = new PrismaNeon({ connectionString });
export const neon = new PrismaClient({ adapter });
