# 📱 Week 07 • Day 14

## Mobile Development Cohort

📅 **14-06-2026**

---

# Topics Covered

### 📸 Expo Media Library

### 🌐 Expo Network Status

### 🔋 Expo Battery

### 📳 Expo Haptics

### 👥 Expo Contacts

### 📍 Expo Location

### 📂 Expo Document Picker

---

# 📸 Expo Media Library (`expo-media-library`)

## What is it?

`expo-media-library` allows apps to interact with the device's gallery and media storage.

You can:

* Save photos
* Save videos
* Read gallery content
* Create albums
* Delete media
* Manage user media

---

## Common Use Cases

```txt
Camera App
    ↓
Take Photo
    ↓
Save To Gallery
```

```txt
Social Media App
      ↓
Select Media
      ↓
Upload
```

---

## Installation

```bash
npx expo install expo-media-library
```

---

## Important APIs

| API                         | Purpose                |
| --------------------------- | ---------------------- |
| `requestPermissionsAsync()` | Ask gallery permission |
| `saveToLibraryAsync()`      | Save photo/video       |
| `getAssetsAsync()`          | Get media files        |
| `createAlbumAsync()`        | Create album           |
| `deleteAssetsAsync()`       | Delete files           |

---

## Typical Flow

```txt
Capture Photo
      ↓
Get URI
      ↓
Save To Library
      ↓
Visible In Gallery
```

---

# 🌐 Expo Network (`expo-network`)

## What is it?

`expo-network` helps detect device network information.

You can know:

* Internet availability
* IP Address
* Network Type
* Connection Status

---

## Installation

```bash
npx expo install expo-network
```

---

## Common Use Cases

* Offline Detection
* Retry Uploads
* Connectivity Monitoring
* Debugging

---

## Important APIs

| API                      | Purpose             |
| ------------------------ | ------------------- |
| `getIpAddressAsync()`    | Device IP           |
| `getNetworkStateAsync()` | Network information |

---

## Example Flow

```txt
Open App
    ↓
Check Internet
    ↓
Connected?
 /       \
Yes       No
 ↓         ↓
Load      Show Offline UI
```

---

## Network States

| State    | Meaning           |
| -------- | ----------------- |
| WiFi     | Connected to WiFi |
| Cellular | Mobile Data       |
| Unknown  | Unknown State     |
| None     | No Internet       |

---

# 🔋 Expo Battery (`expo-battery`)

## What is it?

Allows apps to access battery information.

You can detect:

* Battery Percentage
* Charging State
* Power Saver Mode
* Battery Health Events

---

## Installation

```bash
npx expo install expo-battery
```

---

## Important APIs

| API                            | Purpose            |
| ------------------------------ | ------------------ |
| `getBatteryLevelAsync()`       | Battery percentage |
| `getBatteryStateAsync()`       | Charging status    |
| `isLowPowerModeEnabledAsync()` | Power saver mode   |

---

## Battery States

```txt
Charging
Full
Unplugged
Unknown
```

---

## Real Uses

### Fitness Apps

```txt
Low Battery
     ↓
Reduce GPS Accuracy
```

### Video Apps

```txt
Low Battery
     ↓
Lower Video Quality
```

---

# 📳 Expo Haptics (`expo-haptics`)

## What is it?

Provides vibration and tactile feedback.

Makes apps feel more responsive.

---

## Installation

```bash
npx expo install expo-haptics
```

---

## Types of Feedback

### Selection Feedback

```txt
Light Tick
```

Used when:

* Switching tabs
* Selecting options

---

### Impact Feedback

```txt
Light
Medium
Heavy
```

Used when:

* Button Press
* Card Drop
* Action Complete

---

### Notification Feedback

```txt
Success
Warning
Error
```

---

## Example Uses

```txt
Take Photo
     ↓
Shutter Haptic
```

```txt
QR Scan
    ↓
Success Haptic
```

```txt
Payment Success
      ↓
Success Feedback
```

---

# 👥 Expo Contacts (`expo-contacts`)

## What is it?

Provides access to device contacts.

Allows apps to:

* Read contacts
* Search contacts
* Add contacts
* Update contacts
* Delete contacts

---

## Common Use Cases

### WhatsApp

```txt
Find Friends
```

### Telegram

```txt
Contact Sync
```

### Payment Apps

```txt
Select Recipient
```

---

## Important APIs

| API                         | Purpose            |
| --------------------------- | ------------------ |
| `requestPermissionsAsync()` | Contact permission |
| `getContactsAsync()`        | Read contacts      |
| `getContactByIdAsync()`     | Single contact     |
| `addContactAsync()`         | Create contact     |
| `removeContactAsync()`      | Delete contact     |

---

## Flow

```txt
Permission
     ↓
Read Contacts
     ↓
Display Contact List
```

---

# 📍 Expo Location (`expo-location`)

## What is it?

Provides access to GPS and device location services.

Used for:

* Maps
* Navigation
* Delivery Apps
* Weather Apps
* Fitness Tracking

---

## Installation

```bash
npx expo install expo-location
```

---

## Location Features

### Current Location

```txt
Latitude
Longitude
```

---

### Reverse Geocoding

```txt
Coordinates
      ↓
Address
```

---

### Geocoding

```txt
Address
      ↓
Coordinates
```

---

### Live Tracking

```txt
User Moving
      ↓
Location Updates
```

---

## Important APIs

| API                           | Purpose               |
| ----------------------------- | --------------------- |
| `getCurrentPositionAsync()`   | Current GPS           |
| `getLastKnownPositionAsync()` | Cached location       |
| `watchPositionAsync()`        | Live tracking         |
| `reverseGeocodeAsync()`       | Coordinates → Address |
| `geocodeAsync()`              | Address → Coordinates |

---

## Typical Flow

```txt
Permission
     ↓
GPS Location
     ↓
Coordinates
     ↓
Display On Map
```

---

# 📂 Expo Document Picker (`expo-document-picker`)

## What is it?

Allows users to pick files from device storage.

Supports:

* PDF
* DOCX
* PPT
* Excel
* ZIP
* Images
* Videos

---

## Installation

```bash
npx expo install expo-document-picker
```

---

## Common Use Cases

### Resume Upload

```txt
Choose PDF
      ↓
Upload
```

### Assignment Submission

```txt
Select File
      ↓
Send To Server
```

### Chat Apps

```txt
Attach Document
      ↓
Send File
```

---

## Important APIs

| API                  | Purpose          |
| -------------------- | ---------------- |
| `getDocumentAsync()` | Open file picker |

---

## File Object

```ts
{
  uri,
  name,
  size,
  mimeType
}
```

---

## Typical Flow

```txt
Open Picker
      ↓
Select File
      ↓
Receive URI
      ↓
Validate
      ↓
Upload
```

---

# Day 14 Summary

Today we explored several native device capabilities that make mobile apps more powerful and interactive.

### 📸 Media Library

Managing gallery photos and videos.

### 🌐 Network Status

Detecting internet connectivity and network information.

### 🔋 Battery

Monitoring battery level and charging state.

### 📳 Haptics

Providing tactile feedback for better UX.

### 👥 Contacts

Accessing and managing phone contacts.

### 📍 Location

Using GPS, geocoding, and real-time tracking.

### 📂 Document Picker

Selecting and uploading files from device storage.

---

# Key Takeaway

```txt
Device Features
│
├── Camera
├── Audio
├── Gallery
├── Contacts
├── GPS
├── Network
├── Battery
├── Haptics
└── Files
```

By combining these Expo APIs, we can build real-world applications such as:

```txt
📱 Social Media Apps
🚕 Ride Sharing Apps
🍔 Food Delivery Apps
🎵 Music Apps
📸 Camera Apps
💳 Payment Apps
📍 Navigation Apps
📂 Document Management Apps
```

🚀 **Week 07 Day 14 focused on integrating native device capabilities into React Native applications, enabling apps to interact with hardware, sensors, files, connectivity, and user data just like fully native mobile applications.**
