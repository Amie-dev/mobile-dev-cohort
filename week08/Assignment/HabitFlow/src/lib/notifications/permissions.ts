import * as Notifications from "expo-notifications";

export async function requestNotificationPermission() {
  const settings = await Notifications.getPermissionsAsync();

  if (settings.status === "granted") return true;

  const req = await Notifications.requestPermissionsAsync();

  return req.status === "granted";
}