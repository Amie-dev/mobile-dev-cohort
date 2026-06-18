---

# Expo Magnetometer

## What is a Magnetometer?

A Magnetometer is a sensor that detects magnetic fields around the device.

The most common use of a magnetometer is:

```
Compass Functionality
```

It helps the phone understand:

```
Which direction it is facing
```

---

## Real Life Examples

### Google Maps

When you rotate your phone:

```
Phone Rotates
      ↓
Map Arrow Rotates
```

---

### Compass App

Shows:

```
North
South
East
West
```

---

### Navigation Apps

Used to determine device heading and direction.

---

# Installation

```bash
npx expo install expo-sensors
```

Import:

```tsx
import { Magnetometer } from "expo-sensors";
```

---

# Data Returned

The sensor returns:

```tsx
{
  x: number,
  y: number,
  z: number
}
```

Example:

```tsx
{
  x: 15,
  y: -30,
  z: 42
}
```

These values represent magnetic field strength on each axis.

You generally don't need to memorize what each value means.

Just remember:

```
Values change when the phone rotates
or when nearby magnetic fields change.
```

---

# Available Methods

## 1. isAvailableAsync()

Checks whether the device supports a magnetometer.

```tsx
const available =
  await Magnetometer.isAvailableAsync();
```

Returns:

```tsx
true
```

or

```tsx
false
```

---

## 2. addListener()

Starts listening to sensor updates.

```tsx
const subscription =
  Magnetometer.addListener(data => {
    console.log(data);
  });
```

---

## 3. remove()

Stops listening.

```tsx
subscription.remove();
```

Always cleanup listeners.

---

## 4. setUpdateInterval()

Controls how often updates arrive.

```tsx
Magnetometer.setUpdateInterval(100);
```

Common values:

```tsx
16   // Fast
100  // Normal
1000 // Slow
```

---

# Complete Example

```tsx
import { Magnetometer } from "expo-sensors";
import { useEffect } from "react";

export default function App() {
  useEffect(() => {
    Magnetometer.setUpdateInterval(100);

    const subscription =
      Magnetometer.addListener(data => {
        console.log(data);
      });

    return () => {
      subscription.remove();
    };
  }, []);

  return null;
}
```

---

# Common Use Cases

## 1. Compass

Most common use case.

```
Magnetic Field
      ↓
Direction
      ↓
North / South
```

---

## 2. Navigation

Apps like Google Maps use it to determine:

```
Where the phone is facing
```

---

## 3. AR Applications

Helps virtual objects stay aligned with real-world directions.

---

# Accelerometer vs Gyroscope vs Magnetometer

| Sensor | Measures |
| --- | --- |
| Accelerometer | Movement & Tilt |
| Gyroscope | Rotation Speed |
| Magnetometer | Direction / Magnetic Field |

Easy way to remember:

```
Accelerometer → Moving
Gyroscope     → Rotating
Magnetometer  → Pointing
```

---

# Key Takeaways

- Magnetometer detects magnetic fields.
- Mostly used for compass and navigation.
- Returns `x`, `y`, and `z` magnetic field values.
- Main methods:
    - `isAvailableAsync()`
    - `addListener()`
    - `remove()`
    - `setUpdateInterval()`
- Most developers use it for:
    - Compass apps
    - Maps
    - Navigation
    - AR experiences

For Expo Sensors learning, this level of understanding is usually enough before moving on to **DeviceMotion**, which is where Accelerometer + Gyroscope + Magnetometer start working together.

# Expo DeviceMotion - Quick Notes

# What is DeviceMotion?

`DeviceMotion` is a high-level sensor API provided by Expo that combines data from multiple sensors and gives you complete motion information about the device.

Think of it as:

```
Accelerometer
      +
Gyroscope
      +
Magnetometer
      ↓
DeviceMotion
```

Instead of working with multiple sensors separately, DeviceMotion gives you everything through a single API.

---

# Why Use DeviceMotion?

Without DeviceMotion:

```tsx
Accelerometer.addListener(...)
Gyroscope.addListener(...)
Magnetometer.addListener(...)
```

You would need to combine all sensor data yourself.

With DeviceMotion:

```tsx
DeviceMotion.addListener(...)
```

You get:

- Movement
- Gravity
- Rotation
- Orientation

from a single listener.

---

# What Information Does DeviceMotion Provide?

DeviceMotion returns:

```tsx
{
  acceleration,
  accelerationIncludingGravity,
  rotation,
  rotationRate,
  orientation,
  interval
}
```

---

## acceleration

```
Actual movement only
(Gravity removed)
```

Example:

```tsx
{
  x: 0.05,
  y: -0.02,
  z: -0.14
}
```

Use Cases:

- Shake Detection
- Motion Tracking
- Gesture Recognition

---

## accelerationIncludingGravity

```
Movement + Gravity
```

Example:

```tsx
{
  x: 0.26,
  y: -0.36,
  z: -9.73
}
```

Use Cases:

- Tilt Detection
- Device Orientation
- Physics Simulations

---

## rotation

```
Current device orientation / tilt
```

Example:

```tsx
{
  alpha: 0.94,
  beta: 0.03,
  gamma: 0.03
}
```

Use Cases:

- 3D Card Effects
- AR Experiences
- Level Tools

---

## rotationRate

```
Current rotational speed
```

Example:

```tsx
{
  alpha: 0,
  beta: 0.03,
  gamma: 0.06
}
```

Use Cases:

- Racing Games
- Motion Games
- Lightsaber Effects

---

## orientation

```
Current screen orientation
```

Values:

```
0    Portrait
90   Landscape Right
180  Upside Down
-90  Landscape Left
```

Use Cases:

- Auto Layout Changes
- Orientation Tracking

---

# Common Use Cases of DeviceMotion

## 1. Tilt Controlled Games

```
Tilt Phone
      ↓
Move Character
```

---

## 2. Motion Controlled Maze

```
Tilt Phone
      ↓
Move Ball Through Maze
```

---

## 3. Digital Spirit Level

```
Keep Phone Perfectly Straight
```

Uses:

```tsx
rotation.beta
rotation.gamma
```

---

## 4. 3D Tilt Cards

```
Tilt Phone
      ↓
Card Rotates
```

Popular in modern mobile UIs.

---

## 5. AR Applications

Used to track:

- Device movement
- Device rotation
- Device orientation

---

## 6. Shake Detection

```
Shake Phone
      ↓
Trigger Action
```

Examples:

- Roll Dice
- Undo Action
- Refresh Data

---

# DeviceMotion APIs

Import:

```tsx
import { DeviceMotion } from "expo-sensors";
```

---

## 1. isAvailableAsync()

Checks whether DeviceMotion is supported.

```tsx
const available =
  await DeviceMotion.isAvailableAsync();
```

Returns:

```tsx
true
```

or

```tsx
false
```

---

## 2. addListener()

Starts listening to motion updates.

```tsx
const subscription =
  DeviceMotion.addListener((data) => {
    console.log(data);
  });
```

Returns:

```tsx
{
  acceleration,
  accelerationIncludingGravity,
  rotation,
  rotationRate,
  orientation,
  interval
}
```

---

## 3. remove()

Stops listening.

```tsx
subscription.remove();
```

Always remove listeners when leaving the screen.

---

## 4. setUpdateInterval()

Controls how frequently updates arrive.

```tsx
DeviceMotion.setUpdateInterval(100);
```

Examples:

```
16ms   → ~60 updates/sec
33ms   → ~30 updates/sec
100ms  → ~10 updates/sec
1000ms → ~1 update/sec
```

---

# Complete Example

```tsx
import { DeviceMotion } from "expo-sensors";
import { useEffect } from "react";

export default function App() {
  useEffect(() => {
    DeviceMotion.setUpdateInterval(100);

    const subscription =
      DeviceMotion.addListener((data) => {
        console.log(data);
      });

    return () => {
      subscription.remove();
    };
  }, []);

  return null;
}
```

---

# Summary

`DeviceMotion` is a combined motion sensor that provides movement, gravity, rotation, and orientation information through a single API. It internally uses data from the Accelerometer, Gyroscope, and Magnetometer. It is commonly used in motion-based games, tilt controls, AR experiences, level tools, gesture recognition systems, and interactive UI animations. The primary APIs are:

```tsx
DeviceMotion.isAvailableAsync()
DeviceMotion.addListener()
DeviceMotion.setUpdateInterval()
subscription.remove()
```

Think of it as:

```
Accelerometer + Gyroscope + Magnetometer
                    ↓
              DeviceMotion
```

# Expo Pedometer - Quick Notes

# What is a Pedometer?

A Pedometer is a sensor that counts the number of steps taken by the user.

Think of it as:

```
Walking
Running
Jogging
      ↓
Step Count
```

It is commonly used in:

- Fitness Apps
- Health Apps
- Step Counters
- Running Trackers

---

# How Does It Work?

Most modern phones have dedicated hardware sensors:

```
TYPE_STEP_COUNTER
```

or

```
TYPE_STEP_DETECTOR
```

on Android.

Instead of calculating steps manually, the device hardware tracks steps and exposes them through the operating system.

Expo's Pedometer API simply reads this information.

---

# Real World Examples

## Fitness Apps

```
Today's Steps
     ↓
8234 Steps
```

---

## Running Apps

```
Distance
Steps
Calories
```

---

## Habit Tracking Apps

```
Goal: 10,000 Steps
```

Track progress throughout the day.

---

# Installation

```bash
npx expo install expo-sensors
```

Import:

```tsx
import { Pedometer } from "expo-sensors";
```

---

# Available APIs

## 1. isAvailableAsync()

Checks whether the device supports step counting.

```tsx
const available =
  await Pedometer.isAvailableAsync();
```

Returns:

```tsx
true
```

or

```tsx
false
```

---

## 2. watchStepCount()

Listen to live step updates.

```tsx
const subscription =
  Pedometer.watchStepCount(result => {
    console.log(result.steps);
  });
```

Example:

```tsx
{
  steps: 25
}
```

---

### Use Case

Real-time step counter.

```
Walk
 ↓
Step Count Updates
```

---

## 3. getStepCountAsync()

Get step count between two dates.

```tsx
const result =
  await Pedometer.getStepCountAsync(
    startDate,
    endDate
  );
```

Returns:

```tsx
{
  steps: 5421
}
```

---

### Important

This is generally:

```
Very reliable on iOS
Less reliable on Android
```

depending on device manufacturer.

---

## 4. remove()

Cleanup listener.

```tsx
subscription.remove();
```

---

# Permissions

Android requires:

```xml
android.permission.ACTIVITY_RECOGNITION
```

Expo usually handles this, but you should still request permission.

```tsx
const permission =
  await Pedometer.requestPermissionsAsync();
```

Check:

```tsx
permission.granted
```

---

# Complete Example

```tsx
import { Pedometer } from "expo-sensors";
import { useEffect } from "react";

export default function App() {
  useEffect(() => {
    const subscription =
      Pedometer.watchStepCount(result => {
        console.log(result.steps);
      });

    return () => {
      subscription.remove();
    };
  }, []);

  return null;
}
```

---

# Common Use Cases

## Step Counter

```
Walk
 ↓
Count Steps
```

---

## Daily Fitness Dashboard

Show:

```
Steps
Distance
Calories
```

---

## Running Tracker

Track:

```
Pace
Distance
Steps
```

---

## Walking Challenges

```
Goal: 10,000 Steps
```

Gamification systems.

---

# Common Android Problems

This is where most developers struggle.

---

## Problem 1: Works on iPhone but not Android

Very common.

Reasons:

### Missing Permission

```tsx
await Pedometer.requestPermissionsAsync();
```

---

### ACTIVITY_RECOGNITION Not Granted

Android 10+ requires:

```xml
android.permission.ACTIVITY_RECOGNITION
```

---

### Samsung Battery Optimization

Samsung devices aggressively stop background sensors.

Check:

```
Settings
↓
Apps
↓
Your App
↓
Battery
↓
Unrestricted
```

---

### Samsung Health Disabled

Some Samsung devices depend on Samsung's health services being active.

---

### Sensor Not Available

Check:

```tsx
const available =
  await Pedometer.isAvailableAsync();
```

If:

```tsx
false
```

Expo cannot access a step counter.

---

# Why Your Samsung A26 Might Not Work

Based on your earlier issue:

```
iPhone ✅
Samsung A26 ❌
```

Most likely:

1. Activity Recognition permission missing
2. Samsung battery restrictions
3. Samsung Health configuration
4. Device step sensor unavailable
5. Expo sensor compatibility issue

---

# Alternative Approach (Recommended)

If Expo Pedometer doesn't work reliably:

Build your own pedometer using:

```
Accelerometer
```

Flow:

```
Accelerometer
      ↓
Magnitude Calculation
      ↓
Peak Detection
      ↓
Step Count
```

Advantages:

```
Works on almost every device
No dependency on hardware step sensor
```

Disadvantages:

```
Less accurate
More battery usage
```

---

# Community Libraries

If Expo Pedometer gives problems on Android, developers often use native step counter libraries.

### React Native Google Fit

React Native Google Fit

Features:

- Steps
- Distance
- Calories
- Heart Rate

---

### React Native Health Connect

React Native Health Connect

Modern Android solution.

Works with:

- Samsung Health
- Google Fit
- Fitbit
- Other health providers

This is what I would use today for a production Android fitness app.

---

---

# Key Takeaways

- Pedometer counts user steps.
- Main APIs:
    - `isAvailableAsync()`
    - `watchStepCount()`
    - `getStepCountAsync()`
    - `requestPermissionsAsync()`
- iOS support is generally more consistent.
- Android behavior varies by manufacturer.
- Samsung devices often require extra permission and battery configuration.
- For production Android apps:
    - Health Connect is the modern approach.
- If everything fails:
    - Build a custom pedometer using the Accelerometer.