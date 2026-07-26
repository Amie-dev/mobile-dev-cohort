# 📱 App Lifecycle in React Native (Expo)

> Understanding the **App Lifecycle** is one of the most important concepts in mobile development. It helps you know **when your app is running, when it's paused, and when it returns to the foreground**. Proper lifecycle management improves performance, saves battery, prevents data loss, and provides a better user experience.

---

# 📖 Table of Contents

1. What is App Lifecycle?
2. Why is App Lifecycle Important?
3. Mobile App Lifecycle Workflow
4. App States
5. Active State
6. Background State
7. Inactive State
8. AppState API in React Native
9. Listening to App State Changes
10. Real-World Use Cases
11. Common Scenarios
12. Best Practices
13. Common Mistakes
14. Summary

---

# 1. What is App Lifecycle?

The **App Lifecycle** describes the different states an application goes through from the moment it is opened until it is closed or removed from memory.

Unlike web applications that generally run while a browser tab is open, mobile apps constantly switch between different states depending on how the user interacts with the device.

For example:

* Opening the app
* Receiving a phone call
* Locking the screen
* Pressing the Home button
* Switching to another app
* Returning to the app

Each of these actions changes the application's lifecycle state.

---

# Example Workflow

```text
User Opens App
        │
        ▼
     Active State
        │
        ▼
Presses Home Button
        │
        ▼
  Background State
        │
        ▼
Returns to App
        │
        ▼
     Active Again
```

---

# 2. Why is App Lifecycle Important?

Knowing the current state of your application allows you to make smarter decisions.

Without lifecycle management:

* Timers continue running unnecessarily.
* API requests may continue in the background.
* Unsaved user data can be lost.
* Battery drains faster.
* Network bandwidth is wasted.

With proper lifecycle management:

* Save user progress automatically.
* Pause expensive operations.
* Resume tasks when needed.
* Improve battery life.
* Create a smoother user experience.

---

# Benefits

* Better performance
* Lower battery usage
* Reduced network usage
* Automatic data saving
* Better session management
* Improved user experience

---

# 3. Mobile App Lifecycle Workflow

```text
App Installed
      │
      ▼
User Opens App
      │
      ▼
Active
      │
      ▼
User Switches Apps
      │
      ▼
Inactive
      │
      ▼
Background
      │
      ▼
User Returns
      │
      ▼
Active
```

---

# 4. App States

React Native mainly works with three lifecycle states using the `AppState` API.

## 1. Active

The application is currently visible on the screen and the user is interacting with it.

Examples:

* Reading messages
* Watching videos
* Browsing products
* Playing a game

```text
Phone Screen

┌──────────────────┐
│   Instagram      │
│                  │
│ User Scrolling   │
│                  │
└──────────────────┘

State = Active
```

---

## 2. Background

The application is still running but is no longer visible because the user has switched to another app or pressed the Home button.

Examples:

* User opens WhatsApp from your app.
* User checks email.
* User opens Camera.

```text
App Running

↓

User Presses Home

↓

App Goes Background
```

The operating system may:

* Pause JavaScript execution.
* Suspend network activity.
* Free memory if required.

---

## 3. Inactive

Inactive is a temporary transition state.

The application is neither fully active nor completely in the background.

Examples:

* Incoming phone call.
* Notification center opened.
* App switching animation.
* Lock screen appears.

```text
User Using App

↓

Incoming Call

↓

Inactive

↓

Background
```

Usually, this state lasts only a short time.

---

# Lifecycle Diagram

```text
                Open App
                   │
                   ▼
               Active
              ↙      ↘
      Incoming Call   Home Button
            │              │
            ▼              ▼
        Inactive      Background
            │              │
            └──────┬───────┘
                   ▼
              Active Again
```

---

# 5. Active State

## Characteristics

* UI is visible.
* User can interact.
* JavaScript executes normally.
* API requests work normally.
* Animations continue.
* Timers continue.

Example

```text
Food Delivery App

Browsing Restaurants

↓

Adding Items

↓

Checkout
```

Everything is running normally.

---

# 6. Background State

## Characteristics

* UI is hidden.
* User cannot interact.
* Some tasks pause.
* OS manages memory.
* Battery optimization begins.

Example

```text
Music App

↓

User Opens Maps

↓

Music Continues

↓

Player Screen Hidden
```

Some apps continue selected services, such as audio playback or location tracking, if properly configured.

---

# 7. Inactive State

Inactive is mainly a transition state.

Example

```text
Reading Article

↓

Notification Arrives

↓

Notification Panel Opens

↓

Inactive

↓

Back to Active
```

or

```text
Using App

↓

Phone Call

↓

Inactive

↓

Background
```

---

# 8. React Native AppState API

React Native provides the **AppState** module to detect lifecycle changes.

Import:

```tsx
import { AppState } from "react-native";
```

Current state:

```tsx
console.log(AppState.currentState);
```

Possible values:

```text
active

background

inactive
```

---

# 9. Listening to App State Changes

Whenever the lifecycle changes, React Native can notify your application.

```tsx
import { AppState } from "react-native";
import { useEffect } from "react";

useEffect(() => {
  const subscription = AppState.addEventListener(
    "change",
    (state) => {
      console.log("App state:", state);
    }
  );

  return () => subscription.remove();
}, []);
```

---

# How It Works

```text
App Starts
      │
      ▼
Listener Registered
      │
      ▼
User Presses Home
      │
      ▼
Background Event
      │
      ▼
Callback Executes
      │
      ▼
Your Code Runs
```

---

# Output Example

```text
App state: active

App state: inactive

App state: background

App state: active
```

---

# 10. Why is AppState Important?

## 1. Pause Timers

Imagine a quiz application.

Without AppState:

```text
Quiz Starts

↓

User Leaves App

↓

Timer Continues

↓

Time Runs Out
```

Poor user experience.

With AppState:

```tsx
if (state === "background") {
  pauseTimer();
}
```

Result:

* Timer pauses.
* Resumes when user returns.

---

## 2. Save User Data

Example:

Notes application.

```text
User Typing

↓

Background

↓

Auto Save

↓

Return

↓

Nothing Lost
```

Example:

```tsx
if (state === "background") {
  saveDraft();
}
```

---

## 3. Stop API Calls

Suppose your app polls the server every few seconds.

Without AppState:

```text
Background

↓

Still Calling API

↓

Battery Wasted
```

Better:

```tsx
if (state === "background") {
  stopPolling();
}
```

Resume later:

```tsx
if (state === "active") {
  startPolling();
}
```

---

## 4. Track User Session

Analytics systems measure:

* Session start
* Session end
* Time spent
* Screen usage

Workflow

```text
App Active

↓

Start Session

↓

Background

↓

End Session

↓

Return

↓

New Session
```

Useful for:

* Firebase Analytics
* Mixpanel
* Amplitude
* Custom analytics

---

## 5. Pause Videos

```text
Watching Video

↓

Home Button

↓

Pause Playback

↓

Return

↓

Resume
```

---

## 6. Pause Games

```text
Playing Game

↓

Phone Call

↓

Pause Game

↓

Resume
```

---

## 7. Refresh Data

When users return after a long time:

```text
Background

↓

30 Minutes Pass

↓

Return

↓

Refresh Data
```

Useful for:

* Chat
* Stock prices
* Weather
* News feeds

---

# 11. Real-World Examples

## WhatsApp

* Stops unnecessary work in the background.
* Refreshes chats when reopened.
* Receives push notifications through system services.

---

## Spotify

* Music continues.
* UI pauses.
* Player state stays synchronized.

---

## Google Maps

* Navigation continues.
* Location updates continue if enabled.
* UI restores immediately when reopened.

---

## Banking Apps

* Automatically lock after inactivity.
* Require authentication when reopened.

Workflow

```text
User Leaves

↓

5 Minutes Pass

↓

Return

↓

Ask PIN / Biometrics
```

---

# 12. Best Practices

✅ Register AppState listeners only once.

✅ Always remove listeners during cleanup.

```tsx
return () => subscription.remove();
```

✅ Pause expensive operations when the app goes to the background.

✅ Save unsaved user data before suspension.

✅ Refresh stale data when returning to the foreground.

✅ Use lifecycle events to improve performance rather than constantly running background work.

---

# 13. Common Mistakes

❌ Forgetting to remove listeners, leading to memory leaks.

❌ Continuing API polling while the app is in the background.

❌ Not saving unsaved user input.

❌ Assuming the app will always return from the background; the operating system may terminate it.

❌ Performing heavy computations inside the `AppState` change callback.

---

# 14. Summary

The **App Lifecycle** represents the different states your mobile application moves through during use. In React Native, the `AppState` API provides a simple way to monitor these changes.

The three primary states are:

* **Active** – The app is visible and fully interactive.
* **Background** – The app is no longer visible, and the operating system may suspend or limit its execution.
* **Inactive** – A temporary transition state during interruptions such as phone calls or app switching.

By responding to lifecycle changes, developers can pause timers, save user data, stop unnecessary network requests, track user sessions, refresh stale content, and optimize battery usage. Proper lifecycle management is a key part of building stable, efficient, and production-ready mobile applications.
