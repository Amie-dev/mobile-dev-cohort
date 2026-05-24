# 🚀 Week 04 — Day 08

## 📅 Date: 24-05-2026

# 💾 Data Storage & Offline Support in React Native / Expo

---

# 📖 Introduction

Mobile apps need to store data locally for:

✅ Offline support
✅ Faster performance
✅ User preferences
✅ Login persistence
✅ Caching
✅ File management

React Native / Expo provides multiple ways to store data locally.

Today’s topics:

* AsyncStorage
* SecureStore
* SQLite
* Expo File System

---

# 1️⃣ AsyncStorage

## 📦 Installation

```bash
npm install @react-native-async-storage/async-storage
```

---

# 🧠 What is AsyncStorage?

AsyncStorage is a local key-value storage system for React Native.

It stores data permanently inside the device.

---

# ✅ Common Uses

* User preferences
* Theme mode
* Login state
* Onboarding screen
* App settings
* Small cached data

---

# 🗂️ Data Format

AsyncStorage stores:

```txt
key → value
```

Example:

```txt
theme → dark
```

---

# ✅ Basic Methods

| Method       | Purpose            |
| ------------ | ------------------ |
| setItem()    | Save data          |
| getItem()    | Read data          |
| removeItem() | Remove single data |
| clear()      | Remove all data    |
| getAllKeys() | Get all keys       |

---

# ✅ Save Data

```js
await AsyncStorage.setItem("theme", "dark");
```

---

# ✅ Get Data

```js
const value = await AsyncStorage.getItem("theme");
```

---

# ✅ Remove Data

```js
await AsyncStorage.removeItem("theme");
```

---

# ✅ Clear Storage

```js
await AsyncStorage.clear();
```

---

# ✅ Get All Keys

```js
const keys = await AsyncStorage.getAllKeys();
```

---

# 🔥 Multi Storage Methods

| Method     | Purpose             |
| ---------- | ------------------- |
| multiSet() | Save multiple items |
| multiGet() | Read multiple items |

---

# ✅ Example

```js
await AsyncStorage.multiSet([
  ["theme", "dark"],
  ["language", "en"],
]);
```

---

# ⚠️ Important

AsyncStorage is:

✅ Simple
✅ Fast
❌ NOT encrypted
❌ NOT secure for sensitive data

---

# 2️⃣ SecureStore

---

# 🔐 What is SecureStore?

SecureStore is a secure storage system provided by Expo for storing sensitive data safely inside mobile apps.

---

# 📦 Installation

```bash
npx expo install expo-secure-store
```

---

# 📱 Platform Storage

| Platform | Storage System |
| -------- | -------------- |
| iOS      | Keychain       |
| Android  | Keystore       |

---

# ✅ Used For

* JWT tokens
* Access tokens
* Refresh tokens
* API secrets
* Sensitive user data
* Authentication data

---

# ✅ Save Secure Data

```js
import * as SecureStore from "expo-secure-store";

await SecureStore.setItemAsync(
  "token",
  "abc123"
);
```

---

# ✅ Read Secure Data

```js
const token =
  await SecureStore.getItemAsync("token");
```

---

# ✅ Delete Secure Data

```js
await SecureStore.deleteItemAsync("token");
```

---

# ⚠️ Limitations

SecureStore:

✅ Secure
✅ Encrypted
❌ Smaller storage size
❌ Slower than AsyncStorage
❌ Not ideal for huge data

---

# 🔥 SecureStore vs AsyncStorage

| Feature        | AsyncStorage   | SecureStore        |
| -------------- | -------------- | ------------------ |
| Encryption     | ❌ No           | ✅ Yes              |
| Speed          | ✅ Faster       | ⚠️ Slightly slower |
| Large Data     | ✅ Better       | ❌ Limited          |
| Sensitive Data | ❌ Unsafe       | ✅ Safe             |
| Use Case       | Settings/cache | Tokens/passwords   |

---

# 3️⃣ SQLite

---

# 🗄️ What is SQLite?

SQLite is a local relational database inside mobile apps.

Used for storing large structured data offline.

---

# 📦 Installation

```bash
npx expo install expo-sqlite
```

---

# ✅ Common Uses

1. Large data storage
2. Offline-first apps
3. Searching/filtering/sorting
4. Relational data handling
5. Notes apps
6. Chat apps
7. E-commerce cache systems

---

# 📂 SQLite Structure

SQLite stores data in:

* Tables
* Rows
* Columns

Like traditional SQL databases.

---

# 🔥 SQLite Data Types

| Type | Meaning         |
| ---- | --------------- |
| INT  | Integer         |
| TEXT | String/Text     |
| REAL | Decimal numbers |
| BLOB | Binary data     |
| NULL | Empty value     |

---

# ✅ Example Table

```sql
CREATE TABLE users (
  id INT,
  name TEXT,
  age INT
);
```

---

# ✅ Why SQLite?

SQLite is useful when:

* AsyncStorage becomes too limited
* App requires complex querying
* Offline support is important
* Data relationships are needed

---

# 4️⃣ Expo File System

---

# 📁 What is FileSystem?

Expo FileSystem allows apps to work with files and folders inside the device.

---

# 📦 Installation

```bash
npx expo install expo-file-system
```

---

# ✅ FileSystem Features

* Create files
* Read files
* Write files
* Copy files
* Move files
* Delete files
* Upload files
* Download files
* Folder management

---

# 📂 Core Concept

Every file has a path.

Example:

```txt
file://data/user/0/app/files/
```

---

# 🔥 File Operations

| Operation | Purpose          |
| --------- | ---------------- |
| Read      | Read file data   |
| Write     | Save file        |
| Move      | Move file        |
| Upload    | Upload to server |
| Delete    | Remove file      |

---

# 5️⃣ Sandbox System

---

# 🔐 What is Sandbox?

Mobile apps cannot access all device folders directly.

Apps work inside a protected private area called:

# 📦 Sandbox

---

# 🧠 Why Sandbox Exists?

For:

✅ Security
✅ Privacy
✅ App isolation

One app cannot access another app’s private files.

---

# 6️⃣ FileSystem Directories

---

# 📂 documentDirectory

Permanent app storage.

Used for:

* Saved documents
* User files
* Persistent app data

---

# 📂 cacheDirectory

Temporary storage.

Used for:

* Images cache
* Temporary downloads
* Fast reusable files

---

# 🔥 Difference

| Directory         | Purpose           |
| ----------------- | ----------------- |
| documentDirectory | Permanent storage |
| cacheDirectory    | Temporary storage |

---

# ⚠️ Lifecycle

| Event         | documentDirectory | cacheDirectory |
| ------------- | ----------------- | -------------- |
| App restart   | ✅ Keeps data      | ⚠️ May clear   |
| App uninstall | ❌ Deleted         | ❌ Deleted      |

---

# ✅ Example Write File

```js
import * as FileSystem from "expo-file-system";

const path =
  FileSystem.documentDirectory + "test.txt";

await FileSystem.writeAsStringAsync(
  path,
  "Hello World"
);
```

---

# ✅ Read File

```js
const data =
  await FileSystem.readAsStringAsync(path);
```

---

# 🚀 Offline Support

Offline support means app works even without internet.

Local storage helps apps:

✅ Cache data
✅ Save user progress
✅ Sync later
✅ Improve speed
✅ Reduce API calls

---

# 🔥 Real App Examples

| Feature      | Technology   |
| ------------ | ------------ |
| Theme Mode   | AsyncStorage |
| JWT Token    | SecureStore  |
| Notes App    | SQLite       |
| Image Cache  | FileSystem   |
| Offline Chat | SQLite       |
| Downloads    | FileSystem   |

---

# 🧠 Summary

Today we learned:

✅ AsyncStorage
✅ SecureStore
✅ SQLite
✅ Expo FileSystem
✅ Offline support
✅ Sandbox system
✅ Local databases
✅ Secure storage handling
✅ File handling in mobile apps

---

# 🎯 Final Conclusion

Data storage is one of the most important parts of mobile app development.

Without local storage:

❌ No offline apps
❌ No persistent login
❌ No caching
❌ No saved user data

Understanding:

✅ AsyncStorage
✅ SecureStore
✅ SQLite
✅ FileSystem

helps build powerful real-world mobile applications 🚀
