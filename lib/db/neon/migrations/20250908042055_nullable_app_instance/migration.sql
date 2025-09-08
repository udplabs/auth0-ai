-- DropIndex
DROP INDEX "public"."RemoteSettings_appInstanceId_key";

-- AlterTable
ALTER TABLE "public"."RemoteChat" ALTER COLUMN "appInstanceId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "public"."RemoteSettings" ALTER COLUMN "appInstanceId" DROP NOT NULL;
