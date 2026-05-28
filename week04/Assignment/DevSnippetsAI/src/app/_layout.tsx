import { useEffect } from "react";
import { Platform, StatusBar, View } from "react-native";
import { Stack } from "expo-router";
import * as NavigationBar from "expo-navigation-bar";

import { ThemeProvider, useTheme } from "@/context/ThemeContext";

function AppContent() {
  const { isDarkMode, theme } = useTheme();

  useEffect(() => {
    if (Platform.OS === "android") {
      NavigationBar.setStyle(isDarkMode ? "dark" : "light");
    }
  }, [isDarkMode]);

  return (
    <View style={{
       flex: 1, 
       backgroundColor: theme.background 
       }}>
      <StatusBar
        backgroundColor={theme.background}
        barStyle={isDarkMode ? "light-content" : "dark-content"}
      />

      <Stack
        screenOptions={{
          contentStyle: {
            backgroundColor: theme.background,
          },

          headerStyle: {
            backgroundColor: theme.background,
          },

          headerTintColor: theme.text,

          headerTitleStyle: {
            color: theme.text,
            fontWeight: "700",
          },
        }}
      >
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />

        <Stack.Screen
          name="snippets/create"
          options={{
            title: "Create Snippet",
            headerBackTitle: "Back",
          }}
        />

        <Stack.Screen
          name="snippets/[id]"
          options={{
            title: "Snippet Details",
            headerBackTitle: "Back",
          }}
        />

        <Stack.Screen
          name="snippets/edit/[id]"
          options={{
            title: "Edit Snippet",
            headerBackTitle: "Back",
          }}
        />

        <Stack.Screen
          name="ai/explain/[id]"
          options={{
            title: "AI Explanation",
            headerBackTitle: "Back",
          }}
        />
      </Stack>
    </View>
  );
}

export default function RootLayout() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}
