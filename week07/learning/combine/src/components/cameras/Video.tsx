import {
  CameraType,
  CameraView,
  useCameraPermissions,
  useMicrophonePermissions,
} from "expo-camera";
import { useRef, useState } from "react";
import {
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Ionicons from "@expo/vector-icons/Ionicons";

export default function VideoScreen() {
  const [facing, setFacing] = useState<CameraType>("back");
  const cameraRef = useRef<CameraView>(null);

  const [cameraPermission, requestCameraPermission] = useCameraPermissions();
  const [micPermission, requestMicPermission] = useMicrophonePermissions();

  const [ready, setReady] = useState(false);
  const [recording, setRecording] = useState(false);
  const [videoUri, setVideoUri] = useState<string | null>(null);

  if (!cameraPermission) {
    return (
      <View style={styles.center}>
        <Text style={styles.permissionTitle}>Loading permissions...</Text>
      </View>
    );
  }

  if (!cameraPermission.granted) {
    return (
      <View style={styles.center}>
        <Ionicons name="videocam-outline" size={56} color="#2563EB" />

        <Text style={styles.permissionTitle}>Camera Permission Required</Text>
        <Text style={styles.permissionText}>
          We need camera access to record videos.
        </Text>

        <Pressable style={styles.permissionButton} onPress={requestCameraPermission}>
          <Text style={styles.permissionButtonText}>Allow Camera</Text>
        </Pressable>
      </View>
    );
  }

  const startRecording = async () => {
    try {
      if (!micPermission?.granted) {
        const result = await requestMicPermission();
        if (!result.granted) return;
      }

      setVideoUri(null);
      setRecording(true);

      const video = await cameraRef.current?.recordAsync();

      if (video?.uri) {
        setVideoUri(video.uri);
      }
    } catch (error) {
      console.log("Recording error:", error);
    } finally {
      setRecording(false);
    }
  };

  const stopRecording = () => {
    cameraRef.current?.stopRecording();
  };

  const toggleCameraFacing = () => {
    if (recording) return;
    setFacing((current) => (current === "back" ? "front" : "back"));
  };

  return (
    <View style={styles.container}>
      <CameraView
        ref={cameraRef}
        style={styles.camera}
        facing={facing}
        mode="video"
        onCameraReady={() => setReady(true)}
        onMountError={(error) => {
          console.log("Camera mount error:", error.message);
        }}
      />

      <SafeAreaView edges={["top"]} style={styles.topBar}>
        <View style={styles.statusPill}>
          <View
            style={[
              styles.statusDot,
              recording && styles.recordingDot,
            ]}
          />
          <Text style={styles.statusText}>
            {recording ? "Recording..." : ready ? "Video Mode" : "Starting..."}
          </Text>
        </View>
      </SafeAreaView>

      <SafeAreaView edges={["bottom"]} style={styles.bottomPanel}>
        {videoUri && (
          <View style={styles.videoBox}>
            <Ionicons name="checkmark-circle" size={18} color="#22C55E" />
            <Text selectable numberOfLines={1} style={styles.uri}>
              {videoUri}
            </Text>
          </View>
        )}

        <View style={styles.controls}>
          <Pressable
            style={[
              styles.flipButton,
              recording && styles.disabledButton,
            ]}
            onPress={toggleCameraFacing}
            disabled={recording}
          >
            <Ionicons name="camera-reverse-outline" size={26} color="#fff" />
          </Pressable>

          <Pressable
            disabled={!ready}
            onPress={recording ? stopRecording : startRecording}
            style={[
              styles.recordOuter,
              !ready && styles.disabledButton,
            ]}
          >
            <View
              style={[
                styles.recordInner,
                recording && styles.recordInnerActive,
              ]}
            />
          </Pressable>

          <View style={[styles.placeholderButton ,{
            backgroundColor:"#1c1c1c"
          }]} >

          </View>
        </View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },

  camera: {
    flex: 1,
  },

  topBar: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 16,
    paddingTop: 1,
    alignItems: "center",
  },

  statusPill: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 999,
    backgroundColor: "rgba(0,0,0,0.55)",
  },

  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#22C55E",
  },

  recordingDot: {
    backgroundColor: "#EF4444",
  },

  statusText: {
    color: "#fff",
    fontSize: 13,
    fontWeight: "700",
  },

  bottomPanel: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    paddingHorizontal: 20,
    paddingBottom: 20,
    paddingTop: 16,
    backgroundColor: "rgba(0,0,0,0.55)",
  },

  controls: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  flipButton: {
    width: 54,
    height: 54,
    borderRadius: 27,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(255,255,255,0.18)",
  },

  placeholderButton: {
    width: 54,
    height: 54,
  },

  recordOuter: {
    width: 78,
    height: 78,
    borderRadius: 39,
    borderWidth: 5,
    borderColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },

  recordInner: {
    width: 58,
    height: 58,
    borderRadius: 29,
    backgroundColor: "#EF4444",
  },

  recordInnerActive: {
    width: 30,
    height: 30,
    borderRadius: 8,
  },

  disabledButton: {
    opacity: 0.45,
  },

  videoBox: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 14,
    borderRadius: 14,
    backgroundColor: "rgba(255,255,255,0.14)",
  },

  uri: {
    flex: 1,
    color: "#fff",
    fontSize: 12,
  },

  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
    backgroundColor: "#000",
  },

  permissionTitle: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "800",
    marginTop: 16,
    textAlign: "center",
  },

  permissionText: {
    color: "#A1A1AA",
    fontSize: 15,
    marginTop: 8,
    textAlign: "center",
    lineHeight: 22,
  },

  permissionButton: {
    marginTop: 24,
    paddingHorizontal: 24,
    paddingVertical: 14,
    borderRadius: 999,
    backgroundColor: "#2563EB",
  },

  permissionButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
  },
});