/*
  Warnings:

  - You are about to alter the column `currentModule` on the `Settings` table. The data in that column could be lost. The data in that column will be cast from `String` to `Int`.
  - You are about to alter the column `currentStep` on the `Settings` table. The data in that column could be lost. The data in that column will be cast from `String` to `Int`.
  - You are about to alter the column `currentTask` on the `Settings` table. The data in that column could be lost. The data in that column will be cast from `String` to `Int`.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Settings" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "currentModule" INTEGER,
    "currentStep" INTEGER,
    "currentTask" INTEGER,
    "currentLabStep" TEXT,
    "nextLabStep" TEXT,
    "labMeta" TEXT,
    "preferences" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_Settings" ("createdAt", "currentLabStep", "currentModule", "currentStep", "currentTask", "id", "labMeta", "nextLabStep", "preferences", "updatedAt") SELECT "createdAt", "currentLabStep", "currentModule", "currentStep", "currentTask", "id", "labMeta", "nextLabStep", "preferences", "updatedAt" FROM "Settings";
DROP TABLE "Settings";
ALTER TABLE "new_Settings" RENAME TO "Settings";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
