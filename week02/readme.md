# 📅 Week 02 — Day 03

# 📱 What is Mobile Development?

Mobile development is the process of creating applications for mobile devices like:

* Smartphones
* Tablets
* Wearables

These apps are designed specifically for mobile operating systems such as:

* Android
* iOS

Mobile apps can:

* access camera
* use GPS
* send notifications
* work offline
* use sensors and device hardware

---

# 📲 Mobile Operating Systems

## 🤖 Android

Developed by: Google

### Features

* Open-source based
* Huge global market share
* Runs on many brands:

  * Samsung
  * Xiaomi
  * OnePlus
  * Vivo

### Languages

* Java
* Kotlin

---

## 🍎 iOS

Developed by: Apple

### Features

* Closed ecosystem
* High performance
* Better optimization
* Strong security

### Languages

* Swift
* Objective-C

---

# 🛠️ Ways of Mobile Development

## 1. Native Development

Apps built specifically for one platform.

### Android

* Kotlin
* Java

### iOS

* Swift
* Objective-C

### ✅ Advantages

* Best performance
* Full device access
* Smooth UI/UX

### ❌ Disadvantages

* Separate codebases
* More development time
* Higher cost

---

## 2. Cross-Platform Development

One codebase for both Android and iOS.

### Popular Frameworks

* React Native
* Flutter
* Ionic

### ✅ Advantages

* Faster development
* Shared code
* Lower cost

### ❌ Disadvantages

* Sometimes slightly lower performance
* Native modules may still be needed

---

# ⚛️ Why React Native?

Meta created React Native.

It allows developers to build mobile apps using:

* JavaScript
* React

---

## ✅ Benefits of React Native

### 1. Single Codebase

Write once → run on Android & iOS.

---

### 2. Faster Development

* Reusable components
* Hot Reloading
* Huge ecosystem

---

### 3. Large Community

Massive community support and libraries.

---

### 4. React Knowledge Reuse

Web React developers can transition easily.

---

### 5. Native Components

Uses real native UI components internally.

---

### 6. Good Performance

Better performance than many hybrid frameworks.

---

# 🚀 What is Expo?

Expo is a framework/toolchain built around React Native.

It simplifies React Native development.

---

# ✅ Why Expo is Better for Beginners

## 1. Easy Setup

No need for:

* Android Studio configuration
* Xcode setup initially
* Native build setup

---

## 2. Faster Development

Run apps quickly using:

* Expo Go app
* QR code scanning

---

## 3. Built-in Features

Expo provides:

* Camera
* Notifications
* File System
* SQLite
* Sensors
* Location APIs

without manual native configuration.

---

## 4. OTA Updates

Push updates without publishing a new app version.

---

## 5. Great Developer Experience

* Fast refresh
* Easy debugging
* Cleaner workflow

---

# ⚛️ React Native vs Expo

| React Native                        | Expo                    |
| ----------------------------------- | ----------------------- |
| Core framework                      | Framework + toolchain   |
| Requires native setup               | Minimal setup           |
| More control                        | Easier development      |
| Better for advanced native features | Better for beginners    |
| Manual native configuration         | Many APIs preconfigured |

---

# 🏁 Conclusion

Mobile development allows developers to create powerful applications for smartphones and tablets.

React Native makes cross-platform development faster and easier, while Expo improves the developer experience by reducing setup complexity and providing many built-in tools.

These technologies together are excellent choices for beginners entering mobile app development.

---

# 📅 Week 02 — Day 04

# ⚛️ Core Components of React Native

React Native provides built-in components used to build mobile app UIs.

These components work similarly to HTML elements but are designed for mobile applications.

---

# 📦 Common Core Components

| Component              | Purpose                    |
| ---------------------- | -------------------------- |
| `View`                 | Container/layout wrapper   |
| `Text`                 | Display text               |
| `Image`                | Show images                |
| `TextInput`            | User input field           |
| `Pressable`            | Handle touch interactions  |
| `ScrollView`           | Scrollable content         |
| `FlatList`             | Optimized list rendering   |
| `SectionList`          | Grouped list rendering     |
| `Switch`               | Toggle true/false          |
| `SafeAreaView`         | Avoid notches/status bars  |
| `KeyboardAvoidingView` | Prevent keyboard overlap   |
| `ImageBackground`      | Background image container |

---

# 🧱 View

Equivalent of a `div` in web development.

Used for:

* layout
* grouping UI
* flexbox positioning

```tsx
<View>
  <Text>Hello</Text>
</View>
```

---

# 📝 Text

Used to display text.

```tsx
<Text>Hello React Native</Text>
```

---

# 🖼️ Image

Used to display images.

```tsx
<Image
  source={{ uri: "https://example.com/image.png" }}
  style={{ width: 100, height: 100 }}
/>
```

---

# ⌨️ TextInput

Used for user input.

```tsx
<TextInput
  placeholder="Enter name"
/>
```

---

# 👆 Pressable

Used for touch interactions.

```tsx
<Pressable onPress={() => console.log("Pressed")}>
  <Text>Click Me</Text>
</Pressable>
```

---

# 📜 ScrollView

Scrollable container.

Good for small content.

```tsx
<ScrollView>
  <Text>Content</Text>
</ScrollView>
```

---

# ⚡ FlatList

Optimized list rendering for large datasets.

```tsx
<FlatList
  data={items}
  renderItem={({ item }) => <Text>{item}</Text>}
/>
```

---

# 🔘 Switch

Toggle component.

```tsx
<Switch
  value={isDark}
  onValueChange={setIsDark}
/>
```

---

# 🛡️ SafeAreaView

Prevents content from overlapping:

* notches
* status bars
* device edges

```tsx
<SafeAreaView>
  <Text>Safe Content</Text>
</SafeAreaView>
```

---

# ⌨️ KeyboardAvoidingView

Moves UI when keyboard opens.

```tsx
<KeyboardAvoidingView
  behavior="padding"
>
```

---

# 🌄 ImageBackground

Displays background image behind content.

```tsx
<ImageBackground
  source={{ uri: image }}
>
  <Text>Hello</Text>
</ImageBackground>
```

---

# 🏁 Conclusion

Core components are the building blocks of React Native applications.

Understanding these components is essential for:

* layouts
* forms
* lists
* responsive design
* mobile interactions

They form the foundation of all React Native apps.
