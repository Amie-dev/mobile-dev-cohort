import React, { createContext, useContext, useEffect, useState } from "react";
import { Habit } from "../lib/habits/types";
import * as repo from "../lib/habits/repository";
import { updateStreak } from "../lib/habits/streak";

type HabitsContextType = {
  habits: Habit[];
  refresh: () => Promise<void>;

  addHabit: (habit: Habit) => Promise<void>;
  editHabit: (habit: Habit) => Promise<void>;
  removeHabit: (id: string) => Promise<void>;

  markDone: (id: string) => Promise<void>;
};

const HabitsContext = createContext<HabitsContextType | null>(null);

export function HabitsProvider({ children }: { children: React.ReactNode }) {
  const [habits, setHabits] = useState<Habit[]>([]);

  const refresh = async () => {
    const data = await repo.getAllHabits();
    setHabits(data);
  };

  useEffect(() => {
    refresh();
  }, []);

  /* ---------------- CRUD ---------------- */

  const addHabit = async (habit: Habit) => {
    await repo.insertHabit(habit);
    await refresh();
  };

  const editHabit = async (habit: Habit) => {
    await repo.updateHabit(habit);
    await refresh();
  };

  const removeHabit = async (id: string) => {
    await repo.deleteHabit(id);
    await refresh();
  };

  /* ---------------- streak logic ---------------- */

  const markDone = async (id: string) => {
    const habit = habits.find((h) => h.id === id);
    if (!habit) return;

    const updated = updateStreak(
      habit.lastCompletedISO,
      habit.streak
    );

    await repo.updateHabit({
      ...habit,
      streak: updated.streak,
      lastCompletedISO: updated.lastCompletedISO,
    });

    await refresh();
  };

  return (
    <HabitsContext.Provider
      value={{
        habits,
        refresh,
        addHabit,
        editHabit,
        removeHabit,
        markDone,
      }}
    >
      {children}
    </HabitsContext.Provider>
  );
}

export function useHabits() {
  const ctx = useContext(HabitsContext);
  if (!ctx) throw new Error("useHabits must be used inside HabitsProvider");
  return ctx;
}