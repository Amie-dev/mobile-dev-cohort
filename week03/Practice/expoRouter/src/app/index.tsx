import { Link, router } from "expo-router";

import {
  Text,
  View,
  StyleSheet,
  Pressable,
} from "react-native";

export default function Index() {
  return (
    <View style={styles.container}>
      <Text>Home Screen</Text>

      {/* LINK */}
      <Link href="/explore">Explore</Link>

      {/* ROUTER PUSH */}
      <Pressable
        onPress={() => {
          router.push("/explore");
        }}
      >
        <Text>Go Explore</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 20,
  },
});