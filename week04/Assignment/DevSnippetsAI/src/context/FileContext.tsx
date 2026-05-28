import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

import * as FileSystem from "expo-file-system";
import { desc, eq } from "drizzle-orm";

import { db } from "../../db/database";
import { filesTable } from "../../db/schema";

type AppFile = typeof filesTable.$inferSelect;
type NewAppFile = typeof filesTable.$inferInsert;

type ExportFormat = "txt" | "js" | "json";

type FileContextType = {
  files: AppFile[];
  loading: boolean;

  folders: {
    root: string;
    attachments: string;
    exports: string;
    templates: string;
  };

  loadFiles: () => Promise<void>;
  createAppFolders: () => Promise<void>;

  saveFileRecord: (file: Omit<NewAppFile, "id">) => Promise<void>;

  deleteFile: (id: number, uri: string) => Promise<void>;

  copyFileToAttachments: (
    fromUri: string,
    fileName: string,
    snippetId?: number
  ) => Promise<string>;

  moveFileToAttachments: (
    fromUri: string,
    fileName: string,
    snippetId?: number
  ) => Promise<string>;

  exportSnippetToFile: (params: {
    snippetId: number;
    title: string;
    code: string;
    language: string;
    tags?: string | null;
    format: ExportFormat;
  }) => Promise<string>;

  readFolder: (folderUri?: string) => Promise<FileSystem.FileInfo[]>;
};

const FileContext = createContext<FileContextType | null>(null);

type Props = {
  children: ReactNode;
};

const ROOT_FOLDER = FileSystem.documentDirectory + "dev-snippets-ai/";
const ATTACHMENTS_FOLDER = ROOT_FOLDER + "attachments/";
const EXPORTS_FOLDER = ROOT_FOLDER + "exports/";
const TEMPLATES_FOLDER = ROOT_FOLDER + "templates/";

export const FileProvider = ({ children }: Props) => {
  const [files, setFiles] = useState<AppFile[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const initFiles = async () => {
      await createAppFolders();
      await loadFiles();
    };

    initFiles();
  }, []);

  const createAppFolders = async () => {
    await FileSystem.makeDirectoryAsync(ROOT_FOLDER, {
      intermediates: true,
    });

    await FileSystem.makeDirectoryAsync(ATTACHMENTS_FOLDER, {
      intermediates: true,
    });

    await FileSystem.makeDirectoryAsync(EXPORTS_FOLDER, {
      intermediates: true,
    });

    await FileSystem.makeDirectoryAsync(TEMPLATES_FOLDER, {
      intermediates: true,
    });
  };

  const loadFiles = async () => {
    try {
      setLoading(true);

      const result = await db
        .select()
        .from(filesTable)
        .orderBy(desc(filesTable.createdAt));

      setFiles(result);
    } catch (error) {
      console.log("Load files error:", error);
    } finally {
      setLoading(false);
    }
  };

  const saveFileRecord = async (file: Omit<NewAppFile, "id">) => {
    try {
      await db.insert(filesTable).values(file);
      await loadFiles();
    } catch (error) {
      console.log("Save file record error:", error);
    }
  };

  const getSafeFileName = (fileName: string) => {
    const time = Date.now();
    return `${time}-${fileName.replace(/\s+/g, "-").toLowerCase()}`;
  };

  const deleteFile = async (id: number, uri: string) => {
    try {
      const info = await FileSystem.getInfoAsync(uri);

      if (info.exists) {
        await FileSystem.deleteAsync(uri, {
          idempotent: true,
        });
      }

      await db.delete(filesTable).where(eq(filesTable.id, id));
      await loadFiles();
    } catch (error) {
      console.log("Delete file error:", error);
    }
  };

  const copyFileToAttachments = async (
    fromUri: string,
    fileName: string,
    snippetId?: number
  ) => {
    try {
      const safeName = getSafeFileName(fileName);
      const newUri = ATTACHMENTS_FOLDER + safeName;

      await FileSystem.copyAsync({
        from: fromUri,
        to: newUri,
      });

      await saveFileRecord({
        snippetId,
        name: safeName,
        uri: newUri,
        type: "attachment",
        folder: "attachments",
        createdAt: new Date().toISOString(),
      });

      return newUri;
    } catch (error) {
      console.log("Copy attachment error:", error);
      throw error;
    }
  };

  const moveFileToAttachments = async (
    fromUri: string,
    fileName: string,
    snippetId?: number
  ) => {
    try {
      const safeName = getSafeFileName(fileName);
      const newUri = ATTACHMENTS_FOLDER + safeName;

      await FileSystem.moveAsync({
        from: fromUri,
        to: newUri,
      });

      await saveFileRecord({
        snippetId,
        name: safeName,
        uri: newUri,
        type: "attachment",
        folder: "attachments",
        createdAt: new Date().toISOString(),
      });

      return newUri;
    } catch (error) {
      console.log("Move attachment error:", error);
      throw error;
    }
  };

  const exportSnippetToFile = async ({
    snippetId,
    title,
    code,
    language,
    tags,
    format,
  }: {
    snippetId: number;
    title: string;
    code: string;
    language: string;
    tags?: string | null;
    format: ExportFormat;
  }) => {
    try {
      const safeTitle = title.replace(/\s+/g, "-").toLowerCase();
      const fileName = `${safeTitle}-${Date.now()}.${format}`;
      const fileUri = EXPORTS_FOLDER + fileName;

      let content = code;

      if (format === "json") {
        content = JSON.stringify(
          {
            title,
            code,
            language,
            tags: tags ? JSON.parse(tags) : [],
            exportedAt: new Date().toISOString(),
          },
          null,
          2
        );
      }

      await FileSystem.writeAsStringAsync(fileUri, content);

      await saveFileRecord({
        snippetId,
        name: fileName,
        uri: fileUri,
        type: format,
        folder: "exports",
        createdAt: new Date().toISOString(),
      });

      return fileUri;
    } catch (error) {
      console.log("Export snippet error:", error);
      throw error;
    }
  };

  const readFolder = async (folderUri = ROOT_FOLDER) => {
    try {
      const items = await FileSystem.readDirectoryAsync(folderUri);

      const infoList = await Promise.all(
        items.map((item) => FileSystem.getInfoAsync(folderUri + item))
      );

      return infoList;
    } catch (error) {
      console.log("Read folder error:", error);
      return [];
    }
  };

  return (
    <FileContext.Provider
      value={{
        files,
        loading,

        folders: {
          root: ROOT_FOLDER,
          attachments: ATTACHMENTS_FOLDER,
          exports: EXPORTS_FOLDER,
          templates: TEMPLATES_FOLDER,
        },

        loadFiles,
        createAppFolders,
        saveFileRecord,
        deleteFile,
        copyFileToAttachments,
        moveFileToAttachments,
        exportSnippetToFile,
        readFolder,
      }}
    >
      {children}
    </FileContext.Provider>
  );
};

export const useFiles = () => {
  const context = useContext(FileContext);

  if (!context) {
    throw new Error("useFiles must be used inside FileProvider");
  }

  return context;
};