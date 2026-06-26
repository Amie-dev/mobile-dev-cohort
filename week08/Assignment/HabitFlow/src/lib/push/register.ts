import * as Notifications from "expo-notifications";

export async function getExpoPushToken() {
  
  const token = await Notifications.getExpoPushTokenAsync();
  return token.data;
}