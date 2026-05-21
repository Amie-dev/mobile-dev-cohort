import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";

import { useRoute } from "@react-navigation/native";

import { useTheme } from "../../context/ThemeContext";

const FoodScreen = () => {
  const route: any = useRoute();

  const { selectedData } = route.params;

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
      <Image
        source={{ uri: selectedData.foodImage }}
        style={styles.image}
      />

      <Text
        style={[
          styles.title,
          {
            color: theme.text,
          },
        ]}
      >
        {selectedData.foodName}
      </Text>

      <Text
        style={{
          color: theme.secondaryText,
        }}
      >
        {selectedData.foodDescription}
      </Text>

      <Text
        style={[
          styles.price,
          {
            color: theme.primary,
          },
        ]}
      >
        ₹{selectedData.price}
      </Text>
    </View>
  );
};

export default FoodScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,

    padding: 20,
  },

  image: {
    width: "100%",
    height: 260,

    borderRadius: 24,

    marginBottom: 20,
  },

  title: {
    fontSize: 28,

    fontWeight: "800",

    marginBottom: 10,
  },

  price: {
    fontSize: 24,

    fontWeight: "700",

    marginTop: 20,
  },
});