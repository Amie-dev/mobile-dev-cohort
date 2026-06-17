# 🚀 Week 06 — Day 12

# EAS Workflows & Play Store Submission

📅 **07-06-2026**

---

# Introduction

In previous lessons we learned:

```text
React Native App
        ↓
EAS Build
        ↓
APK / AAB / IPA
        ↓
EAS Submit
        ↓
Store Upload
```

But in a real company, developers do not manually run:

```bash
eas build
eas submit
eas update
```

every day.

Everything is automated.

This is where **EAS Workflows** comes in.

---

# What is EAS Workflows?

EAS Workflows is Expo's built-in **CI/CD (Continuous Integration & Continuous Deployment)** system.

Think of it as:

```text
Robot Developer
```

that performs tasks automatically.

Instead of:

```text
Developer
      ↓
Build App
      ↓
Submit App
      ↓
Publish Update
```

You can configure:

```text
Push Code
      ↓
EAS Workflow
      ↓
Build App
      ↓
Run Tests
      ↓
Submit App
      ↓
Send Notification
```

Automatically.

---

# Why Do We Need EAS Workflows?

Imagine a team with:

```text
5 Developers
2 QA Engineers
1 Product Manager
```

Every day:

```text
New Feature
Bug Fix
Hotfix
```

If everything is manual:

```text
Developer Forgets Build
Developer Uploads Wrong Version
Developer Uses Wrong Profile
```

Mistakes happen.

---

# Solution

Automate everything.

```text
Git Push
      ↓
Workflow Runs
      ↓
Build Generated
      ↓
Store Uploaded
```

No manual steps.

---

# What is CI/CD?

Before learning Workflows, understand CI/CD.

---

## Continuous Integration (CI)

Whenever code changes:

```text
Developer Pushes Code
         ↓
Tests Run
         ↓
Build Created
```

Automatically.

---

## Continuous Deployment (CD)

After successful build:

```text
Build Created
       ↓
Deploy Automatically
```

---

# EAS Workflows = Expo CI/CD

```text
GitHub
    ↓
EAS Workflow
    ↓
Build
    ↓
Submit
    ↓
Update
```

---

# What Can EAS Workflows Do?

---

## Build Apps

```yaml
type: build
```

Creates:

```text
APK
AAB
IPA
```

---

## Submit Apps

```yaml
type: submit
```

Uploads to:

```text
Google Play
App Store Connect
```

---

## Publish OTA Updates

```yaml
type: update
```

Runs:

```bash
eas update
```

Automatically.

---

## Notifications

Send:

```text
Slack
Email
Discord
```

notifications after release.

---

# Workflow File Structure

Workflows live inside:

```text
.eas/
└── workflows/
    ├── production.yml
    ├── preview.yml
    └── update.yml
```

---

# Example Workflow

```yaml
name: Create Production Builds

on:
  push:
    branches:
      - main

jobs:
  build_android:
    type: build
    params:
      platform: android

  build_ios:
    type: build
    params:
      platform: ios
```

---

# Understanding This Workflow

When:

```text
Code Pushed To Main
```

↓

```text
Android Build
```

and

```text
iOS Build
```

start automatically.

---

# Job Types

---

## Build Job

```yaml
jobs:
  android_build:
    type: build
```

Creates:

```text
APK
AAB
```

---

## Submit Job

```yaml
jobs:
  android_submit:
    type: submit
```

Uploads to:

```text
Google Play Console
```

---

## Update Job

```yaml
jobs:
  production_update:
    type: update
```

Publishes:

```text
OTA Update
```

---

# Chaining Jobs

Example:

```yaml
jobs:
  build_android:
    type: build

  submit_android:
    type: submit
    after:
      - build_android
```

---

# What Happens?

```text
Build Android
      ↓
Success
      ↓
Submit Android
```

---

# Real Production Workflow

```yaml
jobs:
  build_android:
    type: build

  submit_android:
    type: submit
    after:
      - build_android

  update_production:
    type: update
    after:
      - submit_android
```

---

Visual:

```text
Build
   ↓
Submit
   ↓
Update
```

---

# Trigger Types

---

## Push Trigger

```yaml
on:
  push:
    branches:
      - main
```

Runs when:

```text
git push origin main
```

---

## Manual Trigger

Run manually:

```bash
eas workflow:run production.yml
```

---

# Why Teams Use EAS Workflows

Benefits:

✅ Automated builds

✅ Consistent releases

✅ Fewer mistakes

✅ Faster deployment

✅ Better collaboration

---

# Real Company Workflow

```text
Developer Pushes Code
          ↓
GitHub
          ↓
EAS Workflow
          ↓
Run Tests
          ↓
Build App
          ↓
Upload Store
          ↓
Notify Team
```

---

# Play Store Submission

Now let's understand how Android releases work.

---

# What is Google Play Console?

Google Play Console is the dashboard used to publish Android apps.

Official website:

[Google Play Console](https://play.google.com/console?utm_source=chatgpt.com)

---

# Before Publishing

You need:

```text
Google Account
```

and

```text
Play Console Developer Account
```

---

# Registration Fee

Google requires:

```text
One-Time Registration Fee
```

to publish apps.

---

# Play Store Release Process

```text
Build App
      ↓
Create AAB
      ↓
Upload To Play Console
      ↓
Review
      ↓
Publish
      ↓
Users Download
```

---

# Why Google Uses AAB

Google prefers:

```text
AAB
```

instead of:

```text
APK
```

because:

```text
Smaller Downloads
Device Optimization
Dynamic Delivery
```

---

# Production Build

Generate release bundle:

```bash
eas build \
--platform android \
--profile production
```

Output:

```text
app.aab
```

---

# Play Store Tracks

Google provides multiple release tracks.

---

## Internal Testing

For developers.

```text
Up To Small Team
```

---

## Closed Testing

For QA.

```text
Invite Only
```

---

## Open Testing

Public beta.

```text
Anyone Can Join
```

---

## Production

Real users.

```text
Play Store Release
```

---

# Typical Release Flow

```text
Internal Testing
        ↓
Closed Testing
        ↓
Open Testing
        ↓
Production
```

---

# Store Listing Requirements

Before publishing:

---

## App Name

Example:

```text
PocketFiles
```

---

## Description

Short Description:

```text
Offline File Manager
```

Long Description:

```text
Detailed Feature Description
```

---

## Screenshots

Required:

```text
Phone Screenshots
Tablet Screenshots (Optional)
```

---

## App Icon

Usually:

```text
512 × 512
```

---

## Feature Graphic

Used by Play Store.

```text
1024 × 500
```

---

## Privacy Policy

Required if app uses:

```text
Internet
Camera
Location
Accounts
```

---

# Content Rating

Google asks:

```text
Violence?
Gambling?
User Generated Content?
```

Determine app age rating.

---

# Data Safety Form

One of the most important sections.

Must disclose:

```text
What Data Is Collected

Email
Location
Photos
Files
Contacts
```

---

# Permissions Declaration

If app uses:

```text
Camera
Location
Storage
Microphone
```

Google may ask for justification.

---

# Signing

Android apps must be signed.

Without signing:

```text
Cannot Publish
```

EAS Build can manage:

```text
Android Keystore
```

automatically.

---

# Manual Upload

Traditional:

```text
Build AAB
      ↓
Login Play Console
      ↓
Upload AAB
```

---

# EAS Submit

Automated:

```bash
eas submit --platform android
```

---

# Internal EAS Submit Flow

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

# Service Account

Required for automation.

Google provides:

```text
Service Account JSON
```

Used by:

```text
EAS Submit
GitHub Actions
CI/CD
```

---

# Auto Submit

Build and upload together:

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

# Real Production Pipeline

```text
Developer Pushes Code
         ↓
EAS Workflow
         ↓
Production Build
         ↓
Generate AAB
         ↓
EAS Submit
         ↓
Play Console
         ↓
Internal Testing
         ↓
Production Release
```

---

# EAS Workflow + Play Store Architecture

```text
GitHub Push
       ↓
EAS Workflow
       ↓
Build Android
       ↓
Generate AAB
       ↓
Submit To Play Console
       ↓
Testing Track
       ↓
Production
       ↓
Users Download
```

---

# Interview Questions

### What is EAS Workflows?

A CI/CD automation service by Expo that automates build, submit, and update processes using workflow YAML files.

---

### What is CI/CD?

Continuous Integration and Continuous Deployment automate testing, building, and releasing software.

---

### Where are EAS Workflows stored?

```text
.eas/workflows/
```

---

### What is Google Play Console?

Google's platform for managing Android applications and publishing them to the Play Store.

---

### Why does Google require AAB?

AAB allows device-specific APK generation, resulting in smaller downloads and better optimization.

---

### What is the difference between EAS Build and EAS Submit?

```text
EAS Build
     ↓
Creates AAB

EAS Submit
     ↓
Uploads AAB
```

---

# Day 12 Summary

```text
Write Code
      ↓
Git Push
      ↓
EAS Workflow
      ↓
Build App
      ↓
Generate AAB
      ↓
Submit To Play Console
      ↓
Testing
      ↓
Production Release
      ↓
Users Install
```

### Memory Trick

```text
EAS Build
    = Creates App

EAS Submit
    = Uploads App

EAS Update
    = Updates App

EAS Workflows
    = Automates Everything
```

This is how modern Expo and React Native teams automate Android releases from code commit all the way to the Google Play Store. 🚀📱
