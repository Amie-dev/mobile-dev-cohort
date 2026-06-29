# Background Tasks — Notes (Expo SDK 55)

## What is it?

A background task is a **deferrable unit of work that runs outside your app's normal lifecycle** — i.e. when the app is backgrounded or not actively open. The OS decides the best time to run it to save battery and data. In Expo this is `expo-background-task`, which uses:

- **Android** → `WorkManager`
- **iOS** → `BGTaskScheduler`
- Both run your JavaScript through `expo-task-manager` (the engine that actually invokes your JS function "headlessly").

"Headless" = the OS boots your JS engine, runs the task function with **no UI mounted**, then shuts the app back down.

## Why do we need it?

Apps need to do work even when the user isn't looking:

- Keep data fresh so the app opens with up-to-date content (no spinner on launch).
- Finish work that shouldn't block the UI.
- React to time passing rather than only to user taps.

Without background tasks, all work only happens while the app is open and foregrounded.

## Constraints to keep in mind

These are the gotchas that trip people up:

- **Not exact / not immediate.** You request a `minimumInterval`, but it's a *floor*, not a schedule. The OS runs it "sometime later" when conditions are good.
- **Android minimum interval is 15 minutes.** Anything smaller is ignored.
- **iOS is stricter & opaque.** iOS often defers tasks to quiet windows (e.g. overnight while charging) and may skip short intervals entirely. It factors in battery, network, and the user's usage patterns.
- **Conditions must be met.** Generally needs enough battery (or plugged in) and network available.
- **Killing the app stops tasks.** They resume after the app restarts. On iOS, swiping away in the app switcher fully terminates it; on Android behavior varies by vendor (see dontkillmyapp.com).
- **iOS Background Tasks API does NOT work on simulators** — physical device only.
- **Single worker.** Even if you `defineTask` multiple tasks, iOS/Android limits mean they all run through one shared worker. The **last registered** task's interval wins.
- **`defineTask` MUST be in the global scope** (module top-level), never inside a React component — otherwise it won't exist when the app is launched headlessly.
- **Keep work short.** iOS can interrupt at any time (use `addExpirationListener` to save state). Do small, resumable chunks.
- **Web is unsupported** → status is always `Restricted`.
- **Requires a dev/production build**, not Expo Go, for real background execution.

## Real-life uses

- **Data sync** — push queued offline changes / pull latest from server.
- **Content prefetch** — download news, feed, podcasts, images so they're ready on open.
- **Check for app updates** — `expo-updates` (`checkForUpdateAsync` / `fetchUpdateAsync`).
- **Cache cleanup / maintenance** — prune old files, rotate logs.
- **Periodic location logging** (via `expo-location` background updates — a related TaskManager use).
- **Health/fitness aggregation**, badge count refresh, analytics flushing.

## Important libs & methods

**`expo-task-manager`** (defines the JS that runs)

- `TaskManager.defineTask(name, fn)` — declare the task body (global scope).
- `TaskManager.isTaskRegisteredAsync(name)` — is it scheduled?
- `TaskManager.getRegisteredTasksAsync()` / `unregisterAllTasksAsync()`
- `TaskManager.isAvailableAsync()`

**`expo-background-task`** (schedules & controls)

- `BackgroundTask.registerTaskAsync(name, { minimumInterval })` — schedule it.
- `BackgroundTask.unregisterTaskAsync(name)` — cancel it.
- `BackgroundTask.getStatusAsync()` → `Available` | `Restricted`.
- `BackgroundTask.triggerTaskWorkerForTestingAsync()` — **dev-only** force run.
- `BackgroundTask.addExpirationListener(fn)` — iOS: system is about to stop you; save state.
- Return value: `BackgroundTask.BackgroundTaskResult.Success` / `.Failed`.

**Config:** add the `expo-background-task` plugin (prebuild auto-adds iOS `UIBackgroundModes: ["processing"]` and `BGTaskSchedulerPermittedIdentifiers`).

## Examples

### 

### Example 1 — Basic data sync (+ dev test)

```tsx
import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  Button,
  Alert,
  StyleSheet,
} from "react-native";

import * as BackgroundTask from "expo-background-task";
import * as TaskManager from "expo-task-manager";

const TASK_NAME = "sync-data-task";

// Shared work: the headless task AND the dev button run the EXACT same code,
// so what you see in dev is what runs in the background.
async function syncData() {
  const response = await fetch("<https://jsonplaceholder.typicode.com/posts>", {
    method: "GET",
  });

  const data = await response.json();

  console.log("Fetched", data.length, "items");

  return data.length;
}

/**
 * MUST be defined in the global scope
 * (outside of React components)
 */
TaskManager.defineTask(TASK_NAME, async () => {
  try {
    console.log("Background task started...");

    await syncData();

    return BackgroundTask.BackgroundTaskResult.Success;
  } catch (error) {
    console.log("Task Failed", error);

    return BackgroundTask.BackgroundTaskResult.Failed;
  }
});

export default function App() {
  const [registered, setRegistered] = useState(false);
  const [devResult, setDevResult] = useState(null);

  useEffect(() => {
    checkStatus();
  }, []);

  async function checkStatus() {
    const isRegistered =
      await TaskManager.isTaskRegisteredAsync(TASK_NAME);

    setRegistered(isRegistered);
  }

  async function registerTask() {
    try {
      await BackgroundTask.registerTaskAsync(TASK_NAME, {
        minimumInterval: 15, // minutes
      });

      Alert.alert("Success", "Background task registered.");

      setRegistered(true);
    } catch (error) {
      console.log(error);
      Alert.alert("Error", error.message);
    }
  }

  async function unregisterTask() {
    try {
      await BackgroundTask.unregisterTaskAsync(TASK_NAME);

      Alert.alert("Success", "Background task removed.");

      setRegistered(false);
    } catch (error) {
      console.log(error);
      Alert.alert("Error", error.message);
    }
  }

  // DEV ONLY: demo the output instantly without waiting for the OS scheduler.
  //  1) Runs the same logic in the foreground and shows the result on screen.
  //  2) Pokes the real native worker (debug builds only; physical device on iOS)
  //     so you can confirm the headless path actually fires.
  async function testInDev() {
    try {
      const count = await syncData();

      setDevResult(
        `Synced ${count} items at ${new Date().toLocaleTimeString()}`,
      );

      // No-op in production; requires the task to be registered first.
      const triggered =
        await BackgroundTask.triggerTaskWorkerForTestingAsync();

      console.log("Native worker triggered:", triggered);
    } catch (error) {
      setDevResult(`Failed: ${error.message}`);
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>
        Expo Background Task Demo
      </Text>

      <Text style={styles.status}>
        Status: {registered ? "Registered ✅" : "Not Registered ❌"}
      </Text>

      <View style={{ height: 20 }} />

      <Button
        title="Register Background Task"
        onPress={registerTask}
      />

      <View style={{ height: 20 }} />

      <Button
        title="Unregister Background Task"
        color="red"
        onPress={unregisterTask}
      />

      {__DEV__ ? (
        <>
          <View style={{ height: 20 }} />

          <Button
            title="▶ Test Task Now (dev)"
            color="#6E56CF"
            onPress={testInDev}
          />

          {devResult ? (
            <Text style={styles.devResult}>{devResult}</Text>
          ) : null}
        </>
      ) : null}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 10,
  },
  status: {
    fontSize: 18,
  },
  devResult: {
    marginTop: 16,
    fontSize: 15,
    color: "#6E56CF",
    fontWeight: "600",
  },
});
```

### Example 2 — Prefetch content (+ dev test)

```tsx
import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  Button,
  FlatList,
  StyleSheet,
  Alert,
} from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";
import * as BackgroundTask from "expo-background-task";
import * as TaskManager from "expo-task-manager";

const PREFETCH_TASK = "prefetch-feed";
const CACHE_KEY = "cached-feed";

// Shared work so the headless task and the dev button stay in sync.
async function prefetchFeed() {
  const response = await fetch(
    "<https://jsonplaceholder.typicode.com/posts>"
  );

  const feed = await response.json();

  await AsyncStorage.setItem(CACHE_KEY, JSON.stringify(feed));

  console.log("Feed Cached Successfully");

  return feed;
}

/**
 * MUST be outside React components
 */
TaskManager.defineTask(PREFETCH_TASK, async () => {
  try {
    console.log("Background Fetch Started");

    await prefetchFeed();

    return BackgroundTask.BackgroundTaskResult.Success;
  } catch (error) {
    console.log(error);

    return BackgroundTask.BackgroundTaskResult.Failed;
  }
});

export default function App() {
  const [feed, setFeed] = useState([]);
  const [registered, setRegistered] = useState(false);
  const [devResult, setDevResult] = useState(null);

  useEffect(() => {
    loadCachedFeed();
    checkTaskStatus();
  }, []);

  async function loadCachedFeed() {
    try {
      const cached = await AsyncStorage.getItem(CACHE_KEY);

      if (cached) {
        setFeed(JSON.parse(cached));
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function registerTask() {
    try {
      await BackgroundTask.registerTaskAsync(PREFETCH_TASK, {
        minimumInterval: 30,
      });

      Alert.alert("Success", "Background prefetch task registered.");

      setRegistered(true);
    } catch (error) {
      Alert.alert("Error", error.message);
    }
  }

  async function unregisterTask() {
    try {
      await BackgroundTask.unregisterTaskAsync(PREFETCH_TASK);

      Alert.alert("Removed", "Background task removed.");

      setRegistered(false);
    } catch (error) {
      Alert.alert("Error", error.message);
    }
  }

  async function checkTaskStatus() {
    const status = await TaskManager.isTaskRegisteredAsync(PREFETCH_TASK);
    setRegistered(status);
  }

  async function refreshNow() {
    try {
      const data = await prefetchFeed();

      setFeed(data);

      Alert.alert("Updated", "Latest data downloaded.");
    } catch (error) {
      Alert.alert("Error", error.message);
    }
  }

  // DEV ONLY: prefetch right now and render it, then fire the real native worker
  // so you can verify the headless prefetch path without waiting 30 minutes.
  async function testInDev() {
    try {
      const data = await prefetchFeed();

      setFeed(data);
      setDevResult(
        `Cached ${data.length} posts at ${new Date().toLocaleTimeString()}`,
      );

      const triggered =
        await BackgroundTask.triggerTaskWorkerForTestingAsync();

      console.log("Native worker triggered:", triggered);
    } catch (error) {
      setDevResult(`Failed: ${error.message}`);
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Background Feed Cache</Text>

      <Text style={styles.status}>
        Task: {registered ? "Registered ✅" : "Not Registered ❌"}
      </Text>

      <View style={styles.space} />

      <Button
        title="Register Background Task"
        onPress={registerTask}
      />

      <View style={styles.space} />

      <Button
        title="Refresh Now"
        onPress={refreshNow}
      />

      <View style={styles.space} />

      <Button
        title="Unregister Task"
        color="red"
        onPress={unregisterTask}
      />

      {__DEV__ ? (
        <>
          <View style={styles.space} />

          <Button
            title="▶ Test Task Now (dev)"
            color="#6E56CF"
            onPress={testInDev}
          />

          {devResult ? (
            <Text style={styles.devResult}>{devResult}</Text>
          ) : null}
        </>
      ) : null}

      <FlatList
        style={{ marginTop: 25 }}
        data={feed}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.heading}>{item.title}</Text>
            <Text>{item.body}</Text>
          </View>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 8,
  },
  status: {
    fontSize: 16,
    marginBottom: 10,
  },
  space: {
    height: 15,
  },
  devResult: {
    marginTop: 12,
    fontSize: 14,
    color: "#6E56CF",
    fontWeight: "600",
  },
  card: {
    backgroundColor: "#f2f2f2",
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  heading: {
    fontWeight: "bold",
    marginBottom: 5,
  },
});
```

### Example 3 — Check for an OTA update (+ dev test)

```tsx
import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  Text,
  Button,
  StyleSheet,
  Alert,
  View,
} from "react-native";

import * as BackgroundTask from "expo-background-task";
import * as TaskManager from "expo-task-manager";
import * as Updates from "expo-updates";

const UPDATE_TASK = "check-for-updates";

// Shared work so the headless task and the dev button do the same thing.
async function checkAndFetchUpdate() {
  const update = await Updates.checkForUpdateAsync();

  if (update.isAvailable) {
    console.log("New update found.");

    await Updates.fetchUpdateAsync();

    console.log("Update downloaded successfully.");

    return "downloaded";
  }

  console.log("App is already up-to-date.");

  return "up-to-date";
}

/**
 * MUST be defined globally
 */
TaskManager.defineTask(UPDATE_TASK, async () => {
  try {
    console.log("Checking for OTA updates...");

    await checkAndFetchUpdate();

    return BackgroundTask.BackgroundTaskResult.Success;
  } catch (error) {
    console.log(error);

    return BackgroundTask.BackgroundTaskResult.Failed;
  }
});

export default function App() {
  const [registered, setRegistered] = useState(false);
  const [devResult, setDevResult] = useState(null);

  useEffect(() => {
    checkStatus();
  }, []);

  async function checkStatus() {
    const status = await TaskManager.isTaskRegisteredAsync(UPDATE_TASK);
    setRegistered(status);
  }

  async function registerTask() {
    try {
      await BackgroundTask.registerTaskAsync(UPDATE_TASK, {
        minimumInterval: 60, // about once per hour
      });

      Alert.alert(
        "Success",
        "Background update checker registered."
      );

      setRegistered(true);
    } catch (error) {
      Alert.alert("Error", error.message);
    }
  }

  async function unregisterTask() {
    try {
      await BackgroundTask.unregisterTaskAsync(UPDATE_TASK);

      Alert.alert(
        "Removed",
        "Background update checker removed."
      );

      setRegistered(false);
    } catch (error) {
      Alert.alert("Error", error.message);
    }
  }

  async function checkNow() {
    try {
      const result = await checkAndFetchUpdate();

      if (result === "downloaded") {
        Alert.alert(
          "Update Downloaded",
          "Restart the app to use the latest version."
        );
      } else {
        Alert.alert("No Updates", "You're already on the latest version.");
      }
    } catch (error) {
      Alert.alert("Error", error.message);
    }
  }

  async function reloadApp() {
    try {
      await Updates.reloadAsync();
    } catch (error) {
      Alert.alert("Error", error.message);
    }
  }

  // DEV ONLY: run the OTA check immediately and show the result, then fire the
  // real native worker so you can verify the headless path without waiting.
  // Note: checkForUpdateAsync is disabled in Expo Go and in dev mode unless you
  // run a build with updates enabled; expect "up-to-date"/a no-op otherwise.
  async function testInDev() {
    try {
      const result = await checkAndFetchUpdate();

      setDevResult(
        `${result === "downloaded" ? "Update downloaded" : "Already up-to-date"} ` +
          `at ${new Date().toLocaleTimeString()}`,
      );

      const triggered =
        await BackgroundTask.triggerTaskWorkerForTestingAsync();

      console.log("Native worker triggered:", triggered);
    } catch (error) {
      setDevResult(`Failed: ${error.message}`);
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>
        Expo OTA Background Updates
      </Text>

      <Text style={styles.status}>
        Task Status: {registered ? "Registered ✅" : "Not Registered ❌"}
      </Text>

      <View style={styles.space} />

      <Button
        title="Register Background Task"
        onPress={registerTask}
      />

      <View style={styles.space} />

      <Button
        title="Check for Updates Now"
        onPress={checkNow}
      />

      <View style={styles.space} />

      <Button
        title="Apply Downloaded Update"
        onPress={reloadApp}
      />

      <View style={styles.space} />

      <Button
        title="Unregister Task"
        color="red"
        onPress={unregisterTask}
      />

      {__DEV__ ? (
        <>
          <View style={styles.space} />

          <Button
            title="▶ Test Task Now (dev)"
            color="#6E56CF"
            onPress={testInDev}
          />

          {devResult ? (
            <Text style={styles.devResult}>{devResult}</Text>
          ) : null}
        </>
      ) : null}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 10,
  },
  status: {
    fontSize: 18,
  },
  space: {
    height: 20,
  },
  devResult: {
    marginTop: 16,
    fontSize: 15,
    color: "#6E56CF",
    fontWeight: "600",
  },
});
```

### 

```tsx
import React, { useState } from "react";
import { SafeAreaView, Button, Alert, Text } from "react-native";

import * as BackgroundTask from "expo-background-task";
import * as TaskManager from "expo-task-manager";
import * as Updates from "expo-updates";

const UPDATE_TASK = "check-for-updates";

/**
 * MUST be defined outside of React components
 */
TaskManager.defineTask(UPDATE_TASK, async () => {
  try {
    console.log("Checking for OTA updates...");

    const update = await Updates.checkForUpdateAsync();

    if (update.isAvailable) {
      console.log("New update available!");

      await Updates.fetchUpdateAsync();

      console.log("Update downloaded successfully.");
    } else {
      console.log("Already running latest version.");
    }

    return BackgroundTask.BackgroundTaskResult.Success;
  } catch (error) {
    console.log(error);

    return BackgroundTask.BackgroundTaskResult.Failed;
  }
});

export default function App() {
  const [registered, setRegistered] = useState(false);

  async function registerTask() {
    try {
      await BackgroundTask.registerTaskAsync(UPDATE_TASK, {
        minimumInterval: 60,
      });

      setRegistered(true);

      Alert.alert("Success", "Background update task registered.");
    } catch (error) {
      Alert.alert("Error", error.message);
    }
  }

  async function unregisterTask() {
    try {
      await BackgroundTask.unregisterTaskAsync(UPDATE_TASK);

      setRegistered(false);

      Alert.alert("Success", "Task unregistered.");
    } catch (error) {
      Alert.alert("Error", error.message);
    }
  }

  async function triggerTask() {
    try {
      /**
       * Move the app to the background first,
       * then execute this while testing.
       */
      await BackgroundTask.triggerTaskWorkerForTestingAsync();

      Alert.alert(
        "Triggered",
        "Background worker has been triggered."
      );
    } catch (error) {
      Alert.alert("Error", error.message);
    }
  }

  async function checkNow() {
    try {
      const update = await Updates.checkForUpdateAsync();

      if (update.isAvailable) {
        await Updates.fetchUpdateAsync();

        Alert.alert(
          "Update Downloaded",
          "Restart the app to apply the update."
        );
      } else {
        Alert.alert("No Updates", "You're already on the latest version.");
      }
    } catch (error) {
      Alert.alert("Error", error.message);
    }
  }

  return (
    <SafeAreaView
      style={{
        flex: 1,
        justifyContent: "center",
        padding: 20,
        gap: 15,
      }}
    >
      <Text
        style={{
          fontSize: 22,
          fontWeight: "bold",
          textAlign: "center",
          marginBottom: 20,
        }}
      >
        Expo Background Task Testing
      </Text>

      <Text
        style={{
          textAlign: "center",
          marginBottom: 20,
        }}
      >
        Task Registered: {registered ? "✅ Yes" : "❌ No"}
      </Text>

      <Button
        title="Register Background Task"
        onPress={registerTask}
      />

      <Button
        title="Check For Update Now"
        onPress={checkNow}
      />

      <Button
        title="Trigger Worker (Testing)"
        onPress={triggerTask}
      />

      <Button
        title="Unregister Task"
        color="red"
        onPress={unregisterTask}
      />
    </SafeAreaView>
  );
}
```

## Quick mental model

`defineTask` (what to do, global scope) → `registerTaskAsync` (please run this ~every N min) → OS runs it headlessly when it feels like it → return `Success`/`Failed`. Keep it short, idempotent, and don't expect punctuality.

---

These notes are in the chat rather than a file — say the word if you'd like me to save them as a `NOTES.md` (or similar) in the repo.

---

# Deep Linking — Notes

## 1. What is `expo-linking` and what is it for?

`expo-linking` is Expo's URL toolkit. It does two jobs:

1. **Outgoing** → open URLs from your app: other apps, the phone dialer, maps, settings, websites, or *back into your own app*.
2. **Incoming** → build, parse, and listen for deep links that open *your* app and tell you which screen/data to show.

It's an extension of React Native's built-in `Linking`, with extra helpers (`createURL`, `parse`, `useLinkingURL`) that understand your app's `scheme`.

> Important distinction:
> 
> - **`expo-linking`** = open a URL in *whatever app handles it* (browser, phone, maps…) and handle links into your app.
> - **`expo-web-browser`** = open a webpage **inside your app** in an in-app browser (Chrome Custom Tabs / Safari View Controller). Covered in section 5.

Both are already installed here (`expo-linking` and `expo-web-browser` in `package.json`).

---

## 2. The APIs you'll actually use (the 90%)

### Open things (outgoing)

| API | What it does |
| --- | --- |
| `Linking.openURL(url)` | Open a URL with whatever app handles it (browser, `tel:`, `mailto:`, `maps:`, another app's scheme). Opens the **system** browser for `http(s)`. |
| `Linking.canOpenURL(url)` | Check if some installed app can handle the URL before opening. |
| `Linking.openSettings()` | Open your app's screen in the OS Settings app. |

### Build & read links (your own app)

| API | What it does |
| --- | --- |
| `Linking.createURL(path, { queryParams, scheme })` | Build a correct deep link into *your* app. Don't hand-concatenate URLs. |
| `Linking.parse(url)` | Split a URL into `{ scheme, hostname, path, queryParams }`. |
| `Linking.parseInitialURLAsync()` | `getInitialURL()` + `parse()` in one call. |
|  |  |

### Capture incoming links

| API | What it does |
| --- | --- |
| `Linking.useLinkingURL()` | **Hook** (recommended): initial URL immediately + live updates while the app is open. |
| `Linking.useURL()` | Older hook, same idea. |
| `Linking.getInitialURL()` | One-shot: the URL that cold-started the app (returns a Promise). |
| `Linking.addEventListener("url", handler)` | Listen for links that arrive while the app is already open; returns a subscription with `.remove()`. |

### Useful types

- `ParsedURL` → `{ scheme, hostname, path, queryParams }`
- `CreateURLOptions` → `{ queryParams?, scheme?, isTripleSlashed? }`
- `QueryParams` → `Record<string, string | string[] | undefined>`

---

## 3. How to open with a link (`Linking.openURL`)

`openURL` hands the URL to the OS. The OS picks the right app: a website opens in the **default system browser**, `tel:` opens the dialer, `mailto:` the mail app, etc.

```tsx
import * as Linking from "expo-linking";
import { Button, View, Alert } from "react-native";

export default function OpenLinksDemo() {
  // Safe open: check first, then open
  const open = async (url: string) => {
    const supported = await Linking.canOpenURL(url);
    if (supported) {
      await Linking.openURL(url);
    } else {
      Alert.alert("Can't open this link", url);
    }
  };

  return (
    <View style={{ padding: 24, gap: 12 }}>
      {/* Opens the SYSTEM browser (leaves your app) */}
      <Button title="Open website" onPress={() => open("<https://expo.dev>")} />

      {/* Phone dialer */}
      <Button title="Call support" onPress={() => open("tel:+919999999999")} />

      {/* Email app */}
      <Button title="Email us" onPress={() => open("<mailto:hi@example.com>?subject=Hello")} />

      {/* Maps */}
      <Button title="Open in Maps" onPress={() => open("<https://maps.google.com/?q=Mumbai>")} />

      {/* Your app's own settings page in OS settings */}
      <Button title="App settings" onPress={() => Linking.openSettings()} />
    </View>
  );
}
```

Key point: `openURL("https://…")` leaves your app and opens the **external** browser. If you want the page to open *inside* your app, use `expo-web-browser` (section 5).

---

## 4. Build a link into your own app, then read it

This is the heart of deep linking. `createURL` uses the `scheme` from your `app.json` (`expobackgroundanddeeplink`), so the result is always valid.

```tsx
import * as Linking from "expo-linking";
import { Button, Text, View } from "react-native";

export default function SelfLinkDemo() {
  // 1) BUILD a deep link into this app
  // -> expobackgroundanddeeplink://details/42?ref=notes
  const url = Linking.createURL("details/42", {
    queryParams: { ref: "notes" },
  });

  // 2) PARSE any incoming URL into pieces
  const parsed = Linking.parse(url);
  // parsed.scheme       -> "expobackgroundanddeeplink"
  // parsed.path         -> "details/42"
  // parsed.queryParams  -> { ref: "notes" }

  return (
    <View style={{ padding: 24, gap: 8 }}>
      <Text>Built link:</Text>
      <Text selectable>{url}</Text>

      <Text>Path: {parsed.path}</Text>
      <Text>ref param: {String(parsed.queryParams?.ref)}</Text>

      {/* Opening your own deep link re-enters the app at that route */}
      <Button title="Open this deep link" onPress={() => Linking.openURL(url)} />
    </View>
  );
}
```

Your existing `index.tsx` already demonstrates the `createURL` + `parse` + `useLinkingURL` trio:

```
  // Live view of the URL that launched (or re-opened) the app. Returns the
  // initial URL immediately, then updates if a new link arrives while open.
  const url = Linking.useLinkingURL();
  const parsed = url ? Linking.parse(url) : null;

  // Builds a deep link into this app using the scheme from app.json.
  // e.g. expobackgroundanddeeplink://details/42?ref=home
  const sampleLink = Linking.createURL("details/42", {
    queryParams: { ref: "home" },
  });
```

### Listening for incoming links (cold start + while open)

If you ever need to react to a link manually (analytics, custom routing), use both paths:

```tsx
import { useEffect } from "react";
import * as Linking from "expo-linking";

export default function useIncomingLinks() {
  useEffect(() => {
    // Cold start: app was launched BY the link
    Linking.getInitialURL().then((url) => {
      if (url) console.log("Launched from:", Linking.parse(url));
    });

    // Warm: link arrives while app is already open
    const sub = Linking.addEventListener("url", ({ url }) => {
      console.log("Received while open:", Linking.parse(url));
    });

    return () => sub.remove(); // always clean up
  }, []);
}
```

> In a pure Expo Router app you usually **don't** write this — Router auto-navigates to the matching file (`details/[id].tsx`). Use the manual listener only for custom side-effects.
> 

---

## 5. How to open a page *inside* your app (web browser)

For "open in browser" most people actually want an **in-app browser** (stays in your app, has a Done button). That's `expo-web-browser`, not `expo-linking`.

| API | Use it for |
| --- | --- |
| `WebBrowser.openBrowserAsync(url, opts)` | Open any webpage in an in-app browser (privacy policy, article, docs). |
| `WebBrowser.dismissBrowser()` | Programmatically close it (iOS). |
| `WebBrowser.openAuthSessionAsync(url, redirectUrl)` | **OAuth / login** flows — shares the right cookies and redirects back into your app via your scheme. |
| `WebBrowser.maybeCompleteAuthSession()` | Call on web to finish the auth popup. |

```tsx
import * as Linking from "expo-linking";
import * as WebBrowser from "expo-web-browser";
import { useState } from "react";
import { Button, Text, View } from "react-native";

export default function InAppBrowserDemo() {
  const [result, setResult] = useState<WebBrowser.WebBrowserResult | null>(null);

  const openInApp = async () => {
    const res = await WebBrowser.openBrowserAsync("https://expo.dev", {
      toolbarColor: "#208AEF",
      controlsColor: "#FFFFFF",
      enableBarCollapsing: true,
    });
    setResult(res);
  };

  const openMail = async () => {
    const url =
      "mailto:hello@example.com?subject=Hello&body=Sent%20from%20my%20app";
    const canOpen = await Linking.canOpenURL(url);
    if (canOpen) {
      await Linking.openURL(url);
    } else {
      // No mail client configured (common on simulators/emulators)
      console.warn("No email client available");
    }
  };

  return (
    <View style={{ padding: 24, gap: 12 }}>
      <Button title="Open page in-app" onPress={openInApp} />
      <Button title="Open mail" onPress={openMail} />
      <Text>{result ? JSON.stringify(result) : "Not opened yet"}</Text>
    </View>
  );
}
```

### Login example (web browser → deep link back into app)

```tsx
import * as WebBrowser from "expo-web-browser";
import * as Linking from "expo-linking";

export async function signIn() {
  // Where the auth server should send the user back to (your app)
  const redirectUrl = Linking.createURL("auth/callback"); // expobackgroundanddeeplink://auth/callback

  const result = await WebBrowser.openAuthSessionAsync(
    `https://auth.example.com/login?redirect_uri=${encodeURIComponent(redirectUrl)}`,
    redirectUrl
  );

  if (result.type === "success") {
    // result.url is the redirect, e.g. expobackgroundanddeeplink://auth/callback?token=abc
    const { queryParams } = Linking.parse(result.url);
    return queryParams?.token as string | undefined;
  }
  return undefined; // user cancelled
}
```

---

## 6. `openURL` vs `openBrowserAsync` — which one?

| You want to… | Use |
| --- | --- |
| Leave the app, open the **system** browser | `Linking.openURL("https://…")` |
| Open a phone number, email, maps, another app | `Linking.openURL("tel:…" / "mailto:…")` |
| Keep the user **inside your app**, show a webpage | `WebBrowser.openBrowserAsync(url)` |
| Do **OAuth / login** with a redirect back into the app | `WebBrowser.openAuthSessionAsync(url, redirectUrl)` |
| Build a link **into your own app** | `Linking.createURL(path, { queryParams })` |
| Read which link opened the app | `Linking.useLinkingURL()` / `getInitialURL()` |
| Inspect a URL's parts | `Linking.parse(url)` |

---

## 7. Things to keep in mind

1. **Always `createURL`, never string-concat** your own deep links — it injects the correct scheme/encoding.
2. **`canOpenURL` before `openURL`** for non-http schemes (`tel:`, custom app schemes), so you can show a fallback. On iOS, custom schemes you check must be listed in `LSApplicationQueriesSchemes`.
3. **`openURL` rejects** if no app can handle the URL — wrap in `try/catch`.
4. **Clean up listeners**: `addEventListener` returns a subscription — call `.remove()` in your effect cleanup.
5. **Two launch states**: cold start (`getInitialURL`) and foreground (`addEventListener`). `useLinkingURL()` handles both for you.
6. **Auth redirects need a real build** — `createURL` is only stable in dev/production builds, not Expo Go. This project has `expo-dev-client`, so you're fine.
7. **For login, prefer `openAuthSessionAsync`**, not `openBrowserAsync` — only the auth session shares cookies correctly and handles the redirect back.

---

### TL;DR

- `expo-linking` = open URLs (`openURL`) + build/parse/listen for deep links (`createURL`, `parse`, `useLinkingURL`, `getInitialURL`, `addEventListener`).
- `openURL` → **external/system** browser or other apps. `expo-web-browser`'s `openBrowserAsync` → **in-app** browser. `openAuthSessionAsync` → login flows.
- Build links with `createURL`, read them with `parse`/`useLinkingURL`, and remember to handle both cold-start and foreground links.