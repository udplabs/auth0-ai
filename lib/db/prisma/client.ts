// biome ignore-all lint/performance/noDelete: middleware needs flexibility

import { PrismaClient, type Prisma } from '../generated/prisma';

const prisma = new PrismaClient();

export { prisma };
