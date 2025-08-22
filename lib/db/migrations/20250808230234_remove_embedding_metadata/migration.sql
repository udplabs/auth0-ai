/*
  Warnings:

  - You are about to drop the column `metadata` on the `Embedding` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Embedding" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "accountId" TEXT NOT NULL,
    "model" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "embedding" JSONB NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Embedding_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "Account" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Embedding" ("accountId", "createdAt", "embedding", "id", "model", "updatedAt", "userId", "value") SELECT "accountId", "createdAt", "embedding", "id", "model", "updatedAt", "userId", "value" FROM "Embedding";
DROP TABLE "Embedding";
ALTER TABLE "new_Embedding" RENAME TO "Embedding";
CREATE INDEX "Embedding_userId_idx" ON "Embedding"("userId");
CREATE INDEX "Embedding_accountId_idx" ON "Embedding"("accountId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
