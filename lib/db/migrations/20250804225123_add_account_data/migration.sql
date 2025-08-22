-- CreateTable
CREATE TABLE "Account" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "balance" REAL NOT NULL,
    "currency_code" TEXT NOT NULL,
    "currency_name" TEXT,
    "currency_symbol" TEXT,
    "currency_numeric_code" REAL,
    "display_name" TEXT,
    "name" TEXT NOT NULL,
    "number" TEXT NOT NULL,
    "opened_date" BIGINT NOT NULL,
    "closed_date" BIGINT,
    "routing_number" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "sub_type" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'ACTIVE',
    "balance_due" REAL,
    "current_principal" REAL,
    "due_date" BIGINT,
    "interest_rate" REAL,
    "last_payment_date" BIGINT,
    "next_payment_date" BIGINT,
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

-- CreateTable
CREATE TABLE "Transaction" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "account_id" TEXT NOT NULL,
    "payee" TEXT NOT NULL,
    "raw_payee" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "memo" TEXT,
    "amount" REAL NOT NULL,
    "date" BIGINT NOT NULL,
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

-- CreateIndex
CREATE INDEX "Account_type_idx" ON "Account"("type");

-- CreateIndex
CREATE INDEX "Account_status_idx" ON "Account"("status");

-- CreateIndex
CREATE INDEX "Transaction_account_id_idx" ON "Transaction"("account_id");

-- CreateIndex
CREATE INDEX "Transaction_date_idx" ON "Transaction"("date");

-- CreateIndex
CREATE INDEX "Transaction_type_idx" ON "Transaction"("type");

-- CreateIndex
CREATE INDEX "Transaction_category_name_idx" ON "Transaction"("category_name");

-- CreateIndex
CREATE INDEX "Transaction_budget_category_idx" ON "Transaction"("budget_category");

-- CreateIndex
CREATE INDEX "Transaction_budget_subcategory_idx" ON "Transaction"("budget_subcategory");
