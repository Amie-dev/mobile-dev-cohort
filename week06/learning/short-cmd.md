If you want **Week 06 notes that feel like a complete chapter/book**, then don't start with commands. Start with the problem, then gradually introduce EAS services, builds, submissions, updates, workflows, and finally all important commands.

A better structure is:

---

# Week 06 – Deployment & Release Management with EAS

## Day 11 (06-06-2026)

### Expo Application Services (EAS)

### 1. The Problem Before EAS

Imagine you have built an Expo app.

```text
PocketFiles
│
├── Screens
├── Components
├── SQLite
├── Secure Store
└── Assets
```

The application works perfectly on your computer.

Question:

```text
How do we get this app onto a user's phone?
```

React Native code itself cannot be installed.

We need:

```text
Source Code
        ↓
Compile
        ↓
Binary
        ↓
Store Upload
        ↓
User Install
```

This is where EAS comes in.

---

## What is EAS?

EAS stands for:

```text
Expo Application Services
```

EAS is Expo's cloud platform that helps developers:

* Build applications
* Generate APK/AAB/IPA files
* Manage credentials
* Submit applications
* Publish OTA updates
* Run CI/CD workflows

Think of EAS as:

```text
GitHub
   +
Build Server
   +
Play Console Helper
   +
OTA Update System
```

all combined into one platform.

---

## Why Do We Need EAS?

Without EAS:

```text
Install Android Studio
Install SDK
Setup Gradle
Create Keystore
Configure Signing
Generate AAB
Upload To Play Console
```

For iOS:

```text
Need Mac
Need Xcode
Need Certificates
Need Provisioning Profiles
```

A lot of manual work.

---

With EAS:

```bash
eas build
```

Expo cloud does everything.

---

# EAS Services

EAS consists of four major services.

```text
EAS Build
EAS Submit
EAS Update
EAS Workflows
```

---

# EAS Build

Purpose:

```text
Source Code
      ↓
APK / AAB / IPA
```

Build converts your project into an installable application.

---

# EAS Submit

Purpose:

```text
AAB / IPA
      ↓
Play Store / App Store
```

Submit uploads the binary.

---

# EAS Update

Purpose:

```text
JavaScript Changes
         ↓
Installed App
```

Update sends OTA updates.

---

# EAS Workflows

Purpose:

```text
Automation
```

Automatically:

```text
Build
Submit
Update
Test
```

without manual work.

---

# Installing EAS CLI

Global installation:

```bash
npm install --global eas-cli
```

Verify installation:

```bash
eas --version
```

Use latest version:

```bash
npx eas-cli@latest
```

---

# Authentication Commands

## Login

```bash
eas login
```

Alias:

```bash
eas account:login
```

Browser login:

```bash
eas account:login -b
```

Full syntax:

```bash
eas account:login [-s] [-b]
```

Options:

```text
-b Browser Login
-s SSO Login
```

---

## Check Current User

```bash
eas whoami
```

Output:

```text
amie-dev
```

Useful for:

```text
CI/CD
Multiple Accounts
Debugging
```

---

## Logout

```bash
eas logout
```

or

```bash
eas account:logout
```

---

# Project Setup

Initialize project:

```bash
eas init
```

This creates:

```text
Project ID
```

and links the project to Expo servers.

---

Configure build system:

```bash
eas build:configure
```

Creates:

```text
eas.json
```

---

Configure updates:

```bash
eas update:configure
```

Adds:

```json
{
  "updates": {
    "url": "https://u.expo.dev/PROJECT_ID"
  }
}
```

---

# Understanding App Binaries

Before building, understand the most important concept.

## What is a Binary?

A binary is the installable application.

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

## What is inside a binary?

```text
Native Android/iOS Code
React Native Runtime
JavaScript Bundle
Images
Fonts
Icons
Permissions
Libraries
Assets
```

Think:

```text
Project
   ↓
Build
   ↓
Binary
   ↓
Install App
```

---

# Build Profiles

Most companies use three profiles.

```text
Development
Preview
Production
```

---

# Development Build

Purpose:

```text
Developer Testing
```

Contains:

```text
Development Client
Metro Connection
Logs
Debug Menu
```

Build:

```bash
eas build --platform android --profile development
```

Run:

```bash
npx expo start --dev-client
```

---

# Why Development Build?

Expo Go cannot load every native module.

Example:

```bash
npx expo install expo-sqlite
```

```bash
npx expo install expo-secure-store
```

```bash
npx expo install expo-camera
```

Need:

```text
Custom Native Runtime
```

Development Build provides that runtime.

---

# Preview Build

Purpose:

```text
QA Testing
Client Review
Internal Testing
```

Build:

```bash
eas build --platform android --profile preview
```

Usually generates:

```text
APK
```

---

# Production Build

Purpose:

```text
Store Release
```

Build:

```bash
eas build --platform android --profile production
```

Generates:

```text
AAB
```

---

# Build Comparison

| Feature       | Development | Preview | Production |
| ------------- | ----------- | ------- | ---------- |
| Metro         | ✅           | ❌       | ❌          |
| Debug Menu    | ✅           | ❌       | ❌          |
| QA Testing    | ❌           | ✅       | ❌          |
| Store Release | ❌           | ❌       | ✅          |
| Real Users    | ❌           | ❌       | ✅          |

---

# Important Build Commands

Build Android:

```bash
eas build --platform android
```

Build iOS:

```bash
eas build --platform ios
```

Build All:

```bash
eas build --platform all
```

View builds:

```bash
eas build:list
```

View specific build:

```bash
eas build:view BUILD_ID
```

JSON output:

```bash
npx eas-cli@latest build:view BUILD_ID --json
```

Cancel build:

```bash
eas build:cancel BUILD_ID
```

---

# EAS Submit

Building creates the binary.

Users still cannot download it.

Need:

```bash
eas submit --platform android
```

Flow:

```text
AAB
 ↓
EAS Submit
 ↓
Google Play API
 ↓
Play Console
```

---

# EAS Update

OTA =

```text
Over The Air
```

Used when:

```text
JavaScript Changed
Native Code Did Not Change
```

Publish:

```bash
eas update --channel production
```

Example:

```bash
eas update \
--channel preview \
--platform android \
--message "Fixed file storage issue. Files are now saved permanently instead of cache storage."
```

---

# Most Important Rule in Expo

```text
UI Change?
Logic Change?
Screen Change?
Theme Change?
```

Use:

```bash
eas update
```

---

```text
Added Camera?
Added Notifications?
Added Location?
Changed Native Config?
```

Use:

```bash
eas build
eas submit
```

---

# Real Production Workflow

```text
Developer
      ↓
Development Build
      ↓
Preview Build
      ↓
QA Approval
      ↓
Production Build
      ↓
Submit To Play Store
      ↓
Users Install App
      ↓
Bug Found
      ↓
EAS Update
      ↓
OTA Release
      ↓
Need New Native Feature
      ↓
Build New Binary
      ↓
Submit Again
```

---

# Complete EAS Command Cheat Sheet

```bash
npm install --global eas-cli

eas login
eas whoami
eas logout

eas init

eas build:configure
eas update:configure

eas build
eas build:list
eas build:view BUILD_ID
eas build:cancel BUILD_ID

eas build --platform android --profile development
eas build --platform android --profile preview
eas build --platform android --profile production

eas submit --platform android

eas update
eas update:list
eas update:view UPDATE_ID

eas update --channel development
eas update --channel preview
eas update --channel production

eas workflow:list
eas workflow:run

eas env:list
eas env:create
eas env:pull
```

This version teaches the **full mental model** first (binary → build → submit → update), then introduces the commands in the exact order developers use them in real projects. That's much easier to understand than memorizing commands one by one.
