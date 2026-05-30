import { useEffect } from "react";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";

import { useSnippet } from "@/context/SnippetContext";
import { useTheme } from "@/context/ThemeContext";

export default function FavoritesScreen() {
  const { theme } = useTheme();
  const { snippets, getFavoriteSnippets, toggleFavorite } = useSnippet();

  useEffect(() => {
    getFavoriteSnippets();
  }, []);

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <Text style={[styles.heading, { color: theme.text }]}>Favorites</Text>

      <Text style={[styles.subHeading, { color: theme.mutedText }]}>
        Your saved important snippets
      </Text>

      <FlatList
        data={snippets}
        keyExtractor={(item) => String(item.id)}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ gap: 14, paddingTop: 16, paddingBottom: 24 }}
        ListEmptyComponent={
          <View style={styles.emptyBox}>
            <Ionicons name="star-outline" size={56} color={theme.mutedText} />

            <Text style={[styles.emptyTitle, { color: theme.text }]}>
              No favorites yet
            </Text>

            <Text style={[styles.emptyText, { color: theme.mutedText }]}>
              Mark snippets as favorite to see them here.
            </Text>
          </View>
        }
        renderItem={({ item }) => {
          const tags =
            typeof item.tags === "string"
              ? JSON.parse(item.tags || "[]")
              : item.tags || [];

          return (
            <Pressable
              style={[
                styles.card,
                {
                  backgroundColor: theme.card,
                  borderColor: theme.border,
                },
              ]}
              onPress={() => router.push(`/snippets/${item.id}`)}
            >
              <View style={styles.cardTop}>
                <View style={{ flex: 1 }}>
                  <Text style={[styles.title, { color: theme.text }]}>
                    {item.title}
                  </Text>

                  <Text style={[styles.language, { color: theme.primary }]}>
                    .{item.language}
                  </Text>
                </View>

                <Pressable onPress={() => toggleFavorite(item.id, false)}>
                  <Ionicons name="star" size={24} color={theme.warning} />
                </Pressable>
              </View>

              <Text
                numberOfLines={2}
                style={[
                  styles.codePreview,
                  {
                    backgroundColor: theme.codeBackground,
                    color: theme.codeText,
                  },
                ]}
              >
                {item.code}
              </Text>

              <View style={styles.tagRow}>
                {tags.map((tag: string) => (
                  <Text
                    key={tag}
                    style={[
                      styles.tag,
                      {
                        backgroundColor: theme.surface,
                        color: theme.secondaryText,
                        borderColor: theme.border,
                      },
                    ]}
                  >
                    #{tag}
                  </Text>
                ))}
              </View>
            </Pressable>
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },

  heading: {
    fontSize: 28,
    fontWeight: "800",
  },

  subHeading: {
    marginTop: 4,
    fontSize: 14,
  },

  card: {
    padding: 16,
    borderRadius: 20,
    borderWidth: 1,
    gap: 12,
  },

  cardTop: {
    flexDirection: "row",
    gap: 12,
    alignItems: "flex-start",
  },

  title: {
    fontSize: 18,
    fontWeight: "800",
  },

  language: {
    marginTop: 5,
    fontSize: 13,
    fontWeight: "700",
    textTransform: "uppercase",
  },

  codePreview: {
    padding: 14,
    borderRadius: 14,
    fontFamily: "monospace",
    fontSize: 13,
    lineHeight: 19,
  },

  tagRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },

  tag: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 999,
    borderWidth: 1,
    fontSize: 12,
    fontWeight: "600",
  },

  emptyBox: {
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 100,
    gap: 8,
  },

  emptyTitle: {
    fontSize: 20,
    fontWeight: "800",
  },

  emptyText: {
    fontSize: 14,
    textAlign: "center",
  },
});