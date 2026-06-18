# 📍 Expo Location (`expo-location`) — Complete Deep Notes

## What is Expo Location?

`expo-location` allows your app to access the device's **GPS and location services**.

It can determine:

* Current Location
* Latitude & Longitude
* Address Information
* City / State / Country
* User Movement
* Speed
* Heading (Compass Direction)
* Background Location Updates
* Geofencing

---

# Why Do Apps Need Location?

Many modern mobile apps are built around location.

Examples:

| App          | Location Usage          |
| ------------ | ----------------------- |
| Google Maps  | Navigation              |
| Uber         | Driver & Rider Tracking |
| Swiggy       | Food Delivery           |
| Zomato       | Nearby Restaurants      |
| Weather Apps | Local Weather           |
| Fitness Apps | Run Tracking            |
| Tinder       | Nearby Users            |

---

# Installation

```bash
npx expo install expo-location
```

---

# Permissions

Location is sensitive user data.

You must request permission before accessing it.

---

# Types of Location Permissions

## Foreground Permission

Access location only while app is open.

```txt
App Open
   ↓
Location Available
```

Examples:

* Maps
* Weather
* Nearby Search

---

## Background Permission

Access location even when app is closed/minimized.

```txt
App Closed
      ↓
Location Tracking Continues
```

Examples:

* Uber Driver
* Delivery Apps
* Fitness Tracking

---

# Request Foreground Permission

```tsx
import * as Location from "expo-location";

const permission =
  await Location.requestForegroundPermissionsAsync();
```

Result:

```tsx
{
  granted: true
}
```

---

# Request Background Permission

```tsx
await Location.requestBackgroundPermissionsAsync();
```

⚠️ Usually requested only after foreground permission is granted.

---

# Permission Flow

```txt
App Needs Location
        ↓
Request Foreground Permission
        ↓
Granted?
     /     \
   Yes      No
   ↓         ↓
Get Location  Show Error
```

---

# Check Existing Permission

```tsx
const permission =
  await Location.getForegroundPermissionsAsync();
```

---

# Get Current Location

Most common operation.

```tsx
const location =
  await Location.getCurrentPositionAsync();
```

Returns:

```tsx
{
  coords: {
    latitude: 28.6139,
    longitude: 77.2090
  }
}
```

---

# Understanding Coordinates

## Latitude

North-South position.

```txt
90°
↑
0°
↓
-90°
```

---

## Longitude

East-West position.

```txt
-180° ← Earth → 180°
```

---

# Example

```tsx
const location =
  await Location.getCurrentPositionAsync();

console.log(location.coords.latitude);
console.log(location.coords.longitude);
```

Output:

```txt
28.6139
77.2090
```

---

# Location Object Structure

```tsx
{
  coords: {
    latitude,
    longitude,
    altitude,
    accuracy,
    heading,
    speed
  },

  timestamp
}
```

---

# Important Coordinate Properties

| Property    | Description            |
| ----------- | ---------------------- |
| `latitude`  | North/South position   |
| `longitude` | East/West position     |
| `accuracy`  | GPS accuracy           |
| `altitude`  | Height above sea level |
| `heading`   | Direction facing       |
| `speed`     | Movement speed         |

---

# Example

```tsx
const location =
  await Location.getCurrentPositionAsync();

console.log(location.coords);
```

Output:

```tsx
{
  latitude: 28.6139,
  longitude: 77.2090,
  accuracy: 10,
  speed: 0
}
```

---

# Accuracy Levels

Location accuracy affects:

```txt
Battery Usage
Accuracy
Speed
```

---

# Low Accuracy

```tsx
Location.Accuracy.Low
```

Uses:

```txt
Weather App
Nearby Search
```

Battery Friendly ✅

---

# Balanced Accuracy

```tsx
Location.Accuracy.Balanced
```

Most common option.

---

# High Accuracy

```tsx
Location.Accuracy.High
```

Uses:

```txt
Navigation
Ride Tracking
```

More battery usage.

---

# Best For Navigation

```tsx
await Location.getCurrentPositionAsync({
  accuracy: Location.Accuracy.High,
});
```

---

# Get Last Known Location

Much faster.

```tsx
const location =
  await Location.getLastKnownPositionAsync();
```

Benefits:

```txt
Fast
Low Battery
```

Downside:

```txt
May Be Old
```

---

# Example

```tsx
const location =
  await Location.getLastKnownPositionAsync();
```

Perfect for:

```txt
Weather Apps
News Apps
```

---

# Reverse Geocoding

Convert coordinates into an address.

---

Example:

```txt
28.6139
77.2090
```

↓

```txt
New Delhi, India
```

---

# Reverse Geocode

```tsx
const address =
  await Location.reverseGeocodeAsync({
    latitude,
    longitude,
  });
```

Result:

```tsx
[
  {
    city: "New Delhi",
    country: "India"
  }
]
```

---

# Real Example

```tsx
const [place] =
  await Location.reverseGeocodeAsync({
    latitude,
    longitude,
  });

console.log(place.city);
```

Output:

```txt
New Delhi
```

---

# Geocoding

Convert address into coordinates.

---

Example

```txt
Mumbai
```

↓

```txt
19.0760
72.8777
```

---

# Geocode

```tsx
const result =
  await Location.geocodeAsync("Mumbai");
```

Output:

```tsx
[
  {
    latitude: 19.0760,
    longitude: 72.8777
  }
]
```

---

# Real World Example

Maps Search:

```txt
User Types:
"Delhi"

↓

Convert To Coordinates

↓

Show On Map
```

---

# Watch Position

Track location continuously.

---

```tsx
Location.watchPositionAsync()
```

Used for:

```txt
Uber
Google Maps
Fitness Apps
```

---

# Example

```tsx
const subscription =
  await Location.watchPositionAsync(
    {
      accuracy:
        Location.Accuracy.High,

      distanceInterval: 10,
    },

    (location) => {
      console.log(location.coords);
    }
  );
```

---

# Understanding Distance Interval

```tsx
distanceInterval: 10
```

Means:

```txt
Update Only After
10 Meters Movement
```

Saves battery.

---

# Stop Watching

Important!

```tsx
subscription.remove();
```

Always cleanup.

---

# Navigation Flow

```txt
Start Tracking
      ↓
Location Changes
      ↓
Update UI
      ↓
Stop Tracking
```

---

# Heading (Compass Direction)

Get where device faces.

---

Values:

```txt
0° = North
90° = East
180° = South
270° = West
```

---

Example:

```tsx
location.coords.heading
```

---

Used in:

```txt
Maps
Compass Apps
AR Apps
```

---

# Speed

```tsx
location.coords.speed
```

Returns:

```txt
Meters Per Second
```

Example:

```txt
5.5
```

Means:

```txt
5.5 m/s
```

---

Used in:

```txt
Cycling Apps
Running Apps
Delivery Tracking
```

---

# Geofencing

Create virtual boundaries.

---

Example:

```txt
Office Area
```

```txt
Enter Area
 ↓
Trigger Event
```

or

```txt
Leave Area
 ↓
Trigger Event
```

---

Real Uses:

```txt
Attendance Apps
Delivery Zones
Store Promotions
```

---

# Background Location

Location updates while app is closed.

---

Used by:

```txt
Uber
Rapido
Swiggy
Zomato Delivery
```

---

Flow:

```txt
App Minimized
      ↓
GPS Continues
      ↓
Location Sent To Server
```

---

⚠️ High battery usage.

---

# Typical Location App Flow

```txt
Request Permission
       ↓
Get Location
       ↓
Latitude / Longitude
       ↓
Reverse Geocode
       ↓
Display Address
```

---

# Example Screen

```tsx
import * as Location from "expo-location";
import { useEffect, useState } from "react";
import { Text, View } from "react-native";

export default function App() {
  const [location, setLocation] =
    useState(null);

  useEffect(() => {
    getLocation();
  }, []);

  const getLocation = async () => {
    const { status } =
      await Location.requestForegroundPermissionsAsync();

    if (status !== "granted") {
      return;
    }

    const current =
      await Location.getCurrentPositionAsync();

    setLocation(current);
  };

  return (
    <View>
      <Text>
        {location?.coords.latitude}
      </Text>

      <Text>
        {location?.coords.longitude}
      </Text>
    </View>
  );
}
```

---

# Platform Behavior

| Platform | Support |
| -------- | ------- |
| Android  | ✅       |
| iOS      | ✅       |
| Web      | Limited |

---

# Common Use Cases

## Maps

```txt
Current Location
```

---

## Food Delivery

```txt
Track Delivery Partner
```

---

## Ride Sharing

```txt
Track Driver
```

---

## Weather

```txt
Detect User City
```

---

## Fitness

```txt
Track Runs
```

---

## Nearby Search

```txt
Restaurants
ATMs
Hospitals
```

---

# Common Mistakes

## Mistake 1

Not requesting permission.

❌

```tsx
getCurrentPositionAsync()
```

before permission.

---

## Mistake 2

Using High Accuracy everywhere.

```txt
High Battery Usage
```

Use only when needed.

---

## Mistake 3

Forgetting cleanup.

❌

```tsx
watchPositionAsync()
```

without:

```tsx
subscription.remove();
```

---

## Mistake 4

Requesting background permission immediately.

Bad UX.

---

# Best Practices

### 1. Ask Permission When Needed

```txt
User Opens Map
      ↓
Request Permission
```

---

### 2. Use Last Known Location First

```txt
Fast Loading
```

---

### 3. Use Appropriate Accuracy

```txt
Weather → Low

Navigation → High
```

---

### 4. Stop Tracking When Not Needed

```txt
Save Battery
```

---

### 5. Explain Why Location Is Needed

Better permission acceptance.

---

# Expo Location + Other Expo APIs

## Location + Maps

```txt
Show Current Position
```

---

## Location + Notifications

```txt
Geofence Alerts
```

---

## Location + Battery

```txt
Reduce GPS Accuracy
When Battery Low
```

---

## Location + Network

```txt
Send Live Coordinates
To Server
```

---

# Most Important APIs

| API                                   | Purpose                 | Example       |
| ------------------------------------- | ----------------------- | ------------- |
| `requestForegroundPermissionsAsync()` | Ask location permission | Maps          |
| `requestBackgroundPermissionsAsync()` | Background tracking     | Uber          |
| `getCurrentPositionAsync()`           | Current GPS location    | Navigation    |
| `getLastKnownPositionAsync()`         | Cached location         | Weather       |
| `watchPositionAsync()`                | Continuous tracking     | Delivery      |
| `reverseGeocodeAsync()`               | Coordinates → Address   | Show city     |
| `geocodeAsync()`                      | Address → Coordinates   | Search places |

---

# Real App Examples

### Uber

```txt
Foreground Permission
↓
Watch Position
↓
Send Driver Location
```

---

### Swiggy

```txt
Get User Location
↓
Find Nearby Restaurants
```

---

### Google Maps

```txt
Current Position
↓
Track Movement
↓
Navigation
```

---

### Weather App

```txt
Get Location
↓
Reverse Geocode
↓
Fetch Weather
```

---

# Final Mental Model

```txt
expo-location
│
├── Permissions
│
├── Current Location
│
├── Last Known Location
│
├── Continuous Tracking
│
├── Geocoding
│   ├── Address → Coordinates
│   └── Coordinates → Address
│
├── Heading
│
├── Speed
│
├── Geofencing
│
└── Background Tracking
```

# Quick Memory Trick

```txt
expo-location =
Know where the user is
↓
Know where the user is going
↓
Convert GPS ↔ Address
↓
Track movement
↓
Build maps, delivery, and location-based apps
```

## Typical Production Architecture

```txt
expo-location
      ↓
GPS Coordinates
      ↓
Reverse Geocode
      ↓
Human Address
      ↓
Maps / Weather / Delivery / Tracking
```

This makes `expo-location` one of the most important Expo APIs because it powers **navigation, ride-sharing, food delivery, fitness tracking, nearby search, geofencing, and real-time tracking applications**. 📍🚕🗺️📱
