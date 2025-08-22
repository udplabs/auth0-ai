/*
  Warnings:

  - You are about to drop the `Chunk` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the column `documentId` on the `Embedding` table. All the data in the column will be lost.
  - Added the required column `metadata` to the `Embedding` table without a default value. This is not possible if the table is not empty.
  - Added the required column `pageContent` to the `Embedding` table without a default value. This is not possible if the table is not empty.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Chunk";
PRAGMA foreign_keys=on;

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Embedding" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "pageContent" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "embedding" JSONB NOT NULL,
    "metadata" JSONB NOT NULL
);
INSERT INTO "new_Embedding" ("createdAt", "embedding", "id", "updatedAt") SELECT "createdAt", "embedding", "id", "updatedAt" FROM "Embedding";
DROP TABLE "Embedding";
ALTER TABLE "new_Embedding" RENAME TO "Embedding";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
