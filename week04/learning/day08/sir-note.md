# AsyncStorage in Expo / React Native

## What is AsyncStorage?

`AsyncStorage` is a local storage system for React Native and Expo applications.

It allows us to store data directly inside the user's device in the form of:

```
key -> value
```

Example:

```
"user" -> "Code Snippet"
"theme" -> "dark"
```

The data remains stored even after:

- app closes
- app reloads
- device restarts

AsyncStorage is:

- asynchronous
- persistent
- key-value based
- unencrypted

It is mainly used for storing small app data like:

- dark mode
- onboarding state
- user preferences
- cached data
- login state

AsyncStorage is officially supported in Expo through:

```bash
@react-native-async-storage/async-storage
```

(Expo Documentation)

---

# Features of AsyncStorage

## 1. Persistent Storage

Data remains saved even after the app closes.

Example:

- User selects dark mode
- App remembers it next time

---

## 2. Asynchronous

Operations run asynchronously using:

- async/await
- Promises

This prevents UI blocking.

```tsx
await AsyncStorage.getItem("theme");
```

(Expo Documentation)

---

# 3. Key-Value Storage

Data is stored in simple key-value format.

```
"name" -> "Anurag"
```

---

# 4. Cross Platform

Works on:

- Android
- iOS
- Web
- macOS

(GitHub)

---

# 5. Simple API

Easy to learn and beginner friendly.

Main methods:

- setItem
- getItem
- removeItem
- clear

---

# 6. Object Storage Support

AsyncStorage only stores strings.

So objects must be converted using:

```tsx
JSON.stringify()
```

and read back using:

```tsx
JSON.parse()
```

---

# Installation

```bash
npx expo install @react-native-async-storage/async-storage
```

(Expo Documentation)

---

# All Important Methods

# 1. setItem()

Used to save data.

```tsx
await AsyncStorage.setItem(
  "username",
  "Code Snippet"
);
```

---

# 2. getItem()

Used to retrieve data.

```tsx
const value =
  await AsyncStorage.getItem("username");
```

---

# 3. removeItem()

Deletes one item.

```tsx
await AsyncStorage.removeItem(
  "username"
);
```

---

# 4. clear()

Deletes everything from storage.

```tsx
await AsyncStorage.clear();
```

---

# 5. getAllKeys()

Returns all stored keys.

```tsx
const keys =
  await AsyncStorage.getAllKeys();

console.log(keys);
```

---

# 6. multiSet()

Stores multiple values together.

```tsx
await AsyncStorage.multiSet([
  ["name", "Code Snippet"],
  ["role", "Developer"],
]);
```

---

# 7. multiGet()

Gets multiple values together.

```tsx
const values =
  await AsyncStorage.multiGet([
    "name",
    "role",
  ]);
```

---

# 8. mergeItem()

Merges JSON values.

```tsx
await AsyncStorage.mergeItem(
  "user",
  JSON.stringify({
    age: 22,
  })
);
```

---

# 9. multiRemove()

Removes multiple keys.

```tsx
await AsyncStorage.multiRemove([
  "name",
  "role",
]);
```

---

# Storing Objects

## Save Object

```tsx
const user = {
  name: "Code Snippet",
  age: 22,
};

await AsyncStorage.setItem(
  "user",
  JSON.stringify(user)
);
```

---

# Read Object

```tsx
const data =
  await AsyncStorage.getItem("user");

const parsed = JSON.parse(data!);

console.log(parsed.name);
```

---

# Real World Use Cases

## 1. Dark Mode

```tsx
await AsyncStorage.setItem(
  "theme",
  "dark"
);
```

---

# 2. Onboarding Screen

```tsx
await AsyncStorage.setItem(
  "seenOnboarding",
  "true"
);
```

---

# 3. Cache API Data

```tsx
await AsyncStorage.setItem(
  "posts",
  JSON.stringify(posts)
);
```

---

# 4. Save App Preferences

```tsx
await AsyncStorage.setItem(
  "language",
  "english"
);
```

---

# Limitations of AsyncStorage

# 1. Not Encrypted ❌

AsyncStorage is NOT secure.

Anyone with device access may read the data.

Do NOT store:

- passwords
- bank data
- JWT tokens
- secrets

For sensitive data use:

- SecureStore
- Keychain
- Keystore

(Expo Documentation)

---

# 2. Only Stores Strings

Objects must be converted using:

```tsx
JSON.stringify()
```

---

# 3. Not Good for Large Data

AsyncStorage is designed for small storage.

Bad for:

- huge chats
- large databases
- offline apps
- thousands of records

For large data use:

- SQLite
- Realm
- MMKV

(Expo Documentation)

---

# 4. Slower Than Memory Storage

Because it interacts with device storage asynchronously.

---

# 5. No Query System

You cannot:

- filter data
- search efficiently
- run SQL queries

It is not a database.

---

# AsyncStorage vs SecureStore

| Feature | AsyncStorage | SecureStore |
| --- | --- | --- |
| Encrypted | ❌ | ✅ |
| Persistent | ✅ | ✅ |
| Good For | App data | Sensitive data |
| JWT Storage | ❌ | ✅ |
| Fast | ✅ | Slightly slower |

---

# Best Practice

```
Use AsyncStorage for:
- theme
- cache
- preferences
- onboarding

Use SecureStore for:
- auth tokens
- passwords
- secrets
```

---

# Simple Summary

```
AsyncStorage is a simple local storage system
used in Expo and React Native applications
for storing small non-sensitive data on the device.
```

(Expo Documentation)

```tsx
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState } from "react";
import { Button, SafeAreaView, Text, View } from "react-native";

export default function StorageScreen() {
  const [data, setData] = useState("");

  // setItem
  const saveData = async () => {
    await AsyncStorage.setItem("user", "Code Snippet");
  };

  // getItem
  const getData = async () => {
    const value = await AsyncStorage.getItem("user");

    setData(value || "No Data");
  };

  // removeItem
  const removeData = async () => {
    await AsyncStorage.removeItem("user");

    setData("");
  };

  // clear
  const clearStorage = async () => {
    await AsyncStorage.clear();

    setData("");
  };

  // getAllKeys
  const getKeys = async () => {
    const keys = await AsyncStorage.getAllKeys();

    console.log(keys);
  };

  // multiSet
  const saveMultiple = async () => {
    await AsyncStorage.multiSet([
      ["name", "Code Snippet"],
      ["role", "Developer"],
    ]);
  };

  // multiGet
  const getMultiple = async () => {
    const values = await AsyncStorage.multiGet(["name", "role"]);

    console.log(values);
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        justifyContent: "center",
        padding: 20,
        gap: 12,
      }}
    >
      <Button title="Save Data" onPress={saveData} />

      <Button title="Get Data" onPress={getData} />

      <Button title="Remove Data" onPress={removeData} />

      <Button title="Clear Storage" onPress={clearStorage} />

      <Button title="Get All Keys" onPress={getKeys} />

      <Button title="Multi Set" onPress={saveMultiple} />

      <Button title="Multi Get" onPress={getMultiple} />

      <View
        style={{
          marginTop: 20,
        }}
      >
        <Text
          style={{
            fontSize: 18,
            fontWeight: "bold",
          }}
        >
          Output:
        </Text>

        <Text>{data}</Text>
      </View>
    </SafeAreaView>
  );
}

```

# SecureStore in Expo / React Native

## What is SecureStore?

`SecureStore` is a secure storage system provided by Expo for storing sensitive data safely inside mobile applications.

Unlike AsyncStorage, SecureStore encrypts the data before saving it on the device.

Internally:

- iOS → Keychain
- Android → Keystore

This makes it suitable for storing:

- JWT tokens
- access tokens
- refresh tokens
- passwords
- API secrets
- sensitive user data

SecureStore is provided through:

```bash
expo-secure-store
```

(docs.expo.dev) (Expo Documentation)

---

# What is Keychain and Keystore?

## iOS Keychain

`Keychain` is Apple’s secure encrypted storage system used in iPhones and iPads.

It securely stores:

- passwords
- tokens
- certificates
- biometric-related data

Expo SecureStore uses Keychain internally on iOS devices.

(developer.apple.com)

---

# Android Keystore

`Android Keystore` is Android’s secure storage system for storing cryptographic keys and sensitive information.

It protects:

- authentication tokens
- passwords
- encryption keys

Expo SecureStore uses Android Keystore internally on Android devices.

(developer.android.com)

---

# Simple Flow

```
SecureStore
    ↓
Uses Keychain / Keystore
    ↓
Encrypts Data
    ↓
Stores Securely
```

---

# Features of SecureStore

# 1. Encrypted Storage 🔐

Data is encrypted before storing.

Much safer than AsyncStorage.

---

# 2. Persistent Storage

Data remains saved even after:

- app closes
- app reloads
- device restart

---

# 3. Native Mobile Security

Uses:

- iOS Keychain
- Android Keystore

which are official secure systems provided by mobile operating systems.

(docs.expo.dev) (Expo Documentation)

---

# 4. Great for Authentication

Perfect for storing:

- JWT tokens
- refresh tokens
- user credentials
- session data

---

# 5. Simple API

Easy methods:

- setItemAsync
- getItemAsync
- deleteItemAsync

---

# Installation

```bash
npx expo install expo-secure-store
```

(docs.expo.dev) (Expo Documentation)

---

# Import

```tsx
import * as SecureStore from "expo-secure-store";
```

---

# All Important Methods

# 1. setItemAsync()

Used to securely save data.

```tsx
await SecureStore.setItemAsync(
  "token",
  "abc123"
);
```

---

# 2. getItemAsync()

Used to retrieve stored data.

```tsx
const token =
  await SecureStore.getItemAsync(
    "token"
  );

console.log(token);
```

---

# 3. deleteItemAsync()

Deletes stored data.

```tsx
await SecureStore.deleteItemAsync(
  "token"
);
```

---

# 4. isAvailableAsync()

Checks whether SecureStore is available on the device.

```tsx
const available =
  await SecureStore.isAvailableAsync();

console.log(available);
```

---

# 5. setItem()

Synchronous version of setItemAsync.

```tsx
SecureStore.setItem(
  "token",
  "abc123"
);
```

---

# 6. getItem()

Synchronous version of getItemAsync.

```tsx
const token =
  SecureStore.getItem("token");
```

---

# 7. deleteItem()

Synchronous version of deleteItemAsync.

```tsx
SecureStore.deleteItem("token");
```

---

# SecureStore Options

SecureStore also supports additional security options.

Example:

```tsx
await SecureStore.setItemAsync(
  "token",
  "abc123",
  {
    requireAuthentication: true,
  }
);
```

This can require:

- Face ID
- Fingerprint
- Passcode

before accessing data.

(docs.expo.dev) (Expo Documentation)

---

# Storing Objects

SecureStore stores only strings.

Objects must be converted using:

```tsx
JSON.stringify()
```

---

# Save Object

```tsx
const user = {
  name: "Code Snippet",
  role: "admin",
};

await SecureStore.setItemAsync(
  "user",
  JSON.stringify(user)
);
```

---

# Read Object

```tsx
const data =
  await SecureStore.getItemAsync(
    "user"
  );

const parsed = JSON.parse(data!);

console.log(parsed.name);
```

---

# Real World Examples

# 1. Authentication Token

```tsx
await SecureStore.setItemAsync(
  "accessToken",
  response.token
);
```

---

# 2. Auto Login

```tsx
const token =
  await SecureStore.getItemAsync(
    "accessToken"
  );

if (token) {
  navigation.navigate("Home");
}
```

---

# 3. Logout

```tsx
await SecureStore.deleteItemAsync(
  "accessToken"
);
```

---

# 4. Biometric Protected Data

```tsx
await SecureStore.setItemAsync(
  "secret",
  "my-secret-data",
  {
    requireAuthentication: true,
  }
);
```

---

# Limitations of SecureStore

# 1. Slower Than AsyncStorage

Because encryption/decryption takes time.

---

# 2. Not Good for Large Data

SecureStore is designed for small sensitive values only.

Bad for:

- huge arrays
- chats
- offline databases
- large JSON objects

Good for:

- tokens
- passwords
- secrets

(docs.expo.dev) (Expo Documentation)

---

# 3. Limited Storage Size

Secure storage systems have smaller storage limits compared to AsyncStorage.

---

# 4. Web Support is Limited

SecureStore works best on:

- Android
- iOS

Browsers do not provide true native encrypted storage.

(github.com) (GitHub)

---

# 5. Only Stores Strings

Objects must be converted using:

```tsx
JSON.stringify()
```

---

# SecureStore vs AsyncStorage

| Feature | SecureStore | AsyncStorage |
| --- | --- | --- |
| Encrypted | ✅ | ❌ |
| Good For | Sensitive data | Normal app data |
| JWT Storage | ✅ | ❌ |
| Large Data | ❌ | Better |
| Speed | Slightly slower | Faster |

---

# Best Practice

```
Use SecureStore for:
- auth tokens
- passwords
- API secrets
- sensitive user data

Use AsyncStorage for:
- theme
- onboarding
- cache
- preferences
```

---

# Simple Summary

```
SecureStore is a secure encrypted storage
system in Expo used for storing sensitive
data like authentication tokens, passwords,
and secrets using iOS Keychain and Android Keystore.
```

(docs.expo.dev) (Expo Documentation)

```tsx
import * as SecureStore from "expo-secure-store";
import { useState } from "react";
import {
  Button,
  SafeAreaView,
  ScrollView,
  Text,
  View,
} from "react-native";

export default function SecureStoreScreen() {
  const [output, setOutput] = useState("");

  // setItemAsync
  const saveToken = async () => {
    await SecureStore.setItemAsync(
      "token",
      "abc123"
    );

    setOutput("Token Saved");
  };

  // getItemAsync
  const getToken = async () => {
    const value =
      await SecureStore.getItemAsync(
        "token"
      );

    setOutput(value || "No Token Found");
  };

  // deleteItemAsync
  const deleteToken = async () => {
    await SecureStore.deleteItemAsync(
      "token"
    );

    setOutput("Token Deleted");
  };

  // isAvailableAsync
  const checkAvailability = async () => {
    const available =
      await SecureStore.isAvailableAsync();

    setOutput(
      available
        ? "SecureStore Available"
        : "SecureStore Not Available"
    );
  };

  // Store Object
  const saveObject = async () => {
    const user = {
      name: "Code Snippet",
      role: "Admin",
    };

    await SecureStore.setItemAsync(
      "user",
      JSON.stringify(user)
    );

    setOutput("Object Saved");
  };

  // Read Object
  const getObject = async () => {
    const data =
      await SecureStore.getItemAsync(
        "user"
      );

    if (!data) {
      setOutput("No User Found");
      return;
    }

    const parsed = JSON.parse(data);

    setOutput(
      `${parsed.name} - ${parsed.role}`
    );
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
      }}
    >
      <ScrollView
        contentContainerStyle={{
          padding: 20,
          gap: 12,
        }}
      >
        <Text
          style={{
            fontSize: 28,
            fontWeight: "bold",
            marginBottom: 10,
          }}
        >
          SecureStore Demo
        </Text>

        <Button
          title="Save Token"
          onPress={saveToken}
        />

        <Button
          title="Get Token"
          onPress={getToken}
        />

        <Button
          title="Delete Token"
          onPress={deleteToken}
        />

        <Button
          title="Check Availability"
          onPress={checkAvailability}
        />

        <Button
          title="Save Object"
          onPress={saveObject}
        />

        <Button
          title="Get Object"
          onPress={getObject}
        />

        <View
          style={{
            marginTop: 30,
            padding: 20,
            borderWidth: 1,
            borderRadius: 10,
          }}
        >
          <Text
            style={{
              fontSize: 18,
              fontWeight: "bold",
              marginBottom: 10,
            }}
          >
            Output
          </Text>

          <Text
            style={{
              fontSize: 16,
            }}
          >
            {output}
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
```

# SQLite in Expo / React Native

## What is SQLite?

`SQLite` is a lightweight local database used for storing structured data inside mobile applications.

Unlike AsyncStorage, SQLite stores data in:

- tables
- rows
- columns

just like a real SQL database.

SQLite is built into:

- Android
- iOS

Expo provides access to SQLite using:

```bash
expo-sqlite
```

(docs.expo.dev)

---

# Why SQLite?

AsyncStorage is good for:

- small key-value data

But SQLite is better for:

- large structured data
- offline apps
- search/filter/sort operations
- relational data
- scalable local storage

---

# Real World Use Cases

SQLite is commonly used in:

- notes apps
- todo apps
- chat applications
- finance apps
- offline-first apps
- e-commerce carts
- local caching systems

---

# Features of SQLite

# 1. Local Database

Stores data directly on the device.

Works even without internet.

---

# 2. Structured Data Storage

Stores data in:

- tables
- rows
- columns

Example:

| id | name | age |
| --- | --- | --- |
| 1 | Anurag | 22 |
| 2 | Rahul | 25 |

---

# 3. SQL Support

SQLite supports SQL queries like:

- CREATE TABLE
- INSERT
- SELECT
- UPDATE
- DELETE

---

# 4. Fast for Large Data

Much better than AsyncStorage for:

- thousands of records
- filtering
- sorting
- searching
- pagination

---

# 5. Offline Support

Perfect for offline applications.

---

# 6. Built Into Mobile Devices

SQLite already exists inside:

- Android
- iOS

Expo simply provides access to it.

(sqlite.org)

---

# Installation

```bash
npx expo install expo-sqlite
```

(docs.expo.dev)

---

# Import

```tsx
import * as SQLite from "expo-sqlite";
```

---

# SQLite Flow

```
Open Database
      ↓
Create Table
      ↓
Insert Data
      ↓
Read Data
      ↓
Update/Delete Data
```

---

# Create/Open Database

```tsx
const db = SQLite.openDatabaseSync(
  "users.db"
);
```

This:

- creates database if it doesn't exist
- opens database if already exists

---

# Important SQLite Methods

# 1. openDatabaseSync()

Creates or opens a database.

```tsx
const db =
  SQLite.openDatabaseSync("app.db");
```

---

# 2. openDatabaseAsync()

Async version of opening database.

```tsx
const db =
  await SQLite.openDatabaseAsync(
    "app.db"
  );
```

---

# 3. execSync()

Runs SQL queries.

Mostly used for:

- CREATE TABLE
- DROP TABLE
- schema queries

```tsx
db.execSync(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY NOT NULL,
    name TEXT
  );
`);
```

---

# 4. execAsync()

Async version of execSync.

```tsx
await db.execAsync(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY NOT NULL,
    name TEXT
  );
`);
```

---

# 5. runSync()

Runs queries with parameters.

Mostly used for:

- INSERT
- UPDATE
- DELETE

```tsx
db.runSync(
  "INSERT INTO users (name) VALUES (?)",
  "Code Snippet"
);
```

---

# 6. runAsync()

Async version of runSync.

```tsx
await db.runAsync(
  "INSERT INTO users (name) VALUES (?)",
  "Code Snippet"
);
```

---

# Why Question Marks `?`

```tsx
VALUES (?)
```

This is called:

- placeholder
- parameterized query

It helps prevent:

- SQL injection
- unsafe queries

---

# 7. getAllSync()

Returns all rows.

```tsx
const users = db.getAllSync(
  "SELECT * FROM users"
);

console.log(users);
```

---

# 8. getAllAsync()

Async version of getAllSync.

```tsx
const users = await db.getAllAsync(
  "SELECT * FROM users"
);
```

---

# 9. getFirstSync()

Returns first row only.

```tsx
const user = db.getFirstSync(
  "SELECT * FROM users"
);
```

---

# 10. getFirstAsync()

Async version of getFirstSync.

```tsx
const user = await db.getFirstAsync(
  "SELECT * FROM users"
);
```

---

# 11. prepareSync()

Creates reusable SQL statements.

Useful for:

- performance optimization
- repeated queries

```tsx
const statement = db.prepareSync(
  "INSERT INTO users (name) VALUES (?)"
);

statement.executeSync(["Anurag"]);
```

---

# 12. prepareAsync()

Async version of prepareSync.

```tsx
const statement =
  await db.prepareAsync(
    "INSERT INTO users (name) VALUES (?)"
  );
```

---

# Create Table Example

```tsx
db.execSync(`
  CREATE TABLE IF NOT EXISTS todos (
    id INTEGER PRIMARY KEY NOT NULL,
    title TEXT,
    completed INTEGER
  );
`);
```

---

# Insert Data

```tsx
db.runSync(
  "INSERT INTO todos (title, completed) VALUES (?, ?)",
  "Learn SQLite",
  0
);
```

---

# Read Data

```tsx
const todos = db.getAllSync(
  "SELECT * FROM todos"
);

console.log(todos);
```

---

# Update Data

```tsx
db.runSync(
  "UPDATE todos SET completed = ? WHERE id = ?",
  1,
  1
);
```

---

# Delete Data

```tsx
db.runSync(
  "DELETE FROM todos WHERE id = ?",
  1
);
```

---

# SQLite Data Types

| Type | Meaning |
| --- | --- |
| INTEGER | Numbers |
| TEXT | Strings |
| REAL | Decimal numbers |
| BLOB | Binary data |
| NULL | Empty value |

---

# How Much Data Can SQLite Handle?

SQLite can handle:

- millions of rows
- very large databases

It is used internally by many large applications.

But in mobile apps, limitations usually come from:

- device RAM
- storage
- CPU
- battery

not SQLite itself.

(sqlite.org)

---

# AsyncStorage vs SQLite

```
AsyncStorage
→ small key-value data

SQLite
→ large structured offline data
```

---

# Example

## AsyncStorage

```
theme -> dark
language -> english
```

---

# SQLite

| id | title | completed |
| --- | --- | --- |
| 1 | Learn Expo | 1 |
| 2 | Learn SQLite | 0 |

---

# Advantages of SQLite

✅ Fast

✅ Offline support

✅ SQL support

✅ Structured database

✅ Good for large data

✅ Supports millions of rows

✅ Built into mobile devices

---

# Limitations of SQLite

# 1. More Complex Than AsyncStorage

Requires:

- SQL knowledge
- database structure
- queries

---

# 2. Not Encrypted By Default

SQLite is NOT secure automatically.

Sensitive data should still use:

- SecureStore
- encryption libraries

---

# 3. Schema Management

Need to manage:

- tables
- migrations
- relationships

---

# 4. Overkill for Small Data

For:

- theme
- onboarding
- small preferences

AsyncStorage is simpler.

---

# SQLite vs AsyncStorage

| Feature | SQLite | AsyncStorage |
| --- | --- | --- |
| Data Structure | Tables | Key-Value |
| Large Data | ✅ | ❌ |
| SQL Queries | ✅ | ❌ |
| Structured Data | ✅ | ❌ |
| Simplicity | ❌ | ✅ |

---

# SQLite vs SecureStore

| Feature | SQLite | SecureStore |
| --- | --- | --- |
| Encrypted | ❌ | ✅ |
| Large Data | ✅ | ❌ |
| SQL Queries | ✅ | ❌ |
| Best For | Databases | Sensitive data |

---

# Best Practice

```
Use AsyncStorage for:
- theme
- onboarding
- preferences

Use SecureStore for:
- tokens
- passwords
- secrets

Use SQLite for:
- offline apps
- todos
- notes
- chat apps
- structured large datasets
```

---

# Simple Summary

```
SQLite is a lightweight local database
used in Expo and React Native applications
for storing large structured offline data using SQL.
```

(docs.expo.dev)

```tsx
import * as SQLite from "expo-sqlite";
import { useEffect, useState } from "react";
import {
  Button,
  SafeAreaView,
  ScrollView,
  Text,
  View,
} from "react-native";

const db = SQLite.openDatabaseSync("demo.db");

export default function SQLiteScreen() {
  const [output, setOutput] = useState("");

  // Create Table
  const createTable = () => {
    db.execSync(`
      CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        age INTEGER
      );
    `);

    setOutput("Table Created");
  };

  // Insert Data
  const insertUser = () => {
    db.runSync(
      "INSERT INTO users (name, age) VALUES (?, ?)",
      "Code Snippet",
      22
    );

    setOutput("User Inserted");
  };

  // Get All Users
  const getUsers = () => {
    const users = db.getAllSync(
      "SELECT * FROM users"
    );

    setOutput(JSON.stringify(users, null, 2));
  };

  // Get First User
  const getFirstUser = () => {
    const user = db.getFirstSync(
      "SELECT * FROM users"
    );

    setOutput(JSON.stringify(user, null, 2));
  };

  // Update User
  const updateUser = () => {
    db.runSync(
      "UPDATE users SET age = ? WHERE id = ?",
      25,
      1
    );

    setOutput("User Updated");
  };

  // Delete User
  const deleteUser = () => {
    db.runSync(
      "DELETE FROM users WHERE id = ?",
      1
    );

    setOutput("User Deleted");
  };

  // Drop Table
  const dropTable = () => {
    db.execSync(`
      DROP TABLE IF EXISTS users;
    `);

    setOutput("Table Dropped");
  };

  // Prepare Statement
  const prepareStatement = () => {
    const statement = db.prepareSync(
      "INSERT INTO users (name, age) VALUES (?, ?)"
    );

    statement.executeSync([
      "Prepared User",
      30,
    ]);

    statement.finalizeSync();

    setOutput("Prepared Statement Executed");
  };

  useEffect(() => {
    createTable();
  }, []);

  return (
    <SafeAreaView
      style={{
        flex: 1,
      }}
    >
      <ScrollView
        contentContainerStyle={{
          padding: 20,
          gap: 12,
        }}
      >
        <Text
          style={{
            fontSize: 28,
            fontWeight: "bold",
            marginBottom: 10,
          }}
        >
          SQLite Demo
        </Text>

        <Button
          title="Create Table"
          onPress={createTable}
        />

        <Button
          title="Insert User"
          onPress={insertUser}
        />

        <Button
          title="Get All Users"
          onPress={getUsers}
        />

        <Button
          title="Get First User"
          onPress={getFirstUser}
        />

        <Button
          title="Update User"
          onPress={updateUser}
        />

        <Button
          title="Delete User"
          onPress={deleteUser}
        />

        <Button
          title="Prepared Statement"
          onPress={prepareStatement}
        />

        <Button
          title="Drop Table"
          onPress={dropTable}
        />

        <View
          style={{
            marginTop: 20,
            padding: 16,
            borderWidth: 1,
            borderRadius: 10,
          }}
        >
          <Text
            style={{
              fontSize: 18,
              fontWeight: "bold",
              marginBottom: 10,
            }}
          >
            Output
          </Text>

          <Text
            selectable
            style={{
              fontSize: 14,
            }}
          >
            {output}
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
```

# Expo FileSystem (`expo-file-system`)

## What is FileSystem?

`expo-file-system` is a module provided by Expo that allows us to interact with the device’s local file system.

Using FileSystem we can:

- create files
- read files
- write files
- copy/move/delete files
- upload files
- download files
- manage folders/directories

It works on:

- Android
- iOS
- Web (limited support)

(docs.expo.dev)

---

# Why Do We Need FileSystem?

Without FileSystem:

- files exist only temporarily in memory

With FileSystem:

- files can persist locally on device

Useful for:

- offline apps
- caching images/videos
- downloading PDFs
- storing JSON locally
- media handling
- uploads/downloads
- document management

---

# Core Concepts

# 1. File URI

Every file has a path called URI.

Example:

```
file:///data/user/0/app/files/demo.txt
```

This URI is used to:

- read files
- delete files
- move files
- upload files

---

# 2. Sandbox

Apps cannot access all device files directly.

They work inside a protected area called sandbox.

```
Your App
   ↓
Sandbox Directory
   ↓
Files Stored Here
```

---

# 3. Directories

FileSystem provides important directories.

The most important ones are:

```tsx
FileSystem.documentDirectory
```

and

```tsx
FileSystem.cacheDirectory
```

---

# Difference Between Cache and Documents

# cacheDirectory

Temporary storage.

Used for:

- cached images
- temporary downloads
- API cache

OS may delete these files automatically.

Example:

- downloaded thumbnails
- temporary PDFs

---

# documentDirectory

Permanent app storage.

Used for:

- important user files
- notes
- saved PDFs
- offline documents

Files stay until:

- app deletes them
- app uninstalls

---

# Simple Difference

```
cacheDirectory
→ temporary files

documentDirectory
→ important persistent files
```

(docs.expo.dev)

---

# Installation

```bash
npx expo install expo-file-system
```

(docs.expo.dev)

---

# Import

```tsx
import * as FileSystem from "expo-file-system";
```

---

# Most Important Constants

| Constant | Purpose |
| --- | --- |
| `documentDirectory` | Permanent files |
| `cacheDirectory` | Temporary cached files |
| `bundleDirectory` | App bundle files (iOS) |

---

# Most Used Methods

# 1. writeAsStringAsync()

Writes data into a file.

```tsx
const fileUri =
  FileSystem.documentDirectory +
  "demo.txt";

await FileSystem.writeAsStringAsync(
  fileUri,
  "Hello World"
);
```

---

# 2. readAsStringAsync()

Reads file content.

```tsx
const data =
  await FileSystem.readAsStringAsync(
    fileUri
  );

console.log(data);
```

---

# 3. deleteAsync()

Deletes a file.

```tsx
await FileSystem.deleteAsync(fileUri);
```

---

# 4. copyAsync()

Copies a file.

```tsx
await FileSystem.copyAsync({
  from: oldUri,
  to: newUri,
});
```

---

# 5. moveAsync()

Moves/renames a file.

```tsx
await FileSystem.moveAsync({
  from: oldUri,
  to: newUri,
});
```

---

# 6. makeDirectoryAsync()

Creates a folder.

```tsx
await FileSystem.makeDirectoryAsync(
  FileSystem.documentDirectory +
    "notes/"
);
```

---

# 7. readDirectoryAsync()

Reads folder contents.

```tsx
const files =
  await FileSystem.readDirectoryAsync(
    FileSystem.documentDirectory!
  );

console.log(files);
```

---

# 8. getInfoAsync()

Gets file information.

```tsx
const info =
  await FileSystem.getInfoAsync(fileUri);

console.log(info);
```

---

# FileInfo Object

```
{
  exists: true,
  isDirectory: false,
  size: 1024,
  uri: "...",
}
```

---

# 9. downloadAsync()

Downloads a file from internet.

```tsx
await FileSystem.downloadAsync(
  "https://example.com/file.pdf",
  FileSystem.documentDirectory +
    "file.pdf"
);
```

---

# 10. uploadAsync()

Uploads file to server.

```tsx
await FileSystem.uploadAsync(
  "https://example.com/upload",
  fileUri
);
```

---

# 11. createDownloadResumable()

Creates resumable downloads.

Useful for:

- large files
- pause/resume support

```tsx
const download =
  FileSystem.createDownloadResumable(
    url,
    fileUri
  );
```

---

# 12. createUploadTask()

Creates resumable uploads.

Useful for:

- videos
- large uploads

---

# Append Data to File

FileSystem does not provide direct append support.

Usually we:

1. read existing file
2. append text
3. write again

Example:

```tsx
const oldData =
  await FileSystem.readAsStringAsync(
    fileUri
  );

await FileSystem.writeAsStringAsync(
  fileUri,
  oldData + "\nNew Data"
);
```

---

# Common Workflow

# Save File

```tsx
const fileUri =
  FileSystem.documentDirectory +
  "note.txt";

await FileSystem.writeAsStringAsync(
  fileUri,
  "Hello Expo"
);
```

---

# Read File

```tsx
const data =
  await FileSystem.readAsStringAsync(
    fileUri
  );
```

---

# Download File

```tsx
await FileSystem.downloadAsync(
  imageUrl,
  FileSystem.cacheDirectory +
    "image.png"
);
```

---

# Upload File

```tsx
await FileSystem.uploadAsync(
  apiUrl,
  fileUri
);
```

---

# FileSystem vs AsyncStorage

| Feature | FileSystem | AsyncStorage |
| --- | --- | --- |
| Stores Files | ✅ | ❌ |
| Stores Large Data | ✅ | ❌ |
| Key-Value Storage | ❌ | ✅ |
| Upload/Download | ✅ | ❌ |
| Images/PDFs/Videos | ✅ | ❌ |

---

# FileSystem vs SQLite

| Feature | FileSystem | SQLite |
| --- | --- | --- |
| Stores Files | ✅ | ❌ |
| Structured Database | ❌ | ✅ |
| SQL Queries | ❌ | ✅ |
| Best For | Media/Documents | Structured Data |

---

# Limitations of FileSystem

# 1. No Database Features

Cannot:

- query data
- filter rows
- perform joins

Use SQLite for structured data.

---

# 2. Web Support is Limited

Some APIs behave differently on web.

(docs.expo.dev)

---

# 3. File Management Complexity

Need to manage:

- paths
- folders
- cleanup
- permissions

---

# 4. Large Files Need Streams/Resumable APIs

For:

- videos
- huge downloads

normal methods are not ideal.

---

# Best Practice

```
Use AsyncStorage for:
- small preferences

Use SecureStore for:
- sensitive data

Use SQLite for:
- structured databases

Use FileSystem for:
- files
- images
- PDFs
- uploads/downloads
- offline documents
```

---

# Simple Summary

```
Expo FileSystem allows React Native and Expo
applications to create, read, write, delete,
download, upload, and manage files locally
on the device.
```

(docs.expo.dev)

```tsx
import * as FileSystem from "expo-file-system";
import { useState } from "react";
import {
  Button,
  SafeAreaView,
  ScrollView,
  Text,
  View,
} from "react-native";

export default function FileSystemScreen() {
  const [output, setOutput] = useState("");

  // File Paths
  const fileUri =
    FileSystem.documentDirectory +
    "demo.txt";

  const copiedFileUri =
    FileSystem.documentDirectory +
    "copy-demo.txt";

  // Write File
  const writeFile = async () => {
    await FileSystem.writeAsStringAsync(
      fileUri,
      "Hello Expo FileSystem 🚀"
    );

    setOutput("File Written Successfully");
  };

  // Read File
  const readFile = async () => {
    const data =
      await FileSystem.readAsStringAsync(
        fileUri
      );

    setOutput(data);
  };

  // Append File
  const appendFile = async () => {
    const oldData =
      await FileSystem.readAsStringAsync(
        fileUri
      );

    await FileSystem.writeAsStringAsync(
      fileUri,
      oldData + "\nNew Data Added"
    );

    setOutput("Data Appended");
  };

  // Copy File
  const copyFile = async () => {
    await FileSystem.copyAsync({
      from: fileUri,
      to: copiedFileUri,
    });

    setOutput("File Copied");
  };

  // Move File
  const moveFile = async () => {
    const movedUri =
      FileSystem.documentDirectory +
      "moved-demo.txt";

    await FileSystem.moveAsync({
      from: copiedFileUri,
      to: movedUri,
    });

    setOutput("File Moved");
  };

  // Delete File
  const deleteFile = async () => {
    await FileSystem.deleteAsync(fileUri);

    setOutput("File Deleted");
  };

  // File Info
  const getFileInfo = async () => {
    const info =
      await FileSystem.getInfoAsync(
        fileUri
      );

    setOutput(
      JSON.stringify(info, null, 2)
    );
  };

  // Read Directory
  const readDirectory = async () => {
    const files =
      await FileSystem.readDirectoryAsync(
        FileSystem.documentDirectory!
      );

    setOutput(
      JSON.stringify(files, null, 2)
    );
  };

  // Create Folder
  const createFolder = async () => {
    await FileSystem.makeDirectoryAsync(
      FileSystem.documentDirectory +
        "notes/",
      {
        intermediates: true,
      }
    );

    setOutput("Folder Created");
  };

  // Download File
  const downloadFile = async () => {
    const downloadUri =
      FileSystem.documentDirectory +
      "image.jpg";

    await FileSystem.downloadAsync(
      "https://picsum.photos/200",
      downloadUri
    );

    setOutput(
      "File Downloaded Successfully"
    );
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
      }}
    >
      <ScrollView
        contentContainerStyle={{
          padding: 20,
          gap: 12,
        }}
      >
        <Text
          style={{
            fontSize: 28,
            fontWeight: "bold",
            marginBottom: 10,
          }}
        >
          Expo FileSystem Demo
        </Text>

        <Button
          title="Write File"
          onPress={writeFile}
        />

        <Button
          title="Read File"
          onPress={readFile}
        />

        <Button
          title="Append File"
          onPress={appendFile}
        />

        <Button
          title="Copy File"
          onPress={copyFile}
        />

        <Button
          title="Move File"
          onPress={moveFile}
        />

        <Button
          title="Delete File"
          onPress={deleteFile}
        />

        <Button
          title="Get File Info"
          onPress={getFileInfo}
        />

        <Button
          title="Read Directory"
          onPress={readDirectory}
        />

        <Button
          title="Create Folder"
          onPress={createFolder}
        />

        <Button
          title="Download File"
          onPress={downloadFile}
        />

        <View
          style={{
            marginTop: 20,
            padding: 16,
            borderWidth: 1,
            borderRadius: 10,
          }}
        >
          <Text
            style={{
              fontSize: 18,
              fontWeight: "bold",
              marginBottom: 10,
            }}
          >
            Output
          </Text>

          <Text selectable>
            {output}
          </Text>
        </View>

        <View
          style={{
            marginTop: 10,
          }}
        >
          <Text
            style={{
              fontWeight: "bold",
            }}
          >
            documentDirectory
          </Text>

          <Text selectable>
            {FileSystem.documentDirectory}
          </Text>

          <Text
            style={{
              fontWeight: "bold",
              marginTop: 10,
            }}
          >
            cacheDirectory
          </Text>

          <Text selectable>
            {FileSystem.cacheDirectory}
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
```