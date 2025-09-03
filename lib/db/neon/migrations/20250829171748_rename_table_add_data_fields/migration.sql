/*
  Warnings:

  - You are about to drop the `Content` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "public"."Content";

-- CreateTable
CREATE TABLE "public"."RemoteContent" (
    "id" TEXT NOT NULL,
    "textData" TEXT,
    "applicationData" JSONB,
    "name" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "contentType" "public"."ContentType" NOT NULL DEFAULT 'prompt/unknown',
    "mimeType" "public"."MimeType" NOT NULL DEFAULT 'text/plain',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "RemoteContent_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "RemoteContent_type_idx" ON "public"."RemoteContent"("type");

-- CreateIndex
CREATE INDEX "RemoteContent_name_idx" ON "public"."RemoteContent"("name");
