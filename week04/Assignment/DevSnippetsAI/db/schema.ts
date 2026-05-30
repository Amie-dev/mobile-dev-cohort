import {
  integer,
  sqliteTable,
  text,
} from "drizzle-orm/sqlite-core";

// =====================================
// SNIPPETS
// =====================================

export const snippetsTable = sqliteTable("snippets_table", {
  id: integer("id").primaryKey({ autoIncrement: true }),

  title: text("title").notNull(),

  code: text("code").notNull(),

  // js, tsx, py, json...
  language: text("language").notNull(),

  // JSON string
  tags: text("tags").default("[]"),

  isFavorite: integer("is_favorite", {
    mode: "boolean",
  }).default(false),

  createdAt: text("created_at").notNull(),

  updatedAt: text("updated_at").notNull(),
});

// =====================================
// FILES
// =====================================

export const filesTable = sqliteTable("files_table", {
  id: integer("id").primaryKey({ autoIncrement: true }),

  snippetId: integer("snippet_id").references(
    () => snippetsTable.id,
    {
      onDelete: "cascade",
    }
  ),

  name: text("name").notNull(),

  uri: text("uri").notNull(),

  // image | txt | js | json
  type: text("type").notNull(),

  // attachments | exports | templates
  folder: text("folder").default("attachments"),

  size: integer("size"),

  createdAt: text("created_at").notNull(),
});

// =====================================
// AI RESPONSES
// =====================================

export const aiResponsesTable = sqliteTable("ai_responses_table", {
  id: integer("id").primaryKey({ autoIncrement: true }),

  snippetId: integer("snippet_id")
    .notNull()
    .references(() => snippetsTable.id, {
      onDelete: "cascade",
    }),

  explanation: text("explanation"),

  summary: text("summary"),

  suggestions: text("suggestions"),

  createdAt: text("created_at").notNull(),
});

// =====================================
// SETTINGS
// =====================================

export const settingsTable = sqliteTable("settings_table", {
  id: integer("id").primaryKey({ autoIncrement: true }),

  theme: text("theme").default("system"),

  fontSize: integer("font_size").default(14),

  updatedAt: text("updated_at").notNull(),
});