# SafeAreaView, StyleSheet, Responsive Design & More 📱

---

## 1. SafeAreaView — The Right Way

### Why Does This Even Exist?

Modern phones have **notches, punch holes, rounded corners, status bars, home indicators** — all of which can hide your content if you don't account for them.

```
Without SafeAreaView          With SafeAreaView
┌─────────────────┐           ┌─────────────────┐
│ 📷 [notch]      │           │ 📷 [notch]      │
│Hello World ←BAD │           │                 │
│ text hidden     │           │  Hello World ✅  │
│                 │           │  safely visible  │
│  ─── (home) ─── │           │                 │
└─────────────────┘           │  ─── (home) ─── │
                              └─────────────────┘
```

### ⚠️ The Built-in One is DEPRECATED

The built-in `SafeAreaView` from React Native is now **deprecated** — use `react-native-safe-area-context` instead. The built-in one is also only applicable to iOS devices with iOS version 11 or later, meaning it doesn't work on Android.

### Install It

```bash
# Expo projects (already included if using Expo Router!)
npx expo install react-native-safe-area-context

# Plain React Native
yarn add react-native-safe-area-context
npx pod-install   # iOS only
```

You can skip installing `react-native-safe-area-context` if you created a project using the default Expo template — it's already installed as a peer dependency for Expo Router.

### Setup — Wrap Your Entire App First

```jsx
// App.tsx (root file)
import { SafeAreaProvider } from 'react-native-safe-area-context';

export default function App() {
  return (
    <SafeAreaProvider>
      {/* rest of your app */}
    </SafeAreaProvider>
  );
}
```

> 💡 `SafeAreaProvider` must wrap everything — it measures the device's safe area and passes that info down to all children.
> 

---

### 3 Ways to Use Safe Areas

### Way 1 — `SafeAreaView` Component (Most Common)

`SafeAreaView` is a regular `View` component with the safe area edges applied as padding. If you set your own padding on the view, it will be added to the padding from the safe area.

```jsx
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

function UnsafeScreen() {
  return (
    <View style={{ flex: 1, backgroundColor: "#1c1c1e" }}>
      <Text style={{ color: "#fff", fontSize: 18, padding: 16 }}>
        Header (bleeds under notch!)
      </Text>
      <Text style={{ color: "#aaa", padding: 16 }}>
        This content might be hidden behind the status bar in dark mode.
      </Text>
    </View>
  );
}

function SafeScreen() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#1c1c1e" }}>
      <Text style={{ color: "#fff", fontSize: 18, padding: 16 }}>
        Header (safely below notch ✅)
      </Text>
      <Text style={{ color: "#aaa", padding: 16 }}>
        This content respects the safe area on all devices.
      </Text>
    </SafeAreaView>
  );
}

export default function App() {
  return (
    <>
      <SafeScreen />
      {/* <UnsafeScreen /> */}
    </>
  );
}

```

You can also control **which edges** get safe area padding:

```jsx
// Only apply safe area on top and bottom, not sides
<SafeAreaView edges={['top', 'bottom']} style={{ flex: 1 }}>
  ...
</SafeAreaView>
```

---

### Way 2 — `useSafeAreaInsets` Hook (Advanced Control)

The hook gives you **direct access** to the safe area insets — this is useful when you need fine-grained control over padding on specific elements.

```jsx
import { View, Text } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function HomeScreen() {
  const insets = useSafeAreaInsets();
  // insets.top    → e.g. 59 on iPhone 14 Pro
  // insets.bottom → e.g. 34 (home indicator area)
  // insets.left   → usually 0
  // insets.right  → usually 0

  return (
    <View style={{
      flex: 1,
      paddingTop: insets.top,       // Push below notch
      paddingBottom: insets.bottom, // Push above home indicator
    }}>
      <Text style={{ fontSize: 24, padding: 16 }}>
        Perfectly placed! 🎯
      </Text>
    </View>
  );
}
```

> Use the hook when you need different background colors above/below the safe area, or when `SafeAreaView` isn't flexible enough.
> 

---

### Way 3 — `initialWindowMetrics` (Performance Optimization)

```jsx
import {
  SafeAreaProvider,
  initialWindowMetrics
} from 'react-native-safe-area-context';

// Speeds up first render by pre-loading metrics
export default function App() {
  return (
    <SafeAreaProvider initialMetrics={initialWindowMetrics}>
      ...
    </SafeAreaProvider>
  );
}
```

---

`initialWindowMetrics` gives you the safe area inset values **synchronously** — before the first render.

---

### The Problem with `useSafeAreaInsets`

`useSafeAreaInsets` hook reads inset values **asynchronously** — meaning on the very first render the values could be `0` for a split second, then update to real values. This can cause a **layout flicker.**

---

### `initialWindowMetrics` fixes that

It provides the inset values **immediately at app startup** before anything renders:

```jsx
import {
  SafeAreaProvider,
  initialWindowMetrics
} from 'react-native-safe-area-context';

export default function App() {
  return (
    <SafeAreaProvider initialMetrics={initialWindowMetrics}>
      {/* rest of your app */}
    </SafeAreaProvider>
  );
}
```

---

### What it contains

```jsx
console.log(initialWindowMetrics);

// {
//   insets: { top: 59, bottom: 34, left: 0, right: 0 },
//   frame:  { x: 0, y: 0, width: 390, height: 844 }
// }
```

| Value | Description |
| --- | --- |
| `insets` | Same safe area values as `useSafeAreaInsets` |
| `frame` | Full screen dimensions — x, y, width, height |

---

### In Short

|  | `useSafeAreaInsets` | `initialWindowMetrics` |
| --- | --- | --- |
| When available | After first render | Immediately at startup |
| Flicker risk | Slight risk | No flicker |
| Usage | Inside components | Passed to `SafeAreaProvider` |

> It's a **one liner addition** to `SafeAreaProvider` — just always add it, no reason not to.
> 

### SafeAreaView vs useSafeAreaInsets — When to Use Which?

|  | `SafeAreaView` | `useSafeAreaInsets` |
| --- | --- | --- |
| Use when | Wrapping a whole screen | Fine-grained per-element control |
| Performance | ✅ Better (native) | Slightly slower (JS bridge) |
| Flexibility | Medium | High |
| Common for | Screen root wrapper | Custom headers, tab bars |

---

---

## 2. StyleSheet — More Than Just `.create()`

Most beginners only use `StyleSheet.create()` but there are **3 powerful methods.**

---

### `StyleSheet.create()` — The Foundation

Organizes all your styles in one place and **validates them at build time** (catches typos like `backgroundColour` before they silently fail).

```jsx
import { View, Text, StyleSheet } from 'react-native';

export default function Card() {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>StyleSheet.create</Text>
      <Text style={styles.subtitle}>Clean and organized</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 20,
    margin: 16,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,           // Android shadow
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  subtitle: {
    fontSize: 14,
    color: '#888',
    marginTop: 4,
  },
});
```

> 💡 Notice `styles` is defined **outside** the component. This is important — if defined inside, it recreates the object on every render. Outside = created once. ✅
> 

---

### `StyleSheet.compose()` — Merge Two Styles

Combines two style objects into one. Clean alternative to array syntax.

```jsx
import { View, Text, StyleSheet } from 'react-native';

export default function App() {
  const isActive = true;

  // Instead of style={[styles.button, styles.activeButton]}
  // You can do:
  const buttonStyle = StyleSheet.compose(
    styles.button,
    isActive ? styles.activeButton : null
  );

  return (
    <View style={styles.container}>
      <View style={buttonStyle}>
        <Text style={styles.buttonText}>Composed Style</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 10,
    backgroundColor: '#ccc',   // Default grey
  },
  activeButton: {
    backgroundColor: '#6C63FF', // Override to purple when active
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
```

**Output:**

```
isActive = true  →  [ Purple Button ]
isActive = false →  [ Grey Button   ]
```

---

### `StyleSheet.flatten()` — Convert Style Array → Single Object

Takes an **array of styles** (or nested arrays) and flattens them into one plain JavaScript object. Useful when you need to read style values programmatically.

```jsx
import { StyleSheet, Text } from 'react-native';

const styleA = StyleSheet.create({ text: { color: 'red', fontSize: 16 } });
const styleB = StyleSheet.create({ text: { fontSize: 24, fontWeight: 'bold' } });

// Flatten merges them — later styles WIN on conflicts
const flat = StyleSheet.flatten([styleA.text, styleB.text]);
console.log(flat);
// → { color: 'red', fontSize: 24, fontWeight: 'bold' }
//              ↑ from A    ↑ from B (overrides A's 16)

export default function App() {
  return (
    <Text style={flat}>
      Flattened Style!
    </Text>
  );
}
```

> 💡 Real world use case — when a third-party component accepts a style prop and you need to extract actual values (like getting the `fontSize` number out of a style to do math with it).
> 

---

### All Three Together — Real World Pattern

```jsx
const base = StyleSheet.create({
  button: { padding: 14, borderRadius: 10 }
});

const variants = StyleSheet.create({
  primary: { backgroundColor: '#6C63FF' },
  danger:  { backgroundColor: '#FF4444' },
});

// compose merges two styles
const primaryBtn = StyleSheet.compose(base.button, variants.primary);
const dangerBtn  = StyleSheet.compose(base.button, variants.danger);

// flatten lets you read the final value
const finalStyle = StyleSheet.flatten(primaryBtn);
console.log(finalStyle.backgroundColor); // → '#6C63FF'
```

---

---

## 3. Responsive Design Techniques

React Native doesn't have CSS media queries. **Here's how you actually do responsive design.**

### The Problem

```
iPhone SE          iPhone 14 Pro Max    iPad
width: 375px       width: 430px         width: 1024px

Fixed px values look great on one, terrible on others!
```

---

### Technique 1 — Percentage-Based Widths

```jsx
<View style={{ width: '100%' }}>     // Always full width
<View style={{ width: '50%' }}>      // Always half width
<View style={{ width: '80%' }}>      // Always 80%
```

> Works well for widths. Doesn't work for font sizes or fixed spacing.
> 

---

### Technique 2 — `useWindowDimensions` (Dynamic & Updates on Rotation)

This is the **recommended way** to get screen size. Updates automatically when the device rotates.

```jsx
import { View, Text, useWindowDimensions } from 'react-native';
import * as ScreenOrientation from 'expo-screen-orientation';

export default function App() {
  const { width, height } = useWindowDimensions();
  const isTablet = width >= 768;
  const isLandscape = width > height;

  const lockLandscape = async () => {
    await ScreenOrientation.lockAsync(
      ScreenOrientation.OrientationLock.LANDSCAPE
    );
  };

  const lockPortrait = async () => {
    await ScreenOrientation.lockAsync(
      ScreenOrientation.OrientationLock.PORTRAIT
    );
  };

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <Text style={{ fontSize: width * 0.06 }}>
        Responsive Text 📱
      </Text>

      <View style={{
        flexDirection: isTablet ? 'row' : 'column',
      }}>
        <View style={{
          width: isTablet ? width / 2 : width - 32,
          backgroundColor: '#6C63FF',
          padding: 20,
          borderRadius: 12,
          marginBottom: isTablet ? 0 : 12,
        }}>
          <Text style={{ color: 'white' }}>Card 1</Text>
        </View>
        <View style={{
          width: isTablet ? width / 2 : width - 32,
          backgroundColor: '#FF6584',
          padding: 20,
          borderRadius: 12,
        }}>
          <Text style={{ color: 'white' }}>Card 2</Text>
        </View>
      </View>

      <Text style={{ color: '#888', marginTop: 16 }}>
        Screen: {Math.round(width)} × {Math.round(height)}
        {isLandscape ? ' (Landscape)' : ' (Portrait)'}
      </Text>

      {/* Orientation Buttons */}
      <View style={{ flexDirection: 'row', gap: 12, marginTop: 24 }}>
        <Pressable
          onPress={lockLandscape}
          style={{
            flex: 1,
            backgroundColor: '#6C63FF',
            padding: 12,
            borderRadius: 8,
            alignItems: 'center',
          }}
        >
          <Text style={{ color: 'white' }}>Force Landscape 🔄</Text>
        </Pressable>

        <Pressable
          onPress={lockPortrait}
          style={{
            flex: 1,
            backgroundColor: '#FF6584',
            padding: 12,
            borderRadius: 8,
            alignItems: 'center',
          }}
        >
          <Text style={{ color: 'white' }}>Force Portrait 📱</Text>
        </Pressable>
      </View>
    </View>
  );
}
```

**Output:**

```
Phone Portrait (375px):        Tablet (768px+):
┌───────────────────┐          ┌──────────────────────────┐
│ Responsive Text   │          │ Responsive Text           │
│ ┌───────────────┐ │          │ ┌────────────┐┌──────────┐│
│ │    Card 1     │ │          │ │   Card 1   ││  Card 2  ││
│ └───────────────┘ │          │ └────────────┘└──────────┘│
│ ┌───────────────┐ │          │ (side by side)            │
│ │    Card 2     │ │          └──────────────────────────┘
│ └───────────────┘ │
│ Screen: 375 × 812 │
└───────────────────┘
```

---

### Technique 3 — Scale Utility Functions (Industry Standard Pattern)

Create a utility file that scales sizes relative to a base design:

```jsx
// utils/responsive.ts
import { useWindowDimensions } from 'react-native';

const BASE_WIDTH = 390;   // Design was made for iPhone 14 width

export function useResponsive() {
  const { width, height } = useWindowDimensions();

  // Scale a size proportionally to screen width
  const scale = (size: number) => (width / BASE_WIDTH) * size;

  // Scale fonts — less aggressive scaling than layout
  const fontScale = (size: number) => {
    const scaled = (width / BASE_WIDTH) * size;
    return Math.max(size * 0.85, Math.min(scaled, size * 1.3));
    // ↑ Clamps between 85% and 130% of original size
  };

  return { width, height, scale, fontScale, isTablet: width >= 768 };
}

// Usage in any component:
import { useResponsive } from '../utils/responsive';

export default function ProfileCard() {
  const { scale, fontScale } = useResponsive();

  return (
    <View style={{
      padding: scale(16),        // 16 on base, scales up/down
      borderRadius: scale(12),
    }}>
      <Text style={{ fontSize: fontScale(18) }}>
        John Doe
      </Text>
    </View>
  );
}
```

---

---

## 4. `useColorScheme` — Dark / Light Mode

Detects whether the user has their phone set to dark or light mode.

```jsx
import {
  View, Text, StyleSheet,
  useColorScheme, Switch
} from 'react-native';
import { useState } from 'react';

// Define your theme colors
const themes = {
  light: {
    background: '#FFFFFF',
    card: '#F5F5F5',
    text: '#1A1A1A',
    subtext: '#666666',
    accent: '#6C63FF',
  },
  dark: {
    background: '#121212',
    card: '#1E1E1E',
    text: '#FFFFFF',
    subtext: '#AAAAAA',
    accent: '#9D97FF',
  },
};

export default function App() {
  const systemScheme = useColorScheme(); // 'dark' | 'light' | null
  const [manualDark, setManualDark] = useState<boolean | null>(null);

  // Manual toggle overrides system setting
  const isDark = manualDark !== null
    ? manualDark
    : systemScheme === 'dark';

  const theme = isDark ? themes.dark : themes.light;

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>

      {/* Header */}
      <View style={[styles.card, { backgroundColor: theme.card }]}>
        <Text style={[styles.title, { color: theme.text }]}>
          {isDark ? '🌙 Dark Mode' : '☀️ Light Mode'}
        </Text>
        <Text style={[styles.subtitle, { color: theme.subtext }]}>
          System preference: {systemScheme ?? 'unknown'}
        </Text>
      </View>

      {/* Toggle Row */}
      <View style={[styles.card, { backgroundColor: theme.card }]}>
        <View style={styles.row}>
          <Text style={[styles.label, { color: theme.text }]}>
            Override system theme
          </Text>
          <Switch
            value={manualDark ?? systemScheme === 'dark'}
            onValueChange={setManualDark}
            trackColor={{ false: '#ddd', true: theme.accent }}
            thumbColor="white"
          />
        </View>
      </View>

      {/* Content Card */}
      <View style={[styles.card, { backgroundColor: theme.card }]}>
        <Text style={[styles.title, { color: theme.accent }]}>
          Themed Card 🎨
        </Text>
        <Text style={[styles.subtitle, { color: theme.subtext }]}>
          Colors adapt to dark/light mode automatically
        </Text>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, gap: 12 },
  card: { padding: 20, borderRadius: 16 },
  row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  title: { fontSize: 20, fontWeight: 'bold' },
  subtitle: { fontSize: 14, marginTop: 4 },
  label: { fontSize: 16 },
});
```

**Output:**

```
Light Mode:                    Dark Mode:
┌──────────────────────┐       ┌──────────────────────┐
│ WHITE BACKGROUND     │       │ #121212 BACKGROUND   │
│ ┌──────────────────┐ │       │ ┌──────────────────┐ │
│ │☀️ Light Mode     │ │       │ │🌙 Dark Mode      │ │
│ │System: light     │ │       │ │System: dark      │ │
│ └──────────────────┘ │       │ └──────────────────┘ │
│ ┌──────────────────┐ │       │ ┌──────────────────┐ │
│ │Override    ◯──  │ │       │ │Override    ──●  │ │
│ └──────────────────┘ │       │ └──────────────────┘ │
└──────────────────────┘       └──────────────────────┘
```

> 💡 **Pro pattern** — extract this into a custom `useTheme()` hook so any component can access theme colors without prop drilling.
> 

```jsx
// hooks/useTheme.ts
import { useColorScheme } from 'react-native';

export function useTheme() {
  const scheme = useColorScheme();
  return scheme === 'dark' ? themes.dark : themes.light;
}

// In any component — just one line!
const theme = useTheme();
```

---

---

## 5. `useWindowDimensions` — Deep Dive

Already touched on this above, but let's go deeper since it's so important.

```jsx
import { useWindowDimensions } from 'react-native';

const { width, height, scale, fontScale } = useWindowDimensions();
```

| Property | What It Returns | Example |
| --- | --- | --- |
| `width` | Screen width in dp | 390 |
| `height` | Screen height in dp | 844 |
| `scale` | Pixel density ratio | 3 (iPhone = 3x) |
| `fontScale` | User's font size preference | 1.0, 1.15, 1.3... |

### The `fontScale` Property — Accessibility Gold

```jsx
import { Text, useWindowDimensions } from 'react-native';

export default function AccessibleText() {
  const { fontScale } = useWindowDimensions();
  // fontScale > 1 means the user has enlarged their system font

  return (
    <Text style={{
      fontSize: 16 * fontScale,  // Respect user's accessibility settings!
      lineHeight: 24 * fontScale,
    }}>
      This text respects your font size settings ♿
    </Text>
  );
}
```

### `useWindowDimensions` vs `Dimensions` API — What's the Difference?

```jsx
// ❌ OLD WAY — Dimensions API
import { Dimensions } from 'react-native';
const { width } = Dimensions.get('window');
// Problem: This is a snapshot — doesn't update when device rotates!

// ✅ NEW WAY — useWindowDimensions hook
import { useWindowDimensions } from 'react-native';
const { width } = useWindowDimensions();
// Updates automatically on rotation, split screen, etc.
```

---

## Everything Together — Full Responsive Dark Mode App

```jsx
import { View, Text, StyleSheet, useColorScheme, useWindowDimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const themes = {
  light: { bg: '#F8F8F8', card: '#FFFFFF', text: '#1A1A1A', accent: '#6C63FF' },
  dark:  { bg: '#0F0F0F', card: '#1A1A1A', text: '#FFFFFF', accent: '#9D97FF' },
};

export default function App() {
  const scheme = useColorScheme();
  const theme = scheme === 'dark' ? themes.dark : themes.light;
  const { width } = useWindowDimensions();

  const isTablet = width >= 768;
  const cardWidth = isTablet ? (width - 48) / 2 : width - 32;

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.bg }]}>
      <Text style={[styles.heading, { color: theme.text }]}>
        Dashboard
      </Text>

      <View style={[styles.row, isTablet && styles.rowTablet]}>
        {['Stats', 'Reports', 'Users', 'Settings'].map(item => (
          <View key={item} style={[
            styles.card,
            { backgroundColor: theme.card, width: cardWidth }
          ]}>
            <Text style={{ color: theme.accent, fontWeight: 'bold', fontSize: 16 }}>
              {item}
            </Text>
          </View>
        ))}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  heading: { fontSize: 28, fontWeight: 'bold', marginBottom: 20 },
  row: { flexDirection: 'column', gap: 12 },
  rowTablet: { flexDirection: 'row', flexWrap: 'wrap' },
  card: { padding: 20, borderRadius: 16, marginBottom: 4 },
});
```

---

## Quick Reference

```
SafeAreaView          → wrap screens, avoid notch/status bar issues
StyleSheet.create()   → define styles outside component (performance)
StyleSheet.compose()  → merge two styles cleanly
StyleSheet.flatten()  → array of styles → single object (read values)
useWindowDimensions   → reactive width/height (updates on rotation)
useColorScheme        → 'dark' | 'light' from system setting
```

> 🧠 **Golden rule of responsive RN design:**
Never hardcode pixel values for layout. Use `useWindowDimensions` for sizes, percentages for widths, and `useColorScheme` for colors. Your app will look great on every device. 🎯
>