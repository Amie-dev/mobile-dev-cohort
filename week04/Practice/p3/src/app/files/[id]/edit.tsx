import { useLocalSearchParams, router, Stack } from "expo-router";
import { File, Paths } from "expo-file-system";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { useDB } from "@/context/DBProvider";

type FILETYPE = "txt" | "js" | "ts" | "tsx" | "jsx" | "json" | "md";

const editableExtensions: FILETYPE[] = [
  "txt",
  "js",
  "ts",
  "tsx",
  "jsx",
  "json",
  "md",
];

export default function EditFile() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { getItemById, updateItem } = useDB();

  const [fileInfo, setFileInfo] = useState<any>(null);
  const [fileName, setFileName] = useState("");
  const [extension, setExtension] = useState<FILETYPE>("txt");
  const [fileData, setFileData] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const removeExtension = (name: string, ext?: string | null) => {
    if (!ext) return name;
    return name.endsWith(`.${ext}`)
      ? name.slice(0, -ext.length - 1)
      : name;
  };

  const loadFile = async () => {
    try {
      setLoading(true);

      const item = await getItemById(Number(id));

      if (!item || !item.localUri) {
        Alert.alert("Error", "File not found");
        router.back();
        return;
      }

      const ext = (item.extension || "txt").toLowerCase();

      if (!editableExtensions.includes(ext as FILETYPE)) {
        Alert.alert(
          "Not Supported",
          "Only text/code files can be edited."
        );
        router.back();
        return;
      }

      const file = new File(item.localUri);

      setFileInfo(item);
      setExtension(ext as FILETYPE);
      setFileName(removeExtension(item.name, ext));

      if (file.exists) {
        const content = await file.text();
        setFileData(content);
      }
    } catch (error) {
      console.log("Load file error:", error);
      Alert.alert("Error", "Cannot load file");
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    try {
      if (!fileInfo?.localUri) return;

      const cleanName = fileName.trim();

      if (!cleanName) {
        Alert.alert("Error", "File name cannot be empty");
        return;
      }

      setSaving(true);

      const oldFile = new File(fileInfo.localUri);
      const finalFileName = `${cleanName}.${extension}`;
      const newFile = new File(Paths.document, finalFileName);

      const sameFile = oldFile.uri === newFile.uri;

      if (!sameFile && newFile.exists) {
        Alert.alert("Error", "A file with this name already exists");
        return;
      }

      await newFile.write(fileData);

      if (!sameFile && oldFile.exists) {
        await oldFile.delete();
      }

      await updateItem(Number(id), {
        name: finalFileName,
        extension,
        localUri: newFile.uri,
        size: newFile.size ?? 0,
      });

      Alert.alert("Success", "File updated successfully");
      router.back();
    } catch (error) {
      console.log("Save file error:", error);
      Alert.alert("Error", "Could not update file");
    } finally {
      setSaving(false);
    }
  };

  useEffect(() => {
    loadFile();
  }, [id]);

  if (loading) {
    return (
      <SafeAreaView style={styles.center}>
        <ActivityIndicator />
        <Text>Loading editor...</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <Stack.Screen options={{ title: "Edit File" }} />

      <KeyboardAvoidingView
        style={styles.wrapper}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ScrollView
          style={styles.container}
          contentContainerStyle={styles.contentContainer}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <Text style={styles.title}>Edit File</Text>

          <View style={styles.card}>
            <Text style={styles.label}>File Name</Text>

            <TextInput
              style={styles.input}
              value={fileName}
              onChangeText={setFileName}
              placeholder="Enter file name"
            />

            <Text style={styles.label}>Extension</Text>

            <View style={styles.extensionWrapper}>
              {editableExtensions.map((ext) => (
                <Pressable
                  key={ext}
                  onPress={() => setExtension(ext)}
                  style={[
                    styles.extensionBtn,
                    extension === ext && styles.activeExtension,
                  ]}
                >
                  <Text
                    style={[
                      styles.extensionText,
                      extension === ext && styles.activeExtensionText,
                    ]}
                  >
                    .{ext}
                  </Text>
                </Pressable>
              ))}
            </View>

            <Text style={styles.hint}>Path: {fileInfo?.localUri}</Text>
          </View>

          <View style={styles.editorCard}>
            <Text style={styles.label}>Content</Text>

            <TextInput
              style={styles.editor}
              value={fileData}
              onChangeText={setFileData}
              placeholder="Write file content..."
              multiline
              textAlignVertical="top"
            />
          </View>

          <Pressable
            style={[styles.saveBtn, saving && styles.disabledBtn]}
            onPress={handleSave}
            disabled={saving}
          >
            <Text style={styles.saveText}>
              {saving ? "Saving..." : "Save Changes"}
            </Text>
          </Pressable>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#f9fafb",
  },

  wrapper: {
    flex: 1,
  },

  container: {
    flex: 1,
  },

  contentContainer: {
    padding: 16,
    gap: 16,
    paddingBottom: 40,
  },

  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
  },

  title: {
    fontSize: 26,
    fontWeight: "800",
  },

  card: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 14,
    borderWidth: 1,
    borderColor: "#eee",
    gap: 10,
  },

  label: {
    fontSize: 15,
    fontWeight: "700",
  },

  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
  },

  extensionWrapper: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },

  extensionBtn: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: "#ddd",
  },

  activeExtension: {
    backgroundColor: "#111827",
    borderColor: "#111827",
  },

  extensionText: {
    fontWeight: "700",
  },

  activeExtensionText: {
    color: "#fff",
  },

  hint: {
    fontSize: 12,
    color: "#777",
  },

  editorCard: {
    minHeight: 420,
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 14,
    borderWidth: 1,
    borderColor: "#eee",
    gap: 10,
  },

  editor: {
    minHeight: 340,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 12,
    padding: 12,
    fontSize: 15,
    lineHeight: 22,
  },

  saveBtn: {
    backgroundColor: "#111827",
    paddingVertical: 15,
    borderRadius: 14,
    alignItems: "center",
  },

  disabledBtn: {
    opacity: 0.6,
  },

  saveText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "800",
  },
});