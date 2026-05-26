import { Text, View } from "react-native";
import * as SQLite from "expo-sqlite";
import { useEffect, useState } from "react";
import { drizzle } from "drizzle-orm/expo-sqlite";
import { usersTable } from "../../db/schema";
import { useMigrations } from "drizzle-orm/expo-sqlite/migrator";
import migrations from "../../drizzle/migrations.js";

const expo = SQLite.openDatabaseSync("db.db");
const db = drizzle(expo);

export default function App() {
  const { success, error } = useMigrations(db, migrations);

  const [items, setItems] = useState<
    typeof usersTable.$inferSelect[] | null
  >(null);

  useEffect(() => {
    if (!success) return;

    async function loadUsers() {
      await db.delete(usersTable);

      await db.insert(usersTable).values({
        name: "John",
        age: 30,
        email: "john@example.com",
      });

      const users = await db.select().from(usersTable);

      setItems(users);
    }

    loadUsers();
  }, [success]);

  if (error) {
    return (
      <View>
        <Text>Migration error: {error.message}</Text>
      </View>
    );
  }

  if (!success) {
    return (
      <View>
        <Text>Migration is in progress...</Text>
      </View>
    );
  }

  if (!items || items.length === 0) {
    return (
      <View>
        <Text>Empty</Text>
      </View>
    );
  }

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {items.map((item) => (
        <Text key={item.id}>{item.email}</Text>
      ))}
    </View>
  );
}