# 📱 Week 07 • Day 13

## Mobile Development Cohort

📅 **13-06-2026**

---

# Topics Covered

### 📸 Expo Camera (`expo-camera`)

### 🎵 Expo Audio (`expo-audio`)

---

# 📸 Expo Camera

## What is Expo Camera?

`expo-camera` allows React Native applications to access the device camera for:

* Taking photos
* Recording videos
* Scanning QR Codes
* Scanning Barcodes
* Camera previews
* Front and back camera switching

It provides the `CameraView` component that renders a live camera feed inside your application.

---

## Installation

```bash
npx expo install expo-camera
```

---

## Common Features

### Photo Capture

```txt
Open Camera
    ↓
Take Picture
    ↓
Receive Image URI
```

---

### Video Recording

```txt
Open Camera
    ↓
Start Recording
    ↓
Stop Recording
    ↓
Receive Video URI
```

---

### QR & Barcode Scanning

```txt
Camera Preview
      ↓
Detect QR Code
      ↓
Read Data
```

Used in:

* Payment Apps
* Ticket Verification
* Product Scanners

---

## Permissions

Before using the camera, permission is required.

```tsx
const [permission, requestPermission] =
  useCameraPermissions();
```

### Camera Permission Flow

```txt
Open Screen
     ↓
Request Permission
     ↓
Granted?
  /       \
Yes        No
 ↓          ↓
Camera    Show Message
```

---

## Main Component

### `CameraView`

```tsx
<CameraView
  style={{ flex: 1 }}
  facing="back"
/>
```

Displays a live camera preview.

---

## Important Props

| Prop               | Purpose             | Example                 |
| ------------------ | ------------------- | ----------------------- |
| `facing`           | Camera side         | `"front"` / `"back"`    |
| `mode`             | Camera mode         | `"picture"` / `"video"` |
| `flash`            | Flash mode          | `"on"`                  |
| `enableTorch`      | Keep flashlight on  | `true`                  |
| `zoom`             | Zoom level          | `0.5`                   |
| `mirror`           | Mirror front camera | `true`                  |
| `onCameraReady`    | Camera initialized  | Callback                |
| `onMountError`     | Error handling      | Callback                |
| `onBarcodeScanned` | Barcode detected    | Callback                |

---

## Taking Photos

```tsx
const photo =
  await cameraRef.current?.takePictureAsync();
```

Returns:

```txt
file:///photo.jpg
```

---

## Recording Videos

```tsx
const video =
  await cameraRef.current?.recordAsync();
```

Returns:

```txt
file:///video.mp4
```

Stop recording:

```tsx
cameraRef.current?.stopRecording();
```

---

## Camera Workflow

```txt
Request Permission
        ↓
Render CameraView
        ↓
Wait for onCameraReady
        ↓
Capture Photo / Video
        ↓
Receive File URI
        ↓
Display / Upload / Save
```

---

## Best Practices

### Request Permission First

Never mount camera before permission.

---

### Wait for Camera Ready

```tsx
onCameraReady={() => setReady(true)}
```

Enable capture buttons only after ready.

---

### Unmount When Leaving Screen

Prevents unnecessary battery usage.

---

### Save Files Permanently

Captured files are stored in cache.

Use:

```txt
expo-media-library
```

to save them to the device gallery.

---

## Related Packages

| Package              | Purpose               |
| -------------------- | --------------------- |
| `expo-media-library` | Save photos/videos    |
| `expo-file-system`   | Manage captured files |
| `expo-image-picker`  | Pick existing media   |
| `expo-haptics`       | Shutter feedback      |

---

# 🎵 Expo Audio

## What is Expo Audio?

`expo-audio` is the modern Expo package for:

* Audio Playback
* Audio Recording
* Volume Control
* Background Audio
* Local Audio Files
* Remote Audio Streaming

It replaces the older `expo-av` audio APIs for new projects.

---

## Installation

```bash
npx expo install expo-audio
```

---

## What Can It Do?

```txt
expo-audio
│
├── Play Audio
├── Pause Audio
├── Stop Audio
├── Seek Audio
├── Adjust Volume
├── Record Audio
├── Track Playback State
└── Stream Remote Audio
```

---

# Audio Playback

## Local Audio

```tsx
const player =
  useAudioPlayer(
    require("./song.mp3")
  );
```

---

## Remote Audio

```tsx
const player =
  useAudioPlayer(
    "https://example.com/song.mp3"
  );
```

---

## Playback Controls

### Play

```tsx
player.play();
```

### Pause

```tsx
player.pause();
```

### Stop

```tsx
player.seekTo(0);
player.pause();
```

---

## Volume Control

```tsx
player.volume = 0.5;
```

Values:

```txt
0   = Mute
0.5 = 50%
1   = 100%
```

---

## Audio Player Flow

```txt
Load Audio
      ↓
Play
      ↓
Pause
      ↓
Resume
      ↓
Stop
```

---

# Audio Recording

Expo Audio can record microphone input.

---

## Recording Permission

```tsx
await AudioModule
  .requestRecordingPermissionsAsync();
```

---

## Create Recorder

```tsx
const recorder =
  useAudioRecorder(
    RecordingPresets.HIGH_QUALITY
  );
```

---

## Start Recording

```tsx
await recorder.prepareToRecordAsync();

recorder.record();
```

---

## Stop Recording

```tsx
await recorder.stop();
```

---

## Result

```txt
file:///recording.m4a
```

---

# Recording Flow

```txt
Request Mic Permission
         ↓
Prepare Recorder
         ↓
Start Recording
         ↓
Stop Recording
         ↓
Receive Audio File URI
```

---

## Recording State

```tsx
const state =
  useAudioRecorderState(recorder);
```

Provides:

| Property         | Purpose            |
| ---------------- | ------------------ |
| `isRecording`    | Recording active   |
| `durationMillis` | Recording duration |

---

## Audio Modes

```tsx
await setAudioModeAsync({
  playsInSilentMode: true,
  allowsRecording: true,
});
```

---

## Common Use Cases

### Voice Notes

```txt
WhatsApp
Telegram
Messenger
```

---

### Podcasts

```txt
Record Episodes
```

---

### Music Players

```txt
Play MP3 Files
```

---

### Language Learning Apps

```txt
Record User Pronunciation
```

---

### Meeting Recorders

```txt
Capture Audio Notes
```

---

# Best Practices

### Request Microphone Permission Only When Needed

```txt
User Taps Record
       ↓
Request Permission
```

---

### Handle Permission Denials

Always provide fallback UI.

---

### Stop Recording Before Navigation

Avoid recording leaks.

---

### Show Recording Duration

Improves user experience.

---

### Validate Audio Files Before Upload

Check:

* Duration
* Size
* Format

---

# Camera vs Audio

| Feature           | Expo Camera | Expo Audio   |
| ----------------- | ----------- | ------------ |
| Photos            | ✅           | ❌            |
| Videos            | ✅           | ❌            |
| Audio Playback    | ❌           | ✅            |
| Audio Recording   | ❌           | ✅            |
| QR Scanning       | ✅           | ❌            |
| Microphone Access | Video Only  | Full Support |

---

# Day 13 Summary

Today we explored two important media APIs in Expo:

### 📸 Expo Camera

Learned how to:

* Access device camera
* Take photos
* Record videos
* Switch cameras
* Scan QR codes
* Handle permissions

### 🎵 Expo Audio

Learned how to:

* Play local and remote audio
* Control playback
* Adjust volume
* Record audio
* Manage microphone permissions
* Build voice recording features

---

# Key Takeaway

```txt
expo-camera
      ↓
Capture visual content

expo-audio
      ↓
Capture and play sound

Together they enable building:
📸 Camera Apps
🎥 Video Apps
🎙 Voice Recorders
🎵 Music Players
📱 Modern Media Applications
```

