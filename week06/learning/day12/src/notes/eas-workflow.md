# 🚀 Week 06 — Day 12

# EAS Workflows Deep Dive (CI/CD for Expo Apps)

📅 **07-06-2026**

---

# Before Learning EAS Workflows

Most developers learn:

```text
eas build
eas submit
eas update
```

But they miss a very important question:

> "Who runs these commands in a real company?"

For a personal project:

```text
Developer
    ↓
Run Build
    ↓
Run Submit
```

works fine.

But imagine:

```text
10 Developers
50 Commits Daily
Android App
iOS App
QA Team
Production Team
```

Manually running builds becomes impossible.

This is why CI/CD exists.

---

# What is CI/CD?

CI/CD is the automation of:

```text
Testing
Building
Deploying
Publishing
```

applications.

---

## CI

### Continuous Integration

Every code change gets:

```text
Checked
Tested
Built
```

automatically.

Example:

```text
Developer Pushes Code
        ↓
Tests Run
        ↓
Build Starts
```

---

## CD

### Continuous Deployment

After successful build:

```text
Deploy Automatically
```

Example:

```text
Build Success
      ↓
Play Store Upload
```

without manual work.

---

# What is EAS Workflows?

EAS Workflows is Expo's built-in CI/CD system.

Think:

```text
GitHub Actions
GitLab CI
CircleCI
Jenkins
```

but designed specifically for Expo projects.

---

# Simple Definition

```text
EAS Workflows
=
Automated Build
+
Automated Submit
+
Automated Update
```

---

# Why EAS Workflows?

Without workflows:

```text
Developer
    ↓
eas build
    ↓
eas submit
    ↓
eas update
```

Every time.

---

With workflows:

```text
Git Push
    ↓
Workflow Runs
    ↓
Everything Automated
```

---

# Real World Example

Imagine fixing a bug:

```text
Fix Login Bug
```

Push code:

```bash
git push origin main
```

Then automatically:

```text
Run Tests
      ↓
Create Android Build
      ↓
Create iOS Build
      ↓
Upload Stores
      ↓
Notify Team
```

No manual work.

---

# How EAS Workflows Work

## Step 1

Developer pushes code.

```text
GitHub
```

---

## Step 2

Workflow starts.

```text
EAS Servers
```

---

## Step 3

Configured jobs execute.

```text
Build
Submit
Update
```

---

## Step 4

Results generated.

```text
APK
AAB
IPA
OTA Update
```

---

# Workflow File Location

All workflow files live in:

```text
.eas/
└── workflows/
```

Example:

```text
.eas/
└── workflows/
    ├── production.yml
    ├── preview.yml
    ├── update.yml
    └── nightly.yml
```

---

# Understanding a Workflow File

Example:

```yaml
name: Production Build

on:
  push:
    branches:
      - main

jobs:
  build_android:
    type: build

    params:
      platform: android
```

---

# YAML Breakdown

## name

```yaml
name: Production Build
```

Workflow name shown in Expo dashboard.

---

## on

Defines trigger.

```yaml
on:
```

Means:

```text
When should workflow run?
```

---

## push

```yaml
push:
```

Means:

```text
When code is pushed
```

---

## branches

```yaml
branches:
  - main
```

Means:

```text
Only run for main branch
```

---

# Visual Flow

```text
Push To Main
      ↓
Workflow Starts
```

---

# Jobs

The most important section.

```yaml
jobs:
```

Means:

```text
Tasks To Perform
```

---

# Job Types

EAS currently supports three main job types:

```text
build
submit
update
```

---

# Build Job

Creates app binaries.

```yaml
jobs:
  build_android:
    type: build
```

Produces:

```text
APK
AAB
IPA
```

---

# Submit Job

Uploads builds.

```yaml
jobs:
  submit_android:
    type: submit
```

Uploads to:

```text
Google Play
App Store Connect
```

---

# Update Job

Publishes OTA updates.

```yaml
jobs:
  publish_update:
    type: update
```

Equivalent to:

```bash
eas update
```

---

# Build Parameters

Example:

```yaml
jobs:
  build_android:
    type: build

    params:
      platform: android
```

Meaning:

```text
Build Android App
```

---

# Android Build

```yaml
params:
  platform: android
```

---

# iOS Build

```yaml
params:
  platform: ios
```

---

# All Platforms

```yaml
params:
  platform: all
```

Produces:

```text
Android Build
+
iOS Build
```

---

# Build Profiles

Can use eas.json profiles.

Example:

```yaml
params:
  platform: android
  profile: production
```

Uses:

```json
{
  "build": {
    "production": {}
  }
}
```

from eas.json.

---

# Job Dependencies

Jobs can depend on each other.

---

Example

```yaml
jobs:
  build_android:
    type: build

  submit_android:
    type: submit

    after:
      - build_android
```

Meaning:

```text
Build Android
      ↓
Submit Android
```

---

# Visual

```text
build_android
       ↓
submit_android
```

---

# Multiple Dependencies

```yaml
after:
  - build_android
  - build_ios
```

Means:

```text
Wait For Both Builds
```

before continuing.

---

# Most Common Real Workflows

---

# Workflow 1

# Production Release

Most companies use this.

```yaml
name: Production Release

on:
  push:
    branches:
      - main

jobs:
  build:
    type: build

    params:
      platform: all
      profile: production

  submit:
    type: submit

    after:
      - build
```

---

Flow

```text
Push Main
     ↓
Build Android
     ↓
Build iOS
     ↓
Submit Stores
```

---

# Workflow 2

# Preview Build

Used by QA teams.

```yaml
name: Preview Build

on:
  push:
    branches:
      - develop

jobs:
  preview_build:
    type: build

    params:
      platform: all
      profile: preview
```

---

Flow

```text
Push Develop
      ↓
Preview Build
      ↓
QA Testing
```

---

# Workflow 3

# OTA Update

Most frequently used after release.

```yaml
name: Production Update

on:
  push:
    branches:
      - main

jobs:
  update:
    type: update
```

---

Flow

```text
Fix UI Bug
      ↓
Push Main
      ↓
OTA Update Published
```

---

# Workflow 4

# Android Only Release

Many startups do Android first.

```yaml
name: Android Release

on:
  push:
    branches:
      - main

jobs:
  build_android:
    type: build

    params:
      platform: android

  submit_android:
    type: submit

    after:
      - build_android
```

---

# Workflow 5

# iOS Only Release

```yaml
name: iOS Release

on:
  push:
    branches:
      - main

jobs:
  build_ios:
    type: build

    params:
      platform: ios

  submit_ios:
    type: submit

    after:
      - build_ios
```

---

# Workflow 6

# Internal Testing

Used daily.

```yaml
name: Internal Testing

on:
  push:
    branches:
      - feature/*

jobs:
  build:
    type: build

    params:
      profile: development
      platform: android
```

---

Flow

```text
Feature Branch
      ↓
Development Build
      ↓
Developer Testing
```

---

# Workflow 7

# Full Enterprise Pipeline

Large companies.

```text
Push Code
      ↓
Run Tests
      ↓
Build Android
      ↓
Build iOS
      ↓
QA Testing
      ↓
Submit Stores
      ↓
OTA Updates
      ↓
Notify Team
```

---

# Typical Team Setup

## Development

```text
Branch:
develop

Profile:
development

Channel:
development
```

---

## QA

```text
Branch:
staging

Profile:
preview

Channel:
preview
```

---

## Production

```text
Branch:
main

Profile:
production

Channel:
production
```

---

# Real Release Pipeline

```text
Developer
      ↓
Feature Branch
      ↓
Develop Branch
      ↓
Preview Build
      ↓
QA Approval
      ↓
Main Branch
      ↓
Production Build
      ↓
Play Store
      ↓
App Store
```

---

# EAS Workflow + EAS Ecosystem

```text
Source Code
      ↓

Git Push
      ↓

EAS Workflow
      ↓

EAS Build
      ↓

APK / AAB / IPA
      ↓

EAS Submit
      ↓

Play Store
App Store
      ↓

Users Install
      ↓

EAS Update
      ↓

OTA Updates
```

---

# Common Workflow Mistakes

## Mistake 1

Everything uses production.

```text
Development
QA
Production
```

all mixed together.

Bad.

---

## Mistake 2

No build profiles.

Always create:

```text
development
preview
production
```

---

## Mistake 3

Using OTA for native changes.

```bash
eas update
```

cannot replace native code.

Need:

```bash
eas build
```

---

## Mistake 4

No job dependencies.

Submit starts before build finishes.

---

# Interview Questions

### What is EAS Workflows?

Expo's CI/CD system that automates building, submitting, and updating apps.

---

### Where are workflow files stored?

```text
.eas/workflows/
```

---

### What file format is used?

```text
YAML (.yml)
```

---

### What are the main EAS Workflow job types?

```text
build
submit
update
```

---

### What is the benefit of EAS Workflows?

Automates releases, reduces human errors, and speeds up deployments.

---

# Final Mental Model

```text
Developer Pushes Code
         ↓
EAS Workflow
         ↓
Build
         ↓
Submit
         ↓
Update
         ↓
Users Receive App
```

### Memory Trick

```text
EAS Build
= Create App

EAS Submit
= Upload App

EAS Update
= Update Installed App

EAS Workflow
= Automate Everything
```

This is the workflow architecture used by most modern Expo teams, from solo developers to large production applications. 🚀📱
