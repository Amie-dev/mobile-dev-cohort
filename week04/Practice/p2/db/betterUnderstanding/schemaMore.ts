import {
  int,
  sqliteTable,
  text,
  real,
} from "drizzle-orm/sqlite-core";

//
// USERS TABLE
//
export const usersTable = sqliteTable("users_table", {
  id: int().primaryKey({ autoIncrement: true }),
  name: text().notNull(),
  age: int().notNull(),
  email: text().notNull().unique(),
});

//
// POSTS TABLE
//
export const postsTable = sqliteTable("posts_table", {
  id: int().primaryKey({ autoIncrement: true }),

  title: text().notNull(),

  content: text(),

  userId: int()
    .notNull()
    .references(() => usersTable.id),

  createdAt: text().default("CURRENT_TIMESTAMP"),
});

//
// PRODUCTS TABLE
//
export const productsTable = sqliteTable("products_table", {
  id: int().primaryKey({ autoIncrement: true }),

  title: text().notNull(),

  price: real().notNull(),

  image: text(),

  stock: int().default(0),
});

//
// TODOS TABLE
//
export const todosTable = sqliteTable("todos_table", {
  id: int().primaryKey({ autoIncrement: true }),

  title: text().notNull(),

  completed: int({ mode: "boolean" }).default(false),

  userId: int()
    .notNull()
    .references(() => usersTable.id),
});