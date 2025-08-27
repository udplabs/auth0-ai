-- CreateEnum
CREATE TYPE "public"."VoteType" AS ENUM ('up', 'down');

-- CreateEnum
CREATE TYPE "public"."TransactionType" AS ENUM ('credit', 'debit');

-- CreateTable
CREATE TABLE "public"."Account" (
    "id" TEXT NOT NULL,
    "customerId" TEXT NOT NULL,
    "isExternal" BOOLEAN DEFAULT false,
    "externalConnectionId" TEXT,
    "externalConnectionName" TEXT,
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

    CONSTRAINT "Account_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."SampleAccount" (
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

    CONSTRAINT "SampleAccount_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Chat" (
    "id" TEXT NOT NULL,
    "userId" TEXT,
    "title" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "appInstance" TEXT NOT NULL,

    CONSTRAINT "Chat_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Stream" (
    "id" TEXT NOT NULL,
    "chatId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Stream_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Document" (
    "id" TEXT NOT NULL,
    "pageContent" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "embedding" JSONB NOT NULL,
    "metadata" JSONB NOT NULL,

    CONSTRAINT "Document_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."SampleDocument" (
    "id" TEXT NOT NULL,
    "pageContent" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "embedding" JSONB NOT NULL,
    "metadata" JSONB NOT NULL,

    CONSTRAINT "SampleDocument_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Message" (
    "id" TEXT NOT NULL,
    "chatId" TEXT NOT NULL,
    "userId" TEXT,
    "role" TEXT NOT NULL,
    "parts" JSONB NOT NULL,
    "metadata" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "attachments" JSONB,
    "vote" "public"."VoteType",
    "appInstance" TEXT NOT NULL,

    CONSTRAINT "Message_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Settings" (
    "id" TEXT NOT NULL,
    "currentLabStep" TEXT NOT NULL,
    "labMeta" TEXT,
    "preferences" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "appInstance" TEXT,

    CONSTRAINT "Settings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."AppInstance" (
    "id" TEXT NOT NULL,
    "auth0ClientId" TEXT,
    "auth0Domain" TEXT,
    "hashedInstanceId" TEXT NOT NULL,

    CONSTRAINT "AppInstance_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Transaction" (
    "id" TEXT NOT NULL,
    "accountId" TEXT NOT NULL,
    "customerId" TEXT NOT NULL,
    "isExternal" BOOLEAN DEFAULT false,
    "externalConnectionId" TEXT,
    "externalConnectionName" TEXT,
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

    CONSTRAINT "Transaction_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."SampleTransaction" (
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

    CONSTRAINT "SampleTransaction_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Account_type_idx" ON "public"."Account"("type");

-- CreateIndex
CREATE INDEX "Account_status_idx" ON "public"."Account"("status");

-- CreateIndex
CREATE INDEX "Account_number_idx" ON "public"."Account"("number");

-- CreateIndex
CREATE INDEX "Account_customerId_idx" ON "public"."Account"("customerId");

-- CreateIndex
CREATE INDEX "Account_externalConnectionId_idx" ON "public"."Account"("externalConnectionId");

-- CreateIndex
CREATE INDEX "SampleAccount_customerId_idx" ON "public"."SampleAccount"("customerId");

-- CreateIndex
CREATE INDEX "Chat_userId_idx" ON "public"."Chat"("userId");

-- CreateIndex
CREATE INDEX "Chat_appInstance_idx" ON "public"."Chat"("appInstance");

-- CreateIndex
CREATE INDEX "Stream_chatId_idx" ON "public"."Stream"("chatId");

-- CreateIndex
CREATE INDEX "Message_chatId_idx" ON "public"."Message"("chatId");

-- CreateIndex
CREATE INDEX "Message_userId_idx" ON "public"."Message"("userId");

-- CreateIndex
CREATE INDEX "Message_appInstance_idx" ON "public"."Message"("appInstance");

-- CreateIndex
CREATE INDEX "Settings_appInstance_idx" ON "public"."Settings"("appInstance");

-- CreateIndex
CREATE UNIQUE INDEX "AppInstance_hashedInstanceId_key" ON "public"."AppInstance"("hashedInstanceId");

-- CreateIndex
CREATE INDEX "AppInstance_auth0ClientId_idx" ON "public"."AppInstance"("auth0ClientId");

-- CreateIndex
CREATE INDEX "AppInstance_auth0Domain_idx" ON "public"."AppInstance"("auth0Domain");

-- CreateIndex
CREATE INDEX "AppInstance_hashedInstanceId_idx" ON "public"."AppInstance"("hashedInstanceId");

-- CreateIndex
CREATE INDEX "Transaction_accountId_idx" ON "public"."Transaction"("accountId");

-- CreateIndex
CREATE INDEX "Transaction_customerId_idx" ON "public"."Transaction"("customerId");

-- CreateIndex
CREATE INDEX "Transaction_date_idx" ON "public"."Transaction"("date");

-- CreateIndex
CREATE INDEX "Transaction_type_idx" ON "public"."Transaction"("type");

-- CreateIndex
CREATE INDEX "Transaction_categoryName_idx" ON "public"."Transaction"("categoryName");

-- CreateIndex
CREATE INDEX "Transaction_budgetCategory_idx" ON "public"."Transaction"("budgetCategory");

-- CreateIndex
CREATE INDEX "Transaction_budgetSubcategory_idx" ON "public"."Transaction"("budgetSubcategory");

-- CreateIndex
CREATE INDEX "Transaction_externalConnectionId_idx" ON "public"."Transaction"("externalConnectionId");

-- CreateIndex
CREATE INDEX "SampleTransaction_accountId_idx" ON "public"."SampleTransaction"("accountId");

-- CreateIndex
CREATE INDEX "SampleTransaction_customerId_idx" ON "public"."SampleTransaction"("customerId");

-- AddForeignKey
ALTER TABLE "public"."Stream" ADD CONSTRAINT "Stream_chatId_fkey" FOREIGN KEY ("chatId") REFERENCES "public"."Chat"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Document" ADD CONSTRAINT "Document_id_fkey" FOREIGN KEY ("id") REFERENCES "public"."Transaction"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Message" ADD CONSTRAINT "Message_chatId_fkey" FOREIGN KEY ("chatId") REFERENCES "public"."Chat"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Transaction" ADD CONSTRAINT "Transaction_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "public"."Account"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."SampleTransaction" ADD CONSTRAINT "SampleTransaction_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "public"."SampleAccount"("id") ON DELETE CASCADE ON UPDATE CASCADE;
