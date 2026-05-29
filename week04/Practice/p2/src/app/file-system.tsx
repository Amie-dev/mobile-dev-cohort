import React, { useMemo, useState } from "react";
import {
  Alert,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { Directory, File, Paths } from "expo-file-system";

export default function FileSystemDemo() {
  const [output, setOutput] = useState("No output yet");
  const [loading, setLoading] = useState(false);

  /**
   * Paths.document = permanent app storage
   * Good for files that should stay after app restart.
   */
  const demoFile = useMemo(() => {
    return new File(Paths.document, "demo.txt");
  }, []);

  /**
   * Directory example:
   * This folder will be created inside app document storage.
   */
  const notesDirectory = useMemo(() => {
    return new Directory(Paths.document, "notes");
  }, []);

  /**
   * Helper function:
   * It runs any file-system task safely.
   * If error happens, it shows error in UI.
   */
  const runTask = async (title: string, task: () => Promise<void> | void) => {
    try {
      setLoading(true);
      await task();
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      setOutput(`❌ ${title} failed:\n${message}`);
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  /**
   * Create file if it does not exist.
   * idempotent: true means no error if file already exists.
   */
  const createFile = () => {
    runTask("Create File", () => {
      demoFile.create(
        // { idempotent: true }
      );
      setOutput(`✅ File created\n\nURI:\n${demoFile.uri}`);
    });
  };

  /**
   * Write text into file.
   * Default behavior overwrites old content.
   */
  const writeFile = () => {
    runTask("Write File", () => {
      demoFile.create(
        // { idempotent: true }
      );

      demoFile.write("Hello from modern Expo FileSystem 🚀");

      setOutput("✅ Data written into demo.txt");
    });
  };

  /**
   * Read text from file.
   */
  const readFile = () => {
    runTask("Read File", async () => {
      if (!demoFile.exists) {
        setOutput("⚠️ demo.txt does not exist. Create/write file first.");
        return;
      }

      const data = await demoFile.text();

      setOutput(`📖 File content:\n\n${data}`);
    });
  };

  /**
   * Append data into existing file.
   * Modern API supports append option in write().
   */
  const appendFile = () => {
    runTask("Append File", () => {
      demoFile.create(
        // { idempotent: true }
      );

      demoFile.write("\nNew line added here ✅", {
        append: true,
      });

      setOutput("✅ New data appended into demo.txt");
    });
  };

  /**
   * Get file information.
   * info() gives metadata like exists, uri, size, etc.
   */
  const getFileInfo = () => {
    runTask("Get File Info", () => {
      const info = demoFile.info();

      setOutput(
        `ℹ️ File Info\n\n` +
          `Exists: ${info.exists}\n` +
          `URI: ${info.uri ?? demoFile.uri}\n` +
          `Size: ${info.size ?? 0} bytes\n` +
          `Name: ${demoFile.name}\n` +
          `Extension: ${demoFile.extension}`,
      );
    });
  };

  /**
   * Copy file.
   * Original file stays, new file is created.
   */
  const copyFile = () => {
    runTask("Copy File", async () => {
      if (!demoFile.exists) {
        setOutput("⚠️ demo.txt does not exist. Write file first.");
        return;
      }

      const copiedFile = new File(Paths.document, "copy-demo.txt");

      demoFile.copy(copiedFile,
      //    {
      //   overwrite: true,
      // }
    );

      const copiedText = await copiedFile.text();

      setOutput(
        `✅ File copied successfully\n\n` +
          `Copied file URI:\n${copiedFile.uri}\n\n` +
          `Copied content:\n${copiedText}`,
      );
    });
  };

  /**
   * Move file.
   * Original file will move to new location/name.
   * Important: after move, demo.txt no longer exists.
   */
  const moveFile = () => {
    runTask("Move File", () => {
      if (!demoFile.exists) {
        setOutput("⚠️ demo.txt does not exist. Write file first.");
        return;
      }

      const movedFile = new File(Paths.document, "moved-demo.txt");

      demoFile.move(movedFile, 
      //   {
      //   overwrite: true,
      // }
    );

      setOutput(
        `✅ File moved successfully\n\n` +
          `Old file: demo.txt\n` +
          `New file: moved-demo.txt\n\n` +
          `New URI:\n${movedFile.uri}`,
      );
    });
  };

  /**
   * Delete only demo.txt.
   */
  const deleteFile = () => {
    runTask("Delete File", () => {
      if (!demoFile.exists) {
        setOutput("⚠️ demo.txt already does not exist.");
        return;
      }

      demoFile.delete();

      setOutput("🗑️ demo.txt deleted successfully");
    });
  };

  /**
   * Create notes folder.
   */
  const createFolder = () => {
    runTask("Create Folder", () => {
      notesDirectory.create({
        idempotent: true,
        intermediates: true,
      });

      setOutput(`✅ Folder created\n\nURI:\n${notesDirectory.uri}`);
    });
  };

  /**
   * Create a file inside notes folder.
   */
  const createFileInsideFolder = () => {
    runTask("Create File Inside Folder", () => {
      notesDirectory.create({
        idempotent: true,
        intermediates: true,
      });

      const noteFile = new File(notesDirectory, "note-1.txt");

      noteFile.create(
        // { idempotent: true }
      );
      noteFile.write("This file is inside notes folder 📁");

      setOutput(
        `✅ note-1.txt created inside notes folder\n\nURI:\n${noteFile.uri}`,
      );
    });
  };

  /**
   * Read folder content.
   * list() returns files/directories inside that folder.
   */
  const readDirectory = () => {
    runTask("Read Directory", () => {
      if (!notesDirectory.exists) {
        setOutput("⚠️ notes folder does not exist. Create folder first.");
        return;
      }

      const items = notesDirectory.list();

      if (items.length === 0) {
        setOutput("📂 notes folder is empty.");
        return;
      }

      const result = items
        .map((item, index) => {
          return `${index + 1}. ${item.name}\n${item.uri}`;
        })
        .join("\n\n");

      setOutput(`📂 Files inside notes folder:\n\n${result}`);
    });
  };

  /**
   * Delete notes folder.
   * Warning: this deletes all files inside it.
   */
  const deleteFolder = () => {
    runTask("Delete Folder", () => {
      if (!notesDirectory.exists) {
        setOutput("⚠️ notes folder already does not exist.");
        return;
      }

      notesDirectory.delete();

      setOutput("🗑️ notes folder deleted successfully");
    });
  };

  /**
   * Download file into cache folder.
   * Paths.cache = temporary storage.
   *
   * Note:
   * URL must include https://
   */
  const downloadFile = () => {
    runTask("Download File", async () => {
      const downloadsFolder = new Directory(Paths.cache, "downloads");

      downloadsFolder.create({
        idempotent: true,
        intermediates: true,
      });

      const downloadedFile = await File.downloadFileAsync(
        "https://picsum.photos/300",
        downloadsFolder,
        {
          idempotent: true,
        },
      );

      setOutput(
        `✅ Image downloaded successfully\n\n` +
          `URI:\n${downloadedFile.uri}\n\n` +
          `Exists: ${downloadedFile.exists}\n` +
          `Size: ${downloadedFile.size} bytes`,
      );
    });
  };

  /**
   * Pick file from device.
   * Works with the system file picker.
   */
  const pickFile = () => {
    runTask("Pick File", async () => {
      const pickedFile = await File.pickFileAsync();

      setOutput(
        `✅ File picked\n\n` +
          `Name: ${pickedFile.name}\n` +
          `URI:\n${pickedFile.uri}\n` +
          `Size: ${pickedFile.size} bytes\n` +
          `Type: ${pickedFile.type}`,
      );
    });
  };

  /**
   * Reset output box only.
   */
  const clearOutput = () => {
    setOutput("No output yet");
  };

  return (
    <>
      <Text style={styles.title}>Modern Expo FileSystem</Text>
      <Text style={styles.subtitle}>Using File, Directory and Paths API</Text>

      <View
        style={[
          styles.infoBox,
          {
            marginHorizontal: 20,
          },
        ]}
      >
        <Text style={styles.infoTitle}>Storage Paths</Text>
        <Text style={styles.infoText}>Document: {Paths.document.uri}</Text>
        <Text style={styles.infoText}>Cache: {Paths.cache.uri}</Text>
      </View>
      <View
        style={[
          styles.outputBox,
          {
            marginHorizontal: 20,
          },
        ]}
      >
        <View style={styles.outputHeader}>
          <Text style={styles.outputTitle}>
            {loading ? "Running..." : "Output"}
          </Text>

          <Pressable onPress={clearOutput}>
            <Text style={styles.clearText}>Clear</Text>
          </Pressable>
        </View>

        <Text style={styles.outputText}>{output}</Text>
      </View>
      <ScrollView contentContainerStyle={styles.container}>
        <Section title="File Actions">
          <ActionButton title="Create File" onPress={createFile} />
          <ActionButton title="Write File" onPress={writeFile} />
          <ActionButton title="Read File" onPress={readFile} />
          <ActionButton title="Append File" onPress={appendFile} />
          <ActionButton title="Get File Info" onPress={getFileInfo} />
          <ActionButton title="Copy File" onPress={copyFile} />
          <ActionButton title="Move File" onPress={moveFile} />
          <ActionButton title="Delete File" onPress={deleteFile} danger />
        </Section>

        <Section title="Directory Actions">
          <ActionButton title="Create Notes Folder" onPress={createFolder} />
          <ActionButton
            title="Create File Inside Folder"
            onPress={createFileInsideFolder}
          />
          <ActionButton title="Read Notes Folder" onPress={readDirectory} />
          <ActionButton
            title="Delete Notes Folder"
            onPress={deleteFolder}
            danger
          />
        </Section>

        <Section title="Download / Pick">
          <ActionButton
            title="Download Image to Cache"
            onPress={downloadFile}
          />
          <ActionButton title="Pick File From Device" onPress={pickFile} />
        </Section>
      </ScrollView>
    </>
  );
}

type SectionProps = {
  title: string;
  children: React.ReactNode;
};

function Section({ title, children }: SectionProps) {
  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{title}</Text>
      <View style={styles.buttonGrid}>{children}</View>
    </View>
  );
}

type ActionButtonProps = {
  title: string;
  onPress: () => void;
  danger?: boolean;
};

function ActionButton({ title, onPress, danger }: ActionButtonProps) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.button,
        danger && styles.dangerButton,
        pressed && styles.buttonPressed,
      ]}
    >
      <Text style={styles.buttonText}>{title}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    paddingTop: 10,
    backgroundColor: "#F4F7FB",
  },

  title: {
    fontSize: 28,
    fontWeight: "800",
    color: "#111827",
    textAlign: "center",
  },

  subtitle: {
    marginTop: 6,
    marginBottom: 20,
    fontSize: 15,
    color: "#6B7280",
    textAlign: "center",
  },

  infoBox: {
    backgroundColor: "#FFFFFF",
    padding: 14,
    borderRadius: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },

  infoTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#111827",
    marginBottom: 8,
  },

  infoText: {
    fontSize: 12,
    color: "#374151",
    marginBottom: 4,
  },

  section: {
    backgroundColor: "#FFFFFF",
    padding: 14,
    borderRadius: 18,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: "800",
    color: "#111827",
    marginBottom: 12,
  },

  buttonGrid: {
    gap: 10,
  },

  button: {
    backgroundColor: "#111827",
    paddingVertical: 13,
    paddingHorizontal: 14,
    borderRadius: 14,
    alignItems: "center",
  },

  dangerButton: {
    backgroundColor: "#DC2626",
  },

  buttonPressed: {
    opacity: 0.75,
    transform: [{ scale: 0.98 }],
  },

  buttonText: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "700",
  },

  outputBox: {
    backgroundColor: "#111827",
    borderRadius: 18,
    padding: 16,
    marginBottom: 30,
  },

  outputHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  outputTitle: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "800",
  },

  clearText: {
    color: "#93C5FD",
    fontSize: 14,
    fontWeight: "700",
  },

  outputText: {
    marginTop: 12,
    color: "#E5E7EB",
    fontSize: 14,
    lineHeight: 21,
  },
});
