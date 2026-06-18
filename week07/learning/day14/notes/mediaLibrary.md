# 📸 Expo Media Library (`expo-media-library`) — Complete Deep Notes

## What is Expo Media Library?

`expo-media-library` allows your app to interact with the device's **photo gallery and media storage**.

Think of it as a bridge between your app and the user's:

* Photos
* Videos
* Albums
* Camera Roll
* Gallery

It lets you:

✅ Save photos to gallery

✅ Save videos to gallery

✅ Read photos from gallery

✅ Read videos from gallery

✅ Create albums

✅ Move media between albums

✅ Delete media

✅ Get media metadata

---

# Real-World Examples

## Instagram

Uses Media Library to:

```txt
Select existing photos
Select existing videos
Save edited photos
Save downloaded content
```

---

## WhatsApp

Uses Media Library to:

```txt
Send photos
Send videos
Save received media
```

---

## Google Photos

Uses Media Library to:

```txt
Read all photos
Create albums
Backup media
Manage gallery
```

---

## Pocket Files App

Uses Media Library to:

```txt
Import gallery files
Organize photos
Save exported images
Create media collections
```

---

# Installation

```bash
npx expo install expo-media-library
```

---

# Permissions

Before accessing the gallery, your app must request permission.

```txt
Gallery Access
      ↓
Permission Request
      ↓
Granted / Denied
```

Without permission:

```txt
Cannot read photos
Cannot save photos
Cannot access albums
```

---

# Configuration

## Android

Expo automatically handles most permissions.

Sometimes you may add:

```json
{
  "expo": {
    "plugins": [
      "expo-media-library"
    ]
  }
}
```

---

## iOS

Permission message:

```json
{
  "expo": {
    "plugins": [
      [
        "expo-media-library",
        {
          "photosPermission": "Allow access to your photos."
        }
      ]
    ]
  }
}
```

After changing plugin configuration:

```txt
Create a new native build
```

---

# Permission Hook

Most common approach:

```tsx
import * as MediaLibrary from "expo-media-library";

const [permissionResponse, requestPermission] =
  MediaLibrary.usePermissions();
```

---

# Permission Object

Example:

```tsx
{
  granted: true,
  canAskAgain: true,
  status: "granted"
}
```

---

# Request Permission

```tsx
const getPermission = async () => {
  const result = await requestPermission();

  if (!result.granted) {
    return;
  }
};
```

---

# Media Library Concepts

Understanding these concepts is very important.

---

## Asset

An asset is a single media file.

Examples:

```txt
IMG_001.jpg
Vacation.mp4
Selfie.png
```

In Media Library:

```txt
Photo = Asset
Video = Asset
```

---

## Album

A collection of assets.

Examples:

```txt
Camera
Downloads
WhatsApp Images
Screenshots
Vacation 2026
```

---

# Relationship

```txt
Album
 ├── Asset 1
 ├── Asset 2
 ├── Asset 3
```

---

# Saving a Photo to Gallery

Suppose you used:

```txt
expo-camera
```

and got:

```txt
photo.uri
```

Example:

```txt
file:///cache/image.jpg
```

To save:

```tsx
await MediaLibrary.saveToLibraryAsync(
  photo.uri
);
```

That's it.

The image appears in the user's gallery.

---

# Full Example

```tsx
import * as MediaLibrary from "expo-media-library";

const saveImage = async (uri: string) => {
  await MediaLibrary.saveToLibraryAsync(uri);
};
```

---

# Flow

```txt
Take Photo
     ↓
Receive URI
     ↓
saveToLibraryAsync()
     ↓
Gallery
```

---

# Save Video to Gallery

Exactly the same.

```tsx
await MediaLibrary.saveToLibraryAsync(
  videoUri
);
```

---

# Creating an Asset

Instead of directly saving:

```tsx
await MediaLibrary.saveToLibraryAsync(uri);
```

you can create an asset.

```tsx
const asset =
  await MediaLibrary.createAssetAsync(uri);
```

Returns:

```tsx
{
  id: "...",
  filename: "...",
  mediaType: "photo"
}
```

---

# Why Create Asset?

Useful when:

```txt
Need asset ID
Need metadata
Need album operations
Need custom organization
```

---

# Example

```tsx
const asset =
  await MediaLibrary.createAssetAsync(uri);

console.log(asset.id);
```

---

# Creating Albums

Example:

```tsx
await MediaLibrary.createAlbumAsync(
  "Pocket Files",
  asset,
  false
);
```

Creates:

```txt
Gallery
 └── Pocket Files
      └── image.jpg
```

---

# Parameters

```tsx
createAlbumAsync(
  albumName,
  asset,
  copyAsset
)
```

---

# Meaning

| Parameter | Purpose      |
| --------- | ------------ |
| albumName | Album name   |
| asset     | Initial file |
| copyAsset | Copy or move |

---

# Example

```tsx
await MediaLibrary.createAlbumAsync(
  "Receipts",
  asset,
  false
);
```

Result:

```txt
Receipts
 ├── bill1.jpg
 ├── bill2.jpg
```

---

# Getting Albums

```tsx
const albums =
  await MediaLibrary.getAlbumsAsync();
```

Returns:

```tsx
[
  {
    id: "...",
    title: "Camera"
  },
  {
    id: "...",
    title: "Screenshots"
  }
]
```

---

# Display Albums

```tsx
albums.map(album => (
  <Text>{album.title}</Text>
));
```

---

# Get Assets from Album

```tsx
const assets =
  await MediaLibrary.getAssetsAsync({
    album
  });
```

---

# Example

```tsx
const assets =
  await MediaLibrary.getAssetsAsync({
    album: myAlbum,
  });
```

---

# Asset Response

```tsx
{
  assets: [...],
  endCursor: "...",
  hasNextPage: true
}
```

---

# Pagination

Important for large galleries.

Never load:

```txt
10000 photos at once
```

Use pagination.

Example:

```tsx
const result =
  await MediaLibrary.getAssetsAsync({
    first: 50,
  });
```

Meaning:

```txt
Load first 50 items
```

---

# Load More

```tsx
await MediaLibrary.getAssetsAsync({
  first: 50,
  after: endCursor,
});
```

---

# Filter Photos

```tsx
await MediaLibrary.getAssetsAsync({
  mediaType: "photo",
});
```

---

# Filter Videos

```tsx
await MediaLibrary.getAssetsAsync({
  mediaType: "video",
});
```

---

# Multiple Types

```tsx
await MediaLibrary.getAssetsAsync({
  mediaType: ["photo", "video"],
});
```

---

# Sort Order

Newest first:

```tsx
sortBy: [
  MediaLibrary.SortBy.creationTime
]
```

Example:

```tsx
const result =
  await MediaLibrary.getAssetsAsync({
    sortBy: [
      MediaLibrary.SortBy.creationTime,
    ],
  });
```

---

# Asset Metadata

Get detailed info.

```tsx
const info =
  await MediaLibrary.getAssetInfoAsync(
    asset.id
  );
```

---

# Returns

```tsx
{
  uri,
  width,
  height,
  duration,
  filename,
  mediaType
}
```

---

# Example Uses

```txt
Show image dimensions
Show video duration
Show file name
Show file size
```

---

# Delete Media

Delete by asset ID.

```tsx
await MediaLibrary.deleteAssetsAsync([
  assetId,
]);
```

---

# Example

```tsx
await MediaLibrary.deleteAssetsAsync([
  "123"
]);
```

Removes file from gallery.

---

# Add Asset to Existing Album

```tsx
await MediaLibrary.addAssetsToAlbumAsync(
  [asset],
  album
);
```

---

# Move Asset

```txt
Gallery
   ↓
Receipts Album
```

Useful for:

```txt
Document Scanner
Expense Tracker
File Organizer
```

---

# Listen for Gallery Changes

Example:

```tsx
MediaLibrary.addListener(event => {
  console.log(event);
});
```

Triggers when:

```txt
New photo added
Photo deleted
Video added
Album updated
```

---

# Common Asset Fields

| Field        | Meaning        |
| ------------ | -------------- |
| id           | Asset ID       |
| uri          | File path      |
| filename     | File name      |
| mediaType    | Photo or video |
| width        | Width          |
| height       | Height         |
| duration     | Video duration |
| creationTime | Created date   |

---

# Media Types

| Type  | Description                   |
| ----- | ----------------------------- |
| photo | Images                        |
| video | Videos                        |
| audio | Audio files (limited support) |

---

# Media Library + Camera

Most common combination.

Flow:

```txt
Camera
   ↓
takePictureAsync()
   ↓
URI
   ↓
MediaLibrary
   ↓
Gallery
```

Example:

```tsx
const photo =
  await camera.takePictureAsync();

await MediaLibrary.saveToLibraryAsync(
  photo.uri
);
```

---

# Media Library + Image Picker

Flow:

```txt
Image Picker
      ↓
Choose Image
      ↓
Asset
      ↓
Media Library
```

Useful for:

```txt
Copying
Organizing
Album Management
```

---

# Media Library + File System

Flow:

```txt
Media Library
      ↓
Asset URI
      ↓
File System
      ↓
Read / Move / Upload
```

---

# Common Production Patterns

## Instagram

```txt
Gallery
↓
Select Image
↓
Edit
↓
Upload
```

---

## WhatsApp

```txt
Gallery
↓
Choose Media
↓
Send
```

---

## Scanner App

```txt
Take Photo
↓
Save to Gallery
↓
Create Receipts Album
↓
Move Photo
```

---

## Pocket Files

```txt
Gallery
↓
Import Photos
↓
Store Metadata in SQLite
↓
Create Collections
↓
Share / Delete
```

---

# Common Mistakes

## Mistake 1

Saving without permission.

❌

```tsx
await saveToLibraryAsync(uri);
```

Without permission.

---

## Mistake 2

Loading all gallery assets.

❌

```tsx
getAssetsAsync({
  first: 10000
});
```

Use pagination.

---

## Mistake 3

Ignoring album organization.

Create albums when users manage lots of files.

---

## Mistake 4

Using gallery for app-specific data.

Better:

```txt
expo-file-system
```

for internal app storage.

---

# Media Library vs File System

| Feature         | Media Library | File System |
| --------------- | ------------- | ----------- |
| Gallery Access  | ✅             | ❌           |
| Save to Gallery | ✅             | ❌           |
| Read App Files  | ❌             | ✅           |
| Private Storage | ❌             | ✅           |
| Albums          | ✅             | ❌           |
| User Photos     | ✅             | ❌           |

---

# Media Library vs Image Picker

| Feature       | Media Library | Image Picker |
| ------------- | ------------- | ------------ |
| Read Gallery  | ✅             | ✅            |
| Pick UI       | ❌             | ✅            |
| Create Albums | ✅             | ❌            |
| Save Media    | ✅             | ❌            |
| Delete Media  | ✅             | ❌            |

---

# Best Practices

### 1. Always Request Permission

```txt
Permission
↓
Access Gallery
```

---

### 2. Use Pagination

```tsx
first: 50
```

instead of thousands.

---

### 3. Save Important Files Properly

```txt
Camera
↓
Asset
↓
Album
```

---

### 4. Use Albums for Organization

Examples:

```txt
Receipts
Scans
Pocket Files
Downloads
```

---

### 5. Listen for Gallery Changes

Keeps UI synced automatically.

---

# Final Mental Model

```txt
expo-media-library
│
├── Permissions
│
├── Assets
│   ├── Photos
│   └── Videos
│
├── Albums
│   ├── Create
│   ├── Read
│   └── Manage
│
├── Gallery Access
│
├── Save Media
│
├── Delete Media
│
└── Metadata
    ├── Filename
    ├── Size
    ├── Duration
    └── Dimensions
```

## Typical Real App Flow

```txt
User Takes Photo
        ↓
expo-camera
        ↓
photo.uri
        ↓
createAssetAsync()
        ↓
createAlbumAsync()
        ↓
Gallery

OR

User Opens Gallery
        ↓
getAssetsAsync()
        ↓
Display Photos
        ↓
Select Media
        ↓
Upload / Share / Organize
```

For mobile development, `expo-media-library` is usually used together with:

```txt
expo-camera
expo-image-picker
expo-file-system
expo-sharing
SQLite
```

to build gallery apps, document scanners, media managers, social media apps, and file organizer applications.
