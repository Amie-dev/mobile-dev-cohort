# What is Virtual DOM?

!ChatGPT Image May 3, 2026, 10_41_34 AM.png

# React Hooks

!1655c148-1482-4ed3-a4e4-ac761e11cfd0.png

## useState Hook

---

# 🧠 useState Hook — Complete Notes

## 🔹 What is `useState`?

`useState` is a React Hook that lets you **add state (memory)** to functional components.

👉 Before hooks → only class components had state

👉 After hooks → functions can also manage state

---

## 🔹 Basic Syntax

```jsx
const [state, setState] = useState(initialValue);
```

### Breakdown:

- `state` → current value
- `setState` → function to update value
- `initialValue` → starting value

---

## 🔹 Example

```jsx
import { useState } from "react";

function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <h1>{count}</h1>
      <button onClick={() => setCount(count + 1)}>Increase</button>
    </div>
  );
}
```

---

## 🔹 Important Concepts

### 1. State is preserved between renders

React remembers the value even after re-render.

---

### 2. Updating state triggers re-render

Whenever you call `setState`, React re-renders the component.

---

### 3. State updates are async (important for interviews)

```jsx
setCount(count + 1);
setCount(count + 1);
```

❌ This will NOT increase twice

✅ Correct way:

```jsx
setCount(prev => prev + 1);
setCount(prev => prev + 1);
```

---

### 4. You can store anything

```jsx
useState(0);        // number
useState("hello");  // string
useState([]);       // array
useState({});       // object
useState(false);    // boolean
```

---

### 5. Never mutate state directly ❌

```jsx
// WRONG
count = count + 1;
```

```jsx
// CORRECT
setCount(count + 1);
```

---

### 6. Multiple states

```jsx
const [name, setName] = useState("");
const [age, setAge] = useState(0);
```

---

# ⚡ When should you use `useState`?

Use it when:

- UI changes based on user interaction
- You need dynamic data
- You want reactivity in UI

---

# 🚀 Mini Project — Dark Mode / Light Mode Toggle

This is **perfect for teaching + interview + real-world UI**

---

## 🔹 Features:

- Toggle theme
- Dynamic styles
- Clean logic

---

## 🔹 Code

```jsx
import { useState } from "react";

function App() {
  const [darkMode, setDarkMode] = useState(false);

  const toggleTheme = () => {
    setDarkMode(prev => !prev);
  };

  return (
    <div
      style={{
        height: "100vh",
        backgroundColor: darkMode ? "#121212" : "#ffffff",
        color: darkMode ? "#ffffff" : "#000000",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        transition: "0.3s"
      }}
    >
      <h1>{darkMode ? "Dark Mode 🌙" : "Light Mode ☀️"}</h1>

      <button
        onClick={toggleTheme}
        style={{
          padding: "10px 20px",
          border: "none",
          cursor: "pointer",
          background: darkMode ? "#ffffff" : "#000000",
          color: darkMode ? "#000000" : "#ffffff"
        }}
      >
        Toggle Theme
      </button>
    </div>
  );
}

export default App;
```

---

## 🔹 What students learn from this:

- Boolean state
- Conditional rendering
- Inline styling
- Event handling
- Real-world UI logic

---

# 🧠 Bonus Teaching Insight (important)

Ask students:

👉 Why we used `prev => !prev` instead of `!darkMode`?

Answer:

Because React state updates can be async → using previous state is safer.

---

# 💡 Extra Mini Project Ideas (for assignments)

1. Counter App (Increment / Decrement)
2. Show / Hide Password Toggle
3. Todo Input (add items)
4. Like Button ❤️ (toggle)
5. Accordion (expand/collapse)

---

## useEffect

# 🧠 useEffect Hook (Final Notes)

## 📌 Definition

`useEffect` is a React Hook used to run **side effects after rendering**.

👉 Side effects = API calls, timers, event listeners, DOM work

---

# 🧩 Syntax

```jsx
useEffect(() => {
  // effect code

  return () => {
    // cleanup code
  };
}, [dependencies]);
```

---

# 🔥 3 Cases of useEffect

## 1️⃣ Without Dependency Array

```jsx
useEffect(() => {
  console.log("Runs every render");
});
```

👉 Runs after **every render**

---

## 2️⃣ With Dependency Array

```jsx
useEffect(() => {
  console.log("Runs when count changes");
}, [count]);
```

👉 Runs:

- On first render
- Whenever `count` changes

---

## 3️⃣ Empty Dependency Array

```jsx
useEffect(() => {
  console.log("Runs once");
}, []);
```

👉 Runs **only once (on mount)**

---

# 🧹 Cleanup Function

```jsx
useEffect(() => {
  return () => {
    console.log("Cleanup");
  };
}, [deps]);
```

---

# ⚡ When Cleanup Runs

👉 **Two times:**

1. Before the effect runs again (if dependencies change)
2. When component unmounts

---

# 🧠 Lifecycle Flow

```
Mount:
Effect

Update (dependency change):
Cleanup → Effect

Unmount:
Cleanup
```

---

# 🎯 Special Case

```jsx
useEffect(() => {}, []);
```

👉 Cleanup runs **only on unmount**

---

# 🚨 StrictMode Note

- In development, React may run:

```
Effect → Cleanup → Effect
```

👉 Only for debugging, not in production

---

# 💡 Final One-Liner

👉 **useEffect runs after render, and cleanup runs before re-run and on unmount**

---

If you teach just this, students will understand `useEffect` better than 90% of learners 👍

!ChatGPT Image May 3, 2026, 09_53_02 AM.png

!ChatGPT Image May 3, 2026, 09_56_13 AM.png

!ChatGPT Image May 3, 2026, 10_10_33 AM.png

---

# 🧩 Mini Project Idea: Student Registration Form

Fields:

- Name
- Email
- Course (dropdown)
- Submit button

---

# 🔵 Part 1: Controlled Form (React Controls Everything)

### 💡 Concept

React state = source of truth

---

## ✅ Code

```jsx
import { useState } from "react";

export default function ControlledForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    course: "React",
  });

  function handleChange(e) {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    console.log("Controlled Form Data:", formData);
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Controlled Form</h2>

      <input
        type="text"
        name="name"
        placeholder="Enter name"
        value={formData.name}
        onChange={handleChange}
      />

      <input
        type="email"
        name="email"
        placeholder="Enter email"
        value={formData.email}
        onChange={handleChange}
      />

      <select
        name="course"
        value={formData.course}
        onChange={handleChange}
      >
        <option>React</option>
        <option>Node</option>
        <option>MongoDB</option>
      </select>

      <button type="submit">Submit</button>
    </form>
  );
}
```

---

## 🧠 What Students Should Notice

- Every input has:
    - `value`
    - `onChange`
- State updates on **every keystroke**
- React always knows current data

---

## 🔥 Teaching Analogy

> Controlled = Teacher watching every student writing in notebook in real-time
> 

---

# 🟠 Part 2: Uncontrolled Form (Without useRef)

### 💡 Concept

DOM = source of truth

We only read values when needed (on submit)

---

## ✅ Code (NO useRef)

```jsx
export default function UncontrolledForm() {
  function handleSubmit(e) {
    e.preventDefault();

    const form = e.target;

    const data = {
      name: form.name.value,
      email: form.email.value,
      course: form.course.value,
    };

    console.log("Uncontrolled Form Data:", data);
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Uncontrolled Form</h2>

      <input
        type="text"
        name="name"
        placeholder="Enter name"
      />

      <input
        type="email"
        name="email"
        placeholder="Enter email"
      />

      <select name="course">
        <option>React</option>
        <option>Node</option>
        <option>MongoDB</option>
      </select>

      <button type="submit">Submit</button>
    </form>
  );
}
```

---

## 🧠 What Students Should Notice

- No `useState`
- No `onChange`
- Values accessed only on submit:
    
    ```jsx
    form.name.value
    ```
    

---

## 🔥 Teaching Analogy

> Uncontrolled = Teacher checking notebooks only after exam submission
> 

---

# ⚖️ Side-by-Side Difference

| Feature | Controlled | Uncontrolled |
| --- | --- | --- |
| Source of truth | React State | DOM |
| Real-time updates | Yes | No |
| Validation | Easy | Manual |
| Performance | Slightly heavier | Lightweight |
| Code complexity | More | Less |

---