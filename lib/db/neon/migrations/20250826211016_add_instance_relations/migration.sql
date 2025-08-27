/*
  Warnings:

  - You are about to drop the column `appInstance` on the `Chat` table. All the data in the column will be lost.
  - You are about to drop the column `appInstance` on the `Settings` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[appInstanceId]` on the table `Settings` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `appInstanceId` to the `Chat` table without a default value. This is not possible if the table is not empty.
  - Added the required column `appInstanceId` to the `Settings` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "public"."AppInstance_hashedInstanceId_key";

-- DropIndex
DROP INDEX "public"."Chat_appInstance_idx";

-- DropIndex
DROP INDEX "public"."Settings_appInstance_idx";

-- AlterTable
ALTER TABLE "public"."AppInstance" ALTER COLUMN "hashedInstanceId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "public"."Chat" DROP COLUMN "appInstance",
ADD COLUMN     "appInstanceId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "public"."Settings" DROP COLUMN "appInstance",
ADD COLUMN     "appInstanceId" TEXT NOT NULL;

-- CreateIndex
CREATE INDEX "Chat_appInstanceId_idx" ON "public"."Chat"("appInstanceId");

-- CreateIndex
CREATE UNIQUE INDEX "Settings_appInstanceId_key" ON "public"."Settings"("appInstanceId");

-- CreateIndex
CREATE INDEX "Settings_appInstanceId_idx" ON "public"."Settings"("appInstanceId");

-- AddForeignKey
ALTER TABLE "public"."Chat" ADD CONSTRAINT "Chat_appInstanceId_fkey" FOREIGN KEY ("appInstanceId") REFERENCES "public"."AppInstance"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Settings" ADD CONSTRAINT "Settings_appInstanceId_fkey" FOREIGN KEY ("appInstanceId") REFERENCES "public"."AppInstance"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
