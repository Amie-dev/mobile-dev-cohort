import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Link } from "expo-router";

const index = () => {
  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Text>List Of ALL Page That are are Present </Text>
      <View
        style={{
          marginTop: 10,
          backgroundColor: "#623030",
          padding: 15,
          borderRadius: 20,
        }}
      >
        <Link href={"/insert-value"}>
          <Text>Insert Value In DB</Text>
        </Link>
      </View>
      <View
        style={{
          marginTop: 10,
          backgroundColor: "#623030",
          padding: 15,
          borderRadius: 20,
        }}
      >
        <Link href={"/post-insert"}>
          <Text>Insert Value In Product DB</Text>
        </Link>
      </View>
    </View>
  );
};

export default index;

const styles = StyleSheet.create({});
