import { int, integer, real, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const usersTable = sqliteTable("users_table", {
  id: int().primaryKey({ autoIncrement: true }),
  name: text().notNull(),
  age: int().notNull(),
  email: text().notNull().unique(),
});

export const productsTable = sqliteTable("products_table", {
  id: integer("id").primaryKey({ autoIncrement: true }),

  title: text("title").notNull(),

  image: text("image"),

  stock: integer("stock").default(0),
});