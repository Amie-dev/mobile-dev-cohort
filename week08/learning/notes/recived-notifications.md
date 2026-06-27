---

# 📖 Notification Lifecycle (After a Notification is Sent)

Here is a **much more production-level, clearer, and “real app architecture” version** of your notification lifecycle diagram.

I expanded it to include:

* OS delivery stages (missing in most tutorials)
* App state transitions
* Expo APIs mapping
* Background handling reality
* Data flow (payload → UI → navigation)
* Cold start + deep linking flow

---

# 📖 Advanced Notification Lifecycle (Production Grade)

```text
                          ┌──────────────────────────┐
                          │   NOTIFICATION CREATED   │
                          │ (Local / Push / Server)  │
                          └─────────────┬────────────┘
                                        │
                    ┌───────────────────┴───────────────────┐
                    │                                       │
                    ▼                                       ▼
        LOCAL NOTIFICATION                          PUSH NOTIFICATION
   (Expo scheduleNotificationAsync)        (Server → Expo / FCM / APNs)
                    │                                       │
                    └───────────────────┬───────────────────┘
                                        ▼
                        ┌──────────────────────────┐
                        │  OPERATING SYSTEM (OS)   │
                        │  Android / iOS Scheduler │
                        └─────────────┬────────────┘
                                      │
                                      ▼
                   ┌──────────────────────────────────┐
                   │ NOTIFICATION DELIVERY ENGINE     │
                   │ - Lock Screen                    │
                   │ - Banner                         │
                   │ - Notification Center            │
                   │ - Silent Push (optional)         │
                   └─────────────┬────────────────────┘
                                 │
                                 ▼
                  ┌──────────────────────────────────┐
                  │ EXPO NOTIFICATIONS LAYER         │
                  │ (Unified for Local + Push)       │
                  └─────────────┬────────────────────┘
                                │
                                ▼
                  ┌──────────────────────────────────┐
                  │ setNotificationHandler()         │
                  │ (UI presentation rules)          │
                  └─────────────┬────────────────────┘
                                │
         ┌──────────────────────┼────────────────────────┐
         │                      │                        │
         ▼                      ▼                        ▼
 ┌──────────────┐     ┌──────────────┐        ┌──────────────────┐
 │ FOREGROUND   │     │ BACKGROUND   │        │ TERMINATED STATE  │
 │ (App Open)   │     │ (App Hidden) │        │ (App Killed)      │
 └──────┬───────┘     └──────┬───────┘        └────────┬─────────┘
        │                    │                          │
        ▼                    ▼                          ▼
addNotificationReceived   OS Displays           Cold Start Trigger
Listener()                Notification          (App Launch via Tap)
        │                    │                          │
        ▼                    ▼                          ▼
 ┌──────────────────────────────────────────────────────────────┐
 │                     USER INTERACTION LAYER                   │
 └──────────────────────────────────────────────────────────────┘
        │                    │                          │
        ▼                    ▼                          ▼
 Notification Arrives   User Sees Banner        App Opens from Tap
        │                    │                          │
        ▼                    ▼                          ▼
 UPDATE UI           NO APP CALLBACK           getLastNotificationResponseAsync()
 SAVE HISTORY
 UPDATE BADGE
 REFRESH API
        │                    │                          │
        └────────────────────┼──────────────────────────┘
                             ▼
           addNotificationResponseReceivedListener()
                             │
                             ▼
                ┌─────────────────────────────┐
                │  RESPONSE PROCESSING ENGINE │
                └─────────────┬───────────────┘
                              │
        ┌─────────────────────┼─────────────────────┐
        ▼                     ▼                     ▼
   NAVIGATION          DATA FETCH            ANALYTICS EVENT
 (Deep Linking)     (API Refresh)        (Opened / Clicked)
        │                     │                     │
        ▼                     ▼                     ▼
 CHAT SCREEN          LATEST STATE         LOG EVENT SERVER
 ORDER DETAILS
 PROFILE PAGE
        │
        ▼
 MARK AS READ + UPDATE BADGE COUNT
        │
        ▼
 CLEANUP / STATE SYNC
```

---

# 🧠 WHAT THIS IMPROVES (IMPORTANT)

### 1. Adds missing REAL components

Most tutorials skip:

- OS delivery system
- Notification center
- Silent/background behavior
- Cold start architecture
- Deep linking flow

---

### 2. Shows real Expo abstraction

```text
Local + Push → SAME Expo pipeline → SAME listeners
```

This is why:

✔ You don’t write separate logic
✔ You don’t care where notification came from
✔ You only handle events

---

### 3. Separates 3 critical layers

#### 🔵 System Layer (OS)

- delivery
- banner
- lock screen

#### 🟡 Expo Layer

- handler
- listeners
- response APIs

#### 🔴 App Layer

- navigation
- API calls
- UI update
- analytics

---

# ⚡ FINAL MENTAL MODEL (SENIOR LEVEL)

```text
Notification = Event

Event flows through:

OS → Expo → App → Business Logic → UI → Analytics
```

---

---

# Step 1 — Notification Arrives

The notification reaches the device.

This can be from:

- Local Notification
- Push Notification

At this point, **both are handled the same way** by Expo.

---

# Step 2 — Notification Handler

## Purpose

The Notification Handler tells the operating system **how the notification should be displayed** while your app is running.

**File**

```text
src/notifications/notificationHandler.ts
```

Example:

```ts
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

### What each option controls

| Property         | Purpose                                  |
| ---------------- | ---------------------------------------- |
| shouldShowBanner | Display a banner while app is open       |
| shouldShowList   | Save notification in notification center |
| shouldPlaySound  | Play notification sound                  |
| shouldSetBadge   | Update app icon badge                    |

---

# Step 3 — Notification Received

## Event

```ts
Notifications.addNotificationReceivedListener();
```

## When does it run?

Only when the application is **currently running** (foreground).

```
Notification arrives

↓

App already open

↓

Received Listener executes
```

**Production file**

```text
src/notifications/listeners/receivedListener.ts
```

Typical responsibilities:

- Update chat messages
- Refresh order status
- Save notification history
- Increase unread count
- Play in-app sound
- Show custom toast

Example:

```ts
Notifications.addNotificationReceivedListener((notification) => {
  console.log(notification);

  // Update UI

  // Save notification locally

  // Update badge

  // Refresh screen
});
```

---

# Step 4 — User Responds to Notification

The user interacts with the notification.

Possible interactions:

```
Tap

Reply

Accept

Reject

Archive

Mark Read

Dismiss
```

---

## Response Listener

```ts
Notifications.addNotificationResponseReceivedListener();
```

Runs after the user performs an action.

**Production file**

```text
src/notifications/listeners/responseListener.ts
```

Example:

```ts
Notifications.addNotificationResponseReceivedListener((response) => {
  const data = response.notification.request.content.data;

  // Navigate

  // Fetch latest data

  // Mark notification read
});
```

---

# Step 5 — App Was Closed

This is called a **Cold Start**.

```
Notification

↓

User taps

↓

Operating System launches app

↓

App starts

↓

Need to know why app opened
```

Use:

```ts
Notifications.getLastNotificationResponseAsync();
```

**Production file**

```text
src/notifications/listeners/coldStartListener.ts
```

Example:

```ts
const response = await Notifications.getLastNotificationResponseAsync();

if (response) {
  // Navigate
  // Restore screen
}
```

---

# Step 6 — Navigation Handler

Never navigate directly from listeners.

Instead:

```
Listener

↓

Navigation Service

↓

Correct Screen
```

**Production file**

```text
src/notifications/navigation/notificationNavigation.ts
```

Example logic:

```ts
switch (data.type) {
  case "chat":
    navigate("Chat", {
      chatId: data.chatId,
    });

    break;

  case "order":
    navigate("Order", {
      orderId: data.orderId,
    });

    break;

  case "promotion":
    navigate("Promotion");

    break;
}
```

---

# Step 7 — Badge Handling

Every received notification may update the badge.

**Production file**

```text
src/notifications/badge.ts
```

Responsibilities:

- Increase unread count
- Clear badge when notifications are read
- Synchronize badge count with app state

Useful APIs:

```ts
Notifications.setBadgeCountAsync();

Notifications.getBadgeCountAsync();
```

---

# Step 8 — Save Notification History

Real applications keep a history of notifications.

**Production file**

```text
src/notifications/history.ts
```

Example record:

```ts
{
    id: "123",
    title: "New Message",
    body: "John sent a message",
    type: "chat",
    receivedAt: Date.now(),
    read: false,
}
```

Used for:

- Notification Center screen
- Read/unread status
- Search
- Analytics

---

# Step 9 — Update Application State

After receiving a notification, update your application's data rather than relying only on the notification text.

Examples:

### Chat

```
Receive notification

↓

Fetch latest messages

↓

Update chat list

↓

Increase unread count
```

### Food Delivery

```
Receive notification

↓

Refresh order

↓

Update progress

↓

Show latest status
```

### Banking

```
Receive notification

↓

Refresh account balance

↓

Update transaction history
```

---

# Step 10 — Handle Different Notification Types

A production notification service usually routes by notification type.

Example:

```ts
switch (data.type) {
  case "chat":
    break;

  case "order":
    break;

  case "promotion":
    break;

  case "security":
    break;

  case "habit":
    break;
}
```

Each type has different navigation and business logic.

---

# Production Folder Structure

```text
src/
│
└── notifications/
    │
    ├── notificationHandler.ts
    │
    ├── permission.ts
    │
    ├── channels.ts
    │
    ├── badge.ts
    │
    ├── history.ts
    │
    ├── notificationService.ts
    │
    ├── navigation/
    │      └── notificationNavigation.ts
    │
    ├── listeners/
    │      ├── receivedListener.ts
    │      ├── responseListener.ts
    │      └── coldStartListener.ts
    │
    ├── hooks/
    │      └── useNotifications.ts
    │
    └── NotificationProvider.tsx
```

---

# Best Practices

✅ Keep notification handling in a dedicated `notifications/` module instead of `App.tsx`.

✅ Separate responsibilities:

- `notificationHandler.ts` → controls notification presentation.
- `listeners/` → handles events.
- `navigation/` → performs navigation.
- `history.ts` → stores notifications.
- `badge.ts` → manages badge counts.

✅ Treat notifications as **events**, not just pop-ups. A notification should trigger business logic such as refreshing data, updating the UI, or navigating to the correct screen.

---

## Complete Notification Flow (Production)

```text
Local / Push Notification
          │
          ▼
Operating System Receives
          │
          ▼
Notification Handler
          │
          ▼
Notification Displayed
          │
          ▼
Received Listener (Foreground)
          │
          ▼
Update UI
Save History
Update Badge
Refresh Data
          │
          ▼
User Taps Notification
          │
          ▼
Response Listener
          │
          ▼
Read Payload
          │
          ▼
Navigation Service
          │
          ▼
Open Correct Screen
          │
          ▼
Fetch Latest Data
          │
          ▼
Mark Notification as Read
          │
          ▼
Clear/Update Badge
```

This lifecycle works for **both local and push notifications**, because after the operating system delivers them to your app, Expo exposes the same handling APIs (`setNotificationHandler`, `addNotificationReceivedListener`, `addNotificationResponseReceivedListener`, and `getLastNotificationResponseAsync`) regardless of how the notification was originally created.

---

# 📖 Notification Handling APIs (Expo) — Complete Guide

After a notification is **created** (Local) or **sent from a server** (Push), both eventually reach the **Operating System (Android/iOS)**.

The operating system then delivers the notification to your application.

From this point onward, **Expo uses the same APIs for both Local and Push notifications**.

This means **you do not need separate listeners for Local and Push notifications**.

Whether the notification came from:

- Local Notification
- Expo Push Notification
- Firebase (FCM)
- APNs (iOS)

once it reaches your application, you handle it using the same Notification APIs.

---

# Notification Lifecycle

```text
                       Local Notification
                               │
                               │
                       Push Notification
                               │
                               ▼
                       Operating System
                       (Android / iOS)
                               │
                               ▼
                       Expo Notification Module
                               │
        ├─────────────────────────────────────────┐
        │                                         │
        ▼                                         ▼
Notification Handler                   Notification Events
        │                                         │
        ▼                                         ▼
setNotificationHandler()          addNotificationReceivedListener()
                                  addNotificationResponseReceivedListener()
                                  getLastNotificationResponseAsync()
```

---

# There are FOUR important APIs

```
1. setNotificationHandler()

2. addNotificationReceivedListener()

3. addNotificationResponseReceivedListener()

4. getLastNotificationResponseAsync()
```

If you understand these four APIs, you understand almost all notification handling in Expo.

---

# 1. setNotificationHandler()

## Purpose

Controls **how notifications are presented** while the app is running.

It **does NOT tell you that a notification arrived**.

Instead it tells the Operating System:

> "When my app is open, should this notification be shown?"

Think of it as the **display configuration**.

---

## Production File

```text
src/notifications/notificationHandler.ts
```

---

## Example

```ts
import * as Notifications from "expo-notifications";

/**
 * Controls how notifications are displayed
 * while the application is in the foreground.
 */

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    // Show banner at top
    shouldShowBanner: true,

    // Save notification in notification center
    shouldShowList: true,

    // Play notification sound
    shouldPlaySound: true,

    // Update application badge
    shouldSetBadge: true,
  }),
});
```

---

## When does it run?

```
Notification arrives

↓

App is OPEN

↓

OS asks your app

↓

Should I show this notification?

↓

Notification Handler answers
```

---

## Real Example

Chat application

```
John sends message

↓

App already open

↓

Banner appears

↓

Sound plays

↓

Badge updates
```

---

## Production Uses

- Show banner
- Hide banner
- Play sound
- Silent notification
- Badge updates

---

# 2. addNotificationReceivedListener()

## Purpose

Runs **immediately when a notification arrives** while the app is running.

This is the most commonly used notification listener.

---

## Production File

```text
src/notifications/listeners/receivedListener.ts
```

---

## Flow

```
Notification arrives

↓

App already open

↓

Received Listener

↓

Business Logic
```

---

## Production Code

```ts
import * as Notifications from "expo-notifications";

/**
 * Register foreground notification listener.
 */

export function registerReceivedListener() {
  const subscription = Notifications.addNotificationReceivedListener(
    async (notification) => {
      console.log("Notification Received", notification);

      /**
       * Extract payload
       */
      const payload = notification.request.content.data;

      /**
       * Example:
       * Save notification locally
       */

      // saveNotification(notification);

      /**
       * Update unread count
       */

      // incrementUnread();

      /**
       * Update badge
       */

      // updateBadge();

      /**
       * Refresh data
       */

      switch (payload.type) {
        case "chat":
          // Refresh conversation

          break;

        case "order":
          // Refresh latest order

          break;

        case "promotion":
          // Refresh offers

          break;

        case "habit":
          // Update habit streak

          break;

        default:
          console.log("Unknown notification");
      }
    },
  );

  return subscription;
}
```

---

## What should happen here?

Production applications usually:

✅ Save notification

✅ Refresh API

✅ Update Context

✅ Update Redux

✅ Update unread count

✅ Update badge

✅ Show custom toast

✅ Play animation

---

## Real Examples

### WhatsApp

```
Receive Message

↓

Append message

↓

Increase unread

↓

Play sound
```

---

### Swiggy

```
Order Update

↓

Refresh order

↓

Update timeline

↓

Show latest status
```

---

### Banking

```
Transaction notification

↓

Refresh account

↓

Update balance

↓

Store history
```

---

# 3. addNotificationResponseReceivedListener()

## Purpose

Runs when the **user interacts with a notification**.

The notification was already delivered.

Now the user performs an action.

---

## Production File

```text
src/notifications/listeners/responseListener.ts
```

---

## Flow

```
Notification appears

↓

User taps notification

↓

Response Listener

↓

Navigate

↓

Fetch latest data
```

---

## Production Code

```ts
import * as Notifications from "expo-notifications";

/**
 * Register notification response listener.
 */

export function registerResponseListener() {
  const subscription = Notifications.addNotificationResponseReceivedListener(
    async (response) => {
      console.log("Notification Clicked", response);

      const payload = response.notification.request.content.data;

      /**
       * Example navigation
       */

      switch (payload.type) {
        case "chat":
          // navigation.navigate("Chat")

          break;

        case "order":
          // navigation.navigate("Order")

          break;

        case "promotion":
          // navigation.navigate("Promotion")

          break;
      }

      /**
       * Mark notification read
       */

      // markRead();

      /**
       * Analytics
       */

      // trackOpen();
    },
  );

  return subscription;
}
```

---

## User interactions

```
Tap

Reply

Accept

Reject

Archive

Mark Read
```

---

## Production Uses

- Navigate
- Mark read
- Refresh API
- Analytics
- Deep Linking

---

# 4. getLastNotificationResponseAsync()

## Purpose

Handles the situation where the app was **completely closed (terminated)** and the user opens it by tapping a notification.

This is known as a **Cold Start**.

---

## Production File

```text
src/notifications/listeners/coldStartListener.ts
```

---

## Flow

```
App Closed

↓

User taps notification

↓

Operating System

↓

Launch App

↓

getLastNotificationResponseAsync()

↓

Navigate
```

---

## Production Code

```ts
import * as Notifications from "expo-notifications";

/**
 * Handle notification that launched the app.
 */

export async function handleColdStart() {
  const response = await Notifications.getLastNotificationResponseAsync();

  if (!response) return;

  const payload = response.notification.request.content.data;

  console.log("Cold Start Notification", payload);

  switch (payload.type) {
    case "chat":
      // Open Chat Screen

      break;

    case "order":
      // Open Order Details

      break;

    case "promotion":
      // Open Offer Screen

      break;
  }
}
```

---

## Why is this needed?

Imagine:

```
App completely closed

↓

John sends message

↓

Notification appears

↓

User taps notification

↓

App launches

↓

How does the app know where to go?

↓

getLastNotificationResponseAsync()
```

Without this API, your app would simply open the home screen because no response listener was active while the app was terminated.

---

# Complete Production Lifecycle

```text
Notification Created
        │
        ▼
Operating System Receives
        │
        ▼
setNotificationHandler()
        │
        ▼
Should banner appear?
Should sound play?
Should badge update?
        │
        ▼
Notification Displayed
        │
        ├────────────────────────────┐
        │                            │
        ▼                            ▼
App Open                     App Background/Closed
        │                            │
        ▼                            ▼
addNotificationReceivedListener()    System Displays Notification
        │                            │
        ▼                            ▼
Update UI                     User Taps Notification
Save History                         │
Refresh API                          ▼
Badge Update          addNotificationResponseReceivedListener()
        │                            │
        └──────────────┬─────────────┘
                       ▼
               Parse Payload
                       ▼
               Navigate Screen
                       ▼
               Fetch Latest Data
                       ▼
              Mark Notification Read
                       ▼
                Update Badge Count

App Terminated
        │
User taps notification
        │
App launches
        │
getLastNotificationResponseAsync()
        │
Restore correct screen
```

---

Good — now we’ll upgrade your table into **real production-ready code references** so you can directly use it in projects.

I’ll keep your table exactly and **add full working code under each API**.

---

# 📊 Notification APIs + Production Code (Expo)

| API                                         | When It Runs                                                  | Main Responsibility                                                          | Production Code |
| ------------------------------------------- | ------------------------------------------------------------- | ---------------------------------------------------------------------------- | --------------- |
| `setNotificationHandler()`                  | Before a foreground notification is presented                 | Decide how the notification should be displayed (banner, sound, badge, list) | ↓               |
| `addNotificationReceivedListener()`         | Notification arrives while the app is open                    | Update UI, save history, refresh data, update unread counts                  | ↓               |
| `addNotificationResponseReceivedListener()` | User interacts with a notification                            | Read payload, navigate, mark as read, send analytics                         | ↓               |
| `getLastNotificationResponseAsync()`        | App launches after being closed because of a notification tap | Recover the launch notification and restore the correct screen               | ↓               |

---

# 1️⃣ setNotificationHandler() (Foreground Display Control)

📁 `src/notifications/notificationHandler.ts`

```ts
import * as Notifications from "expo-notifications";

/**
 * Controls how notifications behave when app is OPEN
 * (Foreground state)
 */

export function registerNotificationHandler() {
  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowBanner: true, // show top banner
      shouldShowList: true, // show in notification center
      shouldPlaySound: true, // play sound
      shouldSetBadge: true, // update app badge
    }),
  });
}
```

---

# 2️⃣ addNotificationReceivedListener() (App OPEN event)

📁 `src/notifications/listeners/receivedListener.ts`

```ts
import * as Notifications from "expo-notifications";

/**
 * Fires when notification arrives AND app is OPEN
 */

export function registerReceivedListener() {
  const subscription = Notifications.addNotificationReceivedListener(
    async (notification) => {
      const data = notification.request.content.data;

      console.log("📩 Received:", data);

      // 🔥 1. Save notification locally
      // saveToHistory(notification);

      // 🔥 2. Update UI instantly
      // updateChatUI(data);

      // 🔥 3. Increase unread badge
      // incrementBadge();

      // 🔥 4. Refresh data from server
      switch (data.type) {
        case "chat":
          // fetchLatestMessages(data.chatId);
          break;

        case "order":
          // fetchOrderStatus(data.orderId);
          break;

        case "habit":
          // refreshHabit(data.habitId);
          break;

        default:
          console.log("Unknown notification type");
      }
    },
  );

  return subscription;
}
```

---

# 3️⃣ addNotificationResponseReceivedListener() (User TAP / ACTION)

📁 `src/notifications/listeners/responseListener.ts`

```ts
import * as Notifications from "expo-notifications";

/**
 * Fires when user interacts with notification
 * (tap, action button, reply, etc.)
 */

export function registerResponseListener(navigation: any) {
  const subscription = Notifications.addNotificationResponseReceivedListener(
    (response) => {
      const data = response.notification.request.content.data;

      console.log("👆 User tapped:", data);

      // 🔥 1. Navigate based on type
      switch (data.type) {
        case "chat":
          navigation.navigate("Chat", {
            chatId: data.chatId,
          });
          break;

        case "order":
          navigation.navigate("OrderDetails", {
            orderId: data.orderId,
          });
          break;

        case "habit":
          navigation.navigate("HabitDetail", {
            habitId: data.habitId,
          });
          break;
      }

      // 🔥 2. Mark as read in backend
      // markNotificationRead(data.id);

      // 🔥 3. Analytics tracking
      // trackNotificationOpen(data.type);

      // 🔥 4. Update badge
      // resetBadgeIfNeeded();
    },
  );

  return subscription;
}
```

---

# 4️⃣ getLastNotificationResponseAsync() (COLD START)

📁 `src/notifications/listeners/coldStartListener.ts`

```ts
import * as Notifications from "expo-notifications";

/**
 * Fires when app is opened from a notification
 * while app was fully closed (killed state)
 */

export async function handleColdStartNotification(navigation: any) {
  const response = await Notifications.getLastNotificationResponseAsync();

  if (!response) return;

  const data = response.notification.request.content.data;

  console.log("🚀 Cold Start:", data);

  // 🔥 Restore navigation
  switch (data.type) {
    case "chat":
      navigation.navigate("Chat", {
        chatId: data.chatId,
      });
      break;

    case "order":
      navigation.navigate("OrderDetails", {
        orderId: data.orderId,
      });
      break;

    case "habit":
      navigation.navigate("HabitDetail", {
        habitId: data.habitId,
      });
      break;
  }
}
```

---

# 🧠 PRODUCTION FLOW (ALL TOGETHER)

```text
Notification sent (Push / Local)
            ↓
OS receives notification
            ↓
setNotificationHandler()
            ↓
(App OPEN?)
      ┌───────────────┐
      │ YES           │ NO
      ▼               ▼
Received Listener   System shows notification
      │               │
      ▼               ▼
Update UI        User taps notification
      │               │
      └──────┬────────┘
             ▼
Response Listener
             ↓
Navigate + Fetch Data + Analytics
             ↓
Mark as read + Update badge

IF app was CLOSED:
             ↓
getLastNotificationResponseAsync()
             ↓
Restore correct screen
```

---

# ⚡ KEY PRODUCTION RULE (VERY IMPORTANT)

👉 NEVER use notification data directly in UI
👉 ALWAYS:

```
Notification → payload → API fetch → update UI
```

Because notification data can be:

- outdated
- modified
- incomplete
- fake (spoofed payload)

---

# 🧩 FINAL MENTAL MODEL

You now have 4 layers:

### 1. Presentation Layer

`setNotificationHandler`

### 2. Live Event Layer

`addNotificationReceivedListener`

### 3. Interaction Layer

`addNotificationResponseReceivedListener`

### 4. Cold Start Recovery Layer

`getLastNotificationResponseAsync`

---
