-- CreateEnum
CREATE TYPE "public"."ContentPlacement" AS ENUM ('aiya', 'labs', 'reference', 'prompt', 'secret');

-- DropIndex
DROP INDEX "public"."RemoteContent_type_idx";

-- AlterTable
ALTER TABLE "public"."RemoteContent" ADD COLUMN     "contentPlacement" "public"."ContentPlacement";

-- CreateIndex
CREATE INDEX "RemoteContent_contentPlacement_idx" ON "public"."RemoteContent"("contentPlacement");
