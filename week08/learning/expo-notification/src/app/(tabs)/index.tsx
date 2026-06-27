import { useState, useEffect } from "react";
import {
  Text,
  View,
  Button,
  Platform,
  Alert,
  ActivityIndicator,
} from "react-native";
import * as Notifications from "expo-notifications";
import Constants from "expo-constants";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldPlaySound: true,
    shouldSetBadge: true,
    shouldShowBanner: true,
    shouldShowList: true,
  }),
});
async function sendPushNotification(expoPushToken: string) {
  if (!expoPushToken) {
    Alert.alert("Error", "Push token is not available yet.");
    return;
  }

  // 🔍 basic validation
  if (!expoPushToken.startsWith("ExponentPushToken")) {
    Alert.alert("Error", "Invalid Expo push token format");
    return;
  }

  try {
    const message = {
      to: expoPushToken,
      sound: "default",
      title: "Original Title",
      body: "And here is the body!",
      data: { someData: "goes here" },
    };

    const response = await fetch("https://exp.host/--/api/v2/push/send", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(message),
    });

    const result = await response.json();

    console.log("Push response:", result);

    // 🚨 check Expo response status
    if (result?.data?.status === "error") {
      Alert.alert("Push Error", result?.data?.message || "Unknown error");
    }
  } catch (error) {
    console.log("Push send failed:", error);
    Alert.alert("Error", "Failed to send push notification");
  }
}
/**
 * ✅ CLEAN PERMISSION HANDLER
 */
async function registerForPushNotificationsAsync() {
  try {
    if (Platform.OS === "android") {
      await Notifications.setNotificationChannelAsync("default", {
        name: "default",
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: "#FF231F7C",
      });
    }

    // 🔐 CHECK EXISTING PERMISSION
    let { status } = await Notifications.getPermissionsAsync();

    // 🔐 REQUEST IF NOT GRANTED
    if (status !== "granted") {
      const response = await Notifications.requestPermissionsAsync();
      status = response.status;
    }

    // ❌ USER DENIED
    if (status !== "granted") {
      Alert.alert(
        "Permission Required",
        "Enable notifications to receive updates.",
      );
      return null;
    }

    // 📦 GET PROJECT ID
    const projectId =
      Constants?.expoConfig?.extra?.eas?.projectId ??
      Constants?.easConfig?.projectId;

    if (!projectId) {
      Alert.alert("Error", "Project ID not found");
      return null;
    }

    // 🔑 GET PUSH TOKEN
    const token = (await Notifications.getExpoPushTokenAsync({ projectId }))
      .data;

    console.log("Expo Push Token:", token);
    return token;
  } catch (error) {
    console.log(error);
    Alert.alert("Error", "Failed to register for push notifications");
    return null;
  }
}

export default function App() {
  const [expoPushToken, setExpoPushToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [notification, setNotification] =
    useState<Notifications.Notification | null>(null);

useEffect(() => {
  // ============================================
  // Register device for push notifications
  // ============================================
  async function init() {
    // Ask for notification permission and get Expo Push Token
    const token = await registerForPushNotificationsAsync();

    // Save the push token in state
    setExpoPushToken(token);

    console.log("Expo Push Token:", token);

    // Hide loading state after initialization
    setLoading(false);
  }

  init();

  // ============================================
  // Listener 1: Notification RECEIVED
  // ============================================
  // Triggered whenever a notification arrives
  // while the app is in the foreground.
  //
  // Examples:
  // - Local notification fires
  // - Push notification arrives
  //
  // This listener DOES NOT mean the user tapped it.
  //
  const receivedSubscription =
    Notifications.addNotificationReceivedListener((notification) => {
      console.log("📩 Notification Received");
      console.log(notification);

      // Save latest notification
      setNotification(notification);
    });

  // ============================================
  // Listener 2: Notification RESPONSE
  // ============================================
  // Triggered when the user interacts with
  // (taps or presses an action button on)
  // a notification.
  //
  // Works when:
  // - App is closed
  // - App is in background
  // - App is in foreground
  //
  // Useful for:
  // - Deep linking
  // - Navigation
  // - Opening a specific screen
  //
  const responseSubscription =
    Notifications.addNotificationResponseReceivedListener((response) => {
      console.log("👆 Notification Tapped");
      console.log(response);

      // Notification object
      console.log(
        "Notification:",
        response.notification
      );

      // Custom data sent with notification
      console.log(
        "Payload:",
        response.notification.request.content.data
      );

      // Action identifier
      console.log(
        "Action:",
        response.actionIdentifier
      );

      // Example:
      // router.push("/habit-details");
    });

  // ============================================
  // Check if app was OPENED from a notification
  // ============================================
  // This runs once when the app starts.
  //
  // Useful when:
  // User taps a notification while
  // the app is completely terminated.
  //
  Notifications.getLastNotificationResponseAsync().then((response) => {
    if (!response) return;

    console.log("🚀 App opened from notification");
    console.log(response);

    // Example:
    // router.push("/work");
  });

  // ============================================
  // Cleanup listeners
  // ============================================
  return () => {
    receivedSubscription.remove();
    responseSubscription.remove();
  };
}, []);



  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "space-around",
      }}
    >
      <Text selectable>Token: {expoPushToken ?? "No token available"}</Text>

      {loading && <ActivityIndicator size="large" />}

      <View>
        <Text>Title: {notification?.request.content.title}</Text>
        <Text>Body: {notification?.request.content.body}</Text>
        <Text>Data: {JSON.stringify(notification?.request.content.data)}</Text>
      </View>

      <Button
        title="Send Notification"
        disabled={!expoPushToken}
        onPress={() => sendPushNotification(expoPushToken!)}
      />
    </View>
  );
}
