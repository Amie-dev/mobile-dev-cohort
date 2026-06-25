# Week 08 – Notifications in Mobile Development (Expo & React Native)

📅 **Week 08 Overview**

This week focuses on **mobile notifications**, one of the most important engagement features in modern mobile applications.

By the end of this week, students should understand:

* Local Notifications
* Push Notifications
* Notification Permissions
* Notification Channels (Android)
* Notification Categories & Actions
* Scheduling Notifications
* Background Notification Handling
* Expo Notifications API
* Notification Architecture Design

---

# Day 01

# Introduction to Mobile Notifications

---

## What is a Notification?

A notification is a message displayed by the operating system to inform the user about an event, update, reminder, or action.

Examples:

* New WhatsApp message
* Instagram like
* Email received
* Reminder to drink water
* Food delivery update

---

## Why Notifications Matter

Notifications help:

* Re-engage users
* Increase app retention
* Deliver important information
* Remind users about tasks
* Improve user experience

Without notifications, users may forget about an app entirely.

---

## Types of Notifications

### 1. Local Notifications

Generated directly by the device.

No internet required.

Example:

Habit Tracker app reminds:

> Drink Water at 8:00 AM

The reminder already exists inside the phone.

---

### 2. Push Notifications

Sent from a server through:

* Firebase Cloud Messaging (FCM)
* Apple Push Notification Service (APNs)
* Expo Push Service

Internet required.

Example:

Instagram sends:

> Someone liked your post

The server triggers the notification.

---

## Local vs Push Notifications

| Feature           | Local   | Push                |
| ----------------- | ------- | ------------------- |
| Internet Required | No      | Yes                 |
| Sent From         | Device  | Server              |
| Works Offline     | Yes     | No                  |
| Scheduling        | Yes     | Usually No          |
| Personalized      | Limited | Highly Personalized |
| Examples          | Alarm   | WhatsApp Message    |

---

## Notification Lifecycle

1. Notification Created
2. Delivered to Device
3. Displayed
4. User Clicks
5. App Opens

Flow:

```
Server/App
     ↓
Notification Created
     ↓
Operating System
     ↓
Notification Tray
     ↓
User Interaction
```

---

## Notification Components

A notification usually contains:

### Title

```
Workout Reminder
```

### Body

```
Time for your evening workout!
```

### Sound

```
default
```

### Badge Count

```
3 unread notifications
```

### Data Payload

Hidden data passed to app.

Example:

```json
{
  "habitId": 5
}
```

---

## Real World Examples

### WhatsApp

Push Notification

```
John:
Where are you?
```

---

### Google Calendar

Local Notification

```
Meeting starts in 10 minutes
```

---

### Food Delivery App

Push Notification

```
Your order is arriving soon
```

---

## Learning Outcome

Students should understand:

* What notifications are
* Why apps use them
* Difference between local and push notifications
* Notification lifecycle

---

# Day 02

# Notification Permissions

📅 Week 08 Day 02

---

## Why Permission is Required

Notifications can interrupt users.

Therefore:

### Android

Requires notification permission (Android 13+)

### iOS

Always requires permission

Users must explicitly allow notifications.

---

## Permission States

### Granted

User allows notifications.

```
Can send notifications
```

---

### Denied

User rejects notifications.

```
Cannot send notifications
```

---

### Undetermined

User has not decided yet.

---

## Permission Flow

```
App Starts
     ↓
Check Permission
     ↓
Granted?
 ┌── Yes ──→ Continue
 │
 No
 │
Ask User
 │
Granted?
 ├── Yes → Continue
 └── No → Disable Notification Features
```

---

## Requesting Permission (Expo)

Install:

```bash
npx expo install expo-notifications
```

Example:

```javascript
import * as Notifications from "expo-notifications";

const { status } =
  await Notifications.requestPermissionsAsync();

console.log(status);
```

---

## Checking Existing Permission

```javascript
const settings =
  await Notifications.getPermissionsAsync();

console.log(settings.status);
```

---

## Best Practices

### Explain Before Asking

Bad:

```
App opens
Permission popup immediately
```

Good:

```
We use notifications
to remind you about habits.
```

Then ask permission.

---

### Handle Denial Gracefully

Never force users.

Provide:

```
Enable notifications in settings
```

---

## Common Mistakes

### Asking Repeatedly

Bad UX

---

### Assuming Permission Exists

Always check.

---

### Not Handling Denied State

Can cause bugs.

---

## Learning Outcome

Students should understand:

* Why permissions exist
* Permission states
* Requesting permissions
* Handling denied users

---

# Day 03

# Local Notifications with Expo

📅 Week 08 Day 03

---

## What are Local Notifications?

Notifications generated directly by the device.

No server needed.

Example:

```
Drink Water
Every day at 9 AM
```

---

## Installation

```bash
npx expo install expo-notifications
```

---

## Configure Notification Handler

```javascript
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowBanner: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
    shouldShowList: true,
  }),
});
```

---

## Send Instant Notification

```javascript
await Notifications.scheduleNotificationAsync({
  content: {
    title: "Hello",
    body: "Welcome!"
  },
  trigger: null,
});
```

---

## Schedule Notification

After 10 seconds:

```javascript
await Notifications.scheduleNotificationAsync({
  content: {
    title: "Reminder",
    body: "Drink Water"
  },
  trigger: {
    seconds: 10
  }
});
```

---

## Daily Reminder

```javascript
await Notifications.scheduleNotificationAsync({
  content: {
    title: "Workout",
    body: "Time to exercise"
  },
  trigger: {
    hour: 18,
    minute: 0,
    repeats: true
  }
});
```

---

## Cancel Notification

```javascript
await Notifications.cancelScheduledNotificationAsync(id);
```

---

## Cancel All

```javascript
await Notifications.cancelAllScheduledNotificationsAsync();
```

---

## Use Cases

### Habit Tracker

Daily reminders

### Medicine App

Take medicine alerts

### Alarm App

Wake-up notifications

---

## Learning Outcome

Students should:

* Create local notifications
* Schedule notifications
* Cancel notifications
* Build reminder systems

---

# Day 04

# Push Notifications Architecture

📅 Week 08 Day 04

---

## What is a Push Notification?

Notification sent from a remote server.

Example:

```
New message received
```

---

## Push Notification Flow

```
Server
  ↓
FCM/APNs
  ↓
Device Token
  ↓
User Device
```

---

## Important Components

### Device

Receives notification.

### Push Token

Unique device identifier.

Example:

```
ExponentPushToken[xxxx]
```

### Server

Stores tokens.

### Notification Service

FCM/APNs/Expo

---

## Expo Push Flow

```
App
 ↓
Get Expo Push Token
 ↓
Save Token to Server
 ↓
Server Sends Request
 ↓
Expo Push Service
 ↓
Device Receives Notification
```

---

## Why Servers Are Needed

Server decides:

* Who receives
* When to send
* Notification content

---

## Real World Examples

### WhatsApp

New message alerts

### Instagram

Like notifications

### YouTube

New video alerts

---

## Learning Outcome

Students should understand:

* Push notification architecture
* Device tokens
* Server role
* Delivery flow

---

# Day 05

# Expo Push Notifications Implementation

📅 Week 08 Day 05

---

## Getting Expo Push Token

```javascript
import * as Notifications from "expo-notifications";

const token =
await Notifications.getExpoPushTokenAsync();

console.log(token.data);
```

Example:

```
ExponentPushToken[abc123]
```

---

## Sending Notification

Request:

```javascript
fetch(
"https://exp.host/--/api/v2/push/send",
{
  method: "POST",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    to: token,
    title: "Hello",
    body: "Notification Test",
  }),
}
);
```

---

## Notification Payload

```json
{
  "to": "ExponentPushToken[xxx]",
  "title": "Workout Reminder",
  "body": "Time to exercise",
  "sound": "default"
}
```

---

## Custom Data

```json
{
  "data": {
    "habitId": 10
  }
}
```

---

## Receiving Notification

```javascript
Notifications.addNotificationReceivedListener(
(notification) => {
  console.log(notification);
});
```

---

## Notification Response

```javascript
Notifications.addNotificationResponseReceivedListener(
(response) => {
  console.log(response);
});
```

---

## Learning Outcome

Students should:

* Generate push tokens
* Send push notifications
* Handle received notifications
* Pass custom data

---

# Day 06

# Android Notification Channels

📅 Week 08 Day 06

---

## What are Notification Channels?

Android groups notifications into categories.

Example:

* Messages
* Reminders
* Promotions

Users can control each channel separately.

---

## Why Channels Exist

User can:

* Disable marketing notifications
* Keep message notifications enabled

---

## Create Channel

```javascript
await Notifications.setNotificationChannelAsync(
"reminders",
{
  name: "Reminders",
  importance:
    Notifications.AndroidImportance.HIGH,
}
);
```

---

## Channel Importance Levels

### LOW

Silent

### DEFAULT

Normal

### HIGH

Sound + Popup

### MAX

Highest priority

---

## Example Architecture

```
messages
reminders
marketing
updates
```

---

## Best Practice

Separate channels by purpose.

Avoid placing all notifications in one channel.

---

## Learning Outcome

Students understand:

* Android notification channels
* Importance levels
* Notification categorization

---

# Day 07

# Notification System Design Project

📅 Week 08 Day 07

---

# Project

## Habit Tracker Notification System

---

## Requirements

Users can:

* Create habits
* Schedule reminders
* Receive streak alerts
* Receive announcements

---

## Architecture

```
User
 ↓
Habit App
 ↓
Local Notifications
 ↓
Reminder Trigger
```

---

Push Side:

```
Server
 ↓
Expo Push Service
 ↓
Device
 ↓
Notification
```

---

## Notification Types

### Local

Habit reminders

```
Drink Water
8:00 AM
```

---

### Push

Streak alerts

```
You have a 7-day streak!
```

---

### Push

Announcements

```
New feature available
```

---

## Recommended Database

### Users

```sql
id
name
push_token
```

---

### Habits

```sql
id
user_id
title
reminder_time
```

---

## Key Concepts Covered

✅ Permissions

✅ Local Notifications

✅ Push Notifications

✅ Scheduling

✅ Expo Notifications

✅ Android Channels

✅ Notification Architecture

---

# Week 08 Summary

This week introduced the complete notification ecosystem in mobile development.

Students learned:

1. Notification Fundamentals
2. Permission Management
3. Local Notifications
4. Push Notifications
5. Expo Push Service
6. Notification Channels
7. Real-World Notification Architecture

These concepts are essential for building production-ready apps such as:

* WhatsApp
* Instagram
* Facebook
* Google Calendar
* Habit Trackers
* Delivery Applications
* Banking Applications
