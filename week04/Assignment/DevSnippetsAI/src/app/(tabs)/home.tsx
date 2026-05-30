import { useState } from "react";
import { router } from "expo-router";
import {
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { useSnippet } from "@/context/SnippetContext";
import { useTheme } from "@/context/ThemeContext";

export default function HomeScreen() {
  const { theme } = useTheme();
  const { snippets, searchSnippets, toggleFavorite } = useSnippet();

  const [search, setSearch] = useState("");

  const handleSearch = (text: string) => {
    setSearch(text);
    searchSnippets(text);
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <View style={styles.header}>
        <View>
          <Text style={[styles.heading, { color: theme.text }]}>
            DevSnippetsAI
          </Text>
          <Text style={[styles.subHeading, { color: theme.mutedText }]}>
            Save, manage and explain your code
          </Text>
        </View>

        <Pressable
          style={[styles.iconButton, { backgroundColor: theme.primary }]}
          onPress={() => router.push("/snippets/create")}
        >
          <Ionicons name="add" size={26} color="#fff" />
        </Pressable>
      </View>

      <View
        style={[
          styles.searchBox,
          {
            backgroundColor: theme.card,
            borderColor: theme.border,
          },
        ]}
      >
        <Ionicons name="search" size={20} color={theme.mutedText} />

        <TextInput
          value={search}
          onChangeText={handleSearch}
          placeholder="Search snippets..."
          placeholderTextColor={theme.mutedText}
          style={[styles.searchInput, { color: theme.text }]}
        />
      </View>

      <View style={styles.statsRow}>
        <View style={[styles.statCard, { backgroundColor: theme.card }]}>
          <Text style={[styles.statNumber, { color: theme.primary }]}>
            {snippets.length}
          </Text>
          <Text style={[styles.statLabel, { color: theme.mutedText }]}>
            Snippets
          </Text>
        </View>

        <View style={[styles.statCard, { backgroundColor: theme.card }]}>
          <Text style={[styles.statNumber, { color: theme.primary }]}>
            {snippets.filter((item) => item.isFavorite).length}
          </Text>
          <Text style={[styles.statLabel, { color: theme.mutedText }]}>
            Favorites
          </Text>
        </View>
      </View>

      <FlatList
        data={snippets}
        keyExtractor={(item) => String(item.id)}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ gap: 14, paddingBottom: 24 }}
        ListEmptyComponent={
          <View style={styles.emptyBox}>
            <Ionicons name="code-slash-outline" size={54} color={theme.mutedText} />
            <Text style={[styles.emptyTitle, { color: theme.text }]}>
              No snippets found
            </Text>
            <Text style={[styles.emptyText, { color: theme.mutedText }]}>
              Create your first reusable code snippet.
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
                    {item.language}
                  </Text>
                </View>

                <Pressable
                  onPress={() =>
                    toggleFavorite(item.id, !item.isFavorite)
                  }
                >
                  <Ionicons
                    name={item.isFavorite ? "star" : "star-outline"}
                    size={24}
                    color={item.isFavorite ? theme.warning : theme.mutedText}
                  />
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
    gap: 16,
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  heading: {
    fontSize: 28,
    fontWeight: "800",
  },

  subHeading: {
    marginTop: 4,
    fontSize: 14,
  },

  iconButton: {
    width: 48,
    height: 48,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
  },

  searchBox: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    paddingHorizontal: 14,
    borderRadius: 16,
    borderWidth: 1,
  },

  searchInput: {
    flex: 1,
    paddingVertical: 13,
    fontSize: 15,
  },

  statsRow: {
    flexDirection: "row",
    gap: 12,
  },

  statCard: {
    flex: 1,
    padding: 16,
    borderRadius: 18,
  },

  statNumber: {
    fontSize: 24,
    fontWeight: "800",
  },

  statLabel: {
    marginTop: 4,
    fontSize: 13,
  },

  card: {
    padding: 16,
    borderRadius: 20,
    borderWidth: 1,
    gap: 12,
  },

  cardTop: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 12,
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
    paddingTop: 80,
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