import { StyleSheet, Text, View } from "react-native";
import React from "react";

import Ionicons from "@expo/vector-icons/Ionicons";

import { useTheme } from "../../context/ThemeContext";

const SearchHeader = () => {
  const { theme } = useTheme();

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: theme.background,
          borderBottomColor: theme.border,
        },
      ]}
    >
      <View style={styles.content}>
        {/* LEFT */}
        <View>
          <Text
            style={[
              styles.title,
              {
                color: theme.text,
              },
            ]}
          >
            Discover
          </Text>

          <Text
            style={[
              styles.subtitle,
              {
                color: theme.secondaryText,
              },
            ]}
          >
            Find your favorite food
          </Text>
        </View>

        {/* RIGHT */}
        <View
          style={[
            styles.iconContainer,
            {
              backgroundColor: theme.card,
            },
          ]}
        >
          <Ionicons
            name="options-outline"
            size={22}
            color={theme.text}
          />
        </View>
      </View>
    </View>
  );
};

export default SearchHeader;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,

    paddingTop: 18,

    paddingBottom: 14,

    borderBottomWidth: 1,
  },

  content: {
    flexDirection: "row",

    alignItems: "center",

    justifyContent: "space-between",
  },

  title: {
    fontSize: 30,

    fontWeight: "900",
  },

  subtitle: {
    marginTop: 4,

    fontSize: 15,

    fontWeight: "500",
  },

  iconContainer: {
    width: 50,
    height: 50,

    borderRadius: 25,

    justifyContent: "center",
    alignItems: "center",

    elevation: 4,
  },
});