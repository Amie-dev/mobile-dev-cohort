import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState, useEffect } from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';

interface User {
  name: string;
  age: number;
  isDeveloper: boolean;
}

export default function Index() {
  const [data, setData] = useState<User | null>(null);

  const myObj: User = {
    name: "Suraj",
    age: 22,
    isDeveloper: true,
  };

  // Save Item
  const saveData = async () => {
    try {
      await AsyncStorage.setItem("user", JSON.stringify(myObj));
      console.log("Data saved successfully");
    } catch (error) {
      console.error("Error saving data:", error);
    }
  };

  // Get Item
  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem("user");
      if (value) {
        setData(JSON.parse(value));
      } else {
        setData(null);
      }
    } catch (error) {
      console.error("Error retrieving data:", error);
    }
  };

  // Remove Item
  const removeData = async () => {
    try {
      await AsyncStorage.removeItem("user");
      setData(null);
      console.log("Data removed successfully");
    } catch (error) {
      console.error("Error removing data:", error);
    }
  };

  // Clear Storage
  const clearStorage = async () => {
    try {
      await AsyncStorage.clear();
      setData(null);
      console.log("Storage cleared");
    } catch (error) {
      console.error("Error clearing storage:", error);
    }
  };

  // Get All Keys
  const getKeys = async () => {
    try {
      const keys = await AsyncStorage.getAllKeys();
      console.log("Keys:", keys);
    } catch (error) {
      console.error("Error getting keys:", error);
    }
  };

  // Save Multiple
  const saveMultiple = async () => {
    try {
      await AsyncStorage.multiSet([
        ["name", "Code Snippet"],
        ["role", "Developer"],
      ]);
      console.log("Multiple values saved");
    } catch (error) {
      console.error("Error saving multiple values:", error);
    }
  };

  // Get Multiple
  const getMultiple = async () => {
    try {
      const values = await AsyncStorage.multiGet(["name", "role"]);
      console.log("Multiple values:", values);
    } catch (error) {
      console.error("Error retrieving multiple values:", error);
    }
  };

  // Load data on startup
  useEffect(() => {
    getData();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Button title="Save Data" onPress={saveData} />
      <Button title="Get Data" onPress={getData} />
      <Button title="Remove Data" onPress={removeData} />
      <Button title="Clear Storage" onPress={clearStorage} />
      <Button title="Get All Keys" onPress={getKeys} />
      <Button title="Multi Set" onPress={saveMultiple} />
      <Button title="Multi Get" onPress={getMultiple} />

      <View style={{ marginTop: 20 }}>
        <Text style={styles.outputTitle}>Output:</Text>
        <Text style={styles.outputText}>
          {data ? JSON.stringify(data, null, 2) : "No data available"}
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
    gap: 12,
  },
  outputTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  outputText: {
    marginTop: 8,
    fontSize: 16,
    color: "#333",
  },
});
