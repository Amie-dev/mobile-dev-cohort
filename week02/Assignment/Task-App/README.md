

# 📒 Notes App UI – React Native Assignment


---

## 🎥 Demo Video

Demo Video Link:
[https://x.com/AminulIsla65775/status/2054140204861255761?s=20]

---

# 🚀 Project Overview

This project is a clean and responsive **Notes App UI** built using **React Native with Expo**.

The main goal of this assignment was to practice:

* React Native core components
* Responsive mobile UI design
* Dark/Light theme handling
* Input handling
* Clean styling practices
* Component structuring

The application includes:

* Notes Listing Screen
* Note Editor Screen

The UI was designed to feel modern, responsive, and user-friendly while maintaining clean code architecture.

---

# 📱 Features Implemented

## ✅ Notes Listing Screen

* Notes displayed using `FlatList`
* Search/filter functionality using `TextInput`
* Responsive note cards
* Pressable interactive cards
* Dark/Light theme toggle
* Responsive tablet support
* Empty search state handling
* Smooth pressed-state feedback animations

---

## ✅ Note Editor Screen

* Note title input
* Multiline note content input
* `KeyboardAvoidingView` implementation
* `ImageBackground` hero header
* Save button
* Back button
* Responsive spacing for different screen sizes

---

# 🧩 React Native Components Used

* `View`
* `Text`
* `TextInput`
* `FlatList`
* `Pressable`
* `SafeAreaView`
* `KeyboardAvoidingView`
* `ImageBackground`
* `Switch`

---

# 🎣 Hooks Used

* `useState()`
* `useMemo()`
* `useColorScheme()`
* `useWindowDimensions()`

---

# 🎨 Theme Handling

Implemented automatic dark/light mode detection using:

```tsx
useColorScheme()
```

Also added manual theme toggling functionality using a custom theme switch component.

---

# 📐 Responsive Design

Implemented responsive layouts using:

```tsx
useWindowDimensions()
```

Tablet layouts automatically switch to a 2-column notes grid.

---

# 🎨 Styling Techniques Used

* `StyleSheet.create()`
* `StyleSheet.compose()`
* `StyleSheet.flatten()`

No unnecessary inline styles were used.

---

# ✨ Additional UI Improvements

## Added Enhancements

* Premium card shadows
* Active pressed card animation
* Smooth scale interaction
* Search filtering
* Theme toggle component
* Modern typography
* Better spacing hierarchy
* Responsive note grid
* Empty state UI
* Modern productivity-app inspired design

---

# 📂 Project Structure

```txt
app/
└── index.tsx

screens/
├── NotesListScreen.tsx
└── NoteEditorScreen.tsx

components/
└── ThemeToggle.tsx

constants/
└── colors.ts

data/
└── notes.ts
```

---

# 🛠️ Tech Stack

* React Native
* Expo
* TypeScript

---

# ✅ Assignment Requirements Covered

* FlatList
* Pressable
* TextInput
* Switch
* KeyboardAvoidingView
* ImageBackground
* useColorScheme
* useWindowDimensions
* StyleSheet.create
* StyleSheet.compose
* StyleSheet.flatten
* Dark/Light Theme
* Responsive Layouts

---

# 🙌 Conclusion

This project helped improve understanding of:

* Mobile UI structuring
* Responsive layouts
* React Native core components
* Theme management
* Clean styling architecture
* Component reusability

The application was designed with a strong focus on user experience, readability, and clean UI design.
