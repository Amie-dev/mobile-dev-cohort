import { Button, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { CameraView, useCameraPermissions } from "expo-camera";

const ZoomCam = () => {
  const [status, requestPermission] = useCameraPermissions();
  const [zoom, setZoom] = useState(0);

  const incZoom = () => setZoom((z) => Math.min(1, z + 0.1));
  const decZoom = () => setZoom((z) => Math.max(0, z - 0.1));

  if (!status?.granted) {
    return (
      <View style={styles.center}>
        <Text>Camera permission required.</Text>
        <Button title="Grant Permission" onPress={requestPermission} />
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <CameraView style={{ flex: 1 }} facing="back" zoom={zoom} />
      <View style={styles.controls}>
        <Button title="+" onPress={incZoom} />
        <Button title="-" onPress={decZoom} />
      </View>
      <View style={styles.overlay}>
        <Text style={styles.zoomText}>{Math.round(zoom * 100)}%</Text>
      </View>
    </View>
  );
};

export default ZoomCam;

const styles = StyleSheet.create({
  controls: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10,
    backgroundColor: "rgba(0,0,0,0.3)",
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center",
  },
  zoomText: {
    fontSize: 50,
    color: "#fff",
    fontWeight: "bold",
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
