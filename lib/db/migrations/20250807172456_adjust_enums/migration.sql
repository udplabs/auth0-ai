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
INSERT INTO "new_Account" ("availableBalance", "balance", "balanceDue", "cardNumber", "cashBalance", "closedDate", "createdAt", "creditLimit", "currencyCode", "currencyName", "currencyNumericCode", "currencySymbol", "currentPrincipal", "customerId", "displayName", "dividendRate", "dueDate", "id", "interestRate", "interestYTD", "lastPaymentDate", "minimumPaymentAmount", "name", "nextPaymentDate", "number", "openedDate", "originalPrincipal", "paymentAmount", "paymentDate", "routingNumber", "statementBalance", "status", "term", "type", "updatedAt") SELECT "availableBalance", "balance", "balanceDue", "cardNumber", "cashBalance", "closedDate", "createdAt", "creditLimit", "currencyCode", "currencyName", "currencyNumericCode", "currencySymbol", "currentPrincipal", "customerId", "displayName", "dividendRate", "dueDate", "id", "interestRate", "interestYTD", "lastPaymentDate", "minimumPaymentAmount", "name", "nextPaymentDate", "number", "openedDate", "originalPrincipal", "paymentAmount", "paymentDate", "routingNumber", "statementBalance", "status", "term", "type", "updatedAt" FROM "Account";
DROP TABLE "Account";
ALTER TABLE "new_Account" RENAME TO "Account";
CREATE INDEX "Account_type_idx" ON "Account"("type");
CREATE INDEX "Account_status_idx" ON "Account"("status");
CREATE INDEX "Account_number_idx" ON "Account"("number");
CREATE INDEX "Account_customerId_idx" ON "Account"("customerId");
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
    "currencyCode" TEXT DEFAULT 'USD',
    "currencyName" TEXT DEFAULT 'United States Dollar',
    "currencySymbol" TEXT DEFAULT '$',
    "currencyNumericCode" REAL DEFAULT 840,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL,
    CONSTRAINT "Transaction_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "Account" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Transaction" ("accountId", "amount", "budgetCategory", "budgetCategoryId", "budgetSubcategory", "categoryId", "categoryName", "created_at", "currencyCode", "currencyName", "currencyNumericCode", "currencySymbol", "date", "description", "id", "memo", "payee", "rawPayee", "tags", "type", "updated_at") SELECT "accountId", "amount", "budgetCategory", "budgetCategoryId", "budgetSubcategory", "categoryId", "categoryName", "created_at", "currencyCode", "currencyName", "currencyNumericCode", "currencySymbol", "date", "description", "id", "memo", "payee", "rawPayee", "tags", "type", "updated_at" FROM "Transaction";
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
