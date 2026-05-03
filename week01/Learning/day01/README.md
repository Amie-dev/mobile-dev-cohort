# 🚀 Day 01 — React Refresher (Detailed Notes)

📅 Date: **02-05-2026**

---

# 🎯 Cohort Planning (How Whole Cohort Will Go)

This mobile dev cohort is structured step by step:

### 🔹 Phase Flow

1. **React Refresher (Current Phase)**
2. React Native Basics
3. UI Building (Real Apps)
4. State Management
5. APIs & Backend Integration
6. Deployment & Production Apps

---

## ✅ What To Do

* Practice daily (coding > watching)
* Build small components
* Understand concepts deeply (not just copy)
* Write clean and reusable code
* Follow folder structure

---

## ❌ What NOT To Do

* Don’t skip fundamentals ❌
* Don’t copy-paste blindly ❌
* Don’t write everything in one file ❌
* Don’t ignore errors ❌
* Don’t rush to advanced topics ❌

---

# 🤔 Why Do We Need React?

## ❌ Traditional Approach Problems

* Full page reload on every action
* Slow performance
* Hard to manage UI updates
* Code becomes messy as app grows

---

## ⚡ Modern Application (React)

* Fast UI updates
* Component-based structure
* Better performance (Virtual DOM)
* Smooth user experience

---

# 🌐 Traditional vs Modern Applications

| Feature   | Traditional App  | Modern (React) |
| --------- | ---------------- | -------------- |
| Reload    | Full page reload | No reload      |
| Speed     | Slow             | Fast           |
| UI Update | Manual           | Automatic      |
| Structure | Messy            | Organized      |

---

# 🔄 React Refresher

---

## 🔹 What is React?

React is a **JavaScript library** used to build **User Interfaces (UI)**.

### 💡 Key Points:

* Developed by Facebook
* Component-based
* Uses Virtual DOM
* Declarative UI

---

## 🔹 Library vs Framework

| Feature     | Library (React) | Framework (Angular) |
| ----------- | --------------- | ------------------- |
| Control     | Developer       | Framework           |
| Flexibility | High            | Medium              |
| Scope       | UI only         | Full solution       |

👉 React = **Library** (only handles UI)

---

# ⚡ What is Vite?

Vite is a **modern frontend build tool**

### 🔹 Why Vite?

* Super fast ⚡
* Instant server start
* Hot reload (HMR)
* Lightweight

---

# 🛠 Setup React with Vite

## 🔹 Step 1: Create Project

```bash id="c1"
npm create vite@latest
```

👉 Follow prompts:

* Project name
* Framework: React
* Variant: JavaScript / TypeScript

---

## 🔹 Step 2: Install Dependencies

```bash id="c2"
cd project-name
npm install
```

---

## 🔹 Step 3: Run Project

```bash id="c3"
npm run dev
```

👉 Open in browser:

```id="c4"
http://localhost:5173
```

---

# 📁 Default Project Structure (Vite + React)

```bash id="c5"
project/
 ├── node_modules/
 ├── public/
 │    └── vite.svg
 │
 ├── src/
 │    ├── assets/
 │    ├── App.jsx
 │    ├── main.jsx
 │    ├── index.css
 │
 ├── index.html
 ├── package.json
 ├── vite.config.js
```

---

## 🔍 Important Files

### 📄 main.jsx

* Entry point
* Connects React to DOM

```js id="c6"
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
```

---

### 📄 App.jsx

* Main component

---

### 📄 index.html

* Root HTML file

---

### 📄 package.json

* Dependencies & scripts

---

# 🧱 Component-Based Architecture

React apps are built using **small reusable components**

### Example:

```bash id="c7"
App
 ├── Header
 ├── ProductCard
 ├── Footer
```

---

## ✅ Benefits:

* Reusability
* Clean code
* Easy maintenance

---

# ⚙️ Functional Components

Modern React uses **functional components**

```jsx id="c8"
function Header() {
  return <h1>Hello World</h1>;
}
```

---

## ✅ Why Functional Components?

* Simple syntax
* Supports hooks
* Easier to manage

---

# ⚡ SPA (Single Page Application)

SPA = **Single Page Application**

### 🔹 How it works:

* Only one HTML page
* React updates UI dynamically

---

## ⚡ Benefits:

* Fast navigation
* No full reload
* Better user experience

---

# 🧠 Summary

* React solves traditional UI problems
* It is a **library**, not a framework
* Vite is used for fast setup & development
* React apps use **component-based architecture**
* Functional components are modern standard
* SPA provides smooth UX

---

# 🧪 Practice Tasks

## ✅ Task 1

* Create new React app using Vite

## ✅ Task 2

* Create:

  * Header component
  * Footer component

## ✅ Task 3

* Understand file structure

---

# 🔥 Pro Tip (For You)

Since you're already working on:

* React Native
* Complex UI

👉 Focus on:

* Clean component structure
* Reusability
* Understanding WHY React works

---
