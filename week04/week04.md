# 🚀 Week 04 Notes

# Mobile Development Cohort

## React Native / Expo

---

# 📅 Week 04 Topics

This week focused on two major areas of mobile app development:

---

# 🌐 1. Networking & Backend Integrations

# 💾 2. Data Storage & Offline Support

These concepts are the foundation of real-world mobile applications.

Without them:

❌ Apps cannot fetch data
❌ No authentication
❌ No offline support
❌ No persistent storage
❌ No production-ready architecture

---

# 🌐 Part 01 — Networking & Backend Integrations

---

# 📖 What is Networking?

Networking means communication between:

```txt id="6vjlwm"
Mobile App ↔ Backend Server
```

using APIs.

---

# 🚀 Why Networking is Important?

Mobile apps need networking for:

✅ Login/signup
✅ Fetching products/posts
✅ Uploading files
✅ Payments
✅ Notifications
✅ Real-time updates

---

# 🧠 Backend Basics

Backend handles:

* Database operations
* Authentication
* APIs
* Business logic
* File storage
* Security

---

# 🏗️ Types of Backend

| Type             | Meaning                 |
| ---------------- | ----------------------- |
| Internal Backend | Backend inside Expo app |
| External Backend | Separate backend server |

---

# 🚀 Expo API Routes (Internal Backend)

Expo Router supports backend-style API routes.

---

# 📂 File Naming Convention

```txt id="kkjlwm"
filename+api.ts
```

Example:

```txt id="v9jlwm"
users+api.ts
```

---

# 📂 Example Structure

```txt id="4pjlwm"
app/
 ├── users+api.ts
 ├── login+api.ts
 └── products+api.ts
```

---

# 🔗 Generated Routes

| File         | Route  |
| ------------ | ------ |
| users+api.ts | /users |
| login+api.ts | /login |

---

# ✅ API Route Example

```ts id="8jjlwm"
export async function GET() {
  return Response.json({
    message: "Hello API",
  });
}
```

---

# 🚀 HTTP Methods

| Method | Purpose             |
| ------ | ------------------- |
| GET    | Fetch data          |
| POST   | Create data         |
| PUT    | Replace data        |
| PATCH  | Update partial data |
| DELETE | Remove data         |

---

# 🌍 External Backend

External backend means separate server.

Examples:

* Node.js + Express
* NestJS
* Django
* Laravel
* Spring Boot

---

# 📂 Architecture

```txt id="o2jlwm"
Expo App
    ↓
Backend API
    ↓
Database
```

---

# 🚀 Fetch API Example

```js id="c6jlwm"
const response = await fetch(
  "https://api.example.com/users"
);

const data = await response.json();
```

---

# 🗄️ Database Integrations

Common databases:

| Database   | Type     |
| ---------- | -------- |
| MongoDB    | NoSQL    |
| PostgreSQL | SQL      |
| MySQL      | SQL      |
| Firebase   | Cloud    |
| SQLite     | Local DB |

---

# 🔥 Combining Internal + External Backend

Hybrid architecture:

```txt id="y4jlwm"
Expo App
    ↓
Expo API Routes
    ↓
External Backend
    ↓
Database
```

---

# 📱 Why localhost Fails on Physical Devices?

---

# ❌ Problem

```txt id="8njlwm"
http://localhost:5000
```

works on laptop but fails on phone.

---

# 🧠 Reason

`localhost` is device-specific.

---

# 💻 Laptop

```txt id="t5jlwm"
localhost = laptop
```

---

# 📱 Phone

```txt id="y1jlwm"
localhost = phone itself
```

---

# ✅ Solution

Use laptop IP address.

Example:

```txt id="j3jlwm"
http://192.168.0.105:5000
```

---

# ⚠️ Requirement

Both phone and laptop must be on same WiFi.

---

# 🔥 Common Networking Errors

| Error                  | Reason              |
| ---------------------- | ------------------- |
| Network request failed | Wrong IP            |
| Timeout                | Different WiFi      |
| Connection refused     | Backend not running |
| CORS error             | Server restriction  |

---

# 🌐 Networking Summary

This week we learned:

✅ APIs
✅ Backend integrations
✅ Expo API routes
✅ Internal backend
✅ External backend
✅ HTTP methods
✅ Database integrations
✅ localhost vs mobile IP

---

# 💾 Part 02 — Data Storage & Offline Support

---

# 📖 Why Local Storage is Important?

Apps need local storage for:

✅ Offline support
✅ Login persistence
✅ Caching
✅ Faster performance
✅ User settings

---

# 🧠 Storage Technologies Learned

| Technology      | Purpose                  |
| --------------- | ------------------------ |
| AsyncStorage    | Simple local storage     |
| SecureStore     | Secure sensitive storage |
| SQLite          | Local database           |
| Expo FileSystem | File management          |

---

# 🚀 AsyncStorage

---

# 📖 What is AsyncStorage?

AsyncStorage is local key-value storage.

Used for:

* Theme mode
* Login state
* User settings
* Onboarding state

---

# 📦 Installation

```bash id="3kjlwm"
npm install @react-native-async-storage/async-storage
```

---

# 📚 Core Methods

| Method       | Purpose       |
| ------------ | ------------- |
| setItem()    | Save data     |
| getItem()    | Read data     |
| removeItem() | Remove data   |
| clear()      | Clear storage |
| getAllKeys() | Get all keys  |

---

# ✅ Example

```js id="h9jlwm"
await AsyncStorage.setItem(
  "theme",
  "dark"
);
```

---

# ⚠️ Important

AsyncStorage:

✅ Fast
✅ Easy
❌ Not encrypted

---

# 🔐 SecureStore

---

# 📖 What is SecureStore?

Secure encrypted storage for sensitive data.

Uses:

* JWT tokens
* Access tokens
* Refresh tokens
* Sensitive user data

---

# 📦 Installation

```bash id="n8jlwm"
npx expo install expo-secure-store
```

---

# 📱 Platform Security

| Platform | Security System |
| -------- | --------------- |
| iOS      | Keychain        |
| Android  | Keystore        |

---

# ✅ Example

```js id="d2jlwm"
await SecureStore.setItemAsync(
  "token",
  jwtToken
);
```

---

# 🔥 SecureStore vs AsyncStorage

| Feature        | SecureStore | AsyncStorage |
| -------------- | ----------- | ------------ |
| Encryption     | ✅ Yes       | ❌ No         |
| Sensitive Data | ✅ Safe      | ❌ Unsafe     |
| Large Data     | ❌ Limited   | ✅ Better     |

---

# 🗄️ SQLite

---

# 📖 What is SQLite?

SQLite is a local relational database.

Used for:

✅ Large structured data
✅ Offline-first apps
✅ Searching/filtering
✅ Relational data

---

# 📦 Installation

```bash id="r7jlwm"
npx expo install expo-sqlite
```

---

# 📚 SQLite Data Types

| Type    | Meaning      |
| ------- | ------------ |
| INTEGER | Whole number |
| TEXT    | String       |
| REAL    | Decimal      |
| BLOB    | Binary       |
| NULL    | Empty        |

---

# ✅ Example

```sql id="p5jlwm"
CREATE TABLE users (
  id INTEGER PRIMARY KEY,
  name TEXT
);
```

---

# 🚀 Expo FileSystem

---

# 📖 What is FileSystem?

Expo FileSystem allows apps to work with files and folders.

---

# 📦 Installation

```bash id="m1jlwm"
npx expo install expo-file-system
```

---

# 📥 Modern Import

```js id="x0jlwm"
import {
  File,
  Directory,
  Paths,
} from "expo-file-system";
```

---

# 📂 Core Features

✅ Create files
✅ Read files
✅ Write files
✅ Delete files
✅ Download files
✅ Upload files
✅ Folder management

---

# 📂 Important Paths

| Path           | Purpose           |
| -------------- | ----------------- |
| Paths.document | Permanent storage |
| Paths.cache    | Temporary storage |

---

# ✅ Example

```js id="e4jlwm"
const file = new File(
  Paths.document,
  "note.txt"
);

file.write("Hello");
```

---

# 🔐 Sandbox System

Apps work inside protected storage called:

# 📦 Sandbox

One app cannot directly access another app’s private files.

---

# 🚀 Offline Support

Offline support means app works without internet.

---

# 📂 Offline Flow

```txt id="v6jlwm"
Internet Available
      ↓
Fetch/Download Data
      ↓
Store Locally
      ↓
Internet Lost
      ↓
Still Works Offline
```

---

# 📱 Real World Architecture

| Feature           | Technology   |
| ----------------- | ------------ |
| Theme persistence | AsyncStorage |
| JWT storage       | SecureStore  |
| Offline database  | SQLite       |
| Image cache       | FileSystem   |

---

# 🧠 Important Concepts Learned

---

# 🌐 Networking Concepts

✅ APIs
✅ Backend communication
✅ HTTP methods
✅ Mobile IP vs localhost
✅ Database integrations

---

# 💾 Storage Concepts

✅ Persistent storage
✅ Secure storage
✅ Local databases
✅ Offline support
✅ File handling

---

# 🚀 Best Practices

---

# ✅ Use AsyncStorage for small app settings

Examples:

* Theme
* Preferences
* Onboarding state

---

# ✅ Use SecureStore for sensitive data

Examples:

* JWT tokens
* Authentication secrets

---

# ✅ Use SQLite for structured offline data

Examples:

* Notes
* Chat messages
* Offline products

---

# ✅ Use FileSystem for media/files

Examples:

* PDFs
* Images
* Videos
* Downloads

---

# ⚠️ Common Beginner Mistakes

| Mistake                          | Problem           |
| -------------------------------- | ----------------- |
| Using localhost on phone         | Network failure   |
| Storing JWT in AsyncStorage      | Security risk     |
| Using AsyncStorage for huge data | Performance issue |
| Using cache for permanent files  | Data loss         |

---

# 🎯 Final Week 04 Conclusion

Week 04 focused on building the foundation of real-world mobile applications.

We learned how to:

✅ Connect apps with backend systems
✅ Build APIs
✅ Handle networking
✅ Store data securely
✅ Create offline-first apps
✅ Manage files locally
✅ Build scalable app architecture

These concepts are essential for becoming a professional React Native / Expo developer 🚀
