---

# React Navigation

---

## 1. What is React Navigation?

React Navigation is the library most React Native apps use so users can **move between screens** (with history, headers, tabs, drawers, and transitions).

**Everyday examples (keep saying these out loud):**

- Instagram → Home → Reels → Profile
- WhatsApp → Chats → Status → Calls
- Amazon → Home → Product → Cart

---

## 2. Why do we need it?

Without a navigation library, you are stuck thinking in **one full-screen tree**. Product apps need:

- Multiple screens
- Back behavior (hardware back + header back)
- Tabs and side menus
- Transitions
- Passing **small pieces of data** between screens

React Navigation is the **traffic system** for the mall: escalators, exits, which “room” is active.

**One-line definition (for slides):**

> React Navigation helps users move between screens inside a React Native app.
> 

---

## 3. Getting started

### Create Expo app

```bash
bunx create-expo-app your-app-name -t blank-typescript@sdk-55
```

### Install React Navigation

```bash
bun add @react-navigation/native
```

### Required dependencies (Expo)

```bash
bunx expo install react-native-screens react-native-safe-area-context
```

### Native stack

```bash
npm install @react-navigation/native-stack
```

### Elements (Link, Button, headers helpers)

```bash
bun add @react-navigation/elements
```

> **Master-class note:** In real apps you usually also add **`react-native-gesture-handler`** at the root (you already do in many Expo templates). **Drawer** needs gesture handler + reanimated; your drawer section lists that.
> 

---

## 4. What is a navigator?

A **navigator** decides:

- Which screen is shown
- How **back** works
- **Headers**

Example flow:

```
Home → Details → Profile
```

---

## 5. Static vs dynamic navigation

### Static navigation

Screens are **declared in one config object**.

```jsx
const Stack = createNativeStackNavigator({
  screens: {
    Home: HomeScreen,
    Profile: ProfileScreen,
    Settings: SettingsScreen,
  }
});
```

**Features:** always available, simple config, less conditional wiring.

**Good for:** learning, small apps, consistent structure.

---

### Dynamic navigation

Screens (or whole groups) **depend on state** (auth, feature flags).

```jsx
function AppNavigator() {
  const { isLoggedIn } = useAuth();

  return (
    <Stack.Navigator>
      {isLoggedIn ? (
        <>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Profile" component={ProfileScreen} />
        </>
      ) : (
        <Stack.Screen name="Login" component={LoginScreen} />
      )}
    </Stack.Navigator>
  );
}
```

**Features:** flexible, matches real products.

**Examples:** logged in → app; logged out → login.

---

### Core difference (your quote)

> **Static** = screens are declared in a fixed config.
> 
> 
> **Dynamic** = you render screens conditionally from React state.
> 

Most production apps use **dynamic** navigators **and** sometimes **static** setup for a subtree — both ideas matter.

---

# Types of Navigators

!ChatGPT Image May 16, 2026, 08_20_19 AM.png

## 3. Moving between Screens (Links, `useNavigation`, and methods)

Docs: https://reactnavigation.org/docs/navigating (React Navigation)

---

# A) 2 ways to move between screens

## 1) **Imperative navigation (using `navigation`)**

You call methods like `navigate`, `push`, `goBack`, etc.

### Where do you get `navigation` from?

**Option A: Screen props (recommended for screens)**

```tsx
function HomeScreen({ navigation }) {
  return (
    <Button title="Go Profile" onPress={() => navigation.navigate('Profile')} />
  );
}
```

**Option B: `useNavigation()` (best for nested components)**

`useNavigation` gives access to the navigation object when you can’t/shouldn’t pass it as a prop. (React Navigation)

```tsx
import { useNavigation } from '@react-navigation/native';

function GoToProfileButton() {
  const navigation = useNavigation();

  return (
    <Button title="Go Profile" onPress={() => navigation.navigate('Profile')} />
  );
}
```

---

## 2) **Declarative navigation (Links)**

Use **Link-like navigation** (very useful for web + deep linking).

### `<Link />` / path-based navigation

React Navigation supports navigating with paths (requires linking config). (source--react-navigation-docs.netlify.app)

### `useLinkTo()` hook

Navigate using a **URL-like path** instead of a screen name. (React Navigation)

```tsx
import { Button } from '@react-navigation/elements';
import { useLinkTo } from '@react-navigation/native';

function Home() {
  const linkTo = useLinkTo();

  return (
    <Button onPress={() => linkTo('/profile/jane')}>
      Go to Jane's profile
    </Button>
  );
}
```

> Use links when you want **deep links**, **web URLs**, or you like “route path” style navigation. (source--react-navigation-docs.netlify.app)
> 

---

# B) Most-used `navigation` methods (with examples)

## 1) `navigate(name, params?)`

Go to a screen by name.

```tsx
navigation.navigate('Profile');
navigation.navigate('Profile', { userId: 42 });
```

## 2) `goBack()`

Go to the previous screen. (React Navigation)

```tsx
navigation.goBack();
```

On Android, hardware back usually triggers `goBack()` automatically. (React Navigation)

## 3) `push(name, params?)`

Always adds a **new instance** on top of stack (even if it’s the same screen). (React Navigation)

```tsx
navigation.push('Profile', { userId: 99 });
```

## 4) `replace(name, params?)`

Replace current screen (user can’t go back to the previous one).

```tsx
navigation.replace('Home');
```

Common in: Splash → Home, Login → App

## 5) `popToTop()`

Go back to the first screen in stack. (React Navigation)

```tsx
navigation.popToTop();
```

## 6) `popTo('Home')`

Go back to a **specific screen** in the stack. (React Navigation)

```tsx
navigation.popTo('Home');
```

---

# C) Passing data (Params) while navigating

## Send params

```tsx
navigation.navigate('Profile', { username: 'codesnippet' });
```

## Read params

```tsx
function ProfileScreen({ route }) {
  const { username } = route.params;
  return <Text>{username}</Text>;
}
```

---

# D) Example: “Details page” flow (practical)

```tsx
// Home -> Details (with params)
navigation.navigate('Details', { productId: 'p1' });

// Details screen
function Details({ route, navigation }) {
  const { productId } = route.params;

  return (
    <View>
      <Text>Product: {productId}</Text>
      <Button title="Open another Details" onPress={() => navigation.push('Details', { productId: 'p2' })} />
      <Button title="Back" onPress={() => navigation.goBack()} />
    </View>
  );
}
```

- `navigate` = normal move
- `push` = same screen again with new params (React Navigation)

---

# E) When to use what (quick rule)

- **`navigate`** → normal switching between screens
- **`push`** → same screen multiple times (Details → Details → Details) (React Navigation)
- **`replace`** → don’t want user to return (Login → Home)
- **`goBack`** → previous screen (React Navigation)
- **`popToTop` / `popTo`** → jump back multiple screens quickly (React Navigation)
- **`useLinkTo` / Link paths** → deep links + web URL navigation (source--react-navigation-docs.netlify.app)

---

If you want, I can also add a short **“CommonActions.reset (logout flow)”** note next (very common in real apps).

# 1. Stack Navigator in React Navigation

## What is Stack Navigator?

A **Stack Navigator** allows users to move between screens in a stack-like manner.

Every new screen is placed **on top** of the previous screen.

Think of it like:

- Opening Instagram profile from Home
- Opening Product Details from Products page
- Going from Login → OTP → Dashboard

When you go back, the top screen gets removed from the stack.

---

# Real World Example

Imagine a stack of books 📚

- First book = Home Screen
- Second book = Profile Screen
- Third book = Settings Screen

The latest screen always stays on top.

---

# When Should You Use Stack Navigator?

Use Stack Navigator when:

- You want screen-to-screen navigation
- You need back button support
- You want push/pop navigation flow
- You are building:
    - Authentication flow
    - E-commerce app
    - Social media app
    - Multi-step forms
    - Details pages

---

# Installation

First install React Navigation:

```bash
bun add @react-navigation/native
```

Install required dependencies:

```bash
npx expo install react-native-screens react-native-safe-area-context
```

Install Native Stack Navigator:

```bash
bun add @react-navigation/native-stack
```

Additional dependencies:

```bash
npx expo install react-native-gesture-handler react-native-masked-view/masked-view
```

---

# Static Navigation

Static navigation is configuration-based.

You define all screens inside an object.

## Example

```tsx
import * as React from 'react';
import { Text, View } from 'react-native';
import {
  createStaticNavigation,
  useNavigation,
} from '@react-navigation/native';
import { Button } from '@react-navigation/elements';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

function HomeScreen() {
  const navigation = useNavigation();

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Home Screen</Text>

      <Button onPress={() => navigation.navigate('Profile')}>
        Go to Profile
      </Button>
    </View>
  );
}

function ProfileScreen() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Profile Screen</Text>
    </View>
  );
}

const MyStack = createNativeStackNavigator({
  screens: {
    Home: HomeScreen,
    Profile: ProfileScreen,
  },
});

const Navigation = createStaticNavigation(MyStack);

export default function App() {
  return <Navigation />;
}
```

---

# Dynamic Navigation

Dynamic navigation is component-based.

This is the most commonly used approach.

## Example

```tsx
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { View, Text } from 'react-native';

const Stack = createNativeStackNavigator();

function HomeScreen() {
  return (
    <View>
      <Text>Home Screen</Text>
    </View>
  );
}

function ProfileScreen() {
  return (
    <View>
      <Text>Profile Screen</Text>
    </View>
  );
}

function MyStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Profile" component={ProfileScreen} />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <MyStack />
    </NavigationContainer>
  );
}
```

---

---

# Customizing Stack Headers

Headers are the top navigation bars.

You can customize:

- Title
- Background color
- Text color
- Buttons
- Alignment
- Visibility

---

```abap
import * as React from 'react';
import { View, Text, Button } from 'react-native';

import {
  createStaticNavigation,
  useNavigation,
} from '@react-navigation/native';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

function HomeScreen() {
  const navigation = useNavigation();

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Text>Home Screen</Text>

      <Button
        title="Go to Profile"
        onPress={() => navigation.navigate('Profile')}
      />
    </View>
  );
}

function ProfileScreen() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Text>Profile Screen</Text>
    </View>
  );
}

const MyStack = createNativeStackNavigator({
  screenOptions: {
    headerStyle: {
      backgroundColor: '#111827',
    },

    headerTintColor: '#fff',

    headerTitleStyle: {
      fontWeight: 'bold',
    },

    headerTitleAlign: 'center',
  },

  screens: {
    Home: {
      screen: HomeScreen,

      options: {
        title: 'Welcome',

        headerRight: () => (
          <Button
            title="Info"
            onPress={() => alert('Info clicked')}
          />
        ),
      },
    },

    Profile: {
      screen: ProfileScreen,

      options: {
        animation: 'slide_from_bottom',
      },
    },
  },
});

const Navigation = createStaticNavigation(MyStack);

export default function App() {
  return <Navigation />;
}
```

# Change Screen Title

```tsx
<Stack.Screen
  name="Home"
  component={HomeScreen}
  options={{
    title: 'My Home Page',
  }}
/>
```

---

# Change Header Styles

```tsx
<Stack.Screen
  name="Home"
  component={HomeScreen}
  options={{
    title: 'Dashboard',
    headerStyle: {
      backgroundColor: '#111827',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
      fontSize: 22,
    },
  }}
/>
```

## Explanation

- `headerStyle` → styles the header container
- `headerTintColor` → changes back button + title color
- `headerTitleStyle` → customizes title text

---

# Center Align Header Title

```tsx
options={{
  headerTitleAlign: 'center',
}}
```

---

# Hide Header

```tsx
options={{
  headerShown: false,
}}
```

Useful for:

- Login screens
- Splash screens
- Fullscreen pages

---

# Custom Header Buttons

## Right Button

```tsx
import { Button } from 'react-native';

<Stack.Screen
  name="Home"
  component={HomeScreen}
  options={{
    headerRight: () => (
      <Button
        title="Info"
        onPress={() => alert('Info Button Pressed')}
      />
    ),
  }}
/>
```

---

## Left Button

```tsx
<Stack.Screen
  name="Profile"
  component={ProfileScreen}
  options={{
    headerLeft: () => (
      <Button
        title="Menu"
        onPress={() => alert('Menu Opened')}
      />
    ),
  }}
/>
```

---

# Dynamic Header Title

You can change the title dynamically.

```tsx
function ProfileScreen({ navigation }) {
  React.useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Code Snippet',
    });
  }, [navigation]);

  return <Text>Profile Screen</Text>;
}
```

---

# Global Screen Options

Instead of repeating styles for every screen:

```tsx
<Stack.Navigator
  screenOptions={{
    headerStyle: {
      backgroundColor: '#111827',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
  }}
>
  <Stack.Screen name="Home" component={HomeScreen} />
  <Stack.Screen name="Profile" component={ProfileScreen} />
</Stack.Navigator>
```

---

# Initial Screen

You can decide which screen opens first.

```tsx
<Stack.Navigator initialRouteName="Profile">
```

---

# Animation Options

## Disable Animation

```tsx
options={{
  animation: 'none',
}}
```

---

## Custom Animation

```tsx
options={{
  animation: 'slide_from_right',
}}
```

Other animations:

- `fade`
- `slide_from_bottom`
- `simple_push`

---

# Full Example with Custom Header ( Dynamic)

```tsx
import * as React from 'react';
import { View, Text, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

function HomeScreen({ navigation }) {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Text>Home Screen</Text>

      <Button
        title="Go to Profile"
        onPress={() => navigation.navigate('Profile')}
      />
    </View>
  );
}

function ProfileScreen() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Text>Profile Screen</Text>
    </View>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: '#111827',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          headerTitleAlign: 'center',
        }}
      >
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{
            title: 'Welcome',
            headerRight: () => (
              <Button
                title="Info"
                onPress={() => alert('Info clicked')}
              />
            ),
          }}
        />

        <Stack.Screen
          name="Profile"
          component={ProfileScreen}
          options={{
            animation: 'slide_from_bottom',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
```

---

# Commonly Used Stack Navigator Props

| Prop | Purpose |
| --- | --- |
| `initialRouteName` | First screen |
| `screenOptions` | Global screen styling |
| `options` | Individual screen styling |
| `headerShown` | Hide/show header |
| `title` | Screen title |
| `animation` | Screen transition animation |

---

# Advantages of Stack Navigator

- Simple to use
- Built-in back functionality
- Smooth transitions
- Great for screen flows
- Native-like experience

---

# Limitations

- Not ideal for switching between major app sections
- Deep stacks can become complex

For major app sections:

- Use Tabs Navigator
- Use Drawer Navigator

---

# TLDR

- Stack Navigator works like a stack of screens
- Every new screen appears on top
- Best for screen-to-screen navigation
- Supports:
    - Headers
    - Back navigation
    - Animations
    - Params
    - Custom buttons
    - Dynamic titles
- Most used navigator in React Native apps

## Tab Navigation (Bottom Tabs + Top Tabs) Notes with Static + Dynamic Examples + Customization

React Navigation tabs are used when your app has **main sections** (Home, Search, Profile, Settings) and users need to **switch quickly** without a “back-stack” feeling. Bottom Tabs are the most common. (React Navigation)

---

# 1) Types of Tab Navigators

## A) Bottom Tabs (most used)

A tab bar at the **bottom** to switch between routes. Screens are **lazily initialized** (screen mounts when first focused). (React Navigation)

Package: `@react-navigation/bottom-tabs` (React Navigation)

## B) Material Top Tabs (optional)

Tabs at the **top**, supports **swipe** between tabs (built on `react-native-tab-view`). (React Navigation)

Package: `@react-navigation/material-top-tabs` (React Navigation)

## C) Native Bottom Tabs (experimental)

Uses native components (`UITabBarController` iOS, `BottomNavigationView` Android). Marked **experimental** by docs. (React Navigation)

---

# 2) Installation (Bottom Tabs)

Assuming you already installed `@react-navigation/native` + required deps:

```bash
bun add @react-navigation/bottom-tabs
```

(If Expo asks, run the usual Expo installs for react-navigation deps based on your setup guide.)

Docs: Bottom Tabs Navigator (React Navigation)

---

# 3) Dynamic Tabs (most common)

```tsx
import * as React from 'react';
import { Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

function HomeScreen() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Home</Text>
    </View>
  );
}

function SearchScreen() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Search</Text>
    </View>
  );
}

function ProfileScreen() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Profile</Text>
    </View>
  );
}

const Tab = createBottomTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Search" component={SearchScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <MyTabs />
    </NavigationContainer>
  );
}
```

---

# 4) Static Tabs (config-based)

Static navigation uses `createStaticNavigation` and passes screens as an object (similar to the Stack static pattern you used).

```tsx
import * as React from 'react';
import { Text, View } from 'react-native';
import { createStaticNavigation } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

function HomeScreen() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Home</Text>
    </View>
  );
}

function SearchScreen() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Search</Text>
    </View>
  );
}

function ProfileScreen() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Profile</Text>
    </View>
  );
}

const MyTabs = createBottomTabNavigator({
  screens: {
    Home: HomeScreen,
    Search: SearchScreen,
    Profile: ProfileScreen,
  },
});

const Navigation = createStaticNavigation(MyTabs);

export default function App() {
  return <Navigation />;
}
```

---

# 5) Customizing Tabs (important props)

Tabs are customized using:

- `screenOptions` (global for all tab screens)
- `options` (per-screen)

Docs: Bottom Tabs Navigator (React Navigation)

---

## A) Set initial tab

```tsx
<Tab.Navigator initialRouteName="Search">
```

---

## B) Hide the header for tabs (common)

```tsx
<Tab.Navigator screenOptions={{ headerShown: false }}>
```

---

## C) Change label/title per tab

```tsx
<Tab.Screen
  name="Home"
  component={HomeScreen}
  options={{ title: 'Dashboard' }} // affects header title (if header shown)
/>
```

For tab label (shown in tab bar), use:

```tsx
options={{ tabBarLabel: 'Start' }}
```

---

## D) Icons (very common)

Example with `@expo/vector-icons` (or any icon lib you use):

```tsx
import { Ionicons } from '@expo/vector-icons';

<Tab.Navigator
  screenOptions={({ route }) => ({
    tabBarIcon: ({ focused, color, size }) => {
      const icon =
        route.name === 'Home'
          ? focused ? 'home' : 'home-outline'
          : route.name === 'Search'
          ? focused ? 'search' : 'search-outline'
          : focused ? 'person' : 'person-outline';

      return <Ionicons name={icon} size={size} color={color} />;
    },
  })}
>
  <Tab.Screen name="Home" component={HomeScreen} />
  <Tab.Screen name="Search" component={SearchScreen} />
  <Tab.Screen name="Profile" component={ProfileScreen} />
</Tab.Navigator>
```

---

## E) Active/Inactive colors

```tsx
<Tab.Navigator
  screenOptions={{
    tabBarActiveTintColor: 'tomato',
    tabBarInactiveTintColor: 'gray',
  }}
>
```

---

## F) Tab bar style (height, padding, background, etc.)

```tsx
<Tab.Navigator
  screenOptions={{
    tabBarStyle: {
      height: 60,
      paddingBottom: 8,
    },
  }}
>
```

---

## G) Hide tab bar on a specific screen (per-screen)

```tsx
<Tab.Screen
  name="Profile"
  component={ProfileScreen}
  options={{
    tabBarStyle: { display: 'none' },
  }}
/>
```

(Useful for full-screen pages inside tabs.)

---

## H) Badge on a tab (notifications count)

```tsx
<Tab.Screen
  name="Home"
  component={HomeScreen}
  options={{
    tabBarBadge: 3,
  }}
/>
```

---

# 6) Practical “Real App” Pattern (Tabs + Stack)

Most apps do this:

- **Tabs = main sections**
- Each tab has its own **Stack** for inner screens (Home → Details, etc.)

```tsx
const HomeStack = createNativeStackNavigator();

function HomeStackScreens() {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen name="Home" component={HomeScreen} />
      <HomeStack.Screen name="Details" component={DetailsScreen} />
    </HomeStack.Navigator>
  );
}

<Tab.Navigator>
  <Tab.Screen name="HomeTab" component={HomeStackScreens} options={{ headerShown: false }} />
  <Tab.Screen name="Search" component={SearchScreen} />
  <Tab.Screen name="Profile" component={ProfileScreen} />
</Tab.Navigator>
```

This gives:

- fast switching with tabs
- deep navigation inside each section using stack

---

# Material Top Tabs Navigator

Material Top Tabs Navigator creates tabs at the **top of the screen** and allows users to **swipe left/right** between screens.

Unlike Bottom Tabs:

- Tabs appear at the top
- Supports swipe gestures
- Looks similar to:
    - Instagram story sections
    - YouTube channel tabs
    - Twitter/X profile tabs

Docs: React Navigation Material Top Tabs Docs

---

# When Should You Use Top Tabs?

Use Top Tabs when:

- You have related content sections
- Users may swipe between tabs
- You want Android Material Design style tabs

Examples:

- Posts / Reels / Tagged
- Chats / Status / Calls
- Men / Women / Kids categories
- Following / Followers

---

# Installation

Install the package:

```bash
bun add @react-navigation/material-top-tabs
```

Install required dependencies:

```bash
npx expo install react-native-tab-view react-native-pager-view
```

---

# Dynamic Top Tabs Example

```tsx
import * as React from 'react';
import { Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

const Tab = createMaterialTopTabNavigator();

function HomeScreen() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Text>Home Screen</Text>
    </View>
  );
}

function ReelsScreen() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Text>Reels Screen</Text>
    </View>
  );
}

function ProfileScreen() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Text>Profile Screen</Text>
    </View>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Reels" component={ReelsScreen} />
        <Tab.Screen name="Profile" component={ProfileScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
```

---

# Static Top Tabs Example

```tsx
import * as React from 'react';
import { Text, View } from 'react-native';
import { createStaticNavigation } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

function HomeScreen() {
  return (
    <View>
      <Text>Home Screen</Text>
    </View>
  );
}

function ReelsScreen() {
  return (
    <View>
      <Text>Reels Screen</Text>
    </View>
  );
}

function ProfileScreen() {
  return (
    <View>
      <Text>Profile Screen</Text>
    </View>
  );
}

const MyTabs = createMaterialTopTabNavigator({
  screens: {
    Home: HomeScreen,
    Reels: ReelsScreen,
    Profile: ProfileScreen,
  },
});

const Navigation = createStaticNavigation(MyTabs);

export default function App() {
  return <Navigation />;
}
```

---

# Customizing Top Tabs

---

# Change Active & Inactive Colors

```tsx
<Tab.Navigator
  screenOptions={{
    tabBarActiveTintColor: '#2563eb',
    tabBarInactiveTintColor: 'gray',
  }}
>
```

---

# Customize Tab Bar Style

```tsx
<Tab.Navigator
  screenOptions={{
    tabBarStyle: {
      backgroundColor: '#111827',
    },
  }}
>
```

---

# Customize Label Style

```tsx
<Tab.Navigator
  screenOptions={{
    tabBarLabelStyle: {
      fontSize: 14,
      fontWeight: 'bold',
    },
  }}
>
```

---

# Customize Indicator

The indicator is the line below the active tab.

```tsx
<Tab.Navigator
  screenOptions={{
    tabBarIndicatorStyle: {
      backgroundColor: 'tomato',
      height: 3,
    },
  }}
>
```

---

# Enable/Disable Swipe

## Disable Swipe

```tsx
<Tab.Navigator
  screenOptions={{
    swipeEnabled: false,
  }}
>
```

---

# Enable Scrollable Tabs

Useful when there are many tabs.

```tsx
<Tab.Navigator
  screenOptions={{
    tabBarScrollEnabled: true,
  }}
>
```

---

# Custom Tab Labels

```tsx
<Tab.Screen
  name="Home"
  component={HomeScreen}
  options={{
    tabBarLabel: 'Dashboard',
  }}
/>
```

---

# Lazy Loading

By default, screens may render lazily.

You can control it:

```tsx
<Tab.Navigator
  screenOptions={{
    lazy: true,
  }}
>
```

---

# Initial Route

```tsx
<Tab.Navigator initialRouteName="Reels">
```

---

# Full Customization Example

```tsx
<Tab.Navigator
  initialRouteName="Home"
  screenOptions={{
    tabBarActiveTintColor: '#2563eb',
    tabBarInactiveTintColor: 'gray',

    tabBarStyle: {
      backgroundColor: '#111827',
    },

    tabBarLabelStyle: {
      fontWeight: 'bold',
      fontSize: 14,
    },

    tabBarIndicatorStyle: {
      backgroundColor: '#2563eb',
      height: 3,
    },

    tabBarScrollEnabled: true,
  }}
>
  <Tab.Screen
    name="Home"
    component={HomeScreen}
  />

  <Tab.Screen
    name="Reels"
    component={ReelsScreen}
  />

  <Tab.Screen
    name="Profile"
    component={ProfileScreen}
  />
</Tab.Navigator>
```

---

# Bottom Tabs vs Top Tabs

| Bottom Tabs | Top Tabs |
| --- | --- |
| Bottom of screen | Top of screen |
| Best for main app sections | Best for related categories |
| Usually no swipe | Supports swipe |
| Most common in apps | Common in Android-style UIs |

---

# Real World Examples

| App | Usage |
| --- | --- |
| Instagram | Posts / Reels / Tagged |
| WhatsApp | Chats / Status / Calls |
| Twitter/X | Media / Likes / Replies |
| YouTube | Videos / Shorts / Live |

---

## Drawer Navigator — Notes (Static + Dynamic + Customization + Real patterns)

A **Drawer Navigator** is a side menu (left/right) that can be opened via **gesture** (swipe) or a **button** in the header. It’s great for **secondary navigation** (Settings, Help, Categories, Account, etc.). (React Navigation)

---

# 1) When to use Drawer

Use Drawer when:

- You have many screens but don’t want to show them as tabs
- Navigation items are “secondary” (Profile, Orders, Settings, About)
- You want a “hamburger menu” UX

Don’t use Drawer for the main 3–5 sections (tabs are better there). (Often apps use **Tabs + Drawer** together.)

---

# 2) Installation

Install Drawer navigator: (React Navigation)

```bash
bun add @react-navigation/drawer
```

Drawer depends on gesture + reanimated (+ worklets): (React Navigation)

```bash
npx expo install react-native-gesture-handler react-native-reanimated react-native-worklets
```

Also configure Reanimated Babel plugin (required by Reanimated): (React Navigation)

---

# 3) Dynamic Drawer Example (most common)

```tsx
import * as React from 'react';
import { View, Text, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';

function HomeScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Home</Text>

      <Button title="Open Drawer" onPress={() => navigation.openDrawer()} />
      <Button title="Go Profile" onPress={() => navigation.navigate('Profile')} />
    </View>
  );
}

function ProfileScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Profile</Text>
      <Button title="Close Drawer" onPress={() => navigation.closeDrawer()} />
    </View>
  );
}

const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator>
        <Drawer.Screen name="Home" component={HomeScreen} />
        <Drawer.Screen name="Profile" component={ProfileScreen} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
```

Drawer adds helpers on `navigation`: `openDrawer()`, `closeDrawer()`, and `jumpTo()`. (React Navigation)

---

# 4) Static Drawer Example (config-based)

```tsx
import * as React from 'react';
import { Text, View } from 'react-native';
import { createStaticNavigation } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';

function HomeScreen() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Home</Text>
    </View>
  );
}

function ProfileScreen() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Profile</Text>
    </View>
  );
}

const MyDrawer = createDrawerNavigator({
  screens: {
    Home: HomeScreen,
    Profile: ProfileScreen,
  },
});

const Navigation = createStaticNavigation(MyDrawer);

export default function App() {
  return <Navigation />;
}
```

Static + Dynamic patterns are shown in the official docs. (React Navigation)

---

# 5) Customizing Drawer (important props)

## A) Drawer Position (left / right)

```tsx
<Drawer.Navigator screenOptions={{ drawerPosition: 'right' }}>
```

Supported positions: `left` or `right`. (GitHub)

---

## B) Drawer Type (animation style)

Drawer types: `front`, `back`, `slide`, `permanent`. (React Navigation)

```tsx
<Drawer.Navigator screenOptions={{ drawerType: 'front' }}>
```

**Responsive “permanent on large screens” pattern** (recommended):

```tsx
import { useWindowDimensions } from 'react-native';

function MyDrawer() {
  const dimensions = useWindowDimensions();

  return (
    <Drawer.Navigator
      screenOptions={{
        drawerType: dimensions.width >= 768 ? 'permanent' : 'front',
      }}
    >
      <Drawer.Screen name="Home" component={HomeScreen} />
      <Drawer.Screen name="Profile" component={ProfileScreen} />
    </Drawer.Navigator>
  );
}
```

This exact idea is shown in the docs. (React Navigation)

---

## C) Default open/closed

Use `defaultStatus="open"` if you want drawer open by default. (React Navigation)

```tsx
<Drawer.Navigator defaultStatus="open">
```

---

## D) Drawer styling (width, overlay, scene style)

Common styling options include `drawerStyle`, `overlayColor`, and `sceneStyle`. (React Navigation)

```tsx
<Drawer.Navigator
  screenOptions={{
    drawerStyle: { width: 280 },
    overlayColor: 'rgba(0,0,0,0.4)',
    sceneStyle: { backgroundColor: '#fff' },
  }}
>
```

Docs also show an example using `defaultStatus="open"` + `drawerStyle` + `overlayColor: 'transparent'` for special layouts. (React Navigation)

---

## E) Swipe gesture sensitivity

Useful when you want to avoid accidental swipes.

```tsx
<Drawer.Navigator
  screenOptions={{
    swipeEdgeWidth: 30,
    swipeMinDistance: 50,
  }}
>
```

These props are documented for the drawer navigator. (React Navigation)

---

# 6) Header + Hamburger button (toggle drawer)

Most apps show a header with a **menu button** (☰). In drawer navigation, the header options are supported and you can customize header behavior via screen options. (React Navigation)

### Simple: show header globally

```tsx
<Drawer.Navigator screenOptions={{ headerShown: true }}>
```

### Add a custom button (example)

```tsx
import { Button } from 'react-native';

<Drawer.Screen
  name="Home"
  component={HomeScreen}
  options={({ navigation }) => ({
    headerShown: true,
    title: 'Dashboard',
    headerLeft: () => (
      <Button title="Menu" onPress={() => navigation.toggleDrawer?.()} />
    ),
  })}
/>
```

> Note: Some projects use `toggleDrawer()` (commonly available). Even if you don’t use it, you always have `openDrawer()` / `closeDrawer()` from the docs. (React Navigation)
> 

---

# 7) Custom Drawer Content (add profile header + logout)

You can fully customize the drawer UI using `drawerContent`. The function receives `state`, `navigation`, and `descriptors`. (React Navigation)

Typical pattern is: render default list + add your custom UI.

```tsx
import { View, Text } from 'react-native';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';

function CustomDrawerContent(props) {
  return (
    <DrawerContentScrollView {...props}>
      {/* Custom Header */}
      <View style={{ padding: 16 }}>
        <Text style={{ fontSize: 18, fontWeight: '700' }}>CodeSnippet</Text>
        <Text style={{ opacity: 0.7 }}>codesnippet@example.com</Text>
      </View>

      {/* Default drawer items */}
      <DrawerItemList {...props} />

      {/* Custom Footer */}
      <DrawerItem
        label="Logout"
        onPress={() => {
          // your logout logic
          props.navigation.closeDrawer();
        }}
      />
    </DrawerContentScrollView>
  );
}

<Drawer.Navigator drawerContent={(props) => <CustomDrawerContent {...props} />}>
  <Drawer.Screen name="Home" component={HomeScreen} />
  <Drawer.Screen name="Profile" component={ProfileScreen} />
</Drawer.Navigator>;
```

---

# 8) Jumping inside drawer screens (without pushing)

Use `jumpTo` when you want to switch to a drawer route directly. (React Navigation)

```tsx
navigation.jumpTo('Profile', { owner: 'Satya' });
```

---

# 9) Animation-based UI using drawer progress (advanced but useful)

`useDrawerProgress()` returns a Reanimated shared value from `0` (closed) to `1` (open). (React Navigation)

This is great for animating the screen while drawer is sliding.

---

# 10) TLDR

- Drawer = side menu navigation (open/close with gesture or button). (React Navigation)
- Install `@react-navigation/drawer` + gesture-handler + reanimated + worklets. (React Navigation)
- Supports Static + Dynamic navigator creation. (React Navigation)
- Key customizations: `drawerPosition`, `drawerType`, `drawerStyle`, `overlayColor`, `defaultStatus`, swipe settings. (React Navigation)
- You can build a fully custom drawer UI with `drawerContent`. (React Navigation)