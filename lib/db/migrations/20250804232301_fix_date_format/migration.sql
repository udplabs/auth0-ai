/*
  Warnings:

  - You are about to alter the column `closed_date` on the `Account` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `DateTime`.
  - You are about to alter the column `due_date` on the `Account` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `DateTime`.
  - You are about to alter the column `last_payment_date` on the `Account` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `DateTime`.
  - You are about to alter the column `next_payment_date` on the `Account` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `DateTime`.
  - You are about to alter the column `opened_date` on the `Account` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `DateTime`.
  - You are about to alter the column `date` on the `Transaction` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `DateTime`.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Account" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "balance" REAL NOT NULL,
    "currency_code" TEXT NOT NULL,
    "currency_name" TEXT,
    "currency_symbol" TEXT,
    "currency_numeric_code" REAL,
    "display_name" TEXT,
    "name" TEXT NOT NULL,
    "number" TEXT NOT NULL,
    "opened_date" DATETIME NOT NULL,
    "closed_date" DATETIME,
    "routing_number" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "sub_type" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'ACTIVE',
    "balance_due" REAL,
    "current_principal" REAL,
    "due_date" DATETIME,
    "interest_rate" REAL,
    "last_payment_date" DATETIME,
    "next_payment_date" DATETIME,
    "original_principal" REAL,
    "payment_amount" REAL,
    "payment_date" INTEGER,
    "term" INTEGER,
    "card_number" TEXT,
    "card_type" TEXT,
    "credit_limit" REAL,
    "minimum_payment_amount" REAL,
    "statement_balance" REAL,
    "available_balance" REAL,
    "dividend_rate" REAL,
    "interest_ytd" REAL,
    "cash_balance" REAL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL
);
INSERT INTO "new_Account" ("available_balance", "balance", "balance_due", "card_number", "card_type", "cash_balance", "closed_date", "created_at", "credit_limit", "currency_code", "currency_name", "currency_numeric_code", "currency_symbol", "current_principal", "display_name", "dividend_rate", "due_date", "id", "interest_rate", "interest_ytd", "last_payment_date", "minimum_payment_amount", "name", "next_payment_date", "number", "opened_date", "original_principal", "payment_amount", "payment_date", "routing_number", "statement_balance", "status", "sub_type", "term", "type", "updated_at") SELECT "available_balance", "balance", "balance_due", "card_number", "card_type", "cash_balance", "closed_date", "created_at", "credit_limit", "currency_code", "currency_name", "currency_numeric_code", "currency_symbol", "current_principal", "display_name", "dividend_rate", "due_date", "id", "interest_rate", "interest_ytd", "last_payment_date", "minimum_payment_amount", "name", "next_payment_date", "number", "opened_date", "original_principal", "payment_amount", "payment_date", "routing_number", "statement_balance", "status", "sub_type", "term", "type", "updated_at" FROM "Account";
DROP TABLE "Account";
ALTER TABLE "new_Account" RENAME TO "Account";
CREATE INDEX "Account_type_idx" ON "Account"("type");
CREATE INDEX "Account_status_idx" ON "Account"("status");
CREATE INDEX "Account_number_idx" ON "Account"("number");
CREATE TABLE "new_Transaction" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "account_id" TEXT NOT NULL,
    "payee" TEXT NOT NULL,
    "raw_payee" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "memo" TEXT,
    "amount" REAL NOT NULL,
    "date" DATETIME NOT NULL,
    "type" TEXT NOT NULL,
    "category_id" TEXT,
    "category_name" TEXT NOT NULL,
    "budget_category_id" TEXT,
    "budget_category" TEXT,
    "budget_subcategory" TEXT,
    "tags" JSONB,
    "currency_code" TEXT,
    "currency_name" TEXT,
    "currency_symbol" TEXT,
    "currency_numeric_code" REAL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL,
    CONSTRAINT "Transaction_account_id_fkey" FOREIGN KEY ("account_id") REFERENCES "Account" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Transaction" ("account_id", "amount", "budget_category", "budget_category_id", "budget_subcategory", "category_id", "category_name", "created_at", "currency_code", "currency_name", "currency_numeric_code", "currency_symbol", "date", "description", "id", "memo", "payee", "raw_payee", "tags", "type", "updated_at") SELECT "account_id", "amount", "budget_category", "budget_category_id", "budget_subcategory", "category_id", "category_name", "created_at", "currency_code", "currency_name", "currency_numeric_code", "currency_symbol", "date", "description", "id", "memo", "payee", "raw_payee", "tags", "type", "updated_at" FROM "Transaction";
DROP TABLE "Transaction";
ALTER TABLE "new_Transaction" RENAME TO "Transaction";
CREATE INDEX "Transaction_account_id_idx" ON "Transaction"("account_id");
CREATE INDEX "Transaction_date_idx" ON "Transaction"("date");
CREATE INDEX "Transaction_type_idx" ON "Transaction"("type");
CREATE INDEX "Transaction_category_name_idx" ON "Transaction"("category_name");
CREATE INDEX "Transaction_budget_category_idx" ON "Transaction"("budget_category");
CREATE INDEX "Transaction_budget_subcategory_idx" ON "Transaction"("budget_subcategory");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
