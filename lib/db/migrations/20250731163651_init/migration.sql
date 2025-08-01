-- CreateTable
CREATE TABLE "Chat" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "user_id" TEXT NOT NULL,
    "title" TEXT,
    "visibility" TEXT DEFAULT 'PUBLIC',
    "time_zone" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL,
    "message_count" INTEGER NOT NULL DEFAULT 0
);

-- CreateTable
CREATE TABLE "AttachmentDocument" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "user_id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT,
    "kind" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Stream" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "chat_id" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL,
    CONSTRAINT "Stream_chat_id_fkey" FOREIGN KEY ("chat_id") REFERENCES "Chat" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Suggestion" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "document_id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "original_text" TEXT NOT NULL,
    "suggested_text" TEXT NOT NULL,
    "description" TEXT,
    "is_resolved" BOOLEAN NOT NULL DEFAULT false,
    "document_created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL,
    CONSTRAINT "Suggestion_document_id_fkey" FOREIGN KEY ("document_id") REFERENCES "AttachmentDocument" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "UIMessage" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "chat_id" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "parts" JSONB NOT NULL,
    "metadata" JSONB,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL,
    "attachments" JSONB,
    "vote" TEXT,
    CONSTRAINT "UIMessage_chat_id_fkey" FOREIGN KEY ("chat_id") REFERENCES "Chat" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Stream_chat_id_key" ON "Stream"("chat_id");
