# 🔋 Expo Battery (`expo-battery`) — Complete Deep Notes

## What is `expo-battery`?

`expo-battery` allows your app to access information about the device's **battery status, charging state, battery level, and power-saving conditions**.

It helps answer questions like:

* What is the current battery percentage?
* Is the device charging?
* Is Battery Saver mode enabled?
* Is the battery full?
* Should the app reduce heavy processing?

---

# Why Do Apps Need Battery Information?

Mobile devices have limited battery life.

Apps can use battery information to:

✅ Reduce battery consumption

✅ Pause background tasks

✅ Lower video quality

✅ Delay uploads

✅ Warn users before heavy operations

✅ Optimize performance

---

# Real-World Examples

## Google Maps

```txt
Low Battery
      ↓
Reduce Background Updates
```

---

## YouTube

```txt
Battery Low
      ↓
Reduce Video Quality Suggestions
```

---

## Fitness Apps

```txt
GPS Tracking Running
      ↓
Monitor Battery
```

---

## Camera Apps

```txt
4K Recording
      ↓
Battery Warning
```

---

## Delivery Apps

```txt
Battery Critically Low
      ↓
Suggest Charger
```

---

# Installation

```bash
npx expo install expo-battery
```

---

# Core Concepts

Battery information is divided into several areas:

```txt
Battery
│
├── Battery Level
├── Charging State
├── Power Saver Mode
├── Battery State
└── Battery Events
```

---

# Battery Level

Battery level represents the current charge percentage.

Example:

```txt
100% = Fully Charged
50%  = Half Charged
10%  = Low Battery
```

---

# Get Battery Level

```tsx
import * as Battery from "expo-battery";

const level =
  await Battery.getBatteryLevelAsync();
```

Output:

```txt
0.75
```

Meaning:

```txt
75%
```

---

# Convert to Percentage

```tsx
const level =
  await Battery.getBatteryLevelAsync();

const percentage =
  Math.round(level * 100);

console.log(percentage);
```

Output:

```txt
75
```

---

# Example

```tsx
const battery =
  await Battery.getBatteryLevelAsync();

console.log(
  `Battery: ${battery * 100}%`
);
```

---

# Battery State

Battery state describes the charging condition.

Examples:

```txt
Charging
Full
Unplugged
Unknown
```

---

# Get Battery State

```tsx
const state =
  await Battery.getBatteryStateAsync();
```

Returns:

```tsx
Battery.BatteryState.CHARGING
```

---

# Battery States

| State       | Meaning             |
| ----------- | ------------------- |
| `UNKNOWN`   | Unable to determine |
| `UNPLUGGED` | Running on battery  |
| `CHARGING`  | Currently charging  |
| `FULL`      | Fully charged       |

---

# Example

```tsx
const state =
  await Battery.getBatteryStateAsync();

if (
  state === Battery.BatteryState.CHARGING
) {
  console.log("Charging");
}
```

---

# Visual Representation

```txt
Charger Connected
       ↓
CHARGING
       ↓
100%
       ↓
FULL
```

---

# Battery Saver Mode

Modern phones include:

### Android

```txt
Battery Saver
```

### iPhone

```txt
Low Power Mode
```

When enabled:

```txt
Reduce CPU Usage
Reduce Background Tasks
Reduce Animations
```

---

# Check Battery Saver

```tsx
const enabled =
  await Battery.isLowPowerModeEnabledAsync();
```

Returns:

```txt
true
```

or

```txt
false
```

---

# Example

```tsx
const lowPower =
  await Battery.isLowPowerModeEnabledAsync();

if (lowPower) {
  console.log(
    "Battery Saver Enabled"
  );
}
```

---

# Why Is This Useful?

Example:

```txt
Low Power Mode
      ↓
Disable Auto Video Upload
```

---

# Battery Monitoring

Battery information changes continuously.

Examples:

```txt
100%
95%
90%
85%
```

Apps may need real-time updates.

---

# Battery Level Listener

```tsx
Battery.addBatteryLevelListener(
  ({ batteryLevel }) => {
    console.log(batteryLevel);
  }
);
```

Output:

```txt
0.85
0.84
0.83
```

---

# Real-Time Example

```tsx
useEffect(() => {
  const subscription =
    Battery.addBatteryLevelListener(
      ({ batteryLevel }) => {
        console.log(
          batteryLevel * 100
        );
      }
    );

  return () => {
    subscription.remove();
  };
}, []);
```

---

# Battery State Listener

Monitor charging changes.

```tsx
Battery.addBatteryStateListener(
  ({ batteryState }) => {
    console.log(batteryState);
  }
);
```

---

# Example

```txt
Unplugged
      ↓
Charging
      ↓
Full
```

Events fire automatically.

---

# Battery Warning Logic

Example:

```tsx
const level =
  await Battery.getBatteryLevelAsync();

if (level < 0.2) {
  Alert.alert(
    "Low Battery",
    "Please charge your device"
  );
}
```

---

# Real App Example

Food Delivery App:

```txt
Battery < 15%
       ↓
Warn Delivery Driver
```

---

# Battery + Location

GPS tracking consumes battery.

Example:

```txt
Battery > 30%
       ↓
High Accuracy GPS

Battery < 30%
       ↓
Balanced GPS
```

---

# Battery + Camera

Camera processing is expensive.

Example:

```txt
Battery Low
      ↓
Disable 4K Recording
```

---

# Battery + File Upload

Large uploads drain battery.

Example:

```txt
Battery < 10%
      ↓
Pause Upload
```

---

# Battery + Video Streaming

```txt
Low Battery
      ↓
Reduce Quality
```

Used by:

```txt
YouTube
Netflix
Prime Video
```

---

# Battery + Background Tasks

Example:

```txt
Battery Saver ON
      ↓
Pause Background Sync
```

---

# Common Battery APIs

| API                            | Purpose                    |
| ------------------------------ | -------------------------- |
| `getBatteryLevelAsync()`       | Current battery level      |
| `getBatteryStateAsync()`       | Charging state             |
| `isLowPowerModeEnabledAsync()` | Power saver status         |
| `addBatteryLevelListener()`    | Monitor battery percentage |
| `addBatteryStateListener()`    | Monitor charging changes   |

---

# Typical Response Values

## Battery Level

```txt
1.0
```

Meaning:

```txt
100%
```

---

```txt
0.5
```

Meaning:

```txt
50%
```

---

```txt
0.1
```

Meaning:

```txt
10%
```

---

# Battery State Values

```txt
UNKNOWN
UNPLUGGED
CHARGING
FULL
```

---

# Production Example

```tsx
const level =
  await Battery.getBatteryLevelAsync();

const charging =
  await Battery.getBatteryStateAsync();

const lowPower =
  await Battery.isLowPowerModeEnabledAsync();

console.log({
  level,
  charging,
  lowPower,
});
```

Output:

```tsx
{
  level: 0.72,
  charging: "UNPLUGGED",
  lowPower: false
}
```

Meaning:

```txt
72%
Not Charging
Power Saver Off
```

---

# Common Use Cases

## Fitness Apps

```txt
Track Battery During Workout
```

---

## Camera Apps

```txt
Warn Before Long Recording
```

---

## Navigation Apps

```txt
Reduce GPS Accuracy
```

---

## Delivery Apps

```txt
Protect Driver Battery
```

---

## Streaming Apps

```txt
Adjust Quality
```

---

# Common Mistakes

## Mistake 1

Forgetting listeners cleanup.

❌

```tsx
Battery.addBatteryLevelListener(...)
```

without:

```tsx
subscription.remove()
```

---

## Mistake 2

Checking battery every second.

❌

```txt
Wastes Resources
```

Use listeners.

---

## Mistake 3

Showing battery warnings too frequently.

Bad:

```txt
10%
9%
8%
```

Alert every time.

---

Better:

```txt
Alert Once
```

---

## Mistake 4

Blocking app functionality.

Avoid:

```txt
Battery Low
↓
App Stops Working
```

Instead:

```txt
Battery Low
↓
Optimize Features
```

---

# Battery vs Device Information

| Feature        | Battery | Device |
| -------------- | ------- | ------ |
| Battery Level  | ✅       | ❌      |
| Charging State | ✅       | ❌      |
| Low Power Mode | ✅       | ❌      |
| Device Model   | ❌       | ✅      |
| OS Version     | ❌       | ✅      |

---

# Battery + Expo Ecosystem

Most common combinations:

```txt
expo-battery
+
expo-location
```

Smart GPS optimization.

---

```txt
expo-battery
+
expo-camera
```

Recording optimization.

---

```txt
expo-battery
+
expo-network
```

Pause uploads on low battery.

---

```txt
expo-battery
+
expo-background-task
```

Smart background processing.

---

# Best Practices

### 1. Monitor Battery for Heavy Features

```txt
Camera
GPS
Video
Uploads
```

---

### 2. Respect Low Power Mode

```txt
System Requests Efficiency
```

---

### 3. Use Event Listeners

Instead of constant polling.

---

### 4. Reduce Resource Usage

When battery becomes low.

---

### 5. Inform Users Clearly

```txt
Battery Low
Charge Recommended
```

instead of silently failing.

---

# Typical Production Flow

```txt
App Starts
      ↓
Get Battery Level
      ↓
Get Charging State
      ↓
Get Power Saver Status
      ↓
Monitor Changes
      ↓
Optimize Features
```

---

# Final Mental Model

```txt
expo-battery
│
├── Battery Level
│   ├── 0% - 100%
│   └── Percentage
│
├── Charging State
│   ├── Charging
│   ├── Full
│   ├── Unplugged
│   └── Unknown
│
├── Power Saver
│   ├── Enabled
│   └── Disabled
│
├── Real-Time Events
│   ├── Battery Changes
│   └── Charging Changes
│
└── Optimization
    ├── GPS
    ├── Camera
    ├── Uploads
    ├── Streaming
    └── Background Tasks
```

## Quick Memory Trick

```txt
expo-battery =
Know the battery
↓
Understand charging
↓
Detect power saving
↓
React intelligently
```

The biggest real-world use of `expo-battery` is **making apps smarter and more power-efficient**, especially when using GPS, camera, media uploads, streaming, or background synchronization. 🔋📱
