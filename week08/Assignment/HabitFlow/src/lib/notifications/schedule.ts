import * as Notifications from "expo-notifications";
import { Habit, Frequency } from "../habits/types";

/* ---------------- SCHEDULE ENTRY ---------------- */

export async function scheduleHabitNotifications(habit: Habit) {
  const freq = habit.frequency;

  if (freq.kind === "daily") {
    return [await scheduleDaily(habit)];
  }

  if (freq.kind === "weekly") {
    return await scheduleWeekly(habit);
  }

  return [];
}

/* ---------------- DAILY ---------------- */

async function scheduleDaily(habit: Habit) {
  const id = await Notifications.scheduleNotificationAsync({
    content: {
      title: `${habit.emoji} ${habit.name}`,
      body: "Tap to log your habit",
      data: {
        screen: "/habit",
        habitId: habit.id,
      },
    },
    trigger: {
      hour: habit.frequency.hour,
      minute: habit.frequency.minute,
      repeats: true,
    } as any,
  });

  return id;
}

/* ---------------- WEEKLY ---------------- */

async function scheduleWeekly(habit: Habit) {
  const ids: string[] = [];

  const freq = habit.frequency as Extract<Frequency, { kind: "weekly" }>;

  for (const weekday of freq.weekdays) {
    const id = await Notifications.scheduleNotificationAsync({
      content: {
        title: `${habit.emoji} ${habit.name}`,
        body: "Weekly habit reminder",
        data: {
          screen: "/habit",
          habitId: habit.id,
        },
      },
      trigger: {
        weekday,
        hour: freq.hour,
        minute: freq.minute,
        repeats: true,
      } as any,
    });

    ids.push(id);
  }

  return ids;
}

/* ---------------- CANCEL ---------------- */

export async function cancelHabitNotifications(ids: string[]) {
  await Promise.all(
    ids.map((id) => Notifications.cancelScheduledNotificationAsync(id))
  );
}

/* ---------------- RESCHEDULE ---------------- */

export async function rescheduleHabitNotifications(habit: Habit) {
  await cancelHabitNotifications(habit.notificationIds);
  return await scheduleHabitNotifications(habit);
}