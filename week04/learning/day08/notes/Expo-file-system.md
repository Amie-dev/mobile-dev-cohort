# 📁 Complete Modern Expo FileSystem Notes

# React Native / Expo File Management (Deep Dive)

---

# 📖 Introduction

Modern mobile apps constantly work with files.

Examples:

* Downloading PDFs
* Saving images/videos
* Exporting reports
* Uploading documents
* Caching media
* Managing offline content

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
✅ Device storage

inside the app sandbox.

---

# 📌 Simple Definition

Expo FileSystem = local file manager for Expo apps.

---

# 📦 Installation

```bash id="z9p9e4"
npx expo install expo-file-system
```

---

# 📥 Modern Import

```js id="7mjlwm"
import {
  File,
  Directory,
  Paths,
} from "expo-file-system";
```

---

# 🧠 Modern Expo FileSystem API

Expo introduced a cleaner object-oriented API.

Instead of:

```js id="6h4mzp"
FileSystem.writeAsStringAsync()
```

Now we use:

```js id="8dxnfg"
file.write()
```

This modern API is:

✅ Cleaner
✅ Easier to read
✅ Easier to maintain
✅ More scalable

---

# 🚀 Core Parts of Modern API

| API       | Purpose             |
| --------- | ------------------- |
| File      | Work with files     |
| Directory | Work with folders   |
| Paths     | Access system paths |

---

# 🧠 Understanding the File System

---

# 📂 Real World Analogy

Think about your laptop:

```txt id="0ngvte"
Documents/
Images/
Videos/
Downloads/
```

Mobile apps also work similarly.

---

# 📂 FileSystem Structure

```txt id="5k3wtg"
App Sandbox
    ↓
Folders
    ↓
Files
```

---

# 🔐 Sandbox System

---

# 🧠 What is Sandbox?

Mobile apps cannot freely access all device files.

Each app gets its own protected private storage area.

This protected area is called:

# 📦 Sandbox

---

# 🚀 Why Sandbox Exists?

For:

✅ Security
✅ Privacy
✅ App isolation

---

# 📌 Important

One app CANNOT directly access another app’s private files.

---

# 🧠 Understanding Paths

---

# 🚀 What is `Paths`?

`Paths` provides access to important app directories.

---

# 📂 Common Paths

| Path           | Purpose           |
| -------------- | ----------------- |
| Paths.document | Permanent storage |
| Paths.cache    | Temporary storage |

---

# 📂 Paths.document

Permanent storage.

Used for:

✅ User documents
✅ PDFs
✅ Saved exports
✅ Important files

---

# 📂 Paths.cache

Temporary storage.

Used for:

✅ Cached images
✅ Temporary downloads
✅ Reusable files

---

# ⚠️ Important Difference

| Feature              | document        | cache           |
| -------------------- | --------------- | --------------- |
| Permanent            | ✅ Yes           | ❌ No            |
| Auto delete possible | ❌ Rare          | ✅ Yes           |
| Best for             | Important files | Temporary files |

---

# 📌 Example

```js id="6jff1r"
console.log(Paths.document);
console.log(Paths.cache);
```

---

# 📱 Example Output

```txt id="y9fkso"
file:///data/user/0/app/files/
```

---

# 🚀 Understanding `File`

---

# 🧠 What is File?

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

```js id="h1sq4v"
const file = new File(path, name);
```

---

# ✅ Example

```js id="cbsypv"
const file = new File(
  Paths.document,
  "note.txt"
);
```

---

# 🧠 Important

This only creates a file reference.

The actual file gets created after writing data.

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

```js id="7v4r38"
console.log(file.exists);
console.log(file.uri);
console.log(file.name);
```

---

# 🚀 File Methods

| Method              | Purpose           |
| ------------------- | ----------------- |
| write()             | Write file        |
| text()              | Read text         |
| delete()            | Delete file       |
| copy()              | Copy file         |
| move()              | Move file         |
| create()            | Create empty file |
| downloadFileAsync() | Download file     |

---

# 1️⃣ create()

Creates empty file.

---

# ✅ Example

```js id="l8jlwm"
file.create();
```

---

# 📌 Result

```txt id="ygp3rw"
note.txt
```

gets created.

---

# 🚀 2️⃣ write()

Used to write data into file.

---

# ✅ Example

```js id="gbw19v"
file.write("Hello World");
```

---

# 🧠 What Happens?

```txt id="x41brg"
File created
      ↓
Text written
      ↓
Saved into storage
```

---

# 🚀 3️⃣ text()

Reads text content from file.

---

# ✅ Example

```js id="bshwj7"
const content = file.text();

console.log(content);
```

---

# 📱 Output

```txt id="94c31l"
Hello World
```

---

# 🚀 4️⃣ delete()

Deletes file permanently.

---

# ✅ Example

```js id="c5ohye"
file.delete();
```

---

# ⚠️ Warning

Deleted files cannot be recovered.

---

# 🚀 5️⃣ copy()

Creates duplicate file.

---

# ✅ Example

```js id="v6fjxv"
const copiedFile = new File(
  Paths.document,
  "copy.txt"
);

file.copy(copiedFile);
```

---

# 📂 Result

```txt id="f8bjzj"
note.txt
copy.txt
```

Both files exist.

---

# 🚀 6️⃣ move()

Moves file to another location.

---

# ✅ Example

```js id="bvf4rg"
const movedFile = new File(
  Paths.cache,
  "moved.txt"
);

file.move(movedFile);
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

# 🚀 7️⃣ downloadFileAsync()

Downloads file from internet.

---

# ✅ Example

```js id="oqfpfu"
const imageFile = new File(
  Paths.cache,
  "image.jpg"
);

await imageFile.downloadFileAsync(
  "https://picsum.photos/300"
);
```

---

# 🧠 Download Flow

```txt id="pjkfdp"
Internet File
      ↓
Download
      ↓
Saved inside app storage
```

---

# 🚀 Understanding `Directory`

---

# 🧠 What is Directory?

`Directory` represents folders.

Used for:

✅ Create folders
✅ Organize files
✅ List folder files
✅ Delete folders

---

# 📂 Create Directory Object

---

# ✅ Example

```js id="i3m9b7"
const notesDir = new Directory(
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
| delete() | Delete folder        |
| list()   | Read folder contents |
| move()   | Move folder          |
| copy()   | Copy folder          |

---

# 1️⃣ create()

Creates folder.

---

# ✅ Example

```js id="k9pxqh"
notesDir.create();
```

---

# 📂 Result

```txt id="lzj2rk"
document/
   notes/
```

---

# 🚀 2️⃣ list()

Reads folder contents.

---

# ✅ Example

```js id="8eg7hj"
const files = notesDir.list();

console.log(files);
```

---

# 📱 Example Output

```js id="jlwmgn"
[
  "note1.txt",
  "note2.txt"
]
```

---

# 🚀 3️⃣ delete()

Deletes folder and contents.

---

# ✅ Example

```js id="b7szib"
notesDir.delete();
```

---

# ⚠️ Warning

All files inside folder also get deleted.

---

# 🚀 Full Practical Example

---

# ✅ Notes App Storage Example

```js id="1hbzv5"
import {
  File,
  Directory,
  Paths,
} from "expo-file-system";

// Create notes directory
const notesDir = new Directory(
  Paths.document,
  "notes"
);

if (!notesDir.exists) {
  notesDir.create();
}

// Create note file
const noteFile = new File(
  notesDir,
  "note1.txt"
);

// Write note
noteFile.write(
  "Learning modern Expo FileSystem"
);

// Read note
const content = noteFile.text();

console.log(content);
```

---

# 📱 Output

```txt id="ejlly5"
Learning modern Expo FileSystem
```

---

# 🚀 FileSystem + Offline Apps

FileSystem is extremely important for offline apps.

---

# 📂 Offline Flow

```txt id="r08smt"
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

# 🚀 FileSystem + Image Caching

---

# 📌 Why Cache Images?

Benefits:

✅ Faster loading
✅ Better UX
✅ Reduced network usage
✅ Offline viewing

---

# ✅ Example

```js id="x95mtw"
const cachedImage = new File(
  Paths.cache,
  "profile.jpg"
);

await cachedImage.downloadFileAsync(
  imageUrl
);
```

---

# 🚀 FileSystem + SQLite

Large apps usually combine:

| Technology | Purpose         |
| ---------- | --------------- |
| SQLite     | Structured data |
| FileSystem | Media/files     |

---

# 📌 Example

| Data        | Storage    |
| ----------- | ---------- |
| User posts  | SQLite     |
| Post images | FileSystem |

---

# 🚀 Real World App Examples

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
| Storing too many large files    | Storage issues |

---

# 🚀 Best Practices

---

# ✅ Use `Paths.document` for permanent files

Examples:

* PDFs
* Reports
* Notes
* Saved exports

---

# ✅ Use `Paths.cache` for temporary files

Examples:

* Cached images
* Temporary downloads

---

# ✅ Organize Files Properly

Good structure:

```txt id="q2tjlwm"
documents/
   images/
   videos/
   notes/
   downloads/
```

---

# ✅ Check Existence Before Reading

```js id="u1ur3j"
if (file.exists) {
  console.log(file.text());
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
✅ Real-world architecture

---

# 🎯 Final Conclusion

Modern Expo FileSystem makes file handling much cleaner and easier in React Native / Expo applications.

Using:

```js id="d5w5k4"
File
Directory
Paths
```

developers can build:

✅ Offline-first apps
✅ Download systems
✅ Media-heavy apps
✅ File management systems
✅ Production-ready mobile applications

Mastering Expo FileSystem is essential for advanced React Native / Expo development 🚀
