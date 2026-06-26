import { db } from "../../../db"; 
import { habits } from "../../../db/schema";
import { eq } from "drizzle-orm";
import { Habit } from "./types";

export async function getAllHabits() {
  const rows = await db.select().from(habits);
  return rows.map(parseHabit);
}

export async function getHabitById(id: string) {
  const rows = await db.select().from(habits).where(eq(habits.id, id));
  return rows[0] ? parseHabit(rows[0]) : null;
}

export async function insertHabit(habit: Habit) {
  await db.insert(habits).values(serializeHabit(habit));
}

export async function updateHabit(habit: Habit) {
  await db
    .update(habits)
    .set(serializeHabit(habit))
    .where(eq(habits.id, habit.id));
}

export async function deleteHabit(id: string) {
  await db.delete(habits).where(eq(habits.id, id));
}

/* ---------------- helpers ---------------- */

function serializeHabit(habit: Habit) {
  return {
    ...habit,
    frequency: JSON.stringify(habit.frequency),
    notificationIds: JSON.stringify(habit.notificationIds),
  };
}

function parseHabit(row: any): Habit {
  return {
    ...row,
    frequency: JSON.parse(row.frequency),
    notificationIds: JSON.parse(row.notificationIds),
  };
}