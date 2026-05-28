import { useTheme } from "@/context/ThemeContext";

import {
  Pressable,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  View,
} from "react-native";

export default function SettingsScreen() {
  const { isDarkMode, toggleTheme, theme } = useTheme();

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: theme.background,
        },
      ]}
    >
      {/* THEME CARD */}
      <View
        style={[
          styles.card,
          {
            backgroundColor: theme.card,
            borderColor: theme.border,
          },
        ]}
      >
        <Text style={[styles.title, { color: theme.text }]}>Theme</Text>

        <View style={styles.row}>
          <Text style={{ color: theme.text }}>Dark Mode</Text>

          <Switch
            value={isDarkMode}
            onValueChange={toggleTheme}
            thumbColor={isDarkMode ? theme.primary : "#f4f3f4"}
            trackColor={{
              false: theme.border,
              true: theme.primaryLight,
            }}
          />
        </View>
      </View>

      {/* API KEY CARD */}
      <View
        style={[
          styles.card,
          {
            backgroundColor: theme.card,
            borderColor: theme.border,
          },
        ]}
      >
        <Text style={[styles.title, { color: theme.text }]}>
          AI API Key
        </Text>

        <TextInput
          placeholder="Enter your API key"
          placeholderTextColor={theme.mutedText}
          secureTextEntry
          style={[
            styles.input,
            {
              backgroundColor: theme.inputBackground,
              borderColor: theme.border,
              color: theme.text,
            },
          ]}
        />

        <Pressable
          style={[
            styles.button,
            {
              backgroundColor: theme.primary,
            },
          ]}
        >
          <Text style={styles.buttonText}>Save API Key</Text>
        </Pressable>
      </View>

      {/* STORAGE CARD */}
      <View
        style={[
          styles.card,
          {
            backgroundColor: theme.card,
            borderColor: theme.border,
          },
        ]}
      >
        <Text style={[styles.title, { color: theme.text }]}>Storage</Text>

        <Pressable style={styles.dangerButton}>
          <Text style={styles.buttonText}>Clear Local Data</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    gap: 16,
  },

  card: {
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    gap: 12,
  },

  title: {
    fontSize: 18,
    fontWeight: "700",
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  input: {
    padding: 14,
    borderRadius: 12,
    borderWidth: 1,
  },

  button: {
    padding: 14,
    borderRadius: 12,
    alignItems: "center",
  },

  dangerButton: {
    backgroundColor: "#dc2626",
    padding: 14,
    borderRadius: 12,
    alignItems: "center",
  },

  buttonText: {
    color: "#fff",
    fontWeight: "700",
  },
});