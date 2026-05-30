import { useEffect, useState } from "react";
import { Directory, File } from "expo-file-system";
import { Ionicons } from "@expo/vector-icons";

import {
  Alert,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

import { useFiles } from "@/context/FileContext";
import { useTheme } from "@/context/ThemeContext";

type FileItem = File | Directory;

export default function FileManagerScreen() {
  const { theme } = useTheme();

  const {
    files,
    folders,
    createAppFolders,
    readFolder,
    deleteFile,
    copyFileToAttachments,
  } = useFiles();

  const [folderItems, setFolderItems] = useState<FileItem[]>([]);

  useEffect(() => {
    loadLocalFiles();
  }, []);

  const loadLocalFiles = async () => {
    await createAppFolders();
    const items = readFolder(folders.root);
    setFolderItems(items);
  };

  const createFolder = async () => {
    try {
      const folder = new Directory(folders.root, `folder-${Date.now()}`);
      folder.create();

      Alert.alert("Success", "Folder created");
      loadLocalFiles();
    } catch (error) {
      console.log("Create folder error:", error);
      Alert.alert("Error", "Could not create folder");
    }
  };

  const createFile = async () => {
    try {
      const file = new File(folders.exports, `demo-${Date.now()}.txt`);

      file.write("Hello from DevSnippetsAI");

      Alert.alert("Success", "File created");
      loadLocalFiles();
    } catch (error) {
      console.log("Create file error:", error);
      Alert.alert("Error", "Could not create file");
    }
  };

  const pickAndSaveFile = async () => {
    try {
      const file = await File.pickFileAsync();

      if (!file) return;

      await copyFileToAttachments(file.uri, file.name);

      Alert.alert("Success", "File saved inside attachments");
      loadLocalFiles();
    } catch (error) {
      console.log("Pick file error:", error);
      Alert.alert("Error", "Could not pick file");
    }
  };

  const deleteSelectedFile = async (item: FileItem) => {
    try {
      if (item instanceof Directory) {
        item.delete();
        Alert.alert("Deleted", "Folder deleted");
        loadLocalFiles();
        return;
      }

      const matchedDbFile = files.find((file) => file.uri === item.uri);

      if (matchedDbFile) {
        await deleteFile(matchedDbFile.id, item.uri);
      } else {
        item.delete();
      }

      Alert.alert("Deleted", "File deleted");
      loadLocalFiles();
    } catch (error) {
      console.log("Delete error:", error);
      Alert.alert("Error", "Could not delete item");
    }
  };

  const copySelectedFile = async (item: FileItem) => {
    try {
      if (item instanceof Directory) {
        Alert.alert("Not supported", "Folder copy is not added yet");
        return;
      }

      await copyFileToAttachments(item.uri, item.name);

      Alert.alert("Copied", "File copied to attachments");
      loadLocalFiles();
    } catch (error) {
      console.log("Copy error:", error);
      Alert.alert("Error", "Could not copy file");
    }
  };

  const getIconName = (item: FileItem) => {
    if (item instanceof Directory) return "folder";

    if (item.name.endsWith(".png") || item.name.endsWith(".jpg")) {
      return "image";
    }

    if (
      item.name.endsWith(".js") ||
      item.name.endsWith(".ts") ||
      item.name.endsWith(".tsx")
    ) {
      return "code-slash";
    }

    return "document-text";
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <View>
        <Text style={[styles.heading, { color: theme.text }]}>
          File Manager
        </Text>

        <Text style={[styles.subHeading, { color: theme.mutedText }]}>
          Browse, create, save, copy and delete local files
        </Text>
      </View>

      <View style={styles.actionGrid}>
        <Pressable
          style={[styles.actionButton, { backgroundColor: theme.primary }]}
          onPress={createFolder}
        >
          <Ionicons name="folder-open-outline" size={20} color="#fff" />
          <Text style={styles.actionText}>Create Folder</Text>
        </Pressable>

        <Pressable
          style={[styles.actionButton, { backgroundColor: theme.primary }]}
          onPress={createFile}
        >
          <Ionicons name="document-text-outline" size={20} color="#fff" />
          <Text style={styles.actionText}>Create File</Text>
        </Pressable>

        <Pressable
          style={[styles.actionButton, { backgroundColor: theme.primary }]}
          onPress={pickAndSaveFile}
        >
          <Ionicons name="attach-outline" size={20} color="#fff" />
          <Text style={styles.actionText}>Pick File</Text>
        </Pressable>

        <Pressable
          style={[styles.actionButton, { backgroundColor: theme.primary }]}
          onPress={loadLocalFiles}
        >
          <Ionicons name="refresh-outline" size={20} color="#fff" />
          <Text style={styles.actionText}>Refresh</Text>
        </Pressable>
      </View>

      <Text style={[styles.sectionTitle, { color: theme.text }]}>
        Local Folder Items
      </Text>

      <FlatList
        data={folderItems}
        keyExtractor={(item) => item.uri}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ gap: 12, paddingBottom: 24 }}
        ListEmptyComponent={
          <View style={styles.emptyBox}>
            <Ionicons name="folder-open-outline" size={54} color={theme.mutedText} />
            <Text style={[styles.emptyTitle, { color: theme.text }]}>
              No files found
            </Text>
            <Text style={[styles.emptyText, { color: theme.mutedText }]}>
              Create or pick a file to see it here.
            </Text>
          </View>
        }
        renderItem={({ item }) => {
          const isFolder = item instanceof Directory;

          return (
            <View
              style={[
                styles.card,
                {
                  backgroundColor: theme.card,
                  borderColor: theme.border,
                },
              ]}
            >
              <View style={styles.cardTop}>
                <Ionicons
                  name={getIconName(item)}
                  size={28}
                  color={isFolder ? theme.warning : theme.primary}
                />

                <View style={{ flex: 1 }}>
                  <Text style={[styles.title, { color: theme.text }]}>
                    {item.name}
                  </Text>

                  <Text
                    numberOfLines={1}
                    style={[styles.uri, { color: theme.mutedText }]}
                  >
                    {item.uri}
                  </Text>

                  <Text style={[styles.type, { color: theme.primary }]}>
                    {isFolder ? "Folder" : "File"}
                  </Text>
                </View>
              </View>

              <View style={styles.cardActions}>
                {!isFolder && (
                  <Pressable
                    style={[
                      styles.smallButton,
                      { backgroundColor: theme.surface },
                    ]}
                    onPress={() => copySelectedFile(item)}
                  >
                    <Text style={[styles.smallButtonText, { color: theme.text }]}>
                      Copy
                    </Text>
                  </Pressable>
                )}

                <Pressable
                  style={[styles.smallButton, { backgroundColor: theme.danger }]}
                  onPress={() => deleteSelectedFile(item)}
                >
                  <Text style={styles.deleteText}>Delete</Text>
                </Pressable>
              </View>
            </View>
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

  heading: {
    fontSize: 28,
    fontWeight: "800",
  },

  subHeading: {
    marginTop: 4,
    fontSize: 14,
  },

  actionGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },

  actionButton: {
    width: "48%",
    padding: 14,
    borderRadius: 16,
    flexDirection: "row",
    gap: 8,
    alignItems: "center",
    justifyContent: "center",
  },

  actionText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 13,
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: "800",
  },

  card: {
    padding: 16,
    borderRadius: 18,
    borderWidth: 1,
    gap: 14,
  },

  cardTop: {
    flexDirection: "row",
    gap: 12,
    alignItems: "flex-start",
  },

  title: {
    fontSize: 16,
    fontWeight: "800",
  },

  uri: {
    marginTop: 4,
    fontSize: 12,
  },

  type: {
    marginTop: 6,
    fontSize: 13,
    fontWeight: "700",
  },

  cardActions: {
    flexDirection: "row",
    gap: 10,
  },

  smallButton: {
    paddingHorizontal: 14,
    paddingVertical: 9,
    borderRadius: 999,
  },

  smallButtonText: {
    fontWeight: "700",
  },

  deleteText: {
    color: "#fff",
    fontWeight: "700",
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