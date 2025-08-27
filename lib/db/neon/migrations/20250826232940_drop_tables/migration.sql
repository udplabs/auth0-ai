/*
  Warnings:

  - You are about to drop the `Chat` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Message` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Settings` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."Chat" DROP CONSTRAINT "Chat_appInstanceId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Message" DROP CONSTRAINT "Message_chatId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Settings" DROP CONSTRAINT "Settings_appInstanceId_fkey";

-- DropTable
DROP TABLE "public"."Chat";

-- DropTable
DROP TABLE "public"."Message";

-- DropTable
DROP TABLE "public"."Settings";

-- CreateTable
CREATE TABLE "public"."RemoteChat" (
    "id" TEXT NOT NULL,
    "userId" TEXT,
    "title" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "appInstanceId" TEXT NOT NULL,

    CONSTRAINT "RemoteChat_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."RemoteMessage" (
    "id" TEXT NOT NULL,
    "chatId" TEXT NOT NULL,
    "userId" TEXT,
    "role" TEXT NOT NULL,
    "parts" JSONB NOT NULL,
    "metadata" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "attachments" JSONB,
    "vote" "public"."VoteType",

    CONSTRAINT "RemoteMessage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."RemoteSettings" (
    "id" TEXT NOT NULL,
    "currentLabStep" TEXT NOT NULL,
    "labMeta" TEXT,
    "preferences" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "appInstanceId" TEXT NOT NULL,

    CONSTRAINT "RemoteSettings_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "RemoteChat_userId_idx" ON "public"."RemoteChat"("userId");

-- CreateIndex
CREATE INDEX "RemoteChat_appInstanceId_idx" ON "public"."RemoteChat"("appInstanceId");

-- CreateIndex
CREATE INDEX "RemoteMessage_chatId_idx" ON "public"."RemoteMessage"("chatId");

-- CreateIndex
CREATE INDEX "RemoteMessage_userId_idx" ON "public"."RemoteMessage"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "RemoteSettings_appInstanceId_key" ON "public"."RemoteSettings"("appInstanceId");

-- CreateIndex
CREATE INDEX "RemoteSettings_appInstanceId_idx" ON "public"."RemoteSettings"("appInstanceId");

-- AddForeignKey
ALTER TABLE "public"."RemoteChat" ADD CONSTRAINT "RemoteChat_appInstanceId_fkey" FOREIGN KEY ("appInstanceId") REFERENCES "public"."AppInstance"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."RemoteMessage" ADD CONSTRAINT "RemoteMessage_chatId_fkey" FOREIGN KEY ("chatId") REFERENCES "public"."RemoteChat"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."RemoteSettings" ADD CONSTRAINT "RemoteSettings_appInstanceId_fkey" FOREIGN KEY ("appInstanceId") REFERENCES "public"."AppInstance"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
