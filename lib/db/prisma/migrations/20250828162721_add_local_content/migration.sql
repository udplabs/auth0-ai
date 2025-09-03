-- CreateTable
CREATE TABLE "LocalContent" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "contentText" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "mimeType" TEXT NOT NULL DEFAULT 'text/plain',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "expiresAt" DATETIME
);

-- CreateIndex
CREATE INDEX "LocalContent_type_idx" ON "LocalContent"("type");

-- CreateIndex
CREATE INDEX "LocalContent_name_idx" ON "LocalContent"("name");
