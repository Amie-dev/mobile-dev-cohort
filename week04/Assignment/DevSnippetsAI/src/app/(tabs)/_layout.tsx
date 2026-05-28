import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

import { useTheme } from "@/context/ThemeContext";
import { Pressable, Text } from "react-native";

export default function TabLayout() {
  const { theme, toggleTheme, isDarkMode } = useTheme();

  return (
    <Tabs
      screenOptions={{
        headerShown: true,

        headerStyle: {
          backgroundColor: theme.background,
        },

        headerTintColor: theme.text,

        headerTitleStyle: {
          color: theme.text,
          fontWeight: "700",
        },

        tabBarStyle: {
          backgroundColor: theme.background,
          borderTopColor: theme.border,
        },

        tabBarActiveTintColor: theme.primary,
        tabBarInactiveTintColor: theme.mutedText,
        headerRight(props) {
          return (
            <Pressable onPress={toggleTheme}>
              {/* <Ionicons
            name={
              isDarkMode
                ? "moon-outline"
                : "sunny-outline"
            }
            size={22}
            color={theme.primary}
          /> */}
              <Text
                style={[
                  {
                    fontSize: 25,
                    paddingHorizontal: 10,
                    alignItems: "center",
                  },
                ]}
              >
                {isDarkMode ? "🌙" : "☀️"}
              </Text>
            </Pressable>
          );
        },
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "Snippets",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="code-slash" color={color} size={size} />
          ),
        }}
      />

      <Tabs.Screen
        name="favorites"
        options={{
          title: "Favorites",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="star" color={color} size={size} />
          ),
        }}
      />

      <Tabs.Screen
        name="files"
        options={{
          title: "Files",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="folder" color={color} size={size} />
          ),
        }}
      />

      <Tabs.Screen
        name="settings"
        options={{
          title: "Settings",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="settings" color={color} size={size} />
          ),
        }}
      />
    </Tabs>
  );
}
