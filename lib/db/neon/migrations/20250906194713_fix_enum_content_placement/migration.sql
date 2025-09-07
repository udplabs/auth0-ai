/*
  Warnings:

  - The values [reference,prompt] on the enum `ContentPlacement` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "public"."ContentPlacement_new" AS ENUM ('aiya', 'labs', 'secret');
ALTER TABLE "public"."RemoteContent" ALTER COLUMN "contentPlacement" TYPE "public"."ContentPlacement_new" USING ("contentPlacement"::text::"public"."ContentPlacement_new");
ALTER TYPE "public"."ContentPlacement" RENAME TO "ContentPlacement_old";
ALTER TYPE "public"."ContentPlacement_new" RENAME TO "ContentPlacement";
DROP TYPE "public"."ContentPlacement_old";
COMMIT;
