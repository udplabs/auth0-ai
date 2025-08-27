/*
  Warnings:

  - You are about to drop the column `appInstance` on the `Message` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Message" (
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
    CONSTRAINT "Message_chatId_fkey" FOREIGN KEY ("chatId") REFERENCES "Chat" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Message" ("attachments", "chatId", "createdAt", "id", "metadata", "parts", "role", "updatedAt", "userId", "vote") SELECT "attachments", "chatId", "createdAt", "id", "metadata", "parts", "role", "updatedAt", "userId", "vote" FROM "Message";
DROP TABLE "Message";
ALTER TABLE "new_Message" RENAME TO "Message";
CREATE INDEX "Message_chatId_idx" ON "Message"("chatId");
CREATE INDEX "Message_userId_idx" ON "Message"("userId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
