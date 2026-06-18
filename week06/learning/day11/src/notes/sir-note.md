# EAS Services by Expo — Notes

**EAS = Expo Application Services**, a suite of cloud/hosted services that handle building, releasing, updating, and automating Expo and React Native apps.

These notes cover the four core services:

1. EAS Build
2. EAS Submit
3. EAS Update
4. EAS Workflows

> All EAS commands require the **EAS CLI**. Install it with `npm install -g eas-cli` (or run via `npx eas-cli@latest`).
> 

---

## 1. EAS Build

**What it is:** A hosted service that builds app binaries (the installable `.apk`/`.aab` for Android and `.ipa` for iOS — also called "standalone apps") in the cloud for Expo and React Native projects.

**Why it's useful:**

- Builds for Android and iOS in **consistent cloud environments** — no need for each team member to set up Xcode/Android Studio locally.
- **Manages app signing credentials** for you (Android keystores, iOS provisioning profiles & distribution certificates), or you can supply your own.
- Works with both Expo (CNG) projects and existing/bare React Native projects.

**Key features:**

- **Build profiles** in `eas.json` (named sets of build settings, e.g. `development`, `preview`, `production`).
- **Internal distribution** — share preview builds with testers via a single URL (APK for Android, ad hoc builds for iOS).
- **Auto-submit** successful builds to stores with `-auto-submit` (integrates with EAS Submit).
- First-class **`expo-updates` integration** (per-profile channels + runtime version handling).
- Reuse of **development builds** across the team when the project fingerprint matches.
- Dependency caching for faster builds.

**Common commands:**

```bash
eas build --platform all          # build both iOS + Android
eas build --platform android      # single platform
eas build --platform ios --auto-submit
eas build --local                 # run the build on your own machine
```

**When to use:** Production store binaries, sharing test builds, consistent team builds, CI automation.
**When NOT to use:** Debugging native code locally (use a local dev setup instead).

**Infrastructure:** Android builds run on Linux runners (GCP); iOS builds run on macOS runners in Expo's cloud.

---

## 2. EAS Submit

**What it is:** A hosted service for **submitting built binaries to the app stores** — Google Play Store and Apple App Store — directly from the command line, without manually using Google Play Console or Apple's Transporter app.

**Why it's useful:**

- Automates the **final delivery step** of distribution.
- Lets developers on **Windows and Linux upload iOS builds** (normally macOS-only).
- Reduces manual upload errors and standardizes releases across both platforms.
- Accepts binaries from EAS Build **or** locally built `.aab`/`.ipa` files.

**How it works:**

- **Android (Google Play):** Uploads the build to Play Console and places it in a chosen track — `internal`, `alpha`, `beta`, or `production`. *(Google requires one manual upload before API submissions work.)*
- **iOS (App Store Connect / TestFlight):** Uploads to App Store Connect; the build appears in **TestFlight**. It is **not** auto-released to the App Store — you must add metadata/screenshots and submit for App Review manually.

**Common commands:**

```bash
eas submit --platform android
eas submit --platform ios
eas submit --platform ios --path ./my-app.ipa     # submit a local binary
eas submit --platform android --latest --non-interactive   # CI-friendly
eas build --platform ios --auto-submit             # build + submit in one step
```

**Credentials needed:**

- **Android:** A Google Service Account Key with access to the app in Play Console.
- **iOS:** An Apple Developer account, `ascAppId`, and Apple ID / App Store Connect API key.

**Note:** EAS Submit uploads the binary but does **not** manage store listing metadata/screenshots (for iOS, **EAS Metadata** can automate this).

**When to use:** Uploading binaries to stores, submitting iOS from non-Mac machines, CI release pipelines.
**When NOT to use:** Local testing not ready for stores, or when no store listing exists yet.

---

## 3. EAS Update

**What it is:** A cloud service that serves **over-the-air (OTA) updates** to apps using the `expo-updates` library — letting you push JavaScript, styling, and image changes without a new app store submission.

**Why it's useful:**

- Ship **bug fixes and quick changes in minutes**, in between full store releases.
- Updates only the **non-native parts** of the app (JS, styles, images, assets).
- Users get the new version on their **next app launch** — no reinstall needed.

**Key features:**

- **JS API** with the `useUpdates()` React hook plus `checkForUpdateAsync()` / `fetchUpdateAsync()` for custom update strategies.
- **Insights / deployments dashboard** to track update adoption rates.
- **Republish** a previous stable update to quickly revert a bad one (like a git revert).
- **Rollouts** to push an update to a percentage of users gradually.
- **Runtime version policies** ensure updates only reach builds with compatible native code.

**Setup & common commands:**

```bash
npx expo install expo-updates
eas update:configure
# (then create a new build that includes expo-updates)
eas update --channel production --message "Fix login button alignment"
```

**When to use:** JS bug fixes, copy/translation/UI/styling tweaks, layout changes, staged rollouts.
**When NOT to use (requires a new build instead):**

- Changing native code or native dependencies
- Changing app permissions (camera, location, etc.)
- Updating the Expo SDK version
- Anything needing a new binary version

**vs CodePush:** EAS Update is the native Expo solution and integrates tightly with EAS Build for a unified workflow. (Classic Updates via `expo publish` is deprecated.)

---

## 4. EAS Workflows

**What it is:** A **CI/CD automation** service that chains EAS jobs (build, submit, update, and more) into automated pipelines for your React Native app — defined as YAML files in your repo.

**Why it's useful:**

- Automate your **development and release processes** end-to-end.
- Run jobs **in parallel or in sequence** with dependencies (`after`).
- Trigger automatically on **GitHub events** (e.g. push to `main`) or **App Store Connect events**.
- Uses **pre-packaged job types** so you don't have to wire up a generic CI yourself.

**How it's structured:**

- Workflows live in a `.eas/workflows/` directory at the project root as `.yml` files.
- Each workflow defines `jobs`, and each job has a `type` (e.g. `build`, `submit`, `update`, `slack`).

**Example workflow** (`.eas/workflows/create-production-builds.yml`):

```yaml
name: Create Production Builds

on:
  push:
    branches: ['main']   # auto-run when pushing to main

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

**Chaining jobs** (build, then submit after it succeeds):

```yaml
jobs:
  build_ios:
    type: build
    params:
      platform: ios
  submit_ios_to_store:
    type: submit
    params:
      platform: ios
    after:
      - build_ios
```

**Common commands:**

```bash
npx eas-cli@latest init                                  # link project to EAS
npx eas-cli@latest workflow:run create-production-builds.yml
```

**Tip:** The **Expo Tools VS Code extension** gives autocompletion and descriptions for workflow YAML files.

**When to use:** Automating builds + submissions + updates, GitHub-triggered pipelines, team release automation.

---

## Quick Comparison

| Service | Purpose | Key Output |
| --- | --- | --- |
| **EAS Build** | Build app binaries in the cloud | `.apk` / `.aab` / `.ipa` |
| **EAS Submit** | Upload binaries to app stores | Build in Play Console / TestFlight |
| **EAS Update** | Push OTA JS/asset updates | Live update to installed apps |
| **EAS Workflows** | Automate the above as CI/CD | Automated build/submit/update pipelines |
|  |  |  |
|  |  |  |

## How They Fit Together (Typical Flow)

1. **Build** the app binary → **EAS Build**
2. **Submit** that binary to the stores → **EAS Submit**
3. Push **quick fixes** between releases → **EAS Update**
4. **Automate** all of the above on git push → **EAS Workflows**

---

# Understanding Development Builds

Before learning EAS Build, it's important to understand a common question:

> If Expo Go already exists, why do we need Development Builds?
> 

---

## What is a Development Build?

A **Development Build** is a custom version of your app that includes:

- Your project code
- Expo development tools
- Any native libraries you install
- Debugging capabilities

Think of it as:

> "Your own personalized Expo Go app."
> 

Unlike Expo Go, a development build contains the exact native dependencies your project needs.

---

## Why Development Builds Exist

Expo Go only includes a predefined set of native modules.

For example:

```bash
npx expo install expo-camera
```

works in Expo Go because the camera module is already bundled inside Expo Go.

But if you install something like:

```bash
npm install react-native-vision-camera
```

Expo Go doesn't know about this library because it wasn't compiled into Expo Go.

Result:

```bash
Error: Native module not found
```

To use custom native libraries, you must create a Development Build.

---

## Development Build vs Expo Go

| Feature | Expo Go | Development Build |
| --- | --- | --- |
| Fast setup | ✅ | ❌ |
| Scan QR and run instantly | ✅ | ❌ |
| Supports Expo SDK modules | ✅ | ✅ |
| Supports custom native modules | ❌ | ✅ |
| Native code changes | ❌ | ✅ |
| Uses your own app icon/package name | ❌ | ✅ |
| Production-like environment | ❌ | ✅ |
| Team sharing | Limited | Better |

---

## Real-World Analogy

Imagine Expo Go is a:

> Rented apartment
> 

You can rearrange furniture (JavaScript code) but cannot break walls or modify plumbing (native code).

A Development Build is:

> Your own house
> 

You can modify anything, including plumbing, wiring, and structure.

---

## When Should You Use Expo Go?

Use Expo Go when:

- Learning React Native
- Building small demos
- Working only with Expo SDK packages
- Quickly testing UI changes

Example:

```bash
npx expo start
```

Scan QR code and start developing.

---

## When Should You Use Development Builds?

Use Development Builds when:

- Installing custom native libraries
- Using Vision Camera
- Using Stripe Native SDK
- Using Bluetooth libraries
- Using NFC libraries
- Building production apps
- Working with native Android/iOS code

Example:

```bash
eas build --profile development --platform android
```

Install the generated APK on your device.

---

## Creating a Development Build

### Step 1

Install EAS CLI

```bash
npm install -g eas-cli
```

### Step 2

Configure EAS

```bash
eas build:configure
```

### Step 3

Create a Development Profile

```json
{
  "build": {
    "development": {
      "developmentClient": true,
      "distribution": "internal"
    }
  }
}
```

### Step 4

Build

```bash
eas build --profile development --platform android
```

---

# Types of EAS Builds

EAS Build usually revolves around three major build types:

1. Development
2. Preview
3. Production

---

## 1. Development Build

Purpose:

- Local development
- Testing native modules
- Debugging

Configuration:

```json
{
  "development": {
    "developmentClient": true,
    "distribution": "internal"
  }
}
```

Characteristics:

- Includes developer menu
- Supports live reload
- Supports debugging
- Not intended for end users

Build Command:

```bash
eas build --profile development
```

---

## 2. Preview Build

Purpose:

- QA testing
- Client demos
- Internal testing

Configuration:

```json
{
  "preview": {
    "distribution": "internal"
  }
}
```

Characteristics:

- Looks similar to production
- Shareable via URL
- No Expo developer tools
- Great for stakeholders

Build Command:

```bash
eas build --profile preview
```

Example:

Developer finishes a feature and sends the build to:

- Product Manager
- Client
- QA Team

without publishing to app stores.

---

## 3. Production Build

Purpose:

- Play Store release
- App Store release

Configuration:

```json
{
  "production": {
    "autoIncrement": true
  }
}
```

Characteristics:

- Fully optimized
- Signed for stores
- Ready for release
- Uses production environment variables

Build Command:

```bash
eas build --profile production
```

---

## Build Lifecycle

A common workflow looks like:

```
Development Build
        ↓
Preview Build
        ↓
Production Build
```

Example:

```
Developer
    ↓
Development Build

QA Team
    ↓
Preview Build

App Store / Play Store
    ↓
Production Build
```

---

---

# What is a Binary?

## Definition

A **binary** is the final packaged version of your application that can be installed on a device.

Think of it as:

```
Source Code
     ↓
Compilation
     ↓
Binary
     ↓
Install on Device
```

When writing React Native code:

```jsx
<Text>Hello World</Text>
```

the phone cannot directly understand your source code.

The build process converts your project into an installable application package called a **binary**.

---

## Real-World Analogy

Imagine you're making a cake.

### Source Code

```
Flour
Eggs
Sugar
Milk
```

These are the ingredients.

---

### Binary

```
Finished Cake
```

Ready to eat.

Similarly:

```
React Native Code
Images
Fonts
Native Code
Dependencies
```

↓

```
APK
AAB
IPA
```

Ready to install.

---

## Why Do We Need Binaries?

Mobile devices cannot install:

```
App.js
package.json
node_modules
```

They install:

```
Android → APK / AAB

iOS → IPA
```

These files contain:

- JavaScript Bundle
- Native Android/iOS Code
- Images
- Fonts
- App Icon
- Splash Screen
- Dependencies
- Configuration

all packaged together.

---

# Types of Mobile App Binaries

There are three major formats:

```
Android
├── APK
└── AAB

iOS
└── IPA
```

---

# APK (Android Package)

## What is APK?

APK stands for:

```
Android Package Kit
```

It is the traditional Android installation file.

Think:

```
Android's .exe file
```

similar to Windows.

---

## File Extension

```
app.apk
```

---

## How Users Install It

### Direct Installation

```
WhatsApp
Google Drive
Website Download
```

↓

```
Install APK
```

No Play Store required.

---

## Example

```bash
eas build \
  --profile preview \
  --platform android
```

Can generate:

```
app.apk
```

for internal distribution.

---

## Advantages

### Easy Sharing

```
Send APK
      ↓
User Installs
```

---

### No Play Store Needed

Great for:

- QA Testing
- Client Testing
- Internal Builds

---

## Disadvantages

### Larger File Size

Contains:

```
All CPU Architectures
All Resources
```

inside one file.

---

### Not Recommended for Store Uploads

Google prefers:

```
AAB
```

for production releases.

---

## Common Use Cases

```
Development Builds
Preview Builds
Internal Testing
QA Testing
Client Demos
```

---

# AAB (Android App Bundle)

## What is AAB?

AAB stands for:

```
Android App Bundle
```

Google's modern publishing format.

---

## File Extension

```
app.aab
```

---

## Important

Users never install:

```
.aab
```

directly.

Instead:

```
Developer Uploads AAB
          ↓
Google Play
          ↓
Generates Optimized APK
          ↓
User Downloads APK
```

---

## How It Works

Traditional APK:

```
Single APK
     ↓
Everyone Downloads Same File
```

---

AAB:

```
Upload Bundle
       ↓
Google Creates Device-Specific APK
       ↓
Smaller Download
```

---

## Example

Suppose your app supports:

```
ARM64
ARMv7
x86
```

APK contains all of them:

```
50 MB
```

---

AAB lets Google generate:

```
ARM64 User
    ↓
Downloads only ARM64 files
```

Result:

```
20 MB
```

instead of:

```
50 MB
```

---

## Advantages

### Smaller Downloads

```
Less Storage
Faster Installation
```

---

### Google Play Recommended

Required for:

```
New Play Store Apps
```

---

### Dynamic Delivery

Google delivers:

```
Only Needed Resources
```

to each device.

---

## Disadvantages

### Cannot Install Directly

You cannot simply:

```
Share AAB
Install AAB
```

like APK.

---

## Common Use Cases

```
Play Store Releases
Production Deployments
Public Applications
```

---

# IPA (iOS App Archive)

## What is IPA?

IPA stands for:

```
iOS App Store Package
```

It is the installable binary for iPhones and iPads.

---

## File Extension

```
app.ipa
```

---

## Equivalent To

```
Android → APK

iOS → IPA
```

---

## How It Works

Developer:

```
Build IPA
      ↓
Upload to App Store Connect
      ↓
Apple Review
      ↓
Published
```

---

## Distribution Methods

### App Store

```
IPA
 ↓
App Store Connect
 ↓
Users Download
```

---

### TestFlight

```
IPA
 ↓
TestFlight
 ↓
Beta Testers
```

---

### Enterprise Distribution

Large companies can distribute internally.

---

## Example

```bash
eas build \
  --platform ios
```

Generates:

```
app.ipa
```

---

## Advantages

### Official Apple Format

Required for:

```
App Store
TestFlight
```

---

### Secure Distribution

Apple controls:

- Signing
- Verification
- Installation

---

## Disadvantages

### Cannot Install Freely

Unlike APK:

```
Send IPA
```

doesn't mean:

```
User Can Install It
```

Apple requires:

- App Store
- TestFlight
- Enterprise Signing

---

# Comparison

| Feature | APK | AAB | IPA |
| --- | --- | --- | --- |
| Platform | Android | Android | iOS |
| Extension | .apk | .aab | .ipa |
| Install Directly | ✅ | ❌ | Limited |
| Upload to Store | Possible | ✅ Recommended | ✅ |
| Internal Testing | ✅ | ❌ | Via TestFlight |
| Production Release | Possible | ✅ Best Practice | ✅ |
| Smaller Downloads | ❌ | ✅ | ✅ |

---

# Which One Should You Build?

## Development Build

```
APK
```

Reason:

```
Easy Installation
Easy Sharing
```

---

## QA / Client Testing

```
APK
```

or

```
IPA + TestFlight
```

---

## Play Store Release

```
AAB
```

Google Recommended.

---

## App Store Release

```
IPA
```

Required by Apple.

---

# How EAS Build Fits In

```
React Native App
        ↓

EAS Build
        ↓

Android
├── APK
└── AAB

iOS
└── IPA
```

Example Commands:

Development APK:

```bash
eas build \
  --profile development \
  --platform android
```

---

Production AAB:

```bash
eas build \
  --profile production \
  --platform android
```

---

Production IPA:

```bash
eas build \
  --profile production \
  --platform ios
```

---

# Interview Question

### Why does Google prefer AAB over APK?

Answer:

```
APK contains everything for every device.

AAB allows Google Play to generate
device-specific APKs, resulting in
smaller downloads and better performance.
```

### Quick Memory Trick

```
APK
=
Android Package
(Install Directly)

AAB
=
Android Bundle
(Upload to Play Store)

IPA
=
iPhone Application Archive
(Upload to App Store)
```

# Multiple App Variants in Expo & EAS

## What are App Variants?

App variants are multiple versions of the same application generated from a single codebase.

Example:

```
Codebase
   │
   ├── Development App
   ├── Preview App
   └── Production App
```

All three use the same React Native code but behave differently.

Examples:

```
MyApp Dev
MyApp Preview
MyApp
```

or

```
Uber Dev
Uber QA
Uber Production
```

---

# Why Do We Need App Variants?

In a real company:

### Developers

Use development builds.

```
API → localhost
Debugging Enabled
Dev Menu Enabled
```

---

### QA Team

Uses preview builds.

```
API → staging.company.com
Debugging Disabled
Internal Testing
```

---

### Users

Use production builds.

```
API → api.company.com
Fully Optimized
Published to Stores
```

---

# Problem Without Variants

Suppose all builds use:

```
com.company.myapp
```

When you install another version:

```
Development Build
```

and then

```
Production Build
```

Android/iOS treats them as the same application.

Result:

```
Production replaces Development
```

You can only have one installed.

---

# Solution

Each variant must have its own:

### Android

```
Application ID (Package Name)
```

Example:

```
com.company.myapp.dev
com.company.myapp.preview
com.company.myapp
```

---

### iOS

```
Bundle Identifier
```

Example:

```
com.company.myapp.dev
com.company.myapp.preview
com.company.myapp
```

Now all three can exist together on the same phone. (Expo Documentation)

---

# Step 1: Convert app.json to app.config.js

Static configuration:

```json
{
  "expo": {
    "name": "MyApp"
  }
}
```

Problem:

```
Cannot change values dynamically
```

Expo recommends using:

```
app.config.js
```

or

```
app.config.ts
```

because it supports JavaScript logic and environment variables. (Expo Documentation)

---

# Step 2: Create Environment Flags

Inside:

```jsx
app.config.js
```

```jsx
const IS_DEV = process.env.APP_VARIANT === "development";

const IS_PREVIEW =
  process.env.APP_VARIANT === "preview";
```

Expo officially uses:

```
APP_VARIANT
```

to determine which app variant is currently being built. (Expo Documentation)

---

# Step 3: Generate Dynamic Package Names

Create a helper:

```jsx
const getUniqueIdentifier = () => {
  if (IS_DEV) {
    return "com.company.myapp.dev";
  }

  if (IS_PREVIEW) {
    return "com.company.myapp.preview";
  }

  return "com.company.myapp";
};
```

This identifier will be used for:

```jsx
android.package
ios.bundleIdentifier
```

---

# Step 4: Generate Dynamic App Names

Create another helper:

```jsx
const getAppName = () => {
  if (IS_DEV) {
    return "MyApp (Dev)";
  }

  if (IS_PREVIEW) {
    return "MyApp (Preview)";
  }

  return "MyApp";
};
```

Result:

```
MyApp (Dev)
MyApp (Preview)
MyApp
```

all installed simultaneously. (Expo Documentation)

---

# Step 5: Configure app.config.js

```jsx
export default ({ config }) => ({
  ...config,

  name: getAppName(),

  ios: {
    ...config.ios,
    bundleIdentifier:
      getUniqueIdentifier(),
  },

  android: {
    ...config.android,
    package: getUniqueIdentifier(),
  },
});
```

This is the heart of Expo's multiple variant system. (Expo Documentation)

---

# Step 6: Configure eas.json

Now tell EAS which variant to build.

```json
{
  "build": {
    "development": {
      "developmentClient": true,
      "env": {
        "APP_VARIANT": "development"
      }
    },

    "preview": {
      "distribution": "internal",
      "env": {
        "APP_VARIANT": "preview"
      }
    },

    "production": {
      "env": {
        "APP_VARIANT": "production"
      }
    }
  }
}
```

When EAS starts a build:

```
development profile
```

it automatically sets:

```
APP_VARIANT=development
```

and your config changes dynamically. (Expo Documentation)

---

# Build Types Explained

## Development Build

Purpose:

```
Developer Testing
```

Characteristics:

- Development Client
- Fast Refresh
- Debugging
- Dev Menu
- Native Module Testing

Profile:

```json
{
  "development": {
    "developmentClient": true
  }
}
```

Command:

```bash
eas build --profile development
```

---

## Preview Build

Purpose:

```
QA Testing
Internal Distribution
Client Demo
```

Characteristics:

- Looks like production
- Not uploaded to stores
- Shared using URL

Profile:

```json
{
  "preview": {
    "distribution": "internal"
  }
}
```

Command:

```bash
eas build --profile preview
```

---

## Production Build

Purpose:

```
Play Store
App Store
```

Characteristics:

- Optimized
- Signed
- Release Build

Command:

```bash
eas build --profile production
```

---

# Variant-Specific API URLs

Development:

```
https://dev-api.company.com
```

Preview:

```
https://staging-api.company.com
```

Production:

```
https://api.company.com
```

Example:

```jsx
const getApiUrl = () => {
  if (IS_DEV) {
    return "https://dev-api.company.com";
  }

  if (IS_PREVIEW) {
    return "https://staging-api.company.com";
  }

  return "https://api.company.com";
};
```

Or use EAS Environment Variables (recommended). (Expo Documentation)

---

# EAS Environment Variables

Expo now recommends storing environment-specific values in EAS.

Examples:

```
development
```

```
EXPO_PUBLIC_API_URL
```

↓

```
https://dev-api.company.com
```

---

```
preview
```

↓

```
https://staging-api.company.com
```

---

```
production
```

↓

```
https://api.company.com
```

Create:

```bash
eas env:create
```

List:

```bash
eas env:list
```

Pull locally:

```bash
eas env:pull --environment development
```

This keeps secrets and configuration centralized across Builds, Updates and Workflows. (Expo Documentation)

---

# Running Variants Locally

Create scripts:

```json
{
  "scripts": {
    "start:dev":
      "APP_VARIANT=development expo start",

    "start:preview":
      "APP_VARIANT=preview expo start",

    "start:prod":
      "APP_VARIANT=production expo start"
  }
}
```

Run:

```bash
npm run start:dev
```

or

```bash
npm run start:preview
```

or

```bash
npm run start:prod
```

---

# Multiple Firebase Projects

Very common setup:

| Variant | Firebase |
| --- | --- |
| Dev | Firebase Dev |
| Preview | Firebase Staging |
| Production | Firebase Production |

Each variant can use:

```
google-services.json
```

or

```
GoogleService-Info.plist
```

from a different Firebase project.

---

# Multiple Icons

Most companies use different icons.

Example:

```
Dev Build
```

🟢 Green Icon

```
Preview Build
```

🟡 Yellow Icon

```
Production Build
```

🔵 Official Brand Icon

This prevents accidentally testing the wrong build. (Rhyce.dev)

---

# Complete Build Flow

```
Developer
     │
     ▼

Development Build
     │
     ▼

Preview Build
     │
     ▼

Production Build
```

---

# Real Industry Setup

```
APP_VARIANT=development
│
├─ MyApp Dev
├─ Dev Firebase
├─ Dev API
└─ Dev Icon

APP_VARIANT=preview
│
├─ MyApp Preview
├─ Staging Firebase
├─ Staging API
└─ Yellow Icon

APP_VARIANT=production
│
├─ MyApp
├─ Production Firebase
├─ Production API
└─ Official Icon
```

This is the architecture used by most professional Expo + EAS applications because it allows developers, QA engineers, and end users to run different versions of the app simultaneously while sharing a single codebase. (Expo Documentation)

!b76b1e40-c425-4dce-948f-b63879e3e4ce.png