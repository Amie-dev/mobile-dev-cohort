import { StyleSheet, Text, View, Platform, Alert } from "react-native";
import React from "react";
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
  } catch (error) {
    console.log(error);
    Alert.alert("Error", "Failed to register for push notifications");
    return null;
  }
}

const push = () => {
  return (
    <View>
      <Text>push</Text>
    </View>
  );
};

export default push;

const styles = StyleSheet.create({});
