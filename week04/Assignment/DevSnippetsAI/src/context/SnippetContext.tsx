import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

import { desc, eq, like, or } from "drizzle-orm";
import { useMigrations } from "drizzle-orm/expo-sqlite/migrator";

import { db } from "../../db/database";
import { snippetsTable } from "../../db/schema";
import migrations from "../../drizzle/migrations";

type Snippet = typeof snippetsTable.$inferSelect;
type NewSnippet = typeof snippetsTable.$inferInsert;

type SnippetContextType = {
  snippets: Snippet[];
  loading: boolean;
  migrationSuccess: boolean;
  error: unknown;

  loadSnippets: () => Promise<void>;
  createSnippet: (snippet: Omit<NewSnippet, "id">) => Promise<Snippet>;
  updateSnippet: (id: number, snippet: Partial<NewSnippet>) => Promise<void>;
  deleteSnippet: (id: number) => Promise<void>;
  toggleFavorite: (id: number, value: boolean) => Promise<void>;
  searchSnippets: (query: string) => Promise<void>;
  getFavoriteSnippets: () => Promise<void>;
  getSnippetById: (id: number) => Promise<Snippet | undefined>;
};

export const SnippetContext = createContext<SnippetContextType | null>(null);

type Props = {
  children: ReactNode;
};

export const SnippetProvider = ({ children }: Props) => {
  const [snippets, setSnippets] = useState<Snippet[]>([]);
  const [loading, setLoading] = useState(false);

  const { success, error } = useMigrations(db, migrations);

  useEffect(() => {
    if (success) {
      loadSnippets();
    }

    if (error) {
      console.log("Migration error:", error);
    }
  }, [success, error]);

  const loadSnippets = async () => {
    try {
      setLoading(true);

      const result = await db
        .select()
        .from(snippetsTable)
        .orderBy(desc(snippetsTable.createdAt));

      setSnippets(result);
    } catch (err) {
      console.log("Load snippets error:", err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const createSnippet = async (
    snippet: Omit<NewSnippet, "id">
  ): Promise<Snippet> => {
    try {
      const [createdSnippet] = await db
        .insert(snippetsTable)
        .values(snippet)
        .returning();

      await loadSnippets();

      return createdSnippet;
    } catch (err) {
      console.log("Create snippet error:", err);
      throw err;
    }
  };

  const updateSnippet = async (id: number, snippet: Partial<NewSnippet>) => {
    try {
      await db
        .update(snippetsTable)
        .set({
          ...snippet,
          updatedAt: new Date().toISOString(),
        })
        .where(eq(snippetsTable.id, id));

      await loadSnippets();
    } catch (err) {
      console.log("Update snippet error:", err);
      throw err;
    }
  };

  const deleteSnippet = async (id: number) => {
    try {
      await db.delete(snippetsTable).where(eq(snippetsTable.id, id));
      await loadSnippets();
    } catch (err) {
      console.log("Delete snippet error:", err);
      throw err;
    }
  };

  const toggleFavorite = async (id: number, value: boolean) => {
    try {
      await db
        .update(snippetsTable)
        .set({
          isFavorite: value,
          updatedAt: new Date().toISOString(),
        })
        .where(eq(snippetsTable.id, id));

      await loadSnippets();
    } catch (err) {
      console.log("Favorite error:", err);
      throw err;
    }
  };

  const searchSnippets = async (query: string) => {
    try {
      setLoading(true);

      const text = query.trim();

      if (!text) {
        await loadSnippets();
        return;
      }

      const searchText = `%${text}%`;

      const result = await db
        .select()
        .from(snippetsTable)
        .where(
          or(
            like(snippetsTable.title, searchText),
            like(snippetsTable.code, searchText),
            like(snippetsTable.language, searchText),
            like(snippetsTable.tags, searchText)
          )
        )
        .orderBy(desc(snippetsTable.createdAt));

      setSnippets(result);
    } catch (err) {
      console.log("Search snippet error:", err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const getFavoriteSnippets = async () => {
    try {
      setLoading(true);

      const result = await db
        .select()
        .from(snippetsTable)
        .where(eq(snippetsTable.isFavorite, true))
        .orderBy(desc(snippetsTable.createdAt));

      setSnippets(result);
    } catch (err) {
      console.log("Favorite snippets error:", err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const getSnippetById = async (id: number) => {
    try {
      const [snippet] = await db
        .select()
        .from(snippetsTable)
        .where(eq(snippetsTable.id, id));

      return snippet;
    } catch (err) {
      console.log("Get snippet by id error:", err);
      throw err;
    }
  };

  return (
    <SnippetContext.Provider
      value={{
        snippets,
        loading,
        migrationSuccess: success,
        error,
        loadSnippets,
        createSnippet,
        updateSnippet,
        deleteSnippet,
        toggleFavorite,
        searchSnippets,
        getFavoriteSnippets,
        getSnippetById,
      }}
    >
      {children}
    </SnippetContext.Provider>
  );
};

export const useSnippet = () => {
  const context = useContext(SnippetContext);

  if (!context) {
    throw new Error("useSnippet must be used inside SnippetProvider");
  }

  return context;
};