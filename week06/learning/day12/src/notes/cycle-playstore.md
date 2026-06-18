# 🚀 Complete Expo Release Lifecycle

# From First Build → Play Store → OTA Updates → Native Changes → New Release

This is the **entire lifecycle of a production Expo application** and how companies continuously ship updates.

---

# Phase 1: Development

You start with a React Native project.

```text
PocketFiles
│
├── App Screens
├── Expo Router
├── SQLite
├── Secure Store
├── Images
├── Fonts
└── Config
```

At this stage:

```text
Only Source Code Exists
```

Nothing can be installed on a phone yet.

---

# Phase 2: Create Production Binary

## What is a Binary?

A binary is the final installable application.

Android:

```text
APK
AAB
```

iOS:

```text
IPA
```

---

## Build Process

Run:

```bash
eas build --platform android --profile production
```

EAS servers:

```text
Read Project
      ↓
Install Dependencies
      ↓
Generate Native Project
      ↓
Compile Native Code
      ↓
Bundle JavaScript
      ↓
Package Assets
      ↓
Generate AAB
```

Output:

```text
app.aab
```

---

# What's Inside the AAB?

```text
app.aab
│
├── Native Android Code
├── React Native Runtime
├── JavaScript Bundle
├── Images
├── Fonts
├── App Icons
├── Splash Screen
├── SQLite Native Code
├── Secure Store Native Code
├── Permissions
└── Runtime Version
```

This is a complete Android application.

---

# Phase 3: Submit To Play Store

Now the AAB exists.

Users still cannot download it.

Need:

```bash
eas submit --platform android
```

or

```bash
eas build --platform android --auto-submit
```

---

# EAS Submit Flow

```text
AAB
 ↓
EAS Submit
 ↓
Google Play API
 ↓
Play Console
```

Now Google receives your application.

---

# Phase 4: Play Store Review

Google checks:

```text
App Safety
Permissions
Privacy Policy
Content Rating
Target SDK
Store Listing
```

---

# Phase 5: Publish To Production

After approval:

```text
Play Console
       ↓
Production Track
       ↓
Users Download App
```

Users install:

```text
PocketFiles v1.0.0
```

---

# What Users Actually Have

Users now have:

```text
PocketFiles v1 Binary
```

Inside:

```text
Native Layer
+
JavaScript Layer
```

Visual:

```text
┌────────────────────┐
│ Native Layer       │
│                    │
│ SQLite             │
│ Secure Store       │
│ Permissions        │
└────────────────────┘

┌────────────────────┐
│ JS Layer           │
│                    │
│ Screens            │
│ Navigation         │
│ Components         │
│ Styles             │
└────────────────────┘
```

---

# Phase 6: Bug Found

Suppose:

```text
Wrong Button Color
```

Current:

```tsx
backgroundColor: "red"
```

Need:

```tsx
backgroundColor: "blue"
```

---

# Did Native Code Change?

No.

Only React code changed.

```text
Native Layer
      =
Unchanged

JavaScript Layer
      =
Changed
```

---

# Phase 7: Publish OTA Update

Use:

```bash
eas update --channel production
```

---

# What Happens?

Expo generates:

```text
New JS Bundle
```

and uploads it.

```text
Updated React Code
        ↓
Bundle JS
        ↓
Expo Update Server
```

---

# User Opens App

```text
Open App
     ↓
Check Updates
     ↓
Download New JS Bundle
     ↓
Apply Update
```

No Play Store review.

No new AAB.

No reinstall.

---

# OTA Architecture

Before:

```text
Phone

Native Layer v1
JS Bundle v1
```

After Update:

```text
Phone

Native Layer v1
JS Bundle v2
```

Only JS changed.

---

# What Changes Can Use OTA?

## UI Changes

```tsx
Button Color
Layout
Spacing
Typography
```

---

## Navigation Changes

```tsx
New Screen
Route Changes
Tabs
```

---

## Business Logic

```tsx
Validation
Filtering
Search Logic
Calculations
```

---

## Assets

```text
Images
Fonts
Lottie Files
```

---

# What Cannot Use OTA?

Now imagine:

```bash
npx expo install expo-camera
```

---

New native code added.

```text
Camera Native Module
```

Now:

```text
Native Layer Changed
```

---

# Why OTA Cannot Handle This?

Because users already installed:

```text
Binary v1
```

which does NOT contain:

```text
Camera Native Code
```

Expo cannot magically add native code into installed binaries.

---

# Example

Old App:

```text
Binary v1

Native Layer
 ├── SQLite
 └── Secure Store
```

---

New Project:

```text
Binary v2

Native Layer
 ├── SQLite
 ├── Secure Store
 └── Camera
```

Different native layer.

Requires rebuild.

---

# Phase 8: Native Change

You add:

```bash
npx expo install expo-camera
```

Configure:

```json
{
  "plugins": [
    "expo-camera"
  ]
}
```

---

Now you MUST create a new binary.

```bash
eas build --platform android --profile production
```

---

# New Binary Created

```text
PocketFiles v1.1.0
```

Contains:

```text
Native Layer
 ├── SQLite
 ├── Secure Store
 └── Camera
```

---

# Phase 9: Submit New Binary

```bash
eas submit --platform android
```

or

```bash
eas build --auto-submit
```

---

# Play Store Review Again

Because native code changed.

Google receives:

```text
New AAB
```

and reviews it.

---

# Users Update From Store

Users install:

```text
PocketFiles v1.1.0
```

Now they have:

```text
Native Layer v2
JS Bundle v1
```

---

# Phase 10: Continue OTA Updates

Now you can again use:

```bash
eas update --channel production
```

for future JS changes.

Example:

```text
Change Theme
Fix UI
Add Screen
Update Logic
```

without rebuilding.

---

# Real Production Timeline

## Day 1

Create first release.

```bash
eas build
eas submit
```

Result:

```text
v1.0.0
```

---

## Day 2

UI bug.

```bash
eas update
```

Result:

```text
OTA Update
```

---

## Day 5

Another bug.

```bash
eas update
```

Result:

```text
OTA Update
```

---

## Day 15

Need Camera feature.

```bash
expo install expo-camera
```

Native change.

Need:

```bash
eas build
eas submit
```

Result:

```text
v1.1.0
```

---

## Day 16

Button fix.

```bash
eas update
```

Result:

```text
OTA Update
```

---

## Day 30

Need Notifications.

```bash
expo install expo-notifications
```

Native change.

Need:

```bash
eas build
eas submit
```

Result:

```text
v1.2.0
```

---

# Complete Lifecycle Diagram

```text
Development
      ↓

EAS Build
      ↓

Generate AAB
      ↓

EAS Submit
      ↓

Play Store Review
      ↓

Production Release
      ↓

Users Install App
      ↓

JS Change?
      │
      ├── YES
      │      ↓
      │  EAS Update
      │      ↓
      │  OTA Update
      │
      └── NO

Native Change?
      │
      ├── YES
      │      ↓
      │  EAS Build
      │      ↓
      │  New AAB
      │      ↓
      │  EAS Submit
      │      ↓
      │  Play Store Review
      │
      └── NO
```

# Golden Rule

```text
JavaScript Change
        ↓
EAS Update

Native Change
        ↓
EAS Build
        ↓
EAS Submit
```

# The Entire Expo Deployment Cycle in One Sentence

```text
Build creates the binary,
Submit uploads the binary,
Users install the binary,
Update modifies the JavaScript inside the installed binary,
and whenever native code changes, a completely new binary must be built and submitted again.
```

This is the exact release cycle followed by most Expo and React Native production applications throughout their lifetime. 🚀📱
