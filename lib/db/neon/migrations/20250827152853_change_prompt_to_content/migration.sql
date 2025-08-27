/*
  Warnings:

  - You are about to drop the `Prompts` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "public"."Prompts";

-- CreateTable
CREATE TABLE "public"."Content" (
    "id" TEXT NOT NULL,
    "contentText" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Content_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Content_type_idx" ON "public"."Content"("type");

-- CreateIndex
CREATE INDEX "Content_name_idx" ON "public"."Content"("name");
