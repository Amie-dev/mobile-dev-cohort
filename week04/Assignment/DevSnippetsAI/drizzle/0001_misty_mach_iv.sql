CREATE TABLE `products_table` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`title` text NOT NULL,
	`image` text,
	`stock` integer DEFAULT 0
);
