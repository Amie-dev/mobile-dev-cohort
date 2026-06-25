# Expo Local Notifications — Class Notes

> Expo SDK 55 · `expo-notifications` docs
> 

---

## ⚠️ READ FIRST — How to actually run these examples

Every code block below is **just a function** (the "what to send"). A function on its
own does nothing — **something has to call it**. To run any example you need 3 pieces:

| Piece | What it does | Where it lives |
| --- | --- | --- |
| 1. `import` | loads the library | top of the file |
| 2. `setNotificationHandler` | one-time setup | module level (runs once) |
| 3. A **button** that calls the function | triggers it | inside your screen JSX |

**Minimum skeleton** (this is what wraps every snippet):

```tsx
import * as Notifications from 'expo-notifications';
import { Button, View } from 'react-native';

// (2) one-time setup
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowBanner: true,
    shouldShowList: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

// (paste any example function here)
async function example1_basic() {
  await Notifications.scheduleNotificationAsync({
    content: { title: 'Welcome!', body: 'This is your first notification.' },
    trigger: { seconds: 2 },
  });
}

export default function Screen() {
  return (
    <View style={{ padding: 40 }}>
      {/* (3) a button that calls it */}
      <Button title="Send" onPress={example1_basic} />
    </View>
  );
}
```

> So: **paste the function** in the middle, **add a `<Button onPress={...} />`** to call it.
Then tap the button and **minimize the app within ~2 seconds** to see the notification.
> 

---

## 1. What is a Notification?

A **notification** is a system message that alerts the user — even when the app is in the background or closed.

It always has two parts:

| Part | What it is | Example |
| --- | --- | --- |
| **content** | What the user sees + hidden data | `title`, `body`, `sound`, `badge`, `data` |
| **trigger** | When it fires | now, in 5s, daily at 9am, or from a server |

```tsx
Notifications.scheduleNotificationAsync({
  content: { title: 'Hi', body: 'Hello' }, // WHAT
  trigger: { seconds: 5 },                 // WHEN
});
```

---

## 2. How it works

```
Your App  ->  expo-notifications  ->  OS (iOS APNs / Android FCM)  ->  Tray  ->  User taps  ->  App opens
```

- **Foreground** (app open): YOU decide how it shows (via `setNotificationHandler`).
- **Background / Terminated**: the OS shows it automatically.

---

## 3. Types of Notifications

| Type | Source | Needs server? | Expo Go? |
| --- | --- | --- | --- |
| **Local** (in-app / scheduled) | The device itself | No | Yes ✅ |
| **Push** (remote) | A server (FCM/APNs) | Yes | No (needs dev build) |

This lesson focuses on **Local notifications**.

---

## 4. Install

```bash
npx expo install expo-notifications expo-constants
```

For iOS image attachments:

```bash
npx expo install expo-asset expo-file-system
```

---

## 5. Basic Config — `app.json`

```json
{
  "expo": {
    "plugins": [
      [
        "expo-notifications",
        {
          "icon": "./assets/images/notification-icon.png",
          "color": "#208AEF",
          "defaultChannel": "default",
          "sounds": ["./assets/sounds/notification.wav"]
        }
      ]
    ]
  }
}
```

> `icon`, `color`, and `sounds` only work in a **dev build** (`npx expo run:android`), NOT Expo Go.
> 

---

# 6. The Examples

Each function below goes in the "paste here" spot of the skeleton above
(or just open `src/app/examples.tsx` where they are already wired to buttons).

---

## Example 1 — Title + Body

**Feature:** the most basic notification.

```tsx
async function example1_basic() {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: 'Welcome!',   // 🤖🍎 bold headline
      body: 'This is your first notification.', // 🤖🍎 main text
    },
    trigger: { seconds: 2 }, // 🤖🍎
  });
}
```

| Property | Platform |
| --- | --- |
| `title` | 🤖🍎 |
| `body` | 🤖🍎 |

---

## Example 2 — Subtitle (extra line of text)

**Feature:** `subtitle` — looks different on each platform.

```tsx
async function example2_subtitle() {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: 'New message',
      subtitle: 'From Alex',  // 🍎 bold line under title | 🤖 shown as "subText"
      body: 'Are we still on for 5pm?',
    },
    trigger: { seconds: 2 },
  });
}
```

| Property | Platform | Note |
| --- | --- | --- |
| `subtitle` | 🤖🍎 | 🍎 = subtitle line · 🤖 = subText (placement varies by device) |

---

## Example 3 — Hidden data + handling the tap

**Feature:** `data` (invisible payload) + reading it when tapped.

```tsx
async function example3_data() {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: 'Tap to open profile',
      body: 'Carries hidden data.',
      data: { screen: '/profile', userId: 42 }, // 🤖🍎 not shown to user
    },
    trigger: { seconds: 2 },
  });
}

// React when the user taps the notification
Notifications.addNotificationResponseReceivedListener((response) => {
  const data = response.notification.request.content.data;
  console.log(data.screen); // "/profile"  🤖🍎
});
```

| Property | Platform |
| --- | --- |
| `data` | 🤖🍎 |

---

## Example 4 — Default sound vs silent

**Feature:** `sound`.

```tsx
// With sound
async function example4_sound() {
  await Notifications.scheduleNotificationAsync({
    content: { title: 'Ding!', body: 'Plays default sound.', sound: 'default' },
    trigger: { seconds: 2 },
  });
}

// Silent
async function example4_silent() {
  await Notifications.scheduleNotificationAsync({
    content: { title: 'Quiet', body: 'No sound.', sound: false },
    trigger: { seconds: 2 },
  });
}
```

| Value | Platform | Note |
| --- | --- | --- |
| `sound: 'default'` | 🤖🍎 | 🤖 on Android 8+ the channel controls the sound (see Example 11) |
| `sound: false` | 🤖🍎 | silent |
| `'defaultCritical'`, `'defaultRingtone'` | 🍎 | iOS only |

---

## Example 5 — App icon badge

**Feature:** `setBadgeCountAsync` + `content.badge`.

```tsx
async function example5_badge() {
  await Notifications.setBadgeCountAsync(3); // 🍎 number on home-screen icon

  await Notifications.scheduleNotificationAsync({
    content: {
      title: '3 unread',
      body: 'Check the app icon.',
      badge: 3, // 🍎
    },
    trigger: { seconds: 2 },
  });
}

async function clearBadge() {
  await Notifications.setBadgeCountAsync(0); // 🤖🍎
}
```

| Property | Platform | Note |
| --- | --- | --- |
| `badge` / `setBadgeCountAsync` | 🍎 | 🤖 depends on the launcher — many Android launchers ignore icon badges |

---

## Example 6 — Android accent color + vibration

**Feature:** `color` and `vibrate` (Android-only styling).

```tsx
async function example6_androidStyle() {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: 'Styled (Android)',
      body: 'Orange accent + custom vibration.',
      color: '#FF6B35',           // 🤖 accent color on the small icon
      vibrate: [0, 500, 200, 500], // 🤖 vibration pattern (ms)
    },
    trigger: { seconds: 2 },
  });
}
```

| Property | Platform |
| --- | --- |
| `color` | 🤖 only |
| `vibrate` | 🤖 only |

> 🍎 iOS ignores these. iOS vibration is controlled by the system/sound.
> 

---

## Example 7 — Android priority + sticky

**Feature:** `priority` (heads-up) and `sticky` (can't swipe away).

```tsx
async function example7_androidPriority() {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: 'Important (Android)',
      body: 'Pops up as a heads-up and stays put.',
      priority: Notifications.AndroidNotificationPriority.HIGH, // 🤖
      sticky: true, // 🤖 cannot be dismissed by swiping
    },
    trigger: { seconds: 2 },
  });
}
```

| Property | Platform |
| --- | --- |
| `priority` | 🤖 only |
| `sticky` | 🤖 only |

> 🍎 iOS equivalent of priority is `interruptionLevel` (see Example 9).
> 

---

## Example 8 — iOS image attachment

**Feature:** `attachments` (iOS rich media).

```tsx
import { Asset } from 'expo-asset';
import { Directory, File, Paths } from 'expo-file-system';

async function example8_iosImage() {
  // iOS needs a real local file with a proper extension
  const dir = new Directory(Paths.cache, 'attachments');
  if (!dir.exists) dir.create({ intermediates: true, idempotent: true });

  const asset = Asset.fromModule(require('./assets/images/expo-logo.png'));
  await asset.downloadAsync();

  const file = new File(dir, 'logo.png');
  if (file.exists) file.delete();
  new File(asset.localUri!).copy(file);

  await Notifications.scheduleNotificationAsync({
    content: {
      title: 'Photo (iOS)',
      body: 'Long-press / pull down to expand.',
      attachments: [{ identifier: 'logo', url: file.uri, type: 'public.png' }], // 🍎
    },
    trigger: { seconds: 2 },
  });
}
```

| Property | Platform |
| --- | --- |
| `attachments` | 🍎 only |

### "Can I add images to Android notifications?" (common question)

| What you want | Android (local) | iOS (local) |
| --- | --- | --- |
| **Big inline image** (large picture in the notification) | ❌ Not supported by `expo-notifications` | ✅ via `attachments` |
| **Small thumbnail / large icon** (image on the right side) | ⚠️ Build-time only — same image for every notification, set via config plugin | n/a |
| **Big image at runtime / per-notification** | ❌ Needs a **push notification** (FCM `imageUrl`) or a custom native module | ✅ via `attachments` |

So for **Android local notifications, you cannot attach a per-notification image.** The only
image is a build-time **large icon** (a small thumbnail), already set up in this project:

```json
// app.json
["./plugins/with-android-large-notification-icon.js", { "icon": "./assets/images/expo-logo.png" }]
```

Big images on Android come from **push notifications** (the server sends an `imageUrl`) — that's
covered in the push lesson.

---

## Example 9 — iOS interruption level

**Feature:** `interruptionLevel` (how aggressively iOS shows it).

```tsx
async function example9_iosInterruption() {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: 'Time sensitive (iOS)',
      body: 'Breaks through Focus mode.',
      interruptionLevel: 'timeSensitive', // 🍎 'passive' | 'active' | 'timeSensitive' | 'critical'
    },
    trigger: { seconds: 2 },
  });
}
```

| Property | Platform |
| --- | --- |
| `interruptionLevel` | 🍎 only |

---

## Example 10 — Action buttons (iOS categories)

**Feature:** interactive buttons via `setNotificationCategoryAsync` + `categoryIdentifier`.

```tsx
// Step 1: register the category once at startup
async function setupCategory() {
  await Notifications.setNotificationCategoryAsync('message', [
    { identifier: 'reply', buttonTitle: 'Reply' },                              // 🍎
    { identifier: 'delete', buttonTitle: 'Delete', options: { isDestructive: true } }, // 🍎
  ]);
}

// Step 2: attach it to a notification
async function example10_actions() {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: 'New message',
      body: 'Long-press to see Reply / Delete.',
      categoryIdentifier: 'message', // 🍎
    },
    trigger: { seconds: 2 },
  });
}
```

| Property | Platform |
| --- | --- |
| `categoryIdentifier` | 🍎 (action buttons) |

---

## Example 11 — Android notification channel + custom sound

**Feature:** channels (Android grouping) + custom sound on Android 8+.

```tsx
// Create the channel once (Android only — no-op on iOS)
async function setupChannel() {
  await Notifications.setNotificationChannelAsync('alerts', {
    name: 'Alerts',                                       // 🤖
    importance: Notifications.AndroidImportance.HIGH,     // 🤖 heads-up
    sound: 'notification.wav',                            // 🤖 custom sound (Android 8+)
    vibrationPattern: [0, 250, 250, 250],                 // 🤖
    lightColor: '#208AEF',                                // 🤖
  });
}

async function example11_channel() {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: 'Alert (Android channel)',
      body: 'Uses the "alerts" channel sound + importance.',
      sound: 'notification.wav', // 🤖 (Android < 8) / 🍎 also needs filename in app.json
    },
    trigger: { seconds: 2, channelId: 'alerts' }, // 🤖 channelId is Android only
  });
}
```

| Property | Platform | Note |
| --- | --- | --- |
| `setNotificationChannelAsync` | 🤖 only | iOS ignores channels |
| `trigger.channelId` | 🤖 only |  |
| custom `sound: 'file.wav'` | 🤖🍎 | must be in `app.json` → `expo-notifications.sounds` + a dev build |

---

## Example 12 — Repeating trigger

**Feature:** `trigger` types for scheduling.

```tsx
// Repeat every 60 seconds
async function example12_repeat() {
  await Notifications.scheduleNotificationAsync({
    content: { title: 'Drink water', body: 'Stay hydrated!' },
    trigger: {
      type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL,
      seconds: 60,
      repeats: true, // 🤖🍎  (🍎 requires seconds >= 60 when repeating)
    },
  });
}

// Every day at 9:00 AM
async function example12_daily() {
  await Notifications.scheduleNotificationAsync({
    content: { title: 'Good morning', body: 'Daily reminder.' },
    trigger: {
      type: Notifications.SchedulableTriggerInputTypes.DAILY, // 🤖🍎
      hour: 9,
      minute: 0,
    },
  });
}
```

| Trigger | Platform |
| --- | --- |
| `TIME_INTERVAL`, `DATE`, `DAILY`, `WEEKLY`, `MONTHLY`, `YEARLY` | 🤖🍎 |
| `repeats: true` with `TIME_INTERVAL` | 🤖🍎 (🍎 needs ≥ 60s) |
| `CALENDAR` | 🍎 only |
| `trigger.channelId` | 🤖 only |

---

## Example 13 — Cancel & dismiss

**Feature:** cleanup.

```tsx
// Cancel future scheduled notifications
await Notifications.cancelAllScheduledNotificationsAsync(); // 🤖🍎

// Remove notifications already shown in the tray
await Notifications.dismissAllNotificationsAsync(); // 🤖🍎
```

---

## Quick platform cheat sheet

| Property | 🤖 Android | 🍎 iOS |
| --- | --- | --- |
| `title`, `body`, `subtitle`, `data` | ✅ | ✅ |
| `sound` (default / false / custom) | ✅ | ✅ |
| `badge` | ⚠️ launcher | ✅ |
| `color` | ✅ | ❌ |
| `vibrate` | ✅ | ❌ |
| `priority` | ✅ | ❌ |
| `sticky` | ✅ | ❌ |
| `autoDismiss` | ✅ | ❌ |
| `attachments` (images) | ❌ | ✅ |
| `interruptionLevel` | ❌ | ✅ |
| `categoryIdentifier` (buttons) | ❌ | ✅ |
| channels / `channelId` | ✅ | ❌ |

> ⚠️ Reminder: custom **icon, sound, and large image** need a **dev build** (`npx expo run:android`) — they do **not** work in Expo Go.
> 

---

## Common mistakes (read before you panic 🙂)

| Problem | Why | Fix |
| --- | --- | --- |
| "Nothing happens when I call the function" | A function alone does nothing | Call it from a `<Button onPress={...} />` |
| "I don't see the notification" | App was in the **foreground** | Minimize the app within ~2s after tapping |
| "No permission popup" | Never asked | Call `requestPermissionsAsync()` once |
| "Custom icon/sound not showing" | Running in **Expo Go** | Use a dev build: `npx expo run:android` |
| "Android badge not showing" | Launcher doesn't support it | Normal — it's launcher-dependent |
| "iOS image not visible" | It's collapsed | **Long-press / pull down** to expand |
| "Android image not showing" | Not supported for local | Use the large icon, or push notifications |

---

## Glossary (quick definitions for students)

- **Local notification** — created and scheduled by the app on the device. No server. Works offline.
- **Push notification** — sent from a server to the device. Needs internet + credentials. (Later lesson.)
- **content** — what the notification shows (`title`, `body`, etc.) + hidden `data`.
- **trigger** — *when* it fires (`null` = now, `{ seconds: 5 }`, daily, etc.).
- **channel** (Android) — a category users can mute/customize. Required on Android 8+.
- **category** (iOS) — a set of action buttons attached to a notification.
- **badge** — the small number on the app icon.
- **dev build** — your own compiled app (`npx expo run:android`), as opposed to Expo Go.

---

## Where everything lives in this project

| File | Purpose |
| --- | --- |
| `src/app/examples.tsx` | Simple runnable screen — one button per example (route `/examples`) |
| `src/app/index.tsx` | Full "Local" tab demo UI |
| `src/app/explore.tsx` | "Learn" tab reference |
| `src/lib/notifications/setup.ts` | Handler, channels, categories, permissions |
| `src/lib/notifications/demos.ts` | Production-style demo functions |
| `app.json` | Config plugin: icon, color, sounds |

# Expo Push Notifications — Class Notes

> Expo SDK 55 · `expo-notifications` docs · Push setup · FCM credentials
> 

- 🤖 = Android · 🍎 = iOS · 🤖🍎 = both
- ⚠️ Push does **NOT** work in Expo Go. You need a **development build** (`eas build`).
- 👉 The runnable screen for this lesson is `src/app/push.tsx` (the **Push** tab / `/push` route).

---

## 1. What is a push notification?

A **push notification** is a message sent **from a server to a device**, even when the
app is closed. The app does not create it — the server does, and the phone's OS
delivers it.

|  | Local notification | Push notification |
| --- | --- | --- |
| Created by | the app, on the device | a **server**, somewhere on the internet |
| Needs internet | No | **Yes** |
| Needs credentials (FCM/APNs) | No | **Yes** |
| Works in Expo Go | Yes | **No** (needs a dev build) |
| Typical use | reminders, timers | chat messages, news, "your order shipped" |

The **content** is the same shape as local ones (`title`, `body`, `data`, `sound`,
`badge`). The only thing that changes is **who triggers it** and **how it travels**.

---

## 2. How push works under the hood 🤖🍎

Every push goes through the OS vendor's delivery service. You never connect to phones
directly — you hand the message to Google/Apple and they deliver it.

- 🤖 **Android** → **FCM** (Firebase Cloud Messaging)
- 🍎 **iOS** → **APNs** (Apple Push Notification service)

### The token

When the app starts, it asks the OS: *"give me an address for this install."* The OS
returns a **device push token** (an FCM token on Android, an APNs token on iOS). That
token is the phone's mailbox address. A server that knows the token can send it a push.

### Two ways to send

**A) Direct (the hard way):** your server talks to FCM and APNs itself — two different
APIs, two sets of credentials, two payload formats.

**B) Via Expo Push Service (what we use):** Expo gives you **one** token (an
`ExpoPushToken`) and **one** API. Expo holds your FCM/APNs credentials and translates
for you.

```
                              ┌────────────────────────── what we use ──────────────────────────┐
Your server ── ExpoPushToken ─▶ Expo Push Service ─┬─ FCM (Google) ─▶ 🤖 device ─▶ tray ─▶ user taps ─▶ app opens
   (exp.host/--/api/v2/push/send)                  └─ APNs (Apple) ─▶ 🍎 device ─▶ tray ─▶ user taps ─▶ app opens
```

### What happens on the device

| App state | Who shows it |
| --- | --- |
| **Foreground** (open) | YOU decide, via `setNotificationHandler` (same as local) |
| **Background / closed** | the OS shows it automatically; your JS isn't running |

The `data` payload is invisible to the user — you read it when the app opens to deep-link
(e.g. open a specific chat).

---

## 3. The token flow in this app

See `src/lib/notifications/push.ts` and `src/hooks/use-push-notifications.ts`.

```tsx
// 1. (Android) a channel must exist before the permission prompt can appear
await Notifications.setNotificationChannelAsync('local-default', {
  name: 'Default',
  importance: Notifications.AndroidImportance.HIGH,
});

// 2. ask permission
const { granted } = await Notifications.requestPermissionsAsync();

// 3. swap the native FCM/APNs token for an Expo push token
const projectId = Constants.expoConfig?.extra?.eas?.projectId;       // from app.json
const { data: token } = await Notifications.getExpoPushTokenAsync({ projectId });
// token looks like: ExponentPushToken[xxxxxxxxxxxxxxxxxxxxxx]
```

You send that `token` to your server and store it. That's the whole client job.

---

## 4. How to send a push using Expo tools

### a) The Expo push tool (no code) — best for testing

1. Run a dev build, open the app, copy the `ExpoPushToken` (shown on the **Push** tab).
2. Go to **https://expo.dev/notifications**.
3. Paste the token, type a title + body, **Send**.
4. Background the app → the notification arrives.

### b) cURL / any server — one HTTP POST

```bash
curl -H "Content-Type: application/json" -X POST "https://exp.host/--/api/v2/push/send" -d '{
  "to": "ExponentPushToken[xxxxxxxxxxxxxxxxxxxxxx]",
  "title": "hello",
  "body": "world",
  "sound": "default",
  "data": { "screen": "/push" }
}'
```

This is exactly what the **"Send test push"** button on the `/push` screen does (it POSTs
to the same URL). You can send up to **100 messages** in one array.

### c) Node server (recommended for real apps)

```bash
npm install expo-server-sdk
```

```tsx
import { Expo } from 'expo-server-sdk';
const expo = new Expo();

const messages = [{ to: token, sound: 'default', title: 'Hi', body: 'From my server' }];
const tickets = await expo.sendPushNotificationsAsync(messages);
```

> ⚠️ Never send pushes straight from the app in production — anyone could read the code
and spam your users. Sending is a **server** job. The button here is only a demo.
> 

### Tickets & receipts (how you know it worked)

- The send call returns a **ticket**: `{ "status": "ok", "id": "..." }`. `ok` means
*Expo received it*, NOT that the user got it.
- ~15 min later, look up the **receipt** by ticket id at
`https://exp.host/--/api/v2/push/getReceipts` to see if FCM/APNs actually delivered it.
- A receipt error of `DeviceNotRegistered` means the user uninstalled or revoked
permission → **stop sending to that token**.

---

## 5. Setup: Firebase credentials + EAS build (Android) 🤖

Android push needs **FCM**. You create a Firebase project, give EAS a **service account
key** (so Expo can talk to FCM on your behalf), and add `google-services.json` to the app.

> 🍎 **iOS** is easier: no Firebase. You just need a **paid Apple Developer account**, and
EAS generates the APNs key for you during `eas build` (answer "yes" when prompted). Skip
to section 6 for iOS.
> 

### Step-by-step (matches the checklist)

**1. Create a Firebase project**

- Go to the Firebase Console → **Add project**.

**2. Add an Android app to the Firebase project**

- In the project, **Add app → Android**.
- **Android package name** must EXACTLY match `app.json` → `android.package`:
`com.codebysuraj.exponotification`
- App nickname: anything (e.g. "Expo Notification Dev").
- **SHA-1 / signing fingerprint:** optional for push (only needed for Google Sign-In,
Dynamic Links, etc.). You can leave it blank for FCM push. If you want it, get it from
EAS credentials: `eas credentials` → Android → your keystore shows the SHA-1.

**3. Get the service account private key**

- Firebase Console → ⚙️ **Project settings → Service accounts**.
- Click **Generate new private key** → **Generate key**.
- A `.json` file downloads. **Keep it secret** (it can send pushes as you).
- ⚠️ Add it to `.gitignore` — never commit it.

**4. Make that key available to EAS (upload it)**

Easiest — **EAS CLI** (it auto-detects the json in your project root):

```bash
eas credentials
# → Android
# → production            (this is the "profile" — see note below)
# → Google Service Account
# → Manage your Google Service Account Key for Push Notifications (FCM V1)
# → Set up a Google Service Account Key ... → Upload a new service account key
# → pick the .json you downloaded
```

Or in the **dashboard**: expo.dev → your project → **Credentials → Android → (app
identifier) → Service Credentials → FCM V1 service account key → Add a service account
key → upload the json → Save**.

> About the **profile**: credentials live under the **app identifier**, and the CLI groups
them under `production`. The same FCM key is then used for dev, preview, and production
builds of that package name. So "use the production credentials" just means you upload
the key once and every build of that package can send push.
> 

**5. Add `google-services.json` to the app (public file, safe to commit)**

- Firebase Console → Project settings → **Your apps → Android → download
`google-services.json`**.
- Put it in the project root, then point `app.json` at it:

```json
{
  "expo": {
    "android": {
      "package": "com.codebysuraj.exponotification",
      "googleServicesFile": "./google-services.json"
    }
  }
}
```

> This file holds **public** identifiers (not a secret) — committing it is fine. The
**service account key** from step 3 is the secret; that one stays out of git.
> 

**6. Build a dev build and test**

```bash
eas build --profile development --platform android
# install the build on a real device, open it, copy the token from the Push tab,
# then send from https://expo.dev/notifications
```

---

## 6. iOS credentials 🍎

- Requires a **paid Apple Developer account**.
- **Register your test device** with EAS before the first build.
- Run `eas build --profile development --platform ios`. When prompted:
    - *Setup Push Notifications for your project* → **yes**
    - *Generating a new Apple Push Notifications service key* → **yes**
- EAS creates and stores the APNs key. No Firebase, no `google-services.json` needed.

---

## 7. Common mistakes

| Problem | Why | Fix |
| --- | --- | --- |
| "No token / token is null" | Running in **Expo Go** or web | Use a dev build (`eas build`) on a device |
| `getExpoPushTokenAsync` throws | Offline, or no FCM/APNs credentials | Connect to internet; upload FCM key / generate APNs key |
| Token works but no push arrives on 🤖 | Missing `google-services.json` or FCM key | Do steps 3–5 above |
| Ticket says `ok` but nothing shows | App was in **foreground**, or you only got a ticket | Background the app; check the **receipt** for the real result |
| `DeviceNotRegistered` receipt | User uninstalled / revoked permission | Delete that token from your DB |
| package name mismatch | Firebase package ≠ `android.package` | Make them identical |

---

## 8. Where everything lives in this project

| File | Purpose |
| --- | --- |
| `src/app/push.tsx` | The **Push** tab — register, show token, send a test push (route `/push`) |
| `src/hooks/use-push-notifications.ts` | React hook: register, send test, last received |
| `src/lib/notifications/push.ts` | `registerForPushNotificationsAsync()` + `sendPushNotification(message)` |
| `src/lib/notifications/push-demos.ts` | Real-world push message builders (chat, order, image, actions, …) shown on the Push tab |
| `src/lib/notifications/setup.ts` | Shared handler, channels, permission helper (used by local + push) |
| `app.json` | `expo-notifications` plugin · add `android.googleServicesFile` here |
| `eas.json` | Build profiles (development / preview / production) |