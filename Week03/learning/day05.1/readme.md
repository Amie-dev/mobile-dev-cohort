# 📱 Mobile Development Cohort — Week 03 Day 05

📅 **16-05-2026**

```bash
npx create-expo-app@latest day05 -t expo-template-blank-typescript@sdk-55
```


```bash
npx create-expo-app@latest day05 -t expo-template-blank-typescript@sdk-55
cd day05
npm install @react-navigation/native @react-navigation/stack @react-navigation/native-stack @react-navigation/bottom-tabs @react-navigation/drawer @react-navigation/material-top-tabs @react-navigation/elements @react-native-masked-view/masked-view @expo/vector-icons react-native-gesture-handler react-native-reanimated react-native-safe-area-context react-native-screens react-native-worklets
npm install --save-dev typescript @types/react
```

---

# 🚀 What is Navigation?

Navigation means:

👉 Moving from **one screen to another screen** inside an app.

Example:

* Login → Home
* Home → Profile
* Product → Details
* Notes List → Note Editor

Without navigation, apps would only have **one screen**.

---

# 🧭 What is a Navigator?

A **Navigator** controls:

* Which screen should open
* How screens move
* Back behavior
* Animation
* Navigation history

Think of navigator like:

📦 **Manager of screens**

---

# 📌 Static Navigation

Static navigation means:

👉 Fixed navigation structure.

Screens are predefined.

Example:

```txt
Home
Profile
Settings
```

User always sees same routes.

### ✅ Good For

* Simple apps
* Dashboard apps
* Static menus

---

# 📌 Dynamic Navigation

Dynamic navigation means:

👉 Screens/routes change based on condition.

Example:

```js
isLoggedIn ? HomeScreen : LoginScreen
```

or

```js
user.role === "admin"
```

show Admin screens only.

### ✅ Good For

* Authentication
* Role-based apps
* Dynamic dashboards

---

# ⚔️ Static vs Dynamic Navigation

| Static                 | Dynamic              |
| ---------------------- | -------------------- |
| Fixed routes           | Routes change        |
| Easy to manage         | More flexible        |
| Better for simple apps | Better for real apps |
| Same UI for everyone   | Personalized UI      |

---

# 📦 Types of Navigation in React Native

Main navigator types:

1. Stack Navigator
2. Native Stack Navigator
3. Bottom Tab Navigator
4. Drawer Navigator

---

# 1️⃣ Stack Navigator

Navigation works like:

📚 Stack of books

When opening new screen:

* New screen pushed on top
* Back removes top screen

Example:

```txt
Home
 └── Details
      └── Profile
```

Back button:

```txt
Profile → Details → Home
```

### ✅ Used For

* Product details
* Auth flow
* Nested pages

---

## Install Stack Navigation

```bash
npm install @react-navigation/native
```

```bash
npm install react-native-screens react-native-safe-area-context
```

```bash
npm install @react-navigation/stack
```

---

## Basic Stack Example

```tsx
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator();

function App() {
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

# 2️⃣ Native Stack Navigator

Uses native platform navigation.

⚡ Faster
⚡ Better animations
⚡ Better performance

Recommended for modern apps.

---

## Install Native Stack

```bash
npm install @react-navigation/native-stack
```

---

## Example

```tsx
import { createNativeStackNavigator }
from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();
```

---

# 🆚 Stack vs Native Stack

| Stack             | Native Stack      |
| ----------------- | ----------------- |
| JS based          | Native based      |
| More customizable | More performant   |
| Slightly slower   | Faster            |
| Custom animations | Native animations |

👉 Most apps prefer **Native Stack**

---

# 3️⃣ Bottom Tab Navigator

Tabs at bottom.

Example:

```txt
🏠 Home   ❤️ Likes   👤 Profile
```

Used in:

* Instagram
* YouTube
* Twitter/X

---

## Install Bottom Tabs

```bash
npm install @react-navigation/bottom-tabs
```

---

## Example

```tsx
import { createBottomTabNavigator }
from "@react-navigation/bottom-tabs";

const Tab = createBottomTabNavigator();
```

---

# 📌 Features

* Quick switching
* Persistent tabs
* Mobile-friendly

---

# 4️⃣ Drawer Navigator

Side menu navigation.

Example:

☰ Menu opens from left/right.

Apps using drawer:

* Gmail
* Google Drive

---

## Install Drawer

```bash
npm install @react-navigation/drawer
```

---

## Example

```tsx
import { createDrawerNavigator }
from "@react-navigation/drawer";

const Drawer = createDrawerNavigator();
```

---

# 📊 Navigator Comparison

| Navigator    | UI Style     | Best For      |
| ------------ | ------------ | ------------- |
| Stack        | Push screens | Details/Auth  |
| Native Stack | Native push  | Modern apps   |
| Bottom Tabs  | Bottom menu  | Main sections |
| Drawer       | Side menu    | Large apps    |

---

# 🧠 Real App Structure Example

Example app:

```txt
Drawer
 ├── Home Tabs
 │     ├── Feed
 │     ├── Search
 │     └── Profile
 │
 └── Settings
```

Inside tabs:

```txt
Feed
 └── Post Details
```

using Stack Navigator.

---

# 🔥 Important Concepts

## NavigationContainer

Root container for navigation.

```tsx
<NavigationContainer>
```

Only one main container usually.

---

## Screen

Represents one page.

```tsx
<Stack.Screen
  name="Home"
  component={HomeScreen}
/>
```

---

## Navigate to Screen

```tsx
navigation.navigate("Profile");
```

---

## Go Back

```tsx
navigation.goBack();
```

---

# 📱 Why Navigation is Important?

Without navigation:

❌ No multiple screens
❌ No app flow
❌ Bad UX

Navigation makes apps feel like:

✅ Real mobile apps

---

# 🧠 Day 05 Summary

Today you learned:

* What is navigation
* What is navigator
* Static navigation
* Dynamic navigation
* Stack Navigator
* Native Stack Navigator
* Bottom Tab Navigator
* Drawer Navigator
* Stack vs Native Stack
* Basic navigation structure

---

# 📌 Recommended Modern Setup

Most modern React Native apps use:

```txt
Native Stack + Bottom Tabs
```

or

```txt
Drawer + Tabs + Native Stack
```

for scalable architecture.
