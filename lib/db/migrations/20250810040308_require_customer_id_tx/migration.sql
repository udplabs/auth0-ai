/*
  Warnings:

  - Made the column `customerId` on table `Transaction` required. This step will fail if there are existing NULL values in that column.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;

-- Set customerId for specific accountIds
UPDATE "Transaction"
SET "customerId" = 'sample|01K22R2CS5VB3C9MYCVPSDDAWT'
WHERE "accountId" IN (
  '01K234W3ZM088N8VC820C1KKYG',
  '01K234W3ZQ1EP9XFQA243TYETM',
  '01K234W3ZS8JYVN4VG5H0YG5AY'
);

UPDATE "Transaction"
SET "customerId" = 'sample|01K22R2CS4VSAP5KKNDY87XC8E'
WHERE "accountId" IN (
  '01K235AKJ80F92JREMJ54HGMEX',
  '01K235AKJBZ63QAAHNDQNB9X8N',
  '01K235AKJDSK4Q8MM07TR0D9JS'
);

UPDATE "Transaction"
SET "customerId" = 'sample|01K22R2CS5TEFK21AYV2956BGY'
WHERE "accountId" IN (
  '01K235BBWYG85NW6R211376M0E',
  '01K235BBX1G16XR034FBZVQRCQ',
  '01K235BBX3FZ3K0H0MRDZX0FGE'
);

UPDATE "Transaction"
SET "customerId" = 'sample|01K22R2CS5Y3524ZGSQXPRMZ98'
WHERE "accountId" IN (
  '01K235ER9HYXTSN1EH7HP2JSQH',
  '01K235ER9N7301DDNV338NWAK3',
  '01K235ER9QF8APW4JYV5H91HDJ'
);

CREATE TABLE "new_Transaction" (
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
    CONSTRAINT "Transaction_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "Account" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Transaction" ("accountId", "amount", "budgetCategory", "budgetCategoryId", "budgetSubcategory", "categoryId", "categoryName", "created_at", "currencyCode", "currencyName", "currencyNumericCode", "currencySymbol", "customerId", "date", "description", "id", "memo", "payee", "rawPayee", "tags", "type", "updated_at") SELECT "accountId", "amount", "budgetCategory", "budgetCategoryId", "budgetSubcategory", "categoryId", "categoryName", "created_at", "currencyCode", "currencyName", "currencyNumericCode", "currencySymbol", "customerId", "date", "description", "id", "memo", "payee", "rawPayee", "tags", "type", "updated_at" FROM "Transaction";
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
