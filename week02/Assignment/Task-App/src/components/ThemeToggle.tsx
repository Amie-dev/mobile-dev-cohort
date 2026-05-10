import {
  StyleSheet,
  Switch,
  Text,
  View,
} from "react-native";

import React from "react";

import type { ThemeColors } from "@/constants/colors";

type ThemeToggleProps = {
  isDark: boolean;
  onToggleTheme: () => void;
  theme: ThemeColors;
};

const ThemeToggle = ({
  isDark,
  onToggleTheme,
  theme,
}: ThemeToggleProps) => {
  return (
    <View style={styles.container}>
      {/* <Text style={styles.icon}>
        {isDark ? "🌙" : "☀️"}
      </Text> */}

      <Switch
        value={isDark}
        onValueChange={onToggleTheme}
        trackColor={{
          false: theme.switchTrack,
          true: theme.primary,
        }}
        thumbColor={theme.switchThumb}
      />
    </View>
  );
};

export default ThemeToggle;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },

  icon: {
    fontSize: 20,
  },
});