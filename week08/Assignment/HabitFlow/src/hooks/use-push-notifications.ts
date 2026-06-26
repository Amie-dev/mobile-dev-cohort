import { useEffect, useState } from "react";
import { getExpoPushToken } from "../lib/push/register";
import * as Notifications from "expo-notifications";

export function usePushNotifications() {
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    async function register() {
      const t = await getExpoPushToken();
      setToken(t);
    }

    register();
  }, []);

  return {
    token,
  };
}