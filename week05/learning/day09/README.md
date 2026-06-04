# Week 05  Day 01

## Sensors in Mobile Development (Deep Dive)

📅 **30-05-2026**

---

# Introduction

Have you ever wondered how your phone knows:

* When to rotate the screen?
* Which direction you're facing in Google Maps?
* How many steps you've walked today?
* Whether you're in a dark room or bright sunlight?

The answer is **Sensors**.

A modern smartphone is not just a screen and a processor.

It is actually a collection of tiny electronic devices called **sensors** that continuously observe the physical world around the phone and send that information to the operating system.

Without sensors:

❌ No auto-rotate

❌ No compass

❌ No fitness tracking

❌ No auto-brightness

❌ No motion-based games

Most modern mobile applications rely heavily on sensor data.

---

# What is a Sensor?

A sensor is a hardware component that detects some physical property from the real world and converts it into digital data that software can understand.

Think of sensors as the **eyes, ears, and nervous system** of your smartphone.

Humans use:

```txt
Eyes -> See light

Ears -> Hear sound

Skin -> Feel touch

Brain -> Process information
```

Smartphones use:

```txt
Camera -> See

Microphone -> Hear

Touch Screen -> Feel touch

Sensors -> Understand environment
```

---

# How Sensors Work Internally

This is one of the most important concepts.

A sensor does not directly give information to your React Native app.

There are multiple layers involved.

```txt
Real World
    ↓
Sensor Hardware
    ↓
Electrical Signals
    ↓
Sensor Driver
    ↓
Android / iOS
    ↓
Expo Sensors API
    ↓
React Native App
```

---

## Example: Phone Movement

Suppose you move your phone upward.

### Step 1

Physical movement occurs.

```txt
Phone moved upward
```

### Step 2

Accelerometer detects movement.

Inside the sensor, microscopic components shift position.

### Step 3

Movement creates electrical changes.

```txt
Movement
   ↓
Voltage Change
```

### Step 4

Android/iOS converts this into numerical values.

```txt
X = 0.2
Y = 1.8
Z = 9.5
```

### Step 5

Expo Sensors reads these values.

### Step 6

Your React Native application receives the data.

```tsx
Accelerometer.addListener((data) => {
  console.log(data);
});
```

This process happens dozens or hundreds of times every second.

---

# What is Expo Sensors?

Normally, accessing sensors requires:

### Android

```java
SensorManager
SensorEventListener
```

### iOS

```swift
CoreMotion
CoreLocation
```

Different code for different platforms.

This becomes difficult.

Expo solves this problem.

Install:

```bash
npx expo install expo-sensors
```

Now you can access sensors using JavaScript.

```tsx
import { Accelerometer } from "expo-sensors";
```

Expo handles all the native complexity behind the scenes.

---

# Accelerometer

---

## What is an Accelerometer?

An Accelerometer measures acceleration.

Acceleration means:

> How quickly an object's speed or direction changes.

The sensor constantly measures how the device moves through space.

---

## Understanding Acceleration

Imagine you're sitting in a car.

### Car Starts Moving

```txt
Speed:
0 km/h
10 km/h
20 km/h
30 km/h
```

Your speed changes.

That's acceleration.

---

### Car Stops Suddenly

```txt
60 km/h
40 km/h
20 km/h
0 km/h
```

Acceleration can also be negative.

This is called deceleration.

---

### Car Turns Left

Your direction changes.

That is also acceleration.

---

# Accelerometer Axes

The sensor measures movement in three dimensions.

```txt
            Y
            ↑
            |
            |
            |
            |
------------+------------→ X
           /
          /
         /
        Z
```

### X Axis

```txt
Left ↔ Right
```

### Y Axis

```txt
Up ↔ Down
```

### Z Axis

```txt
Forward ↔ Backward
```

---

# Why Does Z Show Around 9.8?

Even when your phone is resting on a table:

```txt
x = 0
y = 0
z = 9.8
```

Why?

Because gravity is pulling the phone toward Earth.

Earth's gravitational acceleration:

g \approx 9.8,m/s^2

The accelerometer detects gravity continuously.

---

# How Accelerometer Works Internally

Inside the chip is a tiny microscopic mass.

```txt
┌─────────────┐
│ Fixed Frame │
│      ●      │ ← Tiny Mass
└─────────────┘
```

When the phone moves:

```txt
Phone Moves
     ↓
Mass Shifts
     ↓
Electrical Change
     ↓
Acceleration Value
```

This happens millions of times per day.

---

# Why Do We Need Accelerometer?

Because applications need to understand movement.

Without movement data:

* No screen rotation
* No step counting
* No shake gestures
* No motion gaming

---

# Real-World Uses

## 1. Auto Rotation

```txt
Portrait
   ↓
Landscape
```

Phone detects orientation changes.

---

## 2. Fitness Apps

Apps like:

* Google Fit
* Samsung Health

track:

```txt
Walking
Running
Movement
```

---

## 3. Games

Examples:

* Racing Games
* Flight Simulators

Turning the phone becomes the controller.

---

## 4. Shake Detection

Apps can detect:

```txt
Shake Phone
      ↓
Undo Action
```

---

# Magnetometer

---

## What is a Magnetometer?

A Magnetometer measures magnetic fields.

Think of it as the phone's digital compass.

---

# What is a Magnetic Field?

A magnetic field is the invisible force surrounding magnets.

Earth itself acts like a giant magnet.

```txt
      North Pole
           ↑
           |
Earth Magnetic Field
           |
           ↓
      South Pole
```

The magnetometer senses this field.

---

# How Magnetometer Works

Inside the sensor are materials that react to magnetic forces.

```txt
Earth Magnetic Field
         ↓
Sensor Detects Strength
         ↓
Direction Calculated
```

---

# Why Do We Need Magnetometer?

Because GPS tells:

```txt
Where you are
```

But not:

```txt
Which direction you face
```

The magnetometer solves this.

---

# Real Example

Suppose you're standing still.

GPS says:

```txt
Latitude:
26.1445

Longitude:
91.7362
```

But GPS cannot determine:

```txt
North?
South?
East?
West?
```

The magnetometer can.

---

# Real-World Uses

## Compass App

Shows:

```txt
N
S
E
W
```

---

## Google Maps

The blue arrow rotates based on magnetometer data.

```txt
You turn
     ↓
Arrow turns
```

---

## Navigation

Essential for:

* Driving
* Walking
* Hiking

---

## AR Applications

Apps need to know orientation.

Examples:

* Pokémon GO
* AR Navigation

---

# Light Sensor

---

## What is a Light Sensor?

A Light Sensor measures the amount of light around the device.

Usually located near:

```txt
Front Camera
Speaker
```

at the top of the phone.

---

# What Does It Measure?

The unit is:

```txt
Lux (lx)
```

Lux represents light intensity.

---

# Examples of Lux Values

| Environment     | Lux     |
| --------------- | ------- |
| Dark Room       | 5–10    |
| Home Room       | 100–300 |
| Office          | 500     |
| Cloudy Day      | 1000    |
| Direct Sunlight | 100000  |

---

# How Light Sensor Works

The sensor contains a photodiode.

A photodiode is a semiconductor that reacts to light.

```txt
Light Hits Sensor
        ↓
Electrons Move
        ↓
Current Generated
        ↓
Brightness Calculated
```

More light = more current.

---

# Why Do We Need Light Sensors?

Without them:

```txt
Screen always same brightness
```

Problems:

* Hard to see outdoors
* Too bright at night
* Wastes battery

---

# Auto Brightness System

```txt
Dark Room
     ↓
Light Sensor
     ↓
OS
     ↓
Brightness Reduced
```

---

```txt
Bright Sunlight
      ↓
Light Sensor
      ↓
OS
      ↓
Brightness Increased
```

This happens automatically.

---

# Real-World Uses

## Auto Brightness

Most common use.

---

## Battery Saving

Lower brightness:

```txt
Less Power Consumption
```

---

## Reading Mode

Brightness adjusts for comfortable reading.

---

## Camera Optimization

Helps camera estimate environmental lighting.

---

# Sensor Comparison

| Sensor        | Detects        | Example Uses      |
| ------------- | -------------- | ----------------- |
| Accelerometer | Movement       | Rotation, Fitness |
| Magnetometer  | Direction      | Maps, Compass     |
| Light Sensor  | Light Level    | Auto Brightness   |
| Gyroscope     | Rotation Speed | Games, AR         |
| GPS           | Location       | Navigation        |

---

# How Sensors Work Together

A single sensor is rarely enough.

Example: Google Maps

```txt
GPS
  ↓
Location

Magnetometer
  ↓
Direction

Accelerometer
  ↓
Movement

Combined
  ↓
Accurate Navigation
```

Modern applications often combine multiple sensors to create intelligent experiences.

---

# Key Interview Questions

### What is a sensor?

A hardware component that detects physical changes and converts them into digital data.

### What is an accelerometer?

A sensor that measures acceleration and movement along X, Y, and Z axes.

### Why does an accelerometer show 9.8 when stationary?

Because it continuously detects Earth's gravity.

### What is a magnetometer?

A sensor that measures magnetic fields and acts as a digital compass.

### What is a light sensor?

A sensor that measures ambient light intensity in lux.

### What is Expo Sensors?

A React Native/Expo package that provides JavaScript access to native device sensors.

---

# Day 01 Summary

```txt
Sensors
   │
   ├── Accelerometer
   │      ├── Movement
   │      ├── Gravity
   │      ├── Auto Rotation
   │      └── Fitness Tracking
   │
   ├── Magnetometer
   │      ├── Earth Magnetic Field
   │      ├── Compass
   │      ├── Navigation
   │      └── AR Apps
   │
   └── Light Sensor
          ├── Lux Measurement
          ├── Auto Brightness
          ├── Battery Saving
          └── Better Visibility
```

Understanding sensors is important because they are the bridge between the **physical world** and your **mobile application**. Every time a phone moves, rotates, changes direction, or enters a bright room, sensors are constantly collecting data and helping applications make intelligent decisions.
