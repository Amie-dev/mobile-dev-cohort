# 🚀 Week 01 — React Refresher

📅 Date: **02-05-2026 → 03-05-2026**

---

# 📚 Overview

This week focused on **revisiting React fundamentals** to build a strong base for mobile development using React Native.

---

# 🗓 Day 01 — React Basics

## 🔹 What is React?

React is a **JavaScript library** used to build **User Interfaces (UI)**.

* Focus: UI development
* Component-based approach
* Efficient rendering with Virtual DOM

---

## 🔹 Library vs Framework

| Feature     | Library                 | Framework               |
| ----------- | ----------------------- | ----------------------- |
| Control     | Developer controls flow | Framework controls flow |
| Flexibility | High                    | Less flexible           |
| Example     | React                   | Angular                 |

👉 React is a **library**, not a full framework.

---

## 🔹 Component-Based Architecture

React apps are built using **components (reusable UI blocks)**.

### 📦 Example Structure:

```bash
App
 ├── Header
 ├── Sidebar
 ├── Content
 └── Footer
```

### ✅ Benefits:

* Reusable code
* Easy maintenance
* Clean structure

---

## 🔹 SPA (Single Page Application)

SPA = **Single Page Application**

### ⚡ Features:

* No full page reload
* Fast navigation
* Better user experience

👉 React is mainly used to build SPAs.

---

# 🗓 Day 02 — Core React Concepts

## ⚡ Virtual DOM (Fundamental)

React uses Virtual DOM to optimize UI updates.

### 🔄 Process:

1. Initial DOM creation
2. State/props update
3. Diffing (compare old vs new VDOM)
4. Find minimal changes
5. Update Real DOM

### 💡 Benefit:

* Faster performance
* Efficient updates

---

# 🪝 React Hooks

Hooks allow functional components to use **state & lifecycle features**

---

## 🔹 useState

Used to manage state in components.

```js
const [count, setCount] = useState(0);
```

### ✅ Update state:

```js
setCount(count + 1);

// Best practice
setCount(prev => prev + 1);
```

👉 Updating state triggers UI re-render.

---

## 🔹 useEffect

Used for **side effects** like:

* API calls
* Timers
* DOM updates

---

### Types of useEffect:

#### 1. Without dependency

```js
useEffect(() => {
  // runs on every render
});
```

#### 2. Empty dependency

```js
useEffect(() => {
  // runs once (on mount)
}, []);
```

#### 3. With dependency

```js
useEffect(() => {
  // runs when dependency changes
}, [value]);
```

---

### 🔁 Cleanup Function

```js
useEffect(() => {
  // effect

  return () => {
    // cleanup
  };
}, [value]);
```

👉 Order when dependency changes:

```
Cleanup → Effect
```

---

# 🖱 Event Handling

React uses **SyntheticEvent** (cross-browser wrapper).

### 🔹 Event Types:

* Click → `onClick`
* Mouse → `onMouseEnter`
* Keyboard → `onKeyDown`
* Form → `onSubmit`
* UI → `onScroll`

---

# 📋 Form Handling

## 🔹 Controlled Components

* Managed by React state
* Single source of truth

```js
const [value, setValue] = useState("");

<input value={value} onChange={(e) => setValue(e.target.value)} />
```

### ✅ Advantages:

* Easy validation
* Better control

---

## 🔹 Uncontrolled Components

* Managed by DOM
* Uses `ref`

```js
<input ref={inputRef} />
```

### ❌ Disadvantages:

* Hard to validate
* Less control

---

## ⚖️ Controlled vs Uncontrolled

| Feature     | Controlled | Uncontrolled |
| ----------- | ---------- | ------------ |
| Control     | High       | Low          |
| Validation  | Easy       | Hard         |
| Recommended | ✅ Yes      | ❌ No         |

---

# 🧠 Summary

* React is a **library** for UI
* Uses **component-based architecture**
* SPA provides smooth experience
* Virtual DOM improves performance
* Hooks simplify state & lifecycle
* useState → manage state
* useEffect → handle side effects
* Controlled forms are preferred

---

# 🧪 Practice (Recommended)

* Build simple components (Header, Card, Footer)
* Create counter using `useState`
* Use `useEffect` for logging
* Create form using controlled inputs

---