# 📱 Mobile Development Cohort — Week 05 Day 02

# Advanced Sensors in Mobile Development (Deep Dive)

📅 **31-05-2026**

---

# Introduction

In Day 01, we learned about:

* Accelerometer
* Magnetometer
* Light Sensor

These sensors help the phone understand:

```txt
Movement
Direction
Light
```

But modern smartphones can do much more.

For example:

* Count your steps
* Detect if you're walking or driving
* Measure altitude changes
* Detect device rotation accurately
* Build AR experiences
* Track workouts

To achieve this, smartphones use additional sensors and often combine multiple sensors together.

This process is called:

# Sensor Fusion

Sensor Fusion is one of the most important concepts in modern mobile development.

We'll understand it after learning the individual sensors.

---

# Barometer

---

## What is a Barometer?

A Barometer is a sensor that measures atmospheric pressure.

Atmospheric pressure means:

> The pressure exerted by the weight of air surrounding us.

The Earth's atmosphere constantly pushes down on everything.

Even right now.

A barometer measures this pressure.

---

# Understanding Air Pressure

Imagine standing:

### At Sea Level

```txt
Lots of air above you
```

Pressure is high.

---

### On a Mountain

```txt
Less air above you
```

Pressure becomes lower.

---

### Higher Altitude

```txt
Even less air
```

Pressure decreases further.

---

# How Barometer Works

Inside the sensor is a pressure-sensitive membrane.

```txt
Air Pressure
      ↓
Membrane Compresses
      ↓
Electrical Change
      ↓
Pressure Value
```

The sensor measures tiny pressure changes continuously.

---

# What Does It Measure?

Usually measured in:

```txt
Pascal (Pa)

or

Hectopascal (hPa)
```

Example:

```txt
Sea Level
≈ 1013 hPa
```

---

# Why Do We Need Barometer?

Because GPS can tell:

```txt
Where you are
```

But it struggles with:

```txt
Exact vertical height
```

Barometer helps estimate altitude much more accurately.

---

# Real World Uses

## Altitude Detection

```txt
Ground Floor
     ↓
5th Floor
```

Pressure changes.

The phone detects height changes.

---

## Fitness Apps

Apps can detect:

```txt
Stairs Climbed
```

instead of just distance walked.

---

## Weather Forecasting

Pressure changes often indicate:

```txt
Rain
Storm
Weather Change
```

---

## Hiking Apps

Used to calculate:

```txt
Elevation Gain
```

---

# Expo Example

```tsx
import { Barometer } from "expo-sensors";

Barometer.addListener((data) => {
  console.log(data.pressure);
});
```

---

# Gyroscope

---

## What is a Gyroscope?

A Gyroscope measures rotational motion.

While an Accelerometer measures:

```txt
Linear Movement
```

a Gyroscope measures:

```txt
Rotation
```

---

# Understanding Rotation

Imagine holding your phone.

You rotate it:

```txt
Left
Right
Up
Down
```

Even without moving position.

The Gyroscope detects this rotational movement.

---

# Accelerometer vs Gyroscope

### Accelerometer

Measures:

```txt
Movement
Acceleration
Tilt
```

---

### Gyroscope

Measures:

```txt
Rotation
Angular Velocity
```

---

# How Gyroscope Works

Inside the chip are tiny vibrating structures.

```txt
Rotation
    ↓
Vibration Changes
    ↓
Electrical Signal
    ↓
Angular Velocity
```

---

# What Does It Measure?

Three axes:

```txt
X Rotation
Y Rotation
Z Rotation
```

Unit:

```txt
Radians/Second

or

Degrees/Second
```

---

# Why Do We Need Gyroscope?

Accelerometers alone are not accurate enough for orientation.

Gyroscopes provide smoother rotation tracking.

---

# Real World Uses

## Gaming

Examples:

```txt
PUBG
Call of Duty
Free Fire
```

Gyroscope aiming.

---

## VR

Virtual Reality headsets rely heavily on gyroscopes.

---

## AR

Augmented Reality requires accurate rotation tracking.

---

## Camera Stabilization

Helps reduce shaky videos.

---

# Expo Example

```tsx
import { Gyroscope } from "expo-sensors";

Gyroscope.addListener((data) => {
  console.log(data);
});
```

---

# Device Motion

---

## What is Device Motion?

Device Motion is not a physical sensor.

It is a **combined sensor output**.

It combines:

```txt
Accelerometer
+
Gyroscope
+
Magnetometer
```

and sometimes additional sensors.

---

# Why Was Device Motion Created?

Imagine using:

```txt
Accelerometer only
```

Problems:

* Noisy data
* Drift
* Less accurate

Now combine:

```txt
Accelerometer
+
Gyroscope
+
Magnetometer
```

Much more accurate.

---

# Device Motion Output

Provides:

```txt
Orientation
Rotation
Acceleration
Gravity
Heading
```

all together.

---

# Real World Uses

## AR Apps

Need complete orientation data.

---

## Motion Tracking

Detects how the device moves through space.

---

## Sports Analysis

Tracks body movement.

---

## Gesture Detection

Detect:

```txt
Throw
Swing
Shake
```

---

# Expo Example

```tsx
import { DeviceMotion } from "expo-sensors";

DeviceMotion.addListener((data) => {
  console.log(data);
});
```

---

# Pedometer

---

## What is a Pedometer?

A Pedometer is a step-counting sensor.

It detects:

```txt
Walking
Running
Steps
```

---

# How Does It Work?

A pedometer doesn't usually exist as a separate hardware chip.

Modern phones use:

```txt
Accelerometer
+
Motion Algorithms
```

to count steps.

---

# Step Detection Process

```txt
Foot Movement
      ↓
Acceleration Pattern
      ↓
Step Detection Algorithm
      ↓
Step Count Increased
```

---

# Why Do We Need Pedometer?

Fitness applications depend on it.

---

# Real World Uses

## Health Apps

Examples:

```txt
Google Fit
Samsung Health
Apple Health
```

---

## Fitness Tracking

Track:

```txt
Steps
Distance
Calories
```

---

## Workout Apps

Measure daily activity.

---

## Habit Building Apps

Example:

```txt
Goal = 10,000 Steps
```

---

# Expo Example

```tsx
import { Pedometer } from "expo-sensors";

Pedometer.watchStepCount((result) => {
  console.log(result.steps);
});
```

---

# MagnetometerUncalibrated

---

## What is MagnetometerUncalibrated?

It is the raw version of the Magnetometer.

Normal Magnetometer:

```txt
Filtered
Corrected
Calibrated
```

---

MagnetometerUncalibrated:

```txt
Raw Sensor Data
```

No correction applied.

---

# Why Does Calibration Matter?

Phones are affected by:

```txt
Speakers
Magnets
Metal Objects
Electronic Noise
```

These can distort magnetic readings.

Normal Magnetometer tries to fix these issues.

---

# What Does Uncalibrated Mean?

You receive:

```txt
Actual Magnetic Data
```

plus bias values.

---

# Why Use It?

Advanced applications may want:

* Raw measurements
* Custom calibration
* Scientific experiments

---

# Real World Uses

## Research

Collecting sensor data.

---

## Robotics

Building custom navigation systems.

---

## Scientific Analysis

Studying magnetic fields.

---

## Sensor Calibration Systems

Creating custom filters.

---

# Expo Example

```tsx
import { MagnetometerUncalibrated } from "expo-sensors";

MagnetometerUncalibrated.addListener((data) => {
  console.log(data);
});
```

---

# Sensor Fusion

---

# What is Sensor Fusion?

Sensor Fusion means:

> Combining multiple sensors to produce a more accurate result than any individual sensor can provide.

This is one of the most important concepts in modern smartphones.

---

# Why Not Use One Sensor?

Every sensor has weaknesses.

### Accelerometer

Good:

```txt
Detects movement
```

Bad:

```txt
Noisy
```

---

### Gyroscope

Good:

```txt
Smooth rotation
```

Bad:

```txt
Drifts over time
```

---

### Magnetometer

Good:

```txt
Direction
```

Bad:

```txt
Magnetic interference
```

---

# Combining Sensors

Instead of:

```txt
1 Sensor
```

Use:

```txt
Accelerometer
+
Gyroscope
+
Magnetometer
```

---

# Example: Google Maps

To determine direction:

### Accelerometer

```txt
Device Tilt
```

---

### Magnetometer

```txt
Earth Direction
```

---

### Gyroscope

```txt
Rotation
```

---

Combined:

```txt
Accurate Heading
```

---

# Example: Fitness Tracking

Using only Accelerometer:

```txt
Step Count
```

might be inaccurate.

Combine:

```txt
Accelerometer
+
Gyroscope
+
Pedometer
```

Better detection.

---

# Example: AR Applications

AR requires:

```txt
Position
Rotation
Direction
Movement
```

One sensor cannot provide everything.

So AR systems combine:

```txt
Accelerometer
+
Gyroscope
+
Magnetometer
+
Camera
```

This creates smooth AR experiences.

---

# Common Sensor Fusion Algorithms

Advanced systems use:

## Complementary Filter

Combines fast and slow sensors.

---

## Kalman Filter

Widely used in:

```txt
GPS
Robotics
Drones
AR
```

Removes noise and improves accuracy.

---

# Real Example: Navigation

Without Sensor Fusion

```txt
GPS Only
```

Problems:

* Delayed updates
* Poor indoor accuracy

---

With Sensor Fusion

```txt
GPS
+
Accelerometer
+
Gyroscope
+
Magnetometer
```

Result:

```txt
More Accurate Navigation
```

---

# Complete Sensor Ecosystem

```txt
                    Smartphone
                         │
 ┌───────────────────────┼────────────────────────┐
 │                       │                        │
Accelerometer      Gyroscope             Magnetometer
 │                       │                        │
 └───────────────┬───────┴───────────────┬────────┘
                 │                       │
             Device Motion         Sensor Fusion
                 │
                 ▼
        Smart Applications
                 │
 ┌───────────────┼───────────────────────┐
 │               │                       │
Fitness      Navigation                AR/VR
Apps           Apps                    Apps
```

---

# Day 02 Summary

```txt
Barometer
   └─ Air Pressure & Altitude

Gyroscope
   └─ Rotation Tracking

Device Motion
   └─ Combined Motion Data

Pedometer
   └─ Step Counting

MagnetometerUncalibrated
   └─ Raw Magnetic Data

Sensor Fusion
   └─ Combining Sensors For Accuracy
```

## Key Takeaway

Modern mobile applications rarely rely on a single sensor. Instead, they combine data from multiple sensors using **Sensor Fusion** techniques. This allows smartphones to understand movement, direction, altitude, steps, orientation, and location with far greater accuracy than any individual sensor could provide on its own. This is why apps like Google Maps, Pokémon GO, Strava, Apple Health, and Google Fit feel so intelligent and responsive. 🚀
