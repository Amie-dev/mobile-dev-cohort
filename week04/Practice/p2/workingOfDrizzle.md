Your table is being created by this line:

```ts
const { success, error } = useMigrations(db, migrations);
```

This runs all SQL files inside:

```bash
drizzle/
```

Especially this generated migration file:

```sql
CREATE TABLE `users_table` (
  `id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
  `name` text NOT NULL,
  `age` integer NOT NULL,
  `email` text NOT NULL
);
```

---

# Full Flow Explanation

## 1. Schema Definition

This file only defines structure in TypeScript:

```ts
import { int, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const usersTable = sqliteTable("users_table", {
  id: int().primaryKey({ autoIncrement: true }),
  name: text().notNull(),
  age: int().notNull(),
  email: text().notNull().unique(),
});
```

This does NOT create table yet.

It only says:

> "I want a table called users_table with these columns."

---

# 2. Generate Migration

When you run:

```bash
npx drizzle-kit generate
```

Drizzle reads schema.ts and creates SQL file:

```sql
CREATE TABLE users_table ...
```

inside:

```bash
drizzle/0000_xxx.sql
```

---

# 3. Migration Runtime

This line:

```ts
useMigrations(db, migrations)
```

runs those SQL files on app startup.

So internally it does something like:

```sql
CREATE TABLE users_table ...
```

That is where actual table creation happens.

---

# 4. Open Database

This line:

```ts
const expoDb = SQLite.openDatabaseSync("db.db");
```

creates/opens SQLite database file:

```bash
db.db
```

---

# 5. Drizzle Connection

This line:

```ts
const db = drizzle(expoDb)
```

connects Drizzle ORM to SQLite database.

Now Drizzle can run:

* insert
* select
* update
* delete

queries.

---

# 6. Insert Data

This button:

```ts
await db.insert(usersTable).values({
  name: `User ${randomId}`,
  age: 20,
  email: `user@test.com`,
});
```

creates SQL like:

```sql
INSERT INTO users_table ...
```

---

# 7. Fetch Data

This:

```ts
await db.select().from(usersTable);
```

creates SQL:

```sql
SELECT * FROM users_table;
```

---

# 8. Why You Got Migration Error Earlier

Because:

```sql
CREATE TABLE users_table
```

ran again while table already existed.

So SQLite said:

```bash
table users_table already exists
```

---

# Important Concept

## schema.ts

Only TypeScript schema definition.

## drizzle/*.sql

Real SQL migration files.

## useMigrations()

Actually runs SQL and creates tables.

---

# Visual Flow

```bash
schema.ts
   ↓
drizzle-kit generate
   ↓
creates SQL migration
   ↓
useMigrations()
   ↓
SQL runs
   ↓
table created in SQLite
   ↓
db.insert / db.select works
```
