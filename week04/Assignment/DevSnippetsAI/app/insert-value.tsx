import { Text, View, Button, TouchableOpacity, FlatList } from "react-native";
import * as SQLite from "expo-sqlite";
import { useEffect, useState } from "react";
import { drizzle } from "drizzle-orm/expo-sqlite";
import { useMigrations } from "drizzle-orm/expo-sqlite/migrator";
import { eq } from "drizzle-orm"; // <-- add this import
import { usersTable } from "../../db/schema";
import migrations from "../../drizzle/migrations";
import { db, expoDb } from "../../db/database";

// const expoDb = SQLite.openDatabaseSync("db.db");
// const db = drizzle(expoDb);

export default function App() {
  const { success, error } = useMigrations(db, migrations);

  const [items, setItems] = useState<(typeof usersTable.$inferSelect)[]>([]);

  // Load all users
  async function loadUsers() {
    const users = await db.select().from(usersTable);
    setItems(users);
  }

  // Add random user
  async function addUser() {
    const randomId = Math.floor(Math.random() * 1000);
    await db.insert(usersTable).values({
      name: `User${randomId}`,
      age: 20 + (randomId % 10),
      email: `user${randomId}@example.com`,
    });
    await loadUsers();
  }

  // Delete specific user
  // Delete specific user
  async function deleteUser(id: number) {
    await db.delete(usersTable).where(eq(usersTable.id, id));
    await loadUsers();
  }

  async function deleteALLUser() {
    await db.delete(usersTable);
    await loadUsers();
  }

  useEffect(() => {
    if (!success) return;
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

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Button title="Add Random User" onPress={addUser} />
 <TouchableOpacity
                onPress={deleteALLUser}
                style={{
                  marginTop: 10,
                  backgroundColor: "red",
                  padding: 8,
                  borderRadius: 5,
                }}
              >
                <Text style={{ color: "white", textAlign: "center" }}>
                  Delete ALL user_table
                </Text>
              </TouchableOpacity>
           
      {items.length === 0 ? (
        <Text style={{ marginTop: 20 }}>No users found</Text>
      ) : (
        <FlatList
          data={items}
          keyExtractor={(item) => item.id.toString()} // ✅ must be a function
          renderItem={({ item }) => (
            <View
              style={{
                marginTop: 20,
                padding: 15,
                borderWidth: 1,
                borderRadius: 8,
                backgroundColor: "#f9f9f9",
              }}
            >
              <Text style={{ fontWeight: "bold" }}>{item.name}</Text>
              <Text>{item.email}</Text>
              <Text>Age: {item.age}</Text>

              <TouchableOpacity
                onPress={() => deleteUser(item.id)}
                style={{
                  marginTop: 10,
                  backgroundColor: "red",
                  padding: 8,
                  borderRadius: 5,
                }}
              >
                <Text style={{ color: "white", textAlign: "center" }}>
                  Delete
                </Text>
              </TouchableOpacity>
            </View>
          )}
        />
      )}
    </View>
  );
}
