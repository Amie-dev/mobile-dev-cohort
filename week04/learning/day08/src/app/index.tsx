import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import { Link } from "expo-router";

const Index = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome</Text>
      <Text style={styles.subtitle}>Choose a storage option:</Text>

      <View style={styles.linkContainer}>
        <Link href={"/async-storage"} asChild>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Async Storage</Text>
          </TouchableOpacity>
        </Link>

        <Link href={"/secure-store"} asChild>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Secure Storage</Text>
          </TouchableOpacity>
        </Link>
        <Link href={"/sql-lite"} asChild>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>SQLite</Text>
          </TouchableOpacity>
        </Link>

        <Link href={"/expo-file-system"} asChild>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>expoFileSystem</Text>
          </TouchableOpacity>
        </Link>
      </View>
    </View>
  );
};

export default Index;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f7fa",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
    marginBottom: 30,
  },
  linkContainer: {
    width: "100%",
    gap: 15,
  },
  button: {
    backgroundColor: "#4a90e2",
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});
