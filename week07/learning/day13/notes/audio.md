# 🎵 Expo Audio (`expo-audio`) — Complete Deep Notes

## What is `expo-audio`?

`expo-audio` is Expo's modern package for handling audio playback and recording.

It replaces the older:

```bash
expo-av
```

for audio-related functionality.

Use `expo-audio` when your app needs:

* Play music
* Play sound effects
* Record voice notes
* Record audio messages
* Podcast player
* Audio books
* Meditation apps
* Music streaming apps
* Voice recorder apps

---

# Why Expo Created `expo-audio`

Previously Expo used:

```txt
expo-av
├─ Audio
└─ Video
```

Problems:

* Large package
* Audio and video tightly coupled
* More complex API
* Harder maintenance

Now Expo separated them:

```txt
expo-audio
expo-video
```

Benefits:

✅ Smaller bundle

✅ Better performance

✅ Easier API

✅ Easier maintenance

✅ Future improvements

---

# Installation

```bash
npx expo install expo-audio
```

---

# Basic Architecture

Think of audio as:

```txt
Audio File
     ↓
Audio Player
     ↓
Speaker
```

Example:

```txt
song.mp3
     ↓
AudioPlayer
     ↓
Phone Speaker
```

---

# Common Use Cases

## Music Player

```txt
Spotify
Apple Music
JioSaavn
Gaana
```

---

## Voice Notes

```txt
WhatsApp
Telegram
Discord
```

---

## Meditation Apps

```txt
Calm
Headspace
```

---

## Learning Apps

```txt
Duolingo
Language Learning
Pronunciation Practice
```

---

# Audio Playback Flow

```txt
1. Load audio
2. Create player
3. Play
4. Pause
5. Resume
6. Stop
7. Release resources
```

---

# Creating a Player

Example:

```tsx
import { useAudioPlayer } from 'expo-audio';

const player = useAudioPlayer(
  require('./assets/song.mp3')
);
```

This loads an audio file and creates a player.

---

# Playing Audio

```tsx
player.play();
```

Example:

```tsx
<Button
  title="Play"
  onPress={() => player.play()}
/>
```

---

# Pausing Audio

```tsx
player.pause();
```

Example:

```tsx
<Button
  title="Pause"
  onPress={() => player.pause()}
/>
```

---

# Stopping Audio

```tsx
player.seekTo(0);
player.pause();
```

Unlike video players, audio usually:

```txt
Pause
+
Move back to beginning
=
Stop
```

---

# Simple Audio Player

```tsx
import { Button, View } from 'react-native';
import { useAudioPlayer } from 'expo-audio';

export default function App() {
  const player = useAudioPlayer(
    require('./assets/song.mp3')
  );

  return (
    <View>
      <Button
        title="Play"
        onPress={() => player.play()}
      />

      <Button
        title="Pause"
        onPress={() => player.pause()}
      />
    </View>
  );
}
```

---

# Audio Status

You often need:

```txt
Is audio playing?
Current time?
Duration?
```

Use:

```tsx
import { useAudioPlayerStatus } from 'expo-audio';
```

Example:

```tsx
const status = useAudioPlayerStatus(player);
```

---

# Status Object

Common values:

```tsx
status.playing
status.currentTime
status.duration
status.bufferedPosition
```

Example:

```tsx
console.log(status.currentTime);
```

Output:

```txt
25.6
```

means:

```txt
25.6 seconds played
```

---

# Play / Pause Toggle

```tsx
const togglePlayback = () => {
  if (status.playing) {
    player.pause();
  } else {
    player.play();
  }
};
```

---

# Seeking Audio

Jump to a specific time.

Example:

```tsx
player.seekTo(60);
```

Meaning:

```txt
Jump to 1 minute
```

---

# Skip Forward

```tsx
player.seekTo(
  status.currentTime + 10
);
```

Output:

```txt
Current Position + 10 seconds
```

---

# Skip Backward

```tsx
player.seekTo(
  status.currentTime - 10
);
```

---

# Volume Control

Range:

```txt
0 = mute
1 = full volume
```

Example:

```tsx
player.volume = 0.5;
```

Meaning:

```txt
50% volume
```

---

# Mute Audio

```tsx
player.volume = 0;
```

---

# Playback Rate

Speed control.

Example:

```tsx
player.playbackRate = 2;
```

Meaning:

```txt
2x speed
```

Useful for:

* Podcasts
* Audio books
* Lectures

---

# Playback Rate Examples

| Value | Speed        |
| ----- | ------------ |
| 0.5   | Half speed   |
| 1     | Normal       |
| 1.5   | Faster       |
| 2     | Double speed |

---

# Looping Audio

Repeat forever.

```tsx
player.loop = true;
```

Useful for:

```txt
Meditation
Background music
Ambient sounds
```

---

# Local Audio Files

```tsx
require('./assets/music.mp3')
```

Example:

```tsx
const player = useAudioPlayer(
  require('./assets/music.mp3')
);
```

---

# Remote Audio Files

```tsx
const player = useAudioPlayer({
  uri:
    'https://example.com/song.mp3',
});
```

Useful for:

```txt
Music Streaming
Podcast Apps
Radio Apps
```

---

# Audio Recording

Another major feature.

Flow:

```txt
Request microphone permission
↓
Start recording
↓
Stop recording
↓
Save audio file
```

---

# Permissions

Android:

```json
{
  "permissions": [
    "android.permission.RECORD_AUDIO"
  ]
}
```

---

# Config Plugin

```json
{
  "plugins": [
    [
      "expo-audio",
      {
        "microphonePermission":
          "Allow access to microphone."
      }
    ]
  ]
}
```

After changing:

```txt
New native build required
```

---

# Recording Permission Hook

```tsx
import {
  useAudioRecorder,
  RecordingPresets,
} from 'expo-audio';
```

---

# Create Recorder

```tsx
const recorder =
  useAudioRecorder(
    RecordingPresets.HIGH_QUALITY
  );
```

---

# Start Recording

```tsx
await recorder.prepareToRecordAsync();

await recorder.record();
```

---

# Stop Recording

```tsx
await recorder.stop();
```

---

# Get Recorded File

```tsx
console.log(recorder.uri);
```

Example:

```txt
file:///cache/audio123.m4a
```

---

# Recording Presets

Expo provides ready-made configurations.

## High Quality

```tsx
RecordingPresets.HIGH_QUALITY
```

Best for:

```txt
Voice notes
Podcasts
Interviews
```

---

## Low Quality

```tsx
RecordingPresets.LOW_QUALITY
```

Best for:

```txt
Small file size
Quick recordings
```

---

# Audio Recorder Flow

```txt
Tap Record
      ↓
Microphone Permission
      ↓
Start Recording
      ↓
User Speaks
      ↓
Stop Recording
      ↓
Get Audio URI
      ↓
Upload or Save
```

---

# WhatsApp Voice Note Example

```txt
Hold Microphone
↓
Start Recording
↓
Release Button
↓
Stop Recording
↓
Send Audio File
```

---

# Save Recording Permanently

Recording is initially stored in:

```txt
Cache Directory
```

Temporary storage.

Use:

```txt
expo-file-system
```

to move it.

Example:

```txt
cache/audio.m4a
↓
documents/voice-notes/audio.m4a
```

---

# Background Audio

Many apps need:

```txt
Music continues when app minimized
```

Examples:

```txt
Spotify
YouTube Music
Apple Music
```

Configure audio session properly for background playback.

---

# Common Audio Formats

| Format | Usage            |
| ------ | ---------------- |
| mp3    | Most common      |
| m4a    | Recording        |
| wav    | High quality     |
| aac    | Streaming        |
| ogg    | Android-friendly |

---

# Common Real-World Apps

## Spotify

Uses:

```txt
Audio Playback
Background Playback
Queue
Shuffle
Repeat
```

---

## WhatsApp

Uses:

```txt
Voice Recording
Voice Playback
```

---

## Podcast App

Uses:

```txt
Play
Pause
Seek
Speed Control
Downloads
```

---

## Meditation App

Uses:

```txt
Looping
Background Audio
Ambient Sounds
```

---

# `expo-audio` vs `expo-video`

| Feature        | Audio | Video |
| -------------- | ----- | ----- |
| Music          | ✅     | ❌     |
| Voice Notes    | ✅     | ❌     |
| Podcast        | ✅     | ❌     |
| Movies         | ❌     | ✅     |
| Video Playback | ❌     | ✅     |

---

# `expo-audio` vs `expo-av`

| Feature          | expo-audio | expo-av |
| ---------------- | ---------- | ------- |
| Modern API       | ✅          | ❌       |
| Expo Recommended | ✅          | ❌       |
| Smaller Package  | ✅          | ❌       |
| Audio Focused    | ✅          | ❌       |
| Future Updates   | ✅          | Limited |

---

# Best Practices

### 1. Request Microphone Permission First

```txt
Permission
↓
Recording
```

Never the opposite.

---

### 2. Stop Recording Before Leaving Screen

```tsx
await recorder.stop();
```

---

### 3. Move Important Files Out of Cache

```txt
Cache can be deleted
```

---

### 4. Release Unused Audio Resources

Avoid:

```txt
Memory leaks
Battery drain
```

---

### 5. Use Low Quality for Voice Notes

No need for studio-quality audio.

---

# Typical Production Flow

```txt
User presses Play
↓
Load Audio
↓
Create AudioPlayer
↓
Play Audio
↓
Track Status
↓
Pause / Resume
↓
Seek
↓
Stop

OR

User presses Record
↓
Request Permission
↓
Record Audio
↓
Stop Recording
↓
Get URI
↓
Save to FileSystem
↓
Upload to Server
```

# Final Mental Model

```txt
expo-audio
│
├── Audio Playback
│   ├── Play
│   ├── Pause
│   ├── Seek
│   ├── Volume
│   ├── Speed
│   └── Loop
│
├── Audio Recording
│   ├── Microphone
│   ├── Record
│   ├── Stop
│   └── Save URI
│
└── Audio Status
    ├── Duration
    ├── Current Time
    ├── Playing
    └── Buffered
```

If you're building a **Pocket Files / File Manager app**, the most useful combination is:

```txt
expo-audio
+
expo-file-system
+
SQLite
```

so recorded voice notes can be stored permanently, indexed in the database, searched, renamed, shared, and played back later.
