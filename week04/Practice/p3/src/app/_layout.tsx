import { View } from "react-native";
import { Stack } from "expo-router";

import { DBProvider } from "@/context/DBProvider";

export default function RootLayout() {
  return (
    <DBProvider>
      <View style={{ flex: 1 }}>
        <Stack>
          <Stack.Screen
            name="index"
            options={{ headerShown: false }}
          />

          <Stack.Screen
            name="(tabs)"
            options={{ headerShown: false }}
          />

          <Stack.Screen
            name="explore"
            options={{ headerShown: false }}
          />

          <Stack.Screen
            name="files/[id]/index"
            options={{
              title: "File Details",
              headerShown: true,
            }}
          />

          <Stack.Screen
            name="files/[id]/edit"
            options={{
              title: "Edit File",
              headerShown: true,
            }}
          />
        </Stack>
      </View>
    </DBProvider>
  );
}