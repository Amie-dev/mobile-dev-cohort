# 📱 Week 09 — Day 18

# Background Tasks in React Native (Expo)

> Background tasks allow your application to perform work **even when the user is not actively using the app**. They are essential for building real-world mobile applications such as fitness trackers, reminder apps, navigation apps, messaging apps, and weather applications.

---

# 📖 Table of Contents

1. What are Background Tasks?
2. Why Do We Need Background Tasks?
3. Workflow of Background Tasks
4. App States
5. Foreground vs Background vs Terminated
6. Background Fetch
7. Expo Task Manager
8. Background Location
9. Background Notifications
10. Scheduled Tasks
11. Headless Execution
12. Battery Optimization
13. Local Reminder Notifications
14. Permissions
15. Common Use Cases
16. Advantages
17. Limitations
18. Best Practices
19. Example Architecture
20. Summary

---

# 1. What are Background Tasks?

A **Background Task** is code that runs **without the user actively interacting with the application**.

Normally, when a user closes or minimizes an app, JavaScript stops running.

Background Tasks allow certain operations to continue depending on operating system permissions and restrictions.

Example:

```
User opens app
      │
      ▼
Registers Background Task
      │
      ▼
User minimizes app
      │
      ▼
OS wakes app periodically
      │
      ▼
Task Executes
      │
      ▼
App Sleeps Again
```

---

# Real World Examples

Google Maps

* Track live location
* Navigation continues

Uber

* Driver location updates

WhatsApp

* Receives push notifications

Habit Apps

* Daily reminders

Fitness Apps

* Count steps
* Track workout

Weather Apps

* Refresh weather every few hours

---

# 2. Why Do We Need Background Tasks?

Many important features must continue working even after the user leaves the app.

Without Background Tasks

```
Open App

↓

Close App

↓

Everything Stops
```

With Background Tasks

```
Open App

↓

Register Task

↓

Close App

↓

Background Task Continues
```

---

## Common Reasons

### Reminder Apps

Daily reminders

Example

```
Drink Water
Take Medicine
Exercise
Study
```

---

### GPS Tracking

Running apps

Cycling

Delivery apps

Navigation

---

### Fitness Apps

Step counting

Workout timer

Calories

---

### Messaging Apps

Receive new messages

Update unread count

Sync conversations

---

### News Apps

Fetch latest news

Refresh content

---

### Weather Apps

Update forecasts

Severe weather alerts

---

### File Sync

Upload files

Download updates

Cloud synchronization

---

# 3. Background Task Workflow

```
User Opens App
        │
        ▼
App Requests Permission
        │
        ▼
Permission Granted
        │
        ▼
Register Background Task
        │
        ▼
OS Stores Task
        │
        ▼
User Leaves App
        │
        ▼
Operating System Wakes App
        │
        ▼
Task Executes
        │
        ▼
Task Completes
        │
        ▼
OS Sleeps App Again
```

---

# Important

Your app **does NOT continuously run** in the background.

Instead,

The Operating System decides

* When
* How often
* Whether

your background task will execute.

---

# 4. App States

## Active

App is visible.

User is interacting.

```
You are using Instagram
```

---

## Background

App minimized.

```
Opened WhatsApp

↓

Pressed Home Button

↓

WhatsApp Background
```

---

## Inactive

Temporary transition.

Example

Incoming call

Notification shade

App switching

---

## Terminated

App removed from memory.

```
Swipe away app

↓

App terminated
```

---

# 5. Foreground vs Background vs Terminated

| Feature            | Foreground | Background | Terminated |
| ------------------ | ---------- | ---------- | ---------- |
| UI Visible         | ✅          | ❌          | ❌          |
| User Interaction   | ✅          | ❌          | ❌          |
| JavaScript Running | ✅          | Sometimes  | Usually No |
| Network Calls      | ✅          | Limited    | No         |
| Background Task    | No         | Yes        | Depends    |

---

# 6. Background Fetch

## What is Background Fetch?

Background Fetch allows the operating system to **wake your app periodically** so it can perform lightweight work.

Think of it as the OS asking:

> "Do you have any work to do?"

---

## Why Use It?

* Refresh data
* Sync server
* Download updates
* Update cache

---

## Example

Weather App

```
Every few hours

↓

Wake app

↓

Fetch Weather

↓

Save

↓

Sleep
```

---

## Expo Packages

```
expo-background-fetch
expo-task-manager
```

Install

```bash
npx expo install expo-background-fetch expo-task-manager
```

---

# Register Task

```tsx
import * as BackgroundFetch from "expo-background-fetch";
import * as TaskManager from "expo-task-manager";
```

Define task

```tsx
TaskManager.defineTask("background-fetch", async () => {
  console.log("Fetching data...");

  return BackgroundFetch.BackgroundFetchResult.NewData;
});
```

Register

```tsx
await BackgroundFetch.registerTaskAsync("background-fetch", {
  minimumInterval: 15 * 60,
});
```

---

# Workflow

```
OS

↓

Wake App

↓

Run Fetch

↓

Download Data

↓

Store Data

↓

Sleep
```

---

# 7. Expo Task Manager

## What is Task Manager?

Task Manager is the core system used by Expo to register background tasks.

Many Expo modules depend on it.

Examples

* Background Fetch
* Background Location
* Geofencing
* Background Notifications

---

## Why Use It?

Instead of each module implementing its own background logic, Expo centralizes task execution through Task Manager.

```
Background Fetch

↓

Task Manager

↓

Execute Task
```

---

## Basic Structure

```tsx
TaskManager.defineTask("task-name", async () => {
  console.log("Task executed");
});
```

---

# 8. Background Location

Allows location updates even while the app is minimized.

---

## Use Cases

* Google Maps
* Uber
* Delivery Tracking
* Fitness Apps
* Hiking Apps

---

## Packages

```bash
npx expo install expo-location
```

---

## Permissions

```tsx
await Location.requestForegroundPermissionsAsync();

await Location.requestBackgroundPermissionsAsync();
```

---

## Start Tracking

```tsx
await Location.startLocationUpdatesAsync("location-task", {
  accuracy: Location.Accuracy.High,
});
```

---

## Workflow

```
User Starts Tracking

↓

Permission Granted

↓

Register Task

↓

Background Updates

↓

Save Location
```

---

# 9. Background Notifications

Notifications can trigger work or inform users while the app isn't active.

## Types

Local Notifications

Generated by your app.

Remote Push Notifications

Sent by a server.

---

## Examples

Medicine reminder

Workout reminder

Meeting reminder

Order delivered

OTP

Chat message

---

# Expo Notifications

```bash
npx expo install expo-notifications
```

---

# Local Notification

```tsx
await Notifications.scheduleNotificationAsync({
  content: {
    title: "Study Time",
    body: "Practice React Native",
  },
  trigger: {
    seconds: 60,
  },
});
```

---

# Workflow

```
Schedule

↓

OS Stores Notification

↓

Time Arrives

↓

Notification Shown
```

---

# 10. Scheduled Tasks

Sometimes work must happen at a specific time.

Examples

```
8 AM

↓

Morning Reminder

------------------

9 PM

↓

Backup Notes

------------------

Every Sunday

↓

Generate Weekly Report
```

---

# Examples

Habit reminder

Expense reminder

Medication reminder

Daily quote

Weekly backup

---

# 11. Headless Execution

## What is Headless Execution?

Headless execution allows a task to run **without opening the app UI**.

No screen is displayed.

Only background logic runs.

```
OS

↓

Wake App

↓

Execute JS

↓

Exit
```

---

## Examples

Receive push notification

Sync files

Upload logs

Refresh cache

---

## Android Support

Android provides broader support for headless execution.

iOS imposes stricter limits and controls execution more tightly.

---

# 12. Battery Optimization

Background work consumes battery.

Mobile operating systems aggressively limit apps that consume excessive power.

---

## Why Important?

Bad background code

↓

CPU Always Active

↓

Battery Drain

↓

OS Restricts App

---

## Good Practices

Only perform essential work.

Avoid infinite loops.

Use appropriate intervals.

Complete tasks quickly.

Respect system scheduling.

---

## Bad Example

```tsx
while (true) {
   fetch();
}
```

Never do this.

---

## Good Example

```
OS wakes app

↓

Fetch data

↓

Finish

↓

Sleep
```

---

# 13. Local Notification Reminder with Background Tasks

Suppose we're building a Habit Tracker.

Workflow

```
User Creates Habit

↓

Store Reminder

↓

Register Background Task

↓

OS Wakes App

↓

Check Today's Habits

↓

If Not Completed

↓

Show Notification
```

---

## Example

```tsx
await Notifications.scheduleNotificationAsync({
  content: {
    title: "Drink Water 💧",
    body: "Stay hydrated!",
  },
  trigger: {
    hour: 9,
    minute: 0,
    repeats: true,
  },
});
```

---

# Another Example

Medicine Reminder

```
8 AM

↓

Take Medicine

↓

Notification Appears
```

---

# Reminder Flow

```
Create Reminder

↓

Save Database

↓

Background Scheduler

↓

Time Reached

↓

Local Notification

↓

User Opens App
```

---

# 14. Permissions

Different background features require different permissions.

| Feature             | Permission Required                            |
| ------------------- | ---------------------------------------------- |
| Background Location | Foreground + Background Location               |
| Notifications       | Notification Permission                        |
| Camera Upload       | Camera + Storage                               |
| File Sync           | Storage                                        |
| Background Fetch    | No user permission, but OS controls scheduling |

---

# 15. Common Use Cases

### Health App

* Step tracking
* Heart rate
* Workout timer

---

### Delivery App

* Driver location
* Order updates

---

### Finance App

* Payment reminders
* Bill due alerts

---

### Habit App

* Daily reminders
* Weekly reports

---

### Weather App

* Forecast updates
* Severe weather alerts

---

### Social Media

* Push notifications
* Background sync

---

# 16. Advantages

* Better user experience
* Automatic synchronization
* Real-time updates
* Improved engagement
* Timely reminders
* Reduced manual work
* Offline-friendly behavior
* More reliable data

---

# 17. Limitations

* Battery restrictions
* OS-controlled scheduling
* Different Android and iOS behaviors
* Limited execution time
* Permission requirements
* Network availability may vary
* Some tasks may be delayed or skipped by the OS

---

# 18. Best Practices

✅ Request only the permissions you need.

✅ Register tasks once during app initialization.

✅ Keep background tasks short and efficient.

✅ Avoid frequent polling; prefer event-driven updates.

✅ Handle errors gracefully and retry intelligently.

✅ Test on both Android and iOS, as behavior differs.

✅ Inform users why background permissions are needed.

---

# 19. Example Architecture

```
                 User Opens App
                        │
                        ▼
              Request Permissions
                        │
                        ▼
            Register Background Tasks
                        │
        ┌───────────────┼────────────────┐
        ▼               ▼                ▼
 Background Fetch   Background Location  Notifications
        │               │                │
        └───────────────┼────────────────┘
                        ▼
                 Expo Task Manager
                        │
                        ▼
                 Operating System
                        │
                        ▼
               Executes Tasks When Allowed
                        │
                        ▼
               Save Data / Notify User
```

---

# 20. Summary

Background tasks enable apps to continue performing important work even when users are not actively using them. In the Expo ecosystem, **`expo-task-manager`** acts as the foundation for modules such as **Background Fetch**, **Background Location**, and other background-enabled features. Combined with **`expo-notifications`**, they allow developers to build experiences like daily reminders, location tracking, periodic data synchronization, and scheduled alerts.

However, background execution is always controlled by the operating system. Android and iOS impose strict limits to preserve battery life and device performance, so tasks should be lightweight, permission-aware, and designed to complete quickly. Following these best practices helps create reliable, production-ready mobile applications that feel responsive without unnecessarily consuming system resources.
