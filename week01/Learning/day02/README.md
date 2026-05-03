# 🚀 Day 02 — Mobile Dev Cohort

📅 Date: **03-05-2026**

---

# 📚 Topics Covered

* React DOM
* Virtual DOM (Deep Dive)
* Fiber Architecture (Intro)
* React Hooks
* useState
* useEffect (Deep)
* Event Handling
* Form Handling (Controlled vs Uncontrolled)

---

# 🌐 React DOM

React DOM is the **bridge between React and the browser DOM**.

👉 It is responsible for:

* Rendering React components into the DOM
* Updating UI efficiently

```js
import ReactDOM from "react-dom/client";

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
```

---

# ⚡ Virtual DOM (Core Concept — VERY IMPORTANT)

React does NOT directly update the real DOM.

Instead, it follows this process:

## 🔄 Steps of DOM Update

1. **Initial DOM**

   * React creates a Virtual DOM (VDOM)
   * Renders UI

2. **Update DOM**

   * State/props change triggers re-render

3. **Diffing**

   * React compares old VDOM vs new VDOM

4. **Find Minimal Changes**

   * Detects only what changed

5. **Update Real DOM**

   * Applies only required updates (fast 🚀)

---

## 💡 Why Virtual DOM?

* Real DOM updates are slow ❌
* Virtual DOM makes updates efficient ✅
* Improves performance

---

# 🧠 React Fiber Architecture (Intro)

Fiber is React’s **internal engine** for rendering.

## 🔹 Purpose:

* Break rendering into small units (tasks)
* Enable:

  * Interruptible rendering
  * Prioritization
  * Smooth UI

👉 Example:

* High priority: user input
* Low priority: background rendering

---

# 🪝 React Hooks

Hooks allow you to use **state & lifecycle in functional components**

---

## 🔹 Types of Hooks

### 📦 Built-in Hooks

* `useState`
* `useEffect`
* `useMemo`
* `useCallback`
* `useRef`
* `useContext`

### 🛠 Custom Hooks

* Your own reusable logic

```js
function useCustomHook() {
  // logic here
}
```

---

# ⚠️ Rules of Hooks (VERY IMPORTANT)

* ✅ Call hooks at **top level only**
* ❌ Don’t call inside loops / conditions / functions
* ❌ Don’t call outside component
* ✅ Use only inside functional components

---

# 🔢 useState (State Management)

Used to manage UI state

```js
const [count, setCount] = useState(initialValue);
```

## 🔹 Explanation:

* `count` → current state
* `setCount` → function to update state

---

## 🔹 Update State

```js
setCount(count + 1);
```

### ✅ Best Practice (Functional Update)

```js
setCount(prev => prev + 1);
```

👉 Why?

* Uses latest state
* Avoids bugs in async updates

---

## 🔥 Key Point:

👉 Updating state → triggers re-render → updates UI

---

# 🔄 useEffect (Side Effects)

Used to handle:

* API calls
* Timers
* Subscriptions
* DOM updates

---

## 🔹 1. Without Dependency Array

```js
useEffect(() => {
  // runs on every render
});
```

---

## 🔹 2. Empty Dependency Array

```js
useEffect(() => {
  // runs only once (on mount)
}, []);
```

---

## 🔹 3. With Dependency

```js
useEffect(() => {
  // runs when "third" changes
}, [third]);
```

---

## 🔹 4. Multiple Dependencies

```js
useEffect(() => {
  // runs when third OR second changes
}, [third, second]);
```

---

## 🔹 5. With Cleanup Function

```js
useEffect(() => {
  // first (effect)

  return () => {
    // cleanup
  };
}, [third]);
```

---

## ⚠️ Important Concept

👉 When dependency changes:

Order is:

1. **Cleanup runs FIRST**
2. Then **Effect runs**

---

## 💥 Example Flow

```js
useEffect(() => {
  console.log("Effect");

  return () => {
    console.log("Cleanup");
  };
}, [count]);
```

👉 When `count` changes:

```
Cleanup
Effect
```

---

# 🖱 Event Handling in React

React uses **SyntheticEvent**

## 🔹 What is SyntheticEvent?

* Wrapper over native browser events
* Works consistently across all browsers

---

## 🔹 Types of Events

* Click Event → `onClick`
* Mouse Event → `onMouseEnter`, `onMouseLeave`
* Keyboard Event → `onKeyDown`
* Form Event → `onSubmit`, `onChange`
* UI Event → `onScroll`

---

## 🔹 Example

```js
<button onClick={() => console.log("Clicked")}>
  Click Me
</button>
```

---

# 📋 Form Handling

## 🔹 Controlled Components

👉 Input controlled by React state

```js
const [value, setValue] = useState("");

<input value={value} onChange={(e) => setValue(e.target.value)} />
```

### ✅ Features:

* Single source of truth
* Easy validation
* Better control

---

## 🔹 Uncontrolled Components

👉 Input handled by DOM (not React state)

```js
<input ref={inputRef} />
```

### ❌ Problems:

* Hard to validate
* Less control
* Not preferred in React

---

# ⚖️ Controlled vs Uncontrolled

| Feature    | Controlled    | Uncontrolled |
| ---------- | ------------- | ------------ |
| Control    | High          | Low          |
| Validation | Easy          | Hard         |
| State      | React         | DOM          |
| Usage      | Recommended ✅ | Rare ❌       |

---

# 🧠 Summary (Important)

* Virtual DOM → optimized rendering
* Fiber → smarter rendering engine
* Hooks → power of functional components
* useState → manage UI
* useEffect → handle side effects
* Events → handled via SyntheticEvent
* Forms → prefer controlled components

---

# 🧪 Practice Tasks (Must Do)

## ✅ Task 1

* Create counter using `useState`

## ✅ Task 2

* Use `useEffect`:

  * Log on mount
  * Log on state change

## ✅ Task 3

* Build form:

  * Name input
  * Controlled component
  * Submit handler

---

# 🔥 Pro Tip (For You)

Since you're already doing **React Native + advanced UI**:

👉 Focus on:

* Proper `useEffect` usage (avoid unnecessary re-renders)
* Functional updates in state
* Clean event handling

---


