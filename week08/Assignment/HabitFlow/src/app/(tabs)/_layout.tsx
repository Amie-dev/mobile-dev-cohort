import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,

        // 👇 Active / Inactive colors
        tabBarActiveTintColor: "#4CAF50",   // green (active tab)
        tabBarInactiveTintColor: "#A0A0A0", // grey (inactive tab)

        // tabBarStyle: {
        //   backgroundColor: "#ffffff",
        //   borderTopWidth: 0,
        //   height: 60,
        //   paddingBottom: 8,
        //   paddingTop: 5,
        // },
      }}
    >
      {/* HOME / DASHBOARD */}
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="grid-outline" size={size} color={color} />
          ),
        }}
      />

      {/* WORK / TIMER */}
      <Tabs.Screen
        name="work"
        options={{
          title: "Work",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="timer-outline" size={size} color={color} />
          ),
        }}
      />

      {/* SETTINGS */}
      <Tabs.Screen
        name="setting"
        options={{
          title: "Settings",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="settings-outline" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}