# 🌐 Expo Network (`expo-network`) — Complete Deep Notes

## What is `expo-network`?

`expo-network` allows your app to get information about the device's **network connection**.

It helps answer questions like:

* Is the device connected to the internet?
* Is Wi-Fi being used?
* Is mobile data being used?
* What is the device IP address?
* What network state is currently available?

---

# Why Do We Need Network Information?

Most modern apps depend on the internet.

Examples:

| App         | Why Network Matters      |
| ----------- | ------------------------ |
| Instagram   | Upload photos and videos |
| WhatsApp    | Send messages            |
| Spotify     | Stream music             |
| YouTube     | Watch videos             |
| Google Maps | Load maps and navigation |

Without checking network status:

```txt
User clicks Upload
       ↓
No Internet
       ↓
Upload Fails
       ↓
Bad User Experience
```

With network checking:

```txt
User clicks Upload
       ↓
Check Network
       ↓
No Internet
       ↓
Show Friendly Message
```

---

# Installation

```bash
npx expo install expo-network
```

---

# What Information Can Expo Network Provide?

`expo-network` can provide:

✅ Internet connectivity

✅ Connection type

✅ IP Address

✅ Airplane Mode Detection

✅ Network State

---

# Real-World Use Cases

## Instagram

```txt
Check internet before upload
Retry failed uploads
```

---

## WhatsApp

```txt
Show "Connecting..."
Show "No Internet"
Sync messages when online
```

---

## Spotify

```txt
Switch to downloaded songs
Show offline mode
```

---

## Pocket Files App

```txt
Check connection before upload
Pause uploads offline
Resume when online
```

---

# Core Concepts

## Network State

The current condition of device connectivity.

Example:

```txt
Connected
Disconnected
Wi-Fi
Cellular
Unknown
```

---

# Get Current Network State

```tsx
import * as Network from "expo-network";

const state =
  await Network.getNetworkStateAsync();
```

Returns:

```tsx
{
  type: "WIFI",
  isConnected: true,
  isInternetReachable: true
}
```

---

# NetworkState Object

| Property              | Type        | Description             |
| --------------------- | ----------- | ----------------------- |
| `type`                | NetworkType | Connection type         |
| `isConnected`         | boolean     | Connected to a network  |
| `isInternetReachable` | boolean     | Internet actually works |

---

# Example

```tsx
const network =
  await Network.getNetworkStateAsync();

console.log(network);
```

Output:

```tsx
{
  type: "CELLULAR",
  isConnected: true,
  isInternetReachable: true
}
```

Meaning:

```txt
Using Mobile Data
Internet Available
```

---

# Network Types

## Wi-Fi

```txt
WIFI
```

Example:

```tsx
if (network.type === Network.NetworkStateType.WIFI) {
  console.log("Connected via Wi-Fi");
}
```

---

## Cellular

```txt
CELLULAR
```

Example:

```tsx
if (
  network.type === Network.NetworkStateType.CELLULAR
) {
  console.log("Using Mobile Data");
}
```

---

## Ethernet

```txt
ETHERNET
```

Mostly:

```txt
Desktop
TV
Special Devices
```

---

## Unknown

```txt
UNKNOWN
```

System cannot determine connection type.

---

## None

```txt
NONE
```

No network available.

---

# Check Internet Connection

Most common use case.

```tsx
const network =
  await Network.getNetworkStateAsync();

if (!network.isConnected) {
  alert("No Internet");
}
```

---

# Better Example

```tsx
const checkInternet = async () => {
  const network =
    await Network.getNetworkStateAsync();

  if (!network.isConnected) {
    alert("Please connect to the internet");
    return;
  }

  console.log("Internet available");
};
```

---

# Check Internet Before API Call

```tsx
const uploadPhoto = async () => {
  const network =
    await Network.getNetworkStateAsync();

  if (!network.isConnected) {
    alert("Cannot upload offline");
    return;
  }

  await uploadToServer();
};
```

---

# Get IP Address

Every device connected to a network has an IP address.

Example:

```tsx
const ip =
  await Network.getIpAddressAsync();

console.log(ip);
```

Output:

```txt
192.168.1.25
```

---

# What is an IP Address?

Think of it as:

```txt
Home Address
      ↓
Internet Address
```

Example:

```txt
192.168.1.25
```

Identifies the device inside a network.

---

# Use Cases for IP Address

### Debugging

```txt
Development Tools
```

---

### Local Device Discovery

```txt
Nearby Devices
Smart TVs
IoT Devices
```

---

### Network Diagnostics

```txt
Troubleshooting
```

---

# Airplane Mode Detection

When airplane mode is enabled:

```txt
Wi-Fi Off
Mobile Data Off
Network Disabled
```

Result:

```tsx
{
  isConnected: false
}
```

Apps often show:

```txt
Offline Mode
```

---

# Network Monitoring Pattern

Typical Flow:

```txt
User Opens App
        ↓
Check Network
        ↓
Online?
      /    \
    Yes     No
    ↓       ↓
 Load Data  Show Offline Screen
```

---

# Example Offline Banner

```tsx
if (!network.isConnected) {
  return (
    <View>
      <Text>No Internet Connection</Text>
    </View>
  );
}
```

---

# Loading Data Safely

Bad:

```tsx
const data =
  await fetch(API_URL);
```

Fails if offline.

---

Better:

```tsx
const network =
  await Network.getNetworkStateAsync();

if (network.isConnected) {
  const data =
    await fetch(API_URL);
}
```

---

# Upload Queue Pattern

Used by:

```txt
Instagram
Google Photos
Dropbox
```

Flow:

```txt
User Uploads File
       ↓
No Internet
       ↓
Save To Queue
       ↓
Internet Available
       ↓
Upload Automatically
```

Expo Network helps determine when uploads should start.

---

# Example Hook

```tsx
import { useEffect, useState } from "react";
import * as Network from "expo-network";

export default function App() {
  const [network, setNetwork] =
    useState(null);

  useEffect(() => {
    getNetworkInfo();
  }, []);

  const getNetworkInfo = async () => {
    const state =
      await Network.getNetworkStateAsync();

    setNetwork(state);
  };

  return (
    <Text>
      {network?.isConnected
        ? "Online"
        : "Offline"}
    </Text>
  );
}
```

---

# Useful Network Properties

| Property              | Example Value | Meaning                   |
| --------------------- | ------------- | ------------------------- |
| `type`                | WIFI          | Connection Type           |
| `type`                | CELLULAR      | Mobile Data               |
| `isConnected`         | true          | Connected to network      |
| `isConnected`         | false         | Not connected             |
| `isInternetReachable` | true          | Internet working          |
| `isInternetReachable` | false         | Connected but no internet |

---

# Connected vs Internet Reachable

Very important distinction.

### Connected

```txt
Connected to Wi-Fi
```

BUT:

```txt
Wi-Fi Router Has No Internet
```

Example:

```tsx
{
  isConnected: true,
  isInternetReachable: false
}
```

Meaning:

```txt
Wi-Fi exists
Internet does not
```

---

# Real Example

Coffee Shop Wi-Fi:

```txt
Connected to Wi-Fi
      ↓
Need Login Page
      ↓
Internet Not Available Yet
```

Result:

```tsx
{
  isConnected: true,
  isInternetReachable: false
}
```

---

# Common Features Built With Expo Network

## Offline Banner

```txt
No Internet Connection
```

---

## Retry Upload

```txt
Upload Failed
Try Again
```

---

## Sync When Online

```txt
Offline Notes
↓
Internet Available
↓
Auto Sync
```

---

## Cache Strategy

```txt
Internet Available
↓
Fetch API

No Internet
↓
Load Cached Data
```

---

# Expo Network + AsyncStorage

Pattern:

```txt
Internet Available
↓
Fetch Data
↓
Store Locally

No Internet
↓
Read Cached Data
```

Useful for:

```txt
News Apps
Notes Apps
Blogs
```

---

# Expo Network + File Uploads

Pattern:

```txt
Select File
↓
Check Network
↓
Upload
```

Example:

```tsx
const network =
  await Network.getNetworkStateAsync();

if (!network.isConnected) {
  return;
}

uploadFile();
```

---

# Expo Network + SQLite

Pattern:

```txt
Offline Data Entry
↓
SQLite
↓
Network Returns
↓
Sync Server
```

Used by:

```txt
Field Survey Apps
Inventory Apps
Sales Apps
```

---

# Common Mistakes

## Mistake 1

Assuming Wi-Fi means internet.

❌

```tsx
isConnected === true
```

does NOT guarantee internet access.

Use:

```tsx
isInternetReachable
```

---

## Mistake 2

Checking only once.

Network can change anytime.

---

## Mistake 3

Not handling offline state.

Always design:

```txt
Online
Offline
```

---

## Mistake 4

Blocking app entirely when offline.

Better:

```txt
Show cached content
```

---

# Expo Network vs NetInfo

| Feature             | expo-network | react-native-netinfo |
| ------------------- | ------------ | -------------------- |
| Expo Managed        | ✅            | ❌                    |
| Easy Setup          | ✅            | ❌                    |
| IP Address          | ✅            | ❌                    |
| Detailed Monitoring | Limited      | Better               |
| Expo Recommended    | ✅            | ❌                    |

---

# Best Practices

### 1. Check Before API Calls

```txt
Network
↓
API
```

---

### 2. Support Offline Mode

```txt
Offline Users Exist
```

---

### 3. Cache Data

```txt
Network Lost
↓
Still Works
```

---

### 4. Handle Upload Failures Gracefully

```txt
Retry Later
```

---

### 5. Use `isInternetReachable`

Not just:

```txt
isConnected
```

---

# Final Mental Model

```txt
expo-network
│
├── Network State
│   ├── Wi-Fi
│   ├── Cellular
│   ├── Ethernet
│   └── None
│
├── Connectivity
│   ├── Connected
│   └── Offline
│
├── Internet Reachability
│
├── IP Address
│
└── Diagnostics
```

# Typical Production Flow

```txt
User Opens App
        ↓
Check Network
        ↓
      Online?
     /      \
   Yes       No
   ↓         ↓
Fetch API   Load Cache
   ↓         ↓
Display Data Display Cached Data
```

## Most Common Combination

```txt
expo-network
+
AsyncStorage
+
SQLite
+
TanStack Query
+
Axios
```

This combination is used to build **offline-first mobile applications**, where the app continues to work even when the internet connection is lost and automatically syncs data when connectivity returns.
