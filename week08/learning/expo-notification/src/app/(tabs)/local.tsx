import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  ScrollView,
  Alert,
  Platform,
} from "react-native";
import * as Notifications from "expo-notifications";

/**
 * 🔔 GLOBAL NOTIFICATION HANDLER (foreground behavior)
 */
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowBanner: true,
    shouldShowList: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

const Local = () => {
  const [lastNotification, setLastNotification] = useState<any>(null);

  // --------------------------------------------------
  // 📩 LISTENERS (CORE NOTIFICATION LIFECYCLE)
  // --------------------------------------------------
  useEffect(() => {
    /**
     * WHEN NOTIFICATION ARRIVES (APP OPEN)
     */
    const receivedSub = Notifications.addNotificationReceivedListener(
      (notification) => {
        setLastNotification(notification);
        console.log("📩 Received:", notification);
      },
    );

    /**
     * WHEN USER TAPS NOTIFICATION
     */
    const responseSub = Notifications.addNotificationResponseReceivedListener(
      (response) => {
        const data = response.notification.request.content.data;

        Alert.alert("👆 Notification Clicked", JSON.stringify(data));

        // 👉 Here you normally:
        // navigate based on data.type
        // mark notification read
        // fetch latest data
      },
    );

    return () => {
      receivedSub.remove();
      responseSub.remove();
    };
  }, []);

  // --------------------------------------------------
  // 🔥 ANDROID CHANNELS (CATEGORY SYSTEM)
  // --------------------------------------------------
  const createChannels = async () => {
    if (Platform.OS !== "android") return;

    // 💬 CHAT CHANNEL
    await Notifications.setNotificationChannelAsync("chat", {
      name: "Chat Messages",
      importance: Notifications.AndroidImportance.MAX,
      sound: "default",
      vibrationPattern: [0, 250, 250, 250],
    });

    // 📦 ORDER CHANNEL
    await Notifications.setNotificationChannelAsync("order", {
      name: "Order Updates",
      importance: Notifications.AndroidImportance.HIGH,
      sound: "default",
    });

    // ⏰ REMINDER CHANNEL
    await Notifications.setNotificationChannelAsync("reminder", {
      name: "Reminders",
      importance: Notifications.AndroidImportance.DEFAULT,
      sound: "default",
    });

    Alert.alert("Channels Created ✅");
  };

  // --------------------------------------------------
  // ⚡ 1. INSTANT NOTIFICATION
  // --------------------------------------------------
  const sendInstant = async () => {
    await Notifications.scheduleNotificationAsync({
      identifier: "instant-1",
      content: {
        title: "⚡ Instant",
        body: "Triggered immediately",
        data: { type: "instant" },
        sound: "default",
      },
      trigger: null,
    });
  };

  // --------------------------------------------------
  // ⏳ 2. DELAY NOTIFICATION
  // --------------------------------------------------
  const sendDelay = async () => {
    await Notifications.scheduleNotificationAsync({
      identifier: "delay-1",
      content: {
        title: "⏳ Delay",
        body: "After 5 seconds",
        data: { type: "delay" },
        sound: "default",
      },
      trigger: {
        type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL,
        seconds: 5,
      },
    });
  };

  // --------------------------------------------------
  // 🔁 3. REPEATING NOTIFICATION
  // --------------------------------------------------
  const sendRepeat = async () => {
    await Notifications.scheduleNotificationAsync({
      identifier: "repeat-1",
      content: {
        title: "🔁 Daily Reminder",
        body: "Drink water / Workout",
        data: { type: "repeat" },
        sound: "default",
      },
      trigger: {
        type: Notifications.SchedulableTriggerInputTypes.DAILY,
        hour: 9,
        minute: 0,
        // repeats: true,
      },
    });

    Alert.alert("Scheduled daily reminder ⏰");
  };

  // --------------------------------------------------
  // 📅 4. CALENDAR NOTIFICATION
  // --------------------------------------------------
  const sendCalendar = async () => {
    const date = new Date();
    date.setSeconds(date.getSeconds() + 10);

    await Notifications.scheduleNotificationAsync({
      identifier: "calendar-1",
      content: {
        title: "📅 Calendar",
        body: "Time-based trigger",
        data: { type: "calendar" },
        sound: "default",
      },
      trigger: {
        type: Notifications.SchedulableTriggerInputTypes.DATE,
        date,
      },
    });
  };

  // --------------------------------------------------
  // 💬 5. CHAT NOTIFICATION (CATEGORY)
  // --------------------------------------------------
  const sendChatNotification = async () => {
    await Notifications.scheduleNotificationAsync({
      identifier: "chat-1",
      content: {
        title: "💬 New Message",
        body: "John sent you a message",
        data: {
          type: "chat",
          chatId: 101,
        },
        sound: "default",
      },
      trigger: null,
    });
  };

  // --------------------------------------------------
  // 📦 6. ORDER NOTIFICATION
  // --------------------------------------------------
  const sendOrderNotification = async () => {
    await Notifications.scheduleNotificationAsync({
      identifier: "order-1",
      content: {
        title: "📦 Order Update",
        body: "Food is being prepared",
        data: {
          type: "order",
          orderId: 555,
        },
        sound: "default",
        // categoryIdentifier: "order-1",//os
      },

      trigger: {
        type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL,
        seconds: 3,
      },
    });
  };

  // --------------------------------------------------
  // ⏰ 7. REMINDER NOTIFICATION
  // --------------------------------------------------
  const sendReminder = async () => {
    await Notifications.scheduleNotificationAsync({
      identifier: "reminder-1",
      content: {
        title: "⏰ Reminder",
        body: "Drink water",
        data: { type: "reminder" },
        sound: "default",
      },
      trigger: {
        type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL,

        seconds: 5,
      },
    });
  };

  // --------------------------------------------------
  // ❌ CANCEL BY ID
  // --------------------------------------------------
  const cancelById = async (id: string) => {
    await Notifications.cancelScheduledNotificationAsync(id);
    Alert.alert(`Cancelled: ${id}`);
  };

  // --------------------------------------------------
  // ❌ CANCEL ALL
  // --------------------------------------------------
  const cancelAll = async () => {
    await Notifications.cancelAllScheduledNotificationsAsync();
    Alert.alert("All notifications cancelled");
  };

  // --------------------------------------------------
  // 📋 UI
  // --------------------------------------------------
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>📱 Unified Notification System</Text>

      <View style={styles.card}>
        <Button title="🔧 Create Channels" onPress={createChannels} />
      </View>

      <View style={styles.card}>
        <Button title="⚡ Instant" onPress={sendInstant} />
      </View>

      <View style={styles.card}>
        <Button title="⏳ Delay (5s)" onPress={sendDelay} />
      </View>

      <View style={styles.card}>
        <Button title="🔁 Repeat Daily" onPress={sendRepeat} />
      </View>

      <View style={styles.card}>
        <Button title="📅 Calendar (10s)" onPress={sendCalendar} />
      </View>

      <View style={styles.card}>
        <Button title="💬 Chat Notification" onPress={sendChatNotification} />
      </View>

      <View style={styles.card}>
        <Button title="📦 Order Notification" onPress={sendOrderNotification} />
      </View>

      <View style={styles.card}>
        <Button title="⏰ Reminder" onPress={sendReminder} />
      </View>

      <View style={styles.card}>
        <Button
          title="❌ Cancel CHAT-1"
          color="orange"
          onPress={() => cancelById("chat-1")}
        />
      </View>

      <View style={styles.card}>
        <Button title="🧹 Cancel ALL" color="red" onPress={cancelAll} />
      </View>

      {/* LAST NOTIFICATION */}
      <View style={styles.notificationBox}>
        <Text style={styles.subTitle}>📩 Last Notification</Text>

        {lastNotification ? (
          <>
            <Text>Title: {lastNotification.request.content.title}</Text>
            <Text>Body: {lastNotification.request.content.body}</Text>
            <Text>
              Data: {JSON.stringify(lastNotification.request.content.data)}
            </Text>
          </>
        ) : (
          <Text>No notification received yet</Text>
        )}
      </View>
    </ScrollView>
  );
};

export default Local;

// --------------------------------------------------
// 🎨 STYLES
// --------------------------------------------------
const styles = StyleSheet.create({
  container: {
    padding: 20,
    gap: 12,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  card: {
    marginVertical: 5,
  },
  notificationBox: {
    marginTop: 20,
    padding: 15,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    backgroundColor: "#f9f9f9",
  },
  subTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
  },
});
