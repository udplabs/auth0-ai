/*
  Warnings:

  - You are about to drop the column `contentText` on the `LocalContent` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;

CREATE TABLE "new_LocalContent" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "textData" TEXT,
    "applicationData" JSONB,
    "name" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "contentType" TEXT NOT NULL DEFAULT 'prompt/unknown',
    "mimeType" TEXT NOT NULL DEFAULT 'text/plain',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "lastSyncedAt" DATETIME,
    "expiresAt" DATETIME
);

INSERT INTO "new_LocalContent" ("textData", "contentType", "createdAt", "expiresAt", "id", "lastSyncedAt", "mimeType", "name", "type") SELECT "contentText", "contentType", "createdAt", "expiresAt", "id", "lastSyncedAt", "mimeType", "name", "type" FROM "LocalContent";

DROP TABLE "LocalContent";

ALTER TABLE "new_LocalContent" RENAME TO "LocalContent";

CREATE INDEX "LocalContent_type_idx" ON "LocalContent"("type");
CREATE INDEX "LocalContent_name_idx" ON "LocalContent"("name");

PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
