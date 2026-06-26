import { useEffect } from "react";
import * as Notifications from "expo-notifications";
import { router } from "expo-router";

export function useNotifications() {
  useEffect(() => {
    const sub = Notifications.addNotificationResponseReceivedListener(
      (response) => {
        const data = response.notification.request.content.data;

        if (data?.screen && data?.habitId) {
          router.push({
            pathname: data.screen,
            params: { id: data.habitId },
          });
        }
      }
    );

    return () => sub.remove();
  }, []);
}