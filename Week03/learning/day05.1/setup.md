# 🚀 Full Setup — Expo SDK 55 + React Navigation + TypeScript

---

# ✅ Step 1 — Create Expo Project

```bash
npx create-expo-app@latest day05 -t expo-template-blank-typescript@sdk-55
```

---

# ✅ Step 2 — Go Inside Project

```bash
cd day05
```

---

# ✅ Step 3 — Install React Navigation Core

```bash
npm install @react-navigation/native
```

---

# ✅ Step 4 — Install Navigation Types

## Native Stack

```bash
npm install @react-navigation/native-stack
```

---

## Stack Navigator

```bash
npm install @react-navigation/stack
```

---

## Bottom Tabs

```bash
npm install @react-navigation/bottom-tabs
```

---

## Drawer Navigator

```bash
npm install @react-navigation/drawer
```

---

## Material Top Tabs

```bash
npm install @react-navigation/material-top-tabs
```

---

# ✅ Step 5 — Install Expo Compatible Native Dependencies

VERY IMPORTANT ⚠️

Use `expo install`

```bash
npx expo install react-native-screens
```

```bash
npx expo install react-native-safe-area-context
```

```bash
npx expo install react-native-gesture-handler
```

```bash
npx expo install react-native-reanimated
```

---

# ✅ Step 6 — Install Extra Packages

```bash
npm install @react-navigation/elements
```

```bash
npm install @react-native-masked-view/masked-view
```

```bash
npm install @expo/vector-icons
```

```bash
npm install react-native-worklets
```

---

# ✅ Step 7 — Install TypeScript Types

```bash
npm install --save-dev typescript @types/react
```

---

# ✅ Step 8 — Create babel.config.js

Create file:

```txt
babel.config.js
```

Add:

```js
module.exports = function (api) {
  api.cache(true);

  return {
    presets: ["babel-preset-expo"],
    plugins: ["react-native-reanimated/plugin"],
  };
};
```

---

# ✅ Step 9 — Setup index.ts

Open:

```txt
index.ts
```

Replace with:

```ts
import "react-native-gesture-handler";
import { registerRootComponent } from "expo";

import App from "./App";

registerRootComponent(App);
```

---

# ✅ Step 10 — Create App.tsx

```tsx
import DynamicStackNavigator from "./src/navigator/stack/DynamicStackNavigator";

export default function App() {
  return <DynamicStackNavigator />;
}
```

---

# ✅ Step 11 — Create Folder Structure

```txt
src
 ├── navigator
 │     └── stack
 │            └── DynamicStackNavigator.tsx
 │
 └── screens
       ├── HomeScreen.tsx
       └── ProfileScreen.tsx
```

---

# ✅ Step 12 — Create HomeScreen.tsx

```tsx
import { View, Text, Button } from "react-native";

export default function HomeScreen({ navigation }: any) {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>Home Screen</Text>

      <Button
        title="Go To Profile"
        onPress={() => navigation.navigate("Profile")}
      />
    </View>
  );
}
```

---

# ✅ Step 13 — Create ProfileScreen.tsx

```tsx
import { View, Text } from "react-native";

export default function ProfileScreen() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>Profile Screen</Text>
    </View>
  );
}
```

---

# ✅ Step 14 — Create DynamicStackNavigator.tsx

```tsx
import { NavigationContainer } from "@react-navigation/native";

import { createNativeStackNavigator } from "@react-navigation/native-stack";

import HomeScreen from "../../screens/HomeScreen";
import ProfileScreen from "../../screens/ProfileScreen";

const Stack = createNativeStackNavigator();

export default function DynamicStackNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
        />

        <Stack.Screen
          name="Profile"
          component={ProfileScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
```

---

# ✅ Step 15 — Start Expo

```bash
npx expo start -c
```

---

# ✅ Step 16 — Run Android

Press:

```txt
a
```

inside terminal.

OR:

```bash
npm run android
```

---

# ✅ Important Rules

## ❌ NEVER DO THIS

```bash
npm install react-native
```

inside Expo projects.

Expo controls React Native version.

---

## ✅ Always Use

```bash
npx expo install
```

for native packages.

---

# ✅ Final Working Navigation Packages

| Package                  | Purpose             |
| ------------------------ | ------------------- |
| @react-navigation/native | Core                |
| native-stack             | Fast stack          |
| stack                    | JS stack            |
| bottom-tabs              | Bottom tabs         |
| drawer                   | Drawer menu         |
| material-top-tabs        | Top tabs            |
| react-native-screens     | Native optimization |
| gesture-handler          | Gestures            |
| reanimated               | Animations          |
