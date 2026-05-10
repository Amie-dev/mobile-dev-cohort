# 📱 Mobile Development Cohort — Day 04

📅 **10-05-2026**

## Topics

```txt
Screen
StatusBar
Navigation Bar
SafeAreaView
useSafeAreaInsets
initialWindowMetrics
StyleSheet
Responsive UI
useWindowDimensions
useColorScheme
expo-screen-orientation
```

---

# 1️⃣ What is Screen?

In React Native, a **screen** means one full page/view of your app.

Example:

```txt
Login Screen
Home Screen
Profile Screen
Settings Screen
```

A mobile screen has 3 main parts:

```txt
Full Screen = StatusBar + Usable Screen + Navigation Bar
```

---

# 2️⃣ StatusBar

The **StatusBar** is the top system area.

It shows:

```txt
Time
Battery
Network
Wi-Fi
Notifications
```

React Native provides a `StatusBar` component to control this area. ([React Native][1])

```tsx
import { StatusBar } from "react-native";

<StatusBar
  barStyle="dark-content"
  backgroundColor="#ffffff"
/>
```

Common values:

```tsx
barStyle="dark-content"   // dark icons
barStyle="light-content"  // light icons
```

---

# 3️⃣ Navigation Bar

The **Navigation Bar** is the bottom system area, mostly on Android.

It contains:

```txt
Back Button
Home Button
Recent Apps Button
```

Some phones use gesture navigation, so the nav bar may look different.

---

# 4️⃣ Usable Screen

```txt
Usable Screen = Full Screen - StatusBar - Navigation Bar
```

This is the safe area where your app content should appear.

Problem:

```txt
If you ignore safe area:
content may go behind notch, status bar, or bottom nav bar.
```

---

# 5️⃣ SafeAreaView

Use `SafeAreaView` from:

```tsx
import { SafeAreaView } from "react-native-safe-area-context";
```

Not from `react-native`.

React Native’s old `SafeAreaView` is deprecated, and official docs recommend using `react-native-safe-area-context` instead. ([React Native][2])

```tsx
import { SafeAreaView } from "react-native-safe-area-context";

export default function App() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      {/* Your screen content */}
    </SafeAreaView>
  );
}
```

Expo explains that `react-native-safe-area-context` helps position content correctly around notches, status bars, home indicators, and other system UI areas. ([Expo Documentation][3])

---

# 6️⃣ useSafeAreaInsets

`useSafeAreaInsets` gives exact safe spacing values.

```tsx
import { useSafeAreaInsets } from "react-native-safe-area-context";

const insets = useSafeAreaInsets();
```

Example:

```tsx
import { View, Text } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function HomeScreen() {
  const insets = useSafeAreaInsets();

  return (
    <View
      style={{
        flex: 1,
        paddingTop: insets.top,
        paddingBottom: insets.bottom,
        paddingLeft: insets.left,
        paddingRight: insets.right,
      }}
    >
      <Text>Hello Safe Screen</Text>
    </View>
  );
}
```

Use this when you need custom control.

---

# 7️⃣ initialWindowMetrics

`initialWindowMetrics` gives safe area values on initial render.

It helps reduce layout jump/flicker when the app starts.

```tsx
import {
  SafeAreaProvider,
  initialWindowMetrics,
} from "react-native-safe-area-context";

export default function App() {
  return (
    <SafeAreaProvider initialMetrics={initialWindowMetrics}>
      {/* App */}
    </SafeAreaProvider>
  );
}
```

It contains:

```txt
frame:
  width
  height
  x
  y

insets:
  top
  bottom
  left
  right
```

The library docs say `initialWindowMetrics` can be used with `SafeAreaProvider` as `initialMetrics`. ([appandflow.github.io][4])

---

# 8️⃣ StyleSheet

`StyleSheet` is used to create styles in React Native.

```tsx
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
```

Use:

```tsx
<View style={styles.container} />
```

---

# 9️⃣ StyleSheet.create

`create` makes style objects cleaner and organized.

```tsx
const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontWeight: "700",
  },
});
```

Benefit:

```txt
Clean code
Reusable styles
Better structure
Easy maintenance
```

---

# 🔟 StyleSheet.compose

`compose` combines 2 styles.

```tsx
const baseStyle = {
  fontSize: 18,
  color: "black",
};

const boldStyle = {
  fontWeight: "800",
};

const finalStyle = StyleSheet.compose(baseStyle, boldStyle);
```

Use:

```tsx
<Text style={finalStyle}>Hello</Text>
```

Simple way:

```tsx
<Text style={[styles.text, styles.bold]}>Hello</Text>
```

---

# 1️⃣1️⃣ StyleSheet.flatten

`flatten` converts multiple style arrays into one object.

```tsx
const finalStyle = StyleSheet.flatten([
  styles.card,
  styles.shadow,
  { marginTop: 20 },
]);
```

Result:

```txt
One final style object
```

Useful for debugging styles.

---

# 1️⃣2️⃣ Responsive Design

Responsive design means UI should adjust for:

```txt
Small phones
Large phones
Tablets
Portrait mode
Landscape mode
```

Bad approach:

```tsx
width: 400
```

Better approach:

```tsx
width: "100%"
```

or use screen size.

---

# 1️⃣3️⃣ useWindowDimensions

`useWindowDimensions` gives current screen width and height.

It automatically updates when screen size or font scale changes. ([React Native][5])

```tsx
import { useWindowDimensions } from "react-native";

const { width, height } = useWindowDimensions();
```

Example:

```tsx
import { View, Text, useWindowDimensions } from "react-native";

export default function ResponsiveCard() {
  const { width } = useWindowDimensions();

  const isTablet = width >= 768;

  return (
    <View
      style={{
        width: isTablet ? "60%" : "90%",
        padding: isTablet ? 30 : 18,
      }}
    >
      <Text>{isTablet ? "Tablet Layout" : "Mobile Layout"}</Text>
    </View>
  );
}
```

---

# 1️⃣4️⃣ useColorScheme

`useColorScheme` detects device theme.

It returns:

```txt
light
dark
null
```

React Native docs say it subscribes to color scheme updates from the Appearance module. ([React Native][6])

```tsx
import { useColorScheme } from "react-native";

const scheme = useColorScheme();
const isDark = scheme === "dark";
```

Example:

```tsx
const backgroundColor = isDark ? "#111827" : "#ffffff";
const textColor = isDark ? "#ffffff" : "#111827";
```

---

# 1️⃣5️⃣ expo-screen-orientation

This Expo module controls screen orientation.

Install:

```bash
npx expo install expo-screen-orientation
```

Import:

```tsx
import * as ScreenOrientation from "expo-screen-orientation";
```

Lock portrait:

```tsx
await ScreenOrientation.lockAsync(
  ScreenOrientation.OrientationLock.PORTRAIT_UP
);
```

Lock landscape:

```tsx
await ScreenOrientation.lockAsync(
  ScreenOrientation.OrientationLock.LANDSCAPE
);
```

Unlock:

```tsx
await ScreenOrientation.unlockAsync();
```

Expo docs describe `lockAsync` as a method that locks screen orientation to a selected `OrientationLock`. ([Expo Documentation][7])

---

# ✅ Full Practice Example

```tsx
import React, { useEffect } from "react";
import {
  StatusBar,
  StyleSheet,
  Text,
  View,
  useColorScheme,
  useWindowDimensions,
} from "react-native";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import * as ScreenOrientation from "expo-screen-orientation";

export default function Day04Screen() {
  const insets = useSafeAreaInsets();
  const { width, height } = useWindowDimensions();
  const colorScheme = useColorScheme();

  const isDark = colorScheme === "dark";
  const isTablet = width >= 768;
  const isLandscape = width > height;

  useEffect(() => {
    const lockPortrait = async () => {
      await ScreenOrientation.lockAsync(
        ScreenOrientation.OrientationLock.PORTRAIT_UP
      );
    };

    lockPortrait();
  }, []);

  return (
    <SafeAreaView
      style={[
        styles.container,
        {
          backgroundColor: isDark ? "#111827" : "#f4f4f4",
        },
      ]}
    >
      <StatusBar
        barStyle={isDark ? "light-content" : "dark-content"}
        backgroundColor={isDark ? "#111827" : "#f4f4f4"}
      />

      <View
        style={[
          styles.card,
          {
            paddingTop: insets.top + 20,
            width: isTablet ? "70%" : "90%",
          },
        ]}
      >
        <Text
          style={[
            styles.title,
            {
              color: isDark ? "#fff" : "#111827",
            },
          ]}
        >
          Day 04 Screen Practice
        </Text>

        <Text style={styles.text}>Width: {width}</Text>
        <Text style={styles.text}>Height: {height}</Text>
        <Text style={styles.text}>
          Orientation: {isLandscape ? "Landscape" : "Portrait"}
        </Text>
        <Text style={styles.text}>
          Theme: {isDark ? "Dark Mode" : "Light Mode"}
        </Text>
      </View>
    </SafeAreaView>
  );
}

const baseCard = {
  borderRadius: 24,
  backgroundColor: "#ffffff",
};

const shadowCard = {
  shadowColor: "#000",
  shadowOpacity: 0.08,
  shadowRadius: 12,
  shadowOffset: { width: 0, height: 6 },
  elevation: 5,
};

const cardStyle = StyleSheet.compose(baseCard, shadowCard);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },

  card: {
    ...StyleSheet.flatten([cardStyle]),
    marginTop: 40,
    padding: 20,
  },

  title: {
    fontSize: 24,
    fontWeight: "800",
    marginBottom: 20,
  },

  text: {
    fontSize: 16,
    marginBottom: 10,
    color: "#6b7280",
  },
});
```

---

# 🧠 Final Summary

| Topic                   | Meaning                               |
| ----------------------- | ------------------------------------- |
| Screen                  | One full page of app                  |
| StatusBar               | Top system bar                        |
| NavBar                  | Bottom Android system bar             |
| Usable Screen           | Safe content area                     |
| SafeAreaView            | Protects UI from notch/status/nav bar |
| useSafeAreaInsets       | Gives exact safe spacing              |
| initialWindowMetrics    | Initial safe area values              |
| StyleSheet.create       | Creates styles                        |
| StyleSheet.compose      | Combines styles                       |
| StyleSheet.flatten      | Converts style array to one object    |
| useWindowDimensions     | Responsive width/height               |
| useColorScheme          | Detects light/dark theme              |
| expo-screen-orientation | Controls portrait/landscape mode      |

[1]: https://reactnative.dev/docs/statusbar?utm_source=chatgpt.com "StatusBar"
[2]: https://reactnative.dev/docs/safeareaview?utm_source=chatgpt.com "🗑️ SafeAreaView · React Native"
[3]: https://docs.expo.dev/versions/latest/sdk/safe-area-context/?utm_source=chatgpt.com "react-native-safe-area-context"
[4]: https://appandflow.github.io/react-native-safe-area-context/api/initial-window-metrics/?utm_source=chatgpt.com "initialWindowMetrics | React Native Safe Area Context"
[5]: https://reactnative.dev/docs/usewindowdimensions?utm_source=chatgpt.com "useWindowDimensions"
[6]: https://reactnative.dev/docs/usecolorscheme?utm_source=chatgpt.com "useColorScheme"
[7]: https://docs.expo.dev/versions/latest/sdk/screen-orientation/?utm_source=chatgpt.com "ScreenOrientation - Expo Documentation"
