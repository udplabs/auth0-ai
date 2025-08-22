/*
  Warnings:

  - You are about to drop the column `accountId` on the `Embedding` table. All the data in the column will be lost.
  - You are about to drop the column `value` on the `Embedding` table. All the data in the column will be lost.
  - Added the required column `metadata` to the `Embedding` table without a default value. This is not possible if the table is not empty.
  - Added the required column `pageContent` to the `Embedding` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Embedding" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "model" TEXT NOT NULL,
    "pageContent" TEXT NOT NULL,
    "embedding" JSONB NOT NULL,
    "metadata" JSONB NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_Embedding" ("createdAt", "embedding", "id", "model", "updatedAt", "userId") SELECT "createdAt", "embedding", "id", "model", "updatedAt", "userId" FROM "Embedding";
DROP TABLE "Embedding";
ALTER TABLE "new_Embedding" RENAME TO "Embedding";
CREATE INDEX "Embedding_userId_idx" ON "Embedding"("userId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
