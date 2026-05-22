# 🚀 Expo Router — Complete Detailed Notes

## 📅 Day 06 — 17-05-2026

## Mobile Development Cohort

---

# 📌 What is Expo Router?

Expo Router is a modern routing/navigation system for Expo + React Native applications.

It is built on top of React Navigation.

Expo Router provides:

* File-based routing
* Nested routes
* Dynamic routes
* Layout system
* Authentication flow support
* Deep linking
* Tabs
* Stack navigation
* Shared layouts

---

# 🧠 What is Routing?

Routing means:

```txt id="c4qj34"
Moving between screens while maintaining app state
```

Example:

```txt id="t0eprn"
Home → Profile → Settings → Back
```

Without routing:

* Navigation becomes difficult
* App structure becomes messy
* State handling becomes hard

---

# ❌ Traditional React Navigation Problem

Old React Navigation setup:

```tsx id="jvjlwm"
<Stack.Navigator>
  <Stack.Screen name="Home" component={HomeScreen} />
  <Stack.Screen name="Profile" component={ProfileScreen} />
</Stack.Navigator>
```

Problems:

* Too much boilerplate
* Huge navigator files
* Hard nested navigation
* Manual linking
* Difficult scalability

---

# ✅ Why Expo Router?

Expo Router solves:

* Manual navigation setup
* Boilerplate code
* Complex navigation structure
* Deep linking problems
* Nested route management

Core idea:

```txt id="8rz7te"
Folder Structure = Navigation Structure
```

---

# 📂 File-Based Routing

Every file inside `app/` becomes a route.

Example:

```txt id="w2xz0k"
app/index.tsx
```

becomes:

```txt id="l7eiv7"
/
```

Example:

```txt id="3f00w2"
app/profile.tsx
```

becomes:

```txt id="w15m3l"
/profile
```

---

# 📌 What is `index.tsx`?

`index.tsx` is the default screen of a folder.

Example:

```txt id="8v7mq1"
app/index.tsx
```

Route:

```txt id="kw5uz5"
/
```

Example:

```txt id="azv2x6"
app/profile/index.tsx
```

Route:

```txt id="bfr4oi"
/profile
```

---

# 📌 `profile.tsx` vs `profile/index.tsx`

Both create:

```txt id="jlwmcx"
/profile
```

---

## Option 1

```txt id="mw7zfe"
app/profile.tsx
```

Good for small/simple apps.

---

## Option 2

```txt id="x3f6tw"
app/profile/index.tsx
```

Better for scalable apps.

Why?

Because now profile can have child routes.

Example:

```txt id="4bllqa"
app/profile/profile.tsx
app/profile/details.tsx
```

Routes:

```txt id="we6ftl"
/profile/profile
/profile/details
```

---

# 📌 Static Route

Static routes have fixed names.

Example:

```txt id="oh65gj"
app/about.tsx
app/settings.tsx
```

Routes:

```txt id="vs80sk"
/about
/settings
```

---

# 📌 Nested Route

Folders automatically create nested routes.

Example:

```txt id="40xjlwm"
app/profile/index.tsx
app/profile/details.tsx
```

Routes:

```txt id="o83bcd"
/profile
/profile/details
```

---

# ⚡ Dynamic Route

Dynamic routes use square brackets.

Example:

```txt id="9jlwm5"
app/[userId].tsx
```

Matches:

```txt id="xw8fw2"
/1
/99
/aminul
```

---

# 📌 Reading Dynamic Params

```tsx id="yzjlwm"
import { useLocalSearchParams } from "expo-router";

const { userId } = useLocalSearchParams();
```

---

# ✅ Dynamic Route Best Practice

Always place dynamic routes inside folders.

❌ Avoid:

```txt id="84jlwm"
app/[id].tsx
```

✅ Better:

```txt id="o8lp7o"
app/user/[id]/index.tsx
```

Why?

* More scalable
* Easier nested routes
* Better architecture

---

# 📌 Nested Dynamic Route

Example:

```txt id="e4kphu"
app/[topic]/index.tsx
app/[topic]/[topicName].tsx
```

Routes:

```txt id="jlwm0u"
/react
/react/hooks
/mobile/expo-router
```

---

# 📌 Multi-Level Dynamic Route

Example:

```txt id="1jlwmk"
app/course/[courseId]/lesson/[lessonId].tsx
```

Route:

```txt id="jlwm9t"
/course/react/lesson/hooks
```

---

# 📌 Catch-All Route

Catch-all captures multiple path segments.

Example:

```txt id="jlwmvr"
app/docs/[...slug].tsx
```

Matches:

```txt id="jlwmfy"
/docs/react
/docs/react/native
/docs/react/native/navigation
```

---

# 📌 Reading Catch-All Params

```tsx id="jlwm6s"
const { slug } = useLocalSearchParams();
```

Result:

```txt id="0jlwmx"
["react", "native", "navigation"]
```

---

# 📌 Route Groups

Route groups use parentheses.

Syntax:

```txt id="jlwmvi"
(folderName)
```

Example:

```txt id="jlwmgz"
app/(auth)/login.tsx
app/(tabs)/home.tsx
```

Important:

```txt id="7jlwmn"
(auth) ❌ not in URL
(tabs) ❌ not in URL
```

Used only for organization/layouts.

---

# 📌 Why Route Groups Matter

They help separate:

* Auth screens
* Tabs
* Dashboard
* Admin panels
* Shared layouts

Example:

```txt id="jlwmzl"
app
├── (auth)
├── (tabs)
├── (dashboard)
```

---

# 📌 `_layout.tsx`

`_layout.tsx` defines navigation/layout structure.

Think:

```txt id="2jlwm3"
Shared wrapper for child routes
```

---

# 🌍 Root Layout

Example:

```txt id="jlwmrb"
app/_layout.tsx
```

Wraps entire application.

Used for:

* Stack navigation
* Theme provider
* Authentication provider
* Global setup

---

# 📌 Root Layout Example

```tsx id="0jlwmc"
import { Stack } from "expo-router";

export default function RootLayout() {
  return <Stack />;
}
```

---

# 📂 Group Layout

Example:

```txt id="xjlwmn"
app/(tabs)/_layout.tsx
```

Only affects routes inside `(tabs)`.

---

# 📌 Stack Navigation

Expo Router supports stack navigation.

Example:

```tsx id="6jlwmx"
import { Stack } from "expo-router";

export default function Layout() {
  return (
    <Stack>
      <Stack.Screen name="index" />
      <Stack.Screen name="profile" />
    </Stack>
  );
}
```

---

# 📌 `<Stack />`

Simple stack setup:

```tsx id="jlwm2x"
<Stack />
```

Automatically creates stack from files.

---

# 📌 `<Stack></Stack>`

Custom stack configuration:

```tsx id="0jlwm8"
<Stack>
  <Stack.Screen
    name="profile"
    options={{
      headerShown: false,
    }}
  />
</Stack>
```

---

# 🔒 Stack Protected Guard

Used for authentication flow.

Example logic:

```txt id="8jlwmz"
User Logged In ?
YES → App Screens
NO  → Login Screen
```

---

# 🔐 Login Flow Structure

Example:

```txt id="jlwm2t"
app
├── (auth)
│   ├── login.tsx
│   ├── signup.tsx
│
├── (tabs)
│   ├── home.tsx
│   ├── profile.tsx
```

---

# 📌 Router from Expo Router

```tsx id="7jlwm6"
import { router } from "expo-router";
```

Used for navigation without hooks.

---

# 📌 Router Navigation Example

```tsx id="9jlwmu"
router.push("/profile");
```

---

# 📌 Replace Navigation

```tsx id="6jlwm7"
router.replace("/login");
```

---

# 📌 Back Navigation

```tsx id="xjlwm9"
router.back();
```

---

# 📌 useRouter Hook

```tsx id="jlwm4x"
import { useRouter } from "expo-router";

const router = useRouter();
```

---

# 📌 useRouter Example

```tsx id="2jlwmw"
router.push("/settings");
```

---

# 📌 Passing Params

```tsx id="3jlwmq"
router.push({
  pathname: "/user/[id]",
  params: { id: 99 },
});
```

---

# 📌 Reading Params

```tsx id="jlwmwr"
const { id } = useLocalSearchParams();
```

---

# 📌 Tabs in Expo Router

Tabs usually use route groups.

Example:

```txt id="1jlwmh"
app/(tabs)
```

---

# 📌 Tabs Layout File

```txt id="4jlwm2"
app/(tabs)/_layout.tsx
```

---

# 📌 Tabs Example

```tsx id="0jlwmv"
import { Tabs } from "expo-router";

export default function TabLayout() {
  return <Tabs />;
}
```

---

# 📌 JavaScript Tabs

Traditional bottom tab navigation style.

Example:

```tsx id="8jlwmr"
<Tabs>
  <Tabs.Screen name="home" />
</Tabs>
```

---

# 📌 Native Tabs

Native tabs use platform-native behavior.

Advantages:

* Better performance
* More native feel
* Better animations

---

# 📌 Props

Props are data passed between components.

Example:

```tsx id="5jlwm0"
<Home title="React Native" />
```

---

# 📌 State

State stores changing data inside component.

Example:

```tsx id="0jlwmk"
const [count, setCount] = useState(0);
```

---

# 📌 Navigation

Navigation means moving between screens.

Example:

```tsx id="2jlwmr"
router.push("/profile");
```

---

# 📌 Screen Descriptions / Options

Used to customize screen behavior.

Example:

```tsx id="9jlwm8"
<Stack.Screen
  name="profile"
  options={{
    title: "My Profile",
    headerShown: false,
  }}
/>
```

---

# 📌 Production App Structure Example

```txt id="1jlwm9"
app
├── _layout.tsx
│
├── (auth)
│   ├── login.tsx
│   ├── signup.tsx
│
├── (tabs)
│   ├── _layout.tsx
│   ├── home
│   ├── search
│   ├── profile
│
├── product
│   ├── [id]
│   │   ├── index.tsx
│   │   ├── reviews.tsx
```

---

# 🔥 Advantages of Expo Router

✅ Less boilerplate
✅ Better scalability
✅ Cleaner navigation
✅ Easier nested routing
✅ Deep linking support
✅ Better developer experience
✅ Easier authentication flow
✅ File-based architecture

---

# ❌ When NOT to Use Expo Router

Avoid if:

* Existing huge React Navigation project
* Complex custom navigation system
* Bare React Native without Expo
* Team already deeply invested in old navigation structure

---

# 🧠 Final Mental Model

Think:

```txt id="9jlwmn"
Folders = Navigation Structure
Files = Screens
_layout.tsx = Shared Navigation Wrapper
```

Core Idea:

```txt id="4jlwm8"
File Structure = App Navigation
```
