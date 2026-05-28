# 📱 Week 03 Notes

# React Navigation + Expo Router 101

## Mobile Development Cohort

---

# 📅 Week 03 Overview

This week focused on:

* Navigation in React Native
* React Navigation
* Stack Navigation
* Bottom Tabs
* Drawer Navigation
* Authentication Flow
* Navigation Architecture
* Expo Router
* File-Based Routing
* Dynamic Routes
* Layout System

---

# 🧭 What is Navigation?

Navigation means:

```txt id="q2yk8e"
Moving between screens while maintaining app state
```

Example:

```txt id="c7jlwm"
Home → Profile → Settings → Back
```

Navigation is one of the most important parts of mobile applications.

---

# 🚀 React Navigation

React Navigation is the most popular navigation library for React Native.

Used for:

* Stack Navigation
* Tab Navigation
* Drawer Navigation
* Authentication Flow
* Nested Navigation

---

# 📦 Installing React Navigation

```bash id="yjlwmx"
npm install @react-navigation/native
```

Required dependencies:

```bash id="0jlwmm"
npx expo install react-native-screens
npx expo install react-native-safe-area-context
```

---

# 📌 NavigationContainer

`NavigationContainer` is the root wrapper of navigation.

Example:

```tsx id="zjlwm5"
import { NavigationContainer } from "@react-navigation/native";

<NavigationContainer>
  <App />
</NavigationContainer>
```

---

# 📚 Stack Navigation

Stack navigation works like browser history.

Example:

```txt id="1jlwm3"
Home → Details → Profile
```

Back button removes top screen from stack.

---

# 📦 Install Native Stack

```bash id="fjlwmz"
npm install @react-navigation/native-stack
```

---

# 📌 Stack Example

```tsx id="xjlwmq"
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();

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
```

---

# 📌 Navigation Between Screens

```tsx id="1jlwmf"
navigation.navigate("Profile");
```

---

# 📌 Go Back

```tsx id="mjlwm2"
navigation.goBack();
```

---

# 📌 Passing Params

```tsx id="jlwmu0"
navigation.navigate("Profile", {
  userId: 99,
});
```

---

# 📌 Reading Params

```tsx id="6jlwmh"
const route = useRoute();

const { userId } = route.params;
```

---

# 📱 Bottom Tab Navigation

Bottom tabs are commonly used in mobile apps.

Example:

```txt id="2jlwm8"
Home | Search | Orders | Profile
```

---

# 📦 Install Bottom Tabs

```bash id="6jlwmk"
npm install @react-navigation/bottom-tabs
```

---

# 📌 Bottom Tabs Example

```tsx id="hjlwm9"
const Tab = createBottomTabNavigator();

<Tab.Navigator>
  <Tab.Screen
    name="Home"
    component={HomeScreen}
  />

  <Tab.Screen
    name="Profile"
    component={ProfileScreen}
  />
</Tab.Navigator>
```

---

# 📌 Tab Icons

Used with Expo Vector Icons.

```tsx id="yjlwm3"
<Ionicons
  name="home"
  size={24}
  color="black"
/>
```

---

# 📂 Drawer Navigation

Drawer navigation creates sidebar menus.

Example:

```txt id="9jlwmp"
☰ Menu
- Profile
- Orders
- Settings
```

---

# 📦 Install Drawer Navigation

```bash id="mjlwmf"
npm install @react-navigation/drawer
```

---

# 📌 Drawer Example

```tsx id="wjlwm4"
const Drawer = createDrawerNavigator();

<Drawer.Navigator>
  <Drawer.Screen
    name="Profile"
    component={ProfileScreen}
  />
</Drawer.Navigator>
```

---

# 📌 Custom Drawer

Custom drawer allows:

* User profile
* Logout button
* Theme switch
* Custom UI

---

# 📌 Nested Navigation

Navigation inside navigation.

Example:

```txt id="jlwm5y"
Tab
 └── Stack
      └── Drawer
```

---

# 📌 Authentication Flow

Authentication flow controls:

```txt id="xjlwm6"
Logged In ?
YES → App
NO  → Auth Screens
```

---

# 📌 Auth Example

```tsx id="5jlwmx"
{
  isAuthenticated
    ? <TabNavigator />
    : <AuthStack />
}
```

---

# 🌙 Theme System

Theme system allows:

* Dark Mode
* Light Mode
* System Theme
* Manual Theme Toggle

---

# 📌 Theme Context

Used with Context API.

Example:

```tsx id="0jlwm9"
const ThemeContext = createContext();
```

---

# 📌 Theme Toggle

```tsx id="jlwm7r"
setIsDarkMode(prev => !prev);
```

---

# 📌 Custom Header

Custom headers improve UI design.

Example:

```tsx id="jlwm1q"
header: () => <CustomHeader />
```

---

# 📌 React Navigation Mental Model

Think:

```txt id="jlwmg5"
NavigationContainer
   ↓
Navigator
   ↓
Screens
```

---

# 🚀 Expo Router 101

Expo Router is a modern routing system for Expo apps.

Built on top of React Navigation.

---

# 📌 Why Expo Router?

Problems with old navigation:

* Boilerplate
* Huge navigator files
* Difficult nested routes
* Manual linking

Expo Router solves this using:

```txt id="jlwm3e"
File-Based Routing
```

---

# 📂 File-Based Routing

Core Idea:

```txt id="jlwm8z"
Folder Structure = Navigation Structure
```

---

# 📌 Example

```txt id="0jlwmr"
app/index.tsx
```

Route:

```txt id="1jlwmw"
/
```

---

# 📌 Another Example

```txt id="4jlwm7"
app/profile.tsx
```

Route:

```txt id="9jlwm2"
/profile
```

---

# 📌 What is `index.tsx`?

`index.tsx` is the default screen of a folder.

Example:

```txt id="9jlwm6"
app/profile/index.tsx
```

Route:

```txt id="jlwm6n"
/profile
```

---

# 📌 `profile.tsx` vs `profile/index.tsx`

Both create:

```txt id="0jlwmw"
/profile
```

But folder structure is better for scalable apps.

---

# 📌 Example Folder Structure

```txt id="5jlwm8"
app/profile/index.tsx
app/profile/details.tsx
```

Routes:

```txt id="0jlwm2"
/profile
/profile/details
```

---

# 📌 Static Route

Static routes have fixed names.

Example:

```txt id="2jlwm7"
app/about.tsx
```

Route:

```txt id="jlwm2v"
/about
```

---

# ⚡ Dynamic Route

Dynamic routes use square brackets.

Example:

```txt id="jlwm0h"
app/[userId].tsx
```

Matches:

```txt id="7jlwmv"
/1
/99
/aminul
```

---

# 📌 Reading Dynamic Params

```tsx id="8jlwm0"
const { userId } =
  useLocalSearchParams();
```

---

# 📌 Dynamic Route Best Practice

Always place dynamic routes inside folders.

Better:

```txt id="4jlwmx"
app/user/[id]/index.tsx
```

---

# 📌 Nested Dynamic Route

Example:

```txt id="7jlwmm"
app/[topic]/index.tsx
app/[topic]/[topicName].tsx
```

Routes:

```txt id="xjlwm5"
/react
/react/hooks
```

---

# 📌 Catch-All Route

Example:

```txt id="1jlwm6"
app/docs/[...slug].tsx
```

Matches:

```txt id="0jlwm7"
/docs/react/native/navigation
```

---

# 📌 Route Groups

Route groups use:

```txt id="2jlwm4"
(folder)
```

Example:

```txt id="9jlwmq"
(auth)
(tabs)
```

They do NOT appear in URL.

---

# 📌 `_layout.tsx`

Defines shared layout/navigation.

Example:

```txt id="7jlwm9"
app/_layout.tsx
```

---

# 📌 Root Layout

Wraps whole app.

Used for:

* Stack
* Providers
* Theme
* Authentication

---

# 📌 Tabs Layout

Example:

```txt id="1jlwmp"
app/(tabs)/_layout.tsx
```

---

# 📌 Stack Example

```tsx id="5jlwmn"
import { Stack } from "expo-router";

<Stack />
```

---

# 📌 Tabs Example

```tsx id="0jlwm5"
import { Tabs } from "expo-router";

<Tabs />
```

---

# 📌 Router Navigation

```tsx id="9jlwm1"
import { router } from "expo-router";
```

---

# 📌 Push Navigation

```tsx id="0jlwm0"
router.push("/profile");
```

Creates new stack.

---

# 📌 Replace Navigation

```tsx id="6jlwm6"
router.replace("/profile");
```

Replaces current screen.

---

# 📌 Back Navigation

```tsx id="7jlwm7"
router.back();
```

---

# 📌 Link Component

```tsx id="3jlwm9"
<Link href="/profile">
  Profile
</Link>
```

---

# 📌 useRouter Hook

```tsx id="9jlwm4"
const router = useRouter();
```

---

# 📌 Login Flow Example

```txt id="1jlwm8"
(app)
(auth)
(tabs)
```

---

# 📌 Production Folder Structure

```txt id="5jlwmr"
app
├── _layout.tsx
│
├── (auth)
│   ├── login.tsx
│   ├── signup.tsx
│
├── (tabs)
│   ├── _layout.tsx
│   ├── home
│   ├── profile
│
├── product
│   ├── [id]
│   │   ├── index.tsx
│   │   ├── reviews.tsx
```

---

# 🔥 Advantages of Expo Router

✅ Less boilerplate
✅ Better scalability
✅ Easier nested routes
✅ File-based routing
✅ Better DX
✅ Easier auth flow
✅ Deep linking support

---

# 🧠 Final Mental Model

React Navigation:

```txt id="5jlwm3"
Manual Navigation Setup
```

Expo Router:

```txt id="2jlwm0"
File Structure = Navigation Structure
```
