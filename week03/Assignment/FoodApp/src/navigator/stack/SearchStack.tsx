import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import SearchScreen from "../../screens/SearchScreen";
import FoodScreen from "../../screens/HomeStackScreen/FoodScreen";
import FoodHeader from "../../components/Food/FoodHeader";

const SearchStack = () => {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator
      
    >
      <Stack.Screen name="search" component={SearchScreen} options={{
        headerShown:false
      }} />
      <Stack.Screen
        name="Food"
        component={FoodScreen}
        options={{
          title: "Food Item",
          headerBackTitle: "Back",
          header:()=><FoodHeader/>
        }}
      />
    </Stack.Navigator>
  );
};

export default SearchStack;

const styles = StyleSheet.create({});
