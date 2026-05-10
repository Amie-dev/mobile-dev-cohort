import { StyleSheet, Text, View } from "react-native";
import React from "react";

import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";

// ❌ Without Safe Area
const UnSafeArea = () => {
  return (
    <View style={styles.unSafeContainer}>
      <Text style={styles.text}>Without SafeAreaView</Text>
    </View>
  );
};

// ✅ Using SafeAreaView
const SafeAreaExample = () => {
  return (
    <SafeAreaView style={styles.safeContainer}>
      <Text style={styles.text}>Using SafeAreaView</Text>
    </SafeAreaView>
  );
};

// ✅ Using useSafeAreaInsets
const SafeAreaInsetsExample = () => {
  const insets = useSafeAreaInsets();

  console.log(insets);

  return (
    <View
      style={[
        styles.insetsContainer,
        {
          paddingTop: insets.top,
          paddingBottom: insets.bottom,
        },
      ]}
    >
      <Text style={styles.text}>Using useSafeAreaInsets</Text>

      <Text>Top: {insets.top}</Text>
      <Text>Bottom: {insets.bottom}</Text>
      <Text>Left: {insets.left}</Text>
      <Text>Right: {insets.right}</Text>
    </View>
  );
};

// MAIN COMPONENT
const SafeAreaScreen = () => {
  return (
    <View style={{ flex: 1 }}>
      {/* <UnSafeArea /> */}

      {/* <SafeAreaExample /> */}

      <SafeAreaInsetsExample />
    </View>
  );
};

export default SafeAreaScreen;

const styles = StyleSheet.create({
  unSafeContainer: {
    flex: 1,
    backgroundColor: "#ffcccc",
    justifyContent: "center",
    alignItems: "center",
  },

  safeContainer: {
    flex: 1,
    backgroundColor: "#ccffcc",
    justifyContent: "center",
    alignItems: "center",
  },

  insetsContainer: {
    flex: 1,
    backgroundColor: "#ddeeff",
    justifyContent: "center",
    alignItems: "center",
  },

  text: {
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 20,
  },
});