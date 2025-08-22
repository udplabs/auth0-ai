-- AlterTable
ALTER TABLE "Account" ADD COLUMN "externalConnectionId" TEXT;
ALTER TABLE "Account" ADD COLUMN "externalConnectionName" TEXT;
ALTER TABLE "Account" ADD COLUMN "isExternal" BOOLEAN DEFAULT false;

-- AlterTable
ALTER TABLE "Transaction" ADD COLUMN "externalConnectionId" TEXT;
ALTER TABLE "Transaction" ADD COLUMN "externalConnectionName" TEXT;
ALTER TABLE "Transaction" ADD COLUMN "isExternal" BOOLEAN DEFAULT false;

-- CreateIndex
CREATE INDEX "Account_externalConnectionId_idx" ON "Account"("externalConnectionId");

-- CreateIndex
CREATE INDEX "Transaction_externalConnectionId_idx" ON "Transaction"("externalConnectionId");
