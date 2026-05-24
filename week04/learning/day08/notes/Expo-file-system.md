# 📁 Complete Expo FileSystem Notes

# Expo File System in React Native / Expo

---

# 📖 Introduction

Mobile applications often need to work with files.

Examples:

* Download PDFs
* Save images
* Cache videos
* Upload documents
* Store reports
* Manage folders
* Read/write local files

Expo provides:

# 🚀 Expo FileSystem

to handle these operations.

---

# 🧠 What is Expo FileSystem?

Expo FileSystem is a module that allows React Native / Expo apps to interact with files and directories inside the device.

It helps apps:

✅ Create files
✅ Read files
✅ Write files
✅ Delete files
✅ Move/copy files
✅ Download files
✅ Upload files
✅ Manage folders

---

# 📌 Simple Definition

Expo FileSystem = local file manager for Expo apps.

---

# 📦 Installation

## Expo

```bash id="0o4j7h"
npx expo install expo-file-system
```

---

# 📥 Import

```js id="4m0vsz"
import * as FileSystem from "expo-file-system";
```

---

# 🚀 Why FileSystem is Important?

Many apps need local file handling.

Examples:

| App Type       | File Usage    |
| -------------- | ------------- |
| WhatsApp       | Images/videos |
| Notes App      | Export files  |
| Music App      | Offline songs |
| E-learning App | Download PDFs |
| Camera App     | Store photos  |
| Chat App       | Media cache   |

---

# 📂 Core Concepts

---

# 1️⃣ File Path

Every file has a unique path.

Example:

```txt id="4r5bkl"
file://data/user/0/app/files/
```

---

# 📌 File URI

Files are usually accessed using:

```txt id="b17r6w"
file://
```

URI format.

---

# 2️⃣ Sandbox System

---

# 🔐 What is Sandbox?

Mobile apps cannot access all device files directly.

Each app works inside a protected private area called:

# 📦 Sandbox

---

# 🧠 Why Sandbox Exists?

For:

✅ Security
✅ Privacy
✅ App isolation

One app cannot access another app’s private files.

---

# 📂 Sandbox Structure

```txt id="w0r3fi"
Your App
   ↓
Private Sandbox
   ↓
Files & Folders
```

---

# 🚀 Important Directories

Expo FileSystem provides useful directories.

---

# 📂 documentDirectory

Permanent app storage.

Used for:

* Saved files
* User documents
* Downloaded PDFs
* Offline data

---

# 📂 cacheDirectory

Temporary storage.

Used for:

* Cached images
* Temporary downloads
* Reusable files

---

# 🔥 Difference

| Directory         | Purpose           |
| ----------------- | ----------------- |
| documentDirectory | Permanent storage |
| cacheDirectory    | Temporary storage |

---

# ⚠️ Lifecycle

| Event         | documentDirectory | cacheDirectory |
| ------------- | ----------------- | -------------- |
| App restart   | ✅ Stays           | ⚠️ May clear   |
| Device reboot | ✅ Stays           | ⚠️ May clear   |
| App uninstall | ❌ Deleted         | ❌ Deleted      |

---

# 📌 Directory Example

```js id="z1x1n8"
console.log(
  FileSystem.documentDirectory
);
```

Example output:

```txt id="tfdkt8"
file:///data/user/0/app/files/
```

---

# 🚀 Core File Operations

| Operation     | Purpose            |
| ------------- | ------------------ |
| Read file     | Get file data      |
| Write file    | Save data          |
| Delete file   | Remove file        |
| Move file     | Change location    |
| Copy file     | Duplicate file     |
| Upload file   | Send to server     |
| Download file | Save from internet |

---

# 1️⃣ Create & Write File

---

# ✅ writeAsStringAsync()

Used to create/write files.

---

# 📌 Example

```js id="3t5mg3"
const path =
  FileSystem.documentDirectory +
  "hello.txt";

await FileSystem.writeAsStringAsync(
  path,
  "Hello World"
);
```

---

# 🧠 What Happens?

```txt id="9lfh7f"
documentDirectory
       +
hello.txt
       ↓
Creates file
       ↓
Writes text
```

---

# 🚀 Read File

---

# ✅ readAsStringAsync()

Used to read file content.

---

# 📌 Example

```js id="m6x8w6"
const data =
  await FileSystem.readAsStringAsync(
    path
  );

console.log(data);
```

---

# 📱 Output

```txt id="0z8n3w"
Hello World
```

---

# 🚀 Delete File

---

# ✅ deleteAsync()

Used to remove files.

---

# 📌 Example

```js id="r5n5t4"
await FileSystem.deleteAsync(path);
```

---

# 🚀 Check File Info

---

# ✅ getInfoAsync()

Used to check file existence/details.

---

# 📌 Example

```js id="g4z6gg"
const info =
  await FileSystem.getInfoAsync(path);

console.log(info);
```

---

# 📱 Example Output

```js id="vlwyzn"
{
  exists: true,
  isDirectory: false,
  size: 120
}
```

---

# 🚀 Create Folder

---

# ✅ makeDirectoryAsync()

Creates folders.

---

# 📌 Example

```js id="6qxtjc"
const folder =
  FileSystem.documentDirectory +
  "notes/";

await FileSystem.makeDirectoryAsync(
  folder
);
```

---

# 🚀 Read Folder Files

---

# ✅ readDirectoryAsync()

Reads folder contents.

---

# 📌 Example

```js id="6y8h7g"
const files =
  await FileSystem.readDirectoryAsync(
    FileSystem.documentDirectory
  );

console.log(files);
```

---

# 🚀 Move File

---

# ✅ moveAsync()

Moves file to another location.

---

# 📌 Example

```js id="0uvy9r"
await FileSystem.moveAsync({
  from: oldPath,
  to: newPath,
});
```

---

# 🚀 Copy File

---

# ✅ copyAsync()

Duplicates files.

---

# 📌 Example

```js id="z69r8x"
await FileSystem.copyAsync({
  from: source,
  to: destination,
});
```

---

# 🚀 Download File

---

# ✅ downloadAsync()

Downloads files from internet.

---

# 📌 Example

```js id="m5mjlwm"
const fileUri =
  FileSystem.documentDirectory +
  "image.jpg";

await FileSystem.downloadAsync(
  "https://picsum.photos/300",
  fileUri
);
```

---

# 🧠 Download Flow

```txt id="9l6c5o"
Internet File
      ↓
downloadAsync()
      ↓
Saved into device storage
```

---

# 🚀 Upload File

Files can also be uploaded to servers.

---

# 📌 Example

```js id="0l9n2o"
await FileSystem.uploadAsync(
  "https://example.com/upload",
  fileUri
);
```

---

# 🚀 Full Example

---

# ✅ Create + Read File

```js id="9i2l5u"
import * as FileSystem from "expo-file-system";

const path =
  FileSystem.documentDirectory +
  "note.txt";

// Write file
await FileSystem.writeAsStringAsync(
  path,
  "Learning Expo FileSystem"
);

// Read file
const data =
  await FileSystem.readAsStringAsync(
    path
  );

console.log(data);
```

---

# 📱 Output

```txt id="7a0g4j"
Learning Expo FileSystem
```

---

# 🚀 Image Cache Example

---

# 📌 Download Image

```js id="fyxywh"
const imagePath =
  FileSystem.cacheDirectory +
  "profile.jpg";

await FileSystem.downloadAsync(
  imageUrl,
  imagePath
);
```

---

# 🧠 Why Cache Images?

Benefits:

✅ Faster loading
✅ Offline viewing
✅ Reduced API calls

---

# 🚀 FileSystem + Offline Apps

FileSystem is heavily used for:

* Offline downloads
* Cached media
* Offline learning apps
* Saved documents

---

# 📂 Offline Flow

```txt id="n0x3vr"
Internet Available
      ↓
Download File
      ↓
Store in FileSystem
      ↓
Offline Access Later
```

---

# 🚀 FileSystem + Camera

Camera photos are usually stored using FileSystem.

---

# 📌 Example Flow

```txt id="7mrr08"
Take Photo
    ↓
Get File URI
    ↓
Save to documentDirectory
```

---

# 🚀 FileSystem + SQLite

Large apps often combine:

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

# ⚠️ Common Beginner Mistakes

| Mistake                        | Problem          |
| ------------------------------ | ---------------- |
| Using wrong path               | File not found   |
| Forgetting await               | Promise issues   |
| Storing huge files carelessly  | Storage problems |
| Using cache for permanent data | Data loss        |

---

# 🚀 Best Practices

---

# ✅ Use cacheDirectory for temporary files

Examples:

* Cached images
* Temporary downloads

---

# ✅ Use documentDirectory for permanent files

Examples:

* PDFs
* Saved notes
* Exported reports

---

# ✅ Check File Existence

Before reading files.

```js id="8w44xz"
const info =
  await FileSystem.getInfoAsync(path);

if (info.exists) {
  console.log("File exists");
}
```

---

# ✅ Clean Unused Cache

Too much cache wastes storage.

---

# 🚀 Lifecycle

| Event         | File Status     |
| ------------- | --------------- |
| App restart   | ✅ Usually stays |
| Device reboot | ✅ Usually stays |
| App uninstall | ❌ Files removed |

---

# 🔥 FileSystem vs AsyncStorage

| Feature           | FileSystem  | AsyncStorage |
| ----------------- | ----------- | ------------ |
| File handling     | ✅ Yes       | ❌ No         |
| Large media       | ✅ Good      | ❌ Bad        |
| Key-value storage | ❌ No        | ✅ Yes        |
| Images/videos     | ✅ Excellent | ❌ Poor       |

---

# 🔥 FileSystem vs SQLite

| Feature             | FileSystem | SQLite      |
| ------------------- | ---------- | ----------- |
| Media files         | ✅ Best     | ❌ Not ideal |
| Structured data     | ❌ Weak     | ✅ Excellent |
| Searching/filtering | ❌ Limited  | ✅ Powerful  |

---

# 📱 Real World Examples

| Feature          | Technology |
| ---------------- | ---------- |
| Offline PDFs     | FileSystem |
| Downloaded songs | FileSystem |
| Cached images    | FileSystem |
| Chat media       | FileSystem |
| Notes database   | SQLite     |

---

# 🧠 Summary

Today we learned:

✅ What Expo FileSystem is
✅ Installation & setup
✅ Sandbox system
✅ documentDirectory
✅ cacheDirectory
✅ Read/write files
✅ Delete/copy/move files
✅ Download/upload files
✅ Folder management
✅ Offline file storage
✅ Best practices

---

# 🎯 Final Conclusion

Expo FileSystem is one of the most important modules for handling local files in React Native / Expo apps.

It helps developers build:

✅ Offline apps
✅ Media-heavy apps
✅ Download systems
✅ File management systems
✅ Production-ready mobile applications

Mastering Expo FileSystem is essential for advanced mobile app development 🚀
