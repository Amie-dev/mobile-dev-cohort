**Core Components & Styling**

# React Native Core Components — In Depth 📱

---

## How React Native Works Under the Hood

Before diving into components, let's understand the magic. Let's take **`<View>`** as our example.

### What happens when you write this?

```jsx
<View style={{ backgroundColor: 'red', width: 100, height: 100 }} />
```

### The Journey 🗺️

```
Your JSX Code
      │
      ▼
React Native JavaScript Engine (Hermes)
      │
      │  "Hey, I need a View with red background"
      ▼
React Native Bridge / JSI (New Architecture)
      │
      ├──────────────────────────────────┐
      ▼                                  ▼
   Android                             iOS
 renders a                          renders a
 android.view.View                  UIView
 (Java/Kotlin)                      (Swift/ObjC)
      │                                  │
      ▼                                  ▼
  Red Box on                        Red Box on
  Android Screen                    iPhone Screen
```

### In Simple Words

> You write **one line of JavaScript.** React Native secretly tells Android to create a real `android.view.View` and tells iOS to create a real `UIView`. Both look and behave like **genuine native components** — not a webpage, not a fake simulation. The real deal. 🎯
> 

### Why Does This Matter?

- This is why React Native apps **feel native** — because they ARE native under the hood
- Your JavaScript is just the **instruction layer**
- The actual rendering is done by Android and iOS themselves

---

---

# The Components

---

## 1. `<View>` 📦

The most fundamental building block. Think of it as a **box** or **container** — like `<div>` in web.

### What it does

- Groups other components together
- Controls layout using Flexbox
- Has no visual appearance by default (invisible box)

### Under the Hood

```
<View>  →  Android: android.view.ViewGroup
        →  iOS:     UIView
```

It's literally just a container that both platforms already understand natively.

```jsx
import { View, Text } from 'react-native';

export default function App() {
  return (
    <View style={{
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#f0f0f0'
    }}>
      <View style={{
        width: 150,
        height: 150,
        backgroundColor: '#6C63FF',
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        <Text style={{ color: 'white', fontWeight: 'bold' }}>
          I am a View!
        </Text>
      </View>
    </View>
  );
}
```

**Output:**

```
┌─────────────────────────┐
│                         │
│                         │
│    ┌─────────────┐      │
│    │             │      │
│    │  I am a     │      │
│    │   View!     │      │  ← Purple rounded box
│    │             │      │     centered on screen
│    └─────────────┘      │
│                         │
└─────────────────────────┘
  Grey background screen
```

---

## 2. `<Text>` 💬

The **only** way to display text in React Native. Unlike web where any element can have text, here ALL text must be inside `<Text>`.

### Under the Hood

```
<Text>  →  Android: android.widget.TextView
        →  iOS:     UILabel
```

```jsx
import { View, Text } from 'react-native';

export default function App() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', padding: 20 }}>
      <Text style={{ fontSize: 28, fontWeight: 'bold', color: '#333' }}>
        Hello World 👋
      </Text>
      <Text style={{ fontSize: 16, color: '#888', marginTop: 8 }}>
        This is a subtitle with smaller text
      </Text>
      <Text
        numberOfLines={2}
        style={{ fontSize: 14, color: '#555', marginTop: 12 }}
      >
        This is a very long text that will get truncated
        after two lines no matter how long it is.
        Extra content gets cut off with ...
      </Text>
    </View>
  );
}
```

**Output:**

```
Hello World 👋
This is a subtitle with smaller text
This is a very long text that will get
truncated after two lines no matter...
```

> 💡 `numberOfLines` is super useful — it truncates text and adds `...` automatically.
> 

---

## 3. `<Image>` 🖼️

Displays images — from local files or remote URLs.

### Under the Hood

```
<Image>  →  Android: android.widget.ImageView
         →  iOS:     UIImageView
```

```jsx
import { View, Image, Text } from 'react-native';

export default function App() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>

      {/* Remote image from internet */}
  // Network image
<Image source={{ uri: 'https://example.com/photo.jpg' }} />

// Local image
<Image source={require('./assets/photo.png')} />

// Base64
<Image source={{ uri: 'data:image/png;base64,iVBORw0KGgo...' }} />

      {/* Local image from assets folder */}
      {/* <Image source={require('./assets/logo.png')} style={{ width: 100, height: 100 }} /> */}

      <Text style={{ marginTop: 16, fontSize: 16 }}>
        Profile Photo
      </Text>
    </View>
  );
}
```

**Output:**

```
        ╭───────────╮
       /             \\
      │   [photo]     │   ← Circular image
       \\             /
        ╰───────────╯
        Profile Photo
```

> ⚠️ Always define `width` and `height` for images — unlike web, they won't auto-size.
> 

### Image Component — Props Reference

| Prop | Description |
| --- | --- |
| `source` | Defines image source — local `require()`, network `{ uri }`, or base64 |
| `style` | Set `width` & `height` — **required** for network images to appear |
| `resizeMode` | How image fits its box — `cover`, `contain`, `stretch`, `center` |
| `onLoad` | Callback when image loads successfully |
| `onError` | Callback when image fails to load |
| `onLoadStart` | Fires when image loading begins |
| `onLoadEnd` | Fires when loading finishes (success or fail) |
| `defaultSource` | Placeholder image shown while real image loads |
| `blurRadius` | Applies blur effect on the image |
| `tintColor` | Colorizes image — mostly used for icons (used inside `style`) |

---

## 4. `<TextInput>` ⌨️

The input field for text. Every login form, search bar, and chat box uses this.

### Under the Hood

```
<TextInput>  →  Android: android.widget.EditText
             →  iOS:     UITextField
```

```jsx
import { View, TextInput, Text } from 'react-native';
import { useState } from 'react';

export default function App() {
  const [name, setName] = useState('');

  return (
    <View style={{ flex: 1, justifyContent: 'center', padding: 24 }}>
      <Text style={{ fontSize: 16, marginBottom: 8, color: '#333' }}>
        Enter your name:
      </Text>

      <TextInput
        value={name}
        onChangeText={setName}          // Fires on every keystroke
        placeholder="e.g. John Doe"
        placeholderTextColor="#aaa"
        style={{
          borderWidth: 1,
          borderColor: '#ddd',
          borderRadius: 10,
          padding: 12,
          fontSize: 16,
        }}
      />

      {name.length > 0 && (
        <Text style={{ marginTop: 16, fontSize: 18 }}>
          Hello, {name}! 👋
        </Text>
      )}
    </View>
  );
}
```

**Output:**

```
Enter your name:
┌────────────────────────┐
│  e.g. John Doe         │  ← Typing here...
└────────────────────────┘

Hello, John! 👋            ← Appears as you type
```

> 💡 Common props: `secureTextEntry` for passwords, `keyboardType="email-address"`, `multiline` for textarea-like input.
> 

### TextInput Component — Props Reference

| Prop | Description |
| --- | --- |
| `value` | Controlled value of the input |
| `onChangeText` | Returns plain string on every keystroke — most used over `onChange` |
| `placeholder` | Hint text shown when input is empty |
| `placeholderTextColor` | Color of the placeholder text |
| `keyboardType` | Type of keyboard — `default`, `numeric`, `email-address`, `phone-pad` |
| `secureTextEntry` | Hides text — used for passwords |
| `multiline` | Allows multiple lines of text |
| `numberOfLines` | Sets visible line count *(Android only, use with `multiline`)* |
| `maxLength` | Limits max characters user can type |
| `editable` | `false` makes input read-only |
| `autoFocus` | Focuses input automatically on mount |
| `autoCapitalize` | `none`, `sentences`, `words`, `characters` |
| `returnKeyType` | Changes return key label — `done`, `next`, `search`, `go` |
| `onFocus` | Fires when input gains focus |
| `onBlur` | Fires when input loses focus |
| `onSubmitEditing` | Fires when user presses return/submit key |

---

### ⚠️ Gotchas

**1. No `value` without `onChangeText`**
If you set `value` without `onChangeText`, the input becomes **frozen** — user can't type anything.

**2. `multiline` + `height` on Android**
On Android, `multiline` inputs don't auto-grow. You need to manually set height or use `onContentSizeChange` to grow dynamically.

**3. `numberOfLines` is Android only**
On iOS, it does nothing — you control height via `style` instead.

**4. `secureTextEntry` disables copy/paste**
This is intentional, but surprises devs when testing. Also resets cursor on Android sometimes.

**5. `onChangeText` vs `onChange**onChangeText` gives you a plain `string` directly.
`onChange` gives you a full event object `e.nativeEvent.text` — rarely needed, stick to `onChangeText`.

---

## 5. `<Pressable>` 👆

The modern way to make **anything tappable**. Replaced the old `TouchableOpacity`.

### Under the Hood

```
<Pressable>  →  Android: Ripple effect via RippleDrawable
             →  iOS:     Touch handling via UIGestureRecognizer
```

```jsx
import { View, Text, Pressable } from 'react-native';

export default function App() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Pressable
        onPress={() => alert('Button Pressed! 🎉')}
        style={({ pressed }) => ({      // ← pressed is true while finger is down
          backgroundColor: pressed ? '#4a42d4' : '#6C63FF',
          paddingVertical: 14,
          paddingHorizontal: 32,
          borderRadius: 12,
          transform: [{ scale: pressed ? 0.96 : 1 }],  // Slight shrink effect
        })}
      >
        <Text style={{ color: 'white', fontSize: 16, fontWeight: 'bold' }}>
          Press Me!
        </Text>
      </Pressable>
    </View>
  );
}
```

**Output:**

```
       ╔══════════════╗
       ║   Press Me!  ║  ← Normal state (purple)
       ╚══════════════╝

       ╔══════════════╗
       ║   Press Me!  ║  ← Pressed state (darker + smaller)
       ╚══════════════╝
```

> 💡 The `({ pressed })` trick is the superpower of Pressable — you can visually react to the press state directly in the style.
> 

### Props Reference

| Prop | Description |
| --- | --- |
| `onPress` | Fires on a normal tap |
| `onLongPress` | Fires when user holds press |
| `onPressIn` | Fires the moment finger touches down |
| `onPressOut` | Fires the moment finger lifts up |
| `style` | Accepts plain object or `({ pressed }) => ({})` function |
| `children` | Accepts plain JSX or `({ pressed }) => JSX` function |
| `disabled` | Disables all press interactions |
| `hitSlop` | Expands the touchable area beyond the visible component |
| `delayLongPress` | Delay in ms before `onLongPress` fires (default `500ms`) |
| `android_ripple` | Native ripple effect on Android — `{ color, borderless, radius }` |

---

## 6. `<ScrollView>` 📜

Makes content **scrollable** when it's taller than the screen.

### Under the Hood

```
<ScrollView>  →  Android: android.widget.ScrollView
              →  iOS:     UIScrollView
```

```jsx
import { ScrollView, View, Text } from 'react-native';

export default function App() {
  const items = Array.from({ length: 20 }, (_, i) => `Item ${i + 1}`);

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: '#f9f9f9' }}
      contentContainerStyle={{ padding: 16 }}
      showsVerticalScrollIndicator={false}  // Hides the scrollbar
    >
      {items.map((item) => (
        <View
          key={item}
          style={{
            backgroundColor: 'white',
            padding: 16,
            borderRadius: 10,
            marginBottom: 10,
            shadowColor: '#000',
            shadowOpacity: 0.05,
            shadowRadius: 4,
            elevation: 2,
          }}
        >
          <Text style={{ fontSize: 16 }}>{item}</Text>
        </View>
      ))}
    </ScrollView>
  );
}
```

**Output:**

```
┌─────────────────────────┐
│  ┌───────────────────┐  │
│  │  Item 1           │  │
│  └───────────────────┘  │
│  ┌───────────────────┐  │
│  │  Item 2           │  │  ← Scroll down to see more
│  └───────────────────┘  │
│  ┌───────────────────┐  │
│  │  Item 3           │  │
│  └───────────────────┘  │
│          ...            │
└─────────────────────────┘
```

> ⚠️ ScrollView renders **ALL items at once** — great for small lists but bad for 1000+ items. Use `FlatList` for long lists!
> 

### `contentContainerStyle` vs `style`

This is the most common confusion with ScrollView:

jsx

```jsx
// style → styles the ScrollView box itself
// contentContainerStyle → styles the inner content

<ScrollView
  style={{ flex: 1, backgroundColor: 'red' }}         // the scroll container
  contentContainerStyle={{ padding: 16, alignItems: 'center' }} // the content inside
>
```

> Rule of thumb — `padding`, `alignItems`, `justifyContent` go in `contentContainerStyle`, not `style`.
> 

| Prop | Description |
| --- | --- |
| `horizontal` | Scrolls horizontally instead of vertically |
| `showsVerticalScrollIndicator` | Show/hide vertical scroll bar |
| `showsHorizontalScrollIndicator` | Show/hide horizontal scroll bar |
| `contentContainerStyle` | Styles the **inner** content wrapper, not the scroll container itself |
| `scrollEnabled` | `false` disables scrolling completely |
| `keyboardShouldPersistTaps` | Controls keyboard dismiss on tap — `never`, `always`, `handled` |
| `onScroll` | Fires as user scrolls — gives scroll position |
| `scrollEventThrottle` | How often `onScroll` fires in ms *(iOS only)* |
| `refreshControl` | Adds pull-to-refresh behavior |
| `pagingEnabled` | Snaps scroll to page size — good for carousels |
| `bounces` | Enables bounce effect at ends *(iOS only)* |

---

## 7. `<Button>` 🔘

The simplest, most basic button. Minimal customization — uses the platform's native button style.

### Under the Hood

```
<Button>  →  Android: Looks like Material Design button
          →  iOS:     Looks like iOS blue text button
```

```jsx
import { View, Button, Alert } from 'react-native';

export default function App() {
  return (
    <View style={{
      flex: 1,
      justifyContent: 'center',
      gap: 16,
      padding: 24
    }}>
      <Button
        title="Default Button"
        onPress={() => Alert.alert('Pressed!', 'Default button was pressed')}
      />
      <Button
        title="Danger Button"
        onPress={() => Alert.alert('Delete?', 'Are you sure?')}
        color="red"
      />
      <Button
        title="Disabled Button"
        onPress={() => {}}
        disabled={true}
      />
    </View>
  );
}
```

**Output:**

```
  [ Default Button ]    ← Blue (iOS) / Purple (Android)
  [ Danger Button  ]    ← Red
  [ Disabled Button]    ← Greyed out, not tappable
```

> 💡 In real apps, most developers use `Pressable` or `TouchableOpacity` instead of `Button` because `Button` is very hard to style. Think of `Button` as a quick prototype tool.
> 

---

## 8. `<Switch>` 🔀

A toggle switch — perfect for settings screens.

### Under the Hood

```
<Switch>  →  Android: android.widget.Switch (Material toggle)
          →  iOS:     UISwitch (iOS toggle)
```

```jsx
import { View, Switch, Text } from 'react-native';
import { useState } from 'react';

export default function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [notifications, setNotifications] = useState(true);

  return (
    <View style={{ flex: 1, justifyContent: 'center', padding: 24 }}>

      {/* Setting Row */}
      <View style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 16,
        borderBottomWidth: 1,
        borderColor: '#eee'
      }}>
        <Text style={{ fontSize: 16 }}>Dark Mode</Text>
        <Switch
          value={isDarkMode}
          onValueChange={setIsDarkMode}
          trackColor={{ false: '#ddd', true: '#6C63FF' }}
          thumbColor="white"
        />
      </View>

      <View style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 16,
      }}>
        <Text style={{ fontSize: 16 }}>Notifications</Text>
        <Switch
          value={notifications}
          onValueChange={setNotifications}
          trackColor={{ false: '#ddd', true: '#6C63FF' }}
          thumbColor="white"
        />
      </View>

      <Text style={{ marginTop: 24, color: '#888' }}>
        Dark Mode: {isDarkMode ? 'ON 🌙' : 'OFF ☀️'}
      </Text>
    </View>
  );
}
```

**Output:**

```
Dark Mode              ◯──  ← OFF (grey)
────────────────────────────
Notifications          ──● ← ON (purple)

Dark Mode: OFF ☀️
```

---

## 9. `<FlatList>` 📋

The **performance-optimized** list component. Only renders items that are currently visible on screen.

### Under the Hood

```
<FlatList>  →  Android: RecyclerView (reuses item views)
            →  iOS:     UITableView / UICollectionView
```

This is the key difference from ScrollView — it **recycles** off-screen items instead of keeping them all in memory.

```jsx
import { FlatList, View, Text, Image } from 'react-native';

const USERS = [
  { id: '1', name: 'Alice Johnson', role: 'Designer' },
  { id: '2', name: 'Bob Smith', role: 'Developer' },
  { id: '3', name: 'Carol White', role: 'Manager' },
  { id: '4', name: 'David Brown', role: 'Developer' },
  { id: '5', name: 'Eve Davis', role: 'Designer' },
];

export default function App() {
  return (
    <FlatList
      data={USERS}
      keyExtractor={(item) => item.id}       // Unique key for each item
      contentContainerStyle={{ padding: 16 }}
      ItemSeparatorComponent={() => (        // Line between items
        <View style={{ height: 1, backgroundColor: '#eee' }} />
      )}
      renderItem={({ item }) => (
        <View style={{
          flexDirection: 'row',
          alignItems: 'center',
          paddingVertical: 12,
          backgroundColor: 'white',
        }}>
          <View style={{
            width: 44,
            height: 44,
            borderRadius: 22,
            backgroundColor: '#6C63FF',
            justifyContent: 'center',
            alignItems: 'center',
            marginRight: 12,
          }}>
            <Text style={{ color: 'white', fontWeight: 'bold' }}>
              {item.name[0]}   {/* First letter as avatar */}
            </Text>
          </View>
          <View>
            <Text style={{ fontWeight: '600', fontSize: 16 }}>{item.name}</Text>
            <Text style={{ color: '#888', fontSize: 13 }}>{item.role}</Text>
          </View>
        </View>
      )}
    />
  );
}
```

**Output:**

```
┌─────────────────────────────┐
│  A  Alice Johnson           │
│     Designer                │
│─────────────────────────────│
│  B  Bob Smith               │
│     Developer               │
│─────────────────────────────│
│  C  Carol White             │
│     Manager                 │
└─────────────────────────────┘
      (scrollable...)
```

> 💡 Use `FlatList` when you have **more than 10-15 items.** For anything smaller, `ScrollView` is fine.
> 

## FlatList in React Native

FlatList is the **performant way to render large lists**. Unlike ScrollView, it only renders items that are **currently visible on screen** — this is called **virtualization**.

---

### Why FlatList over ScrollView?

|  | ScrollView | FlatList |
| --- | --- | --- |
| Renders | Everything at once | Only visible items |
| 500 items | 500 in memory | ~10-15 in memory |
| Performance | Bad for large lists | Optimized |

---

### Basic Usage

```jsx
import { FlatList, Text } from 'react-native';

const data = [
  { id: '1', name: 'John' },
  { id: '2', name: 'Jane' },
];

<FlatList
  data={data}
  keyExtractor={(item) => item.id}
  renderItem={({ item }) => <Text>{item.name}</Text>}
/>
```

---

### Props Reference

| Prop | Description |
| --- | --- |
| `data` | Array of items to render |
| `renderItem` | Function that returns JSX for each item — receives `{ item, index }` |
| `keyExtractor` | Returns unique key per item — always use `id` not `index` |
| `horizontal` | Scrolls horizontally |
| `numColumns` | Renders items in a grid layout |
| `contentContainerStyle` | Styles the inner content container |
| `ListHeaderComponent` | Component rendered at the **top** of the list |
| `ListFooterComponent` | Component rendered at the **bottom** of the list |
| `ListEmptyComponent` | Shown when `data` is empty |
| `ItemSeparatorComponent` | Rendered between each item — good for dividers |
| `onEndReached` | Fires when user scrolls near the end |
| `onEndReachedThreshold` | How close to end before `onEndReached` fires — `0.5` = 50% from bottom |
| `refreshControl` | Same as ScrollView — adds pull to refresh |
| `showsVerticalScrollIndicator` | Show/hide scroll bar |
| `initialNumToRender` | How many items to render on first load |

---

### Pagination (Infinite Scroll)

The most common real world use case:

```jsx
<FlatList
  data={posts}
  keyExtractor={(item) => item.id}
  renderItem={({ item }) => <PostCard post={item} />}
  onEndReached={fetchMorePosts}
  onEndReachedThreshold={0.5}
  ListFooterComponent={loading ? <ActivityIndicator /> : null}
  ListEmptyComponent={<Text>No posts found</Text>}
/>
```

---

### Grid Layout

```jsx
<FlatList
  data={photos}
  keyExtractor={(item) => item.id}
  numColumns={3}
  renderItem={({ item }) => (
    <Image
      source={{ uri: item.url }}
      style={{ width: '33%', height: 120 }}
    />
  )}
/>
```

---

### ⚠️ Gotchas

**1. Always use `keyExtractor` with a unique id — never index**
Using index as key causes re-render bugs when list order changes.

```jsx
// ❌ Bad
keyExtractor={(item, index) => index.toString()}

// ✅ Good
keyExtractor={(item) => item.id}
```

**2. `renderItem` should be outside JSX**
Defining `renderItem` inline recreates the function on every render, hurting performance.

```jsx
// ❌ Bad
<FlatList renderItem={({ item }) => <Card item={item} />} />

// ✅ Good
const renderItem = ({ item }) => <Card item={item} />;
<FlatList renderItem={renderItem} />
```

**3. Never nest FlatList inside ScrollView**
Same scroll gesture conflict as nested ScrollViews — both fight to handle the scroll.

**4. `numColumns` can't change at runtime**
If you need to switch between 1 and 3 columns dynamically, you must change the `key` prop on FlatList to force a full remount.

```jsx
<FlatList key={numColumns} numColumns={numColumns} ... />
```

---

## 10. `<KeyboardAvoidingView>` ⌨️

Automatically **pushes your content up** when the keyboard opens, so input fields don't get hidden.

### Under the Hood

```
<KeyboardAvoidingView>  →  Listens to keyboard show/hide events
                        →  Android: adjusts window via WindowInsets
                        →  iOS:     adjusts padding/position via UIKeyboard notifications
```

```jsx
import {
  KeyboardAvoidingView,
  View, Text, TextInput,
  Pressable, Platform
} from 'react-native';

export default function App() {
  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      // ↑ iOS needs 'padding', Android needs 'height'
    >
      <View style={{ flex: 1, justifyContent: 'flex-end', padding: 24 }}>

        <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 24 }}>
          Login
        </Text>

        <TextInput
          placeholder="Email"
          style={{
            borderWidth: 1, borderColor: '#ddd',
            borderRadius: 10, padding: 14,
            fontSize: 16, marginBottom: 12
          }}
        />
        <TextInput
          placeholder="Password"
          secureTextEntry
          style={{
            borderWidth: 1, borderColor: '#ddd',
            borderRadius: 10, padding: 14,
            fontSize: 16, marginBottom: 20
          }}
        />

        <Pressable style={{
          backgroundColor: '#6C63FF',
          padding: 16, borderRadius: 12,
          alignItems: 'center'
        }}>
          <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 16 }}>
            Sign In
          </Text>
        </Pressable>

      </View>
    </KeyboardAvoidingView>
  );
}
```

**Output (before keyboard):**

```
┌────────────────────────┐
│                        │
│  Login                 │
│  ┌──────────────────┐  │
│  │ Email            │  │
│  └──────────────────┘  │
│  ┌──────────────────┐  │
│  │ Password         │  │
│  └──────────────────┘  │
│  ╔══════════════════╗  │
│  ║    Sign In       ║  │
│  ╚══════════════════╝  │
└────────────────────────┘
```

**Output (after keyboard opens — content shifts UP):**

```
┌────────────────────────┐
│  Login                 │
│  ┌──────────────────┐  │
│  │ Email            │  │
│  └──────────────────┘  │  ← Stays visible!
│  ┌──────────────────┐  │
│  │ Password         │  │
│  └──────────────────┘  │
│  ╔══════════════════╗  │
│  ║    Sign In       ║  │
│  ╚══════════════════╝  │
├────────────────────────┤
│   ⌨️  KEYBOARD HERE    │
└────────────────────────┘
```

---

### The `behavior` Prop — What Exactly Happens

This is the most important and confusing prop. It controls **how the container reacts** when keyboard appears.

---

### `padding`

Adds **bottom padding** equal to the keyboard height — pushes content up from the bottom.

### `height`

**Shrinks the container's height** equal to keyboard height — compresses the whole view.

---

## 11. `<ImageBackground>` 🌄

Like `<Image>` but lets you **place children on top of it.** Perfect for hero sections, cards with background images.

### Under the Hood

```
<ImageBackground>  →  Literally just <View> + <Image> stacked
                   →  Android/iOS treat it the same way
```

```jsx
import { ImageBackground, View, Text, Pressable } from 'react-native';

export default function App() {
  return (
    <ImageBackground
      source={{ uri: '<https://picsum.photos/400/700>' }}
      style={{ flex: 1, justifyContent: 'flex-end' }}
      resizeMode="cover"
    >
      {/* Dark overlay */}
      <View style={{
        ...StyleSheet.absoluteFillObject,  // Covers entire image
        backgroundColor: 'rgba(0,0,0,0.4)'
      }} />

      {/* Content on top of image */}
      <View style={{ padding: 24, paddingBottom: 48 }}>
        <Text style={{
          color: 'white', fontSize: 32,
          fontWeight: 'bold', marginBottom: 8
        }}>
          Beautiful Places
        </Text>
        <Text style={{ color: 'rgba(255,255,255,0.8)', fontSize: 16, marginBottom: 24 }}>
          Discover the world around you
        </Text>
        <Pressable style={{
          backgroundColor: 'white',
          padding: 16, borderRadius: 12, alignItems: 'center'
        }}>
          <Text style={{ fontWeight: 'bold', color: '#333' }}>Explore Now</Text>
        </Pressable>
      </View>
    </ImageBackground>
  );
}
```

**Output:**

```
┌─────────────────────────┐
│  🏔️  [background photo] │
│     with dark overlay   │
│                         │
│                         │
│  Beautiful Places       │
│  Discover the world...  │
│  ┌─────────────────┐    │
│  │   Explore Now   │    │
│  └─────────────────┘    │
└─────────────────────────┘
```

---

## 12. `<TouchableOpacity>` 👆

The classic way to make things tappable — **fades the opacity** when pressed. Still widely used, though `Pressable` is now preferred.

### Under the Hood

```
<TouchableOpacity>  →  Wraps native touch handler
                    →  Animates opacity via Animated API
                    →  Works same on Android & iOS
```

```jsx
import { View, Text, TouchableOpacity, Alert } from 'react-native';

export default function App() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', gap: 16 }}>

      {/* Card that's tappable */}
      <TouchableOpacity
        onPress={() => Alert.alert('Card tapped!')}
        activeOpacity={0.7}   // ← How transparent on press (0 = invisible, 1 = no change)
        style={{
          backgroundColor: 'white',
          padding: 20, borderRadius: 16,
          width: 280,
          shadowColor: '#000',
          shadowOpacity: 0.1,
          shadowRadius: 10,
          elevation: 4,
        }}
      >
        <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Tap this card</Text>
        <Text style={{ color: '#888', marginTop: 4 }}>It fades when pressed</Text>
      </TouchableOpacity>

      {/* Icon button */}
      <TouchableOpacity
        onPress={() => Alert.alert('Liked! ❤️')}
        activeOpacity={0.6}
        style={{ padding: 12 }}
      >
        <Text style={{ fontSize: 32 }}>🤍</Text>
      </TouchableOpacity>

    </View>
  );
}
```

**Output:**

```
┌──────────────────────────┐
│  Tap this card           │  ← Normal state (full opacity)
│  It fades when pressed   │
└──────────────────────────┘

          🤍

  On Press →  both become semi-transparent
```

---

## Quick Reference Cheat Sheet

| Component | Use When | Native Equivalent |
| --- | --- | --- |
| `View` | Container / layout box | Android: `ViewGroup` / iOS: `UIView` |
| `Text` | Any text on screen | Android: `TextView` / iOS: `UILabel` |
| `Image` | Show images | Android: `ImageView` / iOS: `UIImageView` |
| `TextInput` | User input fields | Android: `EditText` / iOS: `UITextField` |
| `Pressable` | Make anything tappable (modern) | Platform touch handlers |
| `ScrollView` | Scrollable content (small lists) | Android: `ScrollView` / iOS: `UIScrollView` |
| `Button` | Quick prototype button | Platform native button |
| `Switch` | Toggle settings | Android: `Switch` / iOS: `UISwitch` |
| `FlatList` | Long scrollable lists (performant) | Android: `RecyclerView` / iOS: `UITableView` |
| `KeyboardAvoidingView` | Forms with inputs | Keyboard event listeners |
| `ImageBackground` | Image with content on top | `View` + `Image` stacked |
| `TouchableOpacity` | Tappable with fade effect (classic) | Animated opacity wrapper |