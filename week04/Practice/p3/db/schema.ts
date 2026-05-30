// src/db/schema.ts
import { sql } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const itemsTable = sqliteTable("items", {
  id: integer("id").primaryKey({ autoIncrement: true }),

  name: text("name").notNull(),

  extension: text("extension"),

  localUri: text("local_uri"),

  parentId: integer("parent_id"),

  isFolder: integer("is_folder", { mode: "boolean" }).notNull().default(false),

  size: integer("size").notNull().default(0),

  createdAt: text("created_at")
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),

  updatedAt: text("updated_at")
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),
});

export type Item = typeof itemsTable.$inferSelect;
export type NewItem = typeof itemsTable.$inferInsert;
