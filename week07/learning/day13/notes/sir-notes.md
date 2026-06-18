Camera , audio recording , and media library access.

# expo-camera

**Package:** `expo-camera`

**Expo SDK:** 55

**Docs:** https://docs.expo.dev/versions/v55.0.0/sdk/camera/

---

## 1. Definition

**expo-camera** exposes the device camera through a React Native component called `CameraView`. It wraps native camera APIs on iOS and Android (and limited web support) so you can:

- Show a **live camera preview** in your app
- **Take photos** and **record videos**
- Control **flash**, **torch**, and **zoom**
- **Scan barcodes** (QR, EAN, Code 128, etc.)

It is a **native module**. Full device features require a **development build** (EAS), not just Expo Go in all cases.

---

## 2. When to use it

| Use `expo-camera` | Use something else |
| --- | --- |
| Live preview inside your app | Picking existing photos → `expo-image-picker` |
| Take a new photo or video | Browsing the gallery → `expo-media-library` |
| Scan QR / barcodes from camera | Picking a file from storage → `expo-document-picker` |

---

## 3. Core concepts

### Camera preview

A **live video feed** rendered in your React tree. It is not a static image — it is a native camera session bound to a view.

### Camera session

The native resource that owns the camera hardware (sensor, autofocus, exposure). Starting a preview opens a session; unmounting `CameraView` should close it.

> **Rule:** Only **one** camera preview should be active in your app at a time.
> 

### Facing (`CameraType`)

- `back` — rear camera (default)
- `front` — selfie camera

### Mode (`CameraMode`)

- `picture` — still photo capture
- `video` — movie recording

### Flash (`FlashMode`)

Burst of light at the **moment a photo is taken**: `off` | `on` | `auto`. Flash does **not** stay on during preview.

### Torch

LED kept **on continuously** during preview. Controlled with `enableTorch`. Separate from flash.

### Zoom

Normalized number **0 to 1** (0 = widest, 1 = max zoom on device). Not the same as “2× optical zoom.”

### Capture URI

Local file path (or base64 on web) written to **app cache**. Copy to permanent storage if users need files long-term.

### Barcode scanning

Enabled with `barcodeScannerSettings` + `onBarcodeScanned`. The callback may fire **repeatedly** while a code stays in frame — dedupe in your app.

---

## 4. Code examples

Each example is self-contained. Paste into a screen file (e.g. `app/camera-demo.tsx`). They use plain React Native — not the full lesson UI.

---

### Example A — Permissions gate (start here)

Always check permission **before** mounting `CameraView`. Show a button so the system dialog is triggered by user action.

```tsx
import { CameraView, useCameraPermissions } from 'expo-camera';
import { Button, Text, View } from 'react-native';

export default function CameraScreen() {
  const [permission, requestPermission] = useCameraPermissions();

  if (!permission) {
    return <Text>Loading permissions…</Text>;
  }

  if (!permission.granted) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', padding: 24 }}>
        <Text style={{ marginBottom: 16 }}>
          We need camera access to take photos.
        </Text>
        <Button title="Grant camera access" onPress={requestPermission} />
      </View>
    );
  }

  return <CameraView style={{ flex: 1 }} facing="back" />;
}
```

---

### Example B — Minimal preview + “camera ready”

Wait for `onCameraReady` before enabling capture. This is the smallest useful preview.

```tsx
import { CameraView, useCameraPermissions } from 'expo-camera';
import { useState } from 'react';
import { Text, View } from 'react-native';

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
        {ready ? 'Camera ready' : 'Starting camera…'}
      </Text>
    </View>
  );
}
```

---

### Example C — Take a photo

One button, one photo, show the result. No flash/zoom/mode switching.

```tsx
import { CameraView, useCameraPermissions } from 'expo-camera';
import { Image } from 'expo-image';
import { useRef, useState } from 'react';
import { Button, View } from 'react-native';

export default function PhotoScreen() {
  const cameraRef = useRef<CameraView>(null);
  const [permission] = useCameraPermissions();
  const [ready, setReady] = useState(false);
  const [photoUri, setPhotoUri] = useState<string | null>(null);

  if (!permission?.granted) {
    return null;
  }

  const takePhoto = async () => {
    const photo = await cameraRef.current?.takePictureAsync({ quality: 0.8 });
    if (photo?.uri) setPhotoUri(photo.uri);
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
      <Button title="Take photo" onPress={takePhoto} disabled={!ready} />
      {photoUri && (
        <Image source={{ uri: photoUri }} style={{ height: 200 }} contentFit="cover" />
      )}
    </View>
  );
}
```

---

### Example D — Record a short video

Needs microphone permission for audio. `recordAsync` resolves when you call `stopRecording`.

```tsx
import {
  CameraView,
  useCameraPermissions,
  useMicrophonePermissions,
} from 'expo-camera';
import { useRef, useState } from 'react';
import { Button, Text, View } from 'react-native';

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

  const startRecording = async () => {
    if (!micPermission?.granted) {
      const result = await requestMicPermission();
      if (!result.granted) return;
    }

    setRecording(true);
    const video = await cameraRef.current?.recordAsync({ maxDuration: 10 });
    setVideoUri(video?.uri ?? null);
    setRecording(false);
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
        title={recording ? 'Stop' : 'Record'}
        disabled={!ready}
        onPress={recording ? stopRecording : startRecording}
      />
      {videoUri && <Text selectable>{videoUri}</Text>}
    </View>
  );
}
```

---

### Example E — Scan a QR code (with dedupe)

Keeps scanning simple: one state update per unique `data` value.

```tsx
import {
  CameraView,
  type BarcodeScanningResult,
  useCameraPermissions,
} from 'expo-camera';
import { useRef, useState } from 'react';
import { Text, View } from 'react-native';

export default function ScanScreen() {
  const [permission] = useCameraPermissions();
  const lastScanned = useRef<string | null>(null);
  const [result, setResult] = useState<BarcodeScanningResult | null>(null);

  if (!permission?.granted) {
    return <Text>Camera permission required.</Text>;
  }

  const onBarcodeScanned = (scan: BarcodeScanningResult) => {
    if (lastScanned.current === scan.data) return;
    lastScanned.current = scan.data;
    setResult(scan);
  };

  return (
    <View style={{ flex: 1 }}>
      <CameraView
        style={{ flex: 1 }}
        facing="back"
        barcodeScannerSettings={{ barcodeTypes: ['qr'] }}
        onBarcodeScanned={onBarcodeScanned}
      />
      <Text style={{ padding: 16 }}>
        {result ? `${result.type}: ${result.data}` : 'Point at a QR code'}
      </Text>
    </View>
  );
}
```

---

### Example F — Flash and torch (two separate controls)

Flash affects **photos only**. Torch stays on during preview.

```tsx
import { CameraView, type FlashMode, useCameraPermissions } from 'expo-camera';
import { useState } from 'react';
import { Button, View } from 'react-native';

export default function FlashTorchScreen() {
  const [permission] = useCameraPermissions();
  const [flash, setFlash] = useState<FlashMode>('off');
  const [torch, setTorch] = useState(false);

  if (!permission?.granted) return null;

  const cycleFlash = () => {
    setFlash((f) => (f === 'off' ? 'on' : f === 'on' ? 'auto' : 'off'));
  };

  return (
    <View style={{ flex: 1 }}>
      <CameraView
        style={{ flex: 1 }}
        facing="back"
        flash={flash}
        enableTorch={torch}
      />
      <Button title={`Flash: ${flash}`} onPress={cycleFlash} />
      <Button title={`Torch: ${torch ? 'On' : 'Off'}`} onPress={() => setTorch((t) => !t)} />
    </View>
  );
}
```

---

### Example G — Flip camera + zoom

`mirror` makes the front preview feel like a selfie mirror.

```tsx
import { CameraView, type CameraType, useCameraPermissions } from 'expo-camera';
import { useState } from 'react';
import { Button, Text, View } from 'react-native';

export default function FlipZoomScreen() {
  const [permission] = useCameraPermissions();
  const [facing, setFacing] = useState<CameraType>('back');
  const [zoom, setZoom] = useState(0);

  if (!permission?.granted) return null;

  return (
    <View style={{ flex: 1 }}>
      <CameraView
        style={{ flex: 1 }}
        facing={facing}
        zoom={zoom}
        mirror={facing === 'front'}
      />
      <Button
        title="Flip"
        onPress={() => setFacing((f) => (f === 'back' ? 'front' : 'back'))}
      />
      <Button title="Zoom −" onPress={() => setZoom((z) => Math.max(0, z - 0.1))} />
      <Button title="Zoom +" onPress={() => setZoom((z) => Math.min(1, z + 0.1))} />
      <Text>Zoom: {(zoom * 100).toFixed(0)}%</Text>
    </View>
  );
}
```

---

### Example H — Unmount camera when screen loses focus

Releases the hardware when the user navigates away. Use with any of the examples above.

```tsx
import { CameraView, useCameraPermissions } from 'expo-camera';
import { useIsFocused } from '@react-navigation/native';
import { View } from 'react-native';

export default function FocusAwareCamera() {
  const isFocused = useIsFocused();
  const [permission] = useCameraPermissions();

  if (!permission?.granted) return null;

  return (
    <View style={{ flex: 1 }}>
      {isFocused && <CameraView style={{ flex: 1 }} facing="back" />}
    </View>
  );
}
```

---

### Example I — Save a capture to the gallery

Cache URIs from `takePictureAsync` / `recordAsync` are temporary. Copy to the photo library with `expo-media-library`.

```tsx
import { CameraView, useCameraPermissions } from 'expo-camera';
import { Image } from 'expo-image';
import * as MediaLibrary from 'expo-media-library';
import { useRef, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Button,
  Linking,
  Text,
  View,
} from 'react-native';

async function saveToGallery(uri: string) {
  // `true` = request write access (needed to save on iOS)
  const { granted, canAskAgain } = await MediaLibrary.requestPermissionsAsync(true);

  if (!granted) {
    if (!canAskAgain) {
      Alert.alert(
        'Photo library access denied',
        'Enable photo library access in Settings to save photos.',
        [
          { text: 'Cancel', style: 'cancel' },
          { text: 'Open Settings', onPress: () => Linking.openSettings() },
        ],
      );
    }
    throw new Error('Photo library permission denied');
  }

  const asset = await MediaLibrary.saveToLibraryAsync(uri);
  return asset;
}

export default function PhotoSaveScreen() {
  const cameraRef = useRef<CameraView>(null);
  const [cameraPermission, requestCameraPermission] = useCameraPermissions();

  const [ready, setReady] = useState(false);
  const [photoUri, setPhotoUri] = useState<string | null>(null);
  const [status, setStatus] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  // --- Camera permission loading ---
  if (!cameraPermission) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator />
        <Text>Checking camera permission…</Text>
      </View>
    );
  }

  // --- Camera permission not granted ---
  if (!cameraPermission.granted) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', padding: 24, gap: 12 }}>
        <Text style={{ fontSize: 18, fontWeight: '600' }}>Camera access</Text>
        <Text>We need camera access to take a photo.</Text>
        {!cameraPermission.canAskAgain ? (
          <Button title="Open Settings" onPress={() => Linking.openSettings()} />
        ) : (
          <Button title="Grant camera access" onPress={requestCameraPermission} />
        )}
      </View>
    );
  }

  const takePhoto = async () => {
    if (!cameraRef.current || !ready) {
      Alert.alert('Camera not ready', 'Wait for the preview before taking a photo.');
      return;
    }

    try {
      setStatus(null);
      const photo = await cameraRef.current.takePictureAsync({ quality: 0.85 });

      if (photo?.uri) {
        setPhotoUri(photo.uri);
        setStatus('Photo captured (stored in app cache).');
      }
    } catch (error) {
      Alert.alert(
        'Photo failed',
        error instanceof Error ? error.message : 'Unknown error',
      );
    }
  };

  const handleSaveToGallery = async () => {
    if (!photoUri) return;

    setSaving(true);
    setStatus('Saving to gallery…');

    try {
      await saveToGallery(photoUri);
      setStatus('Photo saved to your gallery.');
    } catch (error) {
      if (error instanceof Error && error.message !== 'Photo library permission denied') {
        Alert.alert('Save failed', error.message);
      }
      setStatus('Could not save to gallery.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      {/* Live preview — only while no photo is selected */}
      {!photoUri && (
        <CameraView
          ref={cameraRef}
          style={{ flex: 1 }}
          facing="back"
          mode="picture"
          onCameraReady={() => setReady(true)}
          onMountError={({ message }) => setStatus(message)}
        />
      )}

      {/* Captured photo preview */}
      {photoUri && (
        <Image
          source={{ uri: photoUri }}
          style={{ flex: 1 }}
          contentFit="cover"
        />
      )}

      {/* Controls */}
      <View style={{ padding: 16, gap: 8 }}>
        {!photoUri ? (
          <Button title="Take photo" onPress={takePhoto} disabled={!ready} />
        ) : (
          <>
            <Button
              title={saving ? 'Saving…' : 'Save to gallery'}
              onPress={handleSaveToGallery}
              disabled={saving}
            />
            <Button
              title="Retake"
              onPress={() => {
                setPhotoUri(null);
                setStatus(null);
                setReady(false);
              }}
            />
          </>
        )}

        {status && <Text>{status}</Text>}
      </View>
    </View>
  );
}
```

---

## 5. Main component — `CameraView`

| Prop | Type | Description |
| --- | --- | --- |
| `facing` | `'back' | 'front'` | Which camera to use |
| `mode` | `'picture' | 'video'` | Photo vs video mode |
| `flash` | `'off' | 'on' | 'auto'` | Flash for still captures |
| `enableTorch` | `boolean` | Keep LED on during preview |
| `zoom` | `number` (0–1) | Zoom level |
| `mirror` | `boolean` | Mirror front-camera preview |
| `barcodeScannerSettings` | object | Allowed barcode types |
| `onBarcodeScanned` | function | Called when a code is detected |
| `onCameraReady` | function | Camera is ready to capture |
| `onMountError` | function | Camera failed to mount |

**Imperative methods (via ref)**

| Method | Description |
| --- | --- |
| `takePictureAsync(options?)` | Capture a still photo |
| `recordAsync(options?)` | Start video recording |
| `stopRecording()` | Stop an in-progress recording |

---

## 6. Hooks

### `useCameraPermissions()`

```tsx
const [permission, requestPermission] = useCameraPermissions();
// permission: null | { granted, status, canAskAgain }
```

### `useMicrophonePermissions()`

```tsx
const [micPermission, requestMicPermission] = useMicrophonePermissions();
// Required before recordAsync() when recording video with audio
```

---

## 7. Configuration (`app.json`)

```json
{
  "expo": {
    "plugins": [
      [
        "expo-camera",
        {
          "cameraPermission": "Allow $(PRODUCT_NAME) to access your camera",
          "microphonePermission": "Allow $(PRODUCT_NAME) to access your microphone",
          "recordAudioAndroid": true,
          "barcodeScannerEnabled": true
        }
      ]
    ]
  }
}
```

Changing plugin options requires a **new native build**.

---

## 8. Platform behavior

| Platform | Notes |
| --- | --- |
| iOS | Full features on physical devices. Simulator has no real camera. |
| Android | Same on physical devices. Emulator camera support is limited. |
| Web | Uses `getUserMedia`. URIs may be **base64** instead of file paths. |

---

## 9. Best practices

1. Request permissions **before** rendering `CameraView`, with a clear explanation screen.
2. **Unmount** the preview when the screen loses focus (`useIsFocused()`).
3. Wait for **`onCameraReady`** before enabling the shutter button.
4. **Stop recording** before navigating away.
5. **Dedupe** barcode scan callbacks.
6. **Copy captures** to permanent storage if users need files long-term.
7. Use **`expo-image-picker`** when the user picks existing media — not `expo-camera`.

---

## 10. Typical flow

```
1. useCameraPermissions() → check / request access
2. Render <CameraView ref={ref} facing="back" />
3. Wait for onCameraReady
4. takePictureAsync() or recordAsync()
5. Use returned uri (display, upload, or save to library)
6. Unmount CameraView when leaving screen
```

---

## 11. Related packages

| Package | Purpose |
| --- | --- |
| `expo-media-library` | Save photos/videos to the device gallery |
| `expo-file-system` | Read, move, or upload capture files |
| `expo-image-picker` | Pick existing photos/videos without live preview |
| `expo-haptics` | Tactile feedback on shutter or successful scan |

# expo-audio — Reference Notes

**Package:** `expo-audio`

**Expo SDK:** 55

**Docs:** https://docs.expo.dev/versions/v55.0.0/sdk/audio/

**Replaces:** `expo-av` (legacy — do not use for new projects)

---

## 1. Definition

**expo-audio** is an Expo SDK library for **audio playback** and **microphone recording** on iOS, Android, and web. It exposes a hook-based API:

- **`useAudioPlayer()`** — play local files, bundled assets, or remote URLs
- **`useAudioRecorder()`** — record from the device microphone

It uses the device’s native audio session (iOS) / audio focus (Android) so playback and recording behave correctly with silent mode, Bluetooth, and other apps.

---

## 2. When to use it

| Use `expo-audio` | Use something else |
| --- | --- |
| Play MP3, WAV, remote streams | Video playback → `expo-video` |
| Record voice / microphone input | Pick existing audio file → `expo-document-picker` |
| Simple play / pause / seek UI | Full music player with playlists → dedicated media library |

---

## 3. Core concepts

### Audio player

A native-backed object that loads an audio source and plays it. Created with `useAudioPlayer(source)`. One player can switch sources with `replace()`.

### Audio recorder

Captures microphone input to a file. Created with `useAudioRecorder(preset)`. Output is a local file URI on `recorder.uri` after `stop()`.

### Audio session (`setAudioModeAsync`)

Global settings that affect **how** audio behaves — silent mode, recording, background playback, etc. Configure when your audio screen mounts (after permission is granted).

### Recording preset

Bundled configuration (sample rate, bit rate, format) such as `RecordingPresets.HIGH_QUALITY` or `RecordingPresets.LOW_QUALITY`.

### Source types

A player accepts:

- Remote URL (`https://…`)
- Local file URI (`file://…`)
- Bundled asset (`require('./sound.mp3')`)

---

## 4. Where recordings are stored

When you call `recorder.stop()`, the file URI is on **`recorder.uri`**.

| Location | Description |
| --- | --- |
| **App sandbox (cache/documents)** | Default — private to your app |
| **Device gallery / Music app** | **Not automatic** — save explicitly |

```
file:///data/user/0/.../cache/.../recording.m4a   (Android)
file:///var/mobile/.../Library/Caches/...       (iOS)
```

- Recordings are **not** visible in Photos/Gallery by default.
- Cache files can be deleted by the OS.
- Copy with `expo-file-system`, upload to your server, or save with `expo-media-library`.

---

## 5. Code examples

Each example is a **complete screen file**. Plain React Native — not the full lesson UI.

---

### Example A — Minimal playback (remote URL)

```tsx
import { useAudioPlayer } from 'expo-audio';
import { Button, View } from 'react-native';

const SAMPLE_URL =
  '<https://interactive-examples.mdn.mozilla.net/media/cc0-audio/t-rex-roar.mp3>';

export default function PlayScreen() {
  const player = useAudioPlayer(SAMPLE_URL);

  return (
    <View style={{ flex: 1, justifyContent: 'center', gap: 8, padding: 24 }}>
      <Button title="Play" onPress={() => player.play()} />
      <Button title="Pause" onPress={() => player.pause()} />
      <Button
        title="Replay"
        onPress={() => {
          player.seekTo(0);
          player.play();
        }}
      />
    </View>
  );
}
```

---

### Example B — Playback with status (progress text)

Uses `useAudioPlayerStatus` — no manual `setInterval` polling.

```tsx
import { useAudioPlayer, useAudioPlayerStatus } from 'expo-audio';
import { Button, Text, View } from 'react-native';

const SAMPLE_URL =
  '<https://interactive-examples.mdn.mozilla.net/media/cc0-audio/t-rex-roar.mp3>';

function formatTime(seconds: number) {
  if (!Number.isFinite(seconds) || seconds < 0) return '0:00';
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s.toString().padStart(2, '0')}`;
}

export default function PlaybackStatusScreen() {
  const player = useAudioPlayer(SAMPLE_URL, { downloadFirst: true });
  const status = useAudioPlayerStatus(player);

  const toggle = () => {
    if (status.playing) {
      player.pause();
    } else {
      player.play();
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', gap: 12, padding: 24 }}>
      <Text>
        {status.playing ? 'Playing' : 'Paused'} ·{' '}
        {formatTime(status.currentTime)} / {formatTime(status.duration)}
      </Text>

      <Button title={status.playing ? 'Pause' : 'Play'} onPress={toggle} />

      {status.didJustFinish && <Text>Track finished.</Text>}
    </View>
  );
}
```

---

### Example C — Play a bundled local file

```tsx
import { useAudioPlayer } from 'expo-audio';
import { Button, View } from 'react-native';

// Put an mp3 in your project, e.g. assets/sounds/click.mp3
const localSound = require('../../../assets/sounds/click.mp3');

export default function LocalSoundScreen() {
  const player = useAudioPlayer(localSound);

  return (
    <View style={{ flex: 1, justifyContent: 'center', padding: 24 }}>
      <Button title="Play sound" onPress={() => player.play()} />
    </View>
  );
}
```

---

### Example D — Configure audio session (`setAudioModeAsync`)

Call after mic permission is granted. Fixes common iOS issues: silent switch, recording not starting.

```tsx
import { setAudioModeAsync } from 'expo-audio';
import { useEffect, useState } from 'react';
import { ActivityIndicator, Text, View } from 'react-native';

export default function AudioSessionScreen() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    (async () => {
      await setAudioModeAsync({
        playsInSilentMode: true, // hear audio when iPhone mute switch is on
        allowsRecording: true,   // allow microphone / recorder
      });
      setReady(true);
    })();
  }, []);

  if (!ready) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator />
        <Text>Configuring audio session…</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, justifyContent: 'center', padding: 24 }}>
      <Text>Audio session ready. Mount your player or recorder here.</Text>
    </View>
  );
}
```

---

### Example E — Minimal recording (start / stop)

```tsx
import {
  AudioModule,
  RecordingPresets,
  setAudioModeAsync,
  useAudioRecorder,
  useAudioRecorderState,
} from 'expo-audio';
import { useEffect } from 'react';
import { Alert, Button, Text, View } from 'react-native';

export default function RecordScreen() {
  const recorder = useAudioRecorder(RecordingPresets.HIGH_QUALITY);
  const state = useAudioRecorderState(recorder);

  useEffect(() => {
    (async () => {
      const permission = await AudioModule.requestRecordingPermissionsAsync();
      if (!permission.granted) {
        Alert.alert('Microphone required', 'Grant mic access to record audio.');
        return;
      }
      await setAudioModeAsync({
        playsInSilentMode: true,
        allowsRecording: true,
      });
    })();
  }, []);

  const start = async () => {
    await recorder.prepareToRecordAsync();
    recorder.record();
  };

  const stop = async () => {
    await recorder.stop();
    Alert.alert('Saved', recorder.uri ?? 'No URI');
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', gap: 12, padding: 24 }}>
      <Text>
        {state.isRecording ? 'Recording…' : 'Ready'} ·{' '}
        {Math.round(state.durationMillis / 1000)}s
      </Text>

      <Button
        title={state.isRecording ? 'Stop' : 'Start recording'}
        onPress={state.isRecording ? stop : start}
      />

      {recorder.uri && (
        <Text selectable numberOfLines={2}>
          {recorder.uri}
        </Text>
      )}
    </View>
  );
}
```

---

### Example F — Record, then play back with `replace()`

One player handles both the sample clip and your recording.

```tsx
import {
  AudioModule,
  RecordingPresets,
  setAudioModeAsync,
  useAudioPlayer,
  useAudioPlayerStatus,
  useAudioRecorder,
  useAudioRecorderState,
} from 'expo-audio';
import { useEffect, useState } from 'react';
import { Alert, Button, Text, View } from 'react-native';

const SAMPLE_URL =
  '<https://interactive-examples.mdn.mozilla.net/media/cc0-audio/t-rex-roar.mp3>';

export default function RecordAndPlayScreen() {
  const [recordingUri, setRecordingUri] = useState<string | null>(null);

  const player = useAudioPlayer(SAMPLE_URL, { downloadFirst: true });
  const playerStatus = useAudioPlayerStatus(player);

  const recorder = useAudioRecorder(RecordingPresets.HIGH_QUALITY);
  const recorderState = useAudioRecorderState(recorder);

  useEffect(() => {
    (async () => {
      const permission = await AudioModule.requestRecordingPermissionsAsync();
      if (permission.granted) {
        await setAudioModeAsync({
          playsInSilentMode: true,
          allowsRecording: true,
        });
      }
    })();
  }, []);

  const ensureMic = async () => {
    const permission = await AudioModule.requestRecordingPermissionsAsync();
    if (!permission.granted) {
      Alert.alert('Microphone required', 'Grant mic access to record.');
      return false;
    }
    return true;
  };

  const startRecording = async () => {
    if (!(await ensureMic())) return;
    await recorder.prepareToRecordAsync();
    recorder.record();
  };

  const stopRecording = async () => {
    await recorder.stop();
    if (recorder.uri) {
      setRecordingUri(recorder.uri);
    }
  };

  const playSample = () => {
    player.replace(SAMPLE_URL);
    player.seekTo(0);
    player.play();
  };

  const playRecording = () => {
    if (!recordingUri) {
      Alert.alert('No recording', 'Record something first.');
      return;
    }
    player.replace(recordingUri);
    player.play();
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', gap: 10, padding: 24 }}>
      <Text>
        Player: {playerStatus.playing ? 'Playing' : 'Paused'}
      </Text>

      <Button
        title={playerStatus.playing ? 'Pause' : 'Resume'}
        onPress={() => (playerStatus.playing ? player.pause() : player.play())}
      />
      <Button title="Play sample" onPress={playSample} />
      <Button title="Play my recording" onPress={playRecording} disabled={!recordingUri} />

      <Text>
        Recorder: {recorderState.isRecording ? 'Recording…' : 'Idle'} ·{' '}
        {Math.round(recorderState.durationMillis / 1000)}s
      </Text>

      <Button
        title={recorderState.isRecording ? 'Stop recording' : 'Start recording'}
        onPress={recorderState.isRecording ? stopRecording : startRecording}
      />

      {recordingUri && (
        <Text selectable numberOfLines={2}>
          {recordingUri}
        </Text>
      )}
    </View>
  );
}
```

---

### Example G — Save recording to media library (full)

```tsx
import {
  AudioModule,
  RecordingPresets,
  setAudioModeAsync,
  useAudioRecorder,
  useAudioRecorderState,
} from 'expo-audio';
import * as MediaLibrary from 'expo-media-library';
import { useEffect, useState } from 'react';
import {
  Alert,
  Button,
  Linking,
  Text,
  View,
} from 'react-native';

async function saveRecordingToGallery(uri: string) {
  const { granted, canAskAgain } = await MediaLibrary.requestPermissionsAsync(true);

  if (!granted) {
    if (!canAskAgain) {
      Alert.alert(
        'Photo library access denied',
        'Enable library access in Settings to save recordings.',
        [
          { text: 'Cancel', style: 'cancel' },
          { text: 'Open Settings', onPress: () => Linking.openSettings() },
        ],
      );
    }
    throw new Error('Media library permission denied');
  }

  await MediaLibrary.saveToLibraryAsync(uri);
}

export default function SaveRecordingScreen() {
  const [saved, setSaved] = useState(false);

  const recorder = useAudioRecorder(RecordingPresets.HIGH_QUALITY);
  const state = useAudioRecorderState(recorder);

  useEffect(() => {
    (async () => {
      const permission = await AudioModule.requestRecordingPermissionsAsync();
      if (permission.granted) {
        await setAudioModeAsync({
          playsInSilentMode: true,
          allowsRecording: true,
        });
      }
    })();
  }, []);

  const start = async () => {
    const permission = await AudioModule.requestRecordingPermissionsAsync();
    if (!permission.granted) {
      Alert.alert('Microphone required', 'Grant mic access first.');
      return;
    }
    setSaved(false);
    await recorder.prepareToRecordAsync();
    recorder.record();
  };

  const stop = async () => {
    await recorder.stop();
  };

  const save = async () => {
    if (!recorder.uri) {
      Alert.alert('Nothing to save', 'Record audio first.');
      return;
    }

    try {
      await saveRecordingToGallery(recorder.uri);
      setSaved(true);
    } catch (error) {
      if (error instanceof Error && error.message !== 'Media library permission denied') {
        Alert.alert('Save failed', error.message);
      }
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', gap: 12, padding: 24 }}>
      <Text>
        {state.isRecording ? 'Recording…' : 'Ready'} ·{' '}
        {Math.round(state.durationMillis / 1000)}s
      </Text>

      <Button
        title={state.isRecording ? 'Stop' : 'Record'}
        onPress={state.isRecording ? stop : start}
      />

      <Button title="Save to library" onPress={save} disabled={!recorder.uri} />

      {recorder.uri && (
        <Text selectable numberOfLines={2}>
          {recorder.uri}
        </Text>
      )}

      {saved && <Text>Saved to device library.</Text>}
    </View>
  );
}
```

---

## 6. Permission handling — iOS

On iOS, microphone access works in **two layers**:

| Layer | What it does | Where you set it |
| --- | --- | --- |
| **Native (build time)** | Tells iOS *why* your app needs the mic | `app.json` → `expo-audio` config plugin |
| **Runtime (in app)** | Shows the system dialog and reads grant/deny | `AudioModule.requestRecordingPermissionsAsync()` |

Missing `NSMicrophoneUsageDescription` → app **crashes** when you request mic access.

**Playback alone does not need microphone permission.** Only recording does.

---

### iOS Info.plist key (via config plugin)

| Plugin option | Info.plist key |
| --- | --- |
| `microphonePermission` | `NSMicrophoneUsageDescription` |

```json
[
  "expo-audio",
  {
    "microphonePermission": "Allow $(PRODUCT_NAME) to access your microphone for audio recording."
  }
]
```

Rebuild native app after changing this string.

Manual native setup (no CNG):

```xml
<key>NSMicrophoneUsageDescription</key>
<string>Allow MyApp to access your microphone for audio recording.</string>
```

---

### iOS runtime permission states

`requestRecordingPermissionsAsync()` returns:

| Field | Meaning on iOS |
| --- | --- |
| `granted` | `true` — safe to record |
| `status` | `'undetermined'` · `'granted'` · `'denied'` |
| `canAskAgain` | `false` after user taps **Don’t Allow** |

iOS shows the dialog **once**. After denial → send user to **Settings**.

---

### Example H — iOS-friendly mic permission gate

Request mic **when user taps Record**, not on app launch.

```tsx
import {
  AudioModule,
  RecordingPresets,
  setAudioModeAsync,
  useAudioRecorder,
  useAudioRecorderState,
} from 'expo-audio';
import { useState } from 'react';
import { Alert, Button, Linking, Text, View } from 'react-native';

export default function IOSMicPermissionScreen() {
  const [micGranted, setMicGranted] = useState<boolean | null>(null);
  const [canAskAgain, setCanAskAgain] = useState(true);

  const recorder = useAudioRecorder(RecordingPresets.HIGH_QUALITY);
  const state = useAudioRecorderState(recorder);

  const requestMic = async () => {
    const result = await AudioModule.requestRecordingPermissionsAsync();
    setMicGranted(result.granted);
    setCanAskAgain(result.canAskAgain);

    if (result.granted) {
      await setAudioModeAsync({
        playsInSilentMode: true,
        allowsRecording: true,
      });
      return true;
    }

    if (!result.canAskAgain) {
      Alert.alert(
        'Microphone denied',
        'Enable microphone access in Settings to record audio.',
        [
          { text: 'Cancel', style: 'cancel' },
          { text: 'Open Settings', onPress: () => Linking.openSettings() },
        ],
      );
    }

    return false;
  };

  const startRecording = async () => {
    const granted = micGranted ?? (await requestMic());
    if (!granted) return;

    await recorder.prepareToRecordAsync();
    recorder.record();
  };

  const stopRecording = async () => {
    await recorder.stop();
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', gap: 12, padding: 24 }}>
      {micGranted === false && canAskAgain && (
        <Text>Microphone access is required for recording.</Text>
      )}

      {micGranted === false && !canAskAgain && (
        <>
          <Text>Microphone was denied. Open Settings to enable it.</Text>
          <Button title="Open Settings" onPress={() => Linking.openSettings()} />
        </>
      )}

      <Text>
        {state.isRecording ? 'Recording…' : 'Ready'} ·{' '}
        {Math.round(state.durationMillis / 1000)}s
      </Text>

      <Button
        title={state.isRecording ? 'Stop' : 'Start recording'}
        onPress={state.isRecording ? stopRecording : startRecording}
      />

      {recorder.uri && (
        <Text selectable numberOfLines={2}>
          {recorder.uri}
        </Text>
      )}
    </View>
  );
}
```

---

### Example I — Check mic status without prompting

```tsx
import { AudioModule } from 'expo-audio';
import { useEffect, useState } from 'react';
import { Text, View } from 'react-native';

export default function MicStatusScreen() {
  const [status, setStatus] = useState<string>('checking…');

  useEffect(() => {
    AudioModule.getRecordingPermissionsAsync().then((result) => {
      setStatus(`${result.status} (granted: ${result.granted})`);
    });
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: 'center', padding: 24 }}>
      <Text>Microphone permission: {status}</Text>
    </View>
  );
}
```

---

### iOS permission checklist

1. Add `microphonePermission` in `app.json` under the `expo-audio` plugin.
2. Rebuild native app after changing the string.
3. Show an **in-app explanation** before requesting mic access.
4. Request mic **on user action** (tap Record), not at app launch.
5. Call **`setAudioModeAsync`** after permission is granted.
6. If `!canAskAgain`, offer **Open Settings** via `Linking.openSettings()`.
7. Test on a **physical device** — Simulator mic behavior is limited.

---

### iOS vs Android (quick reference)

| Topic | iOS | Android |
| --- | --- | --- |
| Why string in plist/manifest | `NSMicrophoneUsageDescription` | `RECORD_AUDIO` via plugin |
| Silent switch | Use `playsInSilentMode: true` | Ringer mode respected |
| Denied permanently | `canAskAgain: false` → Settings | Same pattern |
| Playback permission | Not required | Not required |
| Recording permission | Required, separate dialog | Required |

---

## 7. Hooks

### `useAudioPlayer(source, options?)`

```tsx
const player = useAudioPlayer('<https://example.com/audio.mp3>', {
  downloadFirst: true, // buffer remote file before play
});
```

| Method | Description |
| --- | --- |
| `play()` | Start or resume |
| `pause()` | Pause |
| `seekTo(seconds)` | Jump to position |
| `replace(newSource)` | Switch source |

### `useAudioPlayerStatus(player)`

| Field | Description |
| --- | --- |
| `playing` | Currently playing |
| `currentTime` | Position in seconds |
| `duration` | Total length in seconds |
| `didJustFinish` | Track just ended |

### `useAudioRecorder(preset)`

```
prepareToRecordAsync() → record() → stop() → recorder.uri
```

### `useAudioRecorderState(recorder)`

| Field | Description |
| --- | --- |
| `isRecording` | Mic actively recording |
| `durationMillis` | Elapsed time in ms |

---

## 8. Module APIs

### `AudioModule.requestRecordingPermissionsAsync()`

```tsx
const { granted, status, canAskAgain } =
  await AudioModule.requestRecordingPermissionsAsync();
```

### `setAudioModeAsync(options)`

```tsx
await setAudioModeAsync({
  playsInSilentMode: true,
  allowsRecording: true,
});
```

| Option | Purpose |
| --- | --- |
| `playsInSilentMode` | Play when iOS silent switch is on |
| `allowsRecording` | Enable mic / recording session |
| `shouldPlayInBackground` | Continue playback in background |
| `interruptionMode` | `'mixWithOthers'` · `'duckOthers'` · `'doNotMix'` |

### `RecordingPresets`

| Preset | Use case |
| --- | --- |
| `HIGH_QUALITY` | Voice memos, music — larger files |
| `LOW_QUALITY` | Smaller files, lower fidelity |

---

## 9. Configuration (`app.json`)

```json
[
  "expo-audio",
  {
    "microphonePermission": "Allow $(PRODUCT_NAME) to access your microphone for audio recording.",
    "recordAudioAndroid": true,
    "enableBackgroundPlayback": false,
    "enableBackgroundRecording": false
  }
]
```

| Option | Platform | Description |
| --- | --- | --- |
| `microphonePermission` | iOS | `NSMicrophoneUsageDescription` |
| `recordAudioAndroid` | Android | Adds `RECORD_AUDIO` (default `true`) |
| `enableBackgroundPlayback` | Both | Lock screen / background playback |
| `enableBackgroundRecording` | Both | Record in background (battery impact) |

Changing plugin options requires a **new native build**.

---

## 10. Platform behavior

### iOS

- Respects silent switch unless `playsInSilentMode: true`
- Microphone dialog on first record request
- Bluetooth / headphone disconnect may stop audio

### Android

- Needs `RECORD_AUDIO` in manifest
- Other apps can take audio focus
- Emulator mic works; real device is better

### Web

- Uses Web Audio / MediaRecorder APIs
- Permissions and formats vary by browser
- HTTPS required for microphone on web

---

## 11. Best practices

1. Request **microphone permission** when the user starts recording — not on app launch.
2. Call **`setAudioModeAsync`** after permission is granted.
3. Use **`useAudioPlayerStatus`** for progress UI — avoid manual intervals.
4. Always run **`prepareToRecordAsync()`** before `record()`.
5. Read **`recorder.uri` only after `stop()`** completes.
6. Use **`replace()`** to switch sources on one player.
7. Use **`downloadFirst: true`** for remote URLs on slow networks.
8. Copy or upload recordings if you need them **after cache cleanup**.
9. Do not use **`expo-av`** — use **`expo-audio`** for SDK 55+.

---

## 12. Typical flows

### Playback

```
1. useAudioPlayer(source)
2. useAudioPlayerStatus(player) for UI
3. player.play() / player.pause()
4. player.replace(newUri) to switch tracks
```

### Recording

```
1. requestRecordingPermissionsAsync()
2. setAudioModeAsync({ playsInSilentMode, allowsRecording })
3. useAudioRecorder(preset)
4. prepareToRecordAsync() → record() → stop()
5. recorder.uri → play with player.replace(uri)
```

---

## 13. Related packages

| Package | Purpose |
| --- | --- |
| `expo-video` | Video playback (with audio track) |
| `expo-file-system` | Copy/upload recording files |
| `expo-media-library` | Save audio to device library |
| `expo-haptics` | Feedback on record start/stop |
| `expo-camera` | Video recording (mic via camera, not expo-audio recorder) |

---

## 14. How this differs from `AudioLesson`

| Notes examples | `AudioLesson` in the app |
| --- | --- |
| One concept per file (~40–80 lines) | One screen combining all features |
| Plain `Button` / `Text` / `View` | Themed UI, scroll layout, cards |
| No haptics, no preset toggle UI | High/low preset picker, haptics, progress bar |
| Copy-paste teaching snippets | Interactive reference implementation |

---

Paste this into Notion as your **#2 expo-audio** doc. If you want **expo-media-library** next in the same format, say the word.

# expo-media-library — Reference Notes

**Package:** `expo-media-library`

**Expo SDK:** 55

**Docs:** https://docs.expo.dev/versions/v55.0.0/sdk/media-library/

---

## 1. Definition

**expo-media-library** gives your app access to the device’s **Photos / Gallery** — existing photos, videos, and (optionally) audio. It lets you:

- **Read** — browse albums, list assets, inspect metadata, get real file paths
- **Write** — save new photos/videos/audio into the gallery
- **Manage access** — handle iOS/Android limited library permissions

It does **not** capture new media. Use `expo-camera`, `expo-audio`, or `expo-image-picker` to create files, then use media library to **persist** or **browse** them.

---

## 2. When to use it

| Use `expo-media-library` | Use something else |
| --- | --- |
| Browse user’s gallery | Take a new photo → `expo-camera` |
| Save camera capture to gallery | Pick one file from system picker → `expo-document-picker` |
| Read photo/video metadata (EXIF) | Record audio only → `expo-audio` (save to library optionally) |
| Paginate through thousands of assets | Simple one-time pick → `expo-image-picker` |
| Access arbitrary app/documents folder | `expo-file-system` |

---

## 3. Core concepts

### Gallery vs file on disk

Two different URIs matter:

| URI | What it is | Use for |
| --- | --- | --- |
| **`asset.uri`** | Library identifier (`ph://…` on iOS) | Thumbnails, previews in your app |
| **`localUri`** (from `getAssetInfoAsync`) | Actual file on disk (`file://…`) | Upload, share, process with other APIs |

`asset.uri` is **not** always a real file path you can read. Call `getAssetInfoAsync` when you need the file.

### Read vs write access

| Operation | API examples | Permission |
| --- | --- | --- |
| **Read** | `getAssetsAsync`, `getAlbumsAsync`, `getAssetInfoAsync` | Read / library access |
| **Write** | `saveToLibraryAsync`, `createAssetAsync` | Write / add to library |

You can request **write-only** access to save without full read (`requestPermissionsAsync(true)`).

### Full vs limited access (iOS 14+, Android 14+)

| `accessPrivileges` | Meaning |
| --- | --- |
| `'all'` | Full library |
| `'limited'` | Only photos user selected |
| `'none'` | Denied or no access |

### Where saved files go

```
App cache file (camera / bundled asset / export)
        ↓
saveToLibraryAsync(localUri)  or  createAssetAsync(localUri)
        ↓
New entry in Photos / Gallery app
```

- Saving creates a **new gallery entry** — does not delete the cache file
- Deleting your app does **not** remove saved gallery items

---

## 4. Code examples

Each example is a **complete screen file**. Plain React Native — not the full lesson UI.

---

### Example A — Permission gate (read gallery)

```tsx
import * as MediaLibrary from 'expo-media-library';
import { ActivityIndicator, Button, Linking, Text, View } from 'react-native';

export default function GalleryPermissionScreen() {
  const [permission, requestPermission] = MediaLibrary.usePermissions();

  if (!permission) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator />
        <Text>Checking media library permission…</Text>
      </View>
    );
  }

  if (!permission.granted) {
    const deniedPermanently = !permission.canAskAgain;

    return (
      <View style={{ flex: 1, justifyContent: 'center', padding: 24, gap: 12 }}>
        <Text style={{ fontSize: 18, fontWeight: '600' }}>Photo library access</Text>
        <Text>
          We need access to show your photos and videos inside the app.
        </Text>

        {deniedPermanently ? (
          <>
            <Text>Access was denied. Enable it in Settings.</Text>
            <Button title="Open Settings" onPress={() => Linking.openSettings()} />
          </>
        ) : (
          <Button title="Grant access" onPress={requestPermission} />
        )}
      </View>
    );
  }

  return (
    <View style={{ flex: 1, justifyContent: 'center', padding: 24 }}>
      <Text>Access level: {permission.accessPrivileges ?? 'unknown'}</Text>
      <Text>Permission granted — mount your gallery grid here.</Text>
    </View>
  );
}
```

---

### Example B — Browse gallery (photo grid)

Loads the 20 most recent photos and shows thumbnails.

```tsx
import { Image } from 'expo-image';
import * as MediaLibrary from 'expo-media-library';
import { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  Text,
  View,
} from 'react-native';

export default function GalleryGridScreen() {
  const [permission, requestPermission] = MediaLibrary.usePermissions();
  const [assets, setAssets] = useState<MediaLibrary.Asset[]>([]);
  const [loading, setLoading] = useState(false);

  const loadGallery = async () => {
    if (!permission?.granted) {
      const result = await requestPermission();
      if (!result.granted) return;
    }

    setLoading(true);
    try {
      const page = await MediaLibrary.getAssetsAsync({
        first: 20,
        mediaType: MediaLibrary.MediaType.photo,
        sortBy: [[MediaLibrary.SortBy.creationTime, false]], // newest first
      });
      setAssets(page.assets);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (permission?.granted) {
      loadGallery();
    }
  }, [permission?.granted]);

  if (!permission) {
    return <ActivityIndicator style={{ flex: 1 }} />;
  }

  if (!permission.granted) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', padding: 24 }}>
        <Text>Grant photo library access to browse your gallery.</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, padding: 12 }}>
      <Text style={{ marginBottom: 8 }}>
        {assets.length} photos · access: {permission.accessPrivileges}
      </Text>

      {loading ? (
        <ActivityIndicator />
      ) : (
        <FlatList
          data={assets}
          keyExtractor={(item) => item.id}
          numColumns={3}
          columnWrapperStyle={{ gap: 4 }}
          contentContainerStyle={{ gap: 4 }}
          renderItem={({ item }) => (
            <Image
              source={{ uri: item.uri }}
              style={{ flex: 1, aspectRatio: 1, borderRadius: 4 }}
              contentFit="cover"
            />
          )}
        />
      )}
    </View>
  );
}
```

---

### Example C — Browse albums, then filter assets

```tsx
import { Image } from 'expo-image';
import * as MediaLibrary from 'expo-media-library';
import { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Button,
  FlatList,
  Pressable,
  Text,
  View,
} from 'react-native';

export default function AlbumBrowserScreen() {
  const [permission] = MediaLibrary.usePermissions();
  const [albums, setAlbums] = useState<MediaLibrary.Album[]>([]);
  const [selectedAlbum, setSelectedAlbum] = useState<MediaLibrary.Album | null>(null);
  const [assets, setAssets] = useState<MediaLibrary.Asset[]>([]);
  const [loading, setLoading] = useState(false);

  const loadAlbums = async () => {
    const list = await MediaLibrary.getAlbumsAsync({ includeSmartAlbums: true });
    setAlbums(list);
  };

  const loadAssets = async (album: MediaLibrary.Album | null) => {
    setLoading(true);
    try {
      const page = await MediaLibrary.getAssetsAsync({
        first: 12,
        album: album ?? undefined,
        mediaType: MediaLibrary.MediaType.all,
        sortBy: [[MediaLibrary.SortBy.creationTime, false]],
      });
      setAssets(page.assets);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (permission?.granted) {
      loadAlbums();
      loadAssets(null); // "Recent" — no album filter
    }
  }, [permission?.granted]);

  const selectAlbum = (album: MediaLibrary.Album | null) => {
    setSelectedAlbum(album);
    loadAssets(album);
  };

  if (!permission?.granted) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', padding: 24 }}>
        <Text>Grant media library access first.</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, padding: 12, gap: 8 }}>
      <Text style={{ fontWeight: '600' }}>Albums</Text>

      <FlatList
        horizontal
        data={[{ id: 'recent', title: 'Recent' } as MediaLibrary.Album, ...albums]}
        keyExtractor={(item) => item.id}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ gap: 8 }}
        renderItem={({ item }) => {
          const isRecent = item.id === 'recent';
          const selected = isRecent
            ? selectedAlbum === null
            : selectedAlbum?.id === item.id;

          return (
            <Pressable
              onPress={() => selectAlbum(isRecent ? null : item)}
              style={{
                paddingHorizontal: 12,
                paddingVertical: 8,
                borderRadius: 16,
                backgroundColor: selected ? '#208AEF' : '#eee',
              }}>
              <Text style={{ color: selected ? '#fff' : '#000' }}>
                {item.title}
              </Text>
            </Pressable>
          );
        }}
      />

      {loading ? (
        <ActivityIndicator />
      ) : (
        <FlatList
          data={assets}
          keyExtractor={(item) => item.id}
          numColumns={3}
          columnWrapperStyle={{ gap: 4 }}
          contentContainerStyle={{ gap: 4 }}
          renderItem={({ item }) => (
            <Image
              source={{ uri: item.uri }}
              style={{ flex: 1, aspectRatio: 1 }}
              contentFit="cover"
            />
          )}
        />
      )}
    </View>
  );
}
```

---

### Example D — Access the actual file (`localUri`)

`asset.uri` shows thumbnails. `getAssetInfoAsync` gives the real file path for upload/processing.

```tsx
import * as MediaLibrary from 'expo-media-library';
import { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Button,
  Image,
  Pressable,
  Text,
  View,
} from 'react-native';

export default function AssetFileAccessScreen() {
  const [permission] = MediaLibrary.usePermissions();
  const [assets, setAssets] = useState<MediaLibrary.Asset[]>([]);
  const [selected, setSelected] = useState<MediaLibrary.AssetInfo | null>(null);
  const [loadingInfo, setLoadingInfo] = useState(false);

  useEffect(() => {
    if (!permission?.granted) return;

    MediaLibrary.getAssetsAsync({
      first: 9,
      mediaType: MediaLibrary.MediaType.photo,
      sortBy: [[MediaLibrary.SortBy.creationTime, false]],
    }).then((page) => setAssets(page.assets));
  }, [permission?.granted]);

  const openAsset = async (asset: MediaLibrary.Asset) => {
    setLoadingInfo(true);
    try {
      const info = await MediaLibrary.getAssetInfoAsync(asset, {
        shouldDownloadFromNetwork: true, // download iCloud photos on iOS
      });
      setSelected(info);
    } catch (error) {
      Alert.alert(
        'Could not read file',
        error instanceof Error ? error.message : 'Unknown error',
      );
    } finally {
      setLoadingInfo(false);
    }
  };

  const useFile = () => {
    if (!selected?.localUri) {
      Alert.alert('No local file', 'localUri is not available yet. Try again or check iCloud download.');
      return;
    }

    // Example: upload, share, or read with expo-file-system
    Alert.alert('File ready', selected.localUri);
  };

  if (!permission?.granted) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', padding: 24 }}>
        <Text>Grant media library access first.</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, padding: 12, gap: 12 }}>
      <Text style={{ fontWeight: '600' }}>Tap a photo to get its file path</Text>

      <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 4 }}>
        {assets.map((asset) => (
          <Pressable key={asset.id} onPress={() => openAsset(asset)} style={{ width: '32%' }}>
            <Image source={{ uri: asset.uri }} style={{ aspectRatio: 1 }} />
          </Pressable>
        ))}
      </View>

      {loadingInfo && <ActivityIndicator />}

      {selected && (
        <View style={{ gap: 8 }}>
          <Text>Filename: {selected.filename}</Text>
          <Text>Size: {selected.width}×{selected.height}</Text>
          <Text selectable numberOfLines={3}>
            Preview URI: {selected.uri}
          </Text>
          <Text selectable numberOfLines={3}>
            File URI: {selected.localUri ?? 'Not downloaded yet'}
          </Text>
          <Button title="Use file (upload / share)" onPress={useFile} />
        </View>
      )}
    </View>
  );
}
```

---

### Example E — Paginated gallery (load more)

```tsx
import { Image } from 'expo-image';
import * as MediaLibrary from 'expo-media-library';
import { useCallback, useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Button,
  FlatList,
  Text,
  View,
} from 'react-native';

export default function PaginatedGalleryScreen() {
  const [permission] = MediaLibrary.usePermissions();
  const [assets, setAssets] = useState<MediaLibrary.Asset[]>([]);
  const [endCursor, setEndCursor] = useState<string | undefined>();
  const [hasNextPage, setHasNextPage] = useState(false);
  const [loading, setLoading] = useState(false);

  const loadPage = useCallback(
    async (append = false) => {
      setLoading(true);
      try {
        const page = await MediaLibrary.getAssetsAsync({
          first: 12,
          after: append ? endCursor : undefined,
          mediaType: MediaLibrary.MediaType.all,
          sortBy: [[MediaLibrary.SortBy.creationTime, false]],
        });

        setAssets((current) => (append ? [...current, ...page.assets] : page.assets));
        setEndCursor(page.endCursor);
        setHasNextPage(page.hasNextPage);
      } finally {
        setLoading(false);
      }
    },
    [endCursor],
  );

  useEffect(() => {
    if (permission?.granted) {
      loadPage(false);
    }
  }, [permission?.granted]);

  if (!permission?.granted) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', padding: 24 }}>
        <Text>Grant media library access first.</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, padding: 12 }}>
      <FlatList
        data={assets}
        keyExtractor={(item) => item.id}
        numColumns={3}
        columnWrapperStyle={{ gap: 4 }}
        contentContainerStyle={{ gap: 4, paddingBottom: 16 }}
        renderItem={({ item }) => (
          <Image
            source={{ uri: item.uri }}
            style={{ flex: 1, aspectRatio: 1 }}
            contentFit="cover"
          />
        )}
        ListFooterComponent={
          hasNextPage ? (
            <Button
              title={loading ? 'Loading…' : 'Load more'}
              onPress={() => loadPage(true)}
              disabled={loading}
            />
          ) : null
        }
      />
    </View>
  );
}
```

---

### Example F — Save image to gallery (bundled asset)

Uses `expo-asset` to resolve a bundled PNG to a real `file://` path, then saves it.

```tsx
import { Asset } from 'expo-asset';
import * as MediaLibrary from 'expo-media-library';
import { useState } from 'react';
import { Alert, Button, Linking, Text, View } from 'react-native';

// Replace with your image path, e.g. assets/images/logo.png
const bundledImage = require('../../../assets/images/icon.png');

async function saveImageToGallery(localUri: string) {
  const { granted, canAskAgain } = await MediaLibrary.requestPermissionsAsync(true);

  if (!granted) {
    if (!canAskAgain) {
      Alert.alert(
        'Save permission denied',
        'Enable photo library access in Settings to save images.',
        [
          { text: 'Cancel', style: 'cancel' },
          { text: 'Open Settings', onPress: () => Linking.openSettings() },
        ],
      );
    }
    throw new Error('Write permission denied');
  }

  await MediaLibrary.saveToLibraryAsync(localUri);
}

export default function SaveBundledImageScreen() {
  const [status, setStatus] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  const save = async () => {
    setSaving(true);
    setStatus('Preparing file…');

    try {
      const asset = Asset.fromModule(bundledImage);
      await asset.downloadAsync();

      if (!asset.localUri) {
        throw new Error('Could not resolve local file path');
      }

      setStatus('Saving to gallery…');
      await saveImageToGallery(asset.localUri);
      setStatus('Image saved to your gallery.');
    } catch (error) {
      if (error instanceof Error && error.message !== 'Write permission denied') {
        Alert.alert('Save failed', error.message);
      }
      setStatus('Save failed.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', padding: 24, gap: 12 }}>
      <Text style={{ fontSize: 18, fontWeight: '600' }}>Save to gallery</Text>
      <Text>
        Copies a bundled app image into the device Photos / Gallery app.
      </Text>
      <Button title={saving ? 'Saving…' : 'Save image to gallery'} onPress={save} disabled={saving} />
      {status && <Text>{status}</Text>}
    </View>
  );
}
```

---

### Example G — Save camera photo to gallery (full flow)

Capture with `expo-camera`, then persist to the gallery.

```tsx
import { CameraView, useCameraPermissions } from 'expo-camera';
import { Image } from 'expo-image';
import * as MediaLibrary from 'expo-media-library';
import { useRef, useState } from 'react';
import {
  Alert,
  Button,
  Linking,
  Text,
  View,
} from 'react-native';

async function savePhotoToGallery(uri: string) {
  const { granted, canAskAgain } = await MediaLibrary.requestPermissionsAsync(true);

  if (!granted) {
    if (!canAskAgain) {
      Alert.alert(
        'Save permission denied',
        'Enable library access in Settings.',
        [
          { text: 'Cancel', style: 'cancel' },
          { text: 'Open Settings', onPress: () => Linking.openSettings() },
        ],
      );
    }
    throw new Error('Write permission denied');
  }

  await MediaLibrary.saveToLibraryAsync(uri);
}

export default function CaptureAndSaveScreen() {
  const cameraRef = useRef<CameraView>(null);
  const [cameraPermission, requestCameraPermission] = useCameraPermissions();

  const [ready, setReady] = useState(false);
  const [photoUri, setPhotoUri] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);
  const [saving, setSaving] = useState(false);

  if (!cameraPermission) {
    return <Text>Checking camera permission…</Text>;
  }

  if (!cameraPermission.granted) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', padding: 24, gap: 12 }}>
        <Text>Camera access is required to take a photo.</Text>
        <Button title="Grant camera access" onPress={requestCameraPermission} />
      </View>
    );
  }

  const takePhoto = async () => {
    if (!cameraRef.current || !ready) return;

    const photo = await cameraRef.current.takePictureAsync({ quality: 0.85 });
    if (photo?.uri) {
      setPhotoUri(photo.uri);
      setSaved(false);
    }
  };

  const saveToGallery = async () => {
    if (!photoUri) return;

    setSaving(true);
    try {
      await savePhotoToGallery(photoUri);
      setSaved(true);
    } catch (error) {
      if (error instanceof Error && error.message !== 'Write permission denied') {
        Alert.alert('Save failed', error.message);
      }
    } finally {
      setSaving(false);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      {!photoUri ? (
        <CameraView
          ref={cameraRef}
          style={{ flex: 1 }}
          facing="back"
          mode="picture"
          onCameraReady={() => setReady(true)}
        />
      ) : (
        <Image source={{ uri: photoUri }} style={{ flex: 1 }} contentFit="cover" />
      )}

      <View style={{ padding: 16, gap: 8 }}>
        {!photoUri ? (
          <Button title="Take photo" onPress={takePhoto} disabled={!ready} />
        ) : (
          <>
            <Button
              title={saving ? 'Saving…' : 'Save to gallery'}
              onPress={saveToGallery}
              disabled={saving}
            />
            <Button
              title="Retake"
              onPress={() => {
                setPhotoUri(null);
                setSaved(false);
                setReady(false);
              }}
            />
          </>
        )}
        {saved && <Text>Photo saved to device gallery.</Text>}
      </View>
    </View>
  );
}
```

---

### Example H — `createAssetAsync` (save + get asset back)

`saveToLibraryAsync` saves silently. `createAssetAsync` returns the new `Asset` object (useful if you need the gallery ID immediately).

```tsx
import { Asset } from 'expo-asset';
import * as MediaLibrary from 'expo-media-library';
import { useState } from 'react';
import { Alert, Button, Text, View } from 'react-native';

const bundledImage = require('../../../assets/images/icon.png');

export default function CreateAssetScreen() {
  const [createdAsset, setCreatedAsset] = useState<MediaLibrary.Asset | null>(null);

  const saveAndGetAsset = async () => {
    const writePermission = await MediaLibrary.requestPermissionsAsync(true);
    if (!writePermission.granted) {
      Alert.alert('Write permission required', 'Allow saving to photo library.');
      return;
    }

    const asset = Asset.fromModule(bundledImage);
    await asset.downloadAsync();

    if (!asset.localUri) {
      Alert.alert('Error', 'Could not resolve local file.');
      return;
    }

    const newAsset = await MediaLibrary.createAssetAsync(asset.localUri);
    setCreatedAsset(newAsset);
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', padding: 24, gap: 12 }}>
      <Button title="Save and get asset" onPress={saveAndGetAsset} />

      {createdAsset && (
        <>
          <Text>Saved to gallery.</Text>
          <Text selectable>ID: {createdAsset.id}</Text>
          <Text selectable>URI: {createdAsset.uri}</Text>
          <Text>
            {createdAsset.width}×{createdAsset.height}
          </Text>
        </>
      )}
    </View>
  );
}
```

---

### Example I — Limited access picker (iOS / Android 14+)

When user granted **limited** access, let them add more photos to your app’s visible set.

```tsx
import * as MediaLibrary from 'expo-media-library';
import { useState } from 'react';
import { Alert, Button, Text, View } from 'react-native';

export default function LimitedAccessScreen() {
  const [permission] = MediaLibrary.usePermissions();
  const [message, setMessage] = useState<string | null>(null);

  const openPicker = async () => {
    try {
      await MediaLibrary.presentPermissionsPickerAsync();
      setMessage('User updated selected photos. Reload your gallery grid.');
    } catch (error) {
      Alert.alert(
        'Unavailable',
        error instanceof Error
          ? error.message
          : 'Only supported on iOS and Android 14+.',
      );
    }
  };

  if (!permission?.granted) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', padding: 24 }}>
        <Text>Grant media library access first.</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, justifyContent: 'center', padding: 24, gap: 12 }}>
      <Text>Access level: {permission.accessPrivileges}</Text>

      {permission.accessPrivileges === 'limited' && (
        <Text>
          You only see photos the user selected. Offer a way to add more.
        </Text>
      )}

      <Button title="Manage photo access" onPress={openPicker} />
      {message && <Text>{message}</Text>}
    </View>
  );
}
```

---

## 5. Permission handling — iOS

On iOS, media library access has **two native keys** and **three runtime privilege levels**.

### Native setup (build time)

| Plugin option | Info.plist key | Purpose |
| --- | --- | --- |
| `photosPermission` | `NSPhotoLibraryUsageDescription` | **Read** gallery |
| `savePhotosPermission` | `NSPhotoLibraryAddUsageDescription` | **Save** without full read (iOS 11+) |

```json
[
  "expo-media-library",
  {
    "photosPermission": "Allow $(PRODUCT_NAME) to access your photos, videos, and audio.",
    "savePhotosPermission": "Allow $(PRODUCT_NAME) to save media to your library."
  }
]
```

Rebuild native app after changing these strings.

### Runtime privilege levels

When user grants access on iOS 14+, they may choose:

| User choice | `accessPrivileges` | What you get |
| --- | --- | --- |
| Allow Access to All Photos | `'all'` | Full library |
| Select Photos… | `'limited'` | Only selected items |
| Don’t Allow | `'none'` / denied | Empty or no access |

### Read vs write on iOS

```tsx
// Read — browse gallery
await MediaLibrary.requestPermissionsAsync(false);

// Write only — save without asking to read entire library
await MediaLibrary.requestPermissionsAsync(true);
```

Use **write-only** when you only save camera photos and never browse the gallery.

### Example J — iOS-friendly read + save permissions

```tsx
import * as MediaLibrary from 'expo-media-library';
import { useState } from 'react';
import { Alert, Button, Linking, Text, View } from 'react-native';

export default function IOSMediaPermissionScreen() {
  const [permission, requestPermission] = MediaLibrary.usePermissions();
  const [status, setStatus] = useState<string | null>(null);

  const requestRead = async () => {
    const result = await requestPermission();
    if (!result.granted && !result.canAskAgain) {
      Linking.openSettings();
      return;
    }
    setStatus(`Read access: ${result.accessPrivileges ?? result.status}`);
  };

  const requestWriteOnly = async () => {
    const result = await MediaLibrary.requestPermissionsAsync(true);
    if (!result.granted && !result.canAskAgain) {
      Alert.alert('Permission denied', 'Enable library access in Settings.', [
        { text: 'Open Settings', onPress: () => Linking.openSettings() },
      ]);
      return;
    }
    setStatus(result.granted ? 'Write access granted' : 'Write access denied');
  };

  if (!permission) {
    return <Text>Checking permission…</Text>;
  }

  return (
    <View style={{ flex: 1, justifyContent: 'center', padding: 24, gap: 12 }}>
      <Text style={{ fontSize: 18, fontWeight: '600' }}>Media library</Text>

      <Text>
        Granted: {permission.granted ? 'yes' : 'no'}
      </Text>
      <Text>
        Access level: {permission.accessPrivileges ?? 'n/a'}
      </Text>

      <Button title="Request read access (browse gallery)" onPress={requestRead} />
      <Button title="Request write access (save only)" onPress={requestWriteOnly} />

      {permission.accessPrivileges === 'limited' && (
        <Button
          title="Manage selected photos"
          onPress={() => MediaLibrary.presentPermissionsPickerAsync()}
        />
      )}

      {status && <Text>{status}</Text>}
    </View>
  );
}
```

### iOS permission checklist

1. Set `photosPermission` and `savePhotosPermission` in `app.json`.
2. Rebuild after changing permission strings.
3. Check `accessPrivileges` — don’t assume full access.
4. Use `requestPermissionsAsync(true)` when **only saving**.
5. Offer `presentPermissionsPickerAsync()` for limited access users.
6. Use `shouldDownloadFromNetwork: true` for iCloud photos before reading `localUri`.
7. If `!canAskAgain`, send user to **Settings**.

---

## 6. Gallery access vs other “files”

| Need | Package | Example |
| --- | --- | --- |
| User’s Photos/Gallery | `expo-media-library` | `getAssetsAsync`, `saveToLibraryAsync` |
| Real file path of a gallery item | `expo-media-library` | `getAssetInfoAsync` → `localUri` |
| Pick one photo without building a browser | `expo-image-picker` | `launchImageLibraryAsync()` |
| Pick PDF, zip, any document | `expo-document-picker` | `getDocumentAsync()` |
| App’s own cache/documents folder | `expo-file-system` | `FileSystem.documentDirectory` |

`expo-media-library` = **system media store**. It is not a general file manager.

---

## 7. Main APIs (summary)

### `getAlbumsAsync({ includeSmartAlbums: true })`

Lists albums. Returns `{ id, title, assetCount }[]`.

### `getAssetsAsync(options)`

| Option | Description |
| --- | --- |
| `first` | Page size |
| `after` | Cursor (`endCursor`) for next page |
| `album` | Filter to one album |
| `mediaType` | `photo`, `video`, `audio`, `all` |
| `sortBy` | `[[SortBy.creationTime, false]]` = newest first |

Returns: `{ assets, endCursor, hasNextPage, totalCount }`.

### `getAssetInfoAsync(asset, { shouldDownloadFromNetwork: true })`

Returns `AssetInfo` with `localUri`, EXIF, location, dimensions.

### `saveToLibraryAsync(localUri)`

Copies local file to gallery. Needs write permission. Does not return asset.

### `createAssetAsync(localUri)`

Same as save, but returns the new `Asset`.

### `presentPermissionsPickerAsync()`

Opens system UI for limited-access users (iOS, Android 14+).

---

## 8. Configuration (`app.json`)

```json
[
  "expo-media-library",
  {
    "photosPermission": "Allow $(PRODUCT_NAME) to access your photos, videos, and audio.",
    "savePhotosPermission": "Allow $(PRODUCT_NAME) to save media to your library.",
    "isAccessMediaLocationEnabled": true,
    "granularPermissions": ["photo", "video", "audio"]
  }
]
```

| Option | Platform | Description |
| --- | --- | --- |
| `photosPermission` | iOS | Read library (`NSPhotoLibraryUsageDescription`) |
| `savePhotosPermission` | iOS | Save to library (`NSPhotoLibraryAddUsageDescription`) |
| `isAccessMediaLocationEnabled` | Android | `ACCESS_MEDIA_LOCATION` for EXIF GPS |
| `granularPermissions` | Android 13+ | `photo`, `video`, `audio` |
| `preventAutomaticLimitedAccessAlert` | iOS | Suppress auto limited-access prompt |

Plugin changes require a **new native build**.

---

## 9. Platform behavior

### iOS

- Full, limited, or denied access
- Smart albums (Recents, Favorites, Screenshots)
- iCloud photos need `shouldDownloadFromNetwork: true`
- `ph://` URIs for display; `file://` from `localUri` for real file access

### Android

- Scoped storage (Android 10+)
- Granular permissions on Android 13+ (`READ_MEDIA_IMAGES`, etc.)
- Limited access on Android 14+ (similar to iOS)
- EXIF GPS needs `isAccessMediaLocationEnabled` + rebuild
- Google Play: justify broad gallery access in store listing

### Web

- Limited / not fully supported for native gallery

---

## 10. Best practices

1. Check **`accessPrivileges`** — don’t assume full library access.
2. **Paginate** — never load all assets at once.
3. Use **`getAssetInfoAsync`** when you need the real **file**, not just thumbnail.
4. Use **`shouldDownloadFromNetwork: true`** for iCloud assets.
5. Request **write-only** permission when only saving.
6. Offer **`presentPermissionsPickerAsync()`** for limited access.
7. **Rebuild** after plugin changes (especially `isAccessMediaLocationEnabled`).
8. Pair with **camera/audio** — capture to cache first, save on user confirm.
9. For one-off picks, prefer **`expo-image-picker`** over building a full browser.

---

## 11. Typical flows

### Browse gallery

```
1. usePermissions() → request read access
2. getAssetsAsync({ first: 20 })
3. Render grid from assets[].uri
4. getAssetsAsync({ after: endCursor }) for next page
```

### Access file for upload

```
1. User taps asset
2. getAssetInfoAsync(asset, { shouldDownloadFromNetwork: true })
3. Use info.localUri with fetch / FileSystem / upload API
```

### Save camera photo

```
1. takePictureAsync() → cache URI
2. requestPermissionsAsync(true)
3. saveToLibraryAsync(photoUri)
```

---

## 12. Common errors & fixes

| Problem | Cause | Fix |
| --- | --- | --- |
| Empty asset list | Limited access | `presentPermissionsPickerAsync()` |
| Thumbnail works, upload fails | No `localUri` | `getAssetInfoAsync` + `shouldDownloadFromNetwork: true` |
| Save fails | No write permission | `requestPermissionsAsync(true)` |
| EXIF/location fails on Android | Missing `ACCESS_MEDIA_LOCATION` | Enable plugin + rebuild |
| Play Store rejection | Unjustified broad access | Use `expo-image-picker` instead |

---

## 13. Related packages

| Package | Purpose |
| --- | --- |
| `expo-camera` | Capture → `saveToLibraryAsync` |
| `expo-audio` | Recordings → optional save to library |
| `expo-image-picker` | Pick without full browser |
| `expo-file-system` | Read/copy files by path |
| `expo-asset` | Resolve bundled images to `localUri` before save |

---

# Overview

Your app is a **multi-lesson demo**. `plugins` and `android.permissions` are split by topic:

| Area | Lessons |
| --- | --- |
| **Capture & Media** | Camera, Audio, Media Library |
| **Device & System** | Location, Network, Battery, Haptics |
| **Files & Contacts** | Document Picker, Contacts |

Not every lesson needs a plugin or a manifest permission. Some work without extra native config.

---

# `plugins` array — each entry

## 1. `"expo-router"`

|  |  |
| --- | --- |
| **Used by** | Whole app navigation (`src/app/` file-based routes) |
| **What it does** | Wires Expo Router into the native project at build time |
| **Runtime permission?** | No |
| **Lesson** | Infrastructure — not a lesson screen |

---

## 2. `"expo-splash-screen"` + options

```json
"backgroundColor": "#208AEF",
"android": { "image": "...", "imageWidth": 76 }
```

|  |  |
| --- | --- |
| **Used by** | App launch splash |
| **What it does** | Native splash screen before React loads |
| **Runtime permission?** | No |
| **Lesson** | App shell — not a lesson |

---

## 3. `"expo-camera"` + options

```json
"cameraPermission": "Allow $(PRODUCT_NAME) to access your camera...",
"microphonePermission": "Allow $(PRODUCT_NAME) to access your microphone for video recording.",
"recordAudioAndroid": true
```

| Setting | Platform | Used by | Runtime API in code |
| --- | --- | --- | --- |
| `cameraPermission` | iOS only | **Camera lesson** (`/capture/camera`) | `useCameraPermissions()` |
| `microphonePermission` | iOS only | **Camera lesson** (video with audio) | `useMicrophonePermissions()` |
| `recordAudioAndroid` | Android | **Camera lesson** (video recording) | `useMicrophonePermissions()` |

**What the plugin does at build time:**

- iOS: adds `NSCameraUsageDescription` + `NSMicrophoneUsageDescription`
- Android: adds `CAMERA` + `RECORD_AUDIO` to manifest

**Also relevant for:** your paste examples that use `CameraView` + `takePictureAsync` + save flow.

---

## 4. `"expo-audio"` + options

```json
"microphonePermission": "Allow $(PRODUCT_NAME) to access your microphone for audio recording.",
"recordAudioAndroid": true,
"enableBackgroundPlayback": false,
"enableBackgroundRecording": false
```

| Setting | Platform | Used by | Runtime API in code |
| --- | --- | --- | --- |
| `microphonePermission` | iOS only | **Audio lesson** (`/capture/audio`) | `AudioModule.requestRecordingPermissionsAsync()` |
| `recordAudioAndroid` | Android | **Audio lesson** (recording) | Same |
| `enableBackgroundPlayback` | Both | Not used in lesson (set `false`) | Would need `setAudioModeAsync({ shouldPlayInBackground: true })` |
| `enableBackgroundRecording` | Both | Not used in lesson (set `false`) | Would need `allowsBackgroundRecording: true` |

**Build time:**

- iOS: `NSMicrophoneUsageDescription`
- Android: `RECORD_AUDIO`

**Note:** Playback of the sample MP3 does **not** need mic permission — only recording does.

---

## 5. `"expo-media-library"` + options

```json
"photosPermission": "...",
"savePhotosPermission": "...",
"isAccessMediaLocationEnabled": true,
"granularPermissions": ["photo", "video", "audio"]
```

| Setting | Platform | Used by | Runtime API in code |
| --- | --- | --- | --- |
| `photosPermission` | iOS | **Media Library lesson** (`/capture/media-library`) — browse | `MediaLibrary.usePermissions()` |
| `savePhotosPermission` | iOS | **Media Library lesson** (save sample image) + **Camera lesson** (save capture) | `requestPermissionsAsync(true)` |
| `isAccessMediaLocationEnabled` | Android | **Media Library lesson** (`getAssetInfoAsync` EXIF/location) | Read permission + rebuild |
| `granularPermissions` | Android 13+ | **Media Library lesson** (photos, videos, audio filters) | `usePermissions()` |

**Build time:**

- iOS: `NSPhotoLibraryUsageDescription` + `NSPhotoLibraryAddUsageDescription`
- Android: `READ_MEDIA_IMAGES`, `READ_MEDIA_VIDEO`, `READ_MEDIA_AUDIO`, etc.

---

## 6. `"expo-location"` + options

```json
"locationWhenInUsePermission": "Allow $(PRODUCT_NAME) to use your location while the app is open."
```

|  |  |
| --- | --- |
| **Used by** | **Location lesson** (`/device/location`) |
| **iOS build time** | `NSLocationWhenInUseUsageDescription` |
| **Android** | Location permissions (also in `android.permissions` below) |
| **Runtime API** | `Location.useForegroundPermissions()` |

---

## 7. `"expo-contacts"` + options

```json
"contactsPermission": "Allow $(PRODUCT_NAME) to access your contacts."
```

|  |  |
| --- | --- |
| **Used by** | **Contacts lesson** (`/data/contacts`) |
| **iOS build time** | `NSContactsUsageDescription` |
| **Android** | `READ_CONTACTS` / `WRITE_CONTACTS` (also in `android.permissions`) |
| **Runtime API** | `Contacts.requestPermissionsAsync()` |

---

## 8. `"expo-asset"`

|  |  |
| --- | --- |
| **Used by** | **Media Library lesson** — resolves bundled `expo-logo.png` to `localUri` before `saveToLibraryAsync` |
| **What it does** | Native asset bundling support |
| **Runtime permission?** | No |
| **Lesson** | Supporting **Media Library** save demo |

---

# Plugins with **no** entry in your `app.json`

These lessons work **without** a config plugin in your project:

| Lesson | Package | Why no plugin needed |
| --- | --- | --- |
| **Network** | `expo-network` | Reads network state — no sensitive permission dialog |
| **Battery** | `expo-battery` | Reads battery info — no extra manifest strings |
| **Haptics** | `expo-haptics` | Vibration — usually no permission prompt |
| **Document Picker** | `expo-document-picker` | Uses system picker — no broad storage access on modern Android |

---

# `android.permissions` array — each line

These are **Android-only** manifest declarations. They say “this APK may request these capabilities.” The user still approves at runtime (where applicable).

| Permission | Used by | Plugin also adds it? | Notes |
| --- | --- | --- | --- |
| `android.permission.CAMERA` | **Camera lesson** | Yes (`expo-camera`) | Redundant but OK — same declaration twice |
| `android.permission.RECORD_AUDIO` | **Camera** (video), **Audio** (record) | Yes (`expo-camera`, `expo-audio`) | Redundant but OK |
| `android.permission.MODIFY_AUDIO_SETTINGS` | **Audio lesson** (audio session) | Sometimes via audio stack | Audio routing / session |
| `android.permission.READ_EXTERNAL_STORAGE` | **Media Library** (legacy Android) | Partially via media-library | Mostly pre–Android 13 |
| `android.permission.WRITE_EXTERNAL_STORAGE` | **Media Library** (legacy save) | Partially via media-library | Mostly pre–Android 10/13 |
| `android.permission.READ_MEDIA_VISUAL_USER_SELECTED` | **Media Library** (limited access, Android 14+) | Yes (`expo-media-library`) | User-selected photos only |
| `android.permission.READ_MEDIA_IMAGES` | **Media Library** (photo browse) | Yes (`granularPermissions: photo`) | Android 13+ |
| `android.permission.READ_MEDIA_VIDEO` | **Media Library** (video browse/filter) | Yes (`granularPermissions: video`) | Android 13+ |
| `android.permission.READ_MEDIA_AUDIO` | **Media Library** (audio in library) | Yes (`granularPermissions: audio`) | Android 13+ |
| `android.permission.ACCESS_MEDIA_LOCATION` | **Media Library** (EXIF GPS in `getAssetInfoAsync`) | Yes (`isAccessMediaLocationEnabled`) | Needs plugin + rebuild |
| `android.permission.ACCESS_COARSE_LOCATION` | **Location lesson** | Yes (`expo-location`) | Approximate GPS |
| `android.permission.ACCESS_FINE_LOCATION` | **Location lesson** | Yes (`expo-location`) | Precise GPS |
| `android.permission.READ_CONTACTS` | **Contacts lesson** | Yes (`expo-contacts`) | Read address book |
| `android.permission.WRITE_CONTACTS` | **Contacts lesson** (if write demo) | Yes (`expo-contacts`) | Modify contacts |

---

# Visual map: lesson → config → runtime

```
┌─────────────────────────────────────────────────────────────────┐
│                        BUILD TIME (app.json)                     │
├─────────────────────────────────────────────────────────────────┤
│  plugins                    android.permissions (Android only) │
│  ───────                    ─────────────────────────────────  │
│  expo-camera        ──────► CAMERA, RECORD_AUDIO               │
│  expo-audio         ──────► RECORD_AUDIO, MODIFY_AUDIO_SETTINGS│
│  expo-media-library ──────► READ_MEDIA_*, ACCESS_MEDIA_LOCATION│
│  expo-location      ──────► ACCESS_FINE/COARSE_LOCATION      │
│  expo-contacts      ──────► READ/WRITE_CONTACTS                │
└─────────────────────────────────────────────────────────────────┘
                              ↓
                    native app installed
                              ↓
┌─────────────────────────────────────────────────────────────────┐
│                     RUNTIME (your React code)                    │
├─────────────────────────────────────────────────────────────────┤
│  Camera lesson      → useCameraPermissions()                     │
│                       useMicrophonePermissions()                 │
│  Audio lesson       → requestRecordingPermissionsAsync()         │
│  Media Library      → usePermissions() / requestPermissionsAsync() │
│  Location lesson    → useForegroundPermissions()                 │
│  Contacts lesson    → Contacts.requestPermissionsAsync()          │
│  Network/Battery/   → (no permission dialogs)                    │
│  Haptics/Doc Picker                                              │
└─────────────────────────────────────────────────────────────────┘
```

---

# Capture & Media trio — quick reference

|  | **Plugin** | **Android permissions** | **Runtime hook** | **Lesson route** |
| --- | --- | --- | --- | --- |
| **Camera** | `expo-camera` | `CAMERA`, `RECORD_AUDIO` | `useCameraPermissions()`, `useMicrophonePermissions()` | `/capture/camera` |
| **Audio** | `expo-audio` | `RECORD_AUDIO` | `requestRecordingPermissionsAsync()` | `/capture/audio` |
| **Media Library** | `expo-media-library` | `READ_MEDIA_*`, `ACCESS_MEDIA_LOCATION` | `usePermissions()` | `/capture/media-library` |

**Cross-lesson link:** Camera captures to cache → Media Library’s `saveToLibraryAsync()` persists to gallery. That save path uses the **media-library** plugin (`savePhotosPermission`) and runtime `requestPermissionsAsync(true)`.

---