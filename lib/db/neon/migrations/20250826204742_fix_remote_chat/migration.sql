/*
  Warnings:

  - You are about to drop the column `appInstance` on the `Message` table. All the data in the column will be lost.
  - You are about to drop the `Account` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Document` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `SampleAccount` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `SampleDocument` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `SampleTransaction` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Stream` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Transaction` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."Document" DROP CONSTRAINT "Document_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."SampleTransaction" DROP CONSTRAINT "SampleTransaction_accountId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Stream" DROP CONSTRAINT "Stream_chatId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Transaction" DROP CONSTRAINT "Transaction_accountId_fkey";

-- DropIndex
DROP INDEX "public"."Message_appInstance_idx";

-- AlterTable
ALTER TABLE "public"."Message" DROP COLUMN "appInstance";

-- DropTable
DROP TABLE "public"."Account";

-- DropTable
DROP TABLE "public"."Document";

-- DropTable
DROP TABLE "public"."SampleAccount";

-- DropTable
DROP TABLE "public"."SampleDocument";

-- DropTable
DROP TABLE "public"."SampleTransaction";

-- DropTable
DROP TABLE "public"."Stream";

-- DropTable
DROP TABLE "public"."Transaction";

-- DropEnum
DROP TYPE "public"."TransactionType";
