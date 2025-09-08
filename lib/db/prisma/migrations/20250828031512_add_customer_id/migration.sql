/*
  Warnings:

  - Added the required column `customerId` to the `Transfer` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Transfer" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "customerId" TEXT NOT NULL,
    "fromAccountId" TEXT NOT NULL,
    "toAccountId" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "memo" TEXT,
    "amount" REAL NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_Transfer" ("amount", "createdAt", "description", "fromAccountId", "id", "memo", "toAccountId", "updatedAt") SELECT "amount", "createdAt", "description", "fromAccountId", "id", "memo", "toAccountId", "updatedAt" FROM "Transfer";
DROP TABLE "Transfer";
ALTER TABLE "new_Transfer" RENAME TO "Transfer";
CREATE INDEX "Transfer_fromAccountId_idx" ON "Transfer"("fromAccountId");
CREATE INDEX "Transfer_toAccountId_idx" ON "Transfer"("toAccountId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
