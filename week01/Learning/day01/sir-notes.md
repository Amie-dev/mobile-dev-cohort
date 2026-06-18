### 🚀 What is React.js?

React (or ReactJS) is a **JavaScript library used to build user interfaces (UI)**—especially for web apps where things change frequently (like dashboards, social media feeds, etc.). (GeeksforGeeks)

Instead of writing everything manually with HTML + JS, React lets you break your UI into **small reusable pieces called components**. (react.dev)

👉 Example:

- Navbar → Component
- Button → Component
- Card → Component
- Entire page = combination of components

---

### 🤔 Why do we even need React?

Let’s be real — you *can* build everything using plain JavaScript.

But once your app grows… things get messy **very fast**.

Here’s the actual reason React exists 👇

---

## 1. 🧩 Managing complex UI becomes easy

Without React:

- You manually update DOM (`document.getElementById`, etc.)
- Hard to track what changed

With React:

- You describe **what UI should look like**
- React handles updates automatically

👉 This is called **declarative UI** (React)

---

## 2. 🔁 Reusable components = less code

Instead of copying code again and again:

- Create one component → reuse everywhere

Example:

```jsx
<Button text="Login" />
<Button text="Signup" />
```

👉 Saves time + keeps code clean

---

## 3. ⚡ Performance (Virtual DOM magic)

React uses something called **Virtual DOM**:

- Creates a copy of real DOM in memory
- Compares changes (diffing)
- Updates only changed parts

👉 Result: Faster UI updates (W3Schools)

---

## 4. 🧠 State management (core superpower)

React lets you manage **state (data)** easily:

- When data changes → UI updates automatically

Example:

```jsx
const [count, setCount] = useState(0);
```

👉 No manual DOM updates needed

---

## 5. 📱 Build modern apps (SPA)

React is perfect for:

- Single Page Applications (SPA)
- Real-time apps (chat, dashboards)

👉 Smooth experience without page reloads (GeeksforGeeks)

---

## 6. 🌍 Huge ecosystem

React is not just a library—it’s an ecosystem:

- Next.js → fullstack apps
- React Native → mobile apps
- Thousands of libraries

---

## 🧠 Simple Analogy

Think of building UI like LEGO:

- Vanilla JS → build everything from scratch every time
- React → reusable LEGO blocks

---

## ⚠️ Honest Reality (Important)

React is **not mandatory**:

- Small apps → plain JS is fine
- Overuse → unnecessary complexity

Even modern tools (like React Compiler, frameworks like Astro) are trying to reduce the need for manual optimizations.

---

## 💡 Final One-Line Answer

👉 **React is used because it makes building complex, dynamic UIs easier, faster, and more maintainable.**

---

# Basic Setup of React App

## ⚡ Basic Setup of React App using Vite

Vite is a modern build tool that helps you create React apps **super fast** with minimal setup.

---

### 🛠️ Step-by-step setup

### 1. Create project

```bash
npm create vite@latest my-app
```

### 2. Select options

- Framework → **React**
- Variant → **JavaScript** or **TypeScript**

### 3. Go inside project

```bash
cd my-app
```

### 4. Install dependencies

```bash
npm install
```

### 5. Run project

```bash
npm run dev
```

👉 Your app will start instantly (usually < 1 sec 🚀)

---

### 📁 Project structure (simple)

```
my-app/
 ├── src/
 │   ├── App.jsx
 │   ├── main.jsx
 ├── index.html
 ├── vite.config.js
```

👉 Notice:

- No heavy config
- Clean structure
- Super beginner-friendly

---

## 🤔 Why NOT to use Create React App (CRA)?

Let’s be honest — CRA was good **earlier**, but now it’s kinda outdated.

---

### ❌ 1. Slow startup (big problem)

- CRA uses **Webpack**
- It bundles the whole app before starting

👉 Result: slow dev server

Vite:

- Uses **native ES modules**
- Starts instantly without bundling everything (Medium)

---

### ❌ 2. Slow refresh (bad DX)

- CRA hot reload slows down as project grows
- Vite → near-instant updates

👉 Because Vite only reloads changed files (HMR) (Medium)

---

### ❌ 3. Heavy & outdated setup

- CRA has **hidden config (black box)**
- If you want control → you must “eject” (messy)

👉 Vite:

- Simple config (`vite.config.js`)
- Easy to customize

---

### ❌ 4. Performance issues & maintenance mode

- CRA is now **less preferred / in maintenance mode** (DEV Community)
- Uses older tooling (Webpack-heavy)

👉 Modern devs are moving to Vite

---

### ❌ 5. Slower builds

- CRA builds take longer
- Vite uses **esbuild + Rollup → much faster builds** (Makimo)

---

## ⚡ Quick Comparison

| Feature | Vite | Create React App |
| --- | --- | --- |
| Startup | Instant ⚡ | Slow 🐢 |
| Hot Reload | Very fast | Slower |
| Config | Simple | Hidden / complex |
| Build Speed | Fast | Slower |
| Modern Usage | ✅ Recommended | ❌ Declining |

---

## 🧠 Final Reality (important)

👉 Use Vite for:

- New projects
- Faster development
- Better DX

👉 CRA only if:

- You’re maintaining old projects

---

## 💡 One-line takeaway

👉 **Vite = modern, fast, future**

👉 **CRA = legacy, slow, avoid for new apps**

---

# Folder Structure BreakDown

# 🧱 Basic Folder Structure (Vite + React)

When you create a React app using Vite, you’ll see something like this:

```bash
my-app/
├── node_modules/
├── public/
├── src/
│   ├── App.jsx
│   ├── main.jsx
├── index.html
├── package.json
├── vite.config.js
```

---

## 📂 Root Level Breakdown

### 1. `node_modules/`

- All installed packages live here
- Auto-generated (never touch manually)

---

### 2. `package.json`

- Heart of your project ❤️
- Contains:
    - dependencies
    - scripts (`npm run dev`)
    - project metadata

---

### 3. `vite.config.js`

- Configuration file for Vite
- Used for:
    - plugins
    - aliases
    - build optimization

---

### 4. `index.html` (⚠️ Important difference from CRA)

👉 In Vite, this file is in **root (not public)**

- Entry point of your app
- Contains:

```html
<div id="root"></div>
<script type="module" src="/src/main.jsx"></script>
```

👉 You manually define script entry here (unlike CRA) (Medium)

---

## 📂 `public/` folder

- Static files (not processed by Vite)
- Examples:
    - images
    - favicon
    - robots.txt

👉 These files are served **as-is** (no bundling) (DEV Community)

---

## 📂 `src/` (MOST IMPORTANT)

👉 This is where **actual development happens**

---

### 🔹 1. `main.jsx` (ENTRY POINT)

```jsx
ReactDOM.createRoot(document.getElementById('root')).render(<App />)
```

- Connects React → DOM
- First file that runs
- Renders your app

👉 Think: **starting engine of your app**

---

### 🔹 2. `App.jsx` (ROOT COMPONENT)

```jsx
function App() {
  return <h1>Hello React</h1>
}
```

- Parent of all components
- UI starts from here

👉 Think: **main container of UI**

---

## 🧠 Flow (VERY IMPORTANT FOR INTERVIEW)

```
index.html → main.jsx → App.jsx → Components
```

👉 This is how React app boots

---

# 📘 Components (Short Notes)

## 🧠 What is a Component?

A component is a **JavaScript function that returns UI (JSX)**. (Packt)

👉 It is a **reusable building block of UI**

👉 React apps are made by combining multiple components (React)

---

## 💡 Example

```jsx
function App() {
  return <h1>Hello React</h1>
}
```

---

## ⚡ Why Components?

- Reusability (write once, use many times)
- Better organization
- Easy to scale large apps

👉 React is built on component-based architecture (GitHub)

---

## 🔹 Types

### 1. Functional Component (recommended)

```jsx
function Greeting() {
  return <h1>Hello</h1>
}
```

### 2. Class Component (old)

```jsx
class Greeting extends React.Component {
  render() {
    return <h1>Hello</h1>
  }
}
```

---

## 🧠 Rules

- Must start with **capital letter** (Packt)
- Must return **single parent element**
- Returns JSX

---

## 🔄 Flow

Component → returns JSX → React renders UI → updates on data change

---

## 💣 One-line

👉 “Components are reusable functions that return UI”

# Props

---

# 📘 Props (Short Notes)

## 🧠 What are Props?

👉 Props = **properties (data passed to a component)**

👉 They are like **function arguments** in JavaScript (W3Schools)

👉 Used to pass data **from parent → child component** (React)

---

## 💡 Example

```jsx
function Greeting(props) {
  return <h1>Hello {props.name}</h1>
}

function App() {
  return <Greeting name="Rahul" />
}
```

---

## ⚡ How Props Work

👉 Parent sends data

👉 Child receives via `props`

👉 UI updates based on that data

---

## 🔑 Key Points

- Props are **read-only (cannot modify)** (GeeksforGeeks)
- Passed like **HTML attributes**
- Help make components **dynamic & reusable** (FreeCodeCamp)

---

## 🧠 One-line

👉 “Props are data passed from parent to child components”

---

## 💣 Bonus (if asked)

👉 Props flow is **one-way (parent → child)** (builtin.com)

---

That’s all you need for class.

# Hooks

# 📘 What are Hooks?

👉 Hooks are **functions that let you use React features (state, lifecycle) in functional components** (react.dev)

👉 Before hooks → only class components could do this

👉 Now → functional components can do everything

---

# ⚡ Rules of Hooks

- Call hooks **only at top level** (not inside loops/conditions)
- Call hooks **only inside React components or custom hooks** (react.dev)

---

# 📘 useState

## 🧠 What it does

👉 Adds **state (data)** to a component

---

## 💡 Example

```jsx
import { useState } from "react";

function Counter() {
  const [count, setCount] = useState(0);

  return (
    <button onClick={() => setCount(count + 1)}>
      {count}
    </button>
  );
}
```

---

## ⚡ Key Points

- `count` → current value
- `setCount` → updates value
- Updating state → re-renders UI

---

# 📘 useEffect

## 🧠 What it does

👉 Runs **side effects** (API call, timer, DOM work) (react.dev)

---

## 💡 Example

```jsx
import { useEffect } from "react";

function App() {
  useEffect(() => {
    console.log("Component mounted");
  }, []);

  return <h1>Hello</h1>;
}
```

---

## ⚡ Dependency Array

- `[]` → runs once (on mount)
- `[value]` → runs when value changes
- no array → runs every render

# 📘 useEffect Examples (Dependency Array)

## 1. `[]` → runs once (on mount)

```jsx
import { useEffect } from "react";

function App() {
  useEffect(() => {
    console.log("Runs only once");
  }, []);

  return <h1>Hello</h1>;
}
```

👉 Runs only on first render (W3Schools)

---

## 2. `[value]` → runs when value changes

```jsx
import { useEffect, useState } from "react";

function App() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    console.log("Count changed:", count);
  }, [count]);

  return (
    <button onClick={() => setCount(count + 1)}>
      {count}
    </button>
  );
}
```

👉 Runs on first render + whenever `count` changes (devtrium.com)

---

## 3. No dependency array → runs every render

```jsx
import { useEffect, useState } from "react";

function App() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    console.log("Runs on every render");
  });

  return (
    <button onClick={() => setCount(count + 1)}>
      {count}
    </button>
  );
}
```

👉 Runs after every render (can hurt performance if overused) (GreatFrontEnd)

---

## 🧠 One-line recap

- `[]` → once
- `[value]` → when value changes
- no array → every render

---

This is clean and enough for teaching 👍

---

# 📘 Custom Hook

## 🧠 What is it?

👉 A **function that uses hooks and can be reused**

👉 Naming rule: must start with `use`

---

## 💡 Example: useOrigin

```jsx
import { useState, useEffect } from "react";

function useOrigin() {
  const [origin, setOrigin] = useState("");

  useEffect(() => {
    setOrigin(window.location.origin);
  }, []);

  return origin;
}
```

---

## ✅ Usage

```jsx
function App() {
  const origin = useOrigin();

  return <h1>{origin}</h1>;
}
```

---

# 🧠 One-line Summary

- Hooks = use React features in functions
- useState = manage data
- useEffect = handle side effects
- Custom hooks = reuse logic

---

This is enough to teach clearly without overload.