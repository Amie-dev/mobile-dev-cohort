import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { eq } from "drizzle-orm";
import { useMigrations } from "drizzle-orm/expo-sqlite/migrator";

import { db } from "../../db/database";
import migrations from "../../drizzle/migrations";
import { productsTable } from "../../db/schema";

type Product = typeof productsTable.$inferSelect;

export default function PostInsert() {
  const { success, error } = useMigrations(db, migrations);
  const [products, setProducts] = useState<Product[]>([]);

  const loadProducts = async () => {
    const dbProducts = await db.select().from(productsTable);
    setProducts(dbProducts);
  };

  useEffect(() => {
    if (success) {
      loadProducts();
    }
  }, [success]);

  const addProduct = async () => {
    try {
      const randomId = Math.floor(Math.random() * 1000);

      await db.insert(productsTable).values({
        title: `Product ${randomId}`,
        image: `https://picsum.photos/200?random=${randomId}`,
        stock: randomId % 20,
      });

      await loadProducts();
    } catch (error) {
      console.log("ADD PRODUCT ERROR:", error);
    }
  };

  const deleteProduct = async (id: number) => {
    await db.delete(productsTable).where(eq(productsTable.id, id));
    await loadProducts();
  };

  if (error) {
    return (
      <View style={styles.center}>
        <Text>Migration error: {error.message}</Text>
      </View>
    );
  }

  if (!success) {
    return (
      <View style={styles.center}>
        <Text>Migration is in progress...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Button title="Add Random Product" onPress={addProduct} />

      <FlatList
        data={products}
        keyExtractor={(item) => item.id.toString()}
        ListEmptyComponent={
          <Text style={styles.emptyText}>No products found</Text>
        }
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.title}>{item.title}</Text>
            <Text>Stock: {item.stock}</Text>
            {item.image ? <Text>Image URL: {item.image}</Text> : null}

            <TouchableOpacity
              onPress={() => deleteProduct(item.id)}
              style={styles.deleteBtn}
            >
              <Text style={styles.deleteText}>Delete</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyText: {
    marginTop: 20,
    textAlign: "center",
  },
  card: {
    marginTop: 20,
    padding: 15,
    borderWidth: 1,
    borderRadius: 8,
    backgroundColor: "#f9f9f9",
  },
  title: {
    fontWeight: "bold",
  },
  deleteBtn: {
    marginTop: 10,
    backgroundColor: "red",
    padding: 8,
    borderRadius: 5,
  },
  deleteText: {
    color: "white",
    textAlign: "center",
  },
});
