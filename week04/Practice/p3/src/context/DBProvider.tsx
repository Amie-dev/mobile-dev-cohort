// src/context/DBProvider.tsx

import { eq } from "drizzle-orm";
import { useMigrations } from "drizzle-orm/expo-sqlite/migrator";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { Text, View } from "react-native";

import { db } from "../../db/database";
import migrations from "../../drizzle/migrations";
import { Item, itemsTable } from "../../db/schema";

type NewItem = typeof itemsTable.$inferInsert;

type DBContextType = {
  data: Item[];
  loading: boolean;

  refresh: () => Promise<void>;

  createFolder: (
    name: string,
    parentId?: number | null
  ) => Promise<void>;

  createFileRecord: (
    file: NewItem
  ) => Promise<void>;

  getItemById: (
    id: number
  ) => Promise<Item | undefined>;

  updateItem: (
    id: number,
    values: Partial<NewItem>
  ) => Promise<void>;

  moveItem: (
    id: number,
    parentId: number | null
  ) => Promise<void>;

  deleteItem: (
    id: number
  ) => Promise<void>;
};

const DBContext = createContext<DBContextType | null>(null);

type Props = {
  children: ReactNode;
};

export const DBProvider = ({ children }: Props) => {
  // Run migrations
  const { success, error } = useMigrations(
    db,
    migrations
  );

  // Local state
  const [data, setData] = useState<Item[]>([]);
  const [loading, setLoading] =
    useState(false);

  // Load all items
  const refresh = async () => {
    try {
      setLoading(true);

      const result = await db
        .select()
        .from(itemsTable);

      setData(result);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  // Create folder
  const createFolder = async (
    name: string,
    parentId: number | null = null
  ) => {
    await db.insert(itemsTable).values({
      name,
      parentId,
      isFolder: true,
    });

    await refresh();
  };

  // Create file record
  const createFileRecord = async (
    file: NewItem
  ) => {
    await db.insert(itemsTable).values(file);

    await refresh();
  };

  // Get one item
  const getItemById = async (
    id: number
  ) => {
    const [item] = await db
      .select()
      .from(itemsTable)
      .where(eq(itemsTable.id, id));

    return item;
  };

  // Update item
  const updateItem = async (
    id: number,
    values: Partial<NewItem>
  ) => {
    await db
      .update(itemsTable)
      .set(values)
      .where(eq(itemsTable.id, id));

    await refresh();
  };

  // Move item
  const moveItem = async (
    id: number,
    parentId: number | null
  ) => {
    await db
      .update(itemsTable)
      .set({ parentId })
      .where(eq(itemsTable.id, id));

    await refresh();
  };

  // Delete item
  const deleteItem = async (
    id: number
  ) => {
    await db
      .delete(itemsTable)
      .where(eq(itemsTable.id, id));

    await refresh();
  };

  // Initial load
  useEffect(() => {
    if (success) {
      refresh();
    }
  }, [success]);

  // Migration error
  if (error) {
    return (
      <View>
        <Text>
          Migration Error:
          {error.message}
        </Text>
      </View>
    );
  }

  // Migration loading
  if (!success) {
    return (
      <View>
        <Text>
          Preparing database...
        </Text>
      </View>
    );
  }

  return (
    <DBContext.Provider
      value={{
        data,
        loading,

        refresh,

        createFolder,
        createFileRecord,

        getItemById,

        updateItem,
        moveItem,
        deleteItem,
      }}
    >
      {children}
    </DBContext.Provider>
  );
};

// Custom hook
export const useDB = () => {
  const context = useContext(DBContext);

  if (!context) {
    throw new Error(
      "useDB must be used inside DBProvider"
    );
  }

  return context;
};