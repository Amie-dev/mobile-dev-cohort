import { useEffect, useState } from "react";
import { router, useLocalSearchParams } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

import {
  Alert,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

import { useSnippet } from "@/context/SnippetContext";
import { useTheme } from "@/context/ThemeContext";

const EXTENSIONS = ["js", "jsx", "ts", "tsx", "json", "html", "css", "py"];

export default function EditSnippetScreen() {
  const { id } = useLocalSearchParams();
  const { theme } = useTheme();
  const { getSnippetById, updateSnippet } = useSnippet();

  const snippetId = Number(id);

  const [title, setTitle] = useState("");
  const [extension, setExtension] = useState("js");
  const [tags, setTags] = useState("");
  const [code, setCode] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    loadSnippet();
  }, [id]);

  const loadSnippet = async () => {
    try {
      const snippet = await getSnippetById(snippetId);

      if (!snippet) {
        Alert.alert("Not found", "Snippet not found.");
        router.back();
        return;
      }

      setTitle(snippet.title);
      setExtension(snippet.language);
      setCode(snippet.code);

      const parsedTags =
        typeof snippet.tags === "string"
          ? JSON.parse(snippet.tags || "[]")
          : [];

      setTags(parsedTags.join(", "));
    } catch (error) {
      console.log("Load snippet error:", error);
      Alert.alert("Error", "Could not load snippet.");
    }
  };

  const handleUpdate = async () => {
    if (!title.trim() || !extension.trim() || !code.trim()) {
      Alert.alert("Missing fields", "Title, extension and code are required.");
      return;
    }

    try {
      setSaving(true);

      const tagArray = tags
        .split(",")
        .map((tag) => tag.trim())
        .filter(Boolean);

      await updateSnippet(snippetId, {
        title: title.trim(),
        language: extension,
        tags: JSON.stringify(tagArray),
        code,
      });

      router.back();
    } catch (error) {
      console.log("Update snippet error:", error);
      Alert.alert("Error", "Could not update snippet.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={styles.content}
      >
        <View>
          <Text style={[styles.heading, { color: theme.text }]}>
            Edit Snippet
          </Text>

          <Text style={[styles.subHeading, { color: theme.mutedText }]}>
            Update your saved code snippet
          </Text>
        </View>

        <View>
          <Text style={[styles.label, { color: theme.text }]}>Title</Text>

          <TextInput
            value={title}
            onChangeText={setTitle}
            placeholder="Snippet title"
            placeholderTextColor={theme.mutedText}
            style={[
              styles.input,
              {
                backgroundColor: theme.card,
                borderColor: theme.border,
                color: theme.text,
              },
            ]}
          />
        </View>

        <View>
          <Text style={[styles.label, { color: theme.text }]}>Extension</Text>

          <View style={styles.extensionGrid}>
            {EXTENSIONS.map((item) => {
              const isSelected = extension === item;

              return (
                <Pressable
                  key={item}
                  onPress={() => setExtension(item)}
                  style={[
                    styles.extensionChip,
                    {
                      backgroundColor: isSelected ? theme.primary : theme.card,
                      borderColor: isSelected ? theme.primary : theme.border,
                    },
                  ]}
                >
                  <Text
                    style={{
                      color: isSelected ? "#fff" : theme.text,
                      fontWeight: "700",
                    }}
                  >
                    .{item}
                  </Text>
                </Pressable>
              );
            })}
          </View>
        </View>

        <View>
          <Text style={[styles.label, { color: theme.text }]}>Tags</Text>

          <TextInput
            value={tags}
            onChangeText={setTags}
            autoCapitalize="none"
            placeholder="react, expo, ui"
            placeholderTextColor={theme.mutedText}
            style={[
              styles.input,
              {
                backgroundColor: theme.card,
                borderColor: theme.border,
                color: theme.text,
              },
            ]}
          />
        </View>

        <View>
          <Text style={[styles.label, { color: theme.text }]}>Code</Text>

          <View
            style={[
              styles.editorContainer,
              {
                backgroundColor: theme.codeBackground,
                borderColor: theme.border,
              },
            ]}
          >
            <Text style={[styles.editorIcon, { color: theme.primary }]}>
              {"</>"}
            </Text>

            <TextInput
              multiline
              value={code}
              onChangeText={setCode}
              autoCapitalize="none"
              autoCorrect={false}
              placeholder="Write your code here..."
              placeholderTextColor="#64748b"
              style={[styles.codeInput, { color: theme.codeText }]}
            />
          </View>
        </View>
      </ScrollView>

      <View
        style={[
          styles.footer,
          {
            backgroundColor: theme.background,
            borderTopColor: theme.border,
          },
        ]}
      >
        <Pressable
          disabled={saving}
          style={[
            styles.button,
            {
              backgroundColor: saving ? theme.mutedText : theme.primary,
              opacity: saving ? 0.7 : 1,
            },
          ]}
          onPress={handleUpdate}
        >
          <Ionicons name="save-outline" size={20} color="#fff" />

          <Text style={styles.buttonText}>
            {saving ? "Updating..." : "Update Snippet"}
          </Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  content: {
    padding: 16,
    gap: 18,
    paddingBottom: 120,
  },

  heading: {
    fontSize: 28,
    fontWeight: "800",
  },

  subHeading: {
    marginTop: 6,
    fontSize: 14,
  },

  label: {
    marginBottom: 8,
    fontWeight: "700",
    fontSize: 15,
  },

  input: {
    borderWidth: 1,
    borderRadius: 16,
    padding: 14,
    fontSize: 15,
  },

  extensionGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },

  extensionChip: {
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 999,
    borderWidth: 1,
  },

  editorContainer: {
    borderWidth: 1,
    borderRadius: 18,
    padding: 14,
  },

  editorIcon: {
    marginBottom: 10,
    fontWeight: "700",
  },

  codeInput: {
    minHeight: 260,
    textAlignVertical: "top",
    fontFamily: "monospace",
    fontSize: 14,
    lineHeight: 22,
  },

  footer: {
    padding: 16,
    borderTopWidth: 1,
  },

  button: {
    padding: 16,
    borderRadius: 18,
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
    justifyContent: "center",
  },

  buttonText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 16,
  },
});