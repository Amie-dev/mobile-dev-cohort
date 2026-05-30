import { useEffect, useState } from "react";
import { router, useLocalSearchParams } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

import {
  Alert,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

import { useSnippet } from "@/context/SnippetContext";
import { useTheme } from "@/context/ThemeContext";

type SnippetDetails = {
  id: number;
  title: string;
  code: string;
  language: string;
  tags: string | null;
  isFavorite: boolean | null;
  createdAt: string;
  updatedAt: string;
};

export default function SnippetDetailsScreen() {
  const { id } = useLocalSearchParams();
  const { theme } = useTheme();
  const { getSnippetById, deleteSnippet, toggleFavorite } = useSnippet();

  const snippetId = Number(id);

  const [snippet, setSnippet] = useState<SnippetDetails | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadSnippet();
  }, [id]);

  const loadSnippet = async () => {
    try {
      setLoading(true);

      const result = await getSnippetById(snippetId);

      if (!result) {
        Alert.alert("Not Found", "Snippet not found.");
        router.back();
        return;
      }

      setSnippet(result);
    } catch (error) {
      console.log("Load snippet error:", error);
      Alert.alert("Error", "Could not load snippet.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = () => {
    Alert.alert(
      "Delete Snippet",
      "Are you sure you want to delete this snippet?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            try {
              await deleteSnippet(snippetId);
              router.back();
            } catch (error) {
              console.log("Delete snippet error:", error);
              Alert.alert("Error", "Could not delete snippet.");
            }
          },
        },
      ]
    );
  };

  const handleFavorite = async () => {
    if (!snippet) return;

    try {
      await toggleFavorite(snippet.id, !snippet.isFavorite);

      setSnippet({
        ...snippet,
        isFavorite: !snippet.isFavorite,
      });
    } catch (error) {
      console.log("Favorite error:", error);
      Alert.alert("Error", "Could not update favorite.");
    }
  };

  if (loading) {
    return (
      <View
        style={[
          styles.centerContainer,
          {
            backgroundColor: theme.background,
          },
        ]}
      >
        <Text style={{ color: theme.text, fontWeight: "700" }}>
          Loading snippet...
        </Text>
      </View>
    );
  }

  if (!snippet) {
    return (
      <View
        style={[
          styles.centerContainer,
          {
            backgroundColor: theme.background,
          },
        ]}
      >
        <Text style={{ color: theme.text }}>Snippet not found.</Text>
      </View>
    );
  }

  const tags =
    typeof snippet.tags === "string"
      ? JSON.parse(snippet.tags || "[]")
      : [];

  return (
    <ScrollView
      style={[
        styles.container,
        {
          backgroundColor: theme.background,
        },
      ]}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      {/* HEADER CARD */}
      <View
        style={[
          styles.headerCard,
          {
            backgroundColor: theme.card,
            borderColor: theme.border,
          },
        ]}
      >
        <View style={styles.headerTop}>
          <View style={{ flex: 1 }}>
            <Text style={[styles.title, { color: theme.text }]}>
              {snippet.title}
            </Text>

            <Text style={[styles.extension, { color: theme.primary }]}>
              .{snippet.language}
            </Text>
          </View>

          <Pressable onPress={handleFavorite}>
            <Ionicons
              name={snippet.isFavorite ? "star" : "star-outline"}
              size={28}
              color={snippet.isFavorite ? theme.warning : theme.mutedText}
            />
          </Pressable>
        </View>

        <View style={styles.metaRow}>
          <View style={[styles.metaChip, { backgroundColor: theme.surface }]}>
            <Ionicons name="calendar-outline" size={15} color={theme.primary} />
            <Text style={[styles.metaText, { color: theme.secondaryText }]}>
              Created
            </Text>
          </View>

          <View style={[styles.metaChip, { backgroundColor: theme.surface }]}>
            <Ionicons name="time-outline" size={15} color={theme.primary} />
            <Text style={[styles.metaText, { color: theme.secondaryText }]}>
              Updated
            </Text>
          </View>
        </View>

        <View style={styles.tagRow}>
          {tags.length > 0 ? (
            tags.map((tag: string) => (
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
            ))
          ) : (
            <Text style={{ color: theme.mutedText }}>No tags added</Text>
          )}
        </View>
      </View>

      {/* CODE CARD */}
      <View
        style={[
          styles.codeCard,
          {
            backgroundColor: theme.codeBackground,
            borderColor: theme.border,
          },
        ]}
      >
        <View style={styles.codeHeader}>
          <Text style={[styles.codeTitle, { color: theme.primary }]}>
            {"</>"} Code
          </Text>

          <Text style={[styles.codeLang, { color: theme.codeText }]}>
            .{snippet.language}
          </Text>
        </View>

        <Text selectable style={[styles.code, { color: theme.codeText }]}>
          {snippet.code}
        </Text>
      </View>

      {/* ACTIONS */}
      <View style={styles.actionGrid}>
        <Pressable
          style={[styles.actionButton, { backgroundColor: theme.primary }]}
          onPress={() => router.push(`/snippets/edit/${snippet.id}`)}
        >
          <Ionicons name="create-outline" size={20} color="#fff" />
          <Text style={styles.buttonText}>Edit</Text>
        </Pressable>

        <Pressable
          style={[styles.actionButton, { backgroundColor: theme.aiPrimary }]}
          onPress={() => router.push(`/ai/explain/${snippet.id}`)}
        >
          <Ionicons name="sparkles-outline" size={20} color="#fff" />
          <Text style={styles.buttonText}>AI Explain</Text>
        </Pressable>
      </View>

      <Pressable style={styles.deleteButton} onPress={handleDelete}>
        <Ionicons name="trash-outline" size={20} color="#fff" />
        <Text style={styles.buttonText}>Delete Snippet</Text>
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  content: {
    padding: 16,
    gap: 16,
    paddingBottom: 32,
  },

  centerContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  headerCard: {
    padding: 18,
    borderRadius: 20,
    borderWidth: 1,
    gap: 14,
  },

  headerTop: {
    flexDirection: "row",
    gap: 12,
    alignItems: "flex-start",
  },

  title: {
    fontSize: 26,
    fontWeight: "800",
  },

  extension: {
    marginTop: 6,
    fontSize: 14,
    fontWeight: "800",
    textTransform: "uppercase",
  },

  metaRow: {
    flexDirection: "row",
    gap: 10,
  },

  metaChip: {
    paddingHorizontal: 10,
    paddingVertical: 7,
    borderRadius: 999,
    flexDirection: "row",
    gap: 6,
    alignItems: "center",
  },

  metaText: {
    fontSize: 12,
    fontWeight: "700",
  },

  tagRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },

  tag: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 999,
    borderWidth: 1,
    fontSize: 12,
    fontWeight: "700",
  },

  codeCard: {
    padding: 16,
    borderRadius: 20,
    borderWidth: 1,
    gap: 12,
  },

  codeHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  codeTitle: {
    fontSize: 16,
    fontWeight: "800",
  },

  codeLang: {
    fontSize: 12,
    fontWeight: "700",
    opacity: 0.8,
  },

  code: {
    fontFamily: "monospace",
    fontSize: 14,
    lineHeight: 22,
  },

  actionGrid: {
    flexDirection: "row",
    gap: 12,
  },

  actionButton: {
    flex: 1,
    padding: 15,
    borderRadius: 16,
    flexDirection: "row",
    gap: 8,
    alignItems: "center",
    justifyContent: "center",
  },

  deleteButton: {
    backgroundColor: "#dc2626",
    padding: 15,
    borderRadius: 16,
    flexDirection: "row",
    gap: 8,
    alignItems: "center",
    justifyContent: "center",
  },

  buttonText: {
    color: "#fff",
    fontWeight: "800",
  },
});