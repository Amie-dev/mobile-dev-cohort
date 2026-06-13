# 🚀 Week 06 — Day 11

# EAS Build Deep Dive (With Prerequisites)

📅 **06-06-2026**

---

# Introduction

After understanding:

```text
Expo Go
      ↓
Development Build
      ↓
EAS
```

the next big question is:

> How does Expo actually create APK, AAB, and IPA files?

The answer is **EAS Build**.

EAS Build is one of the most important services in the Expo ecosystem because it transforms your React Native source code into a real mobile application that users can install.

---

# What is EAS Build?

**EAS Build** is a cloud build service provided by Expo.

It takes your Expo project and creates:

```text
Android APK
Android AAB
iOS IPA
```

without requiring you to manually configure Android Studio, Gradle, Xcode, certificates, or provisioning profiles.

---

## Simple Definition

```text
Source Code
      ↓
EAS Build
      ↓
Installable Mobile App
```

---

# Why EAS Build Exists

Before EAS Build, creating mobile apps was complicated.

For Android:

```text
Install Android Studio
Configure SDK
Configure Gradle
Generate Keystore
Configure Signing
Generate APK
```

For iOS:

```text
Need Mac
Install Xcode
Create Certificates
Create Provisioning Profiles
Configure Signing
Generate IPA
```

Many developers:

* Use Linux
* Use Windows
* Don't own Macs

EAS Build solves these problems using Expo's cloud infrastructure.

---

# What Problem Does EAS Build Solve?

Imagine you are using Ubuntu.

You run:

```bash
npx expo start
```

Everything works.

Then your client says:

> "Send me the APK."

Now you need:

```text
APK File
```

But React Native code alone cannot create APKs.

Android requires:

```text
Java
Gradle
Android SDK
Build Tools
Signing
```

EAS Build handles everything automatically.

---

# Local Build vs EAS Build

## Local Build

```text
Your Machine
      ↓
Android Studio
      ↓
Gradle
      ↓
APK
```

Problems:

❌ Heavy setup

❌ Long build times

❌ Platform issues

❌ SDK configuration

❌ Certificate management

---

## EAS Build

```text
Your Machine
      ↓
Expo Cloud
      ↓
Build Server
      ↓
APK/AAB/IPA
```

Benefits:

✅ No Android Studio required

✅ No Xcode required

✅ Automatic signing

✅ Works on Linux

✅ Works on Windows

✅ Cloud infrastructure

---

# EAS Build Architecture

When you run:

```bash
eas build --platform android
```

you are NOT building on your machine.

Instead:

```text
Your Laptop
      ↓
Upload Project
      ↓
Expo Build Server
      ↓
Compile Application
      ↓
Generate Binary
      ↓
Download Link
```

---

# Prerequisites Before Using EAS Build

Before building anything, several requirements must be completed.

---

# Prerequisite 1: Expo Account

EAS Build is an Expo cloud service.

Create account:

```text
https://expo.dev/signup
```

Login:

```bash
eas login
```

Check current user:

```bash
eas whoami
```

Example:

```text
amie-dev
```

---

# Prerequisite 2: Install EAS CLI

EAS CLI is the command-line tool used to communicate with Expo servers.

Install globally:

```bash
npm install --global eas-cli
```

or

```bash
bun add -g eas-cli
```

Check installation:

```bash
eas --version
```

---

# Prerequisite 3: Expo Project

You need a valid Expo project.

Example:

```bash
npx create-expo-app@latest foodgo
```

Move inside:

```bash
cd foodgo
```

Verify project runs:

```bash
npx expo start
```

---

# Prerequisite 4: app.json Configuration

EAS Build reads configuration from:

```text
app.json
```

or

```text
app.config.ts
```

Example:

```json
{
  "expo": {
    "name": "FoodGo",
    "slug": "foodgo",
    "version": "1.0.0"
  }
}
```

---

# Prerequisite 5: Unique App Identifier

Every app must have a unique identity.

---

## Android Package Name

Example:

```json
{
  "expo": {
    "android": {
      "package": "com.amie.foodgo"
    }
  }
}
```

Think:

```text
Package Name
      ↓
App Identity
```

No two apps should have the same package name.

---

## iOS Bundle Identifier

Example:

```json
{
  "expo": {
    "ios": {
      "bundleIdentifier": "com.amie.foodgo"
    }
  }
}
```

Equivalent of Android package name.

---

# Prerequisite 6: Configure EAS

Run:

```bash
eas build:configure
```

This creates:

```text
eas.json
```

---

# What is eas.json?

This file tells EAS how to build your application.

Example:

```json
{
  "build": {
    "development": {
      "developmentClient": true
    },
    "preview": {
      "distribution": "internal"
    },
    "production": {
      "autoIncrement": true
    }
  }
}
```

---

# Understanding Build Profiles

---

## Development Profile

```json
{
  "development": {
    "developmentClient": true
  }
}
```

Used for:

```text
Developer Testing
```

Creates:

```text
Development Build
```

---

## Preview Profile

```json
{
  "preview": {
    "distribution": "internal"
  }
}
```

Used for:

```text
QA Testing
Team Testing
Client Testing
```

---

## Production Profile

```json
{
  "production": {
    "autoIncrement": true
  }
}
```

Used for:

```text
Play Store
App Store
```

---

# What Happens Internally During EAS Build?

Let's see the complete pipeline.

---

## Step 1: Upload Project

Command:

```bash
eas build --platform android
```

Your source code is uploaded.

```text
Laptop
     ↓
Expo Cloud
```

---

## Step 2: Create Build Machine

Expo creates a temporary virtual machine.

```text
Linux VM
```

or

```text
macOS VM
```

depending on platform.

---

## Step 3: Install Dependencies

Runs:

```bash
npm install
```

or

```bash
bun install
```

---

## Step 4: Generate Native Project

Expo Prebuild runs internally.

```text
app.json
      ↓
Android Project
iOS Project
```

Generated automatically.

---

## Step 5: Compile Native Code

Android:

```text
Java
Kotlin
Gradle
```

compiled.

iOS:

```text
Swift
Objective-C
Xcode
```

compiled.

---

## Step 6: Bundle JavaScript

Metro Bundler creates:

```text
index.bundle
```

Contains:

```text
React Components
Hooks
Navigation
Business Logic
```

---

## Step 7: App Signing

Mobile operating systems require signed apps.

Android:

```text
Keystore
```

iOS:

```text
Certificates
Provisioning Profiles
```

EAS can manage these automatically.

---

## Step 8: Generate Binary

Android:

```text
APK
or
AAB
```

iOS:

```text
IPA
```

---

## Step 9: Upload Artifact

Stored on Expo servers.

You receive:

```text
Download Link
```

---

# Android Build Types

---

## APK

Android Package

```text
app.apk
```

Use for:

* Personal testing
* Client testing
* QA testing

Install directly:

```bash
adb install app.apk
```

---

## AAB

Android App Bundle

```text
app.aab
```

Required for:

```text
Google Play Store
```

Benefits:

* Smaller downloads
* Device optimization
* Dynamic delivery

---

# iOS Build Type

---

## IPA

```text
app.ipa
```

Used for:

* TestFlight
* App Store

---

# Build Commands

---

## Android

```bash
eas build --platform android
```

---

## iOS

```bash
eas build --platform ios
```

---

## Both Platforms

```bash
eas build --platform all
```

---

## Development Build

```bash
eas build \
--profile development \
--platform android
```

---

## Preview Build

```bash
eas build \
--profile preview \
--platform android
```

---

## Production Build

```bash
eas build \
--profile production \
--platform android
```

---

# Credentials Management

One of the biggest EAS Build features.

Without EAS:

```text
Generate Keystore
Store Securely
Configure Signing
```

With EAS:

```text
EAS Handles Credentials
```

or

```text
Use Existing Credentials
```

---

# Common Build Failures

### Wrong Package Name

```text
android.package missing
```

---

### Invalid Bundle Identifier

```text
ios.bundleIdentifier missing
```

---

### Dependency Errors

```text
npm install failed
```

---

### Native Module Errors

```text
Plugin configuration incorrect
```

---

### SDK Compatibility

```text
Library does not support current Expo SDK
```

---

# Real World Workflow

```text
Create App
      ↓
Test in Expo Go
      ↓
Need Native Features
      ↓
Development Build
      ↓
QA Testing
      ↓
Preview Build
      ↓
Client Approval
      ↓
Production Build
      ↓
AAB / IPA
      ↓
EAS Submit
      ↓
Play Store / App Store
```

---

# Interview Questions

### What is EAS Build?

A cloud build service that converts an Expo/React Native project into APK, AAB, and IPA binaries.

---

### Why use EAS Build instead of local builds?

It removes the need to manually configure Android Studio, Gradle, Xcode, certificates, and provisioning profiles.

---

### What are the prerequisites for EAS Build?

* Expo account
* EAS CLI
* Expo project
* app.json configuration
* Package name
* Bundle identifier
* eas.json

---

### What is the difference between APK and AAB?

APK is installable directly on Android devices, while AAB is the format required by Google Play Store.

---

### What happens internally during EAS Build?

Upload source → create cloud VM → install dependencies → generate native project → compile native code → bundle JS → sign app → generate APK/AAB/IPA → provide download link.

---

# Day 11 Key Takeaway

**EAS Build is essentially a cloud-based mobile app factory.**

```text
React Native Project
        ↓
EAS Build
        ↓
APK / AAB / IPA
```

It eliminates most of the complexity of native build systems and allows developers on Linux, Windows, or macOS to create production-ready mobile applications using Expo's cloud infrastructure.
