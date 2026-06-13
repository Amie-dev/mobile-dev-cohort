The problem is that most people explain **APK, AAB, IPA, EAS Build, EAS Update** separately.

But the real question is:

> **What actually gets installed on a phone?**

Once you understand that, everything else becomes easy.

---

# Imagine You Built PocketFiles

You wrote:

```tsx
export default function App() {
  return <Text>Hello PocketFiles</Text>;
}
```

You also added:

```text
Expo Router
SQLite
Secure Store
Images
Fonts
Icons
Splash Screen
```

Inside your project folder you have:

```text
pocketfiles/
│
├── app/
├── assets/
├── package.json
├── node_modules/
├── app.config.ts
└── ...
```

---

# Question

Can Android install this folder?

```text
pocketfiles/
```

No.

Can iPhone install this folder?

No.

---

# Why?

Because phones don't understand:

```text
React Native
TypeScript
package.json
node_modules
```

A phone understands:

```text
Machine Code
Native Code
```

Just like humans understand English but not raw binary.

---

# Real World Analogy

Imagine you're building a house.

---

## Raw Materials

You have:

```text
Bricks
Cement
Sand
Steel
Wood
```

These are useful.

But can someone live inside:

```text
Pile Of Bricks
```

No.

---

## Finished House

After construction:

```text
Bricks
Cement
Steel
      ↓
Construction
      ↓
House
```

Now people can live there.

---

# Mobile App Is Exactly The Same

Your project is:

```text
Source Code
```

like:

```text
Bricks
Cement
Steel
```

---

The phone needs:

```text
Finished House
```

which is:

```text
APK
AAB
IPA
```

This finished package is called:

# Binary

---

# What Is A Binary?

A binary is:

> The final installable version of your application.

Think:

```text
Project Folder
      ↓
Build
      ↓
Binary
      ↓
Install
```

---

# What Happens During Build?

When you run:

```bash
eas build
```

Expo starts packaging everything.

---

## Step 1

Collect your code.

```text
Screens
Components
Hooks
Navigation
```

---

## Step 2

Collect assets.

```text
Images
Fonts
Icons
```

---

## Step 3

Collect native libraries.

```text
SQLite
Camera
SecureStore
```

---

## Step 4

Collect app settings.

```text
App Name
Package Name
Permissions
```

---

## Step 5

Package everything.

Result:

```text
PocketFiles.apk
```

or

```text
PocketFiles.ipa
```

---

# What Is Actually Inside An APK?

Most people never explain this.

An APK is not just:

```text
App
```

An APK contains:

```text
APK
│
├── Native Android Code
│
├── JavaScript Bundle
│
├── Images
│
├── Fonts
│
├── Icons
│
├── Splash Screen
│
├── SQLite
│
├── SecureStore
│
├── Permissions
│
├── App Config
│
└── Runtime Version
```

Everything is inside.

---

# Important Discovery

Notice:

```text
APK
│
├── Native Part
│
└── JavaScript Part
```

Your app has TWO brains.

---

# Native Brain

Created by:

```text
Android
iOS
```

Contains:

```text
Bluetooth
Camera
Location
Permissions
SQLite Native Code
```

---

# JavaScript Brain

Contains:

```text
React Components
Screens
Navigation
Logic
Styles
```

---

# Visualize It

```text
PocketFiles APK

┌─────────────────┐
│ Native Layer    │
│                 │
│ Camera          │
│ SQLite          │
│ Bluetooth       │
│ Permissions     │
└─────────────────┘

┌─────────────────┐
│ JS Layer        │
│                 │
│ Home Screen     │
│ Settings Screen │
│ Theme Logic     │
│ Navigation      │
└─────────────────┘
```

---

# Why EAS Build Exists

EAS Build creates this package.

```text
Source Code
      ↓
EAS Build
      ↓
Binary
```

---

# Why EAS Submit Exists

Once binary exists:

```text
PocketFiles.aab
```

Users still can't download it.

Need:

```text
EAS Submit
```

```text
Binary
      ↓
Play Store
```

---

# Why EAS Update Exists

Now the really important part.

Suppose:

```text
PocketFiles v1
```

installed.

Inside:

```text
Native Layer
+
JS Layer
```

---

# Bug Found

Wrong button color.

Current:

```tsx
backgroundColor: "red"
```

Need:

```tsx
backgroundColor: "blue"
```

---

# Do We Need New APK?

No.

Only JS changed.

Native code stayed same.

---

Expo says:

```text
Don't rebuild everything.
Replace only JS Layer.
```

This is:

# EAS Update

---

# What EAS Update Actually Does

Before:

```text
APK

Native Layer
JS Layer v1
```

---

After OTA Update:

```text
APK

Native Layer
JS Layer v2
```

Only JS changed.

---

# Why Native Libraries Need Rebuild

Suppose you install:

```bash
npm install react-native-vision-camera
```

Now:

```text
Native Layer Changed
```

---

Old APK:

```text
Native Layer v1
```

New Project:

```text
Native Layer v2
```

Different.

EAS Update cannot modify native code.

Need:

```text
New APK
```

Therefore:

```bash
eas build
```

---

# Runtime Version Finally Makes Sense

Most tutorials explain runtime version badly.

Let's simplify.

---

Imagine:

### APK 1

Contains:

```text
SQLite v1
```

---

### APK 2

Contains:

```text
SQLite v2
```

---

You publish:

```text
JS Update Built For SQLite v2
```

---

If:

```text
APK 1
```

downloads:

```text
JS Update For SQLite v2
```

App crashes.

---

Runtime Version prevents this.

It asks:

```text
Is This Binary Compatible?
```

If:

```text
YES
```

Install update.

If:

```text
NO
```

Ignore update.

---

# Complete Mental Model

```text
React Native Project
        │
        ▼

Source Code

        │
        ▼

EAS Build

        │
        ▼

Binary
(APK/AAB/IPA)

        │
        ├── Native Layer
        │
        └── JS Layer

        │
        ▼

EAS Submit

        │
        ▼

Play Store
App Store

        │
        ▼

User Installs

        │
        ▼

EAS Update

        │
        ▼

Replace JS Layer

        │
        ▼

Native Layer Stays Same
```

# The One Sentence That Explains Everything

**A Binary is a complete packaged app containing native code, JavaScript, assets, permissions, libraries, and configuration.**

**EAS Build creates the binary.**

**EAS Submit uploads the binary.**

**EAS Update replaces only the JavaScript part of the binary after installation.**

Once this clicks, the entire Expo deployment ecosystem becomes easy to understand. 🚀
