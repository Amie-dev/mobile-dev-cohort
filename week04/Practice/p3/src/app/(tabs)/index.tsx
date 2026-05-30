import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import ScreenWrapper from "@/components/ScreenWrapper";
import { useMigrations } from "drizzle-orm/expo-sqlite/migrator";
import { db } from "../../../db/database";
import migrations from "../../../drizzle/migrations";
import { Item, itemsTable } from "../../../db/schema";

const index = () => {
  const { success, error } = useMigrations(db, migrations);
  const [items, setItems] = useState<Item[]>([]);

  console.log({
    items,
  });
  // Load all users
  async function loadUsers() {
    const users = await db.select().from(itemsTable);
    setItems(users);
  }

  useEffect(() => {
    if (success) {
      loadUsers();
    }

    return;
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
  if (items.length == 0) {
    return (
      <View>
        <Text>DB Is Empty</Text>
      </View>
    );
  }
  return (
    <ScreenWrapper>
      <View>
        <Text>index</Text>
      </View>
    </ScreenWrapper>
  );
};

export default index;

const styles = StyleSheet.create({});
