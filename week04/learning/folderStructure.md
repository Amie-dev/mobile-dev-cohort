```bash
📦 project-root
├── app
│   ├── _layout.tsx
│   ├── index.tsx
│   │
│   ├── users
│   │   ├── index.tsx
│   │   ├── create.tsx
│   │   └── details.tsx
│   │
│   ├── posts
│   │   ├── index.tsx
│   │   ├── create.tsx
│   │   └── details.tsx
│   │
│   └── products
│       ├── index.tsx
│       ├── create.tsx
│       └── details.tsx
│
├── db
│   ├── index.ts
│   ├── init.ts
│   ├── schema.ts
│   │
│   ├── queries
│   │   ├── users.ts
│   │   ├── posts.ts
│   │   ├── products.ts
│   │   └── todos.ts
│   │
│   └── seed.ts
│
├── drizzle
│   ├── meta
│   ├── migrations.js
│   ├── 0000_initial.sql
│   └── 0001_update.sql
│
├── components
│   ├── ui
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   ├── Input.tsx
│   │   └── Loader.tsx
│   │
│   ├── users
│   │   ├── UserCard.tsx
│   │   └── UserForm.tsx
│   │
│   ├── posts
│   │   ├── PostCard.tsx
│   │   └── PostForm.tsx
│   │
│   └── products
│       ├── ProductCard.tsx
│       └── ProductForm.tsx
│
├── hooks
│   ├── useUsers.ts
│   ├── usePosts.ts
│   ├── useProducts.ts
│   └── useTodos.ts
│
├── constants
│   ├── colors.ts
│   ├── dummyData.ts
│   └── config.ts
│
├── utils
│   ├── helpers.ts
│   ├── formatDate.ts
│   └── logger.ts
│
├── assets
│   ├── images
│   ├── icons
│   └── fonts
│
├── metro.config.js
├── babel.config.js
├── drizzle.config.ts
├── tsconfig.json
├── package.json
└── app.json
```

### Folder Purpose

#### `db/`

Database related files.

```bash
db/index.ts
```

Database connection.

```bash
db/init.ts
```

Create tables if not exists.

```bash
db/schema.ts
```

All Drizzle table schemas.

```bash
db/queries/`
```

Reusable DB operations.

Example:

```ts
getUsers()
createUser()
deletePost()
updateTodo()
```

---

#### `drizzle/`

Generated migration files.

```bash
npx drizzle-kit generate
```

creates files here.

---

#### `app/`

Expo Router screens.

---

#### `components/`

Reusable UI components.

---

#### `hooks/`

Reusable logic using React hooks.

---

#### `utils/`

Helper functions.

---

#### `constants/`

Colors, configs, dummy data, enums.

---

# Example Real Flow

```txt
Screen
 ↓
Hook
 ↓
Query Function
 ↓
Drizzle ORM
 ↓
SQLite Database
```

Example:

```txt
users/index.tsx
   ↓
useUsers.ts
   ↓
queries/users.ts
   ↓
db.insert(usersTable)
   ↓
SQLite
```
