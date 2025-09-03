-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Transaction" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "accountId" TEXT NOT NULL,
    "customerId" TEXT NOT NULL,
    "isExternal" BOOLEAN DEFAULT false,
    "externalConnectionId" TEXT,
    "externalConnectionName" TEXT,
    "payee" TEXT NOT NULL,
    "rawPayee" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "memo" TEXT,
    "amount" REAL NOT NULL,
    "date" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
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
INSERT INTO "new_Transaction" ("accountId", "amount", "budgetCategory", "budgetCategoryId", "budgetSubcategory", "categoryId", "categoryName", "created_at", "currencyCode", "currencyName", "currencyNumericCode", "currencySymbol", "customerId", "date", "description", "externalConnectionId", "externalConnectionName", "id", "isExternal", "memo", "payee", "rawPayee", "tags", "type", "updated_at") SELECT "accountId", "amount", "budgetCategory", "budgetCategoryId", "budgetSubcategory", "categoryId", "categoryName", "created_at", "currencyCode", "currencyName", "currencyNumericCode", "currencySymbol", "customerId", "date", "description", "externalConnectionId", "externalConnectionName", "id", "isExternal", "memo", "payee", "rawPayee", "tags", "type", "updated_at" FROM "Transaction";
DROP TABLE "Transaction";
ALTER TABLE "new_Transaction" RENAME TO "Transaction";
CREATE INDEX "Transaction_accountId_idx" ON "Transaction"("accountId");
CREATE INDEX "Transaction_customerId_idx" ON "Transaction"("customerId");
CREATE INDEX "Transaction_date_idx" ON "Transaction"("date");
CREATE INDEX "Transaction_type_idx" ON "Transaction"("type");
CREATE INDEX "Transaction_categoryName_idx" ON "Transaction"("categoryName");
CREATE INDEX "Transaction_budgetCategory_idx" ON "Transaction"("budgetCategory");
CREATE INDEX "Transaction_budgetSubcategory_idx" ON "Transaction"("budgetSubcategory");
CREATE INDEX "Transaction_externalConnectionId_idx" ON "Transaction"("externalConnectionId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
