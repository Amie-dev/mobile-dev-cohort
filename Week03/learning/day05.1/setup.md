# 🚀 Full React Navigation Setup

## Expo SDK 55 + TypeScript + Babel + Reanimated

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

# ✅ Step 4 — Install Navigators

## Native Stack Navigator

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

# ✅ Step 5 — Install Expo Compatible Native Packages

⚠️ IMPORTANT
Use `expo install` for native dependencies.

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

```bash
npm install --save-dev babel-preset-expo
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
 │     ├── stack
 │     │      └── DynamicStackNavigator.tsx
 │     │
 │     ├── tabs
 │     │
 │     └── drawer
 │
 ├── screens
 │     ├── HomeScreen.tsx
 │     └── ProfileScreen.tsx
 │
 ├── components
 │
 ├── constants
 │
 ├── hooks
 │
 └── assets
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

# ✅ Step 15 — Start Expo Server

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

## ❌ NEVER INSTALL THESE MANUALLY

```bash
npm install react-native
```

```bash
npm install react
```

```bash
npm install expo
```

Expo controls those versions automatically.

---

# ✅ Use Correct Installation Method

## Native Packages

Use:

```bash
npx expo install
```

Examples:

* react-native-screens
* gesture-handler
* reanimated

---

## JS Packages

Use:

```bash
npm install
```

Examples:

* react-navigation
* axios
* zustand

---

# ✅ Final Installed Navigation Packages

| Package                             | Purpose              |
| ----------------------------------- | -------------------- |
| @react-navigation/native            | Navigation core      |
| @react-navigation/native-stack      | Fast native stack    |
| @react-navigation/stack             | JS stack             |
| @react-navigation/bottom-tabs       | Bottom tabs          |
| @react-navigation/drawer            | Drawer menu          |
| @react-navigation/material-top-tabs | Top tabs             |
| react-native-screens                | Native optimization  |
| react-native-safe-area-context      | Safe area support    |
| react-native-gesture-handler        | Gesture support      |
| react-native-reanimated             | Smooth animations    |
| react-native-worklets               | Reanimated support   |
| @expo/vector-icons                  | Icons                |
| @react-navigation/elements          | Shared navigation UI |

---

# ✅ Recommended Learning Order

1️⃣ Native Stack Navigator
2️⃣ Bottom Tabs
3️⃣ Drawer Navigator
4️⃣ Material Top Tabs
5️⃣ Nested Navigation
6️⃣ Dynamic Navigation
7️⃣ Auth Navigation Flow
