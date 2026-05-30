import {
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
import { useState } from "react";
import { File, Paths } from "expo-file-system";
import { router } from "expo-router";

import ScreenWrapper from "@/components/ScreenWrapper";
import { useDB } from "@/context/DBProvider";

type FILETYPE = "txt"|"pdf" | "js" | "ts" | "tsx" | "jsx";

const fileExtensions: FILETYPE[] = ["txt", "pdf","js", "ts", "tsx", "jsx",];

export default function Create() {
  const { createFileRecord } = useDB();

  const [fileData, setFileData] = useState("");
  const [fileName, setFileName] = useState("");
  const [selectedFileExtension, setSelectedFileExtension] =
    useState<FILETYPE>("txt");

  const handleCreateFile = async () => {
    try {
      const cleanName = fileName.trim();

      if (!cleanName) {
        Alert.alert("Error", "Please enter file name");
        return;
      }

      if (!fileData.trim()) {
        Alert.alert("Error", "Please enter file content");
        return;
      }

      const finalFileName = `${cleanName}.${selectedFileExtension}`;

      const newFile = new File(Paths.document, finalFileName);

      if (newFile.exists) {
        Alert.alert("Error", "File already exists");
        return;
      }

      await newFile.write(fileData);

      const info = newFile.info();

      await createFileRecord({
        name: finalFileName,
        extension: selectedFileExtension,
        localUri: newFile.uri,
        size: info.size ?? 0,
        isFolder: false,
        parentId: null,
      });

      Alert.alert("Success", "File created successfully");

      setFileName("");
      setFileData("");
      setSelectedFileExtension("txt");

      router.back();
    } catch (error) {
      console.log(error);
      Alert.alert("Error", "Something went wrong while creating file");
    }
  };

  return (
    <ScreenWrapper>
      <KeyboardAvoidingView
        style={styles.wrapper}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ScrollView
          style={styles.scroll}
          contentContainerStyle={styles.container}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <Text style={styles.title}>Create File</Text>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>File Name</Text>

            <TextInput
              style={styles.input}
              placeholder="Enter file name"
              value={fileName}
              onChangeText={setFileName}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>File Extension</Text>

            <View style={styles.extensionWrapper}>
              {fileExtensions.map((ext) => (
                <Pressable
                  key={ext}
                  onPress={() => setSelectedFileExtension(ext)}
                  style={[
                    styles.extensionBtn,
                    selectedFileExtension === ext && styles.activeExtension,
                  ]}
                >
                  <Text
                    style={[
                      styles.extensionText,
                      selectedFileExtension === ext &&
                        styles.activeExtensionText,
                    ]}
                  >
                    .{ext}
                  </Text>
                </Pressable>
              ))}
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>File Content</Text>

            <TextInput
              style={styles.textArea}
              placeholder="Write your file content here..."
              value={fileData}
              onChangeText={setFileData}
              multiline
              textAlignVertical="top"
            />
          </View>
        </ScrollView>

        <View style={styles.bottomBar}>
          <Pressable style={styles.createBtn} onPress={handleCreateFile}>
            <Text style={styles.createBtnText}>Create File</Text>
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },

  scroll: {
    flex: 1,
  },

  container: {
    padding: 16,
    gap: 18,
    paddingBottom: 100,
  },

  title: {
    fontSize: 24,
    fontWeight: "700",
  },

  inputGroup: {
    gap: 8,
  },

  label: {
    fontSize: 15,
    fontWeight: "600",
  },

  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
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
    fontWeight: "600",
  },

  activeExtensionText: {
    color: "#fff",
  },

  textArea: {
    minHeight: 420,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 12,
    padding: 14,
    fontSize: 15,
  },

  bottomBar: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: "#eee",
    backgroundColor: "#fff",
  },

  createBtn: {
    backgroundColor: "#111827",
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: "center",
  },

  createBtnText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
  },
});
