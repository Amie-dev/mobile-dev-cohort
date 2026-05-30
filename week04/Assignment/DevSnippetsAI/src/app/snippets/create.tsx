import { useState } from "react";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { File } from "expo-file-system";

import {
  Alert,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

import { useSafeAreaInsets } from "react-native-safe-area-context";

import { useFiles } from "@/context/FileContext";
import { useSnippet } from "@/context/SnippetContext";
import { useTheme } from "@/context/ThemeContext";

const EXTENSIONS = ["js", "jsx", "ts", "tsx", "json", "html", "css", "py"];

export default function CreateSnippetScreen() {
  const { theme } = useTheme();
  const { createSnippet } = useSnippet();
  const { copyFileToAttachments } = useFiles();
  const insets = useSafeAreaInsets();

  const [title, setTitle] = useState("");
  const [extension, setExtension] = useState("js");
  const [tags, setTags] = useState("");
  const [code, setCode] = useState("");
  const [saving, setSaving] = useState(false);
  const [pickedFile, setPickedFile] = useState<File | null>(null);

  const pickFile = async () => {
    try {
      const file = await File.pickFileAsync();

      if (!file) return;

      setPickedFile(file);
    } catch (error) {
      console.log("Pick file error:", error);
      Alert.alert("Error", "Could not pick file.");
    }
  };

  const removePickedFile = () => {
    setPickedFile(null);
  };

  const handleSave = async () => {
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

      const now = new Date().toISOString();

      const createdSnippet = await createSnippet({
        title: title.trim(),
        language: extension,
        tags: JSON.stringify(tagArray),
        code,
        isFavorite: false,
        createdAt: now,
        updatedAt: now,
      });

      // Optional attachment: only save if user selected a file/image
      if (pickedFile && createdSnippet?.id) {
        await copyFileToAttachments(
          pickedFile.uri,
          pickedFile.name,
          createdSnippet.id
        );
      }

      router.back();
    } catch (error) {
      console.log("Save snippet error:", error);
      Alert.alert("Error", "Could not save snippet.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={[
          styles.scrollContent,
          {
            paddingBottom: 130 + insets.bottom,
          },
        ]}
      >
        <View>
          <Text style={[styles.heading, { color: theme.text }]}>
            Create Snippet
          </Text>

          <Text style={[styles.subHeading, { color: theme.mutedText }]}>
            Save reusable code for later
          </Text>
        </View>

        <View>
          <Text style={[styles.label, { color: theme.text }]}>Title</Text>

          <TextInput
            value={title}
            onChangeText={setTitle}
            placeholder="React Native Button"
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

        <Pressable
          style={[
            styles.attachButton,
            {
              backgroundColor: theme.card,
              borderColor: theme.border,
            },
          ]}
          onPress={pickFile}
        >
          <Ionicons
            name={pickedFile ? "image" : "image-outline"}
            size={24}
            color={pickedFile ? theme.success : theme.primary}
          />

          <View style={{ flex: 1 }}>
            <Text style={{ color: theme.text, fontWeight: "700" }}>
              {pickedFile ? pickedFile.name : "Attach Screenshot (Optional)"}
            </Text>

            <Text style={{ color: theme.mutedText, marginTop: 4 }}>
              {pickedFile
                ? "Image selected successfully"
                : "You can save the snippet without an image"}
            </Text>
          </View>

          {pickedFile ? (
            <Pressable onPress={removePickedFile}>
              <Ionicons name="close-circle" size={24} color={theme.danger} />
            </Pressable>
          ) : null}
        </Pressable>
      </ScrollView>

      <View
        style={[
          styles.footer,
          {
            backgroundColor: theme.background,
            borderTopColor: theme.border,
            paddingBottom: insets.bottom + 10,
          },
        ]}
      >
        <Pressable
          disabled={saving}
          style={[
            styles.saveButton,
            {
              backgroundColor: saving ? theme.mutedText : theme.primary,
              opacity: saving ? 0.7 : 1,
            },
          ]}
          onPress={handleSave}
        >
          <Ionicons name="save-outline" size={20} color="#fff" />

          <Text style={styles.buttonText}>
            {saving ? "Saving..." : "Save Snippet"}
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

  scrollContent: {
    padding: 16,
    gap: 18,
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

  attachButton: {
    borderWidth: 1,
    borderRadius: 16,
    padding: 16,
    flexDirection: "row",
    gap: 12,
    alignItems: "center",
  },

  footer: {
    paddingHorizontal: 16,
    paddingTop: 12,
    borderTopWidth: 1,
  },

  saveButton: {
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