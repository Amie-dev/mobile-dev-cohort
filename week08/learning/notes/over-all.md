# 📱 Complete Notifications Notes (Local + Push)

## Expo / React Native – Full Production Overview

This is a **complete master notes set** covering:

* Local Notifications
* Push Notifications
* Permissions
* Channels (Android)
* Architecture
* Payload structure
* Real-world scenarios
* Best practices
* Common mistakes

---

# 1. What is a Notification?

A notification is a message shown outside the app UI to inform users about:

* Messages
* Reminders
* Updates
* Alerts
* Promotions

---

# 2. Types of Notifications

## 2.1 Local Notifications

👉 Created by the device itself

```text id="ln1"
App → Device schedules notification → OS shows it
```

### No internet required

### Examples:

* Alarm
* Habit reminder
* Workout reminder
* Calendar events

---

## 2.2 Push Notifications

👉 Sent from a remote server

```text id="pn1"
Server → Expo/FCM/APNs → Device
```

### Internet required

### Examples:

* WhatsApp message
* Instagram like
* Order updates
* Banking alerts

---

# 3. Local Notifications (Deep Concept)

## When to use:

* Time-based reminders
* Offline alerts
* Scheduled tasks

---

## Local Notification Flow

```text id="ln2"
User → App schedules → OS stores → Trigger time → Notification shows
```

---

## Local Notification Example (ALL TYPES)

### Install

```bash id="ln3"
npx expo install expo-notifications
```

---

## FULL LOCAL NOTIFICATION CODE

```tsx id="ln4"
import * as Notifications from "expo-notifications";

// 👉 Show notification behavior when app is open
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowBanner: true, // show popup
    shouldPlaySound: true,  // play sound
    shouldSetBadge: false,  // app icon badge
    shouldShowList: true,   // show in notification tray
  }),
});

// 👉 LOCAL NOTIFICATION EXAMPLES
export async function sendLocalNotification(type: string) {

  // 1. Instant Notification
  if (type === "welcome") {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "Welcome 👋",
        body: "Thanks for installing our app",
      },
      trigger: null, // immediate
    });
  }

  // 2. Delay Notification
  if (type === "delay") {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "Reminder ⏰",
        body: "Drink water now!",
      },
      trigger: { seconds: 10 }, // after 10 sec
    });
  }

  // 3. Daily Reminder
  if (type === "daily") {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "Workout 💪",
        body: "Time to exercise",
      },
      trigger: {
        hour: 8,
        minute: 0,
        repeats: true,
      },
    });
  }

  // 4. Scheduled Date Notification
  if (type === "date") {
    const date = new Date();
    date.setMinutes(date.getMinutes() + 5);

    await Notifications.scheduleNotificationAsync({
      content: {
        title: "Meeting 📅",
        body: "Meeting starts soon",
      },
      trigger: date, // exact time
    });
  }
}
```

---

## Local Notification Summary

| Type       | Example         |
| ---------- | --------------- |
| Instant    | Welcome message |
| Delay      | 10 sec reminder |
| Repeating  | Daily workout   |
| Date-based | Meeting alert   |

---

# 4. Push Notifications (Deep Concept)

## When to use:

* Real-time updates
* Server events
* User-to-user messaging

---

## Push Flow

```text id="pn2"
App → gets token → Server stores → Server sends → Expo → Device
```

---

## FULL PUSH NOTIFICATION EXAMPLE

```tsx id="pn3"
import * as Notifications from "expo-notifications";

// 👉 SEND PUSH NOTIFICATION (SERVER SIDE SIMULATION)
export async function sendPushNotification(
  expoPushToken: string,
  type: string
) {

  let message: any = {
    to: expoPushToken,
    sound: "default",
  };

  // 1. Chat Message (WhatsApp style)
  if (type === "chat") {
    message = {
      ...message,
      title: "John 👤",
      body: "Hey! Are you free?",
      data: { chatId: 10 }, // deep link data
    };
  }

  // 2. Order Update (Swiggy style)
  if (type === "order") {
    message = {
      ...message,
      title: "Order Confirmed 🍕",
      body: "Your order is being prepared",
      data: { orderId: 55 },
    };
  }

  // 3. Promotion (Amazon style)
  if (type === "promo") {
    message = {
      ...message,
      title: "🔥 Big Sale",
      body: "Flat 70% OFF today",
    };
  }

  // 4. Reminder (Habit app)
  if (type === "reminder") {
    message = {
      ...message,
      title: "Workout 💪",
      body: "Don't skip today",
      data: { habitId: 3 },
    };
  }

  // 👉 SEND TO EXPO SERVER
  await fetch("https://exp.host/--/api/v2/push/send", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(message),
  });
}
```

---

## Push Notification Summary

| Type     | Example          |
| -------- | ---------------- |
| Chat     | WhatsApp message |
| Order    | Food delivery    |
| Promo    | Marketing        |
| Reminder | Habit app        |

---

# 5. Notification Permissions

## Required for both Local + Push

```tsx id="perm1"
import * as Notifications from "expo-notifications";

export async function requestPermission() {
  const { status } =
    await Notifications.requestPermissionsAsync();

  return status === "granted";
}
```

---

## Permission States

| State        | Meaning   |
| ------------ | --------- |
| granted      | allowed   |
| denied       | blocked   |
| undetermined | not asked |

---

# 6. Notification Channels (Android ONLY)

## Why channels exist?

To group notifications:

```text id="ch1"
messages → chat notifications
orders → delivery updates
promo → marketing
reminders → habits
```

---

## Channel Setup

```tsx id="ch2"
import * as Notifications from "expo-notifications";
import { Platform } from "react-native";

export async function setupChannels() {
  if (Platform.OS === "android") {

    await Notifications.setNotificationChannelAsync(
      "messages",
      {
        name: "Messages",
        importance: Notifications.AndroidImportance.MAX,
      }
    );

    await Notifications.setNotificationChannelAsync(
      "orders",
      {
        name: "Orders",
        importance: Notifications.AndroidImportance.HIGH,
      }
    );

    await Notifications.setNotificationChannelAsync(
      "promo",
      {
        name: "Promotions",
        importance: Notifications.AndroidImportance.DEFAULT,
      }
    );

    await Notifications.setNotificationChannelAsync(
      "reminders",
      {
        name: "Reminders",
        importance: Notifications.AndroidImportance.LOW,
      }
    );
  }
}
```

---

## Channel Usage Example

```tsx id="ch3"
// Chat message
channelId: "messages"

// Order update
channelId: "orders"

// Promotion
channelId: "promo"

// Reminder
channelId: "reminders"
```

---

# 7. Local vs Push (Final Comparison)

| Feature  | Local     | Push              |
| -------- | --------- | ----------------- |
| Source   | Device    | Server            |
| Internet | ❌ No      | ✅ Yes             |
| Use case | reminders | real-time updates |
| Example  | alarm     | WhatsApp          |

---

# 8. Real App Mapping

## WhatsApp

```text id="app1"
push + messages channel
```

## Swiggy

```text id="app2"
orders channel
```

## Amazon

```text id="app3"
promo + orders
```

## Duolingo

```text id="app4"
reminders + streaks
```

---

# 9. Key Interview Concepts

✔ What is Local Notification
✔ What is Push Notification
✔ What is Expo Push Token
✔ What is Notification Channel
✔ Why use Data payload
✔ Difference between local vs push
✔ Why FCM/APNs needed

---

# 10. Final Mental Model

```text id="final1"
LOCAL:
App → Device → OS → Notification

PUSH:
Server → Expo → FCM/APNs → Device
```

---

# 🚀 Summary

You now have:

✔ Full Local Notification system
✔ Full Push Notification system
✔ Android Channels system
✔ Real-world app examples
✔ Production-ready code patterns
✔ Deep architecture understanding

---

If you want next level upgrade, I can build:

🔥 Full backend push system (Node.js)
🔥 WhatsApp clone notification system
🔥 Real-time + push hybrid architecture
🔥 Database schema for notifications

Just tell 👍
