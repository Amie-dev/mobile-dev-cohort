# 📁 Expo FileSystem Complete Notes

# Modern File Handling in React Native / Expo

---

# 📖 Introduction

Modern mobile applications constantly work with files.

Examples:

* Downloading images
* Saving PDFs
* Storing videos
* Uploading documents
* Caching media
* Offline file support

To handle these operations in Expo apps, we use:

# 🚀 Expo FileSystem

---

# 🧠 What is Expo FileSystem?

Expo FileSystem is a module that allows React Native / Expo apps to work with:

✅ Files
✅ Folders
✅ Downloads
✅ Uploads
✅ Cache
✅ Local storage

inside the mobile device.

---

# 📌 Simple Definition

Expo FileSystem = file manager for Expo apps.

---

# 📦 Installation

```bash id="5kqjlwm"
npx expo install expo-file-system
```

---

# 📥 Modern Import

Expo now provides a modern object-based API.

```js id="3jlwmu"
import {
  File,
  Directory,
  Paths,
} from "expo-file-system";
```

---

# 🧠 Why Modern API is Better?

Old API used many static methods like:

```js id="z1jlwm"
FileSystem.writeAsStringAsync()
```

Modern API uses objects:

```js id="x2jlwm"
file.write()
```

Benefits:

✅ Cleaner
✅ Easier to read
✅ Easier to maintain
✅ More scalable

---

# 🚀 Core Concepts

Modern Expo FileSystem mainly uses:

| API       | Purpose                  |
| --------- | ------------------------ |
| File      | Work with files          |
| Directory | Work with folders        |
| Paths     | Access storage locations |

---

# 📂 Understanding Mobile File Storage

Mobile apps work inside their own private storage area.

---

# 🔐 Sandbox System

Apps cannot freely access all device files.

Each app gets its own protected area called:

# 📦 Sandbox

---

# 🧠 Why Sandbox Exists?

For:

✅ Security
✅ Privacy
✅ App isolation

One app cannot directly access another app’s private files.

---

# 📂 File System Structure

```txt id="v5jlwm"
App Sandbox
    ↓
Folders
    ↓
Files
```

---

# 🚀 Understanding `Paths`

---

# 🧠 What is `Paths`?

`Paths` provides access to important app storage locations.

---

# 📂 Important Paths

| Path           | Purpose           |
| -------------- | ----------------- |
| Paths.document | Permanent storage |
| Paths.cache    | Temporary storage |

---

# 📂 Paths.document

Permanent app storage.

Used for:

✅ Notes
✅ PDFs
✅ Saved exports
✅ Important user files

---

# 📂 Paths.cache

Temporary storage.

Used for:

✅ Cached images
✅ Temporary downloads
✅ Reusable files

---

# ⚠️ Important

Cache files may be deleted automatically by the system.

---

# 📌 Example

```js id="n7jlwm"
console.log(Paths.document);
console.log(Paths.cache);
```

---

# 📱 Example Output

```txt id="w4jlwm"
file:///data/user/0/app/files/
```

---

# 🚀 Understanding `File`

---

# 🧠 What is `File`?

`File` represents a single file.

Examples:

* note.txt
* image.jpg
* report.pdf
* video.mp4

---

# 📂 Create File Object

---

# ✅ Syntax

```js id="m6jlwm"
const file = new File(path, fileName);
```

---

# ✅ Example

```js id="b9jlwm"
const demoFile = new File(
  Paths.document,
  "demo.txt"
);
```

---

# 🧠 Important

This only creates a file reference.

The real file gets created after writing data.

---

# 🚀 File Properties

| Property  | Meaning            |
| --------- | ------------------ |
| exists    | File exists or not |
| uri       | File path          |
| name      | File name          |
| extension | File extension     |
| size      | File size          |

---

# ✅ Example

```js id="p2jlwm"
console.log(demoFile.exists);
console.log(demoFile.uri);
console.log(demoFile.name);
```

---

# 🚀 File Methods

| Method              | Purpose           |
| ------------------- | ----------------- |
| create()            | Create empty file |
| write()             | Write data        |
| text()              | Read text         |
| delete()            | Delete file       |
| copy()              | Copy file         |
| move()              | Move file         |
| info()              | Get file info     |
| downloadFileAsync() | Download file     |

---

# 1️⃣ create()

Creates empty file.

---

# ✅ Example

```js id="k8jlwm"
demoFile.create();
```

---

# 📂 Result

```txt id="u2jlwm"
demo.txt
```

file gets created.

---

# 🚀 2️⃣ write()

Writes data into file.

---

# ✅ Example

```js id="r1jlwm"
demoFile.write(
  "Hello Expo FileSystem 🚀"
);
```

---

# 🧠 What Happens?

```txt id="y3jlwm"
File created
      ↓
Data written
      ↓
Saved into storage
```

---

# 🚀 3️⃣ text()

Reads file content.

---

# ✅ Example

```js id="j7jlwm"
const data = demoFile.text();

console.log(data);
```

---

# 📱 Output

```txt id="f8jlwm"
Hello Expo FileSystem 🚀
```

---

# 🚀 4️⃣ Append Data

You can add new content without replacing old data.

---

# ✅ Example

```js id="l5jlwm"
demoFile.write(
  "\nNew data added",
  {
    append: true,
  }
);
```

---

# 🧠 Result

```txt id="a3jlwm"
Hello Expo FileSystem 🚀
New data added
```

---

# 🚀 5️⃣ delete()

Deletes file permanently.

---

# ✅ Example

```js id="q4jlwm"
demoFile.delete();
```

---

# ⚠️ Warning

Deleted files cannot be recovered.

---

# 🚀 6️⃣ copy()

Creates duplicate file.

---

# ✅ Example

```js id="g2jlwm"
const copiedFile = new File(
  Paths.document,
  "copy-demo.txt"
);

demoFile.copy(copiedFile);
```

---

# 📂 Result

```txt id="h1jlwm"
demo.txt
copy-demo.txt
```

Both files exist.

---

# 🚀 7️⃣ move()

Moves file to another location.

---

# ✅ Example

```js id="t7jlwm"
const movedFile = new File(
  Paths.document,
  "moved-demo.txt"
);

demoFile.move(movedFile);
```

---

# 📌 Result

Original file disappears.

---

# 🧠 Difference Between Copy & Move

| Method | Result            |
| ------ | ----------------- |
| copy() | Duplicate created |
| move() | Original removed  |

---

# 🚀 8️⃣ info()

Returns file information.

---

# ✅ Example

```js id="e8jlwm"
const info = demoFile.info();

console.log(info);
```

---

# 📱 Example Output

```js id="s4jlwm"
{
  exists: true,
  size: 120,
  uri: "file:///..."
}
```

---

# 🚀 9️⃣ downloadFileAsync()

Downloads file from internet.

---

# ✅ Example

```js id="n1jlwm"
const imageFile = await File.downloadFileAsync(
  "https://picsum.photos/300",
  Paths.cache
);
```

---

# 🧠 Download Flow

```txt id="c4jlwm"
Internet File
      ↓
Download
      ↓
Saved into app storage
```

---

# 🚀 Understanding `Directory`

---

# 🧠 What is `Directory`?

`Directory` represents folders.

Used for:

✅ Create folders
✅ Organize files
✅ Read folder contents
✅ Delete folders

---

# 📂 Create Directory Object

---

# ✅ Example

```js id="m4jlwm"
const notesFolder = new Directory(
  Paths.document,
  "notes"
);
```

---

# 🚀 Directory Properties

| Property | Meaning       |
| -------- | ------------- |
| exists   | Folder exists |
| uri      | Folder path   |
| name     | Folder name   |

---

# 🚀 Directory Methods

| Method   | Purpose              |
| -------- | -------------------- |
| create() | Create folder        |
| list()   | Read folder contents |
| delete() | Delete folder        |
| move()   | Move folder          |
| copy()   | Copy folder          |

---

# 1️⃣ create()

Creates folder.

---

# ✅ Example

```js id="x8jlwm"
notesFolder.create();
```

---

# 📂 Result

```txt id="o7jlwm"
document/
   notes/
```

---

# 🚀 2️⃣ list()

Reads files inside folder.

---

# ✅ Example

```js id="i9jlwm"
const files = notesFolder.list();

console.log(files);
```

---

# 📱 Example Output

```js id="w2jlwm"
[
  "note1.txt",
  "note2.txt"
]
```

---

# 🚀 3️⃣ delete()

Deletes folder and all files inside it.

---

# ✅ Example

```js id="d7jlwm"
notesFolder.delete();
```

---

# ⚠️ Warning

All files inside folder also get deleted.

---

# 🚀 Full Practical Example

---

# ✅ Notes App Example

```js id="k3jlwm"
import {
  File,
  Directory,
  Paths,
} from "expo-file-system";

// Create folder
const notesDir = new Directory(
  Paths.document,
  "notes"
);

notesDir.create();

// Create file
const noteFile = new File(
  notesDir,
  "note1.txt"
);

// Write data
noteFile.write(
  "Learning Expo FileSystem"
);

// Read data
const content = noteFile.text();

console.log(content);
```

---

# 📱 Output

```txt id="t1jlwm"
Learning Expo FileSystem
```

---

# 🚀 Download Image Example

```js id="u6jlwm"
const imageFile =
  await File.downloadFileAsync(
    "https://picsum.photos/300",
    Paths.cache
  );

console.log(imageFile.uri);
```

---

# 🚀 FileSystem + Offline Apps

FileSystem is heavily used in offline-first apps.

---

# 📂 Offline Flow

```txt id="b1jlwm"
Internet Available
      ↓
Download Files
      ↓
Store Locally
      ↓
Internet Lost
      ↓
Still Access Files
```

---

# 🚀 FileSystem + SQLite

Large apps usually combine:

| Technology | Purpose            |
| ---------- | ------------------ |
| SQLite     | Structured data    |
| FileSystem | Images/files/media |

---

# 📌 Example

| Data        | Storage    |
| ----------- | ---------- |
| User posts  | SQLite     |
| Post images | FileSystem |

---

# 🚀 Real World Examples

| App          | FileSystem Usage  |
| ------------ | ----------------- |
| WhatsApp     | Media storage     |
| Spotify      | Offline songs     |
| Netflix      | Downloaded videos |
| Notes App    | Exported files    |
| Learning App | Offline PDFs      |

---

# ⚠️ Common Beginner Mistakes

| Mistake                         | Problem        |
| ------------------------------- | -------------- |
| Using cache for important files | Data loss      |
| Forgetting existence check      | Runtime errors |
| Confusing File vs Directory     | Logic bugs     |
| Storing huge files carelessly   | Storage issues |

---

# 🚀 Best Practices

---

# ✅ Use `Paths.document` for permanent files

Examples:

* PDFs
* Notes
* Saved reports

---

# ✅ Use `Paths.cache` for temporary files

Examples:

* Cached images
* Temporary downloads

---

# ✅ Organize Files Properly

Good structure:

```txt id="z6jlwm"
documents/
   images/
   videos/
   notes/
   downloads/
```

---

# ✅ Check Existence Before Reading

```js id="y5jlwm"
if (demoFile.exists) {
  console.log(demoFile.text());
}
```

---

# ✅ Clean Old Cache

Unused cache wastes storage.

---

# 🚀 Lifecycle

| Event         | File Status     |
| ------------- | --------------- |
| App restart   | ✅ Usually stays |
| Device reboot | ✅ Usually stays |
| App uninstall | ❌ Removed       |

---

# 🔥 Modern API vs Old API

| Old API            | Modern API     |
| ------------------ | -------------- |
| writeAsStringAsync | file.write()   |
| readAsStringAsync  | file.text()    |
| documentDirectory  | Paths.document |
| cacheDirectory     | Paths.cache    |

---

# 🧠 Summary

Today we learned:

✅ Modern Expo FileSystem
✅ File class
✅ Directory class
✅ Paths API
✅ Sandbox system
✅ File creation
✅ Reading/writing files
✅ Copy/move/delete
✅ Downloading files
✅ Folder management
✅ Offline file handling
✅ Cache vs document storage

---

# 🎯 Final Conclusion

Expo FileSystem is one of the most important modules in React Native / Expo development.

It helps developers build:

✅ Offline apps
✅ Download systems
✅ Media-heavy apps
✅ File management systems
✅ Production-ready mobile applications

Mastering Expo FileSystem is essential for becoming an advanced Expo developer 🚀
