import { Text, View, StyleSheet, Pressable, ScrollView } from "react-native";
import * as SQLite from "expo-sqlite";
import { useEffect, useState } from "react";
import { drizzle } from "drizzle-orm/expo-sqlite";

import { usersTable } from "../../db/schema";
import { db, expoDb } from "../../db";
import { initDatabase } from "../../db/init";

// const expoDb = SQLite.openDatabaseSync("db.db");

// const db = drizzle(expoDb, {
//   logger: true,
// });

export default function App() {
  const [items, setItems] = useState<(typeof usersTable.$inferSelect)[]>([]);

  useEffect(() => {
    initDatabase();
    fetchUsers();
  }, []);

  // async function initDatabase() {
  //   await expoDb.execAsync(`
  //     CREATE TABLE IF NOT EXISTS users_table (
  //       id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
  //       name TEXT NOT NULL,
  //       age INTEGER NOT NULL,
  //       email TEXT NOT NULL UNIQUE
  //     );
  //   `);

  //   await fetchUsers();
  // }

  async function fetchUsers() {
    const users = await db.select().from(usersTable);
    setItems(users);
  }

  async function addRandomUser() {
    const randomId = Date.now();

    await db.insert(usersTable).values({
      name: `User ${randomId}`,
      age: Math.floor(Math.random() * 40) + 18,
      email: `user${randomId}@example.com`,
    });

    await fetchUsers();
  }

  async function clearUsers() {
    await db.delete(usersTable);
    await fetchUsers();
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>SQLite + Drizzle</Text>

      <Pressable style={styles.button} onPress={addRandomUser}>
        <Text style={styles.buttonText}>Add Random User</Text>
      </Pressable>

      <Pressable style={styles.dangerButton} onPress={clearUsers}>
        <Text style={styles.buttonText}>Clear Users</Text>
      </Pressable>

      <Text style={styles.count}>Total Users: {items.length}</Text>

      <ScrollView style={styles.list}>
        {items.length === 0 ? (
          <Text style={styles.emptyText}>No users found</Text>
        ) : (
          items.map((item) => (
            <View key={item.id} style={styles.card}>
              <Text style={styles.name}>{item.name}</Text>
              <Text>Age: {item.age}</Text>
              <Text>Email: {item.email}</Text>
            </View>
          ))
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 60,
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 20,
    textAlign: "center",
  },
  button: {
    backgroundColor: "#2563eb",
    padding: 14,
    borderRadius: 10,
    marginBottom: 10,
  },
  dangerButton: {
    backgroundColor: "#dc2626",
    padding: 14,
    borderRadius: 10,
    marginBottom: 20,
  },
  buttonText: {
    color: "white",
    fontWeight: "700",
    textAlign: "center",
  },
  count: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 10,
  },
  list: {
    flex: 1,
  },
  card: {
    padding: 14,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    marginBottom: 10,
  },
  name: {
    fontSize: 18,
    fontWeight: "700",
  },
  emptyText: {
    textAlign: "center",
    marginTop: 30,
  },
});
