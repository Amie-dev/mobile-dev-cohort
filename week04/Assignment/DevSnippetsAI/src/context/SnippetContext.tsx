import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

import { eq, like, desc } from "drizzle-orm";
import { useMigrations } from "drizzle-orm/expo-sqlite/migrator";

import { db } from "../../db/database";
import { snippetsTable } from "../../db/schema";
import migrations from "../../drizzle/migrations";

type Snippet = typeof snippetsTable.$inferSelect;
type NewSnippet = typeof snippetsTable.$inferInsert;

type SnippetContextType = {
  snippets: Snippet[];
  loading: boolean;
  error: unknown;

  loadSnippets: () => Promise<void>;
  createSnippet: (snippet: Omit<NewSnippet, "id">) => Promise<void>;
  updateSnippet: (id: number, snippet: Partial<NewSnippet>) => Promise<void>;
  deleteSnippet: (id: number) => Promise<void>;
  toggleFavorite: (id: number, value: boolean) => Promise<void>;
  searchSnippets: (query: string) => Promise<void>;
  getFavoriteSnippets: () => Promise<void>;
};

export const SnippetContext = createContext<SnippetContextType | null>(null);

type Props = {
  children: ReactNode;
};

export const SnippetProvider = ({ children }: Props) => {
  const [snippets, setSnippets] = useState<Snippet[]>([]);
  const [loading, setLoading] = useState(false);

  const { success, error } = useMigrations(db, migrations);

  // load snippets after migration success
  useEffect(() => {
    if (success) {
      loadSnippets();
    }
  }, [success]);

  // load all snippets
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
    } finally {
      setLoading(false);
    }
  };

  // create new snippet
  const createSnippet = async (snippet: Omit<NewSnippet, "id">) => {
    try {
      await db.insert(snippetsTable).values(snippet);
      await loadSnippets();
    } catch (err) {
      console.log("Create snippet error:", err);
    }
  };

  // update snippet
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
    }
  };

  // delete snippet
  const deleteSnippet = async (id: number) => {
    try {
      await db.delete(snippetsTable).where(eq(snippetsTable.id, id));
      await loadSnippets();
    } catch (err) {
      console.log("Delete snippet error:", err);
    }
  };

  // favorite / unfavorite
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
    }
  };

  // search snippets by title/code/language
  const searchSnippets = async (query: string) => {
    try {
      setLoading(true);

      if (!query.trim()) {
        await loadSnippets();
        return;
      }

      const result = await db
        .select()
        .from(snippetsTable)
        .where(like(snippetsTable.title, `%${query}%`));

      setSnippets(result);
    } catch (err) {
      console.log("Search snippet error:", err);
    } finally {
      setLoading(false);
    }
  };

  // only favorite snippets
  const getFavoriteSnippets = async () => {
    try {
      setLoading(true);

      const result = await db
        .select()
        .from(snippetsTable)
        .where(eq(snippetsTable.isFavorite, true));

      setSnippets(result);
    } catch (err) {
      console.log("Favorite snippets error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SnippetContext.Provider
      value={{
        snippets,
        loading,
        error,
        loadSnippets,
        createSnippet,
        updateSnippet,
        deleteSnippet,
        toggleFavorite,
        searchSnippets,
        getFavoriteSnippets,
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
