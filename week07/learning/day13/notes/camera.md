# 📸 Expo Camera — Deep Notes

`expo-camera` is used when your app needs a **live camera preview**.

It can:

* open front/back camera
* take photos
* record videos
* scan barcodes / QR codes
* control zoom
* control flash
* enable torch
* use microphone while recording video

Expo Camera uses `CameraView` as the main component. Captured photos/videos are saved first in the **app cache**, not permanent gallery storage. ([Expo Documentation][1])

---

# 1. Installation

```bash
npx expo install expo-camera
```

Use `expo install`, not normal npm install, because Expo installs the version compatible with your SDK.

---

# 2. Android permissions

For camera only:

```json
"permissions": [
  "android.permission.CAMERA"
]
```

For video recording with audio:

```json
"permissions": [
  "android.permission.CAMERA",
  "android.permission.RECORD_AUDIO"
]
```

---

# 3. Config plugin

In `app.json`:

```json
{
  "expo": {
    "plugins": [
      [
        "expo-camera",
        {
          "cameraPermission": "Allow $(PRODUCT_NAME) to access your camera.",
          "microphonePermission": "Allow $(PRODUCT_NAME) to access your microphone.",
          "recordAudioAndroid": true,
          "barcodeScannerEnabled": true
        }
      ]
    ]
  }
}
```

## Meaning

| Option                  | Meaning                                       |
| ----------------------- | --------------------------------------------- |
| `cameraPermission`      | iOS camera permission message                 |
| `microphonePermission`  | iOS microphone permission message             |
| `recordAudioAndroid`    | Allows audio while video recording on Android |
| `barcodeScannerEnabled` | Enables barcode scanner support               |

After changing plugin options, create a **new development/production build**.

---

# 4. App binary concept

This part is important.

`expo-camera` is a **native module**.

That means camera permission text, barcode scanner support, and microphone recording behavior become part of the **native app binary**.

So after changing:

```json
plugins
permissions
recordAudioAndroid
barcodeScannerEnabled
```

you usually need:

```bash
eas build --profile development
```

or production build again.

OTA updates cannot add new native permission or native module configuration.

---

# 5. Basic camera permission flow

Always check permission before showing the camera.

```tsx
import { CameraView, useCameraPermissions } from "expo-camera";
import { Button, Text, View } from "react-native";

export default function CameraScreen() {
  const [permission, requestPermission] = useCameraPermissions();

  if (!permission) {
    return <Text>Loading permission...</Text>;
  }

  if (!permission.granted) {
    return (
      <View style={{ flex: 1, justifyContent: "center", padding: 24 }}>
        <Text style={{ marginBottom: 16 }}>
          Camera permission is required to take photos.
        </Text>

        <Button title="Allow Camera" onPress={requestPermission} />
      </View>
    );
  }

  return <CameraView style={{ flex: 1 }} facing="back" />;
}
```

## Why this matters

Do not mount `CameraView` before permission is granted.

Bad flow:

```tsx
<CameraView />
```

before permission can cause blank preview or permission-related issues.

Good flow:

```txt
Check permission → Ask permission → Render CameraView
```

---

# 6. Main component: CameraView

```tsx
<CameraView
  style={{ flex: 1 }}
  facing="back"
  mode="picture"
/>
```

A better documentation table should include:

* **Prop Name**
* **Possible Values / Type**
* **Purpose**
* **Example**

# `CameraView` Props Reference

`CameraView` renders the live camera preview and provides controls for capturing photos, recording videos, scanning barcodes, and configuring camera behavior.

| Prop                     | Values / Type             | Purpose                             | Example                                            |
| ------------------------ | ------------------------- | ----------------------------------- | -------------------------------------------------- |
| `facing`                 | `'front' \| 'back'`       | Select which camera to use          | `facing="back"`                                    |
| `mode`                   | `'picture' \| 'video'`    | Camera mode                         | `mode="video"`                                     |
| `flash`                  | `'off' \| 'on' \| 'auto'` | Flash behavior when taking photos   | `flash="auto"`                                     |
| `enableTorch`            | `boolean`                 | Keep flashlight on during preview   | `enableTorch={true}`                               |
| `zoom`                   | `number (0-1)`            | Camera zoom level                   | `zoom={0.5}`                                       |
| `mirror`                 | `boolean`                 | Mirror front camera preview         | `mirror={true}`                                    |
| `active`                 | `boolean`                 | Start/stop camera preview           | `active={isFocused}`                               |
| `mute`                   | `boolean`                 | Disable video recording audio       | `mute={true}`                                      |
| `animateShutter`         | `boolean`                 | Show capture animation              | `animateShutter={true}`                            |
| `barcodeScannerSettings` | `BarcodeSettings`         | Configure allowed barcode types     | `barcodeScannerSettings={{ barcodeTypes:['qr'] }}` |
| `onBarcodeScanned`       | `function`                | Trigger when barcode/QR is detected | `onBarcodeScanned={handleScan}`                    |
| `onCameraReady`          | `function`                | Called when camera is ready         | `onCameraReady={() => setReady(true)}`             |
| `onMountError`           | `function`                | Called if camera fails to start     | `onMountError={(e)=>console.log(e)}`               |

---

# Camera Selection

### Back Camera

```tsx
<CameraView
  facing="back"
/>
```

Used for:

* Normal photography
* QR scanning
* Document scanning
* Video recording

---

### Front Camera

```tsx
<CameraView
  facing="front"
/>
```

Used for:

* Selfies
* Video calls
* Profile pictures
* Face verification

---

# Camera Modes

### Picture Mode

```tsx
<CameraView
  mode="picture"
/>
```

Used with:

```tsx
await cameraRef.current?.takePictureAsync();
```

---

### Video Mode

```tsx
<CameraView
  mode="video"
/>
```

Used with:

```tsx
await cameraRef.current?.recordAsync();
```

---

# Flash

### Off

```tsx
<CameraView flash="off" />
```

Flash never fires.

---

### On

```tsx
<CameraView flash="on" />
```

Always fires when photo is taken.

---

### Auto

```tsx
<CameraView flash="auto" />
```

System decides based on lighting.

---

# Torch

Torch is different from flash.

```tsx
<CameraView
  enableTorch={true}
/>
```

### Flash

```txt
Only when photo is captured
```

### Torch

```txt
LED remains ON continuously
```

Useful for:

* QR scanner
* Document scanner
* Low-light preview

---

# Zoom

### No Zoom

```tsx
zoom={0}
```

---

### Medium Zoom

```tsx
zoom={0.5}
```

---

### Maximum Zoom

```tsx
zoom={1}
```

```txt
0     = no zoom
0.25  = slight zoom
0.50  = medium zoom
0.75  = high zoom
1.00  = maximum zoom
```

---

# Mirror

Useful for selfie camera.

```tsx
<CameraView
  facing="front"
  mirror={true}
/>
```

Without mirror:

```txt
Real camera view
```

With mirror:

```txt
Like looking in a mirror
```

---

# Barcode Scanner

### QR Only

```tsx
<CameraView
  barcodeScannerSettings={{
    barcodeTypes: ["qr"],
  }}
/>
```

### Multiple Types

```tsx
<CameraView
  barcodeScannerSettings={{
    barcodeTypes: [
      "qr",
      "ean13",
      "ean8",
      "code128"
    ],
  }}
/>
```

---

# onBarcodeScanned

```tsx
<CameraView
  onBarcodeScanned={({ data }) => {
    console.log(data);
  }}
/>
```

Returned object:

```tsx
{
  type: "qr",
  data: "https://example.com"
}
```

---

# onCameraReady

```tsx
<CameraView
  onCameraReady={() => {
    setReady(true);
  }}
/>
```

Use it before enabling:

```tsx
Take Photo
Record Video
Scan QR
```

---

# onMountError

```tsx
<CameraView
  onMountError={(error) => {
    console.log(error.message);
  }}
/>
```

Useful when:

* Permission denied
* Camera unavailable
* Emulator limitation
* Hardware issue

---

# Most Common Production Setup

```tsx
<CameraView
  ref={cameraRef}
  style={{ flex: 1 }}
  facing={facing}
  mode="picture"
  flash="auto"
  zoom={0}
  onCameraReady={() => setReady(true)}
  onMountError={(error) =>
    console.log(error.message)
  }
/>
```


---

# 7. Camera ready state

Do not enable the capture button immediately.

Wait for:

```tsx
onCameraReady={() => setReady(true)}
```

Example:

```tsx
import { CameraView, useCameraPermissions } from "expo-camera";
import { useState } from "react";
import { Text, View } from "react-native";

export default function PreviewScreen() {
  const [permission] = useCameraPermissions();
  const [ready, setReady] = useState(false);

  if (!permission?.granted) {
    return <Text>Camera permission required.</Text>;
  }

  return (
    <View style={{ flex: 1 }}>
      <CameraView
        style={{ flex: 1 }}
        facing="back"
        onCameraReady={() => setReady(true)}
        onMountError={({ message }) => console.warn(message)}
      />

      <Text style={{ padding: 12 }}>
        {ready ? "Camera ready" : "Starting camera..."}
      </Text>
    </View>
  );
}
```

---

# 8. Taking a photo

To take a photo, use a ref.

```tsx
const cameraRef = useRef<CameraView>(null);
```

Then call:

```tsx
const photo = await cameraRef.current?.takePictureAsync({
  quality: 0.8,
});
```

Full example:

```tsx
import { CameraView, useCameraPermissions } from "expo-camera";
import { Image } from "expo-image";
import { useRef, useState } from "react";
import { Button, View } from "react-native";

export default function PhotoScreen() {
  const cameraRef = useRef<CameraView>(null);
  const [permission] = useCameraPermissions();
  const [ready, setReady] = useState(false);
  const [photoUri, setPhotoUri] = useState<string | null>(null);

  if (!permission?.granted) return null;

  const takePhoto = async () => {
    const photo = await cameraRef.current?.takePictureAsync({
      quality: 0.8,
    });

    if (photo?.uri) {
      setPhotoUri(photo.uri);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <CameraView
        ref={cameraRef}
        style={{ flex: 1 }}
        facing="back"
        mode="picture"
        onCameraReady={() => setReady(true)}
      />

      <Button title="Take Photo" onPress={takePhoto} disabled={!ready} />

      {photoUri && (
        <Image
          source={{ uri: photoUri }}
          style={{ height: 200 }}
          contentFit="cover"
        />
      )}
    </View>
  );
}
```

## Important

The returned URI is usually in app cache.

Example:

```txt
file:///data/user/0/.../cache/Camera/...
```

Cache is temporary. If the photo is important, copy it to permanent storage or save it to media library.

---

# 9. Save photo permanently

For long-term app storage:

```bash
npx expo install expo-file-system
```

Use this idea:

```tsx
import * as FileSystem from "expo-file-system";

const permanentUri =
  FileSystem.documentDirectory + `photos/${Date.now()}.jpg`;

await FileSystem.makeDirectoryAsync(
  FileSystem.documentDirectory + "photos/",
  { intermediates: true }
);

await FileSystem.copyAsync({
  from: photo.uri,
  to: permanentUri,
});
```

## Cache vs permanent storage

| Type                   | Meaning                                  |
| ---------------------- | ---------------------------------------- |
| Cache URI              | Temporary file, can be deleted by system |
| Document directory URI | Long-term app storage                    |
| Media Library          | Saved to user gallery                    |

For file manager apps, do not keep only the cache URI.

---

# 10. Save to device gallery

Use:

```bash
npx expo install expo-media-library
```

Flow:

```txt
take photo → get cache uri → ask media permission → save to gallery
```

Example:

```tsx
import * as MediaLibrary from "expo-media-library";

const [mediaPermission, requestMediaPermission] =
  MediaLibrary.usePermissions();

const saveToGallery = async (uri: string) => {
  if (!mediaPermission?.granted) {
    const result = await requestMediaPermission();
    if (!result.granted) return;
  }

  await MediaLibrary.saveToLibraryAsync(uri);
};
```

Use this when the user expects the photo to appear in the phone gallery.

---

# 11. Recording video

Video needs camera permission and microphone permission if you want audio.

```tsx
import {
  CameraView,
  useCameraPermissions,
  useMicrophonePermissions,
} from "expo-camera";
```

Basic idea:

```tsx
const video = await cameraRef.current?.recordAsync();
```

Stop recording:

```tsx
cameraRef.current?.stopRecording();
```

Simple example:

```tsx
import {
  CameraView,
  useCameraPermissions,
  useMicrophonePermissions,
} from "expo-camera";
import { useRef, useState } from "react";
import { Button, Text, View } from "react-native";

export default function VideoScreen() {
  const cameraRef = useRef<CameraView>(null);

  const [cameraPermission] = useCameraPermissions();
  const [micPermission, requestMicPermission] = useMicrophonePermissions();

  const [ready, setReady] = useState(false);
  const [recording, setRecording] = useState(false);
  const [videoUri, setVideoUri] = useState<string | null>(null);

  if (!cameraPermission?.granted) {
    return <Text>Camera permission required.</Text>;
  }

  if (!micPermission?.granted) {
    return (
      <View style={{ flex: 1, justifyContent: "center", padding: 24 }}>
        <Text>Microphone permission is required for video audio.</Text>
        <Button title="Allow Microphone" onPress={requestMicPermission} />
      </View>
    );
  }

  const startRecording = async () => {
    setRecording(true);

    const video = await cameraRef.current?.recordAsync();

    setRecording(false);

    if (video?.uri) {
      setVideoUri(video.uri);
    }
  };

  const stopRecording = () => {
    cameraRef.current?.stopRecording();
  };

  return (
    <View style={{ flex: 1 }}>
      <CameraView
        ref={cameraRef}
        style={{ flex: 1 }}
        facing="back"
        mode="video"
        onCameraReady={() => setReady(true)}
      />

      <Button
        title={recording ? "Stop Recording" : "Start Recording"}
        onPress={recording ? stopRecording : startRecording}
        disabled={!ready}
      />

      {videoUri && <Text>Video saved at: {videoUri}</Text>}
    </View>
  );
}
```

---

# 12. Flash vs Torch

Many beginners confuse these two.

## Flash

Flash is used when taking a photo.

```tsx
<CameraView flash="on" />
```

Useful for:

```txt
photo capture in dark area
```

## Torch

Torch keeps the LED light continuously on during preview.

```tsx
<CameraView enableTorch={true} />
```

Useful for:

```txt
QR scanner
document scanner
low-light preview
```

---

# 13. Front and back camera

Use state:

```tsx
const [facing, setFacing] = useState<"back" | "front">("back");
```

Switch:

```tsx
setFacing((current) => (current === "back" ? "front" : "back"));
```

Example:

```tsx
<CameraView style={{ flex: 1 }} facing={facing} />
```

For selfie camera, sometimes use:

```tsx
mirror={true}
```

---

# 14. Zoom

Zoom value is from `0` to `1`.

```tsx
const [zoom, setZoom] = useState(0);

<CameraView zoom={zoom} />
```

Example values:

```txt
0    = no zoom
0.5  = medium zoom
1    = maximum zoom
```

Do not instantly jump to `1`; provide smooth slider UI if needed.

---

# 15. Barcode / QR scanning

`CameraView` can detect barcodes in the camera preview. ([Expo Documentation][1])

Example:

```tsx
import { CameraView, useCameraPermissions } from "expo-camera";
import { useState } from "react";
import { Text, View } from "react-native";

export default function QRScannerScreen() {
  const [permission] = useCameraPermissions();
  const [scannedData, setScannedData] = useState<string | null>(null);
  const [scanned, setScanned] = useState(false);

  if (!permission?.granted) {
    return <Text>Camera permission required.</Text>;
  }

  return (
    <View style={{ flex: 1 }}>
      <CameraView
        style={{ flex: 1 }}
        facing="back"
        barcodeScannerSettings={{
          barcodeTypes: ["qr"],
        }}
        onBarcodeScanned={({ data }) => {
          if (scanned) return;

          setScanned(true);
          setScannedData(data);
        }}
      />

      {scannedData && <Text>Scanned: {scannedData}</Text>}
    </View>
  );
}
```

## Why dedupe is important

`onBarcodeScanned` can fire many times quickly.

Without this:

```tsx
if (scanned) return;
```

your app may:

* navigate multiple times
* send duplicate API requests
* show repeated alerts
* save duplicate data

---

# 16. Camera with screen focus

When using React Navigation / Expo Router, unmount camera when screen is not focused.

Camera preview is heavy. If it remains mounted in background, it can cause:

* black screen
* battery drain
* camera lock
* app performance issues

Example:

```tsx
import { useIsFocused } from "@react-navigation/native";

const isFocused = useIsFocused();

return (
  <View style={{ flex: 1 }}>
    {isFocused && permission?.granted && (
      <CameraView style={{ flex: 1 }} facing="back" />
    )}
  </View>
);
```

---

# 17. Typical Expo Camera flow

```txt
1. Install expo-camera
2. Add config plugin if needed
3. Create new native build if plugin changed
4. Ask camera permission
5. Render CameraView only after permission
6. Wait for onCameraReady
7. Capture photo / record video / scan barcode
8. Use returned URI
9. Copy to permanent storage if needed
10. Unmount camera when leaving screen
```

---

# 18. Real-world examples

## WhatsApp

Uses camera for:

* profile photo
* status photo/video
* document scan
* QR login

## Instagram

Uses camera for:

* stories
* reels
* profile photo
* live capture

## Food delivery app

Uses camera for:

* restaurant food image upload
* delivery proof photo
* user profile picture
* document verification

## File manager app

Uses camera for:

* scanning documents
* saving photos inside folders
* attaching media to records

---

# 19. `expo-camera` vs `expo-image-picker`

| Feature             | `expo-camera`        | `expo-image-picker`    |
| ------------------- | -------------------- | ---------------------- |
| Live camera preview | Yes                  | No                     |
| Take new photo      | Yes                  | Yes, through system UI |
| Pick old image      | No                   | Yes                    |
| Record video        | Yes                  | Yes, through system UI |
| Custom camera UI    | Yes                  | No                     |
| QR scan             | Yes                  | No                     |
| Best for            | Custom camera screen | Gallery picker         |

Use `expo-camera` when you need custom camera UI.

Use `expo-image-picker` when the user only needs to select existing media.

---

# 20. `expo-camera` vs `expo-media-library`

| Package              | Purpose                      |
| -------------------- | ---------------------------- |
| `expo-camera`        | Capture photo/video          |
| `expo-media-library` | Access/save media in gallery |

Camera takes the picture.

Media Library saves or reads gallery files.

---

# 21. Common mistakes

## Mistake 1: Using cache URI forever

Bad:

```tsx
saveToDatabase(photo.uri);
```

Better:

```tsx
copy photo.uri to FileSystem.documentDirectory
save permanentUri to database
```

---

## Mistake 2: Rendering camera without permission

Bad:

```tsx
return <CameraView />;
```

Better:

```tsx
if (!permission?.granted) return <PermissionScreen />;
return <CameraView />;
```

---

## Mistake 3: Not waiting for camera ready

Bad:

```tsx
<Button onPress={takePhoto} />
```

Better:

```tsx
<Button disabled={!ready} onPress={takePhoto} />
```

---

## Mistake 4: Not stopping video

Before leaving screen:

```tsx
cameraRef.current?.stopRecording();
```

---

## Mistake 5: Using camera for gallery picking

Bad:

```txt
Use expo-camera to pick old image
```

Better:

```txt
Use expo-image-picker
```

---

# 22. Best production pattern

For real apps, use this architecture:

```txt
CameraScreen
 ├─ PermissionGate
 ├─ CameraPreview
 ├─ CaptureButton
 ├─ PreviewResult
 ├─ SaveToFileSystem
 └─ SaveRecordToSQLite
```

## Flow for your PocketFiles / File Manager app

```txt
User opens scanner/camera
↓
Camera permission checked
↓
CameraView opens
↓
User captures image
↓
Image saved first in cache
↓
App copies image to FileSystem.documentDirectory/pocketfiles/
↓
Permanent URI saved in SQLite
↓
User can open/share/delete later
```

---

# 23. Final mental model

Think of `expo-camera` like this:

```txt
expo-camera = live camera + capture + record + scan
expo-file-system = permanent app file storage
expo-media-library = phone gallery
expo-image-picker = pick existing media
expo-haptics = feedback after capture/scan
```

For production apps, camera is only the first step. The real work is permission handling, cache-to-permanent storage, preview, upload/share, and cleanup.

[1]: https://docs.expo.dev/versions/latest/sdk/camera/?utm_source=chatgpt.com "Camera"
