import React, { useState } from "react";
import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import Photos from "@/components/cameras/Photos";
import Video from "@/components/cameras/Video";
import BarCode from "@/components/cameras/BarCode";
import ZoomCam from "@/components/cameras/ZoomCam";
import PhotoSaveScreen from "@/components/cameras/PhotoSaveScreen";

const cameraModes = [
  {
    id: 1,
    name: "Photos",
    component: Photos,
  },
   {
    id: 2,
    name: "Video",
    component: Video,
  },
  {
    id: 3,
    name: "BarCode",
    component: BarCode,
  },
  {
    id: 4,
    name: "ZoomCam",
    component: ZoomCam,
  },
  {
    id: 5,
    name: "Save Gell",
    component: PhotoSaveScreen,
  },
];

export default function Camera() {
  const [selectedCamera, setSelectedCamera] = useState(cameraModes[0]);
  const SelectedComponent = selectedCamera.component;

  return (
    <View style={styles.container}>
      <View style={styles.cameraArea}>
        <SelectedComponent />
      </View>

      <View
        style={[
          styles.bottomBar,
          {
            backgroundColor: "yellow",
            height: "10%",
          },
        ]}
      >
        <FlatList
          horizontal
          data={cameraModes}
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.list}
          renderItem={({ item }) => {
            const isActive = selectedCamera.id === item.id;

            return (
              <View
                style={{
                  height: "auto",
                  backgroundColor: "rgba(0,0,0,0.65)",
                  borderRadius:30
                }}
              >
                <Pressable
                  onPress={() => setSelectedCamera(item)}
                  style={[styles.modeButton, , isActive && styles.activeMode]}
                >
                  <Text
                    style={[styles.modeText, isActive && styles.activeText]}
                  >
                    {item.name}
                  </Text>
                </Pressable>
              </View>
            );
          }}
        />
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },

  cameraArea: {
    flex: 1,
    backgroundColor: "red",
    height: "90%",
  },

  bottomBar: {
    height: 40,
    // backgroundColor: "rgba(0,0,0,0.65)",
    justifyContent: "center",
  },

  list: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 12,
    paddingHorizontal: 16,
  },

  modeButton: {
    height: 54,
    paddingHorizontal: 22,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 999,
    backgroundColor: "rgba(255,255,255,0.18)",
  },

  activeMode: {
    backgroundColor: "#2563EB",
  },

  modeText: {
    color: "#E5E7EB",
    fontWeight: "600",
  },

  activeText: {
    color: "#FFFFFF",
  },
});
