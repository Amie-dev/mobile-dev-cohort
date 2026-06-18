# Part 11 — Common Google Play Rejections (Avoid These)

Many first-time developers get rejected not because of code issues, but because of policy mistakes.

---

## 1. Privacy Policy Doesn't Match App Behavior

Example:

Privacy policy says:

```text
"We do not collect any data."
```

But app uses:

```text
Firebase Analytics
Crashlytics
Google Sign-In
```

Google may reject the app.

Rule:

```text
Privacy Policy
      ==
Data Safety Form
      ==
Actual App Behavior
```

All three must match.

---

## 2. Missing Privacy Policy

Common student mistake:

```text
Local app
No account
No API
```

Thinking:

```text
"I don't need a privacy policy."
```

Wrong.

Google now expects a privacy policy URL for practically every app.

---

## 3. Broken App

Examples:

```text
App crashes on startup
Blank screen
Buttons don't work
Navigation broken
```

Before release:

```bash
eas build --profile production
```

Install and test the actual release build.

Never trust only Expo Go testing.

---

## 4. Misleading Screenshots

Do NOT upload screenshots showing:

```text
Features that don't exist
Future features
Mockups not in app
```

Screenshots must represent the actual application.

---

## 5. Sensitive Permissions Without Explanation

Bad:

```json
{
  "permissions": [
    "ACCESS_FINE_LOCATION"
  ]
}
```

if the app never uses location.

Google may reject the app.

Request only permissions you actually need.

---

## 6. Copyright Violations

Do NOT use:

```text
Netflix Logo
Google Logo
Instagram Logo
Copyrighted Images
Movies
Music
```

without permission.

---

## 7. Spam / Template Apps

Examples:

```text
Calculator #1
Calculator #2
Calculator #3
```

with only color changes.

Google may remove repetitive applications.

---

## 8. Broken Reviewer Access

If your app requires login:

Provide:

```text
Username
Password
Testing Instructions
```

inside App Access.

Otherwise reviewers cannot review the app.

---

# Part 12 — Pre-Launch Testing Checklist

Before publishing:

---

## Device Testing

Test on:

```text
Small Phone
Large Phone
Tablet (if supported)
```

Examples:

```text
Android 11
Android 12
Android 13
Android 14
Android 15
```

---

## Offline Testing

Disable internet.

Verify:

```text
No crashes
Offline screens work
SQLite works
Cached data works
```

---

## Theme Testing

Check:

```text
Light Mode
Dark Mode
```

---

## Performance Testing

Verify:

```text
Fast startup
Smooth scrolling
No memory leaks
```

---

## Accessibility Testing

Check:

```text
Readable text
Touch targets
Color contrast
Screen reader support
```

---

## Production Build Testing

Always test:

```bash
eas build --profile production
```

Not just:

```text
Expo Go
Development Build
```

Production may behave differently.

---

# Part 13 — Store Optimization (ASO)

ASO = App Store Optimization

Similar to SEO for websites.

Goal:

```text
More Visibility
More Downloads
```

---

## Good App Name

Bad:

```text
Unit Converter Calculator Convert Fast Tool
```

Good:

```text
UnitFlow
```

Simple and memorable.

---

## Good Short Description

Bad:

```text
Best converter #1 converter download now!!!
```

Good:

```text
Fast offline unit converter with history and favorites.
```

---

## Screenshots Matter

Most users decide within seconds.

Use screenshots showing:

```text
Main Feature
History
Favorites
Categories
```

Keep them clean.

---

## Feature Graphic Tips

Size:

```text
1024 × 500
```

Include:

```text
App Name
Tagline
Brand Colors
```

Avoid tiny text.

---

# Part 14 — Google Play App Signing

Every Android app must be signed.

---

## Why Signing Exists

Signing proves:

```text
You own the application
Updates come from you
App wasn't modified
```

---

## Traditional Android

Developer manages:

```text
Keystore
Passwords
Signing Keys
```

Risk:

```text
Lose key
Lose app forever
```

---

## Play App Signing

Recommended.

Google stores:

```text
App Signing Key
```

Safely.

Benefits:

```text
More Secure
Key Recovery
Simpler Releases
```

---

## EAS + Play Signing

Typical workflow:

```text
EAS Build
       ↓
Upload AAB
       ↓
Google Re-signs App
       ↓
Play Store Release
```

Most Expo apps use this setup.

---

# Part 15 — Post-Release Maintenance

Publishing is not the end.

It is the beginning.

---

## Monitor Crashes

Watch:

```text
Android Vitals
Crash Reports
ANRs
```

Inside Play Console.

---

## Read Reviews

Users report:

```text
Bugs
Feature Requests
UI Problems
```

Useful feedback.

---

## Release Bug Fixes

JavaScript-only fix:

```bash
eas update --channel production
```

Fast OTA update.

---

## Release Native Features

Examples:

```bash
npx expo install expo-camera
```

```bash
npx expo install expo-notifications
```

Need:

```bash
eas build --profile production
eas submit --platform android
```

because native code changed.

---

## Keep SDK Updated

Update:

```text
Expo SDK
React Native
Libraries
```

Regularly.

Google frequently increases:

```text
Target SDK Requirements
Play Policy Requirements
Security Requirements
```

---

# Final Publishing Flow

```text
Develop App
      ↓
Development Build
      ↓
Preview Testing
      ↓
Production Build (AAB)
      ↓
Store Listing Assets
      ↓
Privacy Policy
      ↓
Data Safety Form
      ↓
Content Rating
      ↓
Internal Testing
      ↓
Closed/Open Testing
      ↓
Production Review
      ↓
Play Store Release
      ↓
Monitor Crashes & Reviews
      ↓
OTA Updates
      ↓
New Features
      ↓
New Production Build
```

# Golden Rule

JavaScript Change?

```bash
eas update
```

Native Change?

```bash
eas build
eas submit
```

Publishing is not a single step.

It is a complete lifecycle from development → testing → release → maintenance.
