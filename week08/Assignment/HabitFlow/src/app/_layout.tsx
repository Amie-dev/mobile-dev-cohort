import { HabitsProvider } from "@/hooks/use-habits";
import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <HabitsProvider>
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen
          name="index"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="new"
          options={{
            headerShown: true,
          }}
        />
      </Stack>
    </HabitsProvider>
  );
}
