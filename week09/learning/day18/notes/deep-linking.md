# 📱 Week 09 — Deep Linking in React Native (Expo)

> **Deep Linking** allows users to open a specific screen inside your mobile application using a URL. Instead of opening the app's home screen, a deep link can take users directly to a product page, profile, chat, payment screen, or any other destination.

Deep linking is an essential feature for production mobile apps because it creates a seamless connection between websites, emails, push notifications, QR codes, and mobile applications.

---

# 📖 Table of Contents

1. What is Deep Linking?
2. Why Do We Need Deep Linking?
3. How Deep Linking Works
4. Types of Deep Links
5. Custom URL Schemes
6. Universal Links & App Links
7. Deep Linking Workflow
8. Expo Configuration
9. React Navigation Configuration
10. Handling Incoming Links
11. Opening Deep Links
12. Push Notifications + Deep Links
13. QR Codes + Deep Links
14. Authentication Flow
15. Real-World Examples
16. Advantages
17. Limitations
18. Best Practices
19. Complete Architecture
20. Summary

---

# 1. What is Deep Linking?

A **Deep Link** is a URL that opens a **specific screen inside a mobile app** instead of simply launching the application.

Example:

```text
https://shop.com/product/45
```

On a website, this opens a product page.

In a mobile app:

```text
myshop://product/45
```

opens the **Product Details** screen directly.

---

## Without Deep Linking

```text
User Clicks Link

↓

App Opens

↓

Home Screen

↓

User Searches Product

↓

Finally Opens Product
```

Many unnecessary steps.

---

## With Deep Linking

```text
User Clicks Link

↓

App Opens

↓

Product Screen

↓

Done
```

Much faster and better user experience.

---

# 2. Why Do We Need Deep Linking?

Modern apps receive users from many sources:

* Email
* SMS
* WhatsApp
* QR Codes
* Push Notifications
* Websites
* Social Media
* Ads

Deep linking allows every source to send users directly to the correct screen.

---

## Example

Food Delivery App

Email:

```text
50% OFF Pizza 🍕

Order Now
```

Clicking it opens:

```text
Food App

↓

Pizza Page
```

instead of the Home screen.

---

# Real World Examples

### Amazon

```text
amazon://product/12345
```

opens product details.

---

### Instagram

```text
instagram://user/john
```

opens John's profile.

---

### YouTube

```text
youtube://watch?v=abcd
```

opens the video.

---

### WhatsApp

```text
whatsapp://send?phone=9999999999
```

opens the chat directly.

---

# 3. How Deep Linking Works

```text
User Clicks Link
        │
        ▼
Operating System
        │
        ▼
Checks Installed Apps
        │
        ▼
Find Matching App
        │
        ▼
Launch App
        │
        ▼
Parse URL
        │
        ▼
Navigate to Screen
```

---

# Example

URL

```text
myshop://product/15
```

The app reads:

```text
product

↓

15
```

and opens

```text
ProductScreen

Product ID = 15
```

---

# 4. Types of Deep Links

There are three main types.

---

## A. Basic Deep Link (Custom Scheme)

Works only if the app is installed.

Example

```text
myapp://profile/5
```

---

## B. Universal Links (iOS)

Uses HTTPS.

Example

```text
https://myshop.com/product/10
```

If app installed:

```text
Open App
```

Otherwise

```text
Open Website
```

---

## C. Android App Links

Same idea as Universal Links.

Uses HTTPS.

```text
https://myshop.com/product/50
```

---

# Comparison

| Feature           | Custom Scheme | Universal Link | Android App Link |
| ----------------- | ------------- | -------------- | ---------------- |
| Works Without App | ❌             | ✅              | ✅                |
| Opens Website     | ❌             | ✅              | ✅                |
| Requires Domain   | ❌             | ✅              | ✅                |
| Easy Setup        | ✅             | ❌              | ❌                |

---

# 5. Custom URL Schemes

A custom scheme identifies your app.

Example

```text
myapp://
```

Think of it like

```text
https://
```

but for your application.

---

## Examples

```text
myshop://

foodapp://

habit://

chatapp://
```

---

# URL Format

```text
scheme://path/parameter
```

Example

```text
habit://task/12
```

Meaning

```text
Scheme

↓

habit

Path

↓

task

ID

↓

12
```

---

# 6. Universal Links & App Links

These use normal HTTPS URLs.

Example

```text
https://shop.com/product/22
```

If app installed

↓

Open App

Otherwise

↓

Open Website

---

Benefits

* Better SEO
* Better sharing
* Works across devices
* Seamless user experience

---

# 7. Deep Linking Workflow

```text
Website

↓

Share Link

↓

User Clicks

↓

Operating System

↓

Launch App

↓

Read URL

↓

Navigate

↓

Display Screen
```

---

# 8. Expo Configuration

Add a scheme to `app.json` or `app.config.ts`.

```json
{
  "expo": {
    "scheme": "myapp"
  }
}
```

Now URLs like:

```text
myapp://home
```

can open the app.

---

# 9. React Navigation Configuration

Configure linking.

```tsx
const linking = {
  prefixes: ["myapp://"],

  config: {
    screens: {
      Home: "home",

      Profile: "profile/:id",

      Product: "product/:productId",

      Settings: "settings",
    },
  },
};
```

Navigation container:

```tsx
import { NavigationContainer } from "@react-navigation/native";

<NavigationContainer linking={linking}>
  {/* Navigation */}
</NavigationContainer>;
```

---

# Route Parameters

URL

```text
myapp://profile/55
```

Route

```tsx
Profile: "profile/:id"
```

Read parameter

```tsx
function ProfileScreen({ route }) {
  const { id } = route.params;

  return <Text>{id}</Text>;
}
```

Output

```text
55
```

---

# 10. Handling Incoming Links

React Native provides the `Linking` API.

```tsx
import * as Linking from "expo-linking";
```

---

## Get Initial URL

If the app was opened from a link:

```tsx
const url = await Linking.getInitialURL();

console.log(url);
```

Example output

```text
myapp://profile/10
```

---

## Listen for Links While App Is Open

```tsx
useEffect(() => {
  const subscription = Linking.addEventListener(
    "url",
    ({ url }) => {
      console.log(url);
    }
  );

  return () => subscription.remove();
}, []);
```

---

# 11. Opening Deep Links

Open a screen programmatically.

```tsx
import * as Linking from "expo-linking";

await Linking.openURL("myapp://settings");
```

Open profile

```tsx
await Linking.openURL("myapp://profile/5");
```

---

# 12. Push Notifications + Deep Linking

A notification can contain navigation data.

Notification payload

```json
{
  "title": "New Message",
  "body": "John sent a message",
  "data": {
    "screen": "chat",
    "chatId": 25
  }
}
```

Workflow

```text
Notification

↓

User Taps

↓

App Opens

↓

Read Data

↓

Open Chat

↓

Chat #25
```

Example

```tsx
Notifications.addNotificationResponseReceivedListener(
  (response) => {
    const { screen, chatId } =
      response.notification.request.content.data;

    navigation.navigate(screen, { chatId });
  }
);
```

---

# 13. QR Codes + Deep Linking

QR Code

```text
myshop://product/99
```

Workflow

```text
Scan QR

↓

Open App

↓

Product

↓

Buy
```

Useful for:

* Event tickets
* Restaurant menus
* Product catalogs
* Society visitor passes
* Smart parking

---

# 14. Authentication Flow

Deep linking is commonly used after authentication.

Example:

User clicks

```text
https://myapp.com/reset-password?token=abc123
```

Workflow

```text
Email

↓

Click Link

↓

Open App

↓

Verify Token

↓

Reset Password Screen
```

Other examples:

* Email verification
* Magic links
* Invite links
* Organization invitations

---

# 15. Real-World Examples

## Food Delivery

```text
food://restaurant/22
```

Open restaurant.

---

## E-Commerce

```text
shop://product/89
```

Open product page.

---

## Banking

```text
bank://transaction/500
```

Open transaction details.

---

## Habit Tracker

```text
habit://habit/15
```

Open today's habit.

---

## Society Management (HomeCircle Example)

Guest receives a QR pass containing:

```text
homecircle://visitor/8af3b9
```

Workflow:

```text
Guard Scans QR

↓

App Opens

↓

Visitor Details

↓

Approve Entry
```

---

# 16. Advantages

* Faster navigation
* Better user experience
* Supports marketing campaigns
* Simplifies sharing
* Integrates with notifications
* Works with QR codes
* Improves onboarding
* Enables password reset and verification flows

---

# 17. Limitations

* Custom schemes require the app to be installed.
* Universal Links and App Links require domain verification.
* Incorrect routing can lead to broken navigation.
* Invalid or malformed URLs must be handled safely.
* Different platforms have slightly different configuration requirements.

---

# 18. Best Practices

✅ Use descriptive and consistent URL paths.

```text
myapp://profile/25
```

instead of

```text
myapp://p/25
```

---

✅ Validate route parameters before using them.

```tsx
if (!id) {
  navigation.navigate("Home");
}
```

---

✅ Handle unknown links gracefully.

```text
Unknown URL

↓

Open Home Screen
```

---

✅ Keep URL structures stable to avoid breaking old links.

---

✅ Combine deep linking with authentication checks for protected screens.

---

# 19. Complete Architecture

```text
             Website / Email / QR Code
                       │
                       ▼
                 Deep Link URL
                       │
                       ▼
               Operating System
                       │
         ┌─────────────┴─────────────┐
         ▼                           ▼
   App Installed?               App Not Installed
         │                           │
         ▼                           ▼
     Launch App                Open Website
         │
         ▼
    React Navigation
         │
         ▼
 Parse Route Parameters
         │
         ▼
 Navigate to Screen
         │
         ▼
 Load Data & Display UI
```

---

# 20. Summary

Deep linking enables users to open specific screens within a mobile application directly from external sources such as websites, emails, QR codes, social media, or push notifications. In Expo and React Native, this is typically achieved by configuring a **custom URL scheme** (for example, `myapp://`) or by using **Universal Links** (iOS) and **Android App Links** with HTTPS URLs.

By integrating deep links with **React Navigation**, developers can map URLs to application routes and pass parameters such as product IDs, user IDs, or chat IDs. Deep linking is widely used for authentication flows, password resets, marketing campaigns, QR code scanning, and notification-based navigation.

When implemented with proper validation, routing, and authentication checks, deep linking significantly improves user experience by reducing the number of steps required to reach important content inside an application.
