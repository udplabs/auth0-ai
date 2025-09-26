-- AlterTable
ALTER TABLE "public"."RemoteSettings" ADD COLUMN     "currentModule" TEXT,
ADD COLUMN     "currentStep" TEXT,
ADD COLUMN     "currentTask" TEXT;
