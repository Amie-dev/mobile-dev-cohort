# Part-1 API Fundamentals

**What is an API?**

API stands for **Application Programming Interface**. Think of it as a waiter in a restaurant — your app (the customer) doesn't go into the kitchen itself. It tells the waiter (the API) what it wants, the waiter goes to the kitchen (the server/database), and brings back the food (data).

🍽️ Your Expo app → makes a request → API endpoint → talks to database → sends data back → your app displays it.

In practical terms, an API is a set of **URLs** (called endpoints) that your app can call to read, create, update, or delete data.

### REST API — the standard you'll use

REST (Representational State Transfer) is the most common API style. It uses standard HTTP methods and predictable URL patterns. Every resource (users, posts, products) has its own URL.

- Stateless
- Predictable URLs
- Standard HTTP verbs
- JSON responses

A typical REST API for a blog might look like:

```abap
# GET all posts
GET  /api/posts

# GET a single post by ID
GET  /api/posts/42

# Create a new post
POST /api/posts

# Update post 42
PUT  /api/posts/42

# Delete post 42
DELETE /api/posts/42
```

### HTTP Methods — the verbs

| Method | Purpose | Sends Body? |
| --- | --- | --- |
| `GET` | Read / fetch data | No |
| `POST` | Create a new resource | Yes |
| `PUT` | Replace entire resource | Yes |
| `PATCH` | Update part of a resource | Yes |
| `DELETE` | Remove a resource | No |

### How your Expo app calls an API

Expo uses the standard browser `fetch()` API — same syntax as web development. React Native ships it built-in, no library needed.

```abap
// Basic GET request in any Expo component
const response = await fetch('https://api.example.com/users');
const data = await response.json();
console.log(data); // → array of users

// POST request (sending data)
const res = await fetch('https://api.example.com/users', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ name: 'Arjun', email: 'arjun@x.com' }),
});
const newUser = await res.json();
```

---

### HTTP Status Codes — what the server is saying

```abap
200 OK           → success, here's your data
201 Created      → resource created successfully
400 Bad Request  → you sent something wrong
401 Unauthorized → you need to be logged in
404 Not Found    → that resource doesn't exist
500 Server Error → something broke on the server
```

Always check `response.ok` (true for 200–299) or `response.status` before reading the body.

# Part-2 API Routes in Expo.

### What are Expo API Routes?

Introduced in Expo Router v2 and **stabilized in SDK 55 (expo-router v4)**, API Routes let you write server-side code *inside your Expo project*  no separate Node.js/Express server needed. They run on a Node.js server, not on the device.

> Think of it like Next.js API routes, but for Expo. Your `app/` folder has both screens and backend endpoints side by side.
> 

### File naming convention — `+api.ts`

Any file inside `app/` that ends in `+api.ts` (or `+api.js`) becomes a backend API route. It will **never** be shown as a screen.

```abap
app/
├── (tabs)/
│   ├── index.tsx            ← screen
│   └── profile.tsx          ← screen
│
├── api/
│   ├── users+api.ts         ← GET/POST  /api/users
│   ├── users/
│   │   └── [id]+api.ts      ← GET/PUT/DELETE  /api/users/:id
│   └── posts+api.ts         ← GET/POST  /api/posts
│
└── _layout.tsx
```

### Required config in `app.json`

You need to set the `output` mode to `"server"` to enable API routes.

```json
{
  "expo": {
    "name": "MyApp",
    "slug": "my-app",
    "web": {
      "bundler": "metro",
      "output": "server"
    },
    "plugins": ["expo-router"],
    "experiments": {
      "typedRoutes": true
    }
  }
}
```

The key part is `"output": "server"` under `"web"`. Without this, `+api.ts` files are ignored.

### Writing your first API route

Each handler exports named functions matching the HTTP method. The function receives an `ExpoRequest` and returns an `ExpoResponse`.

```tsx
// app/api/hello+api.ts
import { ExpoRequest, ExpoResponse } from 'expo-router/server';

// Handles GET /api/hello
export function GET(request: ExpoRequest): ExpoResponse {
  return ExpoResponse.json({
    message: 'Hello from Expo API Routes!',
    timestamp: new Date().toISOString(),
  });
}

// Handles POST /api/hello
export async function POST(request: ExpoRequest): Promise<ExpoResponse> {
  const body = await request.json();
  return ExpoResponse.json(
    { received: body },
    { status: 201 } // second arg = response options
  );
}
```

### Dynamic routes — `[id]+api.ts`

Use square brackets for dynamic segments, same as file-based routing for screens. Params come in as a second argument.

```tsx
// app/api/users/[id]+api.ts
import { ExpoRequest, ExpoResponse } from 'expo-router/server';

export function GET(
  request: ExpoRequest,
  { params }: { params: { id: string } }
): ExpoResponse {
  const { id } = params;
  // fetch user with this id from DB...
  return ExpoResponse.json({ userId: id });
}
```

# PART-3 CRUD Operations

### Which database to use with Expo API Routes?

Since API routes run on a Node.js server (not on the device), you can use any JS-compatible database. Some are much more convenient for Expo projects:

**Best choices for Expo API Routes:**

| Database | Type | Notes |
| --- | --- | --- |
| Turso (LibSQL) | SQLite over HTTP | Free tier, serverless-friendly |
| Neon | Postgres | Serverless, HTTP-native driver |
| PlanetScale | MySQL | Serverless, branching model |
| Supabase | Postgres | Auth + realtime + storage included |

<aside>
💡

Avoid traditional MySQL/Postgres with long-lived connection pools — API routes can be serverless and connections won't persist between requests. Use HTTP-native or serverless-friendly drivers.

</aside>

We'll use **Turso** below — it's SQLite via HTTP, has a generous free tier, and `@libsql/client` works perfectly in Expo's server environment.

### Setup — install and configure Turso

**Step 1** — Install the client:

```bash
npm install @libsql/client`
```

**Step 2** — Create a `.env` file in your project root (Expo reads it automatically):

bash

```bash
# .env
TURSO_DATABASE_URL=libsql://your-db-name.turso.io
TURSO_AUTH_TOKEN=your-auth-token-here
```

**Step 3** — Create a shared DB client:

ts

```tsx

import { createClient } from '@libsql/client';

export const db = createClient({
  url: process.env.TURSO_DATABASE_URL!,
  authToken: process.env.TURSO_AUTH_TOKEN!,
});
```

---

### Full CRUD — `app/api/users+api.ts`

Handles `GET` (list all) and `POST` (create one) for `/api/users`:

ts

```tsx
import { ExpoRequest, ExpoResponse } from 'expo-router/server';
import { db } from '../../lib/db';

// GET /api/users → returns all users
export async function GET(): Promise<ExpoResponse> {
  try {
    const result = await db.execute('SELECT * FROM users ORDER BY created_at DESC');
    return ExpoResponse.json({ users: result.rows });
  } catch (e) {
    return ExpoResponse.json({ error: 'Failed to fetch users' }, { status: 500 });
  }
}

// POST /api/users → create a new user
export async function POST(request: ExpoRequest): Promise<ExpoResponse> {
  const { name, email } = await request.json();

  if (!name || !email) {
    return ExpoResponse.json(
      { error: 'name and email are required' },
      { status: 400 }
    );
  }

  try {
    const result = await db.execute({
      sql: 'INSERT INTO users (name, email) VALUES (?, ?)',
      args: [name, email],
    });
    return ExpoResponse.json(
      { id: result.lastInsertRowid, name, email },
      { status: 201 }
    );
  } catch (e) {
    return ExpoResponse.json({ error: 'Email already exists' }, { status: 409 });
  }
}
```

---

### Full CRUD — `app/api/users/[id]+api.ts`

Handles `GET` (single), `PATCH` (partial update), and `DELETE` for `/api/users/:id`:

ts

```tsx
import { ExpoRequest, ExpoResponse } from 'expo-router/server';
import { db } from '../../../lib/db';

type Ctx = { params: { id: string } };

// GET /api/users/42
export async function GET(_req: ExpoRequest, { params }: Ctx) {
  const result = await db.execute({
    sql: 'SELECT * FROM users WHERE id = ?',
    args: [params.id],
  });
  if (result.rows.length === 0)
    return ExpoResponse.json({ error: 'User not found' }, { status: 404 });
  return ExpoResponse.json(result.rows[0]);
}

// PATCH /api/users/42 → partial update
export async function PATCH(req: ExpoRequest, { params }: Ctx) {
  const body = await req.json(); // e.g. { name: "New Name" }
  const fields = Object.keys(body)
    .map((k) => `${k} = ?`)
    .join(', ');
  await db.execute({
    sql: `UPDATE users SET ${fields} WHERE id = ?`,
    args: [...Object.values(body), params.id],
  });
  return ExpoResponse.json({ updated: true });
}

// DELETE /api/users/42
export async function DELETE(_req: ExpoRequest, { params }: Ctx) {
  await db.execute({
    sql: 'DELETE FROM users WHERE id = ?',
    args: [params.id],
  });
  return ExpoResponse.json({ deleted: true });
}
```

---

## Part 4 — Connecting Frontend to Backend

### Calling your Expo API Routes from the frontend

Since both your screens and API routes live in the same project, you can use **relative paths** — Expo Router handles the base URL automatically.

```tsx
// app/(tabs)/index.tsx
import { useState, useEffect } from 'react';
import { View, Text, FlatList } from 'react-native';

export default function UsersScreen() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Relative path — works on both web and native
    fetch('/api/users')
      .then(res => res.json())
      .then(data => setUsers(data.users));
  }, []);

  return (
    <FlatList
      data={users}
      keyExtractor={item => item.id.toString()}
      renderItem={({ item }) => <Text>{item.name}</Text>}
    />
  );
}
```

---

### Creating a Complete sample app

```tsx
// app/(tabs)/index.tsx
import { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
  Alert,
} from 'react-native';

type User = {
  id: number;
  name: string;
  email: string;
};

export default function UsersScreen() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  // ── GET all users ──────────────────────────────
  async function fetchUsers() {
    try {
      setLoading(true);
      const res = await fetch('/api/users');
      const data = await res.json();
      setUsers(data.users);
    } catch (e) {
      Alert.alert('Error', 'Failed to load users');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchUsers();
  }, []);

  // ── POST create user ───────────────────────────
  async function createUser() {
    if (!name.trim() || !email.trim()) {
      Alert.alert('Validation', 'Name and email are required');
      return;
    }

    try {
      setCreating(true);
      const res = await fetch('/api/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email }),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error);
      }

      const newUser: User = await res.json();
      setUsers(prev => [newUser, ...prev]); // add to top of list
      setName('');
      setEmail('');
    } catch (e: any) {
      Alert.alert('Error', e.message || 'Failed to create user');
    } finally {
      setCreating(false);
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Users</Text>

      {/* ── Form ── */}
      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="Name"
          value={name}
          onChangeText={setName}
          autoCapitalize="words"
        />
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <TouchableOpacity
          style={[styles.button, creating && styles.buttonDisabled]}
          onPress={createUser}
          disabled={creating}
        >
          {creating ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.buttonText}>Add User</Text>
          )}
        </TouchableOpacity>
      </View>

      {/* ── List ── */}
      {loading ? (
        <ActivityIndicator style={{ marginTop: 32 }} />
      ) : (
        <FlatList
          data={users}
          keyExtractor={item => item.id.toString()}
          contentContainerStyle={styles.list}
          ListEmptyComponent={
            <Text style={styles.empty}>No users yet. Add one above.</Text>
          }
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Text style={styles.userName}>{item.name}</Text>
              <Text style={styles.userEmail}>{item.email}</Text>
            </View>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container:      { flex: 1, backgroundColor: '#f5f5f5' },
  heading:        { fontSize: 24, fontWeight: '600', padding: 20, paddingBottom: 0 },
  form:           { backgroundColor: '#fff', margin: 16, borderRadius: 12, padding: 16, gap: 10 },
  input:          { borderWidth: 1, borderColor: '#e0e0e0', borderRadius: 8, padding: 12, fontSize: 15 },
  button:         { backgroundColor: '#4f46e5', borderRadius: 8, padding: 14, alignItems: 'center' },
  buttonDisabled: { opacity: 0.6 },
  buttonText:     { color: '#fff', fontWeight: '600', fontSize: 15 },
  list:           { padding: 16, gap: 10 },
  card:           { backgroundColor: '#fff', borderRadius: 10, padding: 14 },
  userName:       { fontSize: 15, fontWeight: '600' },
  userEmail:      { fontSize: 13, color: '#666', marginTop: 2 },
  empty:          { textAlign: 'center', color: '#999', marginTop: 40 },
});
```

---

### Part 5 — Bonus: Node.js Backend + IP Address

### Why `localhost` does NOT work on a physical device

`localhost` means "this device itself." On your laptop, `localhost:3000` points to your laptop. But when your **phone** uses `localhost:3000`, it points to the phone itself — which has no server running.

> Think of `localhost` like saying "my house." Every device has its own "my house." A phone can't walk into your laptop's house — it needs the actual street address (your LAN IP).
> 

```tsx
// ❌ This will NEVER work on a physical device
fetch('http://localhost:3000/api/users')

// ✅ Use your machine's LAN IP instead
fetch('http://192.168.1.42:3000/api/users')
```

## How to find your LAN IP address

```bash
# macOS / Linux
ifconfig | grep "inet " | grep -v 127.0.0.1
# Look for something like: inet 192.168.1.42

# Windows
ipconfig
# Look for: IPv4 Address . . . . . : 192.168.1.42

# Or just run your Expo dev server — it shows the IP:
npx expo start
# › Metro waiting on exp://192.168.1.42:8081
```

<aside>
💡

Your phone and laptop must be on the **same Wi-Fi network**. Corporate networks with client isolation will block this — use a mobile hotspot instead.

</aside>

### Managing the URL with environment variables

Don't hardcode the IP. Use Expo's env support:

```bash
# .env.local (not committed to git)
EXPO_PUBLIC_API_URL=http://192.168.1.42:3000

# .env.production
EXPO_PUBLIC_API_URL=https://api.yourapp.com
```

```tsx
// In your code
const API_URL = process.env.EXPO_PUBLIC_API_URL;

fetch(`${API_URL}/api/users`)
  .then(res => res.json())
  .then(data => console.log(data));
The `EXPO_PUBLIC_` prefix is required — it tells Expo to expose the variable to the client bundle. Variables without this prefix are server-only and won't be accessible in your app code.

```

The `EXPO_PUBLIC_` prefix is required — it tells Expo to expose the variable to the client bundle. Variables without this prefix are server-only and won't be accessible in your app code.

### CORS — the thing that bites everyone

When your Expo web version (running in a browser) calls a separate backend, browsers enforce CORS. Your Express server needs to explicitly allow it:

```tsx
// Your Express server
import cors from 'cors';

app.use(cors({
  origin: [
    'http://localhost:8081',    // Expo web dev
    'https://yourapp.com',     // production
  ],
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
}));

// CORS is NOT an issue for native iOS/Android —
// only browsers enforce it. Your React Native app is fine.
```