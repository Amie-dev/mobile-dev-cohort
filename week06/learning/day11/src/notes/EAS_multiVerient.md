# Week 06 — Multi-Environment Builds in Expo EAS

## Goal

We want **3 different versions** of the same app:

```text
PocketFiles (dev)      → development build
PocketFiles (preview)  → testing / QA build
PocketFiles            → production build
```

Why?

So we can install all versions on the same phone without conflict:

```text
com.amie.pocketfiles.dev      → Dev app
com.amie.pocketfiles.preview  → Preview app
com.amie.pocketfiles          → Production app
```

Expo recommends this pattern for installing development, preview, and production variants on the same device. ([Expo Documentation][1])

---

# 1. Why Convert `app.json` to `app.config.ts`?

`app.json` is static.

Example:

```json
{
  "expo": {
    "name": "PocketFiles",
    "android": {
      "package": "com.amie.pocketfiles"
    }
  }
}
```

Problem: it cannot easily change based on build type.

But `app.config.ts` is dynamic.

So we can do:

```ts
process.env.APP_VARIANT
```

and change:

```text
App name
Package name
Bundle identifier
Scheme
Icon
API URL
```

Expo app config supports `app.json`, `app.config.js`, and `app.config.ts`, and it is used by Expo Prebuild, Expo Go, and OTA update manifests. ([Expo Documentation][2])

---

# 2. Better `app.config.ts`

Use this version:

```ts
import { ExpoConfig } from "expo/config";

type AppVariant = "development" | "preview" | "production";

const APP_VARIANT = (process.env.APP_VARIANT ?? "production") as AppVariant;

const IS_DEV = APP_VARIANT === "development";
const IS_PREVIEW = APP_VARIANT === "preview";
const IS_PRODUCTION = APP_VARIANT === "production";

const PROJECT_ID = "8f1d9e0e-dcaa-41e5-9dbd-97d43f4dec38";

const getAppName = () => {
  if (IS_DEV) return "PocketFiles (dev)";
  if (IS_PREVIEW) return "PocketFiles (preview)";
  return "PocketFiles";
};

const getUniqueIdentifier = () => {
  if (IS_DEV) return "com.amie.pocketfiles.dev";
  if (IS_PREVIEW) return "com.amie.pocketfiles.preview";
  return "com.amie.pocketfiles";
};

const getScheme = () => {
  if (IS_DEV) return "pocketfiles-dev";
  if (IS_PREVIEW) return "pocketfiles-preview";
  return "pocketfiles";
};

const config: ExpoConfig = {
  name: getAppName(),
  slug: "pocketfiles",
  version: "1.0.0",
  orientation: "portrait",
  icon: "./assets/images/icon.png",
  scheme: getScheme(),
  userInterfaceStyle: "automatic",

  updates: {
    url: `https://u.expo.dev/${PROJECT_ID}`,
  },

  runtimeVersion: {
    policy: "appVersion",
  },

  ios: {
    supportsTablet: true,
    bundleIdentifier: getUniqueIdentifier(),
    icon: "./assets/images/icon.png",
  },

  android: {
    package: getUniqueIdentifier(),
    adaptiveIcon: {
      backgroundColor: "#208AEF",
      foregroundImage: "./assets/images/android-icon-foreground.png",
      backgroundImage: "./assets/images/android-icon-background.png",
      monochromeImage: "./assets/images/android-icon-monochrome.png",
    },
    predictiveBackGestureEnabled: false,
  },

  web: {
    output: "static",
    favicon: "./assets/images/favicon.png",
  },

  plugins: [
    "expo-router",
    [
      "expo-splash-screen",
      {
        backgroundColor: "#7b99b5",
        image: "./assets/images/splash-icon.png",
        imageWidth: 160,
      },
    ],
    "expo-secure-store",
    "expo-sqlite",
    "expo-sharing",
  ],

  experiments: {
    typedRoutes: true,
    reactCompiler: true,
  },

  extra: {
    appVariant: APP_VARIANT,
    router: {},
    eas: {
      projectId: PROJECT_ID,
    },
  },
};

export default config;
```

Important fix: your original code used dynamic Android package but static iOS bundle ID:

```ts
ios: {
  bundleIdentifier: "com.notfound.pocketfiles"
}
```

Better:

```ts
ios: {
  bundleIdentifier: getUniqueIdentifier()
}
```

This allows dev, preview, and production iOS builds to also install separately.

---

# 3. Better `eas.json`

```json
{
  "cli": {
    "version": ">= 20.1.0",
    "appVersionSource": "remote"
  },
  "build": {
    "development": {
      "developmentClient": true,
      "distribution": "internal",
      "channel": "development",
      "env": {
        "APP_VARIANT": "development"
      }
    },
    "preview": {
      "distribution": "internal",
      "channel": "preview",
      "android": {
        "buildType": "apk"
      },
      "env": {
        "APP_VARIANT": "preview"
      }
    },
    "production": {
      "autoIncrement": true,
      "channel": "production",
      "env": {
        "APP_VARIANT": "production"
      }
    }
  },
  "submit": {
    "production": {}
  }
}
```

Expo docs say `env` variables in `eas.json` are used while evaluating `app.config.js/ts` and are also available on the EAS Build builder. ([Expo Documentation][3])

---

# 4. How This Works

When you run:

```bash
eas build --profile development --platform android
```

EAS sets:

```bash
APP_VARIANT=development
```

Then `app.config.ts` runs:

```ts
const IS_DEV = process.env.APP_VARIANT === "development";
```

So app becomes:

```text
Name: PocketFiles (dev)
Package: com.amie.pocketfiles.dev
Scheme: pocketfiles-dev
Channel: development
```

---

# 5. Build Commands

Development build:

```bash
eas build --profile development --platform android
```

Preview APK:

```bash
eas build --profile preview --platform android
```

Production build:

```bash
eas build --profile production --platform android
```

All platforms:

```bash
eas build --profile production --platform all
```

---

# 6. EAS Update Commands

Each build profile has its own channel:

```text
development build → development channel
preview build     → preview channel
production build  → production channel
```

Publish update to development:

```bash
eas update --channel development --message "dev update"
```

Publish update to preview:

```bash
eas update --channel preview --message "preview update"
```

Publish update to production:

```bash
eas update --channel production --message "production update"
```

EAS Update connects builds and updates through channels, and updates must match a compatible runtime version. ([Expo Documentation][4])

---

# 7. Final Mental Model

```text
eas.json profile
      ↓
sets APP_VARIANT
      ↓
app.config.ts reads APP_VARIANT
      ↓
changes app name/package/scheme
      ↓
EAS Build creates separate app
```

So:

```text
Development = for coding
Preview     = for tester/client
Production  = for real users
```

This setup is the professional way to manage multiple Expo app environments.

[1]: https://docs.expo.dev/build-reference/variants/?utm_source=chatgpt.com "Install app variants on the same device"
[2]: https://docs.expo.dev/workflow/configuration/?utm_source=chatgpt.com "Configure with app config"
[3]: https://docs.expo.dev/build/eas-json/?utm_source=chatgpt.com "Configure EAS Build with eas.json"
[4]: https://docs.expo.dev/eas-update/how-it-works/?utm_source=chatgpt.com "How EAS Update works"
