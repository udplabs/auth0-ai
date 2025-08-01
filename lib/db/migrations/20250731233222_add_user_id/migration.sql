/*
  Warnings:

  - Added the required column `user_id` to the `UIMessage` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_UIMessage" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "chat_id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "parts" JSONB NOT NULL,
    "metadata" JSONB,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL,
    "attachments" JSONB,
    "vote" TEXT,
    CONSTRAINT "UIMessage_chat_id_fkey" FOREIGN KEY ("chat_id") REFERENCES "Chat" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_UIMessage" ("attachments", "chat_id", "created_at", "id", "metadata", "parts", "role", "updated_at", "vote") SELECT "attachments", "chat_id", "created_at", "id", "metadata", "parts", "role", "updated_at", "vote" FROM "UIMessage";
DROP TABLE "UIMessage";
ALTER TABLE "new_UIMessage" RENAME TO "UIMessage";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
