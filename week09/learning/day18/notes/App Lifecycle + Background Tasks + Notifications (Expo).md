# 📱 Building a Reminder App with App Lifecycle + Background Tasks + Notifications (Expo)

> A reminder application is one of the best examples to understand how **App Lifecycle**, **Background Tasks**, and **Notifications** work together. In a production app, these three concepts complement each other to provide a reliable user experience.

---

# 📖 What You'll Learn

* How a Reminder App Works
* Overall Architecture
* App Lifecycle in Reminder Apps
* Background Tasks
* Local Notifications
* Complete Workflow
* Project Structure
* Example Code
* Best Practices
* Common Mistakes

---

# What is a Reminder App?

A Reminder App helps users remember tasks at a specific time.

Examples:

* 💊 Take medicine
* 💧 Drink water
* 📚 Study React Native
* 🏃 Go for a walk
* 📞 Call Mom
* 💰 Pay electricity bill

Example:

```text
Reminder

Title:
Drink Water

Time:
09:00 AM

Repeat:
Every Day
```

At **9:00 AM**, the phone should display a notification even if the app is closed.

---

# Technologies Used

```
React Native

↓

Expo

↓

expo-notifications

↓

expo-task-manager

↓

AppState API

↓

AsyncStorage / SQLite
```

---

# Overall Workflow

```text
        User Opens App
              │
              ▼
     Create Reminder
              │
              ▼
 Save Reminder to Database
              │
              ▼
 Schedule Notification
              │
              ▼
 User Minimizes App
              │
              ▼
 Operating System Stores Schedule
              │
              ▼
 Time Reaches
              │
              ▼
 Notification Appears
              │
              ▼
 User Taps Notification
              │
              ▼
 App Opens Reminder Screen
```

---

# Project Structure

```
src
│
├── components
│      ReminderCard.tsx
│
├── screens
│      HomeScreen.tsx
│      AddReminderScreen.tsx
│
├── services
│      notification.ts
│      lifecycle.ts
│
├── storage
│      reminderStorage.ts
│
├── hooks
│      useReminder.ts
│
└── App.tsx
```

---

# Step 1 — Install Packages

```bash
npx expo install expo-notifications
```

For background tasks:

```bash
npx expo install expo-task-manager
expo-background-task
```

If using location or background fetch:

```bash
npx expo install expo-location
npx expo install expo-background-fetch
```

---

# Step 2 — Configure Notifications

```tsx
import * as Notifications from "expo-notifications";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowBanner: true,
    shouldShowList: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});
```

This tells the operating system how notifications should appear while the app is in the foreground.

---

# Step 3 — Ask Notification Permission

```tsx
import * as Notifications from "expo-notifications";

export async function requestPermission() {
  const { status } =
    await Notifications.requestPermissionsAsync();

  return status === "granted";
}
```

---

# Step 4 — Create Reminder

Suppose the user enters:

```
Title

Drink Water

Time

9:00 AM

Repeat

Daily
```

Store it:

```tsx
const reminder = {
  id: Date.now(),
  title: "Drink Water",
  hour: 9,
  minute: 0,
};
```

Save to AsyncStorage or SQLite.

---

# Step 5 — Schedule Notification

```tsx
await Notifications.scheduleNotificationAsync({
  content: {
    title: "Drink Water 💧",
    body: "Stay hydrated!",
  },

  trigger: {
    type: Notifications.SchedulableTriggerInputTypes.DAILY,
    hour: 9,
    minute: 0,
  },
});
```

Now the operating system owns the schedule.

Even if your app is not open, the notification can still fire at the scheduled time (subject to platform behavior and permissions).

---

# App Lifecycle

Now imagine this scenario.

```text
User Opens App

↓

Creates Reminder

↓

Notification Scheduled

↓

Presses Home Button

↓

App Background

↓

Phone Locked

↓

Still Waiting

↓

9:00 AM

↓

Notification Appears
```

Notice:

The JavaScript application is **not continuously running**.

The operating system stores the notification schedule.

---

# Detect App Lifecycle

```tsx
import { AppState } from "react-native";
import { useEffect } from "react";

useEffect(() => {
  const subscription = AppState.addEventListener(
    "change",
    (state) => {
      console.log(state);
    }
  );

  return () => subscription.remove();
}, []);
```

Possible output:

```
active

background

active
```

---

# Why Use App Lifecycle?

Suppose user edits reminder.

```
Drink Water

↓

User hasn't pressed Save

↓

Home Button

↓

Background
```

Save automatically.

```tsx
if (state === "background") {
   saveReminder();
}
```

---

# Another Example

User is viewing today's reminders.

```
App Active

↓

Data Loaded

↓

User Leaves

↓

30 Minutes Pass

↓

Returns

↓

Reload Today's Reminders
```

Example:

```tsx
if (state === "active") {
   loadReminders();
}
```

---

# Background Tasks

Sometimes reminders depend on app data instead of fixed schedules.

Example:

```
Every Morning

↓

Check Today's Tasks

↓

If Pending

↓

Send Reminder
```

Workflow

```text
OS

↓

Wake App

↓

Background Task

↓

Read Database

↓

Check Pending Tasks

↓

Schedule Notification

↓

Sleep Again
```

---

# Task Manager Example

```tsx
import * as TaskManager from "expo-task-manager";

TaskManager.defineTask(
  "daily-reminder",
  async () => {

    console.log("Checking reminders...");

    // Read database

    // Find pending reminders

    // Schedule notification

  }
);
```

---

# Register Background Task

```tsx
import * as BackgroundFetch from "expo-background-fetch";

await BackgroundFetch.registerTaskAsync(
  "daily-reminder",
  {
    minimumInterval: 15 * 60,
  }
);
```

Important:

This **does not guarantee** execution exactly every 15 minutes. The operating system decides when to run the task based on battery, usage patterns, and system policies.

---

# Background Reminder Logic

Imagine the database contains:

```
Drink Water

9:00

Pending

------------

Medicine

8:00

Completed
```

Background task:

```text
Load Database

↓

Check Pending

↓

Drink Water

↓

Show Notification

↓

Medicine

↓

Ignore
```

Pseudo code:

```tsx
const reminders = await loadReminders();

for (const reminder of reminders) {

   if (reminder.completed)
      continue;

   await Notifications.scheduleNotificationAsync({
      content:{
         title: reminder.title
      },
      trigger:null
   });

}
```

---

# Complete Flow

```text
Create Reminder

↓

Save Database

↓

Register Notification

↓

App Background

↓

Background Task

↓

Check Pending

↓

Notification

↓

User Taps Notification

↓

Open Reminder Screen

↓

Mark Completed
```

---

# User Taps Notification

Listen for notification responses:

```tsx
import * as Notifications from "expo-notifications";
import { useEffect } from "react";

useEffect(() => {
  const subscription =
    Notifications.addNotificationResponseReceivedListener(
      (response) => {
        console.log("Notification tapped");
        console.log(response.notification.request.content);
      }
    );

  return () => subscription.remove();
}, []);
```

In a real app, you could navigate to the reminder details screen when the notification is tapped.

---

# Daily Reminder Example

```
8 AM

↓

Background Task

↓

Check Tasks

↓

3 Pending

↓

Show Notification

↓

Today's Tasks Waiting
```

---

# Reminder Completed

User opens app.

```
Notification

↓

Open Reminder

↓

Completed

↓

Database Updated

↓

Tomorrow Skip Notification
```

---

# App Lifecycle + Background + Notification Together

```text
                User Opens App
                       │
                       ▼
             Create Reminder
                       │
                       ▼
              Save to Database
                       │
                       ▼
          Schedule Notification
                       │
          ┌────────────┴────────────┐
          ▼                         ▼
     App Active               App Background
          │                         │
          ▼                         ▼
   User Edits Data         Background Task Runs
          │                         │
          ▼                         ▼
 Auto Save on Background   Check Pending Reminders
          │                         │
          └────────────┬────────────┘
                       ▼
             Local Notification
                       │
                       ▼
          User Taps Notification
                       │
                       ▼
          Open Reminder Screen
                       │
                       ▼
          Mark Reminder Complete
```

---

# Best Practices

✅ Request notification permission on first use, explaining why it's needed.

✅ Save reminders in persistent storage (SQLite or AsyncStorage).

✅ Use `AppState` to auto-save drafts and refresh data when returning to the app.

✅ Use local scheduled notifications for fixed-time reminders whenever possible—they are more reliable than periodic background tasks.

✅ Use background tasks only for logic that truly needs periodic processing, such as checking dynamic conditions.

✅ Always cancel or update scheduled notifications when a reminder is edited or deleted.

---

# Common Mistakes

❌ Assuming background tasks run continuously—they don't.

❌ Expecting background fetch to execute at an exact interval.

❌ Not requesting notification permissions before scheduling notifications.

❌ Forgetting to remove notification listeners when components unmount.

❌ Creating duplicate notifications every time the app starts instead of updating existing schedules.

❌ Relying solely on background tasks for time-based reminders when local notification scheduling is sufficient.

---

# Key Takeaways

A reminder app combines three important mobile concepts:

* **App Lifecycle (`AppState`)** manages what happens when the app moves between **active**, **inactive**, and **background** states, allowing you to save data, pause work, and refresh content.
* **Background Tasks** allow the operating system to periodically wake your app to perform lightweight work, such as checking for pending reminders or syncing data. The OS controls when these tasks run.
* **Local Notifications** are the most reliable way to alert users at a specific time. Once scheduled, the operating system is responsible for delivering them, even if the app is not open.

Together, these features enable production-quality reminder applications that are efficient, battery-friendly, and dependable across both Android and iOS.
