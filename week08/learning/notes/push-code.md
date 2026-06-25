Got it — you want a **single production-style React Native Expo example** that shows:

* Permissions
* Token generation
* Notification listener
* Push sending API
* AND all real-world scenarios (chat, orders, marketing, reminders)
* PLUS channel + category usage

Below is a **clean “senior-level push notification system example”**.

---

# 🚀 FULL PUSH NOTIFICATION SYSTEM (ALL SCENARIOS + CHANNELS)

## 🧠 Concept Used Here

We simulate real apps like:

* WhatsApp → messages channel
* Swiggy → orders channel
* Amazon → promotions channel
* Habit app → reminders channel

---

# 📦 COMPLETE CODE (PRODUCTION STYLE)

```tsx
import { useState, useEffect } from "react";
import { Text, View, Button, Platform, Alert, ActivityIndicator } from "react-native";
import * as Notifications from "expo-notifications";
import Constants from "expo-constants";

/**
 * ================================
 * 1. NOTIFICATION HANDLER
 * ================================
 */
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldPlaySound: true,
    shouldSetBadge: true,
    shouldShowBanner: true,
    shouldShowList: true,
  }),
});

/**
 * ================================
 * 2. CHANNEL SETUP (ANDROID)
 * ================================
 */
async function setupChannels() {
  if (Platform.OS === "android") {
    await Notifications.setNotificationChannelAsync("messages", {
      name: "Messages",
      importance: Notifications.AndroidImportance.MAX,
    });

    await Notifications.setNotificationChannelAsync("orders", {
      name: "Orders",
      importance: Notifications.AndroidImportance.HIGH,
    });

    await Notifications.setNotificationChannelAsync("reminders", {
      name: "Reminders",
      importance: Notifications.AndroidImportance.DEFAULT,
    });

    await Notifications.setNotificationChannelAsync("marketing", {
      name: "Marketing",
      importance: Notifications.AndroidImportance.LOW,
    });
  }
}

/**
 * ================================
 * 3. REGISTER PUSH TOKEN
 * ================================
 */
async function registerForPushNotificationsAsync() {
  try {
    await setupChannels();

    let { status } = await Notifications.getPermissionsAsync();

    if (status !== "granted") {
      const req = await Notifications.requestPermissionsAsync();
      status = req.status;
    }

    if (status !== "granted") {
      Alert.alert("Permission required");
      return null;
    }

    const projectId =
      Constants?.expoConfig?.extra?.eas?.projectId ??
      Constants?.easConfig?.projectId;

    if (!projectId) {
      Alert.alert("Project ID missing");
      return null;
    }

    const token = (
      await Notifications.getExpoPushTokenAsync({ projectId })
    ).data;

    console.log("TOKEN:", token);
    return token;
  } catch (err) {
    console.log(err);
    return null;
  }
}

/**
 * ================================
 * 4. PUSH NOTIFICATION SENDER
 * (MULTIPLE REAL WORLD SCENARIOS)
 * ================================
 */
async function sendPushNotification(token: string, type: string) {
  let message: any = {
    to: token,
    sound: "default",
  };

  /**
   * =========================
   * CASE 1: CHAT MESSAGE
   * =========================
   */
  if (type === "chat") {
    message = {
      ...message,
      title: "John 👤",
      body: "Hey! Are you free?",
      channelId: "messages",
      data: {
        screen: "Chat",
        chatId: 12,
      },
    };
  }

  /**
   * =========================
   * CASE 2: ORDER UPDATE
   * =========================
   */
  else if (type === "order") {
    message = {
      ...message,
      title: "Order Confirmed 🍕",
      body: "Your food is being prepared",
      channelId: "orders",
      data: {
        screen: "OrderDetails",
        orderId: 101,
      },
    };
  }

  /**
   * =========================
   * CASE 3: DELIVERY UPDATE
   * =========================
   */
  else if (type === "delivery") {
    message = {
      ...message,
      title: "Out for Delivery 🚴",
      body: "Your order is on the way",
      channelId: "orders",
      data: {
        orderId: 101,
        status: "out_for_delivery",
      },
    };
  }

  /**
   * =========================
   * CASE 4: MARKETING
   * =========================
   */
  else if (type === "promo") {
    message = {
      ...message,
      title: "🔥 Big Sale",
      body: "Flat 70% OFF today only",
      channelId: "marketing",
      data: {
        screen: "Offers",
      },
    };
  }

  /**
   * =========================
   * CASE 5: REMINDER
   * =========================
   */
  else if (type === "reminder") {
    message = {
      ...message,
      title: "💪 Workout Time",
      body: "Don't miss your daily workout",
      channelId: "reminders",
      data: {
        habitId: 5,
      },
    };
  }

  const res = await fetch(
    "https://exp.host/--/api/v2/push/send",
    {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(message),
    }
  );

  return res.json();
}

/**
 * ================================
 * 5. MAIN APP
 * ================================
 */
export default function App() {
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [lastNotification, setLastNotification] = useState<any>(null);

  useEffect(() => {
    async function init() {
      const t = await registerForPushNotificationsAsync();
      setToken(t);
      setLoading(false);
    }

    init();

    /**
     * =========================
     * RECEIVE NOTIFICATION
     * =========================
     */
    const sub1 = Notifications.addNotificationReceivedListener((n) => {
      setLastNotification(n);
    });

    /**
     * =========================
     * HANDLE CLICK (DEEPLINK)
     * =========================
     */
    const sub2 =
      Notifications.addNotificationResponseReceivedListener((response) => {
        const data =
          response.notification.request.content.data;

        console.log("NAVIGATE TO:", data);
      });

    return () => {
      sub1.remove();
      sub2.remove();
    };
  }, []);

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "space-around",
        alignItems: "center",
      }}
    >
      {loading && <ActivityIndicator size="large" />}

      <Text selectable>
        TOKEN:
        {"\n"}
        {token ?? "No Token"}
      </Text>

      <View>
        <Text>Last Notification:</Text>
        <Text>
          {lastNotification?.request?.content?.title}
        </Text>
        <Text>
          {lastNotification?.request?.content?.body}
        </Text>
      </View>

      {/* =========================
          TEST BUTTONS (ALL SCENARIOS)
         ========================= */}

      <Button
        title="Chat Message"
        onPress={() =>
          sendPushNotification(token!, "chat")
        }
      />

      <Button
        title="Order Confirm"
        onPress={() =>
          sendPushNotification(token!, "order")
        }
      />

      <Button
        title="Delivery Update"
        onPress={() =>
          sendPushNotification(token!, "delivery")
        }
      />

      <Button
        title="Promo Offer"
        onPress={() =>
          sendPushNotification(token!, "promo")
        }
      />

      <Button
        title="Reminder"
        onPress={() =>
          sendPushNotification(token!, "reminder")
        }
      />
    </View>
  );
}
```

---

# 🧠 WHAT YOU LEARN FROM THIS

## 1. Channel System

```text
messages  → chat apps
orders    → delivery apps
marketing → ads
reminders → habit apps
```

---

## 2. Category System (Backend Logic)

```text
chat      → messages channel
order     → orders channel
promo     → marketing channel
```

---

## 3. Real App Behavior

| App      | Channel   |
| -------- | --------- |
| WhatsApp | messages  |
| Swiggy   | orders    |
| Amazon   | marketing |
| Duolingo | reminders |

---

## 4. Deep Linking Pattern

```ts
data: {
  screen: "Chat",
  chatId: 12
}
```

👉 Tap notification → open exact screen

---

# 🚀 FINAL SENIOR CONCEPT

A real push system always has:

```text
Frontend → Token
Backend → Category Logic
Notification Service → Expo
Device → Channel handling
User → Control
```

---

If you want next level, I can build:

🔥 Full backend (Node.js push server)
🔥 Database design for notifications
🔥 WhatsApp clone architecture
🔥 Real-time notification system (WebSocket + Push hybrid)

Just tell 👍
