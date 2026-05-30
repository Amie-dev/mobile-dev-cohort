import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

import { Directory, File, Paths } from "expo-file-system";
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
    root: Directory;
    attachments: Directory;
    exports: Directory;
    templates: Directory;
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

  readFolder: (folder?: Directory) => (File | Directory)[];
};

const FileContext = createContext<FileContextType | null>(null);

type Props = {
  children: ReactNode;
};

const ROOT_DIR = new Directory(Paths.document, "dev-snippets-ai");
const ATTACHMENTS_DIR = new Directory(ROOT_DIR, "attachments");
const EXPORTS_DIR = new Directory(ROOT_DIR, "exports");
const TEMPLATES_DIR = new Directory(ROOT_DIR, "templates");

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

  // create main app folders
  const createAppFolders = async () => {
    if (!ROOT_DIR.exists) ROOT_DIR.create();
    if (!ATTACHMENTS_DIR.exists) ATTACHMENTS_DIR.create();
    if (!EXPORTS_DIR.exists) EXPORTS_DIR.create();
    if (!TEMPLATES_DIR.exists) TEMPLATES_DIR.create();
  };

  // load file metadata from SQLite
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

  // save metadata in SQLite
  const saveFileRecord = async (file: Omit<NewAppFile, "id">) => {
    try {
      await db.insert(filesTable).values(file);
      await loadFiles();
    } catch (error) {
      console.log("Save file record error:", error);
    }
  };

  // safe file name
  const getSafeFileName = (fileName: string) => {
    return `${Date.now()}-${fileName.replace(/\s+/g, "-").toLowerCase()}`;
  };

  // delete physical file + db record
  const deleteFile = async (id: number, uri: string) => {
    try {
      const file = new File(uri);

      if (file.exists) {
        file.delete();
      }

      await db.delete(filesTable).where(eq(filesTable.id, id));
      await loadFiles();
    } catch (error) {
      console.log("Delete file error:", error);
    }
  };

  // copy file to attachments folder
  const copyFileToAttachments = async (
    fromUri: string,
    fileName: string,
    snippetId?: number
  ) => {
    try {
      await createAppFolders();

      const sourceFile = new File(fromUri);
      const safeName = getSafeFileName(fileName);
      const copiedFile = new File(ATTACHMENTS_DIR, safeName);

      sourceFile.copy(copiedFile);

      await saveFileRecord({
        snippetId,
        name: safeName,
        uri: copiedFile.uri,
        type: "attachment",
        folder: "attachments",
        createdAt: new Date().toISOString(),
      });

      return copiedFile.uri;
    } catch (error) {
      console.log("Copy attachment error:", error);
      throw error;
    }
  };

  // move file to attachments folder
  const moveFileToAttachments = async (
    fromUri: string,
    fileName: string,
    snippetId?: number
  ) => {
    try {
      await createAppFolders();

      const sourceFile = new File(fromUri);
      const safeName = getSafeFileName(fileName);
      const movedFile = new File(ATTACHMENTS_DIR, safeName);

      sourceFile.move(movedFile);

      await saveFileRecord({
        snippetId,
        name: safeName,
        uri: movedFile.uri,
        type: "attachment",
        folder: "attachments",
        createdAt: new Date().toISOString(),
      });

      return movedFile.uri;
    } catch (error) {
      console.log("Move attachment error:", error);
      throw error;
    }
  };

  // export snippet as txt/js/json
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
      await createAppFolders();

      const safeTitle = title.replace(/\s+/g, "-").toLowerCase();
      const fileName = `${safeTitle}-${Date.now()}.${format}`;
      const exportFile = new File(EXPORTS_DIR, fileName);

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

      exportFile.write(content);

      await saveFileRecord({
        snippetId,
        name: fileName,
        uri: exportFile.uri,
        type: format,
        folder: "exports",
        createdAt: new Date().toISOString(),
      });

      return exportFile.uri;
    } catch (error) {
      console.log("Export snippet error:", error);
      throw error;
    }
  };

  // read folder files
  const readFolder = (folder: Directory = ROOT_DIR) => {
    try {
      if (!folder.exists) {
        folder.create();
      }

      return folder.list();
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
          root: ROOT_DIR,
          attachments: ATTACHMENTS_DIR,
          exports: EXPORTS_DIR,
          templates: TEMPLATES_DIR,
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