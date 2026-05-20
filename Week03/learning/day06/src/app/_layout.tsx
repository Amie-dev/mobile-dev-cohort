//this render all stack
// import { Stack } from "expo-router";

// export default function RootLayout() {
//   return <Stack />;
// }

// import { Slot } from "expo-router";

// export default function RootLayout() {
//   return <Slot />;
// }

import { Stack } from "expo-router";

export default function RootLayout() {
  const isLoggIn = true;
  return (
    <Stack>
      <Stack.Protected guard={isLoggIn}>
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
      </Stack.Protected>

      <Stack.Screen name="index" />
      <Stack.Screen name="about" options={{}} />
    </Stack>
  );
}
