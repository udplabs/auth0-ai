-- CreateEnum
CREATE TYPE "public"."ContentType" AS ENUM ('guide/step', 'guide/lab', 'prompt/step', 'prompt/system', 'prompt/lab', 'prompt/unknown');

-- AlterTable
ALTER TABLE "public"."Content" ADD COLUMN     "contentType" "public"."ContentType" NOT NULL DEFAULT 'prompt/unknown';
