# Android Notification Channels & Categories (Expo Push Notifications)

## Complete Deep Notes + Real Code Examples (Production Style)

This is one of the most important concepts in **Android push notifications**, and most beginners misunderstand it.

---

# 1. What is a Notification Channel?

A **Notification Channel (Android only)** is a way to group notifications into categories so users can control them separately.

Think of it like this:

```text
App Notifications
   ├── Messages
   ├── Orders
   ├── Promotions
   ├── Reminders
```

Each one is a **channel**.

---

# 2. Why Channels Are Needed?

Without channels:

```text
User ON/OFF = ALL notifications OFF
```

With channels:

```text
User can disable Promotions
but still receive Messages
```

---

# Real Example

### WhatsApp style

```text
Messages  → ON
Groups    → ON
Media     → OFF (optional)
Calls     → ON
```

---

# 3. Channel vs Category (IMPORTANT DIFFERENCE)

## Channel (Android System Level)

* Created in native app
* Controls sound, vibration, importance
* Permanent system setting

Example:

```text
messages_channel
orders_channel
promo_channel
```

---

## Category (App Level Concept)

* Logical grouping inside backend/app
* Used to decide which channel to send notification to

Example:

```text
type: "message"
type: "order"
type: "marketing"
```

---

# Simple Mapping

```text
CATEGORY (Backend)
     ↓
CHANNEL (Android)
     ↓
Notification Behavior
```

---

# 4. Channel Importance Levels

```javascript id="ch1"
Notifications.AndroidImportance.LOW
Notifications.AndroidImportance.DEFAULT
Notifications.AndroidImportance.HIGH
Notifications.AndroidImportance.MAX
```

---

## Meaning

### LOW

* Silent notification

### DEFAULT

* Normal sound

### HIGH

* Sound + popup

### MAX

* Highest priority

---

# 5. Setup Multiple Notification Channels (Expo)

👉 You must create channels at app startup.

---

## App.tsx (OR Root Layout)

```javascript id="ch2"
import * as Notifications from "expo-notifications";
import { Platform } from "react-native";

export async function setupNotificationChannels() {
  if (Platform.OS === "android") {

    // 1. Messages Channel
    await Notifications.setNotificationChannelAsync(
      "messages",
      {
        name: "Messages",
        importance: Notifications.AndroidImportance.MAX,
        sound: "default",
        vibrationPattern: [0, 250, 250, 250],
      }
    );

    // 2. Orders Channel
    await Notifications.setNotificationChannelAsync(
      "orders",
      {
        name: "Orders",
        importance: Notifications.AndroidImportance.HIGH,
        sound: "default",
      }
    );

    // 3. Promotions Channel
    await Notifications.setNotificationChannelAsync(
      "promotions",
      {
        name: "Promotions",
        importance: Notifications.AndroidImportance.DEFAULT,
        sound: false,
      }
    );

    // 4. Reminders Channel
    await Notifications.setNotificationChannelAsync(
      "reminders",
      {
        name: "Reminders",
        importance: Notifications.AndroidImportance.HIGH,
      }
    );
  }
}
```

---

# 6. Call Setup Once in App

```javascript id="ch3"
useEffect(() => {
  setupNotificationChannels();
}, []);
```

---

# 7. Sending Notifications Using Channels

Now backend must choose correct channel.

---

# 🔥 Example 1: Chat Message (WhatsApp style)

```javascript id="ch4"
{
  to: expoPushToken,
  title: "John",
  body: "Hey, are you free?",
  channelId: "messages",
  data: {
    chatId: 12
  }
}
```

---

# 🔥 Example 2: Order Update (Swiggy/Zomato)

```javascript id="ch5"
{
  to: expoPushToken,
  title: "Order Confirmed 🍕",
  body: "Your order has been placed",
  channelId: "orders",
  data: {
    orderId: 101
  }
}
```

---

# 🔥 Example 3: Out for Delivery

```javascript id="ch6"
{
  to: expoPushToken,
  title: "Out for Delivery 🚴",
  body: "Your food is on the way",
  channelId: "orders",
  data: {
    orderId: 101
  }
}
```

---

# 🔥 Example 4: Promotions (Flipkart/Amazon)

```javascript id="ch7"
{
  to: expoPushToken,
  title: "Big Sale 🔥",
  body: "Flat 70% OFF today",
  channelId: "promotions",
}
```

---

# 🔥 Example 5: Habit Reminder App

```javascript id="ch8"
{
  to: expoPushToken,
  title: "Workout Reminder 💪",
  body: "Don't miss your workout today",
  channelId: "reminders",
  data: {
    habitId: 5
  }
}
```

---

# 🔥 Example 6: Banking App Alert

```javascript id="ch9"
{
  to: expoPushToken,
  title: "Money Received 💰",
  body: "₹2000 credited",
  channelId: "orders",
  data: {
    transactionId: 9001
  }
}
```

---

# 8. Full Real Architecture (IMPORTANT)

```text
Backend Category
     ↓
Select Channel
     ↓
Expo Push API
     ↓
Android System Channel
     ↓
User Controls Notification
```

---

# 9. Real App Mapping (VERY IMPORTANT)

## WhatsApp

```text
messages → chat channel
groups   → group channel
calls    → call channel
```

---

## E-commerce (Amazon)

```text
orders     → order updates
delivery   → delivery updates
promo      → marketing
system     → app updates
```

---

## Habit Tracker

```text
reminders → daily habits
streaks   → achievements
alerts    → missed tasks
```

---

# 10. Why Channels Are Powerful?

## Without channels

User sees:

```text
1 toggle only
```

---

## With channels

User controls:

```text
Messages   → ON
Promotions → OFF
Orders     → ON
Reminders  → ON
```

---

# 11. Best Practice (PRODUCTION LEVEL)

✔ Always create channels at app start
✔ Never reuse one channel for everything
✔ Separate:

```text
messages
orders
promotions
alerts
system
```

✔ Use HIGH importance only for critical notifications
✔ Use DEFAULT for normal updates
✔ Use LOW for marketing

---

# 12. Common Mistakes

❌ Using only one channel
❌ Putting all notifications in “default”
❌ No vibration/sound control
❌ Not separating marketing vs messages

---

# 13. Interview Answer (Short)

### What is Notification Channel?

A notification channel is an Android system feature that groups notifications into categories so users can control sound, vibration, and importance for each type separately.

---

# 14. Final Mental Model

Think like this:

```text
CATEGORY (App Logic)
   ↓
CHANNEL (Android System)
   ↓
USER CONTROL
```

---

If you want next level understanding, I can also show:

* 🔥 Backend notification router (Node.js)
* 🔥 Real WhatsApp-like architecture
* 🔥 Database design for channels + notifications
* 🔥 How Instagram routes millions of notifications

Just tell 👍
