# 📱 Day 03 — Setup React Native Project with Expo

📅 **09-05-2026**

Expo official docs currently recommend `create-expo-app` for creating a new Expo + React Native project. During the SDK transition, Expo says `create-expo-app@latest` without template creates an **SDK 54** project, while SDK 55 can be created with `--template default@sdk-55`. ([Expo Documentation][1])

---

# 1️⃣ Requirements Before Setup

Install these first:

```bash
node -v
npm -v
```

Recommended:

```bash
node --version
npm --version
```

Also install on phone:

```txt
Expo Go App
```

---

# 2️⃣ Create Default Expo Project

```bash
npx create-expo-app@latest my-app
```

Go inside project:

```bash
cd my-app
```

Start project:

```bash
npx expo start
```

Expo docs say this opens a QR code; scan it with Expo Go. On emulator, press `a` for Android or `i` for iOS. ([Expo Documentation][2])

---

# 3️⃣ Create Expo Project With SDK Version

## SDK 54 Project

```bash
npx create-expo-app@latest my-app
```

## SDK 55 Project

```bash
npx create-expo-app@latest my-app --template default@sdk-55
```

## Blank Template

```bash
npx create-expo-app@latest my-app --template blank
```

## TypeScript Template

```bash
npx create-expo-app@latest my-app --template blank-typescript
```

---

# 4️⃣ Default Project Structure

A new Expo project usually looks like this:

```txt
my-app/
│
├── app/
│   ├── _layout.tsx
│   └── index.tsx
│
├── assets/
│   ├── images/
│   └── fonts/
│
├── components/
│
├── constants/
│
├── hooks/
│
├── package.json
├── app.json
├── tsconfig.json
├── babel.config.js
└── README.md
```

---

# 5️⃣ File Breakdown

## `package.json`

Contains project dependencies and scripts.

Example:

```json
{
  "scripts": {
    "start": "expo start",
    "android": "expo start --android",
    "ios": "expo start --ios",
    "web": "expo start --web"
  }
}
```

Run app:

```bash
npm run start
npm run android
npm run web
```

---

## `app.json`

Expo app configuration file.

Used for:

```txt
App name
App icon
Splash screen
Android package name
iOS bundle ID
SDK/runtime config
```

Example:

```json
{
  "expo": {
    "name": "my-app",
    "slug": "my-app",
    "version": "1.0.0",
    "orientation": "portrait",
    "scheme": "myapp"
  }
}
```

Expo docs mention `sdkVersion` should match the version in `package.json` when used. ([Expo Documentation][3])

---

## `app/`

This folder is used by **Expo Router**.

Example:

```txt
app/
├── _layout.tsx
├── index.tsx
├── about.tsx
└── profile.tsx
```

Routes:

```txt
app/index.tsx     → /
app/about.tsx     → /about
app/profile.tsx   → /profile
```

---

## `app/_layout.tsx`

Main layout file.

Example:

```tsx
import { Stack } from "expo-router";

export default function RootLayout() {
  return <Stack />;
}
```

This controls navigation layout.

---

## `app/index.tsx`

Home screen.

Example:

```tsx
import { Text, View } from "react-native";

export default function HomeScreen() {
  return (
    <View>
      <Text>Hello Expo App</Text>
    </View>
  );
}
```

---

## `assets/`

Stores static files:

```txt
images
icons
fonts
splash images
```

Example:

```tsx
<Image source={require("../assets/images/logo.png")} />
```

---

## `components/`

Reusable UI components.

Example:

```txt
components/
├── Header.tsx
├── Button.tsx
└── ProductCard.tsx
```

---

## `constants/`

Common values.

Example:

```txt
constants/
├── Colors.ts
└── Sizes.ts
```

Example:

```ts
export const COLORS = {
  primary: "#2563eb",
  background: "#ffffff",
  text: "#111827",
};
```

---

## `hooks/`

Custom hooks.

Example:

```txt
hooks/
└── useTheme.ts
```

---

# 6️⃣ Recommended Clean Project Structure

For learning and real project:

```txt
src/
├── components/
│   ├── common/
│   └── ui/
│
├── screens/
│   ├── HomeScreen.tsx
│   ├── ProfileScreen.tsx
│   └── SettingsScreen.tsx
│
├── constants/
│   ├── Colors.ts
│   └── Layout.ts
│
├── hooks/
│   └── useTheme.ts
│
├── context/
│   └── AppContext.tsx
│
├── services/
│   └── api.ts
│
├── utils/
│   └── helpers.ts
│
└── data/
    └── dummyData.ts
```

---

# 7️⃣ Run Project

Start development server:

```bash
npx expo start
```

Run Android:

```bash
npx expo start --android
```

Run web:

```bash
npx expo start --web
```

Use tunnel if QR code has network issue:

```bash
npx expo start --tunnel
```

Expo docs mention tunnel can help when same Wi-Fi/router causes QR connection problems. ([Expo Documentation][2])

---

# 8️⃣ Install Common Packages

Navigation:

```bash
npx expo install expo-router react-native-safe-area-context react-native-screens
```

Icons:

```bash
npx expo install @expo/vector-icons
```

Storage:

```bash
npx expo install @react-native-async-storage/async-storage
```

Image picker:

```bash
npx expo install expo-image-picker
```

---

# 9️⃣ Important Expo Commands

```bash
npx expo start
```

```bash
npx expo start --clear
```

```bash
npx expo install package-name
```

```bash
npx expo doctor
```

```bash
npx expo prebuild
```

---

# 🔟 Final Summary

| Topic             | Command / Meaning                                             |
| ----------------- | ------------------------------------------------------------- |
| Create Expo app   | `npx create-expo-app@latest my-app`                           |
| SDK 55 app        | `npx create-expo-app@latest my-app --template default@sdk-55` |
| Start app         | `npx expo start`                                              |
| Android           | Press `a` or use `--android`                                  |
| Web               | `npx expo start --web`                                        |
| Clear cache       | `npx expo start --clear`                                      |
| Config file       | `app.json`                                                    |
| Main route folder | `app/`                                                        |
| Assets folder     | `assets/`                                                     |
| Reusable UI       | `components/`                                                 |

[1]: https://docs.expo.dev/get-started/create-a-project/?utm_source=chatgpt.com "Create a project - Expo Documentation"
[2]: https://docs.expo.dev/get-started/start-developing/?utm_source=chatgpt.com "Start developing - Expo Documentation"
[3]: https://docs.expo.dev/versions/latest/config/app/?utm_source=chatgpt.com "app.json / app.config.js"
