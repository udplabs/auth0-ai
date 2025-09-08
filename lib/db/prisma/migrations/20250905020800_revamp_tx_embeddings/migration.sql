/*
  Warnings:

  - Added the required column `sourceId` to the `Document` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sourceId` to the `SampleDocument` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Document" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "sourceId" TEXT NOT NULL,
    "view" TEXT,
    "pageContent" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "embedding" JSONB NOT NULL,
    "metadata" JSONB NOT NULL,
    CONSTRAINT "Document_id_fkey" FOREIGN KEY ("id") REFERENCES "Transaction" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Document" ("createdAt", "embedding", "id", "metadata", "pageContent", "updatedAt") SELECT "createdAt", "embedding", "id", "metadata", "pageContent", "updatedAt" FROM "Document";
DROP TABLE "Document";
ALTER TABLE "new_Document" RENAME TO "Document";
CREATE INDEX "Document_sourceId_idx" ON "Document"("sourceId");
CREATE TABLE "new_SampleDocument" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "sourceId" TEXT NOT NULL,
    "view" TEXT,
    "pageContent" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "embedding" JSONB NOT NULL,
    "metadata" JSONB NOT NULL
);
INSERT INTO "new_SampleDocument" ("createdAt", "embedding", "id", "metadata", "pageContent", "updatedAt") SELECT "createdAt", "embedding", "id", "metadata", "pageContent", "updatedAt" FROM "SampleDocument";
DROP TABLE "SampleDocument";
ALTER TABLE "new_SampleDocument" RENAME TO "SampleDocument";
CREATE INDEX "SampleDocument_sourceId_idx" ON "SampleDocument"("sourceId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
