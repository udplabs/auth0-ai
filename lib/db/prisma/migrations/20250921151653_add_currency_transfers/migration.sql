-- AlterTable
ALTER TABLE "Transfer" ADD COLUMN "currencyCode" TEXT DEFAULT 'USD';
ALTER TABLE "Transfer" ADD COLUMN "currencyName" TEXT DEFAULT 'US Dollar';
ALTER TABLE "Transfer" ADD COLUMN "currencyNumericCode" REAL DEFAULT 840;
ALTER TABLE "Transfer" ADD COLUMN "currencySymbol" TEXT DEFAULT '$';
