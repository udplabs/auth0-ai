/*
  Warnings:

  - You are about to drop the `Embedding` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `SampleEmbedding` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateTable
CREATE TABLE "Document" (
  "id" TEXT NOT NULL PRIMARY KEY,
  "pageContent" TEXT NOT NULL,
  "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" DATETIME NOT NULL,
  "embedding" JSONB NOT NULL,
  "metadata" JSONB NOT NULL
);

CREATE TABLE "SampleDocument" (
  "id" TEXT NOT NULL PRIMARY KEY,
  "pageContent" TEXT NOT NULL,
  "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" DATETIME NOT NULL,
  "embedding" JSONB NOT NULL,
  "metadata" JSONB NOT NULL
);

-- Copy rows from old tables into new tables
INSERT INTO "Document" ("id","pageContent","createdAt","updatedAt","embedding","metadata")
SELECT
  "id",
  "pageContent",
  COALESCE("createdAt", CURRENT_TIMESTAMP),
  COALESCE("updatedAt", CURRENT_TIMESTAMP),
  COALESCE("embedding", '[]'),
  COALESCE("metadata", '{}')
FROM "Embedding";

INSERT INTO "SampleDocument" ("id","pageContent","createdAt","updatedAt","embedding","metadata")
SELECT
  "id",
  "pageContent",
  COALESCE("createdAt", CURRENT_TIMESTAMP),
  COALESCE("updatedAt", CURRENT_TIMESTAMP),
  COALESCE("embedding", '[]'),
  COALESCE("metadata", '{}')
FROM "SampleEmbedding";

-- DropTables
PRAGMA foreign_keys=off;
DROP TABLE "Embedding";
DROP TABLE "SampleEmbedding";
PRAGMA foreign_keys=on;
