import { Text, View, StyleSheet } from "react-native";
import { Route, router, Redirect } from "expo-router";
export default function Index() {
  return (
 <Redirect href={"/(tab)"}/>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
