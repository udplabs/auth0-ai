/*
  Warnings:

  - You are about to drop the column `sourceId` on the `Document` table. All the data in the column will be lost.
  - You are about to drop the column `view` on the `Document` table. All the data in the column will be lost.
  - You are about to drop the column `sourceId` on the `SampleDocument` table. All the data in the column will be lost.
  - You are about to drop the column `view` on the `SampleDocument` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Document" (
    "id" TEXT NOT NULL PRIMARY KEY,
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
CREATE TABLE "new_SampleDocument" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "pageContent" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "embedding" JSONB NOT NULL,
    "metadata" JSONB NOT NULL
);
INSERT INTO "new_SampleDocument" ("createdAt", "embedding", "id", "metadata", "pageContent", "updatedAt") SELECT "createdAt", "embedding", "id", "metadata", "pageContent", "updatedAt" FROM "SampleDocument";
DROP TABLE "SampleDocument";
ALTER TABLE "new_SampleDocument" RENAME TO "SampleDocument";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
