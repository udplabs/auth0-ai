-- CreateEnum
CREATE TYPE "public"."ContentPlacement" AS ENUM ('aiya', 'labs', 'secret');

-- CreateEnum
CREATE TYPE "public"."ContentType" AS ENUM ('guide/step', 'guide/lab', 'prompt/step', 'prompt/system', 'prompt/lab', 'prompt/unknown', 'reference/code');

-- CreateEnum
CREATE TYPE "public"."MimeType" AS ENUM ('text/markdown', 'text/plain', 'text/html', 'text/csv', 'application/json', 'application/xml', 'text/typescript');

-- CreateEnum
CREATE TYPE "public"."VoteType" AS ENUM ('up', 'down');

-- CreateEnum
CREATE TYPE "public"."TransactionType" AS ENUM ('credit', 'debit');

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
CREATE TABLE "public"."RemoteChat" (
    "id" TEXT NOT NULL,
    "userId" TEXT,
    "title" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "appInstanceId" TEXT,

    CONSTRAINT "RemoteChat_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."RemoteContent" (
    "id" TEXT NOT NULL,
    "textData" TEXT,
    "applicationData" JSONB,
    "name" TEXT NOT NULL,
    "labStep" TEXT,
    "contentPlacement" "public"."ContentPlacement",
    "contentType" "public"."ContentType" NOT NULL DEFAULT 'prompt/unknown',
    "mimeType" "public"."MimeType" NOT NULL DEFAULT 'text/plain',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "RemoteContent_pkey" PRIMARY KEY ("id")
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
CREATE TABLE "public"."RemoteMessage" (
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

    CONSTRAINT "RemoteMessage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."RemoteSettings" (
    "id" TEXT NOT NULL,
    "currentLabStep" TEXT,
    "labMeta" TEXT,
    "preferences" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "appInstanceId" TEXT,
    "nextLabStep" TEXT,

    CONSTRAINT "RemoteSettings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."AppInstance" (
    "id" TEXT NOT NULL,
    "auth0ClientId" TEXT,
    "auth0Domain" TEXT,
    "hashedInstanceId" TEXT,

    CONSTRAINT "AppInstance_pkey" PRIMARY KEY ("id")
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
CREATE INDEX "RemoteChat_userId_idx" ON "public"."RemoteChat"("userId");

-- CreateIndex
CREATE INDEX "RemoteChat_appInstanceId_idx" ON "public"."RemoteChat"("appInstanceId");

-- CreateIndex
CREATE INDEX "RemoteContent_contentPlacement_idx" ON "public"."RemoteContent"("contentPlacement");

-- CreateIndex
CREATE INDEX "RemoteContent_name_idx" ON "public"."RemoteContent"("name");

-- CreateIndex
CREATE INDEX "RemoteContent_labStep_idx" ON "public"."RemoteContent"("labStep");

-- CreateIndex
CREATE INDEX "RemoteContent_contentType_idx" ON "public"."RemoteContent"("contentType");

-- CreateIndex
CREATE INDEX "RemoteContent_mimeType_idx" ON "public"."RemoteContent"("mimeType");

-- CreateIndex
CREATE INDEX "RemoteMessage_chatId_idx" ON "public"."RemoteMessage"("chatId");

-- CreateIndex
CREATE INDEX "RemoteMessage_userId_idx" ON "public"."RemoteMessage"("userId");

-- CreateIndex
CREATE INDEX "RemoteSettings_appInstanceId_idx" ON "public"."RemoteSettings"("appInstanceId");

-- CreateIndex
CREATE INDEX "AppInstance_auth0ClientId_idx" ON "public"."AppInstance"("auth0ClientId");

-- CreateIndex
CREATE INDEX "AppInstance_auth0Domain_idx" ON "public"."AppInstance"("auth0Domain");

-- CreateIndex
CREATE INDEX "AppInstance_hashedInstanceId_idx" ON "public"."AppInstance"("hashedInstanceId");

-- CreateIndex
CREATE INDEX "RemoteSampleTransaction_accountId_idx" ON "public"."RemoteSampleTransaction"("accountId");

-- CreateIndex
CREATE INDEX "RemoteSampleTransaction_customerId_idx" ON "public"."RemoteSampleTransaction"("customerId");

-- AddForeignKey
ALTER TABLE "public"."RemoteMessage" ADD CONSTRAINT "RemoteMessage_chatId_fkey" FOREIGN KEY ("chatId") REFERENCES "public"."RemoteChat"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."RemoteSampleTransaction" ADD CONSTRAINT "RemoteSampleTransaction_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "public"."RemoteSampleAccount"("id") ON DELETE CASCADE ON UPDATE CASCADE;
