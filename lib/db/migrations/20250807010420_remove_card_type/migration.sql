/*
  Warnings:

  - You are about to drop the column `cardType` on the `Account` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Account" (
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
    "status" TEXT NOT NULL DEFAULT 'ACTIVE',
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
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_Account" ("availableBalance", "balance", "balanceDue", "cardNumber", "cashBalance", "closedDate", "createdAt", "creditLimit", "currencyCode", "currencyName", "currencyNumericCode", "currencySymbol", "currentPrincipal", "customerId", "displayName", "dividendRate", "dueDate", "id", "interestRate", "interestYTD", "lastPaymentDate", "minimumPaymentAmount", "name", "nextPaymentDate", "number", "openedDate", "originalPrincipal", "paymentAmount", "paymentDate", "routingNumber", "statementBalance", "status", "term", "type", "updatedAt") SELECT "availableBalance", "balance", "balanceDue", "cardNumber", "cashBalance", "closedDate", "createdAt", "creditLimit", "currencyCode", "currencyName", "currencyNumericCode", "currencySymbol", "currentPrincipal", "customerId", "displayName", "dividendRate", "dueDate", "id", "interestRate", "interestYTD", "lastPaymentDate", "minimumPaymentAmount", "name", "nextPaymentDate", "number", "openedDate", "originalPrincipal", "paymentAmount", "paymentDate", "routingNumber", "statementBalance", "status", "term", "type", "updatedAt" FROM "Account";
DROP TABLE "Account";
ALTER TABLE "new_Account" RENAME TO "Account";
CREATE INDEX "Account_type_idx" ON "Account"("type");
CREATE INDEX "Account_status_idx" ON "Account"("status");
CREATE INDEX "Account_number_idx" ON "Account"("number");
CREATE INDEX "Account_customerId_idx" ON "Account"("customerId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
