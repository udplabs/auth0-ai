-- CreateTable
CREATE TABLE "SampleAccount" (
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
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "SampleTransaction" (
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
    "updated_at" DATETIME NOT NULL,
    CONSTRAINT "SampleTransaction_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "SampleAccount" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "SampleEmbedding" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "pageContent" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "embedding" JSONB NOT NULL,
    "metadata" JSONB NOT NULL
);

-- CreateIndex
CREATE INDEX "SampleAccount_customerId_idx" ON "SampleAccount"("customerId");

-- CreateIndex
CREATE INDEX "SampleTransaction_accountId_idx" ON "SampleTransaction"("accountId");

-- CreateIndex
CREATE INDEX "SampleTransaction_customerId_idx" ON "SampleTransaction"("customerId");

-- CreateIndex
CREATE INDEX "Transaction_customerId_idx" ON "Transaction"("customerId");

-- Copy all accounts
INSERT INTO "SampleAccount" (
  id, customerId, balance, currencyCode, currencyName, currencySymbol, currencyNumericCode,
  displayName, name, number, openedDate, closedDate, routingNumber, type, subType, status,
  balanceDue, currentPrincipal, dueDate, interestRate, lastPaymentDate, nextPaymentDate,
  originalPrincipal, paymentAmount, paymentDate, term, cardNumber, creditLimit,
  minimumPaymentAmount, statementBalance, availableBalance, dividendRate, interestYTD,
  cashBalance, createdAt, updatedAt
)
SELECT
  id, customerId, balance, currencyCode, currencyName, currencySymbol, currencyNumericCode,
  displayName, name, number, openedDate, closedDate, routingNumber, type, subType, status,
  balanceDue, currentPrincipal, dueDate, interestRate, lastPaymentDate, nextPaymentDate,
  originalPrincipal, paymentAmount, paymentDate, term, cardNumber, creditLimit,
  minimumPaymentAmount, statementBalance, availableBalance, dividendRate, interestYTD,
  cashBalance, createdAt, updatedAt
FROM "Account";

-- Copy all transactions
INSERT INTO "SampleTransaction" (
  id, accountId, customerId, payee, rawPayee, description, memo, amount, date, type,
  categoryId, categoryName, budgetCategoryId, budgetCategory, budgetSubcategory, tags,
  currencyCode, currencyName, currencySymbol, currencyNumericCode, created_at, updated_at
)
SELECT
  id, accountId, customerId, payee, rawPayee, description, memo, amount, date, type,
  categoryId, categoryName, budgetCategoryId, budgetCategory, budgetSubcategory, tags,
  currencyCode, currencyName, currencySymbol, currencyNumericCode, created_at, updated_at
FROM "Transaction";