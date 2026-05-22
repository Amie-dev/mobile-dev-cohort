import React from "react";

import {
  Pressable,
  StyleSheet,
  View,
} from "react-native";

import Ionicons from "@expo/vector-icons/Ionicons";

import { useNavigation } from "@react-navigation/native";

import { useTheme } from "../../context/ThemeContext";

const FoodHeader = () => {
  const navigation: any = useNavigation();

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
      {/* BACK BUTTON */}
      <Pressable
        onPress={() => navigation.goBack()}
        style={[
          styles.iconButton,
          {
            backgroundColor: theme.card,
          },
        ]}
      >
        <Ionicons
          name="arrow-back"
          size={22}
          color={theme.text}
        />
      </Pressable>

      {/* RIGHT BUTTONS */}
      <View style={styles.rightContainer}>
        <Pressable
          style={[
            styles.iconButton,
            {
              backgroundColor: theme.card,
            },
          ]}
        >
          <Ionicons
            name="heart-outline"
            size={22}
            color={theme.text}
          />
        </Pressable>

        <Pressable
          style={[
            styles.iconButton,
            {
              backgroundColor: theme.card,
            },
          ]}
        >
          <Ionicons
            name="share-social-outline"
            size={22}
            color={theme.text}
          />
        </Pressable>
      </View>
    </View>
  );
};

export default FoodHeader;

const styles = StyleSheet.create({
  container: {
    height: 100,
    

    paddingHorizontal: 20,

    flexDirection: "row",

    alignItems: "flex-end",

    justifyContent: "space-between",
    marginTop:-20,

    paddingBottom: 12,
  },

  rightContainer: {
    flexDirection: "row",

    alignItems: "center",

    gap: 12,
  },

  iconButton: {
    width: 48,
    height: 48,

    borderRadius: 20,

    justifyContent: "center",

    alignItems: "center",

    elevation: 5,

    shadowOpacity: 0.12,

    shadowRadius: 8,

    shadowOffset: {
      width: 0,
      height: 4,
    },
  },
});