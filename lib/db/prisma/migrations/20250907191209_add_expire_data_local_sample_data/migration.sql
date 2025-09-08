/*
  Warnings:

  - You are about to drop the column `updatedAt` on the `SampleAccount` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `SampleDocument` table. All the data in the column will be lost.
  - You are about to drop the column `updated_at` on the `SampleTransaction` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_SampleAccount" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "customerId" TEXT NOT NULL,
    "balance" REAL NOT NULL,
    "currencyCode" TEXT DEFAULT 'USD',
    "currencyName" TEXT DEFAULT 'US Dollar',
    "currencySymbol" TEXT DEFAULT '$',
    "currencyNumericCode" REAL DEFAULT 840,
    "displayName" TEXT,
    "name" TEXT NOT NULL,
    "number" TEXT NOT NULL,
    "openedDate" DATETIME NOT NULL,
    "closedDate" DATETIME,
    "routingNumber" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "subType" TEXT,
    "status" TEXT DEFAULT 'active',
    "balanceDue" REAL,
    "currentPrincipal" REAL,
    "dueDate" DATETIME,
    "interestRate" REAL,
    "lastPaymentDate" DATETIME,
    "nextPaymentDate" DATETIME,
    "originalPrincipal" REAL,
    "paymentAmount" REAL,
    "paymentDate" INTEGER,
    "term" INTEGER,
    "cardNumber" TEXT,
    "creditLimit" REAL,
    "minimumPaymentAmount" REAL,
    "statementBalance" REAL,
    "availableBalance" REAL,
    "dividendRate" REAL,
    "interestYTD" REAL,
    "cashBalance" REAL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "lastSyncedAt" DATETIME,
    "expiresAt" DATETIME
);
INSERT INTO "new_SampleAccount" ("availableBalance", "balance", "balanceDue", "cardNumber", "cashBalance", "closedDate", "createdAt", "creditLimit", "currencyCode", "currencyName", "currencyNumericCode", "currencySymbol", "currentPrincipal", "customerId", "displayName", "dividendRate", "dueDate", "id", "interestRate", "interestYTD", "lastPaymentDate", "minimumPaymentAmount", "name", "nextPaymentDate", "number", "openedDate", "originalPrincipal", "paymentAmount", "paymentDate", "routingNumber", "statementBalance", "status", "subType", "term", "type") SELECT "availableBalance", "balance", "balanceDue", "cardNumber", "cashBalance", "closedDate", "createdAt", "creditLimit", "currencyCode", "currencyName", "currencyNumericCode", "currencySymbol", "currentPrincipal", "customerId", "displayName", "dividendRate", "dueDate", "id", "interestRate", "interestYTD", "lastPaymentDate", "minimumPaymentAmount", "name", "nextPaymentDate", "number", "openedDate", "originalPrincipal", "paymentAmount", "paymentDate", "routingNumber", "statementBalance", "status", "subType", "term", "type" FROM "SampleAccount";
DROP TABLE "SampleAccount";
ALTER TABLE "new_SampleAccount" RENAME TO "SampleAccount";
CREATE INDEX "SampleAccount_customerId_idx" ON "SampleAccount"("customerId");
CREATE TABLE "new_SampleDocument" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "pageContent" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "lastSyncedAt" DATETIME,
    "expiresAt" DATETIME,
    "embedding" JSONB NOT NULL,
    "metadata" JSONB NOT NULL
);
INSERT INTO "new_SampleDocument" ("createdAt", "embedding", "id", "metadata", "pageContent", "userId") SELECT "createdAt", "embedding", "id", "metadata", "pageContent", "userId" FROM "SampleDocument";
DROP TABLE "SampleDocument";
ALTER TABLE "new_SampleDocument" RENAME TO "SampleDocument";
CREATE TABLE "new_SampleTransaction" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "accountId" TEXT NOT NULL,
    "customerId" TEXT NOT NULL,
    "payee" TEXT NOT NULL,
    "rawPayee" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "memo" TEXT,
    "amount" REAL NOT NULL,
    "date" DATETIME NOT NULL,
    "type" TEXT NOT NULL,
    "categoryId" TEXT,
    "categoryName" TEXT NOT NULL,
    "budgetCategoryId" TEXT,
    "budgetCategory" TEXT,
    "budgetSubcategory" TEXT,
    "tags" JSONB,
    "currencyCode" TEXT DEFAULT 'USD',
    "currencyName" TEXT DEFAULT 'United States Dollar',
    "currencySymbol" TEXT DEFAULT '$',
    "currencyNumericCode" REAL DEFAULT 840,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "lastSyncedAt" DATETIME,
    "expiresAt" DATETIME,
    CONSTRAINT "SampleTransaction_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "SampleAccount" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_SampleTransaction" ("accountId", "amount", "budgetCategory", "budgetCategoryId", "budgetSubcategory", "categoryId", "categoryName", "created_at", "currencyCode", "currencyName", "currencyNumericCode", "currencySymbol", "customerId", "date", "description", "id", "memo", "payee", "rawPayee", "tags", "type") SELECT "accountId", "amount", "budgetCategory", "budgetCategoryId", "budgetSubcategory", "categoryId", "categoryName", "created_at", "currencyCode", "currencyName", "currencyNumericCode", "currencySymbol", "customerId", "date", "description", "id", "memo", "payee", "rawPayee", "tags", "type" FROM "SampleTransaction";
DROP TABLE "SampleTransaction";
ALTER TABLE "new_SampleTransaction" RENAME TO "SampleTransaction";
CREATE INDEX "SampleTransaction_accountId_idx" ON "SampleTransaction"("accountId");
CREATE INDEX "SampleTransaction_customerId_idx" ON "SampleTransaction"("customerId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
