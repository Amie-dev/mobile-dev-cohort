export function updateStreak(
  lastCompletedISO: string | null,
  currentStreak: number,
  now = new Date()
) {
  const today = now.toDateString();

  if (!lastCompletedISO) {
    return { streak: 1, lastCompletedISO: now.toISOString() };
  }

  const last = new Date(lastCompletedISO);
  const diffDays =
    (new Date(today).getTime() - new Date(last.toDateString()).getTime()) /
    (1000 * 60 * 60 * 24);

  if (diffDays === 1) {
    return {
      streak: currentStreak + 1,
      lastCompletedISO: now.toISOString(),
    };
  }

  if (diffDays === 0) {
    return {
      streak: currentStreak,
      lastCompletedISO,
    };
  }

  return {
    streak: 1,
    lastCompletedISO: now.toISOString(),
  };
}