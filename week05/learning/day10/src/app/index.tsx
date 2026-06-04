import { StyleSheet, Text, View, FlatList, TouchableOpacity } from "react-native";
import React from "react";
import { Link } from "expo-router";
import { Ionicons } from "@expo/vector-icons"; // for icons

const sensors = [
  { name: "Accelerometer", path: "/(sensors)/Accelerometer", icon: "speedometer" },
  { name: "Barometer", path: "/(sensors)/Barometer", icon: "cloud-outline" },
  { name: "DeviceMotion", path: "/(sensors)/DeviceMotion", icon: "phone-portrait-outline" },
  { name: "Gyroscope", path: "/(sensors)/Gyroscope", icon: "sync-outline" },
  { name: "LightSensor", path: "/(sensors)/LightSensor", icon: "sunny-outline" },
  { name: "Magnetometer", path: "/(sensors)/Magnetometer", icon: "magnet-outline" },
  { name: "MagnetometerUncalibrated", path: "/(sensors)/MagnetometerUncalibrated", icon: "magnet-outline" },
  { name: "Pedometer", path: "/(sensors)/Pedometer", icon: "walk-outline" },
  { name: "Custom", path: "/(sensors)/Accelerometer", icon: "construct-outline" },
];

const Index = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Learn All Sensors</Text>

      <FlatList
        data={sensors}
        keyExtractor={(item) => item.name}
        renderItem={({ item }) => (
          <Link href={item.path} asChild>
            <TouchableOpacity style={styles.card}>
              <Ionicons name={item.icon} size={22} color="#4CAF50" style={styles.icon} />
              <Text style={styles.cardText}>{item.name}</Text>
            </TouchableOpacity>
          </Link>
        )}
        contentContainerStyle={styles.list}
      />
    </View>
  );
};

export default Index;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1c1c1c",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 20,
    textAlign: "center",
  },
  list: {
    paddingBottom: 20,
  },
  card: {
    flexDirection: "row",
    backgroundColor: "#2a2a2a",
    padding: 15,
    borderRadius: 12,
    marginBottom: 12,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  icon: {
    marginRight: 12,
  },
  cardText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "500",
  },
});
