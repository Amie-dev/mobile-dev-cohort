# 🚀 Week 06 — Day 13

# EAS Update Deep Dive (OTA Updates, Channels, Branches, Runtime Versions & Update Strategies)

📅 **08-06-2026**

---

# Introduction

So far we learned:

```text
Source Code
      ↓
EAS Build
      ↓
APK / AAB / IPA
      ↓
EAS Submit
      ↓
Play Store / App Store
```

But now imagine:

You released your app.

```text
PocketFiles v1.0.0
```

10,000 users install it.

After release you discover:

```text
Wrong Button Color
Typo
Broken Validation
Wrong API URL
UI Bug
Navigation Bug
```

What should you do?

---

# Traditional Mobile App Workflow

Before OTA updates existed:

```text
Fix Bug
    ↓
Create New Build
    ↓
Upload Store
    ↓
Store Review
    ↓
Release
    ↓
Users Update
```

This can take:

```text
Hours
Days
Sometimes Weeks
```

for users to receive the fix.

---

# The Big Problem

Imagine:

```text
Login Button Broken
```

100,000 users cannot login.

Without OTA:

```text
Fix Bug
    ↓
Wait Review
    ↓
Wait User Update
```

Huge delay.

---

# Expo's Solution

## EAS Update

Instead of rebuilding:

```text
Fix JS
      ↓
Publish Update
      ↓
Users Receive Fix
```

within minutes.

This is called:

# OTA Update

**OTA = Over The Air Update**

---

# What Is EAS Update?

EAS Update is a service that allows Expo apps to receive:

```text
JavaScript Updates
Asset Updates
UI Updates
```

without requiring:

```text
New APK
New AAB
New IPA
```

---

# Simple Definition

```text
EAS Update
      ↓
Replace JS Bundle
Without Reinstalling App
```

---

# Understanding How React Native Apps Work

A React Native application consists of two major parts:

---

## Part 1: Native Layer

Android:

```text
Java
Kotlin
```

iOS:

```text
Swift
Objective-C
```

---

## Part 2: JavaScript Layer

```text
React Components
Hooks
Navigation
Business Logic
Screens
Styles
```

---

# Visual Architecture

```text
App
├── Native Code
│
└── JavaScript Bundle
```

---

# What EAS Update Replaces

```text
App
├── Native Code
│
└── JS Bundle ← Replace This
```

---

# What EAS Update Cannot Replace

```text
App
├── Native Code ← Cannot Change
│
└── JS Bundle
```

This distinction is the MOST important concept.

---

# Think Of It Like Netflix

When you install Netflix:

```text
Netflix App Installed
```

The application stays.

But content changes daily.

```text
Movies
Series
Metadata
Images
```

are downloaded dynamically.

---

# Expo Uses Similar Idea

Installed:

```text
Native Binary
```

Updated:

```text
JavaScript Bundle
Assets
```

---

# How EAS Update Works

## Step 1

User installs:

```text
PocketFiles 1.0.0
```

---

## Step 2

You find bug.

```tsx
<Button color="red" />
```

Should be:

```tsx
<Button color="blue" />
```

---

## Step 3

Publish update.

```bash
eas update
```

---

## Step 4

Expo servers store update.

```text
Expo CDN
```

---

## Step 5

App checks for updates.

```text
Launch App
      ↓
Check Server
      ↓
Download Update
      ↓
Apply Update
```

---

# What Can Be Updated?

This is where many developers get confused.

---

# Update Type 1: UI Updates

Example:

```tsx
<Text>Login</Text>
```

Change to:

```tsx
<Text>Sign In</Text>
```

✅ Works

---

# Update Type 2: Styling Updates

Example:

```tsx
backgroundColor: "red"
```

Change to:

```tsx
backgroundColor: "blue"
```

✅ Works

---

# Update Type 3: Navigation Updates

Example:

```tsx
Stack
Tab
Drawer
Expo Router
```

Changes:

✅ Works

---

# Update Type 4: Business Logic Updates

Example:

```tsx
if (age >= 18)
```

Change to:

```tsx
if (age >= 21)
```

✅ Works

---

# Update Type 5: API Changes

Example:

```tsx
const BASE_URL = "api.v1.com";
```

Change to:

```tsx
const BASE_URL = "api.v2.com";
```

✅ Works

---

# Update Type 6: Images

Example:

```text
logo.png
banner.jpg
```

Replace images.

✅ Works

---

# Update Type 7: Fonts

Example:

```text
Inter
Roboto
Poppins
```

Replace fonts.

✅ Works

---

# What Cannot Be Updated?

Anything requiring native code.

---

# Type 1: New Native Library

Example:

```bash
npx expo install expo-camera
```

or

```bash
npm install react-native-vision-camera
```

Requires:

```text
Native Android Code
Native iOS Code
```

❌ Cannot OTA Update

Need:

```text
New Build
```

---

# Type 2: Native Permissions

Example:

```json
CAMERA
LOCATION
BLUETOOTH
```

Added in:

```json
app.json
```

❌ Need Rebuild

---

# Type 3: SDK Upgrade

Example:

```text
Expo SDK 55
       ↓
Expo SDK 56
```

❌ Need Rebuild

---

# Type 4: Package Name Change

Example:

```text
com.amie.app
```

to

```text
com.amie.app.v2
```

❌ Need Rebuild

---

# Type 5: App Icon Change

Special case.

Often requires:

```text
New Binary Build
```

because icons are native assets.

---

# Two Major Release Types

Understanding this is critical.

---

# Release Type A

## OTA Release

Uses:

```bash
eas update
```

For:

```text
JS Changes
UI Changes
Logic Changes
```

---

# Release Type B

## Binary Release

Uses:

```bash
eas build
```

For:

```text
Native Changes
SDK Changes
Permissions
Libraries
```

---

# Decision Tree

Whenever you change something ask:

```text
Did Native Code Change?
```

If:

```text
NO
```

↓

```bash
eas update
```

If:

```text
YES
```

↓

```bash
eas build
```

---

# Channels

One of the most important EAS concepts.

---

# What Is A Channel?

Think of channels as:

```text
Separate Update Streams
```

Example:

```text
development
preview
production
```

---

# Why Channels Exist

Suppose:

```text
Developers
Testers
Real Users
```

all use your app.

You don't want unfinished updates reaching users.

---

# Bad Situation

```text
Development Update
        ↓
Production Users Receive It
```

💥 Disaster.

---

# Solution

Separate channels.

```text
development
preview
production
```

---

# Example

## Development Build

```json
{
  "channel": "development"
}
```

Receives:

```bash
eas update --channel development
```

only.

---

## Preview Build

```json
{
  "channel": "preview"
}
```

Receives:

```bash
eas update --channel preview
```

only.

---

## Production Build

```json
{
  "channel": "production"
}
```

Receives:

```bash
eas update --channel production
```

only.

---

# Real World Flow

```text
Developers
      ↓
development channel

QA Team
      ↓
preview channel

Real Users
      ↓
production channel
```

---

# Branches

Many developers confuse branches with channels.

---

# Channel

```text
Who Receives Update?
```

---

# Branch

```text
Where Updates Come From?
```

---

# Visual Model

```text
Channel
    ↓
Branch
    ↓
Updates
```

Example:

```text
production channel
        ↓
production branch
        ↓
updates
```

---

# Runtime Version

Most important safety mechanism.

---

# Problem

Imagine:

```text
App Version 1.0
```

contains:

```text
Native Library A
```

Then:

```text
App Version 2.0
```

contains:

```text
Native Library B
```

---

# Danger

If:

```text
1.0 App
```

downloads:

```text
2.0 JS Update
```

app may crash.

---

# Solution

Runtime Version

---

# Runtime Version Meaning

```text
Which Native Binary Is Compatible?
```

---

# Example

```json
{
  "runtimeVersion": {
    "policy": "appVersion"
  }
}
```

Version:

```json
{
  "version": "1.0.0"
}
```

Runtime:

```text
1.0.0
```

---

# User Flow

User installs:

```text
v1.0.0
```

Can only receive:

```text
runtimeVersion 1.0.0
```

updates.

Safe.

---

# Update Commands

---

## Publish Update

```bash
eas update
```

---

## Publish To Production

```bash
eas update \
--channel production \
--message "Fixed login bug"
```

---

## Publish To Preview

```bash
eas update \
--channel preview \
--message "QA testing build"
```

---

## Publish To Development

```bash
eas update \
--channel development \
--message "New feature testing"
```

---

# Rollback Updates

Suppose:

```text
Bad Update Published
```

Users crashing.

You can:

```text
Rollback
```

to previous update.

This is one of OTA's biggest advantages.

---

# Real Production Workflow

```text
Build Production App
        ↓
Users Install
        ↓
Bug Found
        ↓
Fix JavaScript
        ↓
Publish OTA
        ↓
Users Receive Update
```

No store review.

No APK rebuild.

No reinstall.

---

# Complete Expo Release Strategy

## Development Phase

```text
Expo Go
```

or

```text
Development Build
```

---

## Testing Phase

```text
Preview Build
```

Channel:

```text
preview
```

---

## Production Phase

```text
Production Build
```

Channel:

```text
production
```

---

## Small Fix

```bash
eas update
```

---

## Native Change

```bash
eas build
```

---

# Interview Questions

### What is EAS Update?

A service that delivers OTA (Over-The-Air) JavaScript and asset updates to Expo applications without requiring a new binary build.

---

### What can EAS Update change?

* React Components
* UI
* Styling
* Navigation
* Business Logic
* Images
* Fonts

---

### What cannot EAS Update change?

* Native Libraries
* Permissions
* Expo SDK Versions
* Native Code
* Package Names
* Bundle Identifiers

---

### What is a Channel?

A channel determines which update stream a build receives updates from.

---

### What is Runtime Version?

A compatibility layer that ensures updates are only delivered to compatible native binaries.

---

### When should I use EAS Build instead of EAS Update?

Whenever native code changes.

---

# Day 13 Summary

Think of Expo deployment like this:

```text
Native Changes?
      ↓
YES → EAS Build

JavaScript Changes?
      ↓
YES → EAS Update
```

And remember:

```text
EAS Build
     ↓
Creates Binary

EAS Submit
     ↓
Uploads Binary

EAS Update
     ↓
Updates Binary After Installation
```

This is the complete mental model used by professional Expo and React Native teams for shipping and maintaining production applications. 🚀📱
