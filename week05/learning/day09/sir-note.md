# Expo Accelerometer

# Chapter 1: Introduction to Sensors

## What is a Sensor?

A sensor is a hardware component inside a device that detects and measures physical properties from the real world.

Think of sensors as the **eyes and ears of your smartphone**.

They allow your application to understand:

- Movement
- Rotation
- Light
- Pressure
- Steps
- Device orientation
- Magnetic fields

Without sensors, applications can only respond to:

- Touch
- Keyboard input
- Network requests

With sensors, applications can respond to the physical world around them.

---

## Real-Life Examples of Sensors

### Auto-Rotate Screen

When you rotate your phone:

```
Portrait
   ↓
Landscape
```

The phone uses sensor data to detect orientation changes.

---

### Fitness Apps

Apps such as step trackers use sensors to determine:

- Walking
- Running
- Movement

---

### Racing Games

When you tilt your phone:

```
Tilt Left
    ↓
Car Moves Left
```

This is powered by sensor data.

---

### Navigation Apps

Compass functionality relies on sensors that detect Earth's magnetic field.

---

# Chapter 2: What is Expo Sensors?

## The Problem

Smartphones have sensors built into the hardware.

However, JavaScript cannot directly communicate with device hardware.

We need a bridge.

---

## The Solution

Expo provides:

```bash
expo-sensors
```

A package that allows JavaScript code to access native device sensors.

Installation:

```bash
npx expo install expo-sensors
```

Importing:

```tsx
import { Accelerometer } from "expo-sensors";
```

---

## Sensors Available in Expo

Expo provides access to:

| Sensor | Purpose |
| --- | --- |
| Accelerometer | Detect movement and tilt |
| Gyroscope | Detect rotation |
| Magnetometer | Detect magnetic field |
| DeviceMotion | Combined motion information |
| Pedometer | Step counting |
| Barometer | Atmospheric pressure |

---

## Common Pattern Used By Every Sensor

Almost every sensor follows the same lifecycle:

```
Check Availability
        ↓
Subscribe To Data
        ↓
Receive Updates
        ↓
Unsubscribe
```

This pattern is important because you'll see it repeatedly across Expo Sensors.

---

# Chapter 3: Understanding the Accelerometer

## What is an Accelerometer?

An accelerometer measures acceleration occurring along three dimensions.

These dimensions are:

```
X Axis
Y Axis
Z Axis
```

The accelerometer continuously reports acceleration values for each axis.

---

## What is Acceleration?

Acceleration means:

> Change in velocity over time.
> 

Examples:

- Starting to walk
- Stopping suddenly
- Shaking a phone
- Tilting a phone
- Dropping a phone

All of these produce acceleration.

---

## Why Is the Accelerometer Important?

The accelerometer enables:

- Tilt controls
- Motion detection
- Shake detection
- Fall detection
- Activity tracking
- Device orientation

Many modern mobile experiences depend on accelerometer data.

---

# Chapter 4: Understanding Coordinate Axes

Visualize your phone in 3D space.

```
          Y
          ↑
          |
          |
          ●────→ X
         /
        /
       Z
```

The accelerometer measures acceleration along all three axes simultaneously.

---

## X Axis

Represents horizontal movement.

Examples:

```
Tilt Phone Left
Tilt Phone Right
```

Values change primarily on the X axis.

---

## Y Axis

Represents vertical movement.

Examples:

```
Phone Standing Upright
Phone Leaning Forward
Phone Leaning Backward
```

---

## Z Axis

Represents depth movement.

Examples:

```
Phone Flat On Table
Phone Face Down
```

---

# Chapter 5: Understanding Gravity and G-Force

One of the most important concepts in accelerometers.

---

## What is G-Force?

G-force represents acceleration relative to Earth's gravity.

Earth's gravitational acceleration:

g\approx9.81\ m/s^2

Meaning:

```
1g = Earth's gravity
```

---

## Why Does a Stationary Phone Show Values?

Place your phone flat on a table.

You might see:

```tsx
{
  x: 0,
  y: 0,
  z: 1
}
```

Even though the phone is not moving.

Why?

Because gravity is constantly acting on the device.

The accelerometer detects gravity.

---

## Typical Readings

### Phone Flat

```tsx
{
  x: 0,
  y: 0,
  z: 1
}
```

---

### Phone Upside Down

```tsx
{
  x: 0,
  y: 0,
  z: -1
}
```

---

### Phone Standing Upright

```tsx
{
  x: 0,
  y: 1,
  z: 0
}
```

---

### Phone Sideways

```tsx
{
  x: 1,
  y: 0,
  z: 0
}
```

---

# Chapter 6: Accelerometer API

Import:

```tsx
import { Accelerometer } from "expo-sensors";
```

---

# Method 1: isAvailableAsync()

Checks whether the device supports an accelerometer.

Syntax:

```tsx
const available =
  await Accelerometer.isAvailableAsync();
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

## Use Case

Before building motion-based features:

```tsx
if (!available) {
  alert("Accelerometer not supported");
}
```

---

# Method 2: addListener()

Subscribes to accelerometer updates.

Syntax:

```tsx
const subscription =
  Accelerometer.addListener(data => {
    console.log(data);
  });
```

Data received:

```tsx
{
  x: number,
  y: number,
  z: number
}
```

---

## Use Case

Real-time motion tracking.

Examples:

- Tilt controls
- Motion detection
- Games

---

# Method 3: remove()

Stops listening to sensor updates.

Syntax:

```tsx
subscription.remove();
```

---

## Why Is It Important?

Without cleanup:

```
Sensor continues running
Battery drains
Memory leaks occur
```

Always unsubscribe.

---

# Method 4: setUpdateInterval()

Controls update frequency.

Syntax:

```tsx
Accelerometer.setUpdateInterval(100);
```

---

## Understanding Update Interval

The value is measured in:

```
Milliseconds (ms)
```

Examples:

| Interval | Updates/Second |
| --- | --- |
| 16ms | ~60 |
| 33ms | ~30 |
| 100ms | 10 |
| 1000ms | 1 |

---

## Formula

FPS=\frac{1000}{Interval(ms)}

---

## Real Use Cases

### Games

```tsx
Accelerometer.setUpdateInterval(16);
```

Smooth movement.

---

### Shake Detection

```tsx
Accelerometer.setUpdateInterval(100);
```

Efficient and accurate.

---

### Fitness Apps

```tsx
Accelerometer.setUpdateInterval(500);
```

Lower battery consumption.

---

# Chapter 7: Calculating Magnitude

Often we care about total acceleration.

Not individual axes.

Formula:

\sqrt{x^2+y^2+z^2}

Implementation:

```tsx
const magnitude =
  Math.sqrt(
    x * x +
    y * y +
    z * z
  );
```

---

## Why Magnitude?

Combines all axes into a single value.

Useful for:

- Shake detection
- Impact detection
- Fall detection

---

# Chapter 8: Complete Implementation

## Reading Sensor Data

```tsx
import { Accelerometer } from "expo-sensors";
import { useEffect, useState } from "react";

export default function App() {
  const [data, setData] = useState({
    x: 0,
    y: 0,
    z: 0,
  });

  useEffect(() => {
    Accelerometer.setUpdateInterval(100);

    const subscription =
      Accelerometer.addListener(setData);

    return () => {
      subscription.remove();
    };
  }, []);

  return (
    <>
      <Text>X: {data.x}</Text>
      <Text>Y: {data.y}</Text>
      <Text>Z: {data.z}</Text>
    </>
  );
}
```

---

# Chapter 9: Real-World Projects

## 1. Shake Detection

Detect when the phone is shaken.

Applications:

- Undo action
- Emergency trigger
- Hidden developer menu

Example:

```tsx
const magnitude =
  Math.sqrt(
    x*x +
    y*y +
    z*z
  );

if (magnitude > 2.5) {
  console.log("Shake");
}
```

---

## 2. Tilt-Controlled Game

Example:

```
Move Ball
Move Car
Move Character
```

Implementation:

```tsx
playerX += data.x * speed;
```

---

## 3. Bubble Level Tool

Used in construction apps.

Goal:

```
Keep X ≈ 0
Keep Y ≈ 0
```

Indicates a perfectly level surface.

---

## 4. Fall Detection

Used in:

- Health apps
- Elderly monitoring systems

Detect:

```
Sudden Impact
+
Zero Gravity
```

Sequence.

---

## 5. Motion-Based Authentication

Custom gestures:

```
Shake Left
Shake Right
Shake Up
```

Can act as security actions.

---

## 6. Fitness Tracking

Analyze:

- Running
- Walking
- Jumping

Using acceleration patterns.

---

# Chapter 10: Challenges in Real Applications

## Sensor Noise

Readings fluctuate constantly.

Example:

```
0.98
1.01
0.99
1.03
0.97
```

This is normal.

---

## Battery Consumption

Higher frequency:

```tsx
16ms
```

Consumes more battery.

Lower frequency:

```tsx
500ms
```

Consumes less battery.

---

## Different Device Hardware

Different phones:

```
Samsung
Pixel
iPhone
OnePlus
```

May produce slightly different readings.

Never hardcode thresholds without testing.

---

# Summary

The Accelerometer is a sensor that measures acceleration along the X, Y, and Z axes. Expo exposes this functionality through the `expo-sensors` package using a simple subscription-based API. The most important concepts to understand are coordinate axes, gravity, g-force, update intervals, magnitude calculation, and sensor noise. Once these concepts are clear, you can build motion-based applications such as shake detectors, fitness trackers, tilt-controlled games, level tools, and gesture recognition systems.

# Expo Gyroscope - Complete Teachable Notes

# Chapter 1: What is a Gyroscope?

A gyroscope is a sensor that measures:

```
Angular Velocity
```

or

```
Rate of Rotation
```

Unlike an accelerometer, which measures movement and acceleration, a gyroscope measures how fast the device is rotating around its axes.

Think of it as:

```
Accelerometer → How the phone moves
Gyroscope     → How the phone rotates
```

---

# Why Do We Need a Gyroscope?

Many modern mobile experiences require precise rotation tracking.

Examples:

- First-person games
- AR applications
- VR headsets
- Camera stabilization
- Motion-controlled experiences
- Flight simulators

Without a gyroscope, these experiences would feel inaccurate and laggy.

---

# Chapter 2: What Does a Gyroscope Measure?

A gyroscope measures rotation around three axes.

```
          Y
          ↑
          |
          |
          ●────→ X
         /
        /
       Z
```

It reports:

```tsx
{
  x: number,
  y: number,
  z: number
}
```

But these values represent:

```
Rotation Speed
```

not position.

---

# Understanding Angular Velocity

Angular velocity means:

> How fast an object rotates over time.
> 

Example:

Imagine a phone spinning on a table.

The gyroscope measures:

```
How fast it spins
```

not:

```
How far it moved
```

---

# Units of Measurement

Expo returns gyroscope values in:

```
Radians Per Second (rad/s)
```

Meaning:

```
How many radians the device rotates every second
```

---

## Understanding Radians

A complete circle:

2\pi\ radians=360^\circ

Examples:

| Radians | Degrees |
| --- | --- |
| π/2 | 90° |
| π | 180° |
| 2π | 360° |

---

## Example Reading

```tsx
{
  x: 0.5,
  y: 0,
  z: 0
}
```

Means:

```
Phone is rotating around X axis
at 0.5 radians per second
```

---

# Chapter 3: Expo Gyroscope API

Installation:

```bash
npx expo install expo-sensors
```

Import:

```tsx
import { Gyroscope } from "expo-sensors";
```

---

# Method 1: isAvailableAsync()

Checks whether a gyroscope exists on the device.

```tsx
const available =
  await Gyroscope.isAvailableAsync();
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

## Use Case

Before enabling:

- AR features
- VR features
- Motion controls

---

# Method 2: addListener()

Starts listening to gyroscope data.

```tsx
const subscription =
  Gyroscope.addListener(data => {
    console.log(data);
  });
```

Output:

```tsx
{
  x: number,
  y: number,
  z: number
}
```

---

## Real Use Cases

- Motion tracking
- AR
- Camera stabilization
- 3D viewers

---

# Method 3: remove()

Stops listening.

```tsx
subscription.remove();
```

Always clean up subscriptions.

---

# Method 4: setUpdateInterval()

Controls how frequently updates arrive.

```tsx
Gyroscope.setUpdateInterval(100);
```

Meaning:

```
Receive updates every 100ms
```

---

## Common Intervals

| Interval | Updates Per Second |
| --- | --- |
| 16ms | ~60 |
| 33ms | ~30 |
| 100ms | 10 |
| 1000ms | 1 |

Formula:

FPS=\frac{1000}{Interval(ms)}

---

# Chapter 4: Understanding Gyroscope Axes

---

## Rotation Around X Axis

Imagine holding the phone horizontally and tilting it forward and backward.

```
Forward Rotation
Backward Rotation
```

X values change.

---

## Rotation Around Y Axis

Imagine rotating the phone left and right.

```
Left Rotation
Right Rotation
```

Y values change.

---

## Rotation Around Z Axis

Imagine placing the phone on a table and spinning it.

```
Clockwise
Counter Clockwise
```

Z values change.

---

# Example Values

---

## Stationary Device

```tsx
{
  x: 0,
  y: 0,
  z: 0
}
```

No rotation.

---

## Slow Rotation

```tsx
{
  x: 0.2,
  y: 0,
  z: 0
}
```

Rotating slowly around X.

---

## Fast Rotation

```tsx
{
  x: 3.5,
  y: 0,
  z: 0
}
```

Rapid rotation.

---

# Chapter 5: Understanding Drift

One of the biggest concepts in gyroscopes.

Even when the device is still:

```tsx
{
  x: 0.01,
  y: -0.02,
  z: 0.01
}
```

may occur.

This happens because:

```
Sensors are not perfect
```

Small errors accumulate over time.

This is called:

```
Gyroscope Drift
```

---

# Why Drift Happens

Imagine:

```
Tiny Error
+
Tiny Error
+
Tiny Error
+
Tiny Error
```

Eventually:

```
Large Error
```

appears.

This is why gyroscopes are often combined with:

- Accelerometers
- Magnetometers

to correct drift.

---

# Chapter 6: Reading Gyroscope Data

Complete Example:

```tsx
import { Gyroscope } from "expo-sensors";
import { useEffect, useState } from "react";

export default function App() {
  const [data, setData] = useState({
    x: 0,
    y: 0,
    z: 0,
  });

  useEffect(() => {
    Gyroscope.setUpdateInterval(100);

    const subscription =
      Gyroscope.addListener(setData);

    return () => {
      subscription.remove();
    };
  }, []);

  return (
    <>
      <Text>X: {data.x}</Text>
      <Text>Y: {data.y}</Text>
      <Text>Z: {data.z}</Text>
    </>
  );
}
```

---

# Chapter 7: Real-World Use Cases

---

## 1. First-Person Games

Games detect:

```
Look Left
Look Right
Look Up
Look Down
```

using gyroscope rotation.

Examples:

- FPS games
- Shooting games

---

## 2. Augmented Reality (AR)

AR applications need precise rotation tracking.

Examples:

- Virtual furniture
- Face filters
- Object placement

---

## 3. Virtual Reality (VR)

VR headsets rely heavily on gyroscopes.

When the user moves their head:

```
Head Rotates
      ↓
Gyroscope Detects Rotation
      ↓
View Updates
```

---

## 4. Camera Stabilization

Modern cameras use gyroscope data to reduce shake.

Examples:

- Video stabilization
- Action cameras

---

## 5. Flight Simulators

Tilt phone:

```
Phone Rotates
     ↓
Aircraft Rotates
```

---

## 6. 360° Product Viewers

Rotate a phone to rotate:

- Cars
- Products
- 3D Models

---

# Chapter 8: Performance Considerations

High update rates:

```tsx
Gyroscope.setUpdateInterval(16);
```

provide:

```
More Accuracy
More Smoothness
```

but also:

```
Higher CPU Usage
Higher Battery Consumption
```

---

# Chapter 9: Sensor Fusion

Most advanced applications don't use a gyroscope alone.

Instead:

```
Accelerometer
      +
Gyroscope
      +
Magnetometer
```

This process is called:

```
Sensor Fusion
```

Benefits:

- Better orientation
- Less drift
- Higher accuracy

This is exactly what:

```
DeviceMotion
```

uses internally.

---

# Chapter 10: Accelerometer vs Gyroscope

This is one of the most important interview questions.

| Feature | Accelerometer | Gyroscope |
| --- | --- | --- |
| Measures | Acceleration | Rotation |
| Detects Gravity | Yes | No |
| Detects Tilt | Yes | Indirectly |
| Detects Rotation Speed | No | Yes |
| Units | g-force | rad/s |
| Works While Stationary | Yes (gravity) | Usually near zero |
| Main Use | Movement Detection | Rotation Tracking |

---

## Example

Imagine placing a phone on a table.

### Accelerometer

```tsx
{
  x: 0,
  y: 0,
  z: 1
}
```

Gravity is detected.

---

### Gyroscope

```tsx
{
  x: 0,
  y: 0,
  z: 0
}
```

No rotation is occurring.

---

## Imagine Spinning the Phone

### Accelerometer

May change slightly because of movement.

---

### Gyroscope

```tsx
{
  x: 0,
  y: 0,
  z: 4.5
}
```

Clearly shows rotational speed.

---

# Accelerometer + Gyroscope Together

Most modern motion systems combine both.

Accelerometer provides:

```
Position Relative To Gravity
```

Gyroscope provides:

```
Smooth Rotation Tracking
```

Together they provide accurate orientation and motion information.

---

# Summary

A gyroscope measures angular velocity (rotation speed) around the X, Y, and Z axes. Expo provides access to gyroscope data through the `Gyroscope` API in `expo-sensors`. The gyroscope is ideal for tracking device rotation, camera stabilization, AR, VR, and gaming experiences. Unlike an accelerometer, it does not measure gravity or linear movement. In real-world applications, gyroscopes are often combined with accelerometers and magnetometers through sensor fusion to provide accurate motion and orientation tracking.

!ChatGPT Image May 29, 2026, 10_32_08 PM.png

# Expo Light Sensor - Complete Teachable Notes

# Chapter 1: What is a Light Sensor?

A Light Sensor (Ambient Light Sensor) is a hardware sensor that measures the amount of light present in the surrounding environment.

Think of it as the phone's ability to understand:

```
How bright or dark the environment is
```

The sensor continuously detects the intensity of light around the device.

---

# Why Do Smartphones Need a Light Sensor?

Without a light sensor, your phone would not know whether you are:

- Sitting in a dark room
- Walking outside in sunlight
- Using the phone at night
- Working in an office

The device would always use the same brightness level.

---

# Real-Life Examples

## Auto Brightness

Most smartphones automatically adjust screen brightness.

Example:

```
Bright Sunlight
      ↓
Increase Brightness
```

```
Dark Room
      ↓
Decrease Brightness
```

This uses the Light Sensor.

---

## Night Reading Apps

Applications can detect:

```
Low Light
      ↓
Enable Dark Theme
```

---

## Smart Home Apps

Applications can automate:

```
Room Becomes Dark
       ↓
Turn On Lights
```

---

# Chapter 2: Expo Light Sensor

Expo provides access to the ambient light sensor through:

```bash
expo-sensors
```

Installation:

```bash
npx expo install expo-sensors
```

Import:

```tsx
import { LightSensor } from "expo-sensors";
```

---

# Platform Support

Important:

```
Android ✅
iOS ❌
Web ❌
```

The Expo Light Sensor currently works only on Android devices.

This is one of the first things you should remember.

---

# Chapter 3: What Does the Light Sensor Measure?

The sensor measures:

```
Illuminance
```

The unit is:

```
Lux (lx)
```

---

# What is Lux?

Lux represents:

```
Amount of light per unit area
```

Higher lux values mean:

```
Brighter Environment
```

Lower lux values mean:

```
Darker Environment
```

---

# Typical Lux Values

| Environment | Lux |
| --- | --- |
| Moonlight | 0.1 |
| Dark Room | 5 |
| Living Room | 50 |
| Office | 300 |
| Cloudy Day | 1000 |
| Outdoor Shade | 10000 |
| Bright Sunlight | 100000 |

---

# Understanding Lux

Imagine:

```
0 Lux
```

means:

```
Almost complete darkness
```

while:

```
100000 Lux
```

means:

```
Extremely bright sunlight
```

---

# Chapter 4: Light Sensor API

Import:

```tsx
import { LightSensor } from "expo-sensors";
```

---

# Method 1: isAvailableAsync()

Checks if the device supports a light sensor.

```tsx
const available =
  await LightSensor.isAvailableAsync();
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

## Use Case

Before enabling light-based features:

```tsx
if (!available) {
  alert("Light sensor not available");
}
```

---

# Method 2: addListener()

Starts listening to light updates.

```tsx
const subscription =
  LightSensor.addListener(data => {
    console.log(data);
  });
```

Returned data:

```tsx
{
  illuminance: number
}
```

Example:

```tsx
{
  illuminance: 850
}
```

Meaning:

```
Current light level is 850 lux
```

---

# Method 3: remove()

Stops listening.

```tsx
subscription.remove();
```

Always remove listeners when leaving a screen.

---

# Method 4: setUpdateInterval()

Controls update frequency.

```tsx
LightSensor.setUpdateInterval(1000);
```

Meaning:

```
Receive updates every 1000ms
```

---

## Common Intervals

| Interval | Updates/Second |
| --- | --- |
| 16ms | ~60 |
| 33ms | ~30 |
| 100ms | 10 |
| 1000ms | 1 |

---

# Chapter 5: Understanding Sensor Data

Example:

```tsx
{
  illuminance: 50
}
```

Represents:

```
Indoor Environment
```

---

Example:

```tsx
{
  illuminance: 5000
}
```

Represents:

```
Outdoor Environment
```

---

Example:

```tsx
{
  illuminance: 1
}
```

Represents:

```
Very Dark Environment
```

---

# Chapter 6: Complete Implementation

```tsx
import { LightSensor } from "expo-sensors";
import { useEffect, useState } from "react";

export default function App() {
  const [light, setLight] = useState(0);

  useEffect(() => {
    LightSensor.setUpdateInterval(1000);

    const subscription =
      LightSensor.addListener(data => {
        setLight(data.illuminance);
      });

    return () => {
      subscription.remove();
    };
  }, []);

  return (
    <Text>
      Lux: {light}
    </Text>
  );
}
```

---

# Chapter 7: Practical Light Levels

## Dark Room

```tsx
{
  illuminance: 5
}
```

Environment:

```
Almost Dark
```

---

## Home

```tsx
{
  illuminance: 50
}
```

Environment:

```
Normal Indoor Lighting
```

---

## Office

```tsx
{
  illuminance: 300
}
```

Environment:

```
Bright Indoor Lighting
```

---

## Outdoors

```tsx
{
  illuminance: 10000
}
```

Environment:

```
Bright Daylight
```

---

# Chapter 8: Real-World Use Cases

## 1. Auto Dark Mode

Example:

```tsx
if (illuminance < 20) {
  enableDarkMode();
}
```

Use Cases:

- Reading apps
- Ebook apps
- Productivity apps

---

## 2. Automatic Brightness

Example:

```tsx
if (illuminance > 5000) {
  increaseBrightness();
}
```

Used by smartphones.

---

## 3. Camera Optimization

Apps can automatically adjust:

- Exposure
- Flash
- Night Mode

based on ambient light.

---

## 4. Smart Home Applications

Example:

```
Room Becomes Dark
       ↓
Turn On Smart Lights
```

---

## 5. Energy Saving Applications

Example:

```
Room Is Bright
      ↓
Turn Off Indoor Lights
```

---

## 6. Plant Monitoring Apps

Detect whether plants receive sufficient sunlight.

---

## 7. Outdoor Activity Detection

Applications can estimate:

```
Indoor
or
Outdoor
```

based on lux levels.

---

# Chapter 9: Performance Considerations

Light levels change slowly.

Therefore:

```tsx
LightSensor.setUpdateInterval(1000);
```

is usually sufficient.

Unlike:

- Accelerometer
- Gyroscope

which often require high-frequency updates.

---

# Chapter 10: Common Challenges

## Sensor Noise

Values fluctuate naturally.

Example:

```
98
101
99
102
97
```

This is normal.

---

## Different Devices

Different Android phones may have:

- Different sensor manufacturers
- Different sensor accuracy
- Different sensor placement

Readings may vary.

---

## Missing Sensor

Some budget Android devices may not include:

```
Ambient Light Sensor
```

Always check availability first.

---

# Light Sensor vs Accelerometer vs Gyroscope

| Feature | Light Sensor | Accelerometer | Gyroscope |
| --- | --- | --- | --- |
| Measures | Light Intensity | Acceleration | Rotation |
| Unit | Lux | g | rad/s |
| Detects Motion | No | Yes | Yes |
| Detects Brightness | Yes | No | No |
| Detects Gravity | No | Yes | No |
| Detects Rotation | No | No | Yes |
| Main Use | Brightness Detection | Movement Tracking | Rotation Tracking |

---

# Summary

The Light Sensor is an environmental sensor that measures ambient light intensity in lux. Expo exposes this functionality through the `LightSensor` API in `expo-sensors`. Unlike the Accelerometer and Gyroscope, it does not track movement or rotation. Instead, it helps applications understand the brightness of the surrounding environment. Common use cases include auto-brightness, dark mode switching, camera optimization, smart home automation, energy-saving systems, and environmental monitoring. The sensor is Android-only in Expo and generally requires low update frequencies because light conditions change much more slowly than motion.