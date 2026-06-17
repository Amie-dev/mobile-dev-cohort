import React, { useState } from "react";
import { View, Text, Pressable, StyleSheet, Switch } from "react-native";
import { useAudioPlayer, useAudioPlayerStatus } from "expo-audio";

export default function AudioScreen({ audio, setAudio }) {
  // If audio URI is passed, use it; otherwise fallback to bundled song
  const player = useAudioPlayer(
    audio ? { uri: audio } : require("../../../assets/audio/song.mp3"),
  );

  const status = useAudioPlayerStatus(player);

  const [volume, setVolume] = useState(1);
  const [rate, setRate] = useState(1);
  const [loop, setLoop] = useState(false);

  const playPause = () => {
    if (status?.playing) {
      player.pause();
    } else {
      player.play();
    }
  };

  const stop = () => {
    player.pause();
    player.seekTo(0);
  };

  const seekForward = () => {
    player.seekTo((status?.currentTime ?? 0) + 10);
  };

  const seekBackward = () => {
    player.seekTo(Math.max(0, (status?.currentTime ?? 0) - 10));
  };

  const updateVolume = (value) => {
    setVolume(value);
    player.volume = value;
  };

  const updateRate = (value) => {
    setRate(value);
    player.playbackRate = value;
  };

  const toggleLoop = (value) => {
    setLoop(value);
    player.loop = value;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Expo Audio Player</Text>

      <Text style={styles.status}>
        {status?.playing ? "▶ Playing" : "⏸ Paused"}
      </Text>

      <Text style={styles.time}>
        {Math.floor(status?.currentTime ?? 0)}s /{" "}
        {Math.floor(status?.duration ?? 0)}s
      </Text>

      <View style={styles.controls}>
        <Pressable style={styles.btn} onPress={seekBackward}>
          <Text style={styles.btnText}>⏪ 10s</Text>
        </Pressable>

        <Pressable style={styles.btn} onPress={playPause}>
          <Text style={styles.btnText}>
            {status?.playing ? "Pause" : "Play"}
          </Text>
        </Pressable>

        <Pressable style={styles.btn} onPress={seekForward}>
          <Text style={styles.btnText}>10s ⏩</Text>
        </Pressable>
      </View>

      <Pressable style={styles.stopBtn} onPress={stop}>
        <Text style={styles.btnText}>Stop</Text>
      </Pressable>

      <View style={styles.section}>
        <Text>Volume: {volume.toFixed(1)}</Text>
        {/* Uncomment if you want slider control */}
        {/* <Slider
          minimumValue={0}
          maximumValue={1}
          step={0.1}
          value={volume}
          onValueChange={updateVolume}
        /> */}
      </View>

      <View style={styles.section}>
        <Text>Speed: {rate.toFixed(1)}x</Text>
        {/* <Slider
          minimumValue={0.5}
          maximumValue={2}
          step={0.25}
          value={rate}
          onValueChange={updateRate}
        /> */}
      </View>

      <View style={styles.loopRow}>
        <Text>Loop Playback</Text>
        <Switch value={loop} onValueChange={toggleLoop} />
      </View>

      <View style={styles.infoBox}>
        <Text>Buffered: {Math.floor(status?.bufferedPosition ?? 0)}s</Text>
        <Text>Duration: {Math.floor(status?.duration ?? 0)}s</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
    gap: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    textAlign: "center",
  },
  status: {
    textAlign: "center",
    fontSize: 18,
  },
  time: {
    textAlign: "center",
  },
  controls: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  btn: {
    backgroundColor: "#2563EB",
    padding: 12,
    borderRadius: 8,
  },
  stopBtn: {
    backgroundColor: "#DC2626",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  btnText: { color: "#fff", fontWeight: "600" },
  section: { gap: 8 },
  loopRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  infoBox: {
    padding: 16,
    borderRadius: 10,
    backgroundColor: "#f3f4f6",
    gap: 8,
  },
});
