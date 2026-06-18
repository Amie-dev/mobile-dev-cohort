You're right. Most notes only cover **10-15 commands**, while EAS CLI actually has **50+ commands**. For a Week 06 deployment module, it is better to organize commands by category and explain **what they do, when to use them, and real-world scenarios**.

# 🚀 Complete EAS CLI Notes

## Expo Application Services (EAS) Command Reference

---

# EAS CLI Installation

Install globally:

```bash
npm install --global eas-cli
```

Run latest version without installing:

```bash
npx eas-cli@latest
```

Check version:

```bash
eas --version
```

Update EAS CLI:

```bash
npm update -g eas-cli
```

---

# Account Commands

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

SSO Login:

```bash
eas account:login -s
```

---

## Logout

```bash
eas logout
```

Alias:

```bash
eas account:logout
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

Used to verify which Expo account is active.

---

# Project Initialization

## Initialize Project

```bash
eas init
```

Creates:

```text
Project ID
EAS Project Connection
```

---

## Configure Build

```bash
eas build:configure
```

Creates:

```text
eas.json
```

Adds build profiles.

---

## Configure Updates

```bash
eas update:configure
```

Adds:

```json
{
  "updates": {
    "url": "https://u.expo.dev/project-id"
  }
}
```

---

# Credentials Commands

Used for:

```text
Android Keystore
Apple Certificates
Provisioning Profiles
```

---

## Manage Credentials

```bash
eas credentials
```

---

## Android Credentials

```bash
eas credentials --platform android
```

---

## iOS Credentials

```bash
eas credentials --platform ios
```

---

# Build Commands

The most important EAS feature.

Build creates:

```text
APK
AAB
IPA
```

---

## Interactive Build

```bash
eas build
```

CLI asks:

```text
Platform?
Profile?
```

---

## Android Build

```bash
eas build --platform android
```

---

## iOS Build

```bash
eas build --platform ios
```

---

## Both Platforms

```bash
eas build --platform all
```

---

# Development Build

```bash
eas build \
--platform android \
--profile development
```

Purpose:

```text
Developer Testing
Custom Native Modules
Metro Connection
```

Output:

```text
Development APK
```

---

# Preview Build

```bash
eas build \
--platform android \
--profile preview
```

Purpose:

```text
QA Team
Client Review
Internal Testing
```

Output:

```text
Preview APK
```

---

# Production Build

```bash
eas build \
--platform android \
--profile production
```

Purpose:

```text
Play Store Release
```

Output:

```text
AAB
```

---

# Auto Submit Build

```bash
eas build \
--platform android \
--auto-submit
```

Flow:

```text
Build
 ↓
Submit
```

Automatically.

---

# Build Status

```bash
eas build:list
```

View build history.

---

# Build Details

```bash
eas build:view BUILD_ID
```

Example:

```bash
eas build:view e2d9ef1a-ae09-40a7-806d-61581278dce4
```

---

# Build Details JSON

```bash
eas build:view BUILD_ID --json
```

Example:

```bash
npx eas-cli@latest build:view e2d9ef1a-ae09-40a7-806d-61581278dce4 --json
```

Used in:

```text
CI/CD
GitHub Actions
Automation
```

---

# Cancel Build

```bash
eas build:cancel BUILD_ID
```

---

# Download Build

```bash
eas build:download BUILD_ID
```

---

# Submit Commands

Uploads build to stores.

---

## Submit Android

```bash
eas submit --platform android
```

Uploads:

```text
AAB
→ Google Play Console
```

---

## Submit iOS

```bash
eas submit --platform ios
```

Uploads:

```text
IPA
→ App Store Connect
```

---

## Submit Specific Build

```bash
eas submit \
--platform android \
--id BUILD_ID
```

---

## Submission History

```bash
eas submission:list
```

---

## Submission Details

```bash
eas submission:view SUBMISSION_ID
```

---

# Update Commands (OTA)

OTA = Over The Air Updates

---

## Publish Update

```bash
eas update
```

Uploads:

```text
JavaScript Bundle
Assets
```

---

## Production Update

```bash
eas update --channel production
```

---

## Preview Update

```bash
eas update --channel preview
```

---

## Development Update

```bash
eas update --channel development
```

---

## Platform Specific Update

```bash
eas update \
--channel production \
--platform android
```

---

## Update With Message

```bash
eas update \
--channel preview \
--platform android \
--message "Fix major bug like previously files were only stored in cache, now stored permanently"
```

Best practice:

```text
Always add release messages
```

---

## Update History

```bash
eas update:list
```

---

## Update Details

```bash
eas update:view UPDATE_ID
```

---

## Republish Update

```bash
eas update:republish
```

Useful when:

```text
Rollback
Restore Old Release
```

---

# Branch Commands

Branches store updates.

---

## List Branches

```bash
eas branch:list
```

---

## View Branch

```bash
eas branch:view BRANCH
```

---

## Create Branch

```bash
eas branch:create production
```

---

## Delete Branch

```bash
eas branch:delete preview
```

---

# Channel Commands

Channels connect builds to update branches.

---

## List Channels

```bash
eas channel:list
```

---

## View Channel

```bash
eas channel:view production
```

---

## Create Channel

```bash
eas channel:create production
```

---

## Edit Channel

```bash
eas channel:edit production
```

---

# Metadata Commands

Manage store metadata.

---

## Configure Metadata

```bash
eas metadata:configure
```

---

## Pull Metadata

```bash
eas metadata:pull
```

---

## Push Metadata

```bash
eas metadata:push
```

---

# Workflow Commands

Used for CI/CD automation.

Files:

```text
.eas/workflows/*.yml
```

---

## List Workflows

```bash
eas workflow:list
```

---

## Run Workflow

```bash
eas workflow:run
```

---

## View Workflow

```bash
eas workflow:view
```

---

# Environment Variable Commands

---

## List Variables

```bash
eas env:list
```

---

## Create Variable

```bash
eas env:create
```

---

## Delete Variable

```bash
eas env:delete
```

---

## Pull Variables

```bash
eas env:pull
```

Creates:

```text
.env.local
```

---

# Secret Commands

Used for:

```text
API Keys
Firebase Keys
Private Tokens
```

---

## Create Secret

```bash
eas secret:create
```

---

## List Secrets

```bash
eas secret:list
```

---

## Delete Secret

```bash
eas secret:delete
```

---

# Insights Commands

Analytics and build statistics.

```bash
eas insights
```

Used by teams to monitor:

```text
Build Success Rate
Update Adoption
Release Performance
```

---

# Complete Real-World Workflow

## Initial Setup

```bash
npm install --global eas-cli

eas login

eas whoami

eas init

eas build:configure

eas update:configure
```

---

## Development

```bash
eas build \
--platform android \
--profile development
```

Run:

```bash
npx expo start --dev-client
```

---

## QA

```bash
eas build \
--platform android \
--profile preview
```

Test APK.

---

## Production Release

```bash
eas build \
--platform android \
--profile production
```

Then:

```bash
eas submit --platform android
```

---

## Bug Fix (JS Only)

```bash
eas update \
--channel production \
--message "Fixed file storage issue"
```

No Play Store review.

---

## Native Change

```bash
npx expo install expo-camera
```

Need:

```bash
eas build \
--platform android \
--profile production

eas submit \
--platform android
```

---

# Ultimate EAS Memory Map

```text
eas login
      ↓
Connect Account

eas init
      ↓
Connect Project

eas build
      ↓
Create Binary

eas submit
      ↓
Upload Binary

eas update
      ↓
Update Installed App

eas workflow
      ↓
Automate CI/CD

eas env
      ↓
Manage Environment Variables

eas credentials
      ↓
Manage Certificates

eas metadata
      ↓
Manage Store Listing
```

## Golden Rule

```text
React/JS Change
        ↓
eas update

Native Change
        ↓
eas build
        ↓
eas submit
```

These are the EAS commands and workflows most commonly used in real Expo development, from local development all the way to Play Store and App Store releases. 🚀📱
