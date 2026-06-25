import { Tabs } from "expo-router";

export default function RootLayout() {
  return (
    <Tabs screenOptions={{}}>
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
        }}
      />
      <Tabs.Screen
        name="local"
        options={{
          title: "Local",
        }}
      />
      <Tabs.Screen
        name="push"
        options={{
          title: "Push",
        }}
      />
    </Tabs>
  );
}
