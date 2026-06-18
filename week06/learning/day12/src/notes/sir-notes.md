# EAS Workflows - Complete Beginner to Advanced Notes 🚀

---

https://docs.expo.dev/eas/workflows/syntax/

# Chapter 1: What is EAS Workflows?

EAS Workflows is Expo's built-in CI/CD platform.

It allows you to automate tasks like:

- Running tests
- Running TypeScript checks
- Building Android APKs
- Building Android AABs
- Building iOS apps
- Publishing OTA Updates
- Submitting apps to stores
- Posting PR comments
- Sending Slack notifications

Instead of manually running commands, EAS runs them automatically on Expo servers.

---

# Why Do We Need EAS Workflows?

Imagine every time you change code you need to:

```
Run Tests
↓
Run ESLint
↓
Build APK
↓
Upload APK
↓
Send APK To QA
↓
Publish OTA Update
↓
Notify Team
```

Doing this manually every day is repetitive.

With EAS Workflows:

```
Developer Pushes Code
↓
EAS Workflow Starts
↓
Tests Run
↓
Build Created
↓
OTA Published
↓
Team Notified
↓
Done 🎉
```

---

# EAS Services Overview

Expo provides four major services:

```
EAS Build
↓
Creates APK / AAB / IPA

EAS Update
↓
Publishes OTA Updates

EAS Submit
↓
Uploads App To Stores

EAS Workflows
↓
Automates Everything
```

Think of Workflows as the conductor that controls all other EAS services.

---

# Chapter 2: Prerequisites

Before using Workflows you need:

## Install EAS CLI

```bash
npm install -g eas-cli
```

Verify installation:

```bash
eas --version
```

---

## Login

```bash
eas login
```

---

## Initialize EAS

```bash
npx eas init
```

This connects your project with Expo.

---

# Chapter 3: Project Structure

```
project/
│
├── app.json
├── eas.json
│
└── .eas/
    └── workflows/
        ├── ci.yml
        ├── preview-build.yml
        ├── ota.yml
        └── release.yml
```

Create workflow folder:

```bash
mkdir -p .eas/workflows
```

---

# Chapter 4: What is YAML?

Workflows are written using YAML.

Example:

```yaml
name: Hello World

jobs:
  greet:
    steps:
      - run: echo "Hello World"
```

YAML uses indentation instead of curly braces.

---

# Chapter 5: Anatomy of a Workflow

Every workflow contains:

```yaml
name: My Workflow

on:
  push:
    branches: ['main']

jobs:
  build:
    steps:
      - run: echo "Hello"
```

---

## Part 1: name

```yaml
name: My Workflow
```

Displayed inside Expo dashboard.

---

## Part 2: on

Determines WHEN workflow runs.

```yaml
on:
  push:
```

---

## Part 3: jobs

Determines WHAT workflow does.

```yaml
jobs:
```

---

## Workflow Flow

```
name
↓
on
↓
jobs
↓
steps
```

---

# Chapter 6: Triggers

Triggers decide when a workflow starts.

---

## Push Trigger

Runs when code is pushed.

```yaml
on:
  push:
    branches: ['main']
```

---

## Pull Request Trigger

Runs when PR is opened or updated.

```yaml
on:
  pull_request:
    branches: ['main']
```

---

## Manual Trigger

Runs manually.

```yaml
on:
  workflow_dispatch:
```

---

## Scheduled Trigger

Runs automatically on schedule.

```yaml
on:
  schedule:
    cron: '0 2 * * *'
```

Runs every day at 2 AM UTC.

---

# Chapter 7: First Workflow

File:

```
.eas/workflows/hello-world.yml
```

```yaml
name: Hello World

on:
  push:
    branches: ['main']

jobs:
  greet:
    steps:
      - run: echo "Hello World"
```

---

## Flow

```
Push Code
↓
Workflow Starts
↓
Print Hello World
↓
Success
```

---

# Chapter 8: Built-in Steps

---

## Checkout Repository

```yaml
- uses: eas/checkout
```

Downloads source code onto Expo servers.

---

## Install Dependencies

```yaml
- uses: eas/install_node_modules
```

Equivalent to:

```bash
npm install
```

---

## Expo Prebuild

```yaml
- uses: eas/prebuild
```

Equivalent to:

```bash
npx expo prebuild
```

---

# Chapter 9: CI Workflow (Most Common)

Used by almost every company.

---

## Flow

```
Developer Pushes Code
↓
Install Dependencies
↓
Run ESLint
↓
Run TypeScript Check
↓
Success ✅
```

---

## Complete Workflow

File:

```
.eas/workflows/ci.yml
```

```yaml
name: CI Check

on:
  push:
    branches: ['main']

jobs:
  typecheck:
    steps:
      - uses: eas/checkout

      - uses: eas/install_node_modules

      - run: npm run lint

      - run: npx tsc --noEmit
```

---

## Equivalent Commands

```bash
npm install

npm run lint

npx tsc --noEmit
```

---

# Chapter 10: Android Preview Build

Most common workflow for QA testing.

---

## Flow

```
Developer Pushes Code
↓
Android Build Starts
↓
APK Generated
↓
Uploaded To Expo
↓
QA Downloads APK
↓
Testing Starts
```

---

## Workflow

File:

```
.eas/workflows/preview-build.yml
```

```yaml
name: Preview Android Build

on:
  workflow_dispatch:

jobs:
  build_android:
    type: build
    params:
      platform: android
      profile: preview
```

---

## Required eas.json

```json
{
  "build": {
    "preview": {
      "distribution": "internal"
    }
  }
}
```

---

## Equivalent Command

```bash
eas build \
  --platform android \
  --profile preview
```

---

# Chapter 11: Production Android Build

Creates Play Store build.

---

## Flow

```
Code Ready
↓
Start Workflow
↓
Generate AAB
↓
Upload To Expo
↓
Ready For Play Store
```

---

## Workflow

```yaml
name: Production Android Build

on:
  workflow_dispatch:

jobs:
  build_android:
    type: build
    params:
      platform: android
      profile: production
```

---

## Required eas.json

```json
{
  "build": {
    "production": {
      "autoIncrement": true
    }
  }
}
```

---

## Equivalent Command

```bash
eas build \
  --platform android \
  --profile production
```

---

# Chapter 12: OTA Updates

One of Expo's most powerful features.

---

## Traditional Mobile Deployment

```
Fix Bug
↓
Build New APK
↓
Upload To Play Store
↓
Wait For Review
↓
Users Receive Update
```

---

## OTA Deployment

```
Fix Bug
↓
Push Code
↓
Workflow Runs
↓
OTA Published
↓
Users Receive Update
```

---

## Workflow

File:

```
.eas/workflows/ota.yml
```

```yaml
name: Production OTA

on:
  push:
    branches: ['main']

jobs:
  update:
    type: update
    params:
      channel: production
      message: ${{ github.commit_message }}
```

---

## Required app.json

```json
{
  "expo": {
    "updates": {
      "enabled": true
    }
  }
}
```

---

## Equivalent Command

```bash
eas update \
  --channel production \
  --message "Bug Fix"
```

---

# Chapter 13: Build + Submit To Play Store

---

## Flow

```
Start Workflow
↓
Build Production App
↓
Generate AAB
↓
Submit To Play Store
↓
Done 🚀
```

---

## Workflow

```yaml
name: Build And Submit

on:
  workflow_dispatch:

jobs:
  build:
    type: build
    params:
      platform: android
      profile: production

  submit:
    needs: [build]
    type: submit
    params:
      build_id: ${{ needs.build.outputs.build_id }}
```

---

## Equivalent Commands

```bash
eas build \
  --platform android \
  --profile production
```

```bash
eas submit \
  --platform android
```

---

# Chapter 14: Pull Request Preview Builds

Used heavily in teams.

---

## Flow

```
Developer Opens PR
↓
Preview APK Generated
↓
QR Code Generated
↓
Comment Added To PR
↓
Reviewer Tests App
```

---

## Workflow

```yaml
name: PR Preview

on:
  pull_request:
    branches: ['main']

jobs:
  build:
    type: build
    params:
      platform: android
      profile: preview

  comment:
    after: [build]
    type: github-comment
    params:
      message: |
        Preview build is ready 🚀
```

---

# Chapter 15: Nightly Builds

Automatically build app every night.

---

## Flow

```
2 AM
↓
Workflow Starts
↓
Generate APK
↓
QA Team Tests Next Morning
```

---

## Workflow

```yaml
name: Nightly Build

on:
  schedule:
    cron: '0 2 * * *'

jobs:
  build:
    type: build
    params:
      platform: android
      profile: preview
```

---

# Chapter 16: Job Dependencies

---

## needs

Runs only if previous job succeeds.

```yaml
jobs:
  test:
    steps:
      - run: echo "Testing"

  build:
    needs: [test]
    type: build
    params:
      platform: android
      profile: preview
```

---

## Flow

```
Testing
↓
Build
```

---

## after

Runs regardless of success or failure.

```yaml
jobs:
  notify:
    after: [build]
```

---

## Flow

```
Build
↓
Notify Team
```

---

# Chapter 17: Complete Real-World Mobile Pipeline

This is the workflow most startups eventually build.

---

## Flow

```
Developer Pushes Code
↓
Install Dependencies
↓
Run ESLint
↓
Run TypeScript Checks
↓
Build Preview APK
↓
Publish OTA Update
↓
Done 🚀
```

---

## Complete Workflow

```yaml
name: Mobile CI Pipeline

on:
  push:
    branches: ['main']

jobs:
  checks:
    steps:
      - uses: eas/checkout

      - uses: eas/install_node_modules

      - run: npm run lint

      - run: npx tsc --noEmit

  build:
    needs: [checks]
    type: build
    params:
      platform: android
      profile: preview

  update:
    after: [build]
    type: update
    params:
      channel: production
      message: ${{ github.commit_message }}
```

---

# Chapter 18: Running Workflows

Run manually:

```bash
npx eas workflow:run ci.yml
```

Run preview build:

```bash
npx eas workflow:run preview-build.yml
```

Run OTA workflow:

```bash
npx eas workflow:run ota.yml
```

---

# Chapter 19: Watching Workflow Logs

Open:

```
expo.dev
↓
Project
↓
Workflows
↓
Select Run
↓
View Logs
```

---

# Chapter 20: Most Important Job Types

| Type | Purpose |
| --- | --- |
| build | Generate APK/AAB/IPA |
| update | Publish OTA Updates |
| submit | Submit App To Store |
| github-comment | Post PR Comment |
| slack | Notify Team |
| maestro | E2E Testing |
| require-approval | Approval Gates |
| deploy | Web Deployment |

---

# Quick Revision

```
EAS Build
↓
Creates APK / AAB / IPA

EAS Update
↓
Publishes OTA Updates

EAS Submit
↓
Uploads App To Stores

EAS Workflows
↓
Automates Everything
```

---

# Final Summary

```
Push Code
↓
EAS Workflow Starts
↓
Run Tests
↓
Run Lint
↓
Build App
↓
Publish OTA
↓
Submit Store
↓
Notify Team
↓
Release Complete 🚀
```

EAS Workflows is essentially **GitHub Actions for Expo apps**, allowing you to automate testing, building, updating, releasing, and deploying mobile applications from a single YAML file.

# EAS Submit — Final Notes

Standalone reference for teaching and demos.

---

## 1. What is EAS Submit?

**EAS Submit** uploads a signed app binary to app stores:

- **Android:** `.aab` → Google Play Console
- **iOS:** `.ipa` → App Store Connect → **TestFlight**

**Analogy:** EAS Build makes the package; EAS Submit delivers it to Google/Apple.

```
EAS Build  →  .aab / .ipa  →  EAS Submit  →  Play Store / TestFlight
```

### What it does

- Uploads store-ready binaries
- Works from Windows/Linux for iOS (no Mac + Transporter needed)
- Integrates with CLI, `-auto-submit`, and EAS Workflows

### What it does NOT do

- Store listing text, screenshots, privacy forms
- Auto-publish iOS to the public App Store (TestFlight first; manual review in ASC)
- Replace the **first manual Android upload** per app (Google API rule)

---

## 2. Build vs Submit vs Update

|  | EAS Build | EAS Submit | EAS Update |
| --- | --- | --- | --- |
| **Output** | Native binary | Store upload | JS bundle OTA |
| **When** | Native/SDK changes | New store version | JS/UI-only changes |
| **CLI** | `eas build` | `eas submit` | `eas update` |

---

## 3. After submit — what happens?

| Platform | Lands in | Public release? |
| --- | --- | --- |
| **Android** | Play track (`internal`, `alpha`, `beta`, `production`) | Only on `production` + `completed` |
| **iOS** | TestFlight | No — App Store review is manual in ASC |

---

## 4. Your UnitFlow setup

**`eas.json`:**

```json
"build": {
  "production": { "autoIncrement": true, "channel": "production" }
},
"submit": {
  "production": {}
}
```

**`app.json`:**

- Android package: `com.codebysuraj.unitflow` ✓
- iOS `bundleIdentifier`: **add before first iOS submit**
- EAS Update URL + channels already configured ✓

**Recommended `eas.json` submit block:**

```json
"submit": {
  "production": {
    "android": {
      "track": "internal",
      "releaseStatus": "completed"
    },
    "ios": {
      "ascAppId": "YOUR_NUMERIC_APP_ID"
    }
  }
}
```

| Android `track` | Who gets it |
| --- | --- |
| `internal` | Up to 100 testers (best for class) |
| `alpha` / `beta` | Closed / open testing |
| `production` | Public Play Store |

---

## 5. Prerequisites

### Both platforms

- Expo account + `npx eas init`
- `eas.json` with `submit` profile
- **Production store build** (not `preview` / dev client)

### Android

- Google Play Developer account ($25 one-time)
- App created in Play Console
- **Google Service Account Key** (JSON)
- **One manual upload per app** (first time only)

### iOS

- Apple Developer account ($99/year)
- App created in App Store Connect
- `ios.bundleIdentifier` in `app.json`
- `ascAppId` in `eas.json`
- App Store Connect API key (for CI / non-interactive)

---

## 6. Google Service Account Key — create once, reuse

You do **not** create a new key for every project. Create **once**, then per new app: grant Play access + upload same JSON to that EAS project.

### Part A — Google Cloud (one-time)

1. Create project
2. Service Accounts → **Create Service Account**
3. **Keys** → **Add key** → **JSON** → download
4. Enable Google Play Android Developer API

### Part B — Play Console (per app)

1. Users and permissions → **Invite new users**
2. Paste service account email (`...@....iam.gserviceaccount.com`)
3. **App permissions** → select app → grant:
    - **View app information** (read-only)
    - **Release apps to testing tracks**
    - **Release to production...** (only if submitting to production)

### Part C — EAS (per Expo project)

1. expo.dev → Project → **Credentials** → **Android** → your package
2. **Add Google Service Account Key** → upload the **same** JSON

**Security:** Never commit the JSON. Keep it in `.gitignore`.

### Per new student app

```
□ New app in Play Console (unique package name)
□ Grant same service account access to that app
□ Upload same JSON to new EAS project Credentials
□ First manual .aab upload once for that app
□ eas submit works from then on
```

---

## 7. iOS setup (summary)

1. Create app in App Store Connect
2. Copy **Apple ID** from App Information → that’s `ascAppId`
3. Add to `app.json`:

```json
"ios": {
  "bundleIdentifier": "com.codebysuraj.unitflow"
}
```

1. For CI:

```bash
eas credentials --platform ios
```

Choose **App Store Connect API Key** for EAS Submit.

---

## 8. Commands

### Submit after a build

```bash
eas submit --platform android
eas submit --platform ios
```

CLI asks which build to use (or picks latest).

### Explicit profile + latest build

```bash
eas submit --platform android --profile production --latest
eas submit --platform ios --profile production --latest
```

### Build + submit in one step

```bash
eas build --platform android --profile production --auto-submit
eas build --platform ios --profile production --auto-submit
```

Uses `submit.production` (same name as build profile).

### Specific build ID

```bash
eas submit --platform android --id <BUILD_ID>
```

### Local binary (not from EAS Build)

```bash
eas submit --platform android --path ./app.aab
eas submit --platform ios --path ./app.ipa
```

### CI / non-interactive

```bash
export EXPO_TOKEN=your_token
eas submit --platform android --latest --non-interactive
```

---

## 9. Dashboard

| Action | Where |
| --- | --- |
| Watch submission progress | expo.dev → **Submissions** |
| Start submit from a build | **Builds** → finished build → **Submit to store** |
| Upload service account key | **Credentials** → Android → package → Service Credentials |
| Debug failures | Submission logs + **Build Annotations** |

---

## 10. EAS Workflows + Submit

Submit is a workflow job type — separate from workflow setup, but often used together:

```yaml
name: Android Release

on:
  push:
    tags: ['v*']

jobs:
  build:
    type: build
    params:
      platform: android
      profile: production

  submit:
    needs: [build]
    type: submit
    params:
      build_id: ${{ needs.build.outputs.build_id }}
      profile: production
```

### iOS → TestFlight (more control than basic submit)

```yaml
jobs:
  build_ios:
    type: build
    params:
      platform: ios
      profile: production

  testflight:
    needs: [build_ios]
    type: testflight
    params:
      build_id: ${{ needs.build_ios.outputs.build_id }}
      changelog: 'Release ${{ github.ref_name }}'
      internal_groups: ['QA Team']
```

---

## 11. Demo flow for students

### Demo 1 — Manual submit (beginner)

```bash
eas build --platform android --profile production
# wait for build...
eas submit --platform android --profile production --latest
```

Show: Submissions tab → Play Console internal track.

### Demo 2 — Auto submit (intermediate)

```bash
eas build --platform android --profile production --auto-submit
```

One command; build finishes → submit starts automatically.

### Demo 3 — Workflow on git tag (advanced)

```bash
git tag v1.0.1
git push origin v1.0.1
```

Workflow builds + submits. Show full pipeline in dashboard.

---

## 12. `eas.json` submit options

### Android

| Field | Values | Meaning |
| --- | --- | --- |
| `track` | `internal`, `alpha`, `beta`, `production` | Play testing track |
| `releaseStatus` | `completed`, `draft`, `inProgress` | Release state |
| `serviceAccountKeyPath` | path to JSON | Or upload via dashboard |

### iOS

| Field | Meaning |
| --- | --- |
| `ascAppId` | App Store Connect app ID (required for CI) |
| `appleId` | Apple ID email (interactive submit) |
| `ascApiKeyPath` / `ascApiKeyId` / `ascApiKeyIssuerId` | API key for CI |
| `groups` | TestFlight internal groups |

---

## 13. Common errors

| Error | Fix |
| --- | --- |
| 403 / permission denied | Play Console: grant service account app permissions |
| API not enabled | Enable Google Play Android Developer API |
| First upload required | Manual `.aab` upload once in Play Console |
| Wrong package | `app.json` package must match Play Console app |
| iOS submit fails | Add `bundleIdentifier` + `ascAppId` |
| Used preview build | Submit needs `production` store build |
| Key in git | Revoke, gitignore, create new key |
| iOS not on App Store | Normal — TestFlight first, then manual ASC review |

---

## 14. Teaching order

| # | Topic | Action |
| --- | --- | --- |
| 1 | What Submit is | Build vs Submit vs Update |
| 2 | Google Service Account | Create key once (Section 6) |
| 3 | Manual submit | `eas build` then `eas submit` |
| 4 | Auto submit | `--auto-submit` |
| 5 | Play Console | Show build on internal track |
| 6 | Workflow + submit | Tag-triggered `android-release.yml` |
| 7 | iOS TestFlight | `ascAppId`, `testflight` job |

---

## 15. Quick reference

```
WHAT:     Upload .aab / .ipa to Google Play & TestFlight
CONFIG:   eas.json → "submit" profiles
ANDROID:  Google Service Account JSON (create once, reuse)
iOS:      ascAppId + bundleIdentifier + API key (CI)
BUILD:    eas build --profile production
SUBMIT:   eas submit --platform android|ios
AUTO:     eas build --auto-submit
WATCH:    expo.dev → Submissions
FIRST:    One manual Android upload per app
```

---

## 16. Docs

- EAS Submit intro
- Submit Android
- Submit iOS
- Google Service Account (Expo FYI)
- Automate submissions
- eas.json submit config

---

**One-liners:**

- **Workflows:** Automate build/update/test/submit on git events via `.eas/workflows/*.yml`.
- **Submit:** Upload store binaries; one Google Service Account Key for the whole class, wired per app in Play Console + EAS Credentials.

# Google Play Console Publishing Prep Checklist

Everything to prepare **before** (and while) publishing an Android app to Google Play, including graphics sizes, privacy policy, tester emails, and **how to share without collecting emails**.

---

## Two different “testing” paths (read this first)

Students often mix these up:

| Method | Needs Play listing? | Needs tester emails? | Best for |
| --- | --- | --- | --- |
| **EAS Build `preview` APK** | No | No — share QR/link from expo.dev | Class demos, quick QA |
| **Play Internal App Sharing** | App must exist in Play Console | No — share link (with setup) | Fast Play-signed builds |
| **Play Internal testing track** | Yes | Email list **or** opt-in link | Up to 100 testers, formal track |
| **Play Closed / Open testing** | Yes | Emails / groups / public link | Larger beta |
| **Production** | Yes | Everyone on Play Store | Public release |

For **UnitFlow** (`preview` profile = APK), you can test **without Play Console** using EAS Build internal distribution. Play Console prep is needed when you go to **store / internal track / production**.

---

## Part 1 — Accounts & one-time setup

| Item | Notes |
| --- | --- |
| **Google Play Developer account** | $25 one-time, identity verification can take days |
| **Google Cloud project** | For EAS Submit service account (if using `eas submit`) |
| **App created in Play Console** | “Create app” — even as draft |
| **Package name** | Must match `app.json` → `android.package` (`com.codebysuraj.unitflow`) |
| **Cannot change package name** after first upload |  |

---

## Part 2 — Store listing text

Fill in: **Grow users → Store presence → Main store listing**

| Field | Limit | Tips |
| --- | --- | --- |
| **App name** | 30 characters | “UnitFlow” |
| **Short description** | **80 characters** | One line value prop |
| **Full description** | **4000 characters** | Features, who it’s for, no “#1 app” claims |

**Example short description (UnitFlow):**

> Fast offline unit converter for currency, length, weight, and more.
> 

**Rules:** No “Best”, “#1”, “Download now”, keyword stuffing, or excessive emojis in short description.

---

## Part 3 — Graphics & assets (sizes)

Official reference: Add preview assets

### Required for publishing

| Asset | Size | Format | Notes |
| --- | --- | --- | --- |
| **Hi-res app icon** (store) | **512 × 512 px** | 32-bit PNG (alpha OK) | Max **1 MB**. Full square — Google rounds corners. **Not** the same file as launcher icon, but can be based on it. No “#1”, price, or badge text. |
| **Feature graphic** (banner) | **1024 × 500 px** | JPEG or 24-bit PNG (**no** alpha) | Required. Top banner on listing. Keep logo/text **centered** (edges get cropped). |
| **Phone screenshots** | Min **2**, max **8** | JPEG or 24-bit PNG (no alpha) | Max **8 MB** each. Recommended **1080 × 1920** (portrait 9:16) or **1920 × 1080** (landscape). |

### Your app launcher icon (inside the APK)

From `app.json` — separate from store 512×512:

| Asset | Typical size | In your project |
| --- | --- | --- |
| **Adaptive icon foreground** | 1024×1024 recommended | `./assets/images/android-icon-foreground.png` |
| **Adaptive icon background** | 1024×1024 or color | `#E6F4FE` + background image |
| **Monochrome** (Android 13+) | 1024×1024 | `android-icon-monochrome.png` |

### Optional but useful

| Asset | Size | When |
| --- | --- | --- |
| **Tablet screenshots** | Min **4** if tablet-optimized | 1080px+ short edge |
| **Promo video** | YouTube URL | Optional |
| **TV banner** | **1280 × 720** | Only for Android TV apps |
| **Wear OS** | 1:1, min 384×384 | Only for watch apps |

### Quick design tips

- Use same colors as your app (UnitFlow: dark zinc + lime accent)
- Screenshots: real app UI, minimal marketing text
- Feature graphic: app name + one tagline, not tiny text
- Store icon: simple, readable at small size

---

## Part 4 — App content (mandatory before review)

Play Console → **Policy and programs → App content** (or Dashboard “Set up your app”)

Complete **every** item — missing any blocks publishing.

| Section | What you provide |
| --- | --- |
| **Privacy policy** | Public URL (see Part 5) |
| **Data safety** | What data you collect/share/secure |
| **App access** | Demo login if app is behind auth; UnitFlow: “All functionality available without login” |
| **Ads** | Yes/No — UnitFlow: likely **No** |
| **Content rating** | Questionnaire → IARC rating (e.g. Everyone) |
| **Target audience** | Age groups (affects Families policy) |
| **News app** | Only if news app |
| **COVID-19 / Health** | If applicable |
| **Financial features** | If applicable |
| **Government apps** | If applicable |

**Review time:** Often 1–7 days after you submit for review.

---

## Part 5 — Privacy policy

### Required?

**Yes** — Google requires a privacy policy URL for **all** apps on Play, even if you collect **no** data.

### Requirements

- **Public HTTPS URL** (not PDF, not geofenced, not editable Google Doc without stable publish)
- Must say **who** operates the app (developer/company name)
- Must explain: collect / use / share / retention / deletion / contact
- Must match **Data safety** form answers
- Link in **Play Console** + **inside the app** (Settings/About screen is enough)

### UnitFlow example (local-only app)

Your app stores conversions locally (`expo-sqlite`), optional OTA via EAS Update. A simple policy can state:

- No account required
- Conversion history stored **on device only**
- EAS Update may download app updates (no personal data sold)
- Contact email for questions

**Free hosting options for students:**

- GitHub Pages (`username.github.io/privacy.html`)
- Notion public page
- Your course website

---

## Part 6 — Data safety form

Play Console → **App content → Data safety**

Answer honestly. For UnitFlow-style apps:

| Question | Likely answer |
| --- | --- |
| Collect personal data? | **No** (if truly local-only) |
| Data encrypted in transit? | N/A or Yes if you add APIs later |
| Users can request deletion? | On-device clear history = yes |
| Data shared with third parties? | **No** |

If you add analytics, crash reporting, or auth later — **update** this form.

---

## Part 7 — Binary / technical prep

| Item | Requirement |
| --- | --- |
| **Format** | **AAB** (Android App Bundle) for Play — your `production` profile builds this |
| **Signing** | Release keystore (EAS manages remotely by default) |
| **Version code** | Must increase every upload (`autoIncrement: true` in your `eas.json`) |
| **Version name** | `1.0.0` in `app.json` — user-visible |
| **Permissions** | Only declare what you use; justify sensitive ones |
| **64-bit** | Required (EAS/Expo handles this) |
| **Target API level** | Must meet Google’s current minimum (Expo SDK 55 generally complies) |

**First upload rule:** Google often requires **one manual upload** before `eas submit` API works for that app.

---

## Part 8 — Tester distribution (emails vs no emails)

### Option A — No Play Console: EAS preview APK (easiest for class)

```bash
eas build --platform android --profile preview
```

- Share **QR code / link** from expo.dev Builds page
- **No emails**, no Play listing
- Install APK directly (enable “Install unknown apps” if needed)

---

### Option B — Internal App Sharing (link, minimal email admin)

**Play Console → Test and release → Internal app sharing**

| Setting | Detail |
| --- | --- |
| **Tester access** | “Anyone you shared the link with can download” |
| **How to share** | Upload AAB/APK → copy link → WhatsApp / Slack / QR |
| **Tester setup** | Each tester: Play Store → Settings → tap version 7× → enable **Internal app sharing** |
| **Link limit** | Up to **100 downloads per unique link**; upload again for new link |
| **Expiry** | Links expire after **60 days** |
| **Review** | No full store review — fastest Play-signed sharing |

**No email list required** if “anyone with link” is enabled.

---

### Option C — Internal testing track (up to 100 testers)

**Play Console → Testing → Internal testing**

| Method | How |
| --- | --- |
| **Email list** | Create list → add Gmail addresses → save |
| **Google Group** | Use group email |
| **Shareable opt-in link** | Copy link from Testers tab → anyone with link can opt in (still need to publish testing release) |

Steps for testers:

1. Open **opt-in link** you share
2. Accept tester invitation
3. Install from Play Store (not sideload)

**Limit:** 100 testers per app on internal track.

---

### Option D — Closed testing (larger, still controlled)

- Email lists or Google Groups
- **Opt-in link** for closed test (testers must be eligible)
- More than 100 testers possible

---

### Option E — Open testing (public beta)

- **Open opt-in link** — share on website, social, classroom
- Anyone can join
- Still not full production

---

### Comparison table

| Track | Max testers | Email list required? | Share via link? | Play review |
| --- | --- | --- | --- | --- |
| EAS preview APK | Unlimited* | No | Yes (expo.dev) | No |
| Internal app sharing | 100/link | No (optional) | Yes | No |
| Internal testing | 100 | Optional | Yes (opt-in link) | Light |
| Closed testing | Large | Often | Yes (opt-in) | Yes |
| Open testing | Very large | No | Yes | Yes |
| Production | Everyone | No | Store search | Yes |

---

## Part 9 — Full publishing checklist (printable)

### Before first upload

```
□ Google Play Developer account ($25)
□ App created in Play Console
□ Package name finalized (com.codebysuraj.unitflow)
□ Production AAB built (eas build --profile production)
```

### Store listing assets

```
□ App name (≤30 chars)
□ Short description (≤80 chars)
□ Full description (≤4000 chars)
□ Hi-res icon 512×512 PNG
□ Feature graphic 1024×500 JPG/PNG
□ Min 2 phone screenshots (1080×1920 recommended)
□ Optional: tablet screenshots, promo video
```

### Policy & legal

```
□ Privacy policy URL (hosted, public)
□ Privacy policy link inside app
□ Data safety form completed
□ Content rating questionnaire done
□ Target audience set
□ Ads declaration (Yes/No)
□ App access instructions for reviewers
□ Export compliance / US laws acknowledged
```

### Testing (pick one)

```
□ Class demo only     → EAS preview APK + QR
□ Quick Play link     → Internal app sharing
□ Formal beta         → Internal / closed testing + opt-in link
□ Public release      → Production track + review
```

### Submit automation (optional)

```
□ Google Service Account JSON (create once)
□ Service account invited in Play Console
□ JSON uploaded to EAS Credentials
□ First manual upload done (once per app)
□ eas submit or workflow type: submit
```

---

## Part 10 — Suggested prep for UnitFlow specifically

| Item | Status / action |
| --- | --- |
| Package `com.codebysuraj.unitflow` | ✓ in `app.json` |
| Adaptive launcher icons | ✓ in `app.json` |
| Store icon 512×512 | Create from your icon asset |
| Feature graphic 1024×500 | Dark bg + “UnitFlow” + lime accent |
| Screenshots | Convert, History, Category tabs (2–8 shots) |
| Privacy policy | Simple “local data only” page |
| Data safety | No personal data collected |
| Content rating | Utility app → likely low rating |
| App access | No login — state clearly for reviewers |
| Class testing | `eas build --profile preview` + QR (no emails) |
| Store testing | Internal app sharing link OR internal testing opt-in link |

---

## Part 11 — Common rejections (avoid these)

| Issue | Fix |
| --- | --- |
| Missing privacy policy | Add URL in Console + in app |
| Data safety ≠ privacy policy | Align both documents |
| Broken demo login | Provide test credentials in App access |
| Misleading screenshots | Use real app UI |
| Wrong package name | Must match AAB exactly |
| Version code not incremented | Enable `autoIncrement` or bump manually |
| Icon has “#1” or store badges | Remove promotional text from graphics |

---

## Quick reference — asset sizes

```
Store icon:        512 × 512    PNG (alpha OK)
Feature graphic:   1024 × 500   JPG/PNG (no alpha)
Screenshots:       min 2, max 8   1080×1920 recommended
Short description: 80 chars max
Full description:  4000 chars max
App name:          30 chars max
```

---

## Docs

- Preview assets & sizes
- Prepare app for review
- User data & privacy policy
- Internal testing setup
- Internal app sharing

---

**One-liner for students:**

> Prepare **text + 512 icon + 1024×500 banner + 2 screenshots + privacy policy + Data safety** for Play listing; for **testing without emails**, use **EAS preview APK QR** or Play **Internal app sharing link** (testers enable Internal app sharing in Play Store settings).
> 

# Apple App Store / iOS — Publishing Prep Checklist

Same style as the Google Play guide: what to prepare before publishing **UnitFlow** (or any Expo iOS app) to the App Store.

---

## Two different “testing” paths (read this first)

| Method | Needs App Store Connect app? | Needs tester emails? | Best for |
| --- | --- | --- | --- |
| **EAS `development` / simulator build** | No | No — install via expo.dev / Xcode | Local dev |
| **EAS `preview` internal IPA** | No | No — share link from expo.dev | Quick class demos |
| **TestFlight — Internal** | Yes | App Store Connect users only (max 100) | Your team |
| **TestFlight — External** | Yes | Email **or public link** | Beta testers |
| **App Store production** | Yes | Everyone | Public release |

**iOS has no direct APK-style sideload** like Android. For real device testing at scale, you use **TestFlight** or **EAS internal distribution** (ad hoc / internal).

---

## Part 1 — Accounts & one-time setup

| Item | Notes |
| --- | --- |
| **Apple Developer Program** | $99/year — developer.apple.com/programs |
| **App in App Store Connect** | Apps → **+** → New App |
| **Bundle ID** | Must match `app.json` — add `ios.bundleIdentifier` (UnitFlow still needs this) |
| **SKU** | Internal ID you choose (e.g. `unitflow-2026`) — cannot change later |
| **EAS project linked** | `npx eas init` |
| **`ascAppId`** | Numeric Apple ID from App Information — put in `eas.json` for `eas submit` |

**Create app in App Store Connect:**

1. App Store Connect → **Apps** → **+** → **New App**
2. Platform: iOS
3. Name: `UnitFlow`
4. Primary language: English
5. Bundle ID: `com.codebysuraj.unitflow` (register in Apple Developer → Identifiers first if needed)
6. SKU: any unique string

---

## Part 2 — Store listing text

**App Store Connect → Your app → App Store → [version] → App Information / Version Information**

| Field | Limit | Required? |
| --- | --- | --- |
| **App name** | 30 characters | Yes |
| **Subtitle** | 30 characters | Optional but recommended |
| **Promotional text** | 170 characters | Optional (can update without new build) |
| **Description** | 4000 characters | Yes |
| **Keywords** | 100 characters (comma-separated, no spaces) | Yes |
| **Support URL** | HTTPS | **Required** |
| **Marketing URL** | HTTPS | Optional |
| **Privacy Policy URL** | HTTPS | **Required** |
| **Copyright** | e.g. `© 2026 Your Name` | Yes |
| **What's New** | 4000 characters | Required for each update |

**Example subtitle (UnitFlow):**

> Offline unit converter
> 

**Example keywords:**

```
converter,units,currency,length,weight,offline,calculator
```

**Support URL ideas (students):** simple page with contact email, GitHub issues, or a Google Form.

---

## Part 3 — Graphics & assets (sizes)

Official screenshot reference: Apple Screenshot specifications

### App Store icon (uploaded in App Store Connect)

| Asset | Size | Format | Rules |
| --- | --- | --- | --- |
| **App Store icon** | **1024 × 1024 px** | PNG | **No transparency** (fully opaque). Square — Apple applies rounded corners. No Apple hardware in icon. |

This is separate from the icon **inside your IPA** (Expo generates launcher sizes from `./assets/images/icon.png` or `expo.icon`).

### Screenshots (required)

| Device class | Size (portrait) | Required? |
| --- | --- | --- |
| **iPhone 6.9"** | **1320 × 2868** or **1290 × 2796** | **Yes** (primary set) |
| **iPad 13"** | **2064 × 2752** | **Yes if app supports iPad** |
| Other iPhone/iPad sizes | Various | Optional — Apple scales from base sizes |

**Rules:**

- **1–10 screenshots** per device size
- PNG or JPEG, **no alpha**
- sRGB or P3 color space
- Recommended: **4–6** strong screenshots
- First screenshot = main value prop

**For UnitFlow (iPhone-only portrait app):** submit **1320 × 2868** set only.

**How to capture:** iOS Simulator → screenshot, or design frames in Figma/Canva at exact pixels.

### Optional media

| Asset | Notes |
| --- | --- |
| **App Preview video** | 15–30 sec, device-specific, optional |
| **Apple Watch / Apple TV** | Only if you support those platforms |

### No “feature graphic” on iOS

Unlike Google Play’s 1024×500 banner, Apple uses **screenshots + optional app preview video** — no separate banner asset.

---

## Part 4 — App Privacy & legal (mandatory)

### Privacy Policy URL

- **Required** for all iOS apps
- Public HTTPS URL (not PDF)
- Must match your **Privacy Nutrition Label** answers
- Also link inside the app (Settings / About)

**UnitFlow (local-only):** policy can state data stays on device, optional EAS Update, contact email.

### App Privacy (Privacy Nutrition Label)

**App Store Connect → App Privacy**

Declare all data collected by your app **and third-party SDKs** (analytics, crash tools, ads, etc.).

| UnitFlow likely answer | Detail |
| --- | --- |
| Collect data? | **No** (if truly local-only, no analytics) |
| Tracking? | **No** |
| Third-party SDKs | List any you add later (`expo-updates`, etc. — check Expo docs for each SDK) |

Update whenever you add auth, analytics, or ads.

### Age Rating

**App Store Connect → App Information → Age Rating**

Complete questionnaire → get rating (e.g. 4+, 9+, 12+, 17+).

Utility apps like UnitFlow are usually **4+** if no sensitive content.

### Export Compliance (encryption)

When uploading a build, Apple asks about encryption:

- Most Expo apps using standard HTTPS only → **Yes, exempt** (uses standard encryption)
- Answer in App Store Connect per build or set in `Info.plist` via `ITSAppUsesNonExemptEncryption`

### Other declarations (if applicable)

| Section | When needed |
| --- | --- |
| **Sign in with Apple** | If you offer Google/Facebook login |
| **Digital Services Act (EU)** | Trader info for EU distribution |
| **Content rights** | Third-party content in app |
| **Kids category** | Apps for children — strict rules |

---

## Part 5 — App Review information

**App Store Connect → App Store → [version] → App Review Information**

| Field | Notes |
| --- | --- |
| **Contact info** | Phone + email Apple can reach you |
| **Demo account** | **Required if app needs login** — UnitFlow: note “no login required” |
| **Notes for reviewer** | How to test, what’s new, special setup |
| **Attachments** | Optional screenshots/docs |

**Example note for UnitFlow:**

> UnitFlow is an offline unit converter. No account or network required for core features. Open Convert tab, pick a category, enter a value. History is saved locally on device.
> 

---

## Part 6 — Binary / technical prep (Expo)

| Item | Requirement |
| --- | --- |
| **Format** | `.ipa` (store distribution) |
| **Build profile** | `production` in `eas.json` |
| **Distribution** | `store` (default for production) |
| **Signing** | Distribution cert + provisioning (EAS manages) |
| **Bundle ID** | `com.codebysuraj.unitflow` everywhere |
| **Version** | `CFBundleShortVersionString` = `app.json` `version` |
| **Build number** | Must increase each upload (`autoIncrement: true` helps) |
| **iOS bundleIdentifier** | Add to `app.json` before production build |

```bash
eas build --platform ios --profile production
```

### Submit to TestFlight

```bash
eas submit --platform ios --profile production --latest
```

Or:

```bash
eas build --platform ios --profile production --auto-submit
```

**Processing:** TestFlight usually takes **10–30 minutes** after upload before testers can install.

---

## Part 7 — Tester distribution (emails vs no emails)

### Option A — No App Store Connect: EAS internal build

```bash
eas build --platform ios --profile preview
# or development client build
```

Share install link / QR from **expo.dev → Builds**.

- No TestFlight
- Limited to registered devices (ad hoc) or dev client workflow
- Good for early class demos, not store beta

---

### Option B — TestFlight Internal (up to 100, no Beta Review)

**Who:** App Store Connect users on your team (Admin, Developer, Marketing, etc.)

| Setting | Detail |
| --- | --- |
| **Max testers** | 100 |
| **Beta App Review** | **Not required** |
| **How to invite** | Add users in **Users and Access** → add to Internal Testing group |
| **Install** | TestFlight app → automatic or email notification |

**Best for:** you + TAs + core team.

---

### Option C — TestFlight External with **email**

**Who:** Anyone with an email (up to **10,000** per app)

| Step | Detail |
| --- | --- |
| 1 | TestFlight → **External Testing** → create group |
| 2 | Add build to group |
| 3 | **First build** → **Beta App Review** (~hours to 1 day) |
| 4 | Invite by email or CSV import |
| 5 | Tester installs **TestFlight** app → accepts invite → installs |

---

### Option D — TestFlight External with **public link (no emails)**

**Yes — you can share without collecting emails.**

1. App Store Connect → **TestFlight** → **External Testing** → create group
2. Add a build to the group
3. Complete **Beta App Description** + **What to Test** + feedback email
4. Pass **Beta App Review** (first external build)
5. Enable **Public Link**
6. Set criteria (optional): device type, iOS version, tester limit
7. Copy link → share via WhatsApp, Slack, classroom, QR

**Tester needs:**

- iPhone/iPad with **TestFlight** app installed (free from App Store)
- Open your public link → accept → install

**Limits:**

- Up to **10,000** external testers per app
- Public link can cap max testers
- Build expires after **90 days** in TestFlight
- First external build always needs Beta App Review

---

### Comparison table

| Method | Max testers | Email required? | Public link? | Apple review |
| --- | --- | --- | --- | --- |
| EAS internal / dev build | Device limit | No | expo.dev link | No |
| TestFlight Internal | 100 | Team ASC accounts | No | No |
| TestFlight External (email) | 10,000 | Yes | No | Beta review (first time) |
| TestFlight External (public link) | 10,000 | **No** | **Yes** | Beta review (first time) |
| App Store Production | Unlimited | No | Store search | Full App Review |

---

## Part 8 — Full publishing checklist (printable)

### Before first upload

```
□ Apple Developer account ($99/year)
□ Bundle ID registered (com.codebysuraj.unitflow)
□ App created in App Store Connect
□ ios.bundleIdentifier in app.json
□ ascAppId in eas.json (for eas submit)
□ Production IPA built (eas build --profile production)
```

### Store listing

```
□ App name (≤30 chars)
□ Subtitle (≤30 chars) — optional
□ Description (≤4000 chars)
□ Keywords (≤100 chars)
□ Support URL (required)
□ Marketing URL (optional)
□ Privacy Policy URL (required)
□ App icon 1024×1024 PNG (opaque, no rounded corners)
□ iPhone screenshots 1320×2868 (min 1, recommend 4–6)
□ iPad screenshots 2064×2752 (only if iPad supported)
□ Copyright + contact info
□ Age rating questionnaire completed
```

### Privacy & compliance

```
□ App Privacy (Nutrition Label) completed
□ Privacy policy link inside app
□ Export compliance answered
□ App Review notes + demo access (if login required)
□ Sign in with Apple (if using other social logins)
```

### Testing (pick one)

```
□ Quick demo        → EAS preview/dev build + expo.dev link
□ Team QA           → TestFlight Internal (100 ASC users)
□ Class beta        → TestFlight External PUBLIC LINK
□ Public release    → Submit for App Review → App Store
```

### EAS Submit (optional automation)

```
□ App Store Connect API key (for CI)
□ eas submit --platform ios
□ or eas build --auto-submit
```

---

## Part 9 — UnitFlow-specific prep

| Item | Status / action |
| --- | --- |
| `ios.bundleIdentifier` | **Add** `com.codebysuraj.unitflow` |
| `ascAppId` in `eas.json` | Add after creating app in ASC |
| App icon 1024×1024 | Export opaque PNG from your icon |
| Screenshots | Convert, History, categories (1320×2868) |
| Privacy policy | “Local data only” hosted page |
| App Privacy label | No data collected |
| Support URL | Simple contact page |
| App Review note | “No login, works offline” |
| Class testing | TestFlight **public link** or EAS preview |
| Store release | TestFlight → then **Submit for Review** in ASC |

---

## Part 10 — TestFlight → App Store (production)

TestFlight alone is **not** the public App Store.

1. Upload build via `eas submit` → appears in TestFlight
2. Test with internal/external testers
3. App Store Connect → **App Store** tab → select build for version
4. Complete all metadata + screenshots
5. Click **Submit for Review**
6. Review typically **24–48 hours** (can be longer)
7. After approval → **Release** manually or automatically

---

## Part 11 — iOS vs Android quick compare

| Item | Google Play | Apple App Store |
| --- | --- | --- |
| Developer fee | $25 one-time | $99/year |
| Store icon | 512×512 PNG | **1024×1024 PNG (opaque)** |
| Banner | 1024×500 feature graphic | No banner — screenshots only |
| Screenshots | 1080×1920 phone (min 2) | **1320×2868** iPhone (min 1) |
| Privacy | Data safety form | **App Privacy Nutrition Label** |
| Privacy URL | Required | **Required** |
| Beta without emails | Internal app sharing link | **TestFlight public link** |
| Beta app | Internal testing (100) | TestFlight internal (100) |
| Submit tool | `eas submit --platform android` | `eas submit --platform ios` |
| First upload quirk | One manual upload for API | TestFlight Beta Review for first external build |

---

## Part 12 — Common rejections (avoid these)

| Issue | Fix |
| --- | --- |
| Missing privacy policy URL | Add in ASC + in app |
| Privacy label ≠ actual behavior | Align with real data collection |
| Broken demo login | Provide credentials in App Review |
| Placeholder screenshots | Use real app UI |
| Icon has transparency | Export opaque 1024×1024 PNG |
| Missing Support URL | Add working HTTPS page |
| App crashes on review device | Test release build on real device |
| `bundleIdentifier` mismatch | Match ASC, app.json, and EAS build |
| Missing Sign in with Apple | Required if other third-party sign-in exists |

---

## Quick reference — asset sizes

```
App Store icon:     1024 × 1024   PNG (opaque, square)
iPhone screenshots: 1320 × 2868   PNG/JPEG (primary)
                    1290 × 2796   also accepted
iPad screenshots:   2064 × 2752   if iPad supported
Screenshot count:   1–10 per size (4–6 recommended)

App name:           30 chars max
Subtitle:           30 chars max
Keywords:           100 chars max
Description:        4000 chars max
Promotional text:   170 chars max
```

---

## Docs

- Screenshot specifications (Apple)
- App information reference
- App Privacy details
- TestFlight overview
- Invite external testers / public link
- Submit to Apple App Store (Expo)

---

**One-liner for students:**

> iOS needs **1024 icon + 1320×2868 screenshots + privacy policy + App Privacy label + Support URL** for the store; for **testing without emails**, use **TestFlight public link** (after first Beta App Review) or **EAS preview build link** for quick demos.
>