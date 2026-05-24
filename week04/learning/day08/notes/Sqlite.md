# 🗄️ Complete Expo SQLite Notes

# SQLite in Expo / React Native

---

# 📖 Introduction

Modern mobile applications need local databases for:

✅ Offline support
✅ Fast performance
✅ Structured data
✅ Searching & filtering
✅ Persistent app storage

This is where:

# 🚀 Expo SQLite

comes in.

---

# 🧠 What is SQLite?

SQLite is a lightweight local relational database built directly into mobile devices.

It allows React Native / Expo apps to store structured data locally without needing internet.

---

# 📌 Simple Definition

SQLite = local SQL database inside your mobile app.

---

# 🔥 Why SQLite is Important?

Apps often need to store:

* Notes
* Chat messages
* Offline posts
* Tasks
* Products
* Transactions
* Downloaded content

Using AsyncStorage for huge structured data becomes difficult.

SQLite solves this efficiently.

---

# 📦 What is Expo SQLite?

Expo SQLite is the Expo package that allows React Native apps to use SQLite databases.

Official Expo documentation explains that `expo-sqlite` provides access to a persistent local database using SQLite APIs directly on the device.

---

# 📦 Installation

## Expo

```bash id="c7g7xe"
npx expo install expo-sqlite
```

---

# 📥 Import

```js id="x1n8qg"
import * as SQLite from "expo-sqlite";
```

---

# 🚀 Why Developers Use SQLite?

| Reason             | Benefit                  |
| ------------------ | ------------------------ |
| Offline storage    | Works without internet   |
| Large data support | Better than AsyncStorage |
| Fast searching     | SQL queries              |
| Structured storage | Tables & relationships   |
| Persistent storage | Data survives restart    |

---

# 📱 Real App Examples

| App           | SQLite Usage          |
| ------------- | --------------------- |
| Notes App     | Store notes           |
| WhatsApp      | Offline chat cache    |
| Todo App      | Task management       |
| E-commerce    | Offline product cache |
| Finance App   | Transactions          |
| Food Delivery | Cached restaurants    |

---

# 🧠 SQLite Architecture

```txt id="f4zj9u"
Expo App
    ↓
SQLite Database
    ↓
Tables
    ↓
Rows & Columns
```

---

# 📂 Core Database Concepts

| Concept  | Meaning               |
| -------- | --------------------- |
| Database | Full storage system   |
| Table    | Collection of records |
| Row      | Single item           |
| Column   | Single field          |
| Query    | Database command      |

---

# 🔥 SQLite Data Types

| Type    | Meaning         |
| ------- | --------------- |
| INTEGER | Whole numbers   |
| TEXT    | Strings         |
| REAL    | Decimal numbers |
| BLOB    | Binary data     |
| NULL    | Empty value     |

---

# 📌 Example

```sql id="0pyyqy"
CREATE TABLE users (
  id INTEGER,
  name TEXT,
  age INTEGER
);
```

---

# 🚀 SQLite vs AsyncStorage

| Feature         | SQLite      | AsyncStorage |
| --------------- | ----------- | ------------ |
| Large Data      | ✅ Excellent | ❌ Limited    |
| Searching       | ✅ Fast      | ❌ Difficult  |
| Filtering       | ✅ Supported | ❌ Weak       |
| Relational Data | ✅ Yes       | ❌ No         |
| Offline Apps    | ✅ Excellent | ⚠️ Basic     |

---

# 📂 Opening Database in Expo

---

# ✅ Create/Open Database

```js id="4o9j24"
const db = SQLite.openDatabaseSync(
  "app.db"
);
```

---

# 🧠 Important

If database does not exist:

✅ SQLite automatically creates it.

---

# 📂 Database File

SQLite database is stored inside the app sandbox.

Example:

```txt id="d4j9g4"
App Sandbox
    ↓
app.db
```

---

# 🔥 SQL Basics

SQLite uses SQL queries.

---

# 📚 Common SQL Commands

| Command      | Purpose      |
| ------------ | ------------ |
| CREATE TABLE | Create table |
| INSERT INTO  | Save data    |
| SELECT       | Read data    |
| UPDATE       | Edit data    |
| DELETE       | Remove data  |

---

# 1️⃣ CREATE TABLE

Used to create database tables.

---

# ✅ Example

```sql id="k8sgr5"
CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT,
  age INTEGER
);
```

---

# 🧠 Breakdown

| Part          | Meaning           |
| ------------- | ----------------- |
| PRIMARY KEY   | Unique identifier |
| AUTOINCREMENT | Auto increase ID  |
| TEXT          | String data       |
| INTEGER       | Number data       |

---

# 🚀 Create Table in Expo

```js id="1suxk0"
db.execSync(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    age INTEGER
  );
`);
```

---

# 2️⃣ INSERT DATA

Used to save records.

---

# ✅ SQL Example

```sql id="3mdrqg"
INSERT INTO users (name, age)
VALUES ('Aminul', 22);
```

---

# ✅ Expo Example

```js id="d2zy2l"
db.execSync(`
  INSERT INTO users (name, age)
  VALUES ('Aminul', 22);
`);
```

---

# 3️⃣ SELECT DATA

Used to read stored data.

---

# ✅ SQL Example

```sql id="rpk6kq"
SELECT * FROM users;
```

---

# ✅ Expo Example

```js id="2h0dn4"
const users = db.getAllSync(
  "SELECT * FROM users"
);

console.log(users);
```

---

# 🔥 WHERE Clause

Used for filtering data.

---

# ✅ Example

```sql id="h78xmw"
SELECT * FROM users
WHERE age > 20;
```

---

# 4️⃣ UPDATE DATA

Used to edit records.

---

# ✅ Example

```sql id="smhn98"
UPDATE users
SET age = 25
WHERE id = 1;
```

---

# 5️⃣ DELETE DATA

Used to remove records.

---

# ✅ Example

```sql id="w2t44d"
DELETE FROM users
WHERE id = 1;
```

---

# 🚀 Full Expo SQLite Example

---

# ✅ Create Database + Table

```js id="e7osb5"
import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabaseSync(
  "notes.db"
);

db.execSync(`
  CREATE TABLE IF NOT EXISTS notes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT,
    content TEXT
  );
`);
```

---

# ✅ Insert Note

```js id="0i8o9f"
db.execSync(`
  INSERT INTO notes (title, content)
  VALUES (
    'Learning SQLite',
    'SQLite is awesome'
  );
`);
```

---

# ✅ Read Notes

```js id="0h3ydf"
const notes = db.getAllSync(
  "SELECT * FROM notes"
);

console.log(notes);
```

---

# 📱 Example Output

```js id="b08vmj"
[
  {
    id: 1,
    title: "Learning SQLite",
    content: "SQLite is awesome"
  }
]
```

---

# 🚀 Offline-First Architecture

SQLite is heavily used for offline apps.

---

# 📂 Offline Flow

```txt id="egjlwm"
Internet Available
      ↓
Fetch API Data
      ↓
Save into SQLite
      ↓
Internet Lost
      ↓
Load Offline Data
```

---

# 🔥 Searching & Filtering

SQLite is extremely powerful for searching data.

---

# ✅ Search Example

```sql id="r8qajv"
SELECT * FROM notes
WHERE title LIKE '%react%';
```

---

# ✅ Sorting Example

```sql id="qavrtz"
SELECT * FROM notes
ORDER BY id DESC;
```

---

# ✅ Limit Example

```sql id="y4m00h"
SELECT * FROM notes
LIMIT 5;
```

---

# 🚀 Relationships in SQLite

SQLite supports relational data.

---

# 📂 Example Tables

## Users Table

| id | name   |
| -- | ------ |
| 1  | Aminul |

---

## Posts Table

| id | userId | title |
| -- | ------ | ----- |
| 1  | 1      | Hello |

---

# 🔥 Foreign Key Concept

```txt id="s3wkfd"
posts.userId → users.id
```

This creates relationships between tables.

---

# 📌 Why SQLite is Fast?

SQLite is optimized for:

✅ Mobile devices
✅ Fast local queries
✅ Indexed searching
✅ Lightweight storage

---

# 🚀 Transactions

Transactions group multiple queries safely.

---

# ✅ Example

```js id="1fw8r0"
db.execSync(`
  BEGIN TRANSACTION;

  INSERT INTO users (name, age)
  VALUES ('Aminul', 22);

  INSERT INTO users (name, age)
  VALUES ('Alex', 25);

  COMMIT;
`);
```

---

# 🧠 Why Transactions Matter?

Transactions provide:

✅ Better performance
✅ Safer database operations
✅ Data consistency

---

# 🔥 Async vs Sync APIs

Expo SQLite provides:

| API Type | Meaning      |
| -------- | ------------ |
| Sync     | Blocking     |
| Async    | Non-blocking |

---

# ✅ Preferred

Async APIs are generally better for UI performance.

---

# ⚠️ Common Beginner Mistakes

| Mistake                          | Problem          |
| -------------------------------- | ---------------- |
| Forgetting table creation        | Query fails      |
| Bad SQL syntax                   | Runtime errors   |
| Using AsyncStorage for huge data | Poor performance |
| No offline strategy              | Bad UX           |

---

# ❌ Avoid Using SQLite For

* Huge videos
* Large image storage
* Cloud-scale databases
* Massive server systems

---

# 🚀 SQLite Best Practices

---

# ✅ Use IF NOT EXISTS

```sql id="ybjz8m"
CREATE TABLE IF NOT EXISTS users
```

Avoids duplicate table errors.

---

# ✅ Keep Queries Optimized

Efficient queries improve app speed.

---

# ✅ Use Parameterized Queries

Prevents SQL injection issues.

---

# ✅ Separate Database Logic

Create:

```txt id="a4zv7v"
database/
   db.js
```

for cleaner architecture.

---

# 📂 Example Structure

```txt id="p7lc4j"
src/
 ├── database/
 │    ├── db.js
 │    ├── userQueries.js
 │
 ├── screens/
 ├── components/
```

---

# 🔥 SQLite Lifecycle

| Action        | Data Status        |
| ------------- | ------------------ |
| App restart   | ✅ Data stays       |
| Device reboot | ✅ Data stays       |
| App uninstall | ❌ Database removed |

---

# 📱 SQLite + Expo Use Cases

| Feature           | Usage  |
| ----------------- | ------ |
| Offline Notes App | SQLite |
| Offline Todo App  | SQLite |
| Chat App Cache    | SQLite |
| Product Cache     | SQLite |
| Downloaded Data   | SQLite |

---

# 🧠 Summary

Today we learned:

✅ What SQLite is
✅ What Expo SQLite is
✅ Installation & setup
✅ Database concepts
✅ Tables/Rows/Columns
✅ CREATE TABLE
✅ INSERT
✅ SELECT
✅ UPDATE
✅ DELETE
✅ Offline-first apps
✅ Transactions
✅ Relationships
✅ SQLite best practices

---

# 🎯 Final Conclusion

Expo SQLite is one of the most powerful tools for building advanced offline-capable mobile applications.

It helps developers build:

✅ Fast apps
✅ Offline-first apps
✅ Structured local databases
✅ Searchable applications
✅ Production-ready mobile systems

Mastering SQLite is essential for becoming a professional React Native / Expo developer 🚀
