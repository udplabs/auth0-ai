-- DropIndex
DROP INDEX "LocalContent_type_idx";

-- AlterTable
ALTER TABLE "LocalContent" ADD COLUMN "contentPlacement" TEXT;

-- CreateIndex
CREATE INDEX "LocalContent_contentPlacement_idx" ON "LocalContent"("contentPlacement");
