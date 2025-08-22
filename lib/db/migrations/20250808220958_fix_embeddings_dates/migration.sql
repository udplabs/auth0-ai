/*
  Warnings:

  - You are about to drop the column `created_at` on the `Embedding` table. All the data in the column will be lost.
  - You are about to drop the column `updated_at` on the `Embedding` table. All the data in the column will be lost.
  - Added the required column `updatedAt` to the `Embedding` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Embedding" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "accountId" TEXT NOT NULL,
    "model" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "embedding" JSONB NOT NULL,
    "metadata" JSONB,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Embedding_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "Account" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Embedding" ("accountId", "embedding", "id", "metadata", "model", "value") SELECT "accountId", "embedding", "id", "metadata", "model", "value" FROM "Embedding";
DROP TABLE "Embedding";
ALTER TABLE "new_Embedding" RENAME TO "Embedding";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
