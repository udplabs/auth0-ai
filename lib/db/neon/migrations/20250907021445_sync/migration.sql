/*
  Warnings:

  - You are about to drop the `SampleAccount` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `SampleDocument` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `SampleTransaction` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."SampleTransaction" DROP CONSTRAINT "SampleTransaction_accountId_fkey";

-- DropTable
DROP TABLE "public"."SampleAccount";

-- DropTable
DROP TABLE "public"."SampleDocument";

-- DropTable
DROP TABLE "public"."SampleTransaction";

-- CreateTable
CREATE TABLE "public"."RemoteSampleAccount" (
    "id" TEXT NOT NULL,
    "customerId" TEXT NOT NULL,
    "balance" DOUBLE PRECISION NOT NULL,
    "currencyCode" TEXT DEFAULT 'USD',
    "currencyName" TEXT DEFAULT 'US Dollar',
    "currencySymbol" TEXT DEFAULT '$',
    "currencyNumericCode" DOUBLE PRECISION DEFAULT 840,
    "displayName" TEXT,
    "name" TEXT NOT NULL,
    "number" TEXT NOT NULL,
    "openedDate" TIMESTAMP(3) NOT NULL,
    "closedDate" TIMESTAMP(3),
    "routingNumber" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "subType" TEXT,
    "status" TEXT DEFAULT 'active',
    "balanceDue" DOUBLE PRECISION,
    "currentPrincipal" DOUBLE PRECISION,
    "dueDate" TIMESTAMP(3),
    "interestRate" DOUBLE PRECISION,
    "lastPaymentDate" TIMESTAMP(3),
    "nextPaymentDate" TIMESTAMP(3),
    "originalPrincipal" DOUBLE PRECISION,
    "paymentAmount" DOUBLE PRECISION,
    "paymentDate" INTEGER,
    "term" INTEGER,
    "cardNumber" TEXT,
    "creditLimit" DOUBLE PRECISION,
    "minimumPaymentAmount" DOUBLE PRECISION,
    "statementBalance" DOUBLE PRECISION,
    "availableBalance" DOUBLE PRECISION,
    "dividendRate" DOUBLE PRECISION,
    "interestYTD" DOUBLE PRECISION,
    "cashBalance" DOUBLE PRECISION,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "RemoteSampleAccount_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."RemoteSampleDocument" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "pageContent" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "embedding" JSONB NOT NULL,
    "metadata" JSONB NOT NULL,

    CONSTRAINT "RemoteSampleDocument_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."RemoteSampleTransaction" (
    "id" TEXT NOT NULL,
    "accountId" TEXT NOT NULL,
    "customerId" TEXT NOT NULL,
    "payee" TEXT NOT NULL,
    "rawPayee" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "memo" TEXT,
    "amount" DOUBLE PRECISION NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "type" "public"."TransactionType" NOT NULL,
    "categoryId" TEXT,
    "categoryName" TEXT NOT NULL,
    "budgetCategoryId" TEXT,
    "budgetCategory" TEXT,
    "budgetSubcategory" TEXT,
    "tags" JSONB,
    "currencyCode" TEXT DEFAULT 'USD',
    "currencyName" TEXT DEFAULT 'United States Dollar',
    "currencySymbol" TEXT DEFAULT '$',
    "currencyNumericCode" DOUBLE PRECISION DEFAULT 840,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "RemoteSampleTransaction_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "RemoteSampleAccount_customerId_idx" ON "public"."RemoteSampleAccount"("customerId");

-- CreateIndex
CREATE INDEX "RemoteSampleTransaction_accountId_idx" ON "public"."RemoteSampleTransaction"("accountId");

-- CreateIndex
CREATE INDEX "RemoteSampleTransaction_customerId_idx" ON "public"."RemoteSampleTransaction"("customerId");

-- AddForeignKey
ALTER TABLE "public"."RemoteSampleTransaction" ADD CONSTRAINT "RemoteSampleTransaction_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "public"."RemoteSampleAccount"("id") ON DELETE CASCADE ON UPDATE CASCADE;
