/*
  Warnings:

  - You are about to drop the column `moduleStep` on the `LocalContent` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_LocalContent" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "textData" TEXT,
    "applicationData" JSONB,
    "name" TEXT NOT NULL,
    "labStep" TEXT,
    "labModule" INTEGER,
    "contentPlacement" TEXT,
    "contentType" TEXT NOT NULL DEFAULT 'prompt/unknown',
    "mimeType" TEXT NOT NULL DEFAULT 'text/plain',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "lastSyncedAt" DATETIME,
    "expiresAt" DATETIME
);
INSERT INTO "new_LocalContent" ("applicationData", "contentPlacement", "contentType", "createdAt", "expiresAt", "id", "labStep", "lastSyncedAt", "mimeType", "name", "textData", "updatedAt") SELECT "applicationData", "contentPlacement", "contentType", "createdAt", "expiresAt", "id", "labStep", "lastSyncedAt", "mimeType", "name", "textData", "updatedAt" FROM "LocalContent";
DROP TABLE "LocalContent";
ALTER TABLE "new_LocalContent" RENAME TO "LocalContent";
CREATE INDEX "LocalContent_contentPlacement_idx" ON "LocalContent"("contentPlacement");
CREATE INDEX "LocalContent_name_idx" ON "LocalContent"("name");
CREATE INDEX "LocalContent_labStep_idx" ON "LocalContent"("labStep");
CREATE INDEX "LocalContent_contentType_idx" ON "LocalContent"("contentType");
CREATE INDEX "LocalContent_mimeType_idx" ON "LocalContent"("mimeType");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
