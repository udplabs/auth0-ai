-- Current sql file was generated after introspecting the database
-- If you want to run this migration please uncomment this code before executing migrations
/*
CREATE TABLE `_prisma_migrations` (
	`id` text PRIMARY KEY NOT NULL,
	`checksum` text NOT NULL,
	`finished_at` numeric,
	`migration_name` text NOT NULL,
	`logs` text,
	`rolled_back_at` numeric,
	`started_at` numeric DEFAULT (current_timestamp) NOT NULL,
	`applied_steps_count` integer DEFAULT 0 NOT NULL
);
--> statement-breakpoint
CREATE TABLE `Account` (
	`id` text PRIMARY KEY NOT NULL,
	`customerId` text NOT NULL,
	`isExternal` numeric DEFAULT false,
	`externalConnectionId` text,
	`externalConnectionName` text,
	`balance` real NOT NULL,
	`currencyCode` text DEFAULT 'USD',
	`currencyName` text DEFAULT 'US Dollar',
	`currencySymbol` text DEFAULT '$',
	`currencyNumericCode` real DEFAULT 840,
	`displayName` text,
	`name` text NOT NULL,
	`number` text NOT NULL,
	`openedDate` numeric NOT NULL,
	`closedDate` numeric,
	`routingNumber` text NOT NULL,
	`type` text NOT NULL,
	`subType` text,
	`status` text DEFAULT 'active',
	`balanceDue` real,
	`currentPrincipal` real,
	`dueDate` numeric,
	`interestRate` real,
	`lastPaymentDate` numeric,
	`nextPaymentDate` numeric,
	`originalPrincipal` real,
	`paymentAmount` real,
	`paymentDate` integer,
	`term` integer,
	`cardNumber` text,
	`creditLimit` real,
	`minimumPaymentAmount` real,
	`statementBalance` real,
	`availableBalance` real,
	`dividendRate` real,
	`interestYTD` real,
	`cashBalance` real,
	`createdAt` numeric DEFAULT (CURRENT_TIMESTAMP) NOT NULL,
	`updatedAt` numeric NOT NULL
);
--> statement-breakpoint
CREATE INDEX `Account_externalConnectionId_idx` ON `Account` (`externalConnectionId`);--> statement-breakpoint
CREATE INDEX `Account_customerId_idx` ON `Account` (`customerId`);--> statement-breakpoint
CREATE INDEX `Account_number_idx` ON `Account` (`number`);--> statement-breakpoint
CREATE INDEX `Account_status_idx` ON `Account` (`status`);--> statement-breakpoint
CREATE INDEX `Account_type_idx` ON `Account` (`type`);--> statement-breakpoint
CREATE TABLE `Message` (
	`id` text PRIMARY KEY NOT NULL,
	`chatId` text NOT NULL,
	`userId` text,
	`role` text NOT NULL,
	`parts` numeric NOT NULL,
	`metadata` numeric,
	`createdAt` numeric DEFAULT (CURRENT_TIMESTAMP) NOT NULL,
	`updatedAt` numeric NOT NULL,
	`attachments` numeric,
	`vote` text,
	FOREIGN KEY (`chatId`) REFERENCES `Chat`(`id`) ON UPDATE cascade ON DELETE cascade
);
--> statement-breakpoint
CREATE INDEX `Message_userId_idx` ON `Message` (`userId`);--> statement-breakpoint
CREATE INDEX `Message_chatId_idx` ON `Message` (`chatId`);--> statement-breakpoint
CREATE TABLE `Chat` (
	`id` text PRIMARY KEY NOT NULL,
	`userId` text,
	`title` text,
	`createdAt` numeric DEFAULT (CURRENT_TIMESTAMP) NOT NULL,
	`updatedAt` numeric NOT NULL
);
--> statement-breakpoint
CREATE INDEX `Chat_userId_idx` ON `Chat` (`userId`);--> statement-breakpoint
CREATE TABLE `Transfer` (
	`id` text PRIMARY KEY NOT NULL,
	`customerId` text NOT NULL,
	`fromAccountId` text NOT NULL,
	`toAccountId` text NOT NULL,
	`description` text NOT NULL,
	`memo` text,
	`amount` real NOT NULL,
	`createdAt` numeric DEFAULT (CURRENT_TIMESTAMP) NOT NULL,
	`updatedAt` numeric NOT NULL,
	`currencyCode` text DEFAULT 'USD',
	`currencyName` text DEFAULT 'US Dollar',
	`currencyNumericCode` real DEFAULT 840,
	`currencySymbol` text DEFAULT '$'
);
--> statement-breakpoint
CREATE INDEX `Transfer_toAccountId_idx` ON `Transfer` (`toAccountId`);--> statement-breakpoint
CREATE INDEX `Transfer_fromAccountId_idx` ON `Transfer` (`fromAccountId`);--> statement-breakpoint
CREATE TABLE `Transaction` (
	`id` text PRIMARY KEY NOT NULL,
	`accountId` text NOT NULL,
	`customerId` text NOT NULL,
	`isExternal` numeric DEFAULT false,
	`externalConnectionId` text,
	`externalConnectionName` text,
	`payee` text NOT NULL,
	`rawPayee` text NOT NULL,
	`description` text NOT NULL,
	`memo` text,
	`amount` real NOT NULL,
	`date` numeric DEFAULT (CURRENT_TIMESTAMP) NOT NULL,
	`type` text NOT NULL,
	`categoryId` text,
	`categoryName` text NOT NULL,
	`budgetCategoryId` text,
	`budgetCategory` text,
	`budgetSubcategory` text,
	`tags` numeric,
	`currencyCode` text DEFAULT 'USD',
	`currencyName` text DEFAULT 'United States Dollar',
	`currencySymbol` text DEFAULT '$',
	`currencyNumericCode` real DEFAULT 840,
	`created_at` numeric DEFAULT (CURRENT_TIMESTAMP) NOT NULL,
	`updated_at` numeric NOT NULL,
	FOREIGN KEY (`accountId`) REFERENCES `Account`(`id`) ON UPDATE cascade ON DELETE cascade
);
--> statement-breakpoint
CREATE INDEX `Transaction_externalConnectionId_idx` ON `Transaction` (`externalConnectionId`);--> statement-breakpoint
CREATE INDEX `Transaction_budgetSubcategory_idx` ON `Transaction` (`budgetSubcategory`);--> statement-breakpoint
CREATE INDEX `Transaction_budgetCategory_idx` ON `Transaction` (`budgetCategory`);--> statement-breakpoint
CREATE INDEX `Transaction_categoryName_idx` ON `Transaction` (`categoryName`);--> statement-breakpoint
CREATE INDEX `Transaction_type_idx` ON `Transaction` (`type`);--> statement-breakpoint
CREATE INDEX `Transaction_date_idx` ON `Transaction` (`date`);--> statement-breakpoint
CREATE INDEX `Transaction_customerId_idx` ON `Transaction` (`customerId`);--> statement-breakpoint
CREATE INDEX `Transaction_accountId_idx` ON `Transaction` (`accountId`);--> statement-breakpoint
CREATE TABLE `Document` (
	`id` text PRIMARY KEY NOT NULL,
	`userId` text NOT NULL,
	`pageContent` text NOT NULL,
	`createdAt` numeric DEFAULT (CURRENT_TIMESTAMP) NOT NULL,
	`updatedAt` numeric NOT NULL,
	`embedding` numeric NOT NULL,
	`metadata` numeric NOT NULL,
	FOREIGN KEY (`id`) REFERENCES `Transaction`(`id`) ON UPDATE cascade ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `SampleAccount` (
	`id` text PRIMARY KEY NOT NULL,
	`customerId` text NOT NULL,
	`balance` real NOT NULL,
	`currencyCode` text DEFAULT 'USD',
	`currencyName` text DEFAULT 'US Dollar',
	`currencySymbol` text DEFAULT '$',
	`currencyNumericCode` real DEFAULT 840,
	`displayName` text,
	`name` text NOT NULL,
	`number` text NOT NULL,
	`openedDate` numeric NOT NULL,
	`closedDate` numeric,
	`routingNumber` text NOT NULL,
	`type` text NOT NULL,
	`subType` text,
	`status` text DEFAULT 'active',
	`balanceDue` real,
	`currentPrincipal` real,
	`dueDate` numeric,
	`interestRate` real,
	`lastPaymentDate` numeric,
	`nextPaymentDate` numeric,
	`originalPrincipal` real,
	`paymentAmount` real,
	`paymentDate` integer,
	`term` integer,
	`cardNumber` text,
	`creditLimit` real,
	`minimumPaymentAmount` real,
	`statementBalance` real,
	`availableBalance` real,
	`dividendRate` real,
	`interestYTD` real,
	`cashBalance` real,
	`createdAt` numeric DEFAULT (CURRENT_TIMESTAMP) NOT NULL,
	`lastSyncedAt` numeric,
	`expiresAt` numeric
);
--> statement-breakpoint
CREATE INDEX `SampleAccount_customerId_idx` ON `SampleAccount` (`customerId`);--> statement-breakpoint
CREATE TABLE `SampleDocument` (
	`id` text PRIMARY KEY NOT NULL,
	`userId` text NOT NULL,
	`pageContent` text NOT NULL,
	`createdAt` numeric DEFAULT (CURRENT_TIMESTAMP) NOT NULL,
	`lastSyncedAt` numeric,
	`expiresAt` numeric,
	`embedding` numeric NOT NULL,
	`metadata` numeric NOT NULL
);
--> statement-breakpoint
CREATE TABLE `SampleTransaction` (
	`id` text PRIMARY KEY NOT NULL,
	`accountId` text NOT NULL,
	`customerId` text NOT NULL,
	`payee` text NOT NULL,
	`rawPayee` text NOT NULL,
	`description` text NOT NULL,
	`memo` text,
	`amount` real NOT NULL,
	`date` numeric NOT NULL,
	`type` text NOT NULL,
	`categoryId` text,
	`categoryName` text NOT NULL,
	`budgetCategoryId` text,
	`budgetCategory` text,
	`budgetSubcategory` text,
	`tags` numeric,
	`currencyCode` text DEFAULT 'USD',
	`currencyName` text DEFAULT 'United States Dollar',
	`currencySymbol` text DEFAULT '$',
	`currencyNumericCode` real DEFAULT 840,
	`created_at` numeric DEFAULT (CURRENT_TIMESTAMP) NOT NULL,
	`lastSyncedAt` numeric,
	`expiresAt` numeric,
	FOREIGN KEY (`accountId`) REFERENCES `SampleAccount`(`id`) ON UPDATE cascade ON DELETE cascade
);
--> statement-breakpoint
CREATE INDEX `SampleTransaction_customerId_idx` ON `SampleTransaction` (`customerId`);--> statement-breakpoint
CREATE INDEX `SampleTransaction_accountId_idx` ON `SampleTransaction` (`accountId`);--> statement-breakpoint
CREATE TABLE `Settings` (
	`id` text PRIMARY KEY NOT NULL,
	`currentModule` integer,
	`currentStep` integer,
	`currentTask` integer,
	`currentLabStep` text,
	`nextLabStep` text,
	`labMeta` text,
	`preferences` text,
	`createdAt` numeric DEFAULT (CURRENT_TIMESTAMP) NOT NULL,
	`updatedAt` numeric NOT NULL
);
--> statement-breakpoint
CREATE TABLE `LocalContent` (
	`id` text PRIMARY KEY NOT NULL,
	`textData` text,
	`applicationData` numeric,
	`name` text NOT NULL,
	`labStep` text,
	`labModule` integer,
	`contentPlacement` text,
	`contentType` text DEFAULT 'prompt/unknown' NOT NULL,
	`mimeType` text DEFAULT 'text/plain' NOT NULL,
	`createdAt` numeric DEFAULT (CURRENT_TIMESTAMP) NOT NULL,
	`updatedAt` numeric DEFAULT (CURRENT_TIMESTAMP) NOT NULL,
	`lastSyncedAt` numeric,
	`expiresAt` numeric
);
--> statement-breakpoint
CREATE INDEX `LocalContent_mimeType_idx` ON `LocalContent` (`mimeType`);--> statement-breakpoint
CREATE INDEX `LocalContent_contentType_idx` ON `LocalContent` (`contentType`);--> statement-breakpoint
CREATE INDEX `LocalContent_labStep_idx` ON `LocalContent` (`labStep`);--> statement-breakpoint
CREATE INDEX `LocalContent_name_idx` ON `LocalContent` (`name`);--> statement-breakpoint
CREATE INDEX `LocalContent_contentPlacement_idx` ON `LocalContent` (`contentPlacement`);
*/