
---

# 📱 Master Project: Notification Lab (Expo + React Native)

## Goal

Build one application that demonstrates **every notification concept**.

Instead of many small examples, everything is inside one project.

```text
Notification Lab
│
├── Local Notifications
│
├── Push Notifications
│
├── Notification Channels
│
├── Categories
│
├── Badge Count
│
├── Deep Linking
│
├── Receive Events
│
├── Background Handling
│
├── Foreground Handling
│
├── Notification History
│
├── Scheduling
│
├── Cancel Notifications
│
├── Repeat Notifications
│
├── Rich Data Payload
│
└── Production Architecture
```

---

# Chapter 1 — Notification Fundamentals

Before writing code:

* What is a notification?
* Local vs Push vs Real-time
* Notification lifecycle
* Notification architecture
* Android vs iOS differences
* Expo notification architecture
* FCM
* APNs
* Expo Push Service
* Notification payload
* Device token
* Expo Push Token
* Channels
* Categories
* Badge
* Sounds
* Priority
* Importance
* TTL
* Collapse keys
* Delivery receipts

---

# Chapter 2 — Project Structure

```text
src/

    notifications/

        NotificationProvider.tsx

        notificationService.ts

        localNotification.ts

        pushNotification.ts

        notificationPermission.ts

        notificationChannels.ts

        notificationCategories.ts

        notificationListeners.ts

        notificationNavigation.ts

        notificationBadge.ts

        notificationHistory.ts

        notificationUtils.ts

    hooks/

        useNotifications.ts

    screens/

        HomeScreen

        ChatScreen

        OrderScreen

        PromotionScreen

        NotificationHistoryScreen

        SettingsScreen

    backend/

        Node API examples

        Expo Push Server

        Database schema

```

---

# Chapter 3 — Permission System

Learn

* why permission exists
* permission lifecycle
* Android 13+
* iOS permission flow
* denied
* granted
* provisional
* critical alerts

Code

```ts
requestPermission()

getPermission()

checkPermission()

openSettings()
```

---

# Chapter 4 — Notification Handler

Learn

```
Notifications.setNotificationHandler()
```

Understand every property

```
shouldShowBanner

shouldShowList

shouldPlaySound

shouldSetBadge
```

What happens if each is true or false.

---

# Chapter 5 — Notification Channels

Not one channel.

Multiple channels.

```
messages

orders

marketing

promotion

reminders

system

critical

downloads

social

calls
```

Understand

* Importance

* vibration

* sound

* lock screen visibility

* custom sound

---

# Chapter 6 — Local Notifications

Every trigger.

## Instant

```
trigger:null
```

---

## Delay

```
seconds
```

---

## Date

```
Date object
```

---

## Daily

```
repeat every day
```

---

## Weekly

```
Monday 8 AM
```

---

## Monthly

```
1st day
```

---

## Calendar

```
birthday

meeting

event
```

---

## Snooze

```
10 minutes later
```

---

## Cancel

```
cancel one
```

---

## Cancel All

```
cancelAll()
```

---

## Get Scheduled

```
getAllScheduledNotifications()
```

---

# Chapter 7 — Push Notifications

Understand

```
Frontend

↓

Token

↓

Backend

↓

Expo

↓

FCM/APNs

↓

Device
```

Then

Real examples.

---

Chat

```
John sent message
```

---

Order

```
Food preparing
```

---

Delivery

```
Driver nearby
```

---

Promotion

```
70% Sale
```

---

Security

```
Login detected
```

---

OTP

```
Verification code
```

---

News

```
Breaking News
```

---

System

```
Update available
```

---

# Chapter 8 — Receiving Notifications

This is where most tutorials stop, but production apps do much more.

Understand every possible application state:

```text
                Notification Arrives
                        │
        ┌───────────────┼────────────────┐
        │               │                │
        ▼               ▼                ▼
 App in Foreground  App in Background  App Terminated
```

### 1. Foreground

The app is open and visible.

Use:

```ts
Notifications.addNotificationReceivedListener(...)
```

Learn:

* How to update the UI immediately.
* Show an in-app toast.
* Update unread counts.
* Refresh the current screen.

Example:

```
Chat screen open

↓

Receive notification

↓

Append message immediately

↓

Do NOT navigate
```

---

### 2. Background

The app is running but not visible.

When the user taps the notification:

```ts
Notifications.addNotificationResponseReceivedListener(...)
```

Learn:

* Read the payload.
* Navigate to the correct screen.
* Restore navigation state.

Example:

```
User taps:

"Order Delivered"

↓

Open OrderDetailsScreen

↓

Load order #245
```

---

### 3. Cold Start (App Closed)

The app was completely terminated.

Learn:

```ts
Notifications.getLastNotificationResponseAsync()
```

This checks:

> "Was the app opened because the user tapped a notification?"

Flow:

```
Notification tapped

↓

OS launches app

↓

App checks last notification

↓

Navigate immediately
```

---

### 4. Dismiss Event

User swipes the notification away.

Learn:

* What events are available.
* When dismissal can be tracked.
* Platform limitations.

---

### 5. Notification Action Buttons

Examples:

```
Reply

Mark Read

Accept

Reject

Archive
```

Understand notification categories and actions.

---

### 6. Badge Updates

Learn:

```ts
setBadgeCountAsync()

getBadgeCountAsync()

dismissBadge()
```

Real examples:

```
Chat unread = 5

↓

Badge = 5

↓

User opens chat

↓

Badge = 0
```

---

### 7. Notification History

Learn:

* Save every received notification locally.
* Display a notification center inside your app.
* Mark notifications as read.
* Delete notifications.

---

### 8. Deep Linking

Payload example:

```json
{
  "screen": "Chat",
  "chatId": 25,
  "userId": 10
}
```

Flow:

```
Tap notification

↓

Read payload

↓

Navigate

↓

Fetch chat

↓

Scroll to latest message
```

---

# Chapter 9 — Notification Data Payload

Understand every field.

```
title

body

subtitle

data

channelId

sound

badge

priority

categoryIdentifier

mutableContent

contentAvailable

ttl

expiration

```

Explain what each field does and when to use it.

---

# Chapter 10 — Backend (Node.js)

Build a complete notification service:

* Store Expo push tokens.
* Send notifications.
* Retry failed sends.
* Handle Expo receipts.
* Remove invalid tokens.
* Support multiple notification types.
* Queue notifications for scalability.

---

# Chapter 11 — Database Design

Tables such as:

```
users

devices

push_tokens

notifications

notification_logs

notification_preferences
```

Include relationships, indexes, and why each table exists.

---

# Chapter 12 — Real-World Case Studies

Implement notification flows for:

* **WhatsApp**: Socket when online, push when offline, local notification for reminders.
* **Instagram**: Likes, comments, follows, direct messages.
* **Swiggy/Zomato**: Order accepted, preparing, out for delivery, delivered.
* **Uber**: Driver assigned, driver arrived, trip started, trip completed.
* **Banking App**: Debit, credit, login alerts, OTP, suspicious activity.
* **Habit Tracker**: Daily reminders, streak warnings, achievement notifications.

---

# Final Goal

By the end, you should be able to answer questions like:

* Why use a local notification instead of a push notification?
* How do notification channels work?
* What happens when a notification arrives while the app is in the foreground?
* How do you navigate to a specific screen when a notification is tapped?
* How do you handle notifications if the app was completely closed?
* How do large apps combine sockets and push notifications?
* How do you store notification history?
* How do you scale a notification service to millions of users?

## My recommendation

Don't treat this as one long note. Treat it as a **Week 08 course** with **12–15 chapters**, where each chapter contains:

1. The concept (what and why)
2. Architecture diagrams
3. API explanation
4. Multiple code examples
5. Real-world scenarios
6. Common mistakes
7. Best practices
8. Interview questions
9. Production considerations

That approach will produce a much deeper and more useful reference than one huge document, and it mirrors how senior developers learn and build notification systems.
