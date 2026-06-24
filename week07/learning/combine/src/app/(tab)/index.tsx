import { StyleSheet, Text, Touchable, View } from "react-native";
import React from "react";
import { Link } from "expo-router";

const index = () => {
  return (
    <View>
      <Touchable>
        <Link href={"/contact"}>Contact</Link>
      </Touchable>
    </View>
  );
};

export default index;

const styles = StyleSheet.create({});
