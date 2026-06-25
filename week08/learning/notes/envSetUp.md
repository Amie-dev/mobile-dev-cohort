
---

# 🚨 EAS Build Error Notes: `google-services.json is missing`

## 🎯 Problem

EAS Build fails with:

```
"google-services.json" is missing
```

Even when:

* file exists locally ✔️
* path in config is correct ✔️
* `.gitignore` is properly set ✔️

---

# 🧠 Core Concept (MOST IMPORTANT)

## 🔴 EAS Cloud Build Rule

EAS Cloud only receives:

✔ Git-tracked files
✔ EAS Environment Variables
✔ EAS File Secrets

It does NOT receive:

* local files ❌
* `.gitignore` files ❌
* `.easignore` excluded files ❌

👉 So local existence ≠ cloud availability

---

# 💥 Root Cause

This line:

```json
"googleServicesFile": "google-services.json"
```

tells Expo:

> “Find this file during cloud build”

But EAS cannot find it because:

* it is NOT uploaded to build server

---

# ❌ Common Wrong Approaches

## 1. Using `app.json` with env variables

```json
"googleServicesFile": process.env.GOOGLE_SERVICES_JSON
```

❌ Invalid — JSON cannot evaluate JS

---

## 2. Keeping file only locally

```bash
google-services.json (exists only on laptop)
```

❌ EAS never sees it

---

## 3. Relying on `.gitignore`

```gitignore
google-services.json
```

✔ hides from GitHub
❌ but also hides from EAS upload

---

# ✅ Correct Solution (BEST PRACTICE)

## 🥇 STEP 1 — Upload file to EAS (NOT GitHub)

Run:

```bash
eas env:create
```

Then choose:

* Variable name: `GOOGLE_SERVICES_JSON`
* Type: **File**
* Visibility: **Sensitive** ✔️
* Upload: `google-services.json`

---

## 🥈 STEP 2 — Switch to `app.config.js`

### ❌ Do NOT use:

* `app.json`
* `process.env` inside JSON

---

### ✅ Use this instead:

```js
export default {
  expo: {
    android: {
      googleServicesFile: process.env.GOOGLE_SERVICES_JSON,
    },
  },
};
```

---

## 🥉 STEP 3 — Rebuild

```bash
eas build --platform android --profile development
```

---

# 🧩 Why this works

During build:

1. EAS injects `GOOGLE_SERVICES_JSON`
2. It creates real `google-services.json`
3. Gradle Firebase plugin reads it
4. Build succeeds ✔️

---

# 🧠 Mental Model (VERY IMPORTANT)

Think like this:

```
LOCAL MACHINE
   ↓
EAS CLOUD BUILD (separate system)
```

EAS Cloud only sees:

| Source            | Available in build |
| ----------------- | ------------------ |
| Git repo          | ✔                  |
| EAS env variables | ✔                  |
| Local files       | ❌                  |
| .gitignore files  | ❌                  |

---

# ⚡ Quick Debug Checklist

If error appears again:

### File side

* [ ] Uploaded to EAS env ✔️
* [ ] Type = File ✔️
* [ ] Visibility = Sensitive ✔️

### Code side

* [ ] Using `app.config.js` ✔️
* [ ] No `app.json` override ✔️
* [ ] Correct key: `googleServicesFile` ✔️

### Build side

* [ ] Rebuilt after changes ✔️

---

# 🚀 One-Line Fix Summary

> Don’t rely on local files.
> Use **EAS File Environment Variable + app.config.js**.

---
