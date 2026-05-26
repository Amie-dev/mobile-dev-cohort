import * as SQLite from "expo-sqlite";
import { drizzle } from "drizzle-orm/expo-sqlite";

export const expoDb = SQLite.openDatabaseSync("db.db");

export const db = drizzle(expoDb, {
  logger: true,
});