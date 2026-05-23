# 🚀 Week 04 — Day 07

## 📅 Date: 23-05-2026

# 🌐 Networking & Backend Integrations in Expo / React Native

---

# 📖 Introduction

Modern mobile applications are not standalone anymore.

Most apps today connect with:

* Databases
* Authentication systems
* Cloud storage
* Payment gateways
* External APIs
* Real-time services

This communication process is called:

# 🌐 Networking

Networking allows a mobile app to:

✅ Fetch data
✅ Send data
✅ Authenticate users
✅ Upload files
✅ Receive live updates

---

# 🧠 What is Backend?

Backend = Server-side system that handles:

* Database operations
* Authentication
* Business logic
* APIs
* File storage
* Security

---

# 🏗️ Types of Backend in Expo / React Native

| Type             | Meaning                     |
| ---------------- | --------------------------- |
| Internal Backend | Backend inside Expo project |
| External Backend | Separate backend server     |

---

# 1️⃣ Internal Backend (Expo API Routes)

Expo Router supports API routes.

This allows you to create backend endpoints directly inside the Expo project.

Official Expo documentation explains that API route files use the `+api.ts` or `+api.js` naming convention and support HTTP methods like `GET`, `POST`, `PUT`, and `DELETE`.

---

# 📁 File Naming Convention

## Pattern

```txt
filename+api.ts
```

or

```txt
filename+api.js
```

---

# 📂 Example Folder Structure

```txt
app/
│
├── index.tsx
├── users+api.ts
├── login+api.ts
└── products+api.ts
```

---

# 🔗 Generated Routes

| File            | API Route |
| --------------- | --------- |
| users+api.ts    | /users    |
| login+api.ts    | /login    |
| products+api.ts | /products |

---

# ✅ Example API Route

```ts
// app/users+api.ts

export async function GET() {
  return Response.json({
    success: true,
    users: [
      {
        id: 1,
        name: "Aminul",
      },
    ],
  });
}
```

---

# 🔥 Accessing the API

```txt
http://localhost:8081/users
```

---

# 🧠 Supported HTTP Methods

| Method | Purpose             |
| ------ | ------------------- |
| GET    | Fetch data          |
| POST   | Create data         |
| PUT    | Update full data    |
| PATCH  | Update partial data |
| DELETE | Remove data         |

---

# ✅ POST Example

```ts
export async function POST(request: Request) {
  const body = await request.json();

  return Response.json({
    message: "User created",
    data: body,
  });
}
```

---

# 2️⃣ External Backend

External backend means a completely separate server.

Usually built using:

* Node.js + Express
* NestJS
* Django
* Laravel
* Spring Boot
* Go
* .NET

---

# 📂 Example Architecture

```txt
Mobile App (Expo)
        ↓
External Backend API
        ↓
Database
```

---

# 🔥 Example External Backend URL

```txt
https://api.myapp.com/users
```

or

```txt
http://192.168.0.105:5000/users
```

---

# ✅ Fetch Data Example

```ts
const getUsers = async () => {
  const response = await fetch(
    "https://api.example.com/users"
  );

  const data = await response.json();

  console.log(data);
};
```

---

# 🗄️ Database Integrations

Backend connects with databases.

Common databases:

| Database   | Type        |
| ---------- | ----------- |
| MongoDB    | NoSQL       |
| PostgreSQL | SQL         |
| MySQL      | SQL         |
| Firebase   | Cloud NoSQL |
| Supabase   | PostgreSQL  |
| SQLite     | Local DB    |

---

# 📦 Backend Responsibilities

Backend handles:

✅ Authentication
✅ Authorization
✅ Database queries
✅ File uploads
✅ Payment processing
✅ Business logic
✅ Security
✅ Validation

---

# 🔥 Example Flow

```txt
Mobile App
    ↓
Backend API
    ↓
Database
    ↓
Response back to app
```

---

# 3️⃣ Combining Internal + External Backend

You can combine both systems.

---

# 🧠 Example

## Internal Backend

Used for:

* Mock APIs
* Local testing
* Simple backend logic

## External Backend

Used for:

* Production database
* Authentication
* Payments
* Cloud storage

---

# 🔥 Hybrid Architecture

```txt
Expo App
   ↓
Expo API Routes
   ↓
External Backend
   ↓
Database
```

---

# ✅ Example

```ts
// app/products+api.ts

export async function GET() {
  const response = await fetch(
    "https://api.myserver.com/products"
  );

  const data = await response.json();

  return Response.json(data);
}
```

---

# 4️⃣ Why localhost Does NOT Work on Physical Devices?

This is one of the MOST important concepts in mobile development.

---

# ❌ Problem

Developers often use:

```txt
http://localhost:5000
```

Works on laptop/browser ✅

But fails on physical phone ❌

---

# 🧠 Why?

Because:

# 📌 localhost is device-specific

---

# 💻 On Laptop

```txt
localhost = YOUR LAPTOP
```

---

# 📱 On Phone

```txt
localhost = PHONE ITSELF
```

The phone tries to find backend inside the phone.

But backend is running on laptop.

So request fails.

---

# ❌ Wrong Setup

```txt
Phone → localhost:5000
```

Phone searches its own localhost.

No backend exists there.

---

# ✅ Correct Solution

Use your laptop’s local IP address.

---

# 🖥️ Find Your IP Address

## Linux / Ubuntu

```bash
ip addr
```

or

```bash
hostname -I
```

---

# Example Output

```txt
192.168.0.105
```

---

# ✅ Use This Instead

```txt
http://192.168.0.105:5000
```

---

# 🔥 Important Requirement

Both devices must be connected to:

# ✅ Same WiFi Network

---

# 📂 Example

| Device         | IP            |
| -------------- | ------------- |
| Laptop Backend | 192.168.0.105 |
| Phone          | Same WiFi     |

---

# ✅ Fetch Example

```ts
const response = await fetch(
  "http://192.168.0.105:5000/api/users"
);
```

---

# ⚠️ Common Errors

| Error                  | Reason               |
| ---------------------- | -------------------- |
| Network request failed | Wrong IP             |
| Timeout                | Different WiFi       |
| Connection refused     | Backend not running  |
| CORS error             | Backend CORS blocked |

---

# 🔥 Enable CORS in Express

```js
import cors from "cors";

app.use(cors());
```

---

# 🔐 Security Note

Never expose:

❌ Database passwords
❌ JWT secrets
❌ API keys

inside frontend/mobile app.

Sensitive logic always stays in backend.

---

# 🧠 Real Production Flow

```txt
React Native App
        ↓
HTTPS API
        ↓
Backend Server
        ↓
Database
```

---

# 🚀 Important Networking Concepts

| Concept     | Meaning                |
| ----------- | ---------------------- |
| API         | Communication endpoint |
| JSON        | Data format            |
| HTTP        | Communication protocol |
| HTTPS       | Secure HTTP            |
| REST API    | Standard API structure |
| Headers     | Extra request info     |
| Token       | Authentication key     |
| Status Code | Request result         |

---

# 📌 Common HTTP Status Codes

| Code | Meaning      |
| ---- | ------------ |
| 200  | Success      |
| 201  | Created      |
| 400  | Bad request  |
| 401  | Unauthorized |
| 403  | Forbidden    |
| 404  | Not found    |
| 500  | Server error |

---

# 🧠 Summary

Today we learned:

✅ Networking basics

✅ Backend integrations

✅ Expo API routes

✅ Internal backend

✅ External backend

✅ Database integrations

✅ Combining internal + external backend

✅ Why localhost fails on phones

✅ Using local IP instead of localhost

✅ Mobile networking architecture

---

# 🎯 Final Conclusion

Networking is the backbone of modern mobile applications.

Without backend integration:

* No authentication
* No real-time data
* No cloud storage
* No APIs
* No production apps

Understanding:

✅ APIs

✅ Backend systems

✅ Networking flow

✅ localhost vs IP

is essential for becoming a professional React Native developer.
