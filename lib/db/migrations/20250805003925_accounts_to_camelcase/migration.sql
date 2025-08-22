/*
  Warnings:

  - You are about to drop the column `available_balance` on the `Account` table. All the data in the column will be lost.
  - You are about to drop the column `balance_due` on the `Account` table. All the data in the column will be lost.
  - You are about to drop the column `card_number` on the `Account` table. All the data in the column will be lost.
  - You are about to drop the column `card_type` on the `Account` table. All the data in the column will be lost.
  - You are about to drop the column `cash_balance` on the `Account` table. All the data in the column will be lost.
  - You are about to drop the column `closed_date` on the `Account` table. All the data in the column will be lost.
  - You are about to drop the column `created_at` on the `Account` table. All the data in the column will be lost.
  - You are about to drop the column `credit_limit` on the `Account` table. All the data in the column will be lost.
  - You are about to drop the column `currency_code` on the `Account` table. All the data in the column will be lost.
  - You are about to drop the column `currency_name` on the `Account` table. All the data in the column will be lost.
  - You are about to drop the column `currency_numeric_code` on the `Account` table. All the data in the column will be lost.
  - You are about to drop the column `currency_symbol` on the `Account` table. All the data in the column will be lost.
  - You are about to drop the column `current_principal` on the `Account` table. All the data in the column will be lost.
  - You are about to drop the column `display_name` on the `Account` table. All the data in the column will be lost.
  - You are about to drop the column `dividend_rate` on the `Account` table. All the data in the column will be lost.
  - You are about to drop the column `due_date` on the `Account` table. All the data in the column will be lost.
  - You are about to drop the column `interest_rate` on the `Account` table. All the data in the column will be lost.
  - You are about to drop the column `interest_ytd` on the `Account` table. All the data in the column will be lost.
  - You are about to drop the column `last_payment_date` on the `Account` table. All the data in the column will be lost.
  - You are about to drop the column `minimum_payment_amount` on the `Account` table. All the data in the column will be lost.
  - You are about to drop the column `next_payment_date` on the `Account` table. All the data in the column will be lost.
  - You are about to drop the column `opened_date` on the `Account` table. All the data in the column will be lost.
  - You are about to drop the column `original_principal` on the `Account` table. All the data in the column will be lost.
  - You are about to drop the column `payment_amount` on the `Account` table. All the data in the column will be lost.
  - You are about to drop the column `payment_date` on the `Account` table. All the data in the column will be lost.
  - You are about to drop the column `routing_number` on the `Account` table. All the data in the column will be lost.
  - You are about to drop the column `statement_balance` on the `Account` table. All the data in the column will be lost.
  - You are about to drop the column `sub_type` on the `Account` table. All the data in the column will be lost.
  - You are about to drop the column `updated_at` on the `Account` table. All the data in the column will be lost.
  - You are about to drop the column `account_id` on the `Transaction` table. All the data in the column will be lost.
  - You are about to drop the column `budget_category` on the `Transaction` table. All the data in the column will be lost.
  - You are about to drop the column `budget_category_id` on the `Transaction` table. All the data in the column will be lost.
  - You are about to drop the column `budget_subcategory` on the `Transaction` table. All the data in the column will be lost.
  - You are about to drop the column `category_id` on the `Transaction` table. All the data in the column will be lost.
  - You are about to drop the column `category_name` on the `Transaction` table. All the data in the column will be lost.
  - You are about to drop the column `currency_code` on the `Transaction` table. All the data in the column will be lost.
  - You are about to drop the column `currency_name` on the `Transaction` table. All the data in the column will be lost.
  - You are about to drop the column `currency_numeric_code` on the `Transaction` table. All the data in the column will be lost.
  - You are about to drop the column `currency_symbol` on the `Transaction` table. All the data in the column will be lost.
  - You are about to drop the column `raw_payee` on the `Transaction` table. All the data in the column will be lost.
  - Added the required column `currencyCode` to the `Account` table without a default value. This is not possible if the table is not empty.
  - Added the required column `openedDate` to the `Account` table without a default value. This is not possible if the table is not empty.
  - Added the required column `routingNumber` to the `Account` table without a default value. This is not possible if the table is not empty.
  - Added the required column `subType` to the `Account` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Account` table without a default value. This is not possible if the table is not empty.
  - Added the required column `accountId` to the `Transaction` table without a default value. This is not possible if the table is not empty.
  - Added the required column `categoryName` to the `Transaction` table without a default value. This is not possible if the table is not empty.
  - Added the required column `rawPayee` to the `Transaction` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Account" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "balance" REAL NOT NULL,
    "currencyCode" TEXT NOT NULL,
    "currencyName" TEXT,
    "currencySymbol" TEXT,
    "currencyNumericCode" REAL,
    "displayName" TEXT,
    "name" TEXT NOT NULL,
    "number" TEXT NOT NULL,
    "openedDate" DATETIME NOT NULL,
    "closedDate" DATETIME,
    "routingNumber" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "subType" TEXT NOT NULL,
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
    "cardType" TEXT,
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
INSERT INTO "new_Account" ("balance", "id", "name", "number", "status", "term", "type") SELECT "balance", "id", "name", "number", "status", "term", "type" FROM "Account";
DROP TABLE "Account";
ALTER TABLE "new_Account" RENAME TO "Account";
CREATE INDEX "Account_type_idx" ON "Account"("type");
CREATE INDEX "Account_status_idx" ON "Account"("status");
CREATE INDEX "Account_number_idx" ON "Account"("number");
CREATE TABLE "new_Transaction" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "accountId" TEXT NOT NULL,
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
    "currencyCode" TEXT,
    "currencyName" TEXT,
    "currencySymbol" TEXT,
    "currencyNumericCode" REAL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL,
    CONSTRAINT "Transaction_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "Account" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Transaction" ("amount", "created_at", "date", "description", "id", "memo", "payee", "tags", "type", "updated_at") SELECT "amount", "created_at", "date", "description", "id", "memo", "payee", "tags", "type", "updated_at" FROM "Transaction";
DROP TABLE "Transaction";
ALTER TABLE "new_Transaction" RENAME TO "Transaction";
CREATE INDEX "Transaction_accountId_idx" ON "Transaction"("accountId");
CREATE INDEX "Transaction_date_idx" ON "Transaction"("date");
CREATE INDEX "Transaction_type_idx" ON "Transaction"("type");
CREATE INDEX "Transaction_categoryName_idx" ON "Transaction"("categoryName");
CREATE INDEX "Transaction_budgetCategory_idx" ON "Transaction"("budgetCategory");
CREATE INDEX "Transaction_budgetSubcategory_idx" ON "Transaction"("budgetSubcategory");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
