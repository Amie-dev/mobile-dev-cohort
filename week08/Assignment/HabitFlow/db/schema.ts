import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";

export const habits = sqliteTable("habits", {
  id: text("id").primaryKey(),

  name: text("name").notNull(),
  emoji: text("emoji").notNull(),

  // store JSON string for flexibility
  frequency: text("frequency").notNull(),

  notificationIds: text("notificationIds").notNull(), // JSON string array

  streak: integer("streak").notNull().default(0),

  lastCompletedISO: text("lastCompletedISO"),

  createdAt: text("createdAt").notNull(),
});