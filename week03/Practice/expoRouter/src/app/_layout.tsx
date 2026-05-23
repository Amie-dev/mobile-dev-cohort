import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: true,
      }}
    >
      <Stack.Screen name="index" />
      <Stack.Screen name="explore"
      options={{
        title:"Explore Screen",
        headerBackButtonDisplayMode:"minimal"
      }}/>
    </Stack>
  );
}
