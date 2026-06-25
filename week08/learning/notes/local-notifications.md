# Local Notifications in Expo (React Native) – Complete Production Guide

📅 Week 08 – Deep Dive Notes

---

# 1. What is a Local Notification?

A **Local Notification** is a notification that is scheduled and generated directly by the user's device without requiring a server or internet connection.

The app tells the operating system:

> "Show this notification at a specific time or event."

Then the operating system handles everything.

---

## Real Examples

### Alarm App

```text
Wake Up!
Good Morning
```

---

### Habit Tracker

```text
Drink Water
Stay hydrated
```

---

### Medicine Reminder

```text
Medicine Time
Take your Vitamin D tablet
```

---

### Study Reminder

```text
Time to Study
Complete your React Native lesson
```

---

# 2. Local Notification Architecture

```text
App
 ↓
Schedules Notification
 ↓
Operating System
(Android/iOS)
 ↓
Stored By Device
 ↓
Trigger Time Reached
 ↓
Notification Appears
```

Notice:

```text
No Server
No Firebase
No Internet
```

Required.

---

# 3. When Should We Use Local Notifications?

Use Local Notifications when:

✅ Reminder exists on user's device

✅ Internet is not required

✅ Time-based reminder

✅ Calendar reminder

✅ Habit reminder

✅ Alarm

✅ Workout reminder

✅ Medicine reminder

---

# When NOT To Use Local Notifications

❌ New Chat Message

❌ Instagram Like

❌ New Order Update

❌ Bank Transaction

❌ Marketing Campaign

These require Push Notifications.

---

# 4. Installing Expo Notifications

Install package:

```bash
npx expo install expo-notifications
```

---

# 5. Configure App (Production Setup)

## app.json

```json
{
  "expo": {
    "plugins": [
      "expo-notifications"
    ]
  }
}
```

---

# Android Notification Icon

Production apps should define a notification icon.

```json
{
  "expo": {
    "notification": {
      "icon": "./assets/notification-icon.png",
      "color": "#2196F3"
    }
  }
}
```

---

# Rebuild Native App

Whenever notification configuration changes:

```bash
eas build
```

or

```bash
npx expo run:android
```

---

# 6. Notification Permission

---

## Why Permission Required?

Notifications interrupt users.

Therefore Android and iOS require permission.

---

## Check Existing Permission

```javascript
import * as Notifications from "expo-notifications";

const permission =
  await Notifications.getPermissionsAsync();

console.log(permission.status);
```

Output:

```text
granted
```

or

```text
denied
```

or

```text
undetermined
```

---

# Request Permission

Production approach:

```javascript
const { status } =
  await Notifications.requestPermissionsAsync();

if (status !== "granted") {
  alert("Permission required");
}
```

---

# Production Helper Function

```javascript
import * as Notifications from "expo-notifications";

export async function registerNotifications() {
  const permission =
    await Notifications.getPermissionsAsync();

  if (permission.status !== "granted") {
    const request =
      await Notifications.requestPermissionsAsync();

    if (request.status !== "granted") {
      return false;
    }
  }

  return true;
}
```

---

# 7. Notification Handler

Without handler some notifications may not display properly.

Always configure once.

```javascript
import * as Notifications from "expo-notifications";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowBanner: true,
    shouldShowList: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});
```

---

# What Each Property Means

## shouldShowBanner

```javascript
true
```

Shows popup banner.

---

## shouldPlaySound

```javascript
true
```

Plays sound.

---

## shouldSetBadge

```javascript
true
```

Updates app icon count.

---

## shouldShowList

```javascript
true
```

Adds notification to notification center.

---

# 8. Android Notification Channels

Android requires channels.

Create during app startup.

```javascript
if (Platform.OS === "android") {
  await Notifications.setNotificationChannelAsync(
    "reminders",
    {
      name: "Reminders",
      importance:
        Notifications.AndroidImportance.HIGH,
    }
  );
}
```

---

# Channel Types Example

```text
messages
reminders
marketing
workout
medicine
```

---

# 9. Types of Local Notifications

There are multiple types.

---

# Type 1: Immediate Notification

Appears instantly.

```javascript
await Notifications.scheduleNotificationAsync({
  content: {
    title: "Welcome",
    body: "Thanks for joining",
  },
  trigger: null,
});
```

---

## Use Cases

* Welcome message
* Form submitted
* Task completed

---

# Example

```javascript
await Notifications.scheduleNotificationAsync({
  content: {
    title: "Success",
    body: "Habit Created Successfully",
  },
  trigger: null,
});
```

---

# Type 2: Time-Based Notification

Notification after specific seconds.

```javascript
await Notifications.scheduleNotificationAsync({
  content: {
    title: "Reminder",
    body: "Drink Water",
  },
  trigger: {
    seconds: 30,
  },
});
```

---

# Examples

After 5 seconds

```javascript
trigger: {
  seconds: 5
}
```

---

After 1 minute

```javascript
trigger: {
  seconds: 60
}
```

---

After 1 hour

```javascript
trigger: {
  seconds: 3600
}
```

---

# Type 3: Date-Based Notification

Specific date and time.

```javascript
await Notifications.scheduleNotificationAsync({
  content: {
    title: "Meeting",
    body: "Meeting starts now",
  },
  trigger: new Date(
    Date.now() + 60000
  ),
});
```

---

# Example

Tomorrow 9 AM

```javascript
const tomorrow = new Date();

tomorrow.setDate(
  tomorrow.getDate() + 1
);

tomorrow.setHours(9);
tomorrow.setMinutes(0);

await Notifications.scheduleNotificationAsync({
  content: {
    title: "Study Time",
    body: "Start learning React Native",
  },
  trigger: tomorrow,
});
```

---

# Type 4: Daily Repeating Notification

Most common.

```javascript
await Notifications.scheduleNotificationAsync({
  content: {
    title: "Workout",
    body: "Time to exercise",
  },
  trigger: {
    hour: 18,
    minute: 0,
    repeats: true,
  },
});
```

---

# Examples

### Water Reminder

```javascript
hour: 9
minute: 0
```

---

### Study Reminder

```javascript
hour: 20
minute: 0
```

---

### Sleep Reminder

```javascript
hour: 22
minute: 30
```

---

# Type 5: Weekly Notification

```javascript
await Notifications.scheduleNotificationAsync({
  content: {
    title: "Weekly Review",
    body: "Review your goals",
  },
  trigger: {
    weekday: 1,
    hour: 10,
    minute: 0,
    repeats: true,
  },
});
```

---

# Weekday Values

```text
1 = Sunday
2 = Monday
3 = Tuesday
4 = Wednesday
5 = Thursday
6 = Friday
7 = Saturday
```

---

# Examples

### Sunday Report

```javascript
weekday: 1
```

---

### Monday Meeting Reminder

```javascript
weekday: 2
```

---

# Type 6: Monthly Notification

Example:

```javascript
await Notifications.scheduleNotificationAsync({
  content: {
    title: "Pay Rent",
    body: "Monthly rent due",
  },
  trigger: {
    day: 1,
    hour: 9,
    minute: 0,
    repeats: true,
  },
});
```

---

# Use Cases

* Salary reminder
* Rent payment
* EMI payment
* Subscription renewal

---

# Type 7: Yearly Notification

```javascript
await Notifications.scheduleNotificationAsync({
  content: {
    title: "Happy Birthday",
    body: "Today is your birthday",
  },
  trigger: {
    month: 7,
    day: 15,
    hour: 9,
    minute: 0,
    repeats: true,
  },
});
```

---

# Use Cases

* Birthdays
* Anniversaries
* Yearly events

---

# 10. Notification Data Payload

Hidden information attached to notification.

```javascript
await Notifications.scheduleNotificationAsync({
  content: {
    title: "Workout",
    body: "Start exercising",
    data: {
      workoutId: 12,
      type: "exercise",
    },
  },
  trigger: null,
});
```

---

# Why Useful?

User taps notification.

Navigate directly.

```text
Workout Details Screen
```

instead of

```text
Home Screen
```

---

# 11. Listening For Notification Arrival

Foreground notification.

```javascript
Notifications.addNotificationReceivedListener(
(notification) => {
  console.log(notification);
});
```

---

# Example

```javascript
Notifications.addNotificationReceivedListener(
(notification) => {
  alert(notification.request.content.title);
});
```

---

# 12. Notification Click Handling

Most important feature.

```javascript
Notifications.addNotificationResponseReceivedListener(
(response) => {
  console.log(response);
});
```

---

# Example Navigation

```javascript
Notifications.addNotificationResponseReceivedListener(
(response) => {
  const data =
    response.notification.request.content.data;

  navigation.navigate(
    "Workout",
    {
      id: data.workoutId,
    }
  );
});
```

---

# 13. Get All Scheduled Notifications

Useful for debugging.

```javascript
const notifications =
  await Notifications.getAllScheduledNotificationsAsync();

console.log(notifications);
```

---

# Example Output

```javascript
[
  {
    identifier: "123"
  },
  {
    identifier: "456"
  }
]
```

---

# 14. Cancel One Notification

Store notification ID.

```javascript
const id =
await Notifications.scheduleNotificationAsync(
  ...
);
```

Cancel:

```javascript
await Notifications.cancelScheduledNotificationAsync(
  id
);
```

---

# 15. Cancel All Notifications

```javascript
await Notifications.cancelAllScheduledNotificationsAsync();
```

---

# Example

User logs out.

```javascript
await Notifications.cancelAllScheduledNotificationsAsync();
```

---

# 16. Production Habit Tracker Example

User creates:

```text
Drink Water
8:00 AM
```

Save:

```javascript
const id =
await Notifications.scheduleNotificationAsync({
  content: {
    title: "Drink Water",
    body: "Stay Hydrated",
  },
  trigger: {
    hour: 8,
    minute: 0,
    repeats: true,
  },
});
```

Store:

```javascript
{
  habitId: 1,
  notificationId: id
}
```

---

Delete Habit:

```javascript
await Notifications.cancelScheduledNotificationAsync(
  notificationId
);
```

---

# 17. Production Best Practices

## Always Ask Permission First

```javascript
requestPermissionsAsync()
```

---

## Create Android Channels

```javascript
setNotificationChannelAsync()
```

---

## Store Notification IDs

Required for deletion.

---

## Attach Data Payload

Useful for navigation.

---

## Test On Real Device

Many notification features:

❌ Emulator

✅ Real Device

---

## Avoid Notification Spam

Bad:

```text
Drink Water
Drink Water
Drink Water
Drink Water
```

---

Good:

```text
Drink Water Reminder
Stay hydrated and healthy.
```

---

# Common Interview Questions

### What is a Local Notification?

A notification generated and scheduled by the device itself without requiring a server.

---

### Does Local Notification Require Internet?

No.

---

### Can Local Notifications Repeat?

Yes.

Examples:

* Daily
* Weekly
* Monthly
* Yearly

---

### What is Notification Channel?

Android-specific category that groups notifications and lets users control their behavior.

---

### Why Store Notification ID?

To update, cancel, or manage scheduled notifications later.

---

# Complete Local Notification Feature Checklist

✅ Install `expo-notifications`

✅ Configure notification handler

✅ Request permissions

✅ Create Android channels

✅ Send instant notifications

✅ Schedule time-based notifications

✅ Schedule date-based notifications

✅ Schedule daily reminders

✅ Schedule weekly reminders

✅ Schedule monthly reminders

✅ Schedule yearly reminders

✅ Attach custom data payload

✅ Handle notification clicks

✅ List scheduled notifications

✅ Cancel single notification

✅ Cancel all notifications

✅ Production-ready architecture for Habit Tracker, Reminder Apps, Alarm Apps, and Task Management Apps.
