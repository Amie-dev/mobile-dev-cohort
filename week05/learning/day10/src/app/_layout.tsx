import { Stack } from "expo-router";
import { useEffect } from "react";
import { View, StatusBar } from "react-native";
import * as SystemUI from "expo-system-ui";

const LayOutContent = () => {
  // useEffect(() => {
  //   SystemUI.setBackgroundColorAsync("#000000"); // system nav bar dark
  // }, []);

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#000000" barStyle="light-content" />

      <Stack
        screenOptions={{
          headerStyle: { backgroundColor: "#000000" },
          headerTintColor: "#fff",
          headerTitleStyle: { fontWeight: "bold" },
        }}
      >
        <Stack.Screen
          name="index"
          options={{
            headerTitle: "Sensors",
          }}
        />
        <Stack.Screen
          name="(sensors)"
          options={{
            headerShown: false,
          }}
        />
      </Stack>
    </View>
  );
};

export default function RootLayout() {
  return <LayOutContent />;
}

const styles = {
  container: {
    flex: 1,
    backgroundColor: "#000000", // solid black background
  },
};
