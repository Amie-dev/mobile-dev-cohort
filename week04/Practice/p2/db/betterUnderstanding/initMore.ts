import { expoDb } from "../index";

export async function initDatabase() {
  await expoDb.execAsync(`
    
    CREATE TABLE IF NOT EXISTS users_table (
      id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
      name TEXT NOT NULL,
      age INTEGER NOT NULL,
      email TEXT NOT NULL UNIQUE
    );

    CREATE TABLE IF NOT EXISTS posts_table (
      id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
      title TEXT NOT NULL,
      content TEXT,
      userId INTEGER NOT NULL,
      createdAt TEXT DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS products_table (
      id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
      title TEXT NOT NULL,
      price REAL NOT NULL,
      image TEXT,
      stock INTEGER DEFAULT 0
    );

    CREATE TABLE IF NOT EXISTS todos_table (
      id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
      title TEXT NOT NULL,
      completed INTEGER DEFAULT 0,
      userId INTEGER NOT NULL
    );

  `);
}