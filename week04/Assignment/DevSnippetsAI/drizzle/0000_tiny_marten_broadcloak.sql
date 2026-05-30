CREATE TABLE `ai_responses_table` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`snippet_id` integer NOT NULL,
	`explanation` text,
	`summary` text,
	`suggestions` text,
	`created_at` text NOT NULL,
	FOREIGN KEY (`snippet_id`) REFERENCES `snippets_table`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `files_table` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`snippet_id` integer,
	`name` text NOT NULL,
	`uri` text NOT NULL,
	`type` text NOT NULL,
	`folder` text DEFAULT 'attachments',
	`size` integer,
	`created_at` text NOT NULL,
	FOREIGN KEY (`snippet_id`) REFERENCES `snippets_table`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `settings_table` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`theme` text DEFAULT 'system',
	`font_size` integer DEFAULT 14,
	`updated_at` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `snippets_table` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`title` text NOT NULL,
	`code` text NOT NULL,
	`language` text NOT NULL,
	`tags` text DEFAULT '[]',
	`is_favorite` integer DEFAULT false,
	`created_at` text NOT NULL,
	`updated_at` text NOT NULL
);
