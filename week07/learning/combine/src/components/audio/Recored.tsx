import {
  AudioModule,
  RecordingPresets,
  setAudioModeAsync,
  useAudioRecorder,
  useAudioRecorderState,
} from "expo-audio";
import { useEffect } from "react";
import { Alert, Pressable, StyleSheet, Text, View } from "react-native";

export default function RecordScreen({ audio, setAudio }) {
  const recorder = useAudioRecorder(RecordingPresets.HIGH_QUALITY);
  const state = useAudioRecorderState(recorder);

  useEffect(() => {
    initializeRecorder();
  }, []);

  const initializeRecorder = async () => {
    try {
      const permission = await AudioModule.requestRecordingPermissionsAsync();
      if (!permission.granted) {
        Alert.alert(
          "Permission Required",
          "Microphone access is needed to record audio.",
        );
        return;
      }
      await setAudioModeAsync({
        playsInSilentMode: true,
        allowsRecording: true,
      });
    } catch (error) {
      Alert.alert("Error", error.message);
    }
  };

  const startRecording = async () => {
    try {
      await recorder.prepareToRecordAsync();
      recorder.record();
    } catch (error) {
      Alert.alert("Error", error.message);
    }
  };

  const stopRecording = async () => {
    try {
      await recorder.stop();
      if (recorder.uri) {
        setAudio(recorder.uri); // save URI to parent state
        Alert.alert("Recording Saved", recorder.uri);
      }
    } catch (error) {
      Alert.alert("Error", error.message);
    }
  };

  const seconds = Math.floor(state.durationMillis / 1000);
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  const formattedTime = `${minutes.toString().padStart(2, "0")}:${remainingSeconds
    .toString()
    .padStart(2, "0")}`;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Voice Recorder</Text>

      <View style={styles.timerContainer}>
        {state.isRecording && <View style={styles.recordDot} />}
        <Text style={styles.timer}>{formattedTime}</Text>
      </View>

      <Text style={styles.status}>
        {state.isRecording ? "Recording..." : "Ready to Record"}
      </Text>

      <Pressable
        onPress={state.isRecording ? stopRecording : startRecording}
        style={[
          styles.recordButton,
          state.isRecording && styles.recordingButton,
        ]}
      >
        <Text style={styles.buttonText}>
          {state.isRecording ? "Stop" : "Record"}
        </Text>
      </Pressable>

      {recorder.uri && (
        <View style={styles.fileCard}>
          <Text style={styles.fileTitle}>Saved File</Text>
          <Text selectable style={styles.uri}>
            {recorder.uri}
          </Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#0f172a",
  },
  title: { 
    fontSize: 28, fontWeight: "700", color: "#fff", marginBottom: 30 },
  timerContainer: {
     flexDirection: "row", alignItems: "center", gap: 10 },
  recordDot: { width: 12, height: 12, borderRadius: 6, backgroundColor: "red" },
  timer: { fontSize: 42, fontWeight: "700", color: "#fff" },
  status: { marginTop: 10, color: "#94a3b8", fontSize: 16 },
  recordButton: {
    marginTop: 40,
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: "#2563eb",
    justifyContent: "center",
    alignItems: "center",
  },
  recordingButton: { backgroundColor: "#dc2626" },
  buttonText: { color: "#fff", fontSize: 18, fontWeight: "700" },
  fileCard: {
    marginTop: 40,
    width: "100%",
    padding: 16,
    borderRadius: 12,
    backgroundColor: "#1e293b",
  },
  fileTitle: { color: "#fff", fontWeight: "600", marginBottom: 8 },
  uri: { color: "#94a3b8", fontSize: 12 },
});
