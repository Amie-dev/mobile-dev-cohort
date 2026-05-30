import { useLocalSearchParams, router } from "expo-router";
import { File } from "expo-file-system";
import * as Sharing from "expo-sharing";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

import { useDB } from "@/context/DBProvider";

type FileItem = {
  id: number;
  name: string;
  extension: string | null;
  localUri: string | null;
  size: number;
  createdAt: string;
};

export default function FileDetails() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { getItemById, deleteItem } = useDB();

  const [fileInfo, setFileInfo] = useState<FileItem | null>(null);
  const [fileData, setFileData] = useState("");
  const [loading, setLoading] = useState(true);

  const extension = fileInfo?.extension?.toLowerCase() ?? "";
  const isPdf = extension === "pdfi";

  const isTextFile = [
    "txt",
    "js",
    "ts",
    "tsx",
    "jsx",
    "json",
    "md",
    "html",
    "css",
    "pdf"
  ].includes(extension);

  // Load file info
  const getFileInfo = async () => {
    try {
      setLoading(true);

      const data = await getItemById(Number(id));

      if (!data) {
        Alert.alert("Error", "File not found");
        router.back();
        return;
      }

      setFileInfo(data);
  // if (data.localUri && isTextExtension(data.extension)) {
      if (data.localUri ) {
        const file = new File(data.localUri);

        if (file.exists) {
          const content = await file.text();
          console.log({
            file
          })
          setFileData(content);
        }
      }
    } catch (error) {
      console.log(error);
      Alert.alert("Error", "Cannot read file");
    } finally {
      setLoading(false);
    }
  };

  const isTextExtension = (ext?: string | null) => {
    if (!ext) return false;

    return [
      "txt",
      "js",
      "ts",
      "tsx",
      "jsx",
      "json",
      "md",
      "html",
      "css",
    ].includes(ext.toLowerCase());
  };

  // Share any file
  const handleShare = async () => {
    try {
      if (!fileInfo?.localUri) {
        Alert.alert("Error", "File path not found");
        return;
      }

      const file = new File(fileInfo.localUri);

      if (!file.exists) {
        Alert.alert("Error", "File does not exist on device");
        return;
      }

      const available = await Sharing.isAvailableAsync();

      if (!available) {
        Alert.alert("Error", "Sharing is not supported on this device");
        return;
      }

      console.log("Sharing file:", {
        name: fileInfo.name,
        extension: fileInfo.extension,
        uri: fileInfo.localUri,
      });

      await Sharing.shareAsync(fileInfo.localUri, {
        dialogTitle: `Share ${fileInfo.name}`,
      });
    } catch (error) {
      console.log("Share error:", error);

      Alert.alert(
        "Share Error",
        error instanceof Error ? error.message : "Could not share file"
      );
    }
  };

  // Download = native save/share menu
  const handleDownload = async () => {
    try {
      if (!fileInfo?.localUri) {
        Alert.alert("Error", "File path not found");
        return;
      }

      const file = new File(fileInfo.localUri);

      if (!file.exists) {
        Alert.alert("Error", "File does not exist on device");
        return;
      }

      const available = await Sharing.isAvailableAsync();

      if (!available) {
        Alert.alert("Error", "Download is not supported on this device");
        return;
      }

      await Sharing.shareAsync(fileInfo.localUri, {
        dialogTitle: `Save ${fileInfo.name}`,
      });
    } catch (error) {
      console.log("Download error:", error);

      Alert.alert(
        "Download Error",
        error instanceof Error ? error.message : "Could not download file"
      );
    }
  };

  // Edit only text/code files
  const handleEdit = () => {
    if (!isTextFile) {
      Alert.alert("Not Supported", "Only text/code files can be edited.");
      return;
    }

    router.push({
      pathname: "/files/[id]/edit",
      params: {
        id: String(id),
      },
    });
  };

  // Delete file + DB row
  const handleDelete = () => {
    Alert.alert("Delete File", "Are you sure?", [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Delete",
        style: "destructive",
        onPress: async () => {
          try {
            if (fileInfo?.localUri) {
              const file = new File(fileInfo.localUri);

              if (file.exists) {
                await file.delete();
              }
            }

            await deleteItem(Number(id));

            Alert.alert("Deleted", "File deleted successfully");
            router.back();
          } catch (error) {
            console.log("Delete error:", error);
            Alert.alert("Error", "Could not delete file");
          }
        },
      },
    ]);
  };

  useEffect(() => {
    getFileInfo();
  }, [id]);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator />
        <Text>Loading file...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>{fileInfo?.name}</Text>

      <View style={styles.actions}>
        {isTextFile && (
          <Pressable style={styles.editBtn} onPress={handleEdit}>
            <Text style={styles.btnText}>Edit</Text>
          </Pressable>
        )}

        <Pressable style={styles.shareBtn} onPress={handleShare}>
          <Text style={styles.btnText}>Share</Text>
        </Pressable>

        <Pressable style={styles.downloadBtn} onPress={handleDownload}>
          <Text style={styles.btnText}>Download</Text>
        </Pressable>

        <Pressable style={styles.deleteBtn} onPress={handleDelete}>
          <Text style={styles.btnText}>Delete</Text>
        </Pressable>
      </View>

      <View style={styles.card}>
        <Text style={styles.label}>File ID</Text>
        <Text>{fileInfo?.id}</Text>

        <Text style={styles.label}>Extension</Text>
        <Text>.{fileInfo?.extension}</Text>

        <Text style={styles.label}>Size</Text>
        <Text>{fileInfo?.size} bytes</Text>

        <Text style={styles.label}>Created At</Text>
        <Text>{fileInfo?.createdAt}</Text>

        <Text style={styles.label}>Local URI</Text>
        <Text selectable>{fileInfo?.localUri}</Text>
      </View>

      {isTextFile ? (
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>File Content</Text>

          <Text selectable style={styles.content}>
            {fileData || "No content found"}
          </Text>
        </View>
      ) : (
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>
            {isPdf ? "PDF File" : "Binary File"}
          </Text>

          <Text style={styles.content}>
            Preview is not supported for this file type. Use Share or Download.
          </Text>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },

  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
  },

  title: {
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 16,
  },

  actions: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    marginBottom: 16,
  },

  editBtn: {
    backgroundColor: "#2563eb",
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 10,
  },

  shareBtn: {
    backgroundColor: "#16a34a",
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 10,
  },

  downloadBtn: {
    backgroundColor: "#7c3aed",
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 10,
  },

  deleteBtn: {
    backgroundColor: "#dc2626",
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 10,
  },

  btnText: {
    color: "#fff",
    fontWeight: "700",
  },

  card: {
    padding: 16,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 14,
    marginBottom: 16,
    gap: 6,
  },

  label: {
    marginTop: 8,
    fontWeight: "700",
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 8,
  },

  content: {
    fontSize: 15,
    lineHeight: 22,
  },
});