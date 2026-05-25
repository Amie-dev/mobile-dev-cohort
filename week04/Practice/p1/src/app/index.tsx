import { Link } from "expo-router";
import { Text, View, StyleSheet } from "react-native";

export default function Index() {
  return (
    <View style={styles.container}>
      <Text
        style={{
          color: "#1f1f1f",
          fontWeight: "800",
          fontSize: 20,
          paddingBottom: 20,
        }}
      >
        Data Storage & Offline Support
      </Text>

      <View
        style={{
          backgroundColor: "rgba(1, 22, 1, 0.8)",
          padding: 10,
          borderRadius: 20,
        }}
      >
        <Link href={"/Async-Storage"}>
          <Text
            style={{
              color: "#ddd2d2",
              fontWeight: "bold",
              padding: 10,
            }}
          >
            Async Storage
          </Text>
        </Link>
      </View>
      <View
        style={{
          backgroundColor: "rgba(1, 22, 1, 0.8)",
          padding: 10,
          borderRadius: 20,
          margin: 10,
        }}
      >
        <Link href={"/Secure-Storage"}>
          <Text
            style={{
              color: "#ddd2d2",
              fontWeight: "bold",
              padding: 10,
            }}
          >
            Secure Storage
          </Text>
        </Link>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
