# 📂 Expo Document Picker (`expo-document-picker`) — Complete Deep Notes

## What is Expo Document Picker?

`expo-document-picker` allows users to **select files from their device storage**.

Unlike `expo-image-picker` (photos/videos only), Document Picker can pick:

✅ PDF files

✅ DOC/DOCX

✅ PPT/PPTX

✅ Excel files

✅ ZIP files

✅ Text files

✅ Images

✅ Videos

✅ Any supported file type

---

# Why Do We Need Document Picker?

Many apps require users to upload files.

Examples:

| App               | File Usage           |
| ----------------- | -------------------- |
| Gmail             | Attach PDF           |
| Google Drive      | Upload files         |
| LinkedIn          | Upload Resume        |
| WhatsApp          | Send Documents       |
| University Portal | Submit Assignment    |
| Banking Apps      | Upload KYC Documents |

---

# Installation

```bash
npx expo install expo-document-picker
```

---

# What Can Document Picker Do?

```txt
expo-document-picker
│
├── Open File Picker
├── Pick Single File
├── Pick Multiple Files
├── Filter File Types
├── Access File Metadata
└── Upload Selected Files
```

---

# Typical Flow

```txt
User Clicks Upload
        ↓
Open Document Picker
        ↓
User Selects File
        ↓
Receive File Information
        ↓
Upload / Process File
```

---

# Import

```tsx
import * as DocumentPicker from "expo-document-picker";
```

---

# Pick a File

Most basic example.

```tsx
const result =
  await DocumentPicker.getDocumentAsync();
```

System opens:

```txt
Files App
Downloads
Google Drive
Documents
```

---

# Result Structure

```tsx
{
  assets: [
    {
      uri: "...",
      name: "resume.pdf",
      size: 245678,
      mimeType: "application/pdf"
    }
  ],

  canceled: false
}
```

---

# Simple Example

```tsx
import * as DocumentPicker from "expo-document-picker";

const pickFile = async () => {
  const result =
    await DocumentPicker.getDocumentAsync();

  console.log(result);
};
```

---

# Handling Cancellation

User may close picker without selecting a file.

```tsx
const result =
  await DocumentPicker.getDocumentAsync();

if (result.canceled) {
  return;
}
```

Always handle this case.

---

# Access Selected File

```tsx
const result =
  await DocumentPicker.getDocumentAsync();

if (!result.canceled) {
  const file = result.assets[0];

  console.log(file.name);
}
```

---

# File Object

| Property   | Description        | Example           |
| ---------- | ------------------ | ----------------- |
| `uri`      | File location      | `file:///...`     |
| `name`     | File name          | `resume.pdf`      |
| `size`     | File size in bytes | `245678`          |
| `mimeType` | File type          | `application/pdf` |

---

# Example Output

```tsx
{
  uri:
    "file:///storage/resume.pdf",

  name:
    "resume.pdf",

  size:
    245678,

  mimeType:
    "application/pdf"
}
```

---

# Restrict File Types

You can allow only specific file types.

---

## PDF Only

```tsx
await DocumentPicker.getDocumentAsync({
  type: "application/pdf",
});
```

---

## Images Only

```tsx
await DocumentPicker.getDocumentAsync({
  type: "image/*",
});
```

---

## Videos Only

```tsx
await DocumentPicker.getDocumentAsync({
  type: "video/*",
});
```

---

## Multiple Types

```tsx
await DocumentPicker.getDocumentAsync({
  type: [
    "application/pdf",
    "image/*",
  ],
});
```

---

# Common MIME Types

| Type  | MIME                       |
| ----- | -------------------------- |
| PDF   | `application/pdf`          |
| Image | `image/*`                  |
| Video | `video/*`                  |
| Audio | `audio/*`                  |
| Word  | `application/msword`       |
| Excel | `application/vnd.ms-excel` |
| ZIP   | `application/zip`          |

---

# Pick Multiple Files

```tsx
const result =
  await DocumentPicker.getDocumentAsync({
    multiple: true,
  });
```

Result:

```tsx
assets: [
  {...},
  {...},
  {...}
]
```

---

# Example

```tsx
if (!result.canceled) {
  result.assets.forEach(file => {
    console.log(file.name);
  });
}
```

---

# Upload File to Server

Most common use case.

```txt
Select File
      ↓
Upload API
```

---

## Example

```tsx
const file =
  result.assets[0];

const formData =
  new FormData();

formData.append("file", {
  uri: file.uri,
  name: file.name,
  type: file.mimeType,
} as any);

await fetch(API_URL, {
  method: "POST",
  body: formData,
});
```

---

# Display File Information

```tsx
<Text>{file.name}</Text>
<Text>{file.size}</Text>
<Text>{file.mimeType}</Text>
```

Output:

```txt
resume.pdf
245 KB
application/pdf
```

---

# File Size Conversion

Bytes are hard to read.

Convert:

```tsx
const sizeInMB =
  (file.size / 1024 / 1024).toFixed(2);
```

Example:

```txt
3.45 MB
```

---

# File Validation

Always validate before upload.

---

## Example

```tsx
if (file.size > 10 * 1024 * 1024) {
  alert("Maximum 10MB allowed");
  return;
}
```

---

# Validate File Type

```tsx
if (
  file.mimeType !==
  "application/pdf"
) {
  alert("Only PDF allowed");
}
```

---

# Resume Upload Example

LinkedIn-style:

```txt
Upload Resume
      ↓
PDF Only
      ↓
Store Resume
```

```tsx
await DocumentPicker.getDocumentAsync({
  type: "application/pdf",
});
```

---

# Assignment Submission Example

```txt
Student Uploads PDF
       ↓
Validate Size
       ↓
Upload
```

---

# KYC Verification Example

```txt
Choose Aadhaar
      ↓
Upload Document
      ↓
Verify
```

---

# Chat Application Example

```txt
WhatsApp
      ↓
Attach Document
      ↓
Send PDF
```

---

# Google Drive Example

```txt
Select File
      ↓
Upload
      ↓
Cloud Storage
```

---

# Reading File Content

Document Picker only selects files.

To read content:

```txt
expo-document-picker
         +
expo-file-system
```

---

Example:

```tsx
import * as FileSystem
from "expo-file-system";
```

```tsx
const content =
  await FileSystem.readAsStringAsync(
    file.uri
  );
```

---

# Document Picker + File System

Very common combination.

```txt
Document Picker
        ↓
Get URI
        ↓
File System
        ↓
Read File
```

---

# Document Picker + Sharing

```txt
Pick File
      ↓
Share File
```

Using:

```txt
expo-sharing
```

---

# Document Picker + Upload

```txt
Pick File
      ↓
Axios / Fetch
      ↓
Backend Server
```

---

# Platform Behavior

| Platform | Support |
| -------- | ------- |
| Android  | ✅       |
| iOS      | ✅       |
| Web      | ✅       |

---

# Common Use Cases

## Resume Upload

```txt
LinkedIn
Naukri
Indeed
```

---

## Assignment Submission

```txt
School Apps
College Apps
```

---

## KYC Verification

```txt
Bank Apps
UPI Apps
```

---

## Chat Apps

```txt
WhatsApp
Telegram
Discord
```

---

## Cloud Storage

```txt
Google Drive
Dropbox
OneDrive
```

---

# Common Mistakes

## Mistake 1

Ignoring cancellation.

❌

```tsx
result.assets[0]
```

without checking:

```tsx
result.canceled
```

---

## Mistake 2

Not validating file size.

User selects:

```txt
500 MB Video
```

Upload crashes.

---

## Mistake 3

Not validating file type.

Expected:

```txt
PDF
```

User uploads:

```txt
ZIP
```

---

## Mistake 4

Trying to read file directly.

Document Picker only provides:

```txt
URI
```

Use:

```txt
expo-file-system
```

for reading.

---

# Best Practices

### 1. Always Check Cancellation

```tsx
if (result.canceled) return;
```

---

### 2. Validate File Size

```txt
Prevent Huge Uploads
```

---

### 3. Validate MIME Type

```txt
Allow Only Expected Files
```

---

### 4. Show Upload Progress

For large files.

---

### 5. Combine with File System

For reading file content.

---

# Document Picker vs Image Picker

| Feature        | Document Picker | Image Picker |
| -------------- | --------------- | ------------ |
| PDF            | ✅               | ❌            |
| DOCX           | ✅               | ❌            |
| Excel          | ✅               | ❌            |
| ZIP            | ✅               | ❌            |
| Images         | ✅               | ✅            |
| Videos         | ✅               | ✅            |
| Camera Access  | ❌               | ✅            |
| Gallery Access | Limited         | ✅            |

---

# Expo Ecosystem Integration

## Document Picker + File System

```txt
Pick
↓
Read
```

---

## Document Picker + Sharing

```txt
Pick
↓
Share
```

---

## Document Picker + Network

```txt
Pick
↓
Upload
```

---

## Document Picker + SQLite

```txt
Store File Metadata
```

---

# Most Important API

## `getDocumentAsync()`

```tsx
const result =
  await DocumentPicker.getDocumentAsync({
    type: "application/pdf",
    multiple: true,
  });
```

---

# Final Mental Model

```txt
expo-document-picker
│
├── Open Native File Picker
│
├── Select Files
│   ├── PDF
│   ├── DOCX
│   ├── XLSX
│   ├── Images
│   ├── Videos
│   └── ZIP
│
├── Access Metadata
│   ├── URI
│   ├── Name
│   ├── Size
│   └── MIME Type
│
├── Validate Files
│
├── Upload Files
│
└── Read Files
    └── expo-file-system
```

# Quick Memory Trick

```txt
expo-document-picker
        ↓
Choose File
        ↓
Get URI + Metadata
        ↓
Validate
        ↓
Read / Upload / Share
```

## Real-World Workflow

```txt
User Clicks Upload
        ↓
Document Picker Opens
        ↓
User Selects PDF
        ↓
Receive File URI
        ↓
Validate File
        ↓
Upload to Server
        ↓
Success
```

### Most Common Combination

```txt
expo-document-picker
+
expo-file-system
+
fetch / axios
+
expo-sharing
```

This combination powers **resume uploads, document sharing, assignment submission, KYC verification, cloud storage apps, and chat applications**. 📂📱🚀
