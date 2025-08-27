import { neonConfig } from '@neondatabase/serverless';
import { PrismaNeon } from '@prisma/adapter-neon';
import dotenv from 'dotenv';
import ws from 'ws';
import { PrismaClient } from '../generated/neon';

dotenv.config();
neonConfig.webSocketConstructor = ws;
neonConfig.useSecureWebSocket = true;

const connectionString = `${process.env.NEON_URL}`;

const adapter = new PrismaNeon({ connectionString });
export const neon = new PrismaClient({ adapter });
