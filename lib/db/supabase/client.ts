import { PrismaClient } from '@/lib/db/generated/supabase/client';
import { PrismaPg } from '@prisma/adapter-pg';

const adapter = new PrismaPg({
	connectionString:
		'postgresql://prisma.xklcosxshargpemxjckd:DTLNR5uy3v6mJd0KcmP2zzp2ab@aws-1-us-west-1.pooler.supabase.com:6543/postgres?pgbouncer=true',
});
export const supabase = new PrismaClient({ adapter });
