import { StyleSheet, Text, View, Pressable } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";

import { useTheme } from "../../context/ThemeContext";

const HomeScreenHeader = () => {
  const { theme, isDarkMode, toggleTheme } = useTheme();

  return (
    <View
      style={[
        styles.wrapper,
        {
          backgroundColor: theme.background,
        },
      ]}
    >
      <View
        style={[
          styles.container,
          {
            backgroundColor: theme.tabBg,
            borderBottomColor: theme.border,
            borderRadius: 40,
          },
        ]}
      >
        {/* Left */}
        <View>
          <Text
            style={[
              styles.label,
              {
                color: theme.secondaryText,
              },
            ]}
          >
            Location
          </Text>

          <Text
            style={[
              styles.locationText,
              {
                color: theme.text,
              },
            ]}
          >
            Delhi, India
          </Text>
        </View>

        {/* Center */}
        <Text
          style={[
            styles.title,
            {
              color: theme.primary,
            },
          ]}
        >
          FoodApp
        </Text>

        {/* Right */}
        <Pressable onPress={toggleTheme} style={styles.themeButton}>
          {/* <Ionicons
            name={
              isDarkMode
                ? "moon-outline"
                : "sunny-outline"
            }
            size={22}
            color={theme.primary}
          /> */}
          <Text
            style={[
              styles.title,
              {
                fontSize: 25,
              },
            ]}
          >
            {isDarkMode ? "🌙" : "☀️"}
          </Text>
        </Pressable>
      </View>
    </View>
  );
};

export default HomeScreenHeader;

const styles = StyleSheet.create({
  wrapper: {
    width: "100%",
  },

  container: {
    height: 72,

    flexDirection: "row",

    alignItems: "center",

    justifyContent: "space-between",

    paddingHorizontal: 20,

    borderBottomWidth: 1,
  },

  label: {
    fontSize: 11,
    fontWeight: "500",
  },

  locationText: {
    fontSize: 15,
    fontWeight: "700",
  },

  title: {
    fontSize: 20,
    fontWeight: "800",
  },

  themeButton: {
    width: 42,
    height: 42,

    borderRadius: 21,

    justifyContent: "center",
    alignItems: "center",
  },
});
