# 🚀 Week 06 — Day 12

# EAS Submit Deep Dive

📅 **07-06-2026**

---

# Introduction

In the previous lesson we learned:

```text
Source Code
      ↓
EAS Build
      ↓
APK / AAB / IPA
```

Many beginners think:

> "My build is complete, my app is now available on Play Store."

❌ Wrong.

Creating a build and publishing an app are two different things.

---

# Understanding The Difference

## EAS Build

Creates:

```text
APK
AAB
IPA
```

Think:

```text
EAS Build
      ↓
Manufacturing Factory
```

It creates the product.

---

## EAS Submit

Uploads that product to the store.

Think:

```text
EAS Submit
      ↓
Delivery Service
```

It delivers the product.

---

# Real World Example

Imagine you manufacture a mobile phone.

---

## Factory

```text
Raw Materials
      ↓
Manufacturing
      ↓
Phone Created
```

Equivalent:

```text
Source Code
      ↓
EAS Build
      ↓
AAB Created
```

---

## Store

```text
Phone Created
      ↓
Send To Store
      ↓
Customers Buy
```

Equivalent:

```text
AAB Created
      ↓
EAS Submit
      ↓
Google Play Store
```

---

# Why EAS Submit Exists

Before EAS Submit developers had to:

```text
Create Build
      ↓
Download Build
      ↓
Open Play Console
      ↓
Upload Build
      ↓
Fill Metadata
      ↓
Submit
```

Many repetitive steps.

EAS Submit automates part of this workflow.

---

# What is EAS Submit?

**EAS Submit is a cloud service that uploads your already-built application to app stores.**

It supports:

```text
Google Play Store
Apple App Store Connect
```

---

# What EAS Submit DOES NOT Do

Many beginners misunderstand this.

EAS Submit does NOT:

❌ Create APK

❌ Create AAB

❌ Create IPA

❌ Review your app

❌ Publish automatically to users

Those are different processes.

---

# What EAS Submit Actually Does

It takes:

```text
AAB
or
IPA
```

and uploads it to:

```text
Google Play Console
or
App Store Connect
```

---

# Complete Mobile Release Pipeline

```text
React Native App
        ↓
EAS Build
        ↓
AAB / IPA
        ↓
EAS Submit
        ↓
Store Console
        ↓
Review Process
        ↓
Release
        ↓
Users Install
```

---

# Prerequisites For EAS Submit

Before using EAS Submit several requirements must be completed.

---

# Requirement 1: Expo Account

Login:

```bash
eas login
```

Verify:

```bash
eas whoami
```

---

# Requirement 2: EAS CLI

Install:

```bash
npm install --global eas-cli
```

Verify:

```bash
eas --version
```

---

# Requirement 3: Successful Build

EAS Submit requires:

```text
Android → AAB
iOS → IPA
```

Example:

```bash
eas build --profile production --platform android
```

Output:

```text
app.aab
```

---

# Requirement 4: Google Play Console

For Android submission.

Need:

* Developer Account
* Created App
* Permissions

Google charges a one-time registration fee.

---

# Requirement 5: Apple Developer Account

For iOS.

Need:

* Apple Developer Membership
* App Store Connect Access

Apple charges yearly membership fees.

---

# Android Submission Flow

Let's understand Android first.

---

# Traditional Android Workflow

```text
Build AAB
      ↓
Download AAB
      ↓
Open Browser
      ↓
Google Play Console
      ↓
Upload AAB
      ↓
Create Release
      ↓
Submit
```

---

# EAS Submit Workflow

```text
Build AAB
      ↓
EAS Submit
      ↓
Google Play Console
```

Much simpler.

---

# Building Android Production Bundle

First:

```bash
eas build \
--platform android \
--profile production
```

Produces:

```text
app.aab
```

---

# Submitting Android Build

```bash
eas submit \
--platform android
```

or

```bash
eas submit \
--platform android \
--latest
```

---

# What Does --latest Mean?

It tells EAS:

```text
Use Most Recent Build
```

Instead of manually selecting.

---

# Internal Android Flow

When you run:

```bash
eas submit --platform android
```

EAS:

```text
Authenticate
       ↓
Find Build
       ↓
Connect Play Console
       ↓
Upload AAB
       ↓
Create Release Draft
```

---

# Android Credentials

EAS Submit needs permission to access:

```text
Google Play Console
```

For this Expo uses:

```text
Google Service Account
```

---

# What Is A Service Account?

Think of it as:

```text
Robot User
```

that can upload builds.

Instead of:

```text
Manual Human Upload
```

you get:

```text
Automated Upload
```

---

# Android Service Account Setup

Inside:

```text
Google Play Console
```

Create:

```text
API Access
```

Then:

```text
Google Cloud Project
```

Generate:

```text
service-account.json
```

Upload to Expo.

---

# iOS Submission Flow

Now let's understand iOS.

---

# Traditional iOS Workflow

```text
Build IPA
      ↓
Open App Store Connect
      ↓
Upload IPA
      ↓
Wait Processing
      ↓
Create Release
```

---

# EAS Submit Workflow

```text
Build IPA
      ↓
EAS Submit
      ↓
App Store Connect
```

---

# Building Production IPA

```bash
eas build \
--platform ios \
--profile production
```

Produces:

```text
app.ipa
```

---

# Submitting IPA

```bash
eas submit \
--platform ios
```

---

# Internal iOS Flow

EAS:

```text
Authenticate Apple
      ↓
Upload IPA
      ↓
App Store Connect
      ↓
Processing
```

---

# Apple Authentication

EAS Submit requires:

```text
Apple Developer Account
```

Usually:

```text
Apple ID
```

or

```text
App Store Connect API Key
```

---

# Recommended Authentication

Expo recommends:

```text
App Store Connect API Key
```

because:

✅ More secure

✅ Better automation

✅ CI/CD friendly

---

# Submit Using Latest Build

Android:

```bash
eas submit \
--platform android \
--latest
```

iOS:

```bash
eas submit \
--platform ios \
--latest
```

Most commonly used.

---

# Submit Specific Build

Sometimes multiple builds exist.

List builds:

```bash
eas build:list
```

Then submit selected build.

---

# Automating Build + Submit

Many teams use:

```text
Build
    ↓
Submit
```

automatically.

---

# Example Workflow

```text
Git Push
     ↓
EAS Build
     ↓
EAS Submit
     ↓
Store Draft
```

Used in CI/CD pipelines.

---

# How EAS Submit Works With eas.json

Example:

```json
{
  "submit": {
    "production": {}
  }
}
```

This tells EAS:

```text
Use Production Submission Profile
```

---

# Build vs Submit

| Feature                 | EAS Build | EAS Submit |
| ----------------------- | --------- | ---------- |
| Creates APK             | ✅         | ❌          |
| Creates AAB             | ✅         | ❌          |
| Creates IPA             | ✅         | ❌          |
| Uploads To Play Store   | ❌         | ✅          |
| Uploads To App Store    | ❌         | ✅          |
| Uses Cloud Servers      | ✅         | ✅          |
| Required Before Release | ✅         | ✅          |

---

# Common Beginner Mistakes

---

## Mistake 1

Thinking APK is enough.

Reality:

```text
APK Created
≠
Published
```

---

## Mistake 2

Using APK for Play Store.

Reality:

```text
Play Store
      ↓
Requires AAB
```

---

## Mistake 3

Trying Submit Before Build

Wrong:

```bash
eas submit
```

without build.

Need:

```bash
eas build
```

first.

---

## Mistake 4

Missing Service Account

Android uploads fail because:

```text
No Play Console API Access
```

---

## Mistake 5

Missing Apple Credentials

iOS uploads fail because:

```text
No App Store Authentication
```

---

# Real Production Workflow

```text
Write Code
      ↓
Testing
      ↓
Preview Build
      ↓
QA Approval
      ↓
Production Build
      ↓
EAS Build
      ↓
AAB / IPA
      ↓
EAS Submit
      ↓
Play Console
App Store Connect
      ↓
Review
      ↓
Release
      ↓
Users Install
```

---

# Interview Questions

### What is EAS Submit?

A cloud service from Expo that uploads Android AABs and iOS IPAs to their respective app stores.

---

### Does EAS Submit create APKs?

No.

EAS Build creates binaries.

EAS Submit uploads them.

---

### What is required before using EAS Submit?

* Expo Account
* EAS CLI
* Successful Build
* Store Account
* Authentication Credentials

---

### What is uploaded to Google Play Store?

```text
AAB
```

---

### What is uploaded to App Store Connect?

```text
IPA
```

---

### What is the difference between EAS Build and EAS Submit?

```text
EAS Build
      ↓
Creates App Binary

EAS Submit
      ↓
Uploads App Binary
```

---

# Day 12 Summary

Think of the Expo release process like this:

```text
Source Code
      ↓
EAS Build
      ↓
APK / AAB / IPA
      ↓
EAS Submit
      ↓
Google Play / App Store
      ↓
Store Review
      ↓
Release
      ↓
Users Install App
```

### One-Line Memory Trick

**EAS Build manufactures the app.**

**EAS Submit delivers the app to the store.** 🚀📱
