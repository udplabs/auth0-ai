-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Chat" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "user_id" TEXT NOT NULL,
    "title" TEXT,
    "visibility" TEXT NOT NULL DEFAULT 'PUBLIC',
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL,
    "message_count" INTEGER NOT NULL DEFAULT 0
);
INSERT INTO "new_Chat" ("created_at", "id", "message_count", "title", "updated_at", "user_id", "visibility") SELECT "created_at", "id", "message_count", "title", "updated_at", "user_id", coalesce("visibility", 'PUBLIC') AS "visibility" FROM "Chat";
DROP TABLE "Chat";
ALTER TABLE "new_Chat" RENAME TO "Chat";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
