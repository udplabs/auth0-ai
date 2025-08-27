-- CreateTable
CREATE TABLE "public"."Prompts" (
    "id" TEXT NOT NULL,
    "promptText" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "labs" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Prompts_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Prompts_type_idx" ON "public"."Prompts"("type");

-- CreateIndex
CREATE INDEX "Prompts_name_idx" ON "public"."Prompts"("name");
