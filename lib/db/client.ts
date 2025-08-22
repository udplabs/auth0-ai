// biome ignore-all lint/performance/noDelete: middleware needs flexibility

import { PrismaClient, type Prisma } from './generated/prisma';

const prisma = new PrismaClient();

// Middleware to parse create/update messages 'metadata' fields stripped.
// const safeMessageMiddleware: Prisma.Middleware = (params, next) => {
//   if (['create', 'update', 'upsert'].includes(params?.action)) {
//     console.log('removing dates....');
//     delete params.args?.data?.created_at;
//     delete params.args?.data?.updated_at;
//   }
//   if (params?.action === 'update') {
//     delete params.args?.data?.chat_id;
//     delete params.args?.data?.user_id;
//   }

//   return next(params);
// };

// prisma.$use(safeMessageMiddleware);

export { prisma };
