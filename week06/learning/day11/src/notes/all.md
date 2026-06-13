Your notes are already good, but for **Week 06 Day 13 (EAS Update)** you're still missing some advanced concepts that real Expo developers use daily:

* Update Lifecycle
* Update Architecture
* Channels vs Branches
* Runtime Versions
* Rollouts
* Republish
* Rollback
* Fingerprints
* Update Strategies
* Asset Updates
* Self-hosted vs EAS Hosted
* Development / Preview / Production Update Flow
* Common Mistakes
* Production Deployment Strategy

The biggest problem with most EAS Update tutorials is they explain commands but not **how the system actually works internally**.

Your uploaded notes cover the basics of EAS Update, Build, Submit, Workflows, Variants, Binaries, etc. 

---

# 🚀 Week 06 — Day 13

# EAS Update Complete Deep Dive

---

# Before EAS Update Existed

Suppose you release:

```text
PocketFiles v1.0.0
```

to:

```text
Google Play Store
App Store
```

Users install it.

Everything works.

---

## One Day Later

You discover:

```text
Login button broken
Wrong color
Wrong text
Navigation bug
```

Without OTA updates:

```text
Fix Bug
    ↓
Create New Build
    ↓
Upload Store
    ↓
Store Review
    ↓
User Downloads Update
```

Could take:

```text
1 Day
3 Days
1 Week
```

depending on review process.

---

# Why EAS Update Exists

EAS Update solves this problem.

Instead of:

```text
New Build
```

we do:

```text
New JS Bundle
```

---

# The Most Important Concept

Every Expo app contains:

```text
Native Layer
+
JavaScript Layer
```

---

## Native Layer

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

Contains:

```text
Camera
Bluetooth
Permissions
Native SDKs
```

---

## JavaScript Layer

Contains:

```text
Screens
Components
Navigation
Business Logic
Styling
Assets
```

---

# EAS Update Only Replaces

```text
JavaScript Bundle
```

and

```text
Assets
```

---

# EAS Update Cannot Replace

```text
Native Code
```

This single rule explains everything.

---

# Internal Architecture

When you build:

```bash
eas build
```

Expo creates:

```text
Binary
```

containing:

```text
Native Code
Runtime Version
Update Configuration
```

---

When you run:

```bash
eas update
```

Expo uploads:

```text
JavaScript Bundle
Assets
Metadata
```

to Expo servers.

---

# Complete Update Flow

```text
Developer
     ↓
eas update
     ↓
Expo CDN
     ↓
User Opens App
     ↓
Check For Updates
     ↓
Download Update
     ↓
Apply Update
```

---

# What Exactly Gets Updated?

## 1. React Components

```tsx
<Text>Hello</Text>
```

↓

```tsx
<Text>Welcome</Text>
```

✅ OTA

---

## 2. Navigation

```tsx
Stack Navigation
Tab Navigation
Expo Router
```

Changes:

✅ OTA

---

## 3. Styling

```tsx
backgroundColor: "red"
```

↓

```tsx
backgroundColor: "blue"
```

✅ OTA

---

## 4. Business Logic

```tsx
if (age >= 18)
```

↓

```tsx
if (age >= 21)
```

✅ OTA

---

## 5. Assets

```text
Images
Fonts
Icons
```

✅ OTA

---

# What Requires New Build?

## Native Libraries

Example:

```bash
npx expo install expo-camera
```

or

```bash
npm install react-native-vision-camera
```

❌ Requires Build

---

## Permissions

```json
{
  "android": {
    "permissions": [
      "CAMERA"
    ]
  }
}
```

❌ Requires Build

---

## SDK Upgrade

```text
Expo SDK 55
      ↓
Expo SDK 56
```

❌ Requires Build

---

## Package Name

```text
com.amie.pocketfiles
```

↓

```text
com.amie.pocketfiles.v2
```

❌ Requires Build

---

# Channels

Channels are one of the most misunderstood concepts.

---

## What Is A Channel?

A channel answers:

```text
Which updates should this app receive?
```

---

Example:

```text
development
preview
production
```

---

# Real Example

Development Build:

```json
{
  "channel": "development"
}
```

receives:

```bash
eas update --channel development
```

only.

---

Preview Build:

```json
{
  "channel": "preview"
}
```

receives:

```bash
eas update --channel preview
```

only.

---

Production Build:

```json
{
  "channel": "production"
}
```

receives:

```bash
eas update --channel production
```

only.

---

# Why Channels Matter

Imagine:

```text
Developer Testing New Feature
```

You accidentally push it to:

```text
Production Users
```

💥 Disaster.

Channels prevent this.

---

# Branches

Most beginners confuse Branches with Channels.

---

## Channel

Answers:

```text
Who receives update?
```

---

## Branch

Answers:

```text
Where does update come from?
```

---

Visual:

```text
Channel
    ↓
Branch
    ↓
Updates
```

---

# Runtime Version

This is the safety mechanism behind EAS Update.

---

## Why Needed?

Suppose:

```text
App v1.0
```

contains:

```text
Native Library A
```

---

Later:

```text
App v2.0
```

contains:

```text
Native Library B
```

---

If:

```text
v1 App
```

downloads:

```text
v2 JS Bundle
```

app might crash.

---

# Runtime Version Solves This

Only compatible updates are delivered.

Example:

```ts
runtimeVersion: {
  policy: "appVersion"
}
```

---

App Version:

```json
{
  "version": "1.0.0"
}
```

Runtime Version:

```text
1.0.0
```

---

Only updates matching:

```text
1.0.0
```

are installed.

---

# Rollouts

A production-grade feature.

---

## Problem

You release update:

```text
Version A
```

to:

```text
100,000 users
```

Bug appears.

All users affected.

---

## Rollout

Release gradually.

```text
10%
↓
25%
↓
50%
↓
100%
```

If bug appears:

```text
Stop rollout
```

before everyone receives it.

---

# Republish

Imagine:

```text
Update #15
```

was stable.

---

You publish:

```text
Update #16
```

and it breaks.

---

Instead of rebuilding:

```text
Republish #15
```

Instant recovery.

---

# Rollback

Rollback means:

```text
Current Update
      ↓
Previous Stable Update
```

Think:

```text
Git Revert
```

for OTA updates.

---

# Update Strategies

There are two major strategies.

---

## Strategy 1

Check on app launch.

Default.

```text
Open App
     ↓
Check Updates
```

Most common.

---

## Strategy 2

Manual Updates

Using:

```ts
checkForUpdateAsync()
fetchUpdateAsync()
```

You decide:

```text
When To Check
When To Download
When To Install
```

Useful for enterprise apps.

---

# Asset Updates

EAS Update doesn't only update JS.

It also updates:

```text
Images
Fonts
Lottie Files
Static Assets
```

Example:

```text
logo.png
```

can be replaced OTA.

---

# Fingerprints

Newer Expo versions use fingerprints.

A fingerprint represents:

```text
Native Project State
```

If native project changes:

```text
Fingerprint Changes
```

which helps determine compatibility.

---

# Development Channel Flow

```text
Developer
    ↓
development build
    ↓
eas update --channel development
    ↓
Only Dev Builds Receive It
```

---

# Preview Channel Flow

```text
Developer
    ↓
QA Team
    ↓
preview build
    ↓
eas update --channel preview
```

---

# Production Channel Flow

```text
Developer
    ↓
Production Build
    ↓
eas update --channel production
    ↓
Real Users
```

---

# Professional Deployment Strategy

Most teams use:

```text
Development
      ↓
Preview
      ↓
Production
```

---

## Development

```text
Test New Features
```

Channel:

```text
development
```

---

## Preview

```text
QA Verification
```

Channel:

```text
preview
```

---

## Production

```text
Real Users
```

Channel:

```text
production
```

---

# Common Mistakes

## Mistake 1

Installing native library and running:

```bash
eas update
```

Won't work.

Need:

```bash
eas build
```

---

## Mistake 2

Changing permissions via OTA.

Impossible.

Requires new binary.

---

## Mistake 3

Using one channel for everything.

Results:

```text
Testers
Developers
Users
```

all receive same updates.

---

## Mistake 4

Ignoring Runtime Versions.

Can cause crashes.

---

# Decision Tree

Ask:

```text
Did Native Code Change?
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

If:

```text
NO
```

↓

```bash
eas update
```

---

# Complete EAS Ecosystem

```text
Write Code
      ↓
Development Build
      ↓
EAS Build
      ↓
APK / AAB / IPA
      ↓
EAS Submit
      ↓
Stores
      ↓
Users Install
      ↓
EAS Update
      ↓
OTA Fixes
```

---

# Final Mental Model

```text
EAS Build
     ↓
Creates Binary

EAS Submit
     ↓
Uploads Binary

EAS Update
     ↓
Changes Binary After Installation
```

And the golden rule:

```text
JavaScript Change
        ↓
EAS Update

Native Change
        ↓
EAS Build
```

That's the complete professional mental model of EAS Update, including channels, branches, runtime versions, rollouts, republish, rollback, update strategies, fingerprints, assets, and production deployment workflows. It complements the EAS Build, Submit, Workflows, Variants, and Binary concepts already present in your notes. 
