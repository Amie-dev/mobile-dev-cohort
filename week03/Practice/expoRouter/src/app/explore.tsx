import {
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

import { Link, router } from "expo-router";

const Explore = () => {
  return (
    <View style={styles.container}>
      <Text>Explore Screen</Text>

      <Link href="/">Home using Link</Link>

      <Pressable onPress={() => router.back()}>
        <Text>Go Back</Text>
      </Pressable>

      <Pressable onPress={() => router.push("/")}>
        <Text>Go Home Push creates stack</Text>
      </Pressable>

      <Pressable onPress={() => router.navigate("/")}>
        <Text>Go Home Navigate</Text>
      </Pressable>

      <Pressable onPress={() => router.replace("/")}>
        <Text>Go Home Direct Replace</Text>
      </Pressable>

      <Pressable onPress={() => router.replace("/")}>
        <Text>Go Home Direct Replace</Text>
      </Pressable>
    </View>
  );
};

export default Explore;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 20,
  },
});