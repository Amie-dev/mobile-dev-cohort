# 🍔 Food Delivery App

A modern React Native food delivery application built with Expo, React Navigation, Context API, and TypeScript.

---

## 🎥 Demo Video

[Watch Demo](https://x.com/AminulIsla65775/status/2057687124049334692)

---

# 🚀 Tech Stack

## Core
- React Native
- Expo
- TypeScript

## Navigation
- React Navigation
  - Bottom Tabs
  - Native Stack
  - Drawer Navigation

## State Management
- React Context API
- Custom Hooks

## UI & Styling
- React Native StyleSheet
- Expo Vector Icons
- Dynamic Theme System (Dark/Light)

## Utilities
- react-native-safe-area-context
- expo-navigation-bar

---

# 📁 Project Structure

```bash
src
├── components
│   ├── Home
│   ├── Food
│   ├── Header
│   ├── Order
│
├── constants
│   ├── Colors.ts
│   ├── foodData.ts
│
├── context
│   ├── ThemeContext.tsx
│   ├── AuthContext.tsx
│
├── navigator
│   ├── Auth
│   ├── tabs
│   ├── stack
│   ├── drawer
│   └── RootNavigator.tsx
│
├── screens
│   ├── HomeStackScreen
│   ├── SearchScreen.tsx
│   ├── OrderScreen.tsx
│   ├── ProfileScreen.tsx
│   ├── SettingsScreen.tsx
│
└── assets
````

---

# 🧭 Navigation Structure

```bash
RootNavigator
│
├── AuthStack
│   └── GetStart Screen
│
└── TabNavigator
    ├── HomeTab
    │   └── HomeStack
    │       ├── Home Screen
    │       └── Food Screen
    │
    ├── SearchTab
    │   └── SearchStack
    │       ├── Search Screen
    │       └── Food Screen
    │
    ├── OrderTab
    │   └── OrderStack
    │
    └── ProfileTab
        └── ProfileDrawer
            ├── Profile
            ├── Orders
            ├── Settings
            └── Help
```

---

# 🎨 Features

* Dark / Light Theme
* Custom Headers
* Bottom Tab Navigation
* Drawer Navigation
* Food Details Page
* Add To Cart UI
* Buy Now Section
* Interactive UI Components
* Responsive Layout
* Category Filtering
* Search Functionality
* Order Tracking UI
* Settings & Help Screens

---

# 🌙 Theme System

The app uses a custom Theme Context:

* Dynamic light/dark mode
* System theme support
* Manual theme switching
* Shared color palette

---

# 🔐 Authentication Flow

```bash
AuthProvider
   ↓
RootNavigator
   ↓
isAuthenticated ?
   ↓
TabNavigator : AuthStack
```

---

# 📦 Main Libraries

```bash
@react-navigation/native
@react-navigation/native-stack
@react-navigation/bottom-tabs
@react-navigation/drawer

react-native-safe-area-context
@expo/vector-icons
expo-navigation-bar
```

---

# 📱 UI Design Style

* Modern Food Delivery UI
* Rounded Cards
* Floating Action Buttons
* Soft Shadows
* Premium Dark Theme

---

# 👨‍💻 Author

Built with ❤️ using React Native & Expo.

