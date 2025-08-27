-- CreateTable
CREATE TABLE "Account" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "customerId" TEXT NOT NULL,
    "isExternal" BOOLEAN DEFAULT false,
    "externalConnectionId" TEXT,
    "externalConnectionName" TEXT,
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
CREATE TABLE "Chat" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT,
    "title" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "appInstance" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Stream" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "chatId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Stream_chatId_fkey" FOREIGN KEY ("chatId") REFERENCES "Chat" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Document" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "pageContent" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "embedding" JSONB NOT NULL,
    "metadata" JSONB NOT NULL,
    CONSTRAINT "Document_id_fkey" FOREIGN KEY ("id") REFERENCES "Transaction" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "SampleDocument" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "pageContent" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "embedding" JSONB NOT NULL,
    "metadata" JSONB NOT NULL
);

-- CreateTable
CREATE TABLE "Message" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "chatId" TEXT NOT NULL,
    "userId" TEXT,
    "role" TEXT NOT NULL,
    "parts" JSONB NOT NULL,
    "metadata" JSONB,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "attachments" JSONB,
    "vote" TEXT,
    "appInstance" TEXT NOT NULL,
    CONSTRAINT "Message_chatId_fkey" FOREIGN KEY ("chatId") REFERENCES "Chat" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Settings" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "currentLabStep" TEXT NOT NULL,
    "labMeta" TEXT,
    "preferences" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "appInstance" TEXT
);

-- CreateTable
CREATE TABLE "AppInstance" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "auth0ClientId" TEXT,
    "auth0Domain" TEXT,
    "hashedInstanceId" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Transaction" (
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

-- CreateIndex
CREATE INDEX "Account_type_idx" ON "Account"("type");

-- CreateIndex
CREATE INDEX "Account_status_idx" ON "Account"("status");

-- CreateIndex
CREATE INDEX "Account_number_idx" ON "Account"("number");

-- CreateIndex
CREATE INDEX "Account_customerId_idx" ON "Account"("customerId");

-- CreateIndex
CREATE INDEX "Account_externalConnectionId_idx" ON "Account"("externalConnectionId");

-- CreateIndex
CREATE INDEX "SampleAccount_customerId_idx" ON "SampleAccount"("customerId");

-- CreateIndex
CREATE INDEX "Chat_userId_idx" ON "Chat"("userId");

-- CreateIndex
CREATE INDEX "Chat_appInstance_idx" ON "Chat"("appInstance");

-- CreateIndex
CREATE INDEX "Stream_chatId_idx" ON "Stream"("chatId");

-- CreateIndex
CREATE INDEX "Message_chatId_idx" ON "Message"("chatId");

-- CreateIndex
CREATE INDEX "Message_userId_idx" ON "Message"("userId");

-- CreateIndex
CREATE INDEX "Message_appInstance_idx" ON "Message"("appInstance");

-- CreateIndex
CREATE INDEX "Settings_appInstance_idx" ON "Settings"("appInstance");

-- CreateIndex
CREATE UNIQUE INDEX "AppInstance_hashedInstanceId_key" ON "AppInstance"("hashedInstanceId");

-- CreateIndex
CREATE INDEX "AppInstance_auth0ClientId_idx" ON "AppInstance"("auth0ClientId");

-- CreateIndex
CREATE INDEX "AppInstance_auth0Domain_idx" ON "AppInstance"("auth0Domain");

-- CreateIndex
CREATE INDEX "AppInstance_hashedInstanceId_idx" ON "AppInstance"("hashedInstanceId");

-- CreateIndex
CREATE INDEX "Transaction_accountId_idx" ON "Transaction"("accountId");

-- CreateIndex
CREATE INDEX "Transaction_customerId_idx" ON "Transaction"("customerId");

-- CreateIndex
CREATE INDEX "Transaction_date_idx" ON "Transaction"("date");

-- CreateIndex
CREATE INDEX "Transaction_type_idx" ON "Transaction"("type");

-- CreateIndex
CREATE INDEX "Transaction_categoryName_idx" ON "Transaction"("categoryName");

-- CreateIndex
CREATE INDEX "Transaction_budgetCategory_idx" ON "Transaction"("budgetCategory");

-- CreateIndex
CREATE INDEX "Transaction_budgetSubcategory_idx" ON "Transaction"("budgetSubcategory");

-- CreateIndex
CREATE INDEX "Transaction_externalConnectionId_idx" ON "Transaction"("externalConnectionId");

-- CreateIndex
CREATE INDEX "SampleTransaction_accountId_idx" ON "SampleTransaction"("accountId");

-- CreateIndex
CREATE INDEX "SampleTransaction_customerId_idx" ON "SampleTransaction"("customerId");
