-- CreateEnum
CREATE TYPE "public"."MimeType" AS ENUM ('text/markdown', 'text/plain', 'text/html', 'text/csv', 'application/json', 'application/xml');

-- AlterTable
ALTER TABLE "public"."Content" ADD COLUMN     "mimeType" "public"."MimeType" NOT NULL DEFAULT 'text/plain';
