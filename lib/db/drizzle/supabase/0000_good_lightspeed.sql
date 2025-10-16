-- Current sql file was generated after introspecting the database
-- If you want to run this migration please uncomment this code before executing migrations
/*
CREATE TYPE "public"."ContentPlacement" AS ENUM('aiya', 'labs', 'secret');--> statement-breakpoint
CREATE TYPE "public"."ContentType" AS ENUM('guide/step', 'guide/lab', 'prompt/step', 'prompt/system', 'prompt/lab', 'prompt/unknown', 'reference/code');--> statement-breakpoint
CREATE TYPE "public"."MimeType" AS ENUM('text/markdown', 'text/plain', 'text/html', 'text/csv', 'application/json', 'application/xml', 'text/typescript');--> statement-breakpoint
CREATE TYPE "public"."TransactionType" AS ENUM('credit', 'debit');--> statement-breakpoint
CREATE TYPE "public"."VoteType" AS ENUM('up', 'down');--> statement-breakpoint
CREATE TABLE "_prisma_migrations" (
	"id" varchar(36) PRIMARY KEY NOT NULL,
	"checksum" varchar(64) NOT NULL,
	"finished_at" timestamp with time zone,
	"migration_name" varchar(255) NOT NULL,
	"logs" text,
	"rolled_back_at" timestamp with time zone,
	"started_at" timestamp with time zone DEFAULT now() NOT NULL,
	"applied_steps_count" integer DEFAULT 0 NOT NULL
);
--> statement-breakpoint
CREATE TABLE "RemoteSampleDocument" (
	"id" text PRIMARY KEY NOT NULL,
	"userId" text NOT NULL,
	"pageContent" text NOT NULL,
	"createdAt" timestamp(3) DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updatedAt" timestamp(3) NOT NULL,
	"embedding" jsonb NOT NULL,
	"metadata" jsonb NOT NULL
);
--> statement-breakpoint
CREATE TABLE "RemoteContent" (
	"id" text PRIMARY KEY NOT NULL,
	"textData" text,
	"applicationData" jsonb,
	"name" text NOT NULL,
	"labStep" text,
	"contentPlacement" "ContentPlacement",
	"contentType" "ContentType" DEFAULT 'prompt/unknown' NOT NULL,
	"mimeType" "MimeType" DEFAULT 'text/plain' NOT NULL,
	"createdAt" timestamp(3) DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updatedAt" timestamp(3) NOT NULL,
	"labModule" integer
);
--> statement-breakpoint
ALTER TABLE "RemoteContent" ENABLE ROW LEVEL SECURITY;--> statement-breakpoint
CREATE TABLE "AppInstance" (
	"id" text PRIMARY KEY NOT NULL,
	"auth0ClientId" text,
	"auth0Domain" text,
	"hashedInstanceId" text
);
--> statement-breakpoint
CREATE TABLE "RemoteSettings" (
	"id" text PRIMARY KEY NOT NULL,
	"currentLabStep" text,
	"labMeta" text,
	"preferences" text,
	"createdAt" timestamp(3) DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updatedAt" timestamp(3) NOT NULL,
	"appInstanceId" text,
	"nextLabStep" text,
	"currentModule" integer,
	"currentStep" integer,
	"currentTask" integer
);
--> statement-breakpoint
CREATE TABLE "RemoteChat" (
	"id" text PRIMARY KEY NOT NULL,
	"userId" text,
	"title" text,
	"createdAt" timestamp(3) DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updatedAt" timestamp(3) NOT NULL,
	"appInstanceId" text
);
--> statement-breakpoint
CREATE TABLE "RemoteMessage" (
	"id" text PRIMARY KEY NOT NULL,
	"chatId" text NOT NULL,
	"userId" text,
	"role" text NOT NULL,
	"parts" jsonb NOT NULL,
	"metadata" jsonb,
	"createdAt" timestamp(3) DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updatedAt" timestamp(3) NOT NULL,
	"attachments" jsonb,
	"vote" "VoteType"
);
--> statement-breakpoint
CREATE TABLE "RemoteSampleAccount" (
	"id" text PRIMARY KEY NOT NULL,
	"customerId" text NOT NULL,
	"balance" double precision NOT NULL,
	"currencyCode" text DEFAULT 'USD',
	"currencyName" text DEFAULT 'US Dollar',
	"currencySymbol" text DEFAULT '$',
	"currencyNumericCode" double precision DEFAULT 840,
	"displayName" text,
	"name" text NOT NULL,
	"number" text NOT NULL,
	"openedDate" timestamp(3) NOT NULL,
	"closedDate" timestamp(3),
	"routingNumber" text NOT NULL,
	"type" text NOT NULL,
	"subType" text,
	"status" text DEFAULT 'active',
	"balanceDue" double precision,
	"currentPrincipal" double precision,
	"dueDate" timestamp(3),
	"interestRate" double precision,
	"lastPaymentDate" timestamp(3),
	"nextPaymentDate" timestamp(3),
	"originalPrincipal" double precision,
	"paymentAmount" double precision,
	"paymentDate" integer,
	"term" integer,
	"cardNumber" text,
	"creditLimit" double precision,
	"minimumPaymentAmount" double precision,
	"statementBalance" double precision,
	"availableBalance" double precision,
	"dividendRate" double precision,
	"interestYTD" double precision,
	"cashBalance" double precision,
	"createdAt" timestamp(3) DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updatedAt" timestamp(3) NOT NULL
);
--> statement-breakpoint
CREATE TABLE "RemoteSampleTransaction" (
	"id" text PRIMARY KEY NOT NULL,
	"accountId" text NOT NULL,
	"customerId" text NOT NULL,
	"payee" text NOT NULL,
	"rawPayee" text NOT NULL,
	"description" text NOT NULL,
	"memo" text,
	"amount" double precision NOT NULL,
	"date" timestamp(3) NOT NULL,
	"type" "TransactionType" NOT NULL,
	"categoryId" text,
	"categoryName" text NOT NULL,
	"budgetCategoryId" text,
	"budgetCategory" text,
	"budgetSubcategory" text,
	"tags" jsonb,
	"currencyCode" text DEFAULT 'USD',
	"currencyName" text DEFAULT 'United States Dollar',
	"currencySymbol" text DEFAULT '$',
	"currencyNumericCode" double precision DEFAULT 840,
	"created_at" timestamp(3) DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updated_at" timestamp(3) NOT NULL
);
--> statement-breakpoint
ALTER TABLE "RemoteMessage" ADD CONSTRAINT "RemoteMessage_chatId_fkey" FOREIGN KEY ("chatId") REFERENCES "public"."RemoteChat"("id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "RemoteSampleTransaction" ADD CONSTRAINT "RemoteSampleTransaction_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "public"."RemoteSampleAccount"("id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
CREATE INDEX "RemoteContent_contentPlacement_idx" ON "RemoteContent" USING btree ("contentPlacement" enum_ops);--> statement-breakpoint
CREATE INDEX "RemoteContent_contentType_idx" ON "RemoteContent" USING btree ("contentType" enum_ops);--> statement-breakpoint
CREATE INDEX "RemoteContent_labStep_idx" ON "RemoteContent" USING btree ("labStep" text_ops);--> statement-breakpoint
CREATE INDEX "RemoteContent_mimeType_idx" ON "RemoteContent" USING btree ("mimeType" enum_ops);--> statement-breakpoint
CREATE INDEX "RemoteContent_name_idx" ON "RemoteContent" USING btree ("name" text_ops);--> statement-breakpoint
CREATE INDEX "AppInstance_auth0ClientId_idx" ON "AppInstance" USING btree ("auth0ClientId" text_ops);--> statement-breakpoint
CREATE INDEX "AppInstance_auth0Domain_idx" ON "AppInstance" USING btree ("auth0Domain" text_ops);--> statement-breakpoint
CREATE INDEX "AppInstance_hashedInstanceId_idx" ON "AppInstance" USING btree ("hashedInstanceId" text_ops);--> statement-breakpoint
CREATE INDEX "RemoteSettings_appInstanceId_idx" ON "RemoteSettings" USING btree ("appInstanceId" text_ops);--> statement-breakpoint
CREATE INDEX "RemoteChat_appInstanceId_idx" ON "RemoteChat" USING btree ("appInstanceId" text_ops);--> statement-breakpoint
CREATE INDEX "RemoteChat_userId_idx" ON "RemoteChat" USING btree ("userId" text_ops);--> statement-breakpoint
CREATE INDEX "RemoteMessage_chatId_idx" ON "RemoteMessage" USING btree ("chatId" text_ops);--> statement-breakpoint
CREATE INDEX "RemoteMessage_userId_idx" ON "RemoteMessage" USING btree ("userId" text_ops);--> statement-breakpoint
CREATE INDEX "RemoteSampleAccount_customerId_idx" ON "RemoteSampleAccount" USING btree ("customerId" text_ops);--> statement-breakpoint
CREATE INDEX "RemoteSampleTransaction_accountId_idx" ON "RemoteSampleTransaction" USING btree ("accountId" text_ops);--> statement-breakpoint
CREATE INDEX "RemoteSampleTransaction_customerId_idx" ON "RemoteSampleTransaction" USING btree ("customerId" text_ops);--> statement-breakpoint
CREATE POLICY "Local app read content" ON "RemoteContent" AS PERMISSIVE FOR SELECT TO "prisma" USING (true);
*/