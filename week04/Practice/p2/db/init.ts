import { expoDb } from "./index";

export async function initDatabase() {
  await expoDb.execAsync(`
    CREATE TABLE IF NOT EXISTS users_table (
      id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
      name TEXT NOT NULL,
      age INTEGER NOT NULL,
      email TEXT NOT NULL UNIQUE
    );
  `);
}