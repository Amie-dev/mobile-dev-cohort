import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import HomeScreen from "../screens/HomeStackScreen/HomeScreen";
import HomeStack from "./stack/HomeStack";
import TabNavigator from "./tabs/TabNavigator";

const RootNavigator = () => {
  return (
    <NavigationContainer>
      <TabNavigator />
    </NavigationContainer>
  );
};

export default RootNavigator;

const styles = StyleSheet.create({});
