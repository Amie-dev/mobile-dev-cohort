import { Text, View, StyleSheet, Pressable, ScrollView } from "react-native";
import * as SQLite from "expo-sqlite";
import { useEffect, useState } from "react";
import { drizzle } from "drizzle-orm/expo-sqlite";
import { useMigrations } from "drizzle-orm/expo-sqlite/migrator";

import { usersTable } from "../../db/schema";
import migrations from "../../drizzle/migrations.js";

const expoDb = SQLite.openDatabaseSync("db.db");

const db = drizzle(expoDb, {
  logger: true,
});

export default function App() {
  const { success, error } = useMigrations(db, migrations);

  const [items, setItems] = useState<typeof usersTable.$inferSelect[]>([]);

  useEffect(() => {
    checkDatabase();
  }, []);

  useEffect(() => {
    if (!success) return;

    async function loadUsers() {
      const users = await db.select().from(usersTable);
      setItems(users);

      await checkDatabase();
    }

    loadUsers();
  }, [success]);

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
    await checkDatabase();
  }

  async function clearUsers() {
    await db.delete(usersTable);
    await fetchUsers();
    await checkDatabase();
  }

  async function checkDatabase() {
    try {
      const tables = await expoDb.getAllAsync(`
        SELECT name 
        FROM sqlite_master 
        WHERE type='table';
      `);

      console.log("📦 Existing Tables:", tables);

      const userTable = await expoDb.getFirstAsync(`
        SELECT name
        FROM sqlite_master
        WHERE type='table'
        AND name='users_table';
      `);

      console.log(
        userTable ? "✅ users_table already exists" : "❌ users_table not found"
      );

      if (userTable) {
        const users = await expoDb.getAllAsync(`
          SELECT * FROM users_table;
        `);

        console.log("👤 Users:", users);
      }
    } catch (err) {
      console.log("❌ DB Check Error:", err);
    }
  }

  if (error) {
    console.log("❌ Migration Error:", error);

    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Migration error: {error.message}</Text>
      </View>
    );
  }

  if (!success) {
    return (
      <View style={styles.container}>
        <Text>Migration is in progress...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>SQLite + Drizzle Users</Text>

      <View style={styles.buttonRow}>
        <Pressable style={styles.button} onPress={addRandomUser}>
          <Text style={styles.buttonText}>Add Random User</Text>
        </Pressable>

        <Pressable style={styles.secondaryButton} onPress={fetchUsers}>
          <Text style={styles.buttonText}>Refresh</Text>
        </Pressable>
      </View>

      <Pressable style={styles.dangerButton} onPress={clearUsers}>
        <Text style={styles.buttonText}>Clear Users</Text>
      </Pressable>

      <Text style={styles.count}>Total Users: {items.length}</Text>

      <ScrollView style={styles.list} contentContainerStyle={styles.listContent}>
        {items.length === 0 ? (
          <Text style={styles.emptyText}>No users found</Text>
        ) : (
          items.map((item) => (
            <View key={item.id} style={styles.card}>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.info}>Age: {item.age}</Text>
              <Text style={styles.info}>Email: {item.email}</Text>
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
    backgroundColor: "#f8fafc",
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 20,
    textAlign: "center",
  },
  buttonRow: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 10,
  },
  button: {
    flex: 1,
    backgroundColor: "#2563eb",
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
  },
  secondaryButton: {
    flex: 1,
    backgroundColor: "#16a34a",
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
  },
  dangerButton: {
    backgroundColor: "#dc2626",
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
    marginBottom: 18,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "700",
  },
  count: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 12,
  },
  list: {
    flex: 1,
  },
  listContent: {
    paddingBottom: 30,
  },
  card: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 14,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#e5e7eb",
  },
  name: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 4,
  },
  info: {
    fontSize: 14,
    color: "#475569",
  },
  emptyText: {
    textAlign: "center",
    color: "#64748b",
    marginTop: 40,
  },
  errorText: {
    color: "#dc2626",
    fontWeight: "700",
  },
});