# Expo Router — File-Based Routing Fundamentals

---

## What Is File-Based Routing?

Expo Router uses your **file system** as the source of truth for your app's navigation. Every file you create inside the `app/` directory automatically becomes a **route** — no manual route registration needed.

This is the same convention used by Next.js for the web, now brought to React Native / Expo apps.

---

## The `app/` Directory

The `app/` directory is the root of all your routes. Anything outside it is **not** a route (components, hooks, utils, etc. live elsewhere).

```
my-app/
├── app/                  ← All routes live here
│   ├── index.tsx         ← Home screen  ( "/" )
│   ├── about.tsx         ← About screen ( "/about" )
│   └── settings.tsx      ← Settings     ( "/settings" )
├── components/
├── hooks/
└── package.json
```

---

## Core Concepts

### 1. Index Routes

A file named `index.tsx` matches the **root** of its directory segment.

| File | URL / Route |
| --- | --- |
| `app/index.tsx` | `/` |
| `app/profile/index.tsx` | `/profile` |
| `app/settings/index.tsx` | `/settings` |

```tsx
// app/index.tsx
import { Text, View } from 'react-native';

export default function HomeScreen() {
  return (
    <View>
      <Text>Home Screen</Text>
    </View>
  );
}
```

> ✅ **Every route file must have a default export** — that component is what gets rendered.
> 

---

### 2. Nested Routes (Folders)

Create folders to build **nested URL segments**.

```
app/
├── index.tsx            → /
├── blog/
│   ├── index.tsx        → /blog
│   └── post.tsx         → /blog/post
└── settings/
    ├── index.tsx        → /settings
    └── notifications.tsx → /settings/notifications
```

---

### 3. Dynamic Routes

Wrap a filename in **square brackets** to create a dynamic segment — a route that accepts a variable value.

```
app/
└── user/
    └── [id].tsx         → /user/123 , /user/abc , /user/anything
```

**Reading the dynamic param in your component:**

```tsx
// app/user/[id].tsx
import { useLocalSearchParams } from 'expo-router';
import { Text } from 'react-native';

export default function UserScreen() {
  const { id } = useLocalSearchParams();

  return <Text>User ID: {id}</Text>;
}
```

---

### 4. Deep Dynamic Routes (Catch-All)

Use `[...slug]` to match **one or more** path segments.

```
app/
└── docs/
    └── [...slug].tsx    → /docs/a , /docs/a/b , /docs/a/b/c
```

```tsx
// app/docs/[...slug].tsx
import { useLocalSearchParams } from 'expo-router';

export default function DocsPage() {
  const { slug } = useLocalSearchParams(); // slug is string[]
  return <Text>{Array.isArray(slug) ? slug.join(' / ') : slug}</Text>;
}
```

---

### 5. Layout Routes (`_layout.tsx`)

A `_layout.tsx` file **wraps** all sibling/child routes in that directory. This is where you define navigation containers like `<Stack>`, `<Tabs>`, or `<Drawer>`.

```
app/
├── _layout.tsx           ← Root layout (wraps everything)
├── index.tsx
└── profile/
    ├── _layout.tsx       ← Profile-section layout
    └── index.tsx
```

```tsx
// app/_layout.tsx
import { Stack } from 'expo-router';

export default function RootLayout() {
  return <Stack />;  // All child routes render inside this Stack navigator
}
```

> ⚠️ **Every directory that has routes should have a `_layout.tsx`**. Without one, Expo Router creates a default layout, but it's best practice to define it explicitly.
> 

---

### 6. Special Files

| File | Purpose |
| --- | --- |
| `app/index.tsx` | Root/home route |
| `app/_layout.tsx` | Navigation wrapper for a directory |
| `app/+not-found.tsx` | 404 / unmatched route screen |
| `app/+html.tsx` | Custom HTML shell (web only) |

---

## Navigation Between Routes

Use the `<Link>` component or the `router` object from `expo-router`.

### `<Link>` Component (declarative)

```tsx
import { Link } from 'expo-router';
import { View } from 'react-native';

export default function Home() {
  return (
    <View>
      <Link href="/about">Go to About</Link>
      <Link href="/user/42">View User 42</Link>
      <Link href="/blog/post?title=Hello">Blog Post</Link>
    </View>
  );
}
```

### `router` Object (imperative)

```tsx
import { router } from 'expo-router';

// Push a new screen onto the stack
router.push('/about');

// Replace current screen
router.replace('/home');

// Go back
router.back();

// Navigate with params
router.push({ pathname: '/user/[id]', params: { id: '42' } });
```

---

## Route Groups (Organizational, No URL Impact)

Wrap a folder name in **parentheses** to group routes **without** adding a URL segment. Great for organizing tabs, auth flows, etc.

```
app/
├── (auth)/
│   ├── login.tsx        → /login   (NOT /auth/login)
│   └── register.tsx     → /register
├── (tabs)/
│   ├── _layout.tsx      ← Tabs layout
│   ├── index.tsx        → /
│   └── explore.tsx      → /explore
```

---

## Tabs Example (Common Pattern)

```
app/
├── _layout.tsx           ← Root Stack layout
└── (tabs)/
    ├── _layout.tsx       ← Tabs layout
    ├── index.tsx         → Home tab
    ├── explore.tsx       → Explore tab
    └── profile.tsx       → Profile tab
```

```tsx
// app/(tabs)/_layout.tsx
import { Tabs } from 'expo-router';

export default function TabLayout() {
  return (
    <Tabs>
      <Tabs.Screen name="index"   options={{ title: 'Home' }} />
      <Tabs.Screen name="explore" options={{ title: 'Explore' }} />
      <Tabs.Screen name="profile" options={{ title: 'Profile' }} />
    </Tabs>
  );
}
```

---

## Summary Cheat Sheet

| Pattern | File Name | Matches |
| --- | --- | --- |
| Static route | `about.tsx` | `/about` |
| Index route | `index.tsx` | `/` or folder root |
| Dynamic segment | `[id].tsx` | `/123`, `/abc` |
| Catch-all | `[...slug].tsx` | `/a/b/c` |
| Layout | `_layout.tsx` | Wraps children |
| Route group | `(group)/` | No URL change |
| Not found | `+not-found.tsx` | Unmatched routes |

---

## Key Takeaways

- 📁 **File = Route** — your folder structure IS your navigation structure
- 🗂️ **`_layout.tsx`** defines the navigator (Stack, Tabs, Drawer) for a directory
- 🔗 **`[param]`** brackets create dynamic segments
- 🎯 **`(group)`** parentheses organize without affecting URLs
- 📤 Every route file needs a **default export** (the screen component)
- 🔄 Use `<Link>` for declarative navigation, `router` for programmatic navigation

# Expo Router — Route Groups, Auth Patterns & Nested Layouts

> **Expo SDK 55** · Expo Router v4
> 

---

## Route Groups — `(groupName)/`

A **route group** is a folder whose name is wrapped in parentheses. It lets you **organize** your files without adding anything to the URL.

```
app/
├── (auth)/
│   ├── login.tsx        → /login      ✅ (NOT /auth/login)
│   └── register.tsx     → /register   ✅ (NOT /auth/register)
└── (app)/
    ├── index.tsx        → /
    └── profile.tsx      → /profile
```

> The parentheses are **invisible to the URL** — they only exist on disk for your own organization.
> 

### Why use groups?

- Separate **authenticated** vs **unauthenticated** screens
- Give different sections their own **layout** (e.g. tabs for app, plain stack for auth)
- Keep the `app/` directory tidy without polluting URLs

---

## `_layout.tsx` — The Navigator Wrapper

Every `_layout.tsx` defines **what navigator wraps** the routes in that directory. Think of it as the "shell" for its siblings and children.

```tsx
// app/_layout.tsx  ← Root layout
import { Stack } from 'expo-router';

export default function RootLayout() {
  return <Stack />;
}
```

### Rules to remember

| Rule | Detail |
| --- | --- |
| Every directory with routes **should** have one | Without it, Expo Router uses a default — but be explicit |
| It must have a **default export** | The exported component is the navigator/shell |
| It renders `<Slot />` OR a navigator | Use `<Slot />` for custom layouts, `<Stack>` / `<Tabs>` for navigators |
| It does **not** render as a route itself | `/layout` is not a valid URL |

---

## The `<Slot />` Component

`<Slot />` is a **generic placeholder** — it renders whichever child route is currently active, without imposing any navigator chrome.

```tsx
// app/_layout.tsx
import { Slot } from 'expo-router';
import { View } from 'react-native';

export default function RootLayout() {
  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      {/* Renders the active child route here */}
      <Slot />
    </View>
  );
}
```

Use `<Slot />` when you want **full control** over the shell (e.g. wrapping with a provider, custom header, theme).

Use `<Stack>` / `<Tabs>` when you want a **built-in navigator**.

---

## Nested Layouts — How They Stack

Layouts **nest inside each other**. The root `_layout.tsx` wraps everything; each subdirectory's `_layout.tsx` wraps only its own children.

```
app/
├── _layout.tsx              ← (1) Root layout — wraps the whole app
├── (auth)/
│   ├── _layout.tsx          ← (2) Auth layout — wraps login & register
│   ├── login.tsx
│   └── register.tsx
└── (app)/
    ├── _layout.tsx          ← (3) App layout — wraps tabs
    └── (tabs)/
        ├── _layout.tsx      ← (4) Tabs layout — defines tab bar
        ├── index.tsx
        └── explore.tsx
```

When a user visits `/login`, the render tree looks like this:

```
RootLayout          ← app/_layout.tsx
  └── AuthLayout    ← app/(auth)/_layout.tsx
        └── LoginScreen  ← app/(auth)/login.tsx
```

When a user visits `/` (home tab):

```
RootLayout
  └── AppLayout
        └── TabsLayout
              └── HomeScreen
```

Each layout only "knows about" its own level — they compose cleanly.

---

## Auth Pattern — Protecting Routes

The most common use of groups + nested layouts is **auth-gating**: show login/register to unauthenticated users, show the main app to authenticated ones.

### Folder structure

```
app/
├── _layout.tsx              ← Root: decides which group to show
├── (auth)/
│   ├── _layout.tsx          ← Auth shell (no tab bar, plain stack)
│   ├── login.tsx            → /login
│   └── register.tsx         → /register
└── (app)/
    ├── _layout.tsx          ← App shell (with tab bar)
    └── (tabs)/
        ├── _layout.tsx
        ├── index.tsx        → /
        └── profile.tsx      → /profile
```

### Root layout — redirect logic

```tsx
// app/_layout.tsx
import { Stack } from 'expo-router';
import { useEffect } from 'react';
import { useRouter, useSegments } from 'expo-router';

function AuthGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const segments = useSegments();
  const isAuthenticated = useAuth(); // your auth hook / state

  useEffect(() => {
    const inAuthGroup = segments[0] === '(auth)';

    if (!isAuthenticated && !inAuthGroup) {
      // Not signed in — redirect to login
      router.replace('/login');
    } else if (isAuthenticated && inAuthGroup) {
      // Signed in — redirect away from auth screens
      router.replace('/');
    }
  }, [isAuthenticated, segments]);

  return <>{children}</>;
}

export default function RootLayout() {
  return (
    <AuthGuard>
      <Stack screenOptions={{ headerShown: false }} />
    </AuthGuard>
  );
}
```

### `useSegments` — what is it?

`useSegments()` returns an array of the **current URL segments**, including group names.

```tsx
// If the user is on /login:
const segments = useSegments();
// → ['(auth)', 'login']

// If the user is on /:
// → ['(app)', '(tabs)', 'index']
```

This lets you check **which group** the user is currently in.

---

### Auth group layout — plain stack, no tab bar

```tsx
// app/(auth)/_layout.tsx
import { Stack } from 'expo-router';

export default function AuthLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="login" />
      <Stack.Screen name="register" />
    </Stack>
  );
}
```

### App group layout — tabs

```tsx
// app/(app)/_layout.tsx  (or app/(app)/(tabs)/_layout.tsx)
import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function AppLayout() {
  return (
    <Tabs>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <Ionicons name="home" size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color }) => <Ionicons name="person" size={24} color={color} />,
        }}
      />
    </Tabs>
  );
}
```

---

## Passing Data / Providers Through Layouts

Layouts are a great place to inject **context providers** — they wrap all children, so everything inside gets access.

```tsx
// app/_layout.tsx
import { Stack } from 'expo-router';
import { AuthProvider } from '@/context/auth';
import { ThemeProvider } from '@/context/theme';

export default function RootLayout() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <Stack screenOptions={{ headerShown: false }} />
      </ThemeProvider>
    </AuthProvider>
  );
}
```

> ✅ Providers in the root layout are available **everywhere** in your app.
> 

---

## Hiding Screens From the Navigator

Sometimes a file in a group should exist as a route but **not appear** as a tab or stack header item automatically. Use `options={{ href: null }}` on `<Tabs.Screen>` or control `headerShown` on `<Stack.Screen>`.

```tsx
<Tabs.Screen
  name="modal"
  options={{ href: null }}  // Hidden from tab bar, still navigable
/>
```

---

## Summary

| Concept | What it does |
| --- | --- |
| `(group)/` | Organizes routes; invisible in URL |
| `_layout.tsx` | Defines navigator/shell for its directory |
| `<Slot />` | Renders the active child with no navigator chrome |
| `<Stack />` | Stack navigator — screens push/pop |
| `<Tabs />` | Tab bar navigator |
| `useSegments()` | Returns current URL segments (including group names) |
| Nested layouts | Each directory's layout wraps only its own children |
| Root layout auth guard | Best place to redirect based on auth state |

---

## Visual: Layout Nesting Tree

```
app/_layout.tsx                     ← Root (Stack, providers)
│
├── app/(auth)/_layout.tsx          ← Auth shell (Stack, no tabs)
│   ├── login.tsx
│   └── register.tsx
│
└── app/(app)/_layout.tsx           ← App shell (optional wrapper)
    └── app/(app)/(tabs)/_layout.tsx ← Tabs navigator
        ├── index.tsx               ← Home tab
        ├── explore.tsx             ← Explore tab
        └── profile.tsx             ← Profile tab
```

Each level only controls its own scope. Clean, predictable, composable.

# Expo Router — Stacks & Protected Routes

> **Expo SDK 55** · Expo Router v4+
> 

---

## Part 1 — What is a Stack?

A **Stack navigator** is the most fundamental navigator in mobile apps. It works exactly like a stack of cards:

- Navigate to a new screen → card is **pushed** on top
- Go back → card is **popped** off the top
- The previous screen stays mounted underneath

This gives users the familiar **back button / swipe-back** behavior on both iOS and Android.

```
[ Home ] → push → [ Home | Profile ] → push → [ Home | Profile | Settings ]
                                        ← pop  ← [ Home | Profile ]
```

> Expo Router's `<Stack>` is built on top of React Navigation's **Native Stack Navigator**, which uses actual native navigation components under the hood — smooth, performant, platform-native feel.
> 

---

## Part 2 — Defining a Stack in Expo Router

You define a Stack in a `_layout.tsx` file. Every file in the same directory automatically becomes a screen in that stack.

```tsx
// app/_layout.tsx
import { Stack } from 'expo-router';

export default function RootLayout() {
  return <Stack />;
}
```

That's it. With this layout, if you have:

```
app/
├── _layout.tsx     ← Stack definition
├── index.tsx       → / (first screen)
├── profile.tsx     → /profile
└── settings.tsx    → /settings
```

All three are automatically part of the stack — no manual registration needed.

---

## Part 3 — Configuring Stack Screens

### Global options with `screenOptions`

Apply options to **all screens** in the stack at once:

```tsx
// app/_layout.tsx
import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: '#f4511e' },
        headerTintColor: '#fff',
        headerTitleStyle: { fontWeight: 'bold' },
      }}
    />
  );
}
```

### Per-screen options with `Stack.Screen`

Configure individual screens from the **layout file**:

```tsx
// app/_layout.tsx
import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: 'Home' }} />
      <Stack.Screen name="profile" options={{ title: 'My Profile' }} />
      <Stack.Screen
        name="settings"
        options={{
          title: 'Settings',
          headerShown: false,    // hide the header entirely
        }}
      />
    </Stack>
  );
}
```

### Configuring options from inside the screen itself

You can also set options **from within a route file** using `<Stack.Screen>` with no `name` prop:

```tsx
// app/profile.tsx
import { Stack } from 'expo-router';
import { View, Text } from 'react-native';

export default function ProfileScreen() {
  return (
    <View>
      <Stack.Screen options={{ title: 'My Profile', headerShown: true }} />
      <Text>Profile content</Text>
    </View>
  );
}
```

> ✅ This is useful when the title depends on **dynamic data** (e.g. a username fetched from an API).
> 

---

## Part 4 — Common `screenOptions` Reference

| Option | Type | What it does |
| --- | --- | --- |
| `title` | `string` | Header title text |
| `headerShown` | `boolean` | Show/hide the header bar |
| `headerStyle` | `object` | Style the header background |
| `headerTintColor` | `string` | Color of back button & title |
| `headerTitleStyle` | `object` | Style the title text |
| `headerRight` | `() => ReactNode` | Add a component to the right of header |
| `headerLeft` | `() => ReactNode` | Add a component to the left of header |
| `presentation` | `'card' | 'modal' | 'transparentModal'` | How the screen animates in |
| `animation` | `'default' | 'fade' | 'slide_from_right' | 'none'` | Screen transition animation |
| `gestureEnabled` | `boolean` | Allow swipe-to-go-back gesture |

---

## Part 5 — Modal Presentation

Present a screen as a **modal** (slides up from the bottom) by setting `presentation: 'modal'`:

```tsx
// app/_layout.tsx
import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" />
      <Stack.Screen
        name="modal"
        options={{
          presentation: 'modal',
          headerShown: false,
        }}
      />
    </Stack>
  );
}
```

Navigate to it like any other route:

```tsx
import { router } from 'expo-router';

router.push('/modal');
```

---

## Part 6 — Nested Stacks

Stacks can be **nested inside each other**. A common pattern is a root Stack that contains groups, each group having its own Stack:

```
app/
├── _layout.tsx              ← Root Stack
├── (auth)/
│   ├── _layout.tsx          ← Auth Stack
│   ├── login.tsx
│   └── register.tsx
└── (app)/
    ├── _layout.tsx          ← App Stack
    └── (tabs)/
        ├── _layout.tsx      ← Tabs navigator
        └── index.tsx
```

```tsx
// app/(auth)/_layout.tsx
import { Stack } from 'expo-router';

export default function AuthLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="login" />
      <Stack.Screen name="register" />
    </Stack>
  );
}
```

Each Stack has its own **independent navigation history**. Going back in the auth stack doesn't affect the app stack.

---

## Part 7 — Navigating in a Stack

### `<Link>` (declarative)

```tsx
import { Link } from 'expo-router';

<Link href="/profile">Go to Profile</Link>
<Link href={{ pathname: '/user/[id]', params: { id: '42' } }}>View User</Link>
```

### `router` object (imperative)

```tsx
import { router } from 'expo-router';

router.push('/profile');       // Push new screen
router.replace('/home');       // Replace current screen (no back)
router.back();                 // Go back one screen
router.dismiss();              // Dismiss a modal
router.dismissAll();           // Dismiss all modals
```

| Method | Behavior |
| --- | --- |
| `push` | Adds screen on top of stack |
| `replace` | Swaps current screen (removes it from history) |
| `back` | Goes back one step |
| `dismiss` | Dismisses modal presentation |

---

## Part 8 — Protected Routes

Protected routes are screens that should only be accessible based on some **condition** — most commonly, authentication. If the condition isn't met, the user gets redirected.

### The Old Way (SDK 52 and earlier) — Manual Redirects

Before `Stack.Protected`, developers manually redirected using `useSegments` + `router.replace()`:

```tsx
// ❌ Old approach — fragile, scattered, lots of boilerplate
import { useEffect } from 'react';
import { useSegments, useRouter } from 'expo-router';

function AuthGuard({ isLoggedIn }) {
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    const inAuthGroup = segments[0] === '(auth)';
    if (!isLoggedIn && !inAuthGroup) {
      router.replace('/login');
    } else if (isLoggedIn && inAuthGroup) {
      router.replace('/');
    }
  }, [isLoggedIn, segments]);
}
```

**Problems with this approach:**

- Logic scattered across multiple files
- Deep links could bypass the redirect
- Race conditions possible
- Lots of repetitive boilerplate

---

## Part 9 — `Stack.Protected` (SDK 53+)

`Stack.Protected` is the **modern, declarative** way to protect routes. It lives directly inside your `<Stack>` in the layout file and takes a `guard` prop.

```tsx
<Stack>
  <Stack.Protected guard={condition}>
    <Stack.Screen name="some-screen" />
  </Stack.Protected>
</Stack>
```

- `guard={true}` → screens are **accessible**
- `guard={false}` → screens are **blocked** and user is redirected to the anchor route automatically

---

### Basic Auth Example

```tsx
// app/_layout.tsx
import { Stack } from 'expo-router';

const isLoggedIn = false; // your real auth state

export default function AppLayout() {
  return (
    <Stack>
      {/* Only accessible when NOT logged in */}
      <Stack.Protected guard={!isLoggedIn}>
        <Stack.Screen name="login" />
      </Stack.Protected>

      {/* Only accessible when logged in */}
      <Stack.Protected guard={isLoggedIn}>
        <Stack.Screen name="private" />
      </Stack.Protected>
    </Stack>
  );
}
```

---

### Real Auth with Context

```tsx
// app/_layout.tsx
import { Stack } from 'expo-router';
import { SessionProvider, useSession } from '@/ctx';

function RootNavigator() {
  const { session } = useSession(); // your auth hook

  return (
    <Stack screenOptions={{ headerShown: false }}>

      {/* Protected app screens */}
      <Stack.Protected guard={!!session}>
        <Stack.Screen name="(app)" />
      </Stack.Protected>

      {/* Public auth screens */}
      <Stack.Protected guard={!session}>
        <Stack.Screen name="sign-in" />
      </Stack.Protected>

    </Stack>
  );
}

export default function Root() {
  return (
    <SessionProvider>
      <RootNavigator />
    </SessionProvider>
  );
}
```

> When `session` changes (login/logout), the router **automatically** handles the redirect — no manual `router.replace()` needed.
> 

---

### What Happens When Guard Turns `false` Mid-Session?

If a user is already on `/private/page` and the guard becomes `false` (e.g. they get logged out):

1. They are **immediately redirected** to the anchor route
2. **All history entries** for the protected screen are removed
3. Pressing back will NOT take them back into the protected area

This is the key advantage — it's airtight even against deep links and race conditions.

---

## Part 10 — Nested `Stack.Protected` (Role-Based Access)

Nest `Stack.Protected` blocks to build **hierarchical access control**:

```tsx
// app/_layout.tsx
import { Stack } from 'expo-router';

const isLoggedIn = true;
const isAdmin = true;

export default function AppLayout() {
  return (
    <Stack>
      <Stack.Protected guard={isLoggedIn}>

        {/* All authenticated users */}
        <Stack.Screen name="about" />
        <Stack.Screen name="dashboard" />

        {/* Only admins */}
        <Stack.Protected guard={isAdmin}>
          <Stack.Screen name="admin" />
        </Stack.Protected>

      </Stack.Protected>
    </Stack>
  );
}
```

Access matrix:

| Screen | Not logged in | Logged in | Logged in + Admin |
| --- | --- | --- | --- |
| `about` | ❌ | ✅ | ✅ |
| `dashboard` | ❌ | ✅ | ✅ |
| `admin` | ❌ | ❌ | ✅ |

---

## Part 11 — `Tabs.Protected`

The same pattern works for tab navigators too — hide tabs from users who don't have access:

```tsx
// app/(tabs)/_layout.tsx
import { Tabs } from 'expo-router';

export default function TabLayout() {
  const { isAdmin } = useAuth();

  return (
    <Tabs>
      <Tabs.Screen name="index" options={{ title: 'Home' }} />
      <Tabs.Screen name="explore" options={{ title: 'Explore' }} />

      {/* Tab only visible to admins */}
      <Tabs.Protected guard={isAdmin}>
        <Tabs.Screen name="admin" options={{ title: 'Admin' }} />
      </Tabs.Protected>
    </Tabs>
  );
}
```

---

## Part 12 — Custom Fallback with `unstable_settings`

By default, blocked users are sent to the **anchor route** (index). You can customize the fallback:

```tsx
// app/_layout.tsx
export const unstable_settings = {
  anchor: '(root)',  // redirect here when guard is false
};
```

---

## Key Rules

| Rule | Detail |
| --- | --- |
| One declaration per screen | Can't declare the same `Stack.Screen` twice — even across `Stack.Protected` blocks |
| Guard is reactive | When guard value changes, router auto-redirects |
| History is cleared | When guard turns false, all history for those screens is wiped |
| Works with groups | Protect an entire `(group)` with one `Stack.Screen name="(group)"` |
| Nesting supported | `Stack.Protected` inside `Stack.Protected` for role-based access |

---

## Full Picture — Stack + Protected Routes Flow

```
app/_layout.tsx
└── <Stack>
    │
    ├── <Stack.Protected guard={!session}>   ← Public (unauthed only)
    │   └── <Stack.Screen name="sign-in" />
    │
    └── <Stack.Protected guard={!!session}>  ← Private (authed only)
        └── <Stack.Screen name="(app)" />
                │
                └── app/(app)/_layout.tsx
                    └── <Tabs>
                        ├── index
                        ├── explore
                        └── <Tabs.Protected guard={isAdmin}>
                            └── admin
```

Clean, declarative, centralized — no redirect spaghetti.

# Expo Router — Tabs (JS, Native & Custom)

> **Expo SDK 55** · Expo Router v4+
> 

---

## Overview

| Type | Package | Feel | Status |
| --- | --- | --- | --- |
| **JS Tabs** | `expo-router` | JS-driven, cross-platform | Stable |
| **Native Tabs** | `expo-router/unstable-native-tabs` | Fully platform-native | Beta (SDK 55+) |
| **Custom Tabs** | `expo-router` + your own UI | Total design freedom | Stable |

---

## 1 — JS Tabs (Default)

Standard `<Tabs>` from `expo-router`. Runs in JavaScript, works on all platforms, familiar React Navigation-style API.

```tsx
// app/(tabs)/_layout.tsx
import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function JSTabsLayout() {
  return (
    <Tabs screenOptions={{ headerShown: false }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <Ionicons name="home" size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: 'Explore',
          tabBarIcon: ({ color }) => <Ionicons name="compass" size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color }) => <Ionicons name="person" size={24} color={color} />,
        }}
      />
    </Tabs>
  );
}
```

---

## 2 — Native Tabs (Beta)

`NativeTabs` in Expo Router is super new and gives you **real native bottom tabs** on iOS + Android instead of JS-rendered tabs. That means smoother animations, native feel, scroll-to-top behavior, liquid glass effects on iOS, etc. (Expo Documentation)

Your current setup is the basic version. Here are the most commonly used props and customizations you’ll actually use in real apps.

---

# Basic Structure

```tsx
import { NativeTabs } from "expo-router/unstable-native-tabs";

export default function Layout() {
  return (
    <NativeTabs>
      <NativeTabs.Trigger name="index">
        <NativeTabs.Trigger.Label>
          Home
        </NativeTabs.Trigger.Label>

        <NativeTabs.Trigger.Icon
          sf={{ default: "house", selected: "house.fill" }}
          md="home"
        />
      </NativeTabs.Trigger>
    </NativeTabs>
  );
}
```

---

# Most Used Props in `NativeTabs`

## 1. `tintColor`

Changes active tab color.

```tsx
<NativeTabs tintColor="#208AEF">
```

Example:

```tsx
<NativeTabs tintColor="tomato">
```

---

## 2. `backgroundColor`

Changes tab bar background.

```tsx
<NativeTabs backgroundColor="#111827">
```

Example dark theme:

```tsx
<NativeTabs
  tintColor="#fff"
  backgroundColor="#000"
/>
```

---

## 3. `labelStyle`

Customize label text.

```tsx
<NativeTabs
  labelStyle={{
    fontSize: 12,
    fontWeight: "600",
  }}
>
```

---

## 4. `iconColor`

Set default icon color.

```tsx
<NativeTabs iconColor="#94A3B8">
```

---

# Trigger Customization

---

## 5. `Label`

### Normal Label

```tsx
<NativeTabs.Trigger.Label>
  Home
</NativeTabs.Trigger.Label>
```

---

### Hidden Label

Used in Instagram-like minimal tabs.

```tsx
<NativeTabs.Trigger.Label hidden />
```

(Expo Documentation)

---

# Icons

---

## 6. SF Symbols (iOS)

```tsx
sf="house"
```

or selected state:

```tsx
sf={{
  default: "house",
  selected: "house.fill"
}}
```

---

## 7. Material Icons (Android)

```tsx
md="home"
```

Examples:

```tsx
md="search"
md="person"
md="settings"
md="favorite"
```

---

## 8. Custom Image Icons

You can use your own PNG icons.

```tsx
<NativeTabs.Trigger.Icon
  src={require("@/assets/home.png")}
/>
```

(Expo Documentation)

---

# Badges (VERY COMMON)

Perfect for notifications/messages.

---

## 9. Add Badge

```tsx
<NativeTabs.Trigger.Badge>
  9+
</NativeTabs.Trigger.Badge>
```

Example:

```tsx
<NativeTabs.Trigger name="messages">
  <NativeTabs.Trigger.Label>
    Messages
  </NativeTabs.Trigger.Label>

  <NativeTabs.Trigger.Icon
    sf="message"
    md="message"
  />

  <NativeTabs.Trigger.Badge>
    12
  </NativeTabs.Trigger.Badge>
</NativeTabs.Trigger>
```

(Expo Documentation)

---

# Full Advanced Example

```tsx
import { NativeTabs } from "expo-router/unstable-native-tabs";

export default function Layout() {
  return (
    <NativeTabs
      tintColor="#3B82F6"
      backgroundColor="#0F172A"
      labelStyle={{
        fontSize: 12,
        fontWeight: "600",
      }}
    >
      {/* HOME */}
      <NativeTabs.Trigger name="index">
        <NativeTabs.Trigger.Label>
          Home
        </NativeTabs.Trigger.Label>

        <NativeTabs.Trigger.Icon
          sf={{
            default: "house",
            selected: "house.fill",
          }}
          md="home"
        />
      </NativeTabs.Trigger>

      {/* SEARCH */}
      <NativeTabs.Trigger name="search">
        <NativeTabs.Trigger.Label>
          Search
        </NativeTabs.Trigger.Label>

        <NativeTabs.Trigger.Icon
          sf="magnifyingglass"
          md="search"
        />
      </NativeTabs.Trigger>

      {/* NOTIFICATIONS */}
      <NativeTabs.Trigger name="notifications">
        <NativeTabs.Trigger.Label>
          Alerts
        </NativeTabs.Trigger.Label>

        <NativeTabs.Trigger.Icon
          sf={{
            default: "bell",
            selected: "bell.fill",
          }}
          md="notifications"
        />

        <NativeTabs.Trigger.Badge>
          5
        </NativeTabs.Trigger.Badge>
      </NativeTabs.Trigger>

      {/* PROFILE */}
      <NativeTabs.Trigger name="profile">
        <NativeTabs.Trigger.Label hidden />

        <NativeTabs.Trigger.Icon
          sf="person.circle"
          md="person"
        />
      </NativeTabs.Trigger>
    </NativeTabs>
  );
}
```

---

# Commonly Used SF Symbols

## Home

```tsx
house
house.fill
```

## Search

```tsx
magnifyingglass
```

## Profile

```tsx
person
person.fill
person.circle
```

## Notifications

```tsx
bell
bell.fill
```

## Settings

```tsx
gear
gearshape.fill
```

---

# Real Production Folder Structure

```
app
 ├── (tabs)
 │    ├── _layout.tsx
 │    ├── index.tsx
 │    ├── search.tsx
 │    ├── notifications.tsx
 │    └── profile.tsx
 │
 ├── login.tsx
 └── modal.tsx
```

---

# Native Tabs vs JS Tabs

| Feature | NativeTabs | Tabs |
| --- | --- | --- |
| Performance | Better | Good |
| Native Feel | Real Native | JS |
| Animations | Native | JS |
| Customization | Limited | Very Flexible |
| Web Support | Limited | Better |
| Production Stable | Still Beta | Stable |

---

# Important Limitations

Because these are REAL native tabs:

- Less styling flexibility
- Harder to fully customize
- Some animations not possible
- API still unstable/beta in SDK 55 (Expo Documentation)

---

# Best Use Cases

Use `NativeTabs` when you want:

- iOS native feeling apps
- Android native tab behavior
- Better performance
- Minimal clean UI
- App Store quality navigation

Use normal `Tabs` when you want:

- Fully custom UI
- Fancy animations
- Floating tab bars
- Custom blur effects
- Complex designs

---

Docs:

- Expo Native Tabs Docs
- Expo Router Docs

```tsx
// app/(tabs)/_layout.tsx
import { NativeTabs } from 'expo-router/unstable-native-tabs';
import { Icon } from 'expo-router';

export default function NativeTabsLayout() {
  return (
    <NativeTabs
      tintColor="#6366f1"
      backgroundColor="#ffffff"
    >
      <NativeTabs.Trigger name="index">
        <NativeTabs.Trigger.Icon>
          <Icon sf="house" md="home" />
        </NativeTabs.Trigger.Icon>
        <NativeTabs.Trigger.Label>Home</NativeTabs.Trigger.Label>
      </NativeTabs.Trigger>

      <NativeTabs.Trigger name="explore">
        <NativeTabs.Trigger.Icon>
          <Icon sf="safari" md="explore" />
        </NativeTabs.Trigger.Icon>
        <NativeTabs.Trigger.Label>Explore</NativeTabs.Trigger.Label>
      </NativeTabs.Trigger>

      <NativeTabs.Trigger name="profile">
        <NativeTabs.Trigger.Icon>
          <Icon sf="person" md="person" />
        </NativeTabs.Trigger.Icon>
        <NativeTabs.Trigger.Label>Profile</NativeTabs.Trigger.Label>
        {/* Badge example */}
        <NativeTabs.Trigger.Badge>3</NativeTabs.Trigger.Badge>
      </NativeTabs.Trigger>
    </NativeTabs>
  );
}
```

### Useful `NativeTabs` props

| Prop | Platform | What it does |
| --- | --- | --- |
| `tintColor` | iOS + Android | Color of selected tab icon |
| `backgroundColor` | iOS + Android | Tab bar background |
| `blurEffect` | iOS only | Blur style (e.g. `'systemMaterial'`) |
| `hidden` | All | Hides the tab bar entirely |
| `sidebarAdaptable` | iOS 18+ iPad | Adapts to sidebar on iPad/Mac |
| `minimizeBehavior` | iOS 26+ | `'onScrollDown'`, `'never'`, etc. |
| `labelVisibilityMode` | Android | `'auto'`, `'labeled'`, `'unlabeled'` |

### `NativeTabs.Trigger` sub-components

| Component | Purpose |
| --- | --- |
| `NativeTabs.Trigger.Icon` | Wraps the tab icon |
| `NativeTabs.Trigger.Label` | Tab label text |
| `NativeTabs.Trigger.Badge` | Badge with optional count text |
| `NativeTabs.Trigger.VectorIcon` | Helper for vector icon families |

### Using `role` for system tabs (iOS)

```tsx
// iOS system-provided tab items with built-in icons & localized titles
<NativeTabs.Trigger name="search" role="search" />
<NativeTabs.Trigger name="history" role="history" />
<NativeTabs.Trigger name="bookmarks" role="bookmarks" />
```

---

---

# Custom Tab Bar Notes (With File Paths)

## File Structure

```
app
 └── (tabs)
      ├── _layout.tsx   ← Tabs setup
      ├── index.tsx     ← Home screen
      ├── explore.tsx   ← Explore screen
      └── profile.tsx   ← Profile screen
```

---

# Where Do We Create Custom Tabs?

Inside:

```
app/(tabs)/_layout.tsx
```

Because `_layout.tsx` controls navigation/layout for all screens inside `(tabs)` folder.

---

# Full Example

## File: `app/(tabs)/_layout.tsx`

```tsx
import { Tabs } from "expo-router";
import {
  View,
  TouchableOpacity,
  Text,
} from "react-native";

function MyTabBar({
  state,
  descriptors,
  navigation,
}) {
  return (
    <View
      style={{
        flexDirection: "row",
        padding: 10,
      }}
    >
      {state.routes.map((route, index) => {

        // Check active tab
        const isFocused =
          state.index === index;

        // Get screen options
        const { options } =
          descriptors[route.key];

        return (
          <TouchableOpacity
            key={route.key}

            // Navigate screen
            onPress={() =>
              navigation.navigate(route.name)
            }

            style={{
              flex: 1,
              alignItems: "center",
            }}
          >
            <Text
              style={{
                color: isFocused
                  ? "blue"
                  : "gray",
              }}
            >
              {options.title}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

export default function Layout() {
  return (
    <Tabs
      tabBar={(props) => (
        <MyTabBar {...props} />
      )}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
        }}
      />

      <Tabs.Screen
        name="explore"
        options={{
          title: "Explore",
        }}
      />

      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
        }}
      />
    </Tabs>
  );
}
```

---

# Understanding the 3 Important Props

---

# 1. state

## Purpose

Tells:

- all available tabs
- current active tab

---

## Used Inside

```tsx
state.routes
```

Gets all screens.

---

## Example

```tsx
state.routes.map((route) => {})
```

Loops through:

```
Home
Explore
Profile
```

---

## Active Tab

```tsx
state.index
```

Example:

```
0 = Home Active
1 = Explore Active
2 = Profile Active
```

---

## Used Here

```tsx
const isFocused =
  state.index === index;
```

Used for:

- active color
- active icon
- animations
- indicators

---

# 2. descriptors

## Purpose

Contains screen options.

Like:

- title
- headerShown
- tabBarIcon

---

# Comes From

```tsx
<Tabs.Screen
  name="profile"
  options={{
    title: "Profile"
  }}
/>
```

---

# Accessing It

```tsx
const { options } =
  descriptors[route.key];
```

---

# Using It

```tsx
options.title
```

Output:

```
Profile
```

---

# 3. navigation

## Purpose

Move between screens/tabs.

---

# Most Used Function

```tsx
navigation.navigate()
```

---

# Example

```tsx
navigation.navigate("profile")
```

Moves to:

```
app/(tabs)/profile.tsx
```

---

# Flow Understanding

```
state.routes
   ↓
Get all tabs

state.index
   ↓
Find active tab

descriptors
   ↓
Get title/options

navigation.navigate()
   ↓
Move screen
```

---

# Which File Does What?

| File | Purpose |
| --- | --- |
| `app/(tabs)/_layout.tsx` | Navigation setup |
| `app/(tabs)/index.tsx` | Home screen |
| `app/(tabs)/explore.tsx` | Explore screen |
| `app/(tabs)/profile.tsx` | Profile screen |

---

# Important Thing to Understand

This:

```tsx
<Tabs.Screen name="profile" />
```

connects to:

```
app/(tabs)/profile.tsx
```

Automatically.

That is how Expo Router works. (docs.expo.dev)

## Combined `_layout.tsx` — All Three in One File

Swap the `TAB_TYPE` constant to switch between all three implementations.

```tsx
// app/(tabs)/_layout.tsx
import { Tabs } from 'expo-router';
import { NativeTabs } from 'expo-router/unstable-native-tabs';
import { Icon } from 'expo-router';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

// ── Switch here ───────────────────────────────────────────────
type TabType = 'js' | 'native' | 'custom';
const TAB_TYPE: TabType = 'js'; // 👈 change to 'native' or 'custom'
// ─────────────────────────────────────────────────────────────

// Shared config
const TABS = [
  { name: 'index',   title: 'Home',    jsIcon: 'home',    sf: 'house',  md: 'home'   },
  { name: 'explore', title: 'Explore', jsIcon: 'compass', sf: 'safari', md: 'explore'},
  { name: 'profile', title: 'Profile', jsIcon: 'person',  sf: 'person', md: 'person' },
] as const;

// ── JS Tabs ───────────────────────────────────────────────────
function JSTabsLayout() {
  return (
    <Tabs screenOptions={{ headerShown: false }}>
      {TABS.map(({ name, title, jsIcon }) => (
        <Tabs.Screen
          key={name}
          name={name}
          options={{
            title,
            tabBarIcon: ({ color }) => (
              <Ionicons name={jsIcon} size={24} color={color} />
            ),
          }}
        />
      ))}
    </Tabs>
  );
}

// ── Native Tabs ───────────────────────────────────────────────
function NativeTabsLayout() {
  return (
    <NativeTabs tintColor="#6366f1" backgroundColor="#ffffff">
      {TABS.map(({ name, title, sf, md }) => (
        <NativeTabs.Trigger key={name} name={name}>
          <NativeTabs.Trigger.Icon>
            <Icon sf={sf} md={md} />
          </NativeTabs.Trigger.Icon>
          <NativeTabs.Trigger.Label>{title}</NativeTabs.Trigger.Label>
        </NativeTabs.Trigger>
      ))}
    </NativeTabs>
  );
}

// ── Custom Tab Bar ────────────────────────────────────────────
function MyTabBar({ state, descriptors, navigation }) {
  return (
    <View style={styles.tabBar}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const isFocused = state.index === index;
        const iconName = TABS[index]?.jsIcon ?? 'ellipse';

        return (
          <TouchableOpacity
            key={route.key}
            onPress={() => navigation.navigate(route.name)}
            style={styles.tab}
          >
            <Ionicons
              name={iconName}
              size={24}
              color={isFocused ? '#6366f1' : '#9ca3af'}
            />
            <Text style={[styles.label, isFocused && styles.labelActive]}>
              {options.title ?? route.name}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

function CustomTabsLayout() {
  return (
    <Tabs
      tabBar={(props) => <MyTabBar {...props} />}
      screenOptions={{ headerShown: false }}
    >
      {TABS.map(({ name, title }) => (
        <Tabs.Screen key={name} name={name} options={{ title }} />
      ))}
    </Tabs>
  );
}

// ── Entry point ───────────────────────────────────────────────
export default function Layout() {
  if (TAB_TYPE === 'native') return <NativeTabsLayout />;
  if (TAB_TYPE === 'custom') return <CustomTabsLayout />;
  return <JSTabsLayout />;
}

// ── Styles ────────────────────────────────────────────────────
const styles = StyleSheet.create({
  tabBar: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
    paddingTop: 10,
    paddingBottom: 28,
  },
  tab:         { flex: 1, alignItems: 'center', gap: 4 },
  label:       { fontSize: 11, color: '#9ca3af' },
  labelActive: { color: '#6366f1', fontWeight: '600' },
});
```

### Screen files

```tsx
// app/(tabs)/index.tsx
import { View, Text } from 'react-native';
export default function Home() {
  return <View style={{ flex:1, justifyContent:'center', alignItems:'center' }}><Text>Home</Text></View>;
}

// app/(tabs)/explore.tsx
import { View, Text } from 'react-native';
export default function Explore() {
  return <View style={{ flex:1, justifyContent:'center', alignItems:'center' }}><Text>Explore</Text></View>;
}

// app/(tabs)/profile.tsx
import { View, Text } from 'react-native';
export default function Profile() {
  return <View style={{ flex:1, justifyContent:'center', alignItems:'center' }}><Text>Profile</Text></View>;
}
```

---

## Comparison

|  | JS Tabs | Native Tabs | Custom Tabs |
| --- | --- | --- | --- |
| Import | `expo-router` | `expo-router/unstable-native-tabs` | `expo-router` |
| Component | `<Tabs>` | `<NativeTabs>` | `<Tabs tabBar={fn}>` |
| Screen decl | `<Tabs.Screen>` | `<NativeTabs.Trigger>` | `<Tabs.Screen>` |
| Performance | Good | Best (native) | Depends |
| Design control | Limited | Very limited | Total freedom |
| Status | Stable | Beta | Stable |

# Expo Router — Drawer Navigation

> **Expo SDK 55** · Expo Router v4+
> 

---

## Install Dependencies

```bash
npx expo install expo-router/drawer react-native-reanimated react-native-worklets react-native-gesture-handler
```

> Drawer requires `GestureHandlerRootView` wrapping your layout and `react-native-reanimated` for animations.
> 

---

## Folder Structure

```
app/
├── (drawer)/
│   ├── _layout.tsx     ← Drawer definition
│   ├── index.tsx       → / (Home)
│   ├── explore.tsx     → /explore
│   └── profile.tsx     → /profile
```

---

## Basic Drawer Layout

```tsx
// app/(drawer)/_layout.tsx
import { Drawer } from 'expo-router/drawer';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export default function DrawerLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Drawer>
        <Drawer.Screen
          name="index"
          options={{ drawerLabel: 'Home', title: 'Home' }}
        />
        <Drawer.Screen
          name="explore"
          options={{ drawerLabel: 'Explore', title: 'Explore' }}
        />
        <Drawer.Screen
          name="profile"
          options={{ drawerLabel: 'Profile', title: 'Profile' }}
        />
      </Drawer>
    </GestureHandlerRootView>
  );
}
```

---

## Drawer Screen Options

| Option | What it does |
| --- | --- |
| `drawerLabel` | Label shown in the drawer menu |
| `title` | Header title when screen is active |
| `drawerIcon` | Icon next to the label |
| `drawerItemStyle` | Style individual drawer items |
| `drawerActiveTintColor` | Color of the active item |
| `drawerInactiveTintColor` | Color of inactive items |
| `drawerStyle` | Style the drawer panel itself |
| `headerShown` | Show/hide the header |

---

## With Icons

```tsx
// app/(drawer)/_layout.tsx
import { Drawer } from 'expo-router/drawer';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Ionicons } from '@expo/vector-icons';

export default function DrawerLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Drawer
        screenOptions={{
          drawerActiveTintColor: '#6366f1',
          drawerInactiveTintColor: '#9ca3af',
          drawerStyle: { backgroundColor: '#fff', width: 240 },
        }}
      >
        <Drawer.Screen
          name="index"
          options={{
            drawerLabel: 'Home',
            title: 'Home',
            drawerIcon: ({ color }) => (
              <Ionicons name="home-outline" size={20} color={color} />
            ),
          }}
        />
        <Drawer.Screen
          name="explore"
          options={{
            drawerLabel: 'Explore',
            title: 'Explore',
            drawerIcon: ({ color }) => (
              <Ionicons name="compass-outline" size={20} color={color} />
            ),
          }}
        />
        <Drawer.Screen
          name="profile"
          options={{
            drawerLabel: 'Profile',
            title: 'Profile',
            drawerIcon: ({ color }) => (
              <Ionicons name="person-outline" size={20} color={color} />
            ),
          }}
        />
      </Drawer>
    </GestureHandlerRootView>
  );
}
```

---

## Opening the Drawer Programmatically

```tsx
// From inside any screen
import { useNavigation } from 'expo-router';
import { DrawerActions } from '@react-navigation/native';

export default function HomeScreen() {
  const navigation = useNavigation();

  return (
    <Button
      title="Open Drawer"
      onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}
    />
  );
}
```

Or use the built-in toggle button in the header:

```tsx
import { DrawerToggleButton } from '@react-navigation/drawer';

// Inside a screen
<Stack.Screen options={{ headerRight: () => <DrawerToggleButton /> }} />
```

---

## Custom Drawer Content

Replace the entire drawer panel with your own component using `drawerContent`:

```tsx
import { Drawer } from 'expo-router/drawer';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
import { View, Text } from 'react-native';

function CustomDrawer(props) {
  return (
    <DrawerContentScrollView {...props}>
      {/* Header section */}
      <View style={{ padding: 16, borderBottomWidth: 1, borderBottomColor: '#e5e7eb' }}>
        <Text style={{ fontWeight: 'bold', fontSize: 18 }}>My App</Text>
      </View>

      {/* Default route items */}
      <DrawerItemList {...props} />

      {/* Extra custom item */}
      <DrawerItem
        label="Logout"
        onPress={() => console.log('logout')}
      />
    </DrawerContentScrollView>
  );
}

export default function DrawerLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Drawer drawerContent={(props) => <CustomDrawer {...props} />}>
        <Drawer.Screen name="index"   options={{ drawerLabel: 'Home' }} />
        <Drawer.Screen name="explore" options={{ drawerLabel: 'Explore' }} />
        <Drawer.Screen name="profile" options={{ drawerLabel: 'Profile' }} />
      </Drawer>
    </GestureHandlerRootView>
  );
}
```

---

## Hiding a Screen from the Drawer

A screen in the drawer directory shows up in the menu automatically. To hide it (e.g. a dynamic route):

```tsx
<Drawer.Screen
  name="[id]"
  options={{ drawerItemStyle: { display: 'none' } }}
/>
```

The route is still navigable — it just won't appear in the drawer menu.

---

## Summary

| Concept | Detail |
| --- | --- |
| Import | `expo-router/drawer` |
| Required wrapper | `<GestureHandlerRootView style={{ flex: 1 }}>` |
| Screen label | `drawerLabel` option |
| Toggle programmatically | `DrawerActions.toggleDrawer()` via `useNavigation()` |
| Custom drawer panel | `drawerContent` prop on `<Drawer>` |
| Hide from menu | `drawerItemStyle: { display: 'none' }` |

# Expo — App Icons

> **Expo SDK 55**
> 

---

## Requirements

| Rule | Detail |
| --- | --- |
| Format | `.png` only |
| Size | `1024x1024` px exactly |
| Shape | Perfectly square — no rounded corners, no transparent pixels |
| Masking | OS applies rounding automatically — don't pre-round it |

> EAS Build generates all required sizes from your single 1024x1024 file.
> 

---

## Basic Icon (`app.json`)

One icon for all platforms:

```json
{
  "expo": {
    "icon": "./assets/images/icon.png"
  }
}
```

---

## iOS Icons

### Simple (single image)

```json
{
  "expo": {
    "ios": {
      "icon": "./assets/images/icon.png"
    }
  }
}
```

### With Dark & Tinted variants (SDK 54+)

iOS 18 supports three icon appearances:

```json
{
  "expo": {
    "ios": {
      "icon": {
        "any": "./assets/images/icon.png",
        "dark": "./assets/images/icon-dark.png",
        "tinted": "./assets/images/icon-tinted.png"
      }
    }
  }
}
```

| Key | When shown |
| --- | --- |
| `any` | Light mode (default) |
| `dark` | Dark mode |
| `tinted` | Monochrome tint — iOS 18+ |

> `ios.icon` overrides the top-level `icon` key when specified.
> 

---

## Android Icons

### Simple

```json
{
  "expo": {
    "android": {
      "icon": "./assets/images/icon.png"
    }
  }
}
```

### Adaptive Icon (recommended)

Android uses two layers — foreground image + background. The OS masks them into different shapes (circle, squircle, etc.) depending on the device launcher.

```json
{
  "expo": {
    "android": {
      "adaptiveIcon": {
        "foregroundImage": "./assets/images/adaptive-icon.png",
        "backgroundColor": "#ffffff"
      }
    }
  }
}
```

You can also use an image as the background instead of a color:

```json
{
  "expo": {
    "android": {
      "adaptiveIcon": {
        "foregroundImage": "./assets/images/adaptive-icon.png",
        "backgroundImage": "./assets/images/adaptive-icon-bg.png"
      }
    }
  }
}
```

> `adaptiveIcon` overrides `android.icon` when both are set.
> 

### Themed Icon (Android 13+)

Android 13+ supports a themed icon that adapts to the device wallpaper colors:

```json
{
  "expo": {
    "android": {
      "adaptiveIcon": {
        "foregroundImage": "./assets/images/adaptive-icon.png",
        "backgroundColor": "#ffffff",
        "monochromeImage": "./assets/images/adaptive-icon-monochrome.png"
      }
    }
  }
}
```

---

## Full Example (`app.json`)

```json
{
  "expo": {
    "icon": "./assets/images/icon.png",

    "ios": {
      "icon": {
        "any": "./assets/images/icon.png",
        "dark": "./assets/images/icon-dark.png",
        "tinted": "./assets/images/icon-tinted.png"
      }
    },

    "android": {
      "adaptiveIcon": {
        "foregroundImage": "./assets/images/adaptive-icon.png",
        "backgroundColor": "#ffffff",
        "monochromeImage": "./assets/images/adaptive-icon-monochrome.png"
      }
    }
  }
}
```

---

## Asset Checklist

```
assets/images/
├── icon.png                        ← Universal (1024x1024)
├── icon-dark.png                   ← iOS dark mode
├── icon-tinted.png                 ← iOS tinted/monochrome
├── adaptive-icon.png               ← Android foreground layer
└── adaptive-icon-monochrome.png    ← Android themed icon (Android 13+)
```

---

## Key Rules to Remember

- Icons are **native config** — changes require a new build, they don't hot reload
- Cannot be tested in **Expo Go** — you need a real build
- The top-level `icon` is the universal fallback; platform-specific keys override it
- For Android, always prefer `adaptiveIcon` over `android.icon`
- For iOS, always let the **OS handle rounding** — submit a square icon