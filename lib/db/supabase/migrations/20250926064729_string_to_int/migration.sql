/*
  Warnings:

  - The `currentModule` column on the `RemoteSettings` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `currentStep` column on the `RemoteSettings` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `currentTask` column on the `RemoteSettings` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "public"."RemoteSettings" DROP COLUMN "currentModule",
ADD COLUMN     "currentModule" INTEGER,
DROP COLUMN "currentStep",
ADD COLUMN     "currentStep" INTEGER,
DROP COLUMN "currentTask",
ADD COLUMN     "currentTask" INTEGER;
