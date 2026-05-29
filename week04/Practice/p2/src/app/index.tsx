import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Link } from "expo-router";

const index = () => {
  return (
    <View
      style={{
        flex: 1,
        alignItems:"center",
        justifyContent:"center"
      }}
    >
      <Text>index</Text>
      <View
        style={{
          backgroundColor: "rgba(1, 22, 1, 0.8)",
          padding: 10,
          borderRadius: 20,
          marginTop:10
        }}
      >
        <Link href={"/sqlite-drizzle"}>
          <Text
            style={{
              color: "#ddd2d2",
              fontWeight: "bold",
              padding: 10,
            }}
          >
            Sql Lite Drizzle
          </Text>
        </Link>
      </View>
      <View
        style={{
          backgroundColor: "rgba(1, 22, 1, 0.8)",
          padding: 10,
          borderRadius: 20,
          marginTop:10
        }}
      >
        <Link href={"/file-system"}>
          <Text
            style={{
              color: "#ddd2d2",
              fontWeight: "bold",
              padding: 10,
            }}
          >
            File System
          </Text>
        </Link>
      </View>
    </View>
  );
};

export default index;

const styles = StyleSheet.create({});
