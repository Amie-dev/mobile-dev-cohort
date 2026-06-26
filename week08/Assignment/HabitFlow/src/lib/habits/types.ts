export type Frequency =
  | { kind: "daily"; hour: number; minute: number }
  | { kind: "weekly"; weekdays: number[]; hour: number; minute: number };

export type Habit = {
  id: string;
  name: string;
  emoji: string;

  frequency: Frequency;

  notificationIds: string[];

  streak: number;
  lastCompletedISO: string | null;

  createdAt: string;
};