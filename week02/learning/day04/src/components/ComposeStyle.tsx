import { StyleSheet, Text, View } from "react-native";
import React from "react";

const ComposeStyle = () => {
  const isActive = true;
  const buttonStyle = StyleSheet.compose(
    styles.button,
    isActive ? styles.activeButton : null,
  );
  return (
    <View style={styles.container}>
     
      {/* <View style={[styles.button, isActive && styles.activeButton]}> */}
<View style={buttonStyle}>
        <Text>ComposeStyle</Text>
      </View>
    </View>
  );
};

export default ComposeStyle;

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 10,
    backgroundColor: "#ccc",
  },
  activeButton: {
    backgroundColor: "#6C63FF",
    // Override to purple when active
  },
  buttonText: { color: "white", fontWeight: "bold", fontSize: 16 },
});
