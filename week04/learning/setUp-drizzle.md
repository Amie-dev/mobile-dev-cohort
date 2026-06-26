# Meet Drizzle ORM with Expo SQLite

## Get Started with Drizzle and Expo SQLite

Drizzle ORM can be used with Expo SQLite to manage local databases inside a React Native Expo app. This setup is useful when you want to store data locally, support offline mode, or build apps that need persistent storage.

---

## What We Will Use

* Expo
* Expo SQLite
* Drizzle ORM
* Drizzle Kit
* TypeScript

---

# Step 1: Create a New Expo Project

Create a new Expo project using the TypeScript template:

```bash
npx create-expo-app@latest my-app --template blank-typescript
```

Or, if you are using a specific Expo SDK template:

```bash
npx create-expo-app@latest my-app --template default@sdk-55
```

Move into the project folder:

```bash
cd my-app
```

---

# Step 2: Install Expo SQLite

```bash
npx expo install expo-sqlite
```

Expo SQLite allows your app to create and manage a local SQLite database.

---

# Step 3: Install Drizzle Packages

Install Drizzle ORM:

```bash
npm install drizzle-orm
```

Install Drizzle Kit as a development dependency:

```bash
npm install -D drizzle-kit
```

---

# Step 4: Create Project Folder Structure

Your project structure should look like this:

```bash
📦 project-root
├── assets
├── db
│   └── schema.ts
├── drizzle
├── app.json
├── App.tsx
├── babel.config.js
├── drizzle.config.ts
├── metro.config.js
├── package.json
└── tsconfig.json
```

The `db/schema.ts` file will contain your table definitions.

The `drizzle` folder will contain generated migration files.

---

# Step 5: Create Database Schema

Create this file:

```bash
db/schema.ts
```

Add the users table:

```ts
import { int, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const usersTable = sqliteTable("users_table", {
  id: int().primaryKey({ autoIncrement: true }),
  name: text().notNull(),
  age: int().notNull(),
  email: text().notNull().unique(),
});
```

This creates a `users_table` with:

* `id`
* `name`
* `age`
* `email`

The `email` field must be unique.

---

# Step 6: Create Drizzle Config

Create this file in the root folder:

```bash
drizzle.config.ts
```

Add:

```ts
import { defineConfig } from "drizzle-kit";

export default defineConfig({
  dialect: "sqlite",
  driver: "expo",
  schema: "./db/schema.ts",
  out: "./drizzle",
});
```

This tells Drizzle:

* Which database type you are using
* Where your schema file is located
* Where migration files should be generated

---

# Step 7: Setup Metro Config

Create this file in the root folder:

```bash
metro.config.js
```

Add:

```js
const { getDefaultConfig } = require("expo/metro-config");

const config = getDefaultConfig(__dirname);

config.resolver.sourceExts.push("sql");

module.exports = config;
```

This allows Metro bundler to understand `.sql` migration files.

---

# Step 8: Setup Babel Config

Install required Babel packages:

```bash
npx expo install babel-preset-expo
npm install -D babel-plugin-inline-import

npx expo install babel-preset-expo
```

Create or update:

```bash
babel.config.js
```

Add:

```js
module.exports = function (api) {
  api.cache(true);

  return {
    presets: ["babel-preset-expo"],
    plugins: [["inline-import", { extensions: [".sql"] }]],
  };
};
```

This allows SQL migration files to be imported properly.

---

# Step 9: Generate Migration Files

Run:

```bash
npx drizzle-kit generate
```

After running this command, Drizzle will create migration files inside the `drizzle` folder.

Example:

```bash
drizzle
├── 0000_initial.sql
├── migrations.js
└── meta
```

---

# Step 10: Connect Drizzle with Expo SQLite

Inside `App.tsx`, connect Expo SQLite with Drizzle:

```tsx
import { Text, View } from "react-native";
import * as SQLite from "expo-sqlite";
import { useEffect, useState } from "react";
import { drizzle } from "drizzle-orm/expo-sqlite";
import { useMigrations } from "drizzle-orm/expo-sqlite/migrator";

import { usersTable } from "./db/schema";
import migrations from "./drizzle/migrations";

const expoDb = SQLite.openDatabaseSync("db.db");
const db = drizzle(expoDb);

export default function App() {
  const { success, error } = useMigrations(db, migrations);

  const [items, setItems] = useState<
    typeof usersTable.$inferSelect[] | null
  >(null);

  useEffect(() => {
    if (!success) return;

    async function loadUsers() {
      await db.delete(usersTable);

      await db.insert(usersTable).values({
        name: "John",
        age: 30,
        email: "john@example.com",
      });

      const users = await db.select().from(usersTable);

      setItems(users);
    }

    loadUsers();
  }, [success]);

  if (error) {
    return (
      <View>
        <Text>Migration error: {error.message}</Text>
      </View>
    );
  }

  if (!success) {
    return (
      <View>
        <Text>Migration is in progress...</Text>
      </View>
    );
  }

  if (!items || items.length === 0) {
    return (
      <View>
        <Text>Empty</Text>
      </View>
    );
  }

  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {items.map((item) => (
        <Text key={item.id}>{item.email}</Text>
      ))}
    </View>
  );
}
```

---

# Step 11: Run the App

For iOS:

```bash
npx expo run:ios
```

For Android:

```bash
npx expo run:android
```

Or start Expo:

```bash
npx expo start -c
```

---

# Important Notes

If you are using Expo Router and your screen file is inside the `app` folder, update import paths based on your folder structure.

Example:

```ts
import { usersTable } from "../../db/schema";
import migrations from "../../drizzle/migrations";
```

If you get this error:

```bash
Cannot find module babel-preset-expo
```

Run:

```bash
npm install -D babel-preset-expo
```

If you get this error:

```bash
Cannot find module babel-plugin-inline-import
```

Run:

```bash
npm install -D babel-plugin-inline-import
```

If Metro shows old errors, clear cache:

```bash
npx expo start -c
```

---

# Summary

In this setup:

* `expo-sqlite` creates the local SQLite database
* `drizzle-orm` helps write type-safe queries
* `drizzle-kit` generates migration files
* `useMigrations()` applies migrations when the app starts
* The app inserts and reads users from the local database
