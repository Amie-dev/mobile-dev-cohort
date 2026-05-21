import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import SearchScreen from "../../screens/SearchScreen";
import FoodScreen from "../../screens/HomeStackScreen/FoodScreen";

const SearchStack = () => {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="search" component={SearchScreen} />
      <Stack.Screen
        name="Food"
        component={FoodScreen}
        options={{
          title: "Food Item",
          headerBackTitle: "Back",
        }}
      />
    </Stack.Navigator>
  );
};

export default SearchStack;

const styles = StyleSheet.create({});
