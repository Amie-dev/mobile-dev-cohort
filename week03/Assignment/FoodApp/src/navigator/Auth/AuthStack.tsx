import React from "react";

import { createStackNavigator } from "@react-navigation/stack";

import GetStart from "../../screens/GetStart";

const Stack = createStackNavigator();

const AuthStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen
        name="GetStart"
        component={GetStart}
      />
    </Stack.Navigator>
  );
};

export default AuthStack;