import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { router } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";

import ScreenWrapper from "@/components/ScreenWrapper";
import { useDB } from "@/context/DBProvider";

const Explore = () => {
  const { data } = useDB();

  return (
    <ScreenWrapper>
      <View style={styles.container}>
        <Text style={styles.title}>My Files</Text>

        <FlatList
          data={data}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.list}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <Text style={styles.emptyText}>No files found</Text>
          }
          renderItem={({ item }) => (
            <Pressable
              style={styles.card}
              onPress={() => router.push(`/files/${item.id}`)}
            >
              <View style={styles.left}>
                <Ionicons
                  name={item.isFolder ? "folder" : "document-text"}
                  size={28}
                  color={item.isFolder ? "#f59e0b" : "#2563eb"}
                />
              </View>

              <View style={styles.center}>
                <Text numberOfLines={1} style={styles.fileName}>
                  {item.name}
                </Text>

                <Text style={styles.meta}>
                  {item.isFolder
                    ? "Folder"
                    : `${item.extension ?? "file"} • ${item.size ?? 0} bytes`}
                </Text>

                <Text style={styles.date}>{item.createdAt}</Text>
              </View>

              <Ionicons name="chevron-forward" size={20} color="#999" />
            </Pressable>
          )}
        />
      </View>
    </ScreenWrapper>
  );
};

export default Explore;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },

  title: {
    fontSize: 28,
    fontWeight: "700",
    marginBottom: 20,
  },

  list: {
    gap: 12,
    paddingBottom: 30,
  },

  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 14,
    borderWidth: 1,
    borderColor: "#eee",
  },

  left: {
    marginRight: 12,
  },

  center: {
    flex: 1,
  },

  fileName: {
    fontSize: 16,
    fontWeight: "700",
  },

  meta: {
    marginTop: 4,
    color: "#666",
    fontSize: 13,
  },

  date: {
    marginTop: 2,
    color: "#999",
    fontSize: 12,
  },

  emptyText: {
    textAlign: "center",
    marginTop: 50,
    color: "#777",
    fontSize: 16,
  },
});
