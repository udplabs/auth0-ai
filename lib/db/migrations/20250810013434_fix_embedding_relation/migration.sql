/*
  Warnings:

  - You are about to drop the column `embeddingId` on the `Chunk` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Chunk" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "pageContent" TEXT NOT NULL,
    "metadata" JSONB NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_Chunk" ("createdAt", "id", "metadata", "pageContent", "updatedAt") SELECT "createdAt", "id", "metadata", "pageContent", "updatedAt" FROM "Chunk";
DROP TABLE "Chunk";
ALTER TABLE "new_Chunk" RENAME TO "Chunk";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
