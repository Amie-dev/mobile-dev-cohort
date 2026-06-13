

---

# 🚀 Week 06 — Day 11

# Understanding EAS From Scratch

📅 06-06-2026

---

# Before Learning EAS

Let's understand how mobile apps actually work.

When you write:

```tsx
export default function App() {
  return <Text>Hello World</Text>;
}
```

You are writing:

```text
JavaScript
TypeScript
React Native
```

But phones do NOT understand React Native.

Phones understand:

```text
Android → Java/Kotlin
iOS → Objective-C/Swift
```

React Native sits between them.

```text
Your Code
     ↓
React Native
     ↓
Native Android/iOS
     ↓
Phone
```

---

# What Happens When You Run Expo?

You run:

```bash
npx expo start
```

Expo starts a development server.

```text
Laptop
 └── Expo Server
```

Then you scan QR code.

```text
Phone
 └── Expo Go
```

The phone downloads JavaScript from your computer.

```text
Laptop
   ↓ WiFi
Phone
```

Nothing is installed.

Nothing is built.

Nothing is compiled.

Expo Go simply runs your code.

---

# Think of Expo Go Like Chrome

When you build a website:

```text
HTML
CSS
JS
```

You don't create Chrome.

You run your code inside Chrome.

Same idea:

```text
React Native Code
        ↓
Expo Go
```

Expo Go is acting like a browser for React Native apps.

---

# Why Expo Go Is Amazing

For learning:

```text
Write Code
      ↓
Save
      ↓
Instant Refresh
```

No build.

No APK.

No installation.

No Android Studio.

No Xcode.

---

# The Hidden Problem

Imagine you install:

```bash
npx expo install expo-camera
```

Works.

Why?

Because Expo Go already contains Camera code.

```text
Expo Go
 ├── Camera
 ├── Location
 ├── Notifications
 ├── Sensors
 └── FileSystem
```

These are pre-installed.

---

# What If I Need Something New?

Let's say:

```bash
npm install react-native-ble-plx
```

Bluetooth library.

You write:

```tsx
import { BleManager } from "react-native-ble-plx";
```

Then open Expo Go.

Crash.

Error.

Why?

Because Expo Go doesn't contain Bluetooth code.

---

# The Important Realization

Your JavaScript says:

```tsx
Use Bluetooth
```

But Expo Go says:

```text
I don't have Bluetooth.
```

Therefore:

```text
Code Exists
       +
Native Library Missing
       =
App Cannot Run
```

---

# So What Do We Need?

We need our OWN version of Expo Go.

One that contains:

```text
Expo Go
      +
Bluetooth
      +
Camera
      +
Our Config
      +
Our Native Libraries
```

This becomes:

# Development Build

---

# What Is a Development Build?

Development Build is:

```text
A Custom Expo Go
```

Built specifically for YOUR project.

Instead of:

```text
Everyone Uses Same Expo Go
```

We get:

```text
My Custom Expo Go
```

containing:

```text
My Libraries
My Permissions
My Native Code
My Config
```

---

# Visual Difference

## Expo Go

```text
Expo Team Builds App
          ↓
Everyone Downloads Same App
```

---

## Development Build

```text
You Build App
        ↓
Contains Your Native Code
        ↓
Install On Device
```

---

# Why Development Builds Exist

React Native apps eventually need:

```text
Bluetooth
Payments
Maps
Push Notifications
Custom SDKs
Analytics
Native Features
```

Expo Go cannot include everything.

Development Builds solve that problem.

---

# But How Do We Create Development Builds?

This is where EAS starts.

---

# Enter EAS

EAS means:

```text
Expo Application Services
```

Think of EAS as:

```text
A Factory
```

You send:

```text
Source Code
```

EAS returns:

```text
Built Application
```

---

# Without EAS

You would need:

```text
Android Studio
Gradle
Java
Android SDK
Keystore
Signing Config
```

For Android.

And:

```text
Mac
Xcode
Certificates
Provision Profiles
```

For iOS.

---

# Problem

Many developers use:

```text
Windows
Linux
```

and cannot build iOS apps.

---

# EAS Solution

```text
Your Laptop
      ↓
Upload Project
      ↓
Expo Servers
      ↓
Build App
      ↓
Return APK / AAB / IPA
```

---

# What Actually Happens During EAS Build?

Suppose you run:

```bash
eas build --platform android
```

---

## Step 1

EAS uploads your project.

```text
Local Project
      ↓
Expo Cloud
```

---

## Step 2

Expo creates build machine.

```text
Linux VM
```

or

```text
macOS VM
```

---

## Step 3

Dependencies installed.

```bash
npm install
```

or

```bash
bun install
```

---

## Step 4

Native Android project generated.

```text
android/
```

created internally.

---

## Step 5

Gradle starts.

```text
Compile Java
Compile Kotlin
Bundle JS
```

---

## Step 6

Signing occurs.

```text
Keystore Applied
```

---

## Step 7

APK generated.

```text
app.apk
```

or

```text
app.aab
```

---

## Step 8

Download link returned.

```text
Build Complete
```

---

# What Is EAS Build?

So now we can define it properly.

EAS Build is:

> A cloud service that converts your React Native project into installable Android and iOS applications.

```text
Project
    ↓
EAS Build
    ↓
APK
AAB
IPA
```

---

# What Is EAS Submit?

Building is not publishing.

After build:

```text
app.aab
```

still sits on your computer.

Users cannot download it.

---

# Traditional Way

```text
Build App
      ↓
Login Play Console
      ↓
Upload File
      ↓
Fill Form
      ↓
Publish
```

---

# EAS Submit

Automates upload.

```text
Build
    ↓
EAS Submit
    ↓
Google Play
```

Command:

```bash
eas submit --platform android
```

---

# What Is EAS Update?

This is where things become really powerful.

Suppose:

```text
Version 1.0 Released
```

100,000 users install it.

---

# You Find a Bug

Button text wrong.

Wrong color.

Broken validation.

Typo.

---

# Traditional Mobile Workflow

```text
Fix Bug
      ↓
Build New APK
      ↓
Upload Store
      ↓
Wait Review
      ↓
Users Update
```

Maybe 1–3 days.

---

# EAS Update Workflow

```text
Fix JavaScript
        ↓
eas update
        ↓
Expo CDN
        ↓
Users Receive Update
```

Few minutes.

---

# Why Can EAS Update Do This?

Because React Native apps contain:

```text
Native Code
       +
JavaScript Bundle
```

EAS Update only replaces:

```text
JavaScript Bundle
```

---

# Think Of It Like Netflix

When you open Netflix:

```text
Netflix App Installed
```

But content changes daily.

The app remains.

The data changes.

---

# Same Idea

Installed App:

```text
Native Binary
```

Updates:

```text
JS Bundle
```

---

# What Cannot Be Updated?

If native code changes:

```bash
npm install react-native-vision-camera
```

You need:

```text
New Build
```

Because phone must install new native code.

---

# Complete Real World Flow

```text
Week 01
Learn React

       ↓

Week 02
Learn React Native

       ↓

Week 03
Navigation

       ↓

Week 04
Storage

       ↓

Week 05
Sensors

       ↓

Week 06
Deployment

       ↓

Build Real Product

       ↓

Expo Go

       ↓

Need Native Features

       ↓

Development Build

       ↓

EAS Build

       ↓

APK/AAB/IPA

       ↓

EAS Submit

       ↓

Play Store/App Store

       ↓

Users Install App

       ↓

Fix JS Bug

       ↓

EAS Update

       ↓

Users Receive Update
```

# The One-Sentence Summary

**Expo Go** = Run React Native code inside Expo's app.

**Development Build** = Your own custom Expo Go with your native libraries.

**EAS Build** = Cloud service that creates APK/AAB/IPA files.

**EAS Submit** = Uploads those builds to app stores.

**EAS Update** = Sends JavaScript updates to installed apps without rebuilding.

This mental model is usually what makes EAS finally "click" for React Native developers.
