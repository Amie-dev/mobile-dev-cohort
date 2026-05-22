import { StyleSheet, View } from "react-native";
import React from "react";

import { useTheme } from "../context/ThemeContext";

import OrderHeader from "../components/Order/OrderHeader";
import TotalSpent from "../components/Order/TotalSpent";
import RenderItems from "../components/Order/RanderItems";

const OrderScreen = () => {
  const { theme } = useTheme();

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: theme.background,
        },
      ]}
    >
      <OrderHeader />

      <RenderItems
        ListHeaderComponent={
          <TotalSpent />
        }
      />
    </View>
  );
};

export default OrderScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});