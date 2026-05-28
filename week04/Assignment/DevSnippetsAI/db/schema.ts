import {
  integer,
  sqliteTable,
  text,
} from "drizzle-orm/sqlite-core";

// ===============================
// SNIPPETS TABLE
// ===============================

export const snippetsTable = sqliteTable("snippets_table", {
  // primary id
  id: integer("id").primaryKey({ autoIncrement: true }),

  // snippet title
  title: text("title").notNull(),

  // actual code
  code: text("code").notNull(),

  // js / ts / tsx / py etc
  language: text("language").notNull(),

  // store tags as JSON string
  tags: text("tags").default("[]"),

  // favorite toggle
  isFavorite: integer("is_favorite", {
    mode: "boolean",
  }).default(false),

  // timestamps
  createdAt: text("created_at").notNull(),

  updatedAt: text("updated_at").notNull(),
});

// ===============================
// FILES TABLE
// ===============================

export const filesTable = sqliteTable("files_table", {
  id: integer("id").primaryKey({ autoIncrement: true }),

  // relation with snippet
  snippetId: integer("snippet_id").references(
    () => snippetsTable.id,
    {
      onDelete: "cascade",
    }
  ),

  // file name
  name: text("name").notNull(),

  // local file uri
  uri: text("uri").notNull(),

  // image / js / txt / json etc
  type: text("type").notNull(),

  // local folder
  folder: text("folder").default("root"),

  createdAt: text("created_at").notNull(),
});

// ===============================
// SETTINGS TABLE
// ===============================

export const settingsTable = sqliteTable("settings_table", {
  id: integer("id").primaryKey({ autoIncrement: true }),

  // light / dark / system
  theme: text("theme").default("system"),

  // optional settings
  fontSize: integer("font_size").default(14),

  updatedAt: text("updated_at").notNull(),
});