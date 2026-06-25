# Push Notifications Setup in Expo (Complete Production Guide)

📅 Week 08 – Push Notifications Deep Dive

Based on Expo Documentation:

* [Expo Push Notifications Setup Guide](https://docs.expo.dev/push-notifications/push-notifications-setup/?utm_source=chatgpt.com)
* [Expo FCM Credentials Guide](https://docs.expo.dev/push-notifications/fcm-credentials/?utm_source=chatgpt.com)

---

# 1. What is a Push Notification?

A Push Notification is a notification sent from a remote server to a user's device.

Unlike Local Notifications:

```text
Local Notification
Device → Device
```

Push Notifications:

```text
Server
  ↓
Expo Push Service
  ↓
FCM / APNs
  ↓
User Device
```

---

# Examples of Push Notifications

## WhatsApp

```text
John:
Where are you?
```

---

## Instagram

```text
Someone liked your post
```

---

## YouTube

```text
New video uploaded
```

---

## Food Delivery

```text
Your order is arriving soon
```

---

# 2. Push Notification Architecture

## Complete Flow

```text
User Opens App
       ↓
Gets Expo Push Token
       ↓
Token Saved in Database
       ↓
Server Sends Notification
       ↓
Expo Push Service
       ↓
FCM (Android)
APNs (iOS)
       ↓
Device Receives Notification
```

---

# Main Components

## Client App

React Native App

Responsible for:

* Permission
* Getting Token
* Receiving Notifications

---

## Expo Push Service

Receives notification request from your server.

Converts notification to:

```text
Android → FCM
iOS → APNs
```

---

## FCM

Firebase Cloud Messaging

Used for Android.

---

## APNs

Apple Push Notification Service

Used for iOS.

---

## Backend Server

Node.js

Laravel

Spring Boot

Django

etc.

Responsible for:

```text
Who receives?
When?
What message?
```

---

# 3. Prerequisites

Before starting:

---

## Install EAS CLI

```bash
npm install -g eas-cli
```

Verify:

```bash
eas --version
```

---

## Login

```bash
eas login
```

---

## Create EAS Project

```bash
eas init
```

---

## Important Requirement

Push Notifications require:

✅ Physical Android Device

or

✅ Physical iPhone

Expo recommends testing on physical devices. ([Expo Documentation][1])

---

# 4. Install Required Packages

Install:

```bash
npx expo install \
expo-notifications \
expo-constants
```

Expo Notifications:

```text
Handles permissions
Gets push token
Receives notifications
```

Expo Constants:

```text
Used to access EAS Project ID
```

([Expo Documentation][1])

---

# 5. Add Notification Plugin

app.json

```json
{
  "expo": {
    "plugins": [
      "expo-notifications"
    ]
  }
}
```

Required for native configuration. ([Expo Documentation][2])

---

# 6. Configure Notification Icon

Android Production Setup

```json
{
  "expo": {
    "notification": {
      "icon": "./assets/notification-icon.png",
      "color": "#2196F3"
    }
  }
}
```

---

## Why?

Without icon:

```text
Android may show
default notification icon
```

Bad UX.

---

# 7. Configure Notification Handler

Create once.

Usually in:

```text
App.tsx
```

or

```text
RootLayout.tsx
```

---

```javascript
import * as Notifications from "expo-notifications";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowBanner: true,
    shouldShowList: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});
```

---

# Why This Is Needed

Without handler:

Foreground notifications may not display.

---

# 8. Android Notification Channel

Android 8+ requires channels.

---

Create default channel:

```javascript
import * as Notifications from "expo-notifications";

await Notifications.setNotificationChannelAsync(
  "default",
  {
    name: "Default",
    importance:
      Notifications.AndroidImportance.MAX,
  }
);
```

---

Production Example

```javascript
await Notifications.setNotificationChannelAsync(
  "messages",
  {
    name: "Messages",
    importance:
      Notifications.AndroidImportance.MAX,
  }
);
```

---

```javascript
await Notifications.setNotificationChannelAsync(
  "marketing",
  {
    name: "Marketing",
    importance:
      Notifications.AndroidImportance.DEFAULT,
  }
);
```

---

# 9. Request Notification Permission

Before getting token.

---

Check existing:

```javascript
const settings =
  await Notifications.getPermissionsAsync();
```

---

Request permission:

```javascript
const { status } =
  await Notifications.requestPermissionsAsync();
```

---

Production Function

```javascript
async function requestPermission() {
  const { status } =
    await Notifications.requestPermissionsAsync();

  return status === "granted";
}
```

---

# Permission States

```text
granted
```

User allowed notifications.

---

```text
denied
```

User rejected.

---

```text
undetermined
```

Not decided yet.

---

# 10. Getting Expo Push Token

This is the most important step.

---

## What is Expo Push Token?

Unique identifier.

Example:

```text
ExponentPushToken[
A8Xx7S4Df2.....
]
```

Server uses this token.

---

# Get Project ID

Expo recommends using projectId. ([Expo Documentation][2])

```javascript
import Constants from "expo-constants";

const projectId =
  Constants?.expoConfig?.extra?.eas?.projectId ??
  Constants?.easConfig?.projectId;
```

---

# Generate Token

```javascript
const token =
  await Notifications.getExpoPushTokenAsync({
    projectId,
  });

console.log(token.data);
```

---

# Complete Registration Function

```javascript
import * as Notifications from "expo-notifications";
import Constants from "expo-constants";

export async function registerForPushNotifications() {

  const { status } =
    await Notifications.requestPermissionsAsync();

  if (status !== "granted") {
    throw new Error(
      "Notification permission denied"
    );
  }

  const projectId =
    Constants?.expoConfig?.extra?.eas?.projectId ??
    Constants?.easConfig?.projectId;

  const token =
    await Notifications.getExpoPushTokenAsync({
      projectId,
    });

  return token.data;
}
```

---

# Example Output

```text
ExponentPushToken[
QfD7hjL0mR8T....
]
```

Store this in database.

---

# 11. Save Token to Backend

After token generation:

```javascript
const token =
  await registerForPushNotifications();
```

---

Send to API:

```javascript
await fetch(
  "https://api.myapp.com/push-token",
  {
    method: "POST",
    headers: {
      "Content-Type":
        "application/json",
    },
    body: JSON.stringify({
      token,
    }),
  }
);
```

---

# Database Example

## Users Table

```sql
id
name
email
push_token
```

---

Example:

```sql
1
John
john@gmail.com
ExponentPushToken[abc]
```

---

# 12. Receive Notifications

When notification arrives:

```javascript
Notifications.addNotificationReceivedListener(
(notification) => {
  console.log(notification);
});
```

---

Example:

```javascript
Notifications.addNotificationReceivedListener(
(notification) => {
  alert(
    notification.request.content.title
  );
});
```

---

# 13. Handle Notification Clicks

Most important production feature.

---

```javascript
Notifications.addNotificationResponseReceivedListener(
(response) => {
  console.log(response);
});
```

---

Example

Navigate directly.

```javascript
Notifications.addNotificationResponseReceivedListener(
(response) => {
  const data =
    response.notification.request.content.data;

  navigation.navigate(
    "MessageScreen",
    {
      chatId: data.chatId,
    }
  );
});
```

---

# 14. Sending Push Notification

Usually from backend.

---

Example Request

```javascript
fetch(
  "https://exp.host/--/api/v2/push/send",
  {
    method: "POST",
    headers: {
      Accept:
        "application/json",
      "Content-Type":
        "application/json",
    },
    body: JSON.stringify({
      to: token,
      title: "Hello",
      body: "Welcome Back",
      sound: "default",
    }),
  }
);
```

---

# Example Payload

```json
{
  "to": "ExponentPushToken[xxx]",
  "title": "Workout Reminder",
  "body": "Time to exercise",
  "sound": "default"
}
```

---

# 15. Sending Custom Data

Production apps almost always include data.

---

```json
{
  "to": "ExponentPushToken[xxx]",
  "title": "New Message",
  "body": "John sent a message",
  "data": {
    "chatId": 15,
    "userId": 5
  }
}
```

---

# Why Use Data?

Without data:

```text
Open App
```

With data:

```text
Open Specific Chat
```

---

# 16. Android FCM Setup (Required)

Push notifications on Android require FCM credentials. ([Expo Documentation][3])

---

# Step 1

Open:

```text
Firebase Console
```

Create Project.

---

# Step 2

Enable:

```text
Cloud Messaging
```

---

# Step 3

Create Service Account Key.

---

Firebase

```text
Project Settings
 ↓
Service Accounts
 ↓
Generate New Private Key
```

---

Download:

```text
service-account.json
```

---

Example:

```text
my-firebase-key.json
```

---

# Step 4

Upload To Expo

Using EAS CLI.

```bash
eas credentials
```

---

Select:

```text
Android
 ↓
production
 ↓
Google Service Account
```

---

Select:

```text
Manage Google Service Account Key
```

---

Select:

```text
Upload New Service Account Key
```

Expo stores the key securely. ([Expo Documentation][3])

---

# IMPORTANT

Never commit:

```text
service-account.json
```

to GitHub.

It contains sensitive credentials. ([Expo Documentation][3])

---

Add:

```gitignore
*.json
```

or

```gitignore
firebase-service-account.json
```

---

# 17. Build Application

After credentials setup:

```bash
eas build --platform android
```

---

or

```bash
eas build --platform all
```

---

Push notifications only work after building the app with the configured credentials. ([Expo Documentation][1])

---

# 18. Test Push Notifications

Run app:

```bash
npx expo start
```

Open Development Build.

---

Get token:

```javascript
console.log(expoPushToken);
```

---

Use Expo Push Tool:

```text
Paste Token
Add Title
Add Body
Send
```

You should receive notification on device. ([Expo Documentation][1])

---

# Production Folder Structure

```text
src
 ├── services
 │    └── notifications.ts
 │
 ├── hooks
 │    └── useNotifications.ts
 │
 ├── providers
 │    └── NotificationProvider.tsx
 │
 └── screens
```

---

# Common Interview Questions

### Difference Between Local and Push Notification?

Local:

```text
Created by Device
```

Push:

```text
Created by Server
```

---

### Why Need Expo Push Token?

To uniquely identify a device for notification delivery.

---

### Why Need FCM?

Android devices receive push notifications through Firebase Cloud Messaging.

---

### Why Store Push Token?

Backend uses it to send notifications later.

---

### Why Use Notification Data?

Allows deep linking into specific screens when user taps notification.

---

# Production Push Notification Checklist

✅ Install `expo-notifications`

✅ Add notification plugin

✅ Configure notification handler

✅ Create Android channels

✅ Request permission

✅ Get Expo Push Token

✅ Save token to database

✅ Configure Firebase FCM

✅ Upload FCM Service Account Key

✅ Build with EAS

✅ Test on real device

✅ Handle notification received

✅ Handle notification click

✅ Send notification from backend

✅ Include custom data payload

✅ Production-ready Android push notification setup using Expo + EAS + FCM.

[1]: https://docs.expo.dev/push-notifications/push-notifications-setup/?utm_source=chatgpt.com "Expo push notifications setup - Expo Documentation"
[2]: https://docs.expo.dev/push-notifications/push-notifications-setup?utm_source=chatgpt.com "Expo push notifications setup - Expo Documentation"
[3]: https://docs.expo.dev/push-notifications/fcm-credentials/?utm_source=chatgpt.com "Obtain Google Service Account Keys using FCM V1 - Expo Documentation"
