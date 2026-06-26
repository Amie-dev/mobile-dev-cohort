import * as SQLite from "expo-sqlite";
import { drizzle } from "drizzle-orm/expo-sqlite";

const expoDb = SQLite.openDatabaseSync("habits.db");

export const db = drizzle(expoDb);