# 🚀 Week 06 — Day 11

# Expo Application Services (EAS) Complete Deep Dive

📅 **06-06-2026**

---

# Introduction

Until now in the Mobile Development Cohort, we have focused on:

* React Native Fundamentals
* Expo
* Navigation
* APIs
* Local Storage
* SQLite
* Sensors

Everything we built was running on our local machine or inside Expo Go.

But real users cannot install your project folder.

To make an app available to users, we must:

1. Build the application
2. Generate installable files
3. Test on real devices
4. Submit to app stores
5. Push updates after release

This is where **Expo Application Services (EAS)** comes in.

---

# The Problem Before EAS

Imagine building a React Native application without Expo services.

For Android you need:

* Android Studio
* Android SDK
* Gradle
* Keystore Management
* Build Signing
* APK Generation
* AAB Generation

For iOS you need:

* Mac Computer
* Xcode
* Apple Developer Account
* Certificates
* Provisioning Profiles
* Signing Configuration
* IPA Generation

The workflow becomes complex very quickly.

```text
Developer
     ↓
Configure Certificates
     ↓
Configure Signing
     ↓
Build Application
     ↓
Fix Build Errors
     ↓
Upload to Store
```

This process can be difficult for beginners.

---

# What is EAS?

**EAS (Expo Application Services)** is a collection of cloud services provided by Expo that helps developers build, update, submit, and deploy React Native applications.

Think of EAS as:

```text
GitHub → Stores Code

Vercel → Deploys Websites

EAS → Deploys Mobile Apps
```

EAS moves most complicated deployment work from your local machine to Expo's cloud infrastructure.

Instead of:

```text
My Computer
      ↓
Build App
```

We can do:

```text
My Computer
      ↓
Upload Source
      ↓
Expo Cloud Servers
      ↓
Build Application
      ↓
Generate APK/AAB/IPA
```

---

# Why Do We Need EAS?

## 1. Cloud Builds

Without EAS:

```text
Need Android Studio
Need Build Environment
Need Native Toolchains
```

With EAS:

```text
Write Code
Run Command
Cloud Builds App
```

---

## 2. Easier iOS Development

Traditionally:

```text
Need Mac
Need Xcode
Need Certificates
```

With EAS:

```text
Linux
Windows
Mac
     ↓
EAS Build
     ↓
IPA Generated
```

You can trigger iOS builds even if you are not developing directly on a Mac.

---

## 3. Automatic Credentials

Mobile apps require signing.

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

## 4. OTA Updates

Update users without releasing a new store version.

```text
Bug Found
     ↓
Fix JS Code
     ↓
EAS Update
     ↓
Users Receive Update
```

---

## 5. Team Collaboration

Multiple developers can:

* Build apps
* Share builds
* Test applications
* Release versions

from a centralized cloud platform.

---

# EAS Ecosystem

EAS is not a single service.

It is a collection of services.

```text
EAS
 ├── EAS Build
 ├── EAS Submit
 ├── EAS Update
 ├── EAS Workflows
 ├── EAS Hosting
 ├── EAS Metadata
 └── EAS Insights
```

Let's understand each one.

---

# EAS Build

## What is EAS Build?

EAS Build is a cloud build service.

It compiles your React Native application into:

```text
Android APK
Android AAB
iOS IPA
```

---

## What Happens Internally?

When you run:

```bash
eas build --platform android
```

EAS performs:

```text
Upload Source Code
        ↓
Install Dependencies
        ↓
Generate Native Project
        ↓
Compile App
        ↓
Sign Application
        ↓
Create Build Artifact
        ↓
Provide Download Link
```

---

## Android Output

### APK

Android Package

```text
app.apk
```

Used for:

* Testing
* Sharing
* Internal QA

Install directly:

```bash
adb install app.apk
```

---

### AAB

Android App Bundle

```text
app.aab
```

Used for:

* Google Play Store

Smaller download size.

Recommended for production.

---

## iOS Output

### IPA

```text
app.ipa
```

Used for:

* TestFlight
* App Store

---

# What is EAS Submit?

After building an app, it still needs to be uploaded.

Without EAS Submit:

```text
Build App
     ↓
Download File
     ↓
Open Play Console
     ↓
Upload Manually
```

With EAS Submit:

```text
Build App
     ↓
EAS Submit
     ↓
Store Upload Complete
```

Command:

```bash
eas submit --platform android
```

or

```bash
eas submit --platform ios
```

---

# What is EAS Update?

One of Expo's most powerful features.

---

## Traditional App Updates

Suppose:

```text
Version 1.0 Released
```

Bug found.

Without OTA:

```text
Fix Bug
     ↓
Create New Build
     ↓
Upload Store
     ↓
Review Process
     ↓
Users Update
```

May take days.

---

## With EAS Update

```text
Fix JS Code
     ↓
eas update
     ↓
Publish
     ↓
Users Receive Update
```

May take minutes.

---

# What Can EAS Update Change?

### Supported

✅ React Components

✅ TypeScript

✅ JavaScript

✅ Styles

✅ Images

✅ Fonts

✅ Business Logic

✅ Navigation

---

# What Cannot Be Updated?

Anything involving native code.

Examples:

❌ New Native Library

```bash
npx expo install react-native-vision-camera
```

Requires rebuild.

---

❌ SDK Upgrade

```text
SDK 55 → SDK 56
```

Requires rebuild.

---

❌ Android Permissions

```xml
CAMERA
LOCATION
```

Requires rebuild.

---

❌ iOS Configuration

Requires rebuild.

---

# What is EAS Workflows?

CI/CD for Expo applications.

Think:

```text
GitHub Push
      ↓
Run Tests
      ↓
Create Build
      ↓
Deploy
```

Automatically.

Useful for teams.

---

# What is EAS Hosting?

Used for:

* Expo Router Web Apps
* Static Websites
* Server Functions

Deployment similar to Vercel.

---

# What is EAS Metadata?

Helps manage:

* Store descriptions
* App screenshots
* Store listing assets

Programmatically.

---

# What is EAS Insights?

Production monitoring.

Provides information about:

* App performance
* User sessions
* Crashes
* Production metrics

---

# Development Build

One of the most important Expo concepts.

---

# What is a Development Build?

A Development Build is your own custom version of Expo Go.

Think:

```text
Expo Go
    +
Your Native Code
    +
Your Native Libraries
    =
Development Build
```

---

# Why Was Development Build Created?

Expo Go contains only pre-installed native modules.

Example:

```text
Camera
Location
Notifications
```

These are included.

But if your app needs:

```text
Vision Camera
Bluetooth SDK
Custom Native SDK
```

Expo Go cannot load them.

---

# Solution

Create your own Expo Go.

This is called:

```text
Development Build
```

---

# Expo Go vs Development Build

| Feature               | Expo Go | Development Build |
| --------------------- | ------- | ----------------- |
| Beginner Friendly     | ✅       | ⚠️                |
| Scan QR Code          | ✅       | ✅                 |
| Fast Setup            | ✅       | ❌                 |
| Custom Native Modules | ❌       | ✅                 |
| Production Testing    | ❌       | ✅                 |
| Own App Icon          | ❌       | ✅                 |
| Native Config Changes | ❌       | ✅                 |
| Real App Environment  | ❌       | ✅                 |

---

# When Should You Use Expo Go?

Use Expo Go for:

* Learning
* Experiments
* Practice Projects
* Small Demos

```text
Learning Stage
      ↓
Expo Go
```

---

# When Should You Use Development Build?

Use Development Build for:

* Real Products
* Team Projects
* Native SDKs
* Production Testing

```text
Professional Project
         ↓
Development Build
```

---

# Setting Up Development Build

## Step 1

Install Dev Client

```bash
npx expo install expo-dev-client
```

---

## Step 2

Install EAS CLI

Global:

```bash
npm install --global eas-cli
```

Or:

```bash
npx eas-cli@latest
```

---

## Step 3

Login

```bash
eas login
```

---

## Step 4

Initialize Project

```bash
eas build:configure
```

Creates:

```text
eas.json
```

---

## Step 5

Create Development Build

Android:

```bash
eas build \
--profile development \
--platform android
```

iOS:

```bash
eas build \
--profile development \
--platform ios
```

---

# Understanding eas.json

Generated by:

```bash
eas build:configure
```

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

# Development Profile

```json
{
  "development": {
    "developmentClient": true
  }
}
```

Used for local development.

---

# Preview Profile

```json
{
  "preview": {
    "distribution": "internal"
  }
}
```

Used for QA testing.

---

# Production Profile

```json
{
  "production": {
    "autoIncrement": true
  }
}
```

Used for App Store releases.

---

# EAS CLI Commands

## Login

```bash
eas account:login
```

Alias:

```bash
eas login
```

---

## Login Using Browser

```bash
eas account:login -b
```

---

## Login Using SSO

```bash
eas account:login -s
```

---

## Logout

```bash
eas account:logout
```

Alias:

```bash
eas logout
```

---

## Current User

```bash
eas whoami
```

Example:

```text
amie-dev
```

---

## Configure Project

```bash
eas build:configure
```

---

## Create Android Build

```bash
eas build --platform android
```

---

## Create iOS Build

```bash
eas build --platform ios
```

---

## Create Both Builds

```bash
eas build --platform all
```

---

## View Build History

```bash
eas build:list
```

---

## Cancel Build

```bash
eas build:cancel
```

---

## Submit Android

```bash
eas submit --platform android
```

---

## Submit iOS

```bash
eas submit --platform ios
```

---

## Publish Update

```bash
eas update
```

---

# Complete Real-World Workflow

```text
Develop App
      ↓
Expo Go
      ↓
Need Native Features
      ↓
Development Build
      ↓
QA Testing
      ↓
EAS Build
      ↓
Generate APK/AAB/IPA
      ↓
EAS Submit
      ↓
Play Store/App Store
      ↓
Users Install App
      ↓
Bug Fix
      ↓
EAS Update
      ↓
Users Get Update
```

---

# Day 11 Summary

Today you learned:

✅ What EAS is

✅ Why EAS exists

✅ EAS Services

✅ EAS Build

✅ EAS Submit

✅ EAS Update

✅ EAS Workflows

✅ EAS Hosting

✅ EAS Metadata

✅ EAS Insights

✅ Development Build

✅ Expo Go vs Development Build

✅ Development Build Setup

✅ EAS CLI Commands

✅ eas.json Profiles

✅ Real Production Deployment Workflow

---

## Interview Questions

### What is EAS?

EAS (Expo Application Services) is a set of cloud services provided by Expo for building, updating, submitting, and deploying React Native applications.

### What is a Development Build?

A Development Build is a custom version of Expo Go that includes your app's native code and native dependencies.

### Difference between Expo Go and Development Build?

Expo Go supports only built-in Expo native modules, while Development Builds support custom native libraries and production-like testing.

### What is EAS Build?

A cloud service that generates APK, AAB, and IPA files from Expo projects.

### What is EAS Submit?

A service that uploads builds directly to Google Play Store and Apple App Store.

### What is EAS Update?

An OTA (Over-The-Air) update system that delivers JavaScript and asset updates without publishing a new app store version.

### When is a rebuild required?

Whenever native code, native dependencies, permissions, SDK versions, or app configuration changes.
