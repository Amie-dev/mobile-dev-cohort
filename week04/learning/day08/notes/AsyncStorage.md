# 💾 Complete AsyncStorage Notes

# React Native / Expo

---

# 📖 What is AsyncStorage?

AsyncStorage is a local storage system for React Native applications.

It allows apps to store data permanently inside the device using a simple:

```txt
key → value
```

structure.

---

# 🧠 Simple Definition

AsyncStorage = local device memory for storing small app data.

It works similarly to:

* LocalStorage in web
* SharedPreferences in Android
* NSUserDefaults in iOS

---

# 🚀 Why AsyncStorage is Important?

Mobile apps need persistent data.

Without storage:

❌ User logs out after app restart
❌ Theme resets
❌ Settings disappear
❌ Offline data cannot exist

AsyncStorage solves this.

---

# ✅ Common Use Cases

| Feature           | Example                 |
| ----------------- | ----------------------- |
| Theme storage     | Dark/Light mode         |
| Login persistence | Save user session       |
| JWT token         | Temporary token storage |
| Onboarding state  | Show intro only once    |
| App settings      | Language/font size      |
| Cached API data   | Offline support         |
| Shopping cart     | Save local cart         |
| Draft data        | Unsaved forms           |

---

# 📦 Installation

## Expo

```bash
npm install @react-native-async-storage/async-storage
```

---

# 📥 Import

```js
import AsyncStorage from "@react-native-async-storage/async-storage";
```

---

# 🗂️ Storage Structure

AsyncStorage stores data as:

```txt
key → value
```

Example:

```txt
theme → dark
```

---

# ⚠️ Important Rule

AsyncStorage stores ONLY strings.

---

# ✅ Valid

```js
await AsyncStorage.setItem("theme", "dark");
```

---

# ❌ Invalid

```js
await AsyncStorage.setItem("user", {
  name: "Aminul",
});
```

Because object is NOT string.

---

# ✅ Solution

Convert object to JSON string.

```js
JSON.stringify()
```

---

# 🔥 Save Object

```js
const user = {
  name: "Aminul",
  age: 22,
};

await AsyncStorage.setItem(
  "user",
  JSON.stringify(user)
);
```

---

# 🔥 Read Object

```js
const data = await AsyncStorage.getItem("user");

const user = JSON.parse(data);

console.log(user.name);
```

---

# 📚 Core Methods

| Method       | Purpose           |
| ------------ | ----------------- |
| setItem()    | Save data         |
| getItem()    | Read data         |
| removeItem() | Remove one item   |
| clear()      | Remove everything |
| getAllKeys() | Get all keys      |

---

# 1️⃣ setItem()

Used to save data.

---

# ✅ Syntax

```js
await AsyncStorage.setItem(key, value);
```

---

# ✅ Example

```js
await AsyncStorage.setItem(
  "theme",
  "dark"
);
```

---

# 📌 Real Example

## Save Login State

```js
await AsyncStorage.setItem(
  "isLoggedIn",
  "true"
);
```

---

# 2️⃣ getItem()

Used to read stored data.

---

# ✅ Syntax

```js
const value = await AsyncStorage.getItem(key);
```

---

# ✅ Example

```js
const theme =
  await AsyncStorage.getItem("theme");

console.log(theme);
```

---

# ⚠️ Important

If key does not exist:

```js
null
```

is returned.

---

# ✅ Safe Example

```js
const token =
  await AsyncStorage.getItem("token");

if (token) {
  console.log("User logged in");
}
```

---

# 3️⃣ removeItem()

Removes one key.

---

# ✅ Example

```js
await AsyncStorage.removeItem("token");
```

---

# 📌 Real Example

## Logout User

```js
const logout = async () => {
  await AsyncStorage.removeItem("token");
};
```

---

# 4️⃣ clear()

Removes ALL AsyncStorage data.

---

# ⚠️ Dangerous

This deletes everything.

---

# ✅ Example

```js
await AsyncStorage.clear();
```

---

# 📌 Use Cases

* App reset
* Debugging
* Full logout

---

# 5️⃣ getAllKeys()

Returns all stored keys.

---

# ✅ Example

```js
const keys =
  await AsyncStorage.getAllKeys();

console.log(keys);
```

---

# 🔥 Multi Methods

AsyncStorage also supports batch operations.

---

# 📚 Multi Methods

| Method        | Purpose               |
| ------------- | --------------------- |
| multiSet()    | Save multiple items   |
| multiGet()    | Read multiple items   |
| multiRemove() | Remove multiple items |

---

# 6️⃣ multiSet()

Store multiple values at once.

---

# ✅ Example

```js
await AsyncStorage.multiSet([
  ["theme", "dark"],
  ["language", "en"],
]);
```

---

# 7️⃣ multiGet()

Read multiple values.

---

# ✅ Example

```js
const values =
  await AsyncStorage.multiGet([
    "theme",
    "language",
  ]);

console.log(values);
```

---

# 8️⃣ multiRemove()

Delete multiple keys.

---

# ✅ Example

```js
await AsyncStorage.multiRemove([
  "theme",
  "language",
]);
```

---

# 🔥 Real App Examples

---

# 🌙 Theme Persistence

## Save Theme

```js
await AsyncStorage.setItem(
  "theme",
  "dark"
);
```

---

## Load Theme

```js
const savedTheme =
  await AsyncStorage.getItem("theme");
```

---

# 👤 Login Persistence

---

## Save Token

```js
await AsyncStorage.setItem(
  "token",
  token
);
```

---

## Auto Login

```js
const token =
  await AsyncStorage.getItem("token");

if (token) {
  navigation.navigate("Home");
}
```

---

# 🚀 Onboarding Screen

Show onboarding only first time.

---

## Save State

```js
await AsyncStorage.setItem(
  "onboardingDone",
  "true"
);
```

---

## Check State

```js
const status =
  await AsyncStorage.getItem(
    "onboardingDone"
  );

if (status === "true") {
  navigation.navigate("Home");
}
```

---

# ⚠️ Limitations of AsyncStorage

| Problem                 | Explanation         |
| ----------------------- | ------------------- |
| Not encrypted           | Data can be exposed |
| String-only             | Must use JSON       |
| Not ideal for huge data | Performance issue   |
| No relational queries   | Not database system |

---

# ❌ Never Store Sensitive Data

Avoid storing:

* Passwords
* Banking info
* API secrets
* Refresh tokens

inside AsyncStorage.

---

# 🔐 Why?

Because AsyncStorage is NOT secure.

---

# ✅ Use SecureStore Instead

Sensitive data should use:

```txt
expo-secure-store
```

---

# 🔥 AsyncStorage vs SecureStore

| Feature        | AsyncStorage | SecureStore |
| -------------- | ------------ | ----------- |
| Encryption     | ❌ No         | ✅ Yes       |
| Speed          | ✅ Faster     | ⚠️ Slower   |
| Large Data     | ✅ Better     | ❌ Limited   |
| Sensitive Data | ❌ Unsafe     | ✅ Safe      |

---

# ⚡ Best Practices

---

# ✅ Use try/catch

Always handle errors.

```js
try {
  await AsyncStorage.setItem(
    "theme",
    "dark"
  );
} catch (error) {
  console.log(error);
}
```

---

# ✅ Use Constants for Keys

Avoid hardcoded strings everywhere.

---

# ❌ Bad

```js
await AsyncStorage.getItem("theme");
```

---

# ✅ Good

```js
const STORAGE_KEYS = {
  THEME: "theme",
};
```

---

# ✅ Keep Storage Small

AsyncStorage is best for:

* Small data
* Settings
* Cache
* Preferences

NOT huge databases.

---

# ✅ Parse Safely

Sometimes JSON parsing fails.

```js
const data =
  await AsyncStorage.getItem("user");

const user = data
  ? JSON.parse(data)
  : null;
```

---

# 🚀 AsyncStorage Lifecycle

| Action        | Data Status    |
| ------------- | -------------- |
| App restart   | ✅ Data stays   |
| Device reboot | ✅ Data stays   |
| App uninstall | ❌ Data deleted |

---

# 🧠 Internal Working

Under the hood:

| Platform | Storage System         |
| -------- | ---------------------- |
| Android  | SharedPreferences / DB |
| iOS      | Native storage system  |

---

# 📌 AsyncStorage is Asynchronous

That’s why:

```js
await
```

is used.

It prevents UI blocking.

---

# ❌ Wrong

```js
const data = AsyncStorage.getItem("theme");
```

---

# ✅ Correct

```js
const data =
  await AsyncStorage.getItem("theme");
```

---

# 🔥 Common Beginner Mistakes

| Mistake                        | Problem            |
| ------------------------------ | ------------------ |
| Forgetting await               | Promise returned   |
| Storing objects directly       | Error              |
| Using AsyncStorage for secrets | Security risk      |
| Using too much data            | Performance issues |

---

# 📱 Real World Flow

```txt
User Action
     ↓
AsyncStorage Save
     ↓
App Restart
     ↓
Read Stored Data
     ↓
Restore App State
```

---

# 🧠 Summary

Today we learned:

✅ What AsyncStorage is
✅ Installation & setup
✅ Key-value storage system
✅ setItem()
✅ getItem()
✅ removeItem()
✅ clear()
✅ getAllKeys()
✅ Multi methods
✅ JSON handling
✅ Real-world use cases
✅ Limitations
✅ Best practices

---

# 🎯 Final Conclusion

AsyncStorage is one of the most important tools in React Native.

It helps create:

✅ Persistent apps
✅ Offline experiences
✅ Better UX
✅ Faster startup
✅ User-friendly applications

Mastering AsyncStorage is essential for building real-world React Native apps 🚀
