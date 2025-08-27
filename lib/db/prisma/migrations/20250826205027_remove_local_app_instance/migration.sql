/*
  Warnings:

  - You are about to drop the `AppInstance` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the column `appInstance` on the `Chat` table. All the data in the column will be lost.
  - You are about to drop the column `appInstance` on the `Settings` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "AppInstance_hashedInstanceId_idx";

-- DropIndex
DROP INDEX "AppInstance_auth0Domain_idx";

-- DropIndex
DROP INDEX "AppInstance_auth0ClientId_idx";

-- DropIndex
DROP INDEX "AppInstance_hashedInstanceId_key";

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "AppInstance";
PRAGMA foreign_keys=on;

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Chat" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT,
    "title" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_Chat" ("createdAt", "id", "title", "updatedAt", "userId") SELECT "createdAt", "id", "title", "updatedAt", "userId" FROM "Chat";
DROP TABLE "Chat";
ALTER TABLE "new_Chat" RENAME TO "Chat";
CREATE INDEX "Chat_userId_idx" ON "Chat"("userId");
CREATE TABLE "new_Settings" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "currentLabStep" TEXT NOT NULL,
    "labMeta" TEXT,
    "preferences" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_Settings" ("createdAt", "currentLabStep", "id", "labMeta", "preferences", "updatedAt") SELECT "createdAt", "currentLabStep", "id", "labMeta", "preferences", "updatedAt" FROM "Settings";
DROP TABLE "Settings";
ALTER TABLE "new_Settings" RENAME TO "Settings";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
