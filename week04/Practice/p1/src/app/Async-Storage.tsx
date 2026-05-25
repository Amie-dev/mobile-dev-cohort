import { Alert, Pressable, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

type Value = {
  name: string;
  age: number;
  [key: string]: unknown; // allows extra properties
};

const stringifyValue = (value: Value) => JSON.stringify(value);
const parseValue = (value: string): Value => JSON.parse(value) as Value;

const AsyncStorageScreen = () => {
  const [output, setOutput] = useState<Value | undefined>();
  const [showOutput, setShowOutput] = useState<boolean>(false);

  const user: Value = {
    name: "Aminul Islam",
    age: 21,
    learning: "React Native With Expo",
    durations: "4 Week",
    currentLearning: "Offline support and Storage",
  };

  const setItem = async (value: Value) => {
    try {
      await AsyncStorage.setItem("user", stringifyValue(value));
      Alert.alert("SetItem", "User Set Successfully");
    } catch {
      Alert.alert("Error", "Failed to save user");
    }
  };

  const getItem = async () => {
    try {
      const stored = await AsyncStorage.getItem("user");
      if (stored) {
        const parsed = parseValue(stored);
        setOutput(parsed);
        Alert.alert("GetItem", `User: ${parsed.name}, Age: ${parsed.age}`);
      } else {
        Alert.alert("GetItem", "No user found");
      }
    } catch {
      Alert.alert("Error", "Failed to load user");
    }
  };

  const updateItem = async (updates: Partial<Value>) => {
    try {
      const stored = await AsyncStorage.getItem("user");
      if (stored) {
        const parsed = parseValue(stored);
        const updated = { ...parsed, ...updates };
        await AsyncStorage.setItem("user", stringifyValue(updated));
        setOutput(updated);
        Alert.alert("UpdateItem", "User updated successfully");
      }
    } catch {
      Alert.alert("Error", "Failed to update user");
    }
  };

  const clearByKey = async (key: string) => {
    try {
      await AsyncStorage.removeItem(key);
      setOutput(undefined);
      Alert.alert("ClearByKey", `Key "${key}" cleared successfully`);
    } catch {
      Alert.alert("Error", "Failed to clear key");
    }
  };

  const clearAll = async () => {
    try {
      await AsyncStorage.clear();
      setOutput(undefined);
      Alert.alert("ClearAll", "All keys cleared successfully");
    } catch {
      Alert.alert("Error", "Failed to clear all keys");
    }
  };

  return (
    <View style={styles.container}>
      <Text>Async-Storage</Text>

      <Pressable
        onPress={() => setShowOutput(!showOutput)}
        style={styles.button}
      >
        <Text style={styles.buttonText}>
          ShowOutput: {showOutput ? "True" : "False"}
        </Text>
      </Pressable>

      <Pressable style={styles.button} onPress={() => setItem(user)}>
        <Text style={styles.buttonText}>Set Value in Async Storage</Text>
      </Pressable>

      <Pressable style={styles.button} onPress={getItem}>
        <Text style={styles.buttonText}>Get Value from Async Storage</Text>
      </Pressable>

      <Pressable style={styles.button} onPress={() => updateItem({ age: 22 })}>
        <Text style={styles.buttonText}>Update Age to 22</Text>
      </Pressable>

      <Pressable style={styles.button} onPress={() => clearByKey("user")}>
        <Text style={styles.buttonText}>Clear by Key</Text>
      </Pressable>

      <Pressable style={styles.button} onPress={clearAll}>
        <Text style={styles.buttonText}>ClearALL</Text>
      </Pressable>

      {showOutput && (
        <Text style={{ marginTop: 10 }}>
          {output ? JSON.stringify(output, null, 2) : "No User Found"}
        </Text>
      )}
    </View>
  );
};

export default AsyncStorageScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    backgroundColor: "#000000",
    padding: 15,
    borderRadius: 10,
    margin: 6,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "600",
  },
});
